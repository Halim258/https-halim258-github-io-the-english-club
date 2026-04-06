import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface CourseProgress {
  completed: number;
  total: number;
  percentage: number;
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
        .select("level_id, lesson_number")
        .eq("user_id", user.id)
        .eq("completed", true)
        .in("level_id", levelIds);

      if (error) {
        console.error("Failed to fetch progress:", error);
        setLoading(false);
        return;
      }

      const completedByLevel: Record<string, Set<number>> = {};
      (data || []).forEach((row) => {
        if (!completedByLevel[row.level_id]) {
          completedByLevel[row.level_id] = new Set();
        }
        completedByLevel[row.level_id].add(row.lesson_number);
      });

      const result: Record<string, CourseProgress> = {};
      levelIds.forEach((id) => {
        const completed = completedByLevel[id]?.size || 0;
        const total = lessonCounts[id] || 0;
        result[id] = {
          completed,
          total,
          percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
        };
      });

      setProgress(result);
      setLoading(false);
    };

    fetchProgress();
  }, [user, levelIds.join(",")]);

  return { progress, loading };
}
