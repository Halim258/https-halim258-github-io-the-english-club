import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronLeft, Timer, CheckCircle2, XCircle, Trophy, Zap, RotateCcw, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { lessons } from "@/data/lessons";
import { useTTS } from "@/hooks/useTTS";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { VocabWord } from "@/data/lessons";

interface QuizWord extends VocabWord {
  level: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const QUIZ_SIZE = 10;
const TIME_PER_QUESTION = 15;

export default function VocabQuiz() {
  const [searchParams] = useSearchParams();
  const levelFilter = searchParams.get("level") || "";
  const { speak } = useTTS();
  const { user } = useAuth();

  const allWords = useMemo(() => {
    const words: QuizWord[] = [];
    const seen = new Set<string>();
    Object.values(lessons).forEach((lesson) => {
      if (levelFilter && lesson.levelLabel.toLowerCase() !== levelFilter.toLowerCase()) return;
      lesson.vocabulary.forEach((w) => {
        const key = w.word.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          words.push({ ...w, level: lesson.levelLabel });
        }
      });
    });
    return words;
  }, [levelFilter]);

  const [quizWords, setQuizWords] = useState<QuizWord[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [phase, setPhase] = useState<"ready" | "playing" | "result">("ready");
  const [options, setOptions] = useState<string[]>([]);

  const startQuiz = useCallback(() => {
    const selected = shuffle(allWords).slice(0, QUIZ_SIZE);
    setQuizWords(selected);
    setCurrentIdx(0);
    setScore(0);
    setAnswered(null);
    setTimeLeft(TIME_PER_QUESTION);
    setPhase("playing");
  }, [allWords]);

  // Generate options for current question
  useEffect(() => {
    if (phase !== "playing" || quizWords.length === 0) return;
    const current = quizWords[currentIdx];
    const wrong = shuffle(allWords.filter((w) => w.word !== current.word))
      .slice(0, 3)
      .map((w) => w.definition);
    setOptions(shuffle([current.definition, ...wrong]));
  }, [currentIdx, phase, quizWords, allWords]);

  // Timer
  useEffect(() => {
    if (phase !== "playing" || answered) return;
    if (timeLeft <= 0) {
      setAnswered("__timeout__");
      setTimeout(() => nextQuestion(), 1500);
      return;
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, phase, answered]);

  function handleAnswer(option: string) {
    if (answered) return;
    const correct = option === quizWords[currentIdx].definition;
    if (correct) setScore((s) => s + 1);
    setAnswered(option);
    setTimeout(() => nextQuestion(), 1200);
  }

  function nextQuestion() {
    if (currentIdx + 1 >= quizWords.length) {
      setPhase("result");
      // Award XP
      if (user && score > 0) {
        awardXP(score * 10);
      }
    } else {
      setCurrentIdx((i) => i + 1);
      setAnswered(null);
      setTimeLeft(TIME_PER_QUESTION);
    }
  }

  async function awardXP(amount: number) {
    if (!user) return;
    const { data } = await supabase.from("user_xp").select("total_xp").eq("user_id", user.id).maybeSingle();
    if (data) {
      await supabase.from("user_xp").update({ total_xp: data.total_xp + amount }).eq("user_id", user.id);
    }
  }

  const current = quizWords[currentIdx];
  const pct = quizWords.length > 0 ? Math.round((score / quizWords.length) * 100) : 0;

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-violet-950/20 dark:via-background dark:to-indigo-950/20 py-8">
        <div className="container mx-auto px-4">
          <Link to="/flashcards" className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Back to Flashcards
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-4xl">🧠</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-display">Vocabulary Quiz</h1>
              <p className="text-sm text-muted-foreground">
                {levelFilter ? `${levelFilter.toUpperCase()} Level` : "All Levels"} — {QUIZ_SIZE} questions, timed
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-lg">
        <AnimatePresence mode="wait">
          {phase === "ready" && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-4xl mb-6">
                🧠
              </div>
              <h2 className="text-xl font-bold font-display mb-2">Ready to test your vocabulary?</h2>
              <p className="text-sm text-muted-foreground mb-1">{QUIZ_SIZE} questions • {TIME_PER_QUESTION}s per question</p>
              <p className="text-sm text-muted-foreground mb-6">Match the word to its correct definition</p>
              {allWords.length < 4 ? (
                <p className="text-sm text-destructive">Not enough words for this level. Try another level.</p>
              ) : (
                <Button onClick={startQuiz} size="lg" className="rounded-full px-8 font-semibold">
                  Start Quiz <Zap className="ml-2 h-4 w-4" />
                </Button>
              )}
            </motion.div>
          )}

          {phase === "playing" && current && (
            <motion.div
              key={`q-${currentIdx}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-6"
            >
              {/* Progress bar */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted-foreground">{currentIdx + 1}/{quizWords.length}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIdx + 1) / quizWords.length) * 100}%` }}
                  />
                </div>
                <div className={`flex items-center gap-1 text-sm font-bold ${timeLeft <= 5 ? "text-destructive" : "text-muted-foreground"}`}>
                  <Timer className="h-4 w-4" />
                  {timeLeft}s
                </div>
              </div>

              {/* Timer bar */}
              <div className="h-1 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${timeLeft <= 5 ? "bg-destructive" : "bg-primary"}`}
                  initial={{ width: "100%" }}
                  animate={{ width: `${(timeLeft / TIME_PER_QUESTION) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Question */}
              <div className="rounded-2xl border bg-card p-6 text-center shadow-soft">
                <Badge variant="outline" className="mb-3 text-[10px]">{current.level}</Badge>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold font-display">{current.word}</h2>
                  <button onClick={() => speak(current.word)} className="text-muted-foreground hover:text-primary transition-colors">
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
                {current.phonetic && (
                  <p className="text-sm text-muted-foreground">{current.phonetic}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">Choose the correct definition:</p>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {options.map((opt, i) => {
                  const isCorrect = opt === current.definition;
                  const isSelected = answered === opt;
                  const isTimeout = answered === "__timeout__";
                  const showResult = answered !== null;

                  let style = "border bg-card hover:bg-muted/50 hover:border-primary/30";
                  if (showResult && isCorrect) style = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20";
                  else if (showResult && isSelected && !isCorrect) style = "border-destructive bg-destructive/5";

                  return (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleAnswer(opt)}
                      disabled={!!answered}
                      className={`w-full text-left rounded-xl p-4 text-sm font-medium transition-all flex items-center gap-3 ${style}`}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {showResult && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-destructive shrink-0" />}
                    </motion.button>
                  );
                })}
              </div>

              {answered === "__timeout__" && (
                <p className="text-center text-sm text-destructive font-medium">⏰ Time's up!</p>
              )}

              {/* Score so far */}
              <div className="text-center text-xs text-muted-foreground">
                Score: {score}/{currentIdx + (answered ? 1 : 0)}
              </div>
            </motion.div>
          )}

          {phase === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="text-6xl mb-4">
                {pct >= 80 ? "🎉" : pct >= 50 ? "👍" : "📖"}
              </div>
              <h2 className="text-2xl font-bold font-display mb-2">Quiz Complete!</h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="rounded-2xl border bg-card p-4 shadow-soft">
                  <p className="text-3xl font-bold font-display text-primary">{score}/{quizWords.length}</p>
                  <p className="text-xs text-muted-foreground">Correct</p>
                </div>
                <div className="rounded-2xl border bg-card p-4 shadow-soft">
                  <p className="text-3xl font-bold font-display">{pct}%</p>
                  <p className="text-xs text-muted-foreground">Score</p>
                </div>
                {score > 0 && (
                  <div className="rounded-2xl border bg-card p-4 shadow-soft">
                    <p className="text-3xl font-bold font-display text-amber-500">+{score * 10}</p>
                    <p className="text-xs text-muted-foreground">XP Earned</p>
                  </div>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                {pct >= 80 ? "Outstanding! You're a vocabulary master! 🌟" :
                 pct >= 50 ? "Good job! Keep practicing to improve! 💪" :
                 "Keep learning — you'll get better with practice! 📚"}
              </p>

              <div className="flex gap-3 justify-center">
                <Button onClick={startQuiz} className="rounded-full gap-2">
                  <RotateCcw className="h-4 w-4" /> Play Again
                </Button>
                <Link to="/flashcards">
                  <Button variant="outline" className="rounded-full">Review Flashcards</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
