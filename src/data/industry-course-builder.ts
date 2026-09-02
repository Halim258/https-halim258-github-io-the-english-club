import type { LessonData, MCQItem, VocabWord } from "./lessons";

/** A realistic workplace role-play a student performs after the lesson content. */
export type RolePlayScenario = {
  title: string;
  situation: string;
  roles: string[];
  goal: string;
  steps: string[];
  usefulPhrases: string[];
  /** Optional model exchange the student can read before performing. */
  model?: { speaker: string; text: string }[];
};

export type IndustrySpec = {
  title: string;
  description: string;
  focus: string;
  /** [word, meaning, arabic, example, emoji] */
  vocabulary: Array<[string, string, string, string, string]>;
  grammar: { title: string; explanation: string; examples: Array<{ sentence: string; note: string }> };
  dialogue: Array<{ speaker: string; text: string }>;
  task: string;
  rolePlay?: RolePlayScenario[];
};

const shuffle = <T,>(items: T[], seed: number): T[] => {
  const copy = [...items];
  let value = seed * 9301 + 49297;
  for (let i = copy.length - 1; i > 0; i -= 1) {
    value = (value * 233280 + 12345) % 1000003;
    const j = Math.floor((value / 1000003) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const industryMcq = (question: string, correct: string, distractors: string[], seed: number): MCQItem => {
  const options = shuffle([correct, ...distractors.filter((item) => item !== correct).slice(0, 3)], seed);
  return { question, options, correct: options.indexOf(correct) };
};

type CourseMeta = {
  courseId: string;
  levelLabel: string;
  /** Industry noun used inside generated prompts, e.g. "hospitality". */
  industry: string;
};

const buildLesson = (
  spec: IndustrySpec,
  lessonNumber: number,
  specs: IndustrySpec[],
  meta: CourseMeta,
): LessonData => {
  const vocabulary: VocabWord[] = spec.vocabulary.map(([word, meaning, arabic, example, emoji]) => ({
    word,
    meaning,
    arabic,
    example,
    emoji,
  }));
  const allWords = specs.flatMap((item) => item.vocabulary.map(([word]) => word));
  const otherWords = allWords.filter((word) => !spec.vocabulary.some(([current]) => current === word));
  const examples = spec.grammar.examples;
  const speakers = [...new Set(spec.dialogue.map((entry) => entry.speaker))];
  const primaryScenario = spec.rolePlay?.[0];

  return {
    levelId: meta.courseId,
    levelLabel: meta.levelLabel,
    lessonNumber,
    title: spec.title,
    description: spec.description,
    vocabulary,
    dialogue: spec.dialogue,
    grammar: spec.grammar,
    rolePlay: spec.rolePlay,
    vocabExercises: vocabulary.slice(0, 5).map((item, index) =>
      industryMcq(
        `What does “${item.word}” mean in this lesson?`,
        item.meaning,
        vocabulary.filter((candidate) => candidate.word !== item.word).map((candidate) => candidate.meaning),
        lessonNumber * 11 + index,
      ),
    ),
    conversationExercises: spec.dialogue.slice(0, 3).map((line, index) =>
      industryMcq(
        `Who says: “${line.text}”?`,
        line.speaker,
        speakers.filter((speaker) => speaker !== line.speaker),
        lessonNumber * 17 + index,
      ),
    ),
    grammarExercises: examples.map((example, index) =>
      industryMcq(
        `What is the purpose of: “${example.sentence}”?`,
        example.note,
        examples.filter((candidate) => candidate.sentence !== example.sentence).map((candidate) => candidate.note),
        lessonNumber * 23 + index,
      ),
    ),
    examQuestions: [
      industryMcq(`Which word is central to ${spec.focus}?`, vocabulary[0].word, otherWords, lessonNumber * 29),
      industryMcq(
        `Which response is most professional in ${meta.industry}?`,
        examples[0].sentence,
        ["That is not my job.", "You will have to wait, I do not know how long.", "I cannot help you with that."],
        lessonNumber * 31,
      ),
      industryMcq(
        "What should the professional do first?",
        "Listen carefully and confirm the person’s need.",
        ["End the conversation quickly.", "Blame another department.", "Guess and promise a result."],
        lessonNumber * 37,
      ),
      industryMcq(
        "Which action builds trust?",
        "Give a clear next step and a realistic time.",
        ["Promise something you cannot check.", "Use unclear technical language.", "Ignore the concern."],
        lessonNumber * 41,
      ),
    ],
    homeworkQuestions: [
      industryMcq(
        `Choose the best word for this ${spec.focus} task: “${spec.task}”`,
        vocabulary[1].word,
        otherWords,
        lessonNumber * 43,
      ),
      industryMcq(
        `What should a professional ${meta.industry} message include?`,
        "A clear action and a helpful next step.",
        ["Only an apology.", "A long personal opinion.", "Information you have not confirmed."],
        lessonNumber * 47,
      ),
      industryMcq(
        "Which sentence has a professional tone?",
        examples[Math.min(1, examples.length - 1)].sentence,
        ["You should have known that.", "Wait, I am busy right now.", "That problem is yours, not mine."],
        lessonNumber * 53,
      ),
    ],
    speakingPrompt: primaryScenario
      ? `Role-play “${primaryScenario.title}”: ${primaryScenario.situation} Speak for 60–90 seconds and use at least five words from the lesson.`
      : `Role-play this ${spec.focus} situation: ${spec.task} Speak for 60–90 seconds using at least five words from the lesson.`,
    writingPrompt: spec.task,
    reading: {
      title: `${spec.title}: A workplace example`,
      text: `${spec.dialogue.map((line) => `${line.speaker}: ${line.text}`).join(" ")} In this situation, the professional focuses on ${spec.focus}. The best next step is to communicate clearly, protect trust, and record the action taken.`,
      questions: [
        industryMcq("What is the workplace situation mainly about?", spec.focus, otherWords.slice(0, 3), lessonNumber * 59),
        industryMcq(
          "What should the professional do?",
          "Communicate clearly and take a helpful next step.",
          ["Avoid the person.", "Give an unclear promise.", "Share private details publicly."],
          lessonNumber * 61,
        ),
        industryMcq(
          "Which word from the lesson supports the situation?",
          vocabulary[2].word,
          vocabulary.slice(3).map((item) => item.word),
          lessonNumber * 67,
        ),
      ],
    },
  };
};

/** Builds a `Record<"<courseId>-<n>", LessonData>` map from industry lesson specs. */
export const buildIndustryCourse = (meta: CourseMeta, specs: IndustrySpec[]): Record<string, LessonData> =>
  Object.fromEntries(
    specs.map((spec, index) => [`${meta.courseId}-${index + 1}`, buildLesson(spec, index + 1, specs, meta)]),
  );
