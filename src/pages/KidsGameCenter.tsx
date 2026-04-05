import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, RotateCcw, Trophy, Star, Gamepad2, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTTS } from "@/hooks/useTTS";

import gamesImg from "@/assets/kids/games-center.jpg";

// ─── Game Data ────────────────────────────────────────────
const matchPairs = [
  { word: "Cat", emoji: "🐱" },
  { word: "Dog", emoji: "🐕" },
  { word: "Fish", emoji: "🐟" },
  { word: "Bird", emoji: "🐦" },
  { word: "Lion", emoji: "🦁" },
  { word: "Rabbit", emoji: "🐰" },
];

const colorWords = [
  { word: "Red", color: "#ef4444" },
  { word: "Blue", color: "#3b82f6" },
  { word: "Green", color: "#22c55e" },
  { word: "Yellow", color: "#eab308" },
  { word: "Purple", color: "#a855f7" },
  { word: "Orange", color: "#f97316" },
];

const spellingWords = [
  { word: "CAT", emoji: "🐱", hint: "A small furry pet" },
  { word: "DOG", emoji: "🐕", hint: "A friendly pet" },
  { word: "SUN", emoji: "☀️", hint: "It gives us light" },
  { word: "RED", emoji: "🔴", hint: "Color of an apple" },
  { word: "BIG", emoji: "🐘", hint: "Not small" },
  { word: "MOM", emoji: "👩", hint: "Your mother" },
];

type GameTab = "matching" | "colors" | "spelling" | "memory";

