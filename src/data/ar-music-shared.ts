import type { LessonData, VocabWord, DialogueLine, MCQItem } from "./lessons";

export interface MusicLessonInput {
  levelId: string;
  levelLabel: string;
  lessonNumber: number;
  title: string;
  description: string;
  vocab: Array<{ word: string; meaning: string; example: string; emoji: string }>;
  dialogue: DialogueLine[];
  concept: {
    title: string;
    explanation: string;
    tips: Array<{ sentence: string; note: string }>;
  };
  exam: MCQItem[];
  homework: MCQItem[];
}

function pickDistractors<T>(all: T[], correct: T, count: number): T[] {
  const pool = all.filter((x) => x !== correct);
  const out: T[] = [];
  const step = Math.max(1, Math.floor(pool.length / count));
  for (let i = 0; i < count && i * step < pool.length; i++) out.push(pool[i * step]);
  while (out.length < count && pool.length) out.push(pool[out.length % pool.length]);
  return out;
}

function autoVocabMCQs(vocab: MusicLessonInput["vocab"]): MCQItem[] {
  const meanings = vocab.map((v) => v.meaning.split("—")[0].trim());
  const items: MCQItem[] = [];
  const picks = [0, 3, 6, 9, 12].filter((i) => i < vocab.length).slice(0, 5);
  picks.forEach((i) => {
    const v = vocab[i];
    const correct = v.meaning.split("—")[0].trim();
    const distractors = pickDistractors(meanings, correct, 3);
    const options = [correct, ...distractors];
    for (let k = options.length - 1; k > 0; k--) {
      const j = (i + k) % (k + 1);
      [options[k], options[j]] = [options[j], options[k]];
    }
    items.push({
      question: `ما معنى «${v.word}»؟`,
      options,
      correct: options.indexOf(correct),
    });
  });
  return items;
}

function autoConversationMCQs(input: MusicLessonInput): MCQItem[] {
  return input.concept.tips.slice(0, 5).map((tip) => ({
    question: `في التطبيق الموسيقي: ${tip.sentence}`,
    options: [
      tip.note,
      "لا علاقة له بالموسيقى.",
      "يستخدم فقط في المسرح.",
      "خطوة اختيارية غير مؤثرة.",
    ],
    correct: 0,
  }));
}

function autoConceptMCQs(input: MusicLessonInput): MCQItem[] {
  const tips = input.concept.tips;
  const out: MCQItem[] = [];
  for (let i = 0; i < 5; i++) {
    const tip = tips[i % tips.length];
    out.push({
      question: `أي مما يلي يعكس مبدأ: «${input.concept.title}»؟`,
      options: [
        tip.sentence,
        "تجاهل الإيقاع تمامًا.",
        "العزف بدون استماع.",
        "الاعتماد على الحفظ فقط بلا فهم.",
      ],
      correct: 0,
    });
  }
  return out;
}

export function buildMusicLesson(input: MusicLessonInput): LessonData {
  const vocabulary: VocabWord[] = input.vocab.map((v) => ({
    word: v.word,
    meaning: v.meaning,
    example: v.example,
    emoji: v.emoji,
    arabic: "",
  }));

  return {
    levelId: input.levelId,
    levelLabel: input.levelLabel,
    lessonNumber: input.lessonNumber,
    title: input.title,
    description: input.description,
    vocabulary,
    dialogue: input.dialogue,
    grammar: {
      title: input.concept.title,
      explanation: input.concept.explanation,
      examples: input.concept.tips,
    },
    vocabExercises: autoVocabMCQs(input.vocab),
    conversationExercises: autoConversationMCQs(input),
    grammarExercises: autoConceptMCQs(input),
    examQuestions: input.exam,
    homeworkQuestions: input.homework,
  };
}