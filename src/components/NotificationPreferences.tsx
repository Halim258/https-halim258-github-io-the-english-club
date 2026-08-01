import { Volume2, VolumeX, Bell, BellOff, Monitor, Moon, Hash } from "lucide-react";
import { NOTIF_CATEGORIES, useNotifPrefs, requestDesktopPermission, type NotifCategory } from "@/lib/notification-prefs";

function Toggle({ on }: { on: boolean }) {
  return (
    <span className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted-foreground/30"}`}>
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-background shadow transition-transform ${on ? "translate-x-4" : "translate-x-0.5"}`} />
    </span>
  );
}

export default function NotificationPreferences({ onClose }: { onClose?: () => void }) {
  const [prefs, setPrefs] = useNotifPrefs();

  const toggleMuted = (cat: NotifCategory) => {
    const muted = prefs.muted.includes(cat)
      ? prefs.muted.filter(c => c !== cat)
      : [...prefs.muted, cat];
    setPrefs({ ...prefs, muted });
  };

  const toggleDesktop = async () => {
    if (!prefs.desktop) {
      const granted = await requestDesktopPermission();
      if (!granted) return;
    }
    setPrefs({ ...prefs, desktop: !prefs.desktop });
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Delivery</h4>
        <div className="space-y-1.5">
          <button
            onClick={() => setPrefs({ ...prefs, sound: !prefs.sound })}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-muted transition-colors"
          >
            <span className="flex items-center gap-2.5 text-sm">
              {prefs.sound ? <Volume2 className="h-4 w-4 text-primary" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
              Sound
            </span>
            <Toggle on={prefs.sound} />
          </button>
          <button
            onClick={() => setPrefs({ ...prefs, toast: !prefs.toast })}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-muted transition-colors"
          >
            <span className="flex items-center gap-2.5 text-sm">
              {prefs.toast ? <Bell className="h-4 w-4 text-primary" /> : <BellOff className="h-4 w-4 text-muted-foreground" />}
              Pop-up toasts
            </span>
            <Toggle on={prefs.toast} />
          </button>
          <button
            onClick={toggleDesktop}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-muted transition-colors"
          >
            <span className="flex items-center gap-2.5 text-sm">
              <Monitor className={`h-4 w-4 ${prefs.desktop ? "text-primary" : "text-muted-foreground"}`} />
              Desktop alerts
            </span>
            <Toggle on={prefs.desktop} />
          </button>
          <button
            onClick={() => setPrefs({ ...prefs, titleBadge: !prefs.titleBadge })}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-muted transition-colors"
          >
            <span className="flex items-center gap-2.5 text-sm">
              <Hash className={`h-4 w-4 ${prefs.titleBadge ? "text-primary" : "text-muted-foreground"}`} />
              Unread count in tab title
            </span>
            <Toggle on={prefs.titleBadge} />
          </button>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Quiet hours</h4>
        <button
          onClick={() => setPrefs({ ...prefs, quietHours: !prefs.quietHours })}
          className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-muted transition-colors"
        >
          <span className="flex items-center gap-2.5 text-sm">
            <Moon className={`h-4 w-4 ${prefs.quietHours ? "text-primary" : "text-muted-foreground"}`} />
            Silence alerts at night
          </span>
          <Toggle on={prefs.quietHours} />
        </button>
        {prefs.quietHours && (
          <div className="mt-2 flex items-center gap-2 px-3">
            {(["quietFrom", "quietTo"] as const).map((k) => (
              <label key={k} className="flex-1 text-[11px] text-muted-foreground">
                {k === "quietFrom" ? "From" : "To"}
                <select
                  value={prefs[k]}
                  onChange={(e) => setPrefs({ ...prefs, [k]: Number(e.target.value) })}
                  className="mt-1 w-full rounded-lg border bg-background px-2 py-1.5 text-xs text-foreground outline-none"
                >
                  {hours.map(h => (
                    <option key={h} value={h}>{String(h).padStart(2, "0")}:00</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Mute categories</h4>
        <div className="grid grid-cols-2 gap-1.5">
          {NOTIF_CATEGORIES.map(c => {
            const muted = prefs.muted.includes(c.key);
            return (
              <button
                key={c.key}
                onClick={() => toggleMuted(c.key)}
                className={`text-xs rounded-lg px-3 py-2 border transition-all ${
                  muted
                    ? "border-dashed border-muted-foreground/40 text-muted-foreground bg-transparent"
                    : "border-primary/25 bg-primary/5 text-foreground"
                }`}
              >
                {muted ? "🔕 " : "🔔 "}{c.label}
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-muted-foreground mt-2">Muted categories still arrive but stay silent (no sound / toast).</p>
      </div>

      {onClose && (
        <button onClick={onClose} className="w-full text-xs font-semibold rounded-lg py-2 bg-muted hover:bg-muted/70 transition-colors">
          Done
        </button>
      )}
    </div>
  );
}