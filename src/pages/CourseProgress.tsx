import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, BookOpen, CheckCircle2, ArrowRight, Trophy, Flame, Target, Clock, ChevronDown, CircleDashed, PlayCircle } from "lucide-react";
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

type LessonState = "done" | "in-progress" | "not-started";
type Filter = "all" | "done" | "in-progress" | "not-started";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All lessons" },
  { key: "done", label: "Done" },
  { key: "in-progress", label: "In progress" },
  { key: "not-started", label: "Not started" },
];

export default function CourseProgress() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Array<{ level_id: string; lesson_number: number; score: number | null }>>([]);
  const [slides, setSlides] = useState<Array<{ lesson_key: string; reached: number; total: number; updated_at: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [openLevel, setOpenLevel] = useState<string | null>(null);
  const timeVersion = useStudyTimeVersion();

  useEffect(() => {
    if (!user) return;
    async function load() {
      const [progressRes, slidesRes] = await Promise.all([
        supabase
          .from("lesson_progress")
          .select("level_id, lesson_number, completed, score")
          .eq("user_id", user!.id)
          .eq("completed", true),
        supabase
          .from("lesson_slide_progress")
          .select("lesson_key, reached, total, updated_at")
          .eq("user_id", user!.id),
      ]);
      setRows((progressRes.data as any) || []);
      setSlides((slidesRes.data as any) || []);
      setLoading(false);
    }
    load();
  }, [user]);

  /** lesson state lookup: `${level}-${n}` → done / in-progress / not-started */
  const stateFor = useMemo(() => {
    const done = new Set(rows.map((r) => `${r.level_id}-${r.lesson_number}`));
    const started = new Set(
      slides.filter((s) => (s.total ?? 0) > 0 && !done.has(s.lesson_key)).map((s) => s.lesson_key)
    );
    return (key: string): LessonState =>
      done.has(key) ? "done" : started.has(key) ? "in-progress" : "not-started";
  }, [rows, slides]);

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

  const startedCount = useMemo(() => {
    let n = 0;
    LEVELS.forEach((l) => {
      for (let i = 1; i <= l.total; i++) if (stateFor(`${l.level}-${i}`) === "in-progress") n++;
    });
    return n;
  }, [stateFor]);
  const notStartedCount = Math.max(0, totalLessons - totalCompleted - startedCount);


  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 pb-24 md:py-10 md:pb-10">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold md:text-3xl">My Progress</h1>
            <p className="text-sm text-muted-foreground">See what you have done and what to study next.</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 rounded-2xl border bg-gradient-to-r from-primary/8 via-accent/5 to-primary/8 p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2"><Trophy className="h-5 w-5 text-primary" /><span className="text-sm font-semibold">Overall Completion</span></div>
          <span className="font-display text-2xl font-bold text-primary">{overallPercent}%</span>
        </div>
        <Progress value={overallPercent} className="h-3 rounded-full" />
        <div className="mt-4 grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
          <div className="rounded-xl bg-background/60 p-2"><p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{totalCompleted}</p><p className="text-[10px] text-muted-foreground">Completed</p></div>
          <div className="rounded-xl bg-background/60 p-2"><p className="text-lg font-bold text-primary">{startedCount}</p><p className="text-[10px] text-muted-foreground">In progress</p></div>
          <div className="rounded-xl bg-background/60 p-2"><p className="text-lg font-bold text-muted-foreground">{notStartedCount}</p><p className="text-[10px] text-muted-foreground">Not started</p></div>
          <div className="rounded-xl bg-background/60 p-2"><p className="text-lg font-bold text-amber-600 dark:text-amber-400">{overallAccuracy || "—"}{overallAccuracy ? "%" : ""}</p><p className="text-[10px] text-muted-foreground">Avg. accuracy</p></div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground">
          {totalMinutes > 0 && <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {formatDuration(totalMinutes)} studied</span>}
          <span className="inline-flex items-center gap-1"><Flame className="h-3 w-3 text-amber-500" /> Keep your learning streak going</span>
        </div>
      </motion.div>

      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filter lessons by status">
        {FILTERS.map((item) => (
          <Button key={item.key} type="button" variant={filter === item.key ? "default" : "outline"} size="sm" onClick={() => setFilter(item.key)}>
            {item.label}
            <span className="ml-1 text-xs opacity-70">{item.key === "done" ? totalCompleted : item.key === "in-progress" ? startedCount : item.key === "not-started" ? notStartedCount : totalLessons}</span>
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {progressData.map((p, i) => {
          const percent = p.total > 0 ? Math.round((p.completed / p.total) * 100) : 0;
          const isComplete = p.completed >= p.total;
          const lessonRows = Array.from({ length: p.total }, (_, index) => {
            const lessonNumber = index + 1;
            const key = `${p.level}-${lessonNumber}`;
            return { lessonNumber, key, state: stateFor(key) };
          }).filter((lesson) => filter === "all" || lesson.state === filter);
          if (lessonRows.length === 0) return null;
          return (
            <motion.div key={p.level} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="overflow-hidden rounded-2xl border bg-card shadow-soft">
              <Button type="button" variant="ghost" onClick={() => setOpenLevel(openLevel === p.level ? null : p.level)} className="group h-auto w-full justify-start gap-4 rounded-none p-4 text-left hover:bg-muted/40">
                <span className="text-2xl">{p.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex items-center justify-between gap-3"><span className="text-sm font-semibold group-hover:text-primary">{p.label}</span><span className="shrink-0 text-xs font-medium text-muted-foreground">{p.completed}/{p.total} {isComplete && <CheckCircle2 className="ml-1 inline h-3.5 w-3.5 text-emerald-500" />}</span></div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted"><motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 0.6, delay: i * 0.05 }} className={`h-full rounded-full bg-gradient-to-r ${p.color}`} /></div>
                </div>
                {openLevel === p.level ? <ChevronDown className="h-4 w-4 shrink-0 text-primary" /> : <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />}
              </Button>
              {openLevel === p.level && <div className="border-t bg-muted/20 p-3"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {lessonRows.map((lesson) => (
                  <Link key={lesson.key} to={`/lesson/${p.level}/${lesson.lessonNumber}`} className="flex min-h-11 items-center gap-2 rounded-xl border bg-background px-3 py-2 text-xs transition-colors hover:border-primary/50 hover:bg-primary/5">
                    {lesson.state === "done" ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" /> : lesson.state === "in-progress" ? <PlayCircle className="h-4 w-4 shrink-0 text-primary" /> : <CircleDashed className="h-4 w-4 shrink-0 text-muted-foreground" />}
                    <span className="min-w-0 truncate">Lesson {lesson.lessonNumber}</span>
                  </Link>
                ))}
              </div></div>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
