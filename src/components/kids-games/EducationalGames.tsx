import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTTS } from "@/hooks/useTTS";

// ─── Difficulty Data ─────────────────────────────────────
type Difficulty = "phonics" | "easy" | "medium" | "hard";

const matchPairsByLevel: Record<Difficulty, { word: string; emoji: string }[]> = {
  phonics: [
    { word: "A", emoji: "🍎" }, { word: "B", emoji: "🐝" }, { word: "C", emoji: "🐱" }, { word: "D", emoji: "🐕" },
  ],
  easy: [
    { word: "Cat", emoji: "🐱" }, { word: "Dog", emoji: "🐕" }, { word: "Fish", emoji: "🐟" }, { word: "Bird", emoji: "🐦" }, { word: "Lion", emoji: "🦁" }, { word: "Rabbit", emoji: "🐰" },
  ],
  medium: [
    { word: "Elephant", emoji: "🐘" }, { word: "Butterfly", emoji: "🦋" }, { word: "Penguin", emoji: "🐧" }, { word: "Dolphin", emoji: "🐬" }, { word: "Giraffe", emoji: "🦒" }, { word: "Monkey", emoji: "🐒" }, { word: "Turtle", emoji: "🐢" }, { word: "Octopus", emoji: "🐙" },
  ],
  hard: [
    { word: "Rhinoceros", emoji: "🦏" }, { word: "Chameleon", emoji: "🦎" }, { word: "Hippopotamus", emoji: "🦛" }, { word: "Crocodile", emoji: "🐊" }, { word: "Flamingo", emoji: "🦩" }, { word: "Scorpion", emoji: "🦂" }, { word: "Hedgehog", emoji: "🦔" }, { word: "Peacock", emoji: "🦚" }, { word: "Kangaroo", emoji: "🦘" }, { word: "Jellyfish", emoji: "🪼" },
  ],
};

const spellingByLevel: Record<Difficulty, { word: string; emoji: string; hint: string }[]> = {
  phonics: [
    { word: "AT", emoji: "🐱", hint: "C___ sits on a mat" },
    { word: "UP", emoji: "⬆️", hint: "Stand ___" },
    { word: "IN", emoji: "📦", hint: "Inside the box" },
  ],
  easy: [
    { word: "CAT", emoji: "🐱", hint: "A small furry pet" },
    { word: "DOG", emoji: "🐕", hint: "A friendly pet" },
    { word: "SUN", emoji: "☀️", hint: "It gives us light" },
    { word: "RED", emoji: "🔴", hint: "Color of an apple" },
    { word: "BIG", emoji: "🐘", hint: "Not small" },
    { word: "MOM", emoji: "👩", hint: "Your mother" },
  ],
  medium: [
    { word: "HOUSE", emoji: "🏠", hint: "You live here" },
    { word: "WATER", emoji: "💧", hint: "You drink it" },
    { word: "HAPPY", emoji: "😊", hint: "Feeling good" },
    { word: "GREEN", emoji: "🟢", hint: "Color of grass" },
    { word: "TIGER", emoji: "🐅", hint: "Striped big cat" },
    { word: "MUSIC", emoji: "🎵", hint: "You listen to it" },
  ],
  hard: [
    { word: "ELEPHANT", emoji: "🐘", hint: "Biggest land animal" },
    { word: "BUTTERFLY", emoji: "🦋", hint: "Beautiful flying insect" },
    { word: "MOUNTAIN", emoji: "⛰️", hint: "Very tall land" },
    { word: "CHOCOLATE", emoji: "🍫", hint: "Sweet brown treat" },
    { word: "BEAUTIFUL", emoji: "🌸", hint: "Very pretty" },
    { word: "ADVENTURE", emoji: "🗺️", hint: "An exciting journey" },
  ],
};

