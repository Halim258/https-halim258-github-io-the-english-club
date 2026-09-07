import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarDays, Clipboard, Facebook, Loader2, Megaphone, Pencil, Plus, Send, Trash2, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type BlogPost = {
  id: string;
  author_id: string;
  title: string;
  category: string;
  english: string;
  arabic: string | null;
  action: string | null;
  image_url: string | null;
  hashtags: string[];
  published: boolean;
  publish_date: string;
  created_at: string;
};

type Draft = {
  id?: string;
  title: string;
  category: string;
  english: string;
  arabic: string;
  action: string;
  image_url: string;
  hashtags: string;
  published: boolean;
  publish_date: string;
};

const todayISO = () => new Date().toISOString().slice(0, 10);

const emptyDraft = (): Draft => ({
  title: "",
  category: "Tip of the day",
  english: "",
  arabic: "",
  action: "",
  image_url: "",
  hashtags: "#TheEnglishClubAlexandria #LearnEnglish",
  published: true,
  publish_date: todayISO(),
});

const CATEGORIES = ["Tip of the day", "Grammar", "Vocabulary", "Speaking", "Exams", "School news"];

function buildShareText(post: BlogPost) {
  return [
    `📅 ${post.category} — ${new Date(post.publish_date).toDateString()}`,
    "",
    `🇬🇧 ${post.title}`,
    post.english,
    ...(post.arabic ? ["", `🇪🇬 ${post.title} (بالمصري)`, post.arabic] : []),
    ...(post.action ? ["", `🎯 Today's action: ${post.action}`] : []),
    "",
    "👉 theenglishclub.app/blog",
    "📲 WhatsApp: +20 155 490 1390",
    "",
    post.hashtags.join(" "),
  ].join("\n");
}

