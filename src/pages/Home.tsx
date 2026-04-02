import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, Star, Users, Award, GraduationCap, Headphones, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";

const tracks = [
  {
    icon: BookOpen,
    title: "General English",
    desc: "Structured A1→C2 curriculum following the Cambridge framework with grammar, vocabulary, speaking & exams.",
    to: "/courses",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Headphones,
    title: "Listening & Speaking",
    desc: "Conversational practice with real-world dialogues, pronunciation drills, and AI-powered speaking exercises.",
    to: "/courses",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: PenLine,
    title: "Writing & Reading",
    desc: "Build reading comprehension and writing skills through guided exercises and essay practice.",
    to: "/courses",
    color: "bg-secondary/10 text-secondary",
  },
];

const stats = [
  { icon: Users, value: "10,000+", label: "Students" },
  { icon: Star, value: "4.9", label: "Rating" },
  { icon: Award, value: "200+", label: "Lessons" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary font-sans">
            Master English with Confidence
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Your Path to{" "}
            <span className="text-primary">English Fluency</span>{" "}
            Starts Here
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground font-sans">
            Cambridge-aligned curriculum from beginner to advanced — with structured lessons, live teachers, and AI practice.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/courses">
              <Button size="lg">
                Start Learning <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/teachers">
              <Button variant="outline" size="lg">
                Find a Teacher
              </Button>
            </Link>
          </div>

          <div className="mx-auto mt-12 max-w-md rounded-xl border bg-card p-6 shadow-card">
            <p className="text-3xl font-bold leading-relaxed text-foreground">
              Hello, World! 👋
            </p>
            <p className="mt-2 text-muted-foreground font-sans">Your first step towards English mastery</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-card py-10">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-12 px-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground font-sans">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tracks */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold">Choose Your Learning Path</h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground font-sans">
            Three focused tracks designed to build well-rounded English skills.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {tracks.map((t) => (
              <Link
                key={t.title}
                to={t.to}
                className="group rounded-xl border bg-card p-6 shadow-soft transition-shadow hover:shadow-card"
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${t.color}`}>
                  <t.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground font-sans">{t.desc}</p>
                <p className="mt-4 inline-flex items-center text-sm font-medium text-primary font-sans">
                  Explore <ArrowRight className="ml-1 h-3 w-3" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground">
            Ready to Start Your English Journey?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/80 font-sans">
            Join thousands of students learning English with our Cambridge-aligned curriculum and expert teachers.
          </p>
          <Link to="/signup" className="mt-6 inline-block">
            <Button size="lg" variant="secondary">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
