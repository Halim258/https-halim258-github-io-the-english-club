import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Target, Trophy, Sparkles, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const steps = [
  {
    icon: BookOpen,
    title: "Welcome to The English Club! 🎉",
    desc: "Your journey to mastering English starts here. We have 800+ lessons from A1 to C2.",
    color: "from-primary/20 to-primary/10",
  },
  {
    icon: Target,
    title: "Find Your Level",
    desc: "Take our free Cambridge Placement Test to discover your CEFR level, then start from the right course.",
    color: "from-blue-500/20 to-blue-500/10",
  },
  {
    icon: Trophy,
    title: "Earn XP & Badges",
    desc: "Complete lessons to earn XP, maintain streaks, and unlock achievement badges. Compete on the leaderboard!",
    color: "from-amber-500/20 to-amber-500/10",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Tools",
    desc: "Use our AI Tutor, Pronunciation Checker, Dictionary, and Flashcards to accelerate your learning.",
    color: "from-violet-500/20 to-violet-500/10",
  },
];

export default function OnboardingWelcome() {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!user) return;
    const key = `onboarding_done_${user.id}`;
    if (!localStorage.getItem(key)) {
      setShow(true);
    }
  }, [user]);

  function dismiss() {
    if (user) localStorage.setItem(`onboarding_done_${user.id}`, "true");
    setShow(false);
  }

  function next() {
    if (step < steps.length - 1) setStep(step + 1);
    else dismiss();
  }

  if (!show) return null;

  const s = steps[step];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative bg-card border rounded-3xl shadow-2xl max-w-md w-full p-8 text-center overflow-hidden"
        >
          <button onClick={dismiss} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>

          <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} mb-5`}>
            <s.icon className="h-8 w-8 text-foreground" />
          </div>

          <h2 className="text-xl font-bold font-display mb-2">{s.title}</h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{s.desc}</p>

          {/* Step dots */}
          <div className="flex items-center justify-center gap-2 mb-5">
            {steps.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-primary" : "w-1.5 bg-muted"}`} />
            ))}
          </div>

          <Button onClick={next} className="rounded-full w-full font-semibold">
            {step < steps.length - 1 ? (
              <span className="flex items-center gap-2">Next <ArrowRight className="h-4 w-4" /></span>
            ) : (
              "Start Learning! 🚀"
            )}
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
