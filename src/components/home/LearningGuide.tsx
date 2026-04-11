import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ClipboardCheck, BookOpen, Mic2, Trophy, ArrowRight, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInUp } from "@/components/AnimatedSection";
import { useAuth } from "@/hooks/useAuth";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Find Your Level",
    desc: "Take a quick placement test to discover your CEFR level — A1 to C2.",
    to: "/placement-test",
    cta: "Take the Test",
    gradient: "from-sky-500/15 to-blue-500/15",
    iconBg: "bg-sky-500/15",
    iconColor: "text-sky-600 dark:text-sky-400",
    number: "01",
  },
  {
    icon: BookOpen,
    title: "Start a Course",
    desc: "Pick from 40+ courses — grammar, speaking, business English & more.",
    to: "/courses",
    cta: "Browse Courses",
    gradient: "from-emerald-500/15 to-green-500/15",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    number: "02",
  },
  {
    icon: Mic2,
    title: "Practice & Speak",
    desc: "Use AI-powered speaking practice and pronunciation tools to build fluency.",
    to: "/practice",
    cta: "Practice Now",
    gradient: "from-violet-500/15 to-purple-500/15",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-600 dark:text-violet-400",
    number: "03",
  },
  {
    icon: Trophy,
    title: "Track & Achieve",
    desc: "Earn XP, climb the leaderboard, and get certificates as you progress.",
    to: "/dashboard",
    cta: "View Dashboard",
    gradient: "from-amber-500/15 to-orange-500/15",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-600 dark:text-amber-400",
    number: "04",
  },
];

export default function LearningGuide() {
  const { user, loading } = useAuth();

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeInUp>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">
              Your Learning Path
            </p>
          </div>
          <h2 className="text-center text-2xl md:text-3xl font-bold font-display">
            How to Start Learning
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground text-sm md:text-base">
            Follow these simple steps to begin your English journey — whether you're a complete beginner or looking to level up.
          </p>
        </FadeInUp>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={!loading && !user && step.to !== "/placement-test" ? "/signup" : step.to}
                className="group relative flex flex-col items-center text-center rounded-2xl border bg-card p-6 shadow-soft hover:shadow-elevated hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 h-full"
              >
                {/* Step number */}
                <span className="absolute top-3 right-3 text-[10px] font-bold text-muted-foreground/40 font-mono">
                  {step.number}
                </span>

                {/* Icon */}
                <div className={`h-12 w-12 rounded-xl ${step.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className={`h-6 w-6 ${step.iconColor}`} />
                </div>

                <h3 className="text-sm font-semibold font-display mb-1.5">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">{step.desc}</p>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {step.cta} <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick-start CTA */}
        {!loading && !user && (
          <FadeInUp delay={0.3}>
            <div className="mt-10 flex justify-center">
              <Link to="/signup">
                <Button className="rounded-full px-8 font-semibold font-display shadow-lg hover:shadow-elevated">
                  Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeInUp>
        )}
      </div>
    </section>
  );
}
