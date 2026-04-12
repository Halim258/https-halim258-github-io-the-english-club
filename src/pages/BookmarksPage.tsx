import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bookmark, BookOpen, ArrowRight, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface BookmarkItem {
  id: string;
  level_id: string;
  lesson_number: number;
  created_at: string;
}

const LEVEL_LABELS: Record<string, string> = {
  reading: "Reading", a1: "A1", a2: "A2", b1: "B1", b2: "B2",
  c1: "C1", c2: "C2", conversation: "Conversation", business: "Business",
  kids: "Kids", healthcare: "Healthcare", finance: "Finance",
  legal: "Legal", hospitality: "Hospitality",
};

const LEVEL_COLORS: Record<string, string> = {
  a1: "from-emerald-400 to-emerald-600", a2: "from-teal-400 to-teal-600",
  b1: "from-blue-400 to-blue-600", b2: "from-indigo-400 to-indigo-600",
  c1: "from-violet-400 to-violet-600", c2: "from-purple-400 to-purple-600",
  reading: "from-amber-400 to-amber-600", conversation: "from-rose-400 to-rose-600",
  business: "from-slate-400 to-slate-600", kids: "from-pink-400 to-pink-600",
};

export default function BookmarksPage() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const { data } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      setBookmarks((data || []) as BookmarkItem[]);
      setLoading(false);
    }
    load();
  }, [user]);

  const removeBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    toast.success("Bookmark removed");
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-10 pb-24 md:pb-10 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
            <Bookmark className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display">My Bookmarks</h1>
            <p className="text-sm text-muted-foreground">{bookmarks.length} saved lesson{bookmarks.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
      </motion.div>

      {bookmarks.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Bookmark className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground font-medium">No bookmarks yet</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Bookmark lessons to quickly find them later</p>
          <Link to="/courses">
            <Button size="sm" className="rounded-full mt-4">Browse Courses</Button>
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-2">
          {bookmarks.map((b, i) => {
            const color = LEVEL_COLORS[b.level_id] || "from-primary to-primary";
            const label = LEVEL_LABELS[b.level_id] || b.level_id.toUpperCase();
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="group flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-soft hover:shadow-card transition-all duration-200"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white text-xs font-bold`}>
                  {label}
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/courses/${b.level_id}/${b.lesson_number}/slides`}
                    className="text-sm font-semibold hover:text-primary transition-colors"
                  >
                    {label} — Lesson {b.lesson_number}
                  </Link>
                  <p className="text-[10px] text-muted-foreground">
                    Saved {new Date(b.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Link to={`/courses/${b.level_id}/${b.lesson_number}/slides`}>
                    <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                    onClick={() => removeBookmark(b.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
