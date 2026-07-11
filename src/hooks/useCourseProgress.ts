import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getSlideProgress } from "@/hooks/useSlideProgress";

interface CourseProgress {
  completed: number;
  total: number;
  percentage: number;
  /** Highest lesson_number the student most recently touched (completed or opened). */
  lastLesson?: number;
  /** ISO timestamp of the last activity on this course. */
  lastAt?: string;
}

export function useCourseProgress(levelIds: string[], lessonCounts: Record<string, number>) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Record<string, CourseProgress>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || levelIds.length === 0) {
      setLoading(false);
      return;
    }

    const fetchProgress = async () => {
      const { data, error } = await supabase
        .from("lesson_progress")
        .select("level_id, lesson_number, completed_at")
        .eq("user_id", user.id)
        .eq("completed", true)
        .in("level_id", levelIds);

      if (error) {
        console.error("Failed to fetch progress:", error);
        setLoading(false);
        return;
      }

      const completedByLevel: Record<string, Set<number>> = {};
      const lastByLevel: Record<string, { lesson: number; at: string }> = {};
      (data || []).forEach((row) => {
        if (!completedByLevel[row.level_id]) {
          completedByLevel[row.level_id] = new Set();
        }
        completedByLevel[row.level_id].add(row.lesson_number);
        const at = (row as any).completed_at ?? null;
        if (at) {
          const prev = lastByLevel[row.level_id];
          if (!prev || new Date(at).getTime() > new Date(prev.at).getTime()) {
            lastByLevel[row.level_id] = { lesson: row.lesson_number, at };
          }
        }
      });

      // Merge in in-progress signals from local slide tracker (per-lesson).
      levelIds.forEach((levelId) => {
        const totalKnown = lessonCounts[levelId] ?? 0;
        const scanUpTo = Math.max(totalKnown, 40);
        for (let n = 1; n <= scanUpTo; n++) {
          const sp = getSlideProgress(`${levelId}-${n}`);
          if (!sp) continue;
          const iso = new Date(sp.updatedAt).toISOString();
          const prev = lastByLevel[levelId];
          if (!prev || sp.updatedAt > new Date(prev.at).getTime()) {
            lastByLevel[levelId] = { lesson: n, at: iso };
          }
        }
      });

      const result: Record<string, CourseProgress> = {};
      levelIds.forEach((id) => {
        const completed = completedByLevel[id]?.size || 0;
        const total = lessonCounts[id] || 0;
        const last = lastByLevel[id];
        result[id] = {
          completed,
          total,
          percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
          lastLesson: last?.lesson,
          lastAt: last?.at,
        };
      });

      setProgress(result);
      setLoading(false);
    };

    fetchProgress();
  }, [user, levelIds.join(",")]);

  return { progress, loading };
}
