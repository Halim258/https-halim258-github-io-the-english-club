import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Film, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/components/AnimatedSection";
import { moviesCourse } from "@/data/movies-course";

const levelColors: Record<string, string> = {
  A1: "from-emerald-400 to-green-500",
  A2: "from-sky-400 to-blue-500",
  B1: "from-amber-400 to-orange-500",
  B2: "from-rose-400 to-pink-500",
  C1: "from-violet-400 to-purple-500",
  C2: "from-red-500 to-rose-600",
};

const levelBadgeColors: Record<string, string> = {
  A1: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  A2: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  B1: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  B2: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  C1: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  C2: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

const funFacts = [
  { emoji: "🎬", text: `${moviesCourse.length} lessons` },
  { emoji: "🌍", text: "A1 to C2 levels" },
  { emoji: "📺", text: "YouTube clips" },
  { emoji: "🎭", text: "Famous expressions" },
];

export default function MoviesCourse() {
  const [activeLevel, setActiveLevel] = useState<string | null>(null);

  const filteredMovies = activeLevel
    ? moviesCourse.filter((m) => m.level === activeLevel)
    : moviesCourse;

  return (
    <div className="overflow-x-hidden bg-gradient-to-b from-indigo-50/50 via-purple-50/30 to-pink-50/50 dark:from-background dark:via-background dark:to-background min-h-screen">
      {/* Hero */}
      <section className="relative py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Link to="/courses" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            <ChevronLeft className="h-4 w-4" /> Back to Courses
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-4">
            <div className="text-6xl md:text-8xl mb-4">🎬</div>
            <h1 className="text-3xl md:text-5xl font-bold font-display bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              English through Movies
            </h1>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-lg">
              Watch YouTube clips, learn vocabulary, expressions & take quizzes 🎥
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {funFacts.map((f) => (
                <span key={f.text} className="inline-flex items-center gap-1.5 rounded-full bg-white/80 dark:bg-card px-4 py-2 text-sm font-medium shadow-sm border">
                  <span>{f.emoji}</span> {f.text}
                </span>
              ))}
            </div>

            {/* Level filter */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <Button
                size="sm"
                variant={activeLevel === null ? "default" : "outline"}
                className="rounded-full text-xs"
                onClick={() => setActiveLevel(null)}
              >
                All Levels ({moviesCourse.length})
              </Button>
              {levels.map((lvl) => {
                const count = moviesCourse.filter((m) => m.level === lvl).length;
                if (count === 0) return null;
                return (
                  <Button
                    key={lvl}
                    size="sm"
                    variant={activeLevel === lvl ? "default" : "outline"}
                    className={`rounded-full text-xs ${activeLevel === lvl ? "" : levelBadgeColors[lvl]}`}
                    onClick={() => setActiveLevel(activeLevel === lvl ? null : lvl)}
                  >
                    {lvl} ({count})
                  </Button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredMovies.map((movie) => (
              <motion.div key={movie.id} variants={staggerItem}>
                <Link
                  to={`/courses/movies/${movie.id}/slides`}
                  className="group relative block rounded-2xl border-2 border-transparent hover:border-primary/20 bg-white dark:bg-card shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full"
                >
                  {/* Color header */}
                  <div className={`bg-gradient-to-r ${levelColors[movie.level]} p-4`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{movie.emoji}</span>
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                          {movie.level}
                        </span>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map((s) => (
                          <Star key={s} className="h-3.5 w-3.5 text-white/60 fill-white/40" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold font-display text-base mb-1">{movie.title}</h3>
                    <p className="text-xs text-muted-foreground mb-1">🎬 {movie.movieTitle}</p>
                    <p className="text-xs text-muted-foreground mb-3">{movie.levelLabel}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">📚 {movie.vocabulary.length} words</span>
                      <span className="flex items-center gap-1">🎭 {movie.expressions.length} expressions</span>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <Film className="h-3.5 w-3.5" /> Start Watching →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
