import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, BookOpen, CheckCircle2, ArrowRight, Trophy, Flame, Target, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getLevelMinutes, getTotalMinutes, formatDuration, useStudyTimeVersion } from "@/lib/study-time";

interface LevelProgress {
  level: string;
  label: string;
  completed: number;
  total: number;
  color: string;
  emoji: string;
  avgAccuracy?: number;
  minutes?: number;
}

const LEVELS: Omit<LevelProgress, "completed">[] = [
  { level: "reading", label: "Reading & Vocab", total: 20, color: "from-amber-400 to-amber-600", emoji: "📖" },
  { level: "a1", label: "A1 Beginner", total: 20, color: "from-emerald-400 to-emerald-600", emoji: "🌱" },
  { level: "a2", label: "A2 Elementary", total: 20, color: "from-teal-400 to-teal-600", emoji: "🌿" },
  { level: "b1", label: "B1 Intermediate", total: 20, color: "from-blue-400 to-blue-600", emoji: "📘" },
  { level: "b2", label: "B2 Upper-Intermediate", total: 20, color: "from-indigo-400 to-indigo-600", emoji: "📕" },
  { level: "c1", label: "C1 Advanced", total: 20, color: "from-violet-400 to-violet-600", emoji: "🎓" },
  { level: "c2", label: "C2 Mastery", total: 20, color: "from-purple-400 to-purple-600", emoji: "👑" },
  { level: "conversation", label: "Conversation", total: 40, color: "from-rose-400 to-rose-600", emoji: "💬" },
  { level: "business", label: "Business English", total: 20, color: "from-slate-400 to-slate-600", emoji: "💼" },
  { level: "kids", label: "Kids English", total: 20, color: "from-pink-400 to-pink-600", emoji: "🧒" },
];

export default function CourseProgress() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Array<{ level_id: string; lesson_number: number; score: number | null }>>([]);
  const [loading, setLoading] = useState(true);
  const timeVersion = useStudyTimeVersion();

  useEffect(() => {
    if (!user) return;
    async function load() {
      const { data } = await supabase
        .from("lesson_progress")
        .select("level_id, lesson_number, completed, score")
        .eq("user_id", user!.id)
        .eq("completed", true);
      setRows((data as any) || []);
      setLoading(false);
    }
    load();
  }, [user]);

  const progressData: LevelProgress[] = useMemo(() => {
    void timeVersion;
    return LEVELS.map((l) => {
      const forLevel = rows.filter((r) => r.level_id === l.level);
      const scored = forLevel.filter((r) => typeof r.score === "number");
      const avgAccuracy = scored.length
        ? Math.round(scored.reduce((s, r) => s + (r.score || 0), 0) / scored.length)
        : 0;
      return {
        ...l,
        completed: Math.min(forLevel.length, l.total),
        avgAccuracy,
        minutes: getLevelMinutes(user?.id, l.level),
      };
    });
  }, [rows, timeVersion, user?.id]);

  const totalCompleted = progressData.reduce((s, p) => s + p.completed, 0);
  const totalLessons = progressData.reduce((s, p) => s + p.total, 0);
  const overallPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;
  const scoredAll = rows.filter((r) => typeof r.score === "number");
  const overallAccuracy = scoredAll.length
    ? Math.round(scoredAll.reduce((s, r) => s + (r.score || 0), 0) / scoredAll.length)
    : 0;
  const totalMinutes = getTotalMinutes(user?.id);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-10 pb-24 md:pb-10 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display">My Progress</h1>
            <p className="text-sm text-muted-foreground">{totalCompleted} of {totalLessons} lessons completed</p>
          </div>
        </div>
      </motion.div>

      {/* Overall progress card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border bg-gradient-to-r from-primary/8 via-accent/5 to-primary/8 p-5 mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">Overall Completion</span>
          </div>
          <span className="text-2xl font-bold font-display text-primary">{overallPercent}%</span>
        </div>
        <Progress value={overallPercent} className="h-3 rounded-full" />
        <div className="mt-3 flex items-center gap-4 text-[11px]">
          {scoredAll.length > 0 && (
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
              <Target className="h-3 w-3" /> {overallAccuracy}% avg accuracy
            </span>
          )}
          {totalMinutes > 0 && (
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" /> {formatDuration(totalMinutes)} studied
            </span>
          )}
        </div>
      </motion.div>

      {/* Per-level progress */}
      <div className="space-y-3">
        {progressData.map((p, i) => {
          const percent = p.total > 0 ? Math.round((p.completed / p.total) * 100) : 0;
          const isComplete = p.completed >= p.total;
          return (
            <motion.div
              key={p.level}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={`/courses/${p.level}`}
                className="group flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="text-2xl">{p.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold group-hover:text-primary transition-colors">{p.label}</span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {p.completed}/{p.total}
                      {isComplete && <CheckCircle2 className="inline h-3.5 w-3.5 text-emerald-500 ml-1" />}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                      className={`h-full rounded-full bg-gradient-to-r ${p.color}`}
                    />
                  </div>
                  {(p.avgAccuracy || p.minutes) ? (
                    <div className="mt-1.5 flex items-center gap-3 text-[10px]">
                      {p.avgAccuracy ? (
                        <span className={`inline-flex items-center gap-1 font-semibold tabular-nums ${
                          p.avgAccuracy >= 80 ? "text-emerald-600 dark:text-emerald-400"
                            : p.avgAccuracy >= 50 ? "text-amber-600 dark:text-amber-400"
                              : "text-rose-600 dark:text-rose-400"
                        }`}>
                          <Target className="h-2.5 w-2.5" /> {p.avgAccuracy}% acc
                        </span>
                      ) : null}
                      {p.minutes ? (
                        <span className="inline-flex items-center gap-1 text-muted-foreground tabular-nums">
                          <Clock className="h-2.5 w-2.5" /> {formatDuration(p.minutes)}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
