import { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface Props {
  schoolStudents: any[];
  newcomers: any[];
}

export default function StudentGrowthChart({ schoolStudents, newcomers }: Props) {
  const monthlyData = useMemo(() => {
    const months: Record<string, { enrolled: number; leads: number }> = {};
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      months[key] = { enrolled: 0, leads: 0 };
    }

    schoolStudents.forEach((s: any) => {
      if (!s.created_at) return;
      const d = new Date(s.created_at);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (months[key]) months[key].enrolled++;
    });

    newcomers.forEach((n: any) => {
      if (!n.the_date) return;
      const d = new Date(n.the_date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (months[key]) months[key].leads++;
    });

    return Object.entries(months).map(([key, val]) => ({
      month: new Date(key + "-01").toLocaleDateString("en-US", { month: "short" }),
      ...val,
    }));
  }, [schoolStudents, newcomers]);

  const maxVal = Math.max(...monthlyData.map(d => Math.max(d.enrolled, d.leads)), 1);

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <h3 className="text-sm font-semibold font-display flex items-center gap-2 mb-4">
        <TrendingUp className="h-4 w-4 text-primary" /> Student Growth (6 Months)
      </h3>

      {/* Bar chart */}
      <div className="flex items-end gap-2 h-32 mb-3">
        {monthlyData.map((d, i) => (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex gap-0.5 items-end justify-center h-24">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.leads / maxVal) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="w-3 rounded-t bg-amber-400 min-h-[2px]"
                title={`${d.leads} leads`}
              />
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.enrolled / maxVal) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.08 + 0.1 }}
                className="w-3 rounded-t bg-primary min-h-[2px]"
                title={`${d.enrolled} enrolled`}
              />
            </div>
            <span className="text-[9px] text-muted-foreground font-medium">{d.month}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-4 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Leads</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Enrolled</span>
      </div>
    </div>
  );
}
