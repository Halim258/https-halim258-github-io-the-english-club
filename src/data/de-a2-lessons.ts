import type { LessonData } from "./lessons";

const L = (
  lessonNumber: number,
  title: string,
  description: string,
  vocabulary: LessonData["vocabulary"],
  dialogue: LessonData["dialogue"],
  grammarTitle: string,
  grammarExplanation: string,
  grammarExamples: { sentence: string; note: string }[],
  vocabExercises: LessonData["vocabExercises"],
  conversationExercises: LessonData["conversationExercises"],
  grammarExercises: LessonData["grammarExercises"],
  examQuestions: LessonData["examQuestions"],
  homeworkQuestions: LessonData["homeworkQuestions"],
  youtubeId: string,
  videoTitle: string,
  videoContext: string,
): LessonData => ({
  levelId: "de-a2",
  levelLabel: "Deutsch A2 — Goethe-Zertifikat",
  lessonNumber, title, description, vocabulary, dialogue,
  grammar: { title: grammarTitle, explanation: grammarExplanation, examples: grammarExamples },
  vocabExercises, conversationExercises, grammarExercises, examQuestions, homeworkQuestions,
  youtubeId, videoTitle, videoContext,
});

const v = (word: string, meaning: string, example: string, emoji: string) =>
  ({ word, meaning, example, emoji, arabic: "" });

