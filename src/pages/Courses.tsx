import { Link, useParams } from "react-router-dom";
import { ChevronRight, ChevronLeft, BookOpen, Lock } from "lucide-react";
import { lessons } from "@/data/lessons";

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
      { id: "c1", label: "C1", sublabel: "Advanced", lessons: 10, unlocked: true, description: "Hedging, idioms, complex sentences, academic writing, mixed conditionals" },
      { id: "c2", label: "C2", sublabel: "Proficiency", lessons: 10, unlocked: true, description: "Stylistic mastery, discourse markers, literary devices, argumentation" },
    ],
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

  // If a level is selected, show its lessons
  if (levelId && !window.location.pathname.match(/\/courses\/[^/]+\/\d+/)) {
    const allLevels = [introductory, ...stages.flatMap((s) => s.levels)];
    const level = allLevels.find((l) => l.id === levelId);
    if (level) return <LevelLessons levelId={level.id} levelLabel={`${level.label} — ${level.sublabel || ""}`} />;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">English Curriculum</h1>
      <p className="mt-2 text-muted-foreground font-sans">
        A complete Cambridge-aligned pathway from reading to proficiency.
      </p>

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
  );
}
