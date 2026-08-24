import type { LessonData, MCQItem } from "./lessons";

export type GrammarPoint = { title: string; explanation: string; example: string };

/** Families of five related grammar points, chosen by keywords in the lesson's grammar title. */
const FAMILIES: { match: RegExp; points: GrammarPoint[] }[] = [
  {
    match: /gerund|-ing|like \+|verb\s*\+\s*ing/i,
    points: [
      { title: "1. Verb + -ing (gerund)", explanation: "After like, love, enjoy and hate we use the -ing form of the verb.", example: "I like swimming." },
      { title: "2. Spelling the -ing form", explanation: "Drop a final -e (write → writing) and double a final consonant after a short vowel (swim → swimming).", example: "She loves writing letters." },
      { title: "3. Negative form", explanation: "Use don't / doesn't before the verb of preference. The -ing form never changes.", example: "He doesn't like cooking." },
      { title: "4. Questions", explanation: "Do / Does + subject + like + verb-ing? Answer with Yes, I do / No, I don't.", example: "Do you enjoy reading?" },
      { title: "5. Gerund as a subject", explanation: "The -ing form can also start a sentence and work like a noun.", example: "Waiting is boring." },
    ],
  },
  {
    match: /present simple/i,
    points: [
      { title: "1. Present simple — basic form", explanation: "Use the base verb for I, you, we and they to talk about habits and facts.", example: "I work in Alexandria." },
      { title: "2. Third person -s", explanation: "Add -s (or -es after o, s, sh, ch, x) for he, she and it.", example: "She watches TV every night." },
      { title: "3. Negatives", explanation: "Use don't with I/you/we/they and doesn't with he/she/it, then the base verb.", example: "He doesn't drink coffee." },
      { title: "4. Questions", explanation: "Do / Does + subject + base verb.", example: "Does your brother study English?" },
      { title: "5. Frequency words", explanation: "Always, usually, often, sometimes and never go before the main verb.", example: "We usually meet on Friday." },
    ],
  },
  {
    match: /present continuous|progressive/i,
    points: [
      { title: "1. Present continuous — form", explanation: "am / is / are + verb-ing for actions happening now.", example: "I am studying English." },
      { title: "2. Choosing am / is / are", explanation: "I → am; he, she, it → is; you, we, they → are.", example: "They are waiting outside." },
      { title: "3. Negatives", explanation: "Put not after am / is / are.", example: "She isn't working today." },
      { title: "4. Questions", explanation: "Move am / is / are before the subject.", example: "Are you listening to me?" },
      { title: "5. Continuous vs simple", explanation: "Use the continuous for right now, the simple for habits.", example: "I usually walk, but today I am driving." },
    ],
  },
  {
    match: /past simple|past tense/i,
    points: [
      { title: "1. Past simple — regular verbs", explanation: "Add -ed to the base verb for finished past actions.", example: "I visited my aunt yesterday." },
      { title: "2. Irregular verbs", explanation: "Many common verbs change completely: go → went, have → had, see → saw.", example: "We went to the cinema." },
      { title: "3. Negatives", explanation: "didn't + base verb — never the -ed form.", example: "He didn't call me." },
      { title: "4. Questions", explanation: "Did + subject + base verb?", example: "Did you finish your homework?" },
      { title: "5. Time expressions", explanation: "Use yesterday, last week, two days ago, in 2019 with the past simple.", example: "She moved here last year." },
    ],
  },
  {
    match: /article|a\/an|the\b/i,
    points: [
      { title: "1. A / an", explanation: "Use a or an for one thing that is new or general.", example: "I have a car." },
      { title: "2. A or an?", explanation: "Use an before a vowel sound and a before a consonant sound.", example: "She is an engineer." },
      { title: "3. The", explanation: "Use the when we both know which thing we mean.", example: "The book on the table is mine." },
      { title: "4. No article", explanation: "We use no article with plural general ideas and most names.", example: "Cats are independent." },
      { title: "5. First and second mention", explanation: "Introduce with a / an, then continue with the.", example: "I bought a bag. The bag was cheap." },
    ],
  },
  {
    match: /plural|noun/i,
    points: [
      { title: "1. Regular plurals", explanation: "Add -s to most nouns.", example: "two books" },
      { title: "2. -es plurals", explanation: "Add -es after s, sh, ch, x and o.", example: "three boxes" },
      { title: "3. Consonant + y", explanation: "Change y to -ies after a consonant.", example: "four cities" },
      { title: "4. Irregular plurals", explanation: "Some nouns change form: man → men, child → children, foot → feet.", example: "five children" },
      { title: "5. Uncountable nouns", explanation: "Words like water, money and information have no plural -s.", example: "I need some information." },
    ],
  },
  {
    match: /adjective|describ/i,
    points: [
      { title: "1. Position of adjectives", explanation: "Adjectives go before the noun or after the verb be.", example: "a tall building / The building is tall." },
      { title: "2. No plural adjectives", explanation: "Adjectives never take -s, even with plural nouns.", example: "two big houses" },
      { title: "3. Order of adjectives", explanation: "Opinion comes before size, then age, then colour.", example: "a lovely small old red car" },
      { title: "4. Comparatives", explanation: "Add -er (or use more with long adjectives) + than.", example: "This street is quieter than mine." },
      { title: "5. Superlatives", explanation: "Use the + -est, or the most with long adjectives.", example: "It is the most beautiful place here." },
    ],
  },
  {
    match: /preposition|in\/on\/at|place|time/i,
    points: [
      { title: "1. Prepositions of place", explanation: "in (inside), on (a surface), at (a point).", example: "The keys are on the table." },
      { title: "2. Prepositions of time", explanation: "in months and years, on days and dates, at clock times.", example: "We meet at 7 o'clock." },
      { title: "3. Movement", explanation: "to (direction), from (origin), into / out of.", example: "I go to work by bus." },
      { title: "4. Fixed pairs", explanation: "Some verbs always take one preposition: listen to, wait for, depend on.", example: "I am waiting for the bus." },
      { title: "5. After a preposition", explanation: "A verb after a preposition takes the -ing form.", example: "She is good at drawing." },
    ],
  },
  {
    match: /\bcan\b|able|modal|must|should/i,
    points: [
      { title: "1. Can — ability", explanation: "can + base verb, the same for every subject.", example: "She can drive." },
      { title: "2. Negative", explanation: "can't (cannot) + base verb.", example: "I can't swim." },
      { title: "3. Questions", explanation: "Can + subject + base verb?", example: "Can you help me?" },
      { title: "4. Permission and requests", explanation: "Can and could also ask for permission; could is more polite.", example: "Could I open the window?" },
      { title: "5. Other modals", explanation: "must (obligation) and should (advice) also take the base verb.", example: "You should rest." },
    ],
  },
  {
    match: /there is|there are|quantit|how many|how much/i,
    points: [
      { title: "1. There is / there are", explanation: "There is + singular, there are + plural to say something exists.", example: "There is a park near my house." },
      { title: "2. Negatives", explanation: "There isn't / there aren't, often with any.", example: "There aren't any shops here." },
      { title: "3. Questions", explanation: "Is there…? / Are there…?", example: "Are there any students in class?" },
      { title: "4. Some and any", explanation: "Some in positive sentences, any in negatives and questions.", example: "I have some water." },
      { title: "5. How many / how much", explanation: "How many with countables, how much with uncountables.", example: "How much sugar do you want?" },
    ],
  },
  {
    match: /pronoun|possessive|my|your/i,
    points: [
      { title: "1. Subject pronouns", explanation: "I, you, he, she, it, we, they replace the subject.", example: "She is my teacher." },
      { title: "2. Object pronouns", explanation: "me, you, him, her, it, us, them come after the verb.", example: "Please call me." },
      { title: "3. Possessive adjectives", explanation: "my, your, his, her, its, our, their go before a noun.", example: "This is our classroom." },
      { title: "4. Possessive pronouns", explanation: "mine, yours, his, hers, ours, theirs stand alone.", example: "That bag is mine." },
      { title: "5. Possessive 's", explanation: "Add 's to a person's name to show belonging.", example: "Ali's brother is a doctor." },
    ],
  },
];

