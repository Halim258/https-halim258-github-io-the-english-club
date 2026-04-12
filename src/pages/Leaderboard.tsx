import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Trophy, Flame, Star, Medal, Crown, Zap, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface LeaderboardEntry {
  user_id: string;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
  full_name: string | null;
  avatar_url: string | null;
}

const rankEmojis = ["👑", "🥈", "🥉"];
const xpBadges = [
  { min: 0, label: "Beginner", emoji: "🌱", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { min: 100, label: "Explorer", emoji: "🌿", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  { min: 500, label: "Learner", emoji: "📚", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  { min: 1000, label: "Scholar", emoji: "🎓", color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" },
  { min: 2500, label: "Expert", emoji: "🚀", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  { min: 5000, label: "Master", emoji: "👑", color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" },
];

type TimeFilter = "all" | "monthly" | "weekly";

function getXPBadge(xp: number) {
  return [...xpBadges].reverse().find((b) => xp >= b.min) || xpBadges[0];
}

function isWithinDays(dateStr: string | null, days: number): boolean {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
  return diff <= days;
}

export default function Leaderboard() {
  const [allEntries, setAllEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<TimeFilter>("all");
  const { user } = useAuth();

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("user_xp")
        .select("user_id, total_xp, current_streak, longest_streak, last_activity_date")
        .order("total_xp", { ascending: false })
        .limit(100);

      if (!data || data.length === 0) {
        setAllEntries([]);
        setLoading(false);
        return;
      }

      const userIds = data.map((d) => d.user_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url")
        .in("id", userIds);

      const profileMap = new Map(profiles?.map((p) => [p.id, p]) || []);

      setAllEntries(
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

  const entries = useMemo(() => {
    if (filter === "all") return allEntries;
    const days = filter === "weekly" ? 7 : 30;
    return allEntries.filter((e) => isWithinDays(e.last_activity_date, days));
  }, [allEntries, filter]);

  const myRank = user ? entries.findIndex((e) => e.user_id === user.id) + 1 : 0;

  const filters: { key: TimeFilter; label: string }[] = [
    { key: "all", label: "All Time" },
    { key: "monthly", label: "This Month" },
    { key: "weekly", label: "This Week" },
  ];

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

          {/* Your rank highlight */}
          {myRank > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 shadow-sm"
            >
              <Medal className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Your Rank: <span className="font-bold text-primary">#{myRank}</span></span>
            </motion.div>
          )}
        </div>
      </section>

      {/* Filter tabs + XP info */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Time filter tabs */}
          <div className="flex items-center gap-1 rounded-xl bg-muted p-1 mb-4 w-fit">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  filter === f.key ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.key !== "all" && <Calendar className="h-3.5 w-3.5" />}
                {f.label}
              </button>
            ))}
          </div>

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
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-16">
              <Trophy className="h-16 w-16 mx-auto text-muted-foreground/20 mb-4" />
              <h2 className="text-xl font-bold font-display mb-2">
                {filter === "all" ? "No learners yet!" : `No activity ${filter === "weekly" ? "this week" : "this month"}`}
              </h2>
              <p className="text-muted-foreground mb-4">Be the first to earn XP by completing lessons</p>
              <Link to="/courses">
                <Button className="rounded-full">Start Learning</Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Top 3 podium */}
              {entries.length >= 3 && (
                <div className="flex items-end justify-center gap-3 mb-8">
                  {[1, 0, 2].map((idx) => {
                    const e = entries[idx];
                    const badge = getXPBadge(e.total_xp);
                    const isCenter = idx === 0;
                    return (
                      <motion.div
                        key={e.user_id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`flex flex-col items-center ${isCenter ? "order-2" : idx === 1 ? "order-1" : "order-3"}`}
                      >
                        <span className="text-3xl mb-1">{rankEmojis[idx]}</span>
                        <div className={`${isCenter ? "h-16 w-16" : "h-12 w-12"} rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xl mb-1`}>
                          {badge.emoji}
                        </div>
                        <p className="text-xs font-bold truncate max-w-[80px]">{e.full_name}</p>
                        <p className="text-xs font-bold text-primary">{e.total_xp.toLocaleString()} XP</p>
                        <div className={`${isCenter ? "h-20" : idx === 1 ? "h-14" : "h-10"} w-16 rounded-t-xl bg-gradient-to-t from-primary/20 to-primary/5 mt-2`} />
                      </motion.div>
                    );
                  })}
                </div>
              )}

              <div className="space-y-2">
                {entries.map((entry, i) => {
                  const badge = getXPBadge(entry.total_xp);
                  const isMe = entry.user_id === user?.id;
                  return (
                    <motion.div
                      key={entry.user_id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                    >
                      <Card className={`overflow-hidden transition-all ${isMe ? "border-primary/50 bg-primary/5 shadow-md" : ""} ${i < 3 ? "border-amber-300/50 dark:border-amber-700/30" : ""}`}>
                        <CardContent className="p-3 flex items-center gap-3">
                          <div className="w-8 text-center shrink-0">
                            {i < 3 ? (
                              <span className="text-2xl">{rankEmojis[i]}</span>
                            ) : (
                              <span className="text-sm font-bold text-muted-foreground">{i + 1}</span>
                            )}
                          </div>
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-lg shrink-0">
                            {badge.emoji}
                          </div>
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
            </>
          )}
        </div>
      </section>
    </div>
  );
}
