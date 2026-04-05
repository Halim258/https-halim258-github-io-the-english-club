import { Link, useParams } from "react-router-dom";
import { ChevronLeft, MessageCircle, CheckCircle2, PlayCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FadeInUp, staggerContainer, staggerItem } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/course-categories";
import { getCourseImage } from "@/data/course-images";
import { lessons } from "@/data/lessons";

// Map course names to lesson level IDs
const courseLevelMap: Record<string, string> = {
  "Speaking & Conversation Practice": "speaking",
  "Listening Skills": "listening",
  "Pronunciation & Accent Training": "pronunciation",
  "Fluency Development": "fluency",
  "English Writing Basics": "writing",
  "Academic Writing": "writing",
  "Creative Writing": "writing",
  "Business Writing": "writing",
  "Email Writing": "writing",
  "English Grammar (Basic → Advanced)": "grammar-course",
  "Tenses Mastery": "grammar-course",
  "Sentence Structure": "grammar-course",
  "IELTS Preparation": "exam-prep",
  "TOEFL Preparation": "exam-prep",
  "Business English": "professional",
  "English for Interviews": "professional",
  "Workplace Communication": "professional",
  "Presentation Skills": "professional",
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

export default function CategoryDetail() {
  const { categorySlug } = useParams();
  const cat = categories.find((c) => c.slug === categorySlug);

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

      {/* Courses List */}
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

              return (
                <motion.div key={course.name} variants={staggerItem}>
                  <div className="group relative rounded-2xl border bg-card shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 overflow-hidden h-full">
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
                      <div className="mt-4">
                        <Link to={hasLessons ? `/courses/${levelId}` : `/courses/${levelId || cat.slug}`}>
                          <Button size="sm" className="rounded-full px-5 text-xs font-semibold gap-2 w-full">
                            <PlayCircle className="h-3.5 w-3.5" />
                            Start Learning
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
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
    </div>
  );
}
