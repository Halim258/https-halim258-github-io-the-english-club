export type VocabWord = { word: string; meaning: string; example: string; emoji: string; arabic: string };
export type DialogueLine = { speaker: string; text: string };
export type GrammarRule = { title: string; explanation: string; examples: { sentence: string; note: string }[] };
export type MCQItem = { question: string; options: string[]; correct: number };

export interface LessonData {
  levelId: string;
  levelLabel: string;
  lessonNumber: number;
  title: string;
  description: string;
  vocabulary: VocabWord[];
  dialogue: DialogueLine[];
  grammar: GrammarRule;
  vocabExercises: MCQItem[];
  conversationExercises: MCQItem[];
  grammarExercises: MCQItem[];
  examQuestions: MCQItem[];
  homeworkQuestions: MCQItem[];
}

import { readingLessons } from "./reading-lessons";
import { a1Lessons } from "./a1-lessons";
import { a2Lessons } from "./a2-lessons";
import { b1Lessons } from "./b1-lessons";
import { b2Lessons } from "./b2-lessons";
import { c1Lessons } from "./c1-lessons";
import { c2Lessons } from "./c2-lessons";
import { kidsLessons } from "./kids-lessons";
import { readingLessons6to10 } from "./reading-lessons-6-10";
import { a1Lessons6to10 } from "./a1-lessons-6-10";
import { a2Lessons6to10 } from "./a2-lessons-6-10";
import { b1Lessons6to10 } from "./b1-lessons-6-10";
import { b2Lessons6to10 } from "./b2-lessons-6-10";
import { c1Lessons6to10 } from "./c1-lessons-6-10";
import { c2Lessons6to10 } from "./c2-lessons-6-10";
import { kidsLessons6to10 } from "./kids-lessons-6-10";
import { readingLessons11to15 } from "./reading-lessons-11-15";
import { a1Lessons11to15 } from "./a1-lessons-11-15";
import { a2Lessons11to15 } from "./a2-lessons-11-15";
import { b1Lessons11to15 } from "./b1-lessons-11-15";
import { b2Lessons11to15 } from "./b2-lessons-11-15";
import { c1Lessons11to15 } from "./c1-lessons-11-15";
import { c2Lessons11to15 } from "./c2-lessons-11-15";
import { kidsLessons11to15 } from "./kids-lessons-11-15";
import { readingLessons16to20 } from "./reading-lessons-16-20";
import { a1Lessons16to20 } from "./a1-lessons-16-20";
import { a2Lessons16to20 } from "./a2-lessons-16-20";
import { b1Lessons16to20 } from "./b1-lessons-16-20";
import { b2Lessons16to20 } from "./b2-lessons-16-20";
import { c1Lessons16to20 } from "./c1-lessons-16-20";
import { c2Lessons16to20 } from "./c2-lessons-16-20";
import { kidsLessons16to20 } from "./kids-lessons-16-20";
import { communicationLessons } from "./communication-lessons";
import { communicationLessons2 } from "./communication-lessons-2";
import { writingLessons } from "./writing-lessons";
import { writingLessons2, examPrepLessons2 } from "./specialized-lessons-2";
import { grammarCourseLessons } from "./specialized-course-lessons";
import { grammarCourseLessons2 } from "./grammar-lessons-2";
import { examPrepLessons3 } from "./exam-professional-lessons-2";
import { communicationLessons3 } from "./communication-lessons-3";
import { communicationLessons4 } from "./communication-lessons-4";
import { writingLessons3 } from "./specialized-lessons-3";
import { writingLessons4 } from "./specialized-lessons-4";
import { speakingListeningExtra } from "./speaking-listening-extra";
import { professionalGrammarExtra } from "./professional-grammar-extra";
import { pronunciationFluencyExtra } from "./pronunciation-fluency-extra";
import { readingVocabLessons } from "./reading-vocab-lessons";
import { interactiveLessons } from "./interactive-lessons";
import { specializedNewLessons } from "./specialized-new-lessons";
import { storyLessons } from "./stories-course";
import { moviesLessons } from "./movies-course";
import { readingVocabLessons2 } from "./reading-vocab-lessons-2";
import { interactiveLessons2 } from "./interactive-lessons-2";
import { specializedLessons5 } from "./specialized-lessons-5";
import { readingVocabLessons3 } from "./reading-vocab-lessons-3";
import { interactiveLessons3 } from "./interactive-lessons-3";
import { specializedLessons6 } from "./specialized-lessons-6";
import { specializedLessons7 } from "./specialized-lessons-7";
import { moviesLessons2 } from "./movies-course-2";
import { storyLessons2 } from "./stories-course-2";
import { readingVocabExpansion } from "./reading-vocab-expansion";
import { specializedExpansion } from "./specialized-expansion";
import { readingVocabExpansion2 } from "./reading-vocab-expansion-2";
import { specializedExpansion2 } from "./specialized-expansion-2";
import { specializedLessons8 } from "./specialized-lessons-8";
import { specializedExpansion3 } from "./specialized-expansion-3";
import { specializedExpansion4 } from "./specialized-expansion-4";
import { specializedCompletion1 } from "./specialized-completion-1";
import { specializedCompletion2 } from "./specialized-completion-2";
import { specializedCompletion3 } from "./specialized-completion-3";
import { expansion20Batch1 } from "./expansion-20-batch-1";
import { expansion20Batch2 } from "./expansion-20-batch-2";
import { expansion20Batch3 } from "./expansion-20-batch-3";
import { musicLessons } from "./music-lessons";
import { newsLessons } from "./news-lessons";
import { legalLessons } from "./legal-lessons";
import { hospitalityLessons } from "./hospitality-lessons";
const baseLessons: Record<string, LessonData> = {
  "reading-1": {
    levelId: "reading",
    levelLabel: "Reading Course",
    lessonNumber: 1,
    title: "The English Alphabet",
    description: "Learn the 26 letters, their sounds, and basic phonics.",
    vocabulary: [
      { word: "Alphabet", meaning: "The set of letters used in a language", example: "The English alphabet has 26 letters.", emoji: "🔤", arabic: "الأبجدية" },
      { word: "Vowel", meaning: "A, E, I, O, U — open sounds", example: "Every word needs at least one vowel.", emoji: "🅰️", arabic: "حرف علة" },
      { word: "Consonant", meaning: "Letters that are not vowels", example: "B, C, D are consonants.", emoji: "🔡", arabic: "حرف ساكن" },
      { word: "Uppercase", meaning: "Capital letters (A, B, C)", example: "Start a sentence with an uppercase letter.", emoji: "🔠", arabic: "حرف كبير" },
      { word: "Lowercase", meaning: "Small letters (a, b, c)", example: "Most writing uses lowercase letters.", emoji: "🔡", arabic: "حرف صغير" },
      { word: "Letter", meaning: "A symbol in the alphabet", example: "'A' is the first letter.", emoji: "✉️", arabic: "حرف" },
      { word: "Sound", meaning: "The noise a letter makes", example: "The letter 'B' makes a /b/ sound.", emoji: "🔊", arabic: "صوت" },
      { word: "Word", meaning: "A group of letters with meaning", example: "'Cat' is a word with three letters.", emoji: "📝", arabic: "كلمة" },
      { word: "Phonics", meaning: "Learning to read by sounds", example: "Phonics helps you sound out new words.", emoji: "🗣️", arabic: "صوتيات" },
      { word: "Read", meaning: "To understand written words", example: "I can read this book.", emoji: "📖", arabic: "يقرأ" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Let's learn the alphabet! Can you say A, B, C?" },
      { speaker: "Student", text: "A, B, C, D, E, F, G!" },
      { speaker: "Teacher", text: "Great! Now, which letters are vowels?" },
      { speaker: "Student", text: "A, E, I, O, U!" },
      { speaker: "Teacher", text: "Perfect! Every English word has at least one vowel." },
    ],
    grammar: {
      title: "Capital Letters — When to Use Them",
      explanation: "In English, we use capital (uppercase) letters at the start of sentences, for names of people and places, and for the word 'I'. Everything else uses lowercase letters.",
      examples: [
        { sentence: "My name is Sarah.", note: "Capital 'M' starts the sentence; 'S' for the name" },
        { sentence: "I live in London.", note: "Capital 'I' always; 'L' for the city name" },
        { sentence: "She is a teacher.", note: "Capital 'S' starts the sentence" },
        { sentence: "We go to school on Monday.", note: "Capital 'M' for the day of the week" },
      ],
    },
    vocabExercises: [
      { question: "How many letters are in the English alphabet?", options: ["24", "25", "26", "28"], correct: 2 },
      { question: "Which of these is a vowel?", options: ["B", "E", "D", "G"], correct: 1 },
      { question: "What does 'uppercase' mean?", options: ["Small letters", "Capital letters", "Numbers", "Symbols"], correct: 1 },
      { question: "What is a consonant?", options: ["A letter that is not a vowel", "A vowel", "A number", "A sentence"], correct: 0 },
      { question: "What does 'phonics' help you do?", options: ["Write stories", "Sound out words", "Draw pictures", "Count numbers"], correct: 1 },
    ],
    conversationExercises: [
      { question: "What did the teacher ask the student to say?", options: ["Numbers", "The alphabet", "Colors", "Animals"], correct: 1 },
      { question: "Which letters are vowels?", options: ["B, C, D, F, G", "A, E, I, O, U", "X, Y, Z", "L, M, N"], correct: 1 },
      { question: "What does every English word have?", options: ["A number", "At least one vowel", "Three consonants", "A capital letter"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Which sentence uses capitals correctly?", options: ["my name is Tom.", "My name is tom.", "My Name Is Tom.", "My name is Tom."], correct: 3 },
      { question: "When do we use a capital letter?", options: ["In the middle of words", "At the start of sentences", "For every letter", "Never"], correct: 1 },
      { question: "Which is correct?", options: ["i live in paris.", "I live in Paris.", "I live in paris.", "i Live in Paris."], correct: 1 },
      { question: "'___ is my friend.' Choose the correct word:", options: ["she", "She", "SHE", "sHe"], correct: 1 },
    ],
    examQuestions: [
      { question: "How many vowels are in the English alphabet?", options: ["3", "4", "5", "6"], correct: 2 },
      { question: "What is the first letter of the alphabet?", options: ["B", "Z", "A", "C"], correct: 2 },
      { question: "Which is a lowercase letter?", options: ["A", "b", "C", "D"], correct: 1 },
      { question: "Which sentence is correct?", options: ["i am happy.", "I am happy.", "I Am Happy.", "i Am happy."], correct: 1 },
      { question: "What does 'read' mean?", options: ["To write numbers", "To understand written words", "To sing songs", "To draw pictures"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Write the missing vowel: C_T (an animal)", options: ["A", "O", "U", "I"], correct: 0 },
      { question: "Which word starts with a vowel?", options: ["Dog", "Apple", "Cat", "Ball"], correct: 1 },
      { question: "How many consonants are in 'BOOK'?", options: ["1", "2", "3", "4"], correct: 1 },
    ],
  },

  "a1-1": {
    levelId: "a1",
    levelLabel: "A1 — Beginner",
    lessonNumber: 1,
    title: "Meeting & Greeting",
    description: "Learn essential greetings and how to introduce yourself in English.",
    vocabulary: [
      { word: "Hello", meaning: "A common greeting", example: "Hello, how are you?", emoji: "👋", arabic: "مرحبا" },
      { word: "Goodbye", meaning: "Said when leaving", example: "Goodbye, see you tomorrow!", emoji: "👋🏼", arabic: "مع السلامة" },
      { word: "Name", meaning: "What you are called", example: "My name is John.", emoji: "🏷️", arabic: "اسم" },
      { word: "Please", meaning: "A polite word when asking", example: "Can I have water, please?", emoji: "🙏", arabic: "من فضلك" },
      { word: "Thank you", meaning: "Showing gratitude", example: "Thank you for helping me.", emoji: "💐", arabic: "شكراً" },
      { word: "Yes", meaning: "Affirmative response", example: "Yes, I understand.", emoji: "✅", arabic: "نعم" },
      { word: "No", meaning: "Negative response", example: "No, thank you.", emoji: "❌", arabic: "لا" },
      { word: "Sorry", meaning: "Expressing apology", example: "Sorry, I'm late.", emoji: "😔", arabic: "آسف" },
      { word: "Friend", meaning: "A person you like and trust", example: "She is my friend.", emoji: "🤝", arabic: "صديق" },
      { word: "Nice", meaning: "Pleasant, good", example: "Nice to meet you!", emoji: "😊", arabic: "لطيف" },
    ],
    dialogue: [
      { speaker: "Tom", text: "Hello! My name is Tom. What's your name?" },
      { speaker: "Lisa", text: "Hi! I'm Lisa. Nice to meet you, Tom!" },
      { speaker: "Tom", text: "Nice to meet you too! Where are you from?" },
      { speaker: "Lisa", text: "I'm from Brazil. And you?" },
      { speaker: "Tom", text: "I'm from England. Welcome to the English Club!" },
      { speaker: "Lisa", text: "Thank you! I'm happy to be here." },
    ],
    grammar: {
      title: "The Verb 'To Be' — Present Simple",
      explanation: "The verb 'to be' is the most important verb in English. It changes form depending on the subject: I am, you are, he/she/it is, we/they are. We use it to describe identity, feelings, and states.",
      examples: [
        { sentence: "I am a student.", note: "Use 'am' with 'I'" },
        { sentence: "You are my friend.", note: "Use 'are' with 'you'" },
        { sentence: "She is a teacher.", note: "Use 'is' with he/she/it" },
        { sentence: "We are happy.", note: "Use 'are' with we/they" },
      ],
    },
    vocabExercises: [
      { question: "What does 'Hello' mean?", options: ["Goodbye", "A greeting", "Thank you", "Sorry"], correct: 1 },
      { question: "You say '___ to meet you' when meeting someone new.", options: ["Bad", "Nice", "Sorry", "Goodbye"], correct: 1 },
      { question: "What do you say when you leave?", options: ["Hello", "Please", "Thank you", "Goodbye"], correct: 3 },
      { question: "'Sorry' expresses:", options: ["Happiness", "Apology", "Greeting", "Gratitude"], correct: 1 },
      { question: "Which word means showing gratitude?", options: ["Please", "No", "Thank you", "Hello"], correct: 2 },
    ],
    conversationExercises: [
      { question: "Where is Lisa from?", options: ["England", "Brazil", "France", "Japan"], correct: 1 },
      { question: "Where is Tom from?", options: ["Brazil", "America", "England", "Canada"], correct: 2 },
      { question: "What does Tom say at the end?", options: ["Goodbye!", "Sorry!", "Welcome to the English Club!", "See you later!"], correct: 2 },
    ],
    grammarExercises: [
      { question: "Complete: 'I ___ a student.'", options: ["is", "are", "am", "be"], correct: 2 },
      { question: "Complete: 'She ___ a teacher.'", options: ["am", "are", "is", "be"], correct: 2 },
      { question: "Complete: 'They ___ happy.'", options: ["is", "am", "are", "be"], correct: 2 },
      { question: "Which is correct?", options: ["I is happy.", "I am happy.", "I are happy.", "I be happy."], correct: 1 },
    ],
    examQuestions: [
      { question: "'Nice to ___ you.' Complete:", options: ["see", "meet", "be", "go"], correct: 1 },
      { question: "Complete: 'We ___ from Spain.'", options: ["am", "is", "are", "be"], correct: 2 },
      { question: "What does 'friend' mean?", options: ["A teacher", "A person you trust", "A country", "A greeting"], correct: 1 },
      { question: "Which greeting is formal?", options: ["Hey!", "Yo!", "Hello", "What's up"], correct: 2 },
      { question: "'He ___ my brother.'", options: ["am", "are", "is", "be"], correct: 2 },
    ],
    homeworkQuestions: [
      { question: "Introduce yourself: 'My ___ is Alex.'", options: ["friend", "name", "sorry", "please"], correct: 1 },
      { question: "Write the response: 'How are you?' — 'I ___ fine.'", options: ["is", "am", "are", "be"], correct: 1 },
      { question: "'___ to meet you!'", options: ["Bad", "Sorry", "Nice", "No"], correct: 2 },
    ],
  },

  "a2-1": {
    levelId: "a2",
    levelLabel: "A2 — Elementary",
    lessonNumber: 1,
    title: "Daily Routines",
    description: "Talk about your daily activities using the present simple tense.",
    vocabulary: [
      { word: "Wake up", meaning: "To stop sleeping", example: "I wake up at 7 AM.", emoji: "⏰", arabic: "يستيقظ" },
      { word: "Breakfast", meaning: "The first meal of the day", example: "I have breakfast at 8 AM.", emoji: "🥐", arabic: "فطور" },
      { word: "Commute", meaning: "Travel to work or school", example: "My commute takes 30 minutes.", emoji: "🚌", arabic: "التنقل" },
      { word: "Lunch", meaning: "The midday meal", example: "We eat lunch at noon.", emoji: "🥪", arabic: "غداء" },
      { word: "Dinner", meaning: "The evening meal", example: "Dinner is at 7 PM.", emoji: "🍽️", arabic: "عشاء" },
      { word: "Exercise", meaning: "Physical activity for health", example: "I exercise three times a week.", emoji: "🏃", arabic: "تمرين" },
      { word: "Shower", meaning: "To wash under running water", example: "I take a shower every morning.", emoji: "🚿", arabic: "دش" },
      { word: "Relax", meaning: "To rest and feel calm", example: "I relax in the evening.", emoji: "😌", arabic: "يسترخي" },
      { word: "Routine", meaning: "Regular activities you do each day", example: "My morning routine starts at 6 AM.", emoji: "🔁", arabic: "روتين" },
      { word: "Schedule", meaning: "A plan of activities and times", example: "Check the schedule for class times.", emoji: "📅", arabic: "جدول" },
    ],
    dialogue: [
      { speaker: "Emma", text: "What time do you usually wake up?" },
      { speaker: "Jack", text: "I wake up at 6:30. I always take a shower first." },
      { speaker: "Emma", text: "Do you eat breakfast at home?" },
      { speaker: "Jack", text: "Yes, I usually have toast and coffee. What about you?" },
      { speaker: "Emma", text: "I never eat breakfast. I just have coffee on the way to work." },
      { speaker: "Jack", text: "That's not healthy! Breakfast is the most important meal." },
    ],
    grammar: {
      title: "Adverbs of Frequency",
      explanation: "Adverbs of frequency tell us how often something happens. They go before the main verb but after 'be'. The order from most to least: always (100%), usually (80%), often (60%), sometimes (40%), rarely (20%), never (0%).",
      examples: [
        { sentence: "I always brush my teeth.", note: "100% of the time" },
        { sentence: "She usually takes the bus.", note: "About 80% of the time" },
        { sentence: "He sometimes works late.", note: "About 40% of the time" },
        { sentence: "They never eat fast food.", note: "0% of the time" },
      ],
    },
    vocabExercises: [
      { question: "What does 'commute' mean?", options: ["To eat", "To sleep", "To travel to work", "To relax"], correct: 2 },
      { question: "Which meal is in the evening?", options: ["Breakfast", "Lunch", "Brunch", "Dinner"], correct: 3 },
      { question: "What does 'routine' mean?", options: ["A special event", "Regular daily activities", "A holiday", "A sport"], correct: 1 },
      { question: "'Relax' means to:", options: ["Work hard", "Run fast", "Rest and feel calm", "Wake up early"], correct: 2 },
      { question: "A 'schedule' is:", options: ["A type of food", "A plan of activities", "A type of exercise", "A greeting"], correct: 1 },
    ],
    conversationExercises: [
      { question: "What time does Jack wake up?", options: ["6:00", "6:30", "7:00", "7:30"], correct: 1 },
      { question: "Does Emma eat breakfast?", options: ["Yes, always", "Sometimes", "Never", "Yes, at work"], correct: 2 },
      { question: "What does Jack say about breakfast?", options: ["It's not important", "It's the most important meal", "He doesn't like it", "He skips it"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Where does the adverb go? 'She ___ eats lunch at noon.'", options: ["always", "at always", "always is", "is always"], correct: 0 },
      { question: "'I ___ late for class.' (never)", options: ["never am", "am never", "never", "am never be"], correct: 1 },
      { question: "Which means 0% frequency?", options: ["Always", "Usually", "Sometimes", "Never"], correct: 3 },
      { question: "'He ___ watches TV.' (100% frequency)", options: ["never", "sometimes", "always", "rarely"], correct: 2 },
    ],
    examQuestions: [
      { question: "'She ___ gets up at 5 AM.' (80%)", options: ["never", "usually", "rarely", "always"], correct: 1 },
      { question: "The first meal of the day is:", options: ["Dinner", "Lunch", "Breakfast", "Snack"], correct: 2 },
      { question: "'I ___ late.' (never) — correct form:", options: ["never am", "am never", "never is", "is never"], correct: 1 },
      { question: "What does 'exercise' mean?", options: ["To sleep", "Physical activity", "To eat", "To study"], correct: 1 },
      { question: "Adverbs of frequency go ___ the main verb.", options: ["after", "before", "instead of", "without"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Put in order: 'always / I / wake up / early'", options: ["I always wake up early.", "Always I wake up early.", "I wake up always early.", "I wake always up early."], correct: 0 },
      { question: "What do you do after waking up? Choose the best:", options: ["Have dinner", "Take a shower", "Go to sleep", "Watch a movie"], correct: 1 },
      { question: "Complete: 'They ___ eat pizza.' (40%)", options: ["always", "never", "sometimes", "rarely"], correct: 2 },
    ],
  },

  "b1-1": {
    levelId: "b1",
    levelLabel: "B1 — Intermediate",
    lessonNumber: 1,
    title: "Sharing Opinions",
    description: "Learn to express and ask for opinions using appropriate phrases.",
    vocabulary: [
      { word: "Opinion", meaning: "What someone thinks about something", example: "In my opinion, this is a great movie.", emoji: "💭", arabic: "رأي" },
      { word: "Agree", meaning: "To have the same view", example: "I agree with you completely.", emoji: "🤝", arabic: "يوافق" },
      { word: "Disagree", meaning: "To have a different view", example: "I'm sorry, but I disagree.", emoji: "🙅", arabic: "يخالف" },
      { word: "Believe", meaning: "To think something is true", example: "I believe education is important.", emoji: "🧠", arabic: "يعتقد" },
      { word: "Consider", meaning: "To think carefully about", example: "I consider this a good option.", emoji: "🤔", arabic: "يفكر" },
      { word: "Suggest", meaning: "To propose an idea", example: "I suggest we try a different approach.", emoji: "💡", arabic: "يقترح" },
      { word: "Argument", meaning: "A reason for or against", example: "That's a strong argument.", emoji: "⚖️", arabic: "حجة" },
      { word: "Perspective", meaning: "A way of seeing things", example: "From my perspective, it makes sense.", emoji: "👁️", arabic: "منظور" },
      { word: "Point of view", meaning: "Someone's opinion", example: "I understand your point of view.", emoji: "🎯", arabic: "وجهة نظر" },
      { word: "Reasonable", meaning: "Fair and logical", example: "That's a reasonable idea.", emoji: "✔️", arabic: "معقول" },
    ],
    dialogue: [
      { speaker: "Sarah", text: "What do you think about online learning?" },
      { speaker: "Mark", text: "I think it's very convenient. You can study anywhere!" },
      { speaker: "Sarah", text: "I agree, but I believe face-to-face classes are better for speaking practice." },
      { speaker: "Mark", text: "That's a fair point. In my opinion, a mix of both is ideal." },
      { speaker: "Sarah", text: "I couldn't agree more! Blended learning is the future." },
    ],
    grammar: {
      title: "Present Perfect — Have/Has + Past Participle",
      explanation: "We use the present perfect to talk about experiences (without saying when), recent actions with a present result, and situations that started in the past and continue now. Form: have/has + past participle (V3).",
      examples: [
        { sentence: "I have visited London twice.", note: "Experience — we don't say exactly when" },
        { sentence: "She has just finished her homework.", note: "Recent action with present relevance" },
        { sentence: "We have lived here since 2020.", note: "Situation continuing from past to now" },
        { sentence: "Have you ever tried sushi?", note: "Asking about life experiences" },
      ],
    },
    vocabExercises: [
      { question: "What does 'perspective' mean?", options: ["A fact", "A way of seeing things", "A language", "A mistake"], correct: 1 },
      { question: "'I ___ with you' means you share the same view.", options: ["disagree", "argue", "agree", "suggest"], correct: 2 },
      { question: "A 'reasonable' idea is:", options: ["Crazy", "Fair and logical", "Dangerous", "Impossible"], correct: 1 },
      { question: "'Suggest' means to:", options: ["Demand something", "Propose an idea", "Refuse something", "Forget something"], correct: 1 },
      { question: "An 'argument' in a discussion is:", options: ["A fight", "A reason for or against", "A greeting", "A question"], correct: 1 },
    ],
    conversationExercises: [
      { question: "What does Mark think about online learning?", options: ["It's terrible", "It's convenient", "It's boring", "It's expensive"], correct: 1 },
      { question: "What does Sarah believe is better for speaking?", options: ["Online classes", "Books", "Face-to-face classes", "Videos"], correct: 2 },
      { question: "What do they agree on?", options: ["Only online", "Only face-to-face", "Blended learning", "No learning"], correct: 2 },
    ],
    grammarExercises: [
      { question: "Complete: 'I ___ been to Paris.'", options: ["has", "have", "had", "having"], correct: 1 },
      { question: "'She ___ finished her work.'", options: ["have", "has", "had", "is"], correct: 1 },
      { question: "Which sentence is present perfect?", options: ["I went to Rome.", "I have been to Rome.", "I go to Rome.", "I will go to Rome."], correct: 1 },
      { question: "'___ you ever eaten sushi?'", options: ["Do", "Did", "Have", "Are"], correct: 2 },
    ],
    examQuestions: [
      { question: "'In my ___' means giving your view.", options: ["name", "opinion", "house", "car"], correct: 1 },
      { question: "'They ___ lived here for five years.'", options: ["has", "have", "had", "is"], correct: 1 },
      { question: "Which phrase expresses strong agreement?", options: ["I disagree.", "Maybe.", "I couldn't agree more!", "I don't think so."], correct: 2 },
      { question: "'She has ___ her keys.' (lose)", options: ["lose", "losing", "lost", "losed"], correct: 2 },
      { question: "Which is NOT a way to give an opinion?", options: ["I think...", "I believe...", "In my opinion...", "I am eating..."], correct: 3 },
    ],
    homeworkQuestions: [
      { question: "Write: 'I / never / be / to Japan' in present perfect:", options: ["I never been to Japan.", "I have never been to Japan.", "I has never been to Japan.", "I never have been to Japan."], correct: 1 },
      { question: "Give an opinion: '___, technology helps education.'", options: ["I eat", "In my opinion", "Yesterday", "Tomorrow"], correct: 1 },
      { question: "Present perfect or past simple? 'I ___ pizza yesterday.'", options: ["have eaten", "ate", "eat", "has eaten"], correct: 1 },
    ],
  },

  "b2-1": {
    levelId: "b2",
    levelLabel: "B2 — Upper-Intermediate",
    lessonNumber: 1,
    title: "The Passive Voice",
    description: "Learn when and how to use the passive voice in English.",
    vocabulary: [
      { word: "Discover", meaning: "To find something for the first time", example: "Penicillin was discovered in 1928.", emoji: "🔍", arabic: "يكتشف" },
      { word: "Manufacture", meaning: "To make products in a factory", example: "These cars are manufactured in Germany.", emoji: "🏭", arabic: "يصنع" },
      { word: "Construct", meaning: "To build something", example: "The bridge was constructed in 2010.", emoji: "🏗️", arabic: "يبني" },
      { word: "Establish", meaning: "To start or create officially", example: "The company was established in 1990.", emoji: "🏢", arabic: "يؤسس" },
      { word: "Investigate", meaning: "To examine carefully", example: "The case is being investigated.", emoji: "🕵️", arabic: "يحقق" },
      { word: "Transform", meaning: "To change completely", example: "The city has been transformed.", emoji: "🔄", arabic: "يحول" },
      { word: "Publish", meaning: "To make available to public", example: "The book was published last year.", emoji: "📚", arabic: "ينشر" },
      { word: "Influence", meaning: "To affect or change", example: "She was influenced by her teacher.", emoji: "🌟", arabic: "يؤثر" },
      { word: "Recognize", meaning: "To identify or acknowledge", example: "He was recognized for his work.", emoji: "🏆", arabic: "يعترف" },
      { word: "Design", meaning: "To plan and create", example: "The building was designed by a famous architect.", emoji: "✏️", arabic: "يصمم" },
    ],
    dialogue: [
      { speaker: "Professor", text: "Today we'll discuss the passive voice. Can anyone give an example?" },
      { speaker: "Student A", text: "The Mona Lisa was painted by Leonardo da Vinci." },
      { speaker: "Professor", text: "Excellent! Notice we focus on the painting, not the painter. Why?" },
      { speaker: "Student B", text: "Because the object is more important than who did the action?" },
      { speaker: "Professor", text: "Exactly. We use passive when the action or result matters more than the doer." },
    ],
    grammar: {
      title: "The Passive Voice — be + Past Participle",
      explanation: "The passive voice shifts focus from who does the action to what receives it. Form: subject + be (conjugated) + past participle. Use it when the doer is unknown, obvious, or less important than the action/result. We can add 'by + agent' if needed.",
      examples: [
        { sentence: "English is spoken worldwide.", note: "Present simple passive — general fact" },
        { sentence: "The letter was sent yesterday.", note: "Past simple passive — completed action" },
        { sentence: "A new school is being built.", note: "Present continuous passive — in progress" },
        { sentence: "The work has been completed.", note: "Present perfect passive — recent result" },
      ],
    },
    vocabExercises: [
      { question: "What does 'manufacture' mean?", options: ["To break", "To make in a factory", "To sell online", "To destroy"], correct: 1 },
      { question: "'Establish' means to:", options: ["End something", "Start officially", "Move somewhere", "Lose something"], correct: 1 },
      { question: "If something is 'transformed' it has been:", options: ["Kept the same", "Changed completely", "Made smaller", "Painted"], correct: 1 },
      { question: "'Investigate' means to:", options: ["Ignore", "Examine carefully", "Run away", "Build"], correct: 1 },
      { question: "'Publish' means to:", options: ["Hide", "Delete", "Make available to public", "Forget"], correct: 2 },
    ],
    conversationExercises: [
      { question: "What example did Student A give?", options: ["A book", "The Mona Lisa", "A bridge", "A song"], correct: 1 },
      { question: "Why do we use the passive voice?", options: ["It sounds fancier", "When the action matters more than the doer", "It's easier", "It's shorter"], correct: 1 },
      { question: "Who painted the Mona Lisa?", options: ["Picasso", "Michelangelo", "Leonardo da Vinci", "Van Gogh"], correct: 2 },
    ],
    grammarExercises: [
      { question: "Change to passive: 'They build cars here.'", options: ["Cars built here.", "Cars are built here.", "Cars is built here.", "Cars was built here."], correct: 1 },
      { question: "'The book ___ (write) by Dickens.'", options: ["wrote", "was wrote", "was written", "is writing"], correct: 2 },
      { question: "Which is passive?", options: ["She reads books.", "Books are read by her.", "She is reading.", "She has read."], correct: 1 },
      { question: "'A new hospital ___ (build) right now.'", options: ["is being built", "is building", "was built", "builds"], correct: 0 },
    ],
    examQuestions: [
      { question: "Passive of 'Someone stole the painting':", options: ["The painting stolen.", "The painting was stolen.", "The painting is stealing.", "Someone was stolen."], correct: 1 },
      { question: "'These phones ___ in China.' (manufacture)", options: ["manufacture", "are manufactured", "is manufactured", "manufacturing"], correct: 1 },
      { question: "When do we use passive voice?", options: ["Always", "When the doer is most important", "When the action/result matters more", "Never in writing"], correct: 2 },
      { question: "'The report has ___ completed.'", options: ["be", "been", "being", "was"], correct: 1 },
      { question: "'English ___ all over the world.'", options: ["speaks", "is speaking", "is spoken", "spoke"], correct: 2 },
    ],
    homeworkQuestions: [
      { question: "Rewrite in passive: 'Bell invented the telephone.'", options: ["The telephone invented by Bell.", "The telephone was invented by Bell.", "Bell was invented by the telephone.", "The telephone is invented."], correct: 1 },
      { question: "'The homework ___ (not finish) yet.'", options: ["hasn't been finished", "hasn't finished", "didn't finish", "wasn't finish"], correct: 0 },
      { question: "Which tense? 'The building is being renovated.'", options: ["Present simple", "Past simple", "Present continuous", "Present perfect"], correct: 2 },
    ],
  },

  "c1-1": {
    levelId: "c1",
    levelLabel: "C1 — Advanced",
    lessonNumber: 1,
    title: "Nuanced Communication",
    description: "Master hedging, diplomatic language, and nuanced expression.",
    vocabulary: [
      { word: "Nuance", meaning: "A subtle difference in meaning", example: "There's an important nuance between the two terms.", emoji: "🎨", arabic: "فارق دقيق" },
      { word: "Allegedly", meaning: "Claimed but not proven", example: "He allegedly committed the crime.", emoji: "❓", arabic: "بحسب الزعم" },
      { word: "Implications", meaning: "Possible effects or consequences", example: "The implications of this policy are far-reaching.", emoji: "🔗", arabic: "تداعيات" },
      { word: "Ambiguous", meaning: "Having more than one meaning", example: "The statement was rather ambiguous.", emoji: "🌫️", arabic: "غامض" },
      { word: "Elaborate", meaning: "To explain in more detail", example: "Could you elaborate on that point?", emoji: "📖", arabic: "يفصّل" },
      { word: "Substantial", meaning: "Large in amount or importance", example: "There has been substantial progress.", emoji: "📊", arabic: "كبير" },
      { word: "Undermine", meaning: "To weaken gradually", example: "This could undermine public trust.", emoji: "⛏️", arabic: "يقوّض" },
      { word: "Tentative", meaning: "Not certain or fixed", example: "We've made a tentative agreement.", emoji: "🤞", arabic: "مبدئي" },
      { word: "Pragmatic", meaning: "Dealing with things practically", example: "We need a pragmatic approach.", emoji: "🛠️", arabic: "عملي" },
      { word: "Compelling", meaning: "Very convincing", example: "She made a compelling argument.", emoji: "💪", arabic: "مقنع" },
    ],
    dialogue: [
      { speaker: "Chair", text: "I'd like to address the proposed changes. What are your thoughts?" },
      { speaker: "Dr. Mills", text: "I tend to think the approach has merit, though I'd suggest we consider the broader implications." },
      { speaker: "Prof. Chen", text: "I see your point, but I wonder whether the evidence is substantial enough to justify such changes." },
      { speaker: "Dr. Mills", text: "That's a fair observation. Perhaps we could adopt a more tentative approach initially." },
      { speaker: "Chair", text: "It seems we're broadly in agreement. Shall we draft a preliminary proposal?" },
    ],
    grammar: {
      title: "Hedging & Softening Language",
      explanation: "Advanced English uses hedging to make statements less direct and more diplomatic. This includes modal verbs (might, could, would), adverbs (perhaps, arguably), phrases (tend to, it seems), and passive constructions. Hedging shows academic sophistication and politeness.",
      examples: [
        { sentence: "It could be argued that this approach is flawed.", note: "Passive + modal = very diplomatic" },
        { sentence: "The results would seem to suggest a correlation.", note: "Multiple hedges for academic writing" },
        { sentence: "I tend to think we should reconsider.", note: "'Tend to' softens a personal opinion" },
        { sentence: "There appears to be some evidence for this.", note: "'Appears to be' avoids absolute claims" },
      ],
    },
    vocabExercises: [
      { question: "'Nuance' refers to:", options: ["An obvious fact", "A subtle difference", "A loud sound", "A fast movement"], correct: 1 },
      { question: "'Ambiguous' means:", options: ["Clear", "Having multiple meanings", "Wrong", "Beautiful"], correct: 1 },
      { question: "'Compelling' means:", options: ["Boring", "Weak", "Very convincing", "Confusing"], correct: 2 },
      { question: "To 'undermine' is to:", options: ["Support strongly", "Weaken gradually", "Build up", "Celebrate"], correct: 1 },
      { question: "'Pragmatic' means:", options: ["Idealistic", "Emotional", "Practical", "Theoretical"], correct: 2 },
    ],
    conversationExercises: [
      { question: "How does Dr. Mills express her opinion?", options: ["Directly: 'I think this is right.'", "Softly: 'I tend to think...'", "Aggressively: 'You're wrong!'", "She doesn't give an opinion"], correct: 1 },
      { question: "What does Prof. Chen question?", options: ["The time", "Whether the evidence is sufficient", "The topic", "Who is speaking"], correct: 1 },
      { question: "What is the final decision?", options: ["To cancel everything", "To draft a preliminary proposal", "To disagree", "To leave the meeting"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Which is the most hedged?", options: ["This is wrong.", "This might be wrong.", "This could potentially be seen as problematic.", "This is problematic."], correct: 2 },
      { question: "Choose the academic hedge:", options: ["I think so.", "It seems so.", "The evidence would appear to suggest so.", "Yeah, definitely."], correct: 2 },
      { question: "'I ___ to think this is correct.' (soft opinion)", options: ["want", "tend", "need", "have"], correct: 1 },
      { question: "Which softens a claim?", options: ["Definitely", "Obviously", "Perhaps", "Clearly"], correct: 2 },
    ],
    examQuestions: [
      { question: "Hedging is used to:", options: ["Be rude", "Make statements more diplomatic", "Avoid speaking", "Shout louder"], correct: 1 },
      { question: "'There ___ to be some support for this view.'", options: ["is", "are", "appears", "have"], correct: 2 },
      { question: "Which phrase is diplomatic disagreement?", options: ["You're wrong!", "I see your point, but...", "That's stupid.", "No way!"], correct: 1 },
      { question: "'Allegedly' means:", options: ["Certainly", "Claimed but not proven", "Always", "Never"], correct: 1 },
      { question: "Rewrite diplomatically: 'This plan will fail.'", options: ["This plan is terrible.", "This plan might face some challenges.", "This plan will definitely fail.", "I hate this plan."], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Soften: 'You are wrong.'", options: ["You're so wrong!", "I tend to see it differently.", "Wrong!", "No."], correct: 1 },
      { question: "Academic version of 'This proves it':", options: ["This proves it.", "This would seem to suggest...", "This is obvious.", "Everyone knows this."], correct: 1 },
      { question: "Choose the most tentative:", options: ["It is.", "It might be.", "It could perhaps be.", "Definitely."], correct: 2 },
    ],
  },

  "c2-1": {
    levelId: "c2",
    levelLabel: "C2 — Proficiency",
    lessonNumber: 1,
    title: "Stylistic Mastery",
    description: "Explore register, rhetoric, and sophisticated written expression.",
    vocabulary: [
      { word: "Rhetoric", meaning: "The art of persuasive speaking/writing", example: "His rhetoric was powerful and moving.", emoji: "🎤", arabic: "بلاغة" },
      { word: "Juxtaposition", meaning: "Placing contrasting things together", example: "The juxtaposition of wealth and poverty was striking.", emoji: "⚡", arabic: "مقارنة" },
      { word: "Eloquent", meaning: "Fluent and persuasive in speech", example: "She gave an eloquent speech.", emoji: "🗣️", arabic: "فصيح" },
      { word: "Succinct", meaning: "Brief and clearly expressed", example: "Keep your answer succinct.", emoji: "✂️", arabic: "موجز" },
      { word: "Verbose", meaning: "Using more words than needed", example: "The report was unnecessarily verbose.", emoji: "📜", arabic: "مسهب" },
      { word: "Paradox", meaning: "A statement that contradicts itself but reveals truth", example: "Less is more — a classic paradox.", emoji: "🔀", arabic: "مفارقة" },
      { word: "Irony", meaning: "Saying the opposite of what you mean", example: "The fire station burned down — that's irony.", emoji: "🎭", arabic: "سخرية" },
      { word: "Connotation", meaning: "An idea suggested by a word beyond its literal meaning", example: "'Home' has warm connotations.", emoji: "💫", arabic: "دلالة" },
      { word: "Register", meaning: "Level of formality in language", example: "Academic writing uses a formal register.", emoji: "📏", arabic: "مستوى اللغة" },
      { word: "Discourse", meaning: "Written or spoken communication", example: "Political discourse shapes public opinion.", emoji: "💬", arabic: "خطاب" },
    ],
    dialogue: [
      { speaker: "Examiner", text: "Discuss the role of rhetoric in shaping public opinion." },
      { speaker: "Candidate", text: "Rhetoric, by its very nature, operates at the intersection of logic and emotion. One might argue that effective rhetoric doesn't merely inform — it transforms perspective." },
      { speaker: "Examiner", text: "Could you elaborate on how register affects persuasiveness?" },
      { speaker: "Candidate", text: "Certainly. The deliberate choice of register — whether colloquial or formal — fundamentally alters the audience's receptivity. A politician addressing factory workers would be ill-advised to employ the same register as in a parliamentary debate." },
      { speaker: "Examiner", text: "An astute observation. Thank you." },
    ],
    grammar: {
      title: "Inversion for Emphasis",
      explanation: "At C2 level, writers and speakers use subject-verb inversion after negative or restrictive adverbials to create emphasis and a formal, literary tone. The auxiliary verb comes before the subject, similar to question formation but used in statements.",
      examples: [
        { sentence: "Never have I seen such beauty.", note: "Inversion after 'never' for dramatic emphasis" },
        { sentence: "Not only did she win, but she broke the record.", note: "'Not only...but' requires inversion in first clause" },
        { sentence: "Rarely does one encounter such talent.", note: "Formal, literary emphasis" },
        { sentence: "Under no circumstances should this be ignored.", note: "Strong emphasis on prohibition" },
      ],
    },
    vocabExercises: [
      { question: "'Juxtaposition' means:", options: ["Similarity", "Placing contrasts together", "A long sentence", "A greeting"], correct: 1 },
      { question: "The opposite of 'succinct' is:", options: ["Brief", "Clear", "Verbose", "Quiet"], correct: 2 },
      { question: "'Connotation' refers to:", options: ["Dictionary definition", "Implied meaning beyond literal", "Grammar rules", "Spelling"], correct: 1 },
      { question: "'Register' in language means:", options: ["A cash register", "Level of formality", "A type of accent", "A writing tool"], correct: 1 },
      { question: "A 'paradox' is:", options: ["A simple fact", "A self-contradictory statement revealing truth", "A long story", "A formal greeting"], correct: 1 },
    ],
    conversationExercises: [
      { question: "What does the candidate say rhetoric does?", options: ["It bores people", "It transforms perspective", "It confuses people", "It has no effect"], correct: 1 },
      { question: "Why should a politician change register?", options: ["To confuse people", "To match the audience", "To sound smarter", "It doesn't matter"], correct: 1 },
      { question: "The examiner calls the answer:", options: ["Wrong", "Astute", "Boring", "Confusing"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Complete: 'Never ___ I experienced such kindness.'", options: ["did", "have", "was", "am"], correct: 1 },
      { question: "'Not only ___ she pass, but she got top marks.'", options: ["did", "has", "was", "is"], correct: 0 },
      { question: "Which uses inversion correctly?", options: ["Rarely I go there.", "Rarely do I go there.", "Rarely I do go there.", "I rarely do go there."], correct: 1 },
      { question: "'Under no circumstances ___ this be permitted.'", options: ["can", "should", "does", "is"], correct: 1 },
    ],
    examQuestions: [
      { question: "What is rhetoric?", options: ["Grammar rules", "The art of persuasion", "A type of essay", "A vocabulary list"], correct: 1 },
      { question: "Inversion is used for:", options: ["Casual conversation", "Emphasis and formality", "Questions only", "Negative sentences only"], correct: 1 },
      { question: "'Seldom ___ such a display of courage been witnessed.'", options: ["have", "has", "is", "was"], correct: 1 },
      { question: "Which is the most formal register?", options: ["Hey, what's up?", "Hi there!", "Good morning, how are you?", "I trust this correspondence finds you well."], correct: 3 },
      { question: "'Eloquent' means:", options: ["Quiet", "Fluent and persuasive", "Angry", "Confused"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Rewrite with inversion: 'I have never seen such a thing.'", options: ["Never I have seen such a thing.", "Never have I seen such a thing.", "I never have seen such a thing.", "Have I never seen such a thing."], correct: 1 },
      { question: "What is the difference between 'denotation' and 'connotation'?", options: ["They mean the same", "Denotation is literal, connotation is implied", "Connotation is literal, denotation is implied", "Neither relates to meaning"], correct: 1 },
      { question: "Write formal: 'This idea is really good.'", options: ["This idea rocks!", "This idea is really good.", "This proposition demonstrates considerable merit.", "Good idea!"], correct: 2 },
    ],
  },
};

export const lessons: Record<string, LessonData> = {
  ...baseLessons,
  ...readingLessons,
  ...a1Lessons,
  ...a2Lessons,
  ...b1Lessons,
  ...b2Lessons,
  ...c1Lessons,
  ...c2Lessons,
  ...readingLessons6to10,
  ...a1Lessons6to10,
  ...a2Lessons6to10,
  ...b1Lessons6to10,
  ...b2Lessons6to10,
  ...c1Lessons6to10,
  ...c2Lessons6to10,
  ...readingLessons11to15,
  ...a1Lessons11to15,
  ...a2Lessons11to15,
  ...b1Lessons11to15,
  ...b2Lessons11to15,
  ...c1Lessons11to15,
  ...c2Lessons11to15,
  ...readingLessons16to20,
  ...a1Lessons16to20,
  ...a2Lessons16to20,
  ...b1Lessons16to20,
  ...b2Lessons16to20,
  ...c1Lessons16to20,
  ...c2Lessons16to20,
  ...kidsLessons,
  ...kidsLessons6to10,
  ...kidsLessons11to15,
  ...kidsLessons16to20,
  ...communicationLessons,
  ...communicationLessons2,
  ...writingLessons,
  ...writingLessons2,
  ...grammarCourseLessons,
  ...grammarCourseLessons2,
  ...examPrepLessons2,
  ...examPrepLessons3,
  ...communicationLessons3,
  ...communicationLessons4,
  ...writingLessons3,
  ...writingLessons4,
  ...speakingListeningExtra,
  ...professionalGrammarExtra,
  ...pronunciationFluencyExtra,
  ...readingVocabLessons,
  ...interactiveLessons,
  ...specializedNewLessons,
  ...storyLessons,
  ...moviesLessons,
  ...readingVocabLessons2,
  ...interactiveLessons2,
  ...specializedLessons5,
  ...readingVocabLessons3,
  ...interactiveLessons3,
  ...specializedLessons6,
  ...specializedLessons7,
  ...moviesLessons2,
  ...storyLessons2,
  ...readingVocabExpansion,
  ...specializedExpansion,
  ...readingVocabExpansion2,
  ...specializedExpansion2,
  ...specializedLessons8,
  ...specializedExpansion3,
  ...specializedExpansion4,
  ...specializedCompletion1,
  ...specializedCompletion2,
  ...specializedCompletion3,
  ...expansion20Batch1,
  ...expansion20Batch2,
  ...expansion20Batch3,
  ...musicLessons,
  ...newsLessons,
  ...legalLessons,
  ...hospitalityLessons,
};
