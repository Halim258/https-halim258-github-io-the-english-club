import type { LessonData } from "./lessons";

const L = (
  lessonNumber: number,
  title: string,
  description: string,
  vocabulary: LessonData["vocabulary"],
  dialogue: LessonData["dialogue"],
  grammar: LessonData["grammar"],
  vocabExercises: LessonData["vocabExercises"],
  conversationExercises: LessonData["conversationExercises"],
  grammarExercises: LessonData["grammarExercises"],
  examQuestions: LessonData["examQuestions"],
  homeworkQuestions: LessonData["homeworkQuestions"],
): LessonData => ({
  levelId: "es-b1",
  levelLabel: "Español B1 — Umbral",
  lessonNumber,
  title,
  description,
  vocabulary,
  dialogue,
  grammar,
  vocabExercises,
  conversationExercises,
  grammarExercises,
  examQuestions,
  homeworkQuestions,
});

const v = (word: string, meaning: string, example: string, emoji: string) => ({ word, meaning, example, emoji, arabic: "" });

export const esB1Lessons: Record<string, LessonData> = {