/** Build five related points from the lesson itself when no family matches. */
function genericPoints(lesson: LessonData): GrammarPoint[] {
  const g = lesson.grammar;
  const examples = g?.examples ?? [];
  const vocabExamples = (lesson.vocabulary ?? []).filter((v) => v.example?.trim());
  const pick = (i: number) => examples[i]?.sentence || vocabExamples[i]?.example || "";
  const labels = [
    { title: `1. ${g?.title ?? "The rule"}`, explanation: g?.explanation ?? "" },
    { title: "2. In positive sentences", explanation: "Notice the word order: subject first, then the verb, then the rest of the sentence." },
    { title: "3. In negative sentences", explanation: "Add the negative word (not / don't / doesn't / didn't) before the main verb; the main verb stays in its base form." },
    { title: "4. In questions", explanation: "Move the helping verb (do, does, did, be) in front of the subject and keep the rest of the sentence the same." },
    { title: "5. Common mistakes", explanation: "Check the verb ending, the subject–verb agreement and the word order before you finish your sentence." },
  ];
  return labels.map((l, i) => ({ ...l, example: pick(i) || pick(0) }));
}

export function getGrammarPoints(lesson: LessonData): GrammarPoint[] {
  const title = `${lesson.grammar?.title ?? ""} ${lesson.grammar?.explanation ?? ""}`;
  const family = FAMILIES.find((f) => f.match.test(title));
  if (family) {
    const first: GrammarPoint = {
      title: `1. ${lesson.grammar?.title ?? family.points[0].title.replace(/^1\.\s*/, "")}`,
      explanation: lesson.grammar?.explanation || family.points[0].explanation,
      example: lesson.grammar?.examples?.[0]?.sentence || family.points[0].example,
    };
    return [first, ...family.points.slice(1, 5)];
  }
  return genericPoints(lesson);
}

/** True / false statements built from the five grammar points. */
export function getGrammarTrueFalse(lesson: LessonData): MCQItem[] {
  const points = getGrammarPoints(lesson);
  const seed = lesson.lessonNumber;
  return points
    .filter((p) => p.example)
    .map((p, idx) => {
      const isTrue = (seed + idx) % 2 === 0;
      const broken = breakSentence(p.example);
      const shown = isTrue || !broken ? p.example : broken;
      return {
        question: `Correct or wrong? — "${shown}"`,
        options: ["Correct", "Wrong"],
        correct: shown === p.example ? 0 : 1,
      };
    });
}

/** Introduce a typical grammar mistake so the student can spot it. */
function breakSentence(sentence: string): string | undefined {
  const swaps: [RegExp, string][] = [
    [/\bis\b/, "are"],
    [/\bare\b/, "is"],
    [/\bdoesn't\b/i, "don't"],
    [/\bdon't\b/i, "doesn't"],
    [/\bwas\b/, "were"],
    [/\bhas\b/, "have"],
    [/\ban\b/, "a"],
    [/\bwent\b/, "goed"],
    [/\bing\b/, "ing"],
  ];
  for (const [re, rep] of swaps) {
    if (re.test(sentence)) return sentence.replace(re, rep);
  }
  const words = sentence.split(" ");
  if (words.length >= 3) {
    [words[0], words[1]] = [words[1], words[0]];
    return words.join(" ");
  }
  return undefined;
}
