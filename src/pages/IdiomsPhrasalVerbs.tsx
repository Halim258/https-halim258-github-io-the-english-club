import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronLeft, Volume2, Shuffle, CheckCircle2, XCircle, ArrowRight, BookOpen, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTTS } from "@/hooks/useTTS";

interface IdiomEntry {
  phrase: string;
  meaning: string;
  meaningAr: string;
  example: string;
  level: string;
  type: "idiom" | "phrasal-verb";
  emoji: string;
}

const IDIOMS_DATA: IdiomEntry[] = [
  // A1–A2 Phrasal Verbs
  { phrase: "wake up", meaning: "To stop sleeping", meaningAr: "يستيقظ", example: "I wake up at 7 every morning.", level: "A1", type: "phrasal-verb", emoji: "⏰" },
  { phrase: "get up", meaning: "To rise from bed", meaningAr: "ينهض", example: "She gets up early on weekdays.", level: "A1", type: "phrasal-verb", emoji: "🛏️" },
  { phrase: "put on", meaning: "To wear clothing", meaningAr: "يرتدي", example: "Put on your jacket, it's cold outside.", level: "A1", type: "phrasal-verb", emoji: "🧥" },
  { phrase: "take off", meaning: "To remove clothing", meaningAr: "يخلع", example: "Please take off your shoes at the door.", level: "A1", type: "phrasal-verb", emoji: "👟" },
  { phrase: "turn on", meaning: "To start a device", meaningAr: "يشغّل", example: "Can you turn on the light?", level: "A1", type: "phrasal-verb", emoji: "💡" },
  { phrase: "turn off", meaning: "To stop a device", meaningAr: "يطفئ", example: "Turn off the TV before you sleep.", level: "A1", type: "phrasal-verb", emoji: "📺" },
  { phrase: "look for", meaning: "To search for something", meaningAr: "يبحث عن", example: "I'm looking for my keys.", level: "A2", type: "phrasal-verb", emoji: "🔍" },
  { phrase: "give up", meaning: "To stop trying", meaningAr: "يستسلم", example: "Don't give up! You can do it.", level: "A2", type: "phrasal-verb", emoji: "🏳️" },
  { phrase: "pick up", meaning: "To lift something from a surface", meaningAr: "يلتقط", example: "Pick up that book from the floor.", level: "A2", type: "phrasal-verb", emoji: "📚" },
  { phrase: "throw away", meaning: "To put in the trash", meaningAr: "يرمي", example: "Throw away the old newspapers.", level: "A2", type: "phrasal-verb", emoji: "🗑️" },
  // B1 Phrasal Verbs
  { phrase: "figure out", meaning: "To understand or solve", meaningAr: "يكتشف / يفهم", example: "I can't figure out this math problem.", level: "B1", type: "phrasal-verb", emoji: "🧩" },
  { phrase: "come up with", meaning: "To think of an idea", meaningAr: "يتوصل لفكرة", example: "She came up with a great solution.", level: "B1", type: "phrasal-verb", emoji: "💡" },
  { phrase: "look forward to", meaning: "To feel excited about something future", meaningAr: "يتطلع إلى", example: "I look forward to meeting you.", level: "B1", type: "phrasal-verb", emoji: "🤩" },
  { phrase: "run out of", meaning: "To have no more of something", meaningAr: "ينفد من", example: "We've run out of milk.", level: "B1", type: "phrasal-verb", emoji: "🥛" },
  { phrase: "get along with", meaning: "To have a good relationship", meaningAr: "ينسجم مع", example: "I get along with all my colleagues.", level: "B1", type: "phrasal-verb", emoji: "🤝" },
  { phrase: "put off", meaning: "To postpone", meaningAr: "يؤجل", example: "Don't put off your homework.", level: "B1", type: "phrasal-verb", emoji: "📅" },
  { phrase: "bring up", meaning: "To mention a topic", meaningAr: "يطرح موضوع", example: "She brought up an interesting point.", level: "B1", type: "phrasal-verb", emoji: "🗣️" },
  { phrase: "carry on", meaning: "To continue", meaningAr: "يستمر", example: "Carry on with your work.", level: "B1", type: "phrasal-verb", emoji: "➡️" },
  // B2 Phrasal Verbs
  { phrase: "break down", meaning: "To stop functioning / to analyze", meaningAr: "يتعطل / يحلل", example: "My car broke down on the highway.", level: "B2", type: "phrasal-verb", emoji: "🚗" },
  { phrase: "come across", meaning: "To find by chance", meaningAr: "يصادف", example: "I came across an old photo album.", level: "B2", type: "phrasal-verb", emoji: "📸" },
  { phrase: "cut down on", meaning: "To reduce", meaningAr: "يقلل من", example: "You should cut down on sugar.", level: "B2", type: "phrasal-verb", emoji: "✂️" },
  { phrase: "look into", meaning: "To investigate", meaningAr: "يحقق في", example: "The police are looking into the case.", level: "B2", type: "phrasal-verb", emoji: "🔎" },
  { phrase: "stand out", meaning: "To be noticeable", meaningAr: "يبرز", example: "Her talent really stands out.", level: "B2", type: "phrasal-verb", emoji: "⭐" },
  { phrase: "turn down", meaning: "To reject an offer", meaningAr: "يرفض", example: "He turned down the job offer.", level: "B2", type: "phrasal-verb", emoji: "🙅" },
  // C1–C2 Phrasal Verbs
  { phrase: "pan out", meaning: "To develop or turn out", meaningAr: "ينتج عنه", example: "Let's see how things pan out.", level: "C1", type: "phrasal-verb", emoji: "🎯" },
  { phrase: "zero in on", meaning: "To focus precisely on", meaningAr: "يركز على", example: "We need to zero in on the main issue.", level: "C1", type: "phrasal-verb", emoji: "🎯" },
  { phrase: "iron out", meaning: "To resolve problems", meaningAr: "يحل المشاكل", example: "We need to iron out a few details.", level: "C1", type: "phrasal-verb", emoji: "🔧" },
  { phrase: "ward off", meaning: "To prevent or repel", meaningAr: "يتقي / يدرأ", example: "Vitamin C helps ward off colds.", level: "C2", type: "phrasal-verb", emoji: "🛡️" },

  // Idioms
  { phrase: "a piece of cake", meaning: "Something very easy", meaningAr: "شيء سهل جداً", example: "The test was a piece of cake.", level: "A2", type: "idiom", emoji: "🍰" },
  { phrase: "break the ice", meaning: "To start a conversation in a social setting", meaningAr: "يكسر الحاجز", example: "His joke helped break the ice.", level: "B1", type: "idiom", emoji: "🧊" },
  { phrase: "hit the nail on the head", meaning: "To be exactly right", meaningAr: "أصاب كبد الحقيقة", example: "You hit the nail on the head with that answer.", level: "B1", type: "idiom", emoji: "🔨" },
  { phrase: "under the weather", meaning: "Feeling sick", meaningAr: "يشعر بالمرض", example: "I'm feeling under the weather today.", level: "B1", type: "idiom", emoji: "🤒" },
  { phrase: "cost an arm and a leg", meaning: "Very expensive", meaningAr: "غالي جداً", example: "That new car cost an arm and a leg.", level: "B1", type: "idiom", emoji: "💸" },
  { phrase: "let the cat out of the bag", meaning: "To reveal a secret", meaningAr: "يفشي سراً", example: "Who let the cat out of the bag about the surprise?", level: "B1", type: "idiom", emoji: "🐱" },
  { phrase: "kill two birds with one stone", meaning: "To accomplish two things at once", meaningAr: "يضرب عصفورين بحجر واحد", example: "By studying on the train, I kill two birds with one stone.", level: "B2", type: "idiom", emoji: "🪨" },
  { phrase: "the ball is in your court", meaning: "It's your decision now", meaningAr: "القرار بيدك الآن", example: "I've made my offer — the ball is in your court.", level: "B2", type: "idiom", emoji: "🎾" },
  { phrase: "bite the bullet", meaning: "To face a difficult situation bravely", meaningAr: "يتحمل الصعب بشجاعة", example: "I had to bite the bullet and tell her the truth.", level: "B2", type: "idiom", emoji: "😤" },
  { phrase: "burn the midnight oil", meaning: "To work late at night", meaningAr: "يسهر للعمل", example: "She burned the midnight oil studying for exams.", level: "B2", type: "idiom", emoji: "🕯️" },
  { phrase: "a blessing in disguise", meaning: "Something bad that turns out good", meaningAr: "نعمة مقنّعة", example: "Losing that job was a blessing in disguise.", level: "B2", type: "idiom", emoji: "🎭" },
  { phrase: "beat around the bush", meaning: "To avoid the main topic", meaningAr: "يتحدث بشكل غير مباشر", example: "Stop beating around the bush and tell me.", level: "B2", type: "idiom", emoji: "🌳" },
  { phrase: "once in a blue moon", meaning: "Very rarely", meaningAr: "نادراً جداً", example: "I only eat fast food once in a blue moon.", level: "B2", type: "idiom", emoji: "🌙" },
  { phrase: "spill the beans", meaning: "To reveal secret information", meaningAr: "يفشي السر", example: "Come on, spill the beans! What happened?", level: "B2", type: "idiom", emoji: "🫘" },
  { phrase: "barking up the wrong tree", meaning: "To make a wrong assumption", meaningAr: "يبحث في المكان الخطأ", example: "If you think I did it, you're barking up the wrong tree.", level: "C1", type: "idiom", emoji: "🌲" },
  { phrase: "the elephant in the room", meaning: "An obvious problem no one talks about", meaningAr: "المشكلة الواضحة التي لا أحد يتحدث عنها", example: "His debt was the elephant in the room.", level: "C1", type: "idiom", emoji: "🐘" },
  { phrase: "go the extra mile", meaning: "To do more than expected", meaningAr: "يبذل جهداً إضافياً", example: "She always goes the extra mile for her students.", level: "B1", type: "idiom", emoji: "🏃" },
  { phrase: "on the same page", meaning: "To agree or have the same understanding", meaningAr: "على نفس الصفحة / متفقون", example: "Let's make sure we're all on the same page.", level: "B1", type: "idiom", emoji: "📄" },
];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function QuizSection({ entries }: { entries: IdiomEntry[] }) {
  const [questions, setQuestions] = useState<{ entry: IdiomEntry; options: string[]; correctIdx: number }[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const startQuiz = () => {
    const pool = shuffleArray(entries).slice(0, Math.min(8, entries.length));
    const qs = pool.map((entry) => {
      const wrong = shuffleArray(entries.filter((e) => e.phrase !== entry.phrase))
        .slice(0, 3)
        .map((e) => e.meaning);
      const allOpts = shuffleArray([entry.meaning, ...wrong]);
      return { entry, options: allOpts, correctIdx: allOpts.indexOf(entry.meaning) };
    });
    setQuestions(qs);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[current].correctIdx) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <span className="text-6xl">🧠</span>
        <h3 className="text-xl font-bold">Idioms & Phrasal Verbs Quiz</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Test your knowledge! Match phrases with their meanings in a quick {Math.min(8, entries.length)}-question quiz.
        </p>
        <Button onClick={startQuiz} size="lg" className="gap-2 mt-2">
          <Shuffle className="h-4 w-4" /> Start Quiz
        </Button>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center py-16 space-y-4">
        <span className="text-6xl">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪"}</span>
        <h3 className="text-2xl font-bold">{score}/{questions.length} Correct!</h3>
        <p className="text-muted-foreground">{pct >= 80 ? "Excellent work!" : pct >= 50 ? "Good job, keep practicing!" : "Keep learning, you'll get there!"}</p>
        <Button onClick={startQuiz} className="gap-2">
          <Shuffle className="h-4 w-4" /> Try Again
        </Button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="max-w-xl mx-auto space-y-6 py-6">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">{current + 1} / {questions.length}</Badge>
        <Badge variant="outline">{score} correct</Badge>
      </div>
      <div className="text-center space-y-2">
        <span className="text-4xl">{q.entry.emoji}</span>
        <h3 className="text-2xl font-bold">"{q.entry.phrase}"</h3>
        <p className="text-sm text-muted-foreground italic">"{q.entry.example}"</p>
      </div>
      <div className="grid gap-2">
        {q.options.map((opt, i) => {
          let cls = "border bg-card hover:bg-muted/50";
          if (selected !== null) {
            if (i === q.correctIdx) cls = "border-green-500 bg-green-50 dark:bg-green-950/30";
            else if (i === selected) cls = "border-destructive bg-red-50 dark:bg-red-950/30";
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`p-3 rounded-xl text-left transition-colors ${cls}`}
              disabled={selected !== null}
            >
              <div className="flex items-center gap-3">
                {selected !== null && i === q.correctIdx && <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />}
                {selected !== null && i === selected && i !== q.correctIdx && <XCircle className="h-5 w-5 text-destructive shrink-0" />}
                <span className="font-medium">{opt}</span>
              </div>
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div className="flex justify-end">
          <Button onClick={next} className="gap-1">
            {current + 1 >= questions.length ? "See Results" : "Next"} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default function IdiomsPhrasalVerbs() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "idiom" | "phrasal-verb">("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const { speak } = useTTS();

  const filtered = useMemo(() => {
    return IDIOMS_DATA.filter((e) => {
      if (typeFilter !== "all" && e.type !== typeFilter) return false;
      if (levelFilter !== "all" && e.level !== levelFilter) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          e.phrase.toLowerCase().includes(q) ||
          e.meaning.toLowerCase().includes(q) ||
          e.meaningAr.includes(q)
        );
      }
      return true;
    });
  }, [query, typeFilter, levelFilter]);

  const levels = [...new Set(IDIOMS_DATA.map((e) => e.level))].sort();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-amber-950/20 dark:via-background dark:to-rose-950/20 py-12">
        <div className="container mx-auto px-4">
          <Link to="/courses" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Back to Courses
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">🗣️</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display">Idioms & Phrasal Verbs</h1>
              <p className="text-muted-foreground mt-1">{IDIOMS_DATA.length} expressions to master</p>
            </div>
          </div>
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by phrase, meaning, or Arabic..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 text-base rounded-xl"
            />
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Tabs defaultValue="browse">
            <TabsList className="mb-6">
              <TabsTrigger value="browse" className="gap-1.5"><BookOpen className="h-4 w-4" /> Browse</TabsTrigger>
              <TabsTrigger value="quiz" className="gap-1.5"><Lightbulb className="h-4 w-4" /> Quiz</TabsTrigger>
            </TabsList>

            <TabsContent value="browse">
              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-4">
                {(["all", "idiom", "phrasal-verb"] as const).map((t) => (
                  <Badge
                    key={t}
                    variant={typeFilter === t ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setTypeFilter(t)}
                  >
                    {t === "all" ? "All" : t === "idiom" ? "🎭 Idioms" : "🔗 Phrasal Verbs"}
                  </Badge>
                ))}
                <span className="mx-1" />
                {["all", ...levels].map((l) => (
                  <Badge
                    key={l}
                    variant={levelFilter === l ? "secondary" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => setLevelFilter(l)}
                  >
                    {l === "all" ? "All Levels" : l}
                  </Badge>
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-3">{filtered.length} expressions</p>

              <ScrollArea className="h-[60vh]">
                <div className="grid gap-2">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((e, i) => (
                      <motion.div
                        key={e.phrase}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: Math.min(i * 0.02, 0.4) }}
                        className="flex items-start gap-3 p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors cursor-pointer group"
                        onClick={() => speak(`${e.phrase}. ${e.meaning}. ${e.example}`)}
                      >
                        <span className="text-2xl">{e.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold">{e.phrase}</span>
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                              {e.type === "idiom" ? "Idiom" : "Phrasal Verb"}
                            </Badge>
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{e.level}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">{e.meaning}</p>
                          <p className="text-xs text-muted-foreground/70 mt-0.5">({e.meaningAr})</p>
                          <p className="text-xs text-primary/70 mt-1 italic">"{e.example}"</p>
                        </div>
                        <Volume2 className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {filtered.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-30" />
                      <p>No expressions found for "{query}"</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="quiz">
              <QuizSection entries={filtered.length >= 4 ? filtered : IDIOMS_DATA} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
