import { useState } from "react";
import { CalendarDays, Users, Clock, DollarSign, Settings, MessageCircle, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import StudentAnswersReview from "@/components/teacher/StudentAnswersReview";
import TeacherEnrollments from "@/components/teacher/TeacherEnrollments";

const upcomingClasses = [
  { student: "John Doe", date: "Feb 19, 2026", time: "10:00 AM", duration: "50 min", level: "A1" },
  { student: "Maria Lopez", date: "Feb 19, 2026", time: "2:00 PM", duration: "25 min", level: "B1" },
  { student: "Chen Wei", date: "Feb 20, 2026", time: "11:00 AM", duration: "50 min", level: "A2" },
];

const TABS = [
  { id: "overview", label: "Overview", icon: CalendarDays },
  { id: "enrollments", label: "Enrollments", icon: UserPlus },
  { id: "answers", label: "Student Answers", icon: MessageCircle },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
      <p className="mt-1 text-muted-foreground">Manage your schedule, students, and earnings.</p>

      {/* Tab pills */}
      <div className="flex gap-2 mt-6 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground border"
            }`}
          >
            <tab.icon className="h-4 w-4" /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <>
          {/* Stats */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: CalendarDays, label: "This Month", value: "32 lessons" },
              { icon: Clock, label: "Hours Taught", value: "48h" },
              { icon: Users, label: "Active Students", value: "18" },
              { icon: DollarSign, label: "Earnings", value: "$1,240" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border bg-card p-4 shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                    <s.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming */}
          <div className="mt-10 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Upcoming Classes</h2>
            <Button variant="outline" size="sm">
              <Settings className="mr-1 h-3 w-3" /> Manage Availability
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {upcomingClasses.map((c, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-soft">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{c.student}</p>
                    <p className="text-xs text-muted-foreground">{c.date} at {c.time} · {c.duration} · {c.level}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Details</Button>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "answers" && (
        <div className="mt-6">
          <StudentAnswersReview />
        </div>
      )}
    </div>
  );
}
