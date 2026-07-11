import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Lightweight per-lesson slide (exercise) progress tracker.
 * Persists in localStorage so students can see exactly how far
 * they got inside any lesson — down to the individual slide.
 *
 * Key format: `slide-progress:${lessonKey}` where lessonKey is
 * `${levelId}-${lessonNumber}` (e.g. "ar-draw-4-2").
 */
export interface SlideProgress {
  reached: number; // highest slide index the student has viewed (0-based)
  total: number; // total slides in the lesson at the time of the last visit
  updatedAt: number;
}

const PREFIX = "slide-progress:";

// ── Cloud sync ──────────────────────────────────────────────────────────
// Progress is written to localStorage instantly (offline-friendly) and
// debounce-synced to the `lesson_slide_progress` table so students can
// resume on any device. On first load we hydrate local cache from cloud.

let cloudHydrated = false;
const pendingWrites = new Map<string, { reached: number; total: number }>();
let flushTimer: ReturnType<typeof setTimeout> | null = null;

async function flushPending() {
  flushTimer = null;
  if (pendingWrites.size === 0) return;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { pendingWrites.clear(); return; }
  const rows = Array.from(pendingWrites.entries()).map(([lesson_key, v]) => ({
    user_id: user.id,
    lesson_key,
    reached: v.reached,
    total: v.total,
    updated_at: new Date().toISOString(),
  }));
  pendingWrites.clear();
  await supabase
    .from("lesson_slide_progress")
    .upsert(rows, { onConflict: "user_id,lesson_key" });
}

function schedulePush(lessonKey: string, reached: number, total: number) {
  pendingWrites.set(lessonKey, { reached, total });
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(() => { void flushPending(); }, 800);
}

export async function hydrateSlideProgressFromCloud() {
  if (cloudHydrated || typeof window === "undefined") return;
  cloudHydrated = true;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { cloudHydrated = false; return; }
    const { data, error } = await supabase
      .from("lesson_slide_progress")
      .select("lesson_key, reached, total, updated_at")
      .eq("user_id", user.id);
    if (error || !data) return;
    for (const row of data) {
      const cloudUpdated = row.updated_at ? new Date(row.updated_at).getTime() : 0;
      const local = getSlideProgress(row.lesson_key);
      if (!local || cloudUpdated > (local.updatedAt ?? 0)) {
        const payload: SlideProgress = {
          reached: row.reached ?? 0,
          total: row.total ?? 0,
          updatedAt: cloudUpdated,
        };
        window.localStorage.setItem(PREFIX + row.lesson_key, JSON.stringify(payload));
        window.dispatchEvent(new CustomEvent("slide-progress-updated", { detail: { lessonKey: row.lesson_key } }));
      }
    }
  } catch {
    cloudHydrated = false;
  }
}

// Flush any pending writes when the tab is closed / hidden.
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => { void flushPending(); });
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") void flushPending();
  });
}

export function getSlideProgress(lessonKey: string): SlideProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PREFIX + lessonKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SlideProgress>;
    if (typeof parsed.reached !== "number" || typeof parsed.total !== "number") return null;
    return {
      reached: parsed.reached,
      total: parsed.total,
      updatedAt: parsed.updatedAt ?? 0,
    };
  } catch {
    return null;
  }
}

export function setSlideProgress(lessonKey: string, reached: number, total: number) {
  if (typeof window === "undefined") return;
  try {
    const prev = getSlideProgress(lessonKey);
    const nextReached = Math.max(prev?.reached ?? 0, reached);
    const payload: SlideProgress = {
      reached: Math.min(nextReached, Math.max(0, total - 1)),
      total,
      updatedAt: Date.now(),
    };
    window.localStorage.setItem(PREFIX + lessonKey, JSON.stringify(payload));
    window.dispatchEvent(new CustomEvent("slide-progress-updated", { detail: { lessonKey } }));
    schedulePush(lessonKey, payload.reached, payload.total);
  } catch {
    /* ignore quota / privacy-mode errors */
  }
}

/** Read + subscribe to slide progress for a single lesson. */
export function useSlideProgress(lessonKey: string | null | undefined) {
  const [progress, setProgress] = useState<SlideProgress | null>(() =>
    lessonKey ? getSlideProgress(lessonKey) : null
  );

  useEffect(() => {
    if (!lessonKey) {
      setProgress(null);
      return;
    }
    setProgress(getSlideProgress(lessonKey));
    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail as { lessonKey?: string } | undefined;
      if (!detail || detail.lessonKey === lessonKey) {
        setProgress(getSlideProgress(lessonKey));
      }
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === PREFIX + lessonKey) setProgress(getSlideProgress(lessonKey));
    };
    window.addEventListener("slide-progress-updated", onUpdate);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("slide-progress-updated", onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, [lessonKey]);

  return progress;
}

/** Read progress for many lessons at once (with subscription). */
export function useSlideProgressMap(lessonKeys: string[]) {
  const keySignature = lessonKeys.join("|");
  const [map, setMap] = useState<Record<string, SlideProgress>>(() => {
    const out: Record<string, SlideProgress> = {};
    lessonKeys.forEach((k) => {
      const p = getSlideProgress(k);
      if (p) out[k] = p;
    });
    return out;
  });

  const refresh = useCallback(() => {
    const out: Record<string, SlideProgress> = {};
    lessonKeys.forEach((k) => {
      const p = getSlideProgress(k);
      if (p) out[k] = p;
    });
    setMap(out);
  }, [keySignature]);

  useEffect(() => {
    refresh();
    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail as { lessonKey?: string } | undefined;
      if (!detail?.lessonKey || lessonKeys.includes(detail.lessonKey)) refresh();
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key && e.key.startsWith(PREFIX)) refresh();
    };
    window.addEventListener("slide-progress-updated", onUpdate);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("slide-progress-updated", onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, [keySignature, refresh]);

  return map;
}