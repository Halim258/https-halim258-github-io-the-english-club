import { Link, useParams, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, CheckCircle2, Circle, Sparkles, Target, ListChecks,
  Trophy, MessageCircle, Clock, BookOpen, Youtube, NotebookPen, GraduationCap,
  Lightbulb, RotateCcw, Loader2, Download,
} from "lucide-react";
import { categories } from "@/data/course-categories";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { downloadWorksheet } from "@/lib/generate-worksheet";

const CATEGORY_TIPS: Record<string, string[]> = {
  painting: [
    "Set up a well-lit space and keep your reference image at eye level.",
    "Warm up with 5 minutes of loose sketching before starting the main piece.",
    "Squint at your subject to simplify values and shapes.",
    "Step back every 10 minutes — distance reveals mistakes your eye misses up close.",
  ],
  "music-lessons": [
    "Practice slowly with a metronome — speed comes from accuracy.",
    "Break the piece into 4-bar chunks and loop each until clean.",
    "Record yourself once per session and listen back.",
    "15 focused minutes daily beats 2 hours once a week.",
  ],
  spanish: [
    "Say every new word aloud 3 times — it locks in vocabulary faster.",
    "Think in Spanish for 2 minutes: describe the room around you silently.",
    "Use spaced repetition: review yesterday's words before learning new ones.",
    "Watch one short Spanish video daily with Spanish subtitles.",
  ],
  "kids-language-therapy": [
    "Follow the child's interest — motivation makes practice stick.",
    "Keep sessions short (10–15 min) and end on success.",
    "Model the correct form instead of correcting mistakes.",
    "Celebrate small wins with clear, specific praise.",
  ],
};

const ytSearch = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
const estimateMinutes = (activities: string[]) => 15 + activities.length * 12;

function generateQuiz(title: string, activities: string[], goal: string) {
  return [
    {
      question: `What is the main goal of "${title}"?`,
      options: [goal, "Memorize as many words as possible", "Skip practice and move on", "Focus only on speed"],
      correct: 0,
    },
    {
      question: `Which is an activity in "${title}"?`,
      options: [activities[0] ?? "Practice the module", "Take an unrelated exam", "Watch a random movie", "Read a newspaper"],
      correct: 0,
    },
    {
      question: "What is the best way to progress this week?",
      options: [
        "Practice a little every day and complete all activities",
        "Rush through everything in one sitting",
        "Skip the goal and focus only on the last exercise",
        "Wait until next week to start",
      ],
      correct: 0,
    },
  ];
}

type QuizItem = { question: string; options: string[]; correct: number };

