import { Link } from "react-router-dom";
import { Facebook, MapPin, Phone, MessageCircle, GraduationCap, Heart, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/courses" },
  { label: "Teachers", to: "/teachers" },
  { label: "Placement Test", to: "/placement-test" },
  { label: "AI Tutor", to: "/ai-tutor" },
];

const levels = [
  { label: "A1 Beginner", to: "/courses/a1" },
  { label: "A2 Elementary", to: "/courses/a2" },
  { label: "B1 Intermediate", to: "/courses/b1" },
  { label: "B2 Upper-Int", to: "/courses/b2" },
  { label: "C1 Advanced", to: "/courses/c1" },
  { label: "C2 Mastery", to: "/courses/c2" },
];

const tools = [
  { label: "Dictionary", to: "/dictionary" },
  { label: "Flashcards", to: "/flashcards" },
  { label: "FM Radio", to: "/fm" },
  { label: "Community", to: "/community" },
  { label: "Leaderboard", to: "/leaderboard" },
];

export default function Footer() {
  return (
    <footer className="relative border-t bg-secondary text-secondary-foreground overflow-hidden">
      {/* Subtle decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/[0.03] rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 py-10 md:py-14 relative">
        <div className="grid gap-8 grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-sm">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display leading-tight">The English Club</h3>
                <p className="text-[11px] text-secondary-foreground/50 font-medium tracking-wider uppercase">Language School</p>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground/60 leading-relaxed max-w-xs">
              Cutting-edge methods for fast-paced English language acquisition. Join thousands of learners since 2019.
            </p>
            <div className="mt-5 flex gap-2.5">
              <a
                href="https://www.facebook.com/TheEnglishClubEG"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-foreground/5 border border-secondary-foreground/10 transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-105"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=%2B201554901390"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-foreground/5 border border-secondary-foreground/10 transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-secondary-foreground/40 mb-4">Navigate</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="group flex items-center gap-1 text-sm text-secondary-foreground/60 transition-colors hover:text-primary">
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Levels */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-secondary-foreground/40 mb-4">Levels</h4>
            <ul className="space-y-2.5">
              {levels.map((level) => (
                <li key={level.to}>
                  <Link to={level.to} className="group flex items-center gap-1 text-sm text-secondary-foreground/60 transition-colors hover:text-primary">
                    {level.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-secondary-foreground/40 mb-4">Tools</h4>
            <ul className="space-y-2.5 mb-6">
              {tools.map((tool) => (
                <li key={tool.to}>
                  <Link to={tool.to} className="group flex items-center gap-1 text-sm text-secondary-foreground/60 transition-colors hover:text-primary">
                    {tool.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-widest text-secondary-foreground/40 mb-3">Contact</h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2 text-sm text-secondary-foreground/60">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary/70" />
                Alexandria, Egypt
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=%2B201554901390"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-secondary-foreground/60 transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 mt-0.5 shrink-0 text-primary/70" />
                  +20 155 490 1390
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter / Quick action bar */}
      <div className="border-t border-secondary-foreground/8 bg-secondary-foreground/[0.03]">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-secondary-foreground/90">Ready to start learning?</p>
              <p className="text-xs text-secondary-foreground/50">Join 500+ students already improving their English</p>
            </div>
          </div>
          <Link to="/signup">
            <button className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Get Started Free →
            </button>
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-secondary-foreground/8">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-secondary-foreground/40">
            © {new Date().getFullYear()} The English Club Language School. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xs text-secondary-foreground/40 hover:text-primary transition-colors flex items-center gap-1"
            >
              Back to top ↑
            </button>
            <p className="text-xs text-secondary-foreground/40 flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-primary/60 fill-primary/60" /> in Alexandria
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
