import { BookOpen, Clock, Award, CalendarDays, TrendingUp, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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

export default function StudentDashboard() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
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
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Courses */}
      <h2 className="mt-10 text-xl font-semibold">My Courses</h2>
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
      <h2 className="mt-10 text-xl font-semibold">Upcoming Sessions</h2>
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
      <h2 className="mt-10 text-xl font-semibold">Recent Grades</h2>
      <div className="mt-4 space-y-3">
        {recentGrades.map((g, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-soft">
            <p className="text-sm font-medium">{g.lesson}</p>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
              g.status === "passed" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
            }`}>
              {g.grade}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
