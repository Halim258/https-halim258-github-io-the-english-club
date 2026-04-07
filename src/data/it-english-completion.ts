import type { LessonData } from "./lessons";

export const it_englishCompletion: Record<string, LessonData> = {
  "it-english-18": {
    levelId: "it-english", levelLabel: "IT English", lessonNumber: 18,
    title: "Cloud Computing", description: "AWS, Azure, SaaS, and cloud infrastructure",
    vocabulary: [
    { word: "Cloud", meaning: "Remote computing resources", example: "Deploy to the cloud.", emoji: "☁️", arabic: "سحابة" }
    { word: "SaaS", meaning: "Software as a Service", example: "SaaS is subscription-based.", emoji: "💻", arabic: "برنامج كخدمة" }
    { word: "Neural", meaning: "Relating to a network", example: "The neural network learned.", emoji: "🧠", arabic: "عصبي" }
    { word: "Dataset", meaning: "Collection of data", example: "Train on a large dataset.", emoji: "📊", arabic: "مجموعة بيانات" }
    { word: "Sprint", meaning: "Short development cycle", example: "The sprint ends Friday.", emoji: "🏃", arabic: "سباق قصير" }
    { word: "Backlog", meaning: "List of pending tasks", example: "Add it to the backlog.", emoji: "📋", arabic: "قائمة المهام" }
    { word: "Scalable", meaning: "Can grow easily", example: "The system is scalable.", emoji: "📈", arabic: "قابل للتوسع" }
    { word: "Latency", meaning: "Delay in response", example: "Reduce network latency.", emoji: "⏱️", arabic: "تأخير" }
    { word: "Deploy", meaning: "Release to production", example: "Deploy the update tonight.", emoji: "🚀", arabic: "نشر" }
    { word: "API", meaning: "Application interface", example: "Use the API to connect.", emoji: "🔌", arabic: "واجهة برمجية" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore cloud computing." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "AWS, Azure, SaaS, and cloud infrastructure" }
    { speaker: "Student", text: "Can you give me a practical example?" }
    { speaker: "Instructor", text: "Of course! Let's start with the key vocabulary." },
    ],
    grammar: { title: "Relative Clauses", explanation: "Relative clauses add information about nouns using who, which, that, where, whose. Defining clauses are essential (no commas). Non-defining add extra info (with commas).", examples: [
      { sentence: "The man who called is here.", note: "Defining — identifies which man" }
      { sentence: "London, which is the capital, is huge.", note: "Non-defining — extra info, commas" }
      { sentence: "The book that I read was great.", note: "'That' for defining clauses" }
      { sentence: "She's the one whose idea won.", note: "'Whose' shows possession" },
    ]},
    vocabExercises: [
    { question: "What does 'Cloud' mean?", options: ["Remote computing resources", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'SaaS' mean?", options: ["Software as a Service", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Neural' mean?", options: ["Relating to a network", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Dataset' mean?", options: ["Collection of data", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Sprint' mean?", options: ["Short development cycle", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of cloud computing, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in cloud computing?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in cloud computing?", options: ["Cloud", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to cloud computing?", options: ["SaaS", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional cloud computing, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Neural':", options: ["The neural network learned.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Dataset'?", options: ["Collection of data", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Sprint' correctly:", options: ["The sprint ends Friday.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "it-english-19": {
    levelId: "it-english", levelLabel: "IT English", lessonNumber: 19,
    title: "Machine Learning & AI", description: "Neural networks, training, and AI terminology",
    vocabulary: [
    { word: "SaaS", meaning: "Software as a Service", example: "SaaS is subscription-based.", emoji: "💻", arabic: "برنامج كخدمة" }
    { word: "Neural", meaning: "Relating to a network", example: "The neural network learned.", emoji: "🧠", arabic: "عصبي" }
    { word: "Dataset", meaning: "Collection of data", example: "Train on a large dataset.", emoji: "📊", arabic: "مجموعة بيانات" }
    { word: "Sprint", meaning: "Short development cycle", example: "The sprint ends Friday.", emoji: "🏃", arabic: "سباق قصير" }
    { word: "Backlog", meaning: "List of pending tasks", example: "Add it to the backlog.", emoji: "📋", arabic: "قائمة المهام" }
    { word: "Scalable", meaning: "Can grow easily", example: "The system is scalable.", emoji: "📈", arabic: "قابل للتوسع" }
    { word: "Latency", meaning: "Delay in response", example: "Reduce network latency.", emoji: "⏱️", arabic: "تأخير" }
    { word: "Deploy", meaning: "Release to production", example: "Deploy the update tonight.", emoji: "🚀", arabic: "نشر" }
    { word: "API", meaning: "Application interface", example: "Use the API to connect.", emoji: "🔌", arabic: "واجهة برمجية" }
    { word: "Cloud", meaning: "Remote computing resources", example: "Deploy to the cloud.", emoji: "☁️", arabic: "سحابة" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore machine learning & ai." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Neural networks, training, and AI terminology" }
    { speaker: "Student", text: "Can you give me a practical example?" }
    { speaker: "Instructor", text: "Of course! Let's start with the key vocabulary." },
    ],
    grammar: { title: "Modal Verbs for Speculation", explanation: "We use modal verbs to speculate about present and past: must (90% sure), might/may (50%), can't (impossible). For past: must have, might have, can't have + past participle.", examples: [
      { sentence: "She must be at home.", note: "Present — very likely" }
      { sentence: "He might have left already.", note: "Past — possible" }
      { sentence: "They can't be serious.", note: "Present — impossible" }
      { sentence: "It could have been worse.", note: "Past — possibility" },
    ]},
    vocabExercises: [
    { question: "What does 'SaaS' mean?", options: ["Software as a Service", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Neural' mean?", options: ["Relating to a network", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Dataset' mean?", options: ["Collection of data", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Sprint' mean?", options: ["Short development cycle", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Backlog' mean?", options: ["List of pending tasks", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of machine learning & ai, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in machine learning & ai?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in machine learning & ai?", options: ["SaaS", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to machine learning & ai?", options: ["Neural", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional machine learning & ai, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Dataset':", options: ["Train on a large dataset.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Sprint'?", options: ["Short development cycle", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Backlog' correctly:", options: ["Add it to the backlog.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "it-english-20": {
    levelId: "it-english", levelLabel: "IT English", lessonNumber: 20,
    title: "IT Project Management", description: "Sprints, backlogs, and agile ceremonies",
    vocabulary: [
    { word: "Neural", meaning: "Relating to a network", example: "The neural network learned.", emoji: "🧠", arabic: "عصبي" }
    { word: "Dataset", meaning: "Collection of data", example: "Train on a large dataset.", emoji: "📊", arabic: "مجموعة بيانات" }
    { word: "Sprint", meaning: "Short development cycle", example: "The sprint ends Friday.", emoji: "🏃", arabic: "سباق قصير" }
    { word: "Backlog", meaning: "List of pending tasks", example: "Add it to the backlog.", emoji: "📋", arabic: "قائمة المهام" }
    { word: "Scalable", meaning: "Can grow easily", example: "The system is scalable.", emoji: "📈", arabic: "قابل للتوسع" }
    { word: "Latency", meaning: "Delay in response", example: "Reduce network latency.", emoji: "⏱️", arabic: "تأخير" }
    { word: "Deploy", meaning: "Release to production", example: "Deploy the update tonight.", emoji: "🚀", arabic: "نشر" }
    { word: "API", meaning: "Application interface", example: "Use the API to connect.", emoji: "🔌", arabic: "واجهة برمجية" }
    { word: "Cloud", meaning: "Remote computing resources", example: "Deploy to the cloud.", emoji: "☁️", arabic: "سحابة" }
    { word: "SaaS", meaning: "Software as a Service", example: "SaaS is subscription-based.", emoji: "💻", arabic: "برنامج كخدمة" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore it project management." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Sprints, backlogs, and agile ceremonies" }
    { speaker: "Student", text: "Can you give me a practical example?" }
    { speaker: "Instructor", text: "Of course! Let's start with the key vocabulary." },
    ],
    grammar: { title: "Causative Structures", explanation: "The causative is used when someone arranges for another person to do something. Have/get + object + past participle. 'Have' is more formal than 'get'.", examples: [
      { sentence: "I had my car repaired.", note: "Someone repaired it for me" }
      { sentence: "She got her hair done.", note: "Someone did her hair" }
      { sentence: "We'll have the report written.", note: "Formal — arrange for someone" }
      { sentence: "Get it checked by a doctor.", note: "Informal — recommendation" },
    ]},
    vocabExercises: [
    { question: "What does 'Neural' mean?", options: ["Relating to a network", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Dataset' mean?", options: ["Collection of data", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Sprint' mean?", options: ["Short development cycle", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Backlog' mean?", options: ["List of pending tasks", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Scalable' mean?", options: ["Can grow easily", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of it project management, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in it project management?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in it project management?", options: ["Neural", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to it project management?", options: ["Dataset", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional it project management, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Sprint':", options: ["The sprint ends Friday.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Backlog'?", options: ["List of pending tasks", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Scalable' correctly:", options: ["The system is scalable.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
};