const memoryByLevel: Record<Difficulty, { id: string; emoji: string }[]> = {
  phonics: [
    { id: "apple", emoji: "🍎" }, { id: "bee", emoji: "🐝" }, { id: "cat", emoji: "🐱" }, { id: "dog", emoji: "🐕" },
  ],
  easy: [
    { id: "apple", emoji: "🍎" }, { id: "banana", emoji: "🍌" }, { id: "cat", emoji: "🐱" }, { id: "dog", emoji: "🐕" }, { id: "star", emoji: "⭐" }, { id: "sun", emoji: "☀️" },
  ],
  medium: [
    { id: "apple", emoji: "🍎" }, { id: "banana", emoji: "🍌" }, { id: "cat", emoji: "🐱" }, { id: "dog", emoji: "🐕" }, { id: "star", emoji: "⭐" }, { id: "sun", emoji: "☀️" }, { id: "moon", emoji: "🌙" }, { id: "tree", emoji: "🌳" },
  ],
  hard: [
    { id: "apple", emoji: "🍎" }, { id: "banana", emoji: "🍌" }, { id: "cat", emoji: "🐱" }, { id: "dog", emoji: "🐕" }, { id: "star", emoji: "⭐" }, { id: "sun", emoji: "☀️" }, { id: "moon", emoji: "🌙" }, { id: "tree", emoji: "🌳" }, { id: "fish", emoji: "🐟" }, { id: "bird", emoji: "🐦" },
  ],
};

// ─── Difficulty Selector ─────────────────────────────────
const difficultyConfig: { id: Difficulty; label: string; emoji: string; color: string }[] = [
  { id: "phonics", label: "Phonics", emoji: "🔤", color: "from-green-400 to-emerald-400" },
  { id: "easy", label: "Easy", emoji: "🌱", color: "from-blue-400 to-cyan-400" },
  { id: "medium", label: "Medium", emoji: "🌟", color: "from-yellow-400 to-orange-400" },
  { id: "hard", label: "Hard", emoji: "🔥", color: "from-red-400 to-pink-400" },
];

