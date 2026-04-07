import { useState, useMemo, useCallback, ReactNode } from "react";
import { motion } from "framer-motion";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import {
  Users, GraduationCap, TrendingUp, BookOpen, BarChart3,
  Clock, DollarSign, UserPlus, ArrowUpRight, ArrowDownRight,
  Receipt, GripVertical, Eye, EyeOff, RotateCcw, Settings2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "./AnimatedCounter";
import SmartNotifications from "./SmartNotifications";
import ActivityFeed from "./ActivityFeed";
import AIInsights from "./AIInsights";
import AttendanceHeatmap from "./AttendanceHeatmap";
import StudentGrowthChart from "./StudentGrowthChart";
import TeacherPerformance from "./TeacherPerformance";

interface Props {
  profiles: any[];
  testResults: any[];
  progressData: any[];
  schoolStudents: any[];
  income: any[];
  outcome: any[];
  newcomers: any[];
  receipts: any[];
  sessions: any[];
  employees: any[];
}

const LEVEL_COLORS: Record<string, string> = {
  A1: "bg-emerald-500", A2: "bg-teal-500", B1: "bg-blue-500",
  B2: "bg-indigo-500", C1: "bg-violet-500", C2: "bg-purple-500",
};

type WidgetId =
  | "kpi-primary" | "kpi-secondary" | "notifications"
  | "ai-insights" | "activity-feed"
  | "heatmap" | "growth" | "teacher-perf"
  | "revenue" | "cefr" | "recent-tests" | "recent-leads" | "lesson-progress";

interface WidgetDef {
  id: WidgetId;
  label: string;
  size: "full" | "half" | "third";
}

const DEFAULT_WIDGETS: WidgetDef[] = [
  { id: "kpi-primary", label: "Key Metrics", size: "full" },
  { id: "kpi-secondary", label: "Secondary Metrics", size: "full" },
  { id: "notifications", label: "Smart Notifications", size: "full" },
  { id: "ai-insights", label: "AI Insights", size: "half" },
  { id: "activity-feed", label: "Activity Feed", size: "half" },
  { id: "heatmap", label: "Session Heatmap", size: "third" },
  { id: "growth", label: "Student Growth", size: "third" },
  { id: "teacher-perf", label: "Teacher Performance", size: "third" },
  { id: "revenue", label: "Monthly Revenue", size: "half" },
  { id: "cefr", label: "CEFR Distribution", size: "half" },
  { id: "recent-tests", label: "Recent Tests", size: "half" },
  { id: "recent-leads", label: "Recent Leads", size: "half" },
  { id: "lesson-progress", label: "Lesson Progress", size: "full" },
];

const STORAGE_KEY = "admin-dashboard-layout";

function loadLayout(): { order: WidgetId[]; hidden: WidgetId[] } {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return { order: DEFAULT_WIDGETS.map(w => w.id), hidden: [] };
}

function saveLayout(order: WidgetId[], hidden: WidgetId[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ order, hidden }));
}

