import type { LessonData } from "./lessons";

export const itA1Lessons: Record<string, LessonData> = {

  "it-a1-1": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 1,
    title: "Saluti e presentazioni",
    description: "Learn Italian greetings and how to introduce yourself",
    vocabulary: [
    { word: "Ciao", meaning: "hi/bye", example: "Ciao, come stai?", emoji: "👋", arabic: "" },
    { word: "Buongiorno", meaning: "good morning", example: "Buongiorno, signora.", emoji: "☀️", arabic: "" },
    { word: "Buonasera", meaning: "good evening", example: "Buonasera a tutti.", emoji: "🌆", arabic: "" },
    { word: "Piacere", meaning: "nice to meet you", example: "Piacere di conoscerti.", emoji: "🤝", arabic: "" },
    { word: "Mi chiamo", meaning: "my name is", example: "Mi chiamo Marco.", emoji: "🙋", arabic: "" },
    { word: "Come stai?", meaning: "how are you?", example: "Come stai oggi?", emoji: "❓", arabic: "" },
    { word: "Bene", meaning: "fine/well", example: "Sto bene, grazie.", emoji: "😊", arabic: "" },
    { word: "Grazie", meaning: "thank you", example: "Grazie mille!", emoji: "🙏", arabic: "" },
    { word: "Prego", meaning: "you're welcome", example: "Prego, di niente.", emoji: "😊", arabic: "" },
    { word: "Arrivederci", meaning: "goodbye", example: "Arrivederci a domani.", emoji: "👋", arabic: "" },
    { word: "Signore", meaning: "mister", example: "Buongiorno, signore.", emoji: "🎩", arabic: "" },
    { word: "Signora", meaning: "madam", example: "Buonasera, signora.", emoji: "👩", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di saluti e presentazioni." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "Ciao, come stai?" },
    { speaker: "B", text: "Buongiorno, signora." },
    { speaker: "A", text: "Buonasera a tutti." },
    { speaker: "B", text: "Piacere di conoscerti." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "Pronomi personali e il verbo essere",
      explanation: "In Italian, subject pronouns are often omitted because the verb ending shows who is speaking. The verb 'essere' (to be) is irregular and essential for introductions.",
      examples: [
      { sentence: "Io sono italiano.", note: "io = I" },
      { sentence: "Tu sei simpatico.", note: "tu = you (informal)" },
      { sentence: "Lei è la signora Rossi.", note: "Lei = you (formal) / she" },
      { sentence: "Noi siamo amici.", note: "noi = we" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Ciao\" in inglese?", options: ["hi/bye", "good morning", "good evening", "nice to meet you"], correct: 0 },
      { question: "Cosa significa \"Buongiorno\" in inglese?", options: ["good morning", "good evening", "nice to meet you", "my name is"], correct: 0 },
      { question: "Cosa significa \"Buonasera\" in inglese?", options: ["good evening", "nice to meet you", "my name is", "how are you?"], correct: 0 },
      { question: "Cosa significa \"Piacere\" in inglese?", options: ["nice to meet you", "my name is", "how are you?", "fine/well"], correct: 0 },
      { question: "Cosa significa \"Mi chiamo\" in inglese?", options: ["my name is", "how are you?", "fine/well", "thank you"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di sa...\")", options: ["Ciao! Parliamo di saluti e presentazioni.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao, come stai?...\")", options: ["Ciao, come stai?", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"Io sono italiano.\"?", options: ["io = I", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Tu sei simpatico.\"?", options: ["tu = you (informal)", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Lei è la signora Rossi.\"?", options: ["Lei = you (formal) / she", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Noi siamo amici.\"?", options: ["noi = we", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"my name is\"", options: ["Mi chiamo", "Come stai?", "Bene", "Grazie"], correct: 0 },
      { question: "Traduci in italiano: \"how are you?\"", options: ["Come stai?", "Bene", "Grazie", "Prego"], correct: 0 },
      { question: "Traduci in italiano: \"fine/well\"", options: ["Bene", "Grazie", "Prego", "Arrivederci"], correct: 0 },
      { question: "Traduci in italiano: \"thank you\"", options: ["Grazie", "Prego", "Arrivederci", "Signore"], correct: 0 },
      { question: "Traduci in italiano: \"you're welcome\"", options: ["Prego", "Arrivederci", "Signore", "Signora"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Prego\"?", options: ["you're welcome", "goodbye", "mister", "madam"], correct: 0 },
      { question: "Cosa significa \"Arrivederci\"?", options: ["goodbye", "mister", "madam", "hi/bye"], correct: 0 },
      { question: "Cosa significa \"Signore\"?", options: ["mister", "madam", "hi/bye", "good morning"], correct: 0 },
      { question: "Cosa significa \"Signora\"?", options: ["madam", "hi/bye", "good morning", "good evening"], correct: 0 }
    ],
    youtubeId: "dQw4w9WgXcQ",
    videoTitle: "Saluti e presentazioni - Video Lezione",
    videoContext: "Guarda questo video per approfondire: saluti e presentazioni."
  },

  "it-a1-2": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 2,
    title: "I numeri e l'età",
    description: "Learn numbers 0-100 and how to talk about age",
    vocabulary: [
    { word: "Zero", meaning: "zero", example: "Il numero è zero.", emoji: "0️⃣", arabic: "" },
    { word: "Uno", meaning: "one", example: "Ho uno zaino.", emoji: "1️⃣", arabic: "" },
    { word: "Dieci", meaning: "ten", example: "Ho dieci euro.", emoji: "🔟", arabic: "" },
    { word: "Venti", meaning: "twenty", example: "Ho venti anni.", emoji: "2️⃣0️⃣", arabic: "" },
    { word: "Cento", meaning: "hundred", example: "Costa cento euro.", emoji: "💯", arabic: "" },
    { word: "Età", meaning: "age", example: "Qual è la tua età?", emoji: "🎂", arabic: "" },
    { word: "Anno", meaning: "year", example: "Ho ventidue anni.", emoji: "📅", arabic: "" },
    { word: "Quanti", meaning: "how many", example: "Quanti anni hai?", emoji: "❓", arabic: "" },
    { word: "Compleanno", meaning: "birthday", example: "Buon compleanno!", emoji: "🎉", arabic: "" },
    { word: "Giovane", meaning: "young", example: "Sei molto giovane.", emoji: "👶", arabic: "" },
    { word: "Vecchio", meaning: "old", example: "Mio nonno è vecchio.", emoji: "👴", arabic: "" },
    { word: "Numero", meaning: "number", example: "Qual è il tuo numero?", emoji: "🔢", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di i numeri e l'età." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "Il numero è zero." },
    { speaker: "B", text: "Ho uno zaino." },
    { speaker: "A", text: "Ho dieci euro." },
    { speaker: "B", text: "Ho venti anni." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "Il verbo avere per l'età",
      explanation: "In Italian, age is expressed with the verb 'avere' (to have), not 'essere' as in English 'to be'.",
      examples: [
      { sentence: "Ho venti anni.", note: "I have twenty years = I am 20" },
      { sentence: "Quanti anni hai?", note: "How old are you?" },
      { sentence: "Lei ha trent'anni.", note: "She has thirty years" },
      { sentence: "Noi abbiamo due figli.", note: "We have two children" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Zero\" in inglese?", options: ["zero", "one", "ten", "twenty"], correct: 0 },
      { question: "Cosa significa \"Uno\" in inglese?", options: ["one", "ten", "twenty", "hundred"], correct: 0 },
      { question: "Cosa significa \"Dieci\" in inglese?", options: ["ten", "twenty", "hundred", "age"], correct: 0 },
      { question: "Cosa significa \"Venti\" in inglese?", options: ["twenty", "hundred", "age", "year"], correct: 0 },
      { question: "Cosa significa \"Cento\" in inglese?", options: ["hundred", "age", "year", "how many"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di i ...\")", options: ["Ciao! Parliamo di i numeri e l'età.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Il numero è zero....\")", options: ["Il numero è zero.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"Ho venti anni.\"?", options: ["I have twenty years = I am 20", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Quanti anni hai?\"?", options: ["How old are you?", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Lei ha trent'anni.\"?", options: ["She has thirty years", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Noi abbiamo due figli.\"?", options: ["We have two children", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"hundred\"", options: ["Cento", "Età", "Anno", "Quanti"], correct: 0 },
      { question: "Traduci in italiano: \"age\"", options: ["Età", "Anno", "Quanti", "Compleanno"], correct: 0 },
      { question: "Traduci in italiano: \"year\"", options: ["Anno", "Quanti", "Compleanno", "Giovane"], correct: 0 },
      { question: "Traduci in italiano: \"how many\"", options: ["Quanti", "Compleanno", "Giovane", "Vecchio"], correct: 0 },
      { question: "Traduci in italiano: \"birthday\"", options: ["Compleanno", "Giovane", "Vecchio", "Numero"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Compleanno\"?", options: ["birthday", "young", "old", "number"], correct: 0 },
      { question: "Cosa significa \"Giovane\"?", options: ["young", "old", "number", "zero"], correct: 0 },
      { question: "Cosa significa \"Vecchio\"?", options: ["old", "number", "zero", "one"], correct: 0 },
      { question: "Cosa significa \"Numero\"?", options: ["number", "zero", "one", "ten"], correct: 0 }
    ],
    youtubeId: "kJQP7kiw5Fk",
    videoTitle: "I numeri e l'età - Video Lezione",
    videoContext: "Guarda questo video per approfondire: i numeri e l'età."
  },

  "it-a1-3": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 3,
    title: "La famiglia",
    description: "Learn family member vocabulary and possessive adjectives",
    vocabulary: [
    { word: "Famiglia", meaning: "family", example: "La mia famiglia è grande.", emoji: "👨‍👩‍👧‍👦", arabic: "" },
    { word: "Madre", meaning: "mother", example: "Mia madre cucina bene.", emoji: "👩", arabic: "" },
    { word: "Padre", meaning: "father", example: "Mio padre lavora molto.", emoji: "👨", arabic: "" },
    { word: "Fratello", meaning: "brother", example: "Ho un fratello.", emoji: "👦", arabic: "" },
    { word: "Sorella", meaning: "sister", example: "Mia sorella studia.", emoji: "👧", arabic: "" },
    { word: "Figlio", meaning: "son", example: "Il mio figlio gioca.", emoji: "👶", arabic: "" },
    { word: "Figlia", meaning: "daughter", example: "La mia figlia legge.", emoji: "👧", arabic: "" },
    { word: "Nonno", meaning: "grandfather", example: "Mio nonno racconta storie.", emoji: "👴", arabic: "" },
    { word: "Nonna", meaning: "grandmother", example: "Mia nonna cucina la torta.", emoji: "👵", arabic: "" },
    { word: "Marito", meaning: "husband", example: "Il mio marito lavora qui.", emoji: "🤵", arabic: "" },
    { word: "Moglie", meaning: "wife", example: "La mia moglie è medico.", emoji: "👰", arabic: "" },
    { word: "Genitori", meaning: "parents", example: "I miei genitori sono felici.", emoji: "👪", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di la famiglia." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "La mia famiglia è grande." },
    { speaker: "B", text: "Mia madre cucina bene." },
    { speaker: "A", text: "Mio padre lavora molto." },
    { speaker: "B", text: "Ho un fratello." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "Aggettivi possessivi",
      explanation: "Possessive adjectives agree in gender and number with the noun they modify, not with the owner.",
      examples: [
      { sentence: "Mia madre è gentile.", note: "my mother (feminine)" },
      { sentence: "Il mio fratello studia.", note: "my brother (masculine)" },
      { sentence: "I miei genitori sono a casa.", note: "my parents (plural)" },
      { sentence: "Le tue sorelle sono simpatiche.", note: "your sisters" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Famiglia\" in inglese?", options: ["family", "mother", "father", "brother"], correct: 0 },
      { question: "Cosa significa \"Madre\" in inglese?", options: ["mother", "father", "brother", "sister"], correct: 0 },
      { question: "Cosa significa \"Padre\" in inglese?", options: ["father", "brother", "sister", "son"], correct: 0 },
      { question: "Cosa significa \"Fratello\" in inglese?", options: ["brother", "sister", "son", "daughter"], correct: 0 },
      { question: "Cosa significa \"Sorella\" in inglese?", options: ["sister", "son", "daughter", "grandfather"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di la...\")", options: ["Ciao! Parliamo di la famiglia.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"La mia famiglia è gr...\")", options: ["La mia famiglia è grande.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"Mia madre è gentile.\"?", options: ["my mother (feminine)", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Il mio fratello studia.\"?", options: ["my brother (masculine)", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"I miei genitori sono a casa.\"?", options: ["my parents (plural)", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Le tue sorelle sono simpatiche.\"?", options: ["your sisters", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"sister\"", options: ["Sorella", "Figlio", "Figlia", "Nonno"], correct: 0 },
      { question: "Traduci in italiano: \"son\"", options: ["Figlio", "Figlia", "Nonno", "Nonna"], correct: 0 },
      { question: "Traduci in italiano: \"daughter\"", options: ["Figlia", "Nonno", "Nonna", "Marito"], correct: 0 },
      { question: "Traduci in italiano: \"grandfather\"", options: ["Nonno", "Nonna", "Marito", "Moglie"], correct: 0 },
      { question: "Traduci in italiano: \"grandmother\"", options: ["Nonna", "Marito", "Moglie", "Genitori"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Nonna\"?", options: ["grandmother", "husband", "wife", "parents"], correct: 0 },
      { question: "Cosa significa \"Marito\"?", options: ["husband", "wife", "parents", "family"], correct: 0 },
      { question: "Cosa significa \"Moglie\"?", options: ["wife", "parents", "family", "mother"], correct: 0 },
      { question: "Cosa significa \"Genitori\"?", options: ["parents", "family", "mother", "father"], correct: 0 }
    ],
    youtubeId: "3JZ_D3ELwOQ",
    videoTitle: "La famiglia - Video Lezione",
    videoContext: "Guarda questo video per approfondire: la famiglia."
  },

  "it-a1-4": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 4,
    title: "Cibo e bevande",
    description: "Learn food and drink vocabulary with articles",
    vocabulary: [
    { word: "Pane", meaning: "bread", example: "Mangio il pane.", emoji: "🍞", arabic: "" },
    { word: "Acqua", meaning: "water", example: "Bevo acqua fresca.", emoji: "💧", arabic: "" },
    { word: "Vino", meaning: "wine", example: "Bevo un bicchiere di vino.", emoji: "🍷", arabic: "" },
    { word: "Pasta", meaning: "pasta", example: "Mangio la pasta.", emoji: "🍝", arabic: "" },
    { word: "Frutta", meaning: "fruit", example: "Mi piace la frutta.", emoji: "🍎", arabic: "" },
    { word: "Verdura", meaning: "vegetables", example: "Mangio la verdura.", emoji: "🥦", arabic: "" },
    { word: "Latte", meaning: "milk", example: "Bevo il latte.", emoji: "🥛", arabic: "" },
    { word: "Caffè", meaning: "coffee", example: "Prendo un caffè.", emoji: "☕", arabic: "" },
    { word: "Formaggio", meaning: "cheese", example: "Mi piace il formaggio.", emoji: "🧀", arabic: "" },
    { word: "Carne", meaning: "meat", example: "Non mangio la carne.", emoji: "🍖", arabic: "" },
    { word: "Zucchero", meaning: "sugar", example: "Metto zucchero nel caffè.", emoji: "🍬", arabic: "" },
    { word: "Colazione", meaning: "breakfast", example: "Faccio colazione presto.", emoji: "🍳", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di cibo e bevande." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "Mangio il pane." },
    { speaker: "B", text: "Bevo acqua fresca." },
    { speaker: "A", text: "Bevo un bicchiere di vino." },
    { speaker: "B", text: "Mangio la pasta." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "Verbi mangiare e bere con articoli",
      explanation: "The verbs 'mangiare' (to eat) and 'bere' (to drink) are commonly used with definite and indefinite articles before food nouns.",
      examples: [
      { sentence: "Mangio la pasta ogni giorno.", note: "I eat pasta every day" },
      { sentence: "Bevo un caffè.", note: "I drink a coffee" },
      { sentence: "Lei mangia una mela.", note: "She eats an apple" },
      { sentence: "Noi beviamo il vino.", note: "We drink wine" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Pane\" in inglese?", options: ["bread", "water", "wine", "pasta"], correct: 0 },
      { question: "Cosa significa \"Acqua\" in inglese?", options: ["water", "wine", "pasta", "fruit"], correct: 0 },
      { question: "Cosa significa \"Vino\" in inglese?", options: ["wine", "pasta", "fruit", "vegetables"], correct: 0 },
      { question: "Cosa significa \"Pasta\" in inglese?", options: ["pasta", "fruit", "vegetables", "milk"], correct: 0 },
      { question: "Cosa significa \"Frutta\" in inglese?", options: ["fruit", "vegetables", "milk", "coffee"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di ci...\")", options: ["Ciao! Parliamo di cibo e bevande.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Mangio il pane....\")", options: ["Mangio il pane.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"Mangio la pasta ogni giorno.\"?", options: ["I eat pasta every day", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Bevo un caffè.\"?", options: ["I drink a coffee", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Lei mangia una mela.\"?", options: ["She eats an apple", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Noi beviamo il vino.\"?", options: ["We drink wine", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"fruit\"", options: ["Frutta", "Verdura", "Latte", "Caffè"], correct: 0 },
      { question: "Traduci in italiano: \"vegetables\"", options: ["Verdura", "Latte", "Caffè", "Formaggio"], correct: 0 },
      { question: "Traduci in italiano: \"milk\"", options: ["Latte", "Caffè", "Formaggio", "Carne"], correct: 0 },
      { question: "Traduci in italiano: \"coffee\"", options: ["Caffè", "Formaggio", "Carne", "Zucchero"], correct: 0 },
      { question: "Traduci in italiano: \"cheese\"", options: ["Formaggio", "Carne", "Zucchero", "Colazione"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Formaggio\"?", options: ["cheese", "meat", "sugar", "breakfast"], correct: 0 },
      { question: "Cosa significa \"Carne\"?", options: ["meat", "sugar", "breakfast", "bread"], correct: 0 },
      { question: "Cosa significa \"Zucchero\"?", options: ["sugar", "breakfast", "bread", "water"], correct: 0 },
      { question: "Cosa significa \"Colazione\"?", options: ["breakfast", "bread", "water", "wine"], correct: 0 }
    ],
    youtubeId: "9bZkp7q19f0",
    videoTitle: "Cibo e bevande - Video Lezione",
    videoContext: "Guarda questo video per approfondire: cibo e bevande."
  },

  "it-a1-5": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 5,
    title: "Al ristorante",
    description: "Learn restaurant vocabulary and how to order food",
    vocabulary: [
    { word: "Ristorante", meaning: "restaurant", example: "Andiamo al ristorante.", emoji: "🍽️", arabic: "" },
    { word: "Menù", meaning: "menu", example: "Posso vedere il menù?", emoji: "📋", arabic: "" },
    { word: "Cameriere", meaning: "waiter", example: "Il cameriere è gentile.", emoji: "🧑‍🍳", arabic: "" },
    { word: "Conto", meaning: "bill", example: "Vorrei il conto.", emoji: "🧾", arabic: "" },
    { word: "Prenotazione", meaning: "reservation", example: "Ho una prenotazione.", emoji: "📞", arabic: "" },
    { word: "Antipasto", meaning: "appetizer", example: "Prendo un antipasto.", emoji: "🥗", arabic: "" },
    { word: "Primo", meaning: "first course", example: "Il primo è delizioso.", emoji: "🍜", arabic: "" },
    { word: "Secondo", meaning: "main course", example: "Vorrei un secondo.", emoji: "🍗", arabic: "" },
    { word: "Dolce", meaning: "dessert", example: "Prendo un dolce.", emoji: "🍰", arabic: "" },
    { word: "Tavolo", meaning: "table", example: "Vorrei un tavolo per due.", emoji: "🍽️", arabic: "" },
    { word: "Ordinare", meaning: "to order", example: "Vorrei ordinare.", emoji: "📝", arabic: "" },
    { word: "Delizioso", meaning: "delicious", example: "Il piatto è delizioso.", emoji: "😋", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di al ristorante." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "Andiamo al ristorante." },
    { speaker: "B", text: "Posso vedere il menù?" },
    { speaker: "A", text: "Il cameriere è gentile." },
    { speaker: "B", text: "Vorrei il conto." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "Vorrei per ordinare",
      explanation: "'Vorrei' (I would like) is the polite conditional form of 'volere' used for ordering food politely.",
      examples: [
      { sentence: "Vorrei una pizza, per favore.", note: "I would like a pizza, please" },
      { sentence: "Vorremmo il conto.", note: "We would like the bill" },
      { sentence: "Cosa vorrebbe ordinare?", note: "What would you like to order?" },
      { sentence: "Vorrei un tavolo per due.", note: "I would like a table for two" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Ristorante\" in inglese?", options: ["restaurant", "menu", "waiter", "bill"], correct: 0 },
      { question: "Cosa significa \"Menù\" in inglese?", options: ["menu", "waiter", "bill", "reservation"], correct: 0 },
      { question: "Cosa significa \"Cameriere\" in inglese?", options: ["waiter", "bill", "reservation", "appetizer"], correct: 0 },
      { question: "Cosa significa \"Conto\" in inglese?", options: ["bill", "reservation", "appetizer", "first course"], correct: 0 },
      { question: "Cosa significa \"Prenotazione\" in inglese?", options: ["reservation", "appetizer", "first course", "main course"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di al...\")", options: ["Ciao! Parliamo di al ristorante.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Andiamo al ristorant...\")", options: ["Andiamo al ristorante.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"Vorrei una pizza, per favore.\"?", options: ["I would like a pizza, please", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Vorremmo il conto.\"?", options: ["We would like the bill", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Cosa vorrebbe ordinare?\"?", options: ["What would you like to order?", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Vorrei un tavolo per due.\"?", options: ["I would like a table for two", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"reservation\"", options: ["Prenotazione", "Antipasto", "Primo", "Secondo"], correct: 0 },
      { question: "Traduci in italiano: \"appetizer\"", options: ["Antipasto", "Primo", "Secondo", "Dolce"], correct: 0 },
      { question: "Traduci in italiano: \"first course\"", options: ["Primo", "Secondo", "Dolce", "Tavolo"], correct: 0 },
      { question: "Traduci in italiano: \"main course\"", options: ["Secondo", "Dolce", "Tavolo", "Ordinare"], correct: 0 },
      { question: "Traduci in italiano: \"dessert\"", options: ["Dolce", "Tavolo", "Ordinare", "Delizioso"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Dolce\"?", options: ["dessert", "table", "to order", "delicious"], correct: 0 },
      { question: "Cosa significa \"Tavolo\"?", options: ["table", "to order", "delicious", "restaurant"], correct: 0 },
      { question: "Cosa significa \"Ordinare\"?", options: ["to order", "delicious", "restaurant", "menu"], correct: 0 },
      { question: "Cosa significa \"Delizioso\"?", options: ["delicious", "restaurant", "menu", "waiter"], correct: 0 }
    ],
    youtubeId: "fJ9rUzIMcZQ",
    videoTitle: "Al ristorante - Video Lezione",
    videoContext: "Guarda questo video per approfondire: al ristorante."
  },

  "it-a1-6": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 6,
    title: "L'ora e i giorni",
    description: "Learn to tell time and name the days of the week",
    vocabulary: [
    { word: "Ora", meaning: "hour/time", example: "Che ora è?", emoji: "🕐", arabic: "" },
    { word: "Minuto", meaning: "minute", example: "Aspetta un minuto.", emoji: "⏱️", arabic: "" },
    { word: "Lunedì", meaning: "Monday", example: "Lunedì lavoro.", emoji: "📅", arabic: "" },
    { word: "Martedì", meaning: "Tuesday", example: "Martedì studio.", emoji: "📅", arabic: "" },
    { word: "Mercoledì", meaning: "Wednesday", example: "Mercoledì riposo.", emoji: "📅", arabic: "" },
    { word: "Giovedì", meaning: "Thursday", example: "Giovedì viaggio.", emoji: "📅", arabic: "" },
    { word: "Venerdì", meaning: "Friday", example: "Venerdì esco.", emoji: "📅", arabic: "" },
    { word: "Sabato", meaning: "Saturday", example: "Sabato dormo.", emoji: "📅", arabic: "" },
    { word: "Domenica", meaning: "Sunday", example: "Domenica cucino.", emoji: "📅", arabic: "" },
    { word: "Mezzogiorno", meaning: "noon", example: "Pranzo a mezzogiorno.", emoji: "🕛", arabic: "" },
    { word: "Mezzanotte", meaning: "midnight", example: "Torno a mezzanotte.", emoji: "🕛", arabic: "" },
    { word: "Settimana", meaning: "week", example: "Lavoro tutta la settimana.", emoji: "📆", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di l'ora e i giorni." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "Che ora è?" },
    { speaker: "B", text: "Aspetta un minuto." },
    { speaker: "A", text: "Lunedì lavoro." },
    { speaker: "B", text: "Martedì studio." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "Che ore sono?",
      explanation: "To ask the time in Italian we say 'Che ore sono?' and answer using 'Sono le...' for most hours, but 'È l'una' for one o'clock.",
      examples: [
      { sentence: "Che ore sono?", note: "What time is it?" },
      { sentence: "Sono le tre.", note: "It is three o'clock" },
      { sentence: "È l'una e mezza.", note: "It is half past one" },
      { sentence: "Oggi è lunedì.", note: "Today is Monday" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Ora\" in inglese?", options: ["hour/time", "minute", "Monday", "Tuesday"], correct: 0 },
      { question: "Cosa significa \"Minuto\" in inglese?", options: ["minute", "Monday", "Tuesday", "Wednesday"], correct: 0 },
      { question: "Cosa significa \"Lunedì\" in inglese?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], correct: 0 },
      { question: "Cosa significa \"Martedì\" in inglese?", options: ["Tuesday", "Wednesday", "Thursday", "Friday"], correct: 0 },
      { question: "Cosa significa \"Mercoledì\" in inglese?", options: ["Wednesday", "Thursday", "Friday", "Saturday"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di l'...\")", options: ["Ciao! Parliamo di l'ora e i giorni.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Che ora è?...\")", options: ["Che ora è?", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"Che ore sono?\"?", options: ["What time is it?", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Sono le tre.\"?", options: ["It is three o'clock", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"È l'una e mezza.\"?", options: ["It is half past one", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Oggi è lunedì.\"?", options: ["Today is Monday", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"Wednesday\"", options: ["Mercoledì", "Giovedì", "Venerdì", "Sabato"], correct: 0 },
      { question: "Traduci in italiano: \"Thursday\"", options: ["Giovedì", "Venerdì", "Sabato", "Domenica"], correct: 0 },
      { question: "Traduci in italiano: \"Friday\"", options: ["Venerdì", "Sabato", "Domenica", "Mezzogiorno"], correct: 0 },
      { question: "Traduci in italiano: \"Saturday\"", options: ["Sabato", "Domenica", "Mezzogiorno", "Mezzanotte"], correct: 0 },
      { question: "Traduci in italiano: \"Sunday\"", options: ["Domenica", "Mezzogiorno", "Mezzanotte", "Settimana"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Domenica\"?", options: ["Sunday", "noon", "midnight", "week"], correct: 0 },
      { question: "Cosa significa \"Mezzogiorno\"?", options: ["noon", "midnight", "week", "hour/time"], correct: 0 },
      { question: "Cosa significa \"Mezzanotte\"?", options: ["midnight", "week", "hour/time", "minute"], correct: 0 },
      { question: "Cosa significa \"Settimana\"?", options: ["week", "hour/time", "minute", "Monday"], correct: 0 }
    ],
    youtubeId: "L_jWHffIx5E",
    videoTitle: "L'ora e i giorni - Video Lezione",
    videoContext: "Guarda questo video per approfondire: l'ora e i giorni."
  },

  "it-a1-7": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 7,
    title: "La casa e i mobili",
    description: "Learn house and furniture vocabulary",
    vocabulary: [
    { word: "Casa", meaning: "house", example: "La mia casa è grande.", emoji: "🏠", arabic: "" },
    { word: "Camera", meaning: "bedroom", example: "La camera è piccola.", emoji: "🛏️", arabic: "" },
    { word: "Cucina", meaning: "kitchen", example: "La cucina è nuova.", emoji: "🍳", arabic: "" },
    { word: "Bagno", meaning: "bathroom", example: "Il bagno è pulito.", emoji: "🛁", arabic: "" },
    { word: "Salotto", meaning: "living room", example: "Guardiamo la TV nel salotto.", emoji: "🛋️", arabic: "" },
    { word: "Tavolo", meaning: "table", example: "Il tavolo è di legno.", emoji: "🪑", arabic: "" },
    { word: "Sedia", meaning: "chair", example: "La sedia è comoda.", emoji: "🪑", arabic: "" },
    { word: "Letto", meaning: "bed", example: "Il letto è comodo.", emoji: "🛏️", arabic: "" },
    { word: "Armadio", meaning: "wardrobe", example: "L'armadio è pieno.", emoji: "🚪", arabic: "" },
    { word: "Finestra", meaning: "window", example: "La finestra è aperta.", emoji: "🪟", arabic: "" },
    { word: "Porta", meaning: "door", example: "La porta è chiusa.", emoji: "🚪", arabic: "" },
    { word: "Divano", meaning: "sofa", example: "Il divano è morbido.", emoji: "🛋️", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di la casa e i mobili." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "La mia casa è grande." },
    { speaker: "B", text: "La camera è piccola." },
    { speaker: "A", text: "La cucina è nuova." },
    { speaker: "B", text: "Il bagno è pulito." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "C'è / Ci sono",
      explanation: "'C'è' (there is) is used for singular nouns, and 'ci sono' (there are) for plural nouns to describe existence or presence.",
      examples: [
      { sentence: "C'è un letto in camera.", note: "There is a bed in the room" },
      { sentence: "Ci sono due sedie.", note: "There are two chairs" },
      { sentence: "Non c'è il divano.", note: "There isn't a sofa" },
      { sentence: "Ci sono molte finestre.", note: "There are many windows" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Casa\" in inglese?", options: ["house", "bedroom", "kitchen", "bathroom"], correct: 0 },
      { question: "Cosa significa \"Camera\" in inglese?", options: ["bedroom", "kitchen", "bathroom", "living room"], correct: 0 },
      { question: "Cosa significa \"Cucina\" in inglese?", options: ["kitchen", "bathroom", "living room", "table"], correct: 0 },
      { question: "Cosa significa \"Bagno\" in inglese?", options: ["bathroom", "living room", "table", "chair"], correct: 0 },
      { question: "Cosa significa \"Salotto\" in inglese?", options: ["living room", "table", "chair", "bed"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di la...\")", options: ["Ciao! Parliamo di la casa e i mobili.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"La mia casa è grande...\")", options: ["La mia casa è grande.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"C'è un letto in camera.\"?", options: ["There is a bed in the room", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Ci sono due sedie.\"?", options: ["There are two chairs", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Non c'è il divano.\"?", options: ["There isn't a sofa", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Ci sono molte finestre.\"?", options: ["There are many windows", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"living room\"", options: ["Salotto", "Tavolo", "Sedia", "Letto"], correct: 0 },
      { question: "Traduci in italiano: \"table\"", options: ["Tavolo", "Sedia", "Letto", "Armadio"], correct: 0 },
      { question: "Traduci in italiano: \"chair\"", options: ["Sedia", "Letto", "Armadio", "Finestra"], correct: 0 },
      { question: "Traduci in italiano: \"bed\"", options: ["Letto", "Armadio", "Finestra", "Porta"], correct: 0 },
      { question: "Traduci in italiano: \"wardrobe\"", options: ["Armadio", "Finestra", "Porta", "Divano"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Armadio\"?", options: ["wardrobe", "window", "door", "sofa"], correct: 0 },
      { question: "Cosa significa \"Finestra\"?", options: ["window", "door", "sofa", "house"], correct: 0 },
      { question: "Cosa significa \"Porta\"?", options: ["door", "sofa", "house", "bedroom"], correct: 0 },
      { question: "Cosa significa \"Divano\"?", options: ["sofa", "house", "bedroom", "kitchen"], correct: 0 }
    ],
    youtubeId: "RgKAFK5djSk",
    videoTitle: "La casa e i mobili - Video Lezione",
    videoContext: "Guarda questo video per approfondire: la casa e i mobili."
  },

  "it-a1-8": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 8,
    title: "In città",
    description: "Learn vocabulary for places in the city and prepositions",
    vocabulary: [
    { word: "Città", meaning: "city", example: "Vivo in una città grande.", emoji: "🏙️", arabic: "" },
    { word: "Banca", meaning: "bank", example: "Vado in banca.", emoji: "🏦", arabic: "" },
    { word: "Scuola", meaning: "school", example: "Studio a scuola.", emoji: "🏫", arabic: "" },
    { word: "Ospedale", meaning: "hospital", example: "L'ospedale è vicino.", emoji: "🏥", arabic: "" },
    { word: "Chiesa", meaning: "church", example: "La chiesa è antica.", emoji: "⛪", arabic: "" },
    { word: "Piazza", meaning: "square", example: "Ci vediamo in piazza.", emoji: "🏛️", arabic: "" },
    { word: "Negozio", meaning: "shop", example: "Il negozio è aperto.", emoji: "🏬", arabic: "" },
    { word: "Farmacia", meaning: "pharmacy", example: "Vado in farmacia.", emoji: "💊", arabic: "" },
    { word: "Museo", meaning: "museum", example: "Visitiamo il museo.", emoji: "🏛️", arabic: "" },
    { word: "Parco", meaning: "park", example: "Corriamo nel parco.", emoji: "🌳", arabic: "" },
    { word: "Strada", meaning: "street", example: "La strada è lunga.", emoji: "🛣️", arabic: "" },
    { word: "Ufficio", meaning: "office", example: "Lavoro in ufficio.", emoji: "🏢", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di in città." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "Vivo in una città grande." },
    { speaker: "B", text: "Vado in banca." },
    { speaker: "A", text: "Studio a scuola." },
    { speaker: "B", text: "L'ospedale è vicino." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "Preposizioni a e in",
      explanation: "'A' is used with cities, while 'in' is used with countries and enclosed places like buildings.",
      examples: [
      { sentence: "Vado a Roma.", note: "I go to Rome" },
      { sentence: "Vivo in Italia.", note: "I live in Italy" },
      { sentence: "Sono in banca.", note: "I am at the bank" },
      { sentence: "Studio a scuola.", note: "I study at school" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Città\" in inglese?", options: ["city", "bank", "school", "hospital"], correct: 0 },
      { question: "Cosa significa \"Banca\" in inglese?", options: ["bank", "school", "hospital", "church"], correct: 0 },
      { question: "Cosa significa \"Scuola\" in inglese?", options: ["school", "hospital", "church", "square"], correct: 0 },
      { question: "Cosa significa \"Ospedale\" in inglese?", options: ["hospital", "church", "square", "shop"], correct: 0 },
      { question: "Cosa significa \"Chiesa\" in inglese?", options: ["church", "square", "shop", "pharmacy"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di in...\")", options: ["Ciao! Parliamo di in città.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Vivo in una città gr...\")", options: ["Vivo in una città grande.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"Vado a Roma.\"?", options: ["I go to Rome", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Vivo in Italia.\"?", options: ["I live in Italy", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Sono in banca.\"?", options: ["I am at the bank", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Studio a scuola.\"?", options: ["I study at school", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"church\"", options: ["Chiesa", "Piazza", "Negozio", "Farmacia"], correct: 0 },
      { question: "Traduci in italiano: \"square\"", options: ["Piazza", "Negozio", "Farmacia", "Museo"], correct: 0 },
      { question: "Traduci in italiano: \"shop\"", options: ["Negozio", "Farmacia", "Museo", "Parco"], correct: 0 },
      { question: "Traduci in italiano: \"pharmacy\"", options: ["Farmacia", "Museo", "Parco", "Strada"], correct: 0 },
      { question: "Traduci in italiano: \"museum\"", options: ["Museo", "Parco", "Strada", "Ufficio"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Museo\"?", options: ["museum", "park", "street", "office"], correct: 0 },
      { question: "Cosa significa \"Parco\"?", options: ["park", "street", "office", "city"], correct: 0 },
      { question: "Cosa significa \"Strada\"?", options: ["street", "office", "city", "bank"], correct: 0 },
      { question: "Cosa significa \"Ufficio\"?", options: ["office", "city", "bank", "school"], correct: 0 }
    ],
    youtubeId: "OPf0YbXqDm0",
    videoTitle: "In città - Video Lezione",
    videoContext: "Guarda questo video per approfondire: in città."
  },

  "it-a1-9": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 9,
    title: "Mezzi di trasporto",
    description: "Learn transportation vocabulary and the verb andare",
    vocabulary: [
    { word: "Treno", meaning: "train", example: "Vado in treno.", emoji: "🚆", arabic: "" },
    { word: "Autobus", meaning: "bus", example: "Prendo l'autobus.", emoji: "🚌", arabic: "" },
    { word: "Macchina", meaning: "car", example: "Vado in macchina.", emoji: "🚗", arabic: "" },
    { word: "Aereo", meaning: "airplane", example: "Viaggio in aereo.", emoji: "✈️", arabic: "" },
    { word: "Bicicletta", meaning: "bicycle", example: "Vado in bicicletta.", emoji: "🚲", arabic: "" },
    { word: "Taxi", meaning: "taxi", example: "Prendo un taxi.", emoji: "🚕", arabic: "" },
    { word: "Nave", meaning: "ship", example: "Viaggiamo in nave.", emoji: "🚢", arabic: "" },
    { word: "Metro", meaning: "subway", example: "Prendo la metro.", emoji: "🚇", arabic: "" },
    { word: "Biglietto", meaning: "ticket", example: "Compro un biglietto.", emoji: "🎫", arabic: "" },
    { word: "Stazione", meaning: "station", example: "La stazione è vicina.", emoji: "🚉", arabic: "" },
    { word: "Aeroporto", meaning: "airport", example: "Vado all'aeroporto.", emoji: "🛫", arabic: "" },
    { word: "Piedi", meaning: "feet/on foot", example: "Vado a piedi.", emoji: "🚶", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di mezzi di trasporto." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "Vado in treno." },
    { speaker: "B", text: "Prendo l'autobus." },
    { speaker: "A", text: "Vado in macchina." },
    { speaker: "B", text: "Viaggio in aereo." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "Il verbo andare con i mezzi",
      explanation: "The verb 'andare' (to go) is used with the preposition 'in' for most means of transport, and 'a' for going on foot.",
      examples: [
      { sentence: "Vado in treno.", note: "I go by train" },
      { sentence: "Vai in autobus?", note: "Do you go by bus?" },
      { sentence: "Andiamo a piedi.", note: "We go on foot" },
      { sentence: "Lei va in macchina.", note: "She goes by car" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Treno\" in inglese?", options: ["train", "bus", "car", "airplane"], correct: 0 },
      { question: "Cosa significa \"Autobus\" in inglese?", options: ["bus", "car", "airplane", "bicycle"], correct: 0 },
      { question: "Cosa significa \"Macchina\" in inglese?", options: ["car", "airplane", "bicycle", "taxi"], correct: 0 },
      { question: "Cosa significa \"Aereo\" in inglese?", options: ["airplane", "bicycle", "taxi", "ship"], correct: 0 },
      { question: "Cosa significa \"Bicicletta\" in inglese?", options: ["bicycle", "taxi", "ship", "subway"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di me...\")", options: ["Ciao! Parliamo di mezzi di trasporto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Vado in treno....\")", options: ["Vado in treno.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"Vado in treno.\"?", options: ["I go by train", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Vai in autobus?\"?", options: ["Do you go by bus?", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Andiamo a piedi.\"?", options: ["We go on foot", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Lei va in macchina.\"?", options: ["She goes by car", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"bicycle\"", options: ["Bicicletta", "Taxi", "Nave", "Metro"], correct: 0 },
      { question: "Traduci in italiano: \"taxi\"", options: ["Taxi", "Nave", "Metro", "Biglietto"], correct: 0 },
      { question: "Traduci in italiano: \"ship\"", options: ["Nave", "Metro", "Biglietto", "Stazione"], correct: 0 },
      { question: "Traduci in italiano: \"subway\"", options: ["Metro", "Biglietto", "Stazione", "Aeroporto"], correct: 0 },
      { question: "Traduci in italiano: \"ticket\"", options: ["Biglietto", "Stazione", "Aeroporto", "Piedi"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Biglietto\"?", options: ["ticket", "station", "airport", "feet/on foot"], correct: 0 },
      { question: "Cosa significa \"Stazione\"?", options: ["station", "airport", "feet/on foot", "train"], correct: 0 },
      { question: "Cosa significa \"Aeroporto\"?", options: ["airport", "feet/on foot", "train", "bus"], correct: 0 },
      { question: "Cosa significa \"Piedi\"?", options: ["feet/on foot", "train", "bus", "car"], correct: 0 }
    ],
    youtubeId: "2Zg8h5p4tXQ",
    videoTitle: "Mezzi di trasporto - Video Lezione",
    videoContext: "Guarda questo video per approfondire: mezzi di trasporto."
  },

  "it-a1-10": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 10,
    title: "Hobby e tempo libero",
    description: "Learn hobby vocabulary and express likes with piacere",
    vocabulary: [
    { word: "Hobby", meaning: "hobby", example: "Il mio hobby è leggere.", emoji: "🎨", arabic: "" },
    { word: "Leggere", meaning: "to read", example: "Mi piace leggere.", emoji: "📖", arabic: "" },
    { word: "Ballare", meaning: "to dance", example: "Mi piace ballare.", emoji: "💃", arabic: "" },
    { word: "Cantare", meaning: "to sing", example: "Mi piace cantare.", emoji: "🎤", arabic: "" },
    { word: "Nuotare", meaning: "to swim", example: "Mi piace nuotare.", emoji: "🏊", arabic: "" },
    { word: "Disegnare", meaning: "to draw", example: "Mi piace disegnare.", emoji: "🎨", arabic: "" },
    { word: "Film", meaning: "movie", example: "Mi piacciono i film.", emoji: "🎬", arabic: "" },
    { word: "Musica", meaning: "music", example: "Ascolto la musica.", emoji: "🎵", arabic: "" },
    { word: "Sport", meaning: "sport", example: "Faccio sport.", emoji: "⚽", arabic: "" },
    { word: "Tempo libero", meaning: "free time", example: "Ho poco tempo libero.", emoji: "🕰️", arabic: "" },
    { word: "Viaggiare", meaning: "to travel", example: "Amo viaggiare.", emoji: "🧳", arabic: "" },
    { word: "Cucinare", meaning: "to cook", example: "Mi piace cucinare.", emoji: "🍳", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di hobby e tempo libero." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "Il mio hobby è leggere." },
    { speaker: "B", text: "Mi piace leggere." },
    { speaker: "A", text: "Mi piace ballare." },
    { speaker: "B", text: "Mi piace cantare." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "Mi piace / Mi piacciono",
      explanation: "'Piacere' works differently from English 'to like': the thing liked is the subject. Use 'piace' for singular/verb and 'piacciono' for plural.",
      examples: [
      { sentence: "Mi piace leggere.", note: "I like reading" },
      { sentence: "Mi piacciono i film.", note: "I like movies" },
      { sentence: "Ti piace ballare?", note: "Do you like dancing?" },
      { sentence: "Non gli piace lo sport.", note: "He doesn't like sport" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Hobby\" in inglese?", options: ["hobby", "to read", "to dance", "to sing"], correct: 0 },
      { question: "Cosa significa \"Leggere\" in inglese?", options: ["to read", "to dance", "to sing", "to swim"], correct: 0 },
      { question: "Cosa significa \"Ballare\" in inglese?", options: ["to dance", "to sing", "to swim", "to draw"], correct: 0 },
      { question: "Cosa significa \"Cantare\" in inglese?", options: ["to sing", "to swim", "to draw", "movie"], correct: 0 },
      { question: "Cosa significa \"Nuotare\" in inglese?", options: ["to swim", "to draw", "movie", "music"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di ho...\")", options: ["Ciao! Parliamo di hobby e tempo libero.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Il mio hobby è legge...\")", options: ["Il mio hobby è leggere.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"Mi piace leggere.\"?", options: ["I like reading", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Mi piacciono i film.\"?", options: ["I like movies", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Ti piace ballare?\"?", options: ["Do you like dancing?", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Non gli piace lo sport.\"?", options: ["He doesn't like sport", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"to swim\"", options: ["Nuotare", "Disegnare", "Film", "Musica"], correct: 0 },
      { question: "Traduci in italiano: \"to draw\"", options: ["Disegnare", "Film", "Musica", "Sport"], correct: 0 },
      { question: "Traduci in italiano: \"movie\"", options: ["Film", "Musica", "Sport", "Tempo libero"], correct: 0 },
      { question: "Traduci in italiano: \"music\"", options: ["Musica", "Sport", "Tempo libero", "Viaggiare"], correct: 0 },
      { question: "Traduci in italiano: \"sport\"", options: ["Sport", "Tempo libero", "Viaggiare", "Cucinare"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Sport\"?", options: ["sport", "free time", "to travel", "to cook"], correct: 0 },
      { question: "Cosa significa \"Tempo libero\"?", options: ["free time", "to travel", "to cook", "hobby"], correct: 0 },
      { question: "Cosa significa \"Viaggiare\"?", options: ["to travel", "to cook", "hobby", "to read"], correct: 0 },
      { question: "Cosa significa \"Cucinare\"?", options: ["to cook", "hobby", "to read", "to dance"], correct: 0 }
    ],
    youtubeId: "YQHsXMglC9A",
    videoTitle: "Hobby e tempo libero - Video Lezione",
    videoContext: "Guarda questo video per approfondire: hobby e tempo libero."
  },

  "it-a1-11": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 11,
    title: "Fare shopping",
    description: "Learn shopping vocabulary and demonstrative adjectives",
    vocabulary: [
    { word: "Negozio", meaning: "shop", example: "Vado al negozio.", emoji: "🏬", arabic: "" },
    { word: "Comprare", meaning: "to buy", example: "Voglio comprare scarpe.", emoji: "🛍️", arabic: "" },
    { word: "Prezzo", meaning: "price", example: "Qual è il prezzo?", emoji: "💰", arabic: "" },
    { word: "Sconto", meaning: "discount", example: "C'è uno sconto.", emoji: "🏷️", arabic: "" },
    { word: "Cassa", meaning: "cash register", example: "Pago alla cassa.", emoji: "🧾", arabic: "" },
    { word: "Taglia", meaning: "size", example: "Che taglia hai?", emoji: "📏", arabic: "" },
    { word: "Borsa", meaning: "bag", example: "Compro una borsa.", emoji: "👜", arabic: "" },
    { word: "Scarpe", meaning: "shoes", example: "Compro le scarpe.", emoji: "👟", arabic: "" },
    { word: "Contanti", meaning: "cash", example: "Pago in contanti.", emoji: "💵", arabic: "" },
    { word: "Carta di credito", meaning: "credit card", example: "Pago con carta di credito.", emoji: "💳", arabic: "" },
    { word: "Costoso", meaning: "expensive", example: "È molto costoso.", emoji: "💸", arabic: "" },
    { word: "Economico", meaning: "cheap", example: "È molto economico.", emoji: "🪙", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di fare shopping." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "Vado al negozio." },
    { speaker: "B", text: "Voglio comprare scarpe." },
    { speaker: "A", text: "Qual è il prezzo?" },
    { speaker: "B", text: "C'è uno sconto." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "Questo e quello",
      explanation: "'Questo' (this) is used for nearby objects and 'quello' (that) for distant ones; both agree in gender and number.",
      examples: [
      { sentence: "Questo vestito è bello.", note: "This dress is nice" },
      { sentence: "Quella borsa è cara.", note: "That bag is expensive" },
      { sentence: "Questi scarpe sono comode.", note: "These shoes are comfortable" },
      { sentence: "Quelle giacche sono nuove.", note: "Those jackets are new" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Negozio\" in inglese?", options: ["shop", "to buy", "price", "discount"], correct: 0 },
      { question: "Cosa significa \"Comprare\" in inglese?", options: ["to buy", "price", "discount", "cash register"], correct: 0 },
      { question: "Cosa significa \"Prezzo\" in inglese?", options: ["price", "discount", "cash register", "size"], correct: 0 },
      { question: "Cosa significa \"Sconto\" in inglese?", options: ["discount", "cash register", "size", "bag"], correct: 0 },
      { question: "Cosa significa \"Cassa\" in inglese?", options: ["cash register", "size", "bag", "shoes"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di fa...\")", options: ["Ciao! Parliamo di fare shopping.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Vado al negozio....\")", options: ["Vado al negozio.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"Questo vestito è bello.\"?", options: ["This dress is nice", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Quella borsa è cara.\"?", options: ["That bag is expensive", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Questi scarpe sono comode.\"?", options: ["These shoes are comfortable", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Quelle giacche sono nuove.\"?", options: ["Those jackets are new", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"cash register\"", options: ["Cassa", "Taglia", "Borsa", "Scarpe"], correct: 0 },
      { question: "Traduci in italiano: \"size\"", options: ["Taglia", "Borsa", "Scarpe", "Contanti"], correct: 0 },
      { question: "Traduci in italiano: \"bag\"", options: ["Borsa", "Scarpe", "Contanti", "Carta di credito"], correct: 0 },
      { question: "Traduci in italiano: \"shoes\"", options: ["Scarpe", "Contanti", "Carta di credito", "Costoso"], correct: 0 },
      { question: "Traduci in italiano: \"cash\"", options: ["Contanti", "Carta di credito", "Costoso", "Economico"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Contanti\"?", options: ["cash", "credit card", "expensive", "cheap"], correct: 0 },
      { question: "Cosa significa \"Carta di credito\"?", options: ["credit card", "expensive", "cheap", "shop"], correct: 0 },
      { question: "Cosa significa \"Costoso\"?", options: ["expensive", "cheap", "shop", "to buy"], correct: 0 },
      { question: "Cosa significa \"Economico\"?", options: ["cheap", "shop", "to buy", "price"], correct: 0 }
    ],
    youtubeId: "CevxZvSJLk8",
    videoTitle: "Fare shopping - Video Lezione",
    videoContext: "Guarda questo video per approfondire: fare shopping."
  },

  "it-a1-12": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 12,
    title: "Vestiti e colori",
    description: "Learn clothing vocabulary and color agreement",
    vocabulary: [
    { word: "Vestito", meaning: "dress", example: "Il vestito è bello.", emoji: "👗", arabic: "" },
    { word: "Camicia", meaning: "shirt", example: "La camicia è bianca.", emoji: "👕", arabic: "" },
    { word: "Pantaloni", meaning: "pants", example: "I pantaloni sono neri.", emoji: "👖", arabic: "" },
    { word: "Giacca", meaning: "jacket", example: "La giacca è calda.", emoji: "🧥", arabic: "" },
    { word: "Rosso", meaning: "red", example: "Il fiore è rosso.", emoji: "🔴", arabic: "" },
    { word: "Blu", meaning: "blue", example: "Il cielo è blu.", emoji: "🔵", arabic: "" },
    { word: "Verde", meaning: "green", example: "L'erba è verde.", emoji: "🟢", arabic: "" },
    { word: "Giallo", meaning: "yellow", example: "Il sole è giallo.", emoji: "🟡", arabic: "" },
    { word: "Nero", meaning: "black", example: "La borsa è nera.", emoji: "⚫", arabic: "" },
    { word: "Bianco", meaning: "white", example: "La neve è bianca.", emoji: "⚪", arabic: "" },
    { word: "Cappello", meaning: "hat", example: "Il cappello è nuovo.", emoji: "🎩", arabic: "" },
    { word: "Scarpe", meaning: "shoes", example: "Le scarpe sono comode.", emoji: "👟", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di vestiti e colori." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "Il vestito è bello." },
    { speaker: "B", text: "La camicia è bianca." },
    { speaker: "A", text: "I pantaloni sono neri." },
    { speaker: "B", text: "La giacca è calda." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "Accordo degli aggettivi di colore",
      explanation: "Color adjectives must agree in gender and number with the noun they describe, like other Italian adjectives.",
      examples: [
      { sentence: "La camicia è rossa.", note: "The shirt is red (feminine)" },
      { sentence: "Il cappello è rosso.", note: "The hat is red (masculine)" },
      { sentence: "Le scarpe sono nere.", note: "The shoes are black (plural)" },
      { sentence: "I pantaloni sono blu.", note: "The pants are blue" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Vestito\" in inglese?", options: ["dress", "shirt", "pants", "jacket"], correct: 0 },
      { question: "Cosa significa \"Camicia\" in inglese?", options: ["shirt", "pants", "jacket", "red"], correct: 0 },
      { question: "Cosa significa \"Pantaloni\" in inglese?", options: ["pants", "jacket", "red", "blue"], correct: 0 },
      { question: "Cosa significa \"Giacca\" in inglese?", options: ["jacket", "red", "blue", "green"], correct: 0 },
      { question: "Cosa significa \"Rosso\" in inglese?", options: ["red", "blue", "green", "yellow"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di ve...\")", options: ["Ciao! Parliamo di vestiti e colori.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Il vestito è bello....\")", options: ["Il vestito è bello.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"La camicia è rossa.\"?", options: ["The shirt is red (feminine)", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Il cappello è rosso.\"?", options: ["The hat is red (masculine)", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Le scarpe sono nere.\"?", options: ["The shoes are black (plural)", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"I pantaloni sono blu.\"?", options: ["The pants are blue", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"red\"", options: ["Rosso", "Blu", "Verde", "Giallo"], correct: 0 },
      { question: "Traduci in italiano: \"blue\"", options: ["Blu", "Verde", "Giallo", "Nero"], correct: 0 },
      { question: "Traduci in italiano: \"green\"", options: ["Verde", "Giallo", "Nero", "Bianco"], correct: 0 },
      { question: "Traduci in italiano: \"yellow\"", options: ["Giallo", "Nero", "Bianco", "Cappello"], correct: 0 },
      { question: "Traduci in italiano: \"black\"", options: ["Nero", "Bianco", "Cappello", "Scarpe"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Nero\"?", options: ["black", "white", "hat", "shoes"], correct: 0 },
      { question: "Cosa significa \"Bianco\"?", options: ["white", "hat", "shoes", "dress"], correct: 0 },
      { question: "Cosa significa \"Cappello\"?", options: ["hat", "shoes", "dress", "shirt"], correct: 0 },
      { question: "Cosa significa \"Scarpe\"?", options: ["shoes", "dress", "shirt", "pants"], correct: 0 }
    ],
    youtubeId: "hT_nvWreIhg",
    videoTitle: "Vestiti e colori - Video Lezione",
    videoContext: "Guarda questo video per approfondire: vestiti e colori."
  },

  "it-a1-13": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 13,
    title: "Descrivere le persone",
    description: "Learn adjectives to describe people's appearance and personality",
    vocabulary: [
    { word: "Alto", meaning: "tall", example: "Lui è alto.", emoji: "📏", arabic: "" },
    { word: "Basso", meaning: "short", example: "Lei è bassa.", emoji: "📏", arabic: "" },
    { word: "Magro", meaning: "thin", example: "Il ragazzo è magro.", emoji: "🧍", arabic: "" },
    { word: "Grasso", meaning: "fat", example: "Il gatto è grasso.", emoji: "🐱", arabic: "" },
    { word: "Bello", meaning: "handsome/beautiful", example: "È molto bello.", emoji: "😍", arabic: "" },
    { word: "Simpatico", meaning: "nice", example: "Il vicino è simpatico.", emoji: "😊", arabic: "" },
    { word: "Intelligente", meaning: "intelligent", example: "È una donna intelligente.", emoji: "🧠", arabic: "" },
    { word: "Capelli", meaning: "hair", example: "Ha i capelli lunghi.", emoji: "💇", arabic: "" },
    { word: "Occhi", meaning: "eyes", example: "Ha gli occhi verdi.", emoji: "👀", arabic: "" },
    { word: "Gentile", meaning: "kind", example: "È molto gentile.", emoji: "🤗", arabic: "" },
    { word: "Giovane", meaning: "young", example: "È ancora giovane.", emoji: "👶", arabic: "" },
    { word: "Timido", meaning: "shy", example: "Il bambino è timido.", emoji: "😳", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di descrivere le persone." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "Lui è alto." },
    { speaker: "B", text: "Lei è bassa." },
    { speaker: "A", text: "Il ragazzo è magro." },
    { speaker: "B", text: "Il gatto è grasso." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "Aggettivi qualificativi",
      explanation: "Descriptive adjectives usually follow the noun in Italian and must agree in gender and number.",
      examples: [
      { sentence: "Lui è alto e simpatico.", note: "He is tall and nice" },
      { sentence: "Lei è bassa e gentile.", note: "She is short and kind" },
      { sentence: "Sono ragazzi intelligenti.", note: "They are intelligent boys" },
      { sentence: "È una donna bella.", note: "She is a beautiful woman" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Alto\" in inglese?", options: ["tall", "short", "thin", "fat"], correct: 0 },
      { question: "Cosa significa \"Basso\" in inglese?", options: ["short", "thin", "fat", "handsome/beautiful"], correct: 0 },
      { question: "Cosa significa \"Magro\" in inglese?", options: ["thin", "fat", "handsome/beautiful", "nice"], correct: 0 },
      { question: "Cosa significa \"Grasso\" in inglese?", options: ["fat", "handsome/beautiful", "nice", "intelligent"], correct: 0 },
      { question: "Cosa significa \"Bello\" in inglese?", options: ["handsome/beautiful", "nice", "intelligent", "hair"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di de...\")", options: ["Ciao! Parliamo di descrivere le persone.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Lui è alto....\")", options: ["Lui è alto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"Lui è alto e simpatico.\"?", options: ["He is tall and nice", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Lei è bassa e gentile.\"?", options: ["She is short and kind", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Sono ragazzi intelligenti.\"?", options: ["They are intelligent boys", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"È una donna bella.\"?", options: ["She is a beautiful woman", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"handsome/beautiful\"", options: ["Bello", "Simpatico", "Intelligente", "Capelli"], correct: 0 },
      { question: "Traduci in italiano: \"nice\"", options: ["Simpatico", "Intelligente", "Capelli", "Occhi"], correct: 0 },
      { question: "Traduci in italiano: \"intelligent\"", options: ["Intelligente", "Capelli", "Occhi", "Gentile"], correct: 0 },
      { question: "Traduci in italiano: \"hair\"", options: ["Capelli", "Occhi", "Gentile", "Giovane"], correct: 0 },
      { question: "Traduci in italiano: \"eyes\"", options: ["Occhi", "Gentile", "Giovane", "Timido"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Occhi\"?", options: ["eyes", "kind", "young", "shy"], correct: 0 },
      { question: "Cosa significa \"Gentile\"?", options: ["kind", "young", "shy", "tall"], correct: 0 },
      { question: "Cosa significa \"Giovane\"?", options: ["young", "shy", "tall", "short"], correct: 0 },
      { question: "Cosa significa \"Timido\"?", options: ["shy", "tall", "short", "thin"], correct: 0 }
    ],
    youtubeId: "09R8_2nJtjg",
    videoTitle: "Descrivere le persone - Video Lezione",
    videoContext: "Guarda questo video per approfondire: descrivere le persone."
  },

  "it-a1-14": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 14,
    title: "Il tempo (meteo)",
    description: "Learn weather vocabulary and impersonal verbs",
    vocabulary: [
    { word: "Sole", meaning: "sun", example: "C'è il sole.", emoji: "☀️", arabic: "" },
    { word: "Pioggia", meaning: "rain", example: "C'è la pioggia.", emoji: "🌧️", arabic: "" },
    { word: "Vento", meaning: "wind", example: "C'è vento.", emoji: "💨", arabic: "" },
    { word: "Neve", meaning: "snow", example: "C'è la neve.", emoji: "❄️", arabic: "" },
    { word: "Caldo", meaning: "hot", example: "Fa caldo oggi.", emoji: "🔥", arabic: "" },
    { word: "Freddo", meaning: "cold", example: "Fa freddo in inverno.", emoji: "🥶", arabic: "" },
    { word: "Nuvoloso", meaning: "cloudy", example: "Il cielo è nuvoloso.", emoji: "☁️", arabic: "" },
    { word: "Temporale", meaning: "storm", example: "C'è un temporale.", emoji: "⛈️", arabic: "" },
    { word: "Estate", meaning: "summer", example: "D'estate fa caldo.", emoji: "🌞", arabic: "" },
    { word: "Inverno", meaning: "winter", example: "D'inverno fa freddo.", emoji: "⛄", arabic: "" },
    { word: "Primavera", meaning: "spring", example: "In primavera piove.", emoji: "🌸", arabic: "" },
    { word: "Autunno", meaning: "autumn", example: "In autunno cade le foglie.", emoji: "🍂", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di il tempo (meteo)." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "C'è il sole." },
    { speaker: "B", text: "C'è la pioggia." },
    { speaker: "A", text: "C'è vento." },
    { speaker: "B", text: "C'è la neve." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "Verbi impersonali del tempo",
      explanation: "Weather expressions in Italian often use impersonal verb forms like 'fa' (it makes) with 'caldo' or 'freddo'.",
      examples: [
      { sentence: "Fa caldo oggi.", note: "It is hot today" },
      { sentence: "Fa freddo in inverno.", note: "It is cold in winter" },
      { sentence: "Piove molto.", note: "It rains a lot" },
      { sentence: "C'è il sole.", note: "It is sunny" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Sole\" in inglese?", options: ["sun", "rain", "wind", "snow"], correct: 0 },
      { question: "Cosa significa \"Pioggia\" in inglese?", options: ["rain", "wind", "snow", "hot"], correct: 0 },
      { question: "Cosa significa \"Vento\" in inglese?", options: ["wind", "snow", "hot", "cold"], correct: 0 },
      { question: "Cosa significa \"Neve\" in inglese?", options: ["snow", "hot", "cold", "cloudy"], correct: 0 },
      { question: "Cosa significa \"Caldo\" in inglese?", options: ["hot", "cold", "cloudy", "storm"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di il...\")", options: ["Ciao! Parliamo di il tempo (meteo).", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"C'è il sole....\")", options: ["C'è il sole.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"Fa caldo oggi.\"?", options: ["It is hot today", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Fa freddo in inverno.\"?", options: ["It is cold in winter", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Piove molto.\"?", options: ["It rains a lot", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"C'è il sole.\"?", options: ["It is sunny", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"hot\"", options: ["Caldo", "Freddo", "Nuvoloso", "Temporale"], correct: 0 },
      { question: "Traduci in italiano: \"cold\"", options: ["Freddo", "Nuvoloso", "Temporale", "Estate"], correct: 0 },
      { question: "Traduci in italiano: \"cloudy\"", options: ["Nuvoloso", "Temporale", "Estate", "Inverno"], correct: 0 },
      { question: "Traduci in italiano: \"storm\"", options: ["Temporale", "Estate", "Inverno", "Primavera"], correct: 0 },
      { question: "Traduci in italiano: \"summer\"", options: ["Estate", "Inverno", "Primavera", "Autunno"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Estate\"?", options: ["summer", "winter", "spring", "autumn"], correct: 0 },
      { question: "Cosa significa \"Inverno\"?", options: ["winter", "spring", "autumn", "sun"], correct: 0 },
      { question: "Cosa significa \"Primavera\"?", options: ["spring", "autumn", "sun", "rain"], correct: 0 },
      { question: "Cosa significa \"Autunno\"?", options: ["autumn", "sun", "rain", "wind"], correct: 0 }
    ],
    youtubeId: "QH2-TGUlwu4",
    videoTitle: "Il tempo (meteo) - Video Lezione",
    videoContext: "Guarda questo video per approfondire: il tempo (meteo)."
  },

  "it-a1-15": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 15,
    title: "Appuntamenti",
    description: "Learn how to make appointments using the near future",
    vocabulary: [
    { word: "Appuntamento", meaning: "appointment", example: "Ho un appuntamento.", emoji: "📅", arabic: "" },
    { word: "Domani", meaning: "tomorrow", example: "Domani vado a lavorare.", emoji: "🌅", arabic: "" },
    { word: "Oggi", meaning: "today", example: "Oggi sono libero.", emoji: "📆", arabic: "" },
    { word: "Stasera", meaning: "tonight", example: "Stasera usciamo.", emoji: "🌙", arabic: "" },
    { word: "Presto", meaning: "early/soon", example: "Arrivo presto.", emoji: "⏰", arabic: "" },
    { word: "Tardi", meaning: "late", example: "Arrivo tardi.", emoji: "🕰️", arabic: "" },
    { word: "Riunione", meaning: "meeting", example: "Ho una riunione.", emoji: "💼", arabic: "" },
    { word: "Agenda", meaning: "calendar/agenda", example: "Guardo l'agenda.", emoji: "📓", arabic: "" },
    { word: "Cancellare", meaning: "to cancel", example: "Devo cancellare.", emoji: "❌", arabic: "" },
    { word: "Confermare", meaning: "to confirm", example: "Vorrei confermare.", emoji: "✅", arabic: "" },
    { word: "Chiamare", meaning: "to call", example: "Devo chiamare il medico.", emoji: "📞", arabic: "" },
    { word: "Orario", meaning: "schedule", example: "Qual è l'orario?", emoji: "🕒", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di appuntamenti." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "Ho un appuntamento." },
    { speaker: "B", text: "Domani vado a lavorare." },
    { speaker: "A", text: "Oggi sono libero." },
    { speaker: "B", text: "Stasera usciamo." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "Il futuro con andare + infinito",
      explanation: "To express near future plans, Italian uses 'andare' + infinitive, similar to English 'going to'.",
      examples: [
      { sentence: "Vado a studiare domani.", note: "I am going to study tomorrow" },
      { sentence: "Vai a lavorare lunedì?", note: "Are you going to work on Monday?" },
      { sentence: "Andiamo a mangiare stasera.", note: "We are going to eat tonight" },
      { sentence: "Lei va a chiamare il medico.", note: "She is going to call the doctor" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Appuntamento\" in inglese?", options: ["appointment", "tomorrow", "today", "tonight"], correct: 0 },
      { question: "Cosa significa \"Domani\" in inglese?", options: ["tomorrow", "today", "tonight", "early/soon"], correct: 0 },
      { question: "Cosa significa \"Oggi\" in inglese?", options: ["today", "tonight", "early/soon", "late"], correct: 0 },
      { question: "Cosa significa \"Stasera\" in inglese?", options: ["tonight", "early/soon", "late", "meeting"], correct: 0 },
      { question: "Cosa significa \"Presto\" in inglese?", options: ["early/soon", "late", "meeting", "calendar/agenda"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di ap...\")", options: ["Ciao! Parliamo di appuntamenti.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ho un appuntamento....\")", options: ["Ho un appuntamento.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"Vado a studiare domani.\"?", options: ["I am going to study tomorrow", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Vai a lavorare lunedì?\"?", options: ["Are you going to work on Monday?", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Andiamo a mangiare stasera.\"?", options: ["We are going to eat tonight", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Lei va a chiamare il medico.\"?", options: ["She is going to call the doctor", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"early/soon\"", options: ["Presto", "Tardi", "Riunione", "Agenda"], correct: 0 },
      { question: "Traduci in italiano: \"late\"", options: ["Tardi", "Riunione", "Agenda", "Cancellare"], correct: 0 },
      { question: "Traduci in italiano: \"meeting\"", options: ["Riunione", "Agenda", "Cancellare", "Confermare"], correct: 0 },
      { question: "Traduci in italiano: \"calendar/agenda\"", options: ["Agenda", "Cancellare", "Confermare", "Chiamare"], correct: 0 },
      { question: "Traduci in italiano: \"to cancel\"", options: ["Cancellare", "Confermare", "Chiamare", "Orario"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Cancellare\"?", options: ["to cancel", "to confirm", "to call", "schedule"], correct: 0 },
      { question: "Cosa significa \"Confermare\"?", options: ["to confirm", "to call", "schedule", "appointment"], correct: 0 },
      { question: "Cosa significa \"Chiamare\"?", options: ["to call", "schedule", "appointment", "tomorrow"], correct: 0 },
      { question: "Cosa significa \"Orario\"?", options: ["schedule", "appointment", "tomorrow", "today"], correct: 0 }
    ],
    youtubeId: "JGwWNGJdvx8",
    videoTitle: "Appuntamenti - Video Lezione",
    videoContext: "Guarda questo video per approfondire: appuntamenti."
  },

  "it-a1-16": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 16,
    title: "Dal medico",
    description: "Learn body parts and how to describe pain",
    vocabulary: [
    { word: "Medico", meaning: "doctor", example: "Vado dal medico.", emoji: "👨‍⚕️", arabic: "" },
    { word: "Malato", meaning: "sick", example: "Sono malato.", emoji: "🤒", arabic: "" },
    { word: "Testa", meaning: "head", example: "Mi fa male la testa.", emoji: "🤕", arabic: "" },
    { word: "Stomaco", meaning: "stomach", example: "Mi fa male lo stomaco.", emoji: "🤢", arabic: "" },
    { word: "Gola", meaning: "throat", example: "Mi fa male la gola.", emoji: "😷", arabic: "" },
    { word: "Febbre", meaning: "fever", example: "Ho la febbre.", emoji: "🌡️", arabic: "" },
    { word: "Farmacia", meaning: "pharmacy", example: "Vado in farmacia.", emoji: "💊", arabic: "" },
    { word: "Medicina", meaning: "medicine", example: "Prendo la medicina.", emoji: "💊", arabic: "" },
    { word: "Dolore", meaning: "pain", example: "Sento dolore.", emoji: "😣", arabic: "" },
    { word: "Piedi", meaning: "feet", example: "Mi fanno male i piedi.", emoji: "🦶", arabic: "" },
    { word: "Braccio", meaning: "arm", example: "Mi fa male il braccio.", emoji: "💪", arabic: "" },
    { word: "Ricetta", meaning: "prescription", example: "Ho bisogno di una ricetta.", emoji: "📄", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di dal medico." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "Vado dal medico." },
    { speaker: "B", text: "Sono malato." },
    { speaker: "A", text: "Mi fa male la testa." },
    { speaker: "B", text: "Mi fa male lo stomaco." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "Mi fa male + parti del corpo",
      explanation: "To express pain, Italian uses 'mi fa male' (singular) or 'mi fanno male' (plural) with the body part.",
      examples: [
      { sentence: "Mi fa male la testa.", note: "My head hurts" },
      { sentence: "Mi fanno male i piedi.", note: "My feet hurt" },
      { sentence: "Ti fa male lo stomaco?", note: "Does your stomach hurt?" },
      { sentence: "Le fa male la gola.", note: "Her throat hurts" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Medico\" in inglese?", options: ["doctor", "sick", "head", "stomach"], correct: 0 },
      { question: "Cosa significa \"Malato\" in inglese?", options: ["sick", "head", "stomach", "throat"], correct: 0 },
      { question: "Cosa significa \"Testa\" in inglese?", options: ["head", "stomach", "throat", "fever"], correct: 0 },
      { question: "Cosa significa \"Stomaco\" in inglese?", options: ["stomach", "throat", "fever", "pharmacy"], correct: 0 },
      { question: "Cosa significa \"Gola\" in inglese?", options: ["throat", "fever", "pharmacy", "medicine"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di da...\")", options: ["Ciao! Parliamo di dal medico.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Vado dal medico....\")", options: ["Vado dal medico.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"Mi fa male la testa.\"?", options: ["My head hurts", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Mi fanno male i piedi.\"?", options: ["My feet hurt", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Ti fa male lo stomaco?\"?", options: ["Does your stomach hurt?", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Le fa male la gola.\"?", options: ["Her throat hurts", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"throat\"", options: ["Gola", "Febbre", "Farmacia", "Medicina"], correct: 0 },
      { question: "Traduci in italiano: \"fever\"", options: ["Febbre", "Farmacia", "Medicina", "Dolore"], correct: 0 },
      { question: "Traduci in italiano: \"pharmacy\"", options: ["Farmacia", "Medicina", "Dolore", "Piedi"], correct: 0 },
      { question: "Traduci in italiano: \"medicine\"", options: ["Medicina", "Dolore", "Piedi", "Braccio"], correct: 0 },
      { question: "Traduci in italiano: \"pain\"", options: ["Dolore", "Piedi", "Braccio", "Ricetta"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Dolore\"?", options: ["pain", "feet", "arm", "prescription"], correct: 0 },
      { question: "Cosa significa \"Piedi\"?", options: ["feet", "arm", "prescription", "doctor"], correct: 0 },
      { question: "Cosa significa \"Braccio\"?", options: ["arm", "prescription", "doctor", "sick"], correct: 0 },
      { question: "Cosa significa \"Ricetta\"?", options: ["prescription", "doctor", "sick", "head"], correct: 0 }
    ],
    youtubeId: "e-ORhEE9VVg",
    videoTitle: "Dal medico - Video Lezione",
    videoContext: "Guarda questo video per approfondire: dal medico."
  },

  "it-a1-17": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 17,
    title: "La mia giornata",
    description: "Learn daily routine vocabulary and reflexive verbs",
    vocabulary: [
    { word: "Svegliarsi", meaning: "to wake up", example: "Mi sveglio alle sette.", emoji: "⏰", arabic: "" },
    { word: "Lavarsi", meaning: "to wash oneself", example: "Mi lavo la mattina.", emoji: "🚿", arabic: "" },
    { word: "Vestirsi", meaning: "to get dressed", example: "Mi vesto velocemente.", emoji: "👕", arabic: "" },
    { word: "Colazione", meaning: "breakfast", example: "Faccio colazione.", emoji: "🍳", arabic: "" },
    { word: "Lavorare", meaning: "to work", example: "Lavoro tutto il giorno.", emoji: "💼", arabic: "" },
    { word: "Pranzare", meaning: "to have lunch", example: "Pranzo a mezzogiorno.", emoji: "🍽️", arabic: "" },
    { word: "Cenare", meaning: "to have dinner", example: "Ceno alle otto.", emoji: "🍝", arabic: "" },
    { word: "Dormire", meaning: "to sleep", example: "Dormo otto ore.", emoji: "😴", arabic: "" },
    { word: "Giornata", meaning: "day", example: "È stata una lunga giornata.", emoji: "📆", arabic: "" },
    { word: "Uscire", meaning: "to go out", example: "Esco con gli amici.", emoji: "🚪", arabic: "" },
    { word: "Tornare", meaning: "to return", example: "Torno a casa tardi.", emoji: "🏠", arabic: "" },
    { word: "Routine", meaning: "routine", example: "La mia routine è semplice.", emoji: "🔁", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di la mia giornata." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "Mi sveglio alle sette." },
    { speaker: "B", text: "Mi lavo la mattina." },
    { speaker: "A", text: "Mi vesto velocemente." },
    { speaker: "B", text: "Faccio colazione." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "Verbi riflessivi",
      explanation: "Reflexive verbs describe actions the subject does to themselves and use reflexive pronouns like mi, ti, si, ci, vi, si.",
      examples: [
      { sentence: "Mi sveglio alle sette.", note: "I wake up at seven" },
      { sentence: "Ti lavi la mattina.", note: "You wash yourself in the morning" },
      { sentence: "Si veste velocemente.", note: "He/she gets dressed quickly" },
      { sentence: "Ci laviamo le mani.", note: "We wash our hands" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Svegliarsi\" in inglese?", options: ["to wake up", "to wash oneself", "to get dressed", "breakfast"], correct: 0 },
      { question: "Cosa significa \"Lavarsi\" in inglese?", options: ["to wash oneself", "to get dressed", "breakfast", "to work"], correct: 0 },
      { question: "Cosa significa \"Vestirsi\" in inglese?", options: ["to get dressed", "breakfast", "to work", "to have lunch"], correct: 0 },
      { question: "Cosa significa \"Colazione\" in inglese?", options: ["breakfast", "to work", "to have lunch", "to have dinner"], correct: 0 },
      { question: "Cosa significa \"Lavorare\" in inglese?", options: ["to work", "to have lunch", "to have dinner", "to sleep"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di la...\")", options: ["Ciao! Parliamo di la mia giornata.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Mi sveglio alle sett...\")", options: ["Mi sveglio alle sette.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"Mi sveglio alle sette.\"?", options: ["I wake up at seven", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Ti lavi la mattina.\"?", options: ["You wash yourself in the morning", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Si veste velocemente.\"?", options: ["He/she gets dressed quickly", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Ci laviamo le mani.\"?", options: ["We wash our hands", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"to work\"", options: ["Lavorare", "Pranzare", "Cenare", "Dormire"], correct: 0 },
      { question: "Traduci in italiano: \"to have lunch\"", options: ["Pranzare", "Cenare", "Dormire", "Giornata"], correct: 0 },
      { question: "Traduci in italiano: \"to have dinner\"", options: ["Cenare", "Dormire", "Giornata", "Uscire"], correct: 0 },
      { question: "Traduci in italiano: \"to sleep\"", options: ["Dormire", "Giornata", "Uscire", "Tornare"], correct: 0 },
      { question: "Traduci in italiano: \"day\"", options: ["Giornata", "Uscire", "Tornare", "Routine"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Giornata\"?", options: ["day", "to go out", "to return", "routine"], correct: 0 },
      { question: "Cosa significa \"Uscire\"?", options: ["to go out", "to return", "routine", "to wake up"], correct: 0 },
      { question: "Cosa significa \"Tornare\"?", options: ["to return", "routine", "to wake up", "to wash oneself"], correct: 0 },
      { question: "Cosa significa \"Routine\"?", options: ["routine", "to wake up", "to wash oneself", "to get dressed"], correct: 0 }
    ],
    youtubeId: "tVj0ZTS4WF4",
    videoTitle: "La mia giornata - Video Lezione",
    videoContext: "Guarda questo video per approfondire: la mia giornata."
  },

  "it-a1-18": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 18,
    title: "Viaggi e vacanze",
    description: "Learn travel and vacation vocabulary",
    vocabulary: [
    { word: "Viaggio", meaning: "trip", example: "Il viaggio è lungo.", emoji: "🧳", arabic: "" },
    { word: "Vacanza", meaning: "vacation", example: "Vado in vacanza.", emoji: "🏖️", arabic: "" },
    { word: "Spiaggia", meaning: "beach", example: "La spiaggia è bellissima.", emoji: "🏖️", arabic: "" },
    { word: "Montagna", meaning: "mountain", example: "Amo la montagna.", emoji: "⛰️", arabic: "" },
    { word: "Albergo", meaning: "hotel", example: "Prenoto un albergo.", emoji: "🏨", arabic: "" },
    { word: "Valigia", meaning: "suitcase", example: "Faccio la valigia.", emoji: "🧳", arabic: "" },
    { word: "Passaporto", meaning: "passport", example: "Ho il passaporto.", emoji: "🛂", arabic: "" },
    { word: "Turista", meaning: "tourist", example: "Sono un turista.", emoji: "🧑‍🦱", arabic: "" },
    { word: "Volo", meaning: "flight", example: "Il volo è diretto.", emoji: "🛫", arabic: "" },
    { word: "Estero", meaning: "abroad", example: "Vado all'estero.", emoji: "🌍", arabic: "" },
    { word: "Souvenir", meaning: "souvenir", example: "Compro un souvenir.", emoji: "🎁", arabic: "" },
    { word: "Itinerario", meaning: "itinerary", example: "Pianifico l'itinerario.", emoji: "🗺️", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di viaggi e vacanze." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "Il viaggio è lungo." },
    { speaker: "B", text: "Vado in vacanza." },
    { speaker: "A", text: "La spiaggia è bellissima." },
    { speaker: "B", text: "Amo la montagna." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "C'è / ci sono con i luoghi di viaggio",
      explanation: "We use 'c'è' and 'ci sono' to describe what exists at travel destinations, combined with prepositions of place.",
      examples: [
      { sentence: "C'è una spiaggia bellissima.", note: "There is a beautiful beach" },
      { sentence: "Ci sono molti turisti.", note: "There are many tourists" },
      { sentence: "C'è un albergo vicino.", note: "There is a hotel nearby" },
      { sentence: "Ci sono voli diretti.", note: "There are direct flights" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Viaggio\" in inglese?", options: ["trip", "vacation", "beach", "mountain"], correct: 0 },
      { question: "Cosa significa \"Vacanza\" in inglese?", options: ["vacation", "beach", "mountain", "hotel"], correct: 0 },
      { question: "Cosa significa \"Spiaggia\" in inglese?", options: ["beach", "mountain", "hotel", "suitcase"], correct: 0 },
      { question: "Cosa significa \"Montagna\" in inglese?", options: ["mountain", "hotel", "suitcase", "passport"], correct: 0 },
      { question: "Cosa significa \"Albergo\" in inglese?", options: ["hotel", "suitcase", "passport", "tourist"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di vi...\")", options: ["Ciao! Parliamo di viaggi e vacanze.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Il viaggio è lungo....\")", options: ["Il viaggio è lungo.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"C'è una spiaggia bellissima.\"?", options: ["There is a beautiful beach", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Ci sono molti turisti.\"?", options: ["There are many tourists", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"C'è un albergo vicino.\"?", options: ["There is a hotel nearby", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Ci sono voli diretti.\"?", options: ["There are direct flights", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"hotel\"", options: ["Albergo", "Valigia", "Passaporto", "Turista"], correct: 0 },
      { question: "Traduci in italiano: \"suitcase\"", options: ["Valigia", "Passaporto", "Turista", "Volo"], correct: 0 },
      { question: "Traduci in italiano: \"passport\"", options: ["Passaporto", "Turista", "Volo", "Estero"], correct: 0 },
      { question: "Traduci in italiano: \"tourist\"", options: ["Turista", "Volo", "Estero", "Souvenir"], correct: 0 },
      { question: "Traduci in italiano: \"flight\"", options: ["Volo", "Estero", "Souvenir", "Itinerario"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Volo\"?", options: ["flight", "abroad", "souvenir", "itinerary"], correct: 0 },
      { question: "Cosa significa \"Estero\"?", options: ["abroad", "souvenir", "itinerary", "trip"], correct: 0 },
      { question: "Cosa significa \"Souvenir\"?", options: ["souvenir", "itinerary", "trip", "vacation"], correct: 0 },
      { question: "Cosa significa \"Itinerario\"?", options: ["itinerary", "trip", "vacation", "beach"], correct: 0 }
    ],
    youtubeId: "fRh_vgS2dFE",
    videoTitle: "Viaggi e vacanze - Video Lezione",
    videoContext: "Guarda questo video per approfondire: viaggi e vacanze."
  },

  "it-a1-19": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 19,
    title: "Verbi modali (potere, dovere, volere)",
    description: "Learn the modal verbs potere, dovere and volere",
    vocabulary: [
    { word: "Potere", meaning: "to be able to", example: "Posso aiutarti.", emoji: "💪", arabic: "" },
    { word: "Dovere", meaning: "to have to", example: "Devo studiare.", emoji: "📚", arabic: "" },
    { word: "Volere", meaning: "to want", example: "Voglio viaggiare.", emoji: "✨", arabic: "" },
    { word: "Permesso", meaning: "permission", example: "Con permesso.", emoji: "🙏", arabic: "" },
    { word: "Necessario", meaning: "necessary", example: "È necessario studiare.", emoji: "❗", arabic: "" },
    { word: "Possibile", meaning: "possible", example: "È possibile venire.", emoji: "✅", arabic: "" },
    { word: "Obbligo", meaning: "obligation", example: "Ho un obbligo.", emoji: "📜", arabic: "" },
    { word: "Capacità", meaning: "ability", example: "Ho la capacità di farlo.", emoji: "🧠", arabic: "" },
    { word: "Desiderio", meaning: "desire", example: "Ho un desiderio.", emoji: "💭", arabic: "" },
    { word: "Aiutare", meaning: "to help", example: "Posso aiutarti.", emoji: "🤝", arabic: "" },
    { word: "Studiare", meaning: "to study", example: "Devo studiare stasera.", emoji: "📖", arabic: "" },
    { word: "Partire", meaning: "to leave", example: "Dobbiamo partire presto.", emoji: "🚀", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di verbi modali (potere, dovere, volere)." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "Posso aiutarti." },
    { speaker: "B", text: "Devo studiare." },
    { speaker: "A", text: "Voglio viaggiare." },
    { speaker: "B", text: "Con permesso." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "I verbi modali",
      explanation: "Modal verbs 'potere' (can), 'dovere' (must) and 'volere' (want) are followed directly by an infinitive verb.",
      examples: [
      { sentence: "Posso parlare italiano.", note: "I can speak Italian" },
      { sentence: "Devo studiare stasera.", note: "I must study tonight" },
      { sentence: "Vuoi venire con noi?", note: "Do you want to come with us?" },
      { sentence: "Dobbiamo partire presto.", note: "We must leave early" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Potere\" in inglese?", options: ["to be able to", "to have to", "to want", "permission"], correct: 0 },
      { question: "Cosa significa \"Dovere\" in inglese?", options: ["to have to", "to want", "permission", "necessary"], correct: 0 },
      { question: "Cosa significa \"Volere\" in inglese?", options: ["to want", "permission", "necessary", "possible"], correct: 0 },
      { question: "Cosa significa \"Permesso\" in inglese?", options: ["permission", "necessary", "possible", "obligation"], correct: 0 },
      { question: "Cosa significa \"Necessario\" in inglese?", options: ["necessary", "possible", "obligation", "ability"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di ve...\")", options: ["Ciao! Parliamo di verbi modali (potere, dovere, volere).", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Posso aiutarti....\")", options: ["Posso aiutarti.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"Posso parlare italiano.\"?", options: ["I can speak Italian", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Devo studiare stasera.\"?", options: ["I must study tonight", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Vuoi venire con noi?\"?", options: ["Do you want to come with us?", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Dobbiamo partire presto.\"?", options: ["We must leave early", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"necessary\"", options: ["Necessario", "Possibile", "Obbligo", "Capacità"], correct: 0 },
      { question: "Traduci in italiano: \"possible\"", options: ["Possibile", "Obbligo", "Capacità", "Desiderio"], correct: 0 },
      { question: "Traduci in italiano: \"obligation\"", options: ["Obbligo", "Capacità", "Desiderio", "Aiutare"], correct: 0 },
      { question: "Traduci in italiano: \"ability\"", options: ["Capacità", "Desiderio", "Aiutare", "Studiare"], correct: 0 },
      { question: "Traduci in italiano: \"desire\"", options: ["Desiderio", "Aiutare", "Studiare", "Partire"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Desiderio\"?", options: ["desire", "to help", "to study", "to leave"], correct: 0 },
      { question: "Cosa significa \"Aiutare\"?", options: ["to help", "to study", "to leave", "to be able to"], correct: 0 },
      { question: "Cosa significa \"Studiare\"?", options: ["to study", "to leave", "to be able to", "to have to"], correct: 0 },
      { question: "Cosa significa \"Partire\"?", options: ["to leave", "to be able to", "to have to", "to want"], correct: 0 }
    ],
    youtubeId: "0KSOMA3QBU0",
    videoTitle: "Verbi modali (potere, dovere, volere) - Video Lezione",
    videoContext: "Guarda questo video per approfondire: verbi modali (potere, dovere, volere)."
  },

  "it-a1-20": {
    levelId: "it-a1",
    levelLabel: "Italiano A1 — CILS/CELI",
    lessonNumber: 20,
    title: "Il passato prossimo",
    description: "Learn to form the passato prossimo with avere and essere",
    vocabulary: [
    { word: "Ieri", meaning: "yesterday", example: "Ieri ho studiato.", emoji: "📅", arabic: "" },
    { word: "Passato", meaning: "past", example: "Parlo del passato.", emoji: "⏳", arabic: "" },
    { word: "Andato", meaning: "gone", example: "Sono andato a Roma.", emoji: "🚶", arabic: "" },
    { word: "Mangiato", meaning: "eaten", example: "Ho mangiato la pizza.", emoji: "🍕", arabic: "" },
    { word: "Visto", meaning: "seen", example: "Ho visto un film.", emoji: "👀", arabic: "" },
    { word: "Fatto", meaning: "done", example: "Ho fatto i compiti.", emoji: "✅", arabic: "" },
    { word: "Partito", meaning: "departed", example: "È partito ieri.", emoji: "🛫", arabic: "" },
    { word: "Arrivato", meaning: "arrived", example: "Sono arrivato tardi.", emoji: "🏁", arabic: "" },
    { word: "Successo", meaning: "happened", example: "Cosa è successo?", emoji: "❓", arabic: "" },
    { word: "Finito", meaning: "finished", example: "Ho finito il lavoro.", emoji: "🏁", arabic: "" },
    { word: "Comprato", meaning: "bought", example: "Ho comprato un libro.", emoji: "🛍️", arabic: "" },
    { word: "Scorso", meaning: "last", example: "La settimana scorsa.", emoji: "📆", arabic: "" }
    ],
    dialogue: [
    { speaker: "A", text: "Ciao! Parliamo di il passato prossimo." },
    { speaker: "B", text: "Va bene, mi interessa molto." },
    { speaker: "A", text: "Ieri ho studiato." },
    { speaker: "B", text: "Parlo del passato." },
    { speaker: "A", text: "Sono andato a Roma." },
    { speaker: "B", text: "Ho mangiato la pizza." },
    { speaker: "A", text: "Grazie per la spiegazione." },
    { speaker: "B", text: "Prego, a presto!" }
    ],
    grammar: {
      title: "Il passato prossimo",
      explanation: "The passato prossimo is formed with the auxiliary 'avere' or 'essere' plus the past participle, and describes completed past actions.",
      examples: [
      { sentence: "Ho mangiato la pizza.", note: "I ate the pizza (avere)" },
      { sentence: "Sono andato a Roma.", note: "I went to Rome (essere)" },
      { sentence: "Abbiamo studiato ieri.", note: "We studied yesterday" },
      { sentence: "È partita alle otto.", note: "She left at eight" }
      ]
    },
    vocabExercises: [
      { question: "Cosa significa \"Ieri\" in inglese?", options: ["yesterday", "past", "gone", "eaten"], correct: 0 },
      { question: "Cosa significa \"Passato\" in inglese?", options: ["past", "gone", "eaten", "seen"], correct: 0 },
      { question: "Cosa significa \"Andato\" in inglese?", options: ["gone", "eaten", "seen", "done"], correct: 0 },
      { question: "Cosa significa \"Mangiato\" in inglese?", options: ["eaten", "seen", "done", "departed"], correct: 0 },
      { question: "Cosa significa \"Visto\" in inglese?", options: ["seen", "done", "departed", "arrived"], correct: 0 }
    ],
    conversationExercises: [
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ciao! Parliamo di il...\")", options: ["Ciao! Parliamo di il passato prossimo.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio B? (\"Va bene, mi interess...\")", options: ["Va bene, mi interessa molto.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 },
      { question: "Nel dialogo, cosa dice il personaggio A? (\"Ieri ho studiato....\")", options: ["Ieri ho studiato.", "Non lo so.", "Forse domani.", "Va bene, ciao."], correct: 0 }
    ],
    grammarExercises: [
      { question: "Qual è la traduzione corretta di: \"Ho mangiato la pizza.\"?", options: ["I ate the pizza (avere)", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Sono andato a Roma.\"?", options: ["I went to Rome (essere)", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"Abbiamo studiato ieri.\"?", options: ["We studied yesterday", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 },
      { question: "Qual è la traduzione corretta di: \"È partita alle otto.\"?", options: ["She left at eight", "It is raining today", "I don't understand", "See you tomorrow"], correct: 0 }
    ],
    examQuestions: [
      { question: "Traduci in italiano: \"seen\"", options: ["Visto", "Fatto", "Partito", "Arrivato"], correct: 0 },
      { question: "Traduci in italiano: \"done\"", options: ["Fatto", "Partito", "Arrivato", "Successo"], correct: 0 },
      { question: "Traduci in italiano: \"departed\"", options: ["Partito", "Arrivato", "Successo", "Finito"], correct: 0 },
      { question: "Traduci in italiano: \"arrived\"", options: ["Arrivato", "Successo", "Finito", "Comprato"], correct: 0 },
      { question: "Traduci in italiano: \"happened\"", options: ["Successo", "Finito", "Comprato", "Scorso"], correct: 0 }
    ],
    homeworkQuestions: [
      { question: "Cosa significa \"Successo\"?", options: ["happened", "finished", "bought", "last"], correct: 0 },
      { question: "Cosa significa \"Finito\"?", options: ["finished", "bought", "last", "yesterday"], correct: 0 },
      { question: "Cosa significa \"Comprato\"?", options: ["bought", "last", "yesterday", "past"], correct: 0 },
      { question: "Cosa significa \"Scorso\"?", options: ["last", "yesterday", "past", "gone"], correct: 0 }
    ],
    youtubeId: "astISOttCQ0",
    videoTitle: "Il passato prossimo - Video Lezione",
    videoContext: "Guarda questo video per approfondire: il passato prossimo."
  },
};
