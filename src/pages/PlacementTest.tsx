import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Clock, CheckCircle2, XCircle,
  GraduationCap, BookOpen, BarChart3, Trophy,
  AlertCircle, Sparkles, TrendingUp, Zap, Brain, Download
} from "lucide-react";
import { generateCertificate } from "@/lib/generate-certificate";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FadeInUp, ScaleIn } from "@/components/AnimatedSection";
import {
  questionBank,
  cefrDescriptions,
  selectNextQuestion,
  adaptiveScoreToCEFR,
  ADAPTIVE_CONFIG,
  LEVELS,
  type PlacementQuestion,
  type CEFRLevel,
} from "@/data/placement-test-questions";
import { supabase } from "@/integrations/supabase/client";

type TestState = "intro" | "testing" | "results";

interface AnsweredQuestion {
  question: PlacementQuestion;
  selectedIndex: number;
}

export default function PlacementTest() {
  const [state, setState] = useState<TestState>("intro");
  const [currentLevelIndex, setCurrentLevelIndex] = useState(ADAPTIVE_CONFIG.startLevelIndex);
  const [currentQuestion, setCurrentQuestion] = useState<PlacementQuestion | null>(null);
  const [answered, setAnswered] = useState<AnsweredQuestion[]>([]);
  const [usedIds, setUsedIds] = useState<Set<number>>(new Set());
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [consecutiveWrong, setConsecutiveWrong] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  // Timer
  useEffect(() => {
    if (state !== "testing") return;
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [state, startTime]);

  const progress = ((answered.length + (confirmed ? 1 : 0)) / ADAPTIVE_CONFIG.totalQuestions) * 100;

  const pickQuestion = useCallback((levelIdx: number, used: Set<number>) => {
    const q = selectNextQuestion(levelIdx, used);
    setCurrentQuestion(q);
    return q;
  }, []);

  const startTest = () => {
    const used = new Set<number>();
    setState("testing");
    setStartTime(Date.now());
    setAnswered([]);
    setUsedIds(used);
    setCurrentLevelIndex(ADAPTIVE_CONFIG.startLevelIndex);
    setConsecutiveCorrect(0);
    setConsecutiveWrong(0);
    setSelectedOption(null);
    setConfirmed(false);
    pickQuestion(ADAPTIVE_CONFIG.startLevelIndex, used);
  };

  const confirmAnswer = () => {
    if (selectedOption === null || !currentQuestion) return;
    setConfirmed(true);
  };

  const nextQuestion = useCallback(() => {
    if (selectedOption === null || !currentQuestion) return;

    const isCorrect = selectedOption === currentQuestion.correctIndex;
    const newAnswered = [...answered, { question: currentQuestion, selectedIndex: selectedOption }];
    const newUsed = new Set(usedIds);
    newUsed.add(currentQuestion.id);

    setAnswered(newAnswered);
    setUsedIds(newUsed);

    // Check if test is done
    if (newAnswered.length >= ADAPTIVE_CONFIG.totalQuestions) {
      finishTest(newAnswered);
      return;
    }

    // Adaptive level adjustment
    let newLevelIdx = currentLevelIndex;
    let newConsCorrect = isCorrect ? consecutiveCorrect + 1 : 0;
    let newConsWrong = isCorrect ? 0 : consecutiveWrong + 1;

    if (newConsCorrect >= ADAPTIVE_CONFIG.correctToLevelUp && currentLevelIndex < LEVELS.length - 1) {
      newLevelIdx = currentLevelIndex + 1;
      newConsCorrect = 0;
    } else if (newConsWrong >= ADAPTIVE_CONFIG.wrongToLevelDown && currentLevelIndex > 0) {
      newLevelIdx = currentLevelIndex - 1;
      newConsWrong = 0;
    }

    setCurrentLevelIndex(newLevelIdx);
    setConsecutiveCorrect(newConsCorrect);
    setConsecutiveWrong(newConsWrong);
    setSelectedOption(null);
    setConfirmed(false);
    pickQuestion(newLevelIdx, newUsed);
  }, [selectedOption, currentQuestion, answered, usedIds, currentLevelIndex, consecutiveCorrect, consecutiveWrong, pickQuestion]);

  const finishTest = useCallback(async (finalAnswered: AnsweredQuestion[]) => {
    clearInterval(timerRef.current);
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const cefrLevel = adaptiveScoreToCEFR(finalAnswered);
    const score = finalAnswered.filter((a) => a.selectedIndex === a.question.correctIndex).length;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from("placement_test_results").insert({
        user_id: user?.id ?? null,
        score,
        total_questions: finalAnswered.length,
        cefr_level: cefrLevel,
        answers: finalAnswered.map((a) => ({
          questionId: a.question.id,
          level: a.question.level,
          selected: a.selectedIndex,
          correct: a.question.correctIndex,
          isCorrect: a.selectedIndex === a.question.correctIndex,
        })),
        time_taken_seconds: timeTaken,
      } as any);
    } catch {
      // Silently fail
    }

    setState("results");
  }, [startTime]);

  // Computed results
  const score = answered.filter((a) => a.selectedIndex === a.question.correctIndex).length;
  const cefrLevel = adaptiveScoreToCEFR(answered);
  const cefrInfo = cefrDescriptions[cefrLevel];

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // Level breakdown for results
  const levelBreakdown = LEVELS.map((lvl) => {
    const levelAs = answered.filter((a) => a.question.level === lvl);
    const correct = levelAs.filter((a) => a.selectedIndex === a.question.correctIndex).length;
    return { level: lvl, correct, total: levelAs.length };
  });

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <AnimatePresence mode="wait">
        {/* ═══ INTRO ═══ */}
        {state === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-16 md:py-24"
          >
            <div className="max-w-2xl mx-auto text-center">
              <ScaleIn>
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 mb-6">
                  <GraduationCap className="h-10 w-10 text-primary" />
                </div>
              </ScaleIn>
              <FadeInUp>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display">
                  Adaptive Placement Test
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-lg mx-auto">
                  Our smart test adapts to your level in real-time. Answer correctly and questions get harder. Struggle, and they get easier — just like a real Cambridge assessment.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.15}>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
                  {[
                    { icon: Brain, label: "Adaptive AI", sub: "Adjusts to your level" },
                    { icon: Clock, label: "~10 Minutes", sub: "25 smart questions" },
                    { icon: BarChart3, label: "CEFR Level", sub: "A1 to C2 result" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border bg-card p-4 shadow-soft text-center">
                      <item.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                      <p className="text-sm font-semibold font-display">{item.label}</p>
                      <p className="text-[11px] text-muted-foreground">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </FadeInUp>

              <FadeInUp delay={0.25}>
                <div className="mt-10 p-5 rounded-xl border bg-muted/30 text-left max-w-lg mx-auto">
                  <h3 className="text-sm font-semibold font-display flex items-center gap-2 mb-3">
                    <AlertCircle className="h-4 w-4 text-primary" /> How It Works
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><TrendingUp className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />Questions adapt — correct answers → harder questions</li>
                    <li className="flex items-start gap-2"><Zap className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />Only 25 questions instead of 50 — faster & more accurate</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />Don't use a dictionary or translator</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />Your result saves automatically if logged in</li>
                  </ul>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.35}>
                <Button
                  size="lg"
                  onClick={startTest}
                  className="mt-8 rounded-full px-10 font-semibold font-display h-12 text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  Start Test <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </FadeInUp>
            </div>
          </motion.div>
        )}

        {/* ═══ TESTING ═══ */}
        {state === "testing" && currentQuestion && (
          <motion.div
            key="testing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-8 md:py-12"
          >
            {/* Top bar */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold font-display">
                    Question {answered.length + 1}
                    <span className="text-muted-foreground font-normal"> / {ADAPTIVE_CONFIG.totalQuestions}</span>
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    currentQuestion.type === "grammar" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" :
                    currentQuestion.type === "vocabulary" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                    "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                  }`}>
                    {currentQuestion.type}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {/* Adaptive level indicator */}
                  <div className="hidden sm:flex items-center gap-1.5">
                    {LEVELS.map((lvl, i) => (
                      <div
                        key={lvl}
                        className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                          i === currentLevelIndex
                            ? "bg-primary scale-y-150"
                            : i < currentLevelIndex
                            ? "bg-primary/30"
                            : "bg-muted-foreground/15"
                        }`}
                        title={lvl}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {formatTime(elapsed)}
                  </div>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Testing at: <strong className="text-foreground">{LEVELS[currentLevelIndex]}</strong>
                </span>
                <span className="text-[10px] text-muted-foreground">{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Question card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="max-w-3xl mx-auto"
              >
                <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-soft">
                  {/* Reading passage */}
                  {currentQuestion.passage && (
                    <div className="mb-6 p-4 rounded-xl bg-muted/50 border text-sm text-muted-foreground leading-relaxed italic">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 not-italic">Read the passage:</p>
                      {currentQuestion.passage}
                    </div>
                  )}

                  <h2 className="text-lg md:text-xl font-semibold font-display mb-6">
                    {currentQuestion.question}
                  </h2>

                  <div className="space-y-3">
                    {currentQuestion.options.map((opt, i) => {
                      const isSelected = selectedOption === i;
                      const isCorrect = confirmed && i === currentQuestion.correctIndex;
                      const isWrong = confirmed && isSelected && i !== currentQuestion.correctIndex;

                      return (
                        <button
                          key={i}
                          onClick={() => { if (!confirmed) setSelectedOption(i); }}
                          disabled={confirmed}
                          className={`w-full text-left rounded-xl border p-4 transition-all duration-200 flex items-center gap-3 group ${
                            isCorrect
                              ? "border-emerald-500 bg-emerald-500/10"
                              : isWrong
                              ? "border-destructive bg-destructive/10"
                              : isSelected
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "hover:border-primary/30 hover:bg-muted/30"
                          } ${confirmed ? "cursor-default" : "cursor-pointer"}`}
                        >
                          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                            isCorrect
                              ? "bg-emerald-500 text-white"
                              : isWrong
                              ? "bg-destructive text-destructive-foreground"
                              : isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                          }`}>
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="text-sm font-medium">{opt}</span>
                          {isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-500 ml-auto" />}
                          {isWrong && <XCircle className="h-5 w-5 text-destructive ml-auto" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Adaptive feedback after confirm */}
                  {confirmed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      {selectedOption === currentQuestion.correctIndex ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                          <span>Correct! {consecutiveCorrect + 1 >= ADAPTIVE_CONFIG.correctToLevelUp && currentLevelIndex < LEVELS.length - 1 ? "⬆️ Difficulty increasing..." : ""}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3.5 w-3.5 text-destructive" />
                          <span>Incorrect. {consecutiveWrong + 1 >= ADAPTIVE_CONFIG.wrongToLevelDown && currentLevelIndex > 0 ? "⬇️ Adjusting difficulty..." : ""}</span>
                        </>
                      )}
                    </motion.div>
                  )}

                  {/* Actions */}
                  <div className="mt-6 flex items-center justify-end">
                    {!confirmed ? (
                      <Button
                        onClick={confirmAnswer}
                        disabled={selectedOption === null}
                        className="rounded-full px-6 font-semibold"
                      >
                        Confirm Answer
                      </Button>
                    ) : (
                      <Button
                        onClick={nextQuestion}
                        className="rounded-full px-6 font-semibold"
                      >
                        {answered.length + 1 >= ADAPTIVE_CONFIG.totalQuestions ? (
                          <>See Results <Trophy className="ml-1 h-4 w-4" /></>
                        ) : (
                          <>Next <ArrowRight className="ml-1 h-4 w-4" /></>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Question dots */}
            <div className="max-w-3xl mx-auto mt-6 flex flex-wrap gap-1.5 justify-center">
              {answered.map((a, i) => (
                <div
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full ${
                    a.selectedIndex === a.question.correctIndex
                      ? "bg-emerald-500"
                      : "bg-destructive"
                  }`}
                  title={`Q${i + 1}: ${a.question.level} — ${a.selectedIndex === a.question.correctIndex ? "✓" : "✗"}`}
                />
              ))}
              {/* Current + remaining */}
              <div className="h-2.5 w-2.5 rounded-full bg-primary scale-125" />
              {Array.from({ length: Math.max(0, ADAPTIVE_CONFIG.totalQuestions - answered.length - 1) }).map((_, i) => (
                <div key={`rem-${i}`} className="h-2.5 w-2.5 rounded-full bg-muted-foreground/15" />
              ))}
            </div>
          </motion.div>
        )}

        {/* ═══ RESULTS ═══ */}
        {state === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-12 md:py-20"
          >
            <div className="max-w-2xl mx-auto text-center">
              <ScaleIn>
                <div className={`inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${cefrInfo.color} mb-6 shadow-lg`}>
                  <span className="text-3xl font-bold text-white font-display">{cefrLevel}</span>
                </div>
              </ScaleIn>

              <FadeInUp>
                <h1 className="text-3xl md:text-4xl font-bold font-display">
                  Your Level: {cefrLevel} — {cefrInfo.label}
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-lg mx-auto">
                  {cefrInfo.desc}
                </p>
              </FadeInUp>

              {/* Score summary */}
              <FadeInUp delay={0.1}>
                <div className="mt-10 grid grid-cols-3 gap-4">
                  <div className="rounded-xl border bg-card p-5 shadow-soft">
                    <p className="text-3xl font-bold text-primary font-display">{score}/{answered.length}</p>
                    <p className="text-xs text-muted-foreground mt-1">Correct Answers</p>
                  </div>
                  <div className="rounded-xl border bg-card p-5 shadow-soft">
                    <p className="text-3xl font-bold text-primary font-display">{answered.length > 0 ? Math.round((score / answered.length) * 100) : 0}%</p>
                    <p className="text-xs text-muted-foreground mt-1">Score</p>
                  </div>
                  <div className="rounded-xl border bg-card p-5 shadow-soft">
                    <p className="text-3xl font-bold text-primary font-display">{formatTime(elapsed)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Time Taken</p>
                  </div>
                </div>
              </FadeInUp>

              {/* Level breakdown */}
              <FadeInUp delay={0.2}>
                <div className="mt-8 rounded-2xl border bg-card p-6 shadow-soft text-left">
                  <h3 className="text-sm font-semibold font-display flex items-center gap-2 mb-4">
                    <BarChart3 className="h-4 w-4 text-primary" /> Performance by Level
                  </h3>
                  <div className="space-y-3">
                    {levelBreakdown.filter((lb) => lb.total > 0).map((lb) => (
                      <div key={lb.level} className="flex items-center gap-3">
                        <span className={`text-xs font-bold font-display w-8 shrink-0 ${lb.level === cefrLevel ? "text-primary" : ""}`}>{lb.level}</span>
                        <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${lb.total > 0 ? (lb.correct / lb.total) * 100 : 0}%` }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            className={`h-full rounded-full bg-gradient-to-r ${cefrDescriptions[lb.level].color}`}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-12 text-right">{lb.correct}/{lb.total}</span>
                      </div>
                    ))}
                  </div>

                  {/* Adaptive insight */}
                  <div className="mt-4 pt-4 border-t flex items-start gap-2 text-xs text-muted-foreground">
                    <Brain className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                    <span>
                      The adaptive algorithm tested you across {levelBreakdown.filter((lb) => lb.total > 0).length} levels,
                      focusing on your ability boundary. Only levels you were tested on are shown.
                    </span>
                  </div>
                </div>
              </FadeInUp>

              {/* Recommended course */}
              <FadeInUp delay={0.3}>
                <div className="mt-8 rounded-2xl border bg-gradient-to-br from-primary/10 to-primary/5 p-6 shadow-soft">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="text-base font-semibold font-display">Recommended Course</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on your results, we recommend starting with our <strong>{cefrLevel} — {cefrInfo.label}</strong> course.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link to={`/courses/${cefrLevel.toLowerCase()}`}>
                      <Button className="rounded-full px-6 font-semibold font-display">
                        Start {cefrLevel} Course <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="rounded-full px-6 font-semibold"
                      onClick={() => {
                        generateCertificate({
                          cefrLevel,
                          cefrLabel: cefrInfo.label,
                          score,
                          totalQuestions: answered.length,
                          percentage: answered.length > 0 ? Math.round((score / answered.length) * 100) : 0,
                          timeTaken: formatTime(elapsed),
                          date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
                        });
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" /> Download Certificate
                    </Button>
                    <Button variant="ghost" onClick={() => { setState("intro"); setElapsed(0); }} className="rounded-full px-6 font-semibold">
                      Retake Test
                    </Button>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
