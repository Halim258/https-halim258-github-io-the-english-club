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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur-lg md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="flex items-center justify-around py-1.5 px-1">
        {navItems.map(item => {
          const isActive = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl transition-colors min-w-[56px] min-h-[48px] justify-center touch-manipulation active:scale-95 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute -top-1.5 h-0.5 w-8 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon className={`h-5 w-5 transition-transform ${isActive ? "scale-110" : ""}`} />
              <span className={`text-[10px] font-medium ${isActive ? "font-semibold" : ""}`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
