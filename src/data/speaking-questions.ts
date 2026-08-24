import type { LessonData } from "./lessons";

/**
 * Topic-related speaking questions.
 * Every question is generated FROM the lesson itself (title, vocabulary,
 * grammar point) so the student only ever speaks about the lesson topic.
 * Depth scales with the CEFR band detected from the levelId.
 */

export interface SpeakingQuestion {
  question: string;
  hint?: string;
}

type Band = "a" | "b" | "c";

type Lang = "en" | "es" | "it" | "de";

function detectLang(levelId: string): Lang {
  if (levelId.startsWith("es-")) return "es";
  if (levelId.startsWith("it-")) return "it";
  if (levelId.startsWith("de-")) return "de";
  return "en";
}

function detectBand(levelId: string): Band {
  const m = levelId.toLowerCase().match(/([abc])([12])/);
  if (!m) return "b";
  return m[1] as Band;
}

const T = {
  en: {
    a: (t: string) => [
      `What is this lesson about? Say it in one sentence: "${t}".`,
      `Say three words you learned about ${t}.`,
      `Do you like ${t}? Say why in two short sentences.`,
      `Describe something about ${t} from your own life.`,
    ],
    b: (t: string) => [
      `Explain the topic "${t}" in your own words for about 30 seconds.`,
      `Tell a short story from your life connected to ${t}.`,
      `What is the most useful thing you learned about ${t}? Why?`,
      `Compare ${t} in Egypt with ${t} in another country you know.`,
    ],
    c: (t: string) => [
      `Give a one-minute mini-presentation on "${t}", with an introduction, two points and a conclusion.`,
      `What arguments would you use for and against the ideas in "${t}"?`,
      `How has ${t} changed in the last ten years, and what will change next?`,
      `Explain "${t}" to someone who knows nothing about it, without using simple words.`,
    ],
    vocabQ: (w: string, t: string) => `Use the word "${w}" in a sentence about ${t}.`,
    grammarQ: (g: string, t: string) => `Answer using ${g}: talk about ${t} for 20 seconds.`,
    hintListen: "Tap Listen to hear the question, then answer out loud.",
  },
  es: {
    a: (t: string) => [
      `¿De qué trata esta lección? Dilo en una frase: "${t}".`,
      `Di tres palabras que aprendiste sobre ${t}.`,
      `¿Te gusta ${t}? Explica por qué en dos frases.`,
      `Describe algo de tu vida relacionado con ${t}.`,
    ],
    b: (t: string) => [
      `Explica el tema "${t}" con tus propias palabras durante 30 segundos.`,
      `Cuenta una anécdota de tu vida relacionada con ${t}.`,
      `¿Qué es lo más útil que aprendiste sobre ${t}? ¿Por qué?`,
      `Compara ${t} en tu país con ${t} en otro país.`,
    ],
    c: (t: string) => [
      `Haz una mini-presentación de un minuto sobre "${t}": introducción, dos ideas y conclusión.`,
      `¿Qué argumentos usarías a favor y en contra de las ideas de "${t}"?`,
      `¿Cómo ha cambiado ${t} en los últimos diez años?`,
      `Explica "${t}" a alguien que no sabe nada del tema.`,
    ],
    vocabQ: (w: string, t: string) => `Usa la palabra "${w}" en una frase sobre ${t}.`,
    grammarQ: (g: string, t: string) => `Responde usando ${g}: habla de ${t} durante 20 segundos.`,
    hintListen: "Pulsa Escuchar y luego responde en voz alta.",
  },
  it: {
    a: (t: string) => [
      `Di in una frase di cosa parla questa lezione: "${t}".`,
      `Di tre parole che hai imparato su ${t}.`,
      `Ti piace ${t}? Spiega perché in due frasi.`,
      `Descrivi qualcosa della tua vita legato a ${t}.`,
    ],
    b: (t: string) => [
      `Spiega l'argomento "${t}" con parole tue per 30 secondi.`,
      `Racconta un episodio della tua vita legato a ${t}.`,
      `Qual è la cosa più utile che hai imparato su ${t}? Perché?`,
      `Confronta ${t} nel tuo paese con ${t} in un altro paese.`,
    ],
    c: (t: string) => [
      `Fai una mini-presentazione di un minuto su "${t}".`,
      `Quali argomenti useresti a favore e contro le idee di "${t}"?`,
      `Come è cambiato ${t} negli ultimi dieci anni?`,
      `Spiega "${t}" a chi non ne sa nulla.`,
    ],
    vocabQ: (w: string, t: string) => `Usa la parola "${w}" in una frase su ${t}.`,
    grammarQ: (g: string, t: string) => `Rispondi usando ${g}: parla di ${t} per 20 secondi.`,
    hintListen: "Premi Ascolta, poi rispondi ad alta voce.",
  },
  de: {
    a: (t: string) => [
      `Sag in einem Satz, worum es in dieser Lektion geht: "${t}".`,
      `Nenne drei Wörter, die du über ${t} gelernt hast.`,
      `Magst du ${t}? Erklär warum in zwei Sätzen.`,
      `Beschreibe etwas aus deinem Leben zum Thema ${t}.`,
    ],
    b: (t: string) => [
      `Erklär das Thema "${t}" 30 Sekunden mit eigenen Worten.`,
      `Erzähl eine kurze Geschichte aus deinem Leben über ${t}.`,
      `Was war das Nützlichste über ${t}? Warum?`,
      `Vergleiche ${t} in deinem Land mit ${t} in einem anderen Land.`,
    ],
    c: (t: string) => [
      `Halte eine einminütige Mini-Präsentation über "${t}".`,
      `Welche Argumente sprechen für und gegen die Ideen in "${t}"?`,
      `Wie hat sich ${t} in den letzten zehn Jahren verändert?`,
      `Erklär "${t}" jemandem, der nichts darüber weiß.`,
    ],
    vocabQ: (w: string, t: string) => `Benutze das Wort "${w}" in einem Satz über ${t}.`,
    grammarQ: (g: string, t: string) => `Antworte mit ${g}: sprich 20 Sekunden über ${t}.`,
    hintListen: "Auf Hören tippen, dann laut antworten.",
  },
} as const;

