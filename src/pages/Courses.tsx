import { Link, useParams } from "react-router-dom";
import { ChevronRight, ChevronLeft, BookOpen, ArrowRight, GraduationCap, MessageCircle, PenLine, BookMarked, Target, Briefcase, Globe2, Headphones, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { lessons } from "@/data/lessons";
import { FadeInUp, staggerContainer, staggerItem } from "@/components/AnimatedSection";

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

const categories = [
  {
    icon: BookOpen,
    emoji: "📘",
    title: "Core English Courses",
    courses: ["General English (A1–C2)", "Intensive English Course", "English for Beginners", "Intermediate English", "Advanced English"],
  },
  {
    icon: MessageCircle,
    emoji: "🗣️",
    title: "Communication Skills",
    courses: ["Speaking & Conversation Practice", "Listening Skills", "Pronunciation & Accent Training", "Fluency Development"],
  },
  {
    icon: PenLine,
    emoji: "✍️",
    title: "Writing Skills",
    courses: ["English Writing Basics", "Academic Writing", "Creative Writing", "Business Writing", "Email Writing"],
  },
  {
    icon: BookMarked,
    emoji: "📖",
    title: "Reading & Vocabulary",
    courses: ["Reading Comprehension", "Vocabulary Building", "Idioms & Expressions", "Phrasal Verbs Course"],
  },
  {
    icon: Target,
    emoji: "🎯",
    title: "Exam Preparation",
    courses: ["IELTS Preparation", "TOEFL Preparation", "Cambridge Exams (PET, FCE, CAE)", "SAT English"],
  },
  {
    icon: Briefcase,
    emoji: "💼",
    title: "Professional English",
    courses: ["Business English", "English for Interviews", "Workplace Communication", "Presentation Skills"],
  },
  {
    icon: Globe2,
    emoji: "🌍",
    title: "Specialized English",
    courses: ["English for Travel", "English for Kids", "English for Teenagers", "English for Specific Purposes (ESP)", "Medical English", "Engineering English", "IT English"],
  },
  {
    icon: Headphones,
    emoji: "🎧",
    title: "Interactive / Modern Courses",
    courses: ["English through Movies & Series", "English through Stories", "Real-life Conversation Practice", "Slang & Everyday English"],
  },
  {
    icon: Brain,
    emoji: "🧠",
    title: "Grammar & Structure",
    courses: ["English Grammar (Basic → Advanced)", "Tenses Mastery", "Sentence Structure"],
  },
];

function LevelLessons({ levelId, levelLabel }: { levelId: string; levelLabel: string }) {
  const lessonKeys = Object.keys(lessons).filter((k) => k.startsWith(`${levelId}-`)).sort();

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <Link to="/courses" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-sans">
        <ChevronLeft className="h-4 w-4" /> Back to Courses
      </Link>
      <h1 className="text-2xl font-bold">{levelLabel}</h1>
      <div className="mt-6 grid gap-3">
        {lessonKeys.map((key) => {
          const l = lessons[key];
          return (
            <Link
              key={key}
              to={`/courses/${l.levelId}/${l.lessonNumber}`}
              className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-soft hover:shadow-card transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  {l.lessonNumber}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{l.title}</h3>
                  <p className="text-xs text-muted-foreground font-sans">{l.description}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          );
        })}
      </div>
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
    <div className="container mx-auto px-4 py-10">
      {/* Course Categories */}
      <FadeInUp>
        <div className="flex items-center justify-center gap-2 mb-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Our Courses</p>
        </div>
        <h1 className="text-center text-3xl font-bold font-display">Complete Course Catalog</h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          From beginner basics to professional mastery — explore our full range of English courses designed for every goal and level.
        </p>
      </FadeInUp>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {categories.map((cat) => (
          <motion.div
            key={cat.title}
            variants={staggerItem}
            className="group rounded-xl border bg-card p-6 shadow-soft transition-all hover:shadow-card hover:border-primary/30 hover:-translate-y-1 duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <cat.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold font-display">{cat.title}</h3>
            </div>
            <ul className="space-y-2">
              {cat.courses.map((course) => (
                <li key={course} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  {course}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Cambridge Curriculum */}
      <div className="mt-16 border-t pt-16">
        <FadeInUp>
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-primary" />
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
        <div className="mt-8">
          <Link
            to="/courses/reading"
            className="flex items-center justify-between rounded-xl border bg-card p-5 shadow-soft transition-shadow hover:shadow-card"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/10">
                <BookOpen className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold">{introductory.label}</h3>
                <p className="text-xs text-muted-foreground font-sans">{introductory.sublabel}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-sans">
              {introductory.lessons} lessons <ChevronRight className="h-4 w-4" />
            </div>
          </Link>
        </div>

        {/* Stages */}
        {stages.map((stage) => (
          <div key={stage.id} className="mt-10">
            <h2 className="mb-4 text-xl font-semibold">{stage.label}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {stage.levels.map((lvl) => (
                <Link
                  key={lvl.id}
                  to={`/courses/${lvl.id}`}
                  className="flex items-center justify-between rounded-xl border bg-card p-5 shadow-soft hover:shadow-card transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{lvl.label} — {lvl.sublabel}</h3>
                      <p className="text-xs text-muted-foreground font-sans">{lvl.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-sans">
                    {lvl.lessons} <ChevronRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
