import { useMemo, useState } from "react";
import { Clock, Search, User, AlertTriangle, ChevronDown, ChevronUp, DollarSign, Calculator, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Session {
  id: string;
  session_name: string | null;
  session_date: string | null;
  level: string | null;
  teacher_id: number | null;
  hours: number | null;
  teacher_lateness: number | null;
}

interface Employee {
  legacy_id: number | null;
  name: string;
  position: string;
}

interface Props {
  sessions: Session[];
  employees: Employee[];
}

interface TeacherSummary {
  id: number;
  name: string;
  position: string;
  totalSessions: number;
  totalHours: number;
  totalLateness: number;
  avgHoursPerSession: number;
  levels: string[];
  recentSessions: Session[];
}

export default function AdminTeacherHours({ sessions, employees }: Props) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<"totalHours" | "totalSessions" | "totalLateness" | "name">("totalHours");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [monthFilter, setMonthFilter] = useState<string>("all");
  const [showPayroll, setShowPayroll] = useState(false);
  const [hourlyRate, setHourlyRate] = useState(100);
  const [latenessDeductionPerMin, setLatenessDeductionPerMin] = useState(2);
  const [bonuses, setBonuses] = useState<Record<number, number>>({});

  const months = useMemo(() => {
    const set = new Set<string>();
    sessions.forEach(s => {
      if (s.session_date) {
        const d = new Date(s.session_date);
        set.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
      }
    });
    return Array.from(set).sort().reverse();
  }, [sessions]);

  const filteredSessions = useMemo(() => {
    if (monthFilter === "all") return sessions;
    return sessions.filter(s => {
      if (!s.session_date) return false;
      const d = new Date(s.session_date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}` === monthFilter;
    });
  }, [sessions, monthFilter]);

  const summaries = useMemo(() => {
    const map = new Map<number, TeacherSummary>();
    const teachers = employees.filter(e => e.position === "teacher" || e.position === "Teacher");

    teachers.forEach(t => {
      if (t.legacy_id != null) {
        map.set(t.legacy_id, {
          id: t.legacy_id,
          name: t.name,
          position: t.position,
          totalSessions: 0,
          totalHours: 0,
          totalLateness: 0,
          avgHoursPerSession: 0,
          levels: [],
          recentSessions: [],
        });
      }
    });

    // Also include teachers from sessions not in employees
    filteredSessions.forEach(s => {
      if (s.teacher_id && !map.has(s.teacher_id)) {
        map.set(s.teacher_id, {
          id: s.teacher_id,
          name: employees.find(e => e.legacy_id === s.teacher_id)?.name || `Teacher #${s.teacher_id}`,
          position: "teacher",
          totalSessions: 0,
          totalHours: 0,
          totalLateness: 0,
          avgHoursPerSession: 0,
          levels: [],
          recentSessions: [],
        });
      }
    });

    filteredSessions.forEach(s => {
      if (!s.teacher_id) return;
      const t = map.get(s.teacher_id);
      if (!t) return;
      t.totalSessions++;
      t.totalHours += s.hours || 0;
      t.totalLateness += s.teacher_lateness || 0;
      if (s.level && !t.levels.includes(s.level)) t.levels.push(s.level);
      t.recentSessions.push(s);
    });

    map.forEach(t => {
      t.avgHoursPerSession = t.totalSessions > 0 ? t.totalHours / t.totalSessions : 0;
      t.recentSessions.sort((a, b) => (b.session_date || "").localeCompare(a.session_date || ""));
      t.recentSessions = t.recentSessions.slice(0, 10);
    });

    let arr = Array.from(map.values());
    if (search) {
      const q = search.toLowerCase();
      arr = arr.filter(t => t.name.toLowerCase().includes(q));
    }

    arr.sort((a, b) => {
      if (sortField === "name") {
        const cmp = a.name.localeCompare(b.name);
        return sortDir === "desc" ? -cmp : cmp;
      }
      const diff = (a[sortField] as number) - (b[sortField] as number);
      return sortDir === "desc" ? -diff : diff;
    });

    return arr;
  }, [filteredSessions, employees, search, sortField, sortDir]);

  const grandTotalHours = summaries.reduce((s, t) => s + t.totalHours, 0);
  const grandTotalSessions = summaries.reduce((s, t) => s + t.totalSessions, 0);
  const grandTotalLateness = summaries.reduce((s, t) => s + t.totalLateness, 0);

  const calcPay = (t: TeacherSummary) => {
    const gross = t.totalHours * hourlyRate;
    const deduction = t.totalLateness * latenessDeductionPerMin;
    const bonus = bonuses[t.id] || 0;
    return { gross, deduction, bonus, net: gross - deduction + bonus };
  };
  const grandTotalPay = summaries.reduce((s, t) => s + calcPay(t).net, 0);

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  const SortIcon = ({ field }: { field: typeof sortField }) => {
    if (sortField !== field) return null;
    return sortDir === "desc" ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />;
  };

  const monthLabel = (m: string) => {
    const [y, mo] = m.split("-");
    const date = new Date(parseInt(y), parseInt(mo) - 1);
    return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { icon: User, label: "Teachers", value: summaries.length },
          { icon: Clock, label: "Total Hours", value: grandTotalHours },
          { icon: Clock, label: "Total Sessions", value: grandTotalSessions },
          { icon: AlertTriangle, label: "Total Lateness", value: `${grandTotalLateness} min` },
          ...(showPayroll ? [{ icon: DollarSign, label: "Total Payroll", value: `${grandTotalPay.toLocaleString()} EGP` }] : []),
        ].map(s => (
          <div key={s.label} className="rounded-xl border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-2">
              <s.icon className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-lg font-bold font-display mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Payroll Settings */}
      {showPayroll && (
        <div className="mb-4 rounded-xl border bg-card p-4 shadow-soft">
          <div className="flex items-center gap-2 mb-3">
            <Settings className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Payroll Settings</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Hourly Rate (EGP)</Label>
              <Input type="number" value={hourlyRate} onChange={e => setHourlyRate(Number(e.target.value) || 0)} />
            </div>
            <div>
              <Label>Lateness Deduction (EGP/min)</Label>
              <Input type="number" value={latenessDeductionPerMin} onChange={e => setLatenessDeductionPerMin(Number(e.target.value) || 0)} />
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search teacher..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <select value={monthFilter} onChange={e => setMonthFilter(e.target.value)} className="rounded-md border bg-background px-3 py-2 text-sm">
          <option value="all">All Time</option>
          {months.map(m => <option key={m} value={m}>{monthLabel(m)}</option>)}
        </select>
        <Button variant={showPayroll ? "default" : "outline"} size="sm" onClick={() => setShowPayroll(!showPayroll)}>
          <Calculator className="h-4 w-4 mr-1" /> {showPayroll ? "Hide Payroll" : "Payroll"}
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border bg-card shadow-soft overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <th className="p-3 text-left cursor-pointer select-none" onClick={() => toggleSort("name")}>
                <span className="flex items-center gap-1">Teacher <SortIcon field="name" /></span>
              </th>
              <th className="p-3 text-center cursor-pointer select-none" onClick={() => toggleSort("totalSessions")}>
                <span className="flex items-center justify-center gap-1">Sessions <SortIcon field="totalSessions" /></span>
              </th>
              <th className="p-3 text-center cursor-pointer select-none" onClick={() => toggleSort("totalHours")}>
                <span className="flex items-center justify-center gap-1">Hours <SortIcon field="totalHours" /></span>
              </th>
              <th className="p-3 text-center">Avg Hours</th>
              <th className="p-3 text-center cursor-pointer select-none" onClick={() => toggleSort("totalLateness")}>
                <span className="flex items-center justify-center gap-1">Lateness <SortIcon field="totalLateness" /></span>
              </th>
              <th className="p-3 text-left">Levels</th>
              {showPayroll && <>
                <th className="p-3 text-center">Gross</th>
                <th className="p-3 text-center">Deduction</th>
                <th className="p-3 text-center">Bonus</th>
                <th className="p-3 text-center">Net Pay</th>
              </>}
              <th className="p-3 text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {summaries.map(t => (
              <>
                <tr key={t.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {t.name[0]?.toUpperCase()}
                      </div>
                      <span className="font-medium">{t.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-center font-mono font-bold">{t.totalSessions}</td>
                  <td className="p-3 text-center font-mono font-bold text-primary">{t.totalHours}</td>
                  <td className="p-3 text-center font-mono text-muted-foreground">{t.avgHoursPerSession.toFixed(1)}</td>
                  <td className="p-3 text-center">
                    <span className={`font-mono text-xs font-bold ${t.totalLateness > 0 ? "text-destructive" : "text-muted-foreground"}`}>
                      {t.totalLateness} min
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {t.levels.map(l => (
                        <span key={l} className="text-xs font-bold rounded-full px-2 py-0.5 bg-primary/10 text-primary">{l}</span>
                      ))}
                      {t.levels.length === 0 && <span className="text-xs text-muted-foreground">—</span>}
                    </div>
                  </td>
                  {showPayroll && (() => {
                    const pay = calcPay(t);
                    return <>
                      <td className="p-3 text-center font-mono text-sm">{pay.gross.toLocaleString()}</td>
                      <td className="p-3 text-center font-mono text-sm text-destructive">-{pay.deduction.toLocaleString()}</td>
                      <td className="p-3 text-center">
                        <Input
                          type="number"
                          className="w-20 h-7 text-xs text-center mx-auto"
                          value={bonuses[t.id] || 0}
                          onChange={e => setBonuses({ ...bonuses, [t.id]: Number(e.target.value) || 0 })}
                        />
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-primary">{pay.net.toLocaleString()}</td>
                    </>;
                  })()}
                  <td className="p-3 text-center">
                    <button onClick={() => setExpandedId(expandedId === t.id ? null : t.id)} className="text-xs text-primary hover:underline">
                      {expandedId === t.id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>
                {expandedId === t.id && (
                  <tr key={`${t.id}-detail`}>
                    <td colSpan={showPayroll ? 11 : 7} className="bg-muted/30 p-4">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Recent Sessions (last 10)</p>
                      <div className="grid gap-2">
                        {t.recentSessions.map(s => (
                          <div key={s.id} className="flex items-center gap-4 text-xs bg-card rounded-lg px-3 py-2 border">
                            <span className="font-medium flex-1">{s.session_name || "—"}</span>
                            <span className="text-primary font-bold">{s.level || "—"}</span>
                            <span className="font-mono">{s.hours || 0}h</span>
                            <span className={`font-mono ${(s.teacher_lateness || 0) > 0 ? "text-destructive" : "text-muted-foreground"}`}>
                              {s.teacher_lateness || 0}min late
                            </span>
                            <span className="text-muted-foreground">
                              {s.session_date ? new Date(s.session_date).toLocaleDateString("en-GB") : "—"}
                            </span>
                          </div>
                        ))}
                        {t.recentSessions.length === 0 && <p className="text-xs text-muted-foreground">No sessions found.</p>}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        {summaries.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No teacher data found.</p>}
      </div>
    </div>
  );
}
