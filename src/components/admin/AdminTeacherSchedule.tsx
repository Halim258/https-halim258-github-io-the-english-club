import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Session {
  id: string;
  session_name: string | null;
  session_date: string | null;
  time_from: number | null;
  time_to: number | null;
  level: string | null;
  teacher_id: number | null;
}

interface Employee {
  legacy_id: number | null;
  name: string;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8am - 7pm

export default function AdminTeacherSchedule() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [teachers, setTeachers] = useState<Employee[]>([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const weekStart = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay() + weekOffset * 7);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [weekOffset]);

  const weekEnd = useMemo(() => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    return d;
  }, [weekStart]);

  useEffect(() => {
    async function load() {
      const [{ data: sessData }, { data: empData }] = await Promise.all([
        supabase.from("school_sessions").select("id, session_name, session_date, time_from, time_to, level, teacher_id")
          .gte("session_date", weekStart.toISOString())
          .lt("session_date", weekEnd.toISOString()),
        supabase.from("school_employees").select("legacy_id, name").eq("position", "teacher"),
      ]);
      setSessions(sessData || []);
      setTeachers(empData || []);
      setLoading(false);
    }
    load();
  }, [weekStart, weekEnd]);

  const teacherMap = new Map(teachers.map(t => [t.legacy_id, t.name]));

  const formatDate = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-display flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-primary" />
          Teacher Schedule
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={() => setWeekOffset(w => w - 1)} className="text-sm px-3 py-1 rounded-full border hover:bg-muted">← Prev</button>
          <button onClick={() => setWeekOffset(0)} className="text-sm px-3 py-1 rounded-full border hover:bg-muted">Today</button>
          <button onClick={() => setWeekOffset(w => w + 1)} className="text-sm px-3 py-1 rounded-full border hover:bg-muted">Next →</button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Week of {formatDate(weekStart)} — {sessions.length} sessions scheduled
      </p>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading schedule...</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="grid grid-cols-8 gap-px bg-border min-w-[700px] rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-muted p-2 text-[10px] font-bold text-muted-foreground">Time</div>
            {DAYS.map((day, i) => {
              const d = new Date(weekStart);
              d.setDate(d.getDate() + i);
              const isToday = d.toDateString() === new Date().toDateString();
              return (
                <div key={day} className={`p-2 text-center text-[10px] font-bold ${isToday ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {day} {d.getDate()}
                </div>
              );
            })}

            {/* Time slots */}
            {HOURS.map(hour => (
              <>
                <div key={`h-${hour}`} className="bg-card p-2 text-[10px] text-muted-foreground border-t">
                  {hour}:00
                </div>
                {DAYS.map((_, dayIdx) => {
                  const d = new Date(weekStart);
                  d.setDate(d.getDate() + dayIdx);
                  const dateStr = d.toISOString().split("T")[0];

                  const slotSessions = sessions.filter(s => {
                    const sDate = s.session_date?.split("T")[0];
                    return sDate === dateStr && s.time_from === hour;
                  });

                  return (
                    <div key={`${hour}-${dayIdx}`} className="bg-card p-1 border-t min-h-[40px]">
                      {slotSessions.map(s => (
                        <div
                          key={s.id}
                          className="rounded-lg bg-primary/10 border border-primary/20 p-1.5 text-[9px] mb-0.5"
                        >
                          <p className="font-bold text-primary truncate">{s.session_name || s.level || "Session"}</p>
                          <p className="text-muted-foreground truncate">
                            {teacherMap.get(s.teacher_id || 0) || "TBA"}
                          </p>
                          {s.time_from && s.time_to && (
                            <p className="text-muted-foreground">{s.time_from}:00-{s.time_to}:00</p>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
