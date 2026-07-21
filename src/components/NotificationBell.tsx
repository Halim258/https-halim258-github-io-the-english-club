import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { Bell, Check, CheckCheck, Trash2, Sparkles, Trophy, BookOpen, Flame, Info, MoreHorizontal, Settings, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { loadPrefs, playNotifSound, groupByRecency, NOTIF_CATEGORIES, type NotifCategory } from "@/lib/notification-prefs";
import NotificationPreferences from "./NotificationPreferences";

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

// Facebook-style circular avatar backgrounds per notification type
const typeAvatar: Record<string, string> = {
  achievement: "bg-gradient-to-br from-amber-400 to-orange-500 text-white",
  lesson: "bg-gradient-to-br from-primary to-primary/70 text-primary-foreground",
  streak: "bg-gradient-to-br from-orange-500 to-red-500 text-white",
  tip: "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white",
  info: "bg-gradient-to-br from-sky-500 to-blue-600 text-white",
};

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  const wks = Math.floor(days / 7);
  return `${wks}w`;
}

export default function NotificationBell() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"all" | "unread">("all");
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const [showPrefs, setShowPrefs] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<NotifCategory | "all">("all");
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  const visible = useMemo(() => {
    let list = tab === "unread" ? notifications.filter(n => !n.read) : notifications;
    if (categoryFilter !== "all") list = list.filter(n => n.type === categoryFilter);
    return list;
  }, [notifications, tab, categoryFilter]);
  const grouped = useMemo(() => groupByRecency(visible), [visible]);

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
          const n = payload.new as Notification;
          setNotifications(prev => [n, ...prev]);
          const prefs = loadPrefs();
          const muted = prefs.muted.includes(n.type as NotifCategory);
          if (!muted) {
            if (prefs.sound) playNotifSound();
            if (prefs.toast) {
              toast(n.title, {
                description: n.message,
                action: n.link ? { label: "Open", onClick: () => { window.location.href = n.link!; } } : undefined,
              });
            }
          }
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
        onClick={() => { setOpen(!open); setShowPrefs(false); }}
        className="relative rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-[18px] w-[18px]" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] px-1 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-background"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed sm:absolute top-16 sm:top-full right-2 sm:right-0 sm:mt-2 w-[min(94vw,380px)] rounded-2xl border bg-card shadow-2xl overflow-hidden z-50"
          >
            {/* Header — Facebook style */}
            <div className="px-4 pt-3 pb-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-extrabold tracking-tight font-display">Notifications</h3>
                <div className="flex items-center gap-0.5">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="rounded-full p-1.5 text-muted-foreground hover:bg-muted transition-colors"
                      title="Mark all as read"
                    >
                      <CheckCheck className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setShowPrefs(v => !v)}
                    className={`rounded-full p-1.5 transition-colors ${showPrefs ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted"}`}
                    title="Notification settings"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {!showPrefs && (
              <>
              {/* Tabs */}
              <div className="mt-2 flex items-center gap-1.5">
                {(["all", "unread"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                      tab === t
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {t === "all" ? "All" : `Unread${unreadCount ? ` (${unreadCount})` : ""}`}
                  </button>
                ))}
              </div>
              {/* Category filter chips */}
              <div className="mt-2 -mx-1 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setCategoryFilter("all")}
                  className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-colors ${
                    categoryFilter === "all" ? "bg-foreground text-background border-foreground" : "border-transparent bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  <Filter className="h-3 w-3" /> All types
                </button>
                {NOTIF_CATEGORIES.map(c => (
                  <button
                    key={c.key}
                    onClick={() => setCategoryFilter(c.key)}
                    className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-colors ${
                      categoryFilter === c.key ? "bg-foreground text-background border-foreground" : "border-transparent bg-muted text-muted-foreground hover:bg-muted/70"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              </>
              )}
            </div>

            {showPrefs ? (
              <NotificationPreferences onClose={() => setShowPrefs(false)} />
            ) : (
            {/* List */}
            <div className="overflow-y-auto max-h-[70vh] sm:max-h-[460px] px-1.5 pb-2">
              {visible.length === 0 ? (
                <div className="py-14 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                    <Bell className="h-6 w-6 text-muted-foreground/60" />
                  </div>
                  <p className="text-sm font-semibold">
                    {tab === "unread" ? "You're all caught up" : "No notifications yet"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {tab === "unread" ? "New alerts will show up here." : "Complete lessons to earn achievements!"}
                  </p>
                </div>
              ) : (
                grouped.map(group => (
                  <div key={group.label}>
                    <div className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {group.label}
                    </div>
                    {group.items.map((n) => {
                  const Icon = typeIcons[n.type] || Info;
                  const avatar = typeAvatar[n.type] || typeAvatar.info;
                  const row = (
                    <div
                      className={`relative flex gap-3 px-2.5 py-2.5 rounded-xl transition-colors hover:bg-muted/60 group cursor-pointer`}
                    >
                      {/* Avatar with small badge icon (FB style) */}
                      <div className="relative shrink-0">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${avatar} shadow-sm`}>
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 pr-6">
                        <p className={`text-[13px] leading-snug ${!n.read ? "font-semibold text-foreground" : "text-foreground/85"}`}>
                          <span className="font-bold">{n.title}</span>
                          <span className="mx-1 text-muted-foreground">·</span>
                          <span className="font-normal">{n.message}</span>
                        </p>
                        <p className={`text-[11px] mt-1 font-medium ${!n.read ? "text-primary" : "text-muted-foreground"}`}>
                          {timeAgo(n.created_at)}
                        </p>
                      </div>

                      {/* Unread blue dot */}
                      {!n.read && (
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-primary" />
                      )}

                      {/* Hover menu (three dots) */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setMenuFor(menuFor === n.id ? null : n.id);
                        }}
                        className={`absolute right-1.5 top-1.5 rounded-full p-1.5 bg-card border shadow-sm transition-opacity ${
                          menuFor === n.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                        title="Options"
                      >
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </button>

                      {menuFor === n.id && (
                        <div
                          className="absolute right-1.5 top-9 z-10 w-44 rounded-xl border bg-popover shadow-xl overflow-hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {!n.read && (
                            <button
                              onClick={(e) => { e.preventDefault(); markAsRead(n.id); setMenuFor(null); }}
                              className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-muted"
                            >
                              <Check className="h-3.5 w-3.5" /> Mark as read
                            </button>
                          )}
                          <button
                            onClick={(e) => { e.preventDefault(); deleteNotification(n.id); setMenuFor(null); }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-xs text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Remove this notification
                          </button>
                        </div>
                      )}
                    </div>
                  );

                  if (n.link) {
                    return (
                      <Link
                        key={n.id}
                        to={n.link}
                        onClick={() => { markAsRead(n.id); setOpen(false); }}
                        className="block"
                      >
                        {row}
                      </Link>
                    );
                  }
                  return (
                    <div key={n.id} onClick={() => markAsRead(n.id)}>
                      {row}
                    </div>
                  );
                    })}
                  </div>
                ))
              )}
            </div>
            )}

            {/* Footer */}
            <div className="border-t px-2 py-1.5 bg-muted/20">
              <Link
                to="/notifications"
                onClick={() => setOpen(false)}
                className="block text-center text-xs font-semibold text-primary hover:bg-muted rounded-lg py-2 transition-colors"
              >
                See all notifications
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
