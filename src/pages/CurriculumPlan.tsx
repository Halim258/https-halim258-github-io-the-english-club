import { Link, useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Sparkles, Target, ListChecks, Trophy, MessageCircle } from "lucide-react";
import { categories } from "@/data/course-categories";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function CurriculumPlan() {
  const { categorySlug, courseIndex } = useParams();
  const navigate = useNavigate();
  const cat = categories.find((c) => c.slug === categorySlug);
  const idx = Number(courseIndex ?? 0);
  const course = cat?.courses[idx];

  const storageKey = `curriculum:${categorySlug}:${idx}`;
  const [completed, setCompleted] = useState<Set<number>>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch {
      return new Set();
    }
  });
  const [activeStep, setActiveStep] = useState<number>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const done: number[] = raw ? JSON.parse(raw) : [];
      return Math.min(done.length, (course?.modules?.length ?? 1) - 1);
    } catch { return 0; }
  });

  const modules = course?.modules ?? [];
  const totalSteps = modules.length;
  const percent = totalSteps > 0 ? Math.round((completed.size / totalSteps) * 100) : 0;

  const toggleComplete = (i: number) => {
    const next = new Set(completed);
    if (next.has(i)) next.delete(i); else next.add(i);
    setCompleted(next);
    try { localStorage.setItem(storageKey, JSON.stringify([...next])); } catch {}
  };

  const goStep = (n: number) => setActiveStep(Math.max(0, Math.min(totalSteps - 1, n)));

  const IconComp = cat?.icon;

  if (!cat || !course) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-xl font-bold">Curriculum not found</h1>
        <Button className="mt-4" onClick={() => navigate("/courses")}>Back to Courses</Button>
      </div>
    );
  }

  const currentModule = modules[activeStep];

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
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

          {/* Progress */}
          <div className="mt-4 max-w-2xl">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-muted-foreground">Curriculum progress</span>
              <span className="font-semibold text-primary">{completed.size}/{totalSteps} · {percent}%</span>
            </div>
            <Progress value={percent} className="h-2" />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 grid gap-6 md:grid-cols-[280px_1fr] max-w-5xl">
        {/* Roadmap sidebar */}
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
                      {done ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Circle className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground"}`} />
                      )}
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

        {/* Step content */}
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
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  Step {activeStep + 1} of {totalSteps} · {currentModule.week}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-display">{currentModule.title}</h2>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-primary mb-1.5">
                    <Target className="h-4 w-4" /> Goal
                  </div>
                  <p className="text-foreground leading-relaxed">{currentModule.goal}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-primary mb-2">
                    <ListChecks className="h-4 w-4" /> Activities
                  </div>
                  <ul className="space-y-2">
                    {currentModule.activities.map((a, i) => (
                      <li key={i} className="flex items-start gap-2.5 rounded-lg border bg-muted/30 px-3 py-2.5">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
                          {i + 1}
                        </span>
                        <span className="text-sm leading-relaxed">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button
                    onClick={() => toggleComplete(activeStep)}
                    variant={completed.has(activeStep) ? "outline" : "default"}
                    className="rounded-full flex-1 font-semibold"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1.5" />
                    {completed.has(activeStep) ? "Marked as done" : "Mark as done"}
                  </Button>
                  <a
                    href={`https://wa.me/201554901390?text=${encodeURIComponent(`Hi! I want to join the "${course.name}" (${cat.title}) — starting with ${currentModule.week}: ${currentModule.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="rounded-full w-full font-semibold">
                      <MessageCircle className="h-4 w-4 mr-1.5" />
                      Book this class
                    </Button>
                  </a>
                </div>
              </div>

              {/* Nav */}
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