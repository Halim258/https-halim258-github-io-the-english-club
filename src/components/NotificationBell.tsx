import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Bell, Check, CheckCheck, Trash2, X, Sparkles, Trophy, BookOpen, Flame, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

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
  return `${days}d ago`;
}

export default function NotificationBell() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);
      if (data) setNotifications(data as Notification[]);
    };

    load();

    // Realtime subscription
    const channel = supabase
      .channel("user-notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` },
        (payload) => {
          setNotifications(prev => [payload.new as Notification, ...prev]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAsRead = async (id: string) => {
    await supabase.from("notifications").update({ read: true }).eq("id", id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = async () => {
    if (!user) return;
    const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
    if (unreadIds.length === 0) return;
    await supabase.from("notifications").update({ read: true }).in("id", unreadIds);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = async (id: string) => {
    await supabase.from("notifications").delete().eq("id", id);
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-80 max-h-[420px] rounded-xl border bg-card shadow-xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
              <h3 className="text-sm font-semibold font-display">Notifications</h3>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[10px] text-primary hover:underline font-medium flex items-center gap-1"
                  >
                    <CheckCheck className="h-3 w-3" /> Mark all read
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            <div className="overflow-y-auto max-h-[340px] divide-y divide-border/50">
              {notifications.length === 0 ? (
                <div className="py-10 text-center">
                  <Bell className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No notifications yet</p>
                  <p className="text-[11px] text-muted-foreground/60 mt-1">Complete lessons to earn achievements!</p>
                </div>
              ) : (
                notifications.map((n) => {
                  const Icon = typeIcons[n.type] || Info;
                  const color = typeColors[n.type] || "text-muted-foreground";
                  const content = (
                    <div
                      key={n.id}
                      className={`flex gap-3 px-4 py-3 transition-colors hover:bg-muted/30 group ${!n.read ? "bg-primary/[0.03]" : ""}`}
                    >
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted/50 ${color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-xs font-semibold leading-tight ${!n.read ? "" : "text-muted-foreground"}`}>{n.title}</p>
                          {!n.read && <div className="h-2 w-2 shrink-0 rounded-full bg-primary mt-1" />}
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">{n.message}</p>
                        <p className="text-[10px] text-muted-foreground/60 mt-1">{timeAgo(n.created_at)}</p>
                      </div>
                      <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!n.read && (
                          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); markAsRead(n.id); }} className="p-1 rounded hover:bg-muted" title="Mark read">
                            <Check className="h-3 w-3 text-muted-foreground" />
                          </button>
                        )}
                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); deleteNotification(n.id); }} className="p-1 rounded hover:bg-destructive/10" title="Delete">
                          <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                    </div>
                  );

                  if (n.link) {
                    return (
                      <Link key={n.id} to={n.link} onClick={() => { markAsRead(n.id); setOpen(false); }}>
                        {content}
                      </Link>
                    );
                  }
                  return <div key={n.id} onClick={() => markAsRead(n.id)} className="cursor-pointer">{content}</div>;
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
