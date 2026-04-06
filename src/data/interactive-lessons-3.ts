import { LessonData } from "./lessons";

export const interactiveLessons3: Record<string, LessonData> = {
  "slang-4": {
    levelId: "slang", levelLabel: "Slang & Everyday English", lessonNumber: 4,
    title: "British vs American Slang",
    description: "Discover the differences between British and American informal English.",
    vocabulary: [
      { word: "Brilliant (UK)", meaning: "Great, wonderful", example: "That was brilliant!", emoji: "🇬🇧", arabic: "رائع" },
      { word: "Awesome (US)", meaning: "Amazing, excellent", example: "That concert was awesome!", emoji: "🇺🇸", arabic: "مذهل" },
      { word: "Mate (UK)", meaning: "Friend", example: "Alright, mate?", emoji: "🇬🇧", arabic: "صاحب" },
      { word: "Dude (US)", meaning: "Friend / guy", example: "Hey dude, what's up?", emoji: "🇺🇸", arabic: "يا صاحبي" },
      { word: "Chuffed (UK)", meaning: "Very pleased", example: "I'm well chuffed with my results!", emoji: "😊", arabic: "سعيد جداً" },
      { word: "Stoked (US)", meaning: "Very excited", example: "I'm so stoked for the trip!", emoji: "🤩", arabic: "متحمس" },
      { word: "Gutted (UK)", meaning: "Very disappointed", example: "I was gutted when we lost.", emoji: "😢", arabic: "محبط جداً" },
      { word: "Bummed (US)", meaning: "Disappointed", example: "I'm bummed about the cancellation.", emoji: "😞", arabic: "محبط" },
      { word: "Dodgy (UK)", meaning: "Suspicious or unreliable", example: "That website looks dodgy.", emoji: "🤨", arabic: "مشبوه" },
      { word: "Sketchy (US)", meaning: "Suspicious, questionable", example: "That area is kinda sketchy.", emoji: "😬", arabic: "مريب" },
    ],
    dialogue: [
      { speaker: "James (UK)", text: "Alright mate! Fancy grabbing a bite?" },
      { speaker: "Tyler (US)", text: "Hey dude! Sure, that sounds awesome." },
      { speaker: "James (UK)", text: "I know a brilliant little café around the corner." },
      { speaker: "Tyler (US)", text: "Is it that dodgy-looking place?" },
      { speaker: "James (UK)", text: "Nah mate, it's well good! You'll be chuffed with the food." },
    ],
    grammar: {
      title: "British vs American Vocabulary Pairs",
      explanation: "UK and US English share grammar but differ in some everyday words: lift/elevator, flat/apartment, boot/trunk, lorry/truck.",
      examples: [
        { sentence: "UK: 'Take the lift.' US: 'Take the elevator.'", note: "Same thing, different words" },
        { sentence: "UK: 'I live in a flat.' US: 'I live in an apartment.'", note: "Housing vocabulary" },
        { sentence: "UK: 'Put it in the boot.' US: 'Put it in the trunk.'", note: "Car vocabulary" },
        { sentence: "UK: 'That's rubbish!' US: 'That's garbage/trash!'", note: "Waste vocabulary" },
      ],
    },
    vocabExercises: [
      { question: "'Chuffed' (UK) means:", options: ["Angry", "Very pleased", "Tired", "Confused"], correct: 1 },
      { question: "'Sketchy' (US) means:", options: ["Artistic", "Beautiful", "Suspicious", "Funny"], correct: 2 },
    ],
    conversationExercises: [
      { question: "UK 'mate' = US:", options: ["Boss", "Teacher", "Dude/buddy", "Brother"], correct: 2 },
    ],
    grammarExercises: [
      { question: "UK 'flat' = US:", options: ["House", "Apartment", "Office", "Room"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Gutted' (UK) means:", options: ["Happy", "Very disappointed", "Hungry", "Sick"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "UK 'boot' (car) = US:", options: ["Hood", "Trunk", "Wheel", "Door"], correct: 1 },
    ],
  },
  "slang-5": {
    levelId: "slang", levelLabel: "Slang & Everyday English", lessonNumber: 5,
    title: "Slang in Music & Pop Culture",
    description: "Understand slang from songs, TV shows, and pop culture references.",
    vocabulary: [
      { word: "Bop", meaning: "A catchy, fun song", example: "This song is such a bop!", emoji: "🎵", arabic: "أغنية جذابة" },
      { word: "Stan", meaning: "To be a super fan of someone", example: "I stan that band so hard.", emoji: "🤩", arabic: "معجب متحمس" },
      { word: "Clout", meaning: "Fame or influence", example: "He's just chasing clout online.", emoji: "👑", arabic: "شهرة / نفوذ" },
      { word: "Drip", meaning: "Stylish fashion sense", example: "Check out her drip today!", emoji: "💧", arabic: "أناقة" },
      { word: "Cancelled", meaning: "Publicly rejected or boycotted", example: "That celebrity got cancelled.", emoji: "🚫", arabic: "تم رفضه علنياً" },
      { word: "Ship", meaning: "To support two people being together", example: "I totally ship those two characters.", emoji: "❤️", arabic: "يتمنى علاقة بين شخصين" },
      { word: "Tea", meaning: "Gossip or drama", example: "What's the tea? Tell me everything!", emoji: "🍵", arabic: "نميمة" },
      { word: "Glow up", meaning: "A major positive transformation", example: "She had such a glow up!", emoji: "✨", arabic: "تحول إيجابي" },
      { word: "Vibe check", meaning: "Assessing someone's mood or energy", example: "Vibe check — how's everyone feeling?", emoji: "🔮", arabic: "فحص المزاج" },
      { word: "Main character", meaning: "Someone living life confidently", example: "She's giving main character energy.", emoji: "🌟", arabic: "البطل الرئيسي" },
    ],
    dialogue: [
      { speaker: "Zara", text: "Did you hear the new album? Every track is a bop! 🎵" },
      { speaker: "Lily", text: "I know! I totally stan them. What's the tea on their concert tour?" },
      { speaker: "Zara", text: "They're coming to our city! Also, did you see the lead singer's glow up?" },
      { speaker: "Lily", text: "Yes! Major main character energy. Their drip is always on point." },
      { speaker: "Zara", text: "We need tickets! I'm not missing this — no FOMO for me!" },
    ],
    grammar: {
      title: "Slang as Verbs, Nouns & Adjectives",
      explanation: "Pop culture slang can function as different parts of speech: 'stan' (verb), 'tea' (noun), 'cancelled' (adjective).",
      examples: [
        { sentence: "I stan this artist. (verb = to be a super fan)", note: "'Stan' as a verb" },
        { sentence: "Spill the tea! (noun = gossip)", note: "'Tea' as a noun" },
        { sentence: "He got cancelled. (adjective = rejected)", note: "'Cancelled' as adjective" },
        { sentence: "This song is a total bop. (noun = catchy song)", note: "'Bop' as a noun" },
      ],
    },
    vocabExercises: [
      { question: "'Tea' in slang means:", options: ["A drink", "Gossip", "Money", "A song"], correct: 1 },
      { question: "'Glow up' means:", options: ["To glow in the dark", "A positive transformation", "To wake up early", "To use makeup"], correct: 1 },
    ],
    conversationExercises: [
      { question: "To 'stan' someone means:", options: ["To hate them", "To ignore them", "To be their super fan", "To copy them"], correct: 2 },
    ],
    grammarExercises: [
      { question: "'Clout' means:", options: ["A cloud", "Fame or influence", "A type of music", "A hairstyle"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Ship' in pop culture means:", options: ["A boat", "To deliver packages", "To want two people together", "To travel"], correct: 2 },
    ],
    homeworkQuestions: [
      { question: "'Bop' describes a song that is:", options: ["Sad", "Boring", "Catchy and fun", "Long"], correct: 2 },
    ],
  },
};
