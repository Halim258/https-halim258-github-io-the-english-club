import { motion } from "framer-motion";
import { forwardRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const FadeInUp = forwardRef<HTMLDivElement, Props>(function FadeInUp({ children, className, delay = 0 }, ref) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
      ref={ref}
    >
      {children}
    </motion.div>
  );
});

export const FadeIn = forwardRef<HTMLDivElement, Props>(function FadeIn({ children, className, delay = 0 }, ref) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
      ref={ref}
    >
      {children}
    </motion.div>
  );
});

export const ScaleIn = forwardRef<HTMLDivElement, Props>(function ScaleIn({ children, className, delay = 0 }, ref) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={className}
      ref={ref}
    >
      {children}
    </motion.div>
  );
});

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};
