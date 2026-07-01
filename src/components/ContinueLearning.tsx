import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export default function ContinueLearning() {
  const { user } = useAuth();
  const [next, setNext] = useState<{ level_id: string; lesson_number: number; fresh: boolean } | null>(null);

  useEffect(() => {
    if (!user) {
      setNext({ level_id: "a1", lesson_number: 1, fresh: true });
      return;
    }
    supabase
      .from("lesson_progress")
      .select("level_id, lesson_number, completed, completed_at, updated_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .then(({ data }) => {
        if (!data || data.length === 0) {
          setNext({ level_id: "a1", lesson_number: 1, fresh: true });
          return;
        }
        // Pick most recently touched level
        const level = data[0].level_id;
        const completedInLevel = new Set(
          data.filter((r) => r.level_id === level && r.completed).map((r) => r.lesson_number)
        );
        // Find first gap starting at 1
        let n = 1;
        while (completedInLevel.has(n)) n++;
        setNext({ level_id: level, lesson_number: n, fresh: false });
      });
  }, [user]);

  if (!next) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="container mx-auto px-4 -mt-6 mb-8 relative z-20"
    >
      <div className="rounded-2xl border bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 p-5 md:p-6 shadow-soft flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Flame className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold font-display">Continue Learning</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Pick up where you left off — <span className="font-medium text-foreground">{lastLesson.level_id.toUpperCase()}</span>, Lesson {nextNum}
            </p>
          </div>
        </div>
        <Link to={`/courses/${lastLesson.level_id}/${nextNum}/slides`}>
          <Button size="sm" className="rounded-full font-semibold gap-1.5 px-5">
            <BookOpen className="h-3.5 w-3.5" /> Resume <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </motion.section>
  );
}
