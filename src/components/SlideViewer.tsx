import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, BookOpen, MessageSquare, PenLine,
  CheckCircle2, XCircle, Volume2, RotateCcw, GraduationCap, Eye, EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Slide, SlideContent } from "@/data/slide-types";
import type { VocabWord, MCQItem } from "@/data/lessons";
import { useTTS } from "@/hooks/useTTS";

/* ═══════════ MAIN VIEWER ═══════════ */
interface SlideViewerProps {
  slides: Slide[];
  onBack?: () => void;
}

export default function SlideViewer({ slides, onBack }: SlideViewerProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const slide = slides[current];

  const go = useCallback(
    (dir: number) => {
      const next = current + dir;
      if (next < 0 || next >= slides.length) return;
      setDirection(dir);
      setCurrent(next);
    },
    [current, slides.length]
  );

  const progress = ((current + 1) / slides.length) * 100;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b bg-card/95 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack} className="rounded-full text-xs gap-1.5 hover:bg-primary/8 hover:text-primary">
              <ChevronLeft className="h-3.5 w-3.5" /> Back
            </Button>
          )}
          <div className="flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1">
            <span className="text-xs font-bold text-primary">{current + 1}</span>
            <span className="text-[10px] text-muted-foreground">/</span>
            <span className="text-xs text-muted-foreground">{slides.length}</span>
          </div>
        </div>
        <div className="flex-1 mx-4 max-w-sm">
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/80"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {slide.emoji && <span className="text-sm">{slide.emoji}</span>}
          <span className="text-xs font-semibold text-foreground">{slide.title}</span>
        </div>
      </div>

      {/* Slide area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute inset-0 overflow-y-auto"
          >
            <SlideRenderer slide={slide} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between px-4 py-3 border-t bg-card/95 backdrop-blur-sm shrink-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => go(-1)}
          disabled={current === 0}
          className="rounded-full gap-1.5 text-xs font-semibold min-w-[100px] hover:bg-primary/5 hover:text-primary hover:border-primary/30 disabled:opacity-40"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Previous
        </Button>

        {/* Slide dots (show max 12) */}
        <div className="hidden sm:flex items-center gap-1.5">
          {slides.slice(0, 12).map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`rounded-full transition-all duration-300 ${
                i === current 
                  ? "w-7 h-2.5 bg-primary shadow-sm" 
                  : i < current 
                    ? "w-2.5 h-2.5 bg-primary/30 hover:bg-primary/50" 
                    : "w-2.5 h-2.5 bg-muted-foreground/20 hover:bg-muted-foreground/40"
              }`}
            />
          ))}
          {slides.length > 12 && <span className="text-[10px] text-muted-foreground ml-1 font-medium">+{slides.length - 12}</span>}
        </div>

        <Button
          size="sm"
          onClick={() => {
            if (current === slides.length - 1) {
              onBack?.();
            } else {
              go(1);
            }
          }}
          className="rounded-full gap-1.5 text-xs font-semibold min-w-[100px]"
        >
          {current === slides.length - 1 ? "Finish" : "Next"} <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

/* ═══════════ SLIDE RENDERER ═══════════ */
function SlideRenderer({ slide }: { slide: Slide }) {
  const { content } = slide;

  return (
    <div className={`min-h-full bg-gradient-to-br ${slide.bgColor || ""} p-3 md:p-6`}>
      <div className="max-w-3xl mx-auto">
        {/* Slide header */}
        <div className="flex items-center gap-3 mb-6">
          {slide.emoji && <span className="text-3xl">{slide.emoji}</span>}
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-display">{slide.title}</h2>
            {slide.subtitle && <p className="text-sm text-muted-foreground mt-0.5">{slide.subtitle}</p>}
          </div>
        </div>

        {/* Content by type */}
        {content.kind === "title" && <TitleSlide content={content} />}
        {content.kind === "vocab" && <VocabSlide words={content.words} />}
        {content.kind === "dialogue" && <DialogueSlide lines={content.lines} />}
        {content.kind === "grammar" && <GrammarSlide rule={content.rule} />}
        {content.kind === "exercise" && <ExerciseSlide label={content.label} questions={content.questions} />}
        {content.kind === "summary" && <SummarySlide points={content.points} />}
        {content.kind === "info" && <InfoSlide paragraphs={content.paragraphs} />}
        {content.kind === "story-text" && <StoryTextSlide text={content.text} moral={content.moral} />}
        {content.kind === "video" && <VideoSlide youtubeId={content.youtubeId} sceneContext={content.sceneContext} culturalNote={content.culturalNote} movieTitle={content.movieTitle} />}
        {content.kind === "expressions" && <ExpressionsSlide items={content.items} />}
        {content.kind === "discussion" && <DiscussionSlide questions={content.questions} />}
        {content.kind === "transcript" && <TranscriptSlide lines={content.lines} vocabWords={content.vocabWords} />}
        {content.kind === "song-reward" && <SongRewardSlide youtubeId={content.youtubeId} title={content.title} artist={content.artist} message={content.message} />}
        {content.kind === "listening" && <ListeningSlide audioContext={content.audioContext} tip={content.tip} questions={content.questions} />}
      </div>
    </div>
  );
}

