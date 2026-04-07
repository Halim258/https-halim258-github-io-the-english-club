import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, Clock, Award, CalendarDays, TrendingUp, CheckCircle2,
  GraduationCap, ArrowRight, History, BarChart3, Sparkles,
  Bookmark, Trophy, Star, LogOut, Zap
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { FadeInUp, ScaleIn } from "@/components/AnimatedSection";
import { useAuth } from "@/hooks/useAuth";

interface TestResult {
  id: string;
  score: number;
  total_questions: number;
  cefr_level: string;
  time_taken_seconds: number | null;
  created_at: string;
}

interface LessonProgress {
  level_id: string;
  lesson_number: number;
  completed: boolean;
  score: number | null;
}

interface BookmarkRow {
  level_id: string;
  lesson_number: number;
  created_at: string;
}

interface AchievementRow {
  badge_key: string;
  earned_at: string;
}

const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1", "C2"];
const LEVEL_COLORS: Record<string, string> = {
  A1: "from-emerald-400 to-emerald-600", A2: "from-teal-400 to-teal-600",
  B1: "from-blue-400 to-blue-600", B2: "from-indigo-400 to-indigo-600",
  C1: "from-violet-400 to-violet-600", C2: "from-purple-400 to-purple-600",
};

const BADGES: Record<string, { icon: React.ElementType; label: string; desc: string }> = {
  first_test: { icon: GraduationCap, label: "First Test", desc: "Completed your first placement test" },
  five_lessons: { icon: BookOpen, label: "Getting Started", desc: "Completed 5 lessons" },
  ten_lessons: { icon: Star, label: "Dedicated Learner", desc: "Completed 10 lessons" },
  perfect_score: { icon: Trophy, label: "Perfect Score", desc: "Scored 100% on a test" },
  streak_3: { icon: Zap, label: "On Fire", desc: "3 lessons in a row" },
  level_up: { icon: TrendingUp, label: "Level Up", desc: "Improved your CEFR level" },
};

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkRow[]>([]);
  const [achievements, setAchievements] = useState<AchievementRow[]>([]);
  const [profile, setProfile] = useState<{ full_name: string | null }>({ full_name: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const [testsRes, progressRes, bookmarksRes, achievementsRes, profileRes] = await Promise.all([
        supabase.from("placement_test_results").select("id, score, total_questions, cefr_level, time_taken_seconds, created_at")
          .eq("user_id", user!.id).order("created_at", { ascending: true }),
        supabase.from("lesson_progress").select("level_id, lesson_number, completed, score")
          .eq("user_id", user!.id),
        supabase.from("bookmarks").select("level_id, lesson_number, created_at")
          .eq("user_id", user!.id).order("created_at", { ascending: false }),
        supabase.from("achievements").select("badge_key, earned_at")
          .eq("user_id", user!.id),
        supabase.from("profiles").select("full_name").eq("id", user!.id).single(),
      ]);
      setTestResults(testsRes.data || []);
      setProgress(progressRes.data || []);
      setBookmarks(bookmarksRes.data || []);
      setAchievements(achievementsRes.data || []);
      if (profileRes.data) setProfile(profileRes.data);
      setLoading(false);
    }
    load();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const completedLessons = progress.filter((p) => p.completed).length;
  const latestResult = testResults.length > 0 ? testResults[testResults.length - 1] : null;
  const previousResult = testResults.length > 1 ? testResults[testResults.length - 2] : null;
  const levelImproved = latestResult && previousResult
    ? LEVEL_ORDER.indexOf(latestResult.cefr_level) > LEVEL_ORDER.indexOf(previousResult.cefr_level) : false;

  // Progress by level
  const levelProgress = ["reading", "a1", "a2", "b1", "b2", "c1", "c2"].map((lvl) => {
    const lvlProgress = progress.filter((p) => p.level_id === lvl);
    const completed = lvlProgress.filter((p) => p.completed).length;
    return { level: lvl, completed, total: 15 };
  });

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <p className="text-sm text-muted-foreground font-medium mb-1">Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"} 👋</p>
          <h1 className="text-3xl md:text-4xl font-bold font-display">
            {profile.full_name ? `${profile.full_name}` : "Welcome back!"}
          </h1>
          <p className="mt-1.5 text-muted-foreground text-sm">Continue your learning journey</p>
        </motion.div>
        <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-full text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors">
          <LogOut className="h-4 w-4 mr-1.5" /> Log Out
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {[
          { icon: BookOpen, label: "Lessons Completed", value: completedLessons.toString(), accent: "from-primary/15 to-primary/5", iconColor: "text-primary" },
          { icon: GraduationCap, label: "Tests Taken", value: testResults.length.toString(), accent: "from-blue-500/15 to-blue-500/5", iconColor: "text-blue-600 dark:text-blue-400" },
          { icon: Bookmark, label: "Bookmarked", value: bookmarks.length.toString(), accent: "from-amber-500/15 to-amber-500/5", iconColor: "text-amber-600 dark:text-amber-400" },
          { icon: Award, label: "Achievements", value: achievements.length.toString(), accent: "from-emerald-500/15 to-emerald-500/5", iconColor: "text-emerald-600 dark:text-emerald-400" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border bg-card p-5 shadow-soft hover:shadow-card transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.accent} group-hover:scale-110 transition-transform duration-300`}>
                <s.icon className={`h-5 w-5 ${s.iconColor}`} />
              </div>
              <div>
                <p className="text-3xl font-bold font-display tracking-tight">{s.value}</p>
                <p className="text-[11px] text-muted-foreground font-medium">{s.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 lg:gap-6 lg:grid-cols-3">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Placement Test Progress */}
          <FadeInUp>
            <div className="rounded-2xl border bg-card p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold font-display flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  Your CEFR Level
                </h2>
                <Link to="/placement-test">
                  <Button variant="outline" size="sm" className="rounded-full text-xs">
                    Take Test <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>

              {latestResult ? (
                <div className="flex items-center gap-5">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${LEVEL_COLORS[latestResult.cefr_level]} shadow-lg`}>
                    <span className="text-xl font-bold text-white font-display">{latestResult.cefr_level}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold font-display text-lg">{latestResult.cefr_level}</p>
                    <p className="text-xs text-muted-foreground">
                      Last score: {latestResult.score}/{latestResult.total_questions} ({Math.round((latestResult.score / latestResult.total_questions) * 100)}%)
                    </p>
                    {levelImproved && (
                      <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <TrendingUp className="h-3 w-3" /> Improved from {previousResult!.cefr_level}!
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-2">Take a placement test to discover your level</p>
                  <Link to="/placement-test">
                    <Button size="sm" className="rounded-full">Start Test</Button>
                  </Link>
                </div>
              )}

              {/* Test history */}
              {testResults.length > 1 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                    <History className="h-3 w-3" /> Test History
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {[...testResults].reverse().map((t, i) => (
                      <div key={t.id} className={`rounded-lg border px-3 py-1.5 text-xs ${i === 0 ? "border-primary bg-primary/5" : ""}`}>
                        <span className="font-bold">{t.cefr_level}</span>
                        <span className="text-muted-foreground ml-1">{Math.round((t.score / t.total_questions) * 100)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FadeInUp>

          {/* Lesson Progress */}
          <FadeInUp delay={0.1}>
            <div className="rounded-2xl border bg-card p-6 shadow-soft">
              <h2 className="text-base font-semibold font-display flex items-center gap-2 mb-4">
                <BarChart3 className="h-4 w-4 text-primary" />
                Lesson Progress
              </h2>
              <div className="space-y-3">
                {levelProgress.map((lp) => (
                  <Link key={lp.level} to={`/courses/${lp.level}`} className="flex items-center gap-3 group">
                    <span className="text-xs font-bold font-display w-16 shrink-0 uppercase group-hover:text-primary transition-colors">
                      {lp.level}
                    </span>
                    <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(lp.completed / lp.total) * 100}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-12 text-right shrink-0">
                      {lp.completed}/{lp.total}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Bookmarks */}
          <FadeInUp delay={0.15}>
            <div className="rounded-2xl border bg-card p-6 shadow-soft">
              <h2 className="text-base font-semibold font-display flex items-center gap-2 mb-4">
                <Bookmark className="h-4 w-4 text-primary" />
                Saved Lessons
              </h2>
              {bookmarks.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No bookmarks yet. Save lessons to find them here.
                </p>
              ) : (
                <div className="space-y-2">
                  {bookmarks.slice(0, 5).map((b) => (
                    <Link
                      key={`${b.level_id}-${b.lesson_number}`}
                      to={`/courses/${b.level_id}/${b.lesson_number}`}
                      className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/30 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase text-primary">{b.level_id}</span>
                        <span className="text-sm">Lesson {b.lesson_number}</span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </FadeInUp>

          {/* Achievements */}
          <FadeInUp delay={0.2}>
            <div className="rounded-2xl border bg-card p-6 shadow-soft">
              <h2 className="text-base font-semibold font-display flex items-center gap-2 mb-4">
                <Award className="h-4 w-4 text-primary" />
                Achievements
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(BADGES).map(([key, badge]) => {
                  const earned = achievements.some((a) => a.badge_key === key);
                  return (
                    <div
                      key={key}
                      className={`flex flex-col items-center gap-1 rounded-xl p-3 text-center transition-all ${
                        earned ? "bg-primary/10 border border-primary/20" : "bg-muted/30 opacity-40"
                      }`}
                      title={badge.desc}
                    >
                      <badge.icon className={`h-5 w-5 ${earned ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-[10px] font-semibold leading-tight">{badge.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeInUp>

          {/* Recommended Course */}
          {latestResult && (
            <FadeInUp delay={0.25}>
              <div className="rounded-2xl border bg-gradient-to-br from-primary/10 to-primary/5 p-6 shadow-soft">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold font-display">Recommended</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Continue with {latestResult.cefr_level} level courses
                </p>
                <Link to={`/courses/${latestResult.cefr_level.toLowerCase()}`}>
                  <Button size="sm" className="rounded-full w-full font-semibold">
                    Go to {latestResult.cefr_level} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </FadeInUp>
          )}
        </div>
      </div>
    </div>
  );
}
