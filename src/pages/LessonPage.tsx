import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Volume2, Eye, EyeOff, ChevronLeft, ChevronRight, CheckCircle2, XCircle, RotateCcw, Presentation } from "lucide-react";
import { lessons, MCQItem, VocabWord, DialogueLine } from "@/data/lessons";

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

/* ───── Flip Card for Vocabulary ───── */
function VocabCard({ item, showArabic }: { item: VocabWord; showArabic: boolean }) {
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
            <p className="mt-2 text-sm text-muted-foreground font-sans">Tap to flip</p>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 border-accent/30 bg-card shadow-lg p-6"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <p className="text-lg font-semibold text-foreground text-center font-sans">{item.meaning}</p>
            <p className="mt-3 text-sm text-muted-foreground italic text-center font-sans">"{item.example}"</p>
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
function DialogueCard({ line, index }: { line: DialogueLine; index: number }) {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className={`w-full max-w-sm rounded-2xl border-2 p-8 shadow-lg ${index % 2 === 0 ? "bg-card border-primary/20" : "bg-muted/30 border-muted"}`}>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3 font-sans">{line.speaker}</p>
        <p className="text-xl font-sans leading-relaxed">{line.text}</p>
      </div>
    </div>
  );
}

/* ───── Grammar Card ───── */
function GrammarCard({ lesson }: { lesson: typeof lessons[string] }) {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border-2 border-primary/20 bg-card p-6 shadow-lg">
        <h3 className="text-xl font-bold text-foreground mb-3">{lesson.grammar.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed font-sans">{lesson.grammar.explanation}</p>
      </div>
    </div>
  );
}

function GrammarExampleCard({ example }: { example: { sentence: string; note: string } }) {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border-2 border-accent/20 bg-primary/5 p-8 shadow-lg">
        <p className="text-xl font-semibold text-foreground font-sans">{example.sentence}</p>
        <p className="mt-3 text-sm text-muted-foreground font-sans">{example.note}</p>
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

/* ───── Speaking placeholder card ───── */
function SpeakingCard() {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border-2 border-primary/20 bg-card p-8 shadow-lg text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
          <Volume2 className="h-7 w-7 text-primary" />
        </div>
        <h3 className="text-xl font-bold">AI Speaking Practice</h3>
        <p className="mt-2 text-sm text-muted-foreground font-sans">
          Practice pronunciation with AI voice recognition.
        </p>
        <Button className="mt-4" disabled>Coming Soon</Button>
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
  { id: "conversation", label: "Conversation", icon: "💬" },
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

  const [activeTab, setActiveTab] = useState<TabId>("vocabulary");
  const [cardIndex, setCardIndex] = useState(0);
  const [showArabic, setShowArabic] = useState(false);

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
          <VocabCard key={`v-${i}`} item={w} showArabic={showArabic} />
        ));
        const exerciseCards = lesson.vocabExercises.map((q, i) => (
          <MCQCard key={`ve-${i}`} item={q} />
        ));
        return [
          <SectionTitleCard key="title" title="Vocabulary" icon="📚" />,
          ...vocabCards,
          <SectionTitleCard key="ex-title" title="Exercises" icon="✏️" />,
          ...exerciseCards,
        ];
      }
      case "conversation": {
        const dialogueCards = lesson.dialogue.map((line, i) => (
          <DialogueCard key={`d-${i}`} line={line} index={i} />
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
          <GrammarExampleCard key={`ge-${i}`} example={ex} />
        ));
        const exerciseCards = lesson.grammarExercises.map((q, i) => (
          <MCQCard key={`gex-${i}`} item={q} />
        ));
        return [
          <GrammarCard key="grammar" lesson={lesson} />,
          ...exampleCards,
          <SectionTitleCard key="ex-title" title="Exercises" icon="✏️" />,
          ...exerciseCards,
        ];
      }
      case "speaking":
        return [<SpeakingCard key="speaking" />];
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

  const goNext = () => setCardIndex((i) => Math.min(i + 1, totalCards - 1));
  const goPrev = () => setCardIndex((i) => Math.max(i - 1, 0));

  const switchTab = (tab: TabId) => {
    setActiveTab(tab);
    setCardIndex(0);
  };

  return (
    <Shell>
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-card px-4 py-2">
        <Link to="/courses" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-sans">
          <ChevronLeft className="h-4 w-4" /> Exit
        </Link>
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-primary font-sans">{lesson.levelLabel}</p>
          <p className="text-xs font-medium text-foreground font-sans">{lesson.title}</p>
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
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => switchTab(tab.id)}
            className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors font-sans ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground border"
            }`}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
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
    </Shell>
  );
}
