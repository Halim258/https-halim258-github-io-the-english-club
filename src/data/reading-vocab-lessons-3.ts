import { LessonData } from "./lessons";

export const readingVocabLessons3: Record<string, LessonData> = {
  "vocab-build-4": {
    levelId: "vocab-build", levelLabel: "Vocabulary Building", lessonNumber: 4,
    title: "Academic Word List",
    description: "Learn high-frequency academic words used across all subjects.",
    vocabulary: [
      { word: "Analyze", meaning: "To examine in detail", example: "Analyze the data carefully.", emoji: "🔬", arabic: "يحلل" },
      { word: "Approach", meaning: "A way of dealing with something", example: "We need a new approach.", emoji: "🛤️", arabic: "نهج" },
      { word: "Concept", meaning: "An abstract idea", example: "This is a key concept.", emoji: "💡", arabic: "مفهوم" },
      { word: "Establish", meaning: "To set up or create", example: "They established the company in 2010.", emoji: "🏗️", arabic: "يؤسس" },
      { word: "Factor", meaning: "Something that contributes to a result", example: "Cost is a major factor.", emoji: "📊", arabic: "عامل" },
      { word: "Indicate", meaning: "To show or point out", example: "The results indicate success.", emoji: "👉", arabic: "يشير" },
      { word: "Significant", meaning: "Important, meaningful", example: "There was a significant improvement.", emoji: "⭐", arabic: "مهم" },
      { word: "Require", meaning: "To need", example: "This task requires patience.", emoji: "📋", arabic: "يتطلب" },
      { word: "Structure", meaning: "The arrangement of parts", example: "The essay has a clear structure.", emoji: "🏛️", arabic: "هيكل" },
      { word: "Method", meaning: "A systematic way of doing something", example: "Use the scientific method.", emoji: "🔧", arabic: "طريقة" },
    ],
    dialogue: [
      { speaker: "Professor", text: "Today we'll analyze the factors that indicate economic growth." },
      { speaker: "Student", text: "Which method should we use for the analysis?" },
      { speaker: "Professor", text: "A comparative approach. It requires looking at multiple data sets." },
      { speaker: "Student", text: "Is the concept of GDP a significant factor?" },
      { speaker: "Professor", text: "Absolutely. It's established as the primary indicator." },
    ],
    grammar: {
      title: "Collocations with Academic Words",
      explanation: "Academic words have fixed collocations: 'conduct research', 'significant impact', 'key factor', 'establish a framework'.",
      examples: [
        { sentence: "conduct research / an experiment", note: "'Conduct' + research (not 'do')" },
        { sentence: "a significant impact / difference", note: "'Significant' + noun" },
        { sentence: "the key/main/primary factor", note: "Adjective + 'factor'" },
        { sentence: "establish a framework / connection", note: "'Establish' + abstract noun" },
      ],
    },
    vocabExercises: [
      { question: "'Significant' means:", options: ["Small", "Important", "Boring", "Fast"], correct: 1 },
      { question: "'Establish' means:", options: ["Destroy", "Set up", "Hide", "Forget"], correct: 1 },
    ],
    conversationExercises: [
      { question: "A 'factor' is:", options: ["A machine", "Something that contributes to a result", "A person", "A building"], correct: 1 },
    ],
    grammarExercises: [
      { question: "We say 'conduct ___':", options: ["a research", "research", "the researching", "researches"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Indicate' means:", options: ["To hide", "To show", "To break", "To forget"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Require' means:", options: ["To want", "To need", "To like", "To hope"], correct: 1 },
    ],
  },
  "vocab-build-5": {
    levelId: "vocab-build", levelLabel: "Vocabulary Building", lessonNumber: 5,
    title: "Collocations & Word Partners",
    description: "Learn natural word combinations that native speakers use every day.",
    vocabulary: [
      { word: "Make a decision", meaning: "To decide", example: "We need to make a decision today.", emoji: "🤔", arabic: "يتخذ قراراً" },
      { word: "Take a break", meaning: "To rest for a short time", example: "Let's take a break.", emoji: "☕", arabic: "يأخذ استراحة" },
      { word: "Pay attention", meaning: "To focus and listen carefully", example: "Pay attention to the details.", emoji: "👂", arabic: "ينتبه" },
      { word: "Do homework", meaning: "To complete school assignments", example: "I need to do my homework.", emoji: "📝", arabic: "يحل الواجب" },
      { word: "Have a look", meaning: "To see or examine", example: "Have a look at this report.", emoji: "👀", arabic: "يلقي نظرة" },
      { word: "Keep in touch", meaning: "To stay in contact", example: "Let's keep in touch!", emoji: "📱", arabic: "يبقى على تواصل" },
      { word: "Get along", meaning: "To have a good relationship", example: "They get along very well.", emoji: "🤝", arabic: "ينسجم مع" },
      { word: "Come to terms", meaning: "To accept something difficult", example: "She came to terms with the loss.", emoji: "🕊️", arabic: "يتقبل" },
      { word: "Catch someone's eye", meaning: "To attract attention", example: "The painting caught my eye.", emoji: "✨", arabic: "يلفت الانتباه" },
      { word: "Run a risk", meaning: "To do something risky", example: "You're running a risk by waiting.", emoji: "⚠️", arabic: "يخاطر" },
    ],
    dialogue: [
      { speaker: "Emma", text: "Can you have a look at my essay before I submit it?" },
      { speaker: "Tom", text: "Sure! Let me take a break first and then I'll pay attention to every detail." },
      { speaker: "Emma", text: "Thanks. I can't make a decision about the conclusion." },
      { speaker: "Tom", text: "Don't run a risk with a weak ending. It catches the reader's eye last!" },
      { speaker: "Emma", text: "Good point. Let's keep in touch about it." },
    ],
    grammar: {
      title: "Common Collocation Errors",
      explanation: "Native speakers use specific word pairs. Say 'make a mistake' NOT 'do a mistake', 'strong coffee' NOT 'powerful coffee'.",
      examples: [
        { sentence: "Make a mistake ✅ (NOT 'do a mistake' ❌)", note: "'Make' for mistakes, decisions" },
        { sentence: "Strong coffee ✅ (NOT 'powerful coffee' ❌)", note: "'Strong' for drinks" },
        { sentence: "Heavy rain ✅ (NOT 'strong rain' ❌)", note: "'Heavy' for rain, traffic" },
        { sentence: "Fast asleep ✅ (NOT 'deep asleep' ❌)", note: "Fixed combination" },
      ],
    },
    vocabExercises: [
      { question: "We say 'make a ___':", options: ["homework", "decision", "break", "attention"], correct: 1 },
      { question: "'Keep in touch' means:", options: ["Hold hands", "Stay in contact", "Touch something", "Keep warm"], correct: 1 },
    ],
    conversationExercises: [
      { question: "We say '___ attention':", options: ["Make", "Do", "Pay", "Give"], correct: 2 },
    ],
    grammarExercises: [
      { question: "Which is correct?", options: ["Do a mistake", "Make a mistake", "Take a mistake", "Have a mistake"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Catch someone's eye' means:", options: ["Hurt their eye", "Attract attention", "Look away", "Close eyes"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "We say '___ rain' for very heavy rain:", options: ["Strong", "Big", "Heavy", "Powerful"], correct: 2 },
    ],
  },
  "idioms-4": {
    levelId: "idioms", levelLabel: "Idioms & Expressions", lessonNumber: 4,
    title: "Food & Animal Idioms",
    description: "Learn colorful idioms related to food and animals.",
    vocabulary: [
      { word: "Piece of cake", meaning: "Very easy", example: "The test was a piece of cake.", emoji: "🍰", arabic: "سهل جداً" },
      { word: "Spill the beans", meaning: "To reveal a secret", example: "Don't spill the beans about the party!", emoji: "🫘", arabic: "يفشي السر" },
      { word: "In a nutshell", meaning: "In summary", example: "In a nutshell, the project was a success.", emoji: "🥜", arabic: "باختصار" },
      { word: "The elephant in the room", meaning: "An obvious problem no one mentions", example: "The budget is the elephant in the room.", emoji: "🐘", arabic: "المشكلة الواضحة المتجاهلة" },
      { word: "Let the cat out of the bag", meaning: "To accidentally reveal a secret", example: "She let the cat out of the bag!", emoji: "🐱", arabic: "يكشف السر بالخطأ" },
      { word: "Kill two birds with one stone", meaning: "Solve two problems at once", example: "By studying here, I kill two birds with one stone.", emoji: "🐦", arabic: "يضرب عصفورين بحجر" },
      { word: "Cry over spilled milk", meaning: "To complain about past mistakes", example: "Don't cry over spilled milk.", emoji: "🥛", arabic: "يبكي على اللبن المسكوب" },
      { word: "Full plate", meaning: "Very busy with many tasks", example: "I have a full plate this week.", emoji: "🍽️", arabic: "مشغول جداً" },
      { word: "A fish out of water", meaning: "Someone in an uncomfortable situation", example: "I felt like a fish out of water at the party.", emoji: "🐟", arabic: "سمكة خارج الماء" },
      { word: "Butterflies in my stomach", meaning: "Feeling nervous", example: "I have butterflies in my stomach before exams.", emoji: "🦋", arabic: "توتر" },
    ],
    dialogue: [
      { speaker: "Nadia", text: "How was the exam?" },
      { speaker: "Omar", text: "Piece of cake! But don't spill the beans about the questions to others." },
      { speaker: "Nadia", text: "I won't! I always get butterflies in my stomach before exams though." },
      { speaker: "Omar", text: "In a nutshell, just study well and you'll be fine." },
      { speaker: "Nadia", text: "Easy for you to say — I have a full plate this week!" },
    ],
    grammar: {
      title: "Using Idioms in Context",
      explanation: "Idioms fit naturally into conversation. Match the idiom to the right situation — don't mix formal and informal contexts.",
      examples: [
        { sentence: "Friend: 'That was a piece of cake!' (casual)", note: "Informal — with friends" },
        { sentence: "Meeting: 'Let's address the elephant in the room.' (semi-formal)", note: "Acceptable in business" },
        { sentence: "Email: 'In a nutshell, the results are positive.' (neutral)", note: "Works in writing too" },
        { sentence: "Avoid in academic papers: 'It was a piece of cake.' ❌", note: "Too informal for essays" },
      ],
    },
    vocabExercises: [
      { question: "'Piece of cake' means:", options: ["Delicious food", "Very easy", "A bakery item", "Difficult"], correct: 1 },
      { question: "'Spill the beans' means:", options: ["Cook beans", "Make a mess", "Reveal a secret", "Eat food"], correct: 2 },
    ],
    conversationExercises: [
      { question: "'Elephant in the room' means:", options: ["A big animal", "An obvious problem no one mentions", "A decoration", "A joke"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'In a nutshell' means:", options: ["Inside a shell", "In summary", "Slowly", "In detail"], correct: 1 },
    ],
    examQuestions: [
      { question: "'A fish out of water' describes:", options: ["Cooking fish", "Being uncomfortable in a situation", "Swimming", "Fishing"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Butterflies in my stomach' means:", options: ["Eating insects", "Stomach pain", "Feeling nervous", "Feeling hungry"], correct: 2 },
    ],
  },
  "idioms-5": {
    levelId: "idioms", levelLabel: "Idioms & Expressions", lessonNumber: 5,
    title: "Money & Work Idioms",
    description: "Master idioms commonly used in business and financial contexts.",
    vocabulary: [
      { word: "Break the bank", meaning: "To spend too much money", example: "This gift won't break the bank.", emoji: "🏦", arabic: "يكلف كثيراً" },
      { word: "Penny for your thoughts", meaning: "Asking what someone is thinking", example: "A penny for your thoughts?", emoji: "🪙", arabic: "ماذا تفكر؟" },
      { word: "Burn the midnight oil", meaning: "To work very late", example: "I burned the midnight oil to finish.", emoji: "🕯️", arabic: "يسهر للعمل" },
      { word: "Back to the drawing board", meaning: "To start over", example: "The plan failed — back to the drawing board.", emoji: "📐", arabic: "نبدأ من جديد" },
      { word: "Get the ball rolling", meaning: "To start something", example: "Let's get the ball rolling on this project.", emoji: "⚽", arabic: "يبدأ العمل" },
      { word: "Think outside the box", meaning: "To think creatively", example: "We need to think outside the box.", emoji: "📦", arabic: "يفكر بإبداع" },
      { word: "Cut corners", meaning: "To do something cheaply or quickly", example: "Don't cut corners on safety.", emoji: "✂️", arabic: "يأخذ اختصارات" },
      { word: "In the red", meaning: "Losing money / in debt", example: "The company is in the red.", emoji: "🔴", arabic: "في خسارة" },
      { word: "In the black", meaning: "Making profit", example: "Finally, we're in the black!", emoji: "⚫", arabic: "في ربح" },
      { word: "Worth its weight in gold", meaning: "Extremely valuable", example: "Good advice is worth its weight in gold.", emoji: "🥇", arabic: "ذو قيمة عالية جداً" },
    ],
    dialogue: [
      { speaker: "Boss", text: "Let's get the ball rolling on the new marketing campaign." },
      { speaker: "Employee", text: "Should we think outside the box or follow the usual approach?" },
      { speaker: "Boss", text: "Be creative, but don't break the bank. We're still in the red this quarter." },
      { speaker: "Employee", text: "I'll burn the midnight oil to get the proposal ready." },
      { speaker: "Boss", text: "Good — but don't cut corners on quality." },
    ],
    grammar: {
      title: "Idioms as Advice & Instructions",
      explanation: "Many work idioms are used as advice or instructions: 'Think outside the box', 'Don't cut corners', 'Get the ball rolling'.",
      examples: [
        { sentence: "Let's get the ball rolling. (= start now)", note: "Imperative — giving instruction" },
        { sentence: "Don't cut corners. (= do it properly)", note: "Negative imperative — warning" },
        { sentence: "We need to think outside the box.", note: "'Need to' + idiom for advice" },
        { sentence: "It's time to go back to the drawing board.", note: "'It's time to' + idiom" },
      ],
    },
    vocabExercises: [
      { question: "'In the red' means:", options: ["Angry", "Losing money", "Embarrassed", "In danger"], correct: 1 },
      { question: "'Think outside the box' means:", options: ["Pack things", "Think creatively", "Leave the office", "Open a box"], correct: 1 },
    ],
    conversationExercises: [
      { question: "'Burn the midnight oil' means:", options: ["Start a fire", "Cook late", "Work very late", "Sleep early"], correct: 2 },
    ],
    grammarExercises: [
      { question: "'Cut corners' means:", options: ["Use scissors", "Do something cheaply", "Turn a corner", "Decorate"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Get the ball rolling' means:", options: ["Play sports", "To start something", "To end something", "To roll a ball"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Back to the drawing board' means:", options: ["Draw a picture", "Go to school", "Start over", "Take a break"], correct: 2 },
    ],
  },
  "phrasal-4": {
    levelId: "phrasal", levelLabel: "Phrasal Verbs", lessonNumber: 4,
    title: "Phrasal Verbs for Relationships",
    description: "Learn phrasal verbs used to talk about friendships and relationships.",
    vocabulary: [
      { word: "Get along with", meaning: "To have a good relationship", example: "I get along with my neighbors.", emoji: "🤝", arabic: "ينسجم مع" },
      { word: "Break up", meaning: "To end a romantic relationship", example: "They broke up last month.", emoji: "💔", arabic: "ينفصل" },
      { word: "Make up", meaning: "To become friends again after a fight", example: "They made up after the argument.", emoji: "🤗", arabic: "يتصالح" },
      { word: "Ask out", meaning: "To invite someone on a date", example: "He asked her out to dinner.", emoji: "💐", arabic: "يدعو للخروج" },
      { word: "Look up to", meaning: "To admire and respect someone", example: "I look up to my teacher.", emoji: "⬆️", arabic: "يحترم ويقدّر" },
      { word: "Fall out with", meaning: "To have an argument and stop being friends", example: "She fell out with her best friend.", emoji: "😤", arabic: "يتشاجر مع" },
      { word: "Bring up", meaning: "To raise a child / mention a topic", example: "She was brought up in London.", emoji: "👶", arabic: "يربي / يطرح موضوع" },
      { word: "Stand by", meaning: "To support someone", example: "I'll always stand by you.", emoji: "🫂", arabic: "يقف بجانب" },
      { word: "Grow apart", meaning: "To slowly become less close", example: "They grew apart over the years.", emoji: "↔️", arabic: "يبتعدان تدريجياً" },
      { word: "Settle down", meaning: "To start living a stable life", example: "He wants to settle down and start a family.", emoji: "🏡", arabic: "يستقر" },
    ],
    dialogue: [
      { speaker: "Sara", text: "I heard Mona and Hala fell out. What happened?" },
      { speaker: "Layla", text: "They had a big argument, but I think they'll make up soon." },
      { speaker: "Sara", text: "I hope so. They've always gotten along so well." },
      { speaker: "Layla", text: "True. They just need someone to stand by them through it." },
      { speaker: "Sara", text: "Friends sometimes grow apart, but real friendships survive." },
    ],
    grammar: {
      title: "Phrasal Verbs with Prepositions",
      explanation: "Relationship phrasal verbs often end with prepositions: 'get along WITH', 'look up TO', 'fall out WITH'. Don't change the preposition!",
      examples: [
        { sentence: "I get along WITH my sister. (NOT 'get along to')", note: "'With' is fixed" },
        { sentence: "Kids look up TO their parents. (NOT 'look up at')", note: "'To' is fixed" },
        { sentence: "She fell out WITH her friend. (NOT 'fell out from')", note: "'With' is fixed" },
        { sentence: "He was brought up BY his grandmother.", note: "'By' for the person" },
      ],
    },
    vocabExercises: [
      { question: "'Make up' means:", options: ["To apply cosmetics", "To become friends again", "To create something", "To wake up"], correct: 1 },
      { question: "'Look up to' means:", options: ["To search", "To admire", "To climb", "To watch"], correct: 1 },
    ],
    conversationExercises: [
      { question: "'Fall out with' means:", options: ["To trip", "To argue and stop being friends", "To fall down", "To leave"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'I get along ___ my classmates.'", options: ["to", "from", "with", "by"], correct: 2 },
    ],
    examQuestions: [
      { question: "'Grow apart' means:", options: ["To get taller", "To become less close", "To grow plants", "To move house"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Settle down' means:", options: ["To sit down", "To start a stable life", "To calm down", "To go to sleep"], correct: 1 },
    ],
  },
  "phrasal-5": {
    levelId: "phrasal", levelLabel: "Phrasal Verbs", lessonNumber: 5,
    title: "Phrasal Verbs for Travel",
    description: "Master essential phrasal verbs used when traveling.",
    vocabulary: [
      { word: "Check in", meaning: "To register at a hotel or airport", example: "We need to check in by 2 PM.", emoji: "🛎️", arabic: "يسجل الوصول" },
      { word: "Check out", meaning: "To leave a hotel / to look at something", example: "We checked out at noon.", emoji: "🚪", arabic: "يغادر / يتفقد" },
      { word: "Set off", meaning: "To begin a journey", example: "We set off early in the morning.", emoji: "🚗", arabic: "ينطلق" },
      { word: "Get around", meaning: "To travel within a place", example: "How do you get around the city?", emoji: "🗺️", arabic: "يتنقل" },
      { word: "Stop over", meaning: "To stay briefly during a journey", example: "We stopped over in Dubai.", emoji: "✈️", arabic: "يتوقف خلال السفر" },
      { word: "Pick up", meaning: "To collect someone by car", example: "I'll pick you up at the airport.", emoji: "🚙", arabic: "يقلّ" },
      { word: "See off", meaning: "To go to say goodbye", example: "They came to see me off.", emoji: "👋", arabic: "يودّع" },
      { word: "Get back", meaning: "To return", example: "When did you get back from vacation?", emoji: "🔙", arabic: "يعود" },
      { word: "Hold up", meaning: "To delay", example: "Traffic held us up for an hour.", emoji: "⏳", arabic: "يعيق" },
      { word: "Look around", meaning: "To explore a place", example: "Let's look around the old town.", emoji: "👀", arabic: "يتجول" },
    ],
    dialogue: [
      { speaker: "Tourist", text: "We need to set off early tomorrow. What time should we check out?" },
      { speaker: "Friend", text: "By 11 AM. Then we can look around the market before we leave." },
      { speaker: "Tourist", text: "How do we get around the city — by bus or taxi?" },
      { speaker: "Friend", text: "Let's take the metro. It won't hold us up like traffic." },
      { speaker: "Tourist", text: "Great. Can someone pick us up from the station?" },
    ],
    grammar: {
      title: "Phrasal Verbs in Travel Narratives",
      explanation: "When telling travel stories, use phrasal verbs in Past Simple: 'We set off at dawn', 'I checked in at the hotel', 'They saw me off'.",
      examples: [
        { sentence: "We set off at 6 AM and arrived by noon.", note: "Past Simple narrative" },
        { sentence: "I checked in and went straight to bed.", note: "Sequential actions" },
        { sentence: "My family came to see me off at the airport.", note: "Emotional farewell" },
        { sentence: "We stopped over in Istanbul for two days.", note: "Brief stay during journey" },
      ],
    },
    vocabExercises: [
      { question: "'Set off' means:", options: ["To arrive", "To begin a journey", "To return", "To unpack"], correct: 1 },
      { question: "'See off' means:", options: ["To watch TV", "To say goodbye at departure", "To look around", "To return"], correct: 1 },
    ],
    conversationExercises: [
      { question: "'Get around' means:", options: ["To avoid", "To travel within a place", "To get lost", "To fly"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'Traffic ___ us up for an hour.' (past)", options: ["hold", "held", "holds", "holding"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Stop over' means:", options: ["To stop completely", "To stay briefly during a journey", "To cancel a trip", "To miss a flight"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Look around' means:", options: ["To look behind", "To explore a place", "To search for something lost", "To turn around"], correct: 1 },
    ],
  },
};
