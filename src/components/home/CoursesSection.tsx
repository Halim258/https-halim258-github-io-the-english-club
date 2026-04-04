import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, GraduationCap, MessageCircle, PenLine, BookMarked, Target, Briefcase, Globe2, Headphones, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInUp, staggerContainer, staggerItem } from "@/components/AnimatedSection";

const categories = [
  {
    icon: BookOpen,
    emoji: "📘",
    title: "Core English Courses",
    courses: ["General English (A1–C2)", "Intensive English Course", "English for Beginners", "Intermediate English", "Advanced English"],
  },
  {
    icon: MessageCircle,
    emoji: "🗣️",
    title: "Communication Skills",
    courses: ["Speaking & Conversation Practice", "Listening Skills", "Pronunciation & Accent Training", "Fluency Development"],
  },
  {
    icon: PenLine,
    emoji: "✍️",
    title: "Writing Skills",
    courses: ["English Writing Basics", "Academic Writing", "Creative Writing", "Business Writing", "Email Writing"],
  },
  {
    icon: BookMarked,
    emoji: "📖",
    title: "Reading & Vocabulary",
    courses: ["Reading Comprehension", "Vocabulary Building", "Idioms & Expressions", "Phrasal Verbs Course"],
  },
  {
    icon: Target,
    emoji: "🎯",
    title: "Exam Preparation",
    courses: ["IELTS Preparation", "TOEFL Preparation", "Cambridge Exams (PET, FCE, CAE)", "SAT English"],
  },
  {
    icon: Briefcase,
    emoji: "💼",
    title: "Professional English",
    courses: ["Business English", "English for Interviews", "Workplace Communication", "Presentation Skills"],
  },
  {
    icon: Globe2,
    emoji: "🌍",
    title: "Specialized English",
    courses: ["English for Travel", "English for Kids", "English for Teenagers", "English for Specific Purposes (ESP)", "Medical English", "Engineering English", "IT English"],
  },
  {
    icon: Headphones,
    emoji: "🎧",
    title: "Interactive / Modern Courses",
    courses: ["English through Movies & Series", "English through Stories", "Real-life Conversation Practice", "Slang & Everyday English"],
  },
  {
    icon: Brain,
    emoji: "🧠",
    title: "Grammar & Structure",
    courses: ["English Grammar (Basic → Advanced)", "Tenses Mastery", "Sentence Structure"],
  },
];

export default function CoursesSection() {
  return (
    <section id="courses" className="py-20">
      <div className="container mx-auto px-4">
        <FadeInUp>
          <div className="flex items-center justify-center gap-2 mb-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">
              Our Courses
            </p>
          </div>
          <h2 className="text-center text-2xl md:text-3xl font-bold font-display">
            Complete Course Catalog
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            From beginner basics to professional mastery — explore our full range of English courses designed for every goal and level.
          </p>
        </FadeInUp>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={staggerItem}
              className="group rounded-xl border bg-card p-6 shadow-soft transition-all hover:shadow-card hover:border-primary/30 hover:-translate-y-1 duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <cat.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold font-display">{cat.title}</h3>
              </div>
              <ul className="space-y-2">
                {cat.courses.map((course) => (
                  <li key={course} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                    {course}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <FadeInUp delay={0.2}>
          <div className="mt-10 flex justify-center">
            <Link to="/courses">
              <Button className="rounded-full px-8 font-semibold font-display">
                View Full Curriculum <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
