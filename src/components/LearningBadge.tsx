import { useEffect, useMemo, useState } from "react";
import { Award, BookOpen, Clock, Flame, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { learningRank, LEARNING_RANKS } from "@/lib/learning-rank";

type Props = {
  /** Show the compact pill only (for headers and lists). */
  compact?: boolean;
  /** Provide stats directly to skip fetching. */
  stats?: { lessonsCompleted: number; totalXp: number; currentStreak: number; studyMinutes: number };
  className?: string;
};

type Stats = NonNullable<Props["stats"]>;

/** Badge that shows how much a student has learned so far. */
export default function LearningBadge({ compact = false, stats, className = "" }: Props) {
  const { user } = useAuth();
  const [fetched, setFetched] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(!stats);

  useEffect(() => {
    if (stats || !user) return;
    let active = true;
    (async () => {
      const [lessons, xp, study] = await Promise.all([
        supabase.from("lesson_progress").select("id").eq("user_id", user.id).eq("completed", true),
        supabase.from("user_xp").select("total_xp, current_streak").eq("user_id", user.id).maybeSingle(),
        supabase.from("study_time").select("seconds").eq("user_id", user.id),
      ]);
      if (!active) return;
      const seconds = (study.data ?? []).reduce((sum, r) => sum + (r.seconds ?? 0), 0);
      setFetched({
        lessonsCompleted: lessons.data?.length ?? 0,
        totalXp: xp.data?.total_xp ?? 0,
        currentStreak: xp.data?.current_streak ?? 0,
        studyMinutes: Math.round(seconds / 60),
      });
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [user, stats]);

  const data = stats ?? fetched;
  const result = useMemo(
    () => learningRank(data ?? { lessonsCompleted: 0, totalXp: 0, currentStreak: 0, studyMinutes: 0 }),
    [data],
  );

  if (!user || loading || !data) return null;

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-2 border px-2.5 py-1 text-xs font-semibold ${result.rank.medal} ${className}`}
        title={`${result.rank.name} — ${result.rank.tagline}`}
      >
        <Award className="h-3.5 w-3.5" />
        {result.rank.name}
      </span>
    );
  }

  const facts = [
    { icon: BookOpen, label: "Lessons", value: data.lessonsCompleted.toLocaleString() },
    { icon: Zap, label: "XP", value: data.totalXp.toLocaleString() },
    { icon: Flame, label: "Streak", value: `${data.currentStreak}d` },
    { icon: Clock, label: "Study time", value: `${Math.floor(data.studyMinutes / 60)}h ${data.studyMinutes % 60}m` },
  ];

  return (
    <section className={`border border-border bg-card ${className}`} aria-label="Your learning badge">
      <div className="flex flex-wrap items-center gap-4 border-b border-border p-4 sm:p-5">
        <div className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center border ${result.rank.medal}`}>
          <Award className="h-5 w-5" />
          <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wide">Lv {result.level}</span>
        </div>
        <div className="min-w-[180px] flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Learning badge</p>
          <h2 className="font-display text-xl font-bold leading-tight">{result.rank.name}</h2>
          <p className="text-sm text-muted-foreground">{result.rank.tagline}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl font-bold tabular-nums">{result.points.toLocaleString()}</p>
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Learning points</p>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Level {result.level} of {result.totalLevels}
          </span>
          <span>
            {result.next
              ? `${result.pointsToNext.toLocaleString()} points to ${result.next.name}`
              : "Highest badge reached"}
          </span>
        </div>
        <div className="h-2 w-full bg-muted" role="progressbar" aria-valuenow={result.progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-primary transition-all" style={{ width: `${result.progress}%` }} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="bg-card p-3">
              <f.icon className="mb-1 h-4 w-4 text-primary" />
              <p className="font-display text-base font-bold tabular-nums">{f.value}</p>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{f.label}</p>
            </div>
          ))}
        </div>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {LEARNING_RANKS.map((r, i) => (
            <li
              key={r.key}
              className={`border px-2 py-0.5 text-[11px] font-semibold ${
                i <= result.level - 1 ? r.medal : "border-border bg-background text-muted-foreground/60"
              }`}
            >
              {r.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
