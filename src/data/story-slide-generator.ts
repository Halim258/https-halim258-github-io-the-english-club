import type { StoryData } from "./stories-course";
import type { Slide } from "./slide-types";
import type { VocabWord, MCQItem } from "./lessons";

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

export function generateStorySlides(story: StoryData, index: number): Slide[] {
  const slides: Slide[] = [];
  let n = 0;
  const id = (num: number) => `story-slide-${num}`;

  // 1. Title slide
  slides.push({
    id: id(n++),
    type: "title",
    title: story.title,
    emoji: story.emoji,
    bgColor: "from-amber-50/50 to-orange-50/50 dark:from-amber-950/10 dark:to-orange-950/10",
    content: {
      kind: "title",
      heading: story.title,
      description: `A ${story.levelLabel} level story — read, learn vocabulary & test your comprehension!`,
      level: `Stories — ${story.level}`,
      lessonNumber: index + 1,
    },
  });

  // 2. Story text slide(s) — split long stories
  const sentences = story.story.split(/(?<=\.)\s+/);
  const storyChunks = chunkArray(sentences, 6);
  storyChunks.forEach((chunk, i) => {
    slides.push({
      id: id(n++),
      type: "story-text",
      title: storyChunks.length > 1 ? `📖 The Story — Part ${i + 1}` : "📖 The Story",
      emoji: "📖",
      bgColor: "from-amber-50/30 to-yellow-50/30 dark:from-amber-950/10 dark:to-yellow-950/10",
      content: {
        kind: "story-text",
        text: chunk.join(" "),
        moral: i === storyChunks.length - 1 ? story.moral : undefined,
      },
    });
  });

  // 3. Vocabulary slides (4 words per slide)
  const vocabWords: VocabWord[] = story.highlightedWords.map((w) => ({
    word: w.word,
    meaning: w.meaning,
    example: "",
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

  // 4. Quiz slides (2 questions per slide)
  const questions: MCQItem[] = story.questions.map((q) => ({
    question: q.question,
    options: q.options,
    correct: q.correct,
  }));
  const quizChunks = chunkArray(questions, 2);
  quizChunks.forEach((chunk, i) => {
    slides.push({
      id: id(n++),
      type: "exercise",
      title: quizChunks.length > 1 ? `✏️ Comprehension Quiz — Part ${i + 1}` : "✏️ Comprehension Quiz",
      emoji: "✏️",
      bgColor: "from-green-50/30 to-emerald-50/30 dark:from-green-950/10 dark:to-emerald-950/10",
      content: { kind: "exercise", label: "Quiz", questions: chunk },
    });
  });

  return slides;
}
