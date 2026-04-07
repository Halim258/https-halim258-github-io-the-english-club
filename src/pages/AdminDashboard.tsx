import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DetailSheet from "@/components/admin/DetailSheet";
import {
  Users, BarChart3, GraduationCap, BookOpen,
  Shield, UserCheck, DollarSign, Users2, UserPlus,
  Package, Receipt, Calendar, Download, Award, ClipboardCheck,
  Timer, AlertCircle, Moon, Sun
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import CommandPalette from "@/components/admin/CommandPalette";
import { useAuth } from "@/hooks/useAuth";
import AdminStudents from "@/components/admin/AdminStudents";
import AdminEmployees from "@/components/admin/AdminEmployees";
import AdminFinance from "@/components/admin/AdminFinance";
import AdminGroups from "@/components/admin/AdminGroups";
import AdminNewcomers from "@/components/admin/AdminNewcomers";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminReceipts from "@/components/admin/AdminReceipts";
import AdminSessions from "@/components/admin/AdminSessions";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminExport from "@/components/admin/AdminExport";
import AdminAttendance from "@/components/admin/AdminAttendance";
import AdminTeacherHours from "@/components/admin/AdminTeacherHours";
import AdminUnpaidStudents from "@/components/admin/AdminUnpaidStudents";

type Tab = "overview" | "school-students" | "employees" | "groups" | "sessions" | "attendance" | "teacher-hours" | "unpaid" | "finance" | "newcomers" | "products" | "receipts" | "online-students" | "tests" | "export";

const LEVEL_COLORS: Record<string, string> = {
  A1: "bg-emerald-500", A2: "bg-teal-500", B1: "bg-blue-500",
  B2: "bg-indigo-500", C1: "bg-violet-500", C2: "bg-purple-500",
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
  const [selectedTest, setSelectedTest] = useState<any | null>(null);

  const [profiles, setProfiles] = useState<any[]>([]);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [progressData, setProgressData] = useState<any[]>([]);
  const [schoolStudents, setSchoolStudents] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [income, setIncome] = useState<any[]>([]);
  const [outcome, setOutcome] = useState<any[]>([]);
  const [newcomers, setNewcomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [receipts, setReceipts] = useState<any[]>([]);

  // Restore saved theme preference
  useEffect(() => {
    const saved = localStorage.getItem("admin-theme");
    if (saved === "dark") document.documentElement.classList.add("dark");
    else if (saved === "light") document.documentElement.classList.remove("dark");
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [profilesRes, testsRes, progressRes, studentsRes, empRes, groupsRes, sessionsRes, incomeRes, outcomeRes, newcomersRes, productsRes, receiptsRes] = await Promise.all([
      supabase.from("profiles").select("id, full_name, avatar_url, created_at").order("created_at", { ascending: false }),
      supabase.from("placement_test_results").select("*").order("created_at", { ascending: false }),
      supabase.from("lesson_progress").select("user_id, level_id, completed"),
      supabase.from("school_students").select("*").order("created_at", { ascending: false }),
      supabase.from("school_employees").select("*").order("name"),
      supabase.from("school_groups").select("*"),
      supabase.from("school_sessions").select("*").order("session_date", { ascending: false }),
      supabase.from("school_income").select("*").order("date", { ascending: false }),
      supabase.from("school_outcome").select("*").order("date", { ascending: false }),
      supabase.from("school_newcomers").select("*").order("the_date", { ascending: false }),
      supabase.from("school_products").select("*").order("product"),
      supabase.from("school_receipts").select("*").order("receipt_number", { ascending: false }),
    ]);
    setProfiles(profilesRes.data || []);
    setTestResults(testsRes.data || []);
    setProgressData(progressRes.data || []);
    setSchoolStudents(studentsRes.data || []);
    setEmployees(empRes.data || []);
    setGroups(groupsRes.data || []);
    setSessions(sessionsRes.data || []);
    setIncome(incomeRes.data || []);
    setOutcome(outcomeRes.data || []);
    setNewcomers(newcomersRes.data || []);
    setProducts(productsRes.data || []);
    setReceipts(receiptsRes.data || []);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  // Real-time subscriptions for auto-refresh
  useEffect(() => {
    const tables = [
      "school_students", "school_income", "school_outcome",
      "school_newcomers", "school_receipts", "school_sessions", "school_attendance"
    ];
    const channel = supabase
      .channel("admin-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "school_students" }, () => loadData())
      .on("postgres_changes", { event: "*", schema: "public", table: "school_income" }, () => loadData())
      .on("postgres_changes", { event: "*", schema: "public", table: "school_outcome" }, () => loadData())
      .on("postgres_changes", { event: "*", schema: "public", table: "school_newcomers" }, () => loadData())
      .on("postgres_changes", { event: "*", schema: "public", table: "school_receipts" }, () => loadData())
      .on("postgres_changes", { event: "*", schema: "public", table: "school_sessions" }, () => loadData())
      .on("postgres_changes", { event: "*", schema: "public", table: "school_attendance" }, () => loadData())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "school-students", label: "Students", icon: Users },
    { id: "employees", label: "Employees", icon: UserCheck },
    { id: "groups", label: "Groups", icon: Users2 },
    { id: "sessions", label: "Sessions", icon: Calendar },
    { id: "attendance", label: "Attendance", icon: ClipboardCheck },
    { id: "teacher-hours", label: "Teacher Hours", icon: Timer },
    { id: "unpaid", label: "Unpaid", icon: AlertCircle },
    { id: "finance", label: "Finance", icon: DollarSign },
    { id: "newcomers", label: "Newcomers", icon: UserPlus },
    { id: "products", label: "Products", icon: Package },
    { id: "receipts", label: "Receipts", icon: Receipt },
    { id: "online-students", label: "Online Users", icon: GraduationCap },
    { id: "tests", label: "Tests", icon: Award },
    { id: "export", label: "Export", icon: Download },
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
      <CommandPalette onNavigate={(id) => setTab(id as Tab)} />
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Admin Panel</span>
          </div>
          <h1 className="text-3xl font-bold font-display">School Management</h1>
          <p className="text-muted-foreground mt-1">Manage students, staff, courses, and finances.</p>
        </div>
        <button
          onClick={() => {
            const root = document.documentElement;
            const isDark = root.classList.contains("dark");
            root.classList.toggle("dark", !isDark);
            localStorage.setItem("admin-theme", isDark ? "light" : "dark");
          }}
          className="flex items-center gap-2 rounded-xl border bg-card px-3 py-2 text-sm font-medium shadow-sm hover:bg-muted transition-colors"
        >
          <Sun className="h-4 w-4 hidden dark:block" />
          <Moon className="h-4 w-4 block dark:hidden" />
          <span className="hidden sm:inline dark:hidden">Dark</span>
          <span className="hidden sm:inline hidden dark:inline">Light</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-muted p-1 mb-8 overflow-x-auto scrollbar-thin">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all whitespace-nowrap ${
              tab === t.id ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "overview" && (
        <AdminOverview
          profiles={profiles} testResults={testResults} progressData={progressData}
          schoolStudents={schoolStudents} income={income} outcome={outcome}
          newcomers={newcomers} receipts={receipts} sessions={sessions}
          employees={employees}
        />
      )}

      {tab === "school-students" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminStudents students={schoolStudents} onRefresh={loadData} />
        </motion.div>
      )}

      {tab === "employees" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminEmployees employees={employees} onRefresh={loadData} />
        </motion.div>
      )}

      {tab === "groups" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminGroups groups={groups} employees={employees} onRefresh={loadData} />
        </motion.div>
      )}

      {tab === "sessions" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminSessions sessions={sessions} employees={employees} onRefresh={loadData} />
        </motion.div>
      )}

      {tab === "attendance" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminAttendance sessions={sessions} />
        </motion.div>
      )}

      {tab === "teacher-hours" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminTeacherHours sessions={sessions} employees={employees} />
        </motion.div>
      )}

      {tab === "unpaid" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminUnpaidStudents students={schoolStudents} />
        </motion.div>
      )}

      {tab === "finance" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminFinance income={income} outcome={outcome} onRefresh={loadData} />
        </motion.div>
      )}

      {tab === "newcomers" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminNewcomers newcomers={newcomers} onRefresh={loadData} />
        </motion.div>
      )}

      {tab === "products" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminProducts products={products} onRefresh={loadData} />
        </motion.div>
      )}

      {tab === "receipts" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminReceipts receipts={receipts} onRefresh={loadData} />
        </motion.div>
      )}

      {tab === "online-students" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="rounded-2xl border bg-card shadow-soft overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 p-4 border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Student</span><span>Joined</span><span>Tests</span><span>Level</span>
            </div>
            {profiles.slice(0, 50).map((s: any) => {
              const userTests = testResults.filter((t: any) => t.user_id === s.id);
              const latestTest = userTests[0];
              return (
                <div key={s.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center p-4 border-b last:border-0 hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => {
                  const userTests = testResults.filter((t: any) => t.user_id === s.id);
                  setSelectedProfile({ ...s, tests: userTests });
                }}>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {(s.full_name || "?")[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium truncate text-primary hover:underline">{s.full_name || "Unnamed"}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(s.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                  <span className="text-xs font-medium">{userTests.length}</span>
                  <span className={`text-xs font-bold rounded-full px-2.5 py-0.5 ${latestTest ? `${LEVEL_COLORS[latestTest.cefr_level]} text-white` : "bg-muted text-muted-foreground"}`}>
                    {latestTest?.cefr_level || "—"}
                  </span>
                </div>
              );
            })}
          </div>

          <DetailSheet
            open={!!selectedProfile}
            onOpenChange={(open) => { if (!open) setSelectedProfile(null); }}
            title={selectedProfile?.full_name || "Unnamed"}
            subtitle="Online Student"
            avatar={selectedProfile?.full_name?.[0]?.toUpperCase() || "?"}
            fields={selectedProfile ? [
              { label: "Full Name", value: selectedProfile.full_name },
              { label: "Joined", value: selectedProfile.created_at, type: "date" as const },
              { label: "Tests Taken", value: selectedProfile.tests?.length || 0 },
              { label: "Latest Level", value: selectedProfile.tests?.[0]?.cefr_level, type: "badge" as const },
              { label: "Latest Score", value: selectedProfile.tests?.[0] ? `${selectedProfile.tests[0].score}/${selectedProfile.tests[0].total_questions}` : null },
              { label: "Avatar URL", value: selectedProfile.avatar_url },
            ] : []}
          />
        </motion.div>
      )}

      {tab === "tests" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="rounded-2xl border bg-card shadow-soft overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 p-4 border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Student</span><span>Level</span><span>Score</span><span>Time</span><span>Date</span>
            </div>
            {testResults.slice(0, 50).map((t: any) => {
              const student = profiles.find((s: any) => s.id === t.user_id);
              const pct = Math.round((t.score / t.total_questions) * 100);
              return (
                <div key={t.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center p-4 border-b last:border-0 hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => setSelectedTest({ ...t, student_name: student?.full_name })}>
                  <span className="text-sm font-medium truncate text-primary hover:underline">{student?.full_name || "Anonymous"}</span>
                  <span className={`text-xs font-bold rounded-full px-2.5 py-0.5 ${LEVEL_COLORS[t.cefr_level]} text-white`}>{t.cefr_level}</span>
                  <span className="text-sm font-bold font-display">{t.score}/{t.total_questions} <span className="text-muted-foreground font-normal text-xs">({pct}%)</span></span>
                  <span className="text-xs text-muted-foreground">{t.time_taken_seconds ? `${Math.floor(t.time_taken_seconds / 60)}m ${t.time_taken_seconds % 60}s` : "—"}</span>
                  <span className="text-xs text-muted-foreground">{new Date(t.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                </div>
              );
            })}
          </div>

          <DetailSheet
            open={!!selectedTest}
            onOpenChange={(open) => { if (!open) setSelectedTest(null); }}
            title={selectedTest?.student_name || "Anonymous"}
            subtitle={`Placement Test — ${selectedTest?.cefr_level || ""}`}
            avatar={selectedTest?.student_name?.[0]?.toUpperCase() || "T"}
            fields={selectedTest ? [
              { label: "Student", value: selectedTest.student_name },
              { label: "CEFR Level", value: selectedTest.cefr_level, type: "badge" as const },
              { label: "Score", value: `${selectedTest.score}/${selectedTest.total_questions} (${Math.round((selectedTest.score / selectedTest.total_questions) * 100)}%)` },
              { label: "Time Taken", value: selectedTest.time_taken_seconds ? `${Math.floor(selectedTest.time_taken_seconds / 60)}m ${selectedTest.time_taken_seconds % 60}s` : null },
              { label: "Date", value: selectedTest.created_at, type: "date" as const },
            ] : []}
          />
        </motion.div>
      )}

      {tab === "export" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminExport
            students={schoolStudents} employees={employees} income={income}
            outcome={outcome} receipts={receipts} newcomers={newcomers}
          />
        </motion.div>
      )}
    </div>
  );
}
