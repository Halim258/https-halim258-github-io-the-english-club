import { Volume2, VolumeX, Bell, BellOff } from "lucide-react";
import { NOTIF_CATEGORIES, useNotifPrefs, type NotifCategory } from "@/lib/notification-prefs";

export default function NotificationPreferences({ onClose }: { onClose?: () => void }) {
  const [prefs, setPrefs] = useNotifPrefs();

  const toggleMuted = (cat: NotifCategory) => {
    const muted = prefs.muted.includes(cat)
      ? prefs.muted.filter(c => c !== cat)
      : [...prefs.muted, cat];
    setPrefs({ ...prefs, muted });
  };

  return (
    <div className="p-4 space-y-4">
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
            <span className={`relative h-5 w-9 rounded-full transition-colors ${prefs.sound ? "bg-primary" : "bg-muted-foreground/30"}`}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${prefs.sound ? "translate-x-4" : "translate-x-0.5"}`} />
            </span>
          </button>
          <button
            onClick={() => setPrefs({ ...prefs, toast: !prefs.toast })}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-muted transition-colors"
          >
            <span className="flex items-center gap-2.5 text-sm">
              {prefs.toast ? <Bell className="h-4 w-4 text-primary" /> : <BellOff className="h-4 w-4 text-muted-foreground" />}
              Pop-up toasts
            </span>
            <span className={`relative h-5 w-9 rounded-full transition-colors ${prefs.toast ? "bg-primary" : "bg-muted-foreground/30"}`}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${prefs.toast ? "translate-x-4" : "translate-x-0.5"}`} />
            </span>
          </button>
        </div>
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