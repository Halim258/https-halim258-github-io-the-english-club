import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Activity, BookOpen, Award, Sparkles, Library, Target, Loader2,
} from "lucide-react";

export interface ActivityItem {
  kind: string;
  title: string;
  detail: string | null;
  amount: number | null;
  happened_at: string;
}

const KIND_META: Record<string, { icon: typeof BookOpen; tint: string; label: string }> = {
  lesson: { icon: BookOpen, tint: "text-blue-500 bg-blue-500/10", label: "Lesson" },
  xp: { icon: Sparkles, tint: "text-amber-500 bg-amber-500/10", label: "XP" },
  library: { icon: Library, tint: "text-violet-500 bg-violet-500/10", label: "Library" },
  badge: { icon: Award, tint: "text-emerald-500 bg-emerald-500/10", label: "Badge" },
  test: { icon: Target, tint: "text-rose-500 bg-rose-500/10", label: "Test" },
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function useActivityFeed(userId: string | undefined, limit = 40) {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data } = await supabase.rpc("get_student_activity_feed", {
        _user_id: userId,
        _limit: limit,
      });
      if (!cancelled) {
        setItems((data as ActivityItem[]) || []);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, limit]);

  return { items, loading };
}

interface Props {
  items: ActivityItem[];
  loading?: boolean;
  title?: string;
  emptyText?: string;
  max?: number;
}

export default function ActivityFeed({
  items,
  loading = false,
  title = "What they've done so far",
  emptyText = "No activity recorded yet.",
  max = 25,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? items : items.slice(0, max);

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" /> {title}
        </h2>
        <span className="text-[11px] text-muted-foreground">{items.length} events</span>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted-foreground py-6 text-center">{emptyText}</p>
      ) : (
        <>
          <ol className="relative space-y-3 pl-1">
            {shown.map((it, i) => {
              const meta = KIND_META[it.kind] || {
                icon: Activity,
                tint: "text-muted-foreground bg-muted",
                label: it.kind,
              };
              const Icon = meta.icon;
              return (
                <li key={`${it.kind}-${it.happened_at}-${i}`} className="flex items-start gap-3">
                  <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${meta.tint}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1 border-b border-border/60 pb-2.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-sm font-medium truncate capitalize">{it.title}</p>
                      <span className="text-[10px] text-muted-foreground shrink-0">{timeAgo(it.happened_at)}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate">
                      <span className="uppercase tracking-wide">{meta.label}</span>
                      {it.detail ? ` · ${it.detail}` : ""}
                      {typeof it.amount === "number" ? ` · ${it.amount}${it.kind === "xp" ? " XP" : it.kind === "lesson" ? "%" : ""}` : ""}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
          {items.length > max && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-3 w-full rounded-xl border py-2 text-xs font-medium text-muted-foreground hover:bg-muted/50 transition-colors"
            >
              {expanded ? "Show less" : `Show all ${items.length} events`}
            </button>
          )}
        </>
      )}
    </div>
  );
}
