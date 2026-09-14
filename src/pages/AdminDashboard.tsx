import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DetailSheet from "@/components/admin/DetailSheet";
import {
  Users, BarChart3, GraduationCap, BookOpen,
  Shield, UserCheck, DollarSign, Users2, UserPlus,
  Package, Receipt, Calendar, Download, Award, ClipboardCheck,
  Timer, AlertCircle, Moon, Sun, ShieldCheck, Bell, FileText, CalendarDays, TrendingUp, ScrollText, KeyRound, Sparkles,
  RefreshCw, Search

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
import AdminRoles from "@/components/admin/AdminRoles";
import AdminNotifications from "@/components/admin/AdminNotifications";

import AdminStudentReports from "@/components/admin/AdminStudentReports";
import AdminTeacherSchedule from "@/components/admin/AdminTeacherSchedule";
import AdminRevenueCharts from "@/components/admin/AdminRevenueCharts";
import AdminBulkNotifications from "@/components/admin/AdminBulkNotifications";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import CohortAnalytics from "@/components/analytics/CohortAnalytics";
import AdminNewSignups from "@/components/admin/AdminNewSignups";
import AdminAuditLog from "@/components/admin/AdminAuditLog";
import AdminGrantAccess from "@/pages/AdminGrantAccess";
import AdminCommandCenter from "@/components/admin/AdminCommandCenter";

type Tab = "command-center" | "grant-access" | "overview" | "school-students" | "new-signups" | "employees" | "groups" | "sessions" | "attendance" | "teacher-hours" | "unpaid" | "finance" | "newcomers" | "products" | "receipts" | "online-students" | "tests" | "roles" | "notifications" | "export" | "reports" | "schedule" | "revenue-charts" | "analytics" | "cohorts" | "audit-log";

const LEVEL_COLORS: Record<string, string> = {
  A1: "bg-emerald-500", A2: "bg-teal-500", B1: "bg-blue-500",
  B2: "bg-indigo-500", C1: "bg-violet-500", C2: "bg-purple-500",
};

export default function AdminDashboard() {
  const { user, role } = useAuth();
  const [tab, setTab] = useState<Tab>(() => (localStorage.getItem("admin-tab") as Tab) || "command-center");
  const [navQuery, setNavQuery] = useState("");
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

  // Remember the last section opened
  useEffect(() => { localStorage.setItem("admin-tab", tab); }, [tab]);


  const loadData = async () => {
    setLoading(true);
    const [profilesRes, testsRes, progressRes, studentsRes, empRes, groupsRes, sessionsRes, incomeRes, outcomeRes, newcomersRes, productsRes, receiptsRes] = await Promise.all([
      supabase.from("profiles").select("id, full_name, avatar_url, created_at").order("created_at", { ascending: false }),
      supabase.from("placement_test_results").select("*").order("created_at", { ascending: false }),
      supabase.from("lesson_progress").select("user_id, level_id, completed"),
      supabase.from("school_students").select("*").order("created_at", { ascending: false }),
      supabase.from("school_employees").select("*").order("name"),
      supabase.from("school_groups").select("*").order("legacy_id", { ascending: true }),
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
      .on("postgres_changes", { event: "*", schema: "public", table: "school_groups" }, () => loadData())
      .on("postgres_changes", { event: "*", schema: "public", table: "school_employees" }, () => loadData())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // Tabs secretaries are allowed to see
  const secretaryTabs: Tab[] = [
    "command-center", "grant-access", "overview", "school-students", "new-signups", "receipts", "attendance",
    "newcomers", "products", "unpaid", "groups", "sessions",
  ];

  const isSecretary = role === "secretary";

  const allTabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "command-center", label: "Command Center", icon: Sparkles },
    { id: "grant-access", label: "Grant Access", icon: KeyRound },
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "school-students", label: "Students", icon: Users },
    { id: "new-signups", label: "New Sign-ups", icon: UserPlus },
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
    { id: "roles", label: "Roles", icon: ShieldCheck },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "export", label: "Export", icon: Download },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "schedule", label: "Schedule", icon: CalendarDays },
    { id: "revenue-charts", label: "Revenue", icon: TrendingUp },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "cohorts", label: "Cohort Analytics", icon: TrendingUp },
    { id: "audit-log", label: "Audit Log", icon: ScrollText },
  ];

  const tabs = isSecretary
    ? allTabs.filter(t => secretaryTabs.includes(t.id))
    : allTabs;

  const GROUPS: { title: string; ids: Tab[] }[] = [
    { title: "Daily", ids: ["command-center", "overview", "new-signups", "grant-access", "notifications"] },
    { title: "People", ids: ["school-students", "employees", "groups", "newcomers", "online-students", "roles"] },
    { title: "Classes", ids: ["sessions", "attendance", "schedule", "teacher-hours", "tests", "reports"] },
    { title: "Money", ids: ["receipts", "unpaid", "finance", "products", "revenue-charts"] },
    { title: "Insights", ids: ["analytics", "cohorts", "export", "audit-log"] },
  ];

  const visibleGroups = GROUPS.map((g) => ({
    title: g.title,
    items: g.ids
      .map((id) => tabs.find((t) => t.id === id))
      .filter((t): t is { id: Tab; label: string; icon: React.ElementType } => {
        if (!t) return false;
        const q = navQuery.trim().toLowerCase();
        return q.length === 0 || t.label.toLowerCase().includes(q);
      }),
  })).filter((g) => g.items.length > 0);

  const activeLabel = tabs.find((t) => t.id === tab)?.label || "Dashboard";

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <CommandPalette onNavigate={(id) => setTab(id as Tab)} />

      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
        <div className="min-w-0">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Admin workspace</span>
            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${
              role === "admin" ? "bg-destructive/10 text-destructive" : "bg-amber-500/10 text-amber-600"
            }`}>
              {role}
            </span>
          </div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">{activeLabel}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Everything is totalled for you automatically and refreshes as new data arrives.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            className="flex h-10 items-center gap-2 border border-border bg-card px-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={() => {
              const root = document.documentElement;
              const isDark = root.classList.contains("dark");
              root.classList.toggle("dark", !isDark);
              localStorage.setItem("admin-theme", isDark ? "light" : "dark");
            }}
            className="flex h-10 items-center gap-2 border border-border bg-card px-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Sun className="h-4 w-4 hidden dark:block" />
            <Moon className="h-4 w-4 block dark:hidden" />
            <span className="hidden sm:inline dark:hidden">Dark</span>
            <span className="hidden dark:sm:inline">Light</span>
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)]">
        {/* Side navigation */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative mb-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={navQuery}
              onChange={(e) => setNavQuery(e.target.value)}
              placeholder="Find a section…"
              aria-label="Find a section"
              className="h-10 w-full border border-border bg-card pl-9 pr-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <nav className="max-h-none space-y-4 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-1">
            {visibleGroups.map((g) => (
              <div key={g.title}>
                <p className="mb-1.5 px-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{g.title}</p>
                <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-1">
                  {g.items.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className={`flex min-h-11 items-center gap-2 bg-card px-3 py-2 text-left text-[13px] font-medium transition-colors ${
                        tab === t.id
                          ? "border-l-2 border-primary bg-primary/5 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <t.icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {visibleGroups.length === 0 && (
              <p className="px-1 text-sm text-muted-foreground">No section matches that name.</p>
            )}
          </nav>
        </aside>

        <div className="min-w-0">


      {/* Tab Content */}
      {tab === "command-center" && (
        <AdminCommandCenter
          profiles={profiles} schoolStudents={schoolStudents} income={income} outcome={outcome}
          receipts={receipts} newcomers={newcomers} testResults={testResults} sessions={sessions}
          onNavigate={(t) => setTab(t as Tab)} onRefresh={loadData}
        />
      )}
      {tab === "grant-access" && (
        <AdminGrantAccess />
      )}
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
          <AdminStudents students={schoolStudents} groups={groups} onRefresh={loadData} />
        </motion.div>
      )}

      {tab === "new-signups" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminNewSignups onRefresh={loadData} />
        </motion.div>
      )}

      {tab === "employees" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminEmployees employees={employees} groups={groups} students={schoolStudents} onRefresh={loadData} />
        </motion.div>
      )}

      {tab === "groups" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminGroups groups={groups} employees={employees} students={schoolStudents} receipts={receipts} onRefresh={loadData} />
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
          <AdminReceipts receipts={receipts} students={schoolStudents} onRefresh={loadData} />
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

      {tab === "roles" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminRoles />
        </motion.div>
      )}

      {tab === "notifications" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <AdminNotifications />
          <div className="rounded-2xl border bg-card p-5 shadow-soft">
            <AdminBulkNotifications />
          </div>
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

      {tab === "reports" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminStudentReports />
        </motion.div>
      )}

      {tab === "schedule" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminTeacherSchedule />
        </motion.div>
      )}

      {tab === "revenue-charts" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminRevenueCharts />
        </motion.div>
      )}

      {tab === "analytics" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminAnalytics />
        </motion.div>
      )}

      {tab === "cohorts" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <CohortAnalytics />
        </motion.div>
      )}

      {tab === "audit-log" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AdminAuditLog />
        </motion.div>
      )}
        </div>
      </div>
    </div>
  );

}
