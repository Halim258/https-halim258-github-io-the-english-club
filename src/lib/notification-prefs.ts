import { useEffect, useState } from "react";

export type NotifCategory = "achievement" | "lesson" | "streak" | "tip" | "info";

export const NOTIF_CATEGORIES: { key: NotifCategory; label: string }[] = [
  { key: "achievement", label: "Achievements" },
  { key: "lesson", label: "Lessons" },
  { key: "streak", label: "Streaks" },
  { key: "tip", label: "Tips" },
  { key: "info", label: "General" },
];

export interface NotifPrefs {
  sound: boolean;
  toast: boolean;
  muted: NotifCategory[];
}

const KEY = "notif_prefs_v1";
const DEFAULTS: NotifPrefs = { sound: true, toast: true, muted: [] };

export function loadPrefs(): NotifPrefs {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch { return DEFAULTS; }
}

export function savePrefs(prefs: NotifPrefs) {
  localStorage.setItem(KEY, JSON.stringify(prefs));
  window.dispatchEvent(new CustomEvent("notif-prefs-changed", { detail: prefs }));
}

export function useNotifPrefs(): [NotifPrefs, (p: NotifPrefs) => void] {
  const [prefs, setPrefs] = useState<NotifPrefs>(() => loadPrefs());
  useEffect(() => {
    const h = (e: Event) => setPrefs((e as CustomEvent).detail as NotifPrefs);
    window.addEventListener("notif-prefs-changed", h);
    return () => window.removeEventListener("notif-prefs-changed", h);
  }, []);
  const update = (p: NotifPrefs) => { savePrefs(p); setPrefs(p); };
  return [prefs, update];
}

let audioCtx: AudioContext | null = null;
export function playNotifSound() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = audioCtx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.12);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.34);
  } catch { /* ignore */ }
}

export interface Groupable { created_at: string }
export function groupByRecency<T extends Groupable>(items: T[]): { label: string; items: T[] }[] {
  const now = Date.now();
  const dayMs = 86400000;
  const buckets: Record<string, T[]> = { Today: [], "This week": [], Earlier: [] };
  for (const it of items) {
    const age = now - new Date(it.created_at).getTime();
    if (age < dayMs) buckets["Today"].push(it);
    else if (age < 7 * dayMs) buckets["This week"].push(it);
    else buckets["Earlier"].push(it);
  }
  return Object.entries(buckets).filter(([, v]) => v.length).map(([label, items]) => ({ label, items }));
}