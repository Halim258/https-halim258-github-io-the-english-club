import { toast } from "sonner";
import { Trophy, BookOpen, Flame, Sparkles, Info } from "lucide-react";
import type { ComponentType } from "react";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  achievement: Trophy,
  lesson: BookOpen,
  streak: Flame,
  tip: Sparkles,
  info: Info,
};

const avatarClass: Record<string, string> = {
  achievement: "bg-gradient-to-br from-amber-400 to-orange-500 text-white",
  lesson: "bg-gradient-to-br from-primary to-primary/70 text-primary-foreground",
  streak: "bg-gradient-to-br from-orange-500 to-red-500 text-white",
  tip: "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white",
  info: "bg-gradient-to-br from-sky-500 to-blue-600 text-white",
};

const durationByType: Record<string, number> = {
  achievement: 8000,
  streak: 7000,
  lesson: 5000,
  tip: 5000,
  info: 4500,
};

export interface RichToastInput {
  title: string;
  message: string;
  type: string;
  link?: string | null;
}

export function showRichNotifToast(n: RichToastInput) {
  const Icon = iconMap[n.type] || Info;
  const avatar = avatarClass[n.type] || avatarClass.info;
  const duration = durationByType[n.type] ?? 5000;

  toast.custom(
    (id) => (
      <div
        role="status"
        className="pointer-events-auto w-[min(92vw,380px)] rounded-2xl border bg-card shadow-2xl ring-1 ring-black/5 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200"
      >
        <div className="flex items-start gap-3 p-3.5">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-sm ${avatar}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold leading-tight text-foreground line-clamp-2">{n.title}</p>
            <p className="mt-0.5 text-[12.5px] leading-snug text-muted-foreground line-clamp-3">{n.message}</p>
            <div className="mt-2 flex items-center gap-1.5">
              {n.link && (
                <button
                  onClick={() => { toast.dismiss(id); window.location.href = n.link!; }}
                  className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground hover:opacity-90 transition"
                >
                  Open
                </button>
              )}
              <button
                onClick={() => toast.dismiss(id)}
                className="rounded-full px-3 py-1 text-[11px] font-semibold text-muted-foreground hover:bg-muted transition"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      </div>
    ),
    { duration }
  );
}