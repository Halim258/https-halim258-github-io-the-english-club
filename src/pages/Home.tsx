import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, ArrowRight, Users, Award, GraduationCap,
  Headphones, PenLine, MessageCircle, BarChart3, Globe2, Star, CheckCircle2, Camera
} from "lucide-react";
import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.png";
import gallery4 from "@/assets/gallery-4.png";
import gallery5 from "@/assets/gallery-5.png";
import gallery6 from "@/assets/gallery-6.png";
import gallery7 from "@/assets/gallery-7.png";
import { Button } from "@/components/ui/button";
import { PetalTopRight, PetalBottomLeft } from "@/components/PetalDecoration";
import { FadeInUp, FadeIn, ScaleIn, staggerContainer, staggerItem } from "@/components/AnimatedSection";
import FAQSection from "@/components/home/FAQSection";
import LocationSection from "@/components/home/LocationSection";

const audiences = [
  { icon: "🎓", title: "Self-Learning Students", to: "/courses" },
  { icon: "🌍", title: "International Learners", to: "/courses" },
  { icon: "👨‍🏫", title: "Learn with a Teacher", to: "/teachers" },
];

const stats = [
  { value: "12.5 hrs", label: "saved weekly on lesson prep" },
  { value: "59.4%", label: "increase in student engagement" },
  { value: "200+", label: "structured Cambridge lessons" },
  { value: "Since 2019", label: "serving Alexandria, Egypt" },
];

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Curriculum",
    desc: "Cambridge-aligned lessons from A1 beginner to C2 mastery, covering grammar, vocabulary, speaking & writing.",
  },
  {
    icon: Headphones,
    title: "Interactive Learning Tools",
    desc: "Flip cards, dialogues, grammar exercises, and AI-powered speaking practice in every lesson.",
  },
  {
    icon: MessageCircle,
    title: "Teacher-Guided Support",
    desc: "Book expert teachers for personalized 1-on-1 lessons with structured curriculum guidance.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Progress",
    desc: "Track your learning journey with exams, homework, and performance analytics at every level.",
  },
];

