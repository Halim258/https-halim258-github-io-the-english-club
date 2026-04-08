import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, Moon, Sun, User, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import StudyReminder from "@/components/StudyReminder";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.jpg";

const primaryLinks = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/dictionary", label: "Dictionary" },
  { to: "/flashcards", label: "Flashcards" },
  { to: "/ai-tutor", label: "AI Tutor" },
  { to: "/community", label: "Community" },
];

const moreLinks = [
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/pronunciation", label: "🎙️ Pronunciation" },
  { to: "/placement-test", label: "📝 Placement Test" },
  { to: "/fm", label: "📻 FM Radio" },
];

const allNavLinks = [...primaryLinks, ...moreLinks];

const homeSections = [
  { id: "gallery", label: "Gallery" },
  { id: "pcc", label: "PCC" },
  { id: "testimonials", label: "Reviews" },
  { id: "faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const [scrolled, setScrolled] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const { user, loading: authLoading } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => { setOpen(false); setMoreOpen(false); }, [location.pathname]);

  // Close "More" dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  }, [isHome, navigate]);

  return (
    <nav className={`sticky top-0 z-50 border-b transition-all duration-300 ${
      scrolled 
        ? "bg-card/85 glass-morphism shadow-soft border-border/80" 
        : "bg-card/95 backdrop-blur-md border-transparent"
    }`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <motion.img 
            src={logo} 
            alt="The English Club Logo" 
            className="h-10 w-10 flex-shrink-0 rounded-lg shadow-sm"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
          <span className="text-lg font-bold text-foreground font-display tracking-tight whitespace-nowrap leading-tight group-hover:text-primary transition-colors duration-200">
            The English Club
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((l) => {
            const isActive = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className="relative rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 group"
              >
                <span className={isActive ? "text-primary font-semibold" : "text-muted-foreground group-hover:text-foreground"}>
                  {l.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-full bg-primary/8 border border-primary/15"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          <div className="mx-1.5 h-4 w-px bg-border/60" />
          <div className="flex items-center gap-0.5 rounded-full bg-muted/40 px-1 py-0.5">
            {homeSections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="rounded-full px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all duration-200"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop auth buttons */}
        <div className="hidden items-center gap-1.5 md:flex">
          <StudyReminder />
          <motion.button
            onClick={() => setDark(!dark)}
            className="rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label="Toggle dark mode"
            whileTap={{ scale: 0.9, rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={dark ? "sun" : "moon"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
          {authLoading ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
          ) : user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="rounded-full gap-1.5 hover:bg-primary/8 hover:text-primary transition-colors">
                  <User className="h-4 w-4" />
                  <span className="max-w-[80px] truncate">{user.email?.split("@")[0]}</span>
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="rounded-full gap-1 hover:border-destructive/30 hover:text-destructive hover:bg-destructive/5 transition-colors" onClick={handleLogout}>
                <LogOut className="h-3.5 w-3.5" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/signup">
                <Button size="sm" className="rounded-full px-5 font-semibold shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200">
                  Sign Up Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="sm" className="rounded-full px-5 font-semibold hover:scale-[1.02] transition-all duration-200">
                  Log In
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <motion.button
          className="md:hidden p-2 text-foreground rounded-lg hover:bg-muted/50 transition-colors"
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={open ? "close" : "menu"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden border-t bg-card/95 backdrop-blur-xl md:hidden"
          >
            <div className="p-4 flex flex-col gap-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-medium flex items-center justify-between transition-colors ${
                      location.pathname === l.to ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted/50 active:bg-muted"
                    }`}
                  >
                    {l.label}
                    {location.pathname === l.to && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  </Link>
                </motion.div>
              ))}
              <hr className="my-2 border-border/60" />
              <p className="px-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">Jump to</p>
              <div className="grid grid-cols-2 gap-1">
                {homeSections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground text-left hover:bg-muted/50 active:bg-muted transition-colors"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <hr className="my-2 border-border/60" />
              <button
                onClick={() => setDark(!dark)}
                className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-colors"
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {dark ? "Light Mode" : "Dark Mode"}
              </button>
              {authLoading ? (
                <div className="space-y-2 mt-2">
                  <Skeleton className="h-11 w-full rounded-xl" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
              ) : user ? (
                <div className="mt-2 space-y-2">
                  <Link to="/dashboard" onClick={() => setOpen(false)}>
                    <Button size="sm" className="w-full rounded-xl font-semibold gap-1.5 h-11">
                      <User className="h-4 w-4" /> Dashboard
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="w-full rounded-xl font-semibold gap-1 h-11 hover:border-destructive/30 hover:text-destructive" onClick={() => { setOpen(false); handleLogout(); }}>
                    <LogOut className="h-3.5 w-3.5" /> Logout
                  </Button>
                </div>
              ) : (
                <div className="mt-2 space-y-2">
                  <Link to="/signup" onClick={() => setOpen(false)}>
                    <Button size="sm" className="w-full rounded-xl font-semibold h-11">Sign Up Free</Button>
                  </Link>
                  <Link to="/login" onClick={() => setOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full rounded-xl font-semibold h-11">Log In</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