/* ═══════════ TITLE SLIDE ═══════════ */
const levelEmojis: Record<string, string> = {
  "A1": "🌱", "A2": "🌿", "B1": "🌳", "B2": "🏔️", "C1": "🚀", "C2": "👑",
  "Reading Course": "📖", "Kids English": "🧒", "Speaking": "🗣️",
  "Listening": "👂", "Writing": "✍️", "Grammar": "📐", "Exam": "📝", "Professional": "💼",
};

function getLevelEmoji(level: string) {
  for (const [key, emoji] of Object.entries(levelEmojis)) {
    if (level.toLowerCase().includes(key.toLowerCase())) return emoji;
  }
  return "📘";
}

function TitleSlide({ content }: { content: { heading: string; description: string; level: string; lessonNumber: number } }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 md:py-16">
      {/* Decorative emoji illustration */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative mb-6"
      >
        <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-lg">
          <span className="text-5xl">{getLevelEmoji(content.level)}</span>
        </div>
        <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shadow-sm border border-primary/20">
          {content.lessonNumber}
        </div>
      </motion.div>
      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
        <GraduationCap className="h-3.5 w-3.5" />
        {content.level} — Lesson {content.lessonNumber}
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display">{content.heading}</h1>
      <p className="mt-4 max-w-md text-muted-foreground">{content.description}</p>
      <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground/60">
        <span className="flex items-center gap-1">📚 Vocabulary</span>
        <span className="flex items-center gap-1">💬 Conversation</span>
        <span className="flex items-center gap-1">📐 Grammar</span>
        <span className="flex items-center gap-1">✏️ Exercises</span>
      </div>
    </div>
  );
}

/* ═══════════ VOCAB SLIDE ═══════════ */
const vocabColors = [
  "from-blue-500/20 to-sky-400/10",
  "from-emerald-500/20 to-green-400/10",
  "from-violet-500/20 to-purple-400/10",
  "from-amber-500/20 to-yellow-400/10",
  "from-pink-500/20 to-rose-400/10",
  "from-cyan-500/20 to-teal-400/10",
  "from-rose-500/20 to-red-400/10",
  "from-teal-500/20 to-emerald-400/10",
  "from-indigo-500/20 to-blue-400/10",
  "from-orange-500/20 to-amber-400/10",
];

const vocabPatterns = [
  "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 50%)",
  "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)",
  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)",
  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12) 0%, transparent 55%)",
  "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.12) 0%, transparent 55%)",
];

