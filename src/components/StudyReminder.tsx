import { useEffect, useMemo, useState } from "react";
import { Bell, BellOff, Clock, Flame, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { createNotification } from "@/lib/notifications";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStudyTime, formatDuration } from "@/hooks/useStudyTime";

const STORAGE_KEY = "study-reminder";

interface ReminderSettings {
  enabled: boolean;
  hour: number;
  minute: number;
  goalMinutes: number;
}

const DEFAULTS: ReminderSettings = { enabled: false, hour: 18, minute: 0, goalMinutes: 20 };
const GOALS = [10, 15, 20, 30, 45, 60];

const formatTime = (h: number, m: number) => {
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${ampm}`;
};

const dayLabel = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString(undefined, { weekday: "short" });

export default function StudyReminder() {
  const [settings, setSettings] = useState<ReminderSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULTS, ...JSON.parse(saved) } : DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { stats, refresh } = useStudyTime({ track: true });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (open) void refresh();
  }, [open, refresh]);

  const goalSeconds = settings.goalMinutes * 60;
  const todayPct = Math.min(100, Math.round((stats.todaySeconds / goalSeconds) * 100));
  const goalReached = stats.todaySeconds >= goalSeconds;

  const last7 = useMemo(() => {
    const map = new Map(stats.perDay.map((d) => [d.date, d.seconds]));
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(Date.now() - (6 - i) * 86400000).toISOString().slice(0, 10);
      return { date: d, seconds: map.get(d) ?? 0 };
    });
  }, [stats.perDay]);

  const bestDaySeconds = Math.max(1, ...last7.map((d) => d.seconds));
  const dailyAverage = stats.daysStudied ? Math.round(stats.totalSeconds / stats.daysStudied) : 0;

  // Daily reminder: only nags when today's goal is not reached yet.
  useEffect(() => {
    if (!settings.enabled) return;
    const check = () => {
      const now = new Date();
      if (now.getHours() !== settings.hour || now.getMinutes() !== settings.minute) return;
      const doneMins = Math.round(stats.todaySeconds / 60);
      const remaining = Math.max(0, settings.goalMinutes - doneMins);
      const title = goalReached ? "🎉 Daily goal reached!" : "📚 Time to study";
      const body = goalReached
        ? `You have studied ${formatDuration(stats.todaySeconds)} today. Great work — keep the streak alive tomorrow!`
        : doneMins > 0
          ? `You studied ${doneMins} min today. Just ${remaining} more min to hit your ${settings.goalMinutes}-min goal.`
          : `You have not studied yet today. ${settings.goalMinutes} minutes is all it takes to keep your streak. 🔥`;

      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(title, { body, icon: "/placeholder.svg" });
      }
      toast({ title, description: body });
      if (user?.id) {
        createNotification({ userId: user.id, title, message: body, type: "tip", link: "/courses" });
      }
    };
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, [settings, user, stats.todaySeconds, goalReached]);

  const enableNotifications = async () => {
    if (!("Notification" in window)) {
      toast({ title: "Not supported", description: "Browser notifications are not supported", variant: "destructive" });
      return;
    }
    if (window.top !== window.self) {
      setSettings((s) => ({ ...s, enabled: true }));
      toast({
        title: "Reminders on inside the app",
        description: "For pop-up reminders outside the app, open the site in its own browser tab.",
      });
      return;
    }
    const perm = Notification.permission === "granted" ? "granted" : await Notification.requestPermission();
    if (perm === "granted") {
      setSettings((s) => ({ ...s, enabled: true }));
      toast({ title: "Reminders enabled 🔔", description: `Daily at ${formatTime(settings.hour, settings.minute)}` });
    } else {
      toast({ title: "Permission denied", description: "Please allow notifications in your browser settings", variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative" aria-label="Study time and reminders">
          {settings.enabled ? (
            <>
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary" />
            </>
          ) : (
            <BellOff className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">Study time & reminders</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Today vs goal */}
          <div className="border border-border p-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Today</p>
                <p className="font-display text-3xl font-bold leading-none">
                  {formatDuration(stats.todaySeconds)}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Goal {settings.goalMinutes} min · {todayPct}%
              </p>
            </div>
            <div className="mt-3 h-2 w-full bg-muted">
              <div
                className="h-2 bg-primary transition-all duration-500"
                style={{ width: `${todayPct}%` }}
              />
            </div>
            <p className="mt-2 text-sm font-medium">
              {goalReached
                ? "🎉 Daily goal reached — nice work!"
                : `${Math.max(1, settings.goalMinutes - Math.round(stats.todaySeconds / 60))} min left to reach your goal.`}
            </p>
          </div>

          {/* Totals */}
          <div className="grid grid-cols-3 gap-px border border-border bg-border">
            <div className="bg-card p-3">
              <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                <TrendingUp className="h-3 w-3" /> 7 days
              </p>
              <p className="mt-1 font-display text-lg font-bold">{formatDuration(stats.weekSeconds)}</p>
            </div>
            <div className="bg-card p-3">
              <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                <Flame className="h-3 w-3" /> All time
              </p>
              <p className="mt-1 font-display text-lg font-bold">{formatDuration(stats.totalSeconds)}</p>
            </div>
            <div className="bg-card p-3">
              <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                <Target className="h-3 w-3" /> Average
              </p>
              <p className="mt-1 font-display text-lg font-bold">{formatDuration(dailyAverage)}</p>
            </div>
          </div>

          {/* Last 7 days */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Last 7 days</p>
            <div className="flex h-24 items-end gap-2">
              {last7.map((d) => (
                <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className={`w-full ${d.seconds > 0 ? "bg-primary" : "bg-muted"}`}
                    style={{ height: `${Math.max(4, (d.seconds / bestDaySeconds) * 72)}px` }}
                    title={`${dayLabel(d.date)}: ${formatDuration(d.seconds)}`}
                  />
                  <span className="text-[10px] text-muted-foreground">{dayLabel(d.date)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 shrink-0 text-muted-foreground" />
              <Select value={`${settings.hour}`} onValueChange={(v) => setSettings((s) => ({ ...s, hour: parseInt(v) }))}>
                <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => (
                    <SelectItem key={i} value={`${i}`}>{i % 12 || 12} {i >= 12 ? "PM" : "AM"}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm font-bold">:</span>
              <Select value={`${settings.minute}`} onValueChange={(v) => setSettings((s) => ({ ...s, minute: parseInt(v) }))}>
                <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[0, 15, 30, 45].map((m) => (
                    <SelectItem key={m} value={`${m}`}>{m.toString().padStart(2, "0")}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 shrink-0 text-muted-foreground" />
              <Select
                value={`${settings.goalMinutes}`}
                onValueChange={(v) => setSettings((s) => ({ ...s, goalMinutes: parseInt(v) }))}
              >
                <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {GOALS.map((g) => (
                    <SelectItem key={g} value={`${g}`}>{g} min a day</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {settings.enabled ? (
              <div className="space-y-2">
                <p className="text-sm font-medium text-primary">
                  Reminders active at {formatTime(settings.hour, settings.minute)}
                </p>
                <Button
                  variant="outline"
                  className="w-full rounded-none"
                  onClick={() => { setSettings((s) => ({ ...s, enabled: false })); toast({ title: "Reminders disabled" }); }}
                >
                  Turn off reminders
                </Button>
              </div>
            ) : (
              <Button className="w-full rounded-none" onClick={enableNotifications}>
                Turn on daily reminders
              </Button>
            )}
            {!user && (
              <p className="text-xs text-muted-foreground">
                Sign in to save your study time across devices.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
