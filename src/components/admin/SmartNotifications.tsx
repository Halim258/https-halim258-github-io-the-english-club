import { useMemo } from "react";
import { AlertTriangle, TrendingDown, UserX, Clock, CheckCircle2, Bell } from "lucide-react";

interface Props {
  schoolStudents: any[];
  income: any[];
  outcome: any[];
  newcomers: any[];
  sessions: any[];
}

interface Notification {
  id: string;
  type: "warning" | "danger" | "info" | "success";
  icon: React.ElementType;
  title: string;
  description: string;
}

export default function SmartNotifications({ schoolStudents, income, outcome, newcomers, sessions }: Props) {
  const notifications = useMemo(() => {
    const notes: Notification[] = [];
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 86400000);
    const monthAgo = new Date(now.getTime() - 30 * 86400000);
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    const curMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // Unpaid students alert
    const unpaidCount = schoolStudents.filter(s => (s.remaining_fees || 0) > 0).length;
    const totalOwed = schoolStudents.reduce((s, st) => s + (st.remaining_fees || 0), 0);
    if (unpaidCount > 0) {
      notes.push({
        id: "unpaid",
        type: unpaidCount > 10 ? "danger" : "warning",
        icon: AlertTriangle,
        title: `${unpaidCount} students have unpaid fees`,
        description: `Total outstanding: ${totalOwed.toLocaleString()} EGP. Consider sending reminders.`,
      });
    }

    // Revenue trend
    const curMonthIncome = income.filter(r => r.date && new Date(r.date) >= curMonthStart).reduce((s, r) => s + r.amount, 0);
    const prevMonthIncome = income.filter(r => r.date && new Date(r.date) >= prevMonthStart && new Date(r.date) <= prevMonthEnd).reduce((s, r) => s + r.amount, 0);
    if (prevMonthIncome > 0 && curMonthIncome < prevMonthIncome * 0.7) {
      notes.push({
        id: "revenue-drop",
        type: "danger",
        icon: TrendingDown,
        title: "Revenue is down this month",
        description: `Current: ${curMonthIncome.toLocaleString()} EGP vs last month: ${prevMonthIncome.toLocaleString()} EGP (${Math.round((1 - curMonthIncome / prevMonthIncome) * 100)}% drop).`,
      });
    }

    // Inactive students
    const inactiveStudents = schoolStudents.filter(s => s.status !== "active" && s.status !== null).length;
    if (inactiveStudents > 5) {
      notes.push({
        id: "inactive",
        type: "warning",
        icon: UserX,
        title: `${inactiveStudents} inactive students`,
        description: "Consider reaching out to re-engage them or archive old records.",
      });
    }

    // Pending leads
    const pendingLeads = newcomers.filter(n => !n.reserved && n.the_date && new Date(n.the_date) >= weekAgo).length;
    if (pendingLeads > 0) {
      notes.push({
        id: "leads",
        type: "info",
        icon: Clock,
        title: `${pendingLeads} new leads this week`,
        description: "Follow up quickly to improve conversion rates.",
      });
    }

    // All paid celebration
    if (unpaidCount === 0 && schoolStudents.length > 0) {
      notes.push({
        id: "all-paid",
        type: "success",
        icon: CheckCircle2,
        title: "All fees collected! 🎉",
        description: "Every student has paid their fees. Great job!",
      });
    }

    return notes;
  }, [schoolStudents, income, outcome, newcomers, sessions]);

  if (notifications.length === 0) return null;

  const colors = {
    danger: "border-red-500/30 bg-red-500/5 text-red-700 dark:text-red-400",
    warning: "border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-400",
    info: "border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-400",
    success: "border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400",
  };

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <h3 className="text-sm font-semibold font-display flex items-center gap-2 mb-4">
        <Bell className="h-4 w-4 text-primary" /> Smart Notifications
        <span className="ml-auto text-[10px] font-normal text-muted-foreground">{notifications.length} alerts</span>
      </h3>
      <div className="space-y-2">
        {notifications.map(n => (
          <div key={n.id} className={`flex items-start gap-3 rounded-xl border p-3 transition-colors ${colors[n.type]}`}>
            <n.icon className="h-4 w-4 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium">{n.title}</p>
              <p className="text-xs opacity-80 mt-0.5">{n.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
