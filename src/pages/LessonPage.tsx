import { forwardRef, useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Eye, EyeOff, ChevronLeft, ChevronRight, CheckCircle2, XCircle, RotateCcw, Presentation, Play, Trophy, MessageCircle, Save, Loader2, Sparkles, Lightbulb, PencilLine, Search } from "lucide-react";
import { lessons, MCQItem, VocabWord, DialogueLine } from "@/data/lessons";
import { useTTS } from "@/hooks/useTTS";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { getDiscussionPrompts, isCommunicationCourse, DiscussionPrompt } from "@/data/discussion-prompts";
import { getSpeakingQuestions, type SpeakingQuestion } from "@/data/speaking-questions";
import { getGrammarPoints, getGrammarTrueFalse, type GrammarPoint } from "@/data/grammar-points";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useStudyTimer } from "@/lib/study-time";
import { AnswerReward, XPBadge, playRewardSound, XP_PER_CORRECT } from "@/components/lesson/AnswerReward";
import ReflectionCard from "@/components/lesson/ReflectionCard";
import { toast } from "@/hooks/use-toast";
import {
  setSlideProgress,
  getSlideProgress,
  hydrateSlideProgressFromCloud,
} from "@/hooks/useSlideProgress";
import { getLessonPosition, setLessonPosition } from "@/lib/lesson-position";

/* ───── Fullscreen no-scroll shell ───── */
const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className="fixed inset-0 flex flex-col bg-background overflow-hidden">
    {children}
  </div>
);

/* ───── Progress bar — thin editorial hairline ───── */
const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="h-1 w-full bg-primary/10">
    <div
      className="h-full bg-primary transition-all duration-500 ease-out"
      style={{ width: `${((current + 1) / total) * 100}%` }}
    />
  </div>
);

/* ───── Navigation footer — editorial tactile controls ───── */
const NavFooter = ({
  onPrev,
  onNext,
  canPrev,
  canNext,
  current,
  total,
}: {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  current: number;
  total: number;
}) => {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="flex items-center justify-between border-t border-border/60 bg-card px-4 sm:px-6 py-3 sm:py-4 safe-area-bottom">
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className={`group flex items-center gap-2 border px-4 sm:px-6 py-2.5 sm:py-3 text-[11px] font-semibold uppercase tracking-[0.18em] font-sans transition-colors min-h-[44px] touch-manipulation ${
          canPrev
            ? "border-border text-foreground/70 hover:bg-muted hover:text-foreground"
            : "border-border/40 text-muted-foreground/40 cursor-not-allowed"
        }`}
      >
        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        <span className="hidden sm:inline">Back</span>
      </button>

      <div className="flex flex-col items-center gap-1.5 min-w-0">
        <span className="text-[13px] font-bold text-foreground font-sans tabular-nums">
          {current + 1} <span className="text-muted-foreground/60 font-normal mx-0.5">/</span> {total}
        </span>
        <div className="w-24 h-[3px] bg-primary/10 overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!canNext}
        className={`group flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3 text-[11px] font-semibold uppercase tracking-[0.18em] font-sans transition-transform min-h-[44px] touch-manipulation ${
          canNext
            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90 active:scale-[0.97]"
            : "bg-muted text-muted-foreground/50 cursor-not-allowed"
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
};

/* ───── Audio Button ───── */
const AudioButton = forwardRef<HTMLButtonElement, { text: string; speak: (t: string) => void; speaking: boolean }>(function AudioButton({ text, speak, speaking }, ref) {
  return (
    <button
      ref={ref}
      onClick={(e) => { e.stopPropagation(); speak(text); }}
      className="flex items-center justify-center rounded-full h-9 w-9 bg-primary/10 hover:bg-primary/20 text-primary transition-colors shrink-0"
      aria-label="Listen"
    >
      {speaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </button>
  );
});

/* ───── Difficulty Badge ───── */
function DifficultyBadge({ lessonNumber }: { lessonNumber: number }) {
  let label: string;
  let color: string;
  if (lessonNumber <= 7) {
    label = "Easy";
    color = "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400";
  } else if (lessonNumber <= 14) {
    label = "Medium";
    color = "bg-amber-500/15 text-amber-700 dark:text-amber-400";
  } else {
    label = "Hard";
    color = "bg-red-500/15 text-red-700 dark:text-red-400";
  }
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${color}`}>
      {label}
    </span>
  );
}

