import { Link, useParams } from "react-router-dom";
import { ChevronRight, ChevronLeft, BookOpen, ArrowRight, GraduationCap, MessageCircle, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { lessons } from "@/data/lessons";
import { FadeInUp, staggerContainer, staggerItem } from "@/components/AnimatedSection";
import { categories } from "@/data/course-categories";
import { Button } from "@/components/ui/button";

type Level = { id: string; label: string; sublabel: string; lessons: number; unlocked: boolean; description: string };
type Stage = { id: string; label: string; levels: Level[] };

const introductory: Level = {
  id: "reading", label: "English Reading Course",
  sublabel: "Alphabet → Phonics → Sight Words → Short Sentences → Critical Reading",
  lessons: 15, unlocked: true, description: "Build foundational reading skills from scratch",
};

const stages: Stage[] = [
  {
    id: "1", label: "Stage 1 — Beginner",
    levels: [
      { id: "a1", label: "A1", sublabel: "Beginner", lessons: 15, unlocked: true, description: "Greetings, numbers, family, weather, hobbies, health, feelings" },
      { id: "a2", label: "A2", sublabel: "Elementary", lessons: 15, unlocked: true, description: "Daily routines, past tense, travel, restaurants, technology, environment" },
    ],
  },
  {
    id: "2", label: "Stage 2 — Intermediate",
    levels: [
      { id: "b1", label: "B1", sublabel: "Intermediate", lessons: 15, unlocked: true, description: "Opinions, careers, media, health, education, social issues" },
      { id: "b2", label: "B2", sublabel: "Upper-Intermediate", lessons: 15, unlocked: true, description: "Passive voice, globalisation, science, art, ethics, digital society" },
    ],
  },
  {
    id: "3", label: "Stage 3 — Advanced",
    levels: [
      { id: "c1", label: "C1", sublabel: "Advanced", lessons: 15, unlocked: true, description: "Philosophy, sociolinguistics, environmental policy, psychology, academic writing" },
      { id: "c2", label: "C2", sublabel: "Proficiency", lessons: 15, unlocked: true, description: "Rhetoric, translation, corpus linguistics, discourse analysis, language & identity" },
    ],
  },
];



function LevelLessons({ levelId, levelLabel }: { levelId: string; levelLabel: string }) {
  const lessonKeys = Object.keys(lessons).filter((k) => k.startsWith(`${levelId}-`)).sort();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Link to="/courses" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
        <ChevronLeft className="h-4 w-4" /> Back to Courses
      </Link>
      <FadeInUp>
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <BookOpen className="h-3.5 w-3.5" />
            {lessonKeys.length} Lessons
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">{levelLabel}</h1>
        </div>
      </FadeInUp>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid gap-3"
      >
        {lessonKeys.map((key, i) => {
          const l = lessons[key];
          return (
            <motion.div key={key} variants={staggerItem}>
              <Link
                to={`/courses/${l.levelId}/${l.lessonNumber}`}
                className="group flex items-center justify-between rounded-xl border bg-card p-4 shadow-soft hover:shadow-card hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 text-sm font-bold text-primary shrink-0">
                    {l.lessonNumber}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{l.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{l.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function Courses() {
  const { levelId } = useParams();

  if (levelId && !window.location.pathname.match(/\/courses\/[^/]+\/\d+/)) {
    const allLevels = [introductory, ...stages.flatMap((s) => s.levels)];
    const level = allLevels.find((l) => l.id === levelId);
    if (level) return <LevelLessons levelId={level.id} levelLabel={`${level.label} — ${level.sublabel || ""}`} />;
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero Banner */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              {categories.reduce((acc, c) => acc + c.courses.length, 0)}+ Courses Available
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display max-w-3xl mx-auto leading-tight">
              Complete Course{" "}
              <span className="text-primary">Catalog</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-base md:text-lg">
              From beginner basics to professional mastery — explore our full range of English courses designed for every goal and level.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-wrap justify-center gap-6 md:gap-10"
          >
            {[
              { value: "9", label: "Course Categories" },
              { value: `${categories.reduce((acc, c) => acc + c.courses.length, 0)}+`, label: "Individual Courses" },
              { value: "A1–C2", label: "All Levels" },
              { value: "140+", label: "Structured Lessons" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl md:text-2xl font-bold text-primary font-display">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Course Categories Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="flex items-center justify-center gap-2 mb-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Browse by Category</p>
            </div>
            <h2 className="text-center text-2xl md:text-3xl font-bold font-display mb-10">
              What Would You Like to Learn?
            </h2>
          </FadeInUp>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.title}
                variants={staggerItem}
                className={`group relative rounded-2xl border bg-gradient-to-br ${cat.color} p-6 shadow-soft transition-all hover:shadow-card hover:border-primary/30 hover:-translate-y-1.5 duration-300 overflow-hidden`}
              >
                {/* Subtle background emoji */}
                <span className="absolute -right-2 -top-2 text-6xl opacity-[0.07] select-none pointer-events-none">
                  {cat.emoji}
                </span>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`h-11 w-11 rounded-xl ${cat.iconBg} flex items-center justify-center shrink-0 shadow-sm`}>
                      <cat.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-display">{cat.title}</h3>
                      <p className="text-[11px] text-muted-foreground">{cat.courses.length} courses</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {cat.courses.map((course) => (
                      <li key={course} className="flex items-center gap-2.5 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary/60 shrink-0" />
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* WhatsApp CTA */}
          <FadeInUp delay={0.2}>
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground mb-4">Interested in any course? Contact us to get started!</p>
              <a
                href="https://wa.me/201234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="rounded-full px-8 font-semibold font-display">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Inquire on WhatsApp
                </Button>
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Cambridge Curriculum */}
      <section className="border-y bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Structured Curriculum</p>
            </div>
            <h2 className="text-center text-2xl md:text-3xl font-bold font-display">
              Cambridge-Aligned Curriculum
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
              A complete pathway from reading to proficiency — explore interactive lessons at every level.
            </p>
          </FadeInUp>

          {/* Intro */}
          <FadeInUp delay={0.1}>
            <div className="mt-10">
              <Link
                to="/courses/reading"
                className="group flex items-center justify-between rounded-xl border bg-card p-5 shadow-soft transition-all hover:shadow-card hover:border-primary/20 duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/15 to-secondary/5 shadow-sm">
                    <BookOpen className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-display group-hover:text-primary transition-colors">{introductory.label}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{introductory.sublabel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="hidden sm:inline rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{introductory.lessons} lessons</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </div>
          </FadeInUp>

          {/* Stages */}
          {stages.map((stage, si) => (
            <FadeInUp key={stage.id} delay={0.1 * (si + 1)}>
              <div className="mt-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-1 w-8 rounded-full bg-primary/40" />
                  <h2 className="text-lg font-bold font-display">{stage.label}</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {stage.levels.map((lvl) => (
                    <Link
                      key={lvl.id}
                      to={`/courses/${lvl.id}`}
                      className="group flex items-center justify-between rounded-xl border bg-card p-5 shadow-soft hover:shadow-card hover:border-primary/20 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 shadow-sm">
                          <span className="text-sm font-bold text-primary font-display">{lvl.label}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold font-display group-hover:text-primary transition-colors">
                            {lvl.label} — {lvl.sublabel}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{lvl.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="hidden sm:inline rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{lvl.lessons}</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </section>
    </div>
  );
}
