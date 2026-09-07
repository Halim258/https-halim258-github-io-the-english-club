import { useMemo } from "react";
import { Clock } from "lucide-react";
import { useStudyTime, formatDuration } from "@/hooks/useStudyTime";

const dayLabel = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString(undefined, { weekday: "short" });

/** Cross-device study time summary for the student dashboard. */
export default function StudyTimeCard() {
  const { stats, loading } = useStudyTime();

  const last7 = useMemo(() => {
    const map = new Map(stats.perDay.map((d) => [d.date, d.seconds]));
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(Date.now() - (6 - i) * 86400000).toISOString().slice(0, 10);
      return { date: d, seconds: map.get(d) ?? 0 };
    });
  }, [stats.perDay]);

  const best = Math.max(1, ...last7.map((d) => d.seconds));
  const average = stats.daysStudied ? Math.round(stats.totalSeconds / stats.daysStudied) : 0;

  if (loading || stats.totalSeconds === 0) return null;

  return (
    <div className="mb-6 rounded-2xl border bg-card p-4 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10">
            <Clock className="h-4 w-4 text-sky-600 dark:text-sky-400" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Time studied</p>
            <p className="font-display text-lg font-bold">
              {formatDuration(stats.todaySeconds)} today · {formatDuration(stats.weekSeconds)} this week
            </p>
          </div>
        </div>
        <div className="flex gap-6 text-sm">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">All time</p>
            <p className="font-display font-bold">{formatDuration(stats.totalSeconds)}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Daily average</p>
            <p className="font-display font-bold">{formatDuration(average)}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Days studied</p>
            <p className="font-display font-bold">{stats.daysStudied}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex h-16 items-end gap-2">
        {last7.map((d) => (
          <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={`w-full rounded-sm ${d.seconds > 0 ? "bg-sky-500/70" : "bg-muted"}`}
              style={{ height: `${Math.max(4, (d.seconds / best) * 46)}px` }}
              title={`${dayLabel(d.date)}: ${formatDuration(d.seconds)}`}
            />
            <span className="text-[10px] text-muted-foreground">{dayLabel(d.date)}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Active time only — counting pauses when you are idle or the tab is hidden.
      </p>
    </div>
  );
}
