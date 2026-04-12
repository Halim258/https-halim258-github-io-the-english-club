import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Award, Trophy, BookOpen, Star, Zap, TrendingUp, GraduationCap, Flame, Crown, Target, Sparkles, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { FadeInUp } from "@/components/AnimatedSection";

const ALL_BADGES: Record<string, { icon: React.ElementType; label: string; desc: string; category: string }> = {
  first_test: { icon: GraduationCap, label: "First Test", desc: "Completed your first placement test", category: "Milestones" },
  five_lessons: { icon: BookOpen, label: "Getting Started", desc: "Completed 5 lessons", category: "Milestones" },
  ten_lessons: { icon: Star, label: "Dedicated Learner", desc: "Completed 10 lessons", category: "Milestones" },
  twenty_lessons: { icon: Crown, label: "Committed", desc: "Completed 20 lessons", category: "Milestones" },
  fifty_lessons: { icon: Trophy, label: "Half Century", desc: "Completed 50 lessons", category: "Milestones" },
  hundred_lessons: { icon: Sparkles, label: "Century Club", desc: "Completed 100 lessons", category: "Milestones" },
  perfect_score: { icon: Trophy, label: "Perfect Score", desc: "Scored 100% on a test", category: "Excellence" },
  streak_3: { icon: Zap, label: "On Fire", desc: "3-day study streak", category: "Streaks" },
  streak_7: { icon: Flame, label: "Week Warrior", desc: "7-day study streak", category: "Streaks" },
  streak_30: { icon: Crown, label: "Monthly Master", desc: "30-day study streak", category: "Streaks" },
  level_up: { icon: TrendingUp, label: "Level Up", desc: "Improved your CEFR level", category: "Growth" },
  first_bookmark: { icon: Target, label: "Bookworm", desc: "Bookmarked your first lesson", category: "Engagement" },
  community_post: { icon: Award, label: "Social Learner", desc: "Made a community post", category: "Engagement" },
};

const categories = ["Milestones", "Streaks", "Excellence", "Growth", "Engagement"];

export default function Achievements() {
  const { user } = useAuth();
  const [earned, setEarned] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("achievements")
      .select("badge_key")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (data) setEarned(new Set(data.map(d => d.badge_key)));
        setLoading(false);
      });
  }, [user]);

  const earnedCount = earned.size;
  const totalCount = Object.keys(ALL_BADGES).length;
  const percentage = Math.round((earnedCount / totalCount) * 100);

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950/20 dark:via-background dark:to-orange-950/20 py-12">
        <div className="container mx-auto px-4">
          <Link to="/dashboard" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Dashboard
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
              <Award className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display">Achievements</h1>
              <p className="text-muted-foreground mt-1">
                {earnedCount}/{totalCount} unlocked ({percentage}%)
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 max-w-md">
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          {loading ? (
            <div className="text-center py-16 text-muted-foreground">Loading...</div>
          ) : (
            <div className="space-y-8">
              {categories.map(cat => {
                const badges = Object.entries(ALL_BADGES).filter(([, b]) => b.category === cat);
                return (
                  <FadeInUp key={cat}>
                    <h2 className="text-lg font-bold font-display mb-3 flex items-center gap-2">
                      {cat}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {badges.map(([key, badge], i) => {
                        const isEarned = earned.has(key);
                        return (
                          <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={isEarned ? { scale: 1.03 } : {}}
                            className={`relative rounded-2xl border p-4 text-center transition-all ${
                              isEarned
                                ? "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800 shadow-sm"
                                : "bg-muted/30 opacity-60"
                            }`}
                          >
                            {!isEarned && (
                              <Lock className="absolute top-2 right-2 h-3.5 w-3.5 text-muted-foreground" />
                            )}
                            <div className={`flex h-12 w-12 mx-auto items-center justify-center rounded-xl mb-2 ${
                              isEarned ? "bg-gradient-to-br from-amber-400 to-orange-500" : "bg-muted"
                            }`}>
                              <badge.icon className={`h-6 w-6 ${isEarned ? "text-white" : "text-muted-foreground"}`} />
                            </div>
                            <p className="text-sm font-bold">{badge.label}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{badge.desc}</p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </FadeInUp>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
