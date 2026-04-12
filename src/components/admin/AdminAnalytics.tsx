import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart3, Users, BookOpen, TrendingUp, Trophy, Target, Flame } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface EngagementData {
  totalUsers: number;
  activeThisWeek: number;
  totalLessonsCompleted: number;
  avgLessonsPerUser: number;
  topCourses: { level: string; count: number }[];
  recentCompletions: number;
}

const LEVEL_LABELS: Record<string, string> = {
  reading: "Reading", a1: "A1", a2: "A2", b1: "B1", b2: "B2",
  c1: "C1", c2: "C2", conversation: "Conversation", business: "Business",
  kids: "Kids", healthcare: "Healthcare",
};

export default function AdminAnalytics() {
  const [data, setData] = useState<EngagementData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [usersRes, xpRes, progressRes] = await Promise.all([
        supabase.from("user_roles").select("user_id").eq("role", "student"),
        supabase.from("user_xp").select("user_id, last_activity_date, total_xp"),
        supabase.from("lesson_progress").select("level_id, user_id, completed").eq("completed", true),
      ]);

      const users = usersRes.data || [];
      const xpData = xpRes.data || [];
      const progress = progressRes.data || [];

      // Active this week
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const activeThisWeek = xpData.filter(
        (x) => x.last_activity_date && new Date(x.last_activity_date) >= weekAgo
      ).length;

      // Top courses
      const courseCounts: Record<string, number> = {};
      progress.forEach((p) => {
        courseCounts[p.level_id] = (courseCounts[p.level_id] || 0) + 1;
      });
      const topCourses = Object.entries(courseCounts)
        .map(([level, count]) => ({ level, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);

      // Recent completions (last 7 days approximation)
      const uniqueUsers = new Set(progress.map((p) => p.user_id));

      setData({
        totalUsers: users.length,
        activeThisWeek,
        totalLessonsCompleted: progress.length,
        avgLessonsPerUser: uniqueUsers.size > 0 ? Math.round(progress.length / uniqueUsers.size) : 0,
        topCourses,
        recentCompletions: activeThisWeek,
      });
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-6 w-6 animate-spin rounded-full border-3 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!data) return null;

  const maxCourseCount = Math.max(...data.topCourses.map((c) => c.count), 1);

  const kpiCards = [
    { icon: Users, label: "Total Students", value: data.totalUsers, color: "text-primary" },
    { icon: Flame, label: "Active This Week", value: data.activeThisWeek, color: "text-orange-500" },
    { icon: BookOpen, label: "Lessons Completed", value: data.totalLessonsCompleted, color: "text-blue-500" },
    { icon: Target, label: "Avg Lessons/Student", value: data.avgLessonsPerUser, color: "text-emerald-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold font-display">Student Analytics</h2>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpiCards.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border bg-card p-4 shadow-soft"
          >
            <k.icon className={`h-5 w-5 mb-2 ${k.color}`} />
            <p className="text-2xl font-bold font-display">{k.value.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground font-medium">{k.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Popular Courses Bar Chart */}
      <div className="rounded-2xl border bg-card p-5 shadow-soft">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Trophy className="h-4 w-4 text-primary" /> Most Popular Courses
        </h3>
        <div className="space-y-3">
          {data.topCourses.map((c, i) => {
            const percent = (c.count / maxCourseCount) * 100;
            const label = LEVEL_LABELS[c.level] || c.level.toUpperCase();
            return (
              <motion.div
                key={c.level}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3"
              >
                <span className="text-xs font-bold text-primary w-24 truncate">{label}</span>
                <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full flex items-center justify-end pr-2"
                  >
                    {percent > 15 && (
                      <span className="text-[10px] font-bold text-primary-foreground">{c.count}</span>
                    )}
                  </motion.div>
                </div>
                {percent <= 15 && <span className="text-xs text-muted-foreground font-medium">{c.count}</span>}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Engagement Summary */}
      <div className="rounded-2xl border bg-gradient-to-r from-primary/5 to-accent/5 p-5">
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" /> Engagement Summary
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Engagement Rate</p>
            <p className="text-lg font-bold font-display">
              {data.totalUsers > 0 ? Math.round((data.activeThisWeek / data.totalUsers) * 100) : 0}%
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Completion Density</p>
            <p className="text-lg font-bold font-display">
              {data.avgLessonsPerUser} lessons/student
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
