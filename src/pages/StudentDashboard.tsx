import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, Clock, Award, CalendarDays, TrendingUp, CheckCircle2,
  GraduationCap, ArrowRight, History, BarChart3, Sparkles
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface TestResult {
  id: string;
  score: number;
  total_questions: number;
  cefr_level: string;
  time_taken_seconds: number | null;
  created_at: string;
}

const enrolledCourses = [
  { title: "Standard Arabic — A1", progress: 35, lessons: 10, completed: 3 },
  { title: "Arabic Reading Course", progress: 80, lessons: 12, completed: 10 },
];

const upcomingSessions = [
  { teacher: "Ahmed Hassan", date: "Feb 19, 2026", time: "10:00 AM", duration: "50 min" },
  { teacher: "Fatima Al-Rashid", date: "Feb 21, 2026", time: "3:00 PM", duration: "25 min" },
];

const recentGrades = [
  { lesson: "Lesson 1: Meeting & Greeting", grade: "92%", status: "passed" },
  { lesson: "Lesson 2: Numbers", grade: "85%", status: "passed" },
  { lesson: "Lesson 3: Family", grade: "—", status: "pending" },
];

const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1", "C2"];
const LEVEL_COLORS: Record<string, string> = {
  A1: "from-emerald-400 to-emerald-600",
  A2: "from-teal-400 to-teal-600",
  B1: "from-blue-400 to-blue-600",
  B2: "from-indigo-400 to-indigo-600",
  C1: "from-violet-400 to-violet-600",
  C2: "from-purple-400 to-purple-600",
};

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function StudentDashboard() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("placement_test_results")
        .select("id, score, total_questions, cefr_level, time_taken_seconds, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      setTestResults(data || []);
      setLoading(false);
    }
    fetchResults();
  }, []);

  const latestResult = testResults.length > 0 ? testResults[testResults.length - 1] : null;
  const previousResult = testResults.length > 1 ? testResults[testResults.length - 2] : null;

  const levelImproved =
    latestResult && previousResult
      ? LEVEL_ORDER.indexOf(latestResult.cefr_level) > LEVEL_ORDER.indexOf(previousResult.cefr_level)
      : false;

  const bestLevel = testResults.reduce((best, r) => {
    const idx = LEVEL_ORDER.indexOf(r.cefr_level);
    return idx > LEVEL_ORDER.indexOf(best) ? r.cefr_level : best;
  }, testResults[0]?.cefr_level || "A1");

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold font-display">Student Dashboard</h1>
      <p className="mt-1 text-muted-foreground">Welcome back! Continue your learning journey.</p>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: BookOpen, label: "Enrolled Courses", value: "2" },
          { icon: CheckCircle2, label: "Lessons Completed", value: "13" },
          { icon: Clock, label: "Hours Studied", value: "24h" },
          { icon: TrendingUp, label: "Avg Grade", value: "88%" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══ Placement Test Progress Tracker ═══ */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold font-display flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Placement Test Progress
          </h2>
          <Link to="/placement-test">
            <Button variant="outline" size="sm" className="rounded-full text-xs font-semibold">
              Take Test <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="rounded-2xl border bg-card p-8 text-center text-muted-foreground animate-pulse">
            Loading test history...
          </div>
        ) : testResults.length === 0 ? (
          <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center">
            <GraduationCap className="h-12 w-12 text-primary/40 mx-auto mb-3" />
            <h3 className="font-semibold font-display">No Tests Yet</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Take our Cambridge-style placement test to discover your English level.
            </p>
            <Link to="/placement-test">
              <Button className="rounded-full px-6 font-semibold">
                Start Placement Test <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Current Level Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border bg-card p-6 shadow-soft"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Level Badge */}
                <div className="flex items-center gap-4">
                  <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${LEVEL_COLORS[latestResult!.cefr_level]} shadow-lg`}>
                    <span className="text-2xl font-bold text-white font-display">
                      {latestResult!.cefr_level}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Current Level</p>
                    <p className="text-xl font-bold font-display">{latestResult!.cefr_level}</p>
                    {levelImproved && (
                      <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <TrendingUp className="h-3 w-3" /> Improved from {previousResult!.cefr_level}!
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold font-display text-primary">
                      {latestResult!.score}/{latestResult!.total_questions}
                    </p>
                    <p className="text-xs text-muted-foreground">Last Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold font-display text-primary">
                      {Math.round((latestResult!.score / latestResult!.total_questions) * 100)}%
                    </p>
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold font-display text-primary">
                      {testResults.length}
                    </p>
                    <p className="text-xs text-muted-foreground">Tests Taken</p>
                  </div>
                </div>
              </div>

              {/* CEFR Scale */}
              <div className="mt-6 pt-4 border-t">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                  CEFR Progression
                </p>
                <div className="flex gap-1.5">
                  {LEVEL_ORDER.map((lvl) => {
                    const isCurrentOrBelow = LEVEL_ORDER.indexOf(lvl) <= LEVEL_ORDER.indexOf(latestResult!.cefr_level);
                    const isCurrent = lvl === latestResult!.cefr_level;
                    const isBest = lvl === bestLevel;

                    return (
                      <div key={lvl} className="flex-1">
                        <div
                          className={`h-3 rounded-full transition-all duration-500 ${
                            isCurrent
                              ? `bg-gradient-to-r ${LEVEL_COLORS[lvl]} scale-y-125`
                              : isCurrentOrBelow
                              ? "bg-primary/30"
                              : "bg-muted"
                          }`}
                        />
                        <p className={`text-center text-[10px] mt-1 font-semibold ${
                          isCurrent ? "text-primary" : "text-muted-foreground"
                        }`}>
                          {lvl}
                          {isBest && lvl !== latestResult!.cefr_level && (
                            <Sparkles className="inline h-2.5 w-2.5 ml-0.5 text-amber-500" />
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Test History Timeline */}
            {testResults.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border bg-card p-6 shadow-soft"
              >
                <h3 className="text-sm font-semibold font-display flex items-center gap-2 mb-4">
                  <History className="h-4 w-4 text-primary" /> Test History
                </h3>
                <div className="space-y-3">
                  {[...testResults].reverse().map((result, i) => {
                    const prevIdx = testResults.length - 1 - i - 1;
                    const prev = prevIdx >= 0 ? testResults[prevIdx] : null;
                    const improved = prev && LEVEL_ORDER.indexOf(result.cefr_level) > LEVEL_ORDER.indexOf(prev.cefr_level);
                    const declined = prev && LEVEL_ORDER.indexOf(result.cefr_level) < LEVEL_ORDER.indexOf(prev.cefr_level);
                    const pct = Math.round((result.score / result.total_questions) * 100);

                    return (
                      <div
                        key={result.id}
                        className={`flex items-center gap-4 rounded-xl border p-4 transition-all ${
                          i === 0 ? "bg-primary/5 border-primary/20" : "hover:bg-muted/30"
                        }`}
                      >
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${LEVEL_COLORS[result.cefr_level]} text-white font-bold text-sm font-display`}>
                          {result.cefr_level}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">
                              {result.score}/{result.total_questions}
                              <span className="text-muted-foreground font-normal"> ({pct}%)</span>
                            </span>
                            {improved && (
                              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                                <TrendingUp className="h-3 w-3" /> ↑
                              </span>
                            )}
                            {declined && (
                              <span className="text-[10px] font-semibold text-destructive flex items-center gap-0.5">
                                ↓
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(result.created_at).toLocaleDateString("en-GB", {
                              day: "numeric", month: "short", year: "numeric",
                            })}
                            {result.time_taken_seconds != null && ` · ${formatTime(result.time_taken_seconds)}`}
                          </p>
                        </div>
                        {i === 0 && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            Latest
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Recommended Course */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border bg-gradient-to-br from-primary/10 to-primary/5 p-6 shadow-soft"
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold font-display">Recommended Next Step</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Based on your latest result ({latestResult!.cefr_level}), we recommend continuing with:
              </p>
              <Link to={`/courses/${latestResult!.cefr_level.toLowerCase()}`}>
                <Button className="rounded-full px-6 font-semibold font-display" size="sm">
                  Start {latestResult!.cefr_level} Course <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        )}
      </div>

      {/* Courses */}
      <h2 className="mt-10 text-xl font-semibold font-display">My Courses</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {enrolledCourses.map((c) => (
          <div key={c.title} className="rounded-xl border bg-card p-5 shadow-soft">
            <h3 className="font-semibold">{c.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{c.completed}/{c.lessons} lessons completed</p>
            <Progress value={c.progress} className="mt-3 h-2" />
            <p className="mt-1 text-right text-xs font-medium text-primary">{c.progress}%</p>
          </div>
        ))}
      </div>

      {/* Upcoming */}
      <h2 className="mt-10 text-xl font-semibold font-display">Upcoming Sessions</h2>
      <div className="mt-4 space-y-3">
        {upcomingSessions.map((s, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium">{s.teacher}</p>
                <p className="text-xs text-muted-foreground">{s.date} at {s.time} · {s.duration}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grades */}
      <h2 className="mt-10 text-xl font-semibold font-display">Recent Grades</h2>
      <div className="mt-4 space-y-3">
        {recentGrades.map((g, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-soft">
            <p className="text-sm font-medium">{g.lesson}</p>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
              g.status === "passed" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"
            }`}>
              {g.grade}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
