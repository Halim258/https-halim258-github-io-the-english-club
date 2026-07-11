import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { bucketFor, BUCKET_COLORS, type LanguageBucket } from "@/lib/language-buckets";
import { Users2, Languages, Layers, BarChart3 } from "lucide-react";

type Row = {
  enrollment_id: string;
  group_id: string;
  group_level: string | null;
  group_days: string | null;
  teacher_email: string | null;
  teacher_name: string | null;
  cohort_month: string;
  enrolled_at: string;
  user_id: string;
  student_name: string;
  status: string;
  level_id: string | null;
  completed_count: number;
};

const LESSONS_PER_LEVEL = 20; // approx target lessons per course

function Bar({ pct, color = "bg-primary" }: { pct: number; color?: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div className={`h-full ${color} transition-all`} style={{ width: `${Math.min(100, pct)}%` }} />
    </div>
  );
}

export default function CohortAnalytics() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_cohort_analytics");
      if (error) setErr(error.message);
      else setRows((data as Row[]) || []);
      setLoading(false);
    })();
  }, []);

  const stats = useMemo(() => {
    // Unique enrollments (rows are exploded by level_id via LEFT JOIN)
    const enrollmentMap = new Map<string, Row>();
    rows.forEach((r) => {
      if (!enrollmentMap.has(r.enrollment_id)) enrollmentMap.set(r.enrollment_id, r);
    });
    const enrollments = Array.from(enrollmentMap.values());

    // Total completed per unique (user_id, level_id)
    const completedByLevel = new Map<string, number>();
    const completedByBucket = new Map<LanguageBucket, number>();
    const seenUserLevel = new Set<string>();
    rows.forEach((r) => {
      if (!r.level_id) return;
      const key = `${r.user_id}::${r.level_id}`;
      if (seenUserLevel.has(key)) return;
      seenUserLevel.add(key);
      completedByLevel.set(r.level_id, (completedByLevel.get(r.level_id) || 0) + r.completed_count);
      const b = bucketFor(r.level_id);
      completedByBucket.set(b, (completedByBucket.get(b) || 0) + r.completed_count);
    });

    // Per-group cohort aggregation
    type GroupAgg = {
      group_id: string;
      label: string;
      teacher: string;
      cohort_month: string;
      students: Set<string>;
      approved: number;
      completed: number;
    };
    const byGroup = new Map<string, GroupAgg>();
    enrollments.forEach((e) => {
      const g =
        byGroup.get(e.group_id) ||
        ({
          group_id: e.group_id,
          label: [e.group_level, e.group_days].filter(Boolean).join(" · ") || "Group",
          teacher: e.teacher_name || e.teacher_email || "—",
          cohort_month: e.cohort_month,
          students: new Set<string>(),
          approved: 0,
          completed: 0,
        } as GroupAgg);
      g.students.add(e.user_id);
      if (e.status === "approved") g.approved += 1;
      byGroup.set(e.group_id, g);
    });
    // Sum completed per group across all levels
    rows.forEach((r) => {
      const g = byGroup.get(r.group_id);
      if (g) g.completed += r.completed_count;
    });

    return {
      totalEnrollments: enrollments.length,
      totalStudents: new Set(enrollments.map((e) => e.user_id)).size,
      totalGroups: byGroup.size,
      totalCompleted: Array.from(completedByLevel.values()).reduce((a, b) => a + b, 0),
      byLevel: Array.from(completedByLevel.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12),
      byBucket: (["MSA", "Egyptian", "Quran", "English", "Other"] as LanguageBucket[]).map(
        (b) => [b, completedByBucket.get(b) || 0] as const
      ),
      groups: Array.from(byGroup.values()).sort((a, b) => b.students.size - a.students.size),
    };
  }, [rows]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (err) {
    return <p className="text-sm text-destructive">Failed to load analytics: {err}</p>;
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border bg-card p-10 text-center">
        <BarChart3 className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No enrolled students in your groups yet. Analytics will appear once students join.
        </p>
      </div>
    );
  }

  const maxLevel = Math.max(1, ...stats.byLevel.map(([, n]) => n));
  const maxBucket = Math.max(1, ...stats.byBucket.map(([, n]) => n));
  const maxGroup = Math.max(1, ...stats.groups.map((g) => g.students.size));

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { icon: Users2, label: "Students", value: stats.totalStudents },
          { icon: Layers, label: "Groups", value: stats.totalGroups },
          { icon: BarChart3, label: "Enrollments", value: stats.totalEnrollments },
          { icon: Languages, label: "Lessons Completed", value: stats.totalCompleted },
        ].map((k) => (
          <div key={k.label} className="rounded-xl border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <k.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{k.value}</p>
                <p className="text-xs text-muted-foreground">{k.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* By level */}
      <div className="rounded-2xl border bg-card p-5 shadow-soft">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <Layers className="h-4 w-4" /> Completion by Level
        </h3>
        {stats.byLevel.length === 0 ? (
          <p className="text-sm text-muted-foreground">No completions yet.</p>
        ) : (
          <div className="space-y-3">
            {stats.byLevel.map(([level, count]) => (
              <div key={level}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium">{level}</span>
                  <span className="text-muted-foreground">{count} completed</span>
                </div>
                <Bar pct={(count / maxLevel) * 100} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* By language bucket */}
      <div className="rounded-2xl border bg-card p-5 shadow-soft">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <Languages className="h-4 w-4" /> Completion by Language
        </h3>
        <div className="space-y-3">
          {stats.byBucket.map(([bucket, count]) => (
            <div key={bucket}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium">
                  <span className={`h-2 w-2 rounded-full ${BUCKET_COLORS[bucket]}`} />
                  {bucket}
                </span>
                <span className="text-muted-foreground">{count} completed</span>
              </div>
              <Bar pct={(count / maxBucket) * 100} color={BUCKET_COLORS[bucket]} />
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">
          Buckets are auto-mapped by course id prefix (see <code>src/lib/language-buckets.ts</code>).
        </p>
      </div>

      {/* By booking cohort (group) */}
      <div className="rounded-2xl border bg-card p-5 shadow-soft">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <Users2 className="h-4 w-4" /> Booking Cohorts (Groups)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-2">Group</th>
                <th className="py-2">Teacher</th>
                <th className="py-2">Cohort</th>
                <th className="py-2 text-right">Students</th>
                <th className="py-2 text-right">Approved</th>
                <th className="py-2 text-right">Completed</th>
                <th className="py-2">Rate</th>
              </tr>
            </thead>
            <tbody>
              {stats.groups.map((g) => {
                const target = g.students.size * LESSONS_PER_LEVEL;
                const pct = target > 0 ? Math.round((g.completed / target) * 100) : 0;
                return (
                  <tr key={g.group_id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="py-3 font-medium">{g.label}</td>
                    <td className="py-3 text-muted-foreground">{g.teacher}</td>
                    <td className="py-3 text-muted-foreground">{g.cohort_month}</td>
                    <td className="py-3 text-right font-medium">{g.students.size}</td>
                    <td className="py-3 text-right text-muted-foreground">{g.approved}</td>
                    <td className="py-3 text-right font-medium">{g.completed}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24">
                          <Bar pct={(g.students.size / maxGroup) * 100} />
                        </div>
                        <span className="w-10 text-right text-xs text-muted-foreground">{pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">
          Rate = lessons completed ÷ (students × {LESSONS_PER_LEVEL} target lessons).
        </p>
      </div>
    </div>
  );
}