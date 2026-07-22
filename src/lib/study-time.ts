/**
 * Lightweight, privacy-first study-time tracker.
 *
 * Records seconds spent inside lesson pages, bucketed per level_id, in
 * localStorage keyed by the current auth user. Ticks only when the tab is
 * visible AND the user has interacted in the last 60s, so idle time does
 * not inflate the numbers.
 *
 * No server writes — this is a personal "time invested" signal shown to the
 * student. Admin reports intentionally do not surface it.
 */

import { useEffect, useRef, useState } from "react";

const STORAGE_PREFIX = "study-time-v1:"; // + userId => JSON { [levelId]: { total, byDay: {YYYY-MM-DD: sec} } }
const IDLE_MS = 60_000;

type LevelStats = { total: number; byDay: Record<string, number> };
type UserStats = Record<string, LevelStats>;

function readAll(userId: string): UserStats {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + userId);
    return raw ? (JSON.parse(raw) as UserStats) : {};
  } catch {
    return {};
  }
}

function writeAll(userId: string, stats: UserStats) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_PREFIX + userId, JSON.stringify(stats));
    window.dispatchEvent(new CustomEvent("study-time-updated"));
  } catch {
    /* ignore quota errors */
  }
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function addSeconds(userId: string | undefined, levelId: string, seconds: number) {
  if (!userId || !levelId || seconds <= 0) return;
  const all = readAll(userId);
  const lvl = all[levelId] ?? { total: 0, byDay: {} };
  const day = todayKey();
  lvl.total = (lvl.total || 0) + seconds;
  lvl.byDay[day] = (lvl.byDay[day] || 0) + seconds;
  all[levelId] = lvl;
  writeAll(userId, all);
}

export function getLevelMinutes(userId: string | undefined, levelId: string): number {
  if (!userId) return 0;
  const s = readAll(userId)[levelId];
  return s ? Math.round(s.total / 60) : 0;
}

export function getTotalMinutes(userId: string | undefined): number {
  if (!userId) return 0;
  const all = readAll(userId);
  return Math.round(Object.values(all).reduce((s, l) => s + (l.total || 0), 0) / 60);
}

export function getWeeklyMinutes(userId: string | undefined): number {
  if (!userId) return 0;
  const all = readAll(userId);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 6);
  const cutoffKey = cutoff.toISOString().slice(0, 10);
  let total = 0;
  for (const lvl of Object.values(all)) {
    for (const [day, sec] of Object.entries(lvl.byDay || {})) {
      if (day >= cutoffKey) total += sec;
    }
  }
  return Math.round(total / 60);
}

export function formatDuration(minutes: number): string {
  if (!minutes || minutes < 1) return "—";
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/**
 * Mount inside a lesson page to record active study time for a given level.
 * Ticks every 15s while the tab is visible and the user is not idle.
 */
export function useStudyTimer(userId: string | undefined, levelId: string | undefined) {
  const lastInteraction = useRef<number>(Date.now());
  useEffect(() => {
    if (!userId || !levelId) return;
    const bump = () => { lastInteraction.current = Date.now(); };
    const events: (keyof WindowEventMap)[] = ["keydown", "mousemove", "click", "touchstart", "scroll"];
    events.forEach((e) => window.addEventListener(e, bump, { passive: true }));
    const interval = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (Date.now() - lastInteraction.current > IDLE_MS) return;
      addSeconds(userId, levelId, 15);
    }, 15_000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, bump));
      window.clearInterval(interval);
    };
  }, [userId, levelId]);
}

/** Subscribe to study-time updates for reactive UIs. */
export function useStudyTimeVersion(): number {
  const [v, setV] = useState(0);
  useEffect(() => {
    const h = () => setV((x) => x + 1);
    window.addEventListener("study-time-updated", h);
    return () => window.removeEventListener("study-time-updated", h);
  }, []);
  return v;
}