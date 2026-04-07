import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  BookOpen, ArrowRight, Users, Award, GraduationCap,
  Headphones, PenLine, MessageCircle, BarChart3, Globe2, Star, CheckCircle2, Camera,
  Sparkles, Target, Zap, Trophy, Heart, Play, ChevronRight, Radio, Mic2, Quote
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
import CoursesSection from "@/components/home/CoursesSection";

/* ── Animated Counter ── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

const audiences = [
  { icon: "🎓", title: "Self-Learning Students", desc: "Study at your own pace", to: "/courses", tag: "Free" },
  { icon: "🌍", title: "International Learners", desc: "Learn from anywhere", to: "/courses", tag: "Online" },
  { icon: "👨‍🏫", title: "Learn with a Teacher", desc: "1-on-1 expert guidance", to: "/teachers", tag: "Premium" },
];

const stats = [
  { value: 500, suffix: "+", label: "Active Students", icon: Users },
  { value: 200, suffix: "+", label: "Structured Lessons", icon: BookOpen },
  { value: 40, suffix: "+", label: "Expert Courses", icon: GraduationCap },
  { value: 7, suffix: "", label: "Years of Excellence", icon: Award },
];

const features = [
  {
    icon: BookOpen,
    title: "Cambridge Curriculum",
    desc: "Lessons aligned from A1 to C2 — grammar, vocabulary, speaking & writing all covered.",
    color: "from-primary/15 to-primary/5",
    accent: "bg-primary/10",
  },
  {
    icon: Headphones,
    title: "Interactive Tools",
    desc: "Flip cards, dialogues, grammar drills, and FM radio for immersive listening practice.",
    color: "from-blue-500/15 to-blue-500/5",
    accent: "bg-blue-500/10",
  },
  {
    icon: MessageCircle,
    title: "Teacher Support",
    desc: "Book expert teachers for personalized 1-on-1 lessons with guided curriculum.",
    color: "from-emerald-500/15 to-emerald-500/5",
    accent: "bg-emerald-500/10",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    desc: "Exams, homework, and performance analytics to measure your learning journey.",
    color: "from-violet-500/15 to-violet-500/5",
    accent: "bg-violet-500/10",
  },
  {
    icon: Target,
    title: "Exam Preparation",
    desc: "IELTS, TOEFL, Cambridge — targeted prep with mock tests and strategies.",
    color: "from-orange-500/15 to-orange-500/5",
    accent: "bg-orange-500/10",
  },
  {
    icon: Sparkles,
    title: "PCC Competition",
    desc: "Our flagship presentation course that turns students into confident speakers.",
    color: "from-amber-500/15 to-amber-500/5",
    accent: "bg-amber-500/10",
  },
];

const howItWorks = [
  { step: "01", title: "Choose Your Level", desc: "Take a placement test or pick your CEFR level from A1 to C2.", icon: Target },
  { step: "02", title: "Pick a Course", desc: "Browse 40+ courses — from general English to specialized professional tracks.", icon: BookOpen },
  { step: "03", title: "Start Learning", desc: "Access structured lessons with vocabulary, grammar, speaking & homework.", icon: Play },
  { step: "04", title: "Track & Grow", desc: "Take exams, earn certificates, and watch your progress soar.", icon: Trophy },
];

const lessonIncludes = [
  { icon: "📚", label: "Vocabulary", desc: "New words in context" },
  { icon: "💬", label: "Conversation", desc: "Real dialogue practice" },
  { icon: "📝", label: "Grammar", desc: "Rules & exercises" },
  { icon: "🗣️", label: "Speaking", desc: "Pronunciation drills" },
  { icon: "✅", label: "Exam", desc: "Level assessments" },
  { icon: "📖", label: "Homework", desc: "Reinforce learning" },
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
  const location = useLocation();

  useEffect(() => {
    const scrollTo = (location.state as any)?.scrollTo;
    if (scrollTo) {
      setTimeout(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  return (
    <div className="overflow-x-hidden">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
        <PetalTopRight />
        <PetalBottomLeft />
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3], x: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2], y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/3 blur-[120px]"
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-xs font-semibold text-muted-foreground shadow-soft mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Serving Alexandria since 2019
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-4xl font-bold leading-[1.08] md:text-5xl lg:text-6xl xl:text-7xl font-display"
            >
              Master English with{" "}
              <span className="relative inline-block">
                <span className="text-gradient">Confidence</span>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <motion.path
                    d="M2 8 Q50 2 100 6 Q150 10 198 4"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              The English Club Language School — Cambridge-aligned curriculum, expert teachers, and modern learning tools. From beginner to advanced, we've got your English journey covered.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link to="/signup">
                <Button size="lg" className="rounded-full px-8 font-semibold font-display text-base h-12 shadow-lg hover:shadow-elevated transition-all hover:scale-[1.03] duration-200">
                  Start Learning Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" size="lg" className="rounded-full px-8 font-semibold font-display text-base h-12 hover:scale-[1.03] hover:border-primary/30 hover:bg-primary/5 transition-all duration-200">
                  Explore Courses
                </Button>
              </Link>
            </motion.div>

            {/* Placement Test CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48, ease: "easeOut" }}
              className="mt-6"
            >
              <Link
                to="/placement-test"
                className="group inline-flex items-center gap-3 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/8 to-accent/8 px-6 py-3.5 shadow-soft transition-all hover:shadow-elevated hover:border-primary/40 hover:-translate-y-0.5 duration-300"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 group-hover:bg-primary/25 group-hover:scale-110 transition-all duration-300">
                  <GraduationCap className="h-4.5 w-4.5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold font-display">Don't know your level?</p>
                  <p className="text-[11px] text-muted-foreground">Take our free Cambridge Placement Test →</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            </motion.div>

            {/* Audience cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
              className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
            >
              {audiences.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <Link
                    to={a.to}
                    className="group relative flex flex-col items-center gap-2.5 rounded-2xl border bg-card px-4 py-6 shadow-soft transition-all hover:shadow-elevated hover:border-primary/30 duration-300"
                  >
                    <span className="absolute top-2.5 right-2.5 text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full px-2 py-0.5">
                      {a.tag}
                    </span>
                    <motion.span 
                      className="text-3xl"
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      {a.icon}
                    </motion.span>
                    <p className="text-sm font-semibold font-display">{a.title}</p>
                    <p className="text-[11px] text-muted-foreground">{a.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="border-y bg-muted/30 py-14 md:py-18">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={staggerItem}
                className="relative text-center group"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4 group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-display">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground font-medium">{s.label}</p>
                {i < stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-border" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-primary" />
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">How It Works</p>
            </div>
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold font-display">
              Your Learning Journey in 4 Steps
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
              Getting started is simple. Here's how The English Club takes you from enrollment to excellence.
            </p>
          </FadeInUp>

          <div className="mt-14 relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-[3.5rem] left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
              {howItWorks.map((item, i) => (
                <motion.div
                  key={item.step}
                  variants={staggerItem}
                  className="relative rounded-2xl border bg-card p-7 shadow-soft hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <item.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                      <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center font-display shadow-sm">
                        {item.step}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-base font-semibold font-display">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden border-y bg-muted/20">
        <PetalTopRight className="opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeInUp>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">Why Choose Us</p>
            </div>
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold font-display">
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
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={staggerItem}
                className={`relative rounded-2xl border bg-gradient-to-br ${f.color} p-7 shadow-soft transition-all hover:shadow-card hover:-translate-y-1.5 duration-300 group overflow-hidden`}
              >
                {/* Decorative corner glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl ${f.accent} shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold font-display">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <FadeInUp delay={0.2}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <Link to="/courses">
                <Button className="rounded-full font-semibold px-6 hover:scale-[1.02] transition-transform">
                  Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/fm">
                <Button variant="outline" className="rounded-full font-semibold px-6 hover:scale-[1.02] transition-transform">
                  <Radio className="mr-2 h-4 w-4" /> FM Radio
                </Button>
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ═══════════════ EVERY LESSON INCLUDES ═══════════════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">Lesson Structure</p>
            </div>
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold font-display">
              Every Lesson Includes
            </h2>
            <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">
              A complete learning experience in every session.
            </p>
          </FadeInUp>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {lessonIncludes.map((item, i) => (
              <motion.div
                key={item.label}
                variants={staggerItem}
                className="relative flex flex-col items-center rounded-2xl border bg-card p-6 shadow-soft transition-all hover:shadow-card hover:-translate-y-1.5 duration-300 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                <span className="relative text-sm font-semibold font-display">{item.label}</span>
                <span className="relative text-[11px] text-muted-foreground mt-1 text-center">{item.desc}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section id="gallery" className="border-y bg-muted/20 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Camera className="h-4 w-4 text-primary" />
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">Gallery</p>
            </div>
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold font-display mb-3">
              Life at The English Club
            </h2>
            <p className="mx-auto max-w-md text-center text-muted-foreground mb-14">
              A glimpse into our classrooms, events, and community moments.
            </p>
          </FadeInUp>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          >
            <motion.div variants={staggerItem} className="col-span-2 row-span-2 overflow-hidden rounded-2xl border shadow-soft group relative">
              <img src={gallery1} alt="Students at The English Club" className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            {[gallery2, gallery3, gallery4, gallery5, gallery6, gallery7].map((img, i) => (
              <motion.div key={i} variants={staggerItem} className="overflow-hidden rounded-2xl border shadow-soft group aspect-square relative">
                <img src={img} alt={`Gallery photo ${i + 2}`} className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ PCC COMPETITION ═══════════════ */}
      <section id="pcc" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="h-4 w-4 text-primary" />
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">Competition</p>
            </div>
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold font-display">
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
            className="mt-14 grid gap-5 md:grid-cols-3"
          >
            {[
              { icon: Mic2, title: "Presentation Course", desc: "Learn public speaking skills — structuring ideas, body language, vocal delivery, and visual aids through workshops.", color: "from-blue-500/10 to-blue-500/5", num: "01" },
              { icon: Users, title: "Team Competition", desc: "Form teams and compete in live presentation battles, judged on content, delivery, creativity, and teamwork.", color: "from-violet-500/10 to-violet-500/5", num: "02" },
              { icon: Trophy, title: "Awards & Recognition", desc: "Top presenters earn PCC medals, trophies, and certificates — building confidence and a speaking portfolio.", color: "from-amber-500/10 to-amber-500/5", num: "03" },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className={`relative rounded-2xl border bg-gradient-to-br ${item.color} p-7 shadow-soft transition-all hover:shadow-card hover:-translate-y-1.5 duration-300 group overflow-hidden`}
              >
                <span className="absolute top-3 right-4 text-5xl font-bold text-primary/[0.06] font-display select-none">{item.num}</span>
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-card shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold font-display">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <FadeInUp delay={0.2}>
            <div className="mt-10 rounded-2xl border bg-card p-7 shadow-soft overflow-hidden">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3 overflow-hidden rounded-xl relative group">
                  <img src={gallery7} alt="PCC Competition awards" className="w-full h-52 object-cover rounded-xl transition-transform group-hover:scale-105 duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent rounded-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold font-display mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-accent" />
                    Why Join PCC?
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Build real-world presentation & public speaking skills",
                      "Compete with peers in a supportive, encouraging environment",
                      "Earn certificates and medals recognized by The English Club",
                      "Boost your confidence for academic and professional settings",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
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

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section id="testimonials" className="border-y bg-muted/20 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-10 right-10 text-[200px] text-primary/[0.03] font-serif select-none pointer-events-none leading-none">"</div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeInUp>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="h-4 w-4 text-primary" />
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">Reviews</p>
            </div>
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold font-display mb-3">
              What Our Students Say
            </h2>
            <p className="mx-auto max-w-md text-center text-muted-foreground mb-14">
              Real words from real students — our community speaks for itself.
            </p>
          </FadeInUp>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-5 md:grid-cols-3"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="rounded-2xl border bg-card p-7 shadow-soft transition-all hover:shadow-card hover:-translate-y-1.5 duration-300 relative overflow-hidden group"
              >
                {/* Quote accent bar */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex gap-1 mb-5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/10 mb-3" />
                <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3 pt-4 border-t">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold font-display">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ COURSES ═══════════════ */}
      <CoursesSection />

      {/* ═══════════════ FAQ ═══════════════ */}
      <FAQSection />

      {/* ═══════════════ LOCATION ═══════════════ */}
      <LocationSection />

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="gradient-primary py-20 md:py-28 relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-primary-foreground/5 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-primary-foreground/5 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeInUp>
            <div className="flex justify-center mb-6">
              <motion.div
                className="h-18 w-18 rounded-2xl bg-primary-foreground/20 flex items-center justify-center backdrop-blur-sm"
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <GraduationCap className="h-9 w-9 text-primary-foreground" />
              </motion.div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-foreground font-display">
              Ready to Start Your English Journey?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-primary-foreground/80 text-lg">
              Join hundreds of students at The English Club — Alexandria's premier English language school.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="rounded-full px-8 font-semibold font-display h-12 hover:scale-[1.02] transition-transform">
                  Sign Up Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="https://api.whatsapp.com/send?phone=%2B201554901390" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="rounded-full px-8 font-semibold font-display h-12 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:scale-[1.02] transition-all">
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Us
                </Button>
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
