import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, CheckCircle2, XCircle, Lightbulb, Trophy, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Challenge {
  id: string;
  challenge_type: string;
  question: string;
  options: string[];
  correct_answer: string;
  xp_reward: number;
  difficulty: string;
  hint: string | null;
}

// Fallback challenges generated client-side when no DB challenge exists
const fallbackChallenges = [
  { question: "What is the past tense of 'go'?", options: ["goed", "went", "gone", "goes"], correct_answer: "went", hint: "It's an irregular verb", type: "grammar" },
  { question: "Choose the correct word: 'She ___ to school every day.'", options: ["go", "goes", "going", "gone"], correct_answer: "goes", hint: "Third person singular", type: "grammar" },
  { question: "What does 'benevolent' mean?", options: ["Evil", "Kind", "Loud", "Quick"], correct_answer: "Kind", hint: "Think of 'bene' meaning good", type: "vocabulary" },
  { question: "Which is the correct spelling?", options: ["Necessary", "Neccessary", "Necesary", "Neccesary"], correct_answer: "Necessary", hint: "One C, two S's", type: "spelling" },
  { question: "Complete: 'If I ___ rich, I would travel.'", options: ["am", "was", "were", "be"], correct_answer: "were", hint: "Second conditional uses subjunctive", type: "grammar" },
  { question: "What's a synonym for 'happy'?", options: ["Sad", "Elated", "Angry", "Tired"], correct_answer: "Elated", hint: "Think of extreme joy", type: "vocabulary" },
  { question: "Which sentence is correct?", options: ["Me and him went", "Him and I went", "He and I went", "I and he went"], correct_answer: "He and I went", hint: "Subject pronouns before verbs", type: "grammar" },
];

export default function DailyChallenge() {
  const { user } = useAuth();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChallenge();
  }, [user]);

  async function loadChallenge() {
    const today = new Date().toISOString().split("T")[0];

    // Check DB for today's challenge
    const { data: dbChallenge } = await supabase
      .from("daily_challenges")
      .select("*")
      .eq("challenge_date", today)
      .maybeSingle();

    if (dbChallenge) {
      // Check if already completed
      if (user) {
        const { data: completion } = await supabase
          .from("daily_challenge_completions")
          .select("is_correct, xp_earned")
          .eq("user_id", user.id)
          .eq("challenge_id", dbChallenge.id)
          .maybeSingle();

        if (completion) {
          setCompleted(true);
          setIsCorrect(completion.is_correct);
        }
      }

      setChallenge({
        id: dbChallenge.id,
        challenge_type: dbChallenge.challenge_type,
        question: dbChallenge.question,
        options: dbChallenge.options as string[],
        correct_answer: dbChallenge.correct_answer,
        xp_reward: dbChallenge.xp_reward,
        difficulty: dbChallenge.difficulty,
        hint: dbChallenge.hint,
      });
    } else {
      // Use fallback
      const dayIndex = new Date().getDate() % fallbackChallenges.length;
      const fb = fallbackChallenges[dayIndex];
      setChallenge({
        id: `fallback-${today}`,
        challenge_type: fb.type,
        question: fb.question,
        options: fb.options,
        correct_answer: fb.correct_answer,
        xp_reward: 20,
        difficulty: "medium",
        hint: fb.hint,
      });
    }
    setLoading(false);
  }

  async function handleAnswer(answer: string) {
    if (completed || !challenge) return;
    setSelected(answer);
    const correct = answer === challenge.correct_answer;
    setIsCorrect(correct);
    setCompleted(true);

    if (user && !challenge.id.startsWith("fallback")) {
      await supabase.from("daily_challenge_completions").insert({
        user_id: user.id,
        challenge_id: challenge.id,
        is_correct: correct,
        xp_earned: correct ? challenge.xp_reward : 0,
      });

      if (correct) {
        // Award XP
        const { data: xpData } = await supabase
          .from("user_xp")
          .select("total_xp")
          .eq("user_id", user.id)
          .maybeSingle();

        if (xpData) {
          await supabase
            .from("user_xp")
            .update({ total_xp: xpData.total_xp + challenge.xp_reward })
            .eq("user_id", user.id);
        }
      }
    }
  }

  if (loading || !challenge) {
    return (
      <div className="rounded-2xl border bg-card p-5 shadow-soft animate-pulse">
        <div className="h-5 w-32 bg-muted rounded mb-3" />
        <div className="h-4 w-full bg-muted rounded mb-4" />
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-10 bg-muted rounded-xl" />)}
        </div>
      </div>
    );
  }

  const diffColor = challenge.difficulty === "easy" ? "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400" :
    challenge.difficulty === "hard" ? "text-rose-600 bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400" :
    "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border bg-gradient-to-br from-amber-500/5 via-card to-orange-500/5 p-5 shadow-soft"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold font-display flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-500" />
          Daily Challenge
        </h2>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${diffColor}`}>
            {challenge.difficulty}
          </span>
          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
            +{challenge.xp_reward} XP
          </span>
        </div>
      </div>

      <p className="text-sm font-medium mb-4">{challenge.question}</p>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <AnimatePresence>
          {challenge.options.map((opt, i) => {
            const isSelected = selected === opt;
            const isAnswer = opt === challenge.correct_answer;
            let optStyle = "border-border bg-card hover:bg-muted/50 hover:border-primary/30";

            if (completed) {
              if (isAnswer) optStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300";
              else if (isSelected && !isCorrect) optStyle = "border-destructive bg-destructive/10 text-destructive";
              else optStyle = "border-border bg-muted/30 opacity-50";
            }

            return (
              <motion.button
                key={opt}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleAnswer(opt)}
                disabled={completed}
                className={`rounded-xl border p-2.5 text-xs font-medium transition-all duration-200 text-left ${optStyle}`}
              >
                <div className="flex items-center gap-2">
                  {completed && isAnswer && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />}
                  {completed && isSelected && !isCorrect && <XCircle className="h-3.5 w-3.5 text-destructive shrink-0" />}
                  <span>{opt}</span>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {!completed && challenge.hint && (
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          <Lightbulb className="h-3 w-3" /> {showHint ? challenge.hint : "Show hint"}
        </button>
      )}

      {completed && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-3 text-center text-sm font-medium ${
            isCorrect
              ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
              : "bg-destructive/10 text-destructive border border-destructive/20"
          }`}
        >
          {isCorrect ? (
            <span className="flex items-center justify-center gap-2">
              <Trophy className="h-4 w-4" /> Correct! +{challenge.xp_reward} XP earned!
            </span>
          ) : (
            <span>Not quite! The answer was: <strong>{challenge.correct_answer}</strong></span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
