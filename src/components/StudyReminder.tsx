import { useState, useEffect } from "react";
import { Bell, BellOff, Clock } from "lucide-react";
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

const STORAGE_KEY = "study-reminder";

interface ReminderSettings {
  enabled: boolean;
  hour: number;
  minute: number;
}

export default function StudyReminder() {
  const [settings, setSettings] = useState<ReminderSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { enabled: false, hour: 18, minute: 0 };
  });
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (!settings.enabled) return;
    const check = () => {
      const now = new Date();
      if (now.getHours() === settings.hour && now.getMinutes() === settings.minute) {
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("📚 Time to Study!", {
            body: "Your daily English lesson is waiting. Keep your streak going! 🔥",
            icon: "/placeholder.svg",
          });
        }
        toast({
          title: "📚 Time to Study!",
          description: "Your daily English lesson is waiting. Keep your streak going! 🔥",
        });
        if (user?.id) {
          createNotification({
            userId: user.id,
            title: "📚 Time to Study!",
            message: "Your daily English lesson is waiting. Keep your streak going! 🔥",
            type: "tip",
            link: "/courses",
          });
        }
      }
    };
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, [settings, user]);

  const enableNotifications = async () => {
    if (!("Notification" in window)) {
      toast({ title: "Not supported", description: "Browser notifications are not supported", variant: "destructive" });
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      setSettings((s) => ({ ...s, enabled: true }));
      toast({ title: "Reminders enabled! 🔔", description: `You'll be reminded daily at ${formatTime(settings.hour, settings.minute)}` });
    } else {
      toast({ title: "Permission denied", description: "Please allow notifications in your browser settings", variant: "destructive" });
    }
  };

  const formatTime = (h: number, m: number) => {
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative">
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
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">🔔 Study Reminders</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Get daily reminders to keep your English learning streak going!
          </p>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <Select
              value={`${settings.hour}`}
              onValueChange={(v) => setSettings((s) => ({ ...s, hour: parseInt(v) }))}
            >
              <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }, (_, i) => (
                  <SelectItem key={i} value={`${i}`}>
                    {i % 12 || 12} {i >= 12 ? "PM" : "AM"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm font-bold">:</span>
            <Select
              value={`${settings.minute}`}
              onValueChange={(v) => setSettings((s) => ({ ...s, minute: parseInt(v) }))}
            >
              <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
              <SelectContent>
                {[0, 15, 30, 45].map((m) => (
                  <SelectItem key={m} value={`${m}`}>{m.toString().padStart(2, "0")}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {settings.enabled ? (
            <div className="space-y-2">
              <p className="text-sm text-emerald-600 font-medium">
                ✅ Reminders active at {formatTime(settings.hour, settings.minute)}
              </p>
              <Button
                variant="outline"
                className="w-full rounded-full"
                onClick={() => { setSettings((s) => ({ ...s, enabled: false })); toast({ title: "Reminders disabled" }); }}
              >
                Disable Reminders
              </Button>
            </div>
          ) : (
            <Button className="w-full rounded-full" onClick={enableNotifications}>
              Enable Daily Reminders 🔔
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
