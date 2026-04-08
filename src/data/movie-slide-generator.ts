import type { MovieLessonData } from "./movies-course";
import type { Slide } from "./slide-types";
import type { VocabWord, MCQItem } from "./lessons";

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

export function generateMovieSlides(movie: MovieLessonData): Slide[] {
  const slides: Slide[] = [];
  let n = 0;
  const id = (num: number) => `movie-slide-${num}`;

  // 1. Title slide
  slides.push({
    id: id(n++),
    type: "title",
    title: movie.title,
    emoji: movie.emoji,
    bgColor: "from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/10 dark:to-purple-950/10",
    content: {
      kind: "title",
      heading: movie.title,
      description: `🎬 ${movie.movieTitle} — ${movie.description}`,
      level: `Movies — ${movie.level}`,
      lessonNumber: movie.id,
    },
  });

  // 2. Video slide
  slides.push({
    id: id(n++),
    type: "video",
    title: "🎬 Watch the Scene",
    emoji: "🎬",
    bgColor: "from-slate-50/30 to-gray-50/30 dark:from-slate-950/10 dark:to-gray-950/10",
    content: {
      kind: "video",
      youtubeId: movie.youtubeId,
      sceneContext: movie.sceneContext,
      culturalNote: movie.culturalNote,
      movieTitle: movie.movieTitle,
    },
  });

  // 3. Vocabulary slides (4 words per slide)
  const vocabWords: VocabWord[] = movie.vocabulary.map((w) => ({
    word: w.word,
    meaning: `${w.meaning} — "${w.example}"`,
    emoji: w.emoji,
    arabic: w.arabic,
  }));
  const vocabChunks = chunkArray(vocabWords, 4);
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

  // 4. Expressions slide(s) (4 per slide)
  if (movie.expressions.length > 0) {
    const exprChunks = chunkArray(movie.expressions, 4);
    exprChunks.forEach((chunk, i) => {
      slides.push({
        id: id(n++),
        type: "expressions",
        title: exprChunks.length > 1 ? `🎭 Famous Expressions — Part ${i + 1}` : "🎭 Famous Expressions",
        emoji: "🎭",
        bgColor: "from-purple-50/30 to-pink-50/30 dark:from-purple-950/10 dark:to-pink-950/10",
        content: { kind: "expressions", items: chunk },
      });
    });
  }

  // 5. Quiz slides (2 questions per slide)
  const questions: MCQItem[] = movie.questions.map((q) => ({
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
