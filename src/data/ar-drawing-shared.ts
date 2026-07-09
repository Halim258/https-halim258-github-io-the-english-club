import type { LessonData, VocabWord, DialogueLine, MCQItem } from "./lessons";

export interface DrawingLessonInput {
  levelId: string;
  levelLabel: string;
  lessonNumber: number;
  title: string;
  description: string;
  tools: Array<{ ar: string; en: string; example: string; emoji: string }>;
  steps: string[]; // teacher steps
  conceptTitle: string;
  conceptExplanation: string;
  tips: Array<{ tip: string; note: string }>;
}

export function buildDrawingLesson(input: DrawingLessonInput): LessonData {
  const vocabulary: VocabWord[] = input.tools.map((t) => ({
    word: t.ar,
    meaning: t.en,
    example: t.example,
    emoji: t.emoji,
    arabic: "",
  }));

  const dialogue: DialogueLine[] = [];
  dialogue.push({ speaker: "المعلم", text: `اليوم نرسم: ${input.title}.` });
  input.steps.forEach((s) => dialogue.push({ speaker: "المعلم", text: s }));
  dialogue.push({ speaker: "الطالب", text: "شكرًا! سأجرّب الآن." });

  // Minimal MCQ arrays — required by the type but not rendered by the drawing slide generator.
  const stub: MCQItem[] = [
    { question: `الموضوع: ${input.title}`, options: ["نعم", "لا"], correct: 0 },
  ];

  return {
    levelId: input.levelId,
    levelLabel: input.levelLabel,
    lessonNumber: input.lessonNumber,
    title: input.title,
    description: input.description,
    vocabulary,
    dialogue,
    grammar: {
      title: input.conceptTitle,
      explanation: input.conceptExplanation,
      examples: input.tips.map((t) => ({ sentence: t.tip, note: t.note })),
    },
    vocabExercises: stub,
    conversationExercises: stub,
    grammarExercises: stub,
    examQuestions: stub,
    homeworkQuestions: stub,
  };
}