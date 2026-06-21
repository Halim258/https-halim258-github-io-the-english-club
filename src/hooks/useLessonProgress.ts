import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

export function useLessonProgress() {
  const { user } = useAuth();

  const markComplete = useCallback(
    async (levelId: string, lessonNumber: number, score?: number) => {
      if (!user) return;

      const { data, error } = await (supabase as any).rpc("complete_lesson", {
        _level_id: levelId,
        _lesson_number: lessonNumber,
        _score: score ?? null,
      });

      if (error) {
        console.error("Failed to save progress:", error);
        return;
      }

      const xpAmount = Array.isArray(data) ? data[0]?.xp_earned ?? 0 : 0;

      toast({
        title: "🎉 Lesson Complete!",
        description: xpAmount > 0 ? `+${xpAmount} XP earned` : "Progress saved",
      });
    },
    [user]
  );

  return { markComplete };
}
