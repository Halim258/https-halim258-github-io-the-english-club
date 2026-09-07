import { useEffect, useMemo, useState } from "react";
import { Target, Clock, CalendarDays, CheckCircle2 } from "lucide-react";
import { useStudyTime, formatDuration } from "@/hooks/useStudyTime";

const STORAGE_KEY = "study-reminder";
const GOALS = [10, 15, 20, 30, 45, 60];
const DEFAULT_GOAL = 20;

function readGoal() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : null;
    const value = Number(parsed?.goalMinutes);
    return Number.isFinite(value) && value > 0 ? value : DEFAULT_GOAL;
  } catch {
    return DEFAULT_GOAL;
  }
}

function writeGoal(goalMinutes: number) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : {};
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...parsed, goalMinutes }));
  } catch {
    /* ignore */
  }
}

/** Shows the student how much study time they still need today and this week. */
export default function StudyTargetCard({ className = "" }: { className?: string }) {
  const { stats, loading } = useStudyTime();
  const [goalMinutes, setGoalMinutes] = useState(readGoal);

  useEffect(() => {
    writeGoal(goalMinutes);
  }, [goalMinutes]);

  const view = useMemo(() => {
    const goalSeconds = goalMinutes * 60;
    const weekGoal = goalSeconds * 7;
    const todayLeft = Math.max(0, goalSeconds - stats.todaySeconds);
    const weekLeft = Math.max(0, weekGoal - stats.weekSeconds);
    const daysLeftInWeek = 7 - new Date().getDay() || 7;
    return {
      goalSeconds,
      weekGoal,
      todayLeft,
      weekLeft,
      todayPct: Math.min(100, Math.round((stats.todaySeconds / goalSeconds) * 100)),
      weekPct: Math.min(100, Math.round((stats.weekSeconds / weekGoal) * 100)),
      perDayToCatchUp: Math.ceil(weekLeft / 60 / daysLeftInWeek),
      done: stats.todaySeconds >= goalSeconds,
    };
  }, [stats.todaySeconds, stats.weekSeconds, goalMinutes]);

  if (loading) return null;

  return (
    <section className={`border border-border bg-card ${className}`} aria-label="Study time you still need">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center border border-primary/30 bg-primary/10">
            {view.done ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <Target className="h-5 w-5 text-primary" />}
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Study time you need
            </p>
            <h2 className="font-display text-lg font-bold leading-tight">
              {view.done
                ? "Today's target is complete"
                : `${formatDuration(view.todayLeft)} left today`}
            </h2>
          </div>
        </div>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          Daily target
          <select
            value={goalMinutes}
            onChange={(e) => setGoalMinutes(Number(e.target.value))}
            className="border border-border bg-background px-2 py-1 text-xs font-semibold text-foreground"
            aria-label="Daily study target in minutes"
          >
            {GOALS.map((g) => (
              <option key={g} value={g}>
                {g} min
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-px bg-border sm:grid-cols-2">
        <div className="bg-card p-4 sm:p-5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-semibold uppercase tracking-wide text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> Today
            </span>
            <span className="tabular-nums text-muted-foreground">
              {formatDuration(stats.todaySeconds)} / {goalMinutes} min
            </span>
          </div>
          <div className="h-2 w-full bg-muted" role="progressbar" aria-valuenow={view.todayPct} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full bg-primary transition-all" style={{ width: `${view.todayPct}%` }} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {view.done
              ? "Well done — anything extra today is a bonus."
              : `Study ${formatDuration(view.todayLeft)} more to reach today's target.`}
          </p>
        </div>

        <div className="bg-card p-4 sm:p-5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-semibold uppercase tracking-wide text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5" /> This week
            </span>
            <span className="tabular-nums text-muted-foreground">
              {formatDuration(stats.weekSeconds)} / {formatDuration(view.weekGoal)}
            </span>
          </div>
          <div className="h-2 w-full bg-muted" role="progressbar" aria-valuenow={view.weekPct} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full bg-primary transition-all" style={{ width: `${view.weekPct}%` }} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {view.weekLeft === 0
              ? "You have already met this week's target."
              : `${formatDuration(view.weekLeft)} left this week — about ${view.perDayToCatchUp} min a day.`}
          </p>
        </div>
      </div>
    </section>
  );
}