const testimonials = [
  {
    quote: "It's not just a place to learn English, it's my second home.",
    name: "May Magdy",
    role: "Student",
  },
  {
    quote: "I really love this place, everyone here is amazing. I'm lucky to have such a great family!",
    name: "Nour Elanany",
    role: "Student",
  },
  {
    quote: "Without any compliments, I feel home in The English Club.",
    name: "Ahmed Yousry",
    role: "Student",
  },
];

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <PetalTopRight />
        <PetalBottomLeft />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl font-display">
              Cutting-Edge Methods for{" "}
              <span className="text-primary">Fast-Paced English</span>{" "}
              Language Acquisition
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
          >
            The English Club Language School in Alexandria, Egypt — using cutting-edge methods and a Cambridge-aligned curriculum to ensure fast-paced language acquisition.
          </motion.p>

          {/* Audience buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            {audiences.map((a) => (
              <Link
                key={a.title}
                to={a.to}
                className="flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-medium shadow-soft transition-all hover:shadow-card hover:border-primary/30 hover:-translate-y-0.5"
              >
                <span className="text-lg">{a.icon}</span>
                {a.title}
              </Link>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/signup">
              <Button size="lg" className="rounded-full px-8 font-semibold font-display">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" size="lg" className="rounded-full px-8 font-semibold font-display">
                Explore Curriculum
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="border-y bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary mb-2">Guide</p>
            <h2 className="text-center text-2xl md:text-3xl font-bold font-display">
              Our Structured, Student-Centered Approach
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
              Every English Club lesson employs a communicative approach, engaging all four language domains — reading, speaking, listening, and writing — with structured exercises and real-world practice.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.15}>
            <div className="mt-8 flex justify-center">
              <Link to="/courses">
                <Button variant="outline" className="rounded-full font-semibold">
                  Explore Curriculum & Lessons <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={staggerItem} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary font-display">{s.value}</p>
                <p className="mt-2 text-sm text-muted-foreground font-medium">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 overflow-hidden">
        <PetalTopRight className="opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeInUp>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary mb-2">Community</p>
            <h2 className="text-center text-2xl md:text-3xl font-bold font-display">
              A Complete English Learning Platform
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
              Everything you need to learn English — from beginner to advanced.
            </p>
          </FadeInUp>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={staggerItem}
                className="rounded-xl border bg-card p-6 shadow-soft transition-all hover:shadow-card hover:-translate-y-1 duration-300"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold font-display">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <FadeInUp delay={0.2}>
            <div className="mt-10 flex justify-center">
              <Link to="/courses">
                <Button variant="outline" className="rounded-full font-semibold">
                  Explore Curriculum & Lessons <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Lesson Structure Preview */}
      <section className="border-y bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <h2 className="text-center text-2xl md:text-3xl font-bold font-display">
              Every Lesson Includes
            </h2>
          </FadeInUp>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {[
              { icon: "📚", label: "Vocabulary" },
              { icon: "💬", label: "Conversation" },
              { icon: "📝", label: "Grammar" },
              { icon: "🗣️", label: "Speaking" },
              { icon: "✅", label: "Exam" },
              { icon: "📖", label: "Homework" },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={staggerItem}
                className="flex flex-col items-center rounded-xl border bg-card p-5 shadow-soft transition-all hover:shadow-card hover:-translate-y-1 duration-300"
              >
                <span className="text-3xl mb-3">{item.icon}</span>
                <span className="text-sm font-semibold font-display">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Camera className="h-4 w-4 text-primary" />
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">Gallery</p>
            </div>
            <h2 className="text-center text-2xl md:text-3xl font-bold font-display mb-12">
              Life at The English Club
            </h2>
          </FadeInUp>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            <motion.div variants={staggerItem} className="col-span-2 row-span-2 overflow-hidden rounded-xl border shadow-soft">
              <img src={gallery1} alt="Students at The English Club" className="h-full w-full object-cover transition-transform hover:scale-105 duration-500" />
            </motion.div>
            {[gallery2, gallery3, gallery4, gallery5, gallery6, gallery7].map((img, i) => (
              <motion.div key={i} variants={staggerItem} className="overflow-hidden rounded-xl border shadow-soft">
                <img src={img} alt={`Gallery photo ${i + 2}`} className="h-full w-full object-cover transition-transform hover:scale-105 duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PCC Competition Section */}
      <section className="border-y bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="h-4 w-4 text-primary" />
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">Competition</p>
            </div>
            <h2 className="text-center text-2xl md:text-3xl font-bold font-display">
              PCC — Presentation Course & Competition
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
              Our flagship program that transforms students into confident public speakers through structured training and competitive presentation events.
            </p>
          </FadeInUp>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-12 grid gap-6 md:grid-cols-3"
          >
            {[
              { icon: BookOpen, title: "Presentation Course", desc: "Students learn essential public speaking skills — structuring ideas, body language, vocal delivery, and visual aids — through hands-on workshops and practice sessions." },
              { icon: Users, title: "Team Competition", desc: "Students form teams and compete in live presentation battles, judged on content, delivery, creativity, and teamwork. Winners receive medals and certificates." },
              { icon: Award, title: "Recognition & Awards", desc: "Top presenters earn PCC medals, trophies, and certificates of achievement — building confidence and a portfolio of public speaking accomplishments." },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="rounded-xl border bg-card p-6 shadow-soft transition-all hover:shadow-card hover:-translate-y-1 duration-300"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold font-display">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <FadeInUp delay={0.2}>
            <div className="mt-12 rounded-xl border bg-card p-6 shadow-soft">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/3 overflow-hidden rounded-lg">
                  <img src={gallery7} alt="PCC Competition awards" className="w-full h-48 object-cover rounded-lg" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold font-display mb-3">Why Join PCC?</h3>
                  <ul className="space-y-2.5">
                    {[
                      "Build real-world presentation & public speaking skills",
                      "Compete with peers in a supportive, encouraging environment",
                      "Earn certificates and medals recognized by The English Club",
                      "Boost your confidence for academic and professional settings",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <h2 className="text-center text-2xl md:text-3xl font-bold font-display mb-12">
              What Our Students Say
            </h2>
          </FadeInUp>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-6 md:grid-cols-3"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="rounded-xl border bg-card p-6 shadow-soft transition-all hover:shadow-card hover:-translate-y-1 duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Location Section */}
      <LocationSection />

      {/* Levels Overview */}
      <section className="relative py-20 overflow-hidden">
        <PetalBottomLeft />
        <div className="container mx-auto px-4 relative z-10">
          <FadeInUp>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary mb-2">Comprehensive</p>
            <h2 className="text-center text-2xl md:text-3xl font-bold font-display">
              Supporting Every Student's Journey
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
              From absolute beginners to advanced speakers, our Cambridge-aligned curriculum covers every step.
            </p>
          </FadeInUp>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-6"
          >
            {["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper-Int", "C1 Advanced", "C2 Mastery"].map(
              (level, i) => (
                <motion.div key={level} variants={staggerItem}>
                  <Link
                    to={`/courses/${["a1", "a2", "b1", "b2", "c1", "c2"][i]}`}
                    className="group flex flex-col items-center rounded-xl border bg-card p-5 text-center shadow-soft transition-all hover:shadow-card hover:border-primary/30 hover:-translate-y-1 duration-300"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-semibold font-display">{level}</p>
                  </Link>
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="gradient-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <FadeInUp>
            <div className="flex justify-center mb-5">
              <div className="h-14 w-14 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <GraduationCap className="h-7 w-7 text-primary-foreground" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground font-display">
              Join The English Club Language School Today
            </h2>
            <p className="mx-auto mt-4 max-w-md text-primary-foreground/80">
              Visit us in Alexandria, Egypt or start learning online — sign up free.
            </p>
            <Link to="/signup" className="mt-8 inline-block">
              <Button size="lg" variant="secondary" className="rounded-full px-8 font-semibold font-display">
                Sign Up Free
              </Button>
            </Link>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
