import { Link, useParams } from "react-router-dom";
import { ChevronRight, ChevronLeft, BookOpen, ArrowRight, GraduationCap, MessageCircle, CheckCircle2, Sparkles, Lock, Clock, Award, Download, Brain, Mic2, Target, BookMarked, PenLine, Search, X, School } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { lessons } from "@/data/lessons";
import { FadeInUp, staggerContainer, staggerItem } from "@/components/AnimatedSection";
import { categories } from "@/data/course-categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useCourseProgress } from "@/hooks/useCourseProgress";

import readingImg from "@/assets/levels/reading.jpg";
import kidsImg from "@/assets/levels/kids.jpg";
import a1Img from "@/assets/levels/a1.jpg";
import a2Img from "@/assets/levels/a2.jpg";
import b1Img from "@/assets/levels/b1.jpg";
import b2Img from "@/assets/levels/b2.jpg";
import c1Img from "@/assets/levels/c1.jpg";
import c2Img from "@/assets/levels/c2.jpg";
import schoolEnglishImg from "@/assets/classroom-aerial.jpg";

type Level = { id: string; label: string; sublabel: string; lessons: number; description: string; color: string; image: string };

const introductory: Level = {
  id: "reading", label: "English Reading Course",
  sublabel: "Alphabet → Phonics → Sight Words → Short Sentences → Critical Reading",
  lessons: 20, description: "Build foundational reading skills from scratch",
  color: "from-rose-500 to-orange-500", image: readingImg,
};

const kidsLevel: Level = {
  id: "kids", label: "English for Kids",
  sublabel: "Colors → Animals → Family → Food → Numbers → Nature → Dreams",
  lessons: 20, description: "Fun, interactive lessons designed for young learners aged 5-10",
  color: "from-amber-400 to-pink-500", image: kidsImg,
};

const cefrLevels: Level[] = [
  { id: "a1", label: "A1", sublabel: "Beginner", lessons: 20, description: "Greetings, numbers, family, weather, hobbies, health, feelings", color: "from-emerald-400 to-emerald-600", image: a1Img },
  { id: "a2", label: "A2", sublabel: "Elementary", lessons: 20, description: "Daily routines, past tense, travel, restaurants, technology, environment", color: "from-teal-400 to-teal-600", image: a2Img },
  { id: "b1", label: "B1", sublabel: "Intermediate", lessons: 20, description: "Opinions, careers, media, health, education, social issues", color: "from-blue-400 to-blue-600", image: b1Img },
  { id: "b2", label: "B2", sublabel: "Upper-Intermediate", lessons: 20, description: "Passive voice, globalisation, science, art, ethics, digital society", color: "from-indigo-400 to-indigo-600", image: b2Img },
  { id: "c1", label: "C1", sublabel: "Advanced", lessons: 20, description: "Philosophy, sociolinguistics, environmental policy, psychology, academic writing", color: "from-violet-400 to-violet-600", image: c1Img },
  { id: "c2", label: "C2", sublabel: "Proficiency", lessons: 20, description: "Rhetoric, translation, corpus linguistics, discourse analysis, language & identity", color: "from-purple-400 to-purple-600", image: c2Img },
];

