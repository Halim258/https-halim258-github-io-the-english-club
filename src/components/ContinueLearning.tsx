import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { lessons as allLessons } from "@/data/lessons";
import CourseProgress from "@/components/CourseProgress";
import { useProgressEvents } from "@/lib/progress-events";
import { getLevelMinutes, useStudyTimeVersion } from "@/lib/study-time";
import { getLessonPosition, getLastLessonKey } from "@/lib/lesson-position";
import { hydrateSlideProgressFromCloud, getSlideProgress } from "@/hooks/useSlideProgress";

export default function ContinueLearning() {
  const { user } = useAuth();
  const timeVersion = useStudyTimeVersion();
  const [next, setNext] = useState<{
    level_id: string;
    lesson_number: number;
    fresh: boolean;
    completed: number;
    total: number;
    title?: string;
    avgAccuracy?: number;
    tab?: string;
    card?: number;
  } | null>(null);

  const buildFor = (
    rawLevelId: string,
    lesson_number: number,
    completed: number,
    fresh: boolean,
    avgAccuracy?: number
  ) => {
    const level_id = (rawLevelId || "").toLowerCase();
    const total = Object.keys(allLessons).filter((k) => k.startsWith(`${level_id}-`)).length;
    const key = `${level_id}-${lesson_number}`;
    const pos = getLessonPosition(key);
    return {
      level_id,
      lesson_number,
      fresh,
      completed,
      total,
      title: (allLessons as any)[key]?.title,
      avgAccuracy,
      tab: pos?.tab,
      card: pos?.card,
    };
  };

  /** Split a lesson key like "a1-3" or "ar-draw-4-2" into level + lesson number. */
  const splitKey = (lessonKey: string) => {
    const idx = lessonKey.lastIndexOf("-");
    if (idx <= 0) return null;
    const level = lessonKey.slice(0, idx);
    const num = Number(lessonKey.slice(idx + 1));
    if (!Number.isFinite(num) || num <= 0) return null;
    return { level, num };
  };

  const refresh = () => {
    if (!user) {
      setNext(buildFor("a1", 1, 0, true));
      return;
    }

    const applyFromCompletions = async () => {
      const { data } = await supabase
        .from("lesson_progress")
        .select("level_id, lesson_number, completed, completed_at, score")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false, nullsFirst: false });
      if (!data || data.length === 0) {
        setNext(buildFor("a1", 1, 0, true));
        return;
      }
      const level = data[0].level_id;
      const completedInLevel = new Set(
        data.filter((r) => r.level_id === level && r.completed).map((r) => r.lesson_number)
      );
      let n = 1;
      while (completedInLevel.has(n)) n++;
      const scored = data.filter((r) => r.level_id === level && r.completed && typeof r.score === "number");
      const avgAccuracy = scored.length
        ? Math.round(scored.reduce((s, r: any) => s + (r.score || 0), 0) / scored.length)
        : undefined;
      setNext(buildFor(level, n, completedInLevel.size, false, avgAccuracy));
    };

    void (async () => {
      // 1) Most recent in-progress lesson (exact card the student left off on).
      await hydrateSlideProgressFromCloud();
      const { data: inProgress } = await supabase
        .from("lesson_slide_progress")
        .select("lesson_key, reached, updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(1);

      const localKey = getLastLessonKey();
      const candidateKey = inProgress?.[0]?.lesson_key || localKey;
      const parsed = candidateKey ? splitKey(candidateKey) : null;

      if (parsed && (allLessons as any)[`${parsed.level.toLowerCase()}-${parsed.num}`]) {
        const { data: done } = await supabase
          .from("lesson_progress")
          .select("lesson_number, completed")
          .eq("user_id", user.id)
          .eq("level_id", parsed.level.toUpperCase());
        const completedCount = (done || []).filter((r) => r.completed).length;
        const isDone = (done || []).some((r) => r.completed && r.lesson_number === parsed.num);
        if (!isDone) {
          const built = buildFor(parsed.level, parsed.num, completedCount, false);
          const cloud = getSlideProgress(`${parsed.level.toLowerCase()}-${parsed.num}`);
          setNext({
            ...built,
            card: built.card ?? (cloud?.reached || 0),
          });
          return;
        }
      }

      // 2) Otherwise: next uncompleted lesson in the most recent level.
      await applyFromCompletions();
    })();
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useProgressEvents(() => refresh());

  if (!next) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="container mx-auto px-4 -mt-6 mb-8 relative z-20"
    >
      <div className="rounded-2xl border bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 p-5 md:p-6 shadow-soft">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Flame className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold font-display">
                {next.fresh ? "Start Learning" : "Continue Learning"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                <span className="font-bold text-foreground uppercase">{next.level_id}</span>
                <span className="mx-1.5">·</span>
                Lesson {next.lesson_number}
                {next.title && <span className="text-muted-foreground/80"> — {next.title}</span>}
              </p>
            </div>
          </div>
          <Link
            to={`/courses/${next.level_id}/${next.lesson_number}${
              next.tab || next.card
                ? `?${new URLSearchParams({
                    ...(next.tab ? { tab: next.tab } : {}),
                    ...(next.card ? { card: String(next.card) } : {}),
                  }).toString()}`
                : ""
            }`}
            className="shrink-0"
          >
            <Button size="sm" className="rounded-full font-semibold gap-1.5 px-5">
              <BookOpen className="h-3.5 w-3.5" /> {next.fresh ? "Start" : "Resume"} <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
        {next.total > 0 && !next.fresh && (
          <CourseProgress
            variant="banner"
            className="mt-4"
            data={{
              completed: next.completed,
              total: next.total,
              nextLesson: next.lesson_number,
              avgAccuracy: next.avgAccuracy,
              minutes: getLevelMinutes(user?.id, next.level_id) || undefined,
            }}
          />
        )}
      </div>
    </motion.section>
  );
}
