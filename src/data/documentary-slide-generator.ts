import type { DocumentaryLessonData } from "./documentary-course";
import type { Slide } from "./slide-types";
import type { VocabWord, MCQItem } from "./lessons";

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

export function generateDocumentarySlides(doc: DocumentaryLessonData): Slide[] {
  const slides: Slide[] = [];
  let n = 0;
  const id = (num: number) => `doc-slide-${num}`;

  // 1. Title slide
  slides.push({
    id: id(n++),
    type: "title",
    title: doc.title,
    emoji: doc.emoji,
    bgColor: "from-teal-50/50 to-emerald-50/50 dark:from-teal-950/10 dark:to-emerald-950/10",
    content: {
      kind: "title",
      heading: doc.title,
      description: `🎥 ${doc.documentaryTitle} — ${doc.description}`,
      level: `Documentary — ${doc.level}`,
      lessonNumber: doc.id,
    },
  });

  // 2. Video slide
  slides.push({
    id: id(n++),
    type: "video",
    title: "🎥 Watch the Documentary Clip",
    emoji: "🎥",
    bgColor: "from-slate-50/30 to-gray-50/30 dark:from-slate-950/10 dark:to-gray-950/10",
    content: {
      kind: "video",
      youtubeId: doc.youtubeId,
      sceneContext: doc.sceneContext,
      culturalNote: doc.culturalNote,
      movieTitle: doc.documentaryTitle,
    },
  });

  // 3. Vocabulary data (used by both transcript and vocab slides)
  const vocabWordsList: VocabWord[] = doc.vocabulary.map((w) => ({
    word: w.word,
    meaning: w.meaning,
    example: w.example,
    emoji: w.emoji,
    arabic: w.arabic,
  }));
  const vocabWordNames = doc.vocabulary.map((v) => v.word.toLowerCase());

  // 4. Transcript slides (interactive tap-to-translate)
  const transcriptChunks = chunkArray(doc.transcript, 4);
  transcriptChunks.forEach((chunk, i) => {
    slides.push({
      id: id(n++),
      type: "transcript",
      title: transcriptChunks.length > 1 ? `📝 Transcript — Part ${i + 1}` : "📝 Transcript",
      subtitle: "Tap each line to reveal translation",
      emoji: "📝",
      bgColor: "from-amber-50/30 to-yellow-50/30 dark:from-amber-950/10 dark:to-yellow-950/10",
      content: {
        kind: "transcript",
        lines: chunk,
        vocabWords: vocabWordNames,
      },
    });
  });

  // 5. Vocabulary slides (4 words per slide)
  const vocabChunks = chunkArray(vocabWordsList, 4);
  vocabChunks.forEach((chunk, i) => {
    slides.push({
      id: id(n++),
      type: "vocabulary",
      title: vocabChunks.length > 1 ? `📚 Vocabulary — Part ${i + 1}` : "📚 Vocabulary",
      subtitle: `${chunk.length} words`,
      emoji: "📚",
      bgColor: "from-blue-50/30 to-indigo-50/30 dark:from-blue-950/10 dark:to-indigo-950/10",
      content: { kind: "vocab", words: chunk },
    });
  });

  // 5. Expressions slide(s)
  if (doc.expressions.length > 0) {
    const exprChunks = chunkArray(doc.expressions, 4);
    exprChunks.forEach((chunk, i) => {
      slides.push({
        id: id(n++),
        type: "expressions",
        title: exprChunks.length > 1 ? `🎭 Key Expressions — Part ${i + 1}` : "🎭 Key Expressions",
        emoji: "🎭",
        bgColor: "from-purple-50/30 to-pink-50/30 dark:from-purple-950/10 dark:to-pink-950/10",
        content: { kind: "expressions", items: chunk },
      });
    });
  }

  // 6. Quiz slides (2 questions per slide)
  const questions: MCQItem[] = doc.questions.map((q) => ({
    question: q.question,
    options: q.options,
    correct: q.correct,
  }));
  const quizChunks = chunkArray(questions, 2);
  quizChunks.forEach((chunk, i) => {
    slides.push({
      id: id(n++),
      type: "exercise",
      title: quizChunks.length > 1 ? `✏️ Quiz — Part ${i + 1}` : "✏️ Comprehension Quiz",
      emoji: "✏️",
      bgColor: "from-green-50/30 to-emerald-50/30 dark:from-green-950/10 dark:to-emerald-950/10",
      content: { kind: "exercise", label: "Quiz", questions: chunk },
    });
  });

  return slides;
}
