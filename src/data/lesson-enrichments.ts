import type { LessonData, MCQItem } from "./lessons";

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
  `https://loremflickr.com/1200/500/${encodeURIComponent(topicKeyword(lesson.title))}?lock=${seedFor(lesson)}`;

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
  { name: "Sara", age: 19, city: "Alexandria" },
  { name: "Omar", age: 22, city: "Cairo" },
  { name: "Nour", age: 17, city: "Tanta" },
  { name: "Youssef", age: 25, city: "Alexandria" },
  { name: "Mona", age: 20, city: "Damanhur" },
  { name: "Karim", age: 23, city: "Port Said" },
];

const STORY_TIMES = ["five o'clock", "six o'clock", "seven o'clock", "four o'clock"];
const STORY_DAYS = ["Monday", "Tuesday", "Wednesday", "Saturday", "Sunday"];

/**
 * A1/A2 readings must be a real passage (a small story with a person, a place,
 * a time and a small event) — not a list of vocabulary sentences. All facts are
 * generated here, so the comprehension questions have verifiable answers.
 */
function buildStoryReading(lesson: LessonData, level: Cefr) {
  const vocab = lesson.vocabulary ?? [];
  if (vocab.length < 3) return undefined;
  const seed = seedFor(lesson);
  const person = STORY_PEOPLE[seed % STORY_PEOPLE.length];
  const time = STORY_TIMES[seed % STORY_TIMES.length];
  const day = STORY_DAYS[seed % STORY_DAYS.length];
  const topic = lesson.title.toLowerCase();
  const words = vocab.slice(0, level === "a1" ? 3 : 5).map((v) => v.word);
  const wordList = words.join(", ");
  const examples = vocab
    .map((v) => v.example?.trim())
    .filter((e): e is string => Boolean(e))
    .slice(0, level === "a1" ? 3 : 4);

  const a1 = [
    `${person.name}'s Lesson: ${lesson.title}`,
    "",
    `My name is ${person.name}. I am ${person.age} years old. I live in ${person.city}. I am a student at The English Club. I study English every ${day}.`,
    "",
    `Today my lesson is about ${topic}. It is my favourite lesson. I have ${words.length} new words: ${wordList}. I say the words out loud. My teacher helps me.`,
    "",
    examples.join(" "),
    "",
    `At ${time} I go home. I write the new words in my small notebook. Then I read them again before bed. Now I can talk about ${topic} in English. I am happy.`,
  ];

  const a2 = [
    `${person.name}'s Week: ${lesson.title}`,
    "",
    `${person.name} is ${person.age} years old and lives in ${person.city}. She goes to The English Club every ${day}, because she wants to speak English at work. Last week her class studied ${topic}.`,
    "",
    `At first it was difficult. The teacher gave the class ${words.length} key words: ${wordList}. ${person.name} wrote each word in her notebook with an example sentence. ${examples.join(" ")}`,
    "",
    `After the lesson, at ${time}, she practised with her friend for twenty minutes. They asked each other questions and corrected the small mistakes. ${person.name} says that speaking about ${topic} is much easier now, and next week she wants to try a longer conversation.`,
  ];

  const text = (level === "a1" ? a1 : a2).filter((l) => l !== undefined).join("\n");

  const opts = (correct: string, decoys: string[]) => {
    const options = shuffleDeterministic([correct, ...decoys], seed + 71);
    return { options, correct: options.indexOf(correct) };
  };

  const questions: MCQItem[] = [];
  const nameQ = opts(
    person.name,
    STORY_PEOPLE.filter((p) => p.name !== person.name)
      .slice(0, 3)
      .map((p) => p.name),
  );
  questions.push({ question: "What is the name of the student in the passage?", ...nameQ });

  const cityQ = opts(
    person.city,
    ["Cairo", "Aswan", "Luxor", "Tanta", "Alexandria"].filter((c) => c !== person.city).slice(0, 3),
  );
  questions.push({ question: `Where does ${person.name} live?`, ...cityQ });

  const ageQ = opts(String(person.age), [String(person.age + 2), String(person.age - 3), String(person.age + 5)]);
  questions.push({ question: `How old is ${person.name}?`, ...ageQ });

  const dayQ = opts(day, STORY_DAYS.filter((d) => d !== day).slice(0, 3));
  questions.push({ question: "When does she study English?", ...dayQ });

  const timeQ = opts(time, STORY_TIMES.filter((t) => t !== time).slice(0, 3));
  questions.push({
    question: level === "a1" ? "What time does she go home?" : "What time did she practise with her friend?",
    ...timeQ,
  });

  const countQ = opts(String(words.length), ["1", "2", "6", "8"].filter((n) => n !== String(words.length)).slice(0, 3));
  questions.push({ question: "How many new words does the lesson have?", ...countQ });

  const topicQ = opts(lesson.title, ["Sports and hobbies", "Money and banking", "Animals in the zoo"]);
  questions.push({ question: "What is the passage mainly about?", ...topicQ });

  questions.push({
    question: `True or false? ${person.name} writes the new words in a notebook.`,
    options: ["True", "False"],
    correct: 0,
  });
  questions.push({
    question: `True or false? ${person.name} says English is impossible and she stops studying.`,
    options: ["True", "False"],
    correct: 1,
  });

  const meaningWord = vocab[seed % vocab.length];
  if (meaningWord?.meaning) {
    const decoys = shuffleDeterministic(
      vocab.filter((v) => v.word !== meaningWord.word && v.meaning).map((v) => v.meaning),
      seed + 83,
    ).slice(0, 3);
    if (decoys.length >= 2) {
      const m = opts(meaningWord.meaning, decoys);
      questions.push({ question: `In the passage, what does "${meaningWord.word}" mean?`, ...m });
    }
  }

  return {
    title: `Reading (${level.toUpperCase()}): ${lesson.title}`,
    text: `${text}\n\nYOUR TASK\nRead the passage twice. Underline the new words, then answer the questions below.`,
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
  const baseReading = lesson.reading ?? enrichEnglishReading(lesson, buildReading(lesson, lang));
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