function VocabSlide({ words }: { words: VocabWord[] }) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const { speak, speaking } = useTTS();

  const toggle = (i: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const revealAll = () => {
    if (showAll) {
      setFlipped(new Set());
      setShowAll(false);
    } else {
      setFlipped(new Set(words.map((_, i) => i)));
      setShowAll(true);
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={revealAll} className="rounded-full text-xs gap-1.5">
          {showAll ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          {showAll ? "Hide All" : "Reveal All"}
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {words.map((w, i) => {
          const isOpen = flipped.has(i);
          return (
            <motion.div
              key={w.word}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => toggle(i)}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer rounded-xl border bg-card overflow-hidden shadow-soft hover:shadow-card transition-all duration-200 group"
            >
              {/* Visual illustration area with emoji + pattern */}
              <div
                className={`relative bg-gradient-to-br ${vocabColors[i % vocabColors.length]} flex items-center justify-center py-6 overflow-hidden`}
                style={{ backgroundImage: vocabPatterns[i % vocabPatterns.length] }}
              >
                {/* Decorative floating shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-2 -left-2 w-16 h-16 rounded-full bg-white/5" />
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-full bg-white/5" />
                </div>
                <motion.span
                  className="text-6xl select-none drop-shadow-md z-10"
                  animate={{ scale: isOpen ? 1.15 : 1, rotate: isOpen ? [0, -5, 5, 0] : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {w.emoji}
                </motion.span>
                {/* Arabic badge */}
                <span className="absolute top-2 right-2 text-[10px] font-bold text-muted-foreground/70 bg-background/70 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm">
                  {w.arabic}
                </span>
                {/* Listen button */}
                <button
                  onClick={(e) => { e.stopPropagation(); speak(`${w.word}. ${w.meaning}. ${w.example}`); }}
                  className="absolute bottom-2 right-2 h-7 w-7 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-background transition-colors"
                >
                  <Volume2 className="h-3.5 w-3.5 text-primary" />
                </button>
              </div>
              {/* Text content */}
              <div className="p-3.5">
                <div className="flex items-center justify-between">
                  <p className="font-bold font-display text-base">{w.word}</p>
                  <span className="text-[10px] text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors">
                    {isOpen ? "tap to hide" : "tap to reveal"}
                  </span>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-muted-foreground mt-1.5 flex items-start gap-1.5">
                        <span className="text-primary font-semibold text-xs mt-0.5">→</span>
                        {w.meaning}
                      </p>
                      <div className="mt-2 rounded-lg bg-muted/40 px-3 py-2 border-l-2 border-primary/30">
                        <p className="text-xs text-muted-foreground/80 italic">"{w.example}"</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════ DIALOGUE SLIDE ═══════════ */
// Female names
const femaleNames = new Set([
  "Sara", "Emma", "Nour", "Nora", "Lina", "Mona", "Hana", "Dana", "Layla", "Leila",
  "Fatima", "Aisha", "Yasmin", "Jasmine", "Salma", "Rania", "Dina", "Rana", "Maya",
  "Sophia", "Olivia", "Ava", "Mia", "Isabella", "Charlotte", "Amelia", "Emily",
  "Ella", "Grace", "Lily", "Chloe", "Zoe", "Hannah", "Lucy", "Anna", "Sarah",
  "Maria", "Julia", "Sophie", "Alice", "Rose", "Mary", "Jane", "Lisa", "Amy",
  "Rachel", "Laura", "Helen", "Kate", "Katie", "Nancy", "Susan", "Linda", "Karen",
  "Jessica", "Jennifer", "Nicole", "Samantha", "Tina", "Diana", "Reem", "Noura",
  "Mariam", "Huda", "Amira", "Farida", "Malak", "Yara", "Lama", "Dalal", "Abeer",
  "Mom", "Mother", "Mum", "Wife", "Sister", "Daughter", "Grandma", "Grandmother", "Aunt",
  "Ms. Smith", "Ms. Johnson", "Mrs. Smith", "Mrs. Johnson", "Miss", "Lady",
]);

// Kid names / roles
const kidNames = new Set([
  "Tommy", "Timmy", "Bobby", "Billy", "Jimmy", "Danny", "Johnny", "Sammy",
  "Annie", "Molly", "Sally", "Lily", "Rosie", "Daisy", "Penny", "Ruby",
  "Child", "Kid", "Boy", "Girl", "Son", "Daughter", "Baby", "Toddler",
  "Little Ali", "Little Sara", "Student 1", "Student 2",
]);

const speakerAvatars: Record<string, string> = {
  // Education
  Teacher: "👩‍🏫", Coach: "🧑‍💼", Tutor: "👨‍🏫", Professor: "👨‍🎓", Instructor: "👩‍🏫",
  Student: "🧑‍🎓", Learner: "📖", Candidate: "💼", Pupil: "🧑‍🎓", Trainee: "📝",
  // Social
  Friend: "🤝", You: "🙋", Neighbor: "🏡", Colleague: "🤝", Partner: "💑",
  Stranger: "❓", Roommate: "🏠", Classmate: "🎒", "Pen Pal": "✉️",
  // Food & Hospitality
  Waiter: "🍽️", Waitress: "🍽️", Customer: "🛒", Cashier: "💳",
  Chef: "👨‍🍳", Cook: "🍳", Baker: "🧁", Barista: "☕", Bartender: "🍸",
  Server: "🍽️", "Head Chef": "👨‍🍳", "Sous Chef": "🍳",
  // Medical
  Doctor: "👨‍⚕️", Nurse: "👩‍⚕️", Patient: "🤒", Dentist: "🦷",
  Surgeon: "🏥", Therapist: "🧠", Pharmacist: "💊", Paramedic: "🚑",
  Psychologist: "🧠", Veterinarian: "🐾", Vet: "🐾", Optician: "👓",
  // Business & Office
  Interviewer: "📋", Manager: "💼", Receptionist: "🏨", Boss: "👔",
  Client: "🤵", Advisor: "💡", Director: "🎬", Consultant: "📊",
  Analyst: "📈", Editor: "✏️", Writer: "📝", Secretary: "📋",
  CEO: "🏢", CFO: "💹", CTO: "💻", HR: "👥", "HR Manager": "👥",
  Accountant: "🧮", Lawyer: "⚖️", Attorney: "⚖️", Banker: "🏦",
  Investor: "📈", Entrepreneur: "🚀", Freelancer: "💻", Intern: "🎓",
  "Sales Manager": "💰", "Team Member": "👥", "Team Leader": "🏅",
  "Project Manager": "📋", Supervisor: "👔", Coordinator: "📊",
  // Media & Arts
  Anchor: "🎙️", Reporter: "🎤", Journalist: "📰", Photographer: "📷",
  Artist: "🎨", Musician: "🎵", Singer: "🎤", Actor: "🎭", Actress: "🎭",
  Dancer: "💃", Designer: "🎨", Architect: "📐", Filmmaker: "🎥",
  Host: "🎤", Guest: "🪪", Narrator: "📖", Speaker: "🎙️",
  DJ: "🎧", Presenter: "📺", Blogger: "💻", Vlogger: "📹",
  // Law & Authority
  Examiner: "📝", Judge: "⚖️", Officer: "👮", Police: "👮",
  Detective: "🕵️", Inspector: "🔍", Agent: "🕶️", Guard: "💂",
  Soldier: "🎖️", Captain: "⚓", Commander: "🎖️",
  // Transport & Travel
  Pilot: "👨‍✈️", Driver: "🚗", "Taxi Driver": "🚕", "Bus Driver": "🚌",
  "Flight Attendant": "✈️", Navigator: "🧭", Guide: "🗺️", "Tour Guide": "🗺️",
  "Travel Agent": "✈️",
  // Trades & Services
  Engineer: "👷", Mechanic: "🔧", Electrician: "⚡", Plumber: "🔧",
  Carpenter: "🪚", Painter: "🖌️", Gardener: "🌱", Farmer: "👨‍🌾",
  Fisherman: "🎣", Firefighter: "🧑‍🚒", Cleaner: "🧹",
  Librarian: "📚", Shopkeeper: "🏪", Vendor: "🏪", Tailor: "🧵",
  // Tech
  Programmer: "👨‍💻", Developer: "👩‍💻", "IT Support": "🖥️", Technician: "🔌",
  Scientist: "🔬", Researcher: "🔬",
  // Sports
  Referee: "🏁", Athlete: "🏃", Trainer: "🏋️", Player: "⚽",
  // Family
  Dad: "👨", Father: "👨", Husband: "👨", Brother: "👦",
  Grandpa: "👴", Grandfather: "👴", Uncle: "👨",
  Mom: "👩", Mother: "👩", Wife: "👩", Sister: "👧",
  Grandma: "👵", Grandmother: "👵", Aunt: "👩",
  Child: "🧒", Kid: "🧒", Boy: "👦", Girl: "👧", Baby: "👶",
  // Misc
  Chair: "🪑", Volunteer: "🤲", Mentor: "🌟", Assistant: "📎",
  Moderator: "🛡️", Panelist: "🎤", Audience: "👥", Listener: "👂",
};

function getAvatar(speaker: string) {
  if (speakerAvatars[speaker]) return speakerAvatars[speaker];
  if (kidNames.has(speaker)) return speaker.includes("Girl") || ["Annie","Molly","Sally","Lily","Rosie","Daisy","Penny","Ruby","Little Sara"].includes(speaker) ? "👧" : "👦";
  if (femaleNames.has(speaker)) return "👩";
  const maleNames = new Set(["Ali","Ahmed","Mark","Alex","Sam","John","James","Tom","David","Michael","Adam","Omar","Hassan","Mohamed","Youssef","Khalid","Tariq","Ziad","Fadi","Sami","Nabil","Karim","Rami","Bob","Jack","Leo","Ben","Max","Luke","Ryan","Chris","Dan","Steve","Peter","Paul","George","Henry","Kevin","Brian","Eric","Nick","Tony","Joe","Mike","Jake","Ethan","Noah","Liam","Mason","Logan","Mr. Smith","Mr. Johnson","Sir","Carlos","Pedro","Marco","Luis","Diego","Ivan","Raj","Arjun","Wei","Ken","Hiroshi","Yuki","Hans","Franz","Pierre","Jean","Andre","Viktor","Nikolai","Abdul","Hamza","Ibrahim","Bilal","Samir","Amir","Hadi","Walid","Bassam","Majid","Mansour","Faisal","Sultan","Nawaf","Bader","Fahad","Saeed","Rashid","Hamdan"]);
  if (maleNames.has(speaker)) return "👨";
  // Fallback: check for title prefixes
  if (speaker.startsWith("Mr.") || speaker.startsWith("Dr.") || speaker.startsWith("Prof.")) return "👨";
  if (speaker.startsWith("Ms.") || speaker.startsWith("Mrs.") || speaker.startsWith("Miss")) return "👩";
  return "🗣️";
}

function DialogueSlide({ lines }: { lines: { speaker: string; text: string }[] }) {
  const { speak } = useTTS();
  const speakers = [...new Set(lines.map(l => l.speaker))];

  const playAll = () => {
    const fullText = lines.map(l => `${l.speaker} says: ${l.text}`).join(". ");
    speak(fullText);
  };

  return (
    <div className="space-y-2 max-w-lg mx-auto">
      {/* Scene header with characters */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
        <div className="flex items-center gap-3">
          {speakers.map((speaker) => (
            <div key={speaker} className="flex flex-col items-center gap-1">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xl shadow-sm">
                {getAvatar(speaker)}
              </div>
              <span className="text-[10px] font-semibold text-muted-foreground">{speaker}</span>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" onClick={playAll} className="rounded-full text-xs gap-1.5">
          <Volume2 className="h-3 w-3" /> Listen
        </Button>
      </div>
      {lines.map((line, i) => {
        const isLeft = i % 2 === 0;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-end gap-2 ${isLeft ? "justify-start" : "justify-end"} group`}
          >
            {isLeft && (
              <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-sm shrink-0 mb-1">
                {getAvatar(line.speaker)}
              </div>
            )}
            <div
              className={`relative max-w-[75%] rounded-2xl px-4 py-3 ${
                isLeft
                  ? "bg-card border rounded-bl-sm shadow-soft"
                  : "bg-primary text-primary-foreground rounded-br-sm"
              }`}
            >
              <p className={`text-[11px] font-semibold mb-1 ${isLeft ? "text-primary" : "text-primary-foreground/80"}`}>
                {line.speaker}
              </p>
              <p className="text-sm">{line.text}</p>
              {/* Per-line listen */}
              <button
                onClick={() => speak(line.text)}
                className={`absolute -bottom-1 ${isLeft ? "-right-1" : "-left-1"} h-5 w-5 rounded-full bg-background border shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}
              >
                <Volume2 className="h-2.5 w-2.5 text-primary" />
              </button>
            </div>
            {!isLeft && (
              <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-sm shrink-0 mb-1">
                {getAvatar(line.speaker)}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ═══════════ GRAMMAR SLIDE ═══════════ */
function GrammarSlide({ rule }: { rule: { title: string; explanation: string; examples: { sentence: string; note: string }[] } }) {
  const { speak } = useTTS();
  const grammarEmojis = ["📐", "🔤", "✨", "📏"];

  return (
    <div className="space-y-4">
      {/* Rule card with visual header */}
      {rule.explanation && (
        <div className="rounded-xl border bg-card overflow-hidden shadow-soft">
          <div className="bg-gradient-to-r from-violet-500/15 to-purple-500/10 p-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-background/70 backdrop-blur-sm flex items-center justify-center text-2xl shadow-sm">
              📐
            </div>
            <div>
              <h3 className="font-bold font-display text-lg">{rule.title}</h3>
              <p className="text-[11px] text-muted-foreground">Grammar Rule</p>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{rule.explanation}</p>
          </div>
        </div>
      )}

      {rule.examples.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary flex items-center gap-2">
            <span>📝</span> Examples
          </p>
          {rule.examples.map((ex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-lg border bg-card p-3 shadow-soft flex items-start gap-3 group hover:border-primary/20 transition-colors"
            >
              <span className="text-xl mt-0.5">{grammarEmojis[i % grammarEmojis.length]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{ex.sentence}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{ex.note}</p>
              </div>
              <button
                onClick={() => speak(ex.sentence)}
                className="h-7 w-7 rounded-full bg-muted/50 flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Volume2 className="h-3 w-3 text-primary" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════ EXERCISE SLIDE ═══════════ */
function getQuestionEmoji(question: string): string {
  const q = question.toLowerCase();

  // Grammar & Language Structure
  if (q.includes("tense") || q.includes("past ") || q.includes("present ") || q.includes("future ")) return "⏳";
  if (q.includes("verb") || q.includes("conjugat")) return "🔤";
  if (q.includes("noun") || q.includes("plural") || q.includes("singular")) return "📝";
  if (q.includes("adjective") || q.includes("describ")) return "🏷️";
  if (q.includes("adverb")) return "💨";
  if (q.includes("preposition") || q.includes("in front") || q.includes("behind") || q.includes("between")) return "📍";
  if (q.includes("pronoun") || q.includes("he ") || q.includes("she ") || q.includes("they ")) return "👤";
  if (q.includes("sentence") || q.includes("clause") || q.includes("phrase")) return "✏️";
  if (q.includes("grammar") || q.includes("correct form") || q.includes("fill in")) return "📐";
  if (q.includes("punctuat") || q.includes("comma") || q.includes("period")) return "❗";
  if (q.includes("passive") || q.includes("active voice")) return "🔄";
  if (q.includes("conditional") || q.includes("if ")) return "🔀";
  if (q.includes("modal") || q.includes("can ") || q.includes("should ") || q.includes("must ")) return "⚙️";
  if (q.includes("article") || q.includes(" a ") || q.includes(" the ")) return "📎";

  // Reading & Comprehension
  if (q.includes("passage") || q.includes("paragraph") || q.includes("text")) return "📄";
  if (q.includes("main idea") || q.includes("theme") || q.includes("summary")) return "🎯";
  if (q.includes("author") || q.includes("writer") || q.includes("narrator")) return "🖊️";
  if (q.includes("meaning") || q.includes("synonym") || q.includes("antonym") || q.includes("definition")) return "🔍";
  if (q.includes("vocabulary") || q.includes("word") || q.includes("term")) return "📚";
  if (q.includes("infer") || q.includes("imply") || q.includes("suggest")) return "🧩";

  // Business & Professional
  if (q.includes("meeting") || q.includes("agenda") || q.includes("conference")) return "📊";
  if (q.includes("email") || q.includes("letter") || q.includes("correspondence")) return "📧";
  if (q.includes("presentation") || q.includes("slide") || q.includes("pitch")) return "📽️";
  if (q.includes("negotiate") || q.includes("deal") || q.includes("contract")) return "🤝";
  if (q.includes("resume") || q.includes("cv") || q.includes("interview") || q.includes("hire")) return "📋";
  if (q.includes("market") || q.includes("brand") || q.includes("advertis")) return "📈";
  if (q.includes("finance") || q.includes("invest") || q.includes("stock") || q.includes("bank")) return "💰";
  if (q.includes("law") || q.includes("legal") || q.includes("court") || q.includes("rights")) return "⚖️";

  // Healthcare & Medical
  if (q.includes("patient") || q.includes("symptom") || q.includes("diagnos")) return "🩺";
  if (q.includes("medicine") || q.includes("drug") || q.includes("prescription")) return "💊";

  // IT & Technology
  if (q.includes("software") || q.includes("program") || q.includes("code") || q.includes("developer")) return "💻";
  if (q.includes("internet") || q.includes("website") || q.includes("online")) return "🌐";
  if (q.includes("data") || q.includes("database") || q.includes("server")) return "🗄️";

  // Aviation
  if (q.includes("flight") || q.includes("pilot") || q.includes("aircraft") || q.includes("aviation")) return "✈️";
  if (q.includes("runway") || q.includes("takeoff") || q.includes("landing") || q.includes("tower")) return "🛫";

  // Hospitality & Tourism
  if (q.includes("hotel") || q.includes("guest") || q.includes("reserv") || q.includes("check-in")) return "🏨";
  if (q.includes("restaurant") || q.includes("menu") || q.includes("order") || q.includes("waiter")) return "🍽️";

  // Communication & Speaking
  if (q.includes("speak") || q.includes("talk") || q.includes("conversation") || q.includes("discuss")) return "🗣️";
  if (q.includes("listen") || q.includes("hear") || q.includes("audio") || q.includes("sound")) return "👂";
  if (q.includes("pronunciat") || q.includes("accent") || q.includes("stress") || q.includes("intonation")) return "🎤";
  if (q.includes("debate") || q.includes("argument") || q.includes("opinion")) return "💬";

  // Writing
  if (q.includes("essay") || q.includes("writing") || q.includes("compose") || q.includes("draft")) return "✍️";
  if (q.includes("report") || q.includes("academic") || q.includes("research")) return "🎓";

  // Social Media & News
  if (q.includes("social media") || q.includes("post") || q.includes("instagram") || q.includes("twitter")) return "📲";
  if (q.includes("news") || q.includes("headline") || q.includes("journal")) return "📰";

  // Kids & Fun Topics
  if (q.includes("color") || q.includes("colour")) return "🎨";
  if (q.includes("animal") || q.includes("dog") || q.includes("cat") || q.includes("bird")) return "🐾";
  if (q.includes("food") || q.includes("eat") || q.includes("fruit") || q.includes("vegetable")) return "🍎";
  if (q.includes("family") || q.includes("mother") || q.includes("father") || q.includes("sister") || q.includes("brother")) return "👨‍👩‍👧‍👦";
  if (q.includes("school") || q.includes("class") || q.includes("teacher") || q.includes("student")) return "🏫";
  if (q.includes("weather") || q.includes("rain") || q.includes("sun") || q.includes("snow")) return "🌤️";
  if (q.includes("time") || q.includes("clock") || q.includes("hour") || q.includes("morning")) return "⏰";
  if (q.includes("number") || q.includes("count") || q.includes("how many")) return "🔢";
  if (q.includes("house") || q.includes("room") || q.includes("home") || q.includes("kitchen")) return "🏠";
  if (q.includes("travel") || q.includes("trip") || q.includes("country") || q.includes("city")) return "🌍";
  if (q.includes("sport") || q.includes("play") || q.includes("game") || q.includes("ball")) return "⚽";
  if (q.includes("music") || q.includes("song") || q.includes("sing")) return "🎵";
  if (q.includes("book") || q.includes("read") || q.includes("story")) return "📖";
  if (q.includes("water") || q.includes("sea") || q.includes("swim") || q.includes("ocean")) return "🌊";
  if (q.includes("tree") || q.includes("flower") || q.includes("garden") || q.includes("nature")) return "🌿";
  if (q.includes("shop") || q.includes("buy") || q.includes("store") || q.includes("money")) return "🛒";
  if (q.includes("job") || q.includes("work") || q.includes("office")) return "💼";
  if (q.includes("doctor") || q.includes("health") || q.includes("hospital")) return "🏥";
  if (q.includes("car") || q.includes("bus") || q.includes("drive") || q.includes("transport")) return "🚗";
  if (q.includes("phone") || q.includes("call") || q.includes("computer")) return "📱";
  if (q.includes("friend") || q.includes("people") || q.includes("meet")) return "🤝";
  if (q.includes("happy") || q.includes("sad") || q.includes("feel") || q.includes("emotion")) return "😊";
  if (q.includes("cloth") || q.includes("wear") || q.includes("dress") || q.includes("shirt")) return "👕";
  if (q.includes("sky") || q.includes("star") || q.includes("moon") || q.includes("night")) return "🌙";

  // Fallback patterns
  if (q.includes("choose") || q.includes("select") || q.includes("pick")) return "👆";
  if (q.includes("true") || q.includes("false") || q.includes("correct")) return "✅";
  if (q.includes("match") || q.includes("pair") || q.includes("connect")) return "🔗";
  if (q.includes("complete") || q.includes("blank") || q.includes("missing")) return "📝";
  if (q.includes("translate") || q.includes("arabic") || q.includes("english")) return "🌐";
  if (q.includes("example") || q.includes("explain")) return "💡";
  if (q.includes("is") || q.includes("are") || q.includes("was") || q.includes("were")) return "💡";
  return "🤔";
}

function ExerciseSlide({ label, questions }: { label: string; questions: MCQItem[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const selectAnswer = (qi: number, oi: number) => {
    if (showResults) return;
    setAnswers((prev) => ({ ...prev, [qi]: oi }));
  };

  const score = questions.reduce(
    (acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0),
    0
  );
  const allAnswered = Object.keys(answers).length === questions.length;

  const reset = () => {
    setAnswers({});
    setShowResults(false);
  };

  return (
    <div className="space-y-4">
      {questions.map((q, qi) => (
        <div key={qi} className="rounded-xl border bg-card p-4 shadow-soft">
          <p className="text-sm font-semibold mb-3">
            <span className="mr-1.5">{getQuestionEmoji(q.question)}</span>
            <span className="text-primary mr-1.5">Q{qi + 1}.</span>
            {q.question}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi;
              const isCorrect = q.correct === oi;
              let style = "border bg-muted/30 hover:bg-muted/60";
              if (showResults && isCorrect) style = "border-emerald-500 bg-emerald-500/10 text-emerald-700";
              else if (showResults && selected && !isCorrect) style = "border-destructive bg-destructive/10 text-destructive";
              else if (selected) style = "border-primary bg-primary/10 text-primary";

              return (
                <button
                  key={oi}
                  onClick={() => selectAnswer(qi, oi)}
                  className={`rounded-lg px-3 py-2 text-sm text-left transition-all ${style}`}
                >
                  <span className="font-medium">{String.fromCharCode(65 + oi)}.</span> {opt}
                  {showResults && isCorrect && <CheckCircle2 className="inline h-3.5 w-3.5 ml-1 text-emerald-500" />}
                  {showResults && selected && !isCorrect && <XCircle className="inline h-3.5 w-3.5 ml-1 text-destructive" />}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between pt-2">
        {showResults ? (
          <>
            <p className="text-sm font-semibold">
              Score: <span className="text-primary">{score}/{questions.length}</span>
              {score === questions.length && " 🎉 Perfect!"}
            </p>
            <Button size="sm" variant="outline" onClick={reset} className="rounded-full text-xs gap-1.5">
              <RotateCcw className="h-3 w-3" /> Try Again
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            onClick={() => setShowResults(true)}
            disabled={!allAnswered}
            className="rounded-full text-xs font-semibold ml-auto"
          >
            Check Answers
          </Button>
        )}
      </div>
    </div>
  );
}

/* ═══════════ SUMMARY SLIDE ═══════════ */
function SummarySlide({ points }: { points: string[] }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="text-6xl mb-6"
      >
        🎉
      </motion.div>
      <h3 className="text-2xl font-bold font-display mb-6">Great Job!</h3>
      <div className="space-y-3 text-left max-w-sm">
        {points.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="flex items-center gap-3"
          >
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <p className="text-sm text-muted-foreground">{p}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════ INFO SLIDE ═══════════ */
function InfoSlide({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
      ))}
    </div>
  );
}

/* ═══════════ STORY TEXT SLIDE ═══════════ */
function StoryTextSlide({ text, moral }: { text: string; moral?: string }) {
  const { speak, speaking } = useTTS();
  const plainText = text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu, "");

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          size="sm"
          variant="outline"
          className="rounded-full gap-1.5 text-xs"
          onClick={() => speak(plainText, "en-US", 0.85)}
          disabled={speaking}
        >
          <Volume2 className="h-3.5 w-3.5" />
          {speaking ? "Reading..." : "Listen 🔊"}
        </Button>
      </div>
      <div className="bg-muted/30 rounded-xl p-5 text-base leading-relaxed border">
        {text}
      </div>
      {moral && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm font-medium text-center">
          💡 <strong>Moral:</strong> {moral}
        </div>
      )}
    </div>
  );
}

/* ═══════════ VIDEO SLIDE ═══════════ */
function VideoSlide({ youtubeId, sceneContext, culturalNote, movieTitle }: { youtubeId: string; sceneContext: string; culturalNote?: string; movieTitle: string }) {
  return (
    <div className="space-y-4">
      <div className="relative rounded-xl overflow-hidden border bg-black aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={movieTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      <div className="bg-muted/30 rounded-lg p-3 text-sm border">
        📝 <strong>Scene Context:</strong> {sceneContext}
      </div>
      {culturalNote && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm">
          🎬 <strong>Did you know?</strong> {culturalNote}
        </div>
      )}
    </div>
  );
}

/* ═══════════ EXPRESSIONS SLIDE ═══════════ */
function ExpressionsSlide({ items }: { items: { phrase: string; meaning: string; arabic: string; emoji: string }[] }) {
  const { speak } = useTTS();

  return (
    <div className="grid gap-3">
      {items.map((e) => (
        <div
          key={e.phrase}
          className="p-4 rounded-xl border bg-gradient-to-r from-primary/5 to-accent/5 cursor-pointer hover:from-primary/10 hover:to-accent/10 transition-colors"
          onClick={() => speak(e.phrase)}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">{e.emoji}</span>
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
  );
}

/* ═══════════ TRANSCRIPT SLIDE (Tap-to-Translate) ═══════════ */
function TranscriptSlide({ lines, vocabWords }: { lines: { time: string; text: string; translation: string }[]; vocabWords?: string[] }) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const { speak } = useTTS();

  const toggle = (i: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const revealAll = () => {
    if (showAll) {
      setRevealed(new Set());
      setShowAll(false);
    } else {
      setRevealed(new Set(lines.map((_, i) => i)));
      setShowAll(true);
    }
  };

  const highlightVocab = (text: string) => {
    if (!vocabWords || vocabWords.length === 0) return <>{text}</>;
    const regex = new RegExp(`\\b(${vocabWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) => {
          const isVocab = vocabWords.some(w => w.toLowerCase() === part.toLowerCase());
          return isVocab ? (
            <span key={i} className="font-semibold text-primary underline decoration-primary/30 decoration-2 underline-offset-2 cursor-help" title={`Vocabulary word: ${part}`}>
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          );
        })}
      </>
    );
  };

  return (
    <div className="space-y-3">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          👆 Tap each line to reveal Arabic translation
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={revealAll} className="rounded-full text-xs gap-1.5">
            {showAll ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            {showAll ? "Hide All" : "Show All"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full text-xs gap-1.5"
            onClick={() => {
              const fullText = lines.map(l => l.text).join('. ');
              speak(fullText, "en-US", 0.85);
            }}
          >
            <Volume2 className="h-3 w-3" /> Listen All
          </Button>
        </div>
      </div>

      {/* Transcript lines */}
      <div className="space-y-2">
        {lines.map((line, i) => {
          const isRevealed = revealed.has(i);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => toggle(i)}
              className={`rounded-xl border cursor-pointer transition-all duration-200 overflow-hidden group ${
                isRevealed
                  ? "bg-primary/5 border-primary/20 shadow-sm"
                  : "bg-card hover:bg-muted/40 hover:border-primary/10"
              }`}
            >
              <div className="flex items-start gap-3 p-3.5">
                {/* Timestamp */}
                <div className="shrink-0 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-mono font-bold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">
                    {line.time}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); speak(line.text); }}
                    className="h-7 w-7 rounded-full bg-muted/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10"
                  >
                    <Volume2 className="h-3 w-3 text-primary" />
                  </button>
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-relaxed">
                    🇬🇧 {highlightVocab(line.text)}
                  </p>

                  <AnimatePresence>
                    {isRevealed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-muted-foreground mt-2 pt-2 border-t border-dashed border-primary/15" dir="rtl">
                          🇸🇦 {line.translation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Reveal indicator */}
                <div className="shrink-0 mt-1">
                  {isRevealed ? (
                    <EyeOff className="h-3.5 w-3.5 text-primary/50" />
                  ) : (
                    <Eye className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors" />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      {vocabWords && vocabWords.length > 0 && (
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground/60 pt-2">
          <span className="font-semibold text-primary underline decoration-primary/30 decoration-2 underline-offset-2">Highlighted words</span>
          <span>= vocabulary from this lesson</span>
        </div>
      )}
    </div>
  );
}

/* ═══════════ DISCUSSION SLIDE ═══════════ */
function DiscussionSlide({ questions }: { questions: { question: string; modelAnswer: string; emoji: string }[] }) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="grid gap-3">
      {questions.map((q, i) => (
        <div key={i} className="rounded-xl border bg-card p-4 space-y-2">
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0">{q.emoji}</span>
            <p className="font-semibold text-sm leading-relaxed">{q.question}</p>
          </div>

          <button
            onClick={() => toggle(i)}
            className="flex items-center gap-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors ml-11"
          >
            {revealed.has(i) ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {revealed.has(i) ? "Hide Model Answer" : "Show Model Answer"}
          </button>

          {revealed.has(i) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="ml-11 rounded-lg bg-primary/5 border border-primary/10 p-3"
            >
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">💡 Model Answer: </span>
                {q.modelAnswer}
              </p>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════ SONG REWARD SLIDE ═══════════ */
function SongRewardSlide({ youtubeId, title, artist, message }: { youtubeId: string; title: string; artist: string; message: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = [
      'hsl(var(--primary))', 'hsl(var(--accent))', '#ec4899', '#a855f7', '#3b82f6', '#22c55e', '#f59e0b', '#ef4444'
    ];
    const shapes = ['circle', 'square', 'triangle'];
    const pieces: HTMLDivElement[] = [];

    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = Math.random() * 8 + 4;
      const left = Math.random() * 100;
      const delay = Math.random() * 1.5;
      const duration = Math.random() * 2 + 2;
      const rotation = Math.random() * 720 - 360;
      const drift = Math.random() * 80 - 40;

      piece.style.cssText = `
        position: absolute; top: -12px; left: ${left}%;
        width: ${size}px; height: ${size}px;
        background: ${color}; opacity: 0;
        border-radius: ${shape === 'circle' ? '50%' : shape === 'square' ? '2px' : '0'};
        ${shape === 'triangle' ? `background: transparent; width: 0; height: 0; border-left: ${size/2}px solid transparent; border-right: ${size/2}px solid transparent; border-bottom: ${size}px solid ${color};` : ''}
        pointer-events: none; z-index: 50;
        animation: confetti-fall ${duration}s ease-in ${delay}s forwards;
        --drift: ${drift}px; --rotation: ${rotation}deg;
      `;
      container.appendChild(piece);
      pieces.push(piece);
    }

    return () => { pieces.forEach(p => p.remove()); };
  }, []);

  return (
    <div ref={containerRef} className="space-y-4 text-center relative overflow-hidden">
      <style>{`
        @keyframes confetti-fall {
          0% { opacity: 1; transform: translateY(0) translateX(0) rotate(0deg); }
          100% { opacity: 0; transform: translateY(420px) translateX(var(--drift)) rotate(var(--rotation)); }
        }
      `}</style>
      <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 px-5 py-2 animate-scale-in">
        <span className="text-2xl">🎵</span>
        <span className="font-bold text-sm bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Song Reward
        </span>
        <span className="text-2xl">🎵</span>
      </div>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">{message}</p>
      <div className="relative rounded-xl overflow-hidden border bg-black aspect-video max-w-lg mx-auto shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0`}
          title={`${title} - ${artist}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      <div className="space-y-1">
        <p className="font-bold text-lg">{title}</p>
        <p className="text-sm text-muted-foreground">{artist}</p>
      </div>
      <p className="text-xs text-muted-foreground/60">🎧 Enjoy the music — you earned it!</p>
    </div>
  );
}
