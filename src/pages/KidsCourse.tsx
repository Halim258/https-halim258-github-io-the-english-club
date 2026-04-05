import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Star, Gamepad2, BookOpen, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInUp, staggerContainer, staggerItem } from "@/components/AnimatedSection";

import colorsImg from "@/assets/kids/colors-theme.jpg";
import animalsImg from "@/assets/kids/animals-theme.jpg";
import familyImg from "@/assets/kids/family-theme.jpg";
import foodImg from "@/assets/kids/food-theme.jpg";
import numbersImg from "@/assets/kids/numbers-theme.jpg";
import natureImg from "@/assets/kids/nature-theme.jpg";
import dreamsImg from "@/assets/kids/dreams-theme.jpg";
import gamesImg from "@/assets/kids/games-center.jpg";

interface ThemeUnit {
  title: string;
  emoji: string;
  image: string;
  color: string;
  lessons: { id: string; title: string; number: number }[];
  description: string;
}

const themeUnits: ThemeUnit[] = [
  {
    title: "Colors Around Us",
    emoji: "🎨",
    image: colorsImg,
    color: "from-red-400 to-yellow-400",
    description: "Learn all the beautiful colors of the rainbow!",
    lessons: [
      { id: "kids-1", title: "Colors Around Us", number: 1 },
    ],
  },
  {
    title: "Animals I Know",
    emoji: "🐾",
    image: animalsImg,
    color: "from-green-400 to-emerald-400",
    description: "Meet cute animals and learn their names!",
    lessons: [
      { id: "kids-2", title: "Animals I Know", number: 2 },
    ],
  },
  {
    title: "My Family",
    emoji: "👨‍👩‍👧‍👦",
    image: familyImg,
    color: "from-pink-400 to-rose-400",
    description: "Learn about family members and who they are!",
    lessons: [
      { id: "kids-3", title: "My Body Parts", number: 3 },
      { id: "kids-6", title: "My Family", number: 6 },
      { id: "kids-14", title: "My House & Rooms", number: 14 },
    ],
  },
  {
    title: "Yummy Food",
    emoji: "🍕",
    image: foodImg,
    color: "from-orange-400 to-amber-400",
    description: "Discover delicious food and say what you like!",
    lessons: [
      { id: "kids-4", title: "Yummy Food!", number: 4 },
      { id: "kids-13", title: "Fruits & Vegetables", number: 13 },
    ],
  },
  {
    title: "Numbers & Counting",
    emoji: "🔢",
    image: numbersImg,
    color: "from-blue-400 to-cyan-400",
    description: "Count from 1 to 20 and learn number words!",
    lessons: [
      { id: "kids-5", title: "Numbers & Counting", number: 5 },
      { id: "kids-8", title: "Shapes & Sizes", number: 8 },
      { id: "kids-9", title: "Days of the Week", number: 9 },
      { id: "kids-17", title: "Time & Daily Routine", number: 17 },
    ],
  },
  {
    title: "Nature & Weather",
    emoji: "🌿",
    image: natureImg,
    color: "from-emerald-400 to-teal-400",
    description: "Explore trees, flowers, the sky, and weather!",
    lessons: [
      { id: "kids-10", title: "Weather & Seasons", number: 10 },
      { id: "kids-19", title: "Nature & Environment", number: 19 },
    ],
  },
  {
    title: "Dreams & Adventures",
    emoji: "🌙",
    image: dreamsImg,
    color: "from-purple-400 to-indigo-400",
    description: "Feelings, stories, and magical adventures!",
    lessons: [
      { id: "kids-16", title: "Feelings & Emotions", number: 16 },
      { id: "kids-20", title: "Storytelling & Imagination", number: 20 },
      { id: "kids-15", title: "Holidays & Celebrations", number: 15 },
    ],
  },
];

const funFacts = [
  { emoji: "🌟", text: "20 fun lessons" },
  { emoji: "🎮", text: "Game Center" },
  { emoji: "🔊", text: "Audio in every lesson" },
  { emoji: "🏆", text: "Earn stars & badges" },
];

export default function KidsCourse() {
  return (
    <div className="overflow-x-hidden bg-gradient-to-b from-yellow-50/50 via-pink-50/30 to-blue-50/50 dark:from-background dark:via-background dark:to-background min-h-screen">
      {/* Hero */}
      <section className="relative py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Link to="/courses" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            <ChevronLeft className="h-4 w-4" /> Back to Courses
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4"
          >
            <div className="text-6xl md:text-8xl mb-4">🧒</div>
            <h1 className="text-3xl md:text-5xl font-bold font-display bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              English for Kids
            </h1>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-lg">
              A magical journey through colors, animals, family, food, numbers, nature & dreams! 🌈
            </p>

            {/* Fun facts strip */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {funFacts.map((f) => (
                <span key={f.text} className="inline-flex items-center gap-1.5 rounded-full bg-white/80 dark:bg-card px-4 py-2 text-sm font-medium shadow-sm border">
                  <span>{f.emoji}</span> {f.text}
                </span>
              ))}
            </div>

            {/* Game Center CTA */}
            <div className="mt-6">
              <Link to="/kids/games">
                <Button size="lg" className="rounded-full px-8 gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold text-lg shadow-lg">
                  <Gamepad2 className="h-5 w-5" />
                  🎮 Game Center
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Theme Units */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {themeUnits.map((unit, i) => (
              <motion.div key={unit.title} variants={staggerItem}>
                <div className="group relative rounded-3xl border-2 border-transparent hover:border-primary/20 bg-white dark:bg-card shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative w-full md:w-64 h-48 md:h-auto shrink-0 overflow-hidden">
                      <img
                        src={unit.image}
                        alt={unit.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-r ${unit.color} opacity-20`} />
                      <div className="absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-xl shadow-sm">
                        {unit.emoji}
                      </div>
                      <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-foreground shadow-sm">
                        Unit {i + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 md:p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold font-display">{unit.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{unit.description}</p>
                        </div>
                        <div className="flex gap-0.5 ml-2">
                          {Array.from({ length: unit.lessons.length }).map((_, s) => (
                            <Star key={s} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>

                      {/* Lessons list */}
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {unit.lessons.map((lesson) => (
                          <Link
                            key={lesson.id}
                            to={`/courses/kids/${lesson.id}/slides`}
                            className="flex items-center gap-3 rounded-xl border bg-muted/30 hover:bg-primary/5 hover:border-primary/30 px-4 py-3 transition-all group/lesson"
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                              {lesson.number}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{lesson.title}</p>
                            </div>
                            <BookOpen className="h-4 w-4 text-muted-foreground group-hover/lesson:text-primary transition-colors" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Game Center Card */}
          <FadeInUp delay={0.3}>
            <Link to="/kids/games">
              <div className="mt-8 relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer">
                <img src={gamesImg} alt="Game Center" className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <Gamepad2 className="h-12 w-12 mb-3 drop-shadow-lg" />
                  <h3 className="text-2xl md:text-3xl font-bold font-display drop-shadow-lg">🎮 Game Center</h3>
                  <p className="text-white/80 mt-2 text-sm">Matching games, word puzzles, memory cards & more!</p>
                </div>
              </div>
            </Link>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
