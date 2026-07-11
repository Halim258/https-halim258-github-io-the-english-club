import type { LessonData } from "./lessons";

export const deA1Lessons: Record<string, LessonData> = {
  "de-a1-1": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 1,
    title: "Begrüßungen und Vorstellung",
    description: "Learn greetings and how to introduce yourself in German.",
    vocabulary: [
    { word: "Hallo", meaning: "hello", example: "Hallo, wie geht es dir?", emoji: "👋", arabic: "" },
    { word: "Guten Morgen", meaning: "good morning", example: "Guten Morgen, Frau Klein!", emoji: "🌅", arabic: "" },
    { word: "Guten Tag", meaning: "good day", example: "Guten Tag, Herr Schmidt!", emoji: "☀️", arabic: "" },
    { word: "Guten Abend", meaning: "good evening", example: "Guten Abend, alle zusammen!", emoji: "🌆", arabic: "" },
    { word: "Tschüss", meaning: "bye", example: "Tschüss, bis morgen!", emoji: "👋", arabic: "" },
    { word: "der Name", meaning: "name", example: "Wie ist dein Name?", emoji: "📛", arabic: "" },
    { word: "heißen", meaning: "to be called", example: "Ich heiße Anna.", emoji: "🙋", arabic: "" },
    { word: "kommen", meaning: "to come", example: "Ich komme aus Berlin.", emoji: "🚶", arabic: "" },
    { word: "wohnen", meaning: "to live", example: "Ich wohne in München.", emoji: "🏠", arabic: "" },
    { word: "die Sprache", meaning: "language", example: "Ich spreche Deutsch.", emoji: "🗣️", arabic: "" },
    { word: "das Land", meaning: "country", example: "Welches Land kommst du?", emoji: "🌍", arabic: "" },
    { word: "danke", meaning: "thank you", example: "Danke schön!", emoji: "🙏", arabic: "" }
    ],
    dialogue: [
    { speaker: "Anna", text: "Hallo! Ich heiße Anna." },
    { speaker: "Tom", text: "Hallo Anna, ich heiße Tom." },
    { speaker: "Anna", text: "Woher kommst du?" },
    { speaker: "Tom", text: "Ich komme aus Berlin. Und du?" },
    { speaker: "Anna", text: "Ich komme aus München." },
    { speaker: "Tom", text: "Schön, dich kennenzulernen!" },
    { speaker: "Anna", text: "Danke, dich auch!" },
    { speaker: "Tom", text: "Tschüss, bis bald!" }
    ],
    grammar: {
    title: "Personalpronomen und „sein“",
    examples: [
      { sentence: "Ich bin Anna.", note: "I am Anna." },
      { sentence: "Du bist mein Freund.", note: "You are my friend." },
      { sentence: "Wir sind aus Deutschland.", note: "We are from Germany." },
      { sentence: "Sie sind sehr nett.", note: "They/You are very nice." }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"Guten Morgen\"?",
      options: ["good morning", "good day", "good evening", "to be called"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"Tschüss\"?",
      options: ["bye", "name", "to be called", "language"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"kommen\"?",
      options: ["to come", "to live", "language", "hello"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"das Land\"?",
      options: ["country", "thank you", "hello", "good evening"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"Guten Morgen\"?",
      options: ["good morning", "good day", "good evening", "to be called"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Hallo Anna, ich heiße Tom.\"?",
      options: ["Tom", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Ich komme aus Berlin. Und du?\"?",
      options: ["Tom", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Schön, dich kennenzulernen!\"?",
      options: ["Tom", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Du bist mein Freund.\" mean?",
      options: ["You are my friend.", "We are from Germany.", "They/You are very nice.", "I am Anna."],
      correct: 0,
    },
    {
      question: "What does \"Wir sind aus Deutschland.\" mean?",
      options: ["We are from Germany.", "They/You are very nice.", "I am Anna.", "You are my friend."],
      correct: 0,
    },
    {
      question: "What does \"Sie sind sehr nett.\" mean?",
      options: ["They/You are very nice.", "I am Anna.", "You are my friend.", "We are from Germany."],
      correct: 0,
    },
    {
      question: "What does \"Ich bin Anna.\" mean?",
      options: ["I am Anna.", "You are my friend.", "We are from Germany.", "They/You are very nice."],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"Guten Tag\"?",
      options: ["good day", "good evening", "bye", "to come"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Name\"?",
      options: ["name", "to be called", "to come", "country"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"wohnen\"?",
      options: ["to live", "language", "country", "good morning"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"danke\"?",
      options: ["thank you", "hello", "good morning", "bye"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"Guten Tag\"?",
      options: ["good day", "good evening", "bye", "to come"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"Guten Abend\"?",
      options: ["good evening", "bye", "name", "to live"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"heißen\"?",
      options: ["to be called", "to come", "to live", "thank you"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Sprache\"?",
      options: ["language", "country", "thank you", "good day"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"Hallo\"?",
      options: ["hello", "good morning", "good day", "name"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00001a",
    videoTitle: "Begrüßungen und Vorstellung — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'Begrüßungen und Vorstellung', appropriate for A1 Goethe-Zertifikat learners."
  },
  "de-a1-2": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 2,
    title: "Zahlen und Alter",
    description: "Learn numbers 1-100 and talk about age.",
    vocabulary: [
    { word: "eins", meaning: "one", example: "Ich habe eins.", emoji: "1️⃣", arabic: "" },
    { word: "zwei", meaning: "two", example: "Zwei Kaffee, bitte.", emoji: "2️⃣", arabic: "" },
    { word: "drei", meaning: "three", example: "Drei Kinder spielen.", emoji: "3️⃣", arabic: "" },
    { word: "zehn", meaning: "ten", example: "Zehn Euro, bitte.", emoji: "🔟", arabic: "" },
    { word: "zwanzig", meaning: "twenty", example: "Ich bin zwanzig Jahre alt.", emoji: "🎂", arabic: "" },
    { word: "hundert", meaning: "hundred", example: "Das kostet hundert Euro.", emoji: "💯", arabic: "" },
    { word: "das Alter", meaning: "age", example: "Wie ist dein Alter?", emoji: "🎈", arabic: "" },
    { word: "alt", meaning: "old", example: "Wie alt bist du?", emoji: "👴", arabic: "" },
    { word: "jung", meaning: "young", example: "Sie ist noch jung.", emoji: "👶", arabic: "" },
    { word: "haben", meaning: "to have", example: "Ich habe zwei Brüder.", emoji: "🤲", arabic: "" },
    { word: "der Geburtstag", meaning: "birthday", example: "Mein Geburtstag ist im Mai.", emoji: "🎉", arabic: "" },
    { word: "das Jahr", meaning: "year", example: "Ich lerne seit einem Jahr Deutsch.", emoji: "📅", arabic: "" }
    ],
    dialogue: [
    { speaker: "Lisa", text: "Wie alt bist du?" },
    { speaker: "Max", text: "Ich bin zwanzig Jahre alt. Und du?" },
    { speaker: "Lisa", text: "Ich bin neunzehn." },
    { speaker: "Max", text: "Hast du Geschwister?" },
    { speaker: "Lisa", text: "Ja, ich habe zwei Brüder." },
    { speaker: "Max", text: "Ich habe eine Schwester." },
    { speaker: "Lisa", text: "Wann ist dein Geburtstag?" },
    { speaker: "Max", text: "Im März." }
    ],
    grammar: {
    title: "Zahlen und „haben“",
    examples: [
      { sentence: "Ich habe zwei Brüder.", note: "I have two brothers." },
      { sentence: "Er hat zwanzig Euro.", note: "He has twenty euros." },
      { sentence: "Wie alt bist du?", note: "How old are you?" },
      { sentence: "Ich bin dreißig Jahre alt.", note: "I am thirty years old." }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"drei\"?",
      options: ["three", "ten", "twenty", "old"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"hundert\"?",
      options: ["hundred", "age", "old", "birthday"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"jung\"?",
      options: ["young", "to have", "birthday", "two"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"das Jahr\"?",
      options: ["year", "one", "two", "twenty"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"drei\"?",
      options: ["three", "ten", "twenty", "old"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Ich bin neunzehn.\"?",
      options: ["Lisa", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Ja, ich habe zwei Brüder.\"?",
      options: ["Lisa", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Wann ist dein Geburtstag?\"?",
      options: ["Lisa", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Wie alt bist du?\" mean?",
      options: ["How old are you?", "I am thirty years old.", "I have two brothers.", "He has twenty euros."],
      correct: 0,
    },
    {
      question: "What does \"Ich bin dreißig Jahre alt.\" mean?",
      options: ["I am thirty years old.", "I have two brothers.", "He has twenty euros.", "How old are you?"],
      correct: 0,
    },
    {
      question: "What does \"Ich habe zwei Brüder.\" mean?",
      options: ["I have two brothers.", "He has twenty euros.", "How old are you?", "I am thirty years old."],
      correct: 0,
    },
    {
      question: "What does \"Er hat zwanzig Euro.\" mean?",
      options: ["He has twenty euros.", "How old are you?", "I am thirty years old.", "I have two brothers."],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"zehn\"?",
      options: ["ten", "twenty", "hundred", "young"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Alter\"?",
      options: ["age", "old", "young", "year"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"haben\"?",
      options: ["to have", "birthday", "year", "three"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"eins\"?",
      options: ["one", "two", "three", "hundred"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"zehn\"?",
      options: ["ten", "twenty", "hundred", "young"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"zwanzig\"?",
      options: ["twenty", "hundred", "age", "to have"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"alt\"?",
      options: ["old", "young", "to have", "one"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Geburtstag\"?",
      options: ["birthday", "year", "one", "ten"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"zwei\"?",
      options: ["two", "three", "ten", "age"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00002a",
    videoTitle: "Zahlen und Alter — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'Zahlen und Alter', appropriate for A1 Goethe-Zertifikat learners."
  },
  "de-a1-3": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 3,
    title: "Die Familie",
    description: "Learn family vocabulary and possessive pronouns.",
    vocabulary: [
    { word: "die Familie", meaning: "family", example: "Meine Familie ist groß.", emoji: "👨‍👩‍👧", arabic: "" },
    { word: "die Mutter", meaning: "mother", example: "Meine Mutter kocht gern.", emoji: "👩", arabic: "" },
    { word: "der Vater", meaning: "father", example: "Mein Vater arbeitet viel.", emoji: "👨", arabic: "" },
    { word: "die Schwester", meaning: "sister", example: "Meine Schwester ist nett.", emoji: "👧", arabic: "" },
    { word: "der Bruder", meaning: "brother", example: "Mein Bruder spielt Fußball.", emoji: "👦", arabic: "" },
    { word: "die Eltern", meaning: "parents", example: "Meine Eltern wohnen in Bonn.", emoji: "👪", arabic: "" },
    { word: "der Sohn", meaning: "son", example: "Ihr Sohn ist klein.", emoji: "👶", arabic: "" },
    { word: "die Tochter", meaning: "daughter", example: "Seine Tochter lernt Deutsch.", emoji: "👧", arabic: "" },
    { word: "die Großmutter", meaning: "grandmother", example: "Meine Großmutter ist alt.", emoji: "👵", arabic: "" },
    { word: "der Großvater", meaning: "grandfather", example: "Mein Großvater liest gern.", emoji: "👴", arabic: "" },
    { word: "die Kinder", meaning: "children", example: "Die Kinder spielen draußen.", emoji: "🧒", arabic: "" },
    { word: "verheiratet", meaning: "married", example: "Meine Eltern sind verheiratet.", emoji: "💍", arabic: "" }
    ],
    dialogue: [
    { speaker: "Sara", text: "Ist das deine Familie?" },
    { speaker: "Ben", text: "Ja, das sind meine Eltern." },
    { speaker: "Sara", text: "Wie viele Geschwister hast du?" },
    { speaker: "Ben", text: "Ich habe eine Schwester." },
    { speaker: "Sara", text: "Wie heißt sie?" },
    { speaker: "Ben", text: "Sie heißt Lena." },
    { speaker: "Sara", text: "Wohnen deine Großeltern hier?" },
    { speaker: "Ben", text: "Ja, sie wohnen bei uns." }
    ],
    grammar: {
    title: "Possessivpronomen",
    examples: [
      { sentence: "Mein Vater ist Lehrer.", note: "My father is a teacher." },
      { sentence: "Meine Mutter kocht gern.", note: "My mother likes to cook." },
      { sentence: "Sein Bruder ist jung.", note: "His brother is young." },
      { sentence: "Ihre Familie ist groß.", note: "Her family is big." }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"die Schwester\"?",
      options: ["sister", "brother", "parents", "grandmother"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"der Sohn\"?",
      options: ["son", "daughter", "grandmother", "married"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"der Großvater\"?",
      options: ["grandfather", "children", "married", "father"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"die Familie\"?",
      options: ["family", "mother", "father", "parents"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"die Schwester\"?",
      options: ["sister", "brother", "parents", "grandmother"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Ich habe eine Schwester.\"?",
      options: ["Ben", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Sie heißt Lena.\"?",
      options: ["Ben", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Ja, sie wohnen bei uns.\"?",
      options: ["Ben", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Ihre Familie ist groß.\" mean?",
      options: ["Her family is big.", "My father is a teacher.", "My mother likes to cook.", "His brother is young."],
      correct: 0,
    },
    {
      question: "What does \"Mein Vater ist Lehrer.\" mean?",
      options: ["My father is a teacher.", "My mother likes to cook.", "His brother is young.", "Her family is big."],
      correct: 0,
    },
    {
      question: "What does \"Meine Mutter kocht gern.\" mean?",
      options: ["My mother likes to cook.", "His brother is young.", "Her family is big.", "My father is a teacher."],
      correct: 0,
    },
    {
      question: "What does \"Sein Bruder ist jung.\" mean?",
      options: ["His brother is young.", "Her family is big.", "My father is a teacher.", "My mother likes to cook."],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"der Bruder\"?",
      options: ["brother", "parents", "son", "grandfather"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Tochter\"?",
      options: ["daughter", "grandmother", "grandfather", "family"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Kinder\"?",
      options: ["children", "married", "family", "sister"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Mutter\"?",
      options: ["mother", "father", "sister", "son"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Bruder\"?",
      options: ["brother", "parents", "son", "grandfather"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"die Eltern\"?",
      options: ["parents", "son", "daughter", "children"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Großmutter\"?",
      options: ["grandmother", "grandfather", "children", "mother"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"verheiratet\"?",
      options: ["married", "family", "mother", "brother"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Vater\"?",
      options: ["father", "sister", "brother", "daughter"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00003a",
    videoTitle: "Die Familie — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'Die Familie', appropriate for A1 Goethe-Zertifikat learners."
  },
  "de-a1-4": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 4,
    title: "Essen und Trinken",
    description: "Learn food and drink vocabulary with mögen.",
    vocabulary: [
    { word: "das Brot", meaning: "bread", example: "Ich esse Brot zum Frühstück.", emoji: "🍞", arabic: "" },
    { word: "das Wasser", meaning: "water", example: "Ich trinke Wasser.", emoji: "💧", arabic: "" },
    { word: "der Kaffee", meaning: "coffee", example: "Der Kaffee ist heiß.", emoji: "☕", arabic: "" },
    { word: "der Apfel", meaning: "apple", example: "Der Apfel ist rot.", emoji: "🍎", arabic: "" },
    { word: "die Milch", meaning: "milk", example: "Die Milch ist kalt.", emoji: "🥛", arabic: "" },
    { word: "der Käse", meaning: "cheese", example: "Ich mag Käse.", emoji: "🧀", arabic: "" },
    { word: "das Ei", meaning: "egg", example: "Ich esse ein Ei.", emoji: "🥚", arabic: "" },
    { word: "mögen", meaning: "to like", example: "Ich mag Pizza.", emoji: "😋", arabic: "" },
    { word: "essen", meaning: "to eat", example: "Wir essen zusammen.", emoji: "🍽️", arabic: "" },
    { word: "trinken", meaning: "to drink", example: "Was trinkst du?", emoji: "🥤", arabic: "" },
    { word: "der Reis", meaning: "rice", example: "Der Reis schmeckt gut.", emoji: "🍚", arabic: "" },
    { word: "das Gemüse", meaning: "vegetable", example: "Ich esse gern Gemüse.", emoji: "🥦", arabic: "" }
    ],
    dialogue: [
    { speaker: "Emma", text: "Was isst du gern?" },
    { speaker: "Paul", text: "Ich esse gern Pizza. Und du?" },
    { speaker: "Emma", text: "Ich mag Salat." },
    { speaker: "Paul", text: "Trinkst du Kaffee?" },
    { speaker: "Emma", text: "Nein, ich trinke Tee." },
    { speaker: "Paul", text: "Magst du Käse?" },
    { speaker: "Emma", text: "Ja, sehr gern!" },
    { speaker: "Paul", text: "Dann essen wir zusammen." }
    ],
    grammar: {
    title: "Verb „mögen“ und Akkusativ",
    examples: [
      { sentence: "Ich mag Pizza.", note: "I like pizza." },
      { sentence: "Er mag keinen Fisch.", note: "He doesn't like fish." },
      { sentence: "Magst du Kaffee?", note: "Do you like coffee?" },
      { sentence: "Wir mögen Obst.", note: "We like fruit." }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"die Milch\"?",
      options: ["milk", "cheese", "egg", "to drink"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"mögen\"?",
      options: ["to like", "to eat", "to drink", "bread"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"der Reis\"?",
      options: ["rice", "vegetable", "bread", "apple"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"das Wasser\"?",
      options: ["water", "coffee", "apple", "egg"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"die Milch\"?",
      options: ["milk", "cheese", "egg", "to drink"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Nein, ich trinke Tee.\"?",
      options: ["Emma", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Ja, sehr gern!\"?",
      options: ["Emma", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Was isst du gern?\"?",
      options: ["Emma", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Ich mag Pizza.\" mean?",
      options: ["I like pizza.", "He doesn't like fish.", "Do you like coffee?", "We like fruit."],
      correct: 0,
    },
    {
      question: "What does \"Er mag keinen Fisch.\" mean?",
      options: ["He doesn't like fish.", "Do you like coffee?", "We like fruit.", "I like pizza."],
      correct: 0,
    },
    {
      question: "What does \"Magst du Kaffee?\" mean?",
      options: ["Do you like coffee?", "We like fruit.", "I like pizza.", "He doesn't like fish."],
      correct: 0,
    },
    {
      question: "What does \"Wir mögen Obst.\" mean?",
      options: ["We like fruit.", "I like pizza.", "He doesn't like fish.", "Do you like coffee?"],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"der Käse\"?",
      options: ["cheese", "egg", "to like", "rice"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"essen\"?",
      options: ["to eat", "to drink", "rice", "water"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Gemüse\"?",
      options: ["vegetable", "bread", "water", "milk"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Kaffee\"?",
      options: ["coffee", "apple", "milk", "to like"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Käse\"?",
      options: ["cheese", "egg", "to like", "rice"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"das Ei\"?",
      options: ["egg", "to like", "to eat", "vegetable"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"trinken\"?",
      options: ["to drink", "rice", "vegetable", "coffee"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Brot\"?",
      options: ["bread", "water", "coffee", "cheese"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Apfel\"?",
      options: ["apple", "milk", "cheese", "to eat"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00004a",
    videoTitle: "Essen und Trinken — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'Essen und Trinken', appropriate for A1 Goethe-Zertifikat learners."
  },
  "de-a1-5": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 5,
    title: "Im Restaurant",
    description: "Learn to order food in a restaurant.",
    vocabulary: [
    { word: "das Restaurant", meaning: "restaurant", example: "Wir gehen ins Restaurant.", emoji: "🍴", arabic: "" },
    { word: "die Speisekarte", meaning: "menu", example: "Kann ich die Speisekarte haben?", emoji: "📋", arabic: "" },
    { word: "bestellen", meaning: "to order", example: "Ich möchte bestellen.", emoji: "✍️", arabic: "" },
    { word: "die Suppe", meaning: "soup", example: "Die Suppe ist lecker.", emoji: "🍲", arabic: "" },
    { word: "das Fleisch", meaning: "meat", example: "Ich esse kein Fleisch.", emoji: "🥩", arabic: "" },
    { word: "der Salat", meaning: "salad", example: "Der Salat ist frisch.", emoji: "🥗", arabic: "" },
    { word: "die Rechnung", meaning: "bill", example: "Die Rechnung, bitte.", emoji: "🧾", arabic: "" },
    { word: "der Kellner", meaning: "waiter", example: "Der Kellner ist freundlich.", emoji: "🧑‍🍳", arabic: "" },
    { word: "möchten", meaning: "would like", example: "Ich möchte Wasser.", emoji: "🙏", arabic: "" },
    { word: "lecker", meaning: "tasty", example: "Das Essen ist lecker.", emoji: "😋", arabic: "" },
    { word: "die Vorspeise", meaning: "starter", example: "Die Vorspeise ist klein.", emoji: "🥙", arabic: "" },
    { word: "der Nachtisch", meaning: "dessert", example: "Der Nachtisch ist süß.", emoji: "🍰", arabic: "" }
    ],
    dialogue: [
    { speaker: "Kellner", text: "Guten Tag, was möchten Sie?" },
    { speaker: "Gast", text: "Ich möchte eine Suppe, bitte." },
    { speaker: "Kellner", text: "Und zu trinken?" },
    { speaker: "Gast", text: "Ein Wasser, bitte." },
    { speaker: "Kellner", text: "Möchten Sie auch einen Nachtisch?" },
    { speaker: "Gast", text: "Nein, danke." },
    { speaker: "Gast", text: "Die Rechnung, bitte." },
    { speaker: "Kellner", text: "Sofort, bitte schön." }
    ],
    grammar: {
    title: "Bestellen mit Modalverben",
    examples: [
      { sentence: "Ich möchte einen Salat.", note: "I would like a salad." },
      { sentence: "Möchten Sie Wasser?", note: "Would you like water?" },
      { sentence: "Wir möchten bestellen.", note: "We would like to order." },
      { sentence: "Er möchte die Rechnung.", note: "He would like the bill." }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"der Salat\"?",
      options: ["salad", "bill", "waiter", "starter"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"möchten\"?",
      options: ["would like", "tasty", "starter", "menu"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"der Nachtisch\"?",
      options: ["dessert", "restaurant", "menu", "meat"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"bestellen\"?",
      options: ["to order", "soup", "meat", "waiter"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"der Salat\"?",
      options: ["salad", "bill", "waiter", "starter"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Nein, danke.\"?",
      options: ["Gast", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Sofort, bitte schön.\"?",
      options: ["Kellner", "Gast", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Ich möchte eine Suppe, bitte.\"?",
      options: ["Gast", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Möchten Sie Wasser?\" mean?",
      options: ["Would you like water?", "We would like to order.", "He would like the bill.", "I would like a salad."],
      correct: 0,
    },
    {
      question: "What does \"Wir möchten bestellen.\" mean?",
      options: ["We would like to order.", "He would like the bill.", "I would like a salad.", "Would you like water?"],
      correct: 0,
    },
    {
      question: "What does \"Er möchte die Rechnung.\" mean?",
      options: ["He would like the bill.", "I would like a salad.", "Would you like water?", "We would like to order."],
      correct: 0,
    },
    {
      question: "What does \"Ich möchte einen Salat.\" mean?",
      options: ["I would like a salad.", "Would you like water?", "We would like to order.", "He would like the bill."],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"die Rechnung\"?",
      options: ["bill", "waiter", "would like", "dessert"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"lecker\"?",
      options: ["tasty", "starter", "dessert", "to order"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Restaurant\"?",
      options: ["restaurant", "menu", "to order", "salad"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Suppe\"?",
      options: ["soup", "meat", "salad", "would like"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Rechnung\"?",
      options: ["bill", "waiter", "would like", "dessert"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"der Kellner\"?",
      options: ["waiter", "would like", "tasty", "restaurant"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Vorspeise\"?",
      options: ["starter", "dessert", "restaurant", "soup"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Speisekarte\"?",
      options: ["menu", "to order", "soup", "bill"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Fleisch\"?",
      options: ["meat", "salad", "bill", "tasty"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00005a",
    videoTitle: "Im Restaurant — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'Im Restaurant', appropriate for A1 Goethe-Zertifikat learners."
  },
  "de-a1-6": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 6,
    title: "Die Uhrzeit",
    description: "Learn to tell the time in German.",
    vocabulary: [
    { word: "die Uhr", meaning: "clock", example: "Wie viel Uhr ist es?", emoji: "🕐", arabic: "" },
    { word: "die Stunde", meaning: "hour", example: "Eine Stunde hat sechzig Minuten.", emoji: "⏰", arabic: "" },
    { word: "die Minute", meaning: "minute", example: "Warte eine Minute.", emoji: "⏱️", arabic: "" },
    { word: "halb", meaning: "half", example: "Es ist halb zehn.", emoji: "🕧", arabic: "" },
    { word: "Viertel", meaning: "quarter", example: "Viertel nach drei.", emoji: "🕒", arabic: "" },
    { word: "früh", meaning: "early", example: "Ich stehe früh auf.", emoji: "🌄", arabic: "" },
    { word: "spät", meaning: "late", example: "Es ist schon spät.", emoji: "🌙", arabic: "" },
    { word: "der Wecker", meaning: "alarm clock", example: "Der Wecker klingelt.", emoji: "⏰", arabic: "" },
    { word: "pünktlich", meaning: "on time", example: "Sei bitte pünktlich!", emoji: "⌚", arabic: "" },
    { word: "die Zeit", meaning: "time", example: "Ich habe keine Zeit.", emoji: "⏳", arabic: "" },
    { word: "jetzt", meaning: "now", example: "Wir müssen jetzt gehen.", emoji: "👉", arabic: "" },
    { word: "dauern", meaning: "to last", example: "Der Film dauert zwei Stunden.", emoji: "⏲️", arabic: "" }
    ],
    dialogue: [
    { speaker: "Tim", text: "Wie viel Uhr ist es?" },
    { speaker: "Nina", text: "Es ist halb zehn." },
    { speaker: "Tim", text: "Wann beginnt der Film?" },
    { speaker: "Nina", text: "Um Viertel nach zehn." },
    { speaker: "Tim", text: "Das ist bald!" },
    { speaker: "Nina", text: "Ja, wir müssen uns beeilen." },
    { speaker: "Tim", text: "Wann bist du zurück?" },
    { speaker: "Nina", text: "Um zwölf Uhr." }
    ],
    grammar: {
    title: "Die Uhrzeit",
    examples: [
      { sentence: "Es ist zehn Uhr.", note: "It is ten o'clock." },
      { sentence: "Es ist halb neun.", note: "It is half past eight." },
      { sentence: "Es ist Viertel nach drei.", note: "It is quarter past three." },
      { sentence: "Es ist fünf vor zwölf.", note: "It is five to twelve." }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"spät\"?",
      options: ["late", "alarm clock", "on time", "to last"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"die Zeit\"?",
      options: ["time", "now", "to last", "minute"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"die Uhr\"?",
      options: ["clock", "hour", "minute", "early"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"halb\"?",
      options: ["half", "quarter", "early", "on time"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"spät\"?",
      options: ["late", "alarm clock", "on time", "to last"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Wann bist du zurück?\"?",
      options: ["Tim", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Wie viel Uhr ist es?\"?",
      options: ["Tim", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Wann beginnt der Film?\"?",
      options: ["Tim", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Es ist Viertel nach drei.\" mean?",
      options: ["It is quarter past three.", "It is five to twelve.", "It is ten o'clock.", "It is half past eight."],
      correct: 0,
    },
    {
      question: "What does \"Es ist fünf vor zwölf.\" mean?",
      options: ["It is five to twelve.", "It is ten o'clock.", "It is half past eight.", "It is quarter past three."],
      correct: 0,
    },
    {
      question: "What does \"Es ist zehn Uhr.\" mean?",
      options: ["It is ten o'clock.", "It is half past eight.", "It is quarter past three.", "It is five to twelve."],
      correct: 0,
    },
    {
      question: "What does \"Es ist halb neun.\" mean?",
      options: ["It is half past eight.", "It is quarter past three.", "It is five to twelve.", "It is ten o'clock."],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"der Wecker\"?",
      options: ["alarm clock", "on time", "time", "clock"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"jetzt\"?",
      options: ["now", "to last", "clock", "half"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Stunde\"?",
      options: ["hour", "minute", "half", "late"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"Viertel\"?",
      options: ["quarter", "early", "late", "time"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Wecker\"?",
      options: ["alarm clock", "on time", "time", "clock"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"pünktlich\"?",
      options: ["on time", "time", "now", "hour"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"dauern\"?",
      options: ["to last", "clock", "hour", "quarter"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Minute\"?",
      options: ["minute", "half", "quarter", "alarm clock"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"früh\"?",
      options: ["early", "late", "alarm clock", "now"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00006a",
    videoTitle: "Die Uhrzeit — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'Die Uhrzeit', appropriate for A1 Goethe-Zertifikat learners."
  },
  "de-a1-7": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 7,
    title: "Der Tag und die Woche",
    description: "Learn days of the week and time prepositions.",
    vocabulary: [
    { word: "der Montag", meaning: "Monday", example: "Am Montag arbeite ich.", emoji: "📅", arabic: "" },
    { word: "der Dienstag", meaning: "Tuesday", example: "Am Dienstag lerne ich Deutsch.", emoji: "📅", arabic: "" },
    { word: "der Mittwoch", meaning: "Wednesday", example: "Am Mittwoch habe ich frei.", emoji: "📅", arabic: "" },
    { word: "der Donnerstag", meaning: "Thursday", example: "Am Donnerstag gehe ich einkaufen.", emoji: "📅", arabic: "" },
    { word: "der Freitag", meaning: "Friday", example: "Am Freitag feiern wir.", emoji: "🎉", arabic: "" },
    { word: "das Wochenende", meaning: "weekend", example: "Das Wochenende ist schön.", emoji: "🏖️", arabic: "" },
    { word: "die Woche", meaning: "week", example: "Diese Woche ist lang.", emoji: "🗓️", arabic: "" },
    { word: "heute", meaning: "today", example: "Heute ist Montag.", emoji: "📌", arabic: "" },
    { word: "morgen", meaning: "tomorrow", example: "Morgen habe ich Zeit.", emoji: "➡️", arabic: "" },
    { word: "gestern", meaning: "yesterday", example: "Gestern war Sonntag.", emoji: "⬅️", arabic: "" },
    { word: "der Monat", meaning: "month", example: "Der Monat hat vier Wochen.", emoji: "📆", arabic: "" },
    { word: "im Sommer", meaning: "in summer", example: "Im Sommer ist es warm.", emoji: "☀️", arabic: "" }
    ],
    dialogue: [
    { speaker: "Jan", text: "Was machst du am Montag?" },
    { speaker: "Mia", text: "Am Montag arbeite ich." },
    { speaker: "Jan", text: "Und am Wochenende?" },
    { speaker: "Mia", text: "Am Wochenende habe ich frei." },
    { speaker: "Jan", text: "Hast du am Freitag Zeit?" },
    { speaker: "Mia", text: "Ja, am Freitag bin ich frei." },
    { speaker: "Jan", text: "Super, dann treffen wir uns." },
    { speaker: "Mia", text: "Gute Idee!" }
    ],
    grammar: {
    title: "Wochentage mit „am“",
    examples: [
      { sentence: "Am Montag arbeite ich.", note: "On Monday I work." },
      { sentence: "Am Wochenende habe ich frei.", note: "On the weekend I am free." },
      { sentence: "Im Sommer ist es warm.", note: "In summer it is warm." },
      { sentence: "Im Mai habe ich Geburtstag.", note: "In May I have my birthday." }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"heute\"?",
      options: ["today", "tomorrow", "yesterday", "Monday"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"der Monat\"?",
      options: ["month", "in summer", "Monday", "Thursday"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"der Dienstag\"?",
      options: ["Tuesday", "Wednesday", "Thursday", "week"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"der Freitag\"?",
      options: ["Friday", "weekend", "week", "yesterday"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"heute\"?",
      options: ["today", "tomorrow", "yesterday", "Monday"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Gute Idee!\"?",
      options: ["Mia", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Am Montag arbeite ich.\"?",
      options: ["Mia", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Am Wochenende habe ich frei.\"?",
      options: ["Mia", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Im Mai habe ich Geburtstag.\" mean?",
      options: ["In May I have my birthday.", "On Monday I work.", "On the weekend I am free.", "In summer it is warm."],
      correct: 0,
    },
    {
      question: "What does \"Am Montag arbeite ich.\" mean?",
      options: ["On Monday I work.", "On the weekend I am free.", "In summer it is warm.", "In May I have my birthday."],
      correct: 0,
    },
    {
      question: "What does \"Am Wochenende habe ich frei.\" mean?",
      options: ["On the weekend I am free.", "In summer it is warm.", "In May I have my birthday.", "On Monday I work."],
      correct: 0,
    },
    {
      question: "What does \"Im Sommer ist es warm.\" mean?",
      options: ["In summer it is warm.", "In May I have my birthday.", "On Monday I work.", "On the weekend I am free."],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"morgen\"?",
      options: ["tomorrow", "yesterday", "month", "Tuesday"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"im Sommer\"?",
      options: ["in summer", "Monday", "Tuesday", "Friday"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Mittwoch\"?",
      options: ["Wednesday", "Thursday", "Friday", "today"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Wochenende\"?",
      options: ["weekend", "week", "today", "month"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"morgen\"?",
      options: ["tomorrow", "yesterday", "month", "Tuesday"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"gestern\"?",
      options: ["yesterday", "month", "in summer", "Wednesday"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Montag\"?",
      options: ["Monday", "Tuesday", "Wednesday", "weekend"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Donnerstag\"?",
      options: ["Thursday", "Friday", "weekend", "tomorrow"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Woche\"?",
      options: ["week", "today", "tomorrow", "in summer"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00007a",
    videoTitle: "Der Tag und die Woche — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'Der Tag und die Woche', appropriate for A1 Goethe-Zertifikat learners."
  },
  "de-a1-8": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 8,
    title: "Das Haus und die Möbel",
    description: "Learn house and furniture vocabulary with es gibt.",
    vocabulary: [
    { word: "das Haus", meaning: "house", example: "Mein Haus ist groß.", emoji: "🏠", arabic: "" },
    { word: "die Wohnung", meaning: "apartment", example: "Die Wohnung ist klein.", emoji: "🏢", arabic: "" },
    { word: "das Zimmer", meaning: "room", example: "Das Zimmer ist hell.", emoji: "🚪", arabic: "" },
    { word: "die Küche", meaning: "kitchen", example: "Die Küche ist modern.", emoji: "🍳", arabic: "" },
    { word: "das Bad", meaning: "bathroom", example: "Das Bad ist sauber.", emoji: "🛁", arabic: "" },
    { word: "der Tisch", meaning: "table", example: "Der Tisch ist aus Holz.", emoji: "🪑", arabic: "" },
    { word: "der Stuhl", meaning: "chair", example: "Der Stuhl ist bequem.", emoji: "🪑", arabic: "" },
    { word: "das Bett", meaning: "bed", example: "Das Bett ist weich.", emoji: "🛏️", arabic: "" },
    { word: "der Schrank", meaning: "cupboard", example: "Der Schrank ist voll.", emoji: "🗄️", arabic: "" },
    { word: "das Sofa", meaning: "sofa", example: "Das Sofa ist neu.", emoji: "🛋️", arabic: "" },
    { word: "es gibt", meaning: "there is/are", example: "Es gibt einen Tisch.", emoji: "➕", arabic: "" },
    { word: "wohnen", meaning: "to live", example: "Wir wohnen hier.", emoji: "🏡", arabic: "" }
    ],
    dialogue: [
    { speaker: "Paul", text: "Wie ist deine Wohnung?" },
    { speaker: "Ella", text: "Sie ist klein, aber schön." },
    { speaker: "Paul", text: "Gibt es eine Küche?" },
    { speaker: "Ella", text: "Ja, es gibt eine kleine Küche." },
    { speaker: "Paul", text: "Und wie viele Zimmer?" },
    { speaker: "Ella", text: "Es gibt zwei Zimmer." },
    { speaker: "Paul", text: "Hast du auch ein Sofa?" },
    { speaker: "Ella", text: "Ja, im Wohnzimmer." }
    ],
    grammar: {
    title: "„Es gibt“ und Akkusativ-Artikel",
    examples: [
      { sentence: "Es gibt einen Tisch im Zimmer.", note: "There is a table in the room." },
      { sentence: "Es gibt einen Stuhl.", note: "There is a chair." },
      { sentence: "Es gibt keine Küche.", note: "There is no kitchen." },
      { sentence: "Gibt es ein Bad?", note: "Is there a bathroom?" }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"der Schrank\"?",
      options: ["cupboard", "sofa", "there is/are", "apartment"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"wohnen\"?",
      options: ["to live", "house", "apartment", "bathroom"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"das Zimmer\"?",
      options: ["room", "kitchen", "bathroom", "bed"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"der Tisch\"?",
      options: ["table", "chair", "bed", "there is/are"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"der Schrank\"?",
      options: ["cupboard", "sofa", "there is/are", "apartment"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Wie ist deine Wohnung?\"?",
      options: ["Paul", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Gibt es eine Küche?\"?",
      options: ["Paul", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Und wie viele Zimmer?\"?",
      options: ["Paul", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Es gibt einen Tisch im Zimmer.\" mean?",
      options: ["There is a table in the room.", "There is a chair.", "There is no kitchen.", "Is there a bathroom?"],
      correct: 0,
    },
    {
      question: "What does \"Es gibt einen Stuhl.\" mean?",
      options: ["There is a chair.", "There is no kitchen.", "Is there a bathroom?", "There is a table in the room."],
      correct: 0,
    },
    {
      question: "What does \"Es gibt keine Küche.\" mean?",
      options: ["There is no kitchen.", "Is there a bathroom?", "There is a table in the room.", "There is a chair."],
      correct: 0,
    },
    {
      question: "What does \"Gibt es ein Bad?\" mean?",
      options: ["Is there a bathroom?", "There is a table in the room.", "There is a chair.", "There is no kitchen."],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"das Sofa\"?",
      options: ["sofa", "there is/are", "to live", "room"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Haus\"?",
      options: ["house", "apartment", "room", "table"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Küche\"?",
      options: ["kitchen", "bathroom", "table", "cupboard"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Stuhl\"?",
      options: ["chair", "bed", "cupboard", "to live"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Sofa\"?",
      options: ["sofa", "there is/are", "to live", "room"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"es gibt\"?",
      options: ["there is/are", "to live", "house", "kitchen"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Wohnung\"?",
      options: ["apartment", "room", "kitchen", "chair"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Bad\"?",
      options: ["bathroom", "table", "chair", "sofa"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Bett\"?",
      options: ["bed", "cupboard", "sofa", "house"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00008a",
    videoTitle: "Das Haus und die Möbel — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'Das Haus und die Möbel', appropriate for A1 Goethe-Zertifikat learners."
  },
  "de-a1-9": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 9,
    title: "In der Stadt",
    description: "Learn city vocabulary and wo/wohin questions.",
    vocabulary: [
    { word: "die Stadt", meaning: "city", example: "Die Stadt ist groß.", emoji: "🏙️", arabic: "" },
    { word: "die Straße", meaning: "street", example: "Die Straße ist lang.", emoji: "🛣️", arabic: "" },
    { word: "der Markt", meaning: "market", example: "Der Markt ist heute offen.", emoji: "🏪", arabic: "" },
    { word: "die Bank", meaning: "bank", example: "Die Bank ist geschlossen.", emoji: "🏦", arabic: "" },
    { word: "die Kirche", meaning: "church", example: "Die Kirche ist alt.", emoji: "⛪", arabic: "" },
    { word: "der Park", meaning: "park", example: "Der Park ist grün.", emoji: "🌳", arabic: "" },
    { word: "das Museum", meaning: "museum", example: "Das Museum ist interessant.", emoji: "🏛️", arabic: "" },
    { word: "wo", meaning: "where", example: "Wo ist der Bahnhof?", emoji: "❓", arabic: "" },
    { word: "wohin", meaning: "where to", example: "Wohin gehst du?", emoji: "➡️", arabic: "" },
    { word: "links", meaning: "left", example: "Gehen Sie links.", emoji: "⬅️", arabic: "" },
    { word: "rechts", meaning: "right", example: "Gehen Sie rechts.", emoji: "➡️", arabic: "" },
    { word: "geradeaus", meaning: "straight ahead", example: "Gehen Sie geradeaus.", emoji: "⬆️", arabic: "" }
    ],
    dialogue: [
    { speaker: "Lea", text: "Entschuldigung, wo ist die Bank?" },
    { speaker: "Mann", text: "Die Bank ist rechts." },
    { speaker: "Lea", text: "Und wohin gehe ich zum Museum?" },
    { speaker: "Mann", text: "Gehen Sie geradeaus." },
    { speaker: "Lea", text: "Ist der Park weit?" },
    { speaker: "Mann", text: "Nein, er ist ganz nah." },
    { speaker: "Lea", text: "Danke schön!" },
    { speaker: "Mann", text: "Bitte schön!" }
    ],
    grammar: {
    title: "Fragewörter „wo“ und „wohin“",
    examples: [
      { sentence: "Wo ist der Bahnhof?", note: "Where is the train station?" },
      { sentence: "Wohin gehst du?", note: "Where are you going?" },
      { sentence: "Wo wohnst du?", note: "Where do you live?" },
      { sentence: "Wohin fährst du heute?", note: "Where are you driving today?" }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"links\"?",
      options: ["left", "right", "straight ahead", "market"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"die Stadt\"?",
      options: ["city", "street", "market", "park"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"die Bank\"?",
      options: ["bank", "church", "park", "where to"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"das Museum\"?",
      options: ["museum", "where", "where to", "straight ahead"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"links\"?",
      options: ["left", "right", "straight ahead", "market"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Die Bank ist rechts.\"?",
      options: ["Mann", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Gehen Sie geradeaus.\"?",
      options: ["Mann", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Nein, er ist ganz nah.\"?",
      options: ["Mann", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Wohin gehst du?\" mean?",
      options: ["Where are you going?", "Where do you live?", "Where are you driving today?", "Where is the train station?"],
      correct: 0,
    },
    {
      question: "What does \"Wo wohnst du?\" mean?",
      options: ["Where do you live?", "Where are you driving today?", "Where is the train station?", "Where are you going?"],
      correct: 0,
    },
    {
      question: "What does \"Wohin fährst du heute?\" mean?",
      options: ["Where are you driving today?", "Where is the train station?", "Where are you going?", "Where do you live?"],
      correct: 0,
    },
    {
      question: "What does \"Wo ist der Bahnhof?\" mean?",
      options: ["Where is the train station?", "Where are you going?", "Where do you live?", "Where are you driving today?"],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"rechts\"?",
      options: ["right", "straight ahead", "city", "bank"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Straße\"?",
      options: ["street", "market", "bank", "museum"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Kirche\"?",
      options: ["church", "park", "museum", "left"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"wo\"?",
      options: ["where", "where to", "left", "city"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"rechts\"?",
      options: ["right", "straight ahead", "city", "bank"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"geradeaus\"?",
      options: ["straight ahead", "city", "street", "church"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Markt\"?",
      options: ["market", "bank", "church", "where"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Park\"?",
      options: ["park", "museum", "where", "right"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"wohin\"?",
      options: ["where to", "left", "right", "street"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00009a",
    videoTitle: "In der Stadt — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'In der Stadt', appropriate for A1 Goethe-Zertifikat learners."
  },
  "de-a1-10": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 10,
    title: "Verkehrsmittel",
    description: "Learn transportation vocabulary with mit + Dativ.",
    vocabulary: [
    { word: "der Bus", meaning: "bus", example: "Der Bus kommt gleich.", emoji: "🚌", arabic: "" },
    { word: "die Bahn", meaning: "train", example: "Die Bahn ist pünktlich.", emoji: "🚆", arabic: "" },
    { word: "das Auto", meaning: "car", example: "Mein Auto ist rot.", emoji: "🚗", arabic: "" },
    { word: "das Fahrrad", meaning: "bicycle", example: "Ich fahre mit dem Fahrrad.", emoji: "🚲", arabic: "" },
    { word: "das Taxi", meaning: "taxi", example: "Wir nehmen ein Taxi.", emoji: "🚕", arabic: "" },
    { word: "der Bahnhof", meaning: "train station", example: "Der Bahnhof ist nah.", emoji: "🚉", arabic: "" },
    { word: "die Haltestelle", meaning: "bus stop", example: "Die Haltestelle ist hier.", emoji: "🚏", arabic: "" },
    { word: "fahren", meaning: "to drive/ride", example: "Ich fahre mit dem Bus.", emoji: "🛣️", arabic: "" },
    { word: "das Ticket", meaning: "ticket", example: "Ich kaufe ein Ticket.", emoji: "🎫", arabic: "" },
    { word: "zu Fuß", meaning: "on foot", example: "Ich gehe zu Fuß.", emoji: "🚶", arabic: "" },
    { word: "mit", meaning: "with", example: "Ich fahre mit der Bahn.", emoji: "➕", arabic: "" },
    { word: "das Flugzeug", meaning: "airplane", example: "Das Flugzeug fliegt hoch.", emoji: "✈️", arabic: "" }
    ],
    dialogue: [
    { speaker: "Tom", text: "Wie fährst du zur Arbeit?" },
    { speaker: "Nora", text: "Ich fahre mit dem Bus." },
    { speaker: "Tom", text: "Ich fahre mit dem Fahrrad." },
    { speaker: "Nora", text: "Ist das nicht weit?" },
    { speaker: "Tom", text: "Nein, es ist nah." },
    { speaker: "Nora", text: "Der Bahnhof ist auch nah." },
    { speaker: "Tom", text: "Fährst du auch mit der Bahn?" },
    { speaker: "Nora", text: "Manchmal, ja." }
    ],
    grammar: {
    title: "Präposition „mit“ + Dativ",
    examples: [
      { sentence: "Ich fahre mit dem Bus.", note: "I go by bus." },
      { sentence: "Sie fährt mit der Bahn.", note: "She goes by train." },
      { sentence: "Wir fahren mit dem Auto.", note: "We go by car." },
      { sentence: "Er kommt mit dem Fahrrad.", note: "He comes by bicycle." }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"mit\"?",
      options: ["with", "airplane", "bus", "bicycle"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"die Bahn\"?",
      options: ["train", "car", "bicycle", "bus stop"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"das Taxi\"?",
      options: ["taxi", "train station", "bus stop", "on foot"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"fahren\"?",
      options: ["to drive/ride", "ticket", "on foot", "bus"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"mit\"?",
      options: ["with", "airplane", "bus", "bicycle"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Ich fahre mit dem Fahrrad.\"?",
      options: ["Tom", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Nein, es ist nah.\"?",
      options: ["Tom", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Fährst du auch mit der Bahn?\"?",
      options: ["Tom", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Wir fahren mit dem Auto.\" mean?",
      options: ["We go by car.", "He comes by bicycle.", "I go by bus.", "She goes by train."],
      correct: 0,
    },
    {
      question: "What does \"Er kommt mit dem Fahrrad.\" mean?",
      options: ["He comes by bicycle.", "I go by bus.", "She goes by train.", "We go by car."],
      correct: 0,
    },
    {
      question: "What does \"Ich fahre mit dem Bus.\" mean?",
      options: ["I go by bus.", "She goes by train.", "We go by car.", "He comes by bicycle."],
      correct: 0,
    },
    {
      question: "What does \"Sie fährt mit der Bahn.\" mean?",
      options: ["She goes by train.", "We go by car.", "He comes by bicycle.", "I go by bus."],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"das Flugzeug\"?",
      options: ["airplane", "bus", "train", "taxi"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Auto\"?",
      options: ["car", "bicycle", "taxi", "to drive/ride"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Bahnhof\"?",
      options: ["train station", "bus stop", "to drive/ride", "with"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Ticket\"?",
      options: ["ticket", "on foot", "with", "train"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Flugzeug\"?",
      options: ["airplane", "bus", "train", "taxi"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"der Bus\"?",
      options: ["bus", "train", "car", "train station"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Fahrrad\"?",
      options: ["bicycle", "taxi", "train station", "ticket"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Haltestelle\"?",
      options: ["bus stop", "to drive/ride", "ticket", "airplane"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"zu Fuß\"?",
      options: ["on foot", "with", "airplane", "car"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00010a",
    videoTitle: "Verkehrsmittel — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'Verkehrsmittel', appropriate for A1 Goethe-Zertifikat learners."
  },
  "de-a1-11": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 11,
    title: "Hobbys und Freizeit",
    description: "Learn hobbies and free time activities with gern.",
    vocabulary: [
    { word: "das Hobby", meaning: "hobby", example: "Mein Hobby ist Lesen.", emoji: "🎨", arabic: "" },
    { word: "lesen", meaning: "to read", example: "Ich lese gern Bücher.", emoji: "📖", arabic: "" },
    { word: "schwimmen", meaning: "to swim", example: "Ich schwimme gern.", emoji: "🏊", arabic: "" },
    { word: "tanzen", meaning: "to dance", example: "Sie tanzt gern.", emoji: "💃", arabic: "" },
    { word: "singen", meaning: "to sing", example: "Er singt gern.", emoji: "🎤", arabic: "" },
    { word: "malen", meaning: "to paint", example: "Wir malen gern.", emoji: "🎨", arabic: "" },
    { word: "die Musik", meaning: "music", example: "Ich höre gern Musik.", emoji: "🎵", arabic: "" },
    { word: "der Sport", meaning: "sport", example: "Sport macht Spaß.", emoji: "⚽", arabic: "" },
    { word: "das Spiel", meaning: "game", example: "Das Spiel ist spannend.", emoji: "🎮", arabic: "" },
    { word: "gern", meaning: "gladly", example: "Ich spiele gern Fußball.", emoji: "😊", arabic: "" },
    { word: "die Freizeit", meaning: "free time", example: "Meine Freizeit ist wichtig.", emoji: "🕹️", arabic: "" },
    { word: "wandern", meaning: "to hike", example: "Wir wandern im Wald.", emoji: "🥾", arabic: "" }
    ],
    dialogue: [
    { speaker: "Anja", text: "Was ist dein Hobby?" },
    { speaker: "Felix", text: "Ich lese gern Bücher." },
    { speaker: "Anja", text: "Ich schwimme gern." },
    { speaker: "Felix", text: "Machst du auch Sport?" },
    { speaker: "Anja", text: "Ja, ich spiele gern Fußball." },
    { speaker: "Felix", text: "Ich höre gern Musik." },
    { speaker: "Anja", text: "Tanzt du auch gern?" },
    { speaker: "Felix", text: "Ja, sehr gern!" }
    ],
    grammar: {
    title: "„Gern“ mit Verben",
    examples: [
      { sentence: "Ich lese gern Bücher.", note: "I like reading books." },
      { sentence: "Er schwimmt gern.", note: "He likes swimming." },
      { sentence: "Wir tanzen gern.", note: "We like dancing." },
      { sentence: "Magst du auch gern Musik hören?", note: "Do you also like listening to music?" }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"wandern\"?",
      options: ["to hike", "hobby", "to read", "to sing"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"schwimmen\"?",
      options: ["to swim", "to dance", "to sing", "sport"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"malen\"?",
      options: ["to paint", "music", "sport", "free time"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"das Spiel\"?",
      options: ["game", "gladly", "free time", "to read"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"wandern\"?",
      options: ["to hike", "hobby", "to read", "to sing"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Machst du auch Sport?\"?",
      options: ["Felix", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Ich höre gern Musik.\"?",
      options: ["Felix", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Ja, sehr gern!\"?",
      options: ["Felix", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Magst du auch gern Musik hören?\" mean?",
      options: ["Do you also like listening to music?", "I like reading books.", "He likes swimming.", "We like dancing."],
      correct: 0,
    },
    {
      question: "What does \"Ich lese gern Bücher.\" mean?",
      options: ["I like reading books.", "He likes swimming.", "We like dancing.", "Do you also like listening to music?"],
      correct: 0,
    },
    {
      question: "What does \"Er schwimmt gern.\" mean?",
      options: ["He likes swimming.", "We like dancing.", "Do you also like listening to music?", "I like reading books."],
      correct: 0,
    },
    {
      question: "What does \"Wir tanzen gern.\" mean?",
      options: ["We like dancing.", "Do you also like listening to music?", "I like reading books.", "He likes swimming."],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"das Hobby\"?",
      options: ["hobby", "to read", "to swim", "to paint"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"tanzen\"?",
      options: ["to dance", "to sing", "to paint", "game"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Musik\"?",
      options: ["music", "sport", "game", "to hike"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"gern\"?",
      options: ["gladly", "free time", "to hike", "to swim"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Hobby\"?",
      options: ["hobby", "to read", "to swim", "to paint"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"lesen\"?",
      options: ["to read", "to swim", "to dance", "music"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"singen\"?",
      options: ["to sing", "to paint", "music", "gladly"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Sport\"?",
      options: ["sport", "game", "gladly", "hobby"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Freizeit\"?",
      options: ["free time", "to hike", "hobby", "to dance"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00011a",
    videoTitle: "Hobbys und Freizeit — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'Hobbys und Freizeit', appropriate for A1 Goethe-Zertifikat learners."
  },
  "de-a1-12": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 12,
    title: "Einkaufen — Akkusativ",
    description: "Learn shopping vocabulary and Akkusativ case.",
    vocabulary: [
    { word: "kaufen", meaning: "to buy", example: "Ich kaufe ein Buch.", emoji: "🛍️", arabic: "" },
    { word: "das Geschäft", meaning: "shop", example: "Das Geschäft ist offen.", emoji: "🏬", arabic: "" },
    { word: "der Preis", meaning: "price", example: "Der Preis ist hoch.", emoji: "💰", arabic: "" },
    { word: "billig", meaning: "cheap", example: "Das ist billig.", emoji: "💵", arabic: "" },
    { word: "teuer", meaning: "expensive", example: "Das ist teuer.", emoji: "💎", arabic: "" },
    { word: "die Tasche", meaning: "bag", example: "Ich brauche eine Tasche.", emoji: "👜", arabic: "" },
    { word: "brauchen", meaning: "to need", example: "Ich brauche einen Mantel.", emoji: "🔍", arabic: "" },
    { word: "nehmen", meaning: "to take", example: "Ich nehme das Buch.", emoji: "🤲", arabic: "" },
    { word: "bezahlen", meaning: "to pay", example: "Ich bezahle an der Kasse.", emoji: "💳", arabic: "" },
    { word: "die Kasse", meaning: "cashier", example: "Die Kasse ist dort.", emoji: "🏧", arabic: "" },
    { word: "suchen", meaning: "to search", example: "Ich suche einen Rock.", emoji: "🔎", arabic: "" },
    { word: "das Angebot", meaning: "offer", example: "Das Angebot ist gut.", emoji: "🏷️", arabic: "" }
    ],
    dialogue: [
    { speaker: "Verkäufer", text: "Kann ich Ihnen helfen?" },
    { speaker: "Kunde", text: "Ja, ich suche einen Mantel." },
    { speaker: "Verkäufer", text: "Welche Größe brauchen Sie?" },
    { speaker: "Kunde", text: "Größe vierzig, bitte." },
    { speaker: "Verkäufer", text: "Hier ist ein schöner Mantel." },
    { speaker: "Kunde", text: "Was kostet er?" },
    { speaker: "Verkäufer", text: "Er kostet fünfzig Euro." },
    { speaker: "Kunde", text: "Ich nehme ihn." }
    ],
    grammar: {
    title: "Akkusativ mit „ein/einen“",
    examples: [
      { sentence: "Ich kaufe einen Rock.", note: "I am buying a skirt." },
      { sentence: "Er nimmt einen Mantel.", note: "He takes a coat." },
      { sentence: "Sie sucht eine Tasche.", note: "She is looking for a bag." },
      { sentence: "Wir brauchen ein Buch.", note: "We need a book." }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"kaufen\"?",
      options: ["to buy", "shop", "price", "bag"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"billig\"?",
      options: ["cheap", "expensive", "bag", "to pay"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"brauchen\"?",
      options: ["to need", "to take", "to pay", "offer"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"die Kasse\"?",
      options: ["cashier", "to search", "offer", "price"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"kaufen\"?",
      options: ["to buy", "shop", "price", "bag"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Hier ist ein schöner Mantel.\"?",
      options: ["Verkäufer", "Kellner", "Arzt", "Kunde"],
      correct: 0,
    },
    {
      question: "Who says: \"Er kostet fünfzig Euro.\"?",
      options: ["Verkäufer", "Kellner", "Arzt", "Kunde"],
      correct: 0,
    },
    {
      question: "Who says: \"Kann ich Ihnen helfen?\"?",
      options: ["Verkäufer", "Kellner", "Arzt", "Kunde"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Ich kaufe einen Rock.\" mean?",
      options: ["I am buying a skirt.", "He takes a coat.", "She is looking for a bag.", "We need a book."],
      correct: 0,
    },
    {
      question: "What does \"Er nimmt einen Mantel.\" mean?",
      options: ["He takes a coat.", "She is looking for a bag.", "We need a book.", "I am buying a skirt."],
      correct: 0,
    },
    {
      question: "What does \"Sie sucht eine Tasche.\" mean?",
      options: ["She is looking for a bag.", "We need a book.", "I am buying a skirt.", "He takes a coat."],
      correct: 0,
    },
    {
      question: "What does \"Wir brauchen ein Buch.\" mean?",
      options: ["We need a book.", "I am buying a skirt.", "He takes a coat.", "She is looking for a bag."],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"das Geschäft\"?",
      options: ["shop", "price", "cheap", "to need"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"teuer\"?",
      options: ["expensive", "bag", "to need", "cashier"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"nehmen\"?",
      options: ["to take", "to pay", "cashier", "to buy"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"suchen\"?",
      options: ["to search", "offer", "to buy", "cheap"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Geschäft\"?",
      options: ["shop", "price", "cheap", "to need"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"der Preis\"?",
      options: ["price", "cheap", "expensive", "to take"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Tasche\"?",
      options: ["bag", "to need", "to take", "to search"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"bezahlen\"?",
      options: ["to pay", "cashier", "to search", "shop"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Angebot\"?",
      options: ["offer", "to buy", "shop", "expensive"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00012a",
    videoTitle: "Einkaufen — Akkusativ — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'Einkaufen — Akkusativ', appropriate for A1 Goethe-Zertifikat learners."
  },
  "de-a1-13": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 13,
    title: "Kleidung und Farben",
    description: "Learn clothing and colors.",
    vocabulary: [
    { word: "die Kleidung", meaning: "clothing", example: "Die Kleidung ist neu.", emoji: "👕", arabic: "" },
    { word: "das Hemd", meaning: "shirt", example: "Das Hemd ist weiß.", emoji: "👔", arabic: "" },
    { word: "die Hose", meaning: "trousers", example: "Die Hose ist blau.", emoji: "👖", arabic: "" },
    { word: "das Kleid", meaning: "dress", example: "Das Kleid ist schön.", emoji: "👗", arabic: "" },
    { word: "die Schuhe", meaning: "shoes", example: "Die Schuhe sind bequem.", emoji: "👟", arabic: "" },
    { word: "rot", meaning: "red", example: "Der Mantel ist rot.", emoji: "🔴", arabic: "" },
    { word: "blau", meaning: "blue", example: "Der Himmel ist blau.", emoji: "🔵", arabic: "" },
    { word: "grün", meaning: "green", example: "Das Gras ist grün.", emoji: "🟢", arabic: "" },
    { word: "schwarz", meaning: "black", example: "Die Jacke ist schwarz.", emoji: "⚫", arabic: "" },
    { word: "gelb", meaning: "yellow", example: "Die Blume ist gelb.", emoji: "🟡", arabic: "" },
    { word: "die Farbe", meaning: "color", example: "Welche Farbe magst du?", emoji: "🎨", arabic: "" },
    { word: "tragen", meaning: "to wear", example: "Sie trägt ein Kleid.", emoji: "🧥", arabic: "" }
    ],
    dialogue: [
    { speaker: "Mia", text: "Welche Farbe magst du?" },
    { speaker: "Leo", text: "Ich mag Blau. Und du?" },
    { speaker: "Mia", text: "Ich mag Rot." },
    { speaker: "Leo", text: "Was trägst du heute?" },
    { speaker: "Mia", text: "Ich trage ein grünes Kleid." },
    { speaker: "Leo", text: "Das sieht schön aus." },
    { speaker: "Mia", text: "Danke! Dein Hemd ist auch schön." },
    { speaker: "Leo", text: "Danke schön!" }
    ],
    grammar: {
    title: "Adjektive und Farben",
    examples: [
      { sentence: "Der Mantel ist rot.", note: "The coat is red." },
      { sentence: "Die Hose ist blau.", note: "The trousers are blue." },
      { sentence: "Das Kleid ist grün.", note: "The dress is green." },
      { sentence: "Ich trage ein gelbes Hemd.", note: "I am wearing a yellow shirt." }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"das Hemd\"?",
      options: ["shirt", "trousers", "dress", "blue"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"die Schuhe\"?",
      options: ["shoes", "red", "blue", "yellow"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"grün\"?",
      options: ["green", "black", "yellow", "clothing"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"die Farbe\"?",
      options: ["color", "to wear", "clothing", "dress"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"das Hemd\"?",
      options: ["shirt", "trousers", "dress", "blue"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Das sieht schön aus.\"?",
      options: ["Leo", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Danke schön!\"?",
      options: ["Leo", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Ich mag Blau. Und du?\"?",
      options: ["Leo", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Die Hose ist blau.\" mean?",
      options: ["The trousers are blue.", "The dress is green.", "I am wearing a yellow shirt.", "The coat is red."],
      correct: 0,
    },
    {
      question: "What does \"Das Kleid ist grün.\" mean?",
      options: ["The dress is green.", "I am wearing a yellow shirt.", "The coat is red.", "The trousers are blue."],
      correct: 0,
    },
    {
      question: "What does \"Ich trage ein gelbes Hemd.\" mean?",
      options: ["I am wearing a yellow shirt.", "The coat is red.", "The trousers are blue.", "The dress is green."],
      correct: 0,
    },
    {
      question: "What does \"Der Mantel ist rot.\" mean?",
      options: ["The coat is red.", "The trousers are blue.", "The dress is green.", "I am wearing a yellow shirt."],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"die Hose\"?",
      options: ["trousers", "dress", "shoes", "green"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"rot\"?",
      options: ["red", "blue", "green", "color"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"schwarz\"?",
      options: ["black", "yellow", "color", "shirt"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"tragen\"?",
      options: ["to wear", "clothing", "shirt", "shoes"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Hose\"?",
      options: ["trousers", "dress", "shoes", "green"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"das Kleid\"?",
      options: ["dress", "shoes", "red", "black"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"blau\"?",
      options: ["blue", "green", "black", "to wear"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"gelb\"?",
      options: ["yellow", "color", "to wear", "trousers"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Kleidung\"?",
      options: ["clothing", "shirt", "trousers", "red"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00013a",
    videoTitle: "Kleidung und Farben — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'Kleidung und Farben', appropriate for A1 Goethe-Zertifikat learners."
  },
  "de-a1-14": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 14,
    title: "Personen beschreiben",
    description: "Learn to describe people with adjectives.",
    vocabulary: [
    { word: "groß", meaning: "tall/big", example: "Er ist sehr groß.", emoji: "📏", arabic: "" },
    { word: "klein", meaning: "small", example: "Sie ist klein.", emoji: "🔽", arabic: "" },
    { word: "dünn", meaning: "thin", example: "Er ist dünn.", emoji: "➖", arabic: "" },
    { word: "die Haare", meaning: "hair", example: "Sie hat lange Haare.", emoji: "💇", arabic: "" },
    { word: "die Augen", meaning: "eyes", example: "Er hat blaue Augen.", emoji: "👀", arabic: "" },
    { word: "freundlich", meaning: "friendly", example: "Sie ist sehr freundlich.", emoji: "😊", arabic: "" },
    { word: "nett", meaning: "nice", example: "Er ist nett.", emoji: "🙂", arabic: "" },
    { word: "lustig", meaning: "funny", example: "Sie ist lustig.", emoji: "😂", arabic: "" },
    { word: "intelligent", meaning: "intelligent", example: "Er ist intelligent.", emoji: "🧠", arabic: "" },
    { word: "das Gesicht", meaning: "face", example: "Sie hat ein schönes Gesicht.", emoji: "😀", arabic: "" },
    { word: "aussehen", meaning: "to look like", example: "Wie sieht er aus?", emoji: "👤", arabic: "" },
    { word: "hübsch", meaning: "pretty", example: "Sie ist hübsch.", emoji: "🌸", arabic: "" }
    ],
    dialogue: [
    { speaker: "Sophie", text: "Wie sieht dein Bruder aus?" },
    { speaker: "Noah", text: "Er ist groß und hat kurze Haare." },
    { speaker: "Sophie", text: "Ist er freundlich?" },
    { speaker: "Noah", text: "Ja, sehr freundlich und lustig." },
    { speaker: "Sophie", text: "Wie alt ist er?" },
    { speaker: "Noah", text: "Er ist fünfundzwanzig." },
    { speaker: "Sophie", text: "Er sieht nett aus." },
    { speaker: "Noah", text: "Ja, das ist er auch." }
    ],
    grammar: {
    title: "Adjektive zur Beschreibung",
    examples: [
      { sentence: "Er ist sehr groß.", note: "He is very tall." },
      { sentence: "Sie ist freundlich und nett.", note: "She is friendly and nice." },
      { sentence: "Meine Schwester ist lustig.", note: "My sister is funny." },
      { sentence: "Er hat blaue Augen.", note: "He has blue eyes." }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"dünn\"?",
      options: ["thin", "hair", "eyes", "funny"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"freundlich\"?",
      options: ["friendly", "nice", "funny", "to look like"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"intelligent\"?",
      options: ["intelligent", "face", "to look like", "small"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"hübsch\"?",
      options: ["pretty", "tall/big", "small", "eyes"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"dünn\"?",
      options: ["thin", "hair", "eyes", "funny"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Er sieht nett aus.\"?",
      options: ["Sophie", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Wie sieht dein Bruder aus?\"?",
      options: ["Sophie", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Ist er freundlich?\"?",
      options: ["Sophie", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Meine Schwester ist lustig.\" mean?",
      options: ["My sister is funny.", "He has blue eyes.", "He is very tall.", "She is friendly and nice."],
      correct: 0,
    },
    {
      question: "What does \"Er hat blaue Augen.\" mean?",
      options: ["He has blue eyes.", "He is very tall.", "She is friendly and nice.", "My sister is funny."],
      correct: 0,
    },
    {
      question: "What does \"Er ist sehr groß.\" mean?",
      options: ["He is very tall.", "She is friendly and nice.", "My sister is funny.", "He has blue eyes."],
      correct: 0,
    },
    {
      question: "What does \"Sie ist freundlich und nett.\" mean?",
      options: ["She is friendly and nice.", "My sister is funny.", "He has blue eyes.", "He is very tall."],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"die Haare\"?",
      options: ["hair", "eyes", "friendly", "intelligent"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"nett\"?",
      options: ["nice", "funny", "intelligent", "pretty"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Gesicht\"?",
      options: ["face", "to look like", "pretty", "thin"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"groß\"?",
      options: ["tall/big", "small", "thin", "friendly"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Haare\"?",
      options: ["hair", "eyes", "friendly", "intelligent"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"die Augen\"?",
      options: ["eyes", "friendly", "nice", "face"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"lustig\"?",
      options: ["funny", "intelligent", "face", "tall/big"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"aussehen\"?",
      options: ["to look like", "pretty", "tall/big", "hair"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"klein\"?",
      options: ["small", "thin", "hair", "nice"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00014a",
    videoTitle: "Personen beschreiben — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'Personen beschreiben', appropriate for A1 Goethe-Zertifikat learners."
  },
  "de-a1-15": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 15,
    title: "Das Wetter",
    description: "Learn weather vocabulary and es-expressions.",
    vocabulary: [
    { word: "das Wetter", meaning: "weather", example: "Das Wetter ist schön.", emoji: "🌤️", arabic: "" },
    { word: "die Sonne", meaning: "sun", example: "Die Sonne scheint.", emoji: "☀️", arabic: "" },
    { word: "der Regen", meaning: "rain", example: "Der Regen fällt.", emoji: "🌧️", arabic: "" },
    { word: "der Schnee", meaning: "snow", example: "Der Schnee ist weiß.", emoji: "❄️", arabic: "" },
    { word: "der Wind", meaning: "wind", example: "Der Wind ist stark.", emoji: "💨", arabic: "" },
    { word: "warm", meaning: "warm", example: "Es ist warm heute.", emoji: "🌡️", arabic: "" },
    { word: "kalt", meaning: "cold", example: "Es ist kalt im Winter.", emoji: "🥶", arabic: "" },
    { word: "die Wolke", meaning: "cloud", example: "Die Wolke ist grau.", emoji: "☁️", arabic: "" },
    { word: "regnen", meaning: "to rain", example: "Es regnet heute.", emoji: "🌦️", arabic: "" },
    { word: "schneien", meaning: "to snow", example: "Es schneit im Winter.", emoji: "🌨️", arabic: "" },
    { word: "die Temperatur", meaning: "temperature", example: "Die Temperatur steigt.", emoji: "🌡️", arabic: "" },
    { word: "der Himmel", meaning: "sky", example: "Der Himmel ist blau.", emoji: "🌌", arabic: "" }
    ],
    dialogue: [
    { speaker: "Ben", text: "Wie ist das Wetter heute?" },
    { speaker: "Julia", text: "Es ist sonnig und warm." },
    { speaker: "Ben", text: "Regnet es morgen?" },
    { speaker: "Julia", text: "Ja, es soll regnen." },
    { speaker: "Ben", text: "Und wie ist es im Winter?" },
    { speaker: "Julia", text: "Im Winter schneit es oft." },
    { speaker: "Ben", text: "Ich mag den Schnee." },
    { speaker: "Julia", text: "Ich auch!" }
    ],
    grammar: {
    title: "Unpersönliches „es“ beim Wetter",
    examples: [
      { sentence: "Es regnet heute.", note: "It is raining today." },
      { sentence: "Es ist kalt im Winter.", note: "It is cold in winter." },
      { sentence: "Es schneit oft.", note: "It often snows." },
      { sentence: "Es ist warm und sonnig.", note: "It is warm and sunny." }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"der Schnee\"?",
      options: ["snow", "wind", "warm", "to rain"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"kalt\"?",
      options: ["cold", "cloud", "to rain", "sky"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"schneien\"?",
      options: ["to snow", "temperature", "sky", "rain"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"das Wetter\"?",
      options: ["weather", "sun", "rain", "warm"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"der Schnee\"?",
      options: ["snow", "wind", "warm", "to rain"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Ich auch!\"?",
      options: ["Julia", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Es ist sonnig und warm.\"?",
      options: ["Julia", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Ja, es soll regnen.\"?",
      options: ["Julia", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Es ist warm und sonnig.\" mean?",
      options: ["It is warm and sunny.", "It is raining today.", "It is cold in winter.", "It often snows."],
      correct: 0,
    },
    {
      question: "What does \"Es regnet heute.\" mean?",
      options: ["It is raining today.", "It is cold in winter.", "It often snows.", "It is warm and sunny."],
      correct: 0,
    },
    {
      question: "What does \"Es ist kalt im Winter.\" mean?",
      options: ["It is cold in winter.", "It often snows.", "It is warm and sunny.", "It is raining today."],
      correct: 0,
    },
    {
      question: "What does \"Es schneit oft.\" mean?",
      options: ["It often snows.", "It is warm and sunny.", "It is raining today.", "It is cold in winter."],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"der Wind\"?",
      options: ["wind", "warm", "cold", "to snow"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Wolke\"?",
      options: ["cloud", "to rain", "to snow", "weather"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Temperatur\"?",
      options: ["temperature", "sky", "weather", "snow"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Sonne\"?",
      options: ["sun", "rain", "snow", "cold"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Wind\"?",
      options: ["wind", "warm", "cold", "to snow"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"warm\"?",
      options: ["warm", "cold", "cloud", "temperature"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"regnen\"?",
      options: ["to rain", "to snow", "temperature", "sun"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Himmel\"?",
      options: ["sky", "weather", "sun", "wind"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Regen\"?",
      options: ["rain", "snow", "wind", "cloud"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00015a",
    videoTitle: "Das Wetter — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'Das Wetter', appropriate for A1 Goethe-Zertifikat learners."
  },
  "de-a1-16": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 16,
    title: "Termine und Verabredungen",
    description: "Learn to make appointments with wollen.",
    vocabulary: [
    { word: "der Termin", meaning: "appointment", example: "Ich habe einen Termin.", emoji: "📅", arabic: "" },
    { word: "treffen", meaning: "to meet", example: "Wir treffen uns um zwei.", emoji: "🤝", arabic: "" },
    { word: "die Verabredung", meaning: "date/meeting", example: "Ich habe eine Verabredung.", emoji: "💬", arabic: "" },
    { word: "wollen", meaning: "to want", example: "Ich will ins Kino gehen.", emoji: "🎯", arabic: "" },
    { word: "planen", meaning: "to plan", example: "Wir planen die Woche.", emoji: "🗓️", arabic: "" },
    { word: "frei", meaning: "free", example: "Ich bin heute frei.", emoji: "🆓", arabic: "" },
    { word: "beschäftigt", meaning: "busy", example: "Ich bin beschäftigt.", emoji: "💼", arabic: "" },
    { word: "absagen", meaning: "to cancel", example: "Ich muss absagen.", emoji: "❌", arabic: "" },
    { word: "vereinbaren", meaning: "to arrange", example: "Wir vereinbaren einen Termin.", emoji: "🤝", arabic: "" },
    { word: "das Kino", meaning: "cinema", example: "Wir gehen ins Kino.", emoji: "🎬", arabic: "" },
    { word: "einladen", meaning: "to invite", example: "Ich lade dich ein.", emoji: "✉️", arabic: "" },
    { word: "die Party", meaning: "party", example: "Die Party ist am Samstag.", emoji: "🎉", arabic: "" }
    ],
    dialogue: [
    { speaker: "Laura", text: "Hast du am Samstag Zeit?" },
    { speaker: "David", text: "Ja, ich bin frei." },
    { speaker: "Laura", text: "Wollen wir uns treffen?" },
    { speaker: "David", text: "Gerne! Wo treffen wir uns?" },
    { speaker: "Laura", text: "Im Café um drei Uhr." },
    { speaker: "David", text: "Gut, ich komme." },
    { speaker: "Laura", text: "Ich lade dich ein." },
    { speaker: "David", text: "Danke, bis Samstag!" }
    ],
    grammar: {
    title: "Modalverb „wollen“",
    examples: [
      { sentence: "Ich will ins Kino gehen.", note: "I want to go to the cinema." },
      { sentence: "Wir wollen uns treffen.", note: "We want to meet." },
      { sentence: "Willst du kommen?", note: "Do you want to come?" },
      { sentence: "Sie will einen Termin machen.", note: "She wants to make an appointment." }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"planen\"?",
      options: ["to plan", "free", "busy", "cinema"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"absagen\"?",
      options: ["to cancel", "to arrange", "cinema", "appointment"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"einladen\"?",
      options: ["to invite", "party", "appointment", "to want"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"treffen\"?",
      options: ["to meet", "date/meeting", "to want", "busy"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"planen\"?",
      options: ["to plan", "free", "busy", "cinema"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Hast du am Samstag Zeit?\"?",
      options: ["Laura", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Wollen wir uns treffen?\"?",
      options: ["Laura", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Im Café um drei Uhr.\"?",
      options: ["Laura", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Ich will ins Kino gehen.\" mean?",
      options: ["I want to go to the cinema.", "We want to meet.", "Do you want to come?", "She wants to make an appointment."],
      correct: 0,
    },
    {
      question: "What does \"Wir wollen uns treffen.\" mean?",
      options: ["We want to meet.", "Do you want to come?", "She wants to make an appointment.", "I want to go to the cinema."],
      correct: 0,
    },
    {
      question: "What does \"Willst du kommen?\" mean?",
      options: ["Do you want to come?", "She wants to make an appointment.", "I want to go to the cinema.", "We want to meet."],
      correct: 0,
    },
    {
      question: "What does \"Sie will einen Termin machen.\" mean?",
      options: ["She wants to make an appointment.", "I want to go to the cinema.", "We want to meet.", "Do you want to come?"],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"frei\"?",
      options: ["free", "busy", "to cancel", "to invite"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"vereinbaren\"?",
      options: ["to arrange", "cinema", "to invite", "to meet"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Party\"?",
      options: ["party", "appointment", "to meet", "to plan"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Verabredung\"?",
      options: ["date/meeting", "to want", "to plan", "to cancel"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"frei\"?",
      options: ["free", "busy", "to cancel", "to invite"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"beschäftigt\"?",
      options: ["busy", "to cancel", "to arrange", "party"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Kino\"?",
      options: ["cinema", "to invite", "party", "date/meeting"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Termin\"?",
      options: ["appointment", "to meet", "date/meeting", "free"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"wollen\"?",
      options: ["to want", "to plan", "free", "to arrange"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00016a",
    videoTitle: "Termine und Verabredungen — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'Termine und Verabredungen', appropriate for A1 Goethe-Zertifikat learners."
  },
  "de-a1-17": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 17,
    title: "Beim Arzt",
    description: "Learn to talk about health at the doctor's.",
    vocabulary: [
    { word: "der Arzt", meaning: "doctor", example: "Ich gehe zum Arzt.", emoji: "👨‍⚕️", arabic: "" },
    { word: "krank", meaning: "sick", example: "Ich bin krank.", emoji: "🤒", arabic: "" },
    { word: "gesund", meaning: "healthy", example: "Sie ist gesund.", emoji: "💪", arabic: "" },
    { word: "der Kopf", meaning: "head", example: "Mein Kopf tut weh.", emoji: "🤕", arabic: "" },
    { word: "der Bauch", meaning: "stomach", example: "Mein Bauch tut weh.", emoji: "🤰", arabic: "" },
    { word: "weh tun", meaning: "to hurt", example: "Der Rücken tut mir weh.", emoji: "😣", arabic: "" },
    { word: "die Apotheke", meaning: "pharmacy", example: "Die Apotheke ist nah.", emoji: "💊", arabic: "" },
    { word: "das Medikament", meaning: "medicine", example: "Ich brauche ein Medikament.", emoji: "💊", arabic: "" },
    { word: "der Termin", meaning: "appointment", example: "Ich habe einen Arzttermin.", emoji: "📅", arabic: "" },
    { word: "fühlen", meaning: "to feel", example: "Ich fühle mich schlecht.", emoji: "😷", arabic: "" },
    { word: "die Erkältung", meaning: "cold (illness)", example: "Ich habe eine Erkältung.", emoji: "🤧", arabic: "" },
    { word: "das Fieber", meaning: "fever", example: "Ich habe Fieber.", emoji: "🌡️", arabic: "" }
    ],
    dialogue: [
    { speaker: "Arzt", text: "Guten Tag, was fehlt Ihnen?" },
    { speaker: "Patient", text: "Mir tut der Kopf weh." },
    { speaker: "Arzt", text: "Haben Sie auch Fieber?" },
    { speaker: "Patient", text: "Ja, ein bisschen." },
    { speaker: "Arzt", text: "Sie sind erkältet." },
    { speaker: "Patient", text: "Brauche ich Medikamente?" },
    { speaker: "Arzt", text: "Ja, gehen Sie zur Apotheke." },
    { speaker: "Patient", text: "Danke, Herr Doktor." }
    ],
    grammar: {
    title: "„Weh tun“ mit Dativ",
    examples: [
      { sentence: "Mir tut der Kopf weh.", note: "My head hurts." },
      { sentence: "Ihm tut der Bauch weh.", note: "His stomach hurts." },
      { sentence: "Tut dir der Rücken weh?", note: "Does your back hurt?" },
      { sentence: "Uns tun die Füße weh.", note: "Our feet hurt." }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"weh tun\"?",
      options: ["to hurt", "pharmacy", "medicine", "cold (illness)"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"der Termin\"?",
      options: ["appointment", "to feel", "cold (illness)", "sick"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"das Fieber\"?",
      options: ["fever", "doctor", "sick", "stomach"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"gesund\"?",
      options: ["healthy", "head", "stomach", "medicine"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"weh tun\"?",
      options: ["to hurt", "pharmacy", "medicine", "cold (illness)"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Mir tut der Kopf weh.\"?",
      options: ["Patient", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Ja, ein bisschen.\"?",
      options: ["Patient", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Brauche ich Medikamente?\"?",
      options: ["Patient", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Ihm tut der Bauch weh.\" mean?",
      options: ["His stomach hurts.", "Does your back hurt?", "Our feet hurt.", "My head hurts."],
      correct: 0,
    },
    {
      question: "What does \"Tut dir der Rücken weh?\" mean?",
      options: ["Does your back hurt?", "Our feet hurt.", "My head hurts.", "His stomach hurts."],
      correct: 0,
    },
    {
      question: "What does \"Uns tun die Füße weh.\" mean?",
      options: ["Our feet hurt.", "My head hurts.", "His stomach hurts.", "Does your back hurt?"],
      correct: 0,
    },
    {
      question: "What does \"Mir tut der Kopf weh.\" mean?",
      options: ["My head hurts.", "His stomach hurts.", "Does your back hurt?", "Our feet hurt."],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"die Apotheke\"?",
      options: ["pharmacy", "medicine", "appointment", "fever"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"fühlen\"?",
      options: ["to feel", "cold (illness)", "fever", "healthy"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Arzt\"?",
      options: ["doctor", "sick", "healthy", "to hurt"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Kopf\"?",
      options: ["head", "stomach", "to hurt", "appointment"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Apotheke\"?",
      options: ["pharmacy", "medicine", "appointment", "fever"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"das Medikament\"?",
      options: ["medicine", "appointment", "to feel", "doctor"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Erkältung\"?",
      options: ["cold (illness)", "fever", "doctor", "head"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"krank\"?",
      options: ["sick", "healthy", "head", "pharmacy"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Bauch\"?",
      options: ["stomach", "to hurt", "pharmacy", "to feel"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00017a",
    videoTitle: "Beim Arzt — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'Beim Arzt', appropriate for A1 Goethe-Zertifikat learners."
  },
  "de-a1-18": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 18,
    title: "Mein Tagesablauf",
    description: "Learn daily routine with separable verbs.",
    vocabulary: [
    { word: "aufstehen", meaning: "to get up", example: "Ich stehe um sieben auf.", emoji: "⏰", arabic: "" },
    { word: "aufwachen", meaning: "to wake up", example: "Ich wache früh auf.", emoji: "😴", arabic: "" },
    { word: "frühstücken", meaning: "to have breakfast", example: "Ich frühstücke um acht.", emoji: "🍳", arabic: "" },
    { word: "anfangen", meaning: "to begin", example: "Die Arbeit fängt an.", emoji: "▶️", arabic: "" },
    { word: "aufräumen", meaning: "to tidy up", example: "Ich räume das Zimmer auf.", emoji: "🧹", arabic: "" },
    { word: "fernsehen", meaning: "to watch TV", example: "Ich sehe abends fern.", emoji: "📺", arabic: "" },
    { word: "einkaufen", meaning: "to shop", example: "Ich kaufe Lebensmittel ein.", emoji: "🛒", arabic: "" },
    { word: "anrufen", meaning: "to call", example: "Ich rufe meine Mutter an.", emoji: "📞", arabic: "" },
    { word: "der Alltag", meaning: "daily routine", example: "Mein Alltag ist einfach.", emoji: "🔄", arabic: "" },
    { word: "schlafen gehen", meaning: "to go to sleep", example: "Ich gehe um elf schlafen.", emoji: "🛌", arabic: "" },
    { word: "die Arbeit", meaning: "work", example: "Die Arbeit beginnt um neun.", emoji: "💼", arabic: "" },
    { word: "zurückkommen", meaning: "to come back", example: "Ich komme spät zurück.", emoji: "🔙", arabic: "" }
    ],
    dialogue: [
    { speaker: "Petra", text: "Wann stehst du auf?" },
    { speaker: "Karl", text: "Ich stehe um sieben auf." },
    { speaker: "Petra", text: "Was machst du dann?" },
    { speaker: "Karl", text: "Ich frühstücke und gehe zur Arbeit." },
    { speaker: "Petra", text: "Wann kommst du zurück?" },
    { speaker: "Karl", text: "Ich komme um sechs zurück." },
    { speaker: "Petra", text: "Siehst du abends fern?" },
    { speaker: "Karl", text: "Ja, manchmal." }
    ],
    grammar: {
    title: "Trennbare Verben",
    examples: [
      { sentence: "Ich stehe um sieben auf.", note: "I get up at seven." },
      { sentence: "Er räumt das Zimmer auf.", note: "He tidies up the room." },
      { sentence: "Wir kaufen Gemüse ein.", note: "We buy vegetables." },
      { sentence: "Sie ruft ihre Mutter an.", note: "She calls her mother." }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"einkaufen\"?",
      options: ["to shop", "to call", "daily routine", "to come back"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"schlafen gehen\"?",
      options: ["to go to sleep", "work", "to come back", "to have breakfast"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"aufstehen\"?",
      options: ["to get up", "to wake up", "to have breakfast", "to watch TV"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"anfangen\"?",
      options: ["to begin", "to tidy up", "to watch TV", "daily routine"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"einkaufen\"?",
      options: ["to shop", "to call", "daily routine", "to come back"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Was machst du dann?\"?",
      options: ["Petra", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Wann kommst du zurück?\"?",
      options: ["Petra", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Siehst du abends fern?\"?",
      options: ["Petra", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Wir kaufen Gemüse ein.\" mean?",
      options: ["We buy vegetables.", "She calls her mother.", "I get up at seven.", "He tidies up the room."],
      correct: 0,
    },
    {
      question: "What does \"Sie ruft ihre Mutter an.\" mean?",
      options: ["She calls her mother.", "I get up at seven.", "He tidies up the room.", "We buy vegetables."],
      correct: 0,
    },
    {
      question: "What does \"Ich stehe um sieben auf.\" mean?",
      options: ["I get up at seven.", "He tidies up the room.", "We buy vegetables.", "She calls her mother."],
      correct: 0,
    },
    {
      question: "What does \"Er räumt das Zimmer auf.\" mean?",
      options: ["He tidies up the room.", "We buy vegetables.", "She calls her mother.", "I get up at seven."],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"anrufen\"?",
      options: ["to call", "daily routine", "to go to sleep", "to get up"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Arbeit\"?",
      options: ["work", "to come back", "to get up", "to begin"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"aufwachen\"?",
      options: ["to wake up", "to have breakfast", "to begin", "to shop"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"aufräumen\"?",
      options: ["to tidy up", "to watch TV", "to shop", "to go to sleep"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"anrufen\"?",
      options: ["to call", "daily routine", "to go to sleep", "to get up"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"der Alltag\"?",
      options: ["daily routine", "to go to sleep", "work", "to wake up"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"zurückkommen\"?",
      options: ["to come back", "to get up", "to wake up", "to tidy up"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"frühstücken\"?",
      options: ["to have breakfast", "to begin", "to tidy up", "to call"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"fernsehen\"?",
      options: ["to watch TV", "to shop", "to call", "work"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00018a",
    videoTitle: "Mein Tagesablauf — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'Mein Tagesablauf', appropriate for A1 Goethe-Zertifikat learners."
  },
  "de-a1-19": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 19,
    title: "Reisen und Urlaub",
    description: "Learn travel vocabulary and Perfekt tense.",
    vocabulary: [
    { word: "die Reise", meaning: "trip", example: "Die Reise war schön.", emoji: "🧳", arabic: "" },
    { word: "der Urlaub", meaning: "vacation", example: "Ich mache Urlaub in Spanien.", emoji: "🏖️", arabic: "" },
    { word: "das Hotel", meaning: "hotel", example: "Das Hotel ist gut.", emoji: "🏨", arabic: "" },
    { word: "der Koffer", meaning: "suitcase", example: "Mein Koffer ist schwer.", emoji: "🧳", arabic: "" },
    { word: "fliegen", meaning: "to fly", example: "Wir sind nach Rom geflogen.", emoji: "✈️", arabic: "" },
    { word: "buchen", meaning: "to book", example: "Ich habe ein Zimmer gebucht.", emoji: "📋", arabic: "" },
    { word: "besuchen", meaning: "to visit", example: "Ich habe Berlin besucht.", emoji: "🗺️", arabic: "" },
    { word: "das Meer", meaning: "sea", example: "Das Meer ist blau.", emoji: "🌊", arabic: "" },
    { word: "der Strand", meaning: "beach", example: "Wir waren am Strand.", emoji: "🏖️", arabic: "" },
    { word: "die Kamera", meaning: "camera", example: "Ich habe die Kamera dabei.", emoji: "📷", arabic: "" },
    { word: "übernachten", meaning: "to stay overnight", example: "Wir haben im Hotel übernachtet.", emoji: "🛏️", arabic: "" },
    { word: "das Ausland", meaning: "abroad", example: "Ich war im Ausland.", emoji: "🌍", arabic: "" }
    ],
    dialogue: [
    { speaker: "Elena", text: "Wohin fährst du im Urlaub?" },
    { speaker: "Marco", text: "Ich fliege nach Spanien." },
    { speaker: "Elena", text: "Hast du ein Hotel gebucht?" },
    { speaker: "Marco", text: "Ja, ich habe ein Zimmer gebucht." },
    { speaker: "Elena", text: "Warst du schon am Strand?" },
    { speaker: "Marco", text: "Ja, ich war letztes Jahr dort." },
    { speaker: "Elena", text: "Wie war es?" },
    { speaker: "Marco", text: "Es war wunderschön." }
    ],
    grammar: {
    title: "Perfekt mit „haben“ und „sein“",
    examples: [
      { sentence: "Ich habe ein Zimmer gebucht.", note: "I have booked a room." },
      { sentence: "Wir sind nach Rom geflogen.", note: "We flew to Rome." },
      { sentence: "Er hat Berlin besucht.", note: "He visited Berlin." },
      { sentence: "Sie ist am Strand gewesen.", note: "She was at the beach." }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"das Meer\"?",
      options: ["sea", "beach", "camera", "trip"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"übernachten\"?",
      options: ["to stay overnight", "abroad", "trip", "suitcase"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"der Urlaub\"?",
      options: ["vacation", "hotel", "suitcase", "to visit"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"fliegen\"?",
      options: ["to fly", "to book", "to visit", "camera"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"das Meer\"?",
      options: ["sea", "beach", "camera", "trip"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Ja, ich habe ein Zimmer gebucht.\"?",
      options: ["Marco", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Ja, ich war letztes Jahr dort.\"?",
      options: ["Marco", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Es war wunderschön.\"?",
      options: ["Marco", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Sie ist am Strand gewesen.\" mean?",
      options: ["She was at the beach.", "I have booked a room.", "We flew to Rome.", "He visited Berlin."],
      correct: 0,
    },
    {
      question: "What does \"Ich habe ein Zimmer gebucht.\" mean?",
      options: ["I have booked a room.", "We flew to Rome.", "He visited Berlin.", "She was at the beach."],
      correct: 0,
    },
    {
      question: "What does \"Wir sind nach Rom geflogen.\" mean?",
      options: ["We flew to Rome.", "He visited Berlin.", "She was at the beach.", "I have booked a room."],
      correct: 0,
    },
    {
      question: "What does \"Er hat Berlin besucht.\" mean?",
      options: ["He visited Berlin.", "She was at the beach.", "I have booked a room.", "We flew to Rome."],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"der Strand\"?",
      options: ["beach", "camera", "to stay overnight", "vacation"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Ausland\"?",
      options: ["abroad", "trip", "vacation", "to fly"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"das Hotel\"?",
      options: ["hotel", "suitcase", "to fly", "sea"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"buchen\"?",
      options: ["to book", "to visit", "sea", "to stay overnight"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Strand\"?",
      options: ["beach", "camera", "to stay overnight", "vacation"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"die Kamera\"?",
      options: ["camera", "to stay overnight", "abroad", "hotel"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Reise\"?",
      options: ["trip", "vacation", "hotel", "to book"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"der Koffer\"?",
      options: ["suitcase", "to fly", "to book", "beach"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"besuchen\"?",
      options: ["to visit", "sea", "beach", "abroad"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00019a",
    videoTitle: "Reisen und Urlaub — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'Reisen und Urlaub', appropriate for A1 Goethe-Zertifikat learners."
  },
  "de-a1-20": {
    levelId: "de-a1",
    levelLabel: "Deutsch A1 — Goethe-Zertifikat",
    lessonNumber: 20,
    title: "Modalverben im Alltag",
    description: "Review all modal verbs in daily life.",
    vocabulary: [
    { word: "können", meaning: "can/to be able", example: "Ich kann gut kochen.", emoji: "💪", arabic: "" },
    { word: "müssen", meaning: "must", example: "Ich muss arbeiten.", emoji: "📌", arabic: "" },
    { word: "dürfen", meaning: "may", example: "Darf ich reinkommen?", emoji: "🚪", arabic: "" },
    { word: "sollen", meaning: "should", example: "Ich soll früh kommen.", emoji: "☝️", arabic: "" },
    { word: "wollen", meaning: "to want", example: "Ich will Deutsch lernen.", emoji: "🎯", arabic: "" },
    { word: "mögen", meaning: "to like", example: "Ich mag Kaffee.", emoji: "😊", arabic: "" },
    { word: "möchten", meaning: "would like", example: "Ich möchte Wasser.", emoji: "🙏", arabic: "" },
    { word: "die Regel", meaning: "rule", example: "Das ist eine Regel.", emoji: "📜", arabic: "" },
    { word: "die Erlaubnis", meaning: "permission", example: "Ich brauche eine Erlaubnis.", emoji: "✅", arabic: "" },
    { word: "die Pflicht", meaning: "duty", example: "Das ist meine Pflicht.", emoji: "📋", arabic: "" },
    { word: "die Fähigkeit", meaning: "ability", example: "Das ist seine Fähigkeit.", emoji: "🌟", arabic: "" },
    { word: "der Wunsch", meaning: "wish", example: "Das ist mein Wunsch.", emoji: "💭", arabic: "" }
    ],
    dialogue: [
    { speaker: "Sami", text: "Kannst du gut kochen?" },
    { speaker: "Rita", text: "Ja, ich kann sehr gut kochen." },
    { speaker: "Sami", text: "Musst du heute arbeiten?" },
    { speaker: "Rita", text: "Ja, ich muss um acht anfangen." },
    { speaker: "Sami", text: "Darf ich mitkommen?" },
    { speaker: "Rita", text: "Ja, natürlich!" },
    { speaker: "Sami", text: "Was sollen wir mitbringen?" },
    { speaker: "Rita", text: "Wir sollen Wasser mitbringen." }
    ],
    grammar: {
    title: "Modalverben im Überblick",
    examples: [
      { sentence: "Ich kann gut kochen.", note: "I can cook well." },
      { sentence: "Du musst früh aufstehen.", note: "You must get up early." },
      { sentence: "Wir dürfen hier parken.", note: "We are allowed to park here." },
      { sentence: "Sie soll pünktlich sein.", note: "She should be on time." }
    ]
  },
    vocabExercises: [
    {
      question: "What does this word mean: \"die Erlaubnis\"?",
      options: ["permission", "duty", "ability", "must"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"der Wunsch\"?",
      options: ["wish", "can/to be able", "must", "to want"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"dürfen\"?",
      options: ["may", "should", "to want", "rule"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"mögen\"?",
      options: ["to like", "would like", "rule", "ability"],
      correct: 0,
    },
    {
      question: "What does this word mean: \"die Erlaubnis\"?",
      options: ["permission", "duty", "ability", "must"],
      correct: 0,
    }
    ],
    conversationExercises: [
    {
      question: "Who says: \"Darf ich mitkommen?\"?",
      options: ["Sami", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Was sollen wir mitbringen?\"?",
      options: ["Sami", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    },
    {
      question: "Who says: \"Kannst du gut kochen?\"?",
      options: ["Sami", "Kellner", "Arzt", "Verkäufer"],
      correct: 0,
    }
    ],
    grammarExercises: [
    {
      question: "What does \"Ich kann gut kochen.\" mean?",
      options: ["I can cook well.", "You must get up early.", "We are allowed to park here.", "She should be on time."],
      correct: 0,
    },
    {
      question: "What does \"Du musst früh aufstehen.\" mean?",
      options: ["You must get up early.", "We are allowed to park here.", "She should be on time.", "I can cook well."],
      correct: 0,
    },
    {
      question: "What does \"Wir dürfen hier parken.\" mean?",
      options: ["We are allowed to park here.", "She should be on time.", "I can cook well.", "You must get up early."],
      correct: 0,
    },
    {
      question: "What does \"Sie soll pünktlich sein.\" mean?",
      options: ["She should be on time.", "I can cook well.", "You must get up early.", "We are allowed to park here."],
      correct: 0,
    }
    ],
    examQuestions: [
    {
      question: "Choose the correct meaning: \"die Pflicht\"?",
      options: ["duty", "ability", "wish", "may"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"können\"?",
      options: ["can/to be able", "must", "may", "to like"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"sollen\"?",
      options: ["should", "to want", "to like", "permission"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"möchten\"?",
      options: ["would like", "rule", "permission", "wish"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Pflicht\"?",
      options: ["duty", "ability", "wish", "may"],
      correct: 0,
    }
    ],
    homeworkQuestions: [
    {
      question: "Choose the correct meaning: \"die Fähigkeit\"?",
      options: ["ability", "wish", "can/to be able", "should"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"müssen\"?",
      options: ["must", "may", "should", "would like"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"wollen\"?",
      options: ["to want", "to like", "would like", "duty"],
      correct: 0,
    },
    {
      question: "Choose the correct meaning: \"die Regel\"?",
      options: ["rule", "permission", "duty", "can/to be able"],
      correct: 0,
    }
    ],
    youtubeId: "A1Lek00020a",
    videoTitle: "Modalverben im Alltag — Deutsch A1 Video",
    videoContext: "This video reinforces vocabulary and grammar for the lesson 'Modalverben im Alltag', appropriate for A1 Goethe-Zertifikat learners."
  }
};
