import { Link, useParams } from "react-router-dom";
import { ChevronRight, ChevronLeft, BookOpen, ArrowRight, GraduationCap, MessageCircle, CheckCircle2, Sparkles, Lock, Clock, Award, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { lessons } from "@/data/lessons";
import { FadeInUp, staggerContainer, staggerItem } from "@/components/AnimatedSection";
import { categories } from "@/data/course-categories";
import { Button } from "@/components/ui/button";
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


function LevelLessons({ levelId, levelLabel }: { levelId: string; levelLabel: string }) {
  const lessonKeys = Object.keys(lessons).filter((k) => k.startsWith(`${levelId}-`)).sort((a, b) => {
    const aNum = parseInt(a.split("-").pop() || "0");
    const bNum = parseInt(b.split("-").pop() || "0");
    return aNum - bNum;
  });

  // Fetch completed lessons for prerequisite locking & certificate
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

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

  // Compute all level IDs and their lesson counts for progress tracking
  const allLevelIds = useMemo(() => {
    const ids = [introductory.id, kidsLevel.id, ...cefrLevels.map(l => l.id)];
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
      "it-english": "IT English",
    };
    if (specializedLevelLabels[levelId]) {
      return <LevelLessons levelId={levelId} levelLabel={specializedLevelLabels[levelId]} />;
    }
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero Banner */}
      <section className="relative py-16 md:py-20 overflow-hidden">
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
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-base md:text-lg">
              Choose your level and start learning — from complete beginner to mastery.
            </p>
          </motion.div>
        </div>
      </section>

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

          {/* Kids Course - Featured */}
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

          {/* CEFR Level Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {cefrLevels.map((lvl, idx) => (
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
            {categories.map((cat) => (
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