export function DifficultySelector({ value, onChange }: { value: Difficulty; onChange: (d: Difficulty) => void }) {
  return (
    <div className="flex justify-center gap-2 mb-5">
      {difficultyConfig.map((d) => (
        <button
          key={d.id}
          onClick={() => onChange(d.id)}
          className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
            value === d.id
              ? `bg-gradient-to-r ${d.color} text-white shadow-md scale-105`
              : "bg-muted/50 hover:bg-muted text-muted-foreground"
          }`}
        >
          {d.emoji} {d.label}
        </button>
      ))}
    </div>
  );
}

// ─── Matching Game ───────────────────────────────────────
export function MatchingGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [selected, setSelected] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [shuffledEmojis, setShuffledEmojis] = useState<{ word: string; emoji: string }[]>([]);
  const { speak } = useTTS();
  const pairs = matchPairsByLevel[difficulty];

  const reset = useCallback(() => {
    setSelected(null);
    setMatched(new Set());
    setShuffledEmojis([...matchPairsByLevel[difficulty]].sort(() => Math.random() - 0.5));
  }, [difficulty]);

  useEffect(() => { reset(); }, [reset]);

  const handleWordClick = (idx: number) => { setSelected(idx); speak(pairs[idx].word); };
  const handleEmojiClick = (shuffledIdx: number) => {
    if (selected === null) return;
    if (shuffledEmojis[shuffledIdx].word === pairs[selected].word) {
      setMatched((prev) => new Set([...prev, selected]));
      setSelected(null);
    }
  };

  const allMatched = matched.size === pairs.length;

  return (
    <div>
      <DifficultySelector value={difficulty} onChange={setDifficulty} />
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
        <div className="space-y-2">
          <p className="text-xs font-bold text-center text-muted-foreground uppercase">Words</p>
          {pairs.map((p, i) => (
            <button key={p.word} onClick={() => !matched.has(i) && handleWordClick(i)} disabled={matched.has(i)}
              className={`w-full rounded-xl border-2 px-4 py-3 text-sm font-bold transition-all ${matched.has(i) ? "bg-green-100 border-green-400 text-green-700 dark:bg-green-900/30" : selected === i ? "bg-primary/10 border-primary text-primary" : "hover:border-primary/50 hover:bg-muted/50"}`}>
              {p.word} {matched.has(i) && "✓"}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold text-center text-muted-foreground uppercase">Emojis</p>
          {shuffledEmojis.map((p, i) => {
            const isMatched = matched.has(pairs.findIndex((m) => m.word === p.word));
            return (
              <button key={`${p.word}-${i}`} onClick={() => !isMatched && handleEmojiClick(i)} disabled={isMatched}
                className={`w-full rounded-xl border-2 px-4 py-3 text-2xl transition-all ${isMatched ? "bg-green-100 border-green-400 dark:bg-green-900/30" : "hover:border-primary/50 hover:bg-muted/50 hover:scale-105"}`}>
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
const colorWords = [
  { word: "Red", color: "#ef4444" }, { word: "Blue", color: "#3b82f6" }, { word: "Green", color: "#22c55e" },
  { word: "Yellow", color: "#eab308" }, { word: "Purple", color: "#a855f7" }, { word: "Orange", color: "#f97316" },
];

export function ColorGame() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<typeof colorWords>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const { speak } = useTTS();

  const generateOptions = useCallback((idx: number) => {
    const correct = colorWords[idx];
    const others = colorWords.filter((_, i) => i !== idx).sort(() => Math.random() - 0.5).slice(0, 3);
    setOptions([correct, ...others].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => { generateOptions(0); }, [generateOptions]);

  const handleAnswer = (word: string) => {
    if (word === colorWords[currentIdx].word) { setScore((s) => s + 1); setFeedback("correct"); speak("Correct! " + word); }
    else { setFeedback("wrong"); speak("Try again!"); }
    setTimeout(() => { setFeedback(null); const next = (currentIdx + 1) % colorWords.length; setCurrentIdx(next); generateOptions(next); }, 1000);
  };

  return (
    <div className="text-center">
      <p className="text-muted-foreground mb-4">What color is this? Tap the right word! 🎨</p>
      <div className="flex items-center justify-center gap-2 mb-2">
        <Trophy className="h-4 w-4 text-yellow-500" /><span className="font-bold text-sm">Score: {score}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={currentIdx} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="my-6">
          <div className="mx-auto h-24 w-24 rounded-3xl shadow-lg border-4 border-white dark:border-card" style={{ backgroundColor: colorWords[currentIdx].color }} />
        </motion.div>
      </AnimatePresence>
      {feedback && <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className={`text-lg font-bold mb-3 ${feedback === "correct" ? "text-green-500" : "text-red-500"}`}>{feedback === "correct" ? "✅ Correct!" : "❌ Try again!"}</motion.p>}
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {options.map((opt) => (
          <button key={opt.word} onClick={() => handleAnswer(opt.word)} className="rounded-xl border-2 px-4 py-3 font-bold text-sm hover:border-primary hover:bg-primary/5 transition-all active:scale-95">{opt.word}</button>
        ))}
      </div>
    </div>
  );
}

// ─── Spelling Game ───────────────────────────────────────
export function SpellingGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [wordIdx, setWordIdx] = useState(0);
  const [letters, setLetters] = useState<string[]>([]);
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);
  const [score, setScore] = useState(0);
  const { speak } = useTTS();
  const words = spellingByLevel[difficulty];

  const setupWord = useCallback((idx: number) => {
    const word = spellingByLevel[difficulty][idx % spellingByLevel[difficulty].length].word;
    setLetters([]); setShuffled(word.split("").sort(() => Math.random() - 0.5)); setComplete(false);
  }, [difficulty]);

  useEffect(() => { setWordIdx(0); setupWord(0); setScore(0); }, [difficulty, setupWord]);

  const handleLetterClick = (letter: string, idx: number) => {
    const newLetters = [...letters, letter]; const newShuffled = [...shuffled]; newShuffled.splice(idx, 1);
    setLetters(newLetters); setShuffled(newShuffled);
    const currentWord = words[wordIdx % words.length];
    if (newLetters.length === currentWord.word.length) {
      if (newLetters.join("") === currentWord.word) { setComplete(true); setScore((s) => s + 1); speak("Well done! " + currentWord.word); }
      else { speak("Oops! Try again."); setTimeout(() => setupWord(wordIdx), 1000); }
    }
  };

  const nextWord = () => { const next = (wordIdx + 1) % words.length; setWordIdx(next); setupWord(next); };
  const current = words[wordIdx % words.length];

  return (
    <div className="text-center">
      <DifficultySelector value={difficulty} onChange={setDifficulty} />
      <p className="text-muted-foreground mb-4">Spell the word by tapping letters in order! ✏️</p>
      <div className="flex items-center justify-center gap-2 mb-4">
        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /><span className="font-bold text-sm">Score: {score}</span>
      </div>
      <div className="text-5xl mb-2">{current.emoji}</div>
      <p className="text-sm text-muted-foreground italic mb-4">Hint: {current.hint}</p>
      <div className="flex justify-center gap-2 mb-6">
        {current.word.split("").map((_, i) => (
          <div key={i} className={`h-12 w-12 rounded-xl border-2 flex items-center justify-center text-xl font-bold transition-all ${letters[i] ? complete ? "bg-green-100 border-green-400 text-green-700 dark:bg-green-900/30" : "bg-primary/10 border-primary text-primary" : "border-dashed border-muted-foreground/30"}`}>{letters[i] || ""}</div>
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
            <motion.button key={`${letter}-${i}`} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleLetterClick(letter, i)}
              className="h-12 w-12 rounded-xl border-2 bg-card hover:bg-primary/10 hover:border-primary font-bold text-lg transition-all shadow-sm">{letter}</motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Memory Game ─────────────────────────────────────────
export function MemoryGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [cards, setCards] = useState<{ id: string; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [allDone, setAllDone] = useState(false);

  const initGame = useCallback(() => {
    const items = memoryByLevel[difficulty];
    const doubled = [...items, ...items].sort(() => Math.random() - 0.5).map((item) => ({ ...item, flipped: false, matched: false }));
    setCards(doubled); setFlippedIndices([]); setMoves(0); setAllDone(false);
  }, [difficulty]);

  useEffect(() => { initGame(); }, [initGame]);

  const handleFlip = (idx: number) => {
    if (cards[idx].flipped || cards[idx].matched || flippedIndices.length >= 2) return;
    const newCards = [...cards]; newCards[idx].flipped = true; setCards(newCards);
    const newFlipped = [...flippedIndices, idx]; setFlippedIndices(newFlipped);
    if (newFlipped.length === 2) {
      setMoves((m) => m + 1); const [a, b] = newFlipped;
      if (newCards[a].id === newCards[b].id) { newCards[a].matched = true; newCards[b].matched = true; setCards([...newCards]); setFlippedIndices([]); if (newCards.every((c) => c.matched)) setAllDone(true); }
      else { setTimeout(() => { newCards[a].flipped = false; newCards[b].flipped = false; setCards([...newCards]); setFlippedIndices([]); }, 800); }
    }
  };

  const cols = difficulty === "phonics" ? 4 : difficulty === "easy" ? 4 : difficulty === "medium" ? 4 : 5;

  return (
    <div className="text-center">
      <DifficultySelector value={difficulty} onChange={setDifficulty} />
      <p className="text-muted-foreground mb-4">Find matching pairs! Flip two cards at a time. 🃏</p>
      <div className="flex items-center justify-center gap-4 mb-4">
        <span className="text-sm font-bold">Moves: {moves}</span>
        <Button onClick={initGame} variant="outline" size="sm" className="rounded-full gap-1"><RotateCcw className="h-3 w-3" /> Reset</Button>
      </div>
      {allDone && (<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-4"><div className="text-4xl mb-2">🏆</div><p className="font-bold text-primary">You did it in {moves} moves!</p></motion.div>)}
      <div className={`grid gap-2 max-w-md mx-auto`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {cards.map((card, i) => (
          <motion.button key={i} whileTap={{ scale: 0.95 }} onClick={() => handleFlip(i)}
            className={`h-16 w-full rounded-xl border-2 text-2xl transition-all ${card.matched ? "bg-green-100 border-green-400 dark:bg-green-900/30" : card.flipped ? "bg-primary/10 border-primary" : "bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-muted-foreground/20 hover:border-primary/50"}`}>
            {card.flipped || card.matched ? card.emoji : "❓"}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
