import type { LessonData } from "./lessons";

const L = (
  lessonNumber: number,
  title: string,
  description: string,
  vocabulary: LessonData["vocabulary"],
  dialogue: LessonData["dialogue"],
  grammar: LessonData["grammar"],
  vocabExercises: LessonData["vocabExercises"],
  conversationExercises: LessonData["conversationExercises"],
  grammarExercises: LessonData["grammarExercises"],
  examQuestions: LessonData["examQuestions"],
  homeworkQuestions: LessonData["homeworkQuestions"],
): LessonData => ({
  levelId: "de-c1",
  levelLabel: "Deutsch C1 — Goethe-Zertifikat",
  lessonNumber,
  title,
  description,
  vocabulary,
  dialogue,
  grammar,
  vocabExercises,
  conversationExercises,
  grammarExercises,
  examQuestions,
  homeworkQuestions,
});

const v = (word: string, meaning: string, example: string, emoji: string) => ({ word, meaning, example, emoji, arabic: "" });

export const deC1Lessons: Record<string, LessonData> = {
  "de-c1-1": L(1, "Akademisches Schreiben", "C1-Niveau: Akademisches Schreiben \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Akademisches Schreiben erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Akademisches Schreiben",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Akademisches Schreiben auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Akademisches Schreiben.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Akademisches Schreiben.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Akademisches Schreiben.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Akademisches Schreiben.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Akademisches Schreiben.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  ),
  "de-c1-2": L(2, "Textanalyse literarischer Werke", "C1-Niveau: Textanalyse literarischer Werke \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Textanalyse literarischer Werke erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Textanalyse literarischer Werke",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Textanalyse literarischer Werke auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Textanalyse literarischer Werke.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Textanalyse literarischer Werke.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Textanalyse literarischer Werke.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Textanalyse literarischer Werke.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Textanalyse literarischer Werke.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  ),
  "de-c1-3": L(3, "Rhetorische Mittel", "C1-Niveau: Rhetorische Mittel \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Rhetorische Mittel erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Rhetorische Mittel",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Rhetorische Mittel auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Rhetorische Mittel.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Rhetorische Mittel.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Rhetorische Mittel.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Rhetorische Mittel.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Rhetorische Mittel.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  ),
  "de-c1-4": L(4, "Idiomatische Redewendungen", "C1-Niveau: Idiomatische Redewendungen \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Idiomatische Redewendungen erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Idiomatische Redewendungen",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Idiomatische Redewendungen auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Idiomatische Redewendungen.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Idiomatische Redewendungen.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Idiomatische Redewendungen.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Idiomatische Redewendungen.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Idiomatische Redewendungen.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  ),
  "de-c1-5": L(5, "Wirtschaftsdeutsch \u2014 Verhandlungen", "C1-Niveau: Wirtschaftsdeutsch \u2014 Verhandlungen \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Wirtschaftsdeutsch \u2014 Verhandlungen erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Wirtschaftsdeutsch \u2014 Verhandlungen",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Wirtschaftsdeutsch \u2014 Verhandlungen auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Wirtschaftsdeutsch \u2014 Verhandlungen.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Wirtschaftsdeutsch \u2014 Verhandlungen.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Wirtschaftsdeutsch \u2014 Verhandlungen.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Wirtschaftsdeutsch \u2014 Verhandlungen.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Wirtschaftsdeutsch \u2014 Verhandlungen.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  ),
  "de-c1-6": L(6, "Wissenschaftliche Vortr\u00e4ge", "C1-Niveau: Wissenschaftliche Vortr\u00e4ge \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Wissenschaftliche Vortr\u00e4ge erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Wissenschaftliche Vortr\u00e4ge",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Wissenschaftliche Vortr\u00e4ge auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Wissenschaftliche Vortr\u00e4ge.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Wissenschaftliche Vortr\u00e4ge.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Wissenschaftliche Vortr\u00e4ge.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Wissenschaftliche Vortr\u00e4ge.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Wissenschaftliche Vortr\u00e4ge.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  ),
  "de-c1-7": L(7, "Journalistische Stilmittel", "C1-Niveau: Journalistische Stilmittel \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Journalistische Stilmittel erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Journalistische Stilmittel",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Journalistische Stilmittel auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Journalistische Stilmittel.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Journalistische Stilmittel.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Journalistische Stilmittel.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Journalistische Stilmittel.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Journalistische Stilmittel.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  ),
  "de-c1-8": L(8, "Argumentative Essays", "C1-Niveau: Argumentative Essays \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Argumentative Essays erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Argumentative Essays",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Argumentative Essays auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Argumentative Essays.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Argumentative Essays.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Argumentative Essays.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Argumentative Essays.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Argumentative Essays.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  ),
  "de-c1-9": L(9, "Kulturkritik", "C1-Niveau: Kulturkritik \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Kulturkritik erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Kulturkritik",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Kulturkritik auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Kulturkritik.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Kulturkritik.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Kulturkritik.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Kulturkritik.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Kulturkritik.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  ),
  "de-c1-10": L(10, "Philosophische Diskurse", "C1-Niveau: Philosophische Diskurse \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Philosophische Diskurse erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Philosophische Diskurse",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Philosophische Diskurse auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Philosophische Diskurse.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Philosophische Diskurse.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Philosophische Diskurse.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Philosophische Diskurse.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Philosophische Diskurse.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  ),
  "de-c1-11": L(11, "Politische Reden analysieren", "C1-Niveau: Politische Reden analysieren \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Politische Reden analysieren erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Politische Reden analysieren",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Politische Reden analysieren auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Politische Reden analysieren.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Politische Reden analysieren.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Politische Reden analysieren.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Politische Reden analysieren.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Politische Reden analysieren.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  ),
  "de-c1-12": L(12, "Historische Perspektiven", "C1-Niveau: Historische Perspektiven \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Historische Perspektiven erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Historische Perspektiven",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Historische Perspektiven auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Historische Perspektiven.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Historische Perspektiven.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Historische Perspektiven.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Historische Perspektiven.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Historische Perspektiven.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  ),
  "de-c1-13": L(13, "Sprachwandel und Sprachpflege", "C1-Niveau: Sprachwandel und Sprachpflege \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Sprachwandel und Sprachpflege erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Sprachwandel und Sprachpflege",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Sprachwandel und Sprachpflege auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Sprachwandel und Sprachpflege.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Sprachwandel und Sprachpflege.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Sprachwandel und Sprachpflege.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Sprachwandel und Sprachpflege.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Sprachwandel und Sprachpflege.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  ),
  "de-c1-14": L(14, "Deutsche Nachkriegsliteratur", "C1-Niveau: Deutsche Nachkriegsliteratur \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Deutsche Nachkriegsliteratur erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Deutsche Nachkriegsliteratur",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Deutsche Nachkriegsliteratur auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Deutsche Nachkriegsliteratur.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Deutsche Nachkriegsliteratur.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Deutsche Nachkriegsliteratur.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Deutsche Nachkriegsliteratur.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Deutsche Nachkriegsliteratur.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  ),
  "de-c1-15": L(15, "Feuilleton und Meinungsartikel", "C1-Niveau: Feuilleton und Meinungsartikel \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Feuilleton und Meinungsartikel erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Feuilleton und Meinungsartikel",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Feuilleton und Meinungsartikel auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Feuilleton und Meinungsartikel.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Feuilleton und Meinungsartikel.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Feuilleton und Meinungsartikel.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Feuilleton und Meinungsartikel.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Feuilleton und Meinungsartikel.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  ),
  "de-c1-16": L(16, "Fachsprache Medizin", "C1-Niveau: Fachsprache Medizin \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Fachsprache Medizin erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Fachsprache Medizin",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Fachsprache Medizin auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Fachsprache Medizin.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Fachsprache Medizin.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Fachsprache Medizin.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Fachsprache Medizin.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Fachsprache Medizin.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  ),
  "de-c1-17": L(17, "Fachsprache Recht", "C1-Niveau: Fachsprache Recht \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Fachsprache Recht erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Fachsprache Recht",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Fachsprache Recht auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Fachsprache Recht.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Fachsprache Recht.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Fachsprache Recht.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Fachsprache Recht.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Fachsprache Recht.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  ),
  "de-c1-18": L(18, "Interkulturelle Kommunikation", "C1-Niveau: Interkulturelle Kommunikation \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Interkulturelle Kommunikation erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Interkulturelle Kommunikation",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Interkulturelle Kommunikation auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Interkulturelle Kommunikation.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Interkulturelle Kommunikation.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Interkulturelle Kommunikation.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Interkulturelle Kommunikation.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Interkulturelle Kommunikation.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  ),
  "de-c1-19": L(19, "Kreatives Schreiben \u2014 Kurzgeschichten", "C1-Niveau: Kreatives Schreiben \u2014 Kurzgeschichten \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Kreatives Schreiben \u2014 Kurzgeschichten erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Kreatives Schreiben \u2014 Kurzgeschichten",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Kreatives Schreiben \u2014 Kurzgeschichten auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Kreatives Schreiben \u2014 Kurzgeschichten.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Kreatives Schreiben \u2014 Kurzgeschichten.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Kreatives Schreiben \u2014 Kurzgeschichten.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Kreatives Schreiben \u2014 Kurzgeschichten.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Kreatives Schreiben \u2014 Kurzgeschichten.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  ),
  "de-c1-20": L(20, "Pr\u00fcfungstraining Goethe C1", "C1-Niveau: Pr\u00fcfungstraining Goethe C1 \u2014 fortgeschrittene Analyse, Stilmittel und akademischer Wortschatz.",
    [
      v('gleichwohl', 'nevertheless / yet', 'Gleichwohl blieb er bei seiner Meinung.', '⚖️'),
      v('mithin', 'therefore / thus', 'Er hat den Termin verpasst, mithin ist der Vertrag hinfällig.', '➡️'),
      v('nichtsdestotrotz', 'nonetheless', 'Nichtsdestotrotz setzte sie ihre Arbeit fort.', '🔁'),
      v('dergestalt', 'in such a way', 'Er handelte dergestalt, dass niemand Einwände erhob.', '🧩'),
      v('mutmaßlich', 'presumably / alleged', 'Der mutmaßliche Täter wurde festgenommen.', '🕵️'),
      v('unabdingbar', 'indispensable', 'Diskretion ist in diesem Beruf unabdingbar.', '🔒'),
      v('differenziert', 'differentiated / nuanced', 'Er betrachtet das Thema sehr differenziert.', '🔍'),
      v('kontrovers', 'controversial', 'Das Thema wird kontrovers diskutiert.', '💬'),
      v('prägnant', 'succinct / precise', 'Sie fasste das Problem prägnant zusammen.', '✏️'),
      v('erörtern', 'to discuss thoroughly', 'Wir sollten die Vor- und Nachteile erörtern.', '🗣️'),
      v('veranschaulichen', 'to illustrate', 'Ein Beispiel kann die These veranschaulichen.', '💡'),
      v('resümieren', 'to summarize', 'Lassen Sie mich die Ergebnisse resümieren.', '📋'),
      v('plausibel', 'plausible', 'Seine Erklärung klingt durchaus plausibel.', '🤔'),
      v('fundiert', 'well-founded', 'Sie legte eine fundierte Analyse vor.', '📚'),
      v('nuanciert', 'nuanced', 'Er drückt sich stets sehr nuanciert aus.', '🎭'),
    ],
    [
      { speaker: "Dr. Weber", text: "Das Thema Pr\u00fcfungstraining Goethe C1 erfordert eine differenzierte Herangehensweise." },
      { speaker: "Frau Klein", text: "Dem stimme ich zu, zumal die Nuancen oft \u00fcbersehen werden." },
      { speaker: "Dr. Weber", text: "Welche Quellen w\u00fcrden Sie zur Vertiefung empfehlen?" },
      { speaker: "Frau Klein", text: "Fachzeitschriften und seri\u00f6se Feuilletons bieten sich an." },
      { speaker: "Dr. Weber", text: "Und wie steht es um die m\u00fcndliche Auseinandersetzung damit?" },
      { speaker: "Frau Klein", text: "Es ist unabdingbar, Argumentationsstrukturen zu \u00fcben." },
      { speaker: "Dr. Weber", text: "Verstehe, Fl\u00fcssigkeit allein gen\u00fcgt auf diesem Niveau nicht." },
      { speaker: "Frau Klein", text: "Genau, die stilistische Pr\u00e4zision ist entscheidend." },
      { speaker: "Dr. Weber", text: "Vielen Dank f\u00fcr die aufschlussreichen Hinweise." },
      { speaker: "Frau Klein", text: "Gern geschehen, viel Erfolg bei der Vorbereitung." },
    ],
    {
      title: "Fortgeschrittene Strukturen: Pr\u00fcfungstraining Goethe C1",
      explanation: "Ausf\u00fchrliche Erkl\u00e4rung zu Pr\u00fcfungstraining Goethe C1 auf C1-Niveau, mit Fokus auf erweiterte Partizipialkonstruktionen, Konjunktiv II und komplexe Nebens\u00e4tze.",
      examples: [
        { sentence: "Beispiel 1 zu Pr\u00fcfungstraining Goethe C1.", note: "Stilistische Anmerkung." },
        { sentence: "Beispiel 2 zu Pr\u00fcfungstraining Goethe C1.", note: "Register-Hinweis." },
        { sentence: "Beispiel 3 zu Pr\u00fcfungstraining Goethe C1.", note: "Nuancen-Hinweis." },
        { sentence: "Beispiel 4 zu Pr\u00fcfungstraining Goethe C1.", note: "Kultureller Hinweis." },
        { sentence: "Beispiel 5 zu Pr\u00fcfungstraining Goethe C1.", note: "Ausnahme-Hinweis." },
      ],
    },
    [
      { question: "Was bedeutet 'gleichwohl'?", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "Synonym f\u00fcr 'mithin':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Verwendung von 'nichtsdestotrotz':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 2 },
      { question: "Definiere 'dergestalt':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 0 },
      { question: "\u00dcbersetze 'mutma\u00dflich':", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correct: 1 },
      { question: "Was bedeutet 'unabdingbar'?", options: ["Verzichtbar", "Unerl\u00e4sslich", "Unwichtig", "Zweitrangig"], correct: 1 },
      { question: "Der Begriff 'differenziert' bedeutet:", options: ["Vereinfacht", "Nuanciert", "Grob", "Unklar"], correct: 1 }
    ],
    [
      { question: "Wor\u00fcber sind sich Dr. Weber und Frau Klein einig?", options: ["\u00dcber das Wetter", "\u00dcber die differenzierte Herangehensweise", "\u00dcber den Urlaub", "\u00dcber das Essen"], correct: 1 },
      { question: "Was empfiehlt Frau Klein zu lesen?", options: ["Comics", "Fachzeitschriften und Feuilletons", "Nichts", "Kochb\u00fccher"], correct: 1 },
      { question: "Was ist laut Frau Klein unabdingbar?", options: ["Schweigen", "Argumentationsstrukturen \u00fcben", "Singen", "Reisen"], correct: 1 },
      { question: "Was ist auf C1-Niveau entscheidend?", options: ["Die Geschwindigkeit", "Die stilistische Pr\u00e4zision", "Die Kleidung", "Das Geld"], correct: 1 }
    ],
    [
      { question: "Grammatik\u00fcbung 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Grammatik\u00fcbung 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Grammatik\u00fcbung 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Grammatik\u00fcbung 4", options: ["A", "B", "C", "D"], correct: 3 },
      { question: "Grammatik\u00fcbung 5", options: ["A", "B", "C", "D"], correct: 0 }
    ],
    [
      { question: "Pr\u00fcfungsfrage 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Pr\u00fcfungsfrage 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Pr\u00fcfungsfrage 3", options: ["A", "B", "C", "D"], correct: 2 },
      { question: "Pr\u00fcfungsfrage 4", options: ["A", "B", "C", "D"], correct: 3 }
    ],
    [
      { question: "Hausaufgabe 1", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "Hausaufgabe 2", options: ["A", "B", "C", "D"], correct: 1 },
      { question: "Hausaufgabe 3", options: ["A", "B", "C", "D"], correct: 2 }
    ]
  )
};
