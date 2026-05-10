import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Headphones, Newspaper, BookMarked, Library as LibraryIcon, ArrowRight, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";

type Row = {
  id: string;
  item_type: "book" | "audiobook" | "article" | "word";
  item_key: string;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  url: string | null;
  viewed_at: string;
  completed: boolean;
};

const TYPE_META = {
  book: { icon: BookOpen, label: "Books read", color: "from-amber-400 to-orange-500" },
  audiobook: { icon: Headphones, label: "Audiobooks started", color: "from-rose-400 to-pink-500" },
  article: { icon: Newspaper, label: "Articles viewed", color: "from-sky-400 to-blue-500" },
  word: { icon: BookMarked, label: "Words looked up", color: "from-violet-400 to-purple-500" },
} as const;

export default function LibraryProgressCard() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("library_history")
      .select("id,item_type,item_key,title,subtitle,image_url,url,viewed_at,completed")
      .eq("user_id", user.id)
      .order("viewed_at", { ascending: false })
      .then(({ data }) => {
        setRows((data as Row[]) || []);
        setLoading(false);
      });
  }, [user]);

  if (loading) return null;

  const counts = (Object.keys(TYPE_META) as (keyof typeof TYPE_META)[]).map((t) => ({
    type: t,
    total: rows.filter((r) => r.item_type === t).length,
    completed: rows.filter((r) => r.item_type === t && r.completed).length,
  }));
  const totalViewed = rows.length;
  const totalCompleted = rows.filter((r) => r.completed).length;
  const recent = rows.slice(0, 3);

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold font-display flex items-center gap-2">
          <LibraryIcon className="h-4 w-4 text-primary" />
          Library Progress
        </h2>
        <Link to="/library" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
          Open Library <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {totalViewed === 0 ? (
        <div className="text-center py-6">
          <p className="text-sm text-muted-foreground mb-3">You haven't opened anything from the Library yet.</p>
          <Link to="/library" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            Browse free books, audiobooks & news <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
            {counts.map(({ type, total, completed }) => {
              const meta = TYPE_META[type];
              const Icon = meta.icon;
              return (
                <div key={type} className="rounded-xl border bg-background/50 p-3 text-center">
                  <div className={`mx-auto h-8 w-8 rounded-lg bg-gradient-to-br ${meta.color} flex items-center justify-center mb-1.5`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-xl font-bold font-display leading-tight">{total}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{meta.label}</p>
                  {completed > 0 && (
                    <Badge variant="secondary" className="text-[9px] mt-1 px-1.5 py-0 inline-flex items-center gap-0.5">
                      <CheckCircle2 className="h-2.5 w-2.5" /> {completed} done
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Recently opened</h3>
            <span className="text-[10px] text-muted-foreground">{totalCompleted}/{totalViewed} completed</span>
          </div>
          <div className="space-y-1.5">
            {recent.map((r) => {
              const meta = TYPE_META[r.item_type];
              const Icon = meta.icon;
              const Wrapper: any = r.url ? "a" : "div";
              const props = r.url ? { href: r.url, target: "_blank", rel: "noreferrer" } : {};
              return (
                <Wrapper
                  key={r.id}
                  {...props}
                  className="flex items-center gap-2.5 rounded-lg border bg-background/40 px-2.5 py-2 hover:bg-background transition-colors"
                >
                  {r.image_url ? (
                    <img src={r.image_url} alt="" className="h-8 w-8 rounded object-cover bg-muted shrink-0" />
                  ) : (
                    <div className={`h-8 w-8 rounded bg-gradient-to-br ${meta.color} flex items-center justify-center shrink-0`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold line-clamp-1">{r.title}</p>
                    <p className="text-[10px] text-muted-foreground line-clamp-1">{r.subtitle || meta.label}</p>
                  </div>
                  {r.completed && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />}
                </Wrapper>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}