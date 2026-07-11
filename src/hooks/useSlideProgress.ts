import { useCallback, useEffect, useState } from "react";

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