import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, GraduationCap, Mic2, Brain, Trophy, Radio, 
  ArrowRight, X, Sparkles, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ONBOARDING_KEY = "onboarding_completed";

const steps = [
  {
    icon: Sparkles,
    title: "Welcome to The English Club! 🎉",
    desc: "We're excited to have you here. Let us show you around the platform so you can start learning right away.",
    color: "from-primary to-primary/80",
  },
  {
    icon: GraduationCap,
    title: "Find Your Level",
    desc: "Take our free Cambridge Placement Test to discover your CEFR level (A1–C2). This helps us recommend the right courses for you.",
    color: "from-blue-500 to-blue-600",
    action: { label: "Take Placement Test", to: "/placement-test" },
  },
  {
    icon: BookOpen,
    title: "200+ Structured Lessons",
    desc: "Each lesson includes vocabulary, grammar, conversation practice, speaking drills, exams, and homework — a complete learning experience.",
    color: "from-emerald-500 to-emerald-600",
    action: { label: "Browse Courses", to: "/courses" },
  },
  {
    icon: Brain,
    title: "AI-Powered Learning Tools",
    desc: "Chat with our AI Tutor, practice pronunciation with the checker, use flashcards with spaced repetition, and listen to FM Radio.",
    color: "from-violet-500 to-violet-600",
  },
  {
    icon: Trophy,
    title: "Track Your Progress",
    desc: "Earn XP, maintain streaks, unlock achievements, and climb the leaderboard. Your dashboard shows everything at a glance.",
    color: "from-amber-500 to-amber-600",
    action: { label: "Go to Dashboard", to: "/dashboard" },
  },
];

export default function OnboardingTour() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const completed = localStorage.getItem(ONBOARDING_KEY);
    if (!completed) {
      // Show after a brief delay so the page settles
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem(ONBOARDING_KEY, "true");
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const handleAction = (to: string) => {
    handleClose();
    navigate(to);
  };

  if (!show) return null;

  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/50"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-lg rounded-3xl border-2 border-border/50 bg-card shadow-2xl overflow-hidden"
          >
            {/* Top gradient bar */}
            <div className={`h-2 bg-gradient-to-r ${current.color}`} />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors z-10"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-8 text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${current.color} shadow-lg`}
              >
                <current.icon className="h-10 w-10 text-white" />
              </motion.div>

              {/* Content */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-xl font-bold font-display mb-3"
              >
                {current.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto"
              >
                {current.desc}
              </motion.p>

              {/* Action button */}
              {current.action && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mt-4"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-primary/30 text-primary hover:bg-primary/5"
                    onClick={() => handleAction(current.action!.to)}
                  >
                    {current.action.label} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </motion.div>
              )}

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 mt-8 mb-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === step ? "w-8 bg-primary" : i < step ? "w-2 bg-primary/40" : "w-2 bg-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={handleClose}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Skip tour
                </button>
                <div className="flex gap-2">
                  {step > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full text-xs"
                      onClick={() => setStep(step - 1)}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    size="sm"
                    className="rounded-full text-xs px-6 font-semibold"
                    onClick={handleNext}
                  >
                    {isLast ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                        Get Started!
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
