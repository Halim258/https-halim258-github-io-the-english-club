import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, Send, Sparkles, RotateCcw, CheckCircle2, AlertCircle, ArrowRight, Wand2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const PROMPTS = [
  { level: "A1-A2", emoji: "🏠", topic: "Describe your daily routine", hint: "Write 3-5 sentences about what you do every day." },
  { level: "A1-A2", emoji: "🍕", topic: "Your favorite food", hint: "What is it? Why do you like it? How often do you eat it?" },
  { level: "A2-B1", emoji: "✈️", topic: "A trip you want to take", hint: "Where would you go? Who would you go with? What would you do?" },
  { level: "B1", emoji: "📱", topic: "Technology in daily life", hint: "How does technology help you? Are there any downsides?" },
  { level: "B1-B2", emoji: "🎓", topic: "The importance of learning English", hint: "Why are you learning English? How will it help your future?" },
  { level: "B2", emoji: "🌍", topic: "Environmental problems", hint: "What are the biggest issues? What can individuals do to help?" },
  { level: "B2-C1", emoji: "💼", topic: "Write a formal email requesting time off", hint: "Include a greeting, reason, dates, and a polite closing." },
  { level: "C1", emoji: "📰", topic: "Social media's impact on society", hint: "Discuss both positive and negative effects with examples." },
  { level: "C1-C2", emoji: "🧠", topic: "Should AI replace teachers?", hint: "Present arguments for and against, then give your opinion." },
  { level: "C2", emoji: "⚖️", topic: "Write a persuasive essay on remote work", hint: "Use formal language, topic sentences, and a clear conclusion." },
];

interface GrammarMatch {
  message: string;
  shortMessage?: string;
  offset: number;
  length: number;
  replacements: { value: string }[];
  rule: { issueType?: string; category?: { name?: string } };
  context: { text: string; offset: number; length: number };
}

