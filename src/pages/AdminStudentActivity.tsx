import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, BookOpen, Flame, Search, ArrowRight, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Row {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  total_xp: number;
  current_streak: number;
  completed_count: number;
  last_level: string | null;
  last_lesson: number | null;
  last_activity: string | null;
}

function timeAgo(date: string | null) {
  if (!date) return "—";
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function AdminStudentActivity() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      const [{ data: xp }, { data: progress }, { data: profiles }] = await Promise.all([
        supabase.from("user_xp").select("user_id,total_xp,current_streak,last_activity_date").order("total_xp", { ascending: false }).limit(200),
        supabase.from("lesson_progress").select("user_id,level_id,lesson_number,completed,completed_at").order("completed_at", { ascending: false }).limit(2000),
        supabase.from("profiles").select("id,full_name,avatar_url").limit(500),
      ]);

      const profMap = new Map((profiles || []).map((p: any) => [p.id, p]));
      const latestByUser = new Map<string, any>();
      const completedByUser = new Map<string, number>();
      for (const lp of progress || []) {
        if (lp.completed) completedByUser.set(lp.user_id, (completedByUser.get(lp.user_id) || 0) + 1);
        if (!latestByUser.has(lp.user_id)) latestByUser.set(lp.user_id, lp);
      }

      const built: Row[] = (xp || []).map((x: any) => {
        const p = profMap.get(x.user_id) as any;
        const l = latestByUser.get(x.user_id);
        return {
          user_id: x.user_id,
          full_name: p?.full_name || null,
          avatar_url: p?.avatar_url || null,
          total_xp: x.total_xp || 0,
          current_streak: x.current_streak || 0,
          completed_count: completedByUser.get(x.user_id) || 0,
          last_level: l?.level_id || null,
          last_lesson: l?.lesson_number || null,
          last_activity: l?.completed_at || x.last_activity_date || null,
        };
      });

      setRows(built);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    if (!q.trim()) return rows;
    const s = q.toLowerCase();
    return rows.filter(r => (r.full_name || "").toLowerCase().includes(s));
  }, [rows, q]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
          <Activity className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">Student Activity Leaderboard</h1>
          <p className="text-sm text-muted-foreground">See what and where each student is studying — click a row for full progress.</p>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search students by name..."
          className="w-full rounded-xl border bg-card pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="rounded-2xl border bg-card overflow-hidden">
        <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-4 py-3 bg-muted/40 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          <span>#</span><span>Student</span><span>XP</span><span>Streak</span><span>Lessons</span><span>Last studied</span>
        </div>
        {filtered.length === 0 && (
          <div className="p-10 text-center text-sm text-muted-foreground">No students found.</div>
        )}
        {filtered.map((r, i) => (
          <motion.div
            key={r.user_id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i, 20) * 0.02 }}
          >
            <Link
              to={`/admin/students/${r.user_id}/progress`}
              className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_auto_auto_auto_auto] gap-3 md:gap-4 items-center px-4 py-3 border-t hover:bg-muted/40 transition-colors group"
            >
              <span className={`text-sm font-bold w-6 text-center ${i < 3 ? "text-amber-500" : "text-muted-foreground"}`}>
                {i < 3 ? <Trophy className="h-4 w-4 mx-auto" /> : i + 1}
              </span>
              <div className="min-w-0 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0 overflow-hidden">
                  {r.avatar_url ? <img src={r.avatar_url} alt="" className="h-full w-full object-cover" /> : (r.full_name || "?")[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{r.full_name || "Unnamed"}</p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {r.last_level ? <>Last: <span className="font-medium uppercase">{r.last_level}</span> · Lesson {r.last_lesson}</> : "No lessons yet"}
                  </p>
                </div>
              </div>
              <span className="hidden md:inline text-sm font-bold tabular-nums text-primary">{r.total_xp}</span>
              <span className="hidden md:inline-flex items-center gap-1 text-sm font-semibold tabular-nums">
                <Flame className="h-3.5 w-3.5 text-orange-500" /> {r.current_streak}
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-sm font-semibold tabular-nums">
                <BookOpen className="h-3.5 w-3.5 text-muted-foreground" /> {r.completed_count}
              </span>
              <span className="text-[11px] text-muted-foreground whitespace-nowrap flex items-center gap-1">
                {timeAgo(r.last_activity)}
                <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}