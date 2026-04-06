import { Users2 } from "lucide-react";

interface Group {
  id: string;
  level: string | null;
  days: string | null;
  start_time: string | null;
  end_time: string | null;
  teacher_id: number | null;
  legacy_id: number | null;
}

interface Props {
  groups: Group[];
  employees: { legacy_id: number | null; name: string }[];
}

export default function AdminGroups({ groups, employees }: Props) {
  const getTeacher = (tid: number | null) => {
    if (!tid) return "—";
    return employees.find(e => e.legacy_id === tid)?.name || `Teacher #${tid}`;
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Users2 className="h-5 w-5 text-primary" />
        <span className="font-semibold">{groups.length} Groups</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(g => (
          <div key={g.id} className="rounded-xl border bg-card p-4 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-primary">Group #{g.legacy_id}</span>
              {g.level && <span className="text-[10px] font-bold rounded-full px-2 py-0.5 bg-primary/10 text-primary">{g.level}</span>}
            </div>
            <p className="text-sm"><span className="text-muted-foreground">Teacher:</span> {getTeacher(g.teacher_id)}</p>
            <p className="text-sm"><span className="text-muted-foreground">Days:</span> {g.days || "—"}</p>
            <p className="text-sm"><span className="text-muted-foreground">Time:</span> {g.start_time || "—"} - {g.end_time || "—"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
