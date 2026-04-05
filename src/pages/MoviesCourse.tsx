import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronDown, ChevronUp, Volume2, BookOpen, CheckCircle2, XCircle, Star, Film, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { moviesCourse, MovieLessonData } from "@/data/movies-course";
import { useTTS } from "@/hooks/useTTS";

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

function MovieCard({ movie, index }: { movie: MovieLessonData; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [showVocab, setShowVocab] = useState(false);
  const [showExpressions, setShowExpressions] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const { speak, speaking } = useTTS();

  const score = useMemo(() => {
    if (!submitted) return 0;
    return movie.questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
  }, [submitted, answers, movie.questions]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="overflow-hidden border-2 hover:border-primary/30 transition-all">
        {/* Header */}
        <div
          className={`bg-gradient-to-r ${levelColors[movie.level]} p-4 cursor-pointer`}
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{movie.emoji}</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {movie.level}
                  </span>
                  <span className="text-white/80 text-xs">{movie.levelLabel}</span>
                </div>
                <h3 className="text-white font-bold text-lg font-display">{movie.title}</h3>
                <p className="text-white/70 text-xs mt-0.5">🎬 {movie.movieTitle}</p>
              </div>
            </div>
            <div className="text-white">
              {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="p-5 space-y-5">
                {/* YouTube Video */}
                <div>
                  <h4 className="font-bold font-display flex items-center gap-2 mb-3">
                    <Film className="h-4 w-4 text-primary" />
                    Watch the Scene
                  </h4>
                  <div className="relative rounded-xl overflow-hidden border bg-black aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${movie.youtubeId}`}
                      title={`${movie.movieTitle} - ${movie.title}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 bg-muted/30 rounded-lg p-3 border">
                    📝 <strong>Scene Context:</strong> {movie.sceneContext}
                  </p>
                  {movie.culturalNote && (
                    <div className="mt-2 bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm">
                      🎬 <strong>Did you know?</strong> {movie.culturalNote}
                    </div>
                  )}
                </div>

                {/* Vocabulary */}
                <div>
                  <Button
                    variant="ghost"
                    className="w-full justify-between font-bold text-sm"
                    onClick={() => setShowVocab(!showVocab)}
                  >
                    <span className="flex items-center gap-2">
                      📚 Vocabulary ({movie.vocabulary.length} words)
                    </span>
                    {showVocab ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  <AnimatePresence>
                    {showVocab && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <ScrollArea className="max-h-72">
                          <div className="grid gap-2 p-2">
                            {movie.vocabulary.map((w) => (
                              <div
                                key={w.word}
                                className="flex items-start gap-3 p-3 rounded-lg bg-card border hover:bg-muted/50 transition-colors cursor-pointer"
                                onClick={() => speak(w.word)}
                              >
                                <span className="text-2xl">{w.emoji}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm">{w.word}</span>
                                    <span className="text-muted-foreground text-xs">({w.arabic})</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-0.5">{w.meaning}</p>
                                  <p className="text-xs text-primary/80 mt-1 italic">"{w.example}"</p>
                                </div>
                                <Volume2 className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-1" />
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Expressions */}
                <div>
                  <Button
                    variant="ghost"
                    className="w-full justify-between font-bold text-sm"
                    onClick={() => setShowExpressions(!showExpressions)}
                  >
                    <span className="flex items-center gap-2">
                      🎬 Famous Expressions ({movie.expressions.length})
                    </span>
                    {showExpressions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  <AnimatePresence>
                    {showExpressions && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <div className="grid gap-2 p-2">
                          {movie.expressions.map((e) => (
                            <div
                              key={e.phrase}
                              className="p-3 rounded-lg border bg-gradient-to-r from-primary/5 to-accent/5 cursor-pointer hover:from-primary/10 hover:to-accent/10 transition-colors"
                              onClick={() => speak(e.phrase)}
                            >
                              <div className="flex items-start gap-2">
                                <span className="text-xl">{e.emoji}</span>
                                <div className="flex-1">
                                  <p className="font-bold text-sm">"{e.phrase}"</p>
                                  <p className="text-xs text-muted-foreground mt-1">{e.meaning}</p>
                                  <p className="text-xs text-muted-foreground/70 mt-0.5">({e.arabic})</p>
                                </div>
                                <Volume2 className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-1" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Quiz */}
                <div>
                  <Button
                    variant="ghost"
                    className="w-full justify-between font-bold text-sm"
                    onClick={() => { setShowQuiz(!showQuiz); setSubmitted(false); setAnswers({}); }}
                  >
                    <span className="flex items-center gap-2">
                      ✏️ Comprehension Quiz ({movie.questions.length} questions)
                    </span>
                    {showQuiz ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  <AnimatePresence>
                    {showQuiz && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <div className="space-y-4 p-2">
                          {movie.questions.map((q, qi) => (
                            <div key={qi} className="p-3 rounded-lg border bg-card">
                              <p className="font-medium text-sm mb-2">{qi + 1}. {q.question}</p>
                              <div className="grid gap-1.5">
                                {q.options.map((opt, oi) => {
                                  const selected = answers[qi] === oi;
                                  const isCorrect = q.correct === oi;
                                  let optClass = "border rounded-lg px-3 py-2 text-sm cursor-pointer transition-all";
                                  if (submitted) {
                                    if (isCorrect) optClass += " bg-emerald-100 border-emerald-400 dark:bg-emerald-900/30";
                                    else if (selected && !isCorrect) optClass += " bg-red-100 border-red-400 dark:bg-red-900/30";
                                    else optClass += " opacity-50";
                                  } else {
                                    optClass += selected ? " bg-primary/10 border-primary" : " hover:bg-muted/50";
                                  }
                                  return (
                                    <div
                                      key={oi}
                                      className={optClass}
                                      onClick={() => !submitted && setAnswers({ ...answers, [qi]: oi })}
                                    >
                                      <span className="flex items-center gap-2">
                                        {submitted && isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                                        {submitted && selected && !isCorrect && <XCircle className="h-4 w-4 text-red-500" />}
                                        {opt}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                          <div className="flex items-center gap-3">
                            <Button
                              size="sm"
                              className="rounded-full"
                              onClick={() => setSubmitted(true)}
                              disabled={submitted || Object.keys(answers).length < movie.questions.length}
                            >
                              Check Answers ✅
                            </Button>
                            {submitted && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-1.5"
                              >
                                <Star className="h-4 w-4 text-amber-500" />
                                <span className="font-bold text-sm">
                                  {score}/{movie.questions.length} correct
                                </span>
                                {score === movie.questions.length && <span className="text-lg">🎉</span>}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default function MoviesCourse() {
  const [activeLevel, setActiveLevel] = useState<string | null>(null);

  const filteredMovies = activeLevel
    ? moviesCourse.filter((m) => m.level === activeLevel)
    : moviesCourse;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/20 dark:via-background dark:to-pink-950/20 py-12">
        <div className="container mx-auto px-4">
          <Link
            to="/courses"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Courses
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">🎬</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-display">English through Movies & Series</h1>
                <p className="text-muted-foreground mt-1">
                  Watch YouTube clips, learn vocabulary, expressions & take quizzes
                </p>
              </div>
            </div>
          </motion.div>

          {/* Level filter */}
          <div className="flex flex-wrap gap-2 mt-6">
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
        </div>
      </section>

      {/* Movies Grid */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="grid gap-4">
            {filteredMovies.map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
