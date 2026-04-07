import { useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface Props {
  sessions: any[];
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8am - 7pm

export default function AttendanceHeatmap({ sessions }: Props) {
  const heatData = useMemo(() => {
    const grid: number[][] = Array.from({ length: 7 }, () => Array(12).fill(0));
    let max = 1;

    sessions.forEach((s: any) => {
      if (!s.session_date) return;
      const d = new Date(s.session_date);
      const day = d.getDay();
      const hour = s.time_from != null ? Math.max(0, Math.min(11, Math.floor(s.time_from) - 8)) : null;
      if (hour != null && hour >= 0 && hour < 12) {
        grid[day][hour]++;
        if (grid[day][hour] > max) max = grid[day][hour];
      }
    });

    return { grid, max };
  }, [sessions]);

  const getColor = (val: number) => {
    if (val === 0) return "bg-muted";
    const intensity = val / heatData.max;
    if (intensity < 0.25) return "bg-primary/20";
    if (intensity < 0.5) return "bg-primary/40";
    if (intensity < 0.75) return "bg-primary/60";
    return "bg-primary/90";
  };

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <h3 className="text-sm font-semibold font-display flex items-center gap-2 mb-4">
        <Calendar className="h-4 w-4 text-primary" /> Session Heatmap
        <span className="ml-auto text-[10px] font-normal text-muted-foreground">By day & hour</span>
      </h3>
      <div className="overflow-x-auto">
        <div className="min-w-[500px]">
          {/* Hour headers */}
          <div className="flex gap-1 mb-1 ml-10">
            {HOURS.map(h => (
              <div key={h} className="flex-1 text-[9px] text-center text-muted-foreground font-medium">
                {h > 12 ? `${h - 12}p` : h === 12 ? "12p" : `${h}a`}
              </div>
            ))}
          </div>
          {/* Grid rows */}
          {DAYS.map((day, di) => (
            <div key={day} className="flex gap-1 items-center mb-1">
              <span className="w-9 text-[10px] font-medium text-muted-foreground text-right pr-1">{day}</span>
              {HOURS.map((_, hi) => (
                <motion.div
                  key={hi}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: (di * 12 + hi) * 0.005 }}
                  className={`flex-1 h-5 rounded-sm ${getColor(heatData.grid[di][hi])} transition-colors cursor-default`}
                  title={`${day} ${HOURS[hi]}:00 — ${heatData.grid[di][hi]} sessions`}
                />
              ))}
            </div>
          ))}
          {/* Legend */}
          <div className="flex items-center gap-2 mt-3 ml-10 text-[9px] text-muted-foreground">
            <span>Less</span>
            {["bg-muted", "bg-primary/20", "bg-primary/40", "bg-primary/60", "bg-primary/90"].map((c, i) => (
              <div key={i} className={`w-4 h-3 rounded-sm ${c}`} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
