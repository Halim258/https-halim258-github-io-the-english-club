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

export function enrichLesson(lesson: LessonData): LessonData {
  const lang = detectLang(lesson.levelId);
  const s = L[lang];
  return {
    ...lesson,
    heroImage: lesson.heroImage ?? heroImageFor(lesson),
    reading: lesson.reading ?? buildReading(lesson, lang),
    listening: lesson.listening ?? buildListening(lesson, lang),
    writingPrompt: lesson.writingPrompt ?? s.writing(lesson.title),
    speakingPrompt: lesson.speakingPrompt ?? s.speaking(lesson.title),
  };
}

export function enrichAllLessons(map: Record<string, LessonData>): void {
  for (const key of Object.keys(map)) {
    map[key] = enrichLesson(map[key]);
  }
}
