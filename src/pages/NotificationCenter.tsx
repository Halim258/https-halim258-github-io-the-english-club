import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Bell, Trash2, Sparkles, Trophy, BookOpen, Flame, Info, Inbox, Settings, Filter, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import NotificationPreferences from "@/components/NotificationPreferences";
import { loadPrefs, playNotifSound, groupByRecency, NOTIF_CATEGORIES, type NotifCategory } from "@/lib/notification-prefs";
import { showRichNotifToast } from "@/lib/notification-toast";

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
  const [categoryFilter, setCategoryFilter] = useState<NotifCategory | "all">("all");
  const [showPrefs, setShowPrefs] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!user) return;
    async function load() {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);
      const rows = (data || []) as Notification[];
      setNotifications(rows.map(n => ({ ...n, read: true })));
      const unreadIds = rows.filter(n => !n.read).map(n => n.id);
      if (unreadIds.length > 0) {
        await supabase.from("notifications").update({ read: true }).in("id", unreadIds);
      }
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
          setNotifications(prev => [{ ...n, read: true }, ...prev]);
          void supabase.from("notifications").update({ read: true }).eq("id", n.id);
          const prefs = loadPrefs();
          if (!prefs.muted.includes(n.type as NotifCategory)) {
            if (prefs.sound) playNotifSound();
            if (prefs.toast) showRichNotifToast({ title: n.title, message: n.message, type: n.type, link: n.link });
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` },
        (payload) => {
          const updated = payload.new as Notification;
          setNotifications(prev => prev.map(n => n.id === updated.id ? updated : n));
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` },
        (payload) => {
          const removed = payload.old as Pick<Notification, "id">;
          setNotifications(prev => prev.filter(n => n.id !== removed.id));
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const deleteNotification = async (id: string) => {
    const removed = notifications.find(n => n.id === id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    await supabase.from("notifications").delete().eq("id", id);
    if (removed) {
      toast("Notification removed", {
        action: {
          label: "Undo",
          onClick: async () => {
            const { error } = await supabase.from("notifications").insert({
              id: removed.id,
              user_id: user?.id,
              title: removed.title,
              message: removed.message,
              type: removed.type,
              read: removed.read,
              link: removed.link,
              created_at: removed.created_at,
            });
            if (!error) setNotifications((prev) => [removed, ...prev.filter(n => n.id !== removed.id)]);
          },
        },
      });
    }
  };

  const filtered = useMemo(() => {
    let list = notifications;
    if (categoryFilter !== "all") list = list.filter(n => n.type === categoryFilter);
    const q = query.trim().toLowerCase();
    if (q) list = list.filter(n => (n.title + " " + n.message).toLowerCase().includes(q));
    return list;
  }, [notifications, categoryFilter, query]);
  const grouped = useMemo(() => groupByRecency(filtered), [filtered]);

  const clearAll = async () => {
    if (!user || notifications.length === 0) return;
    if (!confirm("Delete all notifications? This cannot be undone.")) return;
    await supabase.from("notifications").delete().eq("user_id", user.id);
    setNotifications([]);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-10 max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-2xl bg-muted animate-pulse" />
          <div className="space-y-2">
            <div className="h-6 w-40 rounded-md bg-muted animate-pulse" />
            <div className="h-3 w-24 rounded-md bg-muted animate-pulse" />
          </div>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-3 rounded-2xl border p-4">
              <div className="h-10 w-10 rounded-xl bg-muted animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-2/3 rounded bg-muted animate-pulse" />
                <div className="h-3 w-full rounded bg-muted animate-pulse" />
                <div className="h-2.5 w-16 rounded bg-muted animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-10 pb-24 md:pb-10 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-display">Notifications</h1>
              <p className="text-sm text-muted-foreground">
                 Viewed notifications are cleared automatically
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
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

      {/* Search */}
      <div className="relative mb-3">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notifications"
          className="w-full rounded-full border bg-card pl-9 pr-9 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="mb-3 flex flex-wrap gap-2">
        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="min-h-11 px-4 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10 sm:ml-auto"
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
             No notifications yet
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
                transition={{ delay: Math.min(i, 6) * 0.03 }}
                className="group flex gap-3 border bg-card p-3 transition-all hover:shadow-soft sm:p-4"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/50 ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">{n.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{n.message}</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1.5">{timeAgo(n.created_at)}</p>
                </div>
                <div className="flex shrink-0 flex-col gap-1 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
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
              <Link key={n.id} to={n.link}>
                {inner}
              </Link>
            ) : (
              <div key={n.id}>
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