const seedFor = (lesson: LessonData) => {
  const s = `${lesson.levelId}-${lesson.lessonNumber}`;
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h) || 1;
};

export function getSpeakingQuestions(lesson: LessonData): SpeakingQuestion[] {
  const lang = detectLang(lesson.levelId || "");
  const band = detectBand(lesson.levelId || "");
  const pack = T[lang];
  const topic = (lesson.title || "").replace(/^lesson\s*\d+\s*[-–:]\s*/i, "").trim() || "this topic";

  const base = pack[band](topic).map((question) => ({ question, hint: pack.hintListen }));

  const seed = seedFor(lesson);
  const vocab = (lesson.vocabulary ?? []).filter((v) => v.word && v.word.length > 1);
  const vocabPicks: SpeakingQuestion[] = [];
  for (let i = 0; i < Math.min(3, vocab.length); i++) {
    const v = vocab[(seed + i * 5) % vocab.length];
    vocabPicks.push({
      question: pack.vocabQ(v.word, topic),
      hint: v.example || v.meaning,
    });
  }

  const grammarTitle = lesson.grammar?.title?.trim();
  const grammarPicks: SpeakingQuestion[] =
    grammarTitle && grammarTitle.toLowerCase() !== topic.toLowerCase()
      ? [
          {
            question: pack.grammarQ(grammarTitle, topic),
            hint: lesson.grammar?.examples?.[0]?.sentence,
          },
        ]
      : [];

  // Interleave: topic questions first, then vocabulary, then grammar.
  const seen = new Set<string>();
  return [...base, ...vocabPicks, ...grammarPicks].filter((q) => {
    const k = q.question.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}
