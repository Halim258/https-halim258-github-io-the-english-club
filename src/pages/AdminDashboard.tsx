import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users, BarChart3, GraduationCap, BookOpen, TrendingUp,
  Search, Shield, Clock, Award, ChevronRight, UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { FadeInUp } from "@/components/AnimatedSection";
import { useAuth } from "@/hooks/useAuth";

interface StudentProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

interface TestResult {
  id: string;
  user_id: string | null;
  score: number;
  total_questions: number;
  cefr_level: string;
  time_taken_seconds: number | null;
  created_at: string;
}

interface ProgressRow {
  user_id: string;
  level_id: string;
  completed: boolean;
}

type Tab = "overview" | "students" | "tests" | "progress";

const LEVEL_COLORS: Record<string, string> = {
  A1: "bg-emerald-500", A2: "bg-teal-500", B1: "bg-blue-500",
  B2: "bg-indigo-500", C1: "bg-violet-500", C2: "bg-purple-500",
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>("overview");
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [progressData, setProgressData] = useState<ProgressRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [profilesRes, testsRes, progressRes] = await Promise.all([
        supabase.from("profiles").select("id, full_name, avatar_url, created_at").order("created_at", { ascending: false }),
        supabase.from("placement_test_results").select("*").order("created_at", { ascending: false }),
        supabase.from("lesson_progress").select("user_id, level_id, completed"),
      ]);
      setStudents(profilesRes.data || []);
      setTestResults(testsRes.data || []);
      setProgressData(progressRes.data || []);
      setLoading(false);
    }
    load();
  }, []);

  const filteredStudents = students.filter((s) =>
    !search || (s.full_name || "").toLowerCase().includes(search.toLowerCase())
  );

  // Analytics
  const totalStudents = students.length;
  const totalTests = testResults.length;
  const avgScore = testResults.length > 0
    ? Math.round(testResults.reduce((sum, t) => sum + (t.score / t.total_questions) * 100, 0) / testResults.length)
    : 0;
  const completedLessons = progressData.filter((p) => p.completed).length;

  // Level distribution
  const levelDist = testResults.reduce<Record<string, number>>((acc, t) => {
    acc[t.cefr_level] = (acc[t.cefr_level] || 0) + 1;
    return acc;
  }, {});

  // Recent signups (last 7 days)
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
  const recentSignups = students.filter((s) => s.created_at > weekAgo).length;

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "students", label: "Students", icon: Users },
    { id: "tests", label: "Test Results", icon: GraduationCap },
    { id: "progress", label: "Progress", icon: BookOpen },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Admin Panel</span>
          </div>
          <h1 className="text-3xl font-bold font-display">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage students, courses, and monitor progress.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-muted p-1 mb-8 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap ${
              tab === t.id ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* ═══ OVERVIEW ═══ */}
      {tab === "overview" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {[
              { icon: Users, label: "Total Students", value: totalStudents.toString(), sub: `+${recentSignups} this week` },
              { icon: GraduationCap, label: "Tests Taken", value: totalTests.toString(), sub: "Placement tests" },
              { icon: TrendingUp, label: "Avg Score", value: `${avgScore}%`, sub: "Across all tests" },
              { icon: BookOpen, label: "Lessons Completed", value: completedLessons.toString(), sub: "All students" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border bg-card p-5 shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-display">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Level Distribution */}
          <FadeInUp>
            <div className="rounded-2xl border bg-card p-6 shadow-soft mb-6">
              <h3 className="text-sm font-semibold font-display flex items-center gap-2 mb-4">
                <BarChart3 className="h-4 w-4 text-primary" /> CEFR Level Distribution
              </h3>
              <div className="flex gap-3 flex-wrap">
                {["A1", "A2", "B1", "B2", "C1", "C2"].map((lvl) => {
                  const count = levelDist[lvl] || 0;
                  const pct = totalTests > 0 ? Math.round((count / totalTests) * 100) : 0;
                  return (
                    <div key={lvl} className="flex-1 min-w-[80px]">
                      <div className="flex items-end gap-1 mb-1">
                        <span className="text-lg font-bold font-display">{count}</span>
                        <span className="text-[10px] text-muted-foreground mb-0.5">{pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8 }}
                          className={`h-full rounded-full ${LEVEL_COLORS[lvl] || "bg-primary"}`}
                        />
                      </div>
                      <p className="text-xs font-semibold mt-1">{lvl}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeInUp>

          {/* Recent Test Results */}
          <FadeInUp delay={0.1}>
            <div className="rounded-2xl border bg-card p-6 shadow-soft">
              <h3 className="text-sm font-semibold font-display flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-primary" /> Recent Test Results
              </h3>
              <div className="space-y-2">
                {testResults.slice(0, 5).map((t) => {
                  const student = students.find((s) => s.id === t.user_id);
                  return (
                    <div key={t.id} className="flex items-center justify-between rounded-xl border p-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-lg ${LEVEL_COLORS[t.cefr_level] || "bg-primary"} flex items-center justify-center`}>
                          <span className="text-xs font-bold text-white">{t.cefr_level}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{student?.full_name || "Anonymous"}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {new Date(t.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-bold font-display text-primary">
                        {t.score}/{t.total_questions}
                      </span>
                    </div>
                  );
                })}
                {testResults.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No test results yet.</p>
                )}
              </div>
            </div>
          </FadeInUp>
        </motion.div>
      )}

      {/* ═══ STUDENTS ═══ */}
      {tab === "students" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="mb-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="rounded-2xl border bg-card shadow-soft overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 p-4 border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Student</span>
              <span>Joined</span>
              <span>Tests</span>
              <span>Level</span>
            </div>
            {filteredStudents.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No students found.</p>
            ) : (
              filteredStudents.map((s) => {
                const userTests = testResults.filter((t) => t.user_id === s.id);
                const latestTest = userTests[0];
                return (
                  <div key={s.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center p-4 border-b last:border-0 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {(s.full_name || "?")[0].toUpperCase()}
                      </div>
                      <span className="text-sm font-medium truncate">{s.full_name || "Unnamed"}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(s.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="text-xs font-medium">{userTests.length}</span>
                    <span className={`text-xs font-bold rounded-full px-2.5 py-0.5 ${
                      latestTest ? `${LEVEL_COLORS[latestTest.cefr_level]} text-white` : "bg-muted text-muted-foreground"
                    }`}>
                      {latestTest?.cefr_level || "—"}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      )}

      {/* ═══ TESTS ═══ */}
      {tab === "tests" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="rounded-2xl border bg-card shadow-soft overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 p-4 border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Student</span>
              <span>Level</span>
              <span>Score</span>
              <span>Time</span>
              <span>Date</span>
            </div>
            {testResults.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No test results yet.</p>
            ) : (
              testResults.map((t) => {
                const student = students.find((s) => s.id === t.user_id);
                const pct = Math.round((t.score / t.total_questions) * 100);
                return (
                  <div key={t.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center p-4 border-b last:border-0 hover:bg-muted/20 transition-colors">
                    <span className="text-sm font-medium truncate">{student?.full_name || "Anonymous"}</span>
                    <span className={`text-xs font-bold rounded-full px-2.5 py-0.5 ${LEVEL_COLORS[t.cefr_level]} text-white`}>
                      {t.cefr_level}
                    </span>
                    <span className="text-sm font-bold font-display">
                      {t.score}/{t.total_questions}
                      <span className="text-muted-foreground font-normal text-xs ml-1">({pct}%)</span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {t.time_taken_seconds ? `${Math.floor(t.time_taken_seconds / 60)}m ${t.time_taken_seconds % 60}s` : "—"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(t.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      )}

      {/* ═══ PROGRESS ═══ */}
      {tab === "progress" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h3 className="text-sm font-semibold font-display flex items-center gap-2 mb-6">
              <BookOpen className="h-4 w-4 text-primary" /> Lesson Completion by Level
            </h3>
            <div className="space-y-4">
              {["reading", "a1", "a2", "b1", "b2", "c1", "c2"].map((lvl) => {
                const levelProgress = progressData.filter((p) => p.level_id === lvl);
                const completed = levelProgress.filter((p) => p.completed).length;
                const uniqueStudents = new Set(levelProgress.map((p) => p.user_id)).size;
                return (
                  <div key={lvl} className="flex items-center gap-4">
                    <span className="text-sm font-bold font-display w-16 shrink-0 uppercase">{lvl}</span>
                    <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${levelProgress.length > 0 ? (completed / Math.max(levelProgress.length, 1)) * 100 : 0}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                    <div className="text-right shrink-0 min-w-[100px]">
                      <span className="text-sm font-bold">{completed}</span>
                      <span className="text-xs text-muted-foreground"> completed</span>
                      <p className="text-[10px] text-muted-foreground">{uniqueStudents} students</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {progressData.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">No lesson progress data yet.</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
