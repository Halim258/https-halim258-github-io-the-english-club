import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Volume2, Eye, EyeOff, ChevronLeft, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { lessons, MCQItem } from "@/data/lessons";

function MCQ({ question, options, correct }: MCQItem) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="mb-3 font-medium font-sans">{question}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((opt, i) => {
          let cls = "rounded-md border px-3 py-2 text-sm text-left transition-colors font-sans ";
          if (!answered) cls += "hover:bg-muted cursor-pointer";
          else if (i === correct) cls += "border-accent bg-accent/10 text-accent-foreground";
          else if (i === selected) cls += "border-destructive bg-destructive/10";
          else cls += "opacity-50";
          return (
            <button key={i} className={cls} onClick={() => !answered && setSelected(i)} disabled={answered}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <p className={`mt-2 text-sm font-medium font-sans flex items-center gap-1 ${selected === correct ? "text-accent" : "text-destructive"}`}>
          {selected === correct ? (
            <><CheckCircle2 className="h-4 w-4" /> Correct!</>
          ) : (
            <><XCircle className="h-4 w-4" /> Correct answer: {options[correct]}</>
          )}
        </p>
      )}
    </div>
  );
}

export default function LessonPage() {
  const { levelId, lessonId } = useParams();
  const key = `${levelId}-${lessonId}`;
  const lesson = lessons[key];

  if (!lesson) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Lesson Not Found</h1>
        <p className="mt-2 text-muted-foreground font-sans">This lesson hasn't been created yet.</p>
        <Link to="/courses">
          <Button className="mt-4">Back to Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Link to="/courses" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-sans">
        <ChevronLeft className="h-4 w-4" /> Back to Courses
      </Link>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary font-sans">{lesson.levelLabel} — Lesson {lesson.lessonNumber}</p>
        <h1 className="mt-1 text-2xl font-bold">{lesson.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground font-sans">{lesson.description}</p>
      </div>

      <Tabs defaultValue="vocabulary" className="space-y-6">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
          <TabsTrigger value="conversation">Conversation</TabsTrigger>
          <TabsTrigger value="grammar">Grammar</TabsTrigger>
          <TabsTrigger value="speaking">Speaking</TabsTrigger>
          <TabsTrigger value="exam">Exam</TabsTrigger>
          <TabsTrigger value="homework">Homework</TabsTrigger>
        </TabsList>

        {/* VOCABULARY */}
        <TabsContent value="vocabulary" className="space-y-6">
          <div className="grid gap-3">
            {lesson.vocabulary.map((w, i) => (
              <div key={i} className="rounded-lg border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold">{w.word}</span>
                    <span className="ml-3 text-sm text-muted-foreground font-sans">{w.meaning}</span>
                  </div>
                  <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground italic font-sans">"{w.example}"</p>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-semibold">Exercises</h3>
          <div className="space-y-4">
            {lesson.vocabExercises.map((q, i) => (
              <MCQ key={i} {...q} />
            ))}
          </div>
        </TabsContent>

        {/* CONVERSATION */}
        <TabsContent value="conversation" className="space-y-6">
          <div className="space-y-3">
            {lesson.dialogue.map((line, i) => (
              <div key={i} className={`rounded-lg border p-4 ${i % 2 === 0 ? "bg-card" : "bg-muted/30"}`}>
                <p className="text-xs font-semibold text-primary mb-1 font-sans">{line.speaker}</p>
                <p className="text-base font-sans">{line.text}</p>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-semibold">Exercises</h3>
          <div className="space-y-4">
            {lesson.conversationExercises.map((q, i) => (
              <MCQ key={i} {...q} />
            ))}
          </div>
        </TabsContent>

        {/* GRAMMAR */}
        <TabsContent value="grammar" className="space-y-6">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold">{lesson.grammar.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-sans">{lesson.grammar.explanation}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {lesson.grammar.examples.map((ex, i) => (
                <div key={i} className="rounded-lg bg-primary/5 p-3 border border-primary/10">
                  <p className="text-base font-semibold font-sans">{ex.sentence}</p>
                  <p className="mt-1 text-xs text-muted-foreground font-sans">{ex.note}</p>
                </div>
              ))}
            </div>
          </div>
          <h3 className="text-lg font-semibold">Exercises</h3>
          <div className="space-y-4">
            {lesson.grammarExercises.map((q, i) => (
              <MCQ key={i} {...q} />
            ))}
          </div>
        </TabsContent>

        {/* SPEAKING */}
        <TabsContent value="speaking" className="space-y-6">
          <div className="rounded-xl border bg-card p-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
              <Volume2 className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">AI Speaking Practice</h3>
            <p className="mt-2 text-sm text-muted-foreground font-sans">
              Practice pronunciation and conversation with AI-powered voice recognition. Record your answers and get instant feedback.
            </p>
            <p className="mt-4 text-xs text-muted-foreground italic font-sans">
              Speaking practice requires a microphone and will be available when the backend is connected.
            </p>
            <Button className="mt-4" disabled>Coming Soon</Button>
          </div>
        </TabsContent>

        {/* EXAM */}
        <TabsContent value="exam" className="space-y-6">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold">Lesson {lesson.lessonNumber} Exam</h3>
            <p className="text-sm text-muted-foreground mt-1 font-sans">
              Test your knowledge. Your score will be shown at the end.
            </p>
          </div>
          <div className="space-y-4">
            {lesson.examQuestions.map((q, i) => (
              <MCQ key={i} {...q} />
            ))}
          </div>
        </TabsContent>

        {/* HOMEWORK */}
        <TabsContent value="homework" className="space-y-6">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold">Homework</h3>
            <p className="text-sm text-muted-foreground mt-1 font-sans">
              Complete these exercises for practice. Your teacher can review your answers.
            </p>
          </div>
          <div className="space-y-4">
            {lesson.homeworkQuestions.map((q, i) => (
              <MCQ key={i} {...q} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
