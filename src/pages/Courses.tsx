import { Link } from "react-router-dom";
import { ChevronRight, BookOpen, Lock } from "lucide-react";

type Level = { id: string; label: string; sublabel: string; lessons: number; unlocked: boolean };
type Stage = { id: string; label: string; levels: Level[] };

const introductory: Level = {
  id: "intro",
  label: "Arabic Reading Course",
  sublabel: "Alphabet → Harakat → Madd → Sukoon → Tanween → Shadda",
  lessons: 12,
  unlocked: true,
};

const stages: Stage[] = [
  {
    id: "1",
    label: "Stage 1 — Beginner",
    levels: [
      { id: "a1", label: "A1", sublabel: "Beginner", lessons: 10, unlocked: true },
      { id: "a2", label: "A2", sublabel: "Beginner", lessons: 10, unlocked: false },
    ],
  },
  {
    id: "2",
    label: "Stage 2 — Intermediate",
    levels: [
      { id: "b1", label: "B1", sublabel: "Intermediate", lessons: 10, unlocked: false },
      { id: "b2", label: "B2", sublabel: "Intermediate", lessons: 10, unlocked: false },
    ],
  },
  {
    id: "3",
    label: "Stage 3 — Advanced",
    levels: [
      { id: "c1", label: "C1", sublabel: "Advanced", lessons: 10, unlocked: false },
      { id: "c2", label: "C2", sublabel: "Advanced", lessons: 10, unlocked: false },
    ],
  },
];

export default function Courses() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Standard Arabic Curriculum</h1>
      <p className="mt-2 text-muted-foreground">
        A complete pathway from zero to fluency.
      </p>

      {/* Intro */}
      <div className="mt-8">
        <Link
          to="/courses/intro"
          className="flex items-center justify-between rounded-xl border bg-card p-5 shadow-soft transition-shadow hover:shadow-card"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/20">
              <BookOpen className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold">{introductory.label}</h3>
              <p className="text-xs text-muted-foreground">{introductory.sublabel}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {introductory.lessons} lessons
            <ChevronRight className="h-4 w-4" />
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
                to={lvl.unlocked ? `/courses/${lvl.id}/1` : "#"}
                className={`flex items-center justify-between rounded-xl border p-5 transition-shadow ${
                  lvl.unlocked
                    ? "bg-card shadow-soft hover:shadow-card"
                    : "cursor-not-allowed bg-muted/50 opacity-60"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                    {lvl.unlocked ? (
                      <BookOpen className="h-5 w-5 text-primary" />
                    ) : (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{lvl.label} — {lvl.sublabel}</h3>
                    <p className="text-xs text-muted-foreground">{lvl.lessons} lessons</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
