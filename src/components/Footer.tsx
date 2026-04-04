import { Link } from "react-router-dom";
import { Facebook, MapPin, Phone, Mail, MessageCircle } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/courses" },
  { label: "Teachers", to: "/teachers" },
  { label: "Login", to: "/login" },
  { label: "Sign Up", to: "/signup" },
];

const levels = [
  { label: "A1 Beginner", to: "/courses/a1" },
  { label: "A2 Elementary", to: "/courses/a2" },
  { label: "B1 Intermediate", to: "/courses/b1" },
  { label: "B2 Upper-Int", to: "/courses/b2" },
  { label: "C1 Advanced", to: "/courses/c1" },
  { label: "C2 Mastery", to: "/courses/c2" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold font-display">The English Club</h3>
            <p className="mt-2 text-sm text-secondary-foreground/70">
              Cutting-edge methods for fast-paced English language acquisition since 2019.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.facebook.com/TheEnglishClubEG"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=%2B201554901390"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold font-display uppercase tracking-wider text-secondary-foreground/60">Quick Links</h4>
            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-secondary-foreground/70 transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Levels */}
          <div>
            <h4 className="text-sm font-semibold font-display uppercase tracking-wider text-secondary-foreground/60">Levels</h4>
            <ul className="mt-3 space-y-2">
              {levels.map((level) => (
                <li key={level.to}>
                  <Link to={level.to} className="text-sm text-secondary-foreground/70 transition-colors hover:text-primary">
                    {level.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold font-display uppercase tracking-wider text-secondary-foreground/60">Contact Us</h4>
            <ul className="mt-3 space-y-3">
              <li className="flex items-start gap-2 text-sm text-secondary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                Alexandria, Egypt
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=%2B201554901390"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  +20 155 490 1390
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-4 text-center text-xs text-secondary-foreground/50">
          © {new Date().getFullYear()} The English Club Language School. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
