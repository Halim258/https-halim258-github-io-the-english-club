import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, RotateCcw, ThumbsUp, ThumbsDown, Lightbulb, Volume2, Shuffle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { allLessons } from "@/data/lessons";
import { useTTS } from "@/hooks/useTTS";
import type { VocabWord } from "@/data/lessons";

interface FlashcardWord extends VocabWord {
  level: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Flashcards() {
  const { speak } = useTTS();

  const allWords = useMemo(() => {
    const words: FlashcardWord[] = [];
    const seen = new Set<string>();
    allLessons.forEach((lesson) => {
      lesson.vocabulary.forEach((w) => {
        const key = w.word.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          words.push({ ...w, level: lesson.levelLabel });
        }
      });
    });
    return words;
  }, []);

  const [deck, setDeck] = useState(() => shuffleArray(allWords).slice(0, 20));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<number[]>([]);
  const [unknown, setUnknown] = useState<number[]>([]);

  const card = deck[index];
  const isDone = index >= deck.length;
  const progress = deck.length > 0 ? ((index) / deck.length) * 100 : 0;

  const handleAnswer = useCallback((correct: boolean) => {
    if (correct) setKnown((p) => [...p, index]);
    else setUnknown((p) => [...p, index]);
    setFlipped(false);
    setIndex((p) => p + 1);
  }, [index]);

  const reset = useCallback(() => {
    setDeck(shuffleArray(allWords).slice(0, 20));
    setIndex(0);
    setFlipped(false);
    setKnown([]);
    setUnknown([]);
  }, [allWords]);

  const reviewMistakes = useCallback(() => {
    const mistakes = unknown.map((i) => deck[i]);
    if (mistakes.length === 0) return;
    setDeck(shuffleArray(mistakes));
    setIndex(0);
    setFlipped(false);
    setKnown([]);
    setUnknown([]);
  }, [unknown, deck]);

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/20 dark:via-background dark:to-yellow-950/20 py-12">
        <div className="container mx-auto px-4">
          <Link to="/courses" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Back to Courses
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">🃏</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display">Flashcards</h1>
              <p className="text-muted-foreground mt-1">Tap to flip, swipe to learn — {allWords.length} words available</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 max-w-md">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>{index}/{deck.length} cards</span>
              <span>✅ {known.length} · ❌ {unknown.length}</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${progress}%` }} />
            </div>
          </div>

          {isDone ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-16">
              <span className="text-6xl block mb-4">🎉</span>
              <h2 className="text-2xl font-bold font-display mb-2">Session Complete!</h2>
              <p className="text-muted-foreground mb-2">
                You got <strong className="text-emerald-600">{known.length}</strong> right and <strong className="text-red-500">{unknown.length}</strong> to review
              </p>
              <div className="flex gap-3 justify-center mt-6">
                <Button onClick={reset} className="rounded-full gap-2"><Shuffle className="h-4 w-4" /> New Deck</Button>
                {unknown.length > 0 && (
                  <Button variant="outline" onClick={reviewMistakes} className="rounded-full gap-2">
                    <RotateCcw className="h-4 w-4" /> Review Mistakes
                  </Button>
                )}
              </div>
            </motion.div>
          ) : (
            <>
              {/* Card */}
              <div className="perspective-1000" onClick={() => setFlipped(!flipped)}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${index}-${flipped}`}
                    initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[320px] rounded-2xl border-2 bg-card shadow-lg cursor-pointer flex flex-col items-center justify-center p-8 text-center"
                  >
                    {!flipped ? (
                      <>
                        <span className="text-6xl mb-4">{card.emoji}</span>
                        <h2 className="text-3xl font-bold font-display">{card.word}</h2>
                        <Badge variant="outline" className="mt-3">{card.level}</Badge>
                        <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
                          <Lightbulb className="h-3 w-3" /> Tap to reveal meaning
                        </p>
                      </>
                    ) : (
                      <>
                        <span className="text-4xl mb-3">{card.emoji}</span>
                        <h3 className="text-xl font-bold text-primary mb-2">{card.word}</h3>
                        <p className="text-lg font-medium mb-1">{card.meaning}</p>
                        <p className="text-sm text-muted-foreground">({card.arabic})</p>
                        <div className="mt-4 bg-muted/50 rounded-lg px-4 py-2 border-l-2 border-primary/30">
                          <p className="text-sm italic text-muted-foreground">"{card.example}"</p>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full h-14 w-14 p-0 border-red-300 hover:bg-red-50 dark:hover:bg-red-950/20"
                  onClick={() => handleAnswer(false)}
                >
                  <ThumbsDown className="h-6 w-6 text-red-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  onClick={() => speak(`${card.word}. ${card.meaning}. ${card.example}`)}
                >
                  <Volume2 className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full h-14 w-14 p-0 border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
                  onClick={() => handleAnswer(true)}
                >
                  <ThumbsUp className="h-6 w-6 text-emerald-500" />
                </Button>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-2">
                👎 Don't know &nbsp;·&nbsp; 👍 Got it
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
