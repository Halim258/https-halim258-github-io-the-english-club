import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Star, Gamepad2, BookOpen, Sparkles, Rocket } from "lucide-react";
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

interface KidsLesson {
  id: string;
  title: string;
  number: number;
  /** Child-friendly grammar focus shown under the lesson title. */
  focus: string;
}

interface ThemeUnit {
  title: string;
  emoji: string;
  image: string;
  color: string;
  stage: "a1" | "a2";
  description: string;
  lessons: KidsLesson[];
}

/**
 * All 30 kids lessons, grouped into themed units and kept in teaching order.
 * Titles and lesson numbers match the lesson data files exactly.
 */
const themeUnits: ThemeUnit[] = [
  {
    title: "Colors, Shapes & Animals",
    emoji: "🎨",
    image: colorsImg,
    color: "from-red-400 to-yellow-400",
    stage: "a1",
    description: "First words: name the colors, the animals and the shapes around you.",
    lessons: [
      { id: "kids-1", title: "Colors Around Us", number: 1, focus: "What color is it?" },
      { id: "kids-2", title: "Animals I Know", number: 2, focus: "I have / It has" },
      { id: "kids-8", title: "Shapes & Sizes", number: 8, focus: "Describing adjectives" },
    ],
  },
  {
    title: "Me, My Family & My Home",
    emoji: "👨‍👩‍👧‍👦",
    image: familyImg,
    color: "from-pink-400 to-rose-400",
    stage: "a1",
    description: "Talk about your body, your family, your clothes and every room at home.",
    lessons: [
      { id: "kids-3", title: "My Body Parts", number: 3, focus: "This is / These are" },
      { id: "kids-6", title: "My Family", number: 6, focus: "Who is this?" },
      { id: "kids-11", title: "Clothes I Wear", number: 11, focus: "I'm wearing…" },
      { id: "kids-14", title: "My House & Rooms", number: 14, focus: "in / on / under" },
    ],
  },
  {
    title: "Yummy Food",
    emoji: "🍕",
    image: foodImg,
    color: "from-orange-400 to-amber-400",
    stage: "a1",
    description: "Say what you like to eat, and shop for fruit and vegetables.",
    lessons: [
      { id: "kids-4", title: "Yummy Food!", number: 4, focus: "I like / I don't like" },
      { id: "kids-13", title: "Fruits & Vegetables", number: 13, focus: "some / any" },
    ],
  },
  {
    title: "Numbers, Days & Time",
    emoji: "🔢",
    image: numbersImg,
    color: "from-blue-400 to-cyan-400",
    stage: "a1",
    description: "Count to twenty, learn the days, and tell the time of your day.",
    lessons: [
      { id: "kids-5", title: "Numbers & Counting", number: 5, focus: "How many?" },
      { id: "kids-9", title: "Days of the Week", number: 9, focus: "on + day" },
      { id: "kids-17", title: "Time & Daily Routine", number: 17, focus: "What time is it?" },
    ],
  },
  {
    title: "School, Play & Getting Around",
    emoji: "🎒",
    image: animalsImg,
    color: "from-violet-400 to-fuchsia-400",
    stage: "a1",
    description: "Classroom words, favourite toys and games, and how you travel.",
    lessons: [
      { id: "kids-7", title: "At School", number: 7, focus: "Classroom instructions" },
      { id: "kids-12", title: "Toys & Playtime", number: 12, focus: "Let's + verb" },
      { id: "kids-15", title: "Transportation", number: 15, focus: "by bus / by car" },
      { id: "kids-18", title: "Sports & Games", number: 18, focus: "can / can't" },
    ],
  },
  {
    title: "Nature & Weather",
    emoji: "🌿",
    image: natureImg,
    color: "from-emerald-400 to-teal-400",
    stage: "a1",
    description: "Trees, flowers, the sky and every kind of weather.",
    lessons: [
      { id: "kids-10", title: "Weather & Seasons", number: 10, focus: "It's sunny / rainy" },
      { id: "kids-19", title: "Nature & Environment", number: 19, focus: "There is / There are" },
    ],
  },
  {
    title: "Feelings & Dreams",
    emoji: "🌙",
    image: dreamsImg,
    color: "from-purple-400 to-indigo-400",
    stage: "a1",
    description: "Say how you feel and tell everyone what you want to be one day.",
    lessons: [
      { id: "kids-16", title: "Feelings & Emotions", number: 16, focus: "I am + feeling" },
      { id: "kids-20", title: "My Dream & Future", number: 20, focus: "I want to be…" },
    ],
  },
  {
    title: "Past Days & Comparing",
    emoji: "🕰️",
    image: dreamsImg,
    color: "from-sky-400 to-blue-500",
    stage: "a2",
    description: "Tell stories about yesterday and compare everything around you.",
    lessons: [
      { id: "kids-21", title: "My Weekend — Talking About Yesterday", number: 21, focus: "Past simple, was / were" },
      { id: "kids-22", title: "A Day at the Zoo", number: 22, focus: "Irregular past verbs" },
      { id: "kids-23", title: "Bigger, Faster, Taller", number: 23, focus: "Comparatives" },
      { id: "kids-24", title: "The Best in the World", number: 24, focus: "Superlatives" },
      { id: "kids-25", title: "My Holiday Plans", number: 25, focus: "going to (future)" },
    ],
  },
  {
    title: "Rules, Right Now & Stories",
    emoji: "🚀",
    image: gamesImg,
    color: "from-indigo-400 to-purple-500",
    stage: "a2",
    description: "Rules, what is happening now, shopping talk and your first full story.",
    lessons: [
      { id: "kids-26", title: "I Can, I Must", number: 26, focus: "can / must / mustn't" },
      { id: "kids-27", title: "Right Now!", number: 27, focus: "Present continuous vs simple" },
      { id: "kids-28", title: "At the Market", number: 28, focus: "how much / how many" },
      { id: "kids-29", title: "My Busy Week", number: 29, focus: "Adverbs of frequency" },
      { id: "kids-30", title: "Tell Me a Story", number: 30, focus: "Mixed tenses review" },
    ],
  },
];