// ─── Matching Game ───────────────────────────────────────
function MatchingGame() {
  const [selected, setSelected] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [shuffledEmojis, setShuffledEmojis] = useState<typeof matchPairs>([]);
  const { speak } = useTTS();

  useEffect(() => {
    setShuffledEmojis([...matchPairs].sort(() => Math.random() - 0.5));
  }, []);

  const handleWordClick = (idx: number) => {
    setSelected(idx);
    speak(matchPairs[idx].word);
  };

  const handleEmojiClick = (shuffledIdx: number) => {
    if (selected === null) return;
    const emojiItem = shuffledEmojis[shuffledIdx];
    if (emojiItem.word === matchPairs[selected].word) {
      setMatched((prev) => new Set([...prev, selected]));
      setSelected(null);
    }
  };

  const reset = () => {
    setSelected(null);
    setMatched(new Set());
    setShuffledEmojis([...matchPairs].sort(() => Math.random() - 0.5));
  };

  const allMatched = matched.size === matchPairs.length;

  return (
    <div>
      <p className="text-center text-muted-foreground mb-4">Tap a word, then tap its matching emoji! 🎯</p>
      {allMatched && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center mb-4">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-bold text-lg text-primary">Amazing! All matched!</p>
          <Button onClick={reset} variant="outline" size="sm" className="mt-2 rounded-full gap-2">
            <RotateCcw className="h-4 w-4" /> Play Again
          </Button>
        </motion.div>
      )}
      <div className="grid grid-cols-2 gap-6">
        {/* Words */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-center text-muted-foreground uppercase">Words</p>
          {matchPairs.map((p, i) => (
            <button
              key={p.word}
              onClick={() => !matched.has(i) && handleWordClick(i)}
              disabled={matched.has(i)}
              className={`w-full rounded-xl border-2 px-4 py-3 text-sm font-bold transition-all ${
                matched.has(i)
                  ? "bg-green-100 border-green-400 text-green-700 dark:bg-green-900/30 dark:border-green-600"
                  : selected === i
                  ? "bg-primary/10 border-primary text-primary"
                  : "hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              {p.word} {matched.has(i) && "✓"}
            </button>
          ))}
        </div>
        {/* Emojis */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-center text-muted-foreground uppercase">Emojis</p>
          {shuffledEmojis.map((p, i) => {
            const isMatched = matched.has(matchPairs.findIndex((m) => m.word === p.word));
            return (
              <button
                key={`${p.word}-${i}`}
                onClick={() => !isMatched && handleEmojiClick(i)}
                disabled={isMatched}
                className={`w-full rounded-xl border-2 px-4 py-3 text-2xl transition-all ${
                  isMatched
                    ? "bg-green-100 border-green-400 dark:bg-green-900/30 dark:border-green-600"
                    : "hover:border-primary/50 hover:bg-muted/50 hover:scale-105"
                }`}
              >
                {p.emoji}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Color Game ──────────────────────────────────────────
function ColorGame() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<typeof colorWords>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const { speak } = useTTS();

  const generateOptions = useCallback((idx: number) => {
    const correct = colorWords[idx];
    const others = colorWords.filter((_, i) => i !== idx).sort(() => Math.random() - 0.5).slice(0, 3);
    const opts = [correct, ...others].sort(() => Math.random() - 0.5);
    setOptions(opts);
  }, []);

  useEffect(() => {
    generateOptions(0);
  }, [generateOptions]);

  const handleAnswer = (word: string) => {
    if (word === colorWords[currentIdx].word) {
      setScore((s) => s + 1);
      setFeedback("correct");
      speak("Correct! " + word);
    } else {
      setFeedback("wrong");
      speak("Try again!");
    }
    setTimeout(() => {
      setFeedback(null);
      const next = (currentIdx + 1) % colorWords.length;
      setCurrentIdx(next);
      generateOptions(next);
    }, 1000);
  };

  return (
    <div className="text-center">
      <p className="text-muted-foreground mb-4">What color is this? Tap the right word! 🎨</p>
      <div className="flex items-center justify-center gap-2 mb-2">
        <Trophy className="h-4 w-4 text-yellow-500" />
        <span className="font-bold text-sm">Score: {score}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="my-6"
        >
          <div
            className="mx-auto h-24 w-24 rounded-3xl shadow-lg border-4 border-white dark:border-card"
            style={{ backgroundColor: colorWords[currentIdx].color }}
          />
        </motion.div>
      </AnimatePresence>

      {feedback && (
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`text-lg font-bold mb-3 ${feedback === "correct" ? "text-green-500" : "text-red-500"}`}
        >
          {feedback === "correct" ? "✅ Correct!" : "❌ Try again!"}
        </motion.p>
      )}

      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {options.map((opt) => (
          <button
            key={opt.word}
            onClick={() => handleAnswer(opt.word)}
            className="rounded-xl border-2 px-4 py-3 font-bold text-sm hover:border-primary hover:bg-primary/5 transition-all active:scale-95"
          >
            {opt.word}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Spelling Game ───────────────────────────────────────
function SpellingGame() {
  const [wordIdx, setWordIdx] = useState(0);
  const [letters, setLetters] = useState<string[]>([]);
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);
  const [score, setScore] = useState(0);
  const { speak } = useTTS();

  const setupWord = useCallback((idx: number) => {
    const word = spellingWords[idx].word;
    setLetters([]);
    setShuffled(word.split("").sort(() => Math.random() - 0.5));
    setComplete(false);
  }, []);

  useEffect(() => {
    setupWord(0);
  }, [setupWord]);

  const handleLetterClick = (letter: string, idx: number) => {
    const newLetters = [...letters, letter];
    const newShuffled = [...shuffled];
    newShuffled.splice(idx, 1);
    setLetters(newLetters);
    setShuffled(newShuffled);

    if (newLetters.length === spellingWords[wordIdx].word.length) {
      const isCorrect = newLetters.join("") === spellingWords[wordIdx].word;
      if (isCorrect) {
        setComplete(true);
        setScore((s) => s + 1);
        speak("Well done! " + spellingWords[wordIdx].word);
      } else {
        speak("Oops! Try again.");
        setTimeout(() => setupWord(wordIdx), 1000);
      }
    }
  };

  const nextWord = () => {
    const next = (wordIdx + 1) % spellingWords.length;
    setWordIdx(next);
    setupWord(next);
  };

  const current = spellingWords[wordIdx];

  return (
    <div className="text-center">
      <p className="text-muted-foreground mb-4">Spell the word by tapping letters in order! ✏️</p>
      <div className="flex items-center justify-center gap-2 mb-4">
        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
        <span className="font-bold text-sm">Score: {score}</span>
      </div>

      <div className="text-5xl mb-2">{current.emoji}</div>
      <p className="text-sm text-muted-foreground italic mb-4">Hint: {current.hint}</p>

      {/* Answer slots */}
      <div className="flex justify-center gap-2 mb-6">
        {current.word.split("").map((_, i) => (
          <div
            key={i}
            className={`h-12 w-12 rounded-xl border-2 flex items-center justify-center text-xl font-bold transition-all ${
              letters[i]
                ? complete
                  ? "bg-green-100 border-green-400 text-green-700 dark:bg-green-900/30"
                  : "bg-primary/10 border-primary text-primary"
                : "border-dashed border-muted-foreground/30"
            }`}
          >
            {letters[i] || ""}
          </div>
        ))}
      </div>

      {complete ? (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <p className="text-green-500 font-bold text-lg mb-3">🎉 Perfect!</p>
          <Button onClick={nextWord} size="sm" className="rounded-full px-6">Next Word →</Button>
        </motion.div>
      ) : (
        <div className="flex justify-center gap-2 flex-wrap">
          {shuffled.map((letter, i) => (
            <motion.button
              key={`${letter}-${i}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleLetterClick(letter, i)}
              className="h-12 w-12 rounded-xl border-2 bg-card hover:bg-primary/10 hover:border-primary font-bold text-lg transition-all shadow-sm"
            >
              {letter}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Memory Card Game ────────────────────────────────────
const memoryItems = [
  { id: "apple", emoji: "🍎" },
  { id: "banana", emoji: "🍌" },
  { id: "cat", emoji: "🐱" },
  { id: "dog", emoji: "🐕" },
  { id: "star", emoji: "⭐" },
  { id: "sun", emoji: "☀️" },
];

function MemoryGame() {
  const [cards, setCards] = useState<{ id: string; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [allDone, setAllDone] = useState(false);

  const initGame = useCallback(() => {
    const doubled = [...memoryItems, ...memoryItems]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({ ...item, flipped: false, matched: false }));
    setCards(doubled);
    setFlippedIndices([]);
    setMoves(0);
    setAllDone(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleFlip = (idx: number) => {
    if (cards[idx].flipped || cards[idx].matched || flippedIndices.length >= 2) return;

    const newCards = [...cards];
    newCards[idx].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, idx];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newFlipped;
      if (newCards[a].id === newCards[b].id) {
        newCards[a].matched = true;
        newCards[b].matched = true;
        setCards([...newCards]);
        setFlippedIndices([]);
        if (newCards.every((c) => c.matched)) setAllDone(true);
      } else {
        setTimeout(() => {
          newCards[a].flipped = false;
          newCards[b].flipped = false;
          setCards([...newCards]);
          setFlippedIndices([]);
        }, 800);
      }
    }
  };

  return (
    <div className="text-center">
      <p className="text-muted-foreground mb-4">Find matching pairs! Flip two cards at a time. 🃏</p>
      <div className="flex items-center justify-center gap-4 mb-4">
        <span className="text-sm font-bold">Moves: {moves}</span>
        <Button onClick={initGame} variant="outline" size="sm" className="rounded-full gap-1">
          <RotateCcw className="h-3 w-3" /> Reset
        </Button>
      </div>

      {allDone && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-4">
          <div className="text-4xl mb-2">🏆</div>
          <p className="font-bold text-primary">You did it in {moves} moves!</p>
        </motion.div>
      )}

      <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
        {cards.map((card, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFlip(i)}
            className={`h-16 w-full rounded-xl border-2 text-2xl transition-all ${
              card.matched
                ? "bg-green-100 border-green-400 dark:bg-green-900/30"
                : card.flipped
                ? "bg-primary/10 border-primary"
                : "bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-muted-foreground/20 hover:border-primary/50"
            }`}
          >
            {card.flipped || card.matched ? card.emoji : "❓"}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────
const games: { id: GameTab; title: string; emoji: string; description: string }[] = [
  { id: "matching", title: "Word Match", emoji: "🎯", description: "Match words to emojis" },
  { id: "colors", title: "Color Quiz", emoji: "🎨", description: "Guess the color name" },
  { id: "spelling", title: "Spell It!", emoji: "✏️", description: "Spell words correctly" },
  { id: "memory", title: "Memory Cards", emoji: "🃏", description: "Find matching pairs" },
];

export default function KidsGameCenter() {
  const [activeGame, setActiveGame] = useState<GameTab>("matching");

  return (
    <div className="overflow-x-hidden bg-gradient-to-b from-yellow-50/50 via-pink-50/30 to-blue-50/50 dark:from-background dark:via-background dark:to-background min-h-screen">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-40 md:h-52 overflow-hidden">
          <img src={gamesImg} alt="Game Center" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative -mt-16 pb-4">
          <Link to="/courses/kids" className="mb-3 inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors font-medium">
            <ChevronLeft className="h-4 w-4" /> Back to Kids Course
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl md:text-4xl font-bold font-display flex items-center gap-3">
              <Gamepad2 className="h-8 w-8" /> 🎮 Game Center
            </h1>
            <p className="text-muted-foreground mt-1">Learn English while having fun!</p>
          </motion.div>
        </div>
      </section>

      {/* Game Tabs */}
      <section className="py-6">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className={`rounded-2xl border-2 p-4 text-center transition-all ${
                  activeGame === game.id
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-transparent bg-white dark:bg-card hover:border-primary/30 shadow-sm"
                }`}
              >
                <div className="text-3xl mb-1">{game.emoji}</div>
                <p className="font-bold text-sm">{game.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{game.description}</p>
              </button>
            ))}
          </div>

          {/* Active Game */}
          <div className="rounded-3xl bg-white dark:bg-card border shadow-lg p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGame}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {activeGame === "matching" && <MatchingGame />}
                {activeGame === "colors" && <ColorGame />}
                {activeGame === "spelling" && <SpellingGame />}
                {activeGame === "memory" && <MemoryGame />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
