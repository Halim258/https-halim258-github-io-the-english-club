import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Gamepad2 } from "lucide-react";

import gamesImg from "@/assets/kids/games-center.jpg";
import { MatchingGame, ColorGame, SpellingGame, MemoryGame } from "@/components/kids-games/EducationalGames";
import { TicTacToeGame, SpaceDuckGame, MarioJumpGame, ChessGame } from "@/components/kids-games/ArcadeGames";

type GameTab = "matching" | "colors" | "spelling" | "memory" | "tictactoe" | "spaceduck" | "mario" | "chess";
type GameCategory = "learn" | "arcade";

const gamesByCategory: Record<GameCategory, { id: GameTab; title: string; emoji: string; description: string }[]> = {
  learn: [
    { id: "matching", title: "Word Match", emoji: "🎯", description: "Match words to emojis" },
    { id: "colors", title: "Color Quiz", emoji: "🎨", description: "Guess the color name" },
    { id: "spelling", title: "Spell It!", emoji: "✏️", description: "Spell words correctly" },
    { id: "memory", title: "Memory Cards", emoji: "🃏", description: "Find matching pairs" },
  ],
  arcade: [
    { id: "tictactoe", title: "Tic Tac Toe", emoji: "❌⭕", description: "Beat the AI!" },
    { id: "spaceduck", title: "Space Duck", emoji: "🦆", description: "Fly through space!" },
    { id: "mario", title: "Super Jump", emoji: "🦸", description: "Jump as high as you can!" },
    { id: "chess", title: "Chess", emoji: "♟️", description: "Classic strategy game" },
  ],
};

const categoryTabs: { id: GameCategory; label: string; emoji: string }[] = [
  { id: "learn", label: "Learning Games", emoji: "📚" },
  { id: "arcade", label: "Arcade & Classic", emoji: "🕹️" },
];

export default function KidsGameCenter() {
  const [category, setCategory] = useState<GameCategory>("learn");
  const [activeGame, setActiveGame] = useState<GameTab>("matching");

  const handleCategoryChange = (cat: GameCategory) => {
    setCategory(cat);
    setActiveGame(gamesByCategory[cat][0].id);
  };

  return (
    <div className="overflow-x-hidden bg-gradient-to-b from-yellow-50/50 via-pink-50/30 to-blue-50/50 dark:from-background dark:via-background dark:to-background min-h-screen">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-40 md:h-48 overflow-hidden">
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
            <p className="text-muted-foreground mt-1">8 awesome games — learn & play!</p>
          </motion.div>
        </div>
      </section>

      {/* Game Tabs */}
      <section className="py-6">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Category Tabs */}
          <div className="flex justify-center gap-3 mb-6">
            {categoryTabs.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`rounded-2xl px-5 py-2.5 font-bold text-sm transition-all ${
                  category === cat.id
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-white dark:bg-card border hover:border-primary/30 shadow-sm"
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* Game Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {gamesByCategory[category].map((game) => (
              <button
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className={`rounded-2xl border-2 p-4 text-center transition-all ${
                  activeGame === game.id
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-transparent bg-white dark:bg-card hover:border-primary/30 shadow-sm"
                }`}
              >
                <div className="text-2xl mb-1">{game.emoji}</div>
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
                {activeGame === "tictactoe" && <TicTacToeGame />}
                {activeGame === "spaceduck" && <SpaceDuckGame />}
                {activeGame === "mario" && <MarioJumpGame />}
                {activeGame === "chess" && <ChessGame />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
