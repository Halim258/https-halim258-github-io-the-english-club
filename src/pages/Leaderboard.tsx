import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Trophy, Flame, Star, Medal, Crown, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface LeaderboardEntry {
  user_id: string;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  full_name: string | null;
  avatar_url: string | null;
}

const rankEmojis = ["👑", "🥈", "🥉"];
const xpBadges = [
  { min: 0, label: "Beginner", emoji: "🌱", color: "bg-emerald-100 text-emerald-700" },
  { min: 100, label: "Explorer", emoji: "🌿", color: "bg-green-100 text-green-700" },
  { min: 500, label: "Learner", emoji: "📚", color: "bg-blue-100 text-blue-700" },
  { min: 1000, label: "Scholar", emoji: "🎓", color: "bg-violet-100 text-violet-700" },
  { min: 2500, label: "Expert", emoji: "🚀", color: "bg-amber-100 text-amber-700" },
  { min: 5000, label: "Master", emoji: "👑", color: "bg-rose-100 text-rose-700" },
];

function getXPBadge(xp: number) {
  return [...xpBadges].reverse().find((b) => xp >= b.min) || xpBadges[0];
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("user_xp")
        .select("user_id, total_xp, current_streak, longest_streak")
        .order("total_xp", { ascending: false })
        .limit(50);

      if (!data || data.length === 0) {
        setEntries([]);
        setLoading(false);
        return;
      }

      // Fetch profiles
      const userIds = data.map((d) => d.user_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url")
        .in("id", userIds);

      const profileMap = new Map(profiles?.map((p) => [p.id, p]) || []);

      setEntries(
        data.map((d) => ({
          ...d,
          full_name: profileMap.get(d.user_id)?.full_name || "Student",
          avatar_url: profileMap.get(d.user_id)?.avatar_url || null,
        }))
      );
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950/20 dark:via-background dark:to-orange-950/20 py-12">
        <div className="container mx-auto px-4">
          <Link to="/courses" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Back to Courses
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">🏆</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display">Leaderboard</h1>
              <p className="text-muted-foreground mt-1">Compete with other learners — earn XP by completing lessons</p>
            </div>
          </div>
        </div>
      </section>

      {/* XP System Info */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-card border">
              <Zap className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-xs text-muted-foreground">Complete a lesson</p>
                <p className="font-bold text-sm">+50 XP</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-card border">
              <Star className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-xs text-muted-foreground">Perfect quiz score</p>
                <p className="font-bold text-sm">+100 XP</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-card border">
              <Flame className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-xs text-muted-foreground">Daily streak bonus</p>
                <p className="font-bold text-sm">+25 XP/day</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Table */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          {loading ? (
            <div className="text-center py-16 text-muted-foreground">Loading...</div>
          ) : entries.length === 0 ? (
            <div className="text-center py-16">
              <Trophy className="h-16 w-16 mx-auto text-muted-foreground/20 mb-4" />
              <h2 className="text-xl font-bold font-display mb-2">No learners yet!</h2>
              <p className="text-muted-foreground mb-4">Be the first to earn XP by completing lessons</p>
              <Link to="/courses">
                <Button className="rounded-full">Start Learning</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {entries.map((entry, i) => {
                const badge = getXPBadge(entry.total_xp);
                const isMe = entry.user_id === user?.id;
                return (
                  <motion.div
                    key={entry.user_id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Card className={`overflow-hidden ${isMe ? "border-primary/50 bg-primary/5" : ""} ${i < 3 ? "border-amber-300/50" : ""}`}>
                      <CardContent className="p-3 flex items-center gap-3">
                        {/* Rank */}
                        <div className="w-8 text-center shrink-0">
                          {i < 3 ? (
                            <span className="text-2xl">{rankEmojis[i]}</span>
                          ) : (
                            <span className="text-sm font-bold text-muted-foreground">{i + 1}</span>
                          )}
                        </div>
                        {/* Avatar */}
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-lg shrink-0">
                          {badge.emoji}
                        </div>
                        {/* Name */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-sm truncate">{entry.full_name}</p>
                            {isMe && <Badge className="text-[10px] px-1.5 py-0">You</Badge>}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${badge.color}`}>
                              {badge.label}
                            </Badge>
                            {entry.current_streak > 0 && (
                              <span className="text-[10px] text-orange-500 flex items-center gap-0.5">
                                <Flame className="h-3 w-3" /> {entry.current_streak}d streak
                              </span>
                            )}
                          </div>
                        </div>
                        {/* XP */}
                        <div className="text-right shrink-0">
                          <p className="font-bold text-primary">{entry.total_xp.toLocaleString()}</p>
                          <p className="text-[10px] text-muted-foreground">XP</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