const egyptianSchoolTracks = [
  {
    title: "Public School English",
    levelId: "egyptian-public",
    audience: "Egyptian Ministry curriculum support",
    description: "Step-by-step English support for government school students with Arabic-friendly explanations, workbook practice, and exam revision.",
    books: ["Primary English Book", "Preparatory English Book", "Secondary Exam Book"],
    ministryBooks: [
      { stage: "Primary", grades: "Grade 4 → Grade 6", books: "Connect / Ministry English Student Book + Workbook" },
      { stage: "Preparatory", grades: "Prep 1 → Prep 3", books: "New Hello! / Ministry English Student Book + Workbook" },
      { stage: "Secondary", grades: "Secondary 1 → Secondary 3", books: "Ministry English curriculum + exam revision book" },
    ],
    skills: ["Unit vocabulary", "Grammar drills", "Reading passages", "Model answers"],
  },
  {
    title: "National School English",
    levelId: "egyptian-national",
    audience: "National curriculum learners",
    description: "Stronger reading, writing, grammar, and school exam preparation for students who need confident classroom performance.",
    books: ["National Reader", "Grammar Builder", "Writing Portfolio"],
    ministryBooks: [
      { stage: "Primary", grades: "Grade 4 → Grade 6", books: "Connect Plus / school English book + workbook practice" },
      { stage: "Preparatory", grades: "Prep 1 → Prep 3", books: "National English reader + Ministry-aligned grammar book" },
      { stage: "Secondary", grades: "Secondary 1 → Secondary 3", books: "National school English + Thanaweya-style writing and comprehension" },
    ],
    skills: ["Comprehension", "Paragraph writing", "School projects", "Term revision"],
  },
  {
    title: "International School English",
    levelId: "egyptian-international",
    audience: "British, American, IB-style support",
    description: "Advanced English for international-school students with literature, academic writing, presentations, and critical thinking.",
    books: ["Literature Companion", "Academic Writing Book", "Presentation Workbook"],
    ministryBooks: [
      { stage: "Lower School", grades: "Grade 4 → Grade 6", books: "School reader + vocabulary workbook mapped to Egyptian grade skills" },
      { stage: "Middle School", grades: "Grade 7 → Grade 9", books: "Literature companion + grammar and writing workbook" },
      { stage: "High School", grades: "Grade 10 → Grade 12", books: "Academic writing, presentation, and exam-prep book" },
    ],
    skills: ["Literary analysis", "Essay structure", "Research language", "Speaking tasks"],
  },
];

const publicSchoolFeatureSets = [
  {
    title: "Lessons & Workbook",
    subtitle: "Book-by-book classroom practice",
    icon: BookMarked,
    items: [
      "Unit vocabulary and Arabic-supported meaning checks",
      "Workbook grammar drills after every reading skill",
      "Reading passages with comprehension and model answers",
      "Paragraph, email, dialogue, and story-writing practice",
    ],
  },
  {
    title: "Exams & Revision",
    subtitle: "Term-ready assessment practice",
    icon: Target,
    items: [
      "Monthly quizzes based on ministry-style question formats",
      "Term 1 and Term 2 revision packs",
      "Reading, grammar, writing, and vocabulary mock exams",
      "Model-answer correction points for full-mark responses",
    ],
  },
  {
    title: "Teacher Tools",
    subtitle: "Classroom delivery support",
    icon: GraduationCap,
    items: [
      "Weekly lesson-plan checklist for the selected stage",
      "Homework review flow with answer-discussion prompts",
      "Attendance, participation, and weak-skill follow-up ideas",
      "Printable yearly reading/workbook plan PDF",
    ],
  },
  {
    title: "Student Tools",
    subtitle: "Home study and parent follow-up",
    icon: Brain,
    items: [
      "Self-study checklist for each book unit",
      "Vocabulary notebook, spelling, and reading-log routine",
      "Progress tracking through lesson completion",
      "Practice downloads for revision before school exams",
    ],
  },
];

const publicStageCurriculum = {
  Primary: [
    "Connect themes: identity, school life, family, community, food, nature, and daily routines",
    "Phonics, spelling, picture-supported reading, short writing, and workbook completion",
    "Simple grammar: present simple, can/can't, there is/are, prepositions, and question words",
  ],
  Preparatory: [
    "New Hello-style units: reading texts, dialogues, vocabulary sets, grammar presentation, and workbook drills",
    "Skills: comprehension, sentence transformation, paragraph writing, listening tasks, and speaking functions",
    "Exam focus: vocabulary choice, grammar accuracy, reading questions, and guided writing",
  ],
  Secondary: [
    "Secondary English units: reading passages, language notes, critical vocabulary, translation-style support, and writing",
    "Skills: inference, essay/paragraph development, summary ideas, grammar review, and exam timing",
    "Exam focus: ministry-style comprehension, language functions, writing task planning, and model answers",
  ],
};

