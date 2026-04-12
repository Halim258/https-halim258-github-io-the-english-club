import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, CheckCircle2, Flame, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const GOAL_OPTIONS = [3, 5, 7, 10, 15];

export default function StudyGoals() {
  const { user } = useAuth();
  const [weeklyGoal, setWeeklyGoal] = useState<number>(() => {
    const saved = localStorage.getItem("study-goal");
    return saved ? parseInt(saved) : 5;
  });
  const [lessonsThisWeek, setLessonsThisWeek] = useState(0);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const { data } = await supabase
        .from("lesson_progress")
        .select("id")
        .eq("user_id", user!.id)
        .eq("completed", true)
        .gte("completed_at", weekAgo.toISOString());
      setLessonsThisWeek(data?.length || 0);
    }
    load();
  }, [user]);

  const handleSetGoal = (goal: number) => {
    setWeeklyGoal(goal);
    localStorage.setItem("study-goal", goal.toString());
    setEditing(false);
    toast.success(`Weekly goal set to ${goal} lessons!`);
  };

  const progress = Math.min((lessonsThisWeek / weeklyGoal) * 100, 100);
  const goalReached = lessonsThisWeek >= weeklyGoal;

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold font-display flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" /> Weekly Goal
        </h3>
        <button
          onClick={() => setEditing(!editing)}
          className="text-[10px] text-primary hover:underline font-medium"
        >
          {editing ? "Cancel" : "Change"}
        </button>
      </div>

      {editing ? (
        <div className="flex flex-wrap gap-2">
          {GOAL_OPTIONS.map((g) => (
            <button
              key={g}
              onClick={() => handleSetGoal(g)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                weeklyGoal === g
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {g} lessons
            </button>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">
              {lessonsThisWeek} / {weeklyGoal} lessons
            </span>
            {goalReached && (
              <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3 w-3" /> Goal reached!
              </span>
            )}
          </div>
          <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8 }}
              className={`h-full rounded-full ${
                goalReached
                  ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                  : "bg-gradient-to-r from-primary/80 to-primary"
              }`}
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">
            {goalReached
              ? "🎉 Great job this week! Keep the momentum going."
              : `${weeklyGoal - lessonsThisWeek} more lesson${weeklyGoal - lessonsThisWeek !== 1 ? "s" : ""} to reach your goal!`}
          </p>
        </div>
      )}
    </div>
  );
}
