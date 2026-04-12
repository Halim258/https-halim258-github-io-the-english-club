import { useState, useEffect, useMemo } from "react";
import { Flame } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export default function StudyStreakCalendar() {
  const { user } = useAuth();
  const [activityDates, setActivityDates] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;
    async function load() {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 90);

      const { data } = await supabase
        .from("lesson_progress")
        .select("completed_at")
        .eq("user_id", user!.id)
        .eq("completed", true)
        .gte("completed_at", thirtyDaysAgo.toISOString());

      if (data) {
        const dates = new Set(data.map(d => d.completed_at?.split("T")[0]).filter(Boolean) as string[]);
        setActivityDates(dates);
      }
    }
    load();
  }, [user]);

  const weeks = useMemo(() => {
    const result: { date: string; level: number; day: number }[][] = [];
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - 83); // ~12 weeks
    start.setDate(start.getDate() - start.getDay()); // Start on Sunday

    let week: { date: string; level: number; day: number }[] = [];
    const current = new Date(start);

    while (current <= today) {
      const dateStr = current.toISOString().split("T")[0];
      const isActive = activityDates.has(dateStr);
      const isFuture = current > today;

      week.push({
        date: dateStr,
        level: isFuture ? -1 : isActive ? 2 : 0,
        day: current.getDay(),
      });

      if (current.getDay() === 6) {
        result.push(week);
        week = [];
      }
      current.setDate(current.getDate() + 1);
    }
    if (week.length > 0) result.push(week);

    return result;
  }, [activityDates]);

  const activeDays = activityDates.size;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold font-display flex items-center gap-2">
          <Flame className="h-4 w-4 text-orange-500" />
          Study Activity
        </h2>
        <span className="text-[10px] text-muted-foreground font-medium">
          {activeDays} active days
        </span>
      </div>

      {/* Month labels */}
      <div className="flex gap-0.5 mb-1 ml-6 text-[9px] text-muted-foreground">
        {weeks.filter((_, i) => i % 4 === 0).map((week, i) => {
          const d = new Date(week[0]?.date || "");
          return <span key={i} className="w-[52px] text-center">{months[d.getMonth()]}</span>;
        })}
      </div>

      {/* Grid */}
      <div className="flex gap-0.5">
        {/* Day labels */}
        <div className="flex flex-col gap-0.5 mr-1 text-[9px] text-muted-foreground">
          {["", "M", "", "W", "", "F", ""].map((d, i) => (
            <div key={i} className="h-[12px] w-4 flex items-center justify-end pr-0.5">{d}</div>
          ))}
        </div>

        {/* Weeks */}
        <div className="flex gap-0.5 overflow-x-auto">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              {week.map((day) => (
                <div
                  key={day.date}
                  title={`${day.date}: ${day.level > 0 ? "Active" : "No activity"}`}
                  className={`h-[12px] w-[12px] rounded-[2px] transition-colors ${
                    day.level === -1 ? "bg-transparent" :
                    day.level === 0 ? "bg-muted dark:bg-muted/50" :
                    "bg-emerald-500 dark:bg-emerald-400"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1 mt-3 justify-end text-[9px] text-muted-foreground">
        <span>Less</span>
        <div className="h-[10px] w-[10px] rounded-[2px] bg-muted" />
        <div className="h-[10px] w-[10px] rounded-[2px] bg-emerald-500/50" />
        <div className="h-[10px] w-[10px] rounded-[2px] bg-emerald-500" />
        <span>More</span>
      </div>
    </div>
  );
}