export default function AdminOverview({ profiles, testResults, progressData, schoolStudents, income, outcome, newcomers, receipts, sessions, employees }: Props) {
  const [layout, setLayout] = useState(loadLayout);
  const [showSettings, setShowSettings] = useState(false);

  // ─── Computed data ───
  const totalOnlineStudents = profiles.length;
  const totalSchoolStudents = schoolStudents.length;
  const totalTests = testResults.length;
  const completedLessons = progressData.filter((p: any) => p.completed).length;
  const totalIncome = income.reduce((s: number, r: any) => s + r.amount, 0);
  const totalExpenses = outcome.reduce((s: number, r: any) => s + r.amount, 0);
  const netProfit = totalIncome - totalExpenses;
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
  const monthAgo = new Date(Date.now() - 30 * 86400000).toISOString();
  const recentSignups = profiles.filter((s: any) => s.created_at > weekAgo).length;
  const monthlyNewcomers = newcomers.filter((n: any) => n.the_date && n.the_date > monthAgo).length;
  const totalReceiptsPaid = receipts.reduce((s: number, r: any) => s + (r.paid_fees || 0), 0);
  const totalReceiptsRemaining = receipts.reduce((s: number, r: any) => s + (r.remaining_fees || 0), 0);
  const activeStudents = schoolStudents.filter((s: any) => s.status === "active").length;
  const conversionRate = newcomers.length > 0 ? Math.round((schoolStudents.length / newcomers.length) * 100) : 0;

  const levelDist = testResults.reduce<Record<string, number>>((acc, t: any) => {
    acc[t.cefr_level] = (acc[t.cefr_level] || 0) + 1;
    return acc;
  }, {});

  const monthlyData = useMemo(() => {
    const months: Record<string, { income: number; expenses: number }> = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      months[key] = { income: 0, expenses: 0 };
    }
    income.forEach((r: any) => {
      if (!r.date) return;
      const d = new Date(r.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (months[key]) months[key].income += r.amount;
    });
    outcome.forEach((r: any) => {
      if (!r.date) return;
      const d = new Date(r.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (months[key]) months[key].expenses += r.amount;
    });
    return Object.entries(months).map(([key, val]) => ({
      month: new Date(key + "-01").toLocaleDateString("en-US", { month: "short" }),
      ...val,
    }));
  }, [income, outcome]);

  const maxMonthly = Math.max(...monthlyData.map(d => Math.max(d.income, d.expenses)), 1);

  // ─── Widget content map ───
  const widgetContent: Record<WidgetId, ReactNode> = {
    "kpi-primary": (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Users, label: "School Students", value: totalSchoolStudents, sub: `${activeStudents} active`, color: "text-blue-600", bg: "bg-blue-500/10", trend: null },
          { icon: GraduationCap, label: "Online Users", value: totalOnlineStudents, sub: `+${recentSignups} this week`, color: "text-violet-600", bg: "bg-violet-500/10", trend: recentSignups > 0 ? "up" : null },
          { icon: TrendingUp, label: "Net Profit", value: netProfit, sub: `Income: ${totalIncome.toLocaleString()}`, color: netProfit >= 0 ? "text-emerald-600" : "text-red-600", bg: netProfit >= 0 ? "bg-emerald-500/10" : "bg-red-500/10", trend: netProfit >= 0 ? "up" : "down", suffix: " ج.م" },
          { icon: UserPlus, label: "Monthly Leads", value: monthlyNewcomers, sub: `${conversionRate}% conversion`, color: "text-amber-600", bg: "bg-amber-500/10", trend: null },
        ].map((s) => (
          <motion.div key={s.label} whileHover={{ scale: 1.02 }} className="rounded-xl border bg-card p-5 shadow-soft hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.bg}`}><s.icon className={`h-5 w-5 ${s.color}`} /></div>
              {s.trend && (
                <span className={`flex items-center gap-0.5 text-xs font-medium ${s.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                  {s.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold font-display"><AnimatedCounter value={s.value} suffix={s.suffix || ""} /></p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{s.sub}</p>
          </motion.div>
        ))}
      </div>
    ),
    "kpi-secondary": (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: BookOpen, label: "Lessons Done", value: completedLessons, color: "text-teal-600", bg: "bg-teal-500/10" },
          { icon: BarChart3, label: "Tests Taken", value: totalTests, color: "text-indigo-600", bg: "bg-indigo-500/10" },
          { icon: Receipt, label: "Receipts Paid", value: totalReceiptsPaid, color: "text-emerald-600", bg: "bg-emerald-500/10", suffix: " ج.م" },
          { icon: DollarSign, label: "Outstanding", value: totalReceiptsRemaining, color: "text-red-600", bg: "bg-red-500/10", suffix: " ج.م" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-4 shadow-soft hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.bg}`}><s.icon className={`h-4 w-4 ${s.color}`} /></div>
              <div>
                <p className="text-lg font-bold font-display"><AnimatedCounter value={s.value} suffix={(s as any).suffix || ""} /></p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    "notifications": (
      <SmartNotifications schoolStudents={schoolStudents} income={income} outcome={outcome} newcomers={newcomers} sessions={sessions} />
    ),
    "ai-insights": (
      <AIInsights schoolStudents={schoolStudents} income={income} outcome={outcome} newcomers={newcomers} sessions={sessions} receipts={receipts} />
    ),
    "activity-feed": (
      <ActivityFeed schoolStudents={schoolStudents} income={income} outcome={outcome} newcomers={newcomers} receipts={receipts} sessions={sessions} />
    ),
    "heatmap": <AttendanceHeatmap sessions={sessions} />,
    "growth": <StudentGrowthChart schoolStudents={schoolStudents} newcomers={newcomers} />,
    "teacher-perf": <TeacherPerformance sessions={sessions} employees={employees} />,
    "revenue": (
      <div className="rounded-2xl border bg-card p-6 shadow-soft h-full">
        <h3 className="text-sm font-semibold font-display flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-primary" /> Monthly Revenue (6 Months)
        </h3>
        <div className="space-y-3">
          {monthlyData.map((m) => (
            <div key={m.month} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium w-10">{m.month}</span>
                <div className="flex gap-3">
                  <span className="text-emerald-600">+{m.income.toLocaleString()}</span>
                  <span className="text-red-500">-{m.expenses.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-1 h-3">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(m.income / maxMonthly) * 100}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-emerald-500" />
                <motion.div initial={{ width: 0 }} animate={{ width: `${(m.expenses / maxMonthly) * 100}%` }} transition={{ duration: 0.8, delay: 0.2 }} className="h-full rounded-full bg-red-400" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Income</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400" /> Expenses</span>
        </div>
      </div>
    ),
    "cefr": (
      <div className="rounded-2xl border bg-card p-6 shadow-soft h-full">
        <h3 className="text-sm font-semibold font-display flex items-center gap-2 mb-4">
          <BarChart3 className="h-4 w-4 text-primary" /> CEFR Level Distribution
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {["A1", "A2", "B1", "B2", "C1", "C2"].map((lvl) => {
            const count = levelDist[lvl] || 0;
            const pct = totalTests > 0 ? Math.round((count / totalTests) * 100) : 0;
            return (
              <div key={lvl} className="text-center">
                <div className="relative mx-auto w-14 h-14 mb-2">
                  <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15" fill="none" strokeWidth="3" className="stroke-muted" />
                    <motion.circle cx="18" cy="18" r="15" fill="none" strokeWidth="3"
                      strokeDasharray={`${pct * 0.94} 94`}
                      style={{ color: lvl === "A1" ? "#10b981" : lvl === "A2" ? "#14b8a6" : lvl === "B1" ? "#3b82f6" : lvl === "B2" ? "#6366f1" : lvl === "C1" ? "#8b5cf6" : "#a855f7" }}
                      className="stroke-current"
                      initial={{ strokeDasharray: "0 94" }}
                      animate={{ strokeDasharray: `${pct * 0.94} 94` }}
                      transition={{ duration: 1 }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">{count}</span>
                </div>
                <p className="text-xs font-bold">{lvl}</p>
                <p className="text-[10px] text-muted-foreground">{pct}%</p>
              </div>
            );
          })}
        </div>
      </div>
    ),
    "recent-tests": (
      <div className="rounded-2xl border bg-card p-6 shadow-soft h-full">
        <h3 className="text-sm font-semibold font-display flex items-center gap-2 mb-4">
          <Clock className="h-4 w-4 text-primary" /> Recent Tests
        </h3>
        <div className="space-y-2">
          {testResults.slice(0, 5).map((t: any) => {
            const student = profiles.find((s: any) => s.id === t.user_id);
            const pct = Math.round((t.score / t.total_questions) * 100);
            return (
              <div key={t.id} className="flex items-center justify-between rounded-xl border p-3 hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg ${LEVEL_COLORS[t.cefr_level] || "bg-primary"} flex items-center justify-center`}>
                    <span className="text-xs font-bold text-white">{t.cefr_level}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{student?.full_name || "Anonymous"}</p>
                    <p className="text-[10px] text-muted-foreground">{new Date(t.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold font-display text-primary">{t.score}/{t.total_questions}</span>
                  <p className="text-[10px] text-muted-foreground">{pct}%</p>
                </div>
              </div>
            );
          })}
          {testResults.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No test results yet.</p>}
        </div>
      </div>
    ),
    "recent-leads": (
      <div className="rounded-2xl border bg-card p-6 shadow-soft h-full">
        <h3 className="text-sm font-semibold font-display flex items-center gap-2 mb-4">
          <UserPlus className="h-4 w-4 text-primary" /> Recent Leads
        </h3>
        <div className="space-y-2">
          {newcomers.slice(0, 5).map((n: any) => (
            <div key={n.id} className="flex items-center justify-between rounded-xl border p-3 hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-amber-600">{n.client_name[0]?.toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{n.client_name}</p>
                  <p className="text-[10px] text-muted-foreground">{n.access_method || "Direct"}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${n.reserved ? "bg-emerald-500/10 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
                  {n.reserved ? "Enrolled" : "Pending"}
                </span>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {n.the_date ? new Date(n.the_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "—"}
                </p>
              </div>
            </div>
          ))}
          {newcomers.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No leads yet.</p>}
        </div>
      </div>
    ),
    "lesson-progress": (
      <div className="rounded-2xl border bg-card p-6 shadow-soft">
        <h3 className="text-sm font-semibold font-display flex items-center gap-2 mb-6">
          <BookOpen className="h-4 w-4 text-primary" /> Lesson Completion by Level
        </h3>
        <div className="space-y-3">
          {["reading", "a1", "a2", "b1", "b2", "c1", "c2"].map((lvl) => {
            const levelProgress = progressData.filter((p: any) => p.level_id === lvl);
            const completed = levelProgress.filter((p: any) => p.completed).length;
            const pct = levelProgress.length > 0 ? Math.round((completed / levelProgress.length) * 100) : 0;
            const uniqueStudents = new Set(levelProgress.map((p: any) => p.user_id)).size;
            return (
              <div key={lvl} className="flex items-center gap-4">
                <span className="text-sm font-bold font-display w-16 shrink-0 uppercase">{lvl}</span>
                <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-primary" />
                </div>
                <div className="text-right shrink-0 min-w-[100px]">
                  <span className="text-sm font-bold">{completed}</span>
                  <span className="text-xs text-muted-foreground"> / {levelProgress.length}</span>
                  <p className="text-[10px] text-muted-foreground">{uniqueStudents} students</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),
  };

  // ─── Layout logic ───
  const orderedWidgets = useMemo(() => {
    const allIds = DEFAULT_WIDGETS.map(w => w.id);
    const validOrder = layout.order.filter(id => allIds.includes(id));
    const missing = allIds.filter(id => !validOrder.includes(id));
    return [...validOrder, ...missing];
  }, [layout.order]);

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;
    const newOrder = [...orderedWidgets];
    const [moved] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, moved);
    const newLayout = { order: newOrder, hidden: layout.hidden };
    setLayout(newLayout);
    saveLayout(newOrder, layout.hidden);
  }, [orderedWidgets, layout.hidden]);

  const toggleWidget = useCallback((id: WidgetId) => {
    const newHidden = layout.hidden.includes(id)
      ? layout.hidden.filter(h => h !== id)
      : [...layout.hidden, id];
    const newLayout = { order: layout.order, hidden: newHidden };
    setLayout(newLayout);
    saveLayout(layout.order, newHidden);
  }, [layout]);

  const resetLayout = useCallback(() => {
    const def = { order: DEFAULT_WIDGETS.map(w => w.id), hidden: [] as WidgetId[] };
    setLayout(def);
    saveLayout(def.order, def.hidden);
    setShowSettings(false);
  }, []);

  const getWidgetDef = (id: WidgetId) => DEFAULT_WIDGETS.find(w => w.id === id)!;

  // ─── Group consecutive widgets by size for grid layout ───
  const visibleWidgets = orderedWidgets.filter(id => !layout.hidden.includes(id));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      {/* Customize toolbar */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
          className="text-xs gap-1.5"
        >
          <Settings2 className="h-3.5 w-3.5" />
          {showSettings ? "Done" : "Customize"}
        </Button>
        {showSettings && (
          <Button variant="ghost" size="sm" onClick={resetLayout} className="text-xs gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        )}
      </div>

      {/* Widget visibility toggles */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="rounded-xl border bg-card p-4 shadow-soft"
        >
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Toggle Widgets — Drag to Reorder</p>
          <div className="flex flex-wrap gap-2">
            {orderedWidgets.map(id => {
              const def = getWidgetDef(id);
              const isHidden = layout.hidden.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => toggleWidget(id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium border transition-all ${
                    isHidden
                      ? "bg-muted/50 text-muted-foreground border-transparent opacity-60"
                      : "bg-primary/10 text-primary border-primary/20"
                  }`}
                >
                  {isHidden ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  {def.label}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Drag-and-drop widgets */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="dashboard-widgets">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
              {visibleWidgets.map((id, index) => {
                const def = getWidgetDef(id);
                return (
                  <Draggable key={id} draggableId={id} index={index} isDragDisabled={!showSettings}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`transition-shadow ${snapshot.isDragging ? "shadow-lg ring-2 ring-primary/30 rounded-2xl" : ""}`}
                      >
                        {showSettings && (
                          <div
                            {...provided.dragHandleProps}
                            className="flex items-center gap-2 px-2 py-1.5 mb-1 rounded-lg bg-muted/50 cursor-grab active:cursor-grabbing"
                          >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <span className="text-[11px] font-medium text-muted-foreground">{def.label}</span>
                            <span className="ml-auto text-[9px] text-muted-foreground/60 uppercase">{def.size}</span>
                          </div>
                        )}
                        {!showSettings && <div {...provided.dragHandleProps} />}
                        {widgetContent[id]}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </motion.div>
  );
}