/* ───── Flip Card for Vocabulary ───── */
function VocabCard({ item, showArabic, speak, speaking, onFlip }: { item: VocabWord; showArabic: boolean; speak: (t: string) => void; speaking: boolean; onFlip?: (word: string) => void }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-1 items-center justify-center px-3 sm:px-4 py-2">
      <div
        className="relative w-full max-w-xs aspect-[4/5] max-h-[min(70vh,420px)] cursor-pointer group"
        style={{ perspective: "800px" }}
        onClick={() => {
          setFlipped(!flipped);
          if (!flipped) onFlip?.(item.word);
        }}
      >
        <div
          className="absolute inset-0 transition-transform duration-600 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 border-primary/20 bg-card shadow-lg p-4 group-hover:border-primary/40 group-hover:shadow-xl transition-all duration-300"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
            <h2 className="text-2xl font-bold text-foreground text-center px-2">{item.word}</h2>
            <div className="mt-3">
              <AudioButton text={item.word} speak={speak} speaking={speaking} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground font-sans">Tap to flip — flipping unlocks its exercise</p>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              <div className={`h-1.5 w-6 rounded-full transition-colors ${!flipped ? "bg-primary" : "bg-muted"}`} />
              <div className={`h-1.5 w-6 rounded-full transition-colors ${flipped ? "bg-primary" : "bg-muted"}`} />
            </div>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 border-accent/30 bg-card shadow-lg p-4 overflow-y-auto"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <p className="text-base font-semibold text-foreground text-center font-sans">{item.meaning}</p>
            <p className="mt-2 text-xs text-muted-foreground italic text-center font-sans">"{item.example}"</p>
            <div className="mt-2">
              <AudioButton text={item.example} speak={speak} speaking={speaking} />
            </div>
            {showArabic && (
              <p className="mt-3 text-lg font-bold text-primary" dir="rtl">{item.arabic}</p>
            )}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              <div className={`h-1.5 w-6 rounded-full transition-colors ${!flipped ? "bg-primary" : "bg-muted"}`} />
              <div className={`h-1.5 w-6 rounded-full transition-colors ${flipped ? "bg-primary" : "bg-muted"}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── Dialogue Card ───── */
function DialogueCard({ line, index, speak, speaking }: { line: DialogueLine; index: number; speak: (t: string) => void; speaking: boolean }) {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className={`w-full max-w-sm rounded-2xl border-2 p-8 shadow-lg ${index % 2 === 0 ? "bg-card border-primary/20" : "bg-muted/30 border-muted"}`}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold uppercase tracking-wider text-primary font-sans">{line.speaker}</p>
          <AudioButton text={line.text} speak={speak} speaking={speaking} />
        </div>
        <p className="text-xl font-sans leading-relaxed">{line.text}</p>
      </div>
    </div>
  );
}

/* ───── Grammar Card ───── */
function GrammarCard({ lesson, speak, speaking }: { lesson: typeof lessons[string]; speak: (t: string) => void; speaking: boolean }) {
  const example =
    lesson.grammar.examples?.[0]?.sentence ||
    lesson.vocabulary?.find((v) => v.example)?.example ||
    "";
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border-2 border-primary/20 bg-card p-6 shadow-lg">
        <h3 className="text-xl font-bold text-foreground mb-3">{lesson.grammar.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed font-sans">{lesson.grammar.explanation}</p>
        {example && (
          <div className="mt-4 rounded-xl border border-accent/30 bg-primary/5 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary font-sans mb-1.5">Example</p>
            <div className="flex items-start justify-between gap-3">
              <p className="text-base font-semibold text-foreground font-sans leading-relaxed">{example}</p>
              <AudioButton text={example} speak={speak} speaking={speaking} />
            </div>
          </div>
        )}
        <div className="mt-4 flex justify-center">
          <AudioButton text={lesson.grammar.explanation} speak={speak} speaking={speaking} />
        </div>
      </div>
    </div>
  );
}

function GrammarExampleCard({ example, speak, speaking }: { example: { sentence: string; note: string }; speak: (t: string) => void; speaking: boolean }) {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border-2 border-accent/20 bg-primary/5 p-8 shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-xl font-semibold text-foreground font-sans">{example.sentence}</p>
            <p className="mt-3 text-sm text-muted-foreground font-sans">{example.note}</p>
          </div>
          <AudioButton text={example.sentence} speak={speak} speaking={speaking} />
        </div>
      </div>
    </div>
  );
}

/* ───── One of five related grammar points ───── */
function GrammarPointCard({
  point,
  index,
  total,
  speak,
  speaking,
}: {
  point: GrammarPoint;
  index: number;
  total: number;
  speak: (t: string) => void;
  speaking: boolean;
}) {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border-2 border-primary/20 bg-card p-6 shadow-lg">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground font-sans">
          Grammar point {index + 1} of {total}
        </p>
        <h3 className="mt-2 text-xl font-bold text-foreground">{point.title.replace(/^\d+\.\s*/, "")}</h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-sans">{point.explanation}</p>
        {point.example && (
          <div className="mt-4 rounded-xl border border-accent/30 bg-primary/5 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary font-sans mb-1.5">Example</p>
            <div className="flex items-start justify-between gap-3">
              <p className="text-base font-semibold text-foreground font-sans leading-relaxed">{point.example}</p>
              <AudioButton text={point.example} speak={speak} speaking={speaking} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


/* ───── MCQ Card ───── */
function MCQCard({ item, onAnswer }: { item: MCQItem; onAnswer?: (correct: boolean) => { xp: number; combo: number } | void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [reward, setReward] = useState<{ correct: boolean; xp: number; combo: number } | null>(null);
  const answered = selected !== null;

  const handleSelect = (i: number) => {
    if (answered) return;
    const isCorrect = i === item.correct;
    setSelected(i);
    const res = onAnswer?.(isCorrect) || undefined;
    playRewardSound(isCorrect);
    setReward({ correct: isCorrect, xp: res?.xp ?? XP_PER_CORRECT, combo: res?.combo ?? 0 });
  };

  return (
    <div className="relative flex flex-1 items-center justify-center px-4">
      {reward && <AnswerReward correct={reward.correct} combo={reward.combo} xp={reward.xp} />}
      <div className="w-full max-w-sm">
        <p className="mb-5 text-lg font-semibold text-foreground text-center font-sans leading-relaxed">{item.question}</p>
        <div className="grid gap-2.5">
          {item.options.map((opt, i) => {
            let cls = "rounded-xl border-2 px-4 py-3.5 text-sm text-left transition-all duration-300 font-sans ";
            if (!answered) cls += "hover:bg-muted hover:border-primary/40 hover:scale-[1.02] cursor-pointer border-border active:scale-[0.98]";
            else if (i === item.correct) cls += "border-accent bg-accent/10 text-accent-foreground scale-[1.02] shadow-sm";
            else if (i === selected) cls += "border-destructive bg-destructive/10 scale-[0.98] opacity-80";
            else cls += "opacity-30 border-border scale-[0.97]";
            return (
              <button
                key={i}
                className={cls}
                onClick={() => handleSelect(i)}
                disabled={answered}
              >
                <span className="flex items-center gap-3">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold shrink-0 transition-colors duration-300 ${
                    answered && i === item.correct ? "bg-accent text-accent-foreground" :
                    answered && i === selected ? "bg-destructive text-destructive-foreground" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </span>
              </button>
            );
          })}
        </div>
        {answered && (
          <div className={`mt-4 text-sm font-medium font-sans flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-300 ${
            selected === item.correct 
              ? "text-accent bg-accent/10 border border-accent/20" 
              : "text-destructive bg-destructive/10 border border-destructive/20"
          }`}>
            {selected === item.correct ? (
              <><CheckCircle2 className="h-4 w-4" /> Correct! 🎉</>
            ) : (
              <><XCircle className="h-4 w-4" /> Answer: {item.options[item.correct]}</>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ───── Score Summary Card ───── */
function ScoreSummaryCard({ scoreRef, total, onRetry }: { scoreRef: React.MutableRefObject<{ correct: number; answered: number }>; total: number; onRetry?: () => void }) {
  const [, forceUpdate] = useState(0);
  const { correct, answered } = scoreRef.current;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const allDone = answered === total;

  // Force re-render when this card is viewed
  useEffect(() => {
    const interval = setInterval(() => forceUpdate(n => n + 1), 500);
    return () => clearInterval(interval);
  }, []);

  let emoji = "🏆";
  let message = "Perfect score! Amazing!";
  let color = "border-accent/30 bg-accent/5";
  if (pct < 100 && pct >= 80) { emoji = "🌟"; message = "Great job! Almost perfect!"; color = "border-accent/30 bg-accent/5"; }
  else if (pct >= 60) { emoji = "👍"; message = "Good effort! Keep practicing!"; color = "border-primary/30 bg-primary/5"; }
  else if (pct >= 1) { emoji = "💪"; message = "Keep going! Practice makes perfect."; color = "border-muted bg-muted/30"; }
  else if (answered === 0) { emoji = "📝"; message = "Answer the exercises above, then come back!"; color = "border-muted bg-muted/30"; }

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className={`w-full max-w-sm rounded-2xl border-2 ${color} p-6 shadow-lg text-center`}>
        <span className="text-5xl mb-3 block">{emoji}</span>
        <h3 className="text-xl font-bold font-display text-foreground">
          {allDone ? "Exercise Complete!" : "Score Summary"}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 font-sans">{message}</p>

        {/* Score ring */}
        <div className="flex justify-center my-5">
          <div className="relative h-28 w-28">
            <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="42" fill="none"
                stroke={pct >= 80 ? "hsl(var(--accent))" : pct >= 60 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - (answered > 0 ? pct / 100 : 0))}`}
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold font-display text-foreground">{answered > 0 ? `${pct}%` : "—"}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 text-sm font-sans">
          <div className="text-center">
            <p className="text-lg font-bold text-accent">{correct}</p>
            <p className="text-[11px] text-muted-foreground">Correct</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-lg font-bold text-destructive">{answered - correct}</p>
            <p className="text-[11px] text-muted-foreground">Incorrect</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-lg font-bold text-muted-foreground">{total - answered}</p>
            <p className="text-[11px] text-muted-foreground">Remaining</p>
          </div>
        </div>

        {answered > 0 && onRetry && (
          <button
            onClick={onRetry}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border-2 border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/20 transition-all duration-200 active:scale-95"
          >
            <RotateCcw className="h-4 w-4" /> Retry Exercises
          </button>
        )}
      </div>
    </div>
  );
}

