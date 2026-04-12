import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ChevronLeft, Search, BarChart3, BookOpen, Trophy, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { FadeInUp } from "@/components/AnimatedSection";
import { Progress } from "@/components/ui/progress";

interface StudentReport {
  userId: string;
  name: string;
  email: string;
  totalLessons: number;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  badges: number;
  lastActive: string | null;
}

export default function AdminStudentReports() {
  const [reports, setReports] = useState<StudentReport[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [{ data: profiles }, { data: progress }, { data: xp }, { data: achievements }] = await Promise.all([
        supabase.from("profiles").select("id, full_name"),
        supabase.from("lesson_progress").select("user_id, completed").eq("completed", true),
        supabase.from("user_xp").select("user_id, total_xp, current_streak, longest_streak, last_activity_date"),
        supabase.from("achievements").select("user_id"),
      ]);

      const profileMap = new Map((profiles || []).map(p => [p.id, p]));
      const lessonCounts = new Map<string, number>();
      (progress || []).forEach(p => lessonCounts.set(p.user_id, (lessonCounts.get(p.user_id) || 0) + 1));
      const badgeCounts = new Map<string, number>();
      (achievements || []).forEach(a => badgeCounts.set(a.user_id, (badgeCounts.get(a.user_id) || 0) + 1));

      const result: StudentReport[] = (xp || []).map(x => ({
        userId: x.user_id,
        name: profileMap.get(x.user_id)?.full_name || "Unknown",
        email: "",
        totalLessons: lessonCounts.get(x.user_id) || 0,
        totalXp: x.total_xp,
        currentStreak: x.current_streak,
        longestStreak: x.longest_streak,
        badges: badgeCounts.get(x.user_id) || 0,
        lastActive: x.last_activity_date,
      }));

      result.sort((a, b) => b.totalXp - a.totalXp);
      setReports(result);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = reports.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  function exportCSV() {
    const headers = ["Name", "Lessons", "XP", "Streak", "Longest Streak", "Badges", "Last Active"];
    const rows = filtered.map(r => [r.name, r.totalLessons, r.totalXp, r.currentStreak, r.longestStreak, r.badges, r.lastActive || "N/A"]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `student-reports-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-bold font-display flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Student Performance Reports
        </h2>
        <Button variant="outline" size="sm" onClick={exportCSV} className="rounded-full">
          <Download className="h-4 w-4 mr-1.5" /> Export CSV
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search students..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 rounded-full"
        />
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading reports...</div>
      ) : (
        <div className="space-y-2">
          {filtered.map((r, i) => (
            <motion.div
              key={r.userId}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              className="rounded-xl border bg-card p-4 shadow-soft"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-sm">{r.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    Last active: {r.lastActive || "Never"}
                  </p>
                </div>
                <span className="text-sm font-bold text-primary">{r.totalXp.toLocaleString()} XP</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                <div className="rounded-lg bg-muted/30 p-2">
                  <BookOpen className="h-3.5 w-3.5 mx-auto mb-0.5 text-blue-500" />
                  <p className="font-bold text-sm">{r.totalLessons}</p>
                  <p className="text-muted-foreground">Lessons</p>
                </div>
                <div className="rounded-lg bg-muted/30 p-2">
                  <Calendar className="h-3.5 w-3.5 mx-auto mb-0.5 text-orange-500" />
                  <p className="font-bold text-sm">{r.currentStreak}d</p>
                  <p className="text-muted-foreground">Streak</p>
                </div>
                <div className="rounded-lg bg-muted/30 p-2">
                  <Calendar className="h-3.5 w-3.5 mx-auto mb-0.5 text-emerald-500" />
                  <p className="font-bold text-sm">{r.longestStreak}d</p>
                  <p className="text-muted-foreground">Best</p>
                </div>
                <div className="rounded-lg bg-muted/30 p-2">
                  <Trophy className="h-3.5 w-3.5 mx-auto mb-0.5 text-amber-500" />
                  <p className="font-bold text-sm">{r.badges}</p>
                  <p className="text-muted-foreground">Badges</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
