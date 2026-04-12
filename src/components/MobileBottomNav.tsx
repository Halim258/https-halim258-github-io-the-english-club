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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur-xl md:hidden shadow-[0_-2px_20px_-4px_rgba(0,0,0,0.1)]" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="flex items-center justify-around py-1 px-2">
        {navItems.map(item => {
          const isActive = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-2.5 rounded-2xl transition-all min-w-[56px] min-h-[48px] justify-center touch-manipulation active:scale-90 duration-150 ${
                isActive ? "text-primary" : "text-muted-foreground active:text-foreground"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute inset-0 rounded-2xl bg-primary/8"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <item.icon className={`h-5 w-5 relative z-10 transition-transform duration-200 ${isActive ? "scale-110" : ""}`} />
              <span className={`text-[10px] relative z-10 font-medium transition-colors ${isActive ? "font-bold text-primary" : ""}`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
