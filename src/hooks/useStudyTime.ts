import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type StudyTimeStats = {
  todaySeconds: number;
  weekSeconds: number;
  totalSeconds: number;
  daysStudied: number;
  perDay: { date: string; seconds: number }[];
};

const EMPTY: StudyTimeStats = {
  todaySeconds: 0,
  weekSeconds: 0,
  totalSeconds: 0,
  daysStudied: 0,
  perDay: [],
};

const TICK_MS = 15_000; // count active time in 15s chunks
const FLUSH_EVERY = 4; // send to the server every minute
const IDLE_MS = 90_000; // stop counting after 90s with no interaction

export function formatDuration(totalSeconds: number) {
  const mins = Math.round(totalSeconds / 60);
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  const rest = mins % 60;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
}

const todayISO = () => new Date().toISOString().slice(0, 10);

export function useStudyTime(options: { track?: boolean } = {}) {
  const { track = false } = options;
  const { user } = useAuth();
  const [stats, setStats] = useState<StudyTimeStats>(EMPTY);
  const [loading, setLoading] = useState(true);
  const pending = useRef(0);
  const lastActive = useRef(Date.now());

  const refresh = useCallback(async () => {
    if (!user) {
      setStats(EMPTY);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("study_time")
      .select("study_date, seconds")
      .order("study_date", { ascending: false })
      .limit(400);
    const rows = (data ?? []) as { study_date: string; seconds: number }[];
    const today = todayISO();
    const weekAgo = new Date(Date.now() - 6 * 86400000).toISOString().slice(0, 10);
    setStats({
      todaySeconds: rows.find((r) => r.study_date === today)?.seconds ?? 0,
      weekSeconds: rows.filter((r) => r.study_date >= weekAgo).reduce((s, r) => s + r.seconds, 0),
      totalSeconds: rows.reduce((s, r) => s + r.seconds, 0),
      daysStudied: rows.filter((r) => r.seconds > 0).length,
      perDay: rows.map((r) => ({ date: r.study_date, seconds: r.seconds })),
    });
    setLoading(false);
  }, [user]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const flush = useCallback(async () => {
    const seconds = pending.current;
    if (!user || seconds <= 0) return;
    pending.current = 0;
    const { data, error } = await supabase.rpc("log_study_seconds", { _seconds: seconds });
    if (error) return;
    const row = Array.isArray(data) ? data[0] : null;
    if (row) {
      setStats((prev) => ({
        ...prev,
        todaySeconds: row.today_seconds ?? prev.todaySeconds,
        weekSeconds: row.week_seconds ?? prev.weekSeconds,
        totalSeconds: row.total_seconds ?? prev.totalSeconds,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!track || !user) return;

    const markActive = () => {
      lastActive.current = Date.now();
    };
    const events: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "scroll", "mousemove", "touchstart"];
    events.forEach((e) => window.addEventListener(e, markActive, { passive: true }));

    let ticks = 0;
    const interval = window.setInterval(() => {
      const active = document.visibilityState === "visible" && Date.now() - lastActive.current < IDLE_MS;
      if (!active) return;
      pending.current += TICK_MS / 1000;
      setStats((prev) => ({ ...prev, todaySeconds: prev.todaySeconds + TICK_MS / 1000 }));
      ticks += 1;
      if (ticks % FLUSH_EVERY === 0) void flush();
    }, TICK_MS);

    const onHide = () => {
      if (document.visibilityState === "hidden") void flush();
    };
    document.addEventListener("visibilitychange", onHide);

    return () => {
      events.forEach((e) => window.removeEventListener(e, markActive));
      document.removeEventListener("visibilitychange", onHide);
      window.clearInterval(interval);
      void flush();
    };
  }, [track, user, flush]);

  return { stats, loading, refresh, formatDuration };
}
