import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

export function useLessonProgress() {
  const { user } = useAuth();

  const markComplete = useCallback(
    async (levelId: string, lessonNumber: number, score?: number) => {
      if (!user) return;

      // Upsert lesson progress
      const { error } = await supabase.from("lesson_progress").upsert(
        {
          user_id: user.id,
          level_id: levelId,
          lesson_number: lessonNumber,
          completed: true,
          completed_at: new Date().toISOString(),
          score: score ?? null,
        },
        { onConflict: "user_id,level_id,lesson_number" }
      );

      if (error) {
        console.error("Failed to save progress:", error);
        return;
      }

      // Award XP
      const xpAmount = score ? Math.max(10, Math.round(score / 2)) : 15;
      const today = new Date().toISOString().split("T")[0];

      const { data: existing } = await supabase
        .from("user_xp")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (existing) {
        const lastDate = existing.last_activity_date;
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        const isConsecutive = lastDate === yesterday;
        const isSameDay = lastDate === today;

        const newStreak = isSameDay
          ? existing.current_streak
          : isConsecutive
          ? existing.current_streak + 1
          : 1;

        await supabase
          .from("user_xp")
          .update({
            total_xp: existing.total_xp + xpAmount,
            current_streak: newStreak,
            longest_streak: Math.max(existing.longest_streak, newStreak),
            last_activity_date: today,
          })
          .eq("user_id", user.id);
      } else {
        await supabase.from("user_xp").insert({
          user_id: user.id,
          total_xp: xpAmount,
          current_streak: 1,
          longest_streak: 1,
          last_activity_date: today,
        });
      }

      toast({
        title: "🎉 Lesson Complete!",
        description: `+${xpAmount} XP earned`,
      });
    },
    [user]
  );

  return { markComplete };
}
