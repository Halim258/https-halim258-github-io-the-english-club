import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ChevronRight, ClipboardCheck, Loader2, MessageCircle, RotateCcw, Trophy, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { getLevelAssessment } from "@/data/level-assessments";
import { toast } from "@/hooks/use-toast";

export default function LevelAssessment() {
  const { levelId = "" } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const test = getLevelAssessment(levelId);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);

  const score = useMemo(
    () => answers.reduce((total, answer, index) => total + (test?.questions[index]?.correct === answer ? 1 : 0), 0),
    [answers, test]
  );
  const current = test?.questions[questionIndex];
  const isLast = Boolean(test && questionIndex === test.questions.length - 1);
  const percentage = test ? Math.round((questionIndex / test.questions.length) * 100) : 0;

  if (!test) {
    return (
      <div className="container mx-auto flex min-h-[60vh] max-w-xl items-center justify-center px-4 py-10 text-center">
        <div>
          <h1 className="text-2xl font-bold">Level test not found</h1>
          <Button asChild className="mt-4"><Link to="/courses">Back to courses</Link></Button>
        </div>
      </div>
    );
  }

  const chooseAnswer = (option: number) => {
    if (selected !== null) return;
    setSelected(option);
  };

  const nextQuestion = async () => {
    if (selected === null) return;
    const nextAnswers = [...answers, selected];
    setAnswers(nextAnswers);
    if (!isLast) {
      setQuestionIndex((index) => index + 1);
      setSelected(null);
      return;
    }

    setSaving(true);
    const { error } = await supabase.rpc("submit_level_assessment", {
      _level_id: test.levelId,
      _score: nextAnswers.reduce((total, answer, index) => total + (test.questions[index]?.correct === answer ? 1 : 0), 0),
      _total_questions: test.questions.length,
      _answers: nextAnswers,
    });
    setSaving(false);
    if (error) {
      toast({ title: "Could not save your test", description: error.message, variant: "destructive" });
      return;
    }
    setFinished(true);
  };

  const reset = () => {
    setQuestionIndex(0);
    setAnswers([]);
    setSelected(null);
    setFinished(false);
  };

  if (finished) {
    const finalScore = score;
    const passed = finalScore / test.questions.length >= test.passMark / 100;
    return (
      <main className="container mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <Link to={`/courses/${test.levelId}`} className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to {test.levelId.toUpperCase()}
        </Link>
        <section className="overflow-hidden rounded-2xl border bg-card shadow-soft">
          <div className="border-b bg-primary/5 px-5 py-8 text-center sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              {passed ? <Trophy className="h-8 w-8" /> : <ClipboardCheck className="h-8 w-8" />}
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-primary">{test.title}</p>
            <h1 className="mt-2 text-3xl font-bold">{finalScore} / {test.questions.length}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{passed ? "You are ready for a teacher review." : "Review the lessons and try the test again when you feel ready."}</p>
          </div>
          <div className="space-y-4 px-5 py-6 sm:px-10">
            <div className={`flex items-start gap-3 rounded-xl border p-4 ${passed ? "border-emerald-500/30 bg-emerald-500/5" : "border-amber-500/30 bg-amber-500/5"}`}>
              {passed ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" /> : <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />}
              <div>
                <p className="font-semibold">{passed ? "Test passed" : "Keep practising"}</p>
                <p className="mt-1 text-sm text-muted-foreground">Your result has been sent to your teacher. Complete the final step together in a short review conversation.</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button onClick={reset} variant="outline" className="gap-2"><RotateCcw className="h-4 w-4" /> Try again</Button>
              <Button onClick={() => navigate(`/courses/${test.levelId}`)} className="gap-2"><MessageCircle className="h-4 w-4" /> Finish with your teacher</Button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="container mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <Link to={`/courses/${test.levelId}`} className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to {test.levelId.toUpperCase()}
      </Link>
      <div className="mb-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Final level check</p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{test.title}</h1>
          </div>
          <span className="shrink-0 text-sm font-semibold tabular-nums text-muted-foreground">{questionIndex + 1}/{test.questions.length}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{test.description} Pass mark: {test.passMark}%.</p>
        <Progress value={percentage} className="mt-4 h-2" />
      </div>
      <section className="rounded-2xl border bg-card p-5 shadow-soft sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Question {questionIndex + 1}</p>
        <h2 className="mt-3 text-xl font-bold leading-relaxed">{current?.question}</h2>
        <div className="mt-6 grid gap-3">
          {current?.options.map((option, index) => {
            const answered = selected !== null;
            const correct = index === current.correct;
            const chosen = index === selected;
            return (
              <button
                key={option}
                type="button"
                onClick={() => chooseAnswer(index)}
                className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 text-left text-sm font-medium transition-colors ${
                  answered && correct ? "border-emerald-500 bg-emerald-500/10 text-foreground" :
                  answered && chosen ? "border-destructive bg-destructive/10 text-foreground" :
                  "border-border bg-background hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">{String.fromCharCode(65 + index)}</span>
                <span className="min-w-0 flex-1">{option}</span>
                {answered && correct && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />}
                {answered && chosen && !correct && <XCircle className="h-4 w-4 shrink-0 text-destructive" />}
              </button>
            );
          })}
        </div>
        <Button onClick={nextQuestion} disabled={selected === null || saving} className="mt-6 w-full gap-2 sm:w-auto">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : isLast ? <ClipboardCheck className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          {saving ? "Saving result…" : isLast ? "Finish test" : "Next question"}
        </Button>
      </section>
    </main>
  );
}