const STAGES = [
  {
    key: "a1" as const,
    icon: Sparkles,
    label: "Stage 1 · A1 Starter",
    blurb: "First words and simple sentences — colors, family, food, numbers, nature and feelings.",
  },
  {
    key: "a2" as const,
    icon: Rocket,
    label: "Stage 2 · Growing to A2",
    blurb: "Past, future, comparing and storytelling — the bridge from A1 to A2.",
  },
];

const funFacts = [
  { emoji: "🌟", text: "30 fun lessons" },
  { emoji: "🎯", text: "A1 → A2 journey" },
  { emoji: "🎮", text: "Game Center" },
  { emoji: "🔊", text: "Audio in every lesson" },
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
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-lg">
              Nine themed units take young learners from their very first words all the way to A2 🌈
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

      {/* Theme Units, grouped by stage */}
      <section className="pb-8 md:pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {STAGES.map((stage) => {
            const units = themeUnits.filter((u) => u.stage === stage.key);
            const lessonCount = units.reduce((sum, u) => sum + u.lessons.length, 0);
            const StageIcon = stage.icon;
            let unitIndex = themeUnits.findIndex((u) => u.stage === stage.key);

            return (
              <div key={stage.key} className="mb-10 last:mb-0">
                {/* Stage header */}
                <FadeInUp>
                  <div className="mb-5 rounded-2xl border bg-white/70 dark:bg-card p-5 shadow-sm">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <StageIcon className="h-5 w-5" />
                      </span>
                      <h2 className="text-xl md:text-2xl font-bold font-display">{stage.label}</h2>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
                        {units.length} units · {lessonCount} lessons
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{stage.blurb}</p>
                  </div>
                </FadeInUp>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className="space-y-6"
                >
                  {units.map((unit) => {
                    const number = ++unitIndex;
                    return (
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
                                Unit {number}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-5 md:p-6">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <h3 className="text-xl font-bold font-display">{unit.title}</h3>
                                  <p className="text-sm text-muted-foreground mt-1">{unit.description}</p>
                                </div>
                                <div className="flex shrink-0 items-center gap-1 rounded-full bg-muted/60 px-2.5 py-1">
                                  <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                                  <span className="text-[11px] font-bold">{unit.lessons.length}</span>
                                </div>
                              </div>

                              {/* Lessons list */}
                              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                                {unit.lessons.map((lesson) => (
                                  <Link
                                    key={lesson.id}
                                    to={`/courses/kids/${lesson.number}/slides`}
                                    className="flex items-center gap-3 rounded-xl border bg-muted/30 hover:bg-primary/5 hover:border-primary/30 px-4 py-3 transition-all group/lesson"
                                  >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                                      {lesson.number}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-semibold truncate">{lesson.title}</p>
                                      <p className="text-[11px] text-muted-foreground truncate">{lesson.focus}</p>
                                    </div>
                                    <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground group-hover/lesson:text-primary transition-colors" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            );
          })}

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
