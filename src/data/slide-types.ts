import { LessonData, VocabWord, DialogueLine, GrammarRule, MCQItem, DiscussionQuestion } from "./lessons";
import { songRewards } from "./song-rewards";

/* ── Slide Types ── */
export type SlideType =
  | "title"
  | "vocabulary"
  | "dialogue"
  | "grammar"
  | "exercise"
  | "summary"
  | "info"
  | "story-text"
  | "video"
  | "expressions"
  | "discussion"
  | "transcript"
  | "song-reward"
  | "listening";

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
  | { kind: "info"; paragraphs: string[] }
  | { kind: "story-text"; text: string; moral?: string }
  | { kind: "video"; youtubeId: string; sceneContext: string; culturalNote?: string; movieTitle: string }
  | { kind: "expressions"; items: { phrase: string; meaning: string; arabic: string; emoji: string }[] }
  | { kind: "discussion"; questions: { question: string; modelAnswer: string; emoji: string }[] }
  | { kind: "transcript"; lines: { time: string; text: string; translation: string }[]; vocabWords?: string[] }
  | { kind: "song-reward"; youtubeId: string; title: string; artist: string; message: string }
  | { kind: "listening"; audioContext: string; tip: string; questions: { question: string; options: string[]; correct: number }[] };

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

  // 1b. Video slide (if lesson has a YouTube video)
  if (lesson.youtubeId) {
    slides.push({
      id: id(n++),
      type: "video",
      title: "🎥 Watch the Video",
      emoji: "🎥",
      bgColor: "from-slate-50/30 to-gray-50/30 dark:from-slate-950/10 dark:to-gray-950/10",
      content: {
        kind: "video",
        youtubeId: lesson.youtubeId,
        sceneContext: lesson.videoContext || lesson.description,
        movieTitle: lesson.videoTitle || lesson.title,
      },
    });
  }

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

  // 3. For conversation courses: use discussionQuestions if available
  const isConversation = lesson.levelId === "conversation";
  if (isConversation && lesson.discussionQuestions && lesson.discussionQuestions.length > 0) {
    const discussionChunks = chunkArray(lesson.discussionQuestions, 3);
    discussionChunks.forEach((chunk, i) => {
      slides.push({
        id: id(n++),
        type: "discussion",
        title: "Conversation Questions",
        subtitle: discussionChunks.length > 1 ? `Part ${i + 1} of ${discussionChunks.length}` : undefined,
        emoji: "💭",
        bgColor: "from-emerald-500/10 to-emerald-500/5",
        content: { kind: "discussion", questions: chunk },
      });
    });
  } else if (isConversation) {
    // Fallback: generate discussion from dialogue
    const discussionQuestions = generateDiscussionFromDialogue(lesson);
    const discussionChunks = chunkArray(discussionQuestions, 3);
    discussionChunks.forEach((chunk, i) => {
      slides.push({
        id: id(n++),
        type: "discussion",
        title: "Conversation Questions",
        subtitle: discussionChunks.length > 1 ? `Part ${i + 1} of ${discussionChunks.length}` : undefined,
        emoji: "💭",
        bgColor: "from-emerald-500/10 to-emerald-500/5",
        content: { kind: "discussion", questions: chunk },
      });
    });
  } else if (lesson.dialogue.length > 0) {
    // Standard dialogue slides
    const dialogueChunks = chunkArray(lesson.dialogue, 4);
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

  // 4. Grammar slides (2 examples per slide) — skip for conversation courses
  if (!isConversation) {
    const grammarChunks = lesson.grammar.examples.length > 0
      ? chunkArray(lesson.grammar.examples, 2)
      : [[]];

    grammarChunks.forEach((chunk, i) => {
      slides.push({
        id: id(n++),
        type: "grammar",
        title: "Grammar",
        subtitle:
          grammarChunks.length > 1
            ? `${lesson.grammar.title} — Part ${i + 1} of ${grammarChunks.length}`
            : lesson.grammar.title,
        emoji: "📝",
        bgColor: "from-violet-500/10 to-violet-500/5",
        content: {
          kind: "grammar",
          rule: {
            ...lesson.grammar,
            explanation: i === 0 ? lesson.grammar.explanation : "",
            examples: chunk,
          },
        },
      });
    });
  }

  // 5. Vocab exercises (2 questions per slide)
  if (lesson.vocabExercises.length > 0) {
    const chunks = chunkArray(lesson.vocabExercises, 2);
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

  // 6. Conversation exercises (2 questions per slide)
  if (lesson.conversationExercises.length > 0) {
    const chunks = chunkArray(lesson.conversationExercises, 2);
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

  // 7. Grammar exercises (2 questions per slide)
  if (lesson.grammarExercises.length > 0) {
    const chunks = chunkArray(lesson.grammarExercises, 2);
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

  // 8. Exam (2 questions per slide)
  if (lesson.examQuestions.length > 0) {
    const chunks = chunkArray(lesson.examQuestions, 2);
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

  // 9. Homework (2 questions per slide)
  if (lesson.homeworkQuestions.length > 0) {
    const chunks = chunkArray(lesson.homeworkQuestions, 2);
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

  // 10. Listening comprehension slide (auto-generated from dialogue)
  if (lesson.dialogue.length >= 4 && !isConversation) {
    const listeningQs = generateListeningQuestions(lesson);
    if (listeningQs.length > 0) {
      slides.push({
        id: id(n++),
        type: "listening",
        title: "Listening Practice",
        emoji: "🎧",
        bgColor: "from-cyan-500/10 to-cyan-500/5",
        content: {
          kind: "listening",
          audioContext: `Listen carefully to the conversation about "${lesson.title}" and answer the questions.`,
          tip: "Try to understand the main ideas before answering.",
          questions: listeningQs,
        },
      });
    }
  }

  // 11. Summary slide
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

  // 11. Song reward slide (for all courses)
  {
    const songKey = `${lesson.levelId}-${lesson.lessonNumber}`;
    const song = songRewards[songKey];
    if (song) {
      slides.push({
        id: id(n++),
        type: "song-reward",
        title: "🎵 Song Reward!",
        emoji: "🎶",
        bgColor: "from-pink-500/10 to-purple-500/10",
        content: {
          kind: "song-reward",
          youtubeId: song.youtubeId,
          title: song.title,
          artist: song.artist,
          message: song.message,
        },
      });
    }
  }

  return slides;
}

/* ── Generate discussion questions from dialogue ── */
function generateDiscussionFromDialogue(lesson: LessonData): { question: string; modelAnswer: string; emoji: string }[] {
  const questions: { question: string; modelAnswer: string; emoji: string }[] = [];
  const emojis = ["🤔", "💬", "🗣️", "🎯", "💡", "🌟", "📌", "🧠"];

  // Create questions from dialogue pairs
  for (let i = 0; i < lesson.dialogue.length - 1; i += 2) {
    const q = lesson.dialogue[i];
    const a = lesson.dialogue[i + 1];
    if (q && a) {
      questions.push({
        question: `How would you respond if someone said: "${q.text}"`,
        modelAnswer: a.text,
        emoji: emojis[questions.length % emojis.length],
      });
    }
  }

  // Add topic-based open questions
  questions.push({
    question: `What would you say to start a conversation about "${lesson.title.toLowerCase()}"?`,
    modelAnswer: lesson.dialogue[0]?.text || "Start with a friendly greeting and introduce the topic naturally.",
    emoji: "🚀",
  });

  questions.push({
    question: `How would you politely end a conversation about "${lesson.title.toLowerCase()}"?`,
    modelAnswer: `It was great talking about this! ${lesson.dialogue[lesson.dialogue.length - 1]?.text || "Let's continue next time."}`,
    emoji: "👋",
  });

  return questions;
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
