import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Bell, Check, CheckCheck, Trash2, Sparkles, Trophy, BookOpen, Flame, Info, Inbox, Settings, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import NotificationPreferences from "@/components/NotificationPreferences";
import { loadPrefs, playNotifSound, groupByRecency, NOTIF_CATEGORIES, type NotifCategory } from "@/lib/notification-prefs";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  link: string | null;
  created_at: string;
}

const typeIcons: Record<string, React.ElementType> = {
  achievement: Trophy,
  lesson: BookOpen,
  streak: Flame,
  tip: Sparkles,
  info: Info,
};

const typeColors: Record<string, string> = {
  achievement: "text-amber-500",
  lesson: "text-primary",
  streak: "text-orange-500",
  tip: "text-violet-500",
  info: "text-blue-500",
};

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}

export default function NotificationCenter() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [categoryFilter, setCategoryFilter] = useState<NotifCategory | "all">("all");
  const [showPrefs, setShowPrefs] = useState(false);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(50);
      setNotifications((data || []) as Notification[]);
      setLoading(false);
    }
    load();

    const channel = supabase
      .channel("notif-center")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` },
        (payload) => {
          const n = payload.new as Notification;
          setNotifications(prev => [n, ...prev]);
          const prefs = loadPrefs();
          if (!prefs.muted.includes(n.type as NotifCategory)) {
            if (prefs.sound) playNotifSound();
            if (prefs.toast) toast(n.title, { description: n.message });
          }
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const markAsRead = async (id: string) => {
    await supabase.from("notifications").update({ read: true }).eq("id", id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = async () => {
    if (!user) return;
    const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);
    if (unreadIds.length === 0) return;
    await supabase.from("notifications").update({ read: true }).in("id", unreadIds);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = async (id: string) => {
    await supabase.from("notifications").delete().eq("id", id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filtered = useMemo(() => {
    let list = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;
    if (categoryFilter !== "all") list = list.filter(n => n.type === categoryFilter);
    return list;
  }, [notifications, filter, categoryFilter]);
  const grouped = useMemo(() => groupByRecency(filtered), [filtered]);

  const clearAll = async () => {
    if (!user || notifications.length === 0) return;
    if (!confirm("Delete all notifications? This cannot be undone.")) return;
    await supabase.from("notifications").delete().eq("user_id", user.id);
    setNotifications([]);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-10 pb-24 md:pb-10 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-display">Notifications</h1>
              <p className="text-sm text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" className="rounded-full gap-1.5" onClick={markAllRead}>
                <CheckCheck className="h-3.5 w-3.5" /> Mark all read
              </Button>
            )}
            <Button
              variant={showPrefs ? "default" : "outline"}
              size="sm"
              className="rounded-full gap-1.5"
              onClick={() => setShowPrefs(v => !v)}
            >
              <Settings className="h-3.5 w-3.5" /> Settings
            </Button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showPrefs && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden rounded-2xl border bg-card"
          >
            <NotificationPreferences onClose={() => setShowPrefs(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {(["all", "unread"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {f === "all" ? "All" : `Unread (${unreadCount})`}
          </button>
        ))}
        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="ml-auto rounded-full px-4 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category filter chips */}
      <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1">
        <button
          onClick={() => setCategoryFilter("all")}
          className={`shrink-0 flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold border transition-colors ${
            categoryFilter === "all" ? "bg-foreground text-background border-foreground" : "border-border bg-card text-muted-foreground hover:bg-muted"
          }`}
        >
          <Filter className="h-3 w-3" /> All types
        </button>
        {NOTIF_CATEGORIES.map(c => (
          <button
            key={c.key}
            onClick={() => setCategoryFilter(c.key)}
            className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold border transition-colors ${
              categoryFilter === c.key ? "bg-foreground text-background border-foreground" : "border-border bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      {filtered.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Inbox className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground font-medium">
            {filter === "unread" ? "No unread notifications" : "No notifications yet"}
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">Complete lessons to earn achievements!</p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {grouped.map((group) => (
            <div key={group.label}>
              <div className="mb-2 px-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{group.label}</div>
              <div className="space-y-2">
                {group.items.map((n, i) => {
            const Icon = typeIcons[n.type] || Info;
            const color = typeColors[n.type] || "text-muted-foreground";
            const inner = (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`group flex gap-3 rounded-2xl border p-4 transition-all hover:shadow-soft ${
                  !n.read ? "bg-primary/[0.03] border-primary/15" : "bg-card"
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/50 ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold ${!n.read ? "" : "text-muted-foreground"}`}>{n.title}</p>
                    {!n.read && <div className="h-2 w-2 shrink-0 rounded-full bg-primary mt-1.5" />}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{n.message}</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1.5">{timeAgo(n.created_at)}</p>
                </div>
                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  {!n.read && (
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); markAsRead(n.id); }}
                      className="p-1.5 rounded-lg hover:bg-muted" title="Mark read"
                    >
                      <Check className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  )}
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); deleteNotification(n.id); }}
                    className="p-1.5 rounded-lg hover:bg-destructive/10" title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              </motion.div>
            );

            return n.link ? (
              <Link key={n.id} to={n.link} onClick={() => markAsRead(n.id)}>
                {inner}
              </Link>
            ) : (
              <div key={n.id} onClick={() => markAsRead(n.id)} className="cursor-pointer">
                {inner}
              </div>
            );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
