import { Link, useParams } from "react-router-dom";
import { ChevronLeft, MessageCircle, CheckCircle2, PlayCircle, ArrowRight, BookOpen, Headphones, PenLine, Mic2, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import { FadeInUp, staggerContainer, staggerItem } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { categories } from "@/data/course-categories";
import { getCourseImage } from "@/data/course-images";
import { lessons } from "@/data/lessons";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { useMemo, useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Map course names to lesson level IDs
const courseLevelMap: Record<string, string> = {
  // Communication
  "Speaking & Conversation Practice": "speaking",
  "Listening Skills": "listening",
  "Pronunciation & Accent Training": "pronunciation",
  "Fluency Development": "fluency",
  // Writing
  "English Writing Basics": "writing",
  "Academic Writing": "writing",
  "Creative Writing": "writing",
  "Business Writing": "writing",
  "Email Writing": "writing",
  // Grammar
  "English Grammar (Basic → Advanced)": "grammar-course",
  "Tenses Mastery": "grammar-course",
  "Sentence Structure": "grammar-course",
  // Exam Prep (all map to same level)
  "📖 Reading Skills": "exam-prep",
  "🎧 Listening Skills": "exam-prep",
  "✍️ Writing Skills": "exam-prep",
  "🗣️ Speaking Skills": "exam-prep",
  "📋 Exam Overview & Strategies": "exam-prep",
  // Professional
  "Business English": "professional",
  "English for Interviews": "professional",
  "Workplace Communication": "professional",
  "Presentation Skills": "professional",
  // Core
  "General English (A1–C2)": "a1",
  "English for Beginners": "reading",
  "Intensive English Course": "a2",
  "Intermediate English": "b1",
  "Advanced English": "c1",
  // Reading & Vocabulary
  "Reading Comprehension": "reading-comp",
  "Vocabulary Building": "vocab-build",
  "Idioms & Expressions": "idioms",
  "Phrasal Verbs Course": "phrasal",
  // Interactive
  "English through Movies & Series": "movies",
  "English through Stories": "stories",
  "Real-life Conversation Practice": "real-life",
  "Slang & Everyday English": "slang",
  // Specialized
  "English for Travel": "travel",
  "English for Kids": "kids",
  "English for Teenagers": "teens",
  "Medical English": "medical",
  "Engineering English": "engineering",
  "Safety English": "safety",
  "IT English": "it-english",
  "Web Development English": "web-development",
  "ESP (Specific Purposes)": "professional",
  // New courses
  "English through Music": "music",
  "English through News": "news",
  "Legal English": "legal",
  "Hospitality English": "hospitality",
  "Conversation Practice": "conversation",
  "English for Social Media": "social-media",
  "English for Healthcare": "healthcare",
  "English for Finance": "finance",
  "English for Aviation": "aviation",
};

function getCourseHasLessons(courseName: string): boolean {
  const levelId = courseLevelMap[courseName];
  if (!levelId) return false;
  return Object.keys(lessons).some((k) => k.startsWith(`${levelId}-`));
}

function getCourseLessonCount(courseName: string): number {
  const levelId = courseLevelMap[courseName];
  if (!levelId) return 0;
  return Object.keys(lessons).filter((k) => k.startsWith(`${levelId}-`)).length;
}


const EXAM_SKILLS = [
  {
    skill: "Reading",
    icon: BookOpen,
    color: "from-blue-500/15 to-blue-500/5",
    iconColor: "text-blue-600 dark:text-blue-400",
    description: "Skimming, scanning, inference, and timed reading passages",
    keywords: ["reading", "skim", "scan", "passage", "comprehension"],
    exams: ["IELTS Academic & General", "TOEFL iBT", "Cambridge FCE/CAE", "SAT"],
  },
  {
    skill: "Listening",
    icon: Headphones,
    color: "from-violet-500/15 to-violet-500/5",
    iconColor: "text-violet-600 dark:text-violet-400",
    description: "Note-taking, gap-fill, multiple choice, and map labelling",
    keywords: ["listening", "audio", "note-taking", "gap"],
    exams: ["IELTS Listening", "TOEFL Listening", "Cambridge Listening"],
  },
  {
    skill: "Writing",
    icon: PenLine,
    color: "from-emerald-500/15 to-emerald-500/5",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    description: "Task 1, Task 2, integrated essays, and timed strategies",
    keywords: ["writing", "essay", "task 1", "task 2", "paragraph"],
    exams: ["IELTS Writing", "TOEFL Writing", "Cambridge Writing", "SAT Essay"],
  },
  {
    skill: "Speaking",
    icon: Mic2,
    color: "from-rose-500/15 to-rose-500/5",
    iconColor: "text-rose-600 dark:text-rose-400",
    description: "Interview prep, cue cards, discussion, and pronunciation",
    keywords: ["speaking", "interview", "cue card", "pronunciation", "fluency"],
    exams: ["IELTS Speaking", "TOEFL Speaking", "Cambridge Speaking"],
  },
  {
    skill: "Exam Overview & Strategy",
    icon: ClipboardList,
    color: "from-amber-500/15 to-amber-500/5",
    iconColor: "text-amber-600 dark:text-amber-400",
    description: "Format overview, scoring, time management, and test-day tips",
    keywords: ["overview", "format", "strategy", "score", "structure", "tips", "fce", "cambridge", "toefl ibt", "sat"],
    exams: ["IELTS", "TOEFL", "Cambridge", "SAT"],
  },
];

function ExamPrepSkillView() {
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  // Get all exam-prep lessons
  const examLessons = useMemo(() => {
    return Object.entries(lessons)
      .filter(([k]) => k.startsWith("exam-prep-"))
      .map(([key, lesson]) => ({ key, ...lesson }))
      .sort((a, b) => a.lessonNumber - b.lessonNumber);
  }, []);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("lesson_progress")
      .select("lesson_number")
      .eq("user_id", user.id)
      .eq("level_id", "exam-prep")
      .eq("completed", true)
      .then(({ data }) => {
        if (data) setCompletedLessons(new Set(data.map((r) => r.lesson_number)));
      });
  }, [user]);

  // Classify lessons into skills by title keywords
  const classifiedLessons = useMemo(() => {
    const result: Record<string, typeof examLessons> = {};
    EXAM_SKILLS.forEach((s) => { result[s.skill] = []; });

    examLessons.forEach((lesson) => {
      const titleLower = lesson.title.toLowerCase();
      let assigned = false;
      for (const skill of EXAM_SKILLS) {
        if (skill.keywords.some((kw) => titleLower.includes(kw))) {
          result[skill.skill].push(lesson);
          assigned = true;
          break;
        }
      }
      if (!assigned) {
        // Default to Overview
        result["Exam Overview & Strategy"].push(lesson);
      }
    });
    return result;
  }, [examLessons]);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeInUp>
          <h2 className="text-lg font-bold font-display mb-2">Prepare Part by Part</h2>
          <p className="text-sm text-muted-foreground mb-8">
            Each exam tests 4 core skills. Master them one by one with targeted lessons.
          </p>
        </FadeInUp>

        <div className="space-y-6">
          {EXAM_SKILLS.map((skill, idx) => {
            const skillLessons = classifiedLessons[skill.skill] || [];
            const completedCount = skillLessons.filter((l) => completedLessons.has(l.lessonNumber)).length;
            const SkillIcon = skill.icon;

            return (
              <motion.div
                key={skill.skill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl border bg-card shadow-soft overflow-hidden"
              >
                {/* Skill Header */}
                <div className={`p-5 bg-gradient-to-r ${skill.color}`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-11 w-11 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center ${skill.iconColor}`}>
                      <SkillIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold font-display text-base">{skill.skill}</h3>
                        <Badge variant="secondary" className="text-[10px]">{skillLessons.length} lessons</Badge>
                        {completedCount > 0 && (
                          <Badge variant="outline" className="text-[10px] gap-1">
                            <CheckCircle2 className="h-3 w-3" /> {completedCount}/{skillLessons.length}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{skill.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {skill.exams.map((exam) => (
                      <span key={exam} className="rounded-full border border-border bg-background/60 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {exam}
                      </span>
                    ))}
                  </div>
                  {skillLessons.length > 0 && (
                    <div className="mt-3">
                      <Progress value={skillLessons.length > 0 ? (completedCount / skillLessons.length) * 100 : 0} className="h-1.5" />
                    </div>
                  )}
                </div>

                {/* Lesson List */}
                {skillLessons.length > 0 ? (
                  <div className="divide-y">
                    {skillLessons.map((lesson) => {
                      const isCompleted = completedLessons.has(lesson.lessonNumber);
                      return (
                        <Link
                          key={lesson.key}
                          to={`/courses/exam-prep/${lesson.lessonNumber}`}
                          className="flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors group"
                        >
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold shrink-0 ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                            {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : lesson.lessonNumber}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{lesson.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{lesson.description}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-5 text-center text-sm text-muted-foreground">
                    Coming soon — lessons are being prepared!
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <FadeInUp delay={0.2}>
          <div className="mt-10 rounded-2xl border bg-gradient-to-r from-primary/5 to-accent/5 p-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">Need help choosing the right exam?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/placement-test">
                <Button variant="outline" className="rounded-full px-6 font-semibold font-display">
                  Take Placement Test
                </Button>
              </Link>
              <a href="https://wa.me/201234567890" target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full px-6 font-semibold font-display">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Ask Us on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

export default function CategoryDetail() {
  const { categorySlug } = useParams();
  const cat = categories.find((c) => c.slug === categorySlug);

  // Compute level IDs and lesson counts for progress tracking
  const { levelIds, lessonCounts } = useMemo(() => {
    const ids: string[] = [];
    const counts: Record<string, number> = {};
    if (cat) {
      cat.courses.forEach((course) => {
        const levelId = courseLevelMap[course.name];
        if (levelId && !ids.includes(levelId)) {
          ids.push(levelId);
          counts[levelId] = Object.keys(lessons).filter((k) => k.startsWith(`${levelId}-`)).length;
        }
      });
    }
    return { levelIds: ids, lessonCounts: counts };
  }, [cat]);

  const { progress } = useCourseProgress(levelIds, lessonCounts);

  if (!cat) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <Link to="/courses" className="mt-4 inline-block text-primary hover:underline">← Back to Courses</Link>
      </div>
    );
  }

  const IconComponent = cat.icon;

  return (
    <div className="overflow-x-hidden">
      {/* Hero with image */}
      <section className="relative overflow-hidden">
        <div className="relative h-48 md:h-64">
          <img src={cat.image} alt={cat.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 -mt-20 pb-6">
          <Link to="/courses" className="mb-4 inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors font-medium">
            <ChevronLeft className="h-4 w-4" /> Back to All Courses
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className={`h-14 w-14 rounded-2xl ${cat.iconBg} flex items-center justify-center shadow-sm backdrop-blur-sm`}>
                <IconComponent className="h-7 w-7 text-foreground" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display">{cat.title}</h1>
                <p className="text-sm text-muted-foreground mt-1">{cat.courses.length} courses available</p>
              </div>
            </div>
            <p className="max-w-xl text-muted-foreground mt-2">
              {cat.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Exam Prep — Custom Skill-Based Layout */}
      {categorySlug === "exam-prep" ? (
        <ExamPrepSkillView />
      ) : (
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeInUp>
            <h2 className="text-lg font-bold font-display mb-6">Choose a Course to Start</h2>
          </FadeInUp>

           <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid gap-5 md:grid-cols-2"
          >
            {cat.courses.map((course, i) => {
              const hasLessons = getCourseHasLessons(course.name);
              const lessonCount = getCourseLessonCount(course.name);
              const levelId = courseLevelMap[course.name];
              const coursePath = course.name === "English for Kids" ? "/courses/kids" : course.name === "English through Stories" ? "/courses/stories" : course.name === "English through Movies & Series" ? "/courses/movies" : hasLessons ? `/courses/${levelId}` : `/courses/${levelId || cat.slug}`;

              return (
                <motion.div key={course.name} variants={staggerItem}>
                  <Link to={coursePath} className="group relative block rounded-2xl border bg-card shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 overflow-hidden h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    {/* Course Image */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={getCourseImage(course.name, cat.image)}
                        alt={course.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm text-sm font-bold text-primary shadow-sm">
                        {i + 1}
                      </div>
                      {hasLessons && (
                        <span className="absolute top-3 right-3 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                          {lessonCount} Lessons
                        </span>
                      )}
                    </div>
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-bold font-display text-base leading-tight">{course.name}</h3>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">{course.description}</p>
                      {course.topics && course.topics.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {course.topics.map((topic) => (
                            <span key={topic} className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                      {/* Progress Bar */}
                      {hasLessons && levelId && progress[levelId] && progress[levelId].completed > 0 && (
                        <div className="mt-3 space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-muted-foreground font-medium">
                              {progress[levelId].completed}/{progress[levelId].total} lessons
                            </span>
                            <span className="font-semibold text-primary">
                              {progress[levelId].percentage}%
                            </span>
                          </div>
                          <Progress value={progress[levelId].percentage} className="h-2" />
                        </div>
                      )}
                      <div className="mt-4">
                        <Button size="sm" className="rounded-full px-5 text-xs font-semibold gap-2 w-full pointer-events-none" tabIndex={-1}>
                          <PlayCircle className="h-3.5 w-3.5" />
                          Start Learning
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <FadeInUp delay={0.2}>
            <div className="mt-10 rounded-2xl border bg-gradient-to-r from-primary/5 to-accent/5 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">Not sure which course is right for you?</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/placement-test">
                  <Button variant="outline" className="rounded-full px-6 font-semibold font-display">
                    Take Placement Test
                  </Button>
                </Link>
                <a href="https://wa.me/201234567890" target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full px-6 font-semibold font-display">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Ask Us on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>
      )}
    </div>
  );
}
