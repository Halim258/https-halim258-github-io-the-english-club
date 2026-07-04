import { Link, useLocation } from "react-router-dom";
import { BookOpen, Home, Trophy, User, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/courses", icon: BookOpen, label: "Courses" },
  { to: "/ai-tutor", icon: Brain, label: "AI Tutor" },
  { to: "/leaderboard", icon: Trophy, label: "Board" },
  { to: "/dashboard", icon: User, label: "Profile" },
];

export default function MobileBottomNav() {
  const { pathname } = useLocation();
  const { user } = useAuth();

  if (!user) return null;

  // Don't show on lesson/slide pages
  if (pathname.includes("/slides") || pathname.includes("/admin") || pathname.includes("/teacher")) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-foreground/15 bg-background/95 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-center justify-around px-2">
        {navItems.map(item => {
          const isActive = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex flex-col items-center gap-1 px-3 pt-2.5 pb-2 min-w-[56px] min-h-[52px] justify-center touch-manipulation active:opacity-70 transition-colors ${
                isActive ? "text-primary" : "text-foreground/60"
              }`}
            >
              <item.icon className="h-[22px] w-[22px]" strokeWidth={isActive ? 2.2 : 1.6} />
              <span
                className="text-[10px] font-editorial-mono uppercase tracking-widest font-semibold"
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute -top-px left-1/2 -translate-x-1/2 h-[2px] w-8 bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
