import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Eye, EyeOff, ChevronLeft, ChevronRight, CheckCircle2, XCircle, RotateCcw, Presentation, Play, Trophy, MessageCircle, Save, Loader2 } from "lucide-react";
import { lessons, MCQItem, VocabWord, DialogueLine } from "@/data/lessons";
import { useTTS } from "@/hooks/useTTS";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { getDiscussionPrompts, isCommunicationCourse, DiscussionPrompt } from "@/data/discussion-prompts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

/* ───── Fullscreen no-scroll shell ───── */
const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className="fixed inset-0 flex flex-col bg-background overflow-hidden">
    {children}
  </div>
);

/* ───── Progress bar ───── */
const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="h-1.5 w-full bg-muted">
    <div
      className="h-full bg-primary transition-all duration-300 ease-out"
      style={{ width: `${((current + 1) / total) * 100}%` }}
    />
  </div>
);

/* ───── Navigation footer ───── */
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
}) => (
  <div className="flex items-center justify-between border-t bg-card px-4 py-3">
    <Button variant="ghost" size="sm" onClick={onPrev} disabled={!canPrev}>
      <ChevronLeft className="h-4 w-4 mr-1" /> Back
    </Button>
    <span className="text-xs text-muted-foreground font-sans">
      {current + 1} / {total}
    </span>
    <Button variant="ghost" size="sm" onClick={onNext} disabled={!canNext}>
      Next <ChevronRight className="h-4 w-4 ml-1" />
    </Button>
  </div>
);

