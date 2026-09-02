import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Award, Download, Printer, ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { lessons } from "@/data/lessons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { generateCourseCertificate } from "@/lib/generate-course-certificate";

/** Industry tracks that award a capstone certificate. */
const INDUSTRY_COURSES: Record<string, { name: string; level: string; blurb: string }> = {
  "customer-service": {
    name: "Customer Service English",
    level: "A2–B1",
    blurb: "Complete guest-facing communication, complaint handling, and workplace writing.",
  },
  hospitality: {
    name: "Hospitality English",
    level: "A2–B1",
    blurb: "Hotels, restaurants, tourism, events, and professional guest care.",
  },
  healthcare: {
    name: "English for Healthcare",
    level: "B1–B2",
    blurb: "Patient communication, clinical teamwork, safety, and follow-up care.",
  },
  "it-english": {
    name: "IT English",
    level: "B1–C1",
    blurb: "Support, documentation, engineering collaboration, and technical leadership.",
  },
};

export default function CapstoneCertificate() {
  const { levelId = "" } = useParams();
  const { user } = useAuth();
  const course = INDUSTRY_COURSES[levelId];

  const totalLessons = useMemo(
    () => Object.keys(lessons).filter((key) => key.startsWith(`${levelId}-`)).length,
    [levelId],
  );

  const [completed, setCompleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!user || !course) {
      setLoading(false);
      return;
    }
    (async () => {
      const [progressRes, profileRes] = await Promise.all([
        supabase
          .from("lesson_progress")
          .select("lesson_number")
          .eq("user_id", user.id)
          .eq("level_id", levelId)
          .eq("completed", true),
        supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
      ]);
      setCompleted(new Set((progressRes.data || []).map((r) => r.lesson_number)).size);
      setName(profileRes.data?.full_name || user.email?.split("@")[0] || "");
      setLoading(false);
    })();
  }, [user, levelId, course]);

  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const percentage = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  const unlocked = totalLessons > 0 && completed >= totalLessons;

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground">Certificate not available</h1>
        <p className="mt-2 text-muted-foreground">This course does not award a capstone certificate.</p>
        <Link to="/courses" className="mt-6 inline-block">
          <Button variant="outline">Back to courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <div className="print:hidden">
        <Link
          to={`/courses/${levelId}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to {course.name}
        </Link>
        <div className="mt-4 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Capstone certificate</p>
            <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">{course.name}</h1>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{course.blurb}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border bg-card p-4 shadow-soft sm:p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-foreground">Course completion</span>
            <span className="font-bold tabular-nums text-primary">
              {loading ? "…" : `${completed} / ${totalLessons}`}
            </span>
          </div>
          <Progress value={percentage} className="mt-2 h-2.5" />
          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            {unlocked ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> All lessons complete — your certificate is unlocked.
              </>
            ) : (
              <>
                <Lock className="h-3.5 w-3.5" /> Finish all {totalLessons} lessons to unlock printing and download.
              </>
            )}
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
            <div>
              <label htmlFor="cert-name" className="mb-1.5 block text-xs font-semibold text-foreground">
                Name on certificate
              </label>
              <Input
                id="cert-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your full name"
              />
            </div>
            <Button
              className="sm:self-end"
              disabled={!unlocked || !name.trim()}
              onClick={() => window.print()}
            >
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
            <Button
              variant="outline"
              className="sm:self-end"
              disabled={!unlocked || !name.trim()}
              onClick={() =>
                generateCourseCertificate({
                  courseName: course.name,
                  studentName: name.trim(),
                  lessonsCompleted: completed,
                  totalLessons,
                  date: today,
                })
              }
            >
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Printable certificate */}
      <div id="capstone-certificate" className="mt-8 print:mt-0">
        <div className="relative overflow-hidden rounded-2xl border-[3px] border-primary bg-background p-6 text-center sm:p-10">
          <div className="pointer-events-none absolute inset-2 rounded-xl border border-amber-400/70" />
          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
              EC
            </div>
            <h2 className="mt-5 font-serif text-2xl font-bold text-primary sm:text-4xl">Certificate of Completion</h2>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
              The English Club — Industry Capstone
            </p>
            <div className="mx-auto mt-4 h-px w-40 bg-amber-400" />

            <p className="mt-6 text-sm text-muted-foreground">This is to certify that</p>
            <p className="mt-2 font-serif text-2xl font-bold text-foreground sm:text-3xl">
              {name.trim() || "Student Name"}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">has successfully completed all lessons of</p>
            <p className="mt-3 inline-block rounded-full bg-primary px-5 py-2 text-base font-bold text-primary-foreground sm:text-lg">
              {course.name} · {course.level}
            </p>

            <div className="mx-auto mt-8 grid max-w-lg grid-cols-3 gap-3 text-center">
              {[
                { label: "Lessons", value: `${completed} / ${totalLessons}` },
                { label: "Completion", value: `${percentage}%` },
                { label: "Date", value: today },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.label}</p>
                  <p className="mt-1 text-sm font-bold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 gap-8 text-center">
              <div>
                <div className="h-px bg-border" />
                <p className="mt-2 text-xs text-muted-foreground">Course Instructor</p>
              </div>
              <div>
                <div className="h-px bg-border" />
                <p className="mt-2 text-xs text-muted-foreground">Academic Director</p>
              </div>
            </div>

            <p className="mt-8 text-[11px] text-muted-foreground">
              The English Club Language School — Alexandria, Egypt · +20 155 490 1390
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