export default function SiteBlogFeed() {
  const { user, role } = useAuth();
  const isStaff = role === "admin" || role === "secretary" || role === "teacher";
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("publish_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(60);
    setLoading(false);
    if (error) {
      toast({ title: "Could not load posts", description: error.message, variant: "destructive" });
      return;
    }
    setPosts((data ?? []) as BlogPost[]);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const postedToday = useMemo(
    () => posts.some((p) => p.publish_date === todayISO() && p.published),
    [posts],
  );

  const savePost = async () => {
    if (!draft || !user) return;
    if (!draft.title.trim() || !draft.english.trim()) {
      toast({ title: "Add a title and the English text", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      title: draft.title.trim(),
      category: draft.category,
      english: draft.english.trim(),
      arabic: draft.arabic.trim() || null,
      action: draft.action.trim() || null,
      image_url: draft.image_url.trim() || null,
      hashtags: draft.hashtags.split(/\s+/).filter(Boolean),
      published: draft.published,
      publish_date: draft.publish_date || todayISO(),
    };
    const { error } = draft.id
      ? await supabase.from("blog_posts").update(payload).eq("id", draft.id)
      : await supabase.from("blog_posts").insert({ ...payload, author_id: user.id });
    setSaving(false);
    if (error) {
      toast({ title: "Could not save", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: draft.id ? "Post updated" : "Post published" });
    setDraft(null);
    void load();
  };

  const removePost = async (id: string) => {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      toast({ title: "Could not delete", description: error.message, variant: "destructive" });
      return;
    }
    setPosts((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Post deleted" });
  };

  const notifyStudents = async (post: BlogPost) => {
    setSendingId(post.id);
    const { data, error } = await supabase.rpc("notify_students", {
      _title: `📰 ${post.title}`,
      _message: [post.english, post.arabic, post.action && `🎯 ${post.action}`].filter(Boolean).join("\n\n"),
      _type: "tip",
      _link: "/blog",
    });
    setSendingId(null);
    if (error) {
      toast({ title: "Could not send", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Sent to students", description: `${typeof data === "number" ? data : 0} students notified.` });
  };

  const copyPost = async (post: BlogPost) => {
    await navigator.clipboard.writeText(buildShareText(post));
    toast({ title: "Post copied", description: "Paste it on the school's Facebook page." });
  };

  return (
    <section id="daily-posts" className="border-t bg-background py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <Megaphone className="h-4 w-4" /> Daily posts
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">The English Club journal</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              A short new post every day — in English and Egyptian Arabic — with one action to practise.
            </p>
          </div>
          {isStaff && (
            <div className="flex flex-col items-start gap-2 sm:items-end">
              {!postedToday && (
                <span className="text-xs font-semibold text-primary">No post for today yet</span>
              )}
              <Button onClick={() => setDraft(emptyDraft())} className="gap-2 rounded-none">
                <Plus className="h-4 w-4" /> Write today's post
              </Button>
            </div>
          )}
        </div>

        {isStaff && draft && (
          <div className="mb-8 border border-border bg-card p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">{draft.id ? "Edit post" : "New daily post"}</h3>
              <Button variant="ghost" size="icon" onClick={() => setDraft(null)} aria-label="Close editor">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label htmlFor="bp-title">Title</Label>
                <Input id="bp-title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="Learn 5 new words before you sleep" />
              </div>
              <div>
                <Label htmlFor="bp-cat">Category</Label>
                <select
                  id="bp-cat"
                  value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                  className="mt-1 h-10 w-full border border-input bg-background px-3 text-sm"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <Label htmlFor="bp-date">Publish date</Label>
                <Input id="bp-date" type="date" value={draft.publish_date} onChange={(e) => setDraft({ ...draft, publish_date: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="bp-en">English text</Label>
                <Textarea id="bp-en" rows={4} value={draft.english} onChange={(e) => setDraft({ ...draft, english: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="bp-ar">Arabic text (optional)</Label>
                <Textarea id="bp-ar" rows={4} dir="rtl" value={draft.arabic} onChange={(e) => setDraft({ ...draft, arabic: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="bp-action">Today's action (optional)</Label>
                <Input id="bp-action" value={draft.action} onChange={(e) => setDraft({ ...draft, action: e.target.value })} placeholder="Record yourself saying 3 sentences" />
              </div>
              <div>
                <Label htmlFor="bp-img">Image link (optional)</Label>
                <Input id="bp-img" value={draft.image_url} onChange={(e) => setDraft({ ...draft, image_url: e.target.value })} placeholder="https://..." />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="bp-tags">Hashtags</Label>
                <Input id="bp-tags" value={draft.hashtags} onChange={(e) => setDraft({ ...draft, hashtags: e.target.value })} />
              </div>
              <div className="flex items-center gap-3 md:col-span-2">
                <Switch id="bp-pub" checked={draft.published} onCheckedChange={(v) => setDraft({ ...draft, published: v })} />
                <Label htmlFor="bp-pub" className="cursor-pointer">
                  {draft.published ? "Visible on the site" : "Saved as a draft"}
                </Label>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button onClick={savePost} disabled={saving} className="gap-2 rounded-none">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {draft.id ? "Save changes" : "Publish post"}
              </Button>
              <Button variant="outline" className="rounded-none" onClick={() => setDraft(null)}>Cancel</Button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center gap-2 py-10 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading posts…
          </div>
        ) : posts.length === 0 ? (
          <p className="border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No posts yet. {isStaff ? "Write the first daily post above." : "Come back soon for the first daily post."}
          </p>
        ) : (
          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.id} className="flex flex-col bg-card p-5 md:p-6">
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    loading="lazy"
                    className="mb-4 h-44 w-full border border-border object-cover"
                  />
                )}
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                  <span>{post.category}</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {new Date(post.publish_date).toLocaleDateString()}
                  </span>
                  {!post.published && (
                    <span className="border border-border px-1.5 py-0.5 text-muted-foreground">Draft</span>
                  )}
                </div>
                <h3 className="mt-2 font-display text-xl font-bold leading-tight">{post.title}</h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{post.english}</p>
                {post.arabic && (
                  <p dir="rtl" className="mt-3 whitespace-pre-line text-sm leading-8 text-muted-foreground">{post.arabic}</p>
                )}
                {post.action && (
                  <p className="mt-4 border-l-[3px] border-primary bg-primary/5 px-3 py-2 text-sm font-medium">
                    🎯 {post.action}
                  </p>
                )}
                {post.hashtags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.hashtags.map((tag) => (
                      <span key={tag} className="bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  <Button size="sm" variant="outline" className="gap-1.5 rounded-none" onClick={() => copyPost(post)}>
                    <Clipboard className="h-3.5 w-3.5" /> Copy
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1.5 rounded-none" asChild>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://the-english-club.lovable.app/blog")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="h-3.5 w-3.5" /> Share
                    </a>
                  </Button>
                  {isStaff && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 rounded-none"
                        disabled={sendingId === post.id}
                        onClick={() => notifyStudents(post)}
                      >
                        {sendingId === post.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                        Notify students
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1.5 rounded-none"
                        onClick={() =>
                          setDraft({
                            id: post.id,
                            title: post.title,
                            category: post.category,
                            english: post.english,
                            arabic: post.arabic ?? "",
                            action: post.action ?? "",
                            image_url: post.image_url ?? "",
                            hashtags: post.hashtags.join(" "),
                            published: post.published,
                            publish_date: post.publish_date,
                          })
                        }
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </Button>
                      <Button size="sm" variant="ghost" className="gap-1.5 rounded-none text-destructive" onClick={() => removePost(post.id)}>
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </Button>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
