import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Clock, CheckCircle2, XCircle,
  GraduationCap, BookOpen, BarChart3, Trophy, ChevronRight,
  AlertCircle, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FadeInUp, ScaleIn } from "@/components/AnimatedSection";
import {
  placementQuestions,
  scoreToCEFR,
  cefrDescriptions,
  type PlacementQuestion,
} from "@/data/placement-test-questions";
import { supabase } from "@/integrations/supabase/client";

type TestState = "intro" | "testing" | "results";

export default function PlacementTest() {
  const navigate = useNavigate();
  const [state, setState] = useState<TestState>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(placementQuestions.length).fill(null));
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
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

  const question = placementQuestions[currentIndex];
  const progress = ((currentIndex + 1) / placementQuestions.length) * 100;

  const startTest = () => {
    setState("testing");
    setStartTime(Date.now());
    setCurrentIndex(0);
    setAnswers(Array(placementQuestions.length).fill(null));
  };

  const confirmAnswer = () => {
    if (selectedOption === null) return;
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedOption;
    setAnswers(newAnswers);
    setConfirmed(true);
  };

  const nextQuestion = () => {
    setConfirmed(false);
    setSelectedOption(null);
    if (currentIndex < placementQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishTest();
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setConfirmed(false);
      setSelectedOption(answers[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const finishTest = useCallback(async () => {
    clearInterval(timerRef.current);
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const score = answers.reduce<number>((acc, ans, i) => {
      return acc + (ans === placementQuestions[i].correctIndex ? 1 : 0);
    }, 0);
    const cefrLevel = scoreToCEFR(score, placementQuestions.length);

    // Try to save
    try {
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from("placement_test_results").insert({
        user_id: user?.id ?? null,
        score,
        total_questions: placementQuestions.length,
        cefr_level: cefrLevel,
        answers: answers.map((ans, i) => ({
          questionId: placementQuestions[i].id,
          selected: ans,
          correct: placementQuestions[i].correctIndex,
          isCorrect: ans === placementQuestions[i].correctIndex,
        })),
        time_taken_seconds: timeTaken,
      } as any);
    } catch {
      // Silently fail — result is still shown
    }

    setState("results");
  }, [answers, startTime]);

  const score = answers.reduce<number>((acc, ans, i) => {
    return acc + (ans === placementQuestions[i].correctIndex ? 1 : 0);
  }, 0);
  const cefrLevel = scoreToCEFR(score, placementQuestions.length);
  const cefrInfo = cefrDescriptions[cefrLevel];

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // Level breakdown for results
  const levelBreakdown = (["A1", "A2", "B1", "B2", "C1", "C2"] as const).map((lvl) => {
    const levelQs = placementQuestions.filter((q) => q.level === lvl);
    const levelCorrect = levelQs.filter((q, _) => {
      const idx = placementQuestions.indexOf(q);
      return answers[idx] === q.correctIndex;
    }).length;
    return { level: lvl, correct: levelCorrect, total: levelQs.length };
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
                  Cambridge Placement Test
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-lg mx-auto">
                  Find your English level with our Cambridge-style assessment. 50 questions covering grammar, vocabulary, and reading comprehension.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.15}>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
                  {[
                    { icon: BookOpen, label: "50 Questions", sub: "Grammar, Vocab & Reading" },
                    { icon: Clock, label: "~20 Minutes", sub: "Take your time" },
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
                    <AlertCircle className="h-4 w-4 text-primary" /> Before You Start
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />Answer all questions — don't skip any</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />Don't use a dictionary or translator</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />Questions get harder as you progress</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />Your result will be saved to your account if logged in</li>
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
        {state === "testing" && (
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
                    Question {currentIndex + 1}
                    <span className="text-muted-foreground font-normal"> / {placementQuestions.length}</span>
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    question.type === "grammar" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" :
                    question.type === "vocabulary" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                    "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                  }`}>
                    {question.type}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {formatTime(elapsed)}
                </div>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-muted-foreground">Level: {question.level}</span>
                <span className="text-[10px] text-muted-foreground">{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Question card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="max-w-3xl mx-auto"
              >
                <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-soft">
                  {/* Reading passage */}
                  {question.passage && (
                    <div className="mb-6 p-4 rounded-xl bg-muted/50 border text-sm text-muted-foreground leading-relaxed italic">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 not-italic">Read the passage:</p>
                      {question.passage}
                    </div>
                  )}

                  <h2 className="text-lg md:text-xl font-semibold font-display mb-6">
                    {question.question}
                  </h2>

                  <div className="space-y-3">
                    {question.options.map((opt, i) => {
                      const isSelected = selectedOption === i;
                      const isCorrect = confirmed && i === question.correctIndex;
                      const isWrong = confirmed && isSelected && i !== question.correctIndex;

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

                  {/* Actions */}
                  <div className="mt-6 flex items-center justify-between">
                    <Button
                      variant="ghost"
                      onClick={prevQuestion}
                      disabled={currentIndex === 0}
                      className="rounded-full"
                    >
                      <ArrowLeft className="mr-1 h-4 w-4" /> Previous
                    </Button>

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
                        {currentIndex < placementQuestions.length - 1 ? (
                          <>Next <ArrowRight className="ml-1 h-4 w-4" /></>
                        ) : (
                          <>See Results <Trophy className="ml-1 h-4 w-4" /></>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Question dots */}
            <div className="max-w-3xl mx-auto mt-6 flex flex-wrap gap-1.5 justify-center">
              {placementQuestions.map((_, i) => {
                const answered = answers[i] !== null;
                const isCurrent = i === currentIndex;
                return (
                  <div
                    key={i}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      isCurrent
                        ? "bg-primary scale-125"
                        : answered
                        ? "bg-primary/40"
                        : "bg-muted-foreground/20"
                    }`}
                  />
                );
              })}
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
                    <p className="text-3xl font-bold text-primary font-display">{score}/{placementQuestions.length}</p>
                    <p className="text-xs text-muted-foreground mt-1">Correct Answers</p>
                  </div>
                  <div className="rounded-xl border bg-card p-5 shadow-soft">
                    <p className="text-3xl font-bold text-primary font-display">{Math.round((score / placementQuestions.length) * 100)}%</p>
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
                    {levelBreakdown.map((lb) => (
                      <div key={lb.level} className="flex items-center gap-3">
                        <span className="text-xs font-bold font-display w-8 shrink-0">{lb.level}</span>
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
                    <Button variant="outline" onClick={() => { setState("intro"); setElapsed(0); }} className="rounded-full px-6 font-semibold">
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
