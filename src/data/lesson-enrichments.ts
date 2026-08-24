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

function buildReading(lesson: LessonData, lang: Lang) {
  const s = L[lang];
  const examples = (lesson.vocabulary ?? [])
    .map((v) => v.example)
    .filter((e): e is string => Boolean(e && e.trim()))
    .slice(0, 6);
  if (examples.length < 3) return undefined;

  const pool = lesson.vocabulary.slice(0, Math.min(8, lesson.vocabulary.length));
  if (pool.length < 4) return undefined;

  const text = `${s.intro(lesson.title)}\n\n${examples.join(" ")}`;
  const questions: MCQItem[] = pool.slice(0, 4).map((v, idx) => {
    const distractors = shuffleDeterministic(
      pool.filter((x) => x.word !== v.word).map((x) => x.meaning),
      seedFor(lesson) + idx + 7,
    ).slice(0, 3);
    const options = shuffleDeterministic([v.meaning, ...distractors], seedFor(lesson) + idx + 3);
    return { question: s.meaningQ(v.word), options, correct: options.indexOf(v.meaning) };
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

type Cefr = "a1" | "a2" | "b1" | "b2" | "c1" | "c2";

function cefrOf(levelId: string): Cefr | undefined {
  const m = levelId.toLowerCase().match(/^(a1|a2|b1|b2|c1|c2)\b/);
  return (m?.[1] as Cefr) ?? undefined;
}

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
  const grammarNote = lesson.grammar?.title
    ? `\n\nLanguage focus: ${lesson.grammar.title}. ${lesson.grammar.explanation ?? ""}`.trim()
    : "";
  const examples = (lesson.grammar?.examples ?? [])
    .slice(0, 3)
    .map((e) => `• ${e.sentence}${e.note ? ` — ${e.note}` : ""}`)
    .join("\n");
  return {
    ...base,
    title: `Reading (${level.toUpperCase()}): ${lesson.title}`,
    text: [
      base.text.split("\n\n").slice(1).join("\n\n") || base.text,
      grammarNote,
      examples ? `Examples in context:\n${examples}` : "",
      `Task: ${cfg.task}`,
    ]
      .filter(Boolean)
      .join("\n\n"),
  };
}

export function enrichLesson(lesson: LessonData): LessonData {
  const lang = detectLang(lesson.levelId);
  const s = L[lang];
  const level = cefrOf(lesson.levelId);
  const reading = lesson.reading ?? enrichEnglishReading(lesson, buildReading(lesson, lang));
  return {
    ...lesson,
    heroImage: lesson.heroImage ?? heroImageFor(lesson),
    reading,
    listening: lesson.listening ?? buildListening(lesson, lang),
    writingPrompt:
      lesson.writingPrompt ?? (level && lang === "en" ? EN_LEVEL[level].writing(lesson.title) : s.writing(lesson.title)),
    speakingPrompt: lesson.speakingPrompt ?? s.speaking(lesson.title),
  };
}


export function enrichAllLessons(map: Record<string, LessonData>): void {
  for (const key of Object.keys(map)) {
    map[key] = enrichLesson(map[key]);
  }
}
