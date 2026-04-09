import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Confidence", "Fluency", "Success", "Excellence", "Passion"];

export default function TypingHero() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((i) => (i + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block min-w-[180px] md:min-w-[260px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[wordIdx]}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-gradient"
        >
          {words[wordIdx]}
        </motion.span>
      </AnimatePresence>
      <motion.svg
        className="absolute -bottom-2 left-0 w-full"
        viewBox="0 0 200 12"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <motion.path
          d="M2 8 Q50 2 100 6 Q150 10 198 4"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </motion.svg>
    </span>
  );
}
