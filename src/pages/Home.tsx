import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  BookOpen, ArrowRight, Users, Award, GraduationCap,
  Headphones, PenLine, MessageCircle, BarChart3, Globe2, Star, CheckCircle2, Camera,
  Sparkles, Target, Zap, Trophy, Heart, Play, ChevronRight, Radio, Mic2, Quote,
  Shield, Clock, MapPin
} from "lucide-react";
import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.png";
import gallery4 from "@/assets/gallery-4.png";
import gallery5 from "@/assets/gallery-5.png";
import gallery6 from "@/assets/gallery-6.png";
import gallery7 from "@/assets/gallery-7.png";
import audienceSelfLearning from "@/assets/audience-self-learning.png";
import audienceInternational from "@/assets/audience-international.png";
import audienceTeacher from "@/assets/audience-teacher.png";
import lessonVocabulary from "@/assets/lesson-vocabulary.png";
import lessonConversation from "@/assets/lesson-conversation.png";
import lessonGrammar from "@/assets/lesson-grammar.png";
import lessonSpeaking from "@/assets/lesson-speaking.png";
import lessonExam from "@/assets/lesson-exam.png";
import lessonHomework from "@/assets/lesson-homework.png";
import heroBg from "@/assets/hero-bg.jpg";
import studentsLearning from "@/assets/students-learning.jpg";
import pccPresentation from "@/assets/pcc-presentation.jpg";
import pccAwards from "@/assets/pcc-awards.jpg";
import teacher1 from "@/assets/teacher-1.jpg";
import teacher2 from "@/assets/teacher-2.jpg";
import teacher3 from "@/assets/teacher-3.jpg";
import classroomAerial from "@/assets/classroom-aerial.jpg";
import teacherRadwa from "@/assets/teacher-radwa.jpg";
import teacherAsmaa from "@/assets/teacher-asmaa.jpg";
import { Button } from "@/components/ui/button";
import { PetalTopRight, PetalBottomLeft } from "@/components/PetalDecoration";
import { FadeInUp, FadeIn, ScaleIn, staggerContainer, staggerItem } from "@/components/AnimatedSection";
import FAQSection from "@/components/home/FAQSection";
import LocationSection from "@/components/home/LocationSection";
import CoursesSection from "@/components/home/CoursesSection";
import ContinueLearning from "@/components/ContinueLearning";
import TypingHero from "@/components/TypingHero";
import SocialProofToast from "@/components/SocialProofToast";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import LearningGuide from "@/components/home/LearningGuide";
import OnboardingTour from "@/components/OnboardingTour";
import WordOfTheDay from "@/components/home/WordOfTheDay";

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
  { image: audienceSelfLearning, title: "Self-Learning Students", desc: "Study at your own pace", to: "/courses", tag: "Free" },
  { image: audienceInternational, title: "International Learners", desc: "Learn from anywhere", to: "/courses", tag: "Online" },
  { image: audienceTeacher, title: "Learn with a Teacher", desc: "1-on-1 expert guidance", to: "/teachers", tag: "Premium" },
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
  { image: lessonVocabulary, label: "Vocabulary", desc: "New words in context" },
  { image: lessonConversation, label: "Conversation", desc: "Real dialogue practice" },
  { image: lessonGrammar, label: "Grammar", desc: "Rules & exercises" },
  { image: lessonSpeaking, label: "Speaking", desc: "Pronunciation drills" },
  { image: lessonExam, label: "Exam", desc: "Level assessments" },
  { image: lessonHomework, label: "Homework", desc: "Reinforce learning" },
];

