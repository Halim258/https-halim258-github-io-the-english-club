import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInUp } from "@/components/AnimatedSection";
import { useAuth } from "@/hooks/useAuth";

const steps = [
  {
    phase: "PHASE 01",
    title: "The Diagnostic",
    desc: "Identify nuanced gaps in grammar, syntax, and cultural idiom through our bespoke placement assessment.",
    to: "/placement-test",
    cta: "Take the Test",
  },
  {
    phase: "PHASE 02",
    title: "The Curriculum",
    desc: "Pick from 40+ Cambridge-aligned courses — grammar, speaking, business English & professional tracks.",
    to: "/courses",
    cta: "Browse Courses",
  },
  {
    phase: "PHASE 03",
    title: "The Immersive",
    desc: "Refine fluency with AI-powered speaking practice, pronunciation tools, and live sessions.",
    to: "/practice",
    cta: "Practice Now",
  },
  {
    phase: "PHASE 04",
    title: "The Mastery",
    desc: "Earn XP, climb the leaderboard, and receive certificates that validate your progress.",
    to: "/dashboard",
    cta: "View Dashboard",
  },
];

export default function LearningGuide() {
  const { user, loading } = useAuth();

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <FadeInUp>
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="block text-[10px] uppercase tracking-[0.28em] font-bold text-primary">
              Your Learning Path
            </span>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">
              The Pathway to <em className="italic text-primary">Mastery</em>.
            </h2>
            <p className="text-muted-foreground font-serif leading-relaxed">
              A structured, intellectual journey from foundational accuracy to nuanced linguistic command.
            </p>
          </div>
        </FadeInUp>

        <div className="mt-14 md:mt-16 grid gap-10 md:gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                to={!loading && !user && step.to !== "/placement-test" ? "/signup" : step.to}
                className="group flex flex-col h-full space-y-4"
              >
                <span className="inline-block self-start text-[10px] font-bold text-primary tracking-[0.25em] uppercase border-b border-primary pb-1">
                  {step.phase}
                </span>
                <h3 className="font-display text-2xl md:text-[26px] leading-snug text-foreground group-hover:italic group-hover:text-primary transition-all duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-serif flex-1">
                  {step.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/80 group-hover:text-primary transition-colors">
                  {step.cta}
                  <span className="w-6 h-px bg-current group-hover:w-10 transition-all" />
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
