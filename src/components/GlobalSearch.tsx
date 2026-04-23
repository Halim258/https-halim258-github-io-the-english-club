import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Radio, MessageCircle, Trophy, Mic2, Users, GraduationCap, Brain, Command, ArrowRight } from "lucide-react";

const pages = [
  { path: "/courses", label: "Courses", icon: BookOpen, keywords: "lessons learn study" },
  { path: "/courses/a1", label: "A1 — Beginner", icon: GraduationCap, keywords: "beginner start" },
  { path: "/courses/a2", label: "A2 — Elementary", icon: GraduationCap, keywords: "elementary" },
  { path: "/courses/b1", label: "B1 — Intermediate", icon: GraduationCap, keywords: "intermediate" },
  { path: "/courses/b2", label: "B2 — Upper-Intermediate", icon: GraduationCap, keywords: "upper intermediate" },
  { path: "/courses/c1", label: "C1 — Advanced", icon: GraduationCap, keywords: "advanced" },
  { path: "/courses/c2", label: "C2 — Proficiency", icon: GraduationCap, keywords: "proficiency mastery" },
  { path: "/courses/kids", label: "Kids Course", icon: BookOpen, keywords: "children young" },
  { path: "/courses/stories", label: "Stories Course", icon: BookOpen, keywords: "reading stories" },
  { path: "/courses/movies", label: "Movies Course", icon: BookOpen, keywords: "film cinema" },
  { path: "/fm", label: "FM Radio", icon: Radio, keywords: "listen music radio" },
  { path: "/dictionary", label: "Dictionary", icon: Search, keywords: "words definition meaning" },
  { path: "/flashcards", label: "Flashcards", icon: Brain, keywords: "vocabulary review cards" },
  { path: "/ai-tutor", label: "AI Tutor", icon: MessageCircle, keywords: "chat ai help" },
  { path: "/community", label: "Community", icon: Users, keywords: "social posts" },
  { path: "/leaderboard", label: "Leaderboard", icon: Trophy, keywords: "ranking xp points" },
  { path: "/pronunciation", label: "Pronunciation Checker", icon: Mic2, keywords: "speaking accent" },
  { path: "/placement-test", label: "Placement Test", icon: GraduationCap, keywords: "test level cefr" },
  { path: "/teachers", label: "Teachers", icon: Users, keywords: "book teacher tutor" },
  { path: "/groups", label: "Groups", icon: Users, keywords: "class schedule" },
  { path: "/dashboard", label: "My Dashboard", icon: GraduationCap, keywords: "progress stats" },
];

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const filtered = query.trim()
    ? pages.filter(p =>
        p.label.toLowerCase().includes(query.toLowerCase()) ||
        p.keywords.toLowerCase().includes(query.toLowerCase())
      )
    : pages.slice(0, 8);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => { setSelectedIdx(0); }, [query]);

  const go = useCallback((path: string) => {
    setOpen(false);
    navigate(path);
  }, [navigate]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIdx]) {
      go(filtered[selectedIdx].path);
    }
  };

  const quickSearches = ["IELTS", "Speaking", "Kids", "Business", "Safety", "Engineering"];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[100]"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-[101] rounded-2xl border bg-card shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search pages, courses, tools..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                ESC
              </kbd>
            </div>
            {!query.trim() && (
              <div className="border-b px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {quickSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="rounded-full border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="max-h-[300px] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-muted-foreground">No results found</p>
              ) : (
                filtered.map((page, i) => (
                  <button
                    key={page.path}
                    onClick={() => go(page.path)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      i === selectedIdx ? "bg-primary/8 text-primary" : "text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    <page.icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-left font-medium">{page.label}</span>
                    {i === selectedIdx && <ArrowRight className="h-3.5 w-3.5" />}
                  </button>
                ))
              )}
            </div>
            <div className="border-t px-4 py-2 flex items-center gap-4 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><kbd className="rounded border px-1 py-0.5">↑↓</kbd> Navigate</span>
              <span className="flex items-center gap-1"><kbd className="rounded border px-1 py-0.5">↵</kbd> Open</span>
              <span className="flex items-center gap-1"><kbd className="rounded border px-1 py-0.5">esc</kbd> Close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
