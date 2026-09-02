import type { LessonData, MCQItem, VocabWord } from "./lessons";
import { getGrammarPoints, getGrammarTrueFalse } from "./grammar-points";

/** Fixed number of questions per exercise type in every lesson. */
export const EXERCISE_QUOTA = {
  trueFalse: 10,
  mcq: 10,
  matchSets: 3,
  matchPairsPerSet: 4,
  sentenceScramble: 10,
  wordScramble: 10,
} as const;

/** Repeat / trim a pool so it always has exactly `count` items. */
function fill<T>(pool: T[], count: number): T[] {
  if (pool.length === 0) return [];
  const out: T[] = [];
  for (let i = 0; i < count; i++) out.push(pool[i % pool.length]);
  return out;
}

function uniqueBy<T>(items: T[], key: (item: T) => string): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const item of items) {
    const k = key(item);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(item);
  }
  return out;
}

const wordsIn = (s: string) => s.trim().split(/\s+/).filter(Boolean);

/** Introduce a typical mistake so the student can spot it. */
function breakSentence(sentence: string): string | undefined {
  const swaps: [RegExp, string][] = [
    [/\bis\b/, "are"],
    [/\bare\b/, "is"],
    [/\bdoesn't\b/i, "don't"],
    [/\bdon't\b/i, "doesn't"],
    [/\bwas\b/, "were"],
    [/\bwere\b/, "was"],
    [/\bhas\b/, "have"],
    [/\bhave\b/, "has"],
    [/\ban\b/, "a"],
    [/\bwent\b/, "goed"],
    [/\bthem\b/, "they"],
    [/\bhis\b/, "he"],
  ];
  for (const [re, rep] of swaps) {
    if (re.test(sentence)) return sentence.replace(re, rep);
  }
  const w = wordsIn(sentence);
  if (w.length >= 3) {
    [w[0], w[1]] = [w[1], w[0]];
    return w.join(" ");
  }
  return undefined;
}

/** Exactly 10 "Correct or wrong?" questions built from grammar + vocabulary sentences. */
export function buildTrueFalseSet(lesson: LessonData): MCQItem[] {
  const fromGrammar = getGrammarTrueFalse(lesson);
  const sentences = [
    ...getGrammarPoints(lesson).map((p) => p.example),
    ...lesson.vocabulary.map((v) => v.example),
  ].filter((s): s is string => Boolean(s && wordsIn(s).length >= 3));

  const extra: MCQItem[] = sentences.map((sentence, idx) => {
    const isTrue = (lesson.lessonNumber + idx) % 2 === 0;
    const broken = breakSentence(sentence);
    const shown = isTrue || !broken ? sentence : broken;
    return {
      question: `Correct or wrong? — "${shown}"`,
      options: ["Correct", "Wrong"],
      correct: shown === sentence ? 0 : 1,
    };
  });

  const pool = uniqueBy([...fromGrammar, ...extra], (q) => q.question);
  return fill(pool, EXERCISE_QUOTA.trueFalse);
}

/** Exactly 10 multiple-choice questions from the given pools. */
export function buildMCQSet(...pools: (MCQItem[] | undefined)[]): MCQItem[] {
  const merged = pools.flatMap((p) => p ?? []).filter((q) => q.options.length > 2);
  const pool = uniqueBy(merged, (q) => q.question);
  return fill(pool, EXERCISE_QUOTA.mcq);
}

/** Exactly 3 matching sets of 4 word/meaning pairs. */
export function buildMatchSets(vocab: VocabWord[]): VocabWord[][] {
  const usable = vocab.filter((v) => v.word && v.meaning && v.meaning.trim());
  const { matchSets, matchPairsPerSet } = EXERCISE_QUOTA;
  if (usable.length < 3) return [];
  const sets: VocabWord[][] = [];
  for (let s = 0; s < matchSets; s++) {
    const items: VocabWord[] = [];
    for (let i = 0; i < matchPairsPerSet; i++) {
      const candidate = usable[(s * matchPairsPerSet + i) % usable.length];
      if (!items.some((v) => v.word === candidate.word)) items.push(candidate);
    }
    if (items.length >= 3) sets.push(items);
  }
  return sets;
}

/** Exactly 10 sentences to rearrange. */
export function buildSentenceScrambleSet(lesson: LessonData): { sentence: string; hint?: string }[] {
  const grammar = getGrammarPoints(lesson)
    .map((p) => p.example)
    .filter((s): s is string => Boolean(s))
    .map((sentence) => ({ sentence }));
  const vocab = lesson.vocabulary
    .filter((v) => v.example)
    .map((v) => ({ sentence: v.example, hint: `Uses "${v.word}"` }));
  const dialogue = (lesson.dialogue ?? [])
    .map((line) => ({ sentence: line.text }))
    .filter((d) => Boolean(d.sentence));

  const pool = uniqueBy(
    [...grammar, ...vocab, ...dialogue].filter((d) => {
      const n = wordsIn(d.sentence).length;
      return n >= 3 && n <= 12;
    }),
    (d) => d.sentence.toLowerCase()
  );
  return fill(pool, EXERCISE_QUOTA.sentenceScramble);
}

/** Exactly 10 words to rearrange (spell). */
export function buildWordScrambleSet(vocab: VocabWord[]): VocabWord[] {
  const pool = uniqueBy(
    vocab.filter((v) => {
      const letters = v.word.replace(/\s/g, "");
      return letters.length >= 3 && letters.length <= 12;
    }),
    (v) => v.word.toLowerCase()
  );
  return fill(pool, EXERCISE_QUOTA.wordScramble);
}
