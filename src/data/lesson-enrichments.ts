import type { LessonData, MCQItem } from "./lessons";
import { lessonPhotoUrl } from "./lesson-image-library";



/**
 * Universal lesson enrichment. Fills optional fields where missing:
 *   - heroImage, reading, listening, writingPrompt, speakingPrompt
 * Never overwrites hand-authored content (uses ?? fallback).
 * Language detected from levelId prefix: en (default), it-*, de-*.
 * Spanish (es-*) uses its own richer enricher.
 */

type Lang = "en" | "it" | "de";

function detectLang(levelId: string): Lang {
  if (levelId.startsWith("it-")) return "it";
  if (levelId.startsWith("de-")) return "de";
  return "en";
}

const stripDiacritics = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const seedFor = (lesson: LessonData): number => {
  const s = `${lesson.levelId}-${lesson.lessonNumber}`;
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h) || 1;
};

function shuffleDeterministic<T>(arr: T[], seed: number): T[] {
  const copy = [...arr];
  let s = seed || 1;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const TOPIC_RULES: { keyword: string; keys: string[] }[] = [
  { keyword: "greeting", keys: ["greet", "hello", "introduc", "saluti", "presentazi", "begrüß", "vorstell"] },
  { keyword: "family", keys: ["family", "famiglia", "familie", "parent", "children"] },
  { keyword: "numbers", keys: ["number", "numeri", "zahlen", "count", "math"] },
  { keyword: "clothes", keys: ["color", "clothes", "colori", "vestiti", "farben", "kleidung"] },
  { keyword: "food", keys: ["food", "restaurant", "cibo", "ristorant", "essen", "meal", "cook"] },
  { keyword: "weather", keys: ["weather", "wetter", "climate", "season", "stagion", "jahreszeit"] },
  { keyword: "calendar", keys: ["date", "calendar", "month", "week", "routine", "orario", "uhrzeit"] },
  { keyword: "house", keys: ["house", "home", "casa", "haus", "wohn", "room"] },
  { keyword: "city", keys: ["city", "town", "street", "città", "citta", "stadt"] },
  { keyword: "travel", keys: ["travel", "trip", "vacation", "holiday", "viaggi", "reise", "flight", "airport"] },
  { keyword: "office", keys: ["work", "job", "office", "career", "lavoro", "arbeit", "profession", "business"] },
  { keyword: "classroom", keys: ["school", "class", "student", "education", "scuola", "schule", "university"] },
  { keyword: "hospital", keys: ["health", "medical", "doctor", "hospital", "salute", "gesund", "medic"] },
  { keyword: "market", keys: ["shop", "market", "store", "spesa", "einkauf", "mall"] },
  { keyword: "park", keys: ["hobby", "hobbies", "leisure", "tempo libero", "freizeit"] },
  { keyword: "football", keys: ["sport", "football", "sportivo", "exercise"] },
  { keyword: "concert", keys: ["music", "song", "concert", "musica", "musik"] },
  { keyword: "landscape", keys: ["nature", "landscape", "mountain", "beach", "natura", "natur"] },
  { keyword: "animals", keys: ["animal", "pet", "wildlife", "animali", "tiere"] },
  { keyword: "laptop", keys: ["technology", "digital", "internet", "computer", "software", "code"] },
  { keyword: "newspaper", keys: ["media", "news", "press", "journal", "notizie", "nachrichten"] },
  { keyword: "parliament", keys: ["society", "politic", "government", "law", "legal", "gesellschaft"] },
  { keyword: "finance", keys: ["finance", "money", "bank", "econom", "invest", "finanz"] },
  { keyword: "museum", keys: ["art", "museum", "paint", "arte", "kunst"] },
  { keyword: "library", keys: ["book", "read", "story", "literature", "novel", "letteratura"] },
  { keyword: "environment", keys: ["environment", "climate", "sustain", "ecology"] },
  { keyword: "laboratory", keys: ["science", "scientific", "physics", "chemistry", "biology", "research"] },
  { keyword: "airplane", keys: ["aviation", "pilot", "cockpit", "airline"] },
  { keyword: "hotel", keys: ["hotel", "hospitality", "guest", "reception"] },
  { keyword: "children", keys: ["kids", "children", "child", "playground", "toy"] },
];

function topicKeyword(title: string): string {
  const t = stripDiacritics(title).toLowerCase();
  for (const rule of TOPIC_RULES) {
    if (rule.keys.some((k) => t.includes(stripDiacritics(k).toLowerCase()))) return rule.keyword;
  }
  return "learning";
}

const heroImageFor = (lesson: LessonData): string =>
  lessonPhotoUrl(topicKeyword(lesson.title), seedFor(lesson), 1200, 500);

const L = {
  en: {
    readingTitle: (t: string) => `Reading: ${t}`,
    intro: (t: string) => `In this lesson we practice "${t}". Read the passage below and answer the questions.`,
    meaningQ: (w: string) => `What does "${w}" mean?`,
    firstSpeakerQ: "Who speaks first in the dialogue?",
    keywordQ: (s: string) => `Listen again. Which word does ${s} say?`,
    countQ: "How many people take part in the dialogue?",
    writing: (t: string) => `Write a short paragraph (60–100 words) about "${t}". Use at least four words from this lesson's vocabulary.`,
    speaking: (t: string) => `Speak for one minute about "${t}". Introduce yourself, describe a real situation, and use the new vocabulary.`,
  },
  it: {
    readingTitle: (t: string) => `Lettura: ${t}`,
    intro: (t: string) => `In questa lezione pratichiamo "${t}". Leggi il testo e rispondi alle domande.`,
    meaningQ: (w: string) => `Cosa significa "${w}" in inglese?`,
    firstSpeakerQ: "Chi parla per primo nel dialogo?",
    keywordQ: (s: string) => `Ascolta di nuovo. Quale parola dice ${s}?`,
    countQ: "Quante persone partecipano al dialogo?",
    writing: (t: string) => `Scrivi un breve paragrafo (60–100 parole) su "${t}". Usa almeno quattro parole del vocabolario di questa lezione.`,
    speaking: (t: string) => `Parla per un minuto di "${t}". Presentati, descrivi una situazione reale e usa il nuovo vocabolario.`,
  },
  de: {
    readingTitle: (t: string) => `Lesetext: ${t}`,
    intro: (t: string) => `In dieser Lektion üben wir "${t}". Lies den Text und beantworte die Fragen.`,
    meaningQ: (w: string) => `Was bedeutet "${w}" auf Englisch?`,
    firstSpeakerQ: "Wer spricht im Dialog zuerst?",
    keywordQ: (s: string) => `Hör noch einmal zu. Welches Wort sagt ${s}?`,
    countQ: "Wie viele Personen nehmen am Dialog teil?",
    writing: (t: string) => `Schreibe einen kurzen Absatz (60–100 Wörter) über "${t}". Verwende mindestens vier Wörter aus dem Wortschatz dieser Lektion.`,
    speaking: (t: string) => `Sprich eine Minute über "${t}". Stell dich vor, beschreibe eine echte Situation und benutze den neuen Wortschatz.`,
  },
} as const;

const CONNECTORS = {
  en: ["First,", "Then,", "Also,", "After that,", "Later,", "Finally,"],
  it: ["Prima,", "Poi,", "Inoltre,", "Dopo,", "Più tardi,", "Alla fine,"],
  de: ["Zuerst,", "Dann,", "Außerdem,", "Danach,", "Später,", "Zum Schluss,"],
} as const;

const READING_Q = {
  en: {
    topicQ: "What is the passage mainly about?",
    mentionedQ: (w: string) => `True or false? The passage talks about "${w}".`,
    notMentionedQ: (w: string) => `True or false? The passage talks about "${w}".`,
    trueFalse: ["True", "False"],
    gapQ: (s: string) => `Complete the sentence from the passage: ${s}`,
    closing: (t: string) => `That is how we talk about ${t} in real life.`,
  },
  it: {
    topicQ: "Di cosa parla principalmente il testo?",
    mentionedQ: (w: string) => `Vero o falso? Il testo parla di "${w}".`,
    notMentionedQ: (w: string) => `Vero o falso? Il testo parla di "${w}".`,
    trueFalse: ["Vero", "Falso"],
    gapQ: (s: string) => `Completa la frase del testo: ${s}`,
    closing: (t: string) => `Così si parla di ${t} nella vita reale.`,
  },
  de: {
    topicQ: "Worum geht es im Text hauptsächlich?",
    mentionedQ: (w: string) => `Richtig oder falsch? Der Text spricht über "${w}".`,
    notMentionedQ: (w: string) => `Richtig oder falsch? Der Text spricht über "${w}".`,
    trueFalse: ["Richtig", "Falsch"],
    gapQ: (s: string) => `Ergänze den Satz aus dem Text: ${s}`,
    closing: (t: string) => `So spricht man im Alltag über ${t}.`,
  },
} as const;

const OFF_TOPIC_WORDS = ["submarine", "helicopter", "volcano", "trombone", "penguin", "telescope"];

/* ── Level tuning: how much and how hard each CEFR band gets ───────── */

type Cefr = "a1" | "a2" | "b1" | "b2" | "c1" | "c2";

type LevelTuning = {
  /** how many example sentences go into the reading passage */
  passageSentences: number;
  /** longest sentence (in words) we are willing to turn into an exercise */
  maxSentenceWords: number;
  maxVocabExercises: number;
  maxGrammarExercises: number;
  maxConversationExercises: number;
  maxReadingExtras: number;
  /** true/false meaning checks are confusing for absolute beginners */
  useTrueFalse: boolean;
  speaking: (t: string) => string;
};

const TUNING: Record<Cefr, LevelTuning> = {
  a1: {
    passageSentences: 3,
    maxSentenceWords: 9,
    maxVocabExercises: 5,
    maxGrammarExercises: 3,
    maxConversationExercises: 3,
    maxReadingExtras: 2,
    useTrueFalse: false,
    speaking: (t) =>
      `Talk about "${t}" for about 30 seconds. Say 4 short sentences with "I am…", "I have…" or "I like…" and use three new words.`,
  },
  a2: {
    passageSentences: 4,
    maxSentenceWords: 12,
    maxVocabExercises: 6,
    maxGrammarExercises: 4,
    maxConversationExercises: 4,
    maxReadingExtras: 3,
    useTrueFalse: true,
    speaking: (t) =>
      `Speak for one minute about "${t}". Describe a normal day or a real situation, and give one reason with "because".`,
  },
  b1: {
    passageSentences: 5,
    maxSentenceWords: 16,
    maxVocabExercises: 8,
    maxGrammarExercises: 5,
    maxConversationExercises: 5,
    maxReadingExtras: 4,
    useTrueFalse: true,
    speaking: (t) =>
      `Speak for 1–2 minutes about "${t}". Tell a short story from your experience, then give your opinion and one reason.`,
  },
  b2: {
    passageSentences: 6,
    maxSentenceWords: 20,
    maxVocabExercises: 9,
    maxGrammarExercises: 6,
    maxConversationExercises: 6,
    maxReadingExtras: 5,
    useTrueFalse: true,
    speaking: (t) =>
      `Speak for two minutes about "${t}". Compare two points of view, use linking phrases (however, whereas, as a result) and finish with your position.`,
  },
  c1: {
    passageSentences: 6,
    maxSentenceWords: 24,
    maxVocabExercises: 10,
    maxGrammarExercises: 6,
    maxConversationExercises: 6,
    maxReadingExtras: 6,
    useTrueFalse: true,
    speaking: (t) =>
      `Give a 2–3 minute mini-talk on "${t}": state a clear thesis, support it with two examples, acknowledge a counter-argument, then conclude.`,
  },
  c2: {
    passageSentences: 6,
    maxSentenceWords: 28,
    maxVocabExercises: 10,
    maxGrammarExercises: 6,
    maxConversationExercises: 6,
    maxReadingExtras: 6,
    useTrueFalse: true,
    speaking: (t) =>
      `Speak for three minutes on "${t}" as if in a seminar. Control register and tone, hedge your claims precisely, and handle one likely objection.`,
  },
};

function cefrOf(levelId: string): Cefr | undefined {
  const m = levelId.toLowerCase().match(/^(a1|a2|b1|b2|c1|c2)\b/);
  return (m?.[1] as Cefr) ?? undefined;
}

const tuningFor = (lesson: LessonData): LevelTuning => TUNING[cefrOf(lesson.levelId) ?? "a2"];

/** Build a passage that reads like a real short text, plus questions about it. */
function buildReading(lesson: LessonData, lang: Lang) {
  const s = L[lang];
  const q = READING_Q[lang];
  const tuning = tuningFor(lesson);
  const examples = (lesson.vocabulary ?? [])
    .map((v) => v.example)
    .filter((e): e is string => Boolean(e && e.trim()))
    .map((e) => e.trim())
    .slice(0, tuning.passageSentences);
  if (examples.length < 3) return undefined;

  const pool = lesson.vocabulary.slice(0, Math.min(8, lesson.vocabulary.length));
  if (pool.length < 4) return undefined;

  // Link the example sentences into one flowing paragraph.
  const connectors = CONNECTORS[lang];
  const body = examples
    .map((sentence, idx) => {
      const clean = sentence.replace(/\s+/g, " ");
      if (idx === 0) return clean;
      const c = connectors[Math.min(idx - 1, connectors.length - 1)];
      const lowered = clean.charAt(0).toLowerCase() + clean.slice(1);
      return `${c} ${lowered}`;
    })
    .join(" ");

  const text = `${s.intro(lesson.title)}\n\n${body} ${q.closing(lesson.title.toLowerCase())}`;

  const questions: MCQItem[] = [];

  // 1) Main idea — the lesson topic against unrelated topics.
  const topicDecoys = shuffleDeterministic(
    ["Sports and hobbies", "Computers and coding", "Money and banking", "Animals in the zoo"].filter(
      (d) => !stripDiacritics(d).toLowerCase().includes(stripDiacritics(lesson.title).toLowerCase()),
    ),
    seedFor(lesson) + 41,
  ).slice(0, 3);
  const topicOptions = shuffleDeterministic([lesson.title, ...topicDecoys], seedFor(lesson) + 43);
  questions.push({ question: q.topicQ, options: topicOptions, correct: topicOptions.indexOf(lesson.title) });

  // 2) Gap-fill taken straight from a sentence in the passage.
  const gapSource = pool.find((v) => v.example && v.example.toLowerCase().includes(v.word.toLowerCase()));
  if (gapSource?.example) {
    const blanked = gapSource.example.replace(new RegExp(gapSource.word, "i"), "______");
    const gapDecoys = shuffleDeterministic(
      pool.filter((x) => x.word.toLowerCase() !== gapSource.word.toLowerCase()).map((x) => x.word),
      seedFor(lesson) + 47,
    ).slice(0, 3);
    const options = shuffleDeterministic([gapSource.word, ...gapDecoys], seedFor(lesson) + 53);
    questions.push({
      question: q.gapQ(blanked),
      options,
      correct: options.indexOf(gapSource.word),
    });
  }

  // 3) Detail check: a word that IS in the passage.
  const inText = pool.find((v) => body.toLowerCase().includes(v.word.toLowerCase()));
  if (inText) {
    questions.push({ question: q.mentionedQ(inText.word), options: [...q.trueFalse], correct: 0 });
  }

  // 4) Detail check: a word that is NOT in the passage.
  const outWord = OFF_TOPIC_WORDS.find((w) => !body.toLowerCase().includes(w));
  if (outWord) {
    questions.push({ question: q.notMentionedQ(outWord), options: [...q.trueFalse], correct: 1 });
  }

  // 5) One meaning question to close.
  const meaningWord = pool[seedFor(lesson) % pool.length];
  const meaningDecoys = shuffleDeterministic(
    pool.filter((x) => x.word !== meaningWord.word).map((x) => x.meaning),
    seedFor(lesson) + 7,
  ).slice(0, 3);
  const meaningOptions = shuffleDeterministic([meaningWord.meaning, ...meaningDecoys], seedFor(lesson) + 3);
  questions.push({
    question: s.meaningQ(meaningWord.word),
    options: meaningOptions,
    correct: meaningOptions.indexOf(meaningWord.meaning),
  });

  return { title: s.readingTitle(lesson.title), text, questions };
}


function buildListening(lesson: LessonData, lang: Lang) {
  const s = L[lang];
  if (!lesson.dialogue || lesson.dialogue.length < 2) return undefined;
  const lines = lesson.dialogue.slice(0, 6);
  const transcript = lines.map((l) => `${l.speaker}: ${l.text}`).join("\n");

  const questions: MCQItem[] = [];
  const speakers = Array.from(new Set(lesson.dialogue.map((l) => l.speaker)));

  if (speakers.length >= 2) {
    const decoys = ["Anna", "Marco", "Sara", "Tom", "Alex"].filter((x) => !speakers.includes(x));
    const pool = [speakers[0], ...speakers.slice(1, 3), ...decoys].slice(0, 4);
    const options = shuffleDeterministic(pool, seedFor(lesson) + 1);
    if (options.includes(speakers[0])) {
      questions.push({ question: s.firstSpeakerQ, options, correct: options.indexOf(speakers[0]) });
    }
  }

  const line = lines[Math.min(1, lines.length - 1)];
  const words = line.text.split(/\s+/).filter((w) => w.length > 3);
  if (words.length > 0) {
    const target = words[0].replace(/[.,¿?¡!:;"']/g, "");
    const decoyPool = ["hello", "thanks", "goodbye", "family", "work", "home", "ciao", "grazie", "arbeit", "familie"];
    const decoys = shuffleDeterministic(
      decoyPool.filter((d) => stripDiacritics(d).toLowerCase() !== stripDiacritics(target).toLowerCase()),
      seedFor(lesson) + 2,
    ).slice(0, 3);
    const options = shuffleDeterministic([target, ...decoys], seedFor(lesson) + 3);
    questions.push({ question: s.keywordQ(line.speaker), options, correct: options.indexOf(target) });
  }

  questions.push({
    question: s.countQ,
    options: ["1", "2", "3", "4"],
    correct: Math.min(Math.max(speakers.length - 1, 0), 3),
  });

  if (questions.length === 0) return undefined;
  return { transcript, questions };
}

/* ── CEFR-aware English enrichment (A1 → C2) ───────────────────────── */



const EN_LEVEL: Record<Cefr, { frame: (t: string) => string; task: string; writing: (t: string) => string }> = {
  a1: {
    frame: (t) => `This lesson is about ${t}. Read the short sentences slowly. Say each one out loud, then cover the page and try to remember three words.`,
    task: "Read again and underline every new word. Copy the three sentences you like most.",
    writing: (t) => `Write 5 simple sentences about "${t}". Use "I", "my" and at least four new words from this lesson.`,
  },
  a2: {
    frame: (t) => `In this lesson we look at ${t} in everyday situations. Read the passage twice: first for the general idea, then for the details.`,
    task: "Find two sentences you could really use this week and change them so they are true for you.",
    writing: (t) => `Write a short paragraph (60–80 words) about "${t}". Give one example from your own life and use four words from this lesson.`,
  },
  b1: {
    frame: (t) => `${t} is the focus of this lesson. As you read, notice how the language changes when the speaker is polite, informal, or giving an opinion.`,
    task: "Summarise the passage in two sentences without looking at it, then check what you missed.",
    writing: (t) => `Write 100–120 words about "${t}". Include one experience, one opinion and one reason. Use the grammar point of this lesson at least twice.`,
  },
  b2: {
    frame: (t) => `This lesson develops ${t} at a more natural speed. Pay attention to collocations and to the phrases that connect ideas.`,
    task: "Mark every linking word in the passage and explain what each one signals (contrast, cause, result).",
    writing: (t) => `Write 150–180 words about "${t}". Present two sides of the issue and finish with your own position, using linking phrases.`,
  },
  c1: {
    frame: (t) => `Here ${t} is treated as an idea to analyse, not only vocabulary to learn. Read critically: what does the writer assume, and what is left unsaid?`,
    task: "Rewrite two sentences from the passage in a more formal register, then in a more informal one.",
    writing: (t) => `Write 200–250 words on "${t}". Build a clear argument with a thesis, two supported points and a counter-argument you answer.`,
  },
  c2: {
    frame: (t) => `At this level ${t} is a starting point for nuance: register, implication and tone matter as much as accuracy.`,
    task: "Identify the writer's stance and rewrite one paragraph so the stance becomes the opposite, keeping the same style.",
    writing: (t) => `Write 250–300 words on "${t}" in an academic register. Use nominalisation, hedging and precise vocabulary; avoid repeating the lesson's phrasing.`,
  },
};

function enrichEnglishReading(lesson: LessonData, base: ReturnType<typeof buildReading>) {
  const level = cefrOf(lesson.levelId);
  if (!level || !base) return base;
  const cfg = EN_LEVEL[level];
  const passage = base.text.split("\n\n").slice(1).join("\n\n") || base.text;
  const grammarNote = lesson.grammar?.title
    ? `LANGUAGE FOCUS — ${lesson.grammar.title}\n${lesson.grammar.explanation ?? ""}`.trim()
    : "";
  const examples = (lesson.grammar?.examples ?? [])
    .slice(0, 3)
    .map((e) => `• ${e.sentence}${e.note ? ` — ${e.note}` : ""}`)
    .join("\n");
  return {
    ...base,
    title: `Reading (${level.toUpperCase()}): ${lesson.title}`,
    text: [
      cfg.frame(lesson.title),
      `PASSAGE\n${passage}`,
      grammarNote,
      examples ? `EXAMPLES IN CONTEXT\n${examples}` : "",
      `YOUR TASK\n${cfg.task}`,
    ]
      .filter(Boolean)
      .join("\n\n"),
  };

}

/* ── Real reading passages for beginners (A1 / A2) ──────────────────── */

const STORY_PEOPLE = [
  { name: "Sara", age: 19, city: "Alexandria", she: "she", her: "her" },
  { name: "Omar", age: 22, city: "Cairo", she: "he", her: "his" },
  { name: "Nour", age: 17, city: "Tanta", she: "she", her: "her" },
  { name: "Youssef", age: 25, city: "Alexandria", she: "he", her: "his" },
  { name: "Mona", age: 20, city: "Damanhur", she: "she", her: "her" },
  { name: "Karim", age: 23, city: "Port Said", she: "he", her: "his" },
];

const STORY_TIMES = ["five o'clock", "six o'clock", "seven o'clock", "four o'clock"];
const STORY_DAYS = ["Monday", "Tuesday", "Wednesday", "Saturday", "Sunday"];

type StoryScenario = { place: string; action: string; object: string; result: string };

const STORY_SCENARIOS: { keys: string[]; scenario: StoryScenario }[] = [
  { keys: ["greeting", "hello", "introduc"], scenario: { place: "a new English class", action: "meet and greet two new classmates", object: "a name card on the teacher's desk", result: "the classmates give a friendly welcome" } },
  { keys: ["number", "count", "age", "quantity"], scenario: { place: "a busy market", action: "help count the fruit", object: "a basket with ten apples", result: "the seller hands over the right change" } },
  { keys: ["family", "relative", "parent"], scenario: { place: "the family home", action: "help prepare a family meal", object: "an old family photograph", result: "everyone sits together and shares stories" } },
  { keys: ["color", "clothes", "fashion", "wear"], scenario: { place: "a small clothes shop", action: "choose an outfit for a school event", object: "a blue shirt and comfortable shoes", result: "the shop assistant finds the right size" } },
  { keys: ["food", "drink", "restaurant", "meal", "cook"], scenario: { place: "a quiet café", action: "order breakfast for the first time", object: "a sandwich and a glass of juice", result: "the waiter smiles and brings the food" } },
  { keys: ["weather", "season", "climate"], scenario: { place: "the park near home", action: "plan an afternoon outside", object: "a small umbrella in a school bag", result: "the rain stops and a short walk becomes possible" } },
  { keys: ["time", "routine", "daily", "calendar", "schedule"], scenario: { place: "the family kitchen", action: "check the clock before leaving", object: "a timetable beside the door", result: "the whole class starts on time" } },
  { keys: ["home", "house", "room", "furniture"], scenario: { place: "a newly rented apartment", action: "put things in the correct rooms", object: "a lamp beside the sofa", result: "the living room feels warm and tidy" } },
  { keys: ["school", "class", "student", "lesson"], scenario: { place: "the English Club classroom", action: "prepare a short class presentation", object: "three new words on the board", result: "the teacher gives a warm congratulation" } },
  { keys: ["health", "body", "doctor", "medical"], scenario: { place: "the local clinic", action: "describe a small problem to the doctor", object: "a glass of water and a health card", result: "the doctor gives helpful advice" } },
  { keys: ["animal", "pet", "dog", "cat"], scenario: { place: "the animal centre", action: "look after a friendly rescue dog", object: "a blue bowl and a red ball", result: "the dog feels safe and starts to play" } },
  { keys: ["hobby", "free time", "leisure"], scenario: { place: "the community centre", action: "join a new afternoon club", object: "a camera and a notebook", result: "a new friendship begins that afternoon" } },
  { keys: ["sport", "football", "exercise"], scenario: { place: "the school sports field", action: "practise with the school team", object: "a ball near the goal", result: "the team scores its first point" } },
  { keys: ["travel", "trip", "holiday", "airport"], scenario: { place: "the train station", action: "check the ticket before a trip", object: "a small suitcase and a map", result: "the right platform is easy to find" } },
  { keys: ["transport", "bus", "train", "direction"], scenario: { place: "the city bus stop", action: "ask for directions", object: "a bus going to the city centre", result: "the driver explains where to get off" } },
  { keys: ["work", "job", "office", "career", "business"], scenario: { place: "a new office on the first working day", action: "meet a new colleague", object: "a notebook with the day's work tasks", result: "the next task becomes clear" } },
  { keys: ["technology", "gadget", "computer", "internet"], scenario: { place: "the library computer room", action: "learn to use a new website", object: "a laptop and a useful password", result: "the online task is finished successfully" } },
  { keys: ["celebration", "festival", "party"], scenario: { place: "a neighbour's celebration", action: "help decorate the room", object: "bright cards and a birthday cake", result: "the guests sing together" } },
  { keys: ["environment", "nature", "recycle"], scenario: { place: "the city beach", action: "collect plastic with a volunteer group", object: "a large bag and a pair of gloves", result: "the beach looks cleaner" } },
  { keys: ["past", "yesterday", "irregular", "regular", "verb"], scenario: { place: "the old town museum", action: "describe the events of yesterday", object: "a photo from a weekend walk", result: "a friend understands the whole story" } },
  { keys: ["plan", "arrangement", "future", "appointment"], scenario: { place: "the library café", action: "make plans for the weekend", object: "a calendar and two cinema tickets", result: "the friends agree on a time" } },
  { keys: ["compar", "superlative", "adjective"], scenario: { place: "a city park", action: "compare three trees for a drawing", object: "the tallest tree beside a bench", result: "the best view wins the drawing" } },
  { keys: ["experience", "present perfect", "ever", "already", "yet"], scenario: { place: "a travel club meeting", action: "share a memorable experience", object: "a postcard from a different city", result: "the group asks many more questions" } },
];

function storyScenario(title: string): StoryScenario {
  const normalized = stripDiacritics(title).toLowerCase();
  return STORY_SCENARIOS.find(({ keys }) => keys.some((key) => normalized.includes(stripDiacritics(key))))?.scenario ?? {
    place: "a new place in the city",
    action: "uses English to solve a small problem",
    object: "a lesson notebook",
    result: "the whole conversation goes well",
  };
}

/**
 * A1/A2 readings are short, topic-specific stories. The scenario is selected
 * from the lesson title, while the learner's own vocabulary is woven into it,
 * so "At School", "Numbers", and "My Family" never receive the same passage.
 */
function buildStoryReading(lesson: LessonData, level: Cefr) {
  const vocab = lesson.vocabulary ?? [];
  if (vocab.length < 3) return undefined;
  const seed = seedFor(lesson);
  const person = STORY_PEOPLE[seed % STORY_PEOPLE.length];
  const time = STORY_TIMES[seed % STORY_TIMES.length];
  const day = STORY_DAYS[seed % STORY_DAYS.length];
  const topic = lesson.title.toLowerCase();
  const scenario = storyScenario(lesson.title);
  const words = vocab.slice(0, level === "a1" ? 3 : 5).map((v) => v.word);
  const wordList = words.join(", ");
  const examples = vocab.map((v) => v.example?.trim()).filter((e): e is string => Boolean(e)).slice(0, 2);

  const a1 = [
    `${person.name}'s ${lesson.title} Story`, "",
    `My name is ${person.name}. I am ${person.age} years old and I live in ${person.city}. On ${day}, I go to ${scenario.place}.`,
    "",
    `Today I ${scenario.action}. I see ${scenario.object}. My lesson words are ${wordList}. I say each word slowly and write them in my notebook.`,
    "",
    `${examples[0] ?? `My teacher helps me talk about ${topic}.`} ${scenario.result.charAt(0).toUpperCase()}${scenario.result.slice(1)}.`,
    "",
    `At ${time}, I go home. I tell my family about my day. I am happy because I can talk about ${topic} in English.`,
  ];

  const a2 = [
    `${person.name}'s Real-Life Practice: ${lesson.title}`, "",
    `${person.name} lives in ${person.city} and studies English at The English Club. Last ${day}, ${person.she} went to ${scenario.place} to practise ${topic} in a real situation.`,
    "",
    `At first, ${person.she} was not sure what to do. Then ${person.she} decided to ${scenario.action}. ${person.she === "she" ? "She" : "He"} noticed ${scenario.object}, and used the key words ${wordList} to explain what ${person.she} needed.`,
    "",
    `${examples[0] ? `${person.she === "she" ? "She" : "He"} said, "${examples[0]}"` : `The teacher's advice helped ${person.her} speak clearly.`} ${scenario.result.charAt(0).toUpperCase()}${scenario.result.slice(1)}. After that, ${person.she} wrote down what happened, so ${person.she} could remember the useful language.`,
    "",
    `At ${time}, ${person.name} reviewed the lesson with a friend. The experience showed ${person.her === "her" ? "her" : "him"} that ${topic} is easier when ${person.she} connects new words to everyday life.`,
  ];

  const text = (level === "a1" ? a1 : a2).join("\n");
  const opts = (correct: string, decoys: string[]) => {
    const options = shuffleDeterministic([correct, ...decoys], seed + 71);
    return { options, correct: options.indexOf(correct) };
  };
  const questions: MCQItem[] = [];
  questions.push({ question: "What is the name of the student in the passage?", ...opts(person.name, STORY_PEOPLE.filter((p) => p.name !== person.name).slice(0, 3).map((p) => p.name)) });
  questions.push({ question: `Where does ${person.name} live?`, ...opts(person.city, ["Cairo", "Aswan", "Luxor", "Tanta", "Alexandria"].filter((c) => c !== person.city).slice(0, 3)) });
  questions.push({ question: `Where does ${person.name} go on ${day}?`, ...opts(scenario.place, ["the cinema", "the library", "the airport"].filter((p) => p !== scenario.place)) });
  questions.push({ question: `What does ${person.name} see there?`, ...opts(scenario.object, ["a red bicycle", "a big window", "an old book"]) });
  questions.push({ question: "When does the student study English?", ...opts(day, STORY_DAYS.filter((d) => d !== day).slice(0, 3)) });
  questions.push({ question: level === "a1" ? "What time does the student go home?" : "What time does the student review the lesson?", ...opts(time, STORY_TIMES.filter((t) => t !== time).slice(0, 3)) });
  questions.push({ question: "What is the passage mainly about?", ...opts(lesson.title, ["Sports and hobbies", "Money and banking", "Animals in the zoo"]) });
  questions.push({ question: `True or false? ${person.name} writes the new words in a notebook.`, options: ["True", "False"], correct: 0 });
  questions.push({ question: `True or false? ${person.name} gives up and stops studying English.`, options: ["True", "False"], correct: 1 });

  const meaningWord = vocab[seed % vocab.length];
  if (meaningWord?.meaning) {
    const decoys = shuffleDeterministic(vocab.filter((v) => v.word !== meaningWord.word && v.meaning).map((v) => v.meaning), seed + 83).slice(0, 3);
    if (decoys.length >= 2) questions.push({ question: `In the passage, what does "${meaningWord.word}" mean?`, ...opts(meaningWord.meaning, decoys) });
  }

  return {
    title: `Reading (${level.toUpperCase()}): ${lesson.title}`,
    text: `${text}\n\nYOUR TASK\nRead the passage twice. Underline the new words, then answer the questions below.`,
    questions,
  };
}

/* ── Real article-style passages for B1 / B2 / C1 / C2 ──────────────── */

const ARTICLE_CITIES = ["Alexandria", "Cairo", "Manchester", "Toronto", "Lisbon", "Nairobi"];
const ARTICLE_EXPERTS = [
  { name: "Dr Hana Fahmy", role: "a language researcher" },
  { name: "Professor Adel Rashad", role: "a lecturer in applied linguistics" },
  { name: "Dr Laura Weiss", role: "an education consultant" },
  { name: "Mr Tarek Aziz", role: "a workplace trainer" },
  { name: "Dr Noha Selim", role: "a social researcher" },
];
const ARTICLE_STATS = ["38%", "52%", "61%", "74%", "83%"];
const ARTICLE_YEARS = ["2019", "2021", "2022", "2024"];

const ARTICLE_REGISTER: Record<"b1" | "b2" | "c1" | "c2", { kind: string; task: string; closing: (t: string) => string }> = {
  b1: {
    kind: "a magazine article",
    task: "Read the article twice. Write the main idea of each paragraph in one short sentence, then answer the questions.",
    closing: (t) => `For most learners, the lesson is simple: ${t} improves fastest when it is practised in real situations, not only studied on paper.`,
  },
  b2: {
    kind: "a feature article",
    task: "Identify the writer's main claim and the evidence used to support it. Mark every linking phrase and say what it signals.",
    closing: (t) => `The debate around ${t} is therefore less about ability than about opportunity: people improve when the situation demands it and when mistakes cost them nothing.`,
  },
  c1: {
    kind: "an opinion essay",
    task: "Summarise the writer's argument in 40 words, then rewrite the final paragraph so that it takes the opposite position.",
    closing: (t) => `Seen this way, ${t} is not a neutral skill but a form of access: it decides who is heard in a meeting, a clinic, or a classroom, and who is quietly overlooked.`,
  },
  c2: {
    kind: "an analytical commentary",
    task: "Identify the writer's stance and the hedging devices that soften it. Then rewrite one paragraph in a markedly more informal register without losing the argument.",
    closing: (t) => `What the evidence on ${t} ultimately exposes is a mismatch between how institutions measure competence and how competence is actually produced — incrementally, socially, and under pressure.`,
  },
};

/**
 * B1–C2 readings are genuine multi-paragraph texts on the lesson's own topic:
 * a situation, data, an expert voice and a conclusion. Every comprehension
 * question can be answered from the passage itself.
 */
function buildAdvancedReading(lesson: LessonData, level: "b1" | "b2" | "c1" | "c2") {
  const vocab = lesson.vocabulary ?? [];
  const seed = seedFor(lesson);
  const scenario = storyScenario(lesson.title);
  const cfg = ARTICLE_REGISTER[level];
  const city = ARTICLE_CITIES[seed % ARTICLE_CITIES.length];
  const expert = ARTICLE_EXPERTS[seed % ARTICLE_EXPERTS.length];
  const stat = ARTICLE_STATS[seed % ARTICLE_STATS.length];
  const year = ARTICLE_YEARS[seed % ARTICLE_YEARS.length];
  const topic = lesson.title.toLowerCase();
  const words = vocab.slice(0, level === "b1" ? 4 : 6).map((v) => v.word);
  const wordList = words.join(", ");
  const quoted = vocab.map((v) => v.example?.trim()).filter((e): e is string => Boolean(e))[0];

  const paragraphs =
    level === "b1"
      ? [
          `WHY ${lesson.title.toUpperCase()} MATTERS`,
          "",
          `Every week, hundreds of people arrive at ${scenario.place} in ${city} and discover that they need English for something ordinary. Some come to ${scenario.action}; others simply want to understand what is written on ${scenario.object}. Whatever the reason, ${topic} stops being a school subject and becomes a practical tool.`,
          "",
          `A study published in ${year} found that ${stat} of adult learners in ${city} use English at least once a day outside the classroom. The same study reported that learners who practise in real situations remember new words far longer than learners who only complete written exercises. Words such as ${wordList} are a clear example: they are easy to recognise on a page, but harder to produce under pressure.`,
          "",
          `${expert.name}, ${expert.role}, explains the difference. "Learners do not fail because they lack vocabulary," ${expert.name.split(" ").pop()} says. "They hesitate because they have never used the words when something real depended on them."${quoted ? ` A sentence as simple as "${quoted}" can be enough to start the conversation.` : ""} In most cases, ${scenario.result}.`,
          "",
          cfg.closing(topic),
        ]
      : [
          `${lesson.title.toUpperCase()}: ${level === "b2" ? "A CLOSER LOOK" : level === "c1" ? "AN ARGUMENT" : "A CRITICAL READING"}`,
          "",
          `The conventional account of ${topic} treats it as a set of items to be memorised and later retrieved. Observation at ${scenario.place} in ${city} suggests something less tidy. People who go there to ${scenario.action} rarely produce complete, well-formed language; they improvise, borrow phrases, point at ${scenario.object}, and repair their own sentences halfway through. The result is imperfect but effective.`,
          "",
          `Figures from ${year} support this reading. Of the adults surveyed in ${city}, ${stat} reported that their most useful English had been learned outside formal instruction, in precisely such unplanned exchanges. Vocabulary of the kind covered here — ${wordList} — appears in their accounts not as isolated words but as fragments of remembered situations, which is arguably why it survives.`,
          "",
          `${expert.name}, ${expert.role}, is careful not to overstate the case. "Exposure alone explains very little," ${expert.name.split(" ").pop()} argues. "What matters is whether the speaker is held responsible for being understood." That condition, rather than any particular method, appears to separate learners who stall from those who progress.${quoted ? ` The point is visible even in a sentence as unremarkable as "${quoted}".` : ""}`,
          "",
          `There is a counter-argument, and it deserves a hearing: unstructured practice can leave errors in place, and confidence is not the same as accuracy. Yet in the situations described above, ${scenario.result}, and the errors that remained did not prevent it.`,
          "",
          cfg.closing(topic),
        ];

  const text = paragraphs.join("\n");
  const opts = (correct: string, decoys: string[]) => {
    const options = shuffleDeterministic([correct, ...decoys], seed + 97);
    return { options, correct: options.indexOf(correct) };
  };

  const questions: MCQItem[] = [
    { question: `According to the passage, what percentage of adults in ${city} is reported in the study?`, ...opts(stat, ARTICLE_STATS.filter((s) => s !== stat).slice(0, 3)) },
    { question: "In which year was the study published?", ...opts(year, ARTICLE_YEARS.filter((y) => y !== year).slice(0, 3)) },
    { question: "Which city does the passage refer to?", ...opts(city, ARTICLE_CITIES.filter((c) => c !== city).slice(0, 3)) },
    { question: "Who is quoted in the passage?", ...opts(expert.name, ARTICLE_EXPERTS.filter((e) => e.name !== expert.name).slice(0, 3).map((e) => e.name)) },
    { question: `What is ${expert.name}'s profession?`, ...opts(expert.role, ["a hospital manager", "a travel journalist", "a software engineer"]) },
    { question: "Where do the situations in the passage take place?", ...opts(scenario.place, ["a football stadium", "an airport lounge", "a television studio"]) },
    { question: "What is the writer's main point?", ...opts(`Real situations make ${topic} stick`, ["Grammar rules should be memorised first", "Only young learners can improve", "Written exams are the best measure of skill"]) },
    { question: `True or false? The passage claims that learners mainly fail because they know too few words.`, options: ["True", "False"], correct: 1 },
    { question: "True or false? The writer accepts that unstructured practice has a disadvantage.", options: ["True", "False"], correct: level === "b1" ? 1 : 0 },
  ];

  if (level !== "b1") {
    questions.push({
      question: "Which best describes the writer's tone?",
      ...opts("Measured and analytical", ["Angry and dismissive", "Playful and informal", "Neutral and purely factual"]),
    });
  }

  const meaningWord = vocab[seed % Math.max(vocab.length, 1)];
  if (meaningWord?.meaning) {
    const decoys = shuffleDeterministic(vocab.filter((v) => v.word !== meaningWord.word && v.meaning).map((v) => v.meaning), seed + 101).slice(0, 3);
    if (decoys.length >= 2) {
      questions.push({ question: `In this context, what does "${meaningWord.word}" mean?`, ...opts(meaningWord.meaning, decoys) });
    }
  }

  const grammarNote = lesson.grammar?.title
    ? `LANGUAGE FOCUS — ${lesson.grammar.title}\n${lesson.grammar.explanation ?? ""}`.trim()
    : "";

  return {
    title: `Reading (${level.toUpperCase()}): ${lesson.title}`,
    text: [`This is ${cfg.kind} about ${topic}.`, text, grammarNote, `YOUR TASK\n${cfg.task}`].filter(Boolean).join("\n\n"),
    questions,
  };
}


/** Grammar must always show example sentences — top up to at least 4. */
const MIN_GRAMMAR_EXAMPLES = 4;

function ensureGrammarExamples(lesson: LessonData) {
  const g = lesson.grammar;
  if (!g) return g;
  const existing = g.examples ?? [];
  if (existing.length >= MIN_GRAMMAR_EXAMPLES) return g;
  const used = new Set(existing.map((e) => e.sentence.trim().toLowerCase()));
  const extra = (lesson.vocabulary ?? [])
    .filter((v) => v.example && v.example.trim() && !used.has(v.example.trim().toLowerCase()))
    .map((v) => ({ sentence: v.example as string, note: `Uses "${v.word}"` }))
    .slice(0, MIN_GRAMMAR_EXAMPLES - existing.length);
  if (extra.length === 0) return g;
  return { ...g, examples: [...existing, ...extra] };
}

const longestWord = (sentence: string) =>
  sentence
    .split(/\s+/)
    .map((w) => w.replace(/[.,!?¿¡;:"'()]/g, ""))
    .filter((w) => w.length > 3)
    .sort((a, b) => b.length - a.length)[0];

const wordCount = (s: string) => s.trim().split(/\s+/).length;

/** Generate extra MCQs so every section has more practice, sized to the level. */
function topUpExercises(lesson: LessonData) {
  const seed = seedFor(lesson);
  const tuning = tuningFor(lesson);
  const vocab = lesson.vocabulary ?? [];
  const words = vocab.map((v) => v.word);
  const levelOk = (s?: string) => Boolean(s) && wordCount(s as string) <= tuning.maxSentenceWords;

  // Vocabulary: fill-in-the-blank from each word's own example sentence.
  const vocabExtra: MCQItem[] = vocab
    .filter((v) => v.example && v.example.toLowerCase().includes(v.word.toLowerCase()) && levelOk(v.example))
    .map((v, idx) => {
      const blanked = v.example.replace(new RegExp(v.word, "i"), "______");
      const distractors = shuffleDeterministic(
        words.filter((w) => w.toLowerCase() !== v.word.toLowerCase()),
        seed + idx + 11,
      ).slice(0, 3);
      const options = shuffleDeterministic([v.word, ...distractors], seed + idx + 17);
      return {
        question: `Complete with "${v.word}"? — ${blanked}`,
        options,
        correct: options.indexOf(v.word),
      };
    })
    .slice(0, tuning.maxVocabExercises);

  // Grammar: blank a key word inside each grammar example sentence.
  const grammarExtra: MCQItem[] = (lesson.grammar?.examples ?? [])
    .filter((ex) => levelOk(ex.sentence))
    .map((ex, idx) => {
      const target = longestWord(ex.sentence);
      if (!target) return undefined;
      const pool = [
        ...words,
        ...(lesson.grammar?.examples ?? []).map((e) => longestWord(e.sentence)).filter(Boolean),
      ].filter((w): w is string => Boolean(w) && w.toLowerCase() !== target.toLowerCase());
      const distractors = shuffleDeterministic(Array.from(new Set(pool)), seed + idx + 23).slice(0, 3);
      if (distractors.length < 2) return undefined;
      const options = shuffleDeterministic([target, ...distractors], seed + idx + 29);
      return {
        question: `Complete the sentence: ${ex.sentence.replace(new RegExp(target, "i"), "______")}`,
        options,
        correct: options.indexOf(target),
      };
    })
    .filter((q): q is MCQItem => Boolean(q))
    .slice(0, tuning.maxGrammarExercises);

  // Vocabulary: meaning checks. Beginners get a clear 4-option choice instead
  // of true/false statements that can teach the wrong pairing.
  const tfPool = vocab.filter((v) => v.meaning && v.meaning.trim());
  const vocabMeaning: MCQItem[] = !tuning.useTrueFalse
    ? tfPool.slice(0, 4).map((v, idx) => {
        const decoys = shuffleDeterministic(
          tfPool.filter((x) => x.word !== v.word).map((x) => x.meaning),
          seed + idx + 61,
        ).slice(0, 3);
        const options = shuffleDeterministic([v.meaning, ...decoys], seed + idx + 67);
        return { question: `What does "${v.word}" mean?`, options, correct: options.indexOf(v.meaning) };
      })
    : tfPool.slice(0, 6).map((v, idx) => {
        const isTrue = (seed + idx) % 2 === 0 || tfPool.length < 2;
        const other = tfPool[(idx + 1 + (seed % 3)) % tfPool.length];
        const shown = isTrue || other.word === v.word ? v.meaning : other.meaning;
        const correctlyTrue = shown === v.meaning;
        return {
          question: `True or false? "${v.word}" means "${shown}".`,
          options: ["True", "False"],
          correct: correctlyTrue ? 0 : 1,
        };
      });

  // Conversation: who said it + complete the line.
  const dialogue = lesson.dialogue ?? [];
  const speakers = Array.from(new Set(dialogue.map((l) => l.speaker)));
  const conversationExtra: MCQItem[] = [];
  if (speakers.length >= 2) {
    dialogue.slice(0, 4).forEach((line, idx) => {
      const decoys = ["Anna", "Marco", "Sara", "Tom", "Alex"].filter((d) => !speakers.includes(d));
      const options = shuffleDeterministic(
        [line.speaker, ...speakers.filter((s2) => s2 !== line.speaker).slice(0, 2), ...decoys].slice(0, 4),
        seed + idx + 31,
      );
      conversationExtra.push({
        question: `Who says: "${line.text}"?`,
        options,
        correct: options.indexOf(line.speaker),
      });
    });
  }
  dialogue.filter((line) => levelOk(line.text)).slice(0, 3).forEach((line, idx) => {
    const target = longestWord(line.text);
    if (!target) return;
    const pool = Array.from(new Set(words.filter((w) => w.toLowerCase() !== target.toLowerCase())));
    if (pool.length < 3) return;
    const distractors = shuffleDeterministic(pool, seed + idx + 37).slice(0, 3);
    const options = shuffleDeterministic([target, ...distractors], seed + idx + 41);
    conversationExtra.push({
      question: `Complete the line — ${line.speaker}: ${line.text.replace(new RegExp(target, "i"), "______")}`,
      options,
      correct: options.indexOf(target),
    });
  });

  const dedupe = (base: MCQItem[] = [], extra: MCQItem[]) => {
    const seen = new Set(base.map((q) => q.question.trim().toLowerCase()));
    return [...base, ...extra.filter((q) => !seen.has(q.question.trim().toLowerCase()))];
  };

  return {
    vocabExercises: dedupe(lesson.vocabExercises, [...vocabExtra, ...vocabMeaning]),
    grammarExercises: dedupe(lesson.grammarExercises, grammarExtra),
    conversationExercises: dedupe(
      lesson.conversationExercises,
      conversationExtra.slice(0, tuning.maxConversationExercises),
    ),
  };
}

/** Reading gets extra comprehension + true/false questions. */
function augmentReading(lesson: LessonData, reading?: LessonData["reading"]) {
  if (!reading) return reading;
  const seed = seedFor(lesson);
  const tuning = tuningFor(lesson);
  const sentences = reading.text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s2) => s2.trim())
    .filter((s2) => {
      const words = s2.split(/\s+/).length;
      // Skip run-on / instruction-style blocks: questions must stay short and readable.
      return (
        words >= 4 &&
        words <= Math.min(tuning.maxSentenceWords, 14) &&
        s2.length <= 110 &&
        !s2.includes("→") &&
        !s2.includes("/")
      );
    })
    .slice(0, 6);

  const vocab = lesson.vocabulary ?? [];

  const extra: MCQItem[] = [];
  sentences.slice(0, 3).forEach((sentence, idx) => {
    const isTrue = (seed + idx) % 2 === 0;
    const swap = vocab[(idx + 1) % Math.max(vocab.length, 1)]?.word;
    const target = longestWord(sentence);
    const shown = isTrue || !swap || !target ? sentence : sentence.replace(new RegExp(target, "i"), swap);
    extra.push({
      question: `According to the text — true or false? "${shown}"`,
      options: ["True", "False"],
      correct: shown === sentence ? 0 : 1,
    });
  });
  sentences.slice(3, 5).forEach((sentence, idx) => {
    const target = longestWord(sentence);
    if (!target) return;
    const pool = Array.from(new Set(vocab.map((v) => v.word).filter((w) => w.toLowerCase() !== target.toLowerCase())));
    if (pool.length < 3) return;
    const distractors = shuffleDeterministic(pool, seed + idx + 47).slice(0, 3);
    const options = shuffleDeterministic([target, ...distractors], seed + idx + 53);
    extra.push({
      question: `Choose the correct word: ${sentence.replace(new RegExp(target, "i"), "______")}`,
      options,
      correct: options.indexOf(target),
    });
  });

  const seen = new Set((reading.questions ?? []).map((q) => q.question.trim().toLowerCase()));
  return {
    ...reading,
    questions: [
      ...(reading.questions ?? []),
      ...extra.filter((q) => !seen.has(q.question.trim().toLowerCase())).slice(0, tuning.maxReadingExtras),
    ],
  };
}

export function enrichLesson(lesson: LessonData): LessonData {
  const lang = detectLang(lesson.levelId);
  const s = L[lang];
  const level = cefrOf(lesson.levelId);
  const beginnerStory =
    lang === "en" && (level === "a1" || level === "a2") ? buildStoryReading(lesson, level) : undefined;
  const baseReading =
    lesson.reading ?? beginnerStory ?? enrichEnglishReading(lesson, buildReading(lesson, lang));
  const reading = augmentReading(lesson, baseReading);
  const grammar = ensureGrammarExamples(lesson) ?? lesson.grammar;
  const { vocabExercises, grammarExercises, conversationExercises } = topUpExercises({ ...lesson, grammar });
  return {
    ...lesson,
    grammar,
    vocabExercises,
    grammarExercises,
    conversationExercises,
    heroImage: lesson.heroImage ?? heroImageFor(lesson),
    reading,
    listening: lesson.listening ?? buildListening(lesson, lang),
    writingPrompt:
      lesson.writingPrompt ?? (level && lang === "en" ? EN_LEVEL[level].writing(lesson.title) : s.writing(lesson.title)),
    speakingPrompt:
      lesson.speakingPrompt ??
      (level && lang === "en" ? TUNING[level].speaking(lesson.title) : s.speaking(lesson.title)),
  };
}


export function enrichAllLessons(map: Record<string, LessonData>): void {
  for (const key of Object.keys(map)) {
    map[key] = enrichLesson(map[key]);
  }
}
