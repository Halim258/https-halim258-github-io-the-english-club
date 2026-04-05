import { Link, useParams } from "react-router-dom";
import { ChevronRight, ChevronLeft, BookOpen, ArrowRight, GraduationCap, MessageCircle, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { lessons } from "@/data/lessons";
import { FadeInUp, staggerContainer, staggerItem } from "@/components/AnimatedSection";
import { categories } from "@/data/course-categories";
import { Button } from "@/components/ui/button";

type Level = { id: string; label: string; sublabel: string; lessons: number; description: string; color: string };

const introductory: Level = {
  id: "reading", label: "English Reading Course",
  sublabel: "Alphabet → Phonics → Sight Words → Short Sentences → Critical Reading",
  lessons: 15, description: "Build foundational reading skills from scratch",
  color: "from-rose-500 to-orange-500",
};

const cefrLevels: Level[] = [
  { id: "a1", label: "A1", sublabel: "Beginner", lessons: 15, description: "Greetings, numbers, family, weather, hobbies, health, feelings", color: "from-emerald-400 to-emerald-600" },
  { id: "a2", label: "A2", sublabel: "Elementary", lessons: 15, description: "Daily routines, past tense, travel, restaurants, technology, environment", color: "from-teal-400 to-teal-600" },
  { id: "b1", label: "B1", sublabel: "Intermediate", lessons: 15, description: "Opinions, careers, media, health, education, social issues", color: "from-blue-400 to-blue-600" },
  { id: "b2", label: "B2", sublabel: "Upper-Intermediate", lessons: 15, description: "Passive voice, globalisation, science, art, ethics, digital society", color: "from-indigo-400 to-indigo-600" },
  { id: "c1", label: "C1", sublabel: "Advanced", lessons: 15, description: "Philosophy, sociolinguistics, environmental policy, psychology, academic writing", color: "from-violet-400 to-violet-600" },
  { id: "c2", label: "C2", sublabel: "Proficiency", lessons: 15, description: "Rhetoric, translation, corpus linguistics, discourse analysis, language & identity", color: "from-purple-400 to-purple-600" },
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
        {lessonKeys.map((key) => {
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

  // If a level is selected, show its lessons
  if (levelId && !window.location.pathname.match(/\/courses\/[^/]+\/\d+/)) {
    const allLevels = [introductory, ...cefrLevels];
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
              A1 → C2 Complete Curriculum
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display max-w-3xl mx-auto leading-tight">
              Our English{" "}
              <span className="text-primary">Courses</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-base md:text-lg">
              Choose your level and start learning — from complete beginner to mastery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ MAIN CEFR LEVELS ═══ */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Cambridge-Aligned Curriculum</p>
            </div>
            <h2 className="text-center text-2xl md:text-3xl font-bold font-display mb-3">
              Choose Your Level
            </h2>
            <p className="text-center text-muted-foreground max-w-lg mx-auto mb-10">
              Start from the Reading Course or pick your CEFR level. Each level has 15 interactive lessons.
            </p>
          </FadeInUp>

          {/* Reading Course - Featured */}
          <FadeInUp delay={0.05}>
            <Link
              to="/courses/reading"
              className="group block mb-6 rounded-2xl border-2 border-dashed border-primary/20 bg-gradient-to-r from-rose-500/5 to-orange-500/5 p-5 md:p-6 transition-all hover:border-primary/40 hover:shadow-card duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 shadow-lg">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold font-display text-lg group-hover:text-primary transition-colors">
                        {introductory.label}
                      </h3>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wider">
                        Start Here
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{introductory.sublabel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline text-xs text-muted-foreground">{introductory.lessons} lessons</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          </FadeInUp>

          {/* CEFR Level Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {cefrLevels.map((lvl) => (
              <motion.div key={lvl.id} variants={staggerItem}>
                <Link
                  to={`/courses/${lvl.id}`}
                  className="group block rounded-2xl border bg-card p-5 shadow-soft hover:shadow-card hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${lvl.color} shadow-lg`}>
                      <span className="text-lg font-bold text-white font-display">{lvl.label}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold font-display text-base group-hover:text-primary transition-colors">
                          {lvl.label} — {lvl.sublabel}
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {lvl.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                          {lvl.lessons} lessons
                        </span>
                        <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          Start <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ COURSE CATEGORIES ═══ */}
      <section className="border-t bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="flex items-center justify-center gap-2 mb-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Browse by Category</p>
            </div>
            <h2 className="text-center text-2xl md:text-3xl font-bold font-display mb-3">
              Specialized Courses
            </h2>
            <p className="text-center text-muted-foreground max-w-lg mx-auto mb-10">
              Beyond the core curriculum — explore courses for specific skills, exams, and goals.
            </p>
          </FadeInUp>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {categories.map((cat) => (
              <motion.div key={cat.title} variants={staggerItem}>
                <Link
                  to={`/courses/category/${cat.slug}`}
                  className={`group relative block rounded-2xl border bg-gradient-to-br ${cat.color} p-6 shadow-soft transition-all hover:shadow-card hover:border-primary/30 hover:-translate-y-1.5 duration-300 overflow-hidden h-full`}
                >
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
                      {cat.courses.slice(0, 4).map((course) => (
                        <li key={course.name} className="flex items-center gap-2.5 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary/60 shrink-0" />
                          {course.name}
                        </li>
                      ))}
                      {cat.courses.length > 4 && (
                        <li className="text-xs text-primary font-semibold">+{cat.courses.length - 4} more</li>
                      )}
                    </ul>
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      View courses <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* WhatsApp CTA */}
          <FadeInUp delay={0.2}>
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground mb-4">Interested in any course? Contact us to get started!</p>
              <a href="https://wa.me/201234567890" target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full px-8 font-semibold font-display">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Inquire on WhatsApp
                </Button>
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
