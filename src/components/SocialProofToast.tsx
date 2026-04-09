import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, BookOpen, Trophy } from "lucide-react";

const notifications = [
  { icon: "🎓", text: "Sara just completed B1 Lesson 5", time: "2 min ago" },
  { icon: "🏆", text: "Omar earned the Perfect Score badge", time: "5 min ago" },
  { icon: "📚", text: "Mariam started the C1 Advanced course", time: "8 min ago" },
  { icon: "✅", text: "Ahmed completed 10 lessons this week", time: "12 min ago" },
  { icon: "🌟", text: "Nour reached a 7-day streak", time: "15 min ago" },
];

export default function SocialProofToast() {
  const [current, setCurrent] = useState(-1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Start after 5 seconds, show each for 4 seconds with 8 second gap
    const startDelay = setTimeout(() => {
      setCurrent(0);
      setVisible(true);
    }, 5000);

    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (current < 0) return;

    const hideTimer = setTimeout(() => setVisible(false), 4000);
    const nextTimer = setTimeout(() => {
      setCurrent((c) => (c + 1) % notifications.length);
      setVisible(true);
    }, 8000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [current]);

  if (current < 0) return null;
  const notif = notifications[current];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-6 z-40 max-w-[280px] rounded-xl border bg-card/95 backdrop-blur-sm p-3.5 shadow-elevated flex items-center gap-3 cursor-default"
        >
          <span className="text-xl shrink-0">{notif.icon}</span>
          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground leading-snug truncate">{notif.text}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{notif.time}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
