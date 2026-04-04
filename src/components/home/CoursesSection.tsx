import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, GraduationCap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInUp, staggerContainer, staggerItem } from "@/components/AnimatedSection";

const courses = [
  {
    id: "reading",
    level: "Reading",
    title: "English Reading Course",
    badge: "Foundation",
    color: "bg-accent/15 text-accent",
    lessons: 20,
    topics: [
      "Alphabet & Phonics",
      "Sight Words & Spelling",
      "Short Sentences & Paragraphs",
      "Critical Reading Skills",
    ],
    description: "Build foundational reading skills from scratch — learn the alphabet, phonics, and progress to reading full sentences.",
  },
  {
    id: "a1",
    level: "A1",
    title: "Beginner",
    badge: "Stage 1",
    color: "bg-primary/10 text-primary",
    lessons: 20,
    topics: [
      "Greetings & Introductions",
      "Numbers, Time & Dates",
      "Family & Daily Life",
      "Weather, Feelings & Hobbies",
    ],
    description: "Start speaking English with essential greetings, verb 'to be', simple present, and everyday vocabulary.",
  },
  {
    id: "a2",
    level: "A2",
    title: "Elementary",
    badge: "Stage 1",
    color: "bg-primary/10 text-primary",
    lessons: 20,
    topics: [
      "Daily Routines & Past Tense",
      "Travel & Directions",
      "Shopping & Restaurants",
      "Technology & Environment",
    ],
    description: "Expand your skills with past tense, comparatives, adverbs of frequency, and real-world conversation topics.",
  },
  {
    id: "b1",
    level: "B1",
    title: "Intermediate",
    badge: "Stage 2",
    color: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
    lessons: 20,
    topics: [
      "Expressing Opinions & Advice",
      "Career & Job Interviews",
      "Media, News & Education",
      "Health & Social Issues",
    ],
    description: "Master conditionals, modals, reported speech, and discuss complex topics with confidence.",
  },
  {
    id: "b2",
    level: "B2",
    title: "Upper-Intermediate",
    badge: "Stage 2",
    color: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
    lessons: 20,
    topics: [
      "Passive Voice & Cleft Sentences",
      "Globalisation & Ethics",
      "Science & Technology",
      "Art, Culture & Digital Society",
    ],
    description: "Refine your English with advanced grammar, nuanced argumentation, and academic discussion skills.",
  },
  {
    id: "c1",
    level: "C1",
    title: "Advanced",
    badge: "Stage 3",
    color: "bg-[hsl(var(--chart-4))]/10 text-[hsl(var(--chart-4))]",
    lessons: 20,
    topics: [
      "Philosophy & Critical Thinking",
      "Sociolinguistics & Identity",
      "Environmental Policy",
      "Academic Writing & Research",
    ],
    description: "Tackle university-level topics — inversion, subjunctive mood, discourse markers, and formal registers.",
  },
  {
    id: "c2",
    level: "C2",
    title: "Mastery",
    badge: "Stage 3",
    color: "bg-[hsl(var(--chart-4))]/10 text-[hsl(var(--chart-4))]",
    lessons: 20,
    topics: [
      "Rhetoric & Persuasion",
      "Translation & Interpretation",
      "Corpus Linguistics & Semiotics",
      "Language, Power & Identity",
    ],
    description: "Achieve native-like proficiency with rhetoric, pragmatics, discourse analysis, and professional English.",
  },
];

export default function CoursesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeInUp>
          <div className="flex items-center justify-center gap-2 mb-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">
              Full Curriculum
            </p>
          </div>
          <h2 className="text-center text-2xl md:text-3xl font-bold font-display">
            7 Levels · 140 Lessons · Complete English Plan
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Cambridge-aligned curriculum from absolute beginner to native-level mastery. Every lesson includes vocabulary, conversation, grammar, speaking practice, exams, and homework.
          </p>
        </FadeInUp>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {courses.map((course) => (
            <motion.div key={course.id} variants={staggerItem}>
              <Link
                to={`/courses/${course.id}`}
                className="group flex h-full flex-col rounded-xl border bg-card p-6 shadow-soft transition-all hover:shadow-card hover:border-primary/30 hover:-translate-y-1 duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary font-display">
                    {course.level}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${course.color}`}>
                    {course.badge}
                  </span>
                </div>

                <h3 className="text-base font-semibold font-display">{course.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  {course.description}
                </p>

                <div className="mt-4 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">
                    Key Topics
                  </p>
                  <ul className="space-y-1.5">
                    {course.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex items-center justify-between pt-4 border-t">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <BookOpen className="h-3 w-3" />
                    {course.lessons} lessons
                  </span>
                  <span className="text-xs font-semibold text-primary group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Start <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
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
