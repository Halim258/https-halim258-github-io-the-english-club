import { useMemo } from "react";
import { motion } from "framer-motion";
import { Award, Clock, AlertTriangle } from "lucide-react";

interface Props {
  sessions: any[];
  employees: any[];
}

export default function TeacherPerformance({ sessions, employees }: Props) {
  const stats = useMemo(() => {
    const teachers = employees.filter(e => e.position?.toLowerCase().includes("teacher"));
    
    return teachers.map(t => {
      const teacherSessions = sessions.filter((s: any) => s.teacher_id === t.legacy_id);
      const totalHours = teacherSessions.reduce((s: number, se: any) => s + (se.hours || 0), 0);
      const avgLateness = teacherSessions.length > 0
        ? Math.round(teacherSessions.reduce((s: number, se: any) => s + (se.teacher_lateness || 0), 0) / teacherSessions.length)
        : 0;
      const recentMonth = new Date(Date.now() - 30 * 86400000).toISOString();
      const recentSessions = teacherSessions.filter((s: any) => s.session_date && s.session_date > recentMonth).length;

      return {
        id: t.id,
        name: t.name,
        totalSessions: teacherSessions.length,
        totalHours,
        avgLateness,
        recentSessions,
      };
    }).sort((a, b) => b.totalSessions - a.totalSessions);
  }, [sessions, employees]);

  if (stats.length === 0) {
    return (
      <div className="rounded-2xl border bg-card p-5 shadow-soft">
        <h3 className="text-sm font-semibold font-display flex items-center gap-2 mb-4">
          <Award className="h-4 w-4 text-primary" /> Teacher Performance
        </h3>
        <p className="text-sm text-muted-foreground text-center py-4">No teacher data available.</p>
      </div>
    );
  }

  const maxSessions = Math.max(...stats.map(s => s.totalSessions), 1);

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <h3 className="text-sm font-semibold font-display flex items-center gap-2 mb-4">
        <Award className="h-4 w-4 text-primary" /> Teacher Performance
        <span className="ml-auto text-[10px] font-normal text-muted-foreground">{stats.length} teachers</span>
      </h3>
      <div className="space-y-3">
        {stats.slice(0, 8).map((t, i) => (
          <div key={t.id} className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
              {t.name[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium truncate">{t.name}</span>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground shrink-0">
                  <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {t.totalHours}h</span>
                  {t.avgLateness > 0 && (
                    <span className={`flex items-center gap-0.5 ${t.avgLateness > 10 ? "text-red-500" : "text-amber-500"}`}>
                      <AlertTriangle className="h-3 w-3" /> {t.avgLateness}m
                    </span>
                  )}
                </div>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(t.totalSessions / maxSessions) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
              <div className="flex justify-between mt-0.5">
                <span className="text-[9px] text-muted-foreground">{t.totalSessions} sessions</span>
                <span className="text-[9px] text-muted-foreground">{t.recentSessions} this month</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