function Quiz({
  items,
  answers,
  submitted,
  onAnswersChange,
  onSubmit,
  onReset,
}: {
  items: QuizItem[];
  answers: Record<number, number | undefined>;
  submitted: boolean;
  onAnswersChange: (next: Record<number, number | undefined>) => void;
  onSubmit: (score: number) => void;
  onReset: () => void;
}) {
  const score = items.reduce((s, it, i) => s + (answers[i] === it.correct ? 1 : 0), 0);
  const submit = () => {
    onSubmit(score);
    toast.success(`You scored ${score}/${items.length}`);
  };

  return (
    <div className="space-y-4">
      {items.map((it, qi) => (
        <div key={qi} className="rounded-xl border bg-card p-4">
          <p className="font-semibold text-sm mb-3">{qi + 1}. {it.question}</p>
          <div className="space-y-1.5">
            {it.options.map((opt, oi) => {
              const picked = answers[qi] === oi;
              const isCorrect = it.correct === oi;
              return (
                <button
                  key={oi}
                  onClick={() => !submitted && onAnswersChange({ ...answers, [qi]: oi })}
                  disabled={submitted}
                  className={`w-full text-left text-sm rounded-lg border px-3 py-2 transition-all ${
                    submitted && isCorrect
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      : submitted && picked && !isCorrect
                      ? "border-red-500 bg-red-500/10 text-red-700 dark:text-red-300"
                      : picked
                      ? "border-primary bg-primary/10"
                      : "hover:border-primary/40 hover:bg-muted/50"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <div className="flex items-center gap-2 pt-1">
        {!submitted ? (
          <Button onClick={submit} className="rounded-full font-semibold" disabled={Object.keys(answers).length < items.length}>
            Submit answers
          </Button>
        ) : (
          <>
            <Badge className="text-sm px-3 py-1">Score: {score}/{items.length}</Badge>
            <Button onClick={onReset} variant="outline" size="sm" className="rounded-full">
              <RotateCcw className="h-3.5 w-3.5 mr-1" /> Try again
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default function CurriculumPlan() {
  const { categorySlug, courseIndex } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const cat = categories.find((c) => c.slug === categorySlug);
  const idx = Number(courseIndex ?? 0);
  const course = cat?.courses[idx];

  const { state, update, loading: progressLoading, isAuthed } = useCurriculumProgress(categorySlug, idx);
  const completed = useMemo(() => new Set(state.completedSteps), [state.completedSteps]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [tab, setTab] = useState("overview");

  const modules = course?.modules ?? [];
  const totalSteps = modules.length;
  const percent = totalSteps > 0 ? Math.round((completed.size / totalSteps) * 100) : 0;
  const currentModule = modules[activeStep];

  useEffect(() => { setTab("overview"); }, [activeStep]);

  const stepKey = String(activeStep);
  const checked = state.checklists[stepKey] ?? {};
  const notes = state.notes[stepKey] ?? "";
  const quizAnswers = state.quizAnswers[stepKey] ?? {};
  const quizSubmitted = !!state.quizSubmitted[stepKey];

  const toggleActivity = (i: number) => {
    update((prev) => {
      const cur = prev.checklists[stepKey] ?? {};
      return {
        ...prev,
        checklists: { ...prev.checklists, [stepKey]: { ...cur, [i]: !cur[i] } },
      };
    });
  };
  const saveNotes = (v: string) => {
    update((prev) => ({ ...prev, notes: { ...prev.notes, [stepKey]: v } }));
  };
  const setQuizAnswers = (next: Record<number, number | undefined>) => {
    update((prev) => ({
      ...prev,
      quizAnswers: { ...prev.quizAnswers, [stepKey]: next as Record<string, number> },
    }));
  };
  const submitQuiz = (_score: number) => {
    update((prev) => ({
      ...prev,
      quizSubmitted: { ...prev.quizSubmitted, [stepKey]: true },
    }));
  };
  const resetQuiz = () => {
    update((prev) => {
      const nextAns = { ...prev.quizAnswers }; delete nextAns[stepKey];
      const nextSub = { ...prev.quizSubmitted }; delete nextSub[stepKey];
      return { ...prev, quizAnswers: nextAns, quizSubmitted: nextSub };
    });
  };

  const toggleComplete = (i: number) => {
    const wasDone = completed.has(i);
    update((prev) => {
      const set = new Set(prev.completedSteps);
      if (wasDone) set.delete(i); else set.add(i);
      return { ...prev, completedSteps: [...set].sort((a, b) => a - b) };
    });
    if (!wasDone) toast.success("Great work! Step marked complete 🎉");
  };

  const goStep = (n: number) => setActiveStep(Math.max(0, Math.min(totalSteps - 1, n)));
  const IconComp = cat?.icon;

  const minutes = currentModule ? estimateMinutes(currentModule.activities) : 0;
  const tips = cat ? CATEGORY_TIPS[cat.slug] ?? [] : [];
  const quizItems = useMemo(
    () => currentModule ? generateQuiz(currentModule.title, currentModule.activities, currentModule.goal) : [],
    [currentModule?.title, currentModule?.goal, currentModule?.activities.join("|")]
  );

  if (!authLoading && !user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (!cat || !course || !currentModule) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-xl font-bold">Curriculum not found</h1>
        <Button className="mt-4" onClick={() => navigate("/courses")}>Back to Courses</Button>
      </div>
    );
  }

  if (progressLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin mx-auto mb-3" />
        Loading your progress…
      </div>
    );
  }

  const checklistDone = currentModule.activities.filter((_, i) => checked[i]).length;
  const isFinished = completed.has(activeStep);
  const allDone = completed.size === totalSteps && totalSteps > 0;

  return (
    <div className="overflow-x-hidden">
      <section className="relative">
        <div className="relative h-40 md:h-52">
          <img src={cat.image} alt={cat.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 -mt-16 pb-4">
          <Link to={`/courses/category/${cat.slug}`} className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Back to {cat.title}
          </Link>
          <div className="flex items-center gap-3">
            <div className={`h-12 w-12 rounded-2xl ${cat.iconBg} flex items-center justify-center shadow-sm`}>
              {IconComp && <IconComp className="h-6 w-6 text-foreground" />}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{cat.title}</p>
              <h1 className="text-2xl md:text-3xl font-bold font-display leading-tight">{course.name}</h1>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{course.description}</p>
          <div className="mt-4 max-w-2xl">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-muted-foreground">Course progress</span>
              <span className="font-semibold text-primary">{completed.size}/{totalSteps} · {percent}%</span>
            </div>
            <Progress value={percent} className="h-2" />
            {allDone && (
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm">
                <Trophy className="h-4 w-4 text-emerald-500" />
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">Course complete! You finished "{course.name}".</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 grid gap-6 md:grid-cols-[280px_1fr] max-w-6xl">
        <aside className="rounded-2xl border bg-card p-3 h-fit md:sticky md:top-20">
          <p className="px-2 pt-1 pb-2 text-[11px] uppercase tracking-wider font-bold text-muted-foreground">Roadmap</p>
          <ol className="space-y-1">
            {modules.map((m, i) => {
              const done = completed.has(i);
              const active = i === activeStep;
              return (
                <li key={i}>
                  <button
                    onClick={() => goStep(i)}
                    className={`w-full text-left flex items-start gap-2.5 rounded-xl px-3 py-2.5 transition-all ${
                      active ? "bg-primary/10 border border-primary/30" : "hover:bg-muted/60 border border-transparent"
                    }`}
                  >
                    <span className="mt-0.5">
                      {done ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Circle className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground"}`} />}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{m.week}</span>
                      <span className={`block text-sm font-semibold leading-snug truncate ${active ? "text-primary" : ""}`}>{m.title}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border bg-card shadow-sm overflow-hidden"
            >
              <div className={`bg-gradient-to-br ${cat.color} p-6 border-b`}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex-wrap">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Step {activeStep + 1} of {totalSteps} · {currentModule.week}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-background/60 px-2 py-0.5 normal-case tracking-normal">
                    <Clock className="h-3 w-3" /> ~{minutes} min
                  </span>
                  {isFinished && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 normal-case tracking-normal">
                      <CheckCircle2 className="h-3 w-3" /> Completed
                    </span>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-display">{currentModule.title}</h2>
              </div>

              <Tabs value={tab} onValueChange={setTab} className="p-4 md:p-6">
                <TabsList className="w-full flex-wrap h-auto justify-start gap-1 bg-muted/50">
                  <TabsTrigger value="overview" className="gap-1.5"><Target className="h-3.5 w-3.5" /> Overview</TabsTrigger>
                  <TabsTrigger value="learn" className="gap-1.5"><BookOpen className="h-3.5 w-3.5" /> Learn</TabsTrigger>
                  <TabsTrigger value="practice" className="gap-1.5"><ListChecks className="h-3.5 w-3.5" /> Practice</TabsTrigger>
                  <TabsTrigger value="quiz" className="gap-1.5"><GraduationCap className="h-3.5 w-3.5" /> Quiz</TabsTrigger>
                  <TabsTrigger value="notes" className="gap-1.5"><NotebookPen className="h-3.5 w-3.5" /> Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-5 space-y-5">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-primary mb-1.5">
                      <Target className="h-4 w-4" /> Learning goal
                    </div>
                    <p className="text-foreground leading-relaxed">{currentModule.goal}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-primary mb-2">
                      <ListChecks className="h-4 w-4" /> What you'll do
                    </div>
                    <ul className="space-y-2">
                      {currentModule.activities.map((a, i) => (
                        <li key={i} className="flex items-start gap-2.5 rounded-lg border bg-muted/30 px-3 py-2.5">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">{i + 1}</span>
                          <span className="text-sm leading-relaxed">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="learn" className="mt-5 space-y-5">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-primary mb-2">
                      <BookOpen className="h-4 w-4" /> Key concepts
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {(course.topics ?? []).map((t) => (
                        <div key={t} className="rounded-xl border bg-muted/30 px-3 py-2.5">
                          <p className="text-sm font-semibold">{t}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Applied this week through the activities on the right.</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {tips.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-sm font-bold text-primary mb-2">
                        <Lightbulb className="h-4 w-4" /> Pro tips
                      </div>
                      <ul className="space-y-2">
                        {tips.map((t, i) => (
                          <li key={i} className="flex gap-2 text-sm">
                            <span className="text-primary">•</span>
                            <span className="text-muted-foreground leading-relaxed">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-primary mb-2">
                      <Youtube className="h-4 w-4" /> Watch & learn
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {currentModule.activities.slice(0, 4).map((a, i) => (
                        <a
                          key={i}
                          href={ytSearch(`${course.name} ${a} tutorial`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group rounded-xl border bg-card px-3 py-2.5 hover:border-primary/40 hover:bg-muted/40 transition"
                        >
                          <p className="text-sm font-semibold truncate group-hover:text-primary">{a}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">Open YouTube tutorials →</p>
                        </a>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="practice" className="mt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-primary">
                      <ListChecks className="h-4 w-4" /> Activity checklist
                    </div>
                    <Badge variant="secondary">{checklistDone}/{currentModule.activities.length}</Badge>
                  </div>
                  <ul className="space-y-2">
                    {currentModule.activities.map((a, i) => (
                      <li key={i}>
                        <button
                          onClick={() => toggleActivity(i)}
                          className={`w-full text-left flex items-start gap-3 rounded-xl border px-3 py-3 transition ${
                            checked[i] ? "bg-emerald-500/5 border-emerald-500/40" : "bg-card hover:bg-muted/40"
                          }`}
                        >
                          {checked[i] ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                          )}
                          <span className={`text-sm leading-relaxed ${checked[i] ? "line-through text-muted-foreground" : ""}`}>{a}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-xl border bg-muted/30 p-3">
                    <p className="text-xs text-muted-foreground">💡 Try to complete every activity before taking the quiz.</p>
                  </div>
                </TabsContent>

                <TabsContent value="quiz" className="mt-5">
                  <Quiz
                    items={quizItems}
                    answers={quizAnswers as Record<number, number | undefined>}
                    submitted={quizSubmitted}
                    onAnswersChange={setQuizAnswers}
                    onSubmit={submitQuiz}
                    onReset={resetQuiz}
                  />
                </TabsContent>

                <TabsContent value="notes" className="mt-5 space-y-2">
                  <p className="text-sm font-semibold flex items-center gap-2 text-primary">
                    <NotebookPen className="h-4 w-4" /> Your notes
                  </p>
                  <Textarea
                    value={notes}
                    onChange={(e) => saveNotes(e.target.value)}
                    placeholder="Write reflections, questions, or new words you learned this week…"
                    className="min-h-[180px]"
                  />
                  <p className="text-[11px] text-muted-foreground">Saved automatically to your account and synced across devices.</p>
                </TabsContent>
              </Tabs>

              <div className="flex flex-col sm:flex-row gap-2 px-4 md:px-6 pb-4">
                <Button onClick={() => toggleComplete(activeStep)} variant={isFinished ? "outline" : "default"} className="rounded-full flex-1 font-semibold">
                  <CheckCircle2 className="h-4 w-4 mr-1.5" />
                  {isFinished ? "Marked as done" : "Mark step as done"}
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full flex-1 font-semibold"
                  onClick={() => {
                    downloadWorksheet({
                      categoryTitle: cat.title,
                      courseName: course.name,
                      stepNumber: activeStep + 1,
                      totalSteps,
                      week: currentModule.week,
                      title: currentModule.title,
                      goal: currentModule.goal,
                      activities: currentModule.activities,
                      topics: course.topics,
                      tips,
                      quiz: quizItems.map((q) => ({ question: q.question, options: q.options })),
                      estimatedMinutes: minutes,
                    });
                    toast.success("Worksheet downloaded — practice offline anytime.");
                  }}
                >
                  <Download className="h-4 w-4 mr-1.5" /> Download worksheet
                </Button>
                <a
                  href={`https://wa.me/201554901390?text=${encodeURIComponent(`Hi! I want to join the "${course.name}" (${cat.title}) — starting with ${currentModule.week}: ${currentModule.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" className="rounded-full w-full font-semibold">
                    <MessageCircle className="h-4 w-4 mr-1.5" /> Book this class
                  </Button>
                </a>
              </div>

              <div className="flex items-center justify-between border-t bg-muted/30 p-4">
                <Button variant="ghost" onClick={() => goStep(activeStep - 1)} disabled={activeStep === 0} className="rounded-full">
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                {activeStep < totalSteps - 1 ? (
                  <Button onClick={() => goStep(activeStep + 1)} className="rounded-full font-semibold">
                    Next step <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                    <Trophy className="h-4 w-4" /> Final step
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}