/* ───── Audio Button ───── */
function AudioButton({ text, speak, speaking }: { text: string; speak: (t: string) => void; speaking: boolean }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); speak(text); }}
      className="flex items-center justify-center rounded-full h-9 w-9 bg-primary/10 hover:bg-primary/20 text-primary transition-colors shrink-0"
      aria-label="Listen"
    >
      {speaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </button>
  );
}

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
function VocabCard({ item, showArabic, speak, speaking }: { item: VocabWord; showArabic: boolean; speak: (t: string) => void; speaking: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div
        className="relative w-full max-w-sm aspect-[3/4] cursor-pointer"
        style={{ perspective: "800px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className="absolute inset-0 transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 border-primary/20 bg-card shadow-lg p-6"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="text-6xl mb-4">{item.emoji}</span>
            <h2 className="text-3xl font-bold text-foreground">{item.word}</h2>
            <div className="mt-4">
              <AudioButton text={item.word} speak={speak} speaking={speaking} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground font-sans">Tap to flip</p>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 border-accent/30 bg-card shadow-lg p-6"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <p className="text-lg font-semibold text-foreground text-center font-sans">{item.meaning}</p>
            <p className="mt-3 text-sm text-muted-foreground italic text-center font-sans">"{item.example}"</p>
            <div className="mt-3">
              <AudioButton text={item.example} speak={speak} speaking={speaking} />
            </div>
            {showArabic && (
              <p className="mt-4 text-xl font-bold text-primary" dir="rtl">{item.arabic}</p>
            )}
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
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border-2 border-primary/20 bg-card p-6 shadow-lg">
        <h3 className="text-xl font-bold text-foreground mb-3">{lesson.grammar.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed font-sans">{lesson.grammar.explanation}</p>
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

/* ───── MCQ Card ───── */
function MCQCard({ item }: { item: MCQItem }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <p className="mb-4 text-lg font-semibold text-foreground text-center font-sans">{item.question}</p>
        <div className="grid gap-2">
          {item.options.map((opt, i) => {
            let cls = "rounded-xl border-2 px-4 py-3 text-sm text-left transition-all font-sans ";
            if (!answered) cls += "hover:bg-muted hover:border-primary/40 cursor-pointer border-border";
            else if (i === item.correct) cls += "border-accent bg-accent/10 text-accent-foreground";
            else if (i === selected) cls += "border-destructive bg-destructive/10";
            else cls += "opacity-40 border-border";
            return (
              <button key={i} className={cls} onClick={() => !answered && setSelected(i)} disabled={answered}>
                {opt}
              </button>
            );
          })}
        </div>
        {answered && (
          <p className={`mt-3 text-sm font-medium font-sans flex items-center justify-center gap-1 ${selected === item.correct ? "text-accent" : "text-destructive"}`}>
            {selected === item.correct ? (
              <><CheckCircle2 className="h-4 w-4" /> Correct!</>
            ) : (
              <><XCircle className="h-4 w-4" /> Answer: {item.options[item.correct]}</>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

/* ───── Speaking Card with TTS ───── */
function SpeakingCard({ lesson, speak, speaking }: { lesson: typeof lessons[string]; speak: (t: string) => void; speaking: boolean }) {
  const practiceTexts = lesson.dialogue.map(l => l.text);
  const [currentIdx, setCurrentIdx] = useState(0);

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border-2 border-primary/20 bg-card p-8 shadow-lg text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
          <Volume2 className="h-7 w-7 text-primary" />
        </div>
        <h3 className="text-xl font-bold">Speaking Practice</h3>
        <p className="mt-2 text-sm text-muted-foreground font-sans mb-4">
          Listen and repeat after the audio.
        </p>
        <div className="rounded-xl bg-muted/50 p-4 mb-4">
          <p className="text-base font-medium font-sans">{practiceTexts[currentIdx]}</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button 
            size="sm" 
            onClick={() => speak(practiceTexts[currentIdx])}
            className="gap-2"
          >
            <Play className="h-4 w-4" /> Listen
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setCurrentIdx((i) => (i + 1) % practiceTexts.length)}
          >
            Next Phrase
          </Button>
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">
          {currentIdx + 1} / {practiceTexts.length} phrases
        </p>
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

/* ───── Section title card ───── */
function SectionTitleCard({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="text-center">
        <span className="text-5xl mb-4 block">{icon}</span>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
    </div>
  );
}

/* ───── Tab selector ───── */
const TABS = [
  { id: "vocabulary", label: "Vocabulary", icon: "📚" },
  { id: "conversation", label: "Conversation", altLabel: "Discussion", icon: "💬", altIcon: "🗣️" },
  { id: "grammar", label: "Grammar", icon: "📐" },
  { id: "speaking", label: "Speaking", icon: "🗣️" },
  { id: "exam", label: "Exam", icon: "📝" },
  { id: "homework", label: "Homework", icon: "📋" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* ───── Main Lesson Page ───── */
export default function LessonPage() {
  const { levelId, lessonId } = useParams();
  const navigate = useNavigate();
  const key = `${levelId}-${lessonId}`;
  const lesson = lessons[key];
  const { speak, stop, speaking } = useTTS();
  const { markComplete } = useLessonProgress();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<TabId>("vocabulary");
  const [cardIndex, setCardIndex] = useState(0);
  const [showArabic, setShowArabic] = useState(false);
  const [lessonDone, setLessonDone] = useState(false);

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

  // Build cards for the active tab
  const buildCards = (): React.ReactNode[] => {
    switch (activeTab) {
      case "vocabulary": {
        const vocabCards = lesson.vocabulary.map((w, i) => (
          <VocabCard key={`v-${i}`} item={w} showArabic={showArabic} speak={speak} speaking={speaking} />
        ));
        const exerciseCards = lesson.vocabExercises.map((q, i) => (
          <MCQCard key={`ve-${i}`} item={q} />
        ));
        return [
          <SectionTitleCard key="title" title="Vocabulary" icon="📚" />,
          ...vocabCards,
          <SectionTitleCard key="ex-title" title={`Exercises (${exerciseCards.length})`} icon="✏️" />,
          ...exerciseCards,
        ];
      }
      case "conversation": {
        const lessonKey = `${lesson.levelId}-${lesson.lessonNumber}`;
        const prompts = getDiscussionPrompts(lessonKey);
        const isCommunication = isCommunicationCourse(lesson.levelId);

        if (isCommunication && prompts && prompts.length > 0) {
          const promptCards = prompts.map((p, i) => (
            <DiscussionPromptCard key={`dp-${i}`} prompt={p} index={i} levelId={lesson.levelId} lessonNumber={lesson.lessonNumber} userId={user?.id ?? null} speak={speak} speaking={speaking} />
          ));
          const exerciseCards = lesson.conversationExercises.map((q, i) => (
            <MCQCard key={`ce-${i}`} item={q} />
          ));
          return [
            <SectionTitleCard key="title" title="Discussion Questions" icon="🗣️" />,
            ...promptCards,
            <SectionTitleCard key="ex-title" title="Practice Questions" icon="✏️" />,
            ...exerciseCards,
          ];
        }

        const dialogueCards = lesson.dialogue.map((line, i) => (
          <DialogueCard key={`d-${i}`} line={line} index={i} speak={speak} speaking={speaking} />
        ));
        const exerciseCards = lesson.conversationExercises.map((q, i) => (
          <MCQCard key={`ce-${i}`} item={q} />
        ));
        return [
          <SectionTitleCard key="title" title="Conversation" icon="💬" />,
          ...dialogueCards,
          <SectionTitleCard key="ex-title" title="Exercises" icon="✏️" />,
          ...exerciseCards,
        ];
      }
      case "grammar": {
        const exampleCards = lesson.grammar.examples.map((ex, i) => (
          <GrammarExampleCard key={`ge-${i}`} example={ex} speak={speak} speaking={speaking} />
        ));
        const exerciseCards = lesson.grammarExercises.map((q, i) => (
          <MCQCard key={`gex-${i}`} item={q} />
        ));
        return [
          <GrammarCard key="grammar" lesson={lesson} speak={speak} speaking={speaking} />,
          ...exampleCards,
          <SectionTitleCard key="ex-title" title="Exercises" icon="✏️" />,
          ...exerciseCards,
        ];
      }
      case "speaking":
        return [<SpeakingCard key="speaking" lesson={lesson} speak={speak} speaking={speaking} />];
      case "exam": {
        return [
          <SectionTitleCard key="title" title={`Lesson ${lesson.lessonNumber} Exam`} icon="📝" />,
          ...lesson.examQuestions.map((q, i) => <MCQCard key={`eq-${i}`} item={q} />),
        ];
      }
      case "homework": {
        return [
          <SectionTitleCard key="title" title="Homework" icon="📋" />,
          ...lesson.homeworkQuestions.map((q, i) => <MCQCard key={`hq-${i}`} item={q} />),
        ];
      }
    }
  };

  const cards = buildCards();
  const totalCards = cards.length;

  // Clamp cardIndex to valid range
  const safeIndex = Math.min(cardIndex, totalCards - 1);
  if (safeIndex !== cardIndex) setCardIndex(safeIndex);

  const goNext = () => { stop(); setCardIndex((i) => Math.min(i + 1, totalCards - 1)); };
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
  };

  // Calculate exercise start index for "Jump to Exercises" button
  const exerciseStartIndex = activeTab === "vocabulary" ? lesson.vocabulary.length + 2 : 0;

  return (
    <Shell>
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-card px-4 py-2">
        <div className="flex items-center gap-2">
          <Link to="/courses" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-sans">
            <ChevronLeft className="h-4 w-4" /> Exit
          </Link>
          <button
            onClick={() => navigate(`/courses/${levelId}/${lessonId}/slides`)}
            className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary hover:bg-primary/20 transition-colors"
          >
            <Presentation className="h-3 w-3" /> Slides
          </button>
        </div>
        <div className="text-center flex items-center gap-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary font-sans">{lesson.levelLabel}</p>
            <p className="text-xs font-medium text-foreground font-sans">{lesson.title}</p>
          </div>
          <DifficultyBadge lessonNumber={lesson.lessonNumber} />
        </div>
        <button
          onClick={() => setShowArabic(!showArabic)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-sans"
        >
          {showArabic ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          <span>عربي</span>
        </button>
      </div>

      {/* Tab pills */}
      <div className="flex gap-1 overflow-x-auto px-3 py-2 bg-muted/50 border-b">
        {TABS.map((tab) => {
          const isCommunication = isCommunicationCourse(lesson.levelId);
          const displayLabel = tab.id === "conversation" && isCommunication && "altLabel" in tab ? tab.altLabel : tab.label;
          const displayIcon = tab.id === "conversation" && isCommunication && "altIcon" in tab ? tab.altIcon : tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors font-sans ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground border"
              }`}
            >
              <span>{displayIcon}</span> {displayLabel}
            </button>
          );
        })}
      </div>

      {/* Progress */}
      <ProgressBar current={cardIndex} total={totalCards} />

      {/* Card area */}
      <div className="flex flex-1 flex-col min-h-0">
        {cards[cardIndex]}
      </div>

      {/* Navigation */}
      <NavFooter
        onPrev={goPrev}
        onNext={goNext}
        canPrev={cardIndex > 0}
        canNext={cardIndex < totalCards - 1}
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