const testimonials = [
  {
    quote: "It's not just a place to learn English, it's my second home.",
    name: "May Magdy",
    role: "Student",
    color: "from-rose-400 to-pink-500",
  },
  {
    quote: "I really love this place, everyone here is amazing. I'm lucky to have such a great family!",
    name: "Nour Elanany",
    role: "Student",
    color: "from-violet-400 to-purple-500",
  },
  {
    quote: "Without any compliments, I feel home in The English Club.",
    name: "Ahmed Yousry",
    role: "Student",
    color: "from-sky-400 to-blue-500",
  },
  {
    quote: "The teachers are so supportive and the atmosphere makes learning fun every single day.",
    name: "Sara Mohamed",
    role: "Student",
    color: "from-emerald-400 to-green-500",
  },
  {
    quote: "My English improved dramatically in just 3 months. The courses are well-structured and engaging.",
    name: "Omar Hassan",
    role: "Student",
    color: "from-amber-400 to-orange-500",
  },
  {
    quote: "PCC Competition changed my life. I went from shy to a confident public speaker!",
    name: "Mariam Khalil",
    role: "PCC Winner",
    color: "from-teal-400 to-cyan-500",
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
      <OnboardingTour />
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
        <PetalTopRight />
        <PetalBottomLeft />
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.06] dark:opacity-[0.04]" aria-hidden="true" />
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
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 rounded-full border bg-card/80 backdrop-blur-sm px-5 py-2.5 text-xs font-semibold text-muted-foreground shadow-soft mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Serving Alexandria since 2019
              <span className="h-3.5 w-px bg-border" />
              <span className="text-primary font-bold">500+ Students</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-4xl font-bold leading-[1.08] md:text-5xl lg:text-6xl xl:text-7xl font-display"
            >
              Master English with{" "}
              <TypingHero />
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
                    className="group relative flex flex-col items-center gap-2.5 rounded-2xl border bg-card/80 backdrop-blur-sm px-4 py-6 shadow-soft transition-all hover:shadow-elevated hover:border-primary/30 duration-300"
                  >
                    <span className="absolute top-2.5 right-2.5 text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full px-2 py-0.5">
                      {a.tag}
                    </span>
                    <motion.img 
                      src={a.image}
                      alt={a.title}
                      className="h-14 w-14 rounded-xl object-cover"
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.4 }}
                      loading="lazy"
                      width={56}
                      height={56}
                    />
                    <p className="text-sm font-semibold font-display">{a.title}</p>
                    <p className="text-[11px] text-muted-foreground">{a.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTINUE LEARNING ═══════════════ */}
      <ContinueLearning />

      {/* ═══════════════ WORD OF THE DAY + LEARNING GUIDE ═══════════════ */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <LearningGuide />
            </div>
            <WordOfTheDay />
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="border-y bg-muted/30 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={staggerItem}
                whileHover={{ scale: 1.05, y: -4 }}
                className="relative text-center group cursor-default"
              >
                <div className="inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-primary/10 mb-3 md:mb-4 group-hover:bg-primary group-hover:shadow-lg transition-all duration-300">
                  <s.icon className="h-5 w-5 md:h-6 md:w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary font-display">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs md:text-sm text-muted-foreground font-medium">{s.label}</p>
                {i < stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-border" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ TRUST BADGES ═══════════════ */}
      <section className="py-8 md:py-10 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
          >
            {[
              { icon: Shield, text: "Cambridge Aligned" },
              { icon: Clock, text: "7+ Years Experience" },
              { icon: Users, text: "500+ Graduates" },
              { icon: MapPin, text: "Alexandria, Egypt" },
              { icon: Award, text: "Certified Teachers" },
            ].map((badge) => (
              <motion.div
                key={badge.text}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2.5 rounded-full border bg-card/80 backdrop-blur-sm px-4 py-2.5 shadow-soft"
              >
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <badge.icon className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-xs md:text-sm font-semibold whitespace-nowrap">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="py-14 md:py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-primary" />
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">How It Works</p>
            </div>
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold font-display">
              Your Learning Journey in 4 Steps
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground text-sm md:text-base">
              Getting started is simple. Here's how The English Club takes you from enrollment to excellence.
            </p>
          </FadeInUp>

          <div className="mt-10 md:mt-14 relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-[3.5rem] left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4"
            >
              {howItWorks.map((item, i) => (
                <motion.div
                  key={item.step}
                  variants={staggerItem}
                  className="relative rounded-2xl border bg-card p-5 md:p-7 shadow-soft hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <item.icon className="h-4 w-4 md:h-5 md:w-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                      <span className="absolute -top-2 -right-2 h-5 w-5 md:h-6 md:w-6 rounded-full bg-primary text-primary-foreground text-[9px] md:text-[10px] font-bold flex items-center justify-center font-display shadow-sm">
                        {item.step}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-sm md:text-base font-semibold font-display">{item.title}</h3>
                  <p className="mt-1.5 md:mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section className="relative py-14 md:py-20 lg:py-28 overflow-hidden border-y bg-muted/20">
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
            <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground text-sm md:text-base">
              Everything you need to learn English — from beginner to advanced.
            </p>
          </FadeInUp>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-10 md:mt-14 grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={staggerItem}
                className={`relative rounded-2xl border bg-gradient-to-br ${f.color} p-5 md:p-7 shadow-soft transition-all hover:shadow-card hover:-translate-y-1.5 duration-300 group overflow-hidden`}
              >
                {/* Decorative corner glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className={`mb-4 md:mb-5 inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl ${f.accent} shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                    <f.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold font-display">{f.title}</h3>
                  <p className="mt-1.5 md:mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <FadeInUp delay={0.2}>
            <div className="mt-10 md:mt-12 flex flex-wrap justify-center gap-3">
              <Link to="/courses">
                <Button className="rounded-full font-semibold px-6 hover:scale-[1.02] transition-transform text-sm">
                  Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/fm">
                <Button variant="outline" className="rounded-full font-semibold px-6 hover:scale-[1.02] transition-transform text-sm">
                  <Radio className="mr-2 h-4 w-4" /> FM Radio
                </Button>
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ═══════════════ EVERY LESSON INCLUDES ═══════════════ */}
      <section className="py-14 md:py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">Lesson Structure</p>
            </div>
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold font-display">
              Every Lesson Includes
            </h2>
            <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground text-sm md:text-base">
              A complete learning experience in every session.
            </p>
          </FadeInUp>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-10 md:mt-12 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
          >
            {lessonIncludes.map((item, i) => (
              <motion.div
                key={item.label}
                variants={staggerItem}
                className="relative flex flex-col items-center rounded-2xl border bg-card p-4 md:p-6 shadow-soft transition-all hover:shadow-card hover:-translate-y-1.5 duration-300 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img src={item.image} alt={item.label} className="relative h-10 w-10 md:h-12 md:w-12 mb-2 md:mb-3 object-contain group-hover:scale-110 transition-transform duration-300 rounded-lg" loading="lazy" width={48} height={48} />
                <span className="relative text-xs md:text-sm font-semibold font-display text-center">{item.label}</span>
                <span className="relative text-[10px] md:text-[11px] text-muted-foreground mt-1 text-center hidden sm:block">{item.desc}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CLASSROOM BANNER ═══════════════ */}
      <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <img src={studentsLearning} alt="Students learning at The English Club" className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={1280} height={720} />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-secondary/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-lg"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground font-display">
                Learn in a Community That Inspires
              </h2>
              <p className="mt-3 text-primary-foreground/80 text-sm md:text-base leading-relaxed">
                Our classrooms are designed for collaboration, creativity, and real-world English practice.
              </p>
              <Link to="/signup">
                <Button size="lg" className="mt-6 rounded-full px-8 font-semibold shadow-lg">
                  Join Our Classes <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ MEET OUR TEACHERS ═══════════════ */}
      <section className="py-14 md:py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="flex items-center justify-center gap-2 mb-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">Our Team</p>
            </div>
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold font-display">
              Meet Our Expert Teachers
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground text-sm md:text-base">
              Certified, passionate, and dedicated to helping you achieve fluency.
            </p>
          </FadeInUp>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-10 md:mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto"
          >
            {[
              { img: teacher1, name: "Mr. Ahmed", role: "Senior Instructor", specialty: "IELTS & Business English", years: "5+ years" },
              { img: teacher2, name: "Ms. Nour", role: "Lead Teacher", specialty: "Kids & Conversation", years: "4+ years" },
              { img: teacher3, name: "Mr. Kareem", role: "Head of Curriculum", specialty: "Grammar & Academic Writing", years: "7+ years" },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="group relative rounded-2xl border bg-card overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300"
              >
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover object-top transition-transform group-hover:scale-105 duration-700" loading="lazy" width={512} height={640} />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-primary-foreground">
                      <Star className="h-3 w-3 fill-current" /> {t.years}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold font-display">{t.name}</h3>
                  <p className="text-xs text-primary font-medium mt-0.5">{t.role}</p>
                  <p className="text-xs text-muted-foreground mt-2">{t.specialty}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <FadeInUp delay={0.2}>
            <div className="mt-10 text-center">
              <Link to="/teachers">
                <Button variant="outline" className="rounded-full font-semibold px-6 hover:scale-[1.02] transition-transform text-sm">
                  View All Teachers <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ═══════════════ MILESTONES BANNER ═══════════════ */}
      <section className="relative h-48 md:h-56 overflow-hidden">
        <img src={classroomAerial} alt="The English Club classroom" className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={1280} height={512} />
        <div className="absolute inset-0 bg-secondary/75 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            >
              {[
                { icon: Globe2, value: "10+", label: "Nationalities" },
                { icon: Award, value: "50+", label: "PCC Winners" },
                { icon: BookOpen, value: "1000+", label: "Lessons Delivered" },
                { icon: Heart, value: "98%", label: "Satisfaction Rate" },
              ].map((m) => (
                <div key={m.label} className="flex flex-col items-center">
                  <m.icon className="h-5 w-5 text-primary-foreground/70 mb-2" />
                  <p className="text-2xl md:text-3xl font-bold text-primary-foreground font-display">{m.value}</p>
                  <p className="text-xs text-primary-foreground/70 mt-1">{m.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

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
      <section id="pcc" className="py-20 md:py-28 relative overflow-hidden">
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
            <div className="mt-10 rounded-2xl border bg-card shadow-soft overflow-hidden">
              <div className="flex flex-col md:flex-row items-stretch">
                {/* Left: Presentation image */}
                <div className="w-full md:w-2/5 relative group">
                  <img src={pccPresentation} alt="Student presenting at PCC" className="w-full h-64 md:h-full object-cover transition-transform group-hover:scale-105 duration-700" loading="lazy" width={1024} height={1024} />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
                </div>
                {/* Right: Content */}
                <div className="flex-1 p-7 md:p-10 flex flex-col justify-center">
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
                  {/* Awards mini gallery */}
                  <div className="mt-6 flex gap-3">
                    <div className="w-20 h-16 rounded-lg overflow-hidden border shadow-sm">
                      <img src={pccAwards} alt="PCC trophies" className="w-full h-full object-cover" loading="lazy" width={800} height={600} />
                    </div>
                    <div className="w-20 h-16 rounded-lg overflow-hidden border shadow-sm">
                      <img src={gallery7} alt="PCC event" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </div>
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

          {/* Infinite scrolling marquee — pauses on hover */}
          <div className="relative group/marquee">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-muted/20 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-muted/20 to-transparent z-10 pointer-events-none" />
            
            <div
              className="flex gap-5 overflow-hidden"
            >
              <div
                className="flex gap-5 animate-marquee group-hover/marquee:[animation-play-state:paused]"
                style={{ width: `${320 * testimonials.length * 2}px` }}
              >
                {[...testimonials, ...testimonials].map((t, i) => (
                  <div
                    key={`${t.name}-${i}`}
                    className="w-[300px] shrink-0 rounded-2xl border bg-card p-6 shadow-soft hover:shadow-elevated transition-shadow duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent rounded-l-2xl scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center shadow-sm`}>
                        <span className="text-xs font-bold text-white">
                          {t.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold font-display">{t.name}</p>
                        <p className="text-[11px] text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-3">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "{t.quote}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
        {/* Decorative shapes + floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-primary-foreground/5 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-primary-foreground/5 blur-3xl" />
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary-foreground/10"
              style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.7,
                ease: "easeInOut",
              }}
            />
          ))}
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
      <SocialProofToast />
      <ScrollToTopButton />
    </div>
  );
}
