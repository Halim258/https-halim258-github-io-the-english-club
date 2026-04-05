import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Curriculum & Lessons" },
  { to: "/teachers", label: "Find a Teacher" },
];

const homeSections = [
  { id: "gallery", label: "Gallery" },
  { id: "pcc", label: "PCC" },
  { id: "testimonials", label: "Reviews" },
  { id: "faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const scrollToSection = useCallback((id: string) => {
    setOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  }, [isHome, navigate]);

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex items-center gap-2">
            <img src={logo} alt="The English Club Logo" className="h-10 w-10" />
            <span className="text-lg font-bold text-foreground font-display tracking-tight">
              The English Club <span className="hidden sm:inline text-xs font-normal text-muted-foreground ml-1">Alexandria</span>
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === l.to
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {/* Section links (visible when on home or always as quick nav) */}
          <div className="mx-1 h-4 w-px bg-border" />
          {homeSections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className="rounded-full px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Desktop auth buttons */}
        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={() => setDark(!dark)}
            className="rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link to="/signup">
            <Button size="sm" className="rounded-full px-5 font-semibold">
              Sign Up Free
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="sm" className="rounded-full px-5 font-semibold">
              Log In
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t bg-card p-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  location.pathname === l.to ? "bg-primary/10 text-primary" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <hr className="my-2 border-border" />
            <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">Jump to</p>
            {homeSections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground text-left hover:text-foreground"
              >
                {s.label}
              </button>
            ))}
            <hr className="my-2 border-border" />
            <button
              onClick={() => setDark(!dark)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {dark ? "Light Mode" : "Dark Mode"}
            </button>
            <Link to="/signup" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full rounded-full font-semibold">Sign Up Free</Button>
            </Link>
            <Link to="/login" onClick={() => setOpen(false)}>
              <Button variant="outline" size="sm" className="w-full rounded-full font-semibold">Log In</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
