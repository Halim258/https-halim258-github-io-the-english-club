import type { LessonData, MCQItem } from "./lessons";

/**
 * Programmatically enriches Spanish lessons with:
 *  - hero image (Unsplash source, keyword derived from title)
 *  - reading passage in Spanish (built from vocab example sentences)
 *  - reading comprehension MCQs
 *  - picture-point activity (image + MCQs referencing vocab)
 *  - listening exercise (TTS-friendly transcript from dialogue)
 *  - writing + speaking prompts
 *
 * We build these from data already present in each lesson so all 120
 * Spanish sub-level lessons get consistent, on-topic enrichment.
 */

const stripDiacritics = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const slugForImage = (title: string): string => {
  const cleaned = stripDiacritics(title)
    .toLowerCase()
    .replace(/[¿¡?!.,;:()"']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const stop = new Set([
    "de", "la", "el", "los", "las", "y", "o", "u", "un", "una", "en",
    "para", "con", "por", "al", "del", "a", "e", "que", "los", "las",
  ]);
  const keywords = cleaned
    .split(" ")
    .filter((w) => w.length > 2 && !stop.has(w))
    .slice(0, 3)
    .join(",");
  return keywords || "spanish,learning";
};

const heroImageFor = (title: string): string =>
  `https://source.unsplash.com/1200x600/?spain,${encodeURIComponent(slugForImage(title))}`;

const pictureImageFor = (title: string): string =>
  `https://source.unsplash.com/900x600/?${encodeURIComponent(slugForImage(title))},spanish`;

const shuffleDeterministic = <T>(arr: T[], seed: number): T[] => {
  // Simple LCG-based deterministic shuffle so options are stable across renders.
  const copy = [...arr];
  let s = seed || 1;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const buildReading = (lesson: LessonData) => {
  const examples = lesson.vocabulary
    .map((v) => v.example)
    .filter(Boolean)
    .slice(0, 6);
  const intro = `En esta lección practicamos "${lesson.title}". Lee el texto y responde las preguntas.`;
  const body = examples.join(" ");
  const text = `${intro}\n\n${body}`;

  // 4 comprehension questions from vocab meanings.
  const pool = lesson.vocabulary.slice(0, Math.min(8, lesson.vocabulary.length));
  const questions: MCQItem[] = pool.slice(0, 4).map((v, idx) => {
    const distractors = shuffleDeterministic(
      pool.filter((x) => x.word !== v.word).map((x) => x.meaning),
      idx + 7
    ).slice(0, 3);
    const options = shuffleDeterministic([v.meaning, ...distractors], idx + 3);
    return {
      question: `¿Qué significa "${v.word}" en inglés?`,
      options,
      correct: options.indexOf(v.meaning),
    };
  });

  return {
    title: `Lectura: ${lesson.title}`,
    text,
    questions,
  };
};

const buildPictureActivity = (lesson: LessonData) => {
  const pool = lesson.vocabulary.slice(0, Math.min(8, lesson.vocabulary.length));
  if (pool.length < 4) return undefined;
  const questions: MCQItem[] = pool.slice(0, 4).map((v, idx) => {
    const others = shuffleDeterministic(
      pool.filter((x) => x.word !== v.word).map((x) => x.word),
      idx + 11
    ).slice(0, 3);
    const options = shuffleDeterministic([v.word, ...others], idx + 5);
    return {
      question: `Señala en la imagen: ¿cuál palabra significa "${v.meaning}"?`,
      options,
      correct: options.indexOf(v.word),
    };
  });
  return {
    imageUrl: pictureImageFor(lesson.title),
    caption: `Observa la imagen: ${lesson.title}`,
    prompt: "Mira la imagen y elige la palabra correcta en español para cada elemento.",
    questions,
  };
};

const buildListening = (lesson: LessonData) => {
  if (!lesson.dialogue || lesson.dialogue.length === 0) return undefined;
  const lines = lesson.dialogue.slice(0, 6);
  const transcript = lines.map((l) => `${l.speaker}: ${l.text}`).join("\n");

  const questions: MCQItem[] = [];
  // Q1: who speaks first?
  const speakers = Array.from(new Set(lesson.dialogue.map((l) => l.speaker)));
  if (speakers.length >= 2) {
    const others = speakers.slice(1, 4);
    const options = shuffleDeterministic([speakers[0], ...others], 1).slice(0, 4);
    if (!options.includes(speakers[0])) options[0] = speakers[0];
    questions.push({
      question: "¿Quién habla primero en el diálogo?",
      options,
      correct: options.indexOf(speakers[0]),
    });
  }
  // Q2: pick a keyword from a line
  const line = lines[Math.min(1, lines.length - 1)];
  const words = line.text.split(/\s+/).filter((w) => w.length > 3);
  if (words.length > 0) {
    const target = stripDiacritics(words[0]).replace(/[.,¿?¡!:;"']/g, "");
    const decoys = ["hola", "gracias", "adiós", "familia", "trabajo", "casa"]
      .filter((d) => stripDiacritics(d) !== target.toLowerCase())
      .slice(0, 3);
    const options = shuffleDeterministic([words[0], ...decoys], 2);
    questions.push({
      question: `Escucha otra vez. ¿Cuál palabra dice ${line.speaker}?`,
      options,
      correct: options.indexOf(words[0]),
    });
  }
  // Q3: total speakers count
  questions.push({
    question: "¿Cuántas personas participan en el diálogo?",
    options: ["1", "2", "3", "4"],
    correct: Math.min(Math.max(speakers.length - 1, 0), 3),
  });

  return { transcript, questions };
};

const buildWritingPrompt = (lesson: LessonData): string =>
  `Escribe un párrafo corto (50–80 palabras) sobre "${lesson.title}". Usa al menos 4 palabras del vocabulario de esta lección.`;

const buildSpeakingPrompt = (lesson: LessonData): string =>
  `Habla 1 minuto sobre "${lesson.title}". Preséntate, describe una situación real y usa nuevas palabras del vocabulario.`;

export function enrichSpanishLesson(lesson: LessonData): LessonData {
  // Do not overwrite manually-authored fields.
  return {
    ...lesson,
    heroImage: lesson.heroImage ?? heroImageFor(lesson.title),
    reading: lesson.reading ?? buildReading(lesson),
    pictureActivity: lesson.pictureActivity ?? buildPictureActivity(lesson),
    listening: lesson.listening ?? buildListening(lesson),
    writingPrompt: lesson.writingPrompt ?? buildWritingPrompt(lesson),
    speakingPrompt: lesson.speakingPrompt ?? buildSpeakingPrompt(lesson),
  };
}

export function enrichSpanishLessons(
  map: Record<string, LessonData>
): Record<string, LessonData> {
  const out: Record<string, LessonData> = {};
  for (const [k, v] of Object.entries(map)) {
    out[k] = enrichSpanishLesson(v);
  }
  return out;
}