export const deA2Lessons: Record<string, LessonData> = {
  "de-a2-1": L(1, 'Perfekt — über Vergangenes sprechen', "Learn to talk about the past using the Perfekt tense (haben/sein + participle).", [
    v('gestern', 'yesterday', 'Gestern habe ich einen Film gesehen.', '📅'),
    v('letzte Woche', 'last week', 'Letzte Woche bin ich nach Berlin gefahren.', '🗓️'),
    v('schon', 'already', 'Ich habe die Hausaufgaben schon gemacht.', '✅'),
    v('noch nicht', 'not yet', 'Ich habe das Buch noch nicht gelesen.', '⏳'),
    v('gemacht', 'done/made', 'Ich habe das Essen gemacht.', '🍳'),
    v('gesehen', 'seen', 'Ich habe den Film gesehen.', '👁️'),
    v('gegangen', 'gone', 'Ich bin ins Kino gegangen.', '🚶'),
    v('gefahren', 'driven/gone', 'Wir sind mit dem Auto gefahren.', '🚗'),
    v('gesprochen', 'spoken', 'Wir haben lange gesprochen.', '🗣️'),
    v('geschrieben', 'written', 'Sie hat einen Brief geschrieben.', '✉️'),
    v('gegessen', 'eaten', 'Wir haben zusammen gegessen.', '🍽️'),
    v('das Partizip', 'the participle', 'Das Partizip von \'gehen\' ist \'gegangen\'.', '📝'),
    v('das Hilfsverb', 'the auxiliary verb', '\'Haben\' ist ein Hilfsverb im Perfekt.', '🔧'),
    v('aufgestanden', 'got up', 'Ich bin früh aufgestanden.', '⏰'),
    v('angekommen', 'arrived', 'Der Zug ist pünktlich angekommen.', '🚉')
  ], [
    { speaker: 'Anna', text: 'Gestern habe ich einen tollen Film gesehen.' },
    { speaker: 'Ben', text: 'Wirklich? Was hast du gemacht?' },
    { speaker: 'Anna', text: 'Ich bin ins Kino gegangen und habe Popcorn gegessen.' },
    { speaker: 'Ben', text: 'Bist du allein gegangen?' },
    { speaker: 'Anna', text: 'Nein, ich bin mit meiner Schwester gefahren.' },
    { speaker: 'Ben', text: 'Habt ihr danach noch etwas unternommen?' },
    { speaker: 'Anna', text: 'Ja, wir haben in einem Café gesessen und gesprochen.' },
    { speaker: 'Ben', text: 'Das klingt nach einem schönen Tag!' },
    { speaker: 'Anna', text: 'Ja, ich bin sehr spät nach Hause gekommen.' },
    { speaker: 'Ben', text: 'Ich bin gestern nur zu Hause geblieben und habe gelesen.' }
  ], 'Perfekt mit haben und sein', "Das Perfekt wird benutzt, um über abgeschlossene Handlungen in der Vergangenheit zu sprechen, besonders im gesprochenen Deutsch. Es wird mit dem Präsens von \'haben\' oder \'sein\' und dem Partizip II gebildet. Verben der Bewegung und Zustandsänderung benutzen \'sein\'.", [
    { sentence: 'Ich habe gestern gearbeitet.', note: 'Haben + Partizip II bei den meisten Verben.' },
    { sentence: 'Sie ist nach Hause gegangen.', note: 'Sein + Partizip II bei Bewegungsverben.' },
    { sentence: 'Wir haben ein Buch gelesen.', note: 'Regelmäßiges Partizip: ge + Stamm + t.' },
    { sentence: 'Er ist um acht Uhr aufgestanden.', note: 'Sein bei Zustandsänderung.' },
    { sentence: 'Habt ihr das Essen gemacht?', note: 'Frage im Perfekt.' }
  ], [
    { question: "Was bedeutet \"gestern\"?", options: ["yesterday", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"letzte Woche\"?", options: ["last week", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"schon\"?", options: ["already", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"noch nicht\"?", options: ["not yet", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"gemacht\"?", options: ["done/made", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"gesehen\"?", options: ["seen", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Perfekt — über Vergangenes sprechen:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Perfekt — über Vergangenes sprechen:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Perfekt — über Vergangenes sprechen:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Perfekt — über Vergangenes sprechen:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Perfekt — über Vergangenes sprechen:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Perfekt — über Vergangenes sprechen:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Perfekt — über Vergangenes sprechen:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Perfekt — über Vergangenes sprechen:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Perfekt — über Vergangenes sprechen:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "jT2boGKgIDI", "Perfekt — über Vergangenes sprechen — Deutsch lernen A2", "A short German video illustrating perfekt — über vergangenes sprechen for A2 learners."),
  "de-a2-2": L(2, 'Reisen und Erlebnisse', "Talk about trips and travel experiences using past tense vocabulary and phrases.", [
    v('die Reise', 'the trip', 'Die Reise nach Italien war wunderbar.', '✈️'),
    v('der Urlaub', 'the vacation', 'Wir haben unseren Urlaub am Meer verbracht.', '🏖️'),
    v('das Hotel', 'the hotel', 'Das Hotel war sehr sauber und modern.', '🏨'),
    v('der Koffer', 'the suitcase', 'Ich habe meinen Koffer gepackt.', '🧳'),
    v('die Sehenswürdigkeit', 'the sight/attraction', 'Wir haben viele Sehenswürdigkeiten besucht.', '🗼'),
    v('das Flugzeug', 'the airplane', 'Wir sind mit dem Flugzeug geflogen.', '🛫'),
    v('die Kamera', 'the camera', 'Ich habe viele Fotos mit meiner Kamera gemacht.', '📷'),
    v('übernachten', 'to stay overnight', 'Wir haben in einer Jugendherberge übernachtet.', '🛏️'),
    v('buchen', 'to book', 'Wir haben das Zimmer online gebucht.', '💻'),
    v('der Strand', 'the beach', 'Am Strand haben wir viel Sonne genossen.', '🏝️'),
    v('das Museum', 'the museum', 'Wir haben ein interessantes Museum besichtigt.', '🏛️'),
    v('die Erfahrung', 'the experience', 'Das war eine unvergessliche Erfahrung.', '⭐'),
    v('die Kultur', 'the culture', 'Ich interessiere mich für fremde Kulturen.', '🌍'),
    v('verpassen', 'to miss', 'Wir haben fast den Zug verpasst.', '🚆'),
    v('das Andenken', 'the souvenir', 'Ich habe ein Andenken gekauft.', '🎁')
  ], [
    { speaker: 'Lukas', text: 'Wo warst du im letzten Sommer?' },
    { speaker: 'Mia', text: 'Ich bin nach Spanien gereist. Es war fantastisch!' },
    { speaker: 'Lukas', text: 'Was hast du dort gemacht?' },
    { speaker: 'Mia', text: 'Ich habe viele Sehenswürdigkeiten besichtigt und bin an den Strand gegangen.' },
    { speaker: 'Lukas', text: 'Wie bist du gereist, mit dem Flugzeug?' },
    { speaker: 'Mia', text: 'Ja, wir haben die Flüge drei Monate vorher gebucht.' },
    { speaker: 'Lukas', text: 'Habt ihr in einem Hotel übernachtet?' },
    { speaker: 'Mia', text: 'Nein, wir haben eine Wohnung gemietet.' },
    { speaker: 'Lukas', text: 'Hast du typisches Essen probiert?' },
    { speaker: 'Mia', text: 'Natürlich! Die spanische Küche war köstlich.' },
    { speaker: 'Lukas', text: 'Das klingt nach einer tollen Reise!' },
    { speaker: 'Mia', text: 'Ja, es war eine unvergessliche Erfahrung.' }
  ], 'Perfekt mit Reisevokabular', "Beim Erzählen von Reisen benutzt man häufig das Perfekt. Verben wie \'reisen\', \'fliegen\' und \'fahren\' bilden das Perfekt mit \'sein\'. Man kombiniert oft Zeitangaben wie \'letztes Jahr\' oder \'im Sommer\' mit dem Perfekt.", [
    { sentence: 'Wir sind letztes Jahr nach Frankreich gereist.', note: 'Sein + Partizip bei Bewegungsverben.' },
    { sentence: 'Ich habe ein Zimmer im Hotel gebucht.', note: 'Haben bei transitiven Verben.' },
    { sentence: 'Sie ist mit dem Zug gefahren.', note: 'Bewegung: sein.' },
    { sentence: 'Wir haben viele Fotos gemacht.', note: 'Haben + Partizip.' },
    { sentence: 'Habt ihr den Urlaub genossen?', note: 'Frage im Perfekt.' }
  ], [
    { question: "Was bedeutet \"die Reise\"?", options: ["the trip", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"der Urlaub\"?", options: ["the vacation", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"das Hotel\"?", options: ["the hotel", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"der Koffer\"?", options: ["the suitcase", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Sehenswürdigkeit\"?", options: ["the sight/attraction", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"das Flugzeug\"?", options: ["the airplane", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Reisen und Erlebnisse:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Reisen und Erlebnisse:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Reisen und Erlebnisse:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Reisen und Erlebnisse:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Reisen und Erlebnisse:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Reisen und Erlebnisse:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Reisen und Erlebnisse:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Reisen und Erlebnisse:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Reisen und Erlebnisse:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "hqDWaG0mYtM", "Reisen und Erlebnisse — Deutsch lernen A2", "A short German video illustrating reisen und erlebnisse for A2 learners."),
  "de-a2-3": L(3, 'Bei der Arbeit — Berufe und Alltag', "Discuss professions, workplaces and daily work routines.", [
    v('der Beruf', 'the profession', 'Was ist dein Beruf?', '💼'),
    v('die Firma', 'the company', 'Ich arbeite bei einer großen Firma.', '🏢'),
    v('der Kollege', 'the colleague (m)', 'Mein Kollege hilft mir oft.', '🤝'),
    v('die Kollegin', 'the colleague (f)', 'Meine Kollegin ist sehr freundlich.', '🤝'),
    v('der Chef', 'the boss (m)', 'Der Chef hat eine wichtige Besprechung.', '👔'),
    v('das Gehalt', 'the salary', 'Das Gehalt ist am Monatsende.', '💰'),
    v('die Besprechung', 'the meeting', 'Wir haben heute eine Besprechung.', '📋'),
    v('der Termin', 'the appointment', 'Ich habe morgen einen Termin.', '📆'),
    v('verdienen', 'to earn', 'Sie verdient gut in ihrem Beruf.', '💵'),
    v('kündigen', 'to quit/resign', 'Er hat seine Stelle gekündigt.', '📄'),
    v('die Bewerbung', 'the application', 'Ich habe eine Bewerbung geschrieben.', '📝'),
    v('das Büro', 'the office', 'Ich arbeite in einem modernen Büro.', '🏬'),
    v('die Pause', 'the break', 'Wir machen eine Pause um zwölf Uhr.', '☕'),
    v('der Feierabend', 'end of the workday', 'Endlich ist Feierabend!', '🌆'),
    v('die Erfahrung', 'the experience', 'Ich habe viel Erfahrung in diesem Beruf.', '📈')
  ], [
    { speaker: 'Sara', text: 'Was machst du beruflich?' },
    { speaker: 'Tom', text: 'Ich bin Ingenieur und arbeite bei einer großen Firma.' },
    { speaker: 'Sara', text: 'Gefällt dir deine Arbeit?' },
    { speaker: 'Tom', text: 'Ja, sehr. Meine Kollegen sind nett und der Chef ist fair.' },
    { speaker: 'Sara', text: 'Wie viele Stunden arbeitest du pro Tag?' },
    { speaker: 'Tom', text: 'Ich arbeite acht Stunden, von neun bis fünf.' },
    { speaker: 'Sara', text: 'Hast du oft Besprechungen?' },
    { speaker: 'Tom', text: 'Ja, wir haben jeden Montag eine Besprechung.' },
    { speaker: 'Sara', text: 'Wann hast du Feierabend?' },
    { speaker: 'Tom', text: 'Normalerweise um fünf Uhr, aber manchmal später.' }
  ], 'Trennbare Verben im Alltag', "Viele Verben im Arbeitsalltag sind trennbar, wie \'anfangen\', \'aufhören\' oder \'anrufen\'. Im Präsens trennt sich das Präfix und steht am Satzende. Im Perfekt steht \'ge\' zwischen Präfix und Stamm.", [
    { sentence: 'Ich fange um neun Uhr an.', note: 'Trennbares Verb im Präsens.' },
    { sentence: 'Er hat gestern angerufen.', note: 'Perfekt: ge zwischen Präfix und Stamm.' },
    { sentence: 'Wir hören um fünf Uhr auf.', note: 'Trennbares Verb: aufhören.' },
    { sentence: 'Sie hat die Bewerbung abgeschickt.', note: 'Trennbares Verb: abschicken.' },
    { sentence: 'Machst du morgen mit?', note: 'Trennbares Verb: mitmachen.' }
  ], [
    { question: "Was bedeutet \"der Beruf\"?", options: ["the profession", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Firma\"?", options: ["the company", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"der Kollege\"?", options: ["the colleague (m)", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Kollegin\"?", options: ["the colleague (f)", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"der Chef\"?", options: ["the boss (m)", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"das Gehalt\"?", options: ["the salary", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Bei der Arbeit — Berufe und Alltag:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Bei der Arbeit — Berufe und Alltag:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Bei der Arbeit — Berufe und Alltag:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Bei der Arbeit — Berufe und Alltag:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Bei der Arbeit — Berufe und Alltag:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Bei der Arbeit — Berufe und Alltag:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Bei der Arbeit — Berufe und Alltag:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Bei der Arbeit — Berufe und Alltag:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Bei der Arbeit — Berufe und Alltag:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "XPlxND0POlY", "Bei der Arbeit — Berufe und Alltag — Deutsch lernen A2", "A short German video illustrating bei der arbeit — berufe und alltag for A2 learners."),
  "de-a2-4": L(4, 'Gesundheit und Krankheiten', "Learn vocabulary for health, illnesses and visiting the doctor.", [
    v('krank', 'sick', 'Ich bin heute krank.', '🤒'),
    v('der Arzt', 'the doctor (m)', 'Ich muss zum Arzt gehen.', '👨‍⚕️'),
    v('die Ärztin', 'the doctor (f)', 'Die Ärztin hat mir Medizin gegeben.', '👩‍⚕️'),
    v('die Erkältung', 'the cold', 'Ich habe eine schlimme Erkältung.', '🤧'),
    v('das Fieber', 'the fever', 'Ich habe hohes Fieber.', '🌡️'),
    v('der Husten', 'the cough', 'Der Husten dauert schon eine Woche.', '😷'),
    v('die Kopfschmerzen', 'headache', 'Ich habe starke Kopfschmerzen.', '🤕'),
    v('die Apotheke', 'the pharmacy', 'Ich kaufe Medizin in der Apotheke.', '💊'),
    v('das Medikament', 'the medication', 'Nimm dieses Medikament zweimal täglich.', '💊'),
    v('sich erholen', 'to recover', 'Er muss sich noch erholen.', '🛌'),
    v('der Termin', 'the appointment', 'Ich habe einen Termin beim Arzt.', '📅'),
    v('die Schmerzen', 'the pain', 'Die Schmerzen sind unerträglich.', '😖'),
    v('gesund', 'healthy', 'Iss gesund und du bleibst fit.', '🥗'),
    v('die Untersuchung', 'the examination', 'Die Untersuchung war schnell.', '🩺'),
    v('das Rezept', 'the prescription', 'Der Arzt hat mir ein Rezept gegeben.', '📋')
  ], [
    { speaker: 'Nina', text: 'Du siehst müde aus. Was ist los?' },
    { speaker: 'Paul', text: 'Ich bin krank. Ich habe Fieber und Husten.' },
    { speaker: 'Nina', text: 'Warst du schon beim Arzt?' },
    { speaker: 'Paul', text: 'Ja, ich hatte heute Morgen einen Termin.' },
    { speaker: 'Nina', text: 'Was hat der Arzt gesagt?' },
    { speaker: 'Paul', text: 'Er hat gesagt, dass ich eine Erkältung habe.' },
    { speaker: 'Nina', text: 'Hat er dir ein Rezept gegeben?' },
    { speaker: 'Paul', text: 'Ja, ich muss zur Apotheke gehen und Medikamente holen.' },
    { speaker: 'Nina', text: 'Gute Besserung! Du solltest dich ausruhen.' },
    { speaker: 'Paul', text: 'Danke, ich hoffe, ich erhole mich bald.' }
  ], 'Modalverben: müssen und sollen', "Bei Krankheiten benutzt man oft die Modalverben \'müssen\' (Notwendigkeit) und \'sollen\' (Empfehlung). Das konjugierte Modalverb steht an zweiter Position, das Vollverb im Infinitiv am Satzende.", [
    { sentence: 'Ich muss zum Arzt gehen.', note: 'Müssen = Notwendigkeit.' },
    { sentence: 'Du solltest mehr Wasser trinken.', note: 'Sollen/sollte = Empfehlung.' },
    { sentence: 'Er muss das Medikament nehmen.', note: 'Modalverb + Infinitiv am Ende.' },
    { sentence: 'Wir sollten uns ausruhen.', note: 'Konjunktiv II von sollen.' },
    { sentence: 'Musst du heute arbeiten?', note: 'Frage mit Modalverb.' }
  ], [
    { question: "Was bedeutet \"krank\"?", options: ["sick", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"der Arzt\"?", options: ["the doctor (m)", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Ärztin\"?", options: ["the doctor (f)", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Erkältung\"?", options: ["the cold", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"das Fieber\"?", options: ["the fever", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"der Husten\"?", options: ["the cough", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Gesundheit und Krankheiten:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Gesundheit und Krankheiten:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Gesundheit und Krankheiten:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Gesundheit und Krankheiten:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Gesundheit und Krankheiten:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Gesundheit und Krankheiten:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Gesundheit und Krankheiten:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Gesundheit und Krankheiten:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Gesundheit und Krankheiten:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "LcQZG_hHKZM", "Gesundheit und Krankheiten — Deutsch lernen A2", "A short German video illustrating gesundheit und krankheiten for A2 learners."),
  "de-a2-5": L(5, 'Das Wetter und die Jahreszeiten', "Describe weather conditions and the four seasons.", [
    v('das Wetter', 'the weather', 'Wie ist das Wetter heute?', '🌤️'),
    v('der Frühling', 'spring', 'Im Frühling blühen die Blumen.', '🌸'),
    v('der Sommer', 'summer', 'Im Sommer ist es sehr heiß.', '☀️'),
    v('der Herbst', 'autumn', 'Im Herbst fallen die Blätter.', '🍂'),
    v('der Winter', 'winter', 'Im Winter schneit es oft.', '❄️'),
    v('es regnet', 'it rains', 'Draußen regnet es stark.', '🌧️'),
    v('es schneit', 'it snows', 'Es schneit die ganze Nacht.', '🌨️'),
    v('sonnig', 'sunny', 'Heute ist es sonnig und warm.', '🌞'),
    v('bewölkt', 'cloudy', 'Der Himmel ist bewölkt.', '☁️'),
    v('windig', 'windy', 'Es ist heute sehr windig.', '🌬️'),
    v('die Temperatur', 'the temperature', 'Die Temperatur beträgt zwanzig Grad.', '🌡️'),
    v('der Regenschirm', 'the umbrella', 'Nimm deinen Regenschirm mit.', '☂️'),
    v('das Gewitter', 'the thunderstorm', 'Es gab gestern ein starkes Gewitter.', '⛈️'),
    v('der Nebel', 'the fog', 'Heute Morgen war dichter Nebel.', '🌫️'),
    v('die Vorhersage', 'the forecast', 'Die Vorhersage sagt Regen voraus.', '📻')
  ], [
    { speaker: 'Lea', text: 'Wie war das Wetter letzte Woche bei euch?' },
    { speaker: 'Max', text: 'Es hat viel geregnet und es war windig.' },
    { speaker: 'Lea', text: 'Bei uns war es sonnig und warm.' },
    { speaker: 'Max', text: 'Welche Jahreszeit magst du am liebsten?' },
    { speaker: 'Lea', text: 'Ich mag den Frühling, weil die Blumen blühen.' },
    { speaker: 'Max', text: 'Ich bevorzuge den Winter, weil ich Schnee liebe.' },
    { speaker: 'Lea', text: 'Hat es bei euch schon geschneit?' },
    { speaker: 'Max', text: 'Ja, letzte Woche hat es zum ersten Mal geschneit.' },
    { speaker: 'Lea', text: 'Die Vorhersage sagt heute ein Gewitter voraus.' },
    { speaker: 'Max', text: 'Dann nehme ich besser meinen Regenschirm mit.' }
  ], 'Weil-Sätze — Nebensätze mit weil', "\'Weil\' leitet einen Nebensatz ein, der einen Grund angibt. Im Nebensatz steht das konjugierte Verb am Ende des Satzes.", [
    { sentence: 'Ich bleibe zu Hause, weil es regnet.', note: 'Verb \'regnet\' am Satzende.' },
    { sentence: 'Sie trägt eine Jacke, weil es kalt ist.', note: 'Nebensatz mit weil.' },
    { sentence: 'Wir gehen nicht raus, weil es stürmt.', note: 'Verb am Ende.' },
    { sentence: 'Er mag den Sommer, weil die Sonne scheint.', note: 'Kausalsatz.' },
    { sentence: 'Warum bist du müde? — Weil ich schlecht geschlafen habe.', note: 'Antwort mit weil.' }
  ], [
    { question: "Was bedeutet \"das Wetter\"?", options: ["the weather", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"der Frühling\"?", options: ["spring", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"der Sommer\"?", options: ["summer", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"der Herbst\"?", options: ["autumn", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"der Winter\"?", options: ["winter", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"es regnet\"?", options: ["it rains", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Das Wetter und die Jahreszeiten:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Das Wetter und die Jahreszeiten:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Das Wetter und die Jahreszeiten:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Das Wetter und die Jahreszeiten:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Das Wetter und die Jahreszeiten:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Das Wetter und die Jahreszeiten:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Das Wetter und die Jahreszeiten:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Das Wetter und die Jahreszeiten:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Das Wetter und die Jahreszeiten:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "xX2cJ4YkQlM", "Das Wetter und die Jahreszeiten — Deutsch lernen A2", "A short German video illustrating das wetter und die jahreszeiten for A2 learners."),
  "de-a2-6": L(6, 'Bildung und Schule', "Talk about school subjects, education and learning experiences.", [
    v('die Schule', 'the school', 'Ich gehe jeden Tag zur Schule.', '🏫'),
    v('der Unterricht', 'the lesson/class', 'Der Unterricht beginnt um acht Uhr.', '📚'),
    v('die Prüfung', 'the exam', 'Ich habe morgen eine Prüfung.', '📝'),
    v('die Note', 'the grade', 'Ich habe eine gute Note bekommen.', '🏆'),
    v('das Fach', 'the subject', 'Mathematik ist mein Lieblingsfach.', '➕'),
    v('der Lehrer', 'the teacher (m)', 'Der Lehrer erklärt die Grammatik.', '👨‍🏫'),
    v('die Lehrerin', 'the teacher (f)', 'Die Lehrerin ist sehr geduldig.', '👩‍🏫'),
    v('die Hausaufgabe', 'the homework', 'Ich mache meine Hausaufgaben.', '📓'),
    v('lernen', 'to learn', 'Ich lerne jeden Abend Deutsch.', '📖'),
    v('bestehen', 'to pass (an exam)', 'Ich habe die Prüfung bestanden.', '✅'),
    v('durchfallen', 'to fail', 'Er ist leider durchgefallen.', '❌'),
    v('das Zeugnis', 'the report card', 'Ich habe ein gutes Zeugnis bekommen.', '📜'),
    v('die Universität', 'the university', 'Sie studiert an der Universität.', '🎓'),
    v('das Studium', 'the studies', 'Mein Studium dauert vier Jahre.', '🏛️'),
    v('die Bibliothek', 'the library', 'Ich lerne oft in der Bibliothek.', '📚')
  ], [
    { speaker: 'Herr Klein', text: 'Wie war deine Prüfung letzte Woche?' },
    { speaker: 'Emma', text: 'Ich habe sie bestanden, aber es war schwer.' },
    { speaker: 'Herr Klein', text: 'Was war dein bestes Fach in der Schule?' },
    { speaker: 'Emma', text: 'Mathematik. Mein Lehrer hat alles gut erklärt.' },
    { speaker: 'Herr Klein', text: 'Machst du viele Hausaufgaben?' },
    { speaker: 'Emma', text: 'Ja, ich lerne jeden Abend zwei Stunden.' },
    { speaker: 'Herr Klein', text: 'Möchtest du studieren?' },
    { speaker: 'Emma', text: 'Ja, ich möchte an der Universität Medizin studieren.' },
    { speaker: 'Herr Klein', text: 'Das ist ein anspruchsvolles Studium!' },
    { speaker: 'Emma', text: 'Ich weiß, aber ich lerne gern in der Bibliothek.' }
  ], 'Dass-Sätze', "\'Dass\' leitet einen Nebensatz ein, der eine Aussage oder Meinung ausdrückt. Das Verb steht am Ende des Nebensatzes.", [
    { sentence: 'Ich glaube, dass Deutsch schwer ist.', note: 'Nebensatz mit dass.' },
    { sentence: 'Sie sagt, dass sie die Prüfung bestanden hat.', note: 'Perfekt im Nebensatz.' },
    { sentence: 'Wir hoffen, dass der Test einfach wird.', note: 'Futur im Nebensatz.' },
    { sentence: 'Er denkt, dass Mathe wichtig ist.', note: 'Meinung mit dass.' },
    { sentence: 'Ich weiß, dass du fleißig lernst.', note: 'Verb am Ende.' }
  ], [
    { question: "Was bedeutet \"die Schule\"?", options: ["the school", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"der Unterricht\"?", options: ["the lesson/class", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Prüfung\"?", options: ["the exam", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Note\"?", options: ["the grade", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"das Fach\"?", options: ["the subject", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"der Lehrer\"?", options: ["the teacher (m)", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Bildung und Schule:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Bildung und Schule:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Bildung und Schule:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Bildung und Schule:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Bildung und Schule:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Bildung und Schule:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Bildung und Schule:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Bildung und Schule:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Bildung und Schule:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "0nWXf1r-K_A", "Bildung und Schule — Deutsch lernen A2", "A short German video illustrating bildung und schule for A2 learners."),
  "de-a2-7": L(7, 'Technik und Medien', "Discuss technology, the internet and media habits.", [
    v('der Computer', 'the computer', 'Ich arbeite viel am Computer.', '💻'),
    v('das Handy', 'the mobile phone', 'Mein Handy ist kaputt gegangen.', '📱'),
    v('das Internet', 'the internet', 'Ich surfe gern im Internet.', '🌐'),
    v('die App', 'the app', 'Ich habe eine neue App heruntergeladen.', '📲'),
    v('die Nachricht', 'the message/news', 'Ich habe eine Nachricht bekommen.', '💬'),
    v('herunterladen', 'to download', 'Ich lade das Programm herunter.', '⬇️'),
    v('hochladen', 'to upload', 'Sie lädt Fotos hoch.', '⬆️'),
    v('das Passwort', 'the password', 'Ich habe mein Passwort vergessen.', '🔑'),
    v('die Webseite', 'the website', 'Diese Webseite ist sehr nützlich.', '🖥️'),
    v('das soziale Netzwerk', 'social network', 'Er ist in vielen sozialen Netzwerken aktiv.', '📶'),
    v('der Bildschirm', 'the screen', 'Der Bildschirm ist zu klein.', '🖥️'),
    v('streamen', 'to stream', 'Wir streamen abends Serien.', '🎬'),
    v('die E-Mail', 'the email', 'Ich schreibe eine E-Mail an meinen Chef.', '✉️'),
    v('aufladen', 'to charge (battery)', 'Ich muss mein Handy aufladen.', '🔋'),
    v('speichern', 'to save (a file)', 'Speicher die Datei bitte.', '💾')
  ], [
    { speaker: 'Jonas', text: 'Wie viel Zeit verbringst du am Handy?' },
    { speaker: 'Clara', text: 'Ehrlich gesagt, zu viel! Vielleicht vier Stunden am Tag.' },
    { speaker: 'Jonas', text: 'Was machst du hauptsächlich?' },
    { speaker: 'Clara', text: 'Ich benutze soziale Netzwerke und schaue Videos.' },
    { speaker: 'Jonas', text: 'Hast du schon mal eine App heruntergeladen, die dir geholfen hat?' },
    { speaker: 'Clara', text: 'Ja, ich benutze eine App, um Deutsch zu lernen.' },
    { speaker: 'Jonas', text: 'Das ist super! Ich streame lieber Filme.' },
    { speaker: 'Clara', text: 'Hast du dein Passwort für die Webseite gespeichert?' },
    { speaker: 'Jonas', text: 'Nein, ich muss es mir jedes Mal merken.' },
    { speaker: 'Clara', text: 'Du solltest es besser speichern!' }
  ], 'Komparativ und Superlativ', "Der Komparativ vergleicht zwei Dinge (meist mit -er + als), der Superlativ zeigt das Höchste (am + -sten). Einige Adjektive sind unregelmäßig, z.B. gut-besser-am besten.", [
    { sentence: 'Mein Handy ist schneller als deins.', note: 'Komparativ mit -er + als.' },
    { sentence: 'Dieses Programm ist am schnellsten.', note: 'Superlativ mit am + -sten.' },
    { sentence: 'Das Internet ist heute wichtiger als früher.', note: 'Vergleich.' },
    { sentence: 'Gut, besser, am besten.', note: 'Unregelmäßiger Komparativ.' },
    { sentence: 'Dieser Bildschirm ist größer als jener.', note: 'Komparativ + als.' }
  ], [
    { question: "Was bedeutet \"der Computer\"?", options: ["the computer", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"das Handy\"?", options: ["the mobile phone", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"das Internet\"?", options: ["the internet", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die App\"?", options: ["the app", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Nachricht\"?", options: ["the message/news", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"herunterladen\"?", options: ["to download", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Technik und Medien:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Technik und Medien:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Technik und Medien:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Technik und Medien:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Technik und Medien:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Technik und Medien:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Technik und Medien:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Technik und Medien:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Technik und Medien:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "VU9YZeXTfmQ", "Technik und Medien — Deutsch lernen A2", "A short German video illustrating technik und medien for A2 learners."),
  "de-a2-8": L(8, 'Ämter und Behörden', "Learn how to deal with offices, official paperwork, and bureaucracy.", [
    v('das Amt', 'the office/authority', 'Ich muss zum Amt gehen.', '🏛️'),
    v('das Formular', 'the form', 'Bitte füllen Sie das Formular aus.', '📄'),
    v('der Ausweis', 'the ID card', 'Ich brauche meinen Ausweis.', '🪪'),
    v('die Anmeldung', 'the registration', 'Die Anmeldung dauert nur wenige Minuten.', '📝'),
    v('die Unterschrift', 'the signature', 'Bitte geben Sie hier Ihre Unterschrift.', '✍️'),
    v('der Termin', 'the appointment', 'Ich habe einen Termin beim Amt.', '📅'),
    v('die Bescheinigung', 'the certificate', 'Ich brauche eine Bescheinigung.', '📃'),
    v('beantragen', 'to apply for', 'Ich möchte einen neuen Pass beantragen.', '📥'),
    v('die Gebühr', 'the fee', 'Die Gebühr beträgt zwanzig Euro.', '💶'),
    v('der Beamte', 'the official (m)', 'Der Beamte war sehr hilfsbereit.', '👨‍💼'),
    v('die Beamtin', 'the official (f)', 'Die Beamtin hat mir alles erklärt.', '👩‍💼'),
    v('die Adresse', 'the address', 'Bitte geben Sie Ihre Adresse an.', '🏠'),
    v('die Frist', 'the deadline', 'Die Frist endet am Freitag.', '⏳'),
    v('das Dokument', 'the document', 'Bringen Sie alle Dokumente mit.', '📁'),
    v('ausfüllen', 'to fill out', 'Ich habe das Formular ausgefüllt.', '✏️')
  ], [
    { speaker: 'Frau Meier', text: 'Guten Tag, ich möchte mich anmelden.' },
    { speaker: 'Beamter', text: 'Guten Tag, haben Sie Ihren Ausweis dabei?' },
    { speaker: 'Frau Meier', text: 'Ja, hier ist er.' },
    { speaker: 'Beamter', text: 'Bitte füllen Sie dieses Formular aus.' },
    { speaker: 'Frau Meier', text: 'Wo muss ich unterschreiben?' },
    { speaker: 'Beamter', text: 'Hier unten, bitte.' },
    { speaker: 'Frau Meier', text: 'Wie hoch ist die Gebühr?' },
    { speaker: 'Beamter', text: 'Das kostet zwanzig Euro.' },
    { speaker: 'Frau Meier', text: 'Wann bekomme ich die Bescheinigung?' },
    { speaker: 'Beamter', text: 'In etwa zwei Wochen bekommen Sie sie per Post.' }
  ], 'Dativpräpositionen', "Bestimmte Präpositionen verlangen immer den Dativ: aus, bei, mit, nach, seit, von, zu. Der Artikel ändert sich entsprechend (dem, der, den).", [
    { sentence: 'Ich gehe zum Amt.', note: 'Zu + dem = zum.' },
    { sentence: 'Sie kommt aus der Schweiz.', note: 'Aus + Dativ.' },
    { sentence: 'Wir sprechen mit dem Beamten.', note: 'Mit + Dativ.' },
    { sentence: 'Er wohnt seit einem Jahr hier.', note: 'Seit + Dativ.' },
    { sentence: 'Ich hole das Dokument von der Behörde.', note: 'Von + Dativ.' }
  ], [
    { question: "Was bedeutet \"das Amt\"?", options: ["the office/authority", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"das Formular\"?", options: ["the form", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"der Ausweis\"?", options: ["the ID card", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Anmeldung\"?", options: ["the registration", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Unterschrift\"?", options: ["the signature", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"der Termin\"?", options: ["the appointment", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Ämter und Behörden:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Ämter und Behörden:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Ämter und Behörden:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Ämter und Behörden:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Ämter und Behörden:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Ämter und Behörden:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Ämter und Behörden:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Ämter und Behörden:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Ämter und Behörden:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "6P4x88Yq9zM", "Ämter und Behörden — Deutsch lernen A2", "A short German video illustrating ämter und behörden for A2 learners."),
  "de-a2-9": L(9, 'Der Alltag zu Hause', "Describe daily household routines and chores.", [
    v('der Haushalt', 'the household', 'Ich helfe zu Hause im Haushalt.', '🏠'),
    v('putzen', 'to clean', 'Ich putze jeden Samstag die Wohnung.', '🧹'),
    v('kochen', 'to cook', 'Meine Mutter kocht sehr gut.', '🍳'),
    v('waschen', 'to wash', 'Ich wasche die Wäsche.', '🧺'),
    v('aufräumen', 'to tidy up', 'Bitte räum dein Zimmer auf.', '🧹'),
    v('die Küche', 'the kitchen', 'Wir essen in der Küche.', '🍽️'),
    v('das Wohnzimmer', 'the living room', 'Wir sitzen abends im Wohnzimmer.', '🛋️'),
    v('das Schlafzimmer', 'the bedroom', 'Mein Schlafzimmer ist klein.', '🛏️'),
    v('der Müll', 'the trash', 'Ich bringe den Müll raus.', '🗑️'),
    v('einkaufen', 'to shop', 'Wir kaufen samstags im Supermarkt ein.', '🛒'),
    v('die Rechnung', 'the bill', 'Ich bezahle die Rechnung online.', '🧾'),
    v('die Wäsche', 'the laundry', 'Die Wäsche hängt draußen.', '👕'),
    v('das Geschirr', 'the dishes', 'Ich spüle das Geschirr nach dem Essen.', '🍽️'),
    v('staubsaugen', 'to vacuum', 'Ich staubsauge das Wohnzimmer.', '🧹'),
    v('gemeinsam', 'together', 'Wir machen die Hausarbeit gemeinsam.', '🤝')
  ], [
    { speaker: 'Opa', text: 'Wer macht bei euch den Haushalt?' },
    { speaker: 'Tim', text: 'Wir teilen uns die Arbeit. Ich koche und meine Schwester putzt.' },
    { speaker: 'Opa', text: 'Wer wäscht die Wäsche?' },
    { speaker: 'Tim', text: 'Das mache meistens ich am Wochenende.' },
    { speaker: 'Opa', text: 'Hilft dein Vater auch mit?' },
    { speaker: 'Tim', text: 'Ja, er staubsaugt und bringt den Müll raus.' },
    { speaker: 'Opa', text: 'Das klingt sehr organisiert!' },
    { speaker: 'Tim', text: 'Ja, wir machen alles gemeinsam.' },
    { speaker: 'Opa', text: 'Kaufst du auch ein?' },
    { speaker: 'Tim', text: 'Manchmal, wenn meine Mutter keine Zeit hat.' }
  ], 'Reflexive Verben', "Reflexive Verben brauchen ein Reflexivpronomen (mich, dich, sich, uns, euch, sich), das sich auf das Subjekt bezieht.", [
    { sentence: 'Ich wasche mich jeden Morgen.', note: 'Reflexivpronomen mich.' },
    { sentence: 'Er freut sich über den Besuch.', note: 'Sich freuen über.' },
    { sentence: 'Wir beeilen uns, weil wir spät dran sind.', note: 'Sich beeilen.' },
    { sentence: 'Setzt euch bitte an den Tisch.', note: 'Sich setzen, Imperativ.' },
    { sentence: 'Sie interessiert sich für Kochen.', note: 'Sich interessieren für.' }
  ], [
    { question: "Was bedeutet \"der Haushalt\"?", options: ["the household", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"putzen\"?", options: ["to clean", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"kochen\"?", options: ["to cook", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"waschen\"?", options: ["to wash", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"aufräumen\"?", options: ["to tidy up", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Küche\"?", options: ["the kitchen", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Der Alltag zu Hause:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Der Alltag zu Hause:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Der Alltag zu Hause:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Der Alltag zu Hause:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Der Alltag zu Hause:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Der Alltag zu Hause:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Der Alltag zu Hause:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Der Alltag zu Hause:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Der Alltag zu Hause:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "3ZmZ9v6mYtU", "Der Alltag zu Hause — Deutsch lernen A2", "A short German video illustrating der alltag zu hause for A2 learners."),
  "de-a2-10": L(10, 'Dativ — Präpositionen und Fälle', "Master the dative case with prepositions and verbs that require dative.", [
    v('der Dativ', 'the dative case', 'Der Dativ zeigt das indirekte Objekt an.', '📖'),
    v('geben', 'to give', 'Ich gebe dem Kind ein Geschenk.', '🎁'),
    v('helfen', 'to help', 'Ich helfe meiner Mutter.', '🤝'),
    v('danken', 'to thank', 'Ich danke dir für die Hilfe.', '🙏'),
    v('gehören', 'to belong to', 'Das Buch gehört mir.', '📚'),
    v('gefallen', 'to please/like', 'Das Kleid gefällt mir sehr.', '👗'),
    v('mit', 'with', 'Ich fahre mit dem Bus.', '🚌'),
    v('nach', 'after/to', 'Nach der Arbeit gehe ich nach Hause.', '🏠'),
    v('bei', 'at/near', 'Ich wohne bei meiner Familie.', '🏡'),
    v('von', 'from/of', 'Das Geschenk ist von meinem Freund.', '🎁'),
    v('zu', 'to', 'Ich gehe zu meiner Oma.', '👵'),
    v('aus', 'from/out of', 'Sie kommt aus Deutschland.', '🇩🇪'),
    v('seit', 'since', 'Ich lerne seit zwei Jahren Deutsch.', '⏳'),
    v('der Dativartikel', 'the dative article', 'Dem, der, den sind Dativartikel.', '🔤'),
    v('das indirekte Objekt', 'the indirect object', 'Im Dativ steht das indirekte Objekt.', '🔍')
  ], [
    { speaker: 'Lehrerin', text: 'Heute lernen wir den Dativ. Wer kann ein Beispiel geben?' },
    { speaker: 'Sami', text: 'Ich helfe meinem Bruder.' },
    { speaker: 'Lehrerin', text: 'Sehr gut! \'Meinem Bruder\' steht im Dativ.' },
    { speaker: 'Sami', text: 'Und wann benutzt man \'gefallen\'?' },
    { speaker: 'Lehrerin', text: '\'Gefallen\' verlangt immer den Dativ: Das Buch gefällt mir.' },
    { speaker: 'Sami', text: 'Welche Präpositionen brauchen den Dativ?' },
    { speaker: 'Lehrerin', text: 'Aus, bei, mit, nach, seit, von, zu, gegenüber.' },
    { speaker: 'Sami', text: 'Kannst du ein Beispiel mit \'seit\' geben?' },
    { speaker: 'Lehrerin', text: 'Ich wohne seit einem Jahr in Berlin.' },
    { speaker: 'Sami', text: 'Jetzt verstehe ich den Dativ besser!' }
  ], 'Dativ nach bestimmten Verben', "Manche Verben verlangen immer ein Dativobjekt: helfen, danken, gefallen, gehören, gratulieren. Der Artikel im Dativ ändert sich: der → dem/der, die → der, das → dem, die (Pl.) → den.", [
    { sentence: 'Ich helfe meinem Vater.', note: 'Dativ nach helfen.' },
    { sentence: 'Das gehört meiner Schwester.', note: 'Dativ nach gehören.' },
    { sentence: 'Wir danken den Lehrern.', note: 'Dativ Plural: den.' },
    { sentence: 'Das Essen schmeckt mir gut.', note: 'Dativ nach schmecken.' },
    { sentence: 'Ich gratuliere dir zum Geburtstag.', note: 'Dativ nach gratulieren.' }
  ], [
    { question: "Was bedeutet \"der Dativ\"?", options: ["the dative case", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"geben\"?", options: ["to give", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"helfen\"?", options: ["to help", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"danken\"?", options: ["to thank", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"gehören\"?", options: ["to belong to", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"gefallen\"?", options: ["to please/like", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Dativ — Präpositionen und Fälle:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Dativ — Präpositionen und Fälle:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Dativ — Präpositionen und Fälle:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Dativ — Präpositionen und Fälle:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Dativ — Präpositionen und Fälle:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Dativ — Präpositionen und Fälle:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Dativ — Präpositionen und Fälle:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Dativ — Präpositionen und Fälle:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Dativ — Präpositionen und Fälle:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "M4v6xR7zA1w", "Dativ — Präpositionen und Fälle — Deutsch lernen A2", "A short German video illustrating dativ — präpositionen und fälle for A2 learners."),
  "de-a2-11": L(11, 'Wegbeschreibung', "Learn how to give and understand directions in German.", [
    v('die Straße', 'the street', 'Die Straße ist sehr lang.', '🛣️'),
    v('die Kreuzung', 'the intersection', 'An der Kreuzung biegen Sie rechts ab.', '🚦'),
    v('geradeaus', 'straight ahead', 'Gehen Sie hier geradeaus.', '➡️'),
    v('links', 'left', 'Biegen Sie links ab.', '⬅️'),
    v('rechts', 'right', 'Das Geschäft ist auf der rechten Seite.', '➡️'),
    v('die Ampel', 'the traffic light', 'An der Ampel warten wir.', '🚥'),
    v('die Ecke', 'the corner', 'Das Café ist an der Ecke.', '📐'),
    v('die Brücke', 'the bridge', 'Wir gehen über die Brücke.', '🌉'),
    v('die Haltestelle', 'the bus stop', 'Die Haltestelle ist gleich hier.', '🚏'),
    v('das Gebäude', 'the building', 'Das Gebäude ist sehr hoch.', '🏢'),
    v('in der Nähe', 'nearby', 'Die Bank ist in der Nähe.', '📍'),
    v('weit', 'far', 'Der Bahnhof ist nicht weit von hier.', '📏'),
    v('verpassen', 'to miss', 'Ich habe die richtige Straße verpasst.', '🚫'),
    v('der Weg', 'the way/path', 'Kennst du den Weg zum Museum?', '🗺️'),
    v('abbiegen', 'to turn', 'Biegen Sie an der nächsten Ecke ab.', '↩️')
  ], [
    { speaker: 'Tourist', text: 'Entschuldigung, wie komme ich zum Bahnhof?' },
    { speaker: 'Passant', text: 'Gehen Sie hier geradeaus bis zur Ampel.' },
    { speaker: 'Tourist', text: 'Und dann?' },
    { speaker: 'Passant', text: 'An der Ampel biegen Sie links ab.' },
    { speaker: 'Tourist', text: 'Ist es weit von hier?' },
    { speaker: 'Passant', text: 'Nein, es ist nicht weit, ungefähr zehn Minuten zu Fuß.' },
    { speaker: 'Tourist', text: 'Gibt es eine Haltestelle in der Nähe?' },
    { speaker: 'Passant', text: 'Ja, die Haltestelle ist direkt an der Kreuzung.' },
    { speaker: 'Tourist', text: 'Vielen Dank für die Hilfe!' },
    { speaker: 'Passant', text: 'Gern geschehen, guten Weg!' }
  ], 'Imperativ — Befehle und Anweisungen', "Der Imperativ wird benutzt, um Anweisungen zu geben. Bei \'Sie\' bleibt die Form wie im Infinitiv (mit Sie), bei \'du\' fällt oft das -st weg.", [
    { sentence: 'Gehen Sie geradeaus!', note: 'Imperativ Sie-Form.' },
    { sentence: 'Biege links ab!', note: 'Imperativ du-Form.' },
    { sentence: 'Nehmen Sie die zweite Straße rechts!', note: 'Höfliche Anweisung.' },
    { sentence: 'Warte an der Ampel!', note: 'Imperativ du.' },
    { sentence: 'Fahrt mit dem Bus!', note: 'Imperativ ihr-Form.' }
  ], [
    { question: "Was bedeutet \"die Straße\"?", options: ["the street", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Kreuzung\"?", options: ["the intersection", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"geradeaus\"?", options: ["straight ahead", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"links\"?", options: ["left", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"rechts\"?", options: ["right", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Ampel\"?", options: ["the traffic light", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Wegbeschreibung:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Wegbeschreibung:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Wegbeschreibung:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Wegbeschreibung:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Wegbeschreibung:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Wegbeschreibung:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Wegbeschreibung:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Wegbeschreibung:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Wegbeschreibung:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "P9r6HGpFvW4", "Wegbeschreibung — Deutsch lernen A2", "A short German video illustrating wegbeschreibung for A2 learners."),
  "de-a2-12": L(12, 'Einladungen und Feste', "Talk about invitations, parties and celebrations.", [
    v('die Einladung', 'the invitation', 'Ich habe eine Einladung zur Party bekommen.', '💌'),
    v('die Feier', 'the celebration', 'Die Feier war sehr schön.', '🎉'),
    v('der Geburtstag', 'the birthday', 'Heute ist mein Geburtstag.', '🎂'),
    v('einladen', 'to invite', 'Ich lade dich zu meiner Party ein.', '📨'),
    v('das Geschenk', 'the gift', 'Ich habe ein schönes Geschenk gekauft.', '🎁'),
    v('feiern', 'to celebrate', 'Wir feiern heute Abend.', '🥳'),
    v('die Gäste', 'the guests', 'Viele Gäste sind gekommen.', '👥'),
    v('das Fest', 'the festival/party', 'Das Fest dauert bis Mitternacht.', '🎊'),
    v('gratulieren', 'to congratulate', 'Ich gratuliere dir zum Erfolg.', '🎉'),
    v('die Party', 'the party', 'Die Party war unvergesslich.', '🎈'),
    v('der Kuchen', 'the cake', 'Der Kuchen war köstlich.', '🍰'),
    v('tanzen', 'to dance', 'Wir haben die ganze Nacht getanzt.', '💃'),
    v('die Musik', 'the music', 'Die Musik war sehr laut.', '🎵'),
    v('zusagen', 'to accept (an invitation)', 'Ich habe der Einladung zugesagt.', '✅'),
    v('absagen', 'to decline', 'Leider musste ich absagen.', '❌')
  ], [
    { speaker: 'Julia', text: 'Ich lade dich zu meiner Geburtstagsparty ein!' },
    { speaker: 'Ben', text: 'Wann findet die Feier statt?' },
    { speaker: 'Julia', text: 'Am Samstag um sieben Uhr abends.' },
    { speaker: 'Ben', text: 'Ich sage gerne zu! Soll ich etwas mitbringen?' },
    { speaker: 'Julia', text: 'Vielleicht einen Kuchen oder Getränke.' },
    { speaker: 'Ben', text: 'Wie viele Gäste hast du eingeladen?' },
    { speaker: 'Julia', text: 'Ungefähr zwanzig Freunde und Verwandte.' },
    { speaker: 'Ben', text: 'Wird es Musik zum Tanzen geben?' },
    { speaker: 'Julia', text: 'Natürlich, wir werden die ganze Nacht tanzen!' },
    { speaker: 'Ben', text: 'Ich freue mich schon sehr auf die Party.' }
  ], 'Präpositionen mit Akkusativ und Dativ (Wechselpräpositionen)', "Wechselpräpositionen wie \'in\', \'an\', \'auf\' nehmen den Akkusativ bei Bewegung (wohin?) und den Dativ bei Ort (wo?).", [
    { sentence: 'Ich gehe in die Küche.', note: 'Akkusativ: Bewegung, wohin?' },
    { sentence: 'Ich bin in der Küche.', note: 'Dativ: Ort, wo?' },
    { sentence: 'Wir feiern auf der Terrasse.', note: 'Dativ: Ort.' },
    { sentence: 'Sie stellt den Kuchen auf den Tisch.', note: 'Akkusativ: Bewegung.' },
    { sentence: 'Die Gäste stehen an der Tür.', note: 'Dativ: Ort.' }
  ], [
    { question: "Was bedeutet \"die Einladung\"?", options: ["the invitation", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Feier\"?", options: ["the celebration", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"der Geburtstag\"?", options: ["the birthday", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"einladen\"?", options: ["to invite", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"das Geschenk\"?", options: ["the gift", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"feiern\"?", options: ["to celebrate", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Einladungen und Feste:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Einladungen und Feste:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Einladungen und Feste:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Einladungen und Feste:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Einladungen und Feste:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Einladungen und Feste:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Einladungen und Feste:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Einladungen und Feste:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Einladungen und Feste:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "gWfR_2XkR4M", "Einladungen und Feste — Deutsch lernen A2", "A short German video illustrating einladungen und feste for A2 learners."),
  "de-a2-13": L(13, 'Adjektive und Vergleiche', "Practice adjective endings and comparative/superlative forms.", [
    v('schön', 'beautiful', 'Das ist ein schönes Haus.', '🌸'),
    v('hässlich', 'ugly', 'Das Gebäude ist hässlich.', '🏚️'),
    v('groß', 'big/tall', 'Er ist sehr groß.', '📏'),
    v('klein', 'small', 'Die Wohnung ist klein.', '🏠'),
    v('teuer', 'expensive', 'Dieses Auto ist teuer.', '💰'),
    v('billig', 'cheap', 'Der Rock ist billig.', '🏷️'),
    v('schnell', 'fast', 'Der Zug ist sehr schnell.', '🚄'),
    v('langsam', 'slow', 'Die Schnecke ist langsam.', '🐌'),
    v('interessant', 'interesting', 'Das Buch ist interessant.', '📚'),
    v('langweilig', 'boring', 'Der Film war langweilig.', '😴'),
    v('besser', 'better', 'Dieses Restaurant ist besser.', '👍'),
    v('am besten', 'the best', 'Dieser Kuchen schmeckt am besten.', '🏆'),
    v('mehr', 'more', 'Ich brauche mehr Zeit.', '➕'),
    v('weniger', 'less', 'Ich habe weniger Geld als du.', '➖'),
    v('genauso... wie', 'just as... as', 'Sie ist genauso groß wie ich.', '⚖️')
  ], [
    { speaker: 'Anna', text: 'Welches Auto findest du besser, das rote oder das blaue?' },
    { speaker: 'Leo', text: 'Das blaue ist besser, weil es schneller ist.' },
    { speaker: 'Anna', text: 'Aber das rote ist billiger als das blaue.' },
    { speaker: 'Leo', text: 'Stimmt, aber Qualität ist mir wichtiger als Preis.' },
    { speaker: 'Anna', text: 'Welches Auto ist am teuersten?' },
    { speaker: 'Leo', text: 'Das schwarze Auto ist am teuersten von allen.' },
    { speaker: 'Anna', text: 'Ich finde das grüne genauso schön wie das blaue.' },
    { speaker: 'Leo', text: 'Ja, aber es ist kleiner als die anderen.' },
    { speaker: 'Anna', text: 'Am Ende ist der Preis am wichtigsten für mich.' },
    { speaker: 'Leo', text: 'Für mich ist die Qualität am wichtigsten.' }
  ], 'Adjektivdeklination', "Adjektive vor Nomen bekommen Endungen, die vom Artikel, Kasus und Geschlecht abhängen. Nach bestimmtem Artikel: -e oder -en; nach unbestimmtem Artikel unterschiedliche Endungen.", [
    { sentence: 'Das ist ein schönes Haus.', note: 'Unbestimmter Artikel, Neutrum, Nominativ.' },
    { sentence: 'Ich sehe den großen Hund.', note: 'Bestimmter Artikel, Akkusativ.' },
    { sentence: 'Die kleine Katze schläft.', note: 'Bestimmter Artikel, Nominativ, Femininum.' },
    { sentence: 'Er kauft einen teuren Wagen.', note: 'Unbestimmter Artikel, Akkusativ, Maskulinum.' },
    { sentence: 'Wir wohnen in einer neuen Wohnung.', note: 'Dativ nach Präposition.' }
  ], [
    { question: "Was bedeutet \"schön\"?", options: ["beautiful", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"hässlich\"?", options: ["ugly", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"groß\"?", options: ["big/tall", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"klein\"?", options: ["small", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"teuer\"?", options: ["expensive", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"billig\"?", options: ["cheap", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Adjektive und Vergleiche:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Adjektive und Vergleiche:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Adjektive und Vergleiche:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Adjektive und Vergleiche:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Adjektive und Vergleiche:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Adjektive und Vergleiche:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Adjektive und Vergleiche:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Adjektive und Vergleiche:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Adjektive und Vergleiche:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "y9nJK1x5NQ0", "Adjektive und Vergleiche — Deutsch lernen A2", "A short German video illustrating adjektive und vergleiche for A2 learners."),
  "de-a2-14": L(14, 'Reflexive Verben — sich waschen, sich freuen', "Learn reflexive verbs and pronouns used in everyday German.", [
    v('sich waschen', 'to wash oneself', 'Ich wasche mich jeden Morgen.', '🚿'),
    v('sich anziehen', 'to get dressed', 'Er zieht sich schnell an.', '👕'),
    v('sich freuen', 'to be happy about', 'Ich freue mich auf die Ferien.', '😊'),
    v('sich ärgern', 'to be annoyed', 'Sie ärgert sich über den Verkehr.', '😠'),
    v('sich erinnern', 'to remember', 'Ich erinnere mich an meine Kindheit.', '🧠'),
    v('sich interessieren', 'to be interested in', 'Er interessiert sich für Musik.', '🎵'),
    v('sich beeilen', 'to hurry', 'Wir müssen uns beeilen!', '⏱️'),
    v('sich entspannen', 'to relax', 'Am Wochenende entspanne ich mich.', '🧘'),
    v('sich fühlen', 'to feel', 'Ich fühle mich heute gut.', '💫'),
    v('sich vorbereiten', 'to prepare oneself', 'Ich bereite mich auf die Prüfung vor.', '📚'),
    v('sich verlieben', 'to fall in love', 'Sie hat sich in ihn verliebt.', '❤️'),
    v('sich entscheiden', 'to decide', 'Ich kann mich nicht entscheiden.', '🤔'),
    v('sich setzen', 'to sit down', 'Setz dich bitte hin.', '🪑'),
    v('sich duschen', 'to shower', 'Ich dusche mich jeden Abend.', '🚿'),
    v('sich treffen', 'to meet up', 'Wir treffen uns um sechs Uhr.', '🤝')
  ], [
    { speaker: 'Mia', text: 'Freust du dich auf das Wochenende?' },
    { speaker: 'Noah', text: 'Ja, sehr! Ich freue mich, meine Familie zu besuchen.' },
    { speaker: 'Mia', text: 'Wie fühlst du dich heute?' },
    { speaker: 'Noah', text: 'Ich fühle mich ein bisschen müde.' },
    { speaker: 'Mia', text: 'Musst du dich für morgen vorbereiten?' },
    { speaker: 'Noah', text: 'Ja, ich muss mich auf die Prüfung vorbereiten.' },
    { speaker: 'Mia', text: 'Ärgerst du dich manchmal über deine Arbeit?' },
    { speaker: 'Noah', text: 'Manchmal, besonders wenn es stressig ist.' },
    { speaker: 'Mia', text: 'Wir sollten uns bald wieder treffen.' },
    { speaker: 'Noah', text: 'Ja, lass uns uns nächste Woche treffen!' }
  ], 'Reflexivpronomen im Akkusativ und Dativ', "Reflexivpronomen ändern sich je nach Person: mich/mir, dich/dir, sich/sich, uns/uns, euch/euch, sich/sich. Manche Verben stehen mit Akkusativ (sich waschen), andere mit Dativ (sich etwas kaufen).", [
    { sentence: 'Ich wasche mich.', note: 'Reflexivpronomen im Akkusativ.' },
    { sentence: 'Ich kaufe mir ein Buch.', note: 'Reflexivpronomen im Dativ.' },
    { sentence: 'Er putzt sich die Zähne.', note: 'Dativ, weil \'die Zähne\' das Akkusativobjekt ist.' },
    { sentence: 'Wir freuen uns über das Geschenk.', note: 'Akkusativ + über.' },
    { sentence: 'Interessierst du dich für Sport?', note: 'Frage mit Reflexivpronomen.' }
  ], [
    { question: "Was bedeutet \"sich waschen\"?", options: ["to wash oneself", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"sich anziehen\"?", options: ["to get dressed", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"sich freuen\"?", options: ["to be happy about", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"sich ärgern\"?", options: ["to be annoyed", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"sich erinnern\"?", options: ["to remember", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"sich interessieren\"?", options: ["to be interested in", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Reflexive Verben — sich waschen, sich freuen:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Reflexive Verben — sich waschen, sich freuen:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Reflexive Verben — sich waschen, sich freuen:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Reflexive Verben — sich waschen, sich freuen:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Reflexive Verben — sich waschen, sich freuen:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Reflexive Verben — sich waschen, sich freuen:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Reflexive Verben — sich waschen, sich freuen:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Reflexive Verben — sich waschen, sich freuen:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Reflexive Verben — sich waschen, sich freuen:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "q1XvR9m8ZQs", "Reflexive Verben — sich waschen, sich freuen — Deutsch lernen A2", "A short German video illustrating reflexive verben — sich waschen, sich freuen for A2 learners."),
  "de-a2-15": L(15, 'Konjunktionen — weil, dass, wenn', "Master subordinate clauses with weil, dass and wenn.", [
    v('weil', 'because', 'Ich bleibe zu Hause, weil ich krank bin.', '🔗'),
    v('dass', 'that', 'Ich weiß, dass du recht hast.', '🔗'),
    v('wenn', 'if/when', 'Wenn es regnet, bleibe ich zu Hause.', '🔗'),
    v('obwohl', 'although', 'Obwohl es kalt ist, gehe ich raus.', '🔗'),
    v('denn', 'because/for', 'Ich bin froh, denn ich habe bestanden.', '🔗'),
    v('der Nebensatz', 'the subordinate clause', 'Der Nebensatz braucht das Verb am Ende.', '📖'),
    v('der Hauptsatz', 'the main clause', 'Der Hauptsatz steht meistens zuerst.', '📘'),
    v('die Bedingung', 'the condition', 'Wenn du fleißig bist, bestehst du.', '🔍'),
    v('der Grund', 'the reason', 'Was ist der Grund für deine Verspätung?', '❓'),
    v('bevor', 'before', 'Bevor ich esse, wasche ich mir die Hände.', '⏱️'),
    v('nachdem', 'after', 'Nachdem ich gegessen habe, gehe ich schlafen.', '⏳'),
    v('während', 'while', 'Während ich koche, hört sie Musik.', '🎵'),
    v('damit', 'so that', 'Ich lerne, damit ich die Prüfung bestehe.', '🎯'),
    v('die Meinung', 'the opinion', 'Ich sage meine Meinung offen.', '💭'),
    v('begründen', 'to justify/explain', 'Kannst du deine Antwort begründen?', '🗣️')
  ], [
    { speaker: 'Lehrer', text: 'Warum lernst du jeden Tag Deutsch?' },
    { speaker: 'Sofia', text: 'Weil ich in Deutschland arbeiten möchte.' },
    { speaker: 'Lehrer', text: 'Denkst du, dass Deutsch eine schwere Sprache ist?' },
    { speaker: 'Sofia', text: 'Ja, ich denke, dass die Grammatik kompliziert ist.' },
    { speaker: 'Lehrer', text: 'Was machst du, wenn du ein Wort nicht kennst?' },
    { speaker: 'Sofia', text: 'Wenn ich ein Wort nicht kenne, benutze ich ein Wörterbuch.' },
    { speaker: 'Lehrer', text: 'Lernst du weiter, obwohl es schwer ist?' },
    { speaker: 'Sofia', text: 'Ja, obwohl es schwer ist, macht es mir Spaß.' },
    { speaker: 'Lehrer', text: 'Das ist eine tolle Einstellung!' },
    { speaker: 'Sofia', text: 'Danke, ich möchte die Prüfung unbedingt bestehen.' }
  ], 'Nebensätze mit weil, dass, wenn', "In Nebensätzen mit weil, dass und wenn steht das konjugierte Verb am Ende. Der Hauptsatz kann vor oder nach dem Nebensatz stehen.", [
    { sentence: 'Ich lerne Deutsch, weil ich nach Deutschland ziehen möchte.', note: 'Weil-Satz, Verb am Ende.' },
    { sentence: 'Er sagt, dass er müde ist.', note: 'Dass-Satz.' },
    { sentence: 'Wenn ich Zeit habe, besuche ich dich.', note: 'Wenn-Satz, Bedingung.' },
    { sentence: 'Weil es spät ist, gehe ich schlafen.', note: 'Nebensatz zuerst, Hauptsatz mit Verb-Subjekt-Umstellung.' },
    { sentence: 'Ich glaube, dass wir gewinnen werden.', note: 'Dass-Satz mit Futur.' }
  ], [
    { question: "Was bedeutet \"weil\"?", options: ["because", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"dass\"?", options: ["that", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"wenn\"?", options: ["if/when", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"obwohl\"?", options: ["although", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"denn\"?", options: ["because/for", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"der Nebensatz\"?", options: ["the subordinate clause", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Konjunktionen — weil, dass, wenn:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Konjunktionen — weil, dass, wenn:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Konjunktionen — weil, dass, wenn:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Konjunktionen — weil, dass, wenn:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Konjunktionen — weil, dass, wenn:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Konjunktionen — weil, dass, wenn:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Konjunktionen — weil, dass, wenn:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Konjunktionen — weil, dass, wenn:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Konjunktionen — weil, dass, wenn:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "kBqz0AYfLK4", "Konjunktionen — weil, dass, wenn — Deutsch lernen A2", "A short German video illustrating konjunktionen — weil, dass, wenn for A2 learners."),
  "de-a2-16": L(16, 'Kleidung kaufen — Größen und Farben', "Shopping for clothes: sizes, colors and describing preferences.", [
    v('die Kleidung', 'the clothing', 'Ich brauche neue Kleidung.', '👗'),
    v('die Größe', 'the size', 'Welche Größe brauchen Sie?', '📏'),
    v('die Farbe', 'the color', 'Welche Farbe gefällt dir?', '🎨'),
    v('anprobieren', 'to try on', 'Kann ich das Hemd anprobieren?', '👕'),
    v('passen', 'to fit', 'Die Hose passt mir gut.', '✅'),
    v('die Umkleidekabine', 'the fitting room', 'Die Umkleidekabine ist dort hinten.', '🚪'),
    v('umtauschen', 'to exchange', 'Ich möchte den Pullover umtauschen.', '🔄'),
    v('das Sonderangebot', 'the special offer', 'Das ist ein tolles Sonderangebot.', '🏷️'),
    v('der Rabatt', 'the discount', 'Es gibt zwanzig Prozent Rabatt.', '💸'),
    v('die Jacke', 'the jacket', 'Diese Jacke ist sehr warm.', '🧥'),
    v('die Hose', 'the pants', 'Die Hose ist zu eng.', '👖'),
    v('das Kleid', 'the dress', 'Das Kleid steht dir gut.', '👗'),
    v('die Schuhe', 'the shoes', 'Ich brauche neue Schuhe.', '👟'),
    v('bezahlen', 'to pay', 'Wo kann ich bezahlen?', '💳'),
    v('bar/mit Karte', 'cash/by card', 'Ich bezahle lieber mit Karte.', '💳')
  ], [
    { speaker: 'Verkäuferin', text: 'Guten Tag! Kann ich Ihnen helfen?' },
    { speaker: 'Kunde', text: 'Ja, ich suche eine Jacke in Größe M.' },
    { speaker: 'Verkäuferin', text: 'Welche Farbe möchten Sie?' },
    { speaker: 'Kunde', text: 'Am liebsten schwarz oder blau.' },
    { speaker: 'Verkäuferin', text: 'Hier haben wir eine schöne blaue Jacke.' },
    { speaker: 'Kunde', text: 'Darf ich sie anprobieren?' },
    { speaker: 'Verkäuferin', text: 'Natürlich, die Umkleidekabine ist dort.' },
    { speaker: 'Kunde', text: 'Die Jacke passt perfekt! Was kostet sie?' },
    { speaker: 'Verkäuferin', text: 'Sie kostet fünfzig Euro, aber heute gibt es zehn Prozent Rabatt.' },
    { speaker: 'Kunde', text: 'Super, ich nehme sie. Kann ich mit Karte bezahlen?' }
  ], 'Adjektive nach dem Nomen — Farben und Beschreibungen', "Farbadjektive folgen der normalen Adjektivdeklination. Bei Kleidung wird oft ein bestimmter oder unbestimmter Artikel verwendet.", [
    { sentence: 'Ich kaufe ein blaues Hemd.', note: 'Adjektivendung nach unbestimmtem Artikel.' },
    { sentence: 'Die rote Jacke gefällt mir.', note: 'Bestimmter Artikel, Femininum.' },
    { sentence: 'Er trägt einen schwarzen Anzug.', note: 'Akkusativ, Maskulinum.' },
    { sentence: 'Diese grünen Schuhe sind bequem.', note: 'Plural-Endung -en.' },
    { sentence: 'Welche Größe passt dir am besten?', note: 'Superlativ in Fragen.' }
  ], [
    { question: "Was bedeutet \"die Kleidung\"?", options: ["the clothing", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Größe\"?", options: ["the size", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Farbe\"?", options: ["the color", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"anprobieren\"?", options: ["to try on", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"passen\"?", options: ["to fit", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Umkleidekabine\"?", options: ["the fitting room", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Kleidung kaufen — Größen und Farben:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Kleidung kaufen — Größen und Farben:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Kleidung kaufen — Größen und Farben:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Kleidung kaufen — Größen und Farben:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Kleidung kaufen — Größen und Farben:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Kleidung kaufen — Größen und Farben:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Kleidung kaufen — Größen und Farben:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Kleidung kaufen — Größen und Farben:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Kleidung kaufen — Größen und Farben:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "J5vN2p3zR8k", "Kleidung kaufen — Größen und Farben — Deutsch lernen A2", "A short German video illustrating kleidung kaufen — größen und farben for A2 learners."),
  "de-a2-17": L(17, 'Freizeit und Sport', "Talk about hobbies, sports and free-time activities.", [
    v('die Freizeit', 'the free time', 'In meiner Freizeit lese ich gern.', '⏰'),
    v('der Sport', 'the sport', 'Sport ist gut für die Gesundheit.', '⚽'),
    v('schwimmen', 'to swim', 'Ich schwimme jeden Sommer im See.', '🏊'),
    v('laufen', 'to run', 'Er läuft jeden Morgen fünf Kilometer.', '🏃'),
    v('das Fitnessstudio', 'the gym', 'Ich gehe dreimal pro Woche ins Fitnessstudio.', '🏋️'),
    v('das Hobby', 'the hobby', 'Mein Hobby ist Fotografieren.', '📷'),
    v('die Mannschaft', 'the team', 'Unsere Mannschaft hat gewonnen.', '⚽'),
    v('trainieren', 'to train', 'Wir trainieren jeden Dienstag.', '🏋️‍♀️'),
    v('das Spiel', 'the game/match', 'Das Spiel war sehr spannend.', '🏆'),
    v('wandern', 'to hike', 'Am Wochenende wandern wir in den Bergen.', '🥾'),
    v('Rad fahren', 'to cycle', 'Ich fahre gern mit dem Rad.', '🚴'),
    v('verlieren', 'to lose', 'Unsere Mannschaft hat leider verloren.', '😞'),
    v('gewinnen', 'to win', 'Wer hat das Spiel gewonnen?', '🏆'),
    v('der Wettkampf', 'the competition', 'Der Wettkampf findet im Stadion statt.', '🥇'),
    v('fit bleiben', 'to stay fit', 'Ich mache Sport, um fit zu bleiben.', '💪')
  ], [
    { speaker: 'Erik', text: 'Was machst du in deiner Freizeit?' },
    { speaker: 'Lara', text: 'Ich treibe viel Sport, vor allem schwimme ich gern.' },
    { speaker: 'Erik', text: 'Gehst du auch ins Fitnessstudio?' },
    { speaker: 'Lara', text: 'Ja, ich trainiere dreimal pro Woche.' },
    { speaker: 'Erik', text: 'Spielst du in einer Mannschaft?' },
    { speaker: 'Lara', text: 'Ja, ich spiele Volleyball in einem Verein.' },
    { speaker: 'Erik', text: 'Habt ihr letzte Woche gewonnen?' },
    { speaker: 'Lara', text: 'Leider haben wir das Spiel verloren.' },
    { speaker: 'Erik', text: 'Das tut mir leid! Was machst du sonst noch gern?' },
    { speaker: 'Lara', text: 'Ich wandere gern in den Bergen und fahre Rad.' }
  ], 'Präteritum von sein und haben', "Im mündlichen Deutsch benutzt man meistens das Perfekt, aber \'sein\' und \'haben\' werden oft im Präteritum verwendet: ich war, du warst, er/sie/es war; ich hatte, du hattest, er/sie/es hatte.", [
    { sentence: 'Ich war letztes Jahr sehr sportlich.', note: 'Präteritum von sein.' },
    { sentence: 'Wir hatten viel Spaß beim Training.', note: 'Präteritum von haben.' },
    { sentence: 'Warst du beim Wettkampf dabei?', note: 'Frage im Präteritum.' },
    { sentence: 'Sie hatte keine Zeit für Sport.', note: 'Präteritum, 3. Person Singular.' },
    { sentence: 'Das Spiel war sehr spannend.', note: 'Präteritum von sein.' }
  ], [
    { question: "Was bedeutet \"die Freizeit\"?", options: ["the free time", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"der Sport\"?", options: ["the sport", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"schwimmen\"?", options: ["to swim", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"laufen\"?", options: ["to run", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"das Fitnessstudio\"?", options: ["the gym", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"das Hobby\"?", options: ["the hobby", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Freizeit und Sport:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Freizeit und Sport:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Freizeit und Sport:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Freizeit und Sport:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Freizeit und Sport:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Freizeit und Sport:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Freizeit und Sport:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Freizeit und Sport:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Freizeit und Sport:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "w0aBn7YmxT4", "Freizeit und Sport — Deutsch lernen A2", "A short German video illustrating freizeit und sport for A2 learners."),
  "de-a2-18": L(18, 'Umwelt und Natur', "Discuss environmental issues, nature and sustainability.", [
    v('die Umwelt', 'the environment', 'Wir müssen die Umwelt schützen.', '🌍'),
    v('die Natur', 'nature', 'Ich liebe die Natur im Herbst.', '🌳'),
    v('recyceln', 'to recycle', 'Wir recyceln Papier und Plastik.', '♻️'),
    v('der Müll', 'the trash', 'Bitte trenne den Müll richtig.', '🗑️'),
    v('verschmutzen', 'to pollute', 'Autos verschmutzen die Luft.', '🚗'),
    v('die Luft', 'the air', 'Die Luft in der Stadt ist schmutzig.', '💨'),
    v('das Klima', 'the climate', 'Das Klima verändert sich schnell.', '🌡️'),
    v('der Wald', 'the forest', 'Der Wald ist voller Tiere.', '🌲'),
    v('schützen', 'to protect', 'Wir müssen die Tiere schützen.', '🛡️'),
    v('die Energie', 'the energy', 'Solarenergie ist umweltfreundlich.', '☀️'),
    v('sparen', 'to save', 'Wir sparen Wasser und Strom.', '💧'),
    v('die Pflanze', 'the plant', 'Diese Pflanze braucht viel Wasser.', '🌱'),
    v('nachhaltig', 'sustainable', 'Wir kaufen nachhaltige Produkte.', '🌿'),
    v('der Klimawandel', 'climate change', 'Der Klimawandel betrifft uns alle.', '🌡️'),
    v('die Zukunft', 'the future', 'Wir müssen an die Zukunft denken.', '🔮')
  ], [
    { speaker: 'Sofia', text: 'Machst du etwas für die Umwelt?' },
    { speaker: 'David', text: 'Ja, ich recycle Plastik und Papier zu Hause.' },
    { speaker: 'Sofia', text: 'Ich versuche auch, weniger Auto zu fahren.' },
    { speaker: 'David', text: 'Gute Idee, Autos verschmutzen die Luft stark.' },
    { speaker: 'Sofia', text: 'Denkst du, dass der Klimawandel gefährlich ist?' },
    { speaker: 'David', text: 'Ja, ich glaube, dass wir schnell handeln müssen.' },
    { speaker: 'Sofia', text: 'Was können wir noch tun?' },
    { speaker: 'David', text: 'Wir sollten Energie und Wasser sparen.' },
    { speaker: 'Sofia', text: 'Ich kaufe jetzt auch nachhaltige Produkte.' },
    { speaker: 'David', text: 'Toll! Jeder kleine Schritt hilft der Zukunft.' }
  ], 'Modalverb sollen und Ratschläge', "\'Sollen\' drückt eine Empfehlung oder moralische Pflicht aus. Es wird oft benutzt, um Ratschläge zur Umwelt zu geben.", [
    { sentence: 'Wir sollten weniger Plastik benutzen.', note: 'Konjunktiv II: sollten.' },
    { sentence: 'Man soll den Müll trennen.', note: 'Sollen = allgemeine Regel.' },
    { sentence: 'Du solltest mit dem Rad fahren statt mit dem Auto.', note: 'Ratschlag.' },
    { sentence: 'Wir sollen die Natur schützen.', note: 'Moralische Pflicht.' },
    { sentence: 'Sollten wir mehr recyceln?', note: 'Frage mit sollen.' }
  ], [
    { question: "Was bedeutet \"die Umwelt\"?", options: ["the environment", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Natur\"?", options: ["nature", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"recyceln\"?", options: ["to recycle", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"der Müll\"?", options: ["the trash", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"verschmutzen\"?", options: ["to pollute", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Luft\"?", options: ["the air", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Umwelt und Natur:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Umwelt und Natur:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Umwelt und Natur:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Umwelt und Natur:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Umwelt und Natur:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Umwelt und Natur:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Umwelt und Natur:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Umwelt und Natur:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Umwelt und Natur:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "H3xN9k2QpZ0", "Umwelt und Natur — Deutsch lernen A2", "A short German video illustrating umwelt und natur for A2 learners."),
  "de-a2-19": L(19, 'Träume und Wünsche', "Express dreams, wishes and hypothetical situations using Konjunktiv II.", [
    v('der Traum', 'the dream', 'Mein Traum ist es, um die Welt zu reisen.', '💭'),
    v('der Wunsch', 'the wish', 'Mein größter Wunsch ist ein eigenes Haus.', '⭐'),
    v('würde', 'would', 'Ich würde gern nach Japan reisen.', '🌏'),
    v('könnte', 'could', 'Ich könnte dir helfen, wenn du willst.', '🤲'),
    v('hätte', 'would have', 'Ich hätte gern mehr Zeit.', '⏳'),
    v('wäre', 'would be', 'Es wäre schön, im Meer zu schwimmen.', '🌊'),
    v('wünschen', 'to wish', 'Ich wünsche mir Frieden auf der Welt.', '🕊️'),
    v('die Vorstellung', 'the imagination/idea', 'Ich habe eine klare Vorstellung von der Zukunft.', '💡'),
    v('erreichen', 'to achieve', 'Ich möchte meine Ziele erreichen.', '🎯'),
    v('das Ziel', 'the goal', 'Mein Ziel ist es, fließend Deutsch zu sprechen.', '🎯'),
    v('die Hoffnung', 'the hope', 'Ich habe die Hoffnung, dass alles gut wird.', '🌈'),
    v('verwirklichen', 'to realize/fulfill', 'Ich möchte meinen Traum verwirklichen.', '✨'),
    v('die Fantasie', 'the imagination', 'Kinder haben viel Fantasie.', '🎨'),
    v('stellen wir uns vor', 'let\'s imagine', 'Stellen wir uns vor, wir wären reich.', '🧠'),
    v('die Möglichkeit', 'the possibility', 'Es gibt viele Möglichkeiten in der Zukunft.', '🔑')
  ], [
    { speaker: 'Nina', text: 'Was wäre dein größter Traum?' },
    { speaker: 'Oskar', text: 'Ich würde gern ein eigenes Restaurant eröffnen.' },
    { speaker: 'Nina', text: 'Das klingt spannend! Was würdest du kochen?' },
    { speaker: 'Oskar', text: 'Ich würde traditionelle deutsche Gerichte kochen.' },
    { speaker: 'Nina', text: 'Wenn ich Geld hätte, würde ich um die Welt reisen.' },
    { speaker: 'Oskar', text: 'Welches Land würdest du zuerst besuchen?' },
    { speaker: 'Nina', text: 'Ich würde zuerst nach Japan fliegen.' },
    { speaker: 'Oskar', text: 'Das wäre auch mein Traum!' },
    { speaker: 'Nina', text: 'Glaubst du, dass wir unsere Träume verwirklichen können?' },
    { speaker: 'Oskar', text: 'Ja, mit harter Arbeit könnten wir es schaffen.' }
  ], 'Konjunktiv II — Wünsche und Höflichkeit', "Der Konjunktiv II drückt Wünsche, Höflichkeit und irreale Situationen aus. Er wird oft mit \'würde\' + Infinitiv gebildet, bei sein/haben/Modalverben direkt: wäre, hätte, könnte, müsste.", [
    { sentence: 'Ich würde gern reisen.', note: 'Würde + Infinitiv.' },
    { sentence: 'Wenn ich Zeit hätte, würde ich lernen.', note: 'Konjunktiv II von haben.' },
    { sentence: 'Das wäre wunderbar!', note: 'Konjunktiv II von sein.' },
    { sentence: 'Könntest du mir bitte helfen?', note: 'Höfliche Bitte.' },
    { sentence: 'Ich hätte gern einen Kaffee.', note: 'Höfliche Bestellung.' }
  ], [
    { question: "Was bedeutet \"der Traum\"?", options: ["the dream", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"der Wunsch\"?", options: ["the wish", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"würde\"?", options: ["would", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"könnte\"?", options: ["could", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"hätte\"?", options: ["would have", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"wäre\"?", options: ["would be", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Träume und Wünsche:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Träume und Wünsche:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Träume und Wünsche:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Träume und Wünsche:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Träume und Wünsche:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Träume und Wünsche:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Träume und Wünsche:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Träume und Wünsche:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Träume und Wünsche:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "F6yQm8xR3kL", "Träume und Wünsche — Deutsch lernen A2", "A short German video illustrating träume und wünsche for A2 learners."),
  "de-a2-20": L(20, 'Präteritum — Erzählen wie im Buch', "Learn to use Präteritum for written narration and storytelling.", [
    v('es war einmal', 'once upon a time', 'Es war einmal ein kleines Dorf.', '📖'),
    v('erzählen', 'to tell (a story)', 'Meine Oma erzählt gern Geschichten.', '🗣️'),
    v('die Geschichte', 'the story', 'Diese Geschichte ist sehr spannend.', '📚'),
    v('ging', 'went (Präteritum of gehen)', 'Er ging langsam durch den Wald.', '🚶'),
    v('kam', 'came (Präteritum of kommen)', 'Sie kam spät nach Hause.', '🏠'),
    v('sah', 'saw (Präteritum of sehen)', 'Er sah ein Licht im Fenster.', '👁️'),
    v('sagte', 'said (Präteritum of sagen)', 'Sie sagte kein Wort.', '💬'),
    v('fand', 'found (Präteritum of finden)', 'Er fand einen alten Schlüssel.', '🔑'),
    v('wusste', 'knew (Präteritum of wissen)', 'Niemand wusste die Antwort.', '🧠'),
    v('blieb', 'stayed (Präteritum of bleiben)', 'Er blieb die ganze Nacht wach.', '🌙'),
    v('dachte', 'thought (Präteritum of denken)', 'Sie dachte lange nach.', '💭'),
    v('das Märchen', 'the fairy tale', 'Das Märchen endet gut.', '🧚'),
    v('plötzlich', 'suddenly', 'Plötzlich hörte er ein Geräusch.', '⚡'),
    v('das Ende', 'the end', 'Am Ende waren alle glücklich.', '🏁'),
    v('der Held', 'the hero', 'Der Held rettete das Dorf.', '🦸')
  ], [
    { speaker: 'Kind', text: 'Oma, erzähl mir bitte eine Geschichte!' },
    { speaker: 'Oma', text: 'Es war einmal ein Junge, der im Wald lebte.' },
    { speaker: 'Kind', text: 'Was passierte dann?' },
    { speaker: 'Oma', text: 'Eines Tages ging er in den dunklen Wald und sah ein Licht.' },
    { speaker: 'Kind', text: 'Hatte er Angst?' },
    { speaker: 'Oma', text: 'Nein, er war mutig und blieb ruhig.' },
    { speaker: 'Kind', text: 'Was fand er im Wald?' },
    { speaker: 'Oma', text: 'Er fand eine geheime Höhle mit einem Schatz.' },
    { speaker: 'Kind', text: 'Wie endete die Geschichte?' },
    { speaker: 'Oma', text: 'Am Ende kehrte er als Held nach Hause zurück.' }
  ], 'Präteritum der unregelmäßigen Verben', "Im geschriebenen Deutsch, besonders in Erzählungen und Märchen, wird das Präteritum bevorzugt. Unregelmäßige Verben ändern den Stammvokal: gehen-ging, kommen-kam, sehen-sah, sagen-sagte.", [
    { sentence: 'Er ging langsam nach Hause.', note: 'Präteritum von gehen.' },
    { sentence: 'Sie kam spät an.', note: 'Präteritum von kommen.' },
    { sentence: 'Wir sahen einen schönen Sonnenuntergang.', note: 'Präteritum von sehen.' },
    { sentence: 'Er fand das Buch interessant.', note: 'Präteritum von finden.' },
    { sentence: 'Sie wusste die Antwort nicht.', note: 'Präteritum von wissen.' }
  ], [
    { question: "Was bedeutet \"es war einmal\"?", options: ["once upon a time", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"erzählen\"?", options: ["to tell (a story)", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"die Geschichte\"?", options: ["the story", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"ging\"?", options: ["went (Präteritum of gehen)", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"kam\"?", options: ["came (Präteritum of kommen)", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 },
    { question: "Was bedeutet \"sah\"?", options: ["saw (Präteritum of sehen)", "Falsch 1", "Falsch 2", "Falsch 3"], correct: 0 }
  ], [
    { question: "Frage zum Dialog 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Frage zum Dialog 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 }
  ], [
    { question: "Vervollständige die Regel 1:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 2:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 3:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 4:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
    { question: "Vervollständige die Regel 5:", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 }
  ], [
    { question: "Prüfungsfrage 1 zu Präteritum — Erzählen wie im Buch:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 2 zu Präteritum — Erzählen wie im Buch:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 3 zu Präteritum — Erzählen wie im Buch:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 4 zu Präteritum — Erzählen wie im Buch:", options: ["A", "B", "C", "D"], correct: 3 },
    { question: "Prüfungsfrage 5 zu Präteritum — Erzählen wie im Buch:", options: ["A", "B", "C", "D"], correct: 3 }
  ], [
    { question: "Hausaufgabe 1 zu Präteritum — Erzählen wie im Buch:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 2 zu Präteritum — Erzählen wie im Buch:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 3 zu Präteritum — Erzählen wie im Buch:", options: ["A", "B", "C", "D"], correct: 0 },
    { question: "Hausaufgabe 4 zu Präteritum — Erzählen wie im Buch:", options: ["A", "B", "C", "D"], correct: 0 }
  ], "N8bR1z0QmXk", "Präteritum — Erzählen wie im Buch — Deutsch lernen A2", "A short German video illustrating präteritum — erzählen wie im buch for A2 learners."),
};
