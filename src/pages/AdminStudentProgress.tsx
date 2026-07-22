import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, Download, FileText, Loader2, BookOpen, Trophy, Flame,
  Target, Calendar, CheckCircle2, XCircle, Award, TrendingUp
} from "lucide-react";
import jsPDF from "jspdf";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface LessonRow {
  id: string;
  level_id: string;
  lesson_number: number;
  completed: boolean;
  score: number | null;
  completed_at: string | null;
  created_at: string;
}

interface XPRow {
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
}

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}

const LEVEL_LABELS: Record<string, string> = {
  reading: "Reading", a1: "A1", a2: "A2", b1: "B1", b2: "B2",
  c1: "C1", c2: "C2", conversation: "Conversation", business: "Business",
  kids: "Kids", healthcare: "Healthcare",
};
const levelLabel = (id: string) => LEVEL_LABELS[id] || id.toUpperCase();

export default function AdminStudentProgress() {
  const { userId = "" } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [xp, setXp] = useState<XPRow | null>(null);
  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [badges, setBadges] = useState<{ badge_key: string; earned_at: string }[]>([]);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      setLoading(true);
      const [{ data: p }, { data: sign }, { data: x }, { data: lp }, { data: ach }] = await Promise.all([
        supabase.from("profiles").select("id, full_name, avatar_url").eq("id", userId).maybeSingle(),
        supabase.rpc("get_recent_signups", { _limit: 500 }),
        supabase.from("user_xp").select("total_xp, current_streak, longest_streak, last_activity_date").eq("user_id", userId).maybeSingle(),
        supabase.from("lesson_progress").select("*").eq("user_id", userId).order("completed_at", { ascending: false }),
        supabase.from("achievements").select("badge_key, earned_at").eq("user_id", userId).order("earned_at", { ascending: false }),
      ]);
      setProfile(p as Profile | null);
      const match = (sign as any[] | null)?.find(s => s.id === userId);
      setEmail(match?.email ?? null);
      setXp((x as XPRow | null) ?? { total_xp: 0, current_streak: 0, longest_streak: 0, last_activity_date: null });
      setLessons((lp as LessonRow[]) || []);
      setBadges((ach as any[]) || []);
      setLoading(false);
    })();
  }, [userId]);

  const stats = useMemo(() => {
    const completed = lessons.filter(l => l.completed);
    const scored = completed.filter(l => typeof l.score === "number");
    const avg = scored.length
      ? Math.round(scored.reduce((s, l) => s + (l.score || 0), 0) / scored.length)
      : 0;
    const perfect = scored.filter(l => (l.score || 0) >= 100).length;
    return {
      totalCompleted: completed.length,
      totalAttempted: lessons.length,
      avgScore: avg,
      perfect,
    };
  }, [lessons]);

  const byLevel = useMemo(() => {
    const groups = new Map<string, LessonRow[]>();
    lessons.forEach(l => {
      const arr = groups.get(l.level_id) || [];
      arr.push(l);
      groups.set(l.level_id, arr);
    });
    return Array.from(groups.entries())
      .map(([level, rows]) => {
        const done = rows.filter(r => r.completed);
        const scored = done.filter(r => typeof r.score === "number");
        const avg = scored.length ? Math.round(scored.reduce((s, r) => s + (r.score || 0), 0) / scored.length) : 0;
        return {
          level,
          total: rows.length,
          completed: done.length,
          avgAccuracy: avg,
          rows: rows.sort((a, b) => a.lesson_number - b.lesson_number),
        };
      })
      .sort((a, b) => a.level.localeCompare(b.level));
  }, [lessons]);

  // 12-week completion cadence — one bar per ISO week, most recent on the right.
  const weeklyCadence = useMemo(() => {
    const WEEKS = 12;
    const buckets = Array.from({ length: WEEKS }, () => 0);
    const now = new Date();
    const startOfWeek = (d: Date) => {
      const x = new Date(d);
      const day = (x.getDay() + 6) % 7; // Monday = 0
      x.setDate(x.getDate() - day);
      x.setHours(0, 0, 0, 0);
      return x;
    };
    const thisWeekStart = startOfWeek(now).getTime();
    lessons.forEach((l) => {
      if (!l.completed || !l.completed_at) return;
      const t = new Date(l.completed_at).getTime();
      const weeksAgo = Math.floor((thisWeekStart - startOfWeek(new Date(t)).getTime()) / (7 * 86400000));
      if (weeksAgo >= 0 && weeksAgo < WEEKS) buckets[WEEKS - 1 - weeksAgo] += 1;
    });
    const max = Math.max(1, ...buckets);
    return { buckets, max };
  }, [lessons]);

  const displayName = profile?.full_name || email || "Student";

  const downloadCSV = () => {
    const headers = ["Course", "Lesson #", "Completed", "Score (%)", "Completed at", "Started at"];
    const rows = lessons.map(l => [
      levelLabel(l.level_id),
      l.lesson_number,
      l.completed ? "Yes" : "No",
      l.score ?? "",
      l.completed_at ? new Date(l.completed_at).toISOString() : "",
      new Date(l.created_at).toISOString(),
    ]);
    const csv = [
      `Student progress report,${displayName}`,
      `Generated,${new Date().toISOString()}`,
      `Total XP,${xp?.total_xp ?? 0}`,
      `Lessons completed,${stats.totalCompleted}`,
      `Average accuracy,${stats.avgScore}%`,
      "",
      headers.join(","),
      ...rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `progress-${displayName.replace(/\s+/g, "_")}-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const margin = 40;
      let y = margin;

      doc.setFontSize(20); doc.setFont("helvetica", "bold");
      doc.text("Student Progress Report", margin, y); y += 26;

      doc.setFontSize(11); doc.setFont("helvetica", "normal");
      doc.text(`Student: ${displayName}`, margin, y); y += 16;
      if (email) { doc.text(`Email: ${email}`, margin, y); y += 16; }
      doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y); y += 22;

      doc.setFont("helvetica", "bold"); doc.text("Summary", margin, y); y += 16;
      doc.setFont("helvetica", "normal");
      const summary = [
        `Total XP: ${xp?.total_xp ?? 0}`,
        `Current streak: ${xp?.current_streak ?? 0} days`,
        `Longest streak: ${xp?.longest_streak ?? 0} days`,
        `Lessons completed: ${stats.totalCompleted}`,
        `Average exercise accuracy: ${stats.avgScore}%`,
        `Perfect scores: ${stats.perfect}`,
        `Badges earned: ${badges.length}`,
        `Last active: ${xp?.last_activity_date ?? "Never"}`,
      ];
      summary.forEach(line => { doc.text(line, margin, y); y += 14; });
      y += 8;

      byLevel.forEach(group => {
        if (y > 750) { doc.addPage(); y = margin; }
        doc.setFont("helvetica", "bold");
        doc.text(`${levelLabel(group.level)}  —  ${group.completed}/${group.total} lessons, ${group.avgAccuracy}% avg`, margin, y);
        y += 14;
        doc.setFont("helvetica", "normal"); doc.setFontSize(10);
        group.rows.forEach(r => {
          if (y > 800) { doc.addPage(); y = margin; }
          const status = r.completed ? "✓" : "•";
          const score = typeof r.score === "number" ? ` — ${r.score}%` : "";
          const when = r.completed_at ? ` (${new Date(r.completed_at).toLocaleDateString()})` : "";
          doc.text(`  ${status} Lesson ${r.lesson_number}${score}${when}`, margin, y);
          y += 12;
        });
        doc.setFontSize(11);
        y += 8;
      });

      doc.save(`progress-${displayName.replace(/\s+/g, "_")}-${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (e: any) {
      toast({ title: "PDF export failed", description: e.message, variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const kpis = [
    { icon: BookOpen, label: "Lessons completed", value: stats.totalCompleted, color: "text-blue-500" },
    { icon: Target, label: "Avg accuracy", value: `${stats.avgScore}%`, color: "text-emerald-500" },
    { icon: Trophy, label: "Total XP", value: (xp?.total_xp ?? 0).toLocaleString(), color: "text-amber-500" },
    { icon: Flame, label: "Current streak", value: `${xp?.current_streak ?? 0}d`, color: "text-orange-500" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin?tab=reports"><ArrowLeft className="h-4 w-4 mr-1" /> Back to reports</Link>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={downloadCSV}>
            <Download className="h-4 w-4 mr-1.5" /> CSV
          </Button>
          <Button size="sm" onClick={downloadPDF}>
            <FileText className="h-4 w-4 mr-1.5" /> PDF report
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-soft">
        {profile?.avatar_url ? (
          <img src={profile.avatar_url} alt="" className="h-16 w-16 rounded-full object-cover" />
        ) : (
          <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
            {(displayName).slice(0, 2).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <h1 className="text-xl font-bold font-display truncate">{displayName}</h1>
          {email && <p className="text-sm text-muted-foreground truncate">{email}</p>}
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <Calendar className="h-3 w-3" /> Last active: {xp?.last_activity_date || "Never"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map(k => (
          <div key={k.label} className="rounded-2xl border bg-card p-4 shadow-soft">
            <k.icon className={`h-5 w-5 mb-2 ${k.color}`} />
            <p className="text-2xl font-bold font-display">{k.value}</p>
            <p className="text-[11px] text-muted-foreground font-medium">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border bg-card p-5 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" /> Weekly cadence
          </h2>
          <span className="text-[11px] text-muted-foreground">Lessons completed · last 12 weeks</span>
        </div>
        <div className="flex items-end gap-1.5 h-24">
          {weeklyCadence.buckets.map((v, i) => {
            const h = Math.max(2, Math.round((v / weeklyCadence.max) * 100));
            const isCurrent = i === weeklyCadence.buckets.length - 1;
            return (
              <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1" title={`${v} lesson${v === 1 ? "" : "s"}`}>
                <span className={`text-[9px] tabular-nums ${v > 0 ? "text-foreground" : "text-muted-foreground/40"}`}>{v || ""}</span>
                <div
                  className={`w-full rounded-t ${isCurrent ? "bg-primary" : v > 0 ? "bg-primary/50" : "bg-muted"}`}
                  style={{ height: `${h}%` }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {badges.length > 0 && (
        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Award className="h-4 w-4 text-amber-500" /> Badges ({badges.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            {badges.map(b => (
              <span key={b.badge_key} className="rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs px-3 py-1 font-medium">
                {b.badge_key.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" /> Lesson-by-lesson progress
        </h2>
        {byLevel.length === 0 ? (
          <div className="rounded-xl border bg-card p-10 text-center text-sm text-muted-foreground">
            This student hasn't started any lessons yet.
          </div>
        ) : (
          byLevel.map(group => (
            <div key={group.level} className="rounded-2xl border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                <div>
                  <h3 className="font-semibold">{levelLabel(group.level)}</h3>
                  <p className="text-xs text-muted-foreground">
                    {group.completed}/{group.total} lessons · avg accuracy {group.avgAccuracy}%
                  </p>
                </div>
                <div className="w-40">
                  <Progress value={group.total ? (group.completed / group.total) * 100 : 0} className="h-2" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground border-b">
                      <th className="py-2 pr-3 font-medium">Lesson</th>
                      <th className="py-2 pr-3 font-medium">Status</th>
                      <th className="py-2 pr-3 font-medium">Exercise accuracy</th>
                      <th className="py-2 pr-3 font-medium">Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.rows.map(r => (
                      <tr key={r.id} className="border-b last:border-0">
                        <td className="py-2 pr-3 font-medium">Lesson {r.lesson_number}</td>
                        <td className="py-2 pr-3">
                          {r.completed ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 text-xs">
                              <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-muted-foreground text-xs">
                              <XCircle className="h-3.5 w-3.5" /> In progress
                            </span>
                          )}
                        </td>
                        <td className="py-2 pr-3">
                          {typeof r.score === "number" ? (
                            <div className="flex items-center gap-2">
                              <span className={`font-semibold ${r.score >= 80 ? "text-emerald-600" : r.score >= 50 ? "text-amber-600" : "text-red-600"}`}>
                                {r.score}%
                              </span>
                              <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className={`h-full ${r.score >= 80 ? "bg-emerald-500" : r.score >= 50 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${r.score}%` }} />
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-xs">—</span>
                          )}
                        </td>
                        <td className="py-2 pr-3 text-xs text-muted-foreground">
                          {r.completed_at ? new Date(r.completed_at).toLocaleDateString() : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}