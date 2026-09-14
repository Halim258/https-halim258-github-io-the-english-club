import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Radio, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RadioBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="relative z-20 mx-auto mb-4 max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <Link
        to="/fm"
        aria-label="Listen to live English radio"
        className="block cursor-pointer border border-border bg-card px-4 py-4 shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/[0.03] sm:px-5"
      >
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-primary/25 bg-primary/5">
              <Radio className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Listen &amp; Learn</p>
              <p className="mt-1 truncate font-display text-base font-bold text-foreground">
                Live English Radio
                <span className="font-normal text-muted-foreground"> — news, talk shows &amp; music</span>
              </p>
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                19 stations
              </p>
            </div>
          </div>
          <div className="w-full shrink-0 sm:w-auto">
            <Button size="sm" variant="editorial" className="pointer-events-none w-full gap-1.5 px-5 font-semibold sm:w-auto">
              <Headphones className="h-3.5 w-3.5" /> Listen <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.section>
  );
}
