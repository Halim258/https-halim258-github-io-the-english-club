import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { emitLessonProgress } from "@/lib/progress-events";

export function useLessonProgress() {
  const { user } = useAuth();

  const markComplete = useCallback(
    async (levelId: string, lessonNumber: number, score?: number) => {
      if (!user) return;

      // Optimistic: notify UI immediately so bars/pills flip without waiting on network.
      emitLessonProgress({ levelId, lessonNumber, completed: true, score });

      const { data, error } = await supabase.rpc("complete_lesson", {
        _level_id: levelId,
        _lesson_number: lessonNumber,
        _score: score,
      });

      if (error) {
        console.error("Failed to save progress:", error);
        return;
      }

      const xpAmount = Array.isArray(data) ? data[0]?.xp_earned ?? 0 : 0;

      // Confirmed write (may include server-side XP/streak deltas).
      emitLessonProgress({ levelId, lessonNumber, completed: true, score, xpEarned: xpAmount });

      toast({
        title: "🎉 Lesson Complete!",
        description: xpAmount > 0 ? `+${xpAmount} XP earned` : "Progress saved",
      });
    },
    [user]
  );

  return { markComplete };
}
