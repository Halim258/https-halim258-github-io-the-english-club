import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, User, Calendar, ChevronDown, ChevronUp } from "lucide-react";

interface AnswerRow {
  id: string;
  user_id: string;
  level_id: string;
  lesson_number: number;
  question_index: number;
  question_text: string;
  answer_text: string;
  updated_at: string;
  profiles?: { full_name: string | null } | null;
}

const COURSE_LABELS: Record<string, string> = {
  speaking: "Speaking",
  listening: "Listening",
  pronunciation: "Pronunciation",
};

export default function StudentAnswersReview() {
  const [answers, setAnswers] = useState<AnswerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCourse, setFilterCourse] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadAnswers();
  }, []);

  const loadAnswers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("discussion_answers")
      .select("*, profiles:user_id(full_name)")
      .order("updated_at", { ascending: false })
      .limit(200);

    if (!error && data) {
      setAnswers(data as unknown as AnswerRow[]);
    }
    setLoading(false);
  };

  const filtered = filterCourse === "all" 
    ? answers 
    : answers.filter(a => a.level_id === filterCourse);

  // Group by student
  const grouped = filtered.reduce<Record<string, AnswerRow[]>>((acc, a) => {
    const name = (a.profiles as any)?.full_name || "Unknown Student";
    if (!acc[name]) acc[name] = [];
    acc[name].push(a);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Student Discussion Answers
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {answers.length} answers from {Object.keys(grouped).length} students
          </p>
        </div>
        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          className="rounded-lg border bg-card px-3 py-2 text-sm"
        >
          <option value="all">All Courses</option>
          {Object.entries(COURSE_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No answers yet</p>
          <p className="text-sm">Students' discussion answers will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([studentName, studentAnswers]) => (
            <div key={studentName} className="rounded-xl border bg-card shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === studentName ? null : studentName)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">{studentName}</p>
                    <p className="text-xs text-muted-foreground">{studentAnswers.length} answers</p>
                  </div>
                </div>
                {expandedId === studentName ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {expandedId === studentName && (
                <div className="border-t divide-y">
                  {studentAnswers.map((a) => (
                    <div key={a.id} className="px-4 py-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                          {COURSE_LABELS[a.level_id] || a.level_id} L{a.lesson_number}
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(a.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground mb-1">{a.question_text}</p>
                      <div className="rounded-lg bg-muted/50 px-3 py-2">
                        <p className="text-sm text-foreground/80 whitespace-pre-wrap">{a.answer_text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