/* ───── Speaking question card (topic-related questions only) ───── */
function SpeakingQuestionCard({
  item,
  index,
  total,
  storageKey,
  speak,
  speaking,
}: {
  item: SpeakingQuestion;
  index: number;
  total: number;
  storageKey: string;
  speak: (t: string) => void;
  speaking: boolean;
}) {
  const [note, setNote] = useState<string>(() => {
    try {
      return localStorage.getItem(storageKey) ?? "";
    } catch {
      return "";
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, note);
    } catch {
      /* ignore */
    }
  }, [storageKey, note]);

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-4">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
        <div className="flex items-center justify-between gap-3 bg-gradient-to-br from-primary/90 to-primary/70 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-foreground/20 text-xl">
              🗣️
            </span>
            <div>
              <h3 className="text-base font-bold text-primary-foreground font-sans">Speaking Practice</h3>
              <p className="text-xs text-primary-foreground/80 font-sans">
                Question {index + 1} of {total}
              </p>
            </div>
          </div>
          <AudioButton text={item.question} speak={speak} speaking={speaking} />
        </div>

        <div className="space-y-4 px-6 py-5">
          <p className="text-lg font-medium leading-relaxed text-foreground font-sans">{item.question}</p>

          {item.hint ? (
            <div className="flex items-start gap-3 rounded-2xl bg-muted/50 p-4">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground font-sans">{item.hint}</p>
            </div>
          ) : null}

          <Button size="sm" onClick={() => speak(item.question)} className="gap-2">
            <Play className="h-4 w-4" /> Listen to the question
          </Button>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground font-sans">
              <PencilLine className="h-3.5 w-3.5" />
              <span>Notes for your answer (optional)</span>
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Key words you want to use…"
              className="w-full min-h-[90px] resize-y rounded-xl border border-border bg-background p-3 text-sm leading-relaxed text-foreground font-sans placeholder:text-muted-foreground/60 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