export default function WritingPractice() {
  const { user } = useAuth();
  const [selectedPrompt, setSelectedPrompt] = useState<typeof PROMPTS[0] | null>(null);
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [grammarLoading, setGrammarLoading] = useState(false);
  const [grammarMatches, setGrammarMatches] = useState<GrammarMatch[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleGrammarCheck = async () => {
    if (!text.trim() || text.trim().split(/\s+/).length < 3) {
      toast.error("Write at least 3 words to check grammar.");
      return;
    }

    setGrammarLoading(true);
    try {
      const body = new URLSearchParams({ text, language: "en-US" });
      const response = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!response.ok) throw new Error("Grammar API unavailable");
      const data = await response.json();
      setGrammarMatches((data.matches ?? []).slice(0, 12));
      toast.success(data.matches?.length ? "Grammar suggestions ready." : "No grammar issues found.");
    } catch (error) {
      console.error(error);
      toast.error("Free grammar checker is busy. Try again shortly.");
    } finally {
      setGrammarLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim() || text.trim().split(/\s+/).length < 5) {
      toast.error("Please write at least 5 words before submitting.");
      return;
    }
    setLoading(true);
    setFeedback(null);

    try {
      const systemPrompt = `You are a professional English writing tutor. The student is practicing at level ${selectedPrompt?.level || "B1"}.
Analyze their writing and provide feedback in this format:
📊 **Overall Score**: X/10
✅ **Strengths**: (2-3 things done well)
⚠️ **Areas to Improve**: (2-3 specific corrections with examples)
💡 **Tip**: (one actionable tip for improvement)
📝 **Corrected Version**: (rewrite their text with corrections)

Be encouraging but honest. Keep feedback concise.`;

      const { data, error } = await supabase.functions.invoke("ai-chat", {
        body: {
          messages: [{ role: "user", content: `Topic: "${selectedPrompt?.topic}"\n\nMy writing:\n${text}` }],
          systemPrompt,
        },
      });

      if (error) throw error;
      setFeedback(data.reply);
      setSubmitted(true);

      // Award XP
      if (user) {
        const { data: xpData } = await supabase.from("user_xp").select("total_xp").eq("user_id", user.id).maybeSingle();
        if (xpData) {
          await supabase.from("user_xp").update({ total_xp: xpData.total_xp + 15, last_activity_date: new Date().toISOString().split("T")[0] }).eq("user_id", user.id);
        }
        toast.success("🎉 +15 XP earned for writing practice!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to get feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText("");
    setFeedback(null);
    setGrammarMatches([]);
    setSubmitted(false);
    setSelectedPrompt(null);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-10 pb-24 md:pb-10 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
            <PenLine className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display">Writing Practice</h1>
            <p className="text-sm text-muted-foreground">Write, submit, and get AI-powered feedback instantly</p>
          </div>
        </div>
      </motion.div>

      {!selectedPrompt ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">Choose a writing prompt:</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {PROMPTS.map((p, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setSelectedPrompt(p)}
                className="group text-left rounded-2xl border bg-card p-4 shadow-soft hover:shadow-card hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{p.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-1.5">{p.level}</span>
                    <p className="text-sm font-semibold group-hover:text-primary transition-colors">{p.topic}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.hint}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors mt-1 shrink-0" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {/* Prompt header */}
          <div className="rounded-2xl border bg-gradient-to-r from-primary/8 to-accent/5 p-4">
            <div className="flex items-start gap-3">
              <span className="text-3xl">{selectedPrompt.emoji}</span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{selectedPrompt.level}</span>
                <h2 className="text-lg font-bold font-display">{selectedPrompt.topic}</h2>
                <p className="text-sm text-muted-foreground mt-1">{selectedPrompt.hint}</p>
              </div>
            </div>
          </div>

          {/* Writing area */}
          <div className="relative">
            <Textarea
              value={text}
              onChange={(e) => { setText(e.target.value); setGrammarMatches([]); }}
              placeholder="Start writing here..."
              className="min-h-[200px] rounded-2xl text-sm leading-relaxed resize-y"
              disabled={submitted}
            />
            <div className="absolute bottom-3 right-3 text-[10px] text-muted-foreground">
              {text.trim().split(/\s+/).filter(Boolean).length} words
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {!submitted ? (
              <>
                <Button onClick={handleSubmit} disabled={loading || !text.trim()} className="rounded-full gap-2">
                  {loading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Get Feedback
                    </>
                  )}
                </Button>
                <Button variant="ghost" onClick={handleReset} className="rounded-full">
                  <RotateCcw className="h-4 w-4 mr-1" /> Change Topic
                </Button>
                <Button variant="secondary" onClick={handleGrammarCheck} disabled={grammarLoading || !text.trim()} className="rounded-full gap-2">
                  {grammarLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                  Free Grammar Check
                </Button>
              </>
            ) : (
              <Button onClick={handleReset} className="rounded-full gap-2">
                <PenLine className="h-4 w-4" /> Write Again
              </Button>
            )}
          </div>

          {grammarMatches.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border bg-card p-5 shadow-soft">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold font-display">Free Grammar Suggestions</h3>
                </div>
                <Badge variant="secondary">{grammarMatches.length} found</Badge>
              </div>
              <div className="space-y-3">
                {grammarMatches.map((match, index) => (
                  <div key={`${match.offset}-${index}`} className="rounded-xl border bg-background p-4">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">{match.rule.category?.name || match.rule.issueType || "Suggestion"}</Badge>
                      <span className="text-sm font-medium">{match.shortMessage || match.message}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">“{match.context.text}”</p>
                    {match.replacements.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {match.replacements.slice(0, 5).map((replacement) => (
                          <Badge key={replacement.value} variant="secondary" className="text-[10px]">{replacement.value}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* AI Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-2xl border bg-card p-5 shadow-card"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold font-display">AI Feedback</h3>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap">
                  {feedback}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