function LevelLessons({ levelId, levelLabel }: { levelId: string; levelLabel: string }) {
  const lessonKeys = Object.keys(lessons).filter((k) => k.startsWith(`${levelId}-`)).sort((a, b) => {
    const aNum = parseInt(a.split("-").pop() || "0");
    const bNum = parseInt(b.split("-").pop() || "0");
    return aNum - bNum;
  });

  // Fetch completed lessons for prerequisite locking & certificate
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const schoolTrack = egyptianSchoolTracks.find((track) => track.levelId === levelId);
  const [selectedMinistryStage, setSelectedMinistryStage] = useState("");
  const selectedMinistryBook = schoolTrack?.ministryBooks.find((book) => book.stage === selectedMinistryStage) ?? schoolTrack?.ministryBooks[0];
  const selectedPublicStageDetails = levelId === "egyptian-public" && selectedMinistryBook
    ? publicStageCurriculum[selectedMinistryBook.stage as keyof typeof publicStageCurriculum]
    : undefined;

  useEffect(() => {
    if (!user) return;
    supabase
      .from("lesson_progress")
      .select("lesson_number")
      .eq("user_id", user.id)
      .eq("level_id", levelId)
      .eq("completed", true)
      .then(({ data }) => {
        if (data) setCompletedLessons(new Set(data.map((r) => r.lesson_number)));
      });
  }, [user, levelId]);

  useEffect(() => {
    setSelectedMinistryStage(schoolTrack?.ministryBooks[0]?.stage ?? "");
  }, [schoolTrack?.levelId]);

  const allCompleted = lessonKeys.length > 0 && completedLessons.size >= lessonKeys.length;

  const handleDownloadCertificate = async () => {
    const { generateCourseCertificate } = await import("@/lib/generate-course-certificate");
    const profile = user ? (await supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle()).data : null;
    generateCourseCertificate({
      courseName: levelLabel,
      studentName: profile?.full_name || "Student",
      lessonsCompleted: lessonKeys.length,
      totalLessons: lessonKeys.length,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    });
  };

  const handleDownloadMinistryPlan = async () => {
    if (!schoolTrack || !selectedMinistryBook) return;
    const { generateMinistryWorkbookPlan } = await import("@/lib/generate-ministry-workbook-plan");
    generateMinistryWorkbookPlan({
      schoolSystem: schoolTrack.title,
      courseName: levelLabel,
      stage: selectedMinistryBook.stage,
      grades: selectedMinistryBook.grades,
      bookSeries: selectedMinistryBook.books,
      lessons: lessonKeys.map((key) => {
        const lesson = lessons[key];
        return {
          lessonNumber: lesson.lessonNumber,
          title: lesson.title,
          description: lesson.description,
        };
      }),
    });
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:py-10">
      <Link to="/courses" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-medium group">
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" /> Back to Courses
      </Link>
      <FadeInUp>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              <BookOpen className="h-3.5 w-3.5" />
              {lessonKeys.length} Lessons
            </div>
            {allCompleted && (
              <Button size="sm" variant="outline" onClick={handleDownloadCertificate} className="rounded-full gap-1.5 text-xs h-7 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 dark:hover:bg-emerald-950/20 dark:hover:border-emerald-700">
                <Download className="h-3 w-3" /> Download Certificate
              </Button>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">{levelLabel}</h1>
          {schoolTrack && selectedMinistryBook && (
            <div className="mt-5 rounded-2xl border bg-card p-4 shadow-soft">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">Ministry-style yearly plan</p>
                  <label htmlFor="ministry-stage" className="mt-2 block text-sm font-semibold text-foreground">
                    Select school stage
                  </label>
                  <select
                    id="ministry-stage"
                    value={selectedMinistryStage}
                    onChange={(event) => setSelectedMinistryStage(event.target.value)}
                    className="mt-2 h-10 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring"
                  >
                    {schoolTrack.ministryBooks.map((book) => (
                      <option key={book.stage} value={book.stage}>
                        {book.stage} — {book.grades}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{selectedMinistryBook.books}</p>
                </div>
                <Button onClick={handleDownloadMinistryPlan} className="shrink-0 rounded-full font-semibold">
                  <Download className="h-4 w-4" /> Download PDF Plan
                </Button>
              </div>
            </div>
          )}
          {selectedPublicStageDetails && (
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border bg-muted/30 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Actual public-school curriculum match</p>
                <div className="mt-3 grid gap-3">
                  {selectedPublicStageDetails.map((detail) => (
                    <div key={detail} className="flex items-start gap-3 rounded-xl bg-card p-3 shadow-soft">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <p className="text-sm leading-relaxed text-muted-foreground">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {publicSchoolFeatureSets.map((feature) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={feature.title} className="rounded-2xl border bg-card p-4 shadow-soft">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <FeatureIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="font-display text-base font-bold text-foreground">{feature.title}</h2>
                          <p className="text-xs text-muted-foreground">{feature.subtitle}</p>
                        </div>
                      </div>
                      <ul className="mt-4 space-y-2">
                        {feature.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {allCompleted && (
            <div className="mt-2 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
              <Award className="h-4 w-4" /> Course completed! 🎉
            </div>
          )}
        </div>
      </FadeInUp>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid gap-3"
      >
        {lessonKeys.map((key, index) => {
          const l = lessons[key];
          const difficulty = l.lessonNumber <= 7 ? "Easy" : l.lessonNumber <= 14 ? "Medium" : "Hard";
          const estTime = l.lessonNumber <= 7 ? "15 min" : l.lessonNumber <= 14 ? "20 min" : "25 min";
          const diffColor = l.lessonNumber <= 7 
            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" 
            : l.lessonNumber <= 14 
            ? "bg-amber-500/15 text-amber-700 dark:text-amber-400" 
            : "bg-red-500/15 text-red-700 dark:text-red-400";
          const isCompleted = completedLessons.has(l.lessonNumber);
          const isLocked = false; // All lessons are accessible
          const isMilestone = l.lessonNumber === 5 || l.lessonNumber === 10 || l.lessonNumber === 15;

          return (
            <motion.div key={key} variants={staggerItem}>
              {isMilestone && (
                <div className="flex items-center gap-2 mb-2 mt-4 px-1">
                  <div className="h-px flex-1 bg-primary/20" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">📝 Checkpoint — Lesson {l.lessonNumber}</span>
                  <div className="h-px flex-1 bg-primary/20" />
                </div>
              )}
              {isLocked ? (
                <div className="flex items-center justify-between rounded-xl border bg-muted/50 p-4 opacity-60 cursor-not-allowed">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-sm font-bold text-muted-foreground shrink-0">
                      <Lock className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm text-muted-foreground">{l.title}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${diffColor}`}>
                          {difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">Complete previous lesson to unlock</p>
                    </div>
                  </div>
                  <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                </div>
              ) : (
                <Link
                  to={`/courses/${l.levelId}/${l.lessonNumber}`}
                  className={`group flex items-center justify-between rounded-xl border p-4 shadow-soft hover:shadow-card hover:border-primary/20 transition-all duration-300 ${isCompleted ? 'bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900' : 'bg-card'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold shrink-0 ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-gradient-to-br from-primary/15 to-primary/5 text-primary'}`}>
                      {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : l.lessonNumber}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{l.title}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${diffColor}`}>
                          {difficulty}
                        </span>
                        <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground">
                          <Clock className="h-2.5 w-2.5" /> {estTime}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{l.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function Courses() {
  const { levelId } = useParams();
  const [courseSearch, setCourseSearch] = useState("");
  const [showEgyptianSchoolTracks, setShowEgyptianSchoolTracks] = useState(false);

  // Compute all level IDs and their lesson counts for progress tracking
  const allLevelIds = useMemo(() => {
    const ids = [introductory.id, kidsLevel.id, ...cefrLevels.map(l => l.id), ...egyptianSchoolTracks.map((track) => track.levelId)];
    return ids;
  }, []);

  const lessonCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allLevelIds.forEach(id => {
      counts[id] = Object.keys(lessons).filter(k => k.startsWith(`${id}-`)).length;
    });
    return counts;
  }, [allLevelIds]);

  const { progress } = useCourseProgress(allLevelIds, lessonCounts);

  const normalizedSearch = courseSearch.trim().toLowerCase();
  const matchesSearch = (parts: Array<string | string[] | undefined>) => {
    if (!normalizedSearch) return true;
    return parts
      .flatMap((part) => Array.isArray(part) ? part : [part])
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch);
  };

  const filteredCefrLevels = useMemo(
    () => cefrLevels.filter((lvl) => matchesSearch([lvl.label, lvl.sublabel, lvl.description, `${lvl.lessons} lessons`, "CEFR Cambridge level grammar vocabulary speaking writing"])),
    [normalizedSearch]
  );

  const filteredCategories = useMemo(
    () => categories.filter((cat) => matchesSearch([
      cat.title,
      cat.description,
      cat.courses.map((course) => `${course.name} ${course.description} ${(course.topics ?? []).join(" ")}`),
    ])),
    [normalizedSearch]
  );

  const filteredEgyptianSchoolTracks = useMemo(
    () => egyptianSchoolTracks.filter((track) => matchesSearch([
      "Egyptian schools English public school national school international school interactive books ministry curriculum",
      track.title,
      track.audience,
      track.description,
      track.books,
      track.ministryBooks.map((book) => `${book.stage} ${book.grades} ${book.books}`),
      track.skills,
    ])),
    [normalizedSearch]
  );

  const showReadingCourse = matchesSearch([introductory.label, introductory.sublabel, introductory.description, "alphabet phonics reading beginner"]);
  const showKidsCourse = matchesSearch([kidsLevel.label, kidsLevel.sublabel, kidsLevel.description, "children games young learners"]);
  const resultCount = (showReadingCourse ? 1 : 0) + (showKidsCourse ? 1 : 0) + filteredEgyptianSchoolTracks.length + filteredCefrLevels.length + filteredCategories.reduce((total, cat) => total + cat.courses.length, 0);

  // If a level is selected, show its lessons
  if (levelId && !window.location.pathname.match(/\/courses\/[^/]+\/\d+/)) {
    const allLevels = [introductory, kidsLevel, ...cefrLevels];
    const level = allLevels.find((l) => l.id === levelId);
    if (level) return <LevelLessons levelId={level.id} levelLabel={`${level.label} — ${level.sublabel || ""}`} />;
    const specializedLevelLabels: Record<string, string> = {
      speaking: "Speaking & Conversation",
      listening: "Listening Skills",
      pronunciation: "Pronunciation & Accent",
      fluency: "Fluency Development",
      writing: "Writing Skills",
      "grammar-course": "Grammar & Structure",
      "exam-prep": "Exam Preparation",
      professional: "Professional English",
      music: "English through Music",
      news: "English through News",
      legal: "Legal English",
      hospitality: "Hospitality English",
      conversation: "Conversation Practice",
      "social-media": "English for Social Media",
      healthcare: "English for Healthcare",
      finance: "English for Finance",
      aviation: "English for Aviation",
      "reading-comp": "Reading Comprehension",
      "vocab-build": "Vocabulary Building",
      idioms: "Idioms & Expressions",
      phrasal: "Phrasal Verbs Course",
      "real-life": "Real-life Conversation Practice",
      slang: "Slang & Everyday English",
      travel: "English for Travel",
      teens: "English for Teenagers",
      medical: "Medical English",
      engineering: "Engineering English",
      safety: "Safety English — Minimum B1",
      "it-english": "IT English",
      "web-development": "Web Development English — Minimum B1",
      "egyptian-public": "Egyptian Public School English",
      "egyptian-national": "Egyptian National School English",
      "egyptian-international": "Egyptian International School English",
    };
    if (specializedLevelLabels[levelId]) {
      return <LevelLessons levelId={levelId} levelLabel={specializedLevelLabels[levelId]} />;
    }
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero Banner */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              A1 → C2 Complete Curriculum
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display max-w-3xl mx-auto leading-tight">
              Our English{" "}
              <span className="text-primary">Courses</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground text-sm md:text-base">
              Choose your level and start learning — from complete beginner to mastery.
            </p>

            <div className="mx-auto mt-6 max-w-2xl rounded-2xl border bg-card/95 p-3 shadow-soft backdrop-blur">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={courseSearch}
                  onChange={(event) => setCourseSearch(event.target.value)}
                  placeholder="Search courses, skills, exams, levels, jobs..."
                  className="h-12 rounded-xl pl-10 pr-10 text-base"
                  aria-label="Search courses"
                />
                {courseSearch && (
                  <button
                    type="button"
                    onClick={() => setCourseSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Clear course search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                <span>{courseSearch ? `${resultCount} matching results` : "Try:"}</span>
                {["Egyptian Schools", "Public School", "National", "International", "IELTS", "Kids"].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setCourseSearch(term)}
                    className="rounded-full bg-muted px-2.5 py-1 font-medium transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Level Jump */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-2 mt-6"
            >
              <span className="text-xs text-muted-foreground mr-1">Jump to:</span>
              {cefrLevels.map((lvl) => (
                <Link
                  key={lvl.id}
                  to={`/courses/${lvl.id}`}
                  className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${lvl.color} px-3 py-1 text-xs font-bold text-white shadow-sm hover:shadow-md hover:scale-105 transition-all`}
                >
                  {lvl.label}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ EGYPTIAN SCHOOL ENGLISH ═══ */}
      {filteredEgyptianSchoolTracks.length > 0 && (
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <FadeInUp>
              <button
                type="button"
                onClick={() => setShowEgyptianSchoolTracks((current) => !current)}
                className="group mb-6 block w-full overflow-hidden rounded-2xl border bg-card text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card"
              >
                <div className="relative h-56 md:h-72">
                  <img
                    src={schoolEnglishImg}
                    alt="Egyptian school students learning English with interactive books"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur">
                      <School className="h-3.5 w-3.5" />
                      Egyptian Schools English
                    </div>
                    <h2 className="max-w-3xl font-display text-2xl font-bold text-background md:text-4xl">
                      Interactive Books for Public, National, and International Schools
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-background/85 md:text-base">
                      School-by-school English lessons with book practice, revision, and exam support.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-sm">
                      {showEgyptianSchoolTracks ? "Hide school systems" : "Choose your school system"}
                      <ArrowRight className={`h-4 w-4 transition-transform ${showEgyptianSchoolTracks ? "rotate-90" : "group-hover:translate-x-1"}`} />
                    </div>
                  </div>
                </div>
              </button>
            </FadeInUp>

            {showEgyptianSchoolTracks && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="grid gap-5 lg:grid-cols-3"
              >
                {filteredEgyptianSchoolTracks.map((track) => (
                  <motion.div key={track.title} variants={staggerItem}>
                    <Link
                      to={`/courses/${track.levelId}`}
                      className="group block h-full rounded-2xl border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card"
                    >
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">{track.title}</h3>
                          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">{track.audience}</p>
                        </div>
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <BookMarked className="h-5 w-5" />
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{track.description}</p>
                      <div className="mt-5 space-y-3">
                        {track.ministryBooks.map((book) => (
                          <div key={`${track.levelId}-${book.stage}`} className="rounded-xl border bg-muted/40 p-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                                {book.stage}
                              </span>
                              <span className="text-xs font-semibold text-foreground">{book.grades}</span>
                            </div>
                            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{book.books}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 flex items-center justify-between rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-sm">
                        Open full {lessonCounts[track.levelId] || 12}-lesson course
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* ═══ MAIN CEFR LEVELS ═══ */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Cambridge-Aligned Curriculum</p>
            </div>
            <h2 className="text-center text-2xl md:text-3xl font-bold font-display mb-3">
              Choose Your Level
            </h2>
            <p className="text-center text-muted-foreground max-w-lg mx-auto mb-10">
              Start from the Reading Course or pick your CEFR level. Each level has 15 interactive lessons.
            </p>
          </FadeInUp>

          {/* Reading Course - Featured */}
          {showReadingCourse && (
            <FadeInUp delay={0.05}>
              <Link
                to="/courses/reading"
                className="group block mb-8 rounded-2xl border overflow-hidden bg-card shadow-soft hover:shadow-card hover:border-primary/30 transition-all duration-300"
              >
              <div className="flex flex-col sm:flex-row">
                <div className="relative h-44 sm:h-auto sm:w-72 shrink-0 overflow-hidden">
                  <img src={introductory.image} alt={introductory.label} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 sm:bg-gradient-to-l" />
                  <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground uppercase tracking-wider">
                    Start Here
                  </span>
                </div>
                <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                  <h3 className="font-bold font-display text-xl group-hover:text-primary transition-colors">
                    {introductory.label}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{introductory.sublabel}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">{introductory.lessons} lessons</span>
                    <span className="text-xs font-semibold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Begin <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                  {progress[introductory.id] && progress[introductory.id].completed > 0 && (
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>{progress[introductory.id].completed}/{progress[introductory.id].total} lessons</span>
                        <span>{progress[introductory.id].percentage}%</span>
                      </div>
                      <Progress value={progress[introductory.id].percentage} className="h-1.5" />
                    </div>
                  )}
                </div>
              </div>
              </Link>
            </FadeInUp>
          )}

          {/* Kids Course - Featured */}
          {showKidsCourse && (
            <FadeInUp delay={0.1}>
              <Link
                to="/courses/kids"
                className="group block mb-8 rounded-2xl border overflow-hidden bg-card shadow-soft hover:shadow-card hover:border-primary/30 transition-all duration-300"
              >
              <div className="flex flex-col sm:flex-row">
                <div className="relative h-44 sm:h-auto sm:w-72 shrink-0 overflow-hidden">
                  <img src={kidsLevel.image} alt={kidsLevel.label} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 sm:bg-gradient-to-l" />
                  <span className="absolute top-3 left-3 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                    🧒 For Kids
                  </span>
                </div>
                <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                  <h3 className="font-bold font-display text-xl group-hover:text-primary transition-colors">
                    {kidsLevel.label}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{kidsLevel.sublabel}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-600">{kidsLevel.lessons} lessons</span>
                    <span className="text-xs font-semibold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Begin <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                  {progress[kidsLevel.id] && progress[kidsLevel.id].completed > 0 && (
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>{progress[kidsLevel.id].completed}/{progress[kidsLevel.id].total} lessons</span>
                        <span>{progress[kidsLevel.id].percentage}%</span>
                      </div>
                      <Progress value={progress[kidsLevel.id].percentage} className="h-1.5" />
                    </div>
                  )}
                </div>
              </div>
              </Link>
            </FadeInUp>
          )}

          {/* CEFR Level Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCefrLevels.map((lvl, idx) => (
              <motion.div key={lvl.id} variants={staggerItem}>
                <Link
                  to={`/courses/${lvl.id}`}
                  className="group relative block rounded-2xl border bg-card shadow-soft hover:shadow-elevated hover:border-primary/25 hover:-translate-y-1.5 transition-all duration-300 h-full overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img src={lvl.image} alt={`${lvl.label} ${lvl.sublabel}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${lvl.color} px-3.5 py-1.5 shadow-lg ring-1 ring-white/20`}>
                        <span className="text-sm font-bold text-white font-display">{lvl.label}</span>
                        <span className="text-[11px] text-white/90 font-medium">{lvl.sublabel}</span>
                      </div>
                    </div>
                    <span className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-foreground shadow-sm">
                      {lvl.lessons} lessons
                    </span>
                    {/* Decorative corner accent */}
                    <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${lvl.color} opacity-80`} />
                  </div>
                  {/* Content */}
                  <div className="p-4 pb-5">
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {lvl.description}
                    </p>
                    {progress[lvl.id] && progress[lvl.id].completed > 0 ? (
                      <div className="mt-3 space-y-1.5">
                        <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
                          <span>{progress[lvl.id].completed}/{progress[lvl.id].total} lessons</span>
                          <span className="text-primary font-bold">{progress[lvl.id].percentage}%</span>
                        </div>
                        <Progress value={progress[lvl.id].percentage} className="h-1.5" />
                      </div>
                    ) : (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:gap-2.5 transition-all">
                          Start learning <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ LEARNING TOOLS ═══ */}
      <section className="border-t py-10 md:py-14">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Practice & Review</p>
            </div>
            <h2 className="text-center text-2xl md:text-3xl font-bold font-display mb-3">
              Learning Tools
            </h2>
            <p className="text-center text-muted-foreground max-w-lg mx-auto mb-8">
              Supercharge your learning with AI tutoring, vocabulary drills, quizzes, and more.
            </p>
          </FadeInUp>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
          >
            {[
              { icon: Brain, label: "AI Tutor", to: "/ai-tutor", emoji: "🤖", color: "from-violet-500/15 to-violet-500/5", iconColor: "text-violet-600 dark:text-violet-400" },
              { icon: BookMarked, label: "Dictionary", to: "/dictionary", emoji: "📖", color: "from-blue-500/15 to-blue-500/5", iconColor: "text-blue-600 dark:text-blue-400" },
              { icon: Target, label: "Vocab Quiz", to: "/vocab-quiz", emoji: "🎯", color: "from-purple-500/15 to-purple-500/5", iconColor: "text-purple-600 dark:text-purple-400" },
              { icon: BookOpen, label: "Flashcards", to: "/flashcards", emoji: "🃏", color: "from-emerald-500/15 to-emerald-500/5", iconColor: "text-emerald-600 dark:text-emerald-400" },
              { icon: Mic2, label: "Speaking", to: "/practice", emoji: "🎙️", color: "from-rose-500/15 to-rose-500/5", iconColor: "text-rose-600 dark:text-rose-400" },
              { icon: PenLine, label: "Idioms", to: "/idioms", emoji: "🗣️", color: "from-amber-500/15 to-amber-500/5", iconColor: "text-amber-600 dark:text-amber-400" },
            ].map((tool, i) => (
              <motion.div key={tool.to} variants={staggerItem}>
                <Link
                  to={tool.to}
                  className={`group flex flex-col items-center gap-2 rounded-2xl border bg-gradient-to-br ${tool.color} p-5 shadow-soft hover:shadow-card hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 h-full`}
                >
                  <div className={`h-11 w-11 rounded-xl bg-background/80 flex items-center justify-center ${tool.iconColor} group-hover:scale-110 transition-transform`}>
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-center">{tool.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ COURSE CATEGORIES ═══ */}
      <section className="border-t bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="flex items-center justify-center gap-2 mb-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Browse by Category</p>
            </div>
            <h2 className="text-center text-2xl md:text-3xl font-bold font-display mb-3">
              Specialized Courses
            </h2>
            <p className="text-center text-muted-foreground max-w-lg mx-auto mb-10">
              Beyond the core curriculum — explore courses for specific skills, exams, and goals.
            </p>
          </FadeInUp>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCategories.map((cat) => (
              <motion.div key={cat.title} variants={staggerItem}>
                <Link
                  to={`/courses/category/${cat.slug}`}
                  className="group relative block rounded-2xl border bg-card shadow-soft transition-all hover:shadow-card hover:border-primary/30 hover:-translate-y-1.5 duration-300 overflow-hidden h-full"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm shadow-sm">
                        <cat.icon className="h-4 w-4 text-foreground" />
                      </div>
                      <span className="text-sm font-bold text-white font-display drop-shadow-sm">{cat.title}</span>
                    </div>
                    <span className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-semibold text-foreground shadow-sm">
                      {cat.courses.length} courses
                    </span>
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">{cat.description}</p>
                    <ul className="space-y-1.5">
                      {cat.courses.slice(0, 3).map((course) => (
                        <li key={course.name} className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors">
                          <CheckCircle2 className="h-3 w-3 text-primary/60 shrink-0" />
                          {course.name}
                        </li>
                      ))}
                      {cat.courses.length > 3 && (
                        <li className="text-[11px] text-primary font-semibold">+{cat.courses.length - 3} more</li>
                      )}
                    </ul>
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore courses <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {courseSearch && resultCount === 0 && (
            <div className="mx-auto mt-8 max-w-md rounded-2xl border bg-card p-6 text-center shadow-soft">
              <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
              <h3 className="font-semibold font-display">No courses found</h3>
              <p className="mt-1 text-sm text-muted-foreground">Try a broader search like speaking, writing, exam, kids, B1, or business.</p>
              <Button variant="secondary" className="mt-4 rounded-full" onClick={() => setCourseSearch("")}>Show all courses</Button>
            </div>
          )}

          {/* WhatsApp CTA */}
          <FadeInUp delay={0.2}>
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground mb-4">Interested in any course? Contact us to get started!</p>
              <a href="https://wa.me/201234567890" target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full px-8 font-semibold font-display">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Inquire on WhatsApp
                </Button>
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
