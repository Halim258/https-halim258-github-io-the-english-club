import { LessonData, VocabWord, DialogueLine, GrammarRule, MCQItem } from "./lessons";

/* ── Slide Types ── */
export type SlideType =
  | "title"
  | "vocabulary"
  | "dialogue"
  | "grammar"
  | "exercise"
  | "summary"
  | "info";

export interface Slide {
  id: string;
  type: SlideType;
  title: string;
  subtitle?: string;
  content: SlideContent;
  image?: string;
  bgColor?: string;
  emoji?: string;
}

export type SlideContent =
  | { kind: "title"; heading: string; description: string; level: string; lessonNumber: number }
  | { kind: "vocab"; words: VocabWord[] }
  | { kind: "dialogue"; lines: DialogueLine[] }
  | { kind: "grammar"; rule: GrammarRule }
  | { kind: "exercise"; label: string; questions: MCQItem[] }
  | { kind: "summary"; points: string[] }
  | { kind: "info"; paragraphs: string[] };

/* ── Generate slides from lesson data ── */
export function generateSlides(lesson: LessonData): Slide[] {
  const slides: Slide[] = [];
  const id = (n: number) => `slide-${n}`;
  let n = 0;

  // 1. Title slide
  slides.push({
    id: id(n++),
    type: "title",
    title: lesson.title,
    subtitle: lesson.description,
    emoji: "📘",
    bgColor: "from-primary/10 to-primary/5",
    content: {
      kind: "title",
      heading: lesson.title,
      description: lesson.description,
      level: lesson.levelLabel,
      lessonNumber: lesson.lessonNumber,
    },
  });

  // 2. Vocabulary slides (4 words per slide — fits without scrolling)
  const vocabChunks = chunkArray(lesson.vocabulary, 4);
  vocabChunks.forEach((chunk, i) => {
    slides.push({
      id: id(n++),
      type: "vocabulary",
      title: "Vocabulary",
      subtitle: vocabChunks.length > 1 ? `Part ${i + 1} of ${vocabChunks.length}` : undefined,
      emoji: "📚",
      bgColor: "from-blue-500/10 to-blue-500/5",
      content: { kind: "vocab", words: chunk },
    });
  });

  // 3. Dialogue slides (max 5 lines per slide)
  if (lesson.dialogue.length > 0) {
    const dialogueChunks = chunkArray(lesson.dialogue, 5);
    dialogueChunks.forEach((chunk, i) => {
      slides.push({
        id: id(n++),
        type: "dialogue",
        title: "Conversation",
        subtitle: dialogueChunks.length > 1 ? `Part ${i + 1} of ${dialogueChunks.length}` : undefined,
        emoji: "💬",
        bgColor: "from-emerald-500/10 to-emerald-500/5",
        content: { kind: "dialogue", lines: chunk },
      });
    });
  }

  // 4. Grammar slide
  slides.push({
    id: id(n++),
    type: "grammar",
    title: "Grammar",
    subtitle: lesson.grammar.title,
    emoji: "📝",
    bgColor: "from-violet-500/10 to-violet-500/5",
    content: { kind: "grammar", rule: lesson.grammar },
  });

  // 5. Vocab exercises (3 questions per slide)
  if (lesson.vocabExercises.length > 0) {
    const chunks = chunkArray(lesson.vocabExercises, 3);
    chunks.forEach((chunk, i) => {
      slides.push({
        id: id(n++),
        type: "exercise",
        title: "Vocabulary Practice",
        subtitle: chunks.length > 1 ? `Part ${i + 1} of ${chunks.length}` : undefined,
        emoji: "✏️",
        bgColor: "from-orange-500/10 to-orange-500/5",
        content: { kind: "exercise", label: "Vocabulary", questions: chunk },
      });
    });
  }

  // 6. Conversation exercises (3 questions per slide)
  if (lesson.conversationExercises.length > 0) {
    const chunks = chunkArray(lesson.conversationExercises, 3);
    chunks.forEach((chunk, i) => {
      slides.push({
        id: id(n++),
        type: "exercise",
        title: "Conversation Practice",
        subtitle: chunks.length > 1 ? `Part ${i + 1} of ${chunks.length}` : undefined,
        emoji: "🗣️",
        bgColor: "from-teal-500/10 to-teal-500/5",
        content: { kind: "exercise", label: "Conversation", questions: chunk },
      });
    });
  }

  // 7. Grammar exercises (3 questions per slide)
  if (lesson.grammarExercises.length > 0) {
    const chunks = chunkArray(lesson.grammarExercises, 3);
    chunks.forEach((chunk, i) => {
      slides.push({
        id: id(n++),
        type: "exercise",
        title: "Grammar Practice",
        subtitle: chunks.length > 1 ? `Part ${i + 1} of ${chunks.length}` : undefined,
        emoji: "📐",
        bgColor: "from-pink-500/10 to-pink-500/5",
        content: { kind: "exercise", label: "Grammar", questions: chunk },
      });
    });
  }

  // 8. Exam (3 questions per slide)
  if (lesson.examQuestions.length > 0) {
    const chunks = chunkArray(lesson.examQuestions, 3);
    chunks.forEach((chunk, i) => {
      slides.push({
        id: id(n++),
        type: "exercise",
        title: "Lesson Exam",
        subtitle: chunks.length > 1 ? `Part ${i + 1} of ${chunks.length}` : undefined,
        emoji: "✅",
        bgColor: "from-red-500/10 to-red-500/5",
        content: { kind: "exercise", label: "Exam", questions: chunk },
      });
    });
  }

  // 9. Homework (3 questions per slide)
  if (lesson.homeworkQuestions.length > 0) {
    const chunks = chunkArray(lesson.homeworkQuestions, 3);
    chunks.forEach((chunk, i) => {
      slides.push({
        id: id(n++),
        type: "exercise",
        title: "Homework",
        subtitle: chunks.length > 1 ? `Part ${i + 1} of ${chunks.length}` : undefined,
        emoji: "📖",
        bgColor: "from-amber-500/10 to-amber-500/5",
        content: { kind: "exercise", label: "Homework", questions: chunk },
      });
    });
  }

  // 10. Summary slide
  slides.push({
    id: id(n++),
    type: "summary",
    title: "Lesson Complete!",
    emoji: "🎉",
    bgColor: "from-primary/10 to-accent/10",
    content: {
      kind: "summary",
      points: [
        `Learned ${lesson.vocabulary.length} new words`,
        `Practiced ${lesson.grammar.title}`,
        `Completed conversation & grammar exercises`,
        `Ready for the next lesson!`,
      ],
    },
  });

  return slides;
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
