import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, ClipboardCheck, Flame, Loader2, MessageCircle, Search, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Student = {
  user_id: string; student_name: string; group_id: string; group_level: string | null; group_days: string | null;
  status: string; lessons_completed: number; avg_accuracy: number; total_xp: number; current_streak: number;
  last_activity_date: string | null; in_progress_count: number;
};
type Lesson = { level_id: string; lesson_number: number; completed: boolean; score: number | null; completed_at: string | null; created_at: string };
type Assessment = { id: string; user_id: string; student_name: string; level_id: string; score: number; total_questions: number; passed: boolean; teacher_reviewed: boolean; teacher_note: string | null; completed_at: string };

const label = (value: string | null) => value ? value.toUpperCase().replace(/-/g, " ") : "Course";

export default function TeacherStudentProgress() {
  const [students, setStudents] = useState<Student[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [lessons, setLessons] = useState<Record<string, Lesson[]>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingLessons, setLoadingLessons] = useState<string | null>(null);
  const [reviewing, setReviewing] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    const [{ data: studentData, error: studentError }, { data: assessmentData }] = await Promise.all([
      supabase.rpc("get_teacher_students_progress"),
      supabase.rpc("get_teacher_level_assessments"),
    ]);
    if (studentError) toast({ title: "Could not load student progress", description: studentError.message, variant: "destructive" });
    setStudents((studentData as Student[]) || []);
    setAssessments((assessmentData as Assessment[]) || []);
    setLoading(false);
  };

  useEffect(() => { void load(); }, []);

  const filtered = useMemo(() => students.filter((student) => {
    const term = search.trim().toLowerCase();
    return !term || student.student_name.toLowerCase().includes(term) || label(student.group_level).toLowerCase().includes(term);
  }), [search, students]);
  const pendingReviews = assessments.filter((assessment) => !assessment.teacher_reviewed);
  const average = students.length ? Math.round(students.reduce((sum, student) => sum + student.avg_accuracy, 0) / students.length) : 0;

  const toggleStudent = async (userId: string) => {
    if (expanded === userId) { setExpanded(null); return; }
    setExpanded(userId);
    if (lessons[userId]) return;
    setLoadingLessons(userId);
    const { data, error } = await supabase.rpc("get_teacher_student_lessons", { _user_id: userId });
    setLoadingLessons(null);
    if (error) {
      toast({ title: "Could not load lesson details", description: error.message, variant: "destructive" });
      return;
    }
    setLessons((current) => ({ ...current, [userId]: (data as Lesson[]) || [] }));
  };

  const finishReview = async (assessment: Assessment) => {
    setReviewing(assessment.id);
    const { error } = await supabase.rpc("complete_teacher_level_review", { _result_id: assessment.id, _note: notes[assessment.id] || null });
    setReviewing(null);
    if (error) {
      toast({ title: "Could not save teacher review", description: error.message, variant: "destructive" });
      return;
    }
    setAssessments((current) => current.map((item) => item.id === assessment.id ? { ...item, teacher_reviewed: true, teacher_note: notes[assessment.id] || null } : item));
    toast({ title: "Teacher review completed", description: `${assessment.student_name}'s ${label(assessment.level_id)} result is now finished.` });
  };

  if (loading) return <div className="flex justify-center py-16"><Loader2 className="h-7 w-7 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-4"><Users className="h-5 w-5 text-primary" /><p className="mt-3 text-2xl font-bold">{students.length}</p><p className="text-xs text-muted-foreground">Assigned students</p></div>
        <div className="rounded-xl border bg-card p-4"><TrendingUp className="h-5 w-5 text-emerald-600" /><p className="mt-3 text-2xl font-bold">{average}%</p><p className="text-xs text-muted-foreground">Average accuracy</p></div>
        <div className="rounded-xl border bg-card p-4"><ClipboardCheck className="h-5 w-5 text-amber-600" /><p className="mt-3 text-2xl font-bold">{pendingReviews.length}</p><p className="text-xs text-muted-foreground">Tests awaiting review</p></div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div><h2 className="text-xl font-bold">Student course progress</h2><p className="mt-1 text-sm text-muted-foreground">Only students assigned to your groups are shown.</p></div>
        <div className="relative w-full sm:w-64"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search students" className="pl-9" /></div>
      </div>

      {filtered.length === 0 ? <div className="rounded-xl border bg-card p-10 text-center text-sm text-muted-foreground">No assigned students found.</div> : <div className="space-y-3">
        {filtered.map((student) => {
          const studentLessons = lessons[student.user_id] || [];
          const isOpen = expanded === student.user_id;
          const completed = studentLessons.filter((lesson) => lesson.completed);
          return <div key={`${student.user_id}-${student.group_id}`} className="overflow-hidden rounded-xl border bg-card shadow-soft">
            <Button variant="ghost" onClick={() => void toggleStudent(student.user_id)} className="h-auto w-full justify-between rounded-none p-4 text-left hover:bg-muted/40">
              <span className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">{student.student_name.slice(0, 2).toUpperCase()}</span><span className="min-w-0"><span className="block truncate font-semibold">{student.student_name}</span><span className="mt-0.5 block truncate text-xs font-normal text-muted-foreground">{label(student.group_level)}{student.group_days ? ` · ${student.group_days}` : ""} · {student.status}</span></span></span>
              <span className="flex shrink-0 items-center gap-3"><span className="hidden text-right sm:block"><span className="block text-sm font-bold">{student.lessons_completed} lessons</span><span className="text-[11px] text-muted-foreground">{student.in_progress_count} in progress</span></span>{isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</span>
            </Button>
            <div className="grid gap-3 border-t bg-muted/10 px-4 py-3 sm:grid-cols-4"><span><b>{student.avg_accuracy}%</b><small className="ml-1 text-muted-foreground">accuracy</small></span><span><b>{student.total_xp.toLocaleString()}</b><small className="ml-1 text-muted-foreground">XP</small></span><span><b>{student.current_streak}d</b><small className="ml-1 text-muted-foreground"><Flame className="ml-1 inline h-3 w-3" /> streak</small></span><span><b>{student.last_activity_date || "Never"}</b><small className="ml-1 text-muted-foreground">last active</small></span></div>
            {isOpen && <div className="border-t px-4 py-4">{loadingLessons === student.user_id ? <Loader2 className="mx-auto h-5 w-5 animate-spin text-primary" /> : <div className="space-y-2">{studentLessons.length === 0 ? <p className="text-sm text-muted-foreground">No lesson activity yet.</p> : <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{studentLessons.map((lesson) => <div key={`${lesson.level_id}-${lesson.lesson_number}`} className="rounded-lg border bg-background p-3"><div className="flex items-center justify-between gap-2"><span className="truncate text-xs font-semibold">{label(lesson.level_id)} · Lesson {lesson.lesson_number}</span>{lesson.completed ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> : <span className="text-[10px] text-muted-foreground">Started</span>}</div><Progress value={lesson.completed ? 100 : 35} className="mt-2 h-1.5" />{lesson.score !== null && <p className="mt-1 text-[10px] text-muted-foreground">Score: {lesson.score}%</p>}</div>)}</div>}<p className="pt-2 text-[11px] text-muted-foreground">Showing {completed.length} completed of {studentLessons.length} recorded lessons.</p></div>}</div>}
          </div>;
        })}
      </div>}

      <section className="space-y-3"><div><h2 className="text-xl font-bold">Level tests to finish with students</h2><p className="mt-1 text-sm text-muted-foreground">Review the result with the student, then mark the teacher step complete.</p></div>{assessments.length === 0 ? <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">No level tests have been submitted yet.</div> : <div className="space-y-2">{assessments.map((assessment) => <div key={assessment.id} className="rounded-xl border bg-card p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">{assessment.student_name} · {label(assessment.level_id)}</p><p className="mt-1 text-xs text-muted-foreground">Score {assessment.score}/{assessment.total_questions} · {assessment.passed ? "Passed" : "Needs practice"} · {new Date(assessment.completed_at).toLocaleDateString()}</p></div><span className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${assessment.teacher_reviewed ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-amber-500/10 text-amber-700 dark:text-amber-400"}`}>{assessment.teacher_reviewed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <MessageCircle className="h-3.5 w-3.5" />}{assessment.teacher_reviewed ? "Finished" : "Finish with student"}</span></div>{!assessment.teacher_reviewed && <div className="mt-3 flex flex-col gap-2 sm:flex-row"><Input value={notes[assessment.id] || ""} onChange={(event) => setNotes((current) => ({ ...current, [assessment.id]: event.target.value }))} placeholder="Optional teacher note" /><Button onClick={() => void finishReview(assessment)} disabled={reviewing === assessment.id} className="shrink-0 gap-2">{reviewing === assessment.id && <Loader2 className="h-4 w-4 animate-spin" />}Complete review</Button></div>}{assessment.teacher_reviewed && assessment.teacher_note && <p className="mt-3 rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground">{assessment.teacher_note}</p>}</div>)}</div>}</section>
    </div>
  );
}
