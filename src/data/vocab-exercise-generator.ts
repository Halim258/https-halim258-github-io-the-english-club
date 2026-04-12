import type { VocabWord, MCQItem, LessonData } from "./lessons";

/**
 * Generates 4 different exercise types for each vocabulary word:
 * 1. Meaning — "What does [word] mean?"
 * 2. Reverse — "Which word means [meaning]?"
 * 3. Example — Fill in the blank from the example sentence
 * 4. Arabic — "What is the Arabic meaning of [word]?"
 */

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(pool: string[], correct: string, count: number, seed: number): string[] {
  const filtered = pool.filter(d => d !== correct);
  return shuffle(filtered, seed).slice(0, count);
}

function placeCorrect(distractors: string[], correct: string, seed: number): { options: string[]; correctIndex: number } {
  const pos = seed % (distractors.length + 1);
  const options = [...distractors];
  options.splice(pos, 0, correct);
  return { options, correctIndex: pos };
}

function blankWord(example: string, word: string): string {
  // Try to blank the word (case-insensitive) in the example
  const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
  if (regex.test(example)) {
    return example.replace(regex, '______');
  }
  // If word not found directly, blank the longest word (>3 chars)
  const words = example.split(/\s+/).filter(w => w.replace(/[^a-zA-Z]/g, '').length > 3);
  if (words.length > 0) {
    const longest = words.reduce((a, b) => a.length > b.length ? a : b);
    return example.replace(longest, '______');
  }
  return example.replace(/\w{4,}/, '______');
}

export function generateVocabExercises(vocab: VocabWord[]): MCQItem[] {
  if (!vocab || vocab.length < 2) return [];

  const exercises: MCQItem[] = [];
  const allMeanings = vocab.map(v => v.meaning);
  const allWords = vocab.map(v => v.word);
  const allArabic = vocab.map(v => v.arabic);

  vocab.forEach((v, i) => {
    const seed1 = i * 7 + 1;
    const seed2 = i * 13 + 2;
    const seed3 = i * 19 + 3;
    const seed4 = i * 23 + 4;

    // Type 1: What does [word] mean?
    const d1 = pickDistractors(allMeanings, v.meaning, 3, seed1);
    if (d1.length >= 3) {
      const { options, correctIndex } = placeCorrect(d1, v.meaning, seed1);
      exercises.push({
        question: `What does "${v.word}" mean?`,
        options,
        correct: correctIndex,
      });
    }

    // Type 2: Which word means [meaning]?
    const d2 = pickDistractors(allWords, v.word, 3, seed2);
    if (d2.length >= 3) {
      const { options, correctIndex } = placeCorrect(d2, v.word, seed2);
      exercises.push({
        question: `Which word means "${v.meaning}"?`,
        options,
        correct: correctIndex,
      });
    }

    // Type 3: Fill in the blank
    const blanked = blankWord(v.example, v.word);
    if (blanked.includes('______')) {
      const d3 = pickDistractors(allWords, v.word, 3, seed3);
      if (d3.length >= 3) {
        const { options, correctIndex } = placeCorrect(d3, v.word, seed3);
        exercises.push({
          question: `Fill in the blank: "${blanked}"`,
          options,
          correct: correctIndex,
        });
      }
    }

    // Type 4: Arabic translation
    const d4 = pickDistractors(allArabic, v.arabic, 3, seed4);
    if (d4.length >= 3) {
      const { options, correctIndex } = placeCorrect(d4, v.arabic, seed4);
      exercises.push({
        question: `What is the Arabic meaning of "${v.word}" ${v.emoji}?`,
        options,
        correct: correctIndex,
      });
    }
  });

  return exercises;
}

/**
 * Applies generated vocab exercises to all lessons,
 * replacing existing vocabExercises with comprehensive ones.
 */
export function applyVocabExercises(allLessons: Record<string, LessonData>): void {
  for (const key of Object.keys(allLessons)) {
    const lesson = allLessons[key];
    if (lesson.vocabulary && lesson.vocabulary.length >= 4) {
      lesson.vocabExercises = generateVocabExercises(lesson.vocabulary);
    }
  }
}
