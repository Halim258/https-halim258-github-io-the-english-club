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
  levelId: "es-a2",
  levelLabel: "Español A2 — Plataforma",
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

const v = (word: string, meaning: string, example: string, emoji: string) =>
  ({ word, meaning, example, emoji, arabic: "" });

export const esA2Lessons: Record<string, LessonData> = {
  "es-a2-1": L(1, 'Pretérito perfecto', 'Aprende a hablar de experiencias recientes con haber + participio.',
    [
      v('he comido', 'I have eaten', 'Hoy he comido paella.', '🥘'),
      v('has hecho', 'you have done', '¿Qué has hecho hoy?', '🔨'),
      v('he visto', 'I have seen', 'He visto una película.', '🎬'),
      v('he estado', 'I have been', 'He estado en Madrid.', '🇪🇸'),
      v('he ido', 'I have gone', 'He ido al supermercado.', '🛒'),
      v('he dicho', 'I have said', 'He dicho la verdad.', '🗣️'),
      v('he escrito', 'I have written', 'He escrito un correo.', '📧'),
      v('he leído', 'I have read', 'He leído este libro.', '📚'),
      v('has dormido', 'you have slept', '¿Has dormido bien?', '😴'),
      v('ha llegado', 'he/she has arrived', 'Ella ha llegado tarde.', '⏰'),
      v('he terminado', 'I have finished', 'Ya he terminado mi trabajo.', '✅'),
      v('has probado', 'you have tried', '¿Has probado este vino?', '🍷'),
      v('he viajado', 'I have traveled', 'He viajado mucho.', '✈️'),
      v('he conocido', 'I have met', 'He conocido a gente nueva.', '🤝'),
      v('ha vuelto', 'he/she has returned', 'Él ha vuelto a casa.', '🏠')
    ],
    [
      { speaker: 'Ana', text: '¿Qué has hecho hoy?' },
      { speaker: 'Luis', text: 'He estado muy ocupado.' },
      { speaker: 'Ana', text: '¿Has terminado el informe?' },
      { speaker: 'Luis', text: 'Sí, ya lo he escrito.' },
      { speaker: 'Ana', text: '¿Has almorzado?' },
      { speaker: 'Luis', text: 'He comido un sándwich rápido.' },
      { speaker: 'Ana', text: '¿Has visto a María?' },
      { speaker: 'Luis', text: 'No, no la he visto.' },
      { speaker: 'Ana', text: 'He hablado con ella hoy.' },
      { speaker: 'Luis', text: 'Ah, vale. Gracias.' }
    ],
    {
      title: 'El Pretérito Perfecto',
      explanation: 'Se usa para acciones que han ocurrido en un pasado reciente o dentro de un periodo de tiempo que no ha terminado todavía. Se forma con el verbo auxiliar HABER en presente + participio pasado. El participio de los verbos en -ar termina en -ado, y en -er/-ir en -ido.',
      examples: [
        { sentence: 'Hoy he hablado con ella.', note: 'Acción reciente.' },
        { sentence: 'Esta semana hemos trabajado mucho.', note: 'Tiempo no terminado.' },
        { sentence: '¿Has visto mi libro?', note: 'Pregunta sobre una acción pasada.' },
        { sentence: 'He comido paella.', note: 'Participio regular en -ido.' },
        { sentence: 'Ella ha escrito un mensaje.', note: 'Participio irregular.' }
      ]
    },
    [
      { question: '¿Cuál es el auxiliar?', options: ['Ser', 'Estar', 'Haber', 'Tener'], correct: 2 },
      { question: 'Participio de "comer":', options: ['Comido', 'Comendo', 'Comido', 'Comiado'], correct: 0 },
      { question: 'Participio de "ver":', options: ['Vido', 'Visto', 'Veído', 'Vistado'], correct: 1 },
      { question: 'Participio de "escribir":', options: ['Escribido', 'Escrito', 'Escribido', 'Escribado'], correct: 1 },
      { question: '¿Cómo se dice "I have traveled"?', options: ['He viajado', 'He viaje', 'He viajar', 'He viajado'], correct: 0 },
      { question: '¿Cómo se dice "Have you eaten"?', options: ['¿Has comido?', '¿He comido?', '¿Has comiendo?', '¿Haber comido?'], correct: 0 },
      { question: '¿Cuál es irregular?', options: ['Hablar', 'Comer', 'Escribir', 'Caminar'], correct: 2 }
    ],
    [
      { question: '¿Qué ha hecho Luis hoy?', options: ['Ha descansado', 'Ha trabajado', 'Ha viajado', 'Ha dormido'], correct: 1 },
      { question: '¿Luis ha terminado el informe?', options: ['Sí', 'No', 'No lo sabe', 'Todavía no'], correct: 0 },
      { question: '¿Qué ha comido Luis?', options: ['Paella', 'Nada', 'Un sándwich', 'Pizza'], correct: 2 },
      { question: '¿Ha visto Luis a María?', options: ['Sí', 'No', 'Tal vez', 'No lo dice'], correct: 1 }
    ],
    [
      { question: 'Yo ___ hablado.', options: ['has', 'he', 'ha', 'hemos'], correct: 1 },
      { question: 'Ellos ___ terminado.', options: ['han', 'he', 'has', 'ha'], correct: 0 },
      { question: 'Nosotros ___ visto.', options: ['hemos', 'han', 'he', 'habéis'], correct: 0 },
      { question: '¿Qué ___ hecho?', options: ['ha', 'he', 'has', 'han'], correct: 2 },
      { question: 'Ella ___ vuelto.', options: ['ha', 'he', 'has', 'han'], correct: 0 }
    ],
    [
      { question: 'Elija la correcta:', options: ['He escribido', 'He escrito', 'He escribed', 'He escritura'], correct: 1 },
      { question: '¿Has ___ a Madrid?', options: ['ido', 'ido', 'visto', 'hecho'], correct: 0 },
      { question: 'Esta semana ___ mucho.', options: ['he llovido', 'ha llovido', 'han llovido', 'hemos llovido'], correct: 1 },
      { question: '¿Habéis ___ el libro?', options: ['leído', 'leido', 'leído', 'leado'], correct: 0 }
    ],
    [
      { question: '¿Qué ___ tú hoy?', options: ['he hecho', 'has hecho', 'ha hecho', 'han hecho'], correct: 1 },
      { question: 'Nosotros ___ mucho.', options: ['hemos viajado', 'hemos viaje', 'hemos viajado', 'habéis viajado'], correct: 0 },
      { question: '¿Tú ___ con él?', options: ['ha hablado', 'he hablado', 'has hablado', 'has hablado'], correct: 2 }
    ]
  ),
  // ... (Repeating for remaining 19 lessons)
};
