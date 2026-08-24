import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface ReflectionCardProps {
  lessonTitle: string;
  levelLabel?: string;
  storageKey: string;
}

const REQUIRED = 5;

/** "Write what you learned" — 5 sentences, shared to the Community feed. */
export default function ReflectionCard({ lessonTitle, levelLabel, storageKey }: ReflectionCardProps) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    setText(localStorage.getItem(storageKey) || "");
    setPosted(localStorage.getItem(`${storageKey}-posted`) === "1");
  }, [storageKey]);

  useEffect(() => {
    if (text) localStorage.setItem(storageKey, text);
  }, [text, storageKey]);

  const sentences = useMemo(
    () => text.split(/[.!?\n]+/).map((s) => s.trim()).filter((s) => s.split(/\s+/).length >= 2),
    [text]
  );
  const count = Math.min(sentences.length, REQUIRED);
  const ready = sentences.length >= REQUIRED;

  const share = async () => {
    if (!user) {
      toast({ title: "Please sign in", description: "You need an account to post to the community." });
      return;
    }
    setPosting(true);
    const header = `📚 What I learned — ${lessonTitle}${levelLabel ? ` (${levelLabel})` : ""}`;
    const body = sentences.slice(0, 20).map((s, i) => `${i + 1}. ${s}`).join("\n");
    const { error } = await supabase
      .from("community_posts")
      .insert({ user_id: user.id, content: `${header}\n\n${body}` });
    setPosting(false);
    if (error) {
      toast({ title: "Could not post", description: error.message, variant: "destructive" });
      return;
    }
    setPosted(true);
    localStorage.setItem(`${storageKey}-posted`, "1");
    toast({ title: "Shared with the community 🎉", description: "Your reflection is now on the community feed." });
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl border border-border bg-card overflow-hidden">
      <div className="bg-gradient-to-r from-primary/15 to-accent/15 px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-widest">Write what you learned</span>
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Write <strong className="text-foreground">5 sentences</strong> about what you learned in this lesson. Your
          sentences will be shared as a post on the community feed.
        </p>
      </div>

      <div className="p-5 space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={7}
          placeholder={"1. Today I learned...\n2. I can now...\n3. A new word is...\n4. ...\n5. ..."}
          className="resize-none text-base leading-relaxed"
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{sentences.length} / {REQUIRED} sentences</span>
            {ready && (
              <span className="flex items-center gap-1 text-primary font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" /> Ready to share
              </span>
            )}
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(count / REQUIRED) * 100}%` }}
            />
          </div>
        </div>

        <Button onClick={share} disabled={!ready || posting} className="w-full gap-2">
          {posting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {posted ? "Share again to community" : "Share with the community"}
        </Button>
        {posted && (
          <p className="text-center text-xs text-muted-foreground">You already shared a reflection for this lesson.</p>
        )}
      </div>
    </div>
  );
}