/* ───── Discussion Prompt Card ───── */
function DiscussionPromptCard({ prompt, index, levelId, lessonNumber, userId, speak, speaking }: { 
  prompt: DiscussionPrompt; index: number; levelId: string; lessonNumber: number; userId: string | null;
  speak: (t: string) => void; speaking: boolean;
}) {
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load existing answer
  useEffect(() => {
    if (!userId) return;
    supabase
      .from("discussion_answers")
      .select("answer_text")
      .eq("user_id", userId)
      .eq("level_id", levelId)
      .eq("lesson_number", lessonNumber)
      .eq("question_index", index)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.answer_text) {
          setUserAnswer(data.answer_text);
          setSaved(true);
        }
      });
  }, [userId, levelId, lessonNumber, index]);

  const handleSave = async () => {
    if (!userId || !userAnswer.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("discussion_answers").upsert({
      user_id: userId,
      level_id: levelId,
      lesson_number: lessonNumber,
      question_index: index,
      question_text: prompt.question,
      answer_text: userAnswer.trim(),
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,level_id,lesson_number,question_index" });
    setSaving(false);
    if (error) {
      toast({ title: "Error saving", description: error.message, variant: "destructive" });
    } else {
      setSaved(true);
      toast({ title: "Answer saved! ✅" });
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border-2 border-primary/20 bg-card p-6 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{prompt.emoji}</span>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              Question {index + 1}
            </span>
          </div>
          <AudioButton text={prompt.question} speak={speak} speaking={speaking} />
        </div>
        <p className="text-lg font-semibold text-foreground mb-4 font-sans leading-relaxed">{prompt.question}</p>
        
        <textarea
          className="w-full rounded-xl border-2 border-border bg-muted/30 p-3 text-sm font-sans resize-none focus:border-primary/40 focus:outline-none transition-colors"
          rows={3}
          placeholder="Type your answer here..."
          value={userAnswer}
          onChange={(e) => { setUserAnswer(e.target.value); setSaved(false); }}
        />

        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors font-sans font-medium"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            {showHint ? "Hide hint" : "Show hint"}
          </button>

          {userId && (
            <button
              onClick={handleSave}
              disabled={saving || !userAnswer.trim() || saved}
              className="flex items-center gap-1.5 text-xs font-sans font-medium rounded-full px-3 py-1.5 transition-colors disabled:opacity-50 bg-primary/10 text-primary hover:bg-primary/20"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : saved ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
              {saving ? "Saving..." : saved ? "Saved" : "Save"}
            </button>
          )}
        </div>

        {showHint && (
          <div className="mt-2 rounded-lg bg-primary/5 border border-primary/10 px-3 py-2">
            <p className="text-sm text-muted-foreground font-sans italic">{prompt.hint}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───── Sound intro card (phonics) — "this is the sound you are learning" ───── */
function SoundIntroCard({
  sound,
  speak,
}: {
  sound: { grapheme: string; ipa: string; hint: string; words: string[] };
  speak: (text: string) => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-3xl border-2 border-primary/20 bg-gradient-to-b from-primary/10 to-background p-6 text-center shadow-sm">
        <p className="text-xs font-sans font-semibold uppercase tracking-widest text-primary">
          This lesson's sound
        </p>

        <div className="mt-4 mx-auto flex h-28 w-28 items-center justify-center rounded-2xl bg-primary/15 border-2 border-primary/30">
          <span className="text-6xl font-bold text-primary lowercase leading-none">{sound.grapheme}</span>
        </div>

        <p className="mt-4 text-2xl font-bold text-foreground">
          The letter{sound.grapheme.length > 1 ? "s" : ""} “{sound.grapheme}” say{" "}
          <span className="text-primary">{sound.ipa}</span>
        </p>
        <p className="mt-2 text-sm text-muted-foreground font-sans leading-relaxed">{sound.hint}</p>

        <Button
          size="sm"
          onClick={() => speak(`${sound.grapheme}. ${sound.words.slice(0, 3).join(", ")}`)}
          className="mt-4 gap-2 rounded-full"
        >
          <Volume2 className="h-4 w-4" />
          Hear the sound
        </Button>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {sound.words.map((w) => (
            <button
              key={w}
              onClick={() => speak(w)}
              className="rounded-full border border-primary/25 bg-background px-3 py-1.5 text-sm font-sans font-semibold text-foreground transition-colors hover:bg-primary/10 active:scale-95"
            >
              {w}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───── Section title card ───── */

function SectionTitleCard({ title, icon, note }: { title: string; icon: string; note?: string }) {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="text-center max-w-xs">
        <span className="text-5xl mb-4 block">{icon}</span>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {note && (
          <p className="mt-3 text-xs text-muted-foreground font-sans leading-relaxed">{note}</p>
        )}
      </div>
    </div>
  );
}

/* ───── Word scramble card (end of vocabulary) ───── */
function ScrambleCard({ item, onAnswer }: { item: VocabWord; onAnswer?: (correct: boolean) => void }) {
  const target = item.word.replace(/\s+/g, " ").trim();
  const letters = useMemo(() => {
    const chars = target.split("");
    const shuffled = [...chars];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(((i * 9301 + 49297) % 233280) / 233280 * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.join("") === chars.join("") ? chars.reverse() : shuffled;
  }, [target]);

  const [picked, setPicked] = useState<number[]>([]);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const guess = picked.map((i) => letters[i]).join("");

  const check = (next: number[]) => {
    if (next.length !== letters.length) return;
    const ok = next.map((i) => letters[i]).join("").toLowerCase() === target.toLowerCase();
    setStatus(ok ? "correct" : "wrong");
    playRewardSound(ok);
    onAnswer?.(ok);
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-5 shadow-sm">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-sans">Rearrange the letters</p>
        <p className="mt-2 text-sm text-foreground font-sans">
          Meaning: <span className="font-semibold">{item.meaning}</span> {item.emoji}
        </p>
        <div className="mt-4 min-h-[48px] rounded-xl border-2 border-dashed border-primary/30 bg-muted/40 p-3 text-center text-xl font-bold tracking-[0.3em] text-foreground">
          {guess || "…"}
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {letters.map((ch, i) => (
            <button
              key={`${ch}-${i}`}
              disabled={picked.includes(i) || status === "correct"}
              onClick={() => {
                const next = [...picked, i];
                setPicked(next);
                setStatus("idle");
                check(next);
              }}
              className="h-10 min-w-10 rounded-lg border bg-background px-3 text-lg font-bold text-foreground transition active:scale-90 disabled:opacity-25"
            >
              {ch}
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            onClick={() => { setPicked([]); setStatus("idle"); }}
            className="text-xs font-sans text-muted-foreground underline"
          >
            Reset
          </button>
          {status === "correct" && <span className="text-sm font-semibold text-green-600">✅ {target}</span>}
          {status === "wrong" && <span className="text-sm font-semibold text-destructive">Try again</span>}
        </div>
      </div>
    </div>
  );
}

/* ───── Sentence rearrange card ───── */
function SentenceScrambleCard({ sentence, hint }: { sentence: string; hint?: string }) {
  const target = sentence.trim().replace(/\s+/g, " ");
  const tokens = useMemo(() => target.split(" "), [target]);
  const shuffled = useMemo(() => {
    const arr = [...tokens];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (i * 7 + 3) % (i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join(" ") === target ? [...arr].reverse() : arr;
  }, [tokens, target]);

  const [picked, setPicked] = useState<number[]>([]);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const guess = picked.map((i) => shuffled[i]).join(" ");

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-5 shadow-sm">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-sans">Rearrange to make a sentence</p>
        {hint && <p className="mt-2 text-xs text-muted-foreground font-sans">Hint: {hint}</p>}
        <div className="mt-4 min-h-[56px] rounded-xl border-2 border-dashed border-primary/30 bg-muted/40 p-3 text-center text-base font-medium text-foreground">
          {guess || "…"}
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {shuffled.map((t, i) => (
            <button
              key={`${t}-${i}`}
              disabled={picked.includes(i) || status === "correct"}
              onClick={() => {
                const next = [...picked, i];
                setPicked(next);
                if (next.length === shuffled.length) {
                  const ok = next.map((k) => shuffled[k]).join(" ").toLowerCase() === target.toLowerCase();
                  setStatus(ok ? "correct" : "wrong");
                  playRewardSound(ok);
                } else setStatus("idle");
              }}
              className="rounded-lg border bg-background px-3 py-2 text-sm font-medium text-foreground transition active:scale-95 disabled:opacity-25"
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <button onClick={() => { setPicked([]); setStatus("idle"); }} className="text-xs font-sans text-muted-foreground underline">
            Reset
          </button>
          {status === "correct" && <span className="text-sm font-semibold text-green-600">✅ Correct!</span>}
          {status === "wrong" && <span className="text-sm font-semibold text-destructive">Not yet — try again</span>}
        </div>
      </div>
    </div>
  );
}

/* ───── Match word ↔ meaning card ───── */
function MatchCard({ items }: { items: VocabWord[] }) {
  const meanings = useMemo(() => {
    const arr = items.map((v) => v.meaning);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (i * 5 + 2) % (i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [items]);

  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);

  const pick = (meaning: string) => {
    if (!selectedWord) return;
    const item = items.find((v) => v.word === selectedWord);
    if (item && item.meaning === meaning) {
      setMatched((m) => [...m, selectedWord]);
      setSelectedWord(null);
      setWrong(null);
      playRewardSound(true);
    } else {
      setWrong(meaning);
      playRewardSound(false);
      setTimeout(() => setWrong(null), 700);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-5 shadow-sm">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-sans">Match the pairs</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="space-y-2">
            {items.map((v) => (
              <button
                key={v.word}
                disabled={matched.includes(v.word)}
                onClick={() => setSelectedWord(v.word)}
                className={`w-full rounded-lg border px-2 py-2 text-sm font-semibold transition ${
                  matched.includes(v.word)
                    ? "border-green-500/50 bg-green-500/10 text-green-600"
                    : selectedWord === v.word
                      ? "border-primary bg-primary/10 text-foreground"
                      : "bg-background text-foreground"
                }`}
              >
                {v.word}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {meanings.map((m) => {
              const owner = items.find((v) => v.meaning === m);
              const done = owner ? matched.includes(owner.word) : false;
              return (
                <button
                  key={m}
                  disabled={done}
                  onClick={() => pick(m)}
                  className={`flex w-full flex-col items-center gap-1 rounded-xl border px-2 py-2 transition active:scale-95 ${
                    done
                      ? "border-green-500/50 bg-green-500/10 text-green-600"
                      : wrong === m
                        ? "border-destructive bg-destructive/10 text-destructive"
                        : "bg-background text-foreground"
                  }`}
                >
                  <span className="text-3xl leading-none">{owner?.emoji ?? "❓"}</span>
                  <span className="text-[11px] font-sans leading-tight text-center">{m}</span>
                </button>
              );
            })}
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground font-sans">
          {matched.length === items.length ? "✅ All matched!" : "Tap a word, then tap its picture."}
        </p>

      </div>
    </div>
  );
}


/* ───── Hero image card ───── */
function HeroImageCard({ src, title }: { src: string; title: string }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border-2 border-primary/20 bg-card shadow-lg">
        {errored ? (
          <div className="flex h-56 w-full items-center justify-center bg-muted text-6xl">📖</div>
        ) : (
          <img
            src={src}
            alt={title}
            loading="lazy"
            onError={() => setErrored(true)}
            className="h-56 w-full object-cover"
          />
        )}
        <div className="p-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-primary font-sans">Lección</p>
          <h3 className="mt-1 text-lg font-bold text-foreground">{title}</h3>
        </div>
      </div>
    </div>
  );
}

/* ───── Reading passage card ───── */
function ReadingPassageCard({
  title,
  text,
  speak,
  speaking,
}: {
  title: string;
  text: string;
  speak: (t: string) => void;
  speaking: boolean;
}) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-3">
      <div className="w-full max-w-md rounded-2xl border-2 border-primary/20 bg-card p-5 shadow-lg overflow-y-auto max-h-full">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <AudioButton text={text} speak={speak} speaking={speaking} />
        </div>
        <p className="text-sm text-foreground leading-relaxed font-sans whitespace-pre-line">{text}</p>
      </div>
    </div>
  );
}

/* ───── Picture-point card ───── */
function PictureCard({
  imageUrl,
  caption,
  prompt,
}: {
  imageUrl: string;
  caption?: string;
  prompt: string;
}) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-3">
      <div className="w-full max-w-md rounded-2xl border-2 border-accent/30 bg-card shadow-lg overflow-hidden">
        {errored ? (
          <div className="flex h-48 w-full items-center justify-center bg-muted text-6xl">🖼️</div>
        ) : (
          <img
            src={imageUrl}
            alt={caption ?? prompt}
            loading="lazy"
            onError={() => setErrored(true)}
            className="h-48 w-full object-cover"
          />
        )}
        <div className="p-4">
          {caption && <p className="text-xs font-semibold text-primary font-sans">{caption}</p>}
          <p className="mt-1 text-sm text-foreground font-sans">{prompt}</p>
          <p className="mt-2 text-[11px] text-muted-foreground font-sans">
            👉 Señala mentalmente cada elemento antes de responder las preguntas.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ───── Listening transcript card ───── */
function ListeningCard({
  transcript,
  speak,
  speaking,
}: {
  transcript: string;
  speak: (t: string) => void;
  speaking: boolean;
}) {
  const [showText, setShowText] = useState(false);
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-3">
      <div className="w-full max-w-md rounded-2xl border-2 border-primary/20 bg-card p-5 shadow-lg overflow-y-auto max-h-full">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-foreground">🎧 Escucha</h3>
          <AudioButton text={transcript} speak={speak} speaking={speaking} />
        </div>
        <p className="text-xs text-muted-foreground font-sans mb-3">
          Escucha el audio 2 veces. Después responde las preguntas.
        </p>
        <button
          onClick={() => setShowText((v) => !v)}
          className="text-xs font-semibold text-primary underline font-sans"
        >
          {showText ? "Ocultar transcripción" : "Ver transcripción"}
        </button>
        {showText && (
          <p className="mt-3 text-sm text-foreground leading-relaxed font-sans whitespace-pre-line border-t pt-3">
            {transcript}
          </p>
        )}
      </div>
    </div>
  );
}

/* ───── Free-response prompt card (writing / speaking) ───── */
function PromptCard({
  title,
  icon,
  prompt,
  storageKey,
  isSpeaking,
  speak,
  speaking,
}: {
  title: string;
  icon: string;
  prompt: string;
  storageKey: string;
  isSpeaking?: boolean;
  speak: (t: string) => void;
  speaking: boolean;
}) {
  const [text, setText] = useState<string>(() => {
    try {
      return localStorage.getItem(storageKey) ?? "";
    } catch {
      return "";
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, text);
    } catch {
      /* ignore */
    }
  }, [storageKey, text]);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const goal = 15;
  const progress = Math.min(wordCount / goal, 1);

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-4">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
        {/* Warm header */}
        <div className="relative bg-gradient-to-br from-primary/90 to-primary/70 px-6 py-5">
          <div className="absolute right-3 top-3 opacity-10">
            <Sparkles className="h-16 w-16 text-primary-foreground" />
          </div>
          <div className="relative flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-foreground/20 text-2xl backdrop-blur-sm">
                {icon}
              </span>
              <div>
                <h3 className="text-lg font-bold text-primary-foreground font-sans">{title}</h3>
                <p className="text-xs text-primary-foreground/80 font-sans">Actividad de investigación</p>
              </div>
            </div>
            <AudioButton text={prompt} speak={speak} speaking={speaking} />
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div className="flex items-start gap-3 rounded-2xl bg-muted/50 p-4">
            <Search className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-foreground font-sans">{prompt}</p>
          </div>

          {isSpeaking ? (
            <div className="flex items-start gap-3 rounded-2xl bg-accent/10 p-4">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <p className="text-sm text-foreground font-sans">
                Grábate hablando 1 minuto. Después escríbelo abajo para recordarlo.
              </p>
            </div>
          ) : null}

          {/* Textarea */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground font-sans">
              <PencilLine className="h-3.5 w-3.5" />
              <span>Tu respuesta</span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escribe aquí todo lo que encontraste…"
              className="w-full min-h-[140px] rounded-xl border border-border bg-background p-4 text-sm leading-relaxed text-foreground font-sans placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-shadow resize-y"
            />
          </div>

          {/* Footer: progress + save note */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative h-2.5 w-24 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground font-sans">
                {wordCount} / {goal} palabras
              </span>
              {wordCount >= goal && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-sans">
                  <CheckCircle2 className="h-3.5 w-3.5" /> ¡Meta lograda!
                </span>
              )}
            </div>
            <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-sans">
              <Save className="h-3 w-3" /> Se guarda automáticamente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── Tab selector ───── */
const TABS = [
  { id: "vocabulary", label: "Vocabulary", icon: "📚" },
  { id: "reading", label: "Reading", icon: "📖" },
  { id: "conversation", label: "Conversation", altLabel: "Discussion", icon: "💬", altIcon: "🗣️" },
  { id: "grammar", label: "Grammar", icon: "📐" },
  { id: "activity", label: "Activity", icon: "🎯" },
  { id: "speaking", label: "Speaking", icon: "🗣️" },
  { id: "exam", label: "Exam", icon: "📝" },
  { id: "homework", label: "Homework", icon: "📋" },
  { id: "reflect", label: "What I Learned", icon: "✍️" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* Phonics is an early-reader course: fewer sections, playful labels, bigger type. */
const PHONICS_TABS: Partial<Record<TabId, { label: string; icon: string; color: string }>> = {
  vocabulary: { label: "Sounds", icon: "🔤", color: "bg-sky-500" },
  reading: { label: "Read", icon: "📖", color: "bg-emerald-500" },
  conversation: { label: "Talk", icon: "💬", color: "bg-amber-500" },
  activity: { label: "Play", icon: "🎲", color: "bg-fuchsia-500" },
  exam: { label: "Quiz", icon: "⭐", color: "bg-violet-500" },
};

function isPhonicsCourse(levelId: unknown) {
  return typeof levelId === "string" && levelId.startsWith("phonics");
}

function tabIsVisible(tab: (typeof TABS)[number], lesson: { reading?: unknown; heroImage?: unknown; levelId?: unknown }) {
  if (isPhonicsCourse(lesson.levelId)) {
    if (!PHONICS_TABS[tab.id]) return false;
    if (tab.id === "reading") return Boolean(lesson.reading || lesson.heroImage);
    return true;
  }
  if (tab.id === "reading") {
    return Boolean(lesson.reading || lesson.heroImage);
  }
  if (tab.id === "activity") {
    // Written research activity — available for Spanish, German, and English lessons.
    const lid = typeof lesson.levelId === "string" ? lesson.levelId : "";
    if (!lid) return false;
    if (lid.startsWith("it-")) return false;
    return true;
  }
  return true;
}


/* ───── Main Lesson Page ───── */
export default function LessonPage() {
  const { levelId, lessonId } = useParams();
  const navigate = useNavigate();
  const key = `${levelId}-${lessonId}`;
  const lesson = lessons[key];
  const { speak, stop, speaking } = useTTS();
  const { markComplete } = useLessonProgress();
  const { user } = useAuth();
  useStudyTimer(user?.id, levelId);

  // Music, drawing, and speech therapy courses use the slide-based template.
  useEffect(() => {
    if (
      typeof levelId === "string" &&
      (levelId.startsWith("ar-mus") || levelId.startsWith("ar-draw") || levelId.startsWith("ar-th") || levelId.startsWith("ar-sp"))
    ) {
      navigate(`/courses/${levelId}/${lessonId}/slides`, { replace: true });
    }
  }, [levelId, lessonId, navigate]);

  const [searchParams] = useSearchParams();
  const slideKey = lesson ? `${lesson.levelId}-${lesson.lessonNumber}` : null;
  const savedPos = slideKey ? getLessonPosition(slideKey) : null;
  const tabParam = searchParams.get("tab");
  const cardParam = Number(searchParams.get("card"));

  const [activeTab, setActiveTab] = useState<TabId>(
    (tabParam || savedPos?.tab || "vocabulary") as TabId
  );
  const [cardIndex, setCardIndex] = useState(
    Number.isFinite(cardParam) && cardParam > 0 ? cardParam : savedPos?.card ?? 0
  );
  const [showArabic, setShowArabic] = useState(false);
  const [lessonDone, setLessonDone] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [flippedWords, setFlippedWords] = useState<string[]>([]);
  const markFlipped = useCallback((word: string) => {
    setFlippedWords((prev) => (prev.includes(word) ? prev : [...prev, word]));
  }, []);

  // Auto-save + resume slide position for this lesson (cloud fallback).
  const resumedRef = useRef<string | null>(null);
  useEffect(() => {
    if (!slideKey || resumedRef.current === slideKey) return;
    resumedRef.current = slideKey;
    if (savedPos || tabParam) return; // local/explicit position wins
    const prior = getSlideProgress(slideKey);
    if (prior && prior.reached > 0) setCardIndex(prior.reached);
    void hydrateSlideProgressFromCloud().then(() => {
      const fresh = getSlideProgress(slideKey);
      if (fresh && fresh.reached > 0) {
        setCardIndex((cur) => (cur === 0 ? fresh.reached : cur));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideKey]);

  // Score tracking refs (one per section)
  const vocabScore = useRef({ correct: 0, answered: 0 });
  const comboRef = useRef(0);
  const [combo, setCombo] = useState(0);
  const [lessonXp, setLessonXp] = useState(0);
  const convScore = useRef({ correct: 0, answered: 0 });
  const grammarScore = useRef({ correct: 0, answered: 0 });
  const examScore = useRef({ correct: 0, answered: 0 });
  const homeworkScore = useRef({ correct: 0, answered: 0 });

  // Swipe support
  const touchStart = useRef<number | null>(null);

  const handleCompleteLesson = async () => {
    if (!levelId || !lesson) return;
    await markComplete(levelId.toUpperCase(), lesson.lessonNumber);
    setLessonDone(true);
  };

  // Keyboard navigation — must be before any early return
  useEffect(() => {
    if (!lesson) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); setCardIndex(i => Math.min(i + 1, 999)); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); setCardIndex(i => Math.max(i - 1, 0)); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lesson]);

  if (!lesson) {
    return (
      <Shell>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Lesson Not Found</h1>
            <p className="mt-2 text-muted-foreground font-sans">This lesson hasn't been created yet.</p>
            <Link to="/courses">
              <Button className="mt-4">Back to Courses</Button>
            </Link>
          </div>
        </div>
      </Shell>
    );
  }

  // Helper to create onAnswer callback for a score ref
  const makeOnAnswer = (ref: React.MutableRefObject<{ correct: number; answered: number }>) => (correct: boolean) => {
    ref.current.answered++;
    if (correct) ref.current.correct++;
    const nextCombo = correct ? comboRef.current + 1 : 0;
    comboRef.current = nextCombo;
    const bonus = correct && nextCombo >= 3 ? 5 : 0;
    const gained = correct ? XP_PER_CORRECT + bonus : 0;
    setCombo(nextCombo);
    if (gained) setLessonXp((x) => x + gained);
    return { xp: gained, combo: nextCombo };
  };

  const handleRetry = (ref: React.MutableRefObject<{ correct: number; answered: number }>) => () => {
    ref.current = { correct: 0, answered: 0 };
    setRetryCount(c => c + 1);
  };

  // Build cards for the active tab
  const buildCards = (): React.ReactNode[] => {
    switch (activeTab) {
      case "vocabulary": {
        const vocabCards = lesson.vocabulary.map((w, i) => (
          <VocabCard key={`v-${i}`} item={w} showArabic={showArabic} speak={speak} speaking={speaking} onFlip={markFlipped} />
        ));
        // Only show exercises for the words the student actually flipped.
        const unlocked = lesson.vocabExercises.filter((q) =>
          flippedWords.some((w) => q.question.toLowerCase().includes(w.toLowerCase()))
        );
        const total = unlocked.length;
        const cards: React.ReactNode[] = [
          <SectionTitleCard
            key="title"
            title={isPhonicsCourse(lesson.levelId) ? "Sounds & Words" : "Vocabulary"}
            icon={isPhonicsCourse(lesson.levelId) ? "🔤" : "📚"}
            note={
              isPhonicsCourse(lesson.levelId)
                ? "Tap each card to hear the sound. Flip a card to unlock its practice question."
                : "Note: exercises only appear for the cards you flip. If you flip none, there are no questions."
            }
          />,
          ...(lesson.soundIntro ?? []).map((s, i) => (
            <SoundIntroCard key={`si-${i}`} sound={s} speak={speak} />
          )),
          ...vocabCards,
        ];
        if (total > 0) {
          cards.push(
            <SectionTitleCard
              key="ex-title"
              title={`Exercises (${total})`}
              icon="✏️"
              note="These questions come from the cards you flipped."
            />,
            ...unlocked.map((q, i) => (
              <MCQCard key={`ve-${i}-${retryCount}`} item={q} onAnswer={makeOnAnswer(vocabScore)} />
            )),
            <ScoreSummaryCard key="score" scoreRef={vocabScore} total={total} onRetry={handleRetry(vocabScore)} />
          );
        }
        // Games at the very end of the vocabulary section.
        const gameWords = (flippedWords.length > 0
          ? lesson.vocabulary.filter((v) => flippedWords.some((w) => w.toLowerCase() === v.word.toLowerCase()))
          : lesson.vocabulary
        ).slice(0, 4);
        const matchWords = gameWords.filter((v) => v.meaning && v.meaning.trim());
        if (matchWords.length >= 3) {
          cards.push(
            <SectionTitleCard key="mt-title" title="Match the Pairs" icon="🔗" note="Match each word with its meaning." />,
            <MatchCard key={`mt-${retryCount}`} items={matchWords} />
          );
        }
        const sentenceItems = gameWords.filter(
          (v) => v.example && v.example.trim().split(/\s+/).length >= 3 && v.example.trim().split(/\s+/).length <= 10
        );
        if (sentenceItems.length > 0) {
          cards.push(
            <SectionTitleCard
              key="ss-title"
              title="Build the Sentence"
              icon="🧩"
              note="Tap the words in the correct order."
            />,
            ...sentenceItems.slice(0, 3).map((v, i) => (
              <SentenceScrambleCard key={`ss-${i}-${retryCount}`} sentence={v.example} hint={`Uses "${v.word}"`} />
            ))
          );
        }
        const scrambleWords = gameWords.filter(
          (v) => v.word.replace(/\s/g, "").length >= 3 && v.word.length <= 12
        );
        if (scrambleWords.length > 0) {
          cards.push(
            <SectionTitleCard
              key="sc-title"
              title="Build the Word"
              icon="🔤"
              note="Tap the letters in the right order to spell each word."
            />,
            ...scrambleWords.map((v, i) => <ScrambleCard key={`sc-${i}-${retryCount}`} item={v} />)
          );
        }
        return cards;
      }
      case "reading": {
        const cards: React.ReactNode[] = [
          <SectionTitleCard key="r-title" title="Reading & Practice" icon="📖" />,
        ];
        if (lesson.heroImage) {
          cards.push(<HeroImageCard key="hero" src={lesson.heroImage} title={lesson.title} />);
        }
        if (lesson.reading) {
          cards.push(
            <ReadingPassageCard
              key="reading"
              title={lesson.reading.title}
              text={lesson.reading.text}
              speak={speak}
              speaking={speaking}
            />
          );
          lesson.reading.questions.forEach((q, i) =>
            cards.push(
              <MCQCard key={`rq-${i}-${retryCount}`} item={q} onAnswer={makeOnAnswer(vocabScore)} />
            )
          );
        }
        return cards;
      }
      case "activity": {
        const lid = lesson.levelId || "";
        const isEs = lid.startsWith("es-");
        const isDe = lid.startsWith("de-");
        const isIt = lid.startsWith("it-");
        const activityPrompt = isEs
          ? `Busca "${lesson.title}" en Google y escribe todas las palabras nuevas que encuentres (mínimo 15). Luego escribe 2 frases completas.`
          : isDe
          ? `Suche "${lesson.title}" bei Google und schreibe alle neuen Wörter auf, die du findest (mindestens 15). Schreibe dann 2 vollständige Sätze.`
          : isIt
          ? `Cerca "${lesson.title}" su Google e scrivi tutte le parole nuove che trovi (minimo 15). Poi scrivi 2 frasi complete.`
          : `Search "${lesson.title}" on Google and write down all the new words you find (at least 15). Then write 2 full sentences.`;
        const sectionTitle = isEs ? "Actividad" : isDe ? "Aktivität" : isIt ? "Attività" : "Activity";
        const cardTitle = isEs ? "Busca y escribe" : isDe ? "Suchen und schreiben" : isIt ? "Cerca e scrivi" : "Search & write";
        return [
          <SectionTitleCard key="a-title" title={sectionTitle} icon="🎯" />,
          <PromptCard
            key="search-write"
            title={cardTitle}
            icon="🔎"
            prompt={activityPrompt}
            storageKey={`activity-${lesson.levelId}-${lesson.lessonNumber}`}
            speak={speak}
            speaking={speaking}
          />,
        ];
      }
      case "conversation": {
        const lessonKey = `${lesson.levelId}-${lesson.lessonNumber}`;
        const prompts = getDiscussionPrompts(lessonKey);
        const isCommunication = isCommunicationCourse(lesson.levelId);
        const isConversationCourse = lesson.levelId === "conversation";

        // Communication courses with discussion prompts from external data
        if (isCommunication && prompts && prompts.length > 0) {
          const promptCards = prompts.map((p, i) => (
            <DiscussionPromptCard key={`dp-${i}`} prompt={p} index={i} levelId={lesson.levelId} lessonNumber={lesson.lessonNumber} userId={user?.id ?? null} speak={speak} speaking={speaking} />
          ));
          const total = lesson.conversationExercises.length;
          const exerciseCards = lesson.conversationExercises.map((q, i) => (
            <MCQCard key={`ce-${i}-${retryCount}`} item={q} onAnswer={makeOnAnswer(convScore)} />
          ));
          return [
            <SectionTitleCard key="title" title="Discussion Questions" icon="🗣️" />,
            ...promptCards,
            ...(total > 0 ? [<SectionTitleCard key="ex-title" title="Practice Questions" icon="✏️" />] : []),
            ...exerciseCards,
            ...(total > 0 ? [<ScoreSummaryCard key="score" scoreRef={convScore} total={total} onRetry={handleRetry(convScore)} />] : []),
          ];
        }

        // Conversation Practice course with inline discussionQuestions
        if (isConversationCourse && lesson.discussionQuestions && lesson.discussionQuestions.length > 0) {
          const promptCards = lesson.discussionQuestions.map((dq, i) => (
            <DiscussionPromptCard
              key={`dq-${i}`}
              prompt={{ question: dq.question, hint: dq.modelAnswer, emoji: dq.emoji }}
              index={i}
              levelId={lesson.levelId}
              lessonNumber={lesson.lessonNumber}
              userId={user?.id ?? null}
              speak={speak}
              speaking={speaking}
            />
          ));
          const total = lesson.conversationExercises.length;
          const exerciseCards = lesson.conversationExercises.map((q, i) => (
            <MCQCard key={`ce-${i}-${retryCount}`} item={q} onAnswer={makeOnAnswer(convScore)} />
          ));
          return [
            <SectionTitleCard key="title" title="Conversation Questions" icon="💬" />,
            ...promptCards,
            ...(total > 0 ? [<SectionTitleCard key="ex-title" title="Practice Questions" icon="✏️" />] : []),
            ...exerciseCards,
            ...(total > 0 ? [<ScoreSummaryCard key="score" scoreRef={convScore} total={total} onRetry={handleRetry(convScore)} />] : []),
          ];
        }

        const dialogueCards = lesson.dialogue.map((line, i) => (
          <DialogueCard key={`d-${i}`} line={line} index={i} speak={speak} speaking={speaking} />
        ));
        const total = lesson.conversationExercises.length;
        const exerciseCards = lesson.conversationExercises.map((q, i) => (
          <MCQCard key={`ce-${i}-${retryCount}`} item={q} onAnswer={makeOnAnswer(convScore)} />
        ));
        return [
          <SectionTitleCard key="title" title="Conversation" icon="💬" />,
          ...dialogueCards,
          ...(total > 0 ? [<SectionTitleCard key="ex-title" title="Exercises" icon="✏️" />] : []),
          ...exerciseCards,
          ...(total > 0 ? [<ScoreSummaryCard key="score" scoreRef={convScore} total={total} onRetry={handleRetry(convScore)} />] : []),
        ];
      }
      case "grammar": {
        const points = getGrammarPoints(lesson);
        const trueFalse = getGrammarTrueFalse(lesson);
        const questions = [...trueFalse, ...lesson.grammarExercises];
        const total = questions.length;
        const rearrangeSentences = points
          .map((p) => p.example)
          .filter((s) => s && s.trim().split(/\s+/).length >= 3 && s.trim().split(/\s+/).length <= 10)
          .slice(0, 3);
        return [
          ...points.map((p, i) => (
            <GrammarPointCard key={`gp-${i}`} point={p} index={i} total={points.length} speak={speak} speaking={speaking} />
          )),
          <SectionTitleCard key="ex-title" title="Grammar Questions" icon="✏️" note="Decide if each sentence is correct or wrong, then choose the correct word." />,
          ...questions.map((q, i) => (
            <MCQCard key={`gex-${i}-${retryCount}`} item={q} onAnswer={makeOnAnswer(grammarScore)} />
          )),
          <ScoreSummaryCard key="score" scoreRef={grammarScore} total={total} onRetry={handleRetry(grammarScore)} />,
          ...(rearrangeSentences.length > 0
            ? [
                <SectionTitleCard key="gs-title" title="Rearrange to Make a Sentence" icon="🧩" note="Tap the words in the correct order." />,
                ...rearrangeSentences.map((s, i) => (
                  <SentenceScrambleCard key={`gs-${i}-${retryCount}`} sentence={s} />
                )),
              ]
            : []),
        ];
      }
      case "speaking": {
        const questions = getSpeakingQuestions(lesson);
        return [
          <SectionTitleCard key="sp-title" title="Speaking Practice" icon="🗣️" />,
          ...questions.map((q, i) => (
            <SpeakingQuestionCard
              key={`sp-${i}`}
              item={q}
              index={i}
              total={questions.length}
              storageKey={`speaking-${lesson.levelId}-${lesson.lessonNumber}-${i}`}
              speak={speak}
              speaking={speaking}
            />
          )),
        ];
      }
      case "exam": {
        const total = lesson.examQuestions.length;
        return [
          <SectionTitleCard key="title" title={`Lesson ${lesson.lessonNumber} Exam`} icon="📝" />,
          ...lesson.examQuestions.map((q, i) => <MCQCard key={`eq-${i}-${retryCount}`} item={q} onAnswer={makeOnAnswer(examScore)} />),
          <ScoreSummaryCard key="score" scoreRef={examScore} total={total} onRetry={handleRetry(examScore)} />,
        ];
      }
      case "homework": {
        const total = lesson.homeworkQuestions.length;
        return [
          <SectionTitleCard key="title" title="Homework" icon="📋" />,
          ...lesson.homeworkQuestions.map((q, i) => <MCQCard key={`hq-${i}-${retryCount}`} item={q} onAnswer={makeOnAnswer(homeworkScore)} />),
          <ScoreSummaryCard key="score" scoreRef={homeworkScore} total={total} onRetry={handleRetry(homeworkScore)} />,
        ];
      }
      case "reflect": {
        return [
          <SectionTitleCard
            key="r-title"
            title="What I Learned"
            icon="✍️"
            note="Write 5 sentences about this lesson — they will be posted to the community feed."
          />,
          <ReflectionCard
            key="reflect"
            lessonTitle={lesson.title}
            levelLabel={String(lesson.levelId || "").toUpperCase()}
            storageKey={`reflect-${lesson.levelId}-${lesson.lessonNumber}`}
          />,
        ];
      }
    }
  };

  const cards = buildCards();
  const totalCards = cards.length;

  // Persist current slide position as the student navigates.
  useEffect(() => {
    if (!slideKey || totalCards <= 0) return;
    setSlideProgress(slideKey, cardIndex, totalCards);
    setLessonPosition(slideKey, activeTab, cardIndex);
  }, [slideKey, cardIndex, totalCards, activeTab]);

  // Determine which tabs are visible for this lesson, in order.
  const isPhonics = isPhonicsCourse(lesson.levelId);
  const visibleTabs = TABS.filter((tab) => tabIsVisible(tab, lesson)).map((tab) => tab.id);


  // Clamp cardIndex to valid range
  const safeIndex = Math.min(cardIndex, totalCards - 1);
  if (safeIndex !== cardIndex) setCardIndex(safeIndex);

  const goNext = () => {
    stop();
    if (cardIndex < totalCards - 1) {
      setCardIndex((i) => Math.min(i + 1, totalCards - 1));
      return;
    }
    // On last card of current tab: advance to the next visible tab if available.
    const currentTabPos = visibleTabs.indexOf(activeTab);
    const nextTab = visibleTabs[currentTabPos + 1];
    if (nextTab) {
      switchTab(nextTab);
    } else {
      handleCompleteLesson();
    }
  };
  const goPrev = () => { stop(); setCardIndex((i) => Math.max(i - 1, 0)); };


  // Swipe navigation
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goNext() : goPrev(); }
    touchStart.current = null;
  };

  const switchTab = (tab: TabId) => {
    stop();
    setActiveTab(tab);
    setCardIndex(0);
    // Reset score refs
    vocabScore.current = { correct: 0, answered: 0 };
    comboRef.current = 0;
    setCombo(0);
    convScore.current = { correct: 0, answered: 0 };
    grammarScore.current = { correct: 0, answered: 0 };
    examScore.current = { correct: 0, answered: 0 };
    homeworkScore.current = { correct: 0, answered: 0 };
  };

  // Calculate exercise start index for "Jump to Exercises" button
  const exerciseStartIndex = activeTab === "vocabulary" ? lesson.vocabulary.length + 2 : 0;

  return (
    <Shell>
      {/* Global progress hairline — top edge */}
      <ProgressBar current={cardIndex} total={totalCards} />

      {/* Header — utility bar */}
      <div className="flex items-center justify-between border-b border-border/60 bg-card px-3 sm:px-6 py-3">
        {/* Left: combined Exit · Slides ink pill */}
        <div className="flex items-center rounded-full bg-foreground text-background shadow-sm overflow-hidden">
          <Link
            to="/courses"
            className="flex items-center gap-1 pl-3.5 pr-2 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] font-sans opacity-80 hover:opacity-100 transition-opacity min-h-[36px] touch-manipulation"
          >
            <ChevronLeft className="h-3 w-3" /> Exit
          </Link>
          <span className="w-px h-3 bg-background/30" />
          <button
            onClick={() => navigate(`/courses/${levelId}/${lessonId}/slides`)}
            className="flex items-center gap-1 pl-2 pr-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] font-sans opacity-80 hover:opacity-100 transition-opacity min-h-[36px] touch-manipulation"
          >
            <Presentation className="h-3 w-3" /> <span className="hidden sm:inline">Slides</span>
          </button>
        </div>

        {/* Center: lesson meta */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="min-w-0 text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-primary font-sans">{lesson.levelLabel}</p>
            <p className="text-[13px] font-semibold text-foreground font-display leading-tight truncate max-w-[140px] sm:max-w-[280px]">
              {lesson.title}
            </p>
          </div>
          <DifficultyBadge lessonNumber={lesson.lessonNumber} />
        </div>

        {/* Right: Arabic toggle */}
        <div className="flex items-center gap-2">
        <XPBadge xp={lessonXp} combo={combo} />
        <button
          onClick={() => setShowArabic(!showArabic)}
          className={`flex items-center gap-1.5 rounded-full border px-2.5 sm:px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] font-sans transition-colors min-h-[36px] touch-manipulation ${
            showArabic
              ? "border-primary/40 bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:text-foreground hover:border-border"
          }`}
          aria-label="Toggle Arabic translations"
        >
          {showArabic ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          <span className="hidden sm:inline">عربي</span>
        </button>
        </div>
      </div>

      {/* Section navigation — playful chunky pills for phonics, editorial tabs elsewhere */}
      <div className={`border-b border-border/60 px-3 sm:px-6 ${isPhonics ? "bg-gradient-to-r from-sky-500/10 via-fuchsia-500/10 to-amber-500/10 py-3" : "bg-card pt-2"}`}>
        <nav className={`flex overflow-x-auto scrollbar-none ${isPhonics ? "gap-2 sm:gap-3" : "gap-4 sm:gap-6"}`} style={{ WebkitOverflowScrolling: 'touch' }}>
          {TABS.filter((tab) => tabIsVisible(tab, lesson)).map((tab) => {
          const isCommunication = isCommunicationCourse(lesson.levelId);
          const kid = isPhonics ? PHONICS_TABS[tab.id] : undefined;
          const displayLabel = kid
            ? kid.label
            : tab.id === "conversation" && isCommunication && "altLabel" in tab
            ? tab.altLabel
            : tab.label;
          const isActive = activeTab === tab.id;
          // Per-tab progress dots (3 pips): filled = current tab's progress ratio
          const dotCount = 3;
          const filledDots = isActive
            ? Math.max(1, Math.min(dotCount, Math.ceil((cardIndex + 1) / totalCards * dotCount)))
            : 0;

          if (kid) {
            return (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 font-display text-base sm:text-lg font-bold transition-all duration-200 touch-manipulation active:scale-95 ${
                  isActive
                    ? `${kid.color} text-white shadow-lg scale-[1.03]`
                    : "bg-card text-foreground/70 border shadow-sm hover:text-foreground hover:-translate-y-0.5"
                }`}
              >
                <span className="text-xl leading-none">{kid.icon}</span>
                {displayLabel}
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className={`group flex flex-col items-center gap-1.5 shrink-0 whitespace-nowrap transition-opacity touch-manipulation ${
                isActive ? "opacity-100" : "opacity-45 hover:opacity-80"
              }`}
            >
              <span
                className={`pb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.14em] font-sans border-b-2 transition-colors ${
                  isActive
                    ? "text-primary border-primary"
                    : "text-foreground border-transparent group-hover:border-border"
                }`}
              >
                {displayLabel}
              </span>
              <div className="flex gap-1 pb-1.5">
                {Array.from({ length: dotCount }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 w-1 rounded-full transition-colors ${
                      i < filledDots ? "bg-primary" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            </button>
          );
        })}
        </nav>
      </div>


      {/* Jump to Exercises button — visible in vocab tab when viewing vocab cards */}
      {activeTab === "vocabulary" && cardIndex < exerciseStartIndex && (
        <div className="flex justify-center py-1.5 bg-muted/20 border-b border-border/40">
          <button
            onClick={() => setCardIndex(exerciseStartIndex)}
            className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary/80 transition-colors font-sans"
          >
            Skip to Exercises ({lesson.vocabExercises.length}) <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Card area — swipe enabled */}
      <div
        className={`flex flex-1 flex-col min-h-0 ${isPhonics ? "kid-type" : ""}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >

        {cards[cardIndex]}
      </div>

      {/* Navigation */}
      <NavFooter
        onPrev={goPrev}
        onNext={goNext}
        canPrev={cardIndex > 0}
        canNext={true}
        current={cardIndex}
        total={totalCards}
      />

      {/* Complete lesson button — show on last card */}
      {cardIndex === totalCards - 1 && !lessonDone && (
        <div className="border-t bg-card px-4 py-3 text-center">
          <Button onClick={handleCompleteLesson} className="rounded-full gap-2 px-6">
            <Trophy className="h-4 w-4" /> Mark Lesson Complete
          </Button>
        </div>
      )}
      {lessonDone && (
        <div className="border-t bg-emerald-50 dark:bg-emerald-950/20 px-4 py-3 text-center">
          <p className="text-sm font-semibold text-emerald-600">✅ Lesson completed! XP awarded.</p>
        </div>
      )}
    </Shell>
  );
}
