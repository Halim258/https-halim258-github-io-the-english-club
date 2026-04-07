import { useMemo } from "react";
import { motion } from "framer-motion";
import { UserPlus, DollarSign, Receipt, Calendar, Users, Activity } from "lucide-react";

interface Props {
  schoolStudents: any[];
  income: any[];
  outcome: any[];
  newcomers: any[];
  receipts: any[];
  sessions: any[];
}

interface FeedItem {
  id: string;
  icon: React.ElementType;
  color: string;
  title: string;
  time: Date;
  detail?: string;
}

export default function ActivityFeed({ schoolStudents, income, outcome, newcomers, receipts, sessions }: Props) {
  const items = useMemo(() => {
    const feed: FeedItem[] = [];

    // Recent students
    schoolStudents.slice(0, 8).forEach(s => {
      if (s.created_at) feed.push({
        id: `stu-${s.id}`,
        icon: Users,
        color: "text-blue-600 bg-blue-500/10",
        title: `${s.name} enrolled`,
        time: new Date(s.created_at),
        detail: s.group_id ? `Group ${s.group_id}` : undefined,
      });
    });

    // Recent income
    income.slice(0, 8).forEach(r => {
      if (r.date) feed.push({
        id: `inc-${r.id}`,
        icon: DollarSign,
        color: "text-emerald-600 bg-emerald-500/10",
        title: `+${r.amount.toLocaleString()} EGP received`,
        time: new Date(r.date),
        detail: r.reason || r.category || undefined,
      });
    });

    // Recent expenses
    outcome.slice(0, 5).forEach(r => {
      if (r.date) feed.push({
        id: `out-${r.id}`,
        icon: DollarSign,
        color: "text-red-600 bg-red-500/10",
        title: `-${r.amount.toLocaleString()} EGP spent`,
        time: new Date(r.date),
        detail: r.reason || r.category || undefined,
      });
    });

    // Recent leads
    newcomers.slice(0, 5).forEach(n => {
      if (n.the_date) feed.push({
        id: `new-${n.id}`,
        icon: UserPlus,
        color: "text-amber-600 bg-amber-500/10",
        title: `New lead: ${n.client_name}`,
        time: new Date(n.the_date),
        detail: n.access_method || undefined,
      });
    });

    // Sort by time, most recent first
    feed.sort((a, b) => b.time.getTime() - a.time.getTime());
    return feed.slice(0, 15);
  }, [schoolStudents, income, outcome, newcomers, receipts, sessions]);

  const timeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  };

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <h3 className="text-sm font-semibold font-display flex items-center gap-2 mb-4">
        <Activity className="h-4 w-4 text-primary" /> Activity Feed
      </h3>
      <div className="space-y-1 max-h-[400px] overflow-y-auto">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/30 transition-colors"
          >
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${item.color}`}>
              <item.icon className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{item.title}</p>
              {item.detail && <p className="text-[10px] text-muted-foreground truncate">{item.detail}</p>}
            </div>
            <span className="text-[10px] text-muted-foreground shrink-0">{timeAgo(item.time)}</span>
          </motion.div>
        ))}
        {items.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No recent activity.</p>}
      </div>
    </div>
  );
}
