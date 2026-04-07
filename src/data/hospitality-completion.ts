import type { LessonData } from "./lessons";

export const hospitalityCompletion: Record<string, LessonData> = {
  "hospitality-2": {
    levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: 2,
    title: "Restaurant Service", description: "Taking orders, menu vocabulary, and table etiquette",
    vocabulary: [
    { word: "Buffet", meaning: "A self-service meal", example: "The breakfast buffet opens at 7 AM.", emoji: "🍽️", arabic: "بوفيه" }
    { word: "Gratuity", meaning: "A tip for service", example: "A 15% gratuity is customary.", emoji: "💵", arabic: "إكرامية" }
    { word: "Sommelier", meaning: "A wine expert", example: "The sommelier recommended a Merlot.", emoji: "🍷", arabic: "خبير النبيذ" }
    { word: "Valet", meaning: "Parking attendant", example: "Give your keys to the valet.", emoji: "🚗", arabic: "خادم" }
    { word: "Cuisine", meaning: "Style of cooking", example: "French cuisine is world-famous.", emoji: "👨‍🍳", arabic: "مطبخ" }
    { word: "Turndown", meaning: "Evening room preparation", example: "Turndown service includes chocolates.", emoji: "🛏️", arabic: "تجهيز الغرفة" }
    { word: "Banquet", meaning: "A formal dinner", example: "The banquet hall seats 200.", emoji: "🏛️", arabic: "مأدبة" }
    { word: "Occupancy", meaning: "Room availability rate", example: "Hotel occupancy is at 85%.", emoji: "📊", arabic: "معدل الإشغال" }
    { word: "Minibar", meaning: "Small in-room fridge", example: "The minibar has snacks and drinks.", emoji: "🧊", arabic: "ثلاجة صغيرة" }
    { word: "Bellhop", meaning: "Porter who carries bags", example: "The bellhop took our luggage.", emoji: "🧳", arabic: "حامل الأمتعة" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore restaurant service." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Taking orders, menu vocabulary, and table etiquette" }
    { speaker: "Student", text: "Can you give me a practical example?" }
    { speaker: "Instructor", text: "Of course! Let's start with the key vocabulary." },
    ],
    grammar: { title: "Reported Speech", explanation: "When reporting what someone said, we shift tenses back: present→past, past→past perfect, will→would. Pronouns and time expressions also change.", examples: [
      { sentence: "He said he was busy.", note: "Direct: 'I am busy' → Reported: past tense" }
      { sentence: "She told me she had finished.", note: "Direct: 'I finished' → past perfect" }
      { sentence: "They said they would come.", note: "Direct: 'We will come' → would" }
      { sentence: "He asked if I liked it.", note: "Direct: 'Do you like it?' → if clause" },
    ]},
    vocabExercises: [
    { question: "What does 'Buffet' mean?", options: ["A self-service meal", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Gratuity' mean?", options: ["A tip for service", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Sommelier' mean?", options: ["A wine expert", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Valet' mean?", options: ["Parking attendant", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Cuisine' mean?", options: ["Style of cooking", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of restaurant service, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in restaurant service?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in restaurant service?", options: ["Buffet", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to restaurant service?", options: ["Gratuity", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional restaurant service, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Sommelier':", options: ["The sommelier recommended a Merlot.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Valet'?", options: ["Parking attendant", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Cuisine' correctly:", options: ["French cuisine is world-famous.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "hospitality-3": {
    levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: 3,
    title: "Room Service", description: "Handling room service requests and food delivery",
    vocabulary: [
    { word: "Gratuity", meaning: "A tip for service", example: "A 15% gratuity is customary.", emoji: "💵", arabic: "إكرامية" }
    { word: "Sommelier", meaning: "A wine expert", example: "The sommelier recommended a Merlot.", emoji: "🍷", arabic: "خبير النبيذ" }
    { word: "Valet", meaning: "Parking attendant", example: "Give your keys to the valet.", emoji: "🚗", arabic: "خادم" }
    { word: "Cuisine", meaning: "Style of cooking", example: "French cuisine is world-famous.", emoji: "👨‍🍳", arabic: "مطبخ" }
    { word: "Turndown", meaning: "Evening room preparation", example: "Turndown service includes chocolates.", emoji: "🛏️", arabic: "تجهيز الغرفة" }
    { word: "Banquet", meaning: "A formal dinner", example: "The banquet hall seats 200.", emoji: "🏛️", arabic: "مأدبة" }
    { word: "Occupancy", meaning: "Room availability rate", example: "Hotel occupancy is at 85%.", emoji: "📊", arabic: "معدل الإشغال" }
    { word: "Minibar", meaning: "Small in-room fridge", example: "The minibar has snacks and drinks.", emoji: "🧊", arabic: "ثلاجة صغيرة" }
    { word: "Bellhop", meaning: "Porter who carries bags", example: "The bellhop took our luggage.", emoji: "🧳", arabic: "حامل الأمتعة" }
    { word: "Buffet", meaning: "A self-service meal", example: "The breakfast buffet opens at 7 AM.", emoji: "🍽️", arabic: "بوفيه" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore room service." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Handling room service requests and food delivery" }
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
    { question: "What does 'Gratuity' mean?", options: ["A tip for service", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Sommelier' mean?", options: ["A wine expert", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Valet' mean?", options: ["Parking attendant", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Cuisine' mean?", options: ["Style of cooking", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Turndown' mean?", options: ["Evening room preparation", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of room service, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in room service?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in room service?", options: ["Gratuity", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to room service?", options: ["Sommelier", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional room service, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Valet':", options: ["Give your keys to the valet.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Cuisine'?", options: ["Style of cooking", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Turndown' correctly:", options: ["Turndown service includes chocolates.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "hospitality-4": {
    levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: 4,
    title: "Guest Complaints", description: "Dealing with guest complaints professionally",
    vocabulary: [
    { word: "Sommelier", meaning: "A wine expert", example: "The sommelier recommended a Merlot.", emoji: "🍷", arabic: "خبير النبيذ" }
    { word: "Valet", meaning: "Parking attendant", example: "Give your keys to the valet.", emoji: "🚗", arabic: "خادم" }
    { word: "Cuisine", meaning: "Style of cooking", example: "French cuisine is world-famous.", emoji: "👨‍🍳", arabic: "مطبخ" }
    { word: "Turndown", meaning: "Evening room preparation", example: "Turndown service includes chocolates.", emoji: "🛏️", arabic: "تجهيز الغرفة" }
    { word: "Banquet", meaning: "A formal dinner", example: "The banquet hall seats 200.", emoji: "🏛️", arabic: "مأدبة" }
    { word: "Occupancy", meaning: "Room availability rate", example: "Hotel occupancy is at 85%.", emoji: "📊", arabic: "معدل الإشغال" }
    { word: "Minibar", meaning: "Small in-room fridge", example: "The minibar has snacks and drinks.", emoji: "🧊", arabic: "ثلاجة صغيرة" }
    { word: "Bellhop", meaning: "Porter who carries bags", example: "The bellhop took our luggage.", emoji: "🧳", arabic: "حامل الأمتعة" }
    { word: "Buffet", meaning: "A self-service meal", example: "The breakfast buffet opens at 7 AM.", emoji: "🍽️", arabic: "بوفيه" }
    { word: "Gratuity", meaning: "A tip for service", example: "A 15% gratuity is customary.", emoji: "💵", arabic: "إكرامية" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore guest complaints." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Dealing with guest complaints professionally" }
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
    { question: "What does 'Sommelier' mean?", options: ["A wine expert", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Valet' mean?", options: ["Parking attendant", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Cuisine' mean?", options: ["Style of cooking", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Turndown' mean?", options: ["Evening room preparation", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Banquet' mean?", options: ["A formal dinner", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of guest complaints, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in guest complaints?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in guest complaints?", options: ["Sommelier", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to guest complaints?", options: ["Valet", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional guest complaints, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Cuisine':", options: ["French cuisine is world-famous.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Turndown'?", options: ["Evening room preparation", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Banquet' correctly:", options: ["The banquet hall seats 200.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "hospitality-5": {
    levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: 5,
    title: "Hotel Facilities", description: "Gym, pool, spa, and business center vocabulary",
    vocabulary: [
    { word: "Valet", meaning: "Parking attendant", example: "Give your keys to the valet.", emoji: "🚗", arabic: "خادم" }
    { word: "Cuisine", meaning: "Style of cooking", example: "French cuisine is world-famous.", emoji: "👨‍🍳", arabic: "مطبخ" }
    { word: "Turndown", meaning: "Evening room preparation", example: "Turndown service includes chocolates.", emoji: "🛏️", arabic: "تجهيز الغرفة" }
    { word: "Banquet", meaning: "A formal dinner", example: "The banquet hall seats 200.", emoji: "🏛️", arabic: "مأدبة" }
    { word: "Occupancy", meaning: "Room availability rate", example: "Hotel occupancy is at 85%.", emoji: "📊", arabic: "معدل الإشغال" }
    { word: "Minibar", meaning: "Small in-room fridge", example: "The minibar has snacks and drinks.", emoji: "🧊", arabic: "ثلاجة صغيرة" }
    { word: "Bellhop", meaning: "Porter who carries bags", example: "The bellhop took our luggage.", emoji: "🧳", arabic: "حامل الأمتعة" }
    { word: "Buffet", meaning: "A self-service meal", example: "The breakfast buffet opens at 7 AM.", emoji: "🍽️", arabic: "بوفيه" }
    { word: "Gratuity", meaning: "A tip for service", example: "A 15% gratuity is customary.", emoji: "💵", arabic: "إكرامية" }
    { word: "Sommelier", meaning: "A wine expert", example: "The sommelier recommended a Merlot.", emoji: "🍷", arabic: "خبير النبيذ" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore hotel facilities." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Gym, pool, spa, and business center vocabulary" }
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
    { question: "What does 'Valet' mean?", options: ["Parking attendant", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Cuisine' mean?", options: ["Style of cooking", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Turndown' mean?", options: ["Evening room preparation", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Banquet' mean?", options: ["A formal dinner", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Occupancy' mean?", options: ["Room availability rate", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of hotel facilities, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in hotel facilities?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in hotel facilities?", options: ["Valet", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to hotel facilities?", options: ["Cuisine", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional hotel facilities, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Turndown':", options: ["Turndown service includes chocolates.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Banquet'?", options: ["A formal dinner", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Occupancy' correctly:", options: ["Hotel occupancy is at 85%.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "hospitality-6": {
    levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: 6,
    title: "Tourism Vocabulary", description: "Tour guides, attractions, and sightseeing language",
    vocabulary: [
    { word: "Cuisine", meaning: "Style of cooking", example: "French cuisine is world-famous.", emoji: "👨‍🍳", arabic: "مطبخ" }
    { word: "Turndown", meaning: "Evening room preparation", example: "Turndown service includes chocolates.", emoji: "🛏️", arabic: "تجهيز الغرفة" }
    { word: "Banquet", meaning: "A formal dinner", example: "The banquet hall seats 200.", emoji: "🏛️", arabic: "مأدبة" }
    { word: "Occupancy", meaning: "Room availability rate", example: "Hotel occupancy is at 85%.", emoji: "📊", arabic: "معدل الإشغال" }
    { word: "Minibar", meaning: "Small in-room fridge", example: "The minibar has snacks and drinks.", emoji: "🧊", arabic: "ثلاجة صغيرة" }
    { word: "Bellhop", meaning: "Porter who carries bags", example: "The bellhop took our luggage.", emoji: "🧳", arabic: "حامل الأمتعة" }
    { word: "Buffet", meaning: "A self-service meal", example: "The breakfast buffet opens at 7 AM.", emoji: "🍽️", arabic: "بوفيه" }
    { word: "Gratuity", meaning: "A tip for service", example: "A 15% gratuity is customary.", emoji: "💵", arabic: "إكرامية" }
    { word: "Sommelier", meaning: "A wine expert", example: "The sommelier recommended a Merlot.", emoji: "🍷", arabic: "خبير النبيذ" }
    { word: "Valet", meaning: "Parking attendant", example: "Give your keys to the valet.", emoji: "🚗", arabic: "خادم" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore tourism vocabulary." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Tour guides, attractions, and sightseeing language" }
    { speaker: "Student", text: "Can you give me a practical example?" }
    { speaker: "Instructor", text: "Of course! Let's start with the key vocabulary." },
    ],
    grammar: { title: "Conditional Sentences", explanation: "Conditionals express hypothetical situations. Type 0: general truths (If+present, present). Type 1: real future (If+present, will+verb). Type 2: unreal present (If+past, would+verb). Type 3: unreal past (If+had+PP, would have+PP).", examples: [
      { sentence: "If you heat water, it boils.", note: "Type 0 — general truth" }
      { sentence: "If it rains, we will cancel.", note: "Type 1 — real possibility" }
      { sentence: "If I had time, I would help.", note: "Type 2 — hypothetical" }
      { sentence: "If she had studied, she would have passed.", note: "Type 3 — regret" },
    ]},
    vocabExercises: [
    { question: "What does 'Cuisine' mean?", options: ["Style of cooking", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Turndown' mean?", options: ["Evening room preparation", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Banquet' mean?", options: ["A formal dinner", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Occupancy' mean?", options: ["Room availability rate", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Minibar' mean?", options: ["Small in-room fridge", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of tourism vocabulary, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in tourism vocabulary?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in tourism vocabulary?", options: ["Cuisine", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to tourism vocabulary?", options: ["Turndown", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional tourism vocabulary, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Banquet':", options: ["The banquet hall seats 200.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Occupancy'?", options: ["Room availability rate", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Minibar' correctly:", options: ["The minibar has snacks and drinks.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "hospitality-7": {
    levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: 7,
    title: "Airport & Transportation", description: "Airport transfers, taxi, and shuttle coordination",
    vocabulary: [
    { word: "Turndown", meaning: "Evening room preparation", example: "Turndown service includes chocolates.", emoji: "🛏️", arabic: "تجهيز الغرفة" }
    { word: "Banquet", meaning: "A formal dinner", example: "The banquet hall seats 200.", emoji: "🏛️", arabic: "مأدبة" }
    { word: "Occupancy", meaning: "Room availability rate", example: "Hotel occupancy is at 85%.", emoji: "📊", arabic: "معدل الإشغال" }
    { word: "Minibar", meaning: "Small in-room fridge", example: "The minibar has snacks and drinks.", emoji: "🧊", arabic: "ثلاجة صغيرة" }
    { word: "Bellhop", meaning: "Porter who carries bags", example: "The bellhop took our luggage.", emoji: "🧳", arabic: "حامل الأمتعة" }
    { word: "Buffet", meaning: "A self-service meal", example: "The breakfast buffet opens at 7 AM.", emoji: "🍽️", arabic: "بوفيه" }
    { word: "Gratuity", meaning: "A tip for service", example: "A 15% gratuity is customary.", emoji: "💵", arabic: "إكرامية" }
    { word: "Sommelier", meaning: "A wine expert", example: "The sommelier recommended a Merlot.", emoji: "🍷", arabic: "خبير النبيذ" }
    { word: "Valet", meaning: "Parking attendant", example: "Give your keys to the valet.", emoji: "🚗", arabic: "خادم" }
    { word: "Cuisine", meaning: "Style of cooking", example: "French cuisine is world-famous.", emoji: "👨‍🍳", arabic: "مطبخ" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore airport & transportation." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Airport transfers, taxi, and shuttle coordination" }
    { speaker: "Student", text: "Can you give me a practical example?" }
    { speaker: "Instructor", text: "Of course! Let's start with the key vocabulary." },
    ],
    grammar: { title: "Reported Speech", explanation: "When reporting what someone said, we shift tenses back: present→past, past→past perfect, will→would. Pronouns and time expressions also change.", examples: [
      { sentence: "He said he was busy.", note: "Direct: 'I am busy' → Reported: past tense" }
      { sentence: "She told me she had finished.", note: "Direct: 'I finished' → past perfect" }
      { sentence: "They said they would come.", note: "Direct: 'We will come' → would" }
      { sentence: "He asked if I liked it.", note: "Direct: 'Do you like it?' → if clause" },
    ]},
    vocabExercises: [
    { question: "What does 'Turndown' mean?", options: ["Evening room preparation", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Banquet' mean?", options: ["A formal dinner", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Occupancy' mean?", options: ["Room availability rate", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Minibar' mean?", options: ["Small in-room fridge", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Bellhop' mean?", options: ["Porter who carries bags", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of airport & transportation, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in airport & transportation?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in airport & transportation?", options: ["Turndown", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to airport & transportation?", options: ["Banquet", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional airport & transportation, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Occupancy':", options: ["Hotel occupancy is at 85%.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Minibar'?", options: ["Small in-room fridge", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Bellhop' correctly:", options: ["The bellhop took our luggage.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "hospitality-8": {
    levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: 8,
    title: "Event Planning", description: "Conference rooms, weddings, and banquet vocabulary",
    vocabulary: [
    { word: "Banquet", meaning: "A formal dinner", example: "The banquet hall seats 200.", emoji: "🏛️", arabic: "مأدبة" }
    { word: "Occupancy", meaning: "Room availability rate", example: "Hotel occupancy is at 85%.", emoji: "📊", arabic: "معدل الإشغال" }
    { word: "Minibar", meaning: "Small in-room fridge", example: "The minibar has snacks and drinks.", emoji: "🧊", arabic: "ثلاجة صغيرة" }
    { word: "Bellhop", meaning: "Porter who carries bags", example: "The bellhop took our luggage.", emoji: "🧳", arabic: "حامل الأمتعة" }
    { word: "Buffet", meaning: "A self-service meal", example: "The breakfast buffet opens at 7 AM.", emoji: "🍽️", arabic: "بوفيه" }
    { word: "Gratuity", meaning: "A tip for service", example: "A 15% gratuity is customary.", emoji: "💵", arabic: "إكرامية" }
    { word: "Sommelier", meaning: "A wine expert", example: "The sommelier recommended a Merlot.", emoji: "🍷", arabic: "خبير النبيذ" }
    { word: "Valet", meaning: "Parking attendant", example: "Give your keys to the valet.", emoji: "🚗", arabic: "خادم" }
    { word: "Cuisine", meaning: "Style of cooking", example: "French cuisine is world-famous.", emoji: "👨‍🍳", arabic: "مطبخ" }
    { word: "Turndown", meaning: "Evening room preparation", example: "Turndown service includes chocolates.", emoji: "🛏️", arabic: "تجهيز الغرفة" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore event planning." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Conference rooms, weddings, and banquet vocabulary" }
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
    { question: "What does 'Banquet' mean?", options: ["A formal dinner", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Occupancy' mean?", options: ["Room availability rate", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Minibar' mean?", options: ["Small in-room fridge", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Bellhop' mean?", options: ["Porter who carries bags", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Buffet' mean?", options: ["A self-service meal", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of event planning, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in event planning?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in event planning?", options: ["Banquet", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to event planning?", options: ["Occupancy", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional event planning, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Minibar':", options: ["The minibar has snacks and drinks.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Bellhop'?", options: ["Porter who carries bags", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Buffet' correctly:", options: ["The breakfast buffet opens at 7 AM.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "hospitality-9": {
    levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: 9,
    title: "Food & Beverage Management", description: "Kitchen terms, menu planning, and dietary needs",
    vocabulary: [
    { word: "Occupancy", meaning: "Room availability rate", example: "Hotel occupancy is at 85%.", emoji: "📊", arabic: "معدل الإشغال" }
    { word: "Minibar", meaning: "Small in-room fridge", example: "The minibar has snacks and drinks.", emoji: "🧊", arabic: "ثلاجة صغيرة" }
    { word: "Bellhop", meaning: "Porter who carries bags", example: "The bellhop took our luggage.", emoji: "🧳", arabic: "حامل الأمتعة" }
    { word: "Buffet", meaning: "A self-service meal", example: "The breakfast buffet opens at 7 AM.", emoji: "🍽️", arabic: "بوفيه" }
    { word: "Gratuity", meaning: "A tip for service", example: "A 15% gratuity is customary.", emoji: "💵", arabic: "إكرامية" }
    { word: "Sommelier", meaning: "A wine expert", example: "The sommelier recommended a Merlot.", emoji: "🍷", arabic: "خبير النبيذ" }
    { word: "Valet", meaning: "Parking attendant", example: "Give your keys to the valet.", emoji: "🚗", arabic: "خادم" }
    { word: "Cuisine", meaning: "Style of cooking", example: "French cuisine is world-famous.", emoji: "👨‍🍳", arabic: "مطبخ" }
    { word: "Turndown", meaning: "Evening room preparation", example: "Turndown service includes chocolates.", emoji: "🛏️", arabic: "تجهيز الغرفة" }
    { word: "Banquet", meaning: "A formal dinner", example: "The banquet hall seats 200.", emoji: "🏛️", arabic: "مأدبة" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore food & beverage management." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Kitchen terms, menu planning, and dietary needs" }
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
    { question: "What does 'Occupancy' mean?", options: ["Room availability rate", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Minibar' mean?", options: ["Small in-room fridge", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Bellhop' mean?", options: ["Porter who carries bags", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Buffet' mean?", options: ["A self-service meal", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Gratuity' mean?", options: ["A tip for service", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of food & beverage management, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in food & beverage management?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in food & beverage management?", options: ["Occupancy", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to food & beverage management?", options: ["Minibar", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional food & beverage management, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Bellhop':", options: ["The bellhop took our luggage.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Buffet'?", options: ["A self-service meal", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Gratuity' correctly:", options: ["A 15% gratuity is customary.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "hospitality-10": {
    levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: 10,
    title: "Housekeeping Operations", description: "Cleaning schedules, supplies, and room inspection",
    vocabulary: [
    { word: "Minibar", meaning: "Small in-room fridge", example: "The minibar has snacks and drinks.", emoji: "🧊", arabic: "ثلاجة صغيرة" }
    { word: "Bellhop", meaning: "Porter who carries bags", example: "The bellhop took our luggage.", emoji: "🧳", arabic: "حامل الأمتعة" }
    { word: "Buffet", meaning: "A self-service meal", example: "The breakfast buffet opens at 7 AM.", emoji: "🍽️", arabic: "بوفيه" }
    { word: "Gratuity", meaning: "A tip for service", example: "A 15% gratuity is customary.", emoji: "💵", arabic: "إكرامية" }
    { word: "Sommelier", meaning: "A wine expert", example: "The sommelier recommended a Merlot.", emoji: "🍷", arabic: "خبير النبيذ" }
    { word: "Valet", meaning: "Parking attendant", example: "Give your keys to the valet.", emoji: "🚗", arabic: "خادم" }
    { word: "Cuisine", meaning: "Style of cooking", example: "French cuisine is world-famous.", emoji: "👨‍🍳", arabic: "مطبخ" }
    { word: "Turndown", meaning: "Evening room preparation", example: "Turndown service includes chocolates.", emoji: "🛏️", arabic: "تجهيز الغرفة" }
    { word: "Banquet", meaning: "A formal dinner", example: "The banquet hall seats 200.", emoji: "🏛️", arabic: "مأدبة" }
    { word: "Occupancy", meaning: "Room availability rate", example: "Hotel occupancy is at 85%.", emoji: "📊", arabic: "معدل الإشغال" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore housekeeping operations." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Cleaning schedules, supplies, and room inspection" }
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
    { question: "What does 'Minibar' mean?", options: ["Small in-room fridge", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Bellhop' mean?", options: ["Porter who carries bags", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Buffet' mean?", options: ["A self-service meal", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Gratuity' mean?", options: ["A tip for service", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Sommelier' mean?", options: ["A wine expert", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of housekeeping operations, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in housekeeping operations?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in housekeeping operations?", options: ["Minibar", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to housekeeping operations?", options: ["Bellhop", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional housekeeping operations, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Buffet':", options: ["The breakfast buffet opens at 7 AM.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Gratuity'?", options: ["A tip for service", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Sommelier' correctly:", options: ["The sommelier recommended a Merlot.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "hospitality-11": {
    levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: 11,
    title: "Front Desk Communication", description: "Phone calls, messages, and guest inquiries",
    vocabulary: [
    { word: "Bellhop", meaning: "Porter who carries bags", example: "The bellhop took our luggage.", emoji: "🧳", arabic: "حامل الأمتعة" }
    { word: "Buffet", meaning: "A self-service meal", example: "The breakfast buffet opens at 7 AM.", emoji: "🍽️", arabic: "بوفيه" }
    { word: "Gratuity", meaning: "A tip for service", example: "A 15% gratuity is customary.", emoji: "💵", arabic: "إكرامية" }
    { word: "Sommelier", meaning: "A wine expert", example: "The sommelier recommended a Merlot.", emoji: "🍷", arabic: "خبير النبيذ" }
    { word: "Valet", meaning: "Parking attendant", example: "Give your keys to the valet.", emoji: "🚗", arabic: "خادم" }
    { word: "Cuisine", meaning: "Style of cooking", example: "French cuisine is world-famous.", emoji: "👨‍🍳", arabic: "مطبخ" }
    { word: "Turndown", meaning: "Evening room preparation", example: "Turndown service includes chocolates.", emoji: "🛏️", arabic: "تجهيز الغرفة" }
    { word: "Banquet", meaning: "A formal dinner", example: "The banquet hall seats 200.", emoji: "🏛️", arabic: "مأدبة" }
    { word: "Occupancy", meaning: "Room availability rate", example: "Hotel occupancy is at 85%.", emoji: "📊", arabic: "معدل الإشغال" }
    { word: "Minibar", meaning: "Small in-room fridge", example: "The minibar has snacks and drinks.", emoji: "🧊", arabic: "ثلاجة صغيرة" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore front desk communication." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Phone calls, messages, and guest inquiries" }
    { speaker: "Student", text: "Can you give me a practical example?" }
    { speaker: "Instructor", text: "Of course! Let's start with the key vocabulary." },
    ],
    grammar: { title: "Conditional Sentences", explanation: "Conditionals express hypothetical situations. Type 0: general truths (If+present, present). Type 1: real future (If+present, will+verb). Type 2: unreal present (If+past, would+verb). Type 3: unreal past (If+had+PP, would have+PP).", examples: [
      { sentence: "If you heat water, it boils.", note: "Type 0 — general truth" }
      { sentence: "If it rains, we will cancel.", note: "Type 1 — real possibility" }
      { sentence: "If I had time, I would help.", note: "Type 2 — hypothetical" }
      { sentence: "If she had studied, she would have passed.", note: "Type 3 — regret" },
    ]},
    vocabExercises: [
    { question: "What does 'Bellhop' mean?", options: ["Porter who carries bags", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Buffet' mean?", options: ["A self-service meal", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Gratuity' mean?", options: ["A tip for service", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Sommelier' mean?", options: ["A wine expert", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Valet' mean?", options: ["Parking attendant", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of front desk communication, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in front desk communication?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in front desk communication?", options: ["Bellhop", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to front desk communication?", options: ["Buffet", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional front desk communication, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Gratuity':", options: ["A 15% gratuity is customary.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Sommelier'?", options: ["A wine expert", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Valet' correctly:", options: ["Give your keys to the valet.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "hospitality-12": {
    levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: 12,
    title: "Billing & Payments", description: "Invoicing, credit cards, and checkout procedures",
    vocabulary: [
    { word: "Buffet", meaning: "A self-service meal", example: "The breakfast buffet opens at 7 AM.", emoji: "🍽️", arabic: "بوفيه" }
    { word: "Gratuity", meaning: "A tip for service", example: "A 15% gratuity is customary.", emoji: "💵", arabic: "إكرامية" }
    { word: "Sommelier", meaning: "A wine expert", example: "The sommelier recommended a Merlot.", emoji: "🍷", arabic: "خبير النبيذ" }
    { word: "Valet", meaning: "Parking attendant", example: "Give your keys to the valet.", emoji: "🚗", arabic: "خادم" }
    { word: "Cuisine", meaning: "Style of cooking", example: "French cuisine is world-famous.", emoji: "👨‍🍳", arabic: "مطبخ" }
    { word: "Turndown", meaning: "Evening room preparation", example: "Turndown service includes chocolates.", emoji: "🛏️", arabic: "تجهيز الغرفة" }
    { word: "Banquet", meaning: "A formal dinner", example: "The banquet hall seats 200.", emoji: "🏛️", arabic: "مأدبة" }
    { word: "Occupancy", meaning: "Room availability rate", example: "Hotel occupancy is at 85%.", emoji: "📊", arabic: "معدل الإشغال" }
    { word: "Minibar", meaning: "Small in-room fridge", example: "The minibar has snacks and drinks.", emoji: "🧊", arabic: "ثلاجة صغيرة" }
    { word: "Bellhop", meaning: "Porter who carries bags", example: "The bellhop took our luggage.", emoji: "🧳", arabic: "حامل الأمتعة" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore billing & payments." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Invoicing, credit cards, and checkout procedures" }
    { speaker: "Student", text: "Can you give me a practical example?" }
    { speaker: "Instructor", text: "Of course! Let's start with the key vocabulary." },
    ],
    grammar: { title: "Reported Speech", explanation: "When reporting what someone said, we shift tenses back: present→past, past→past perfect, will→would. Pronouns and time expressions also change.", examples: [
      { sentence: "He said he was busy.", note: "Direct: 'I am busy' → Reported: past tense" }
      { sentence: "She told me she had finished.", note: "Direct: 'I finished' → past perfect" }
      { sentence: "They said they would come.", note: "Direct: 'We will come' → would" }
      { sentence: "He asked if I liked it.", note: "Direct: 'Do you like it?' → if clause" },
    ]},
    vocabExercises: [
    { question: "What does 'Buffet' mean?", options: ["A self-service meal", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Gratuity' mean?", options: ["A tip for service", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Sommelier' mean?", options: ["A wine expert", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Valet' mean?", options: ["Parking attendant", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Cuisine' mean?", options: ["Style of cooking", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of billing & payments, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in billing & payments?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in billing & payments?", options: ["Buffet", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to billing & payments?", options: ["Gratuity", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional billing & payments, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Sommelier':", options: ["The sommelier recommended a Merlot.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Valet'?", options: ["Parking attendant", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Cuisine' correctly:", options: ["French cuisine is world-famous.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "hospitality-13": {
    levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: 13,
    title: "Safety & Emergency", description: "Fire evacuation, first aid, and emergency protocols",
    vocabulary: [
    { word: "Gratuity", meaning: "A tip for service", example: "A 15% gratuity is customary.", emoji: "💵", arabic: "إكرامية" }
    { word: "Sommelier", meaning: "A wine expert", example: "The sommelier recommended a Merlot.", emoji: "🍷", arabic: "خبير النبيذ" }
    { word: "Valet", meaning: "Parking attendant", example: "Give your keys to the valet.", emoji: "🚗", arabic: "خادم" }
    { word: "Cuisine", meaning: "Style of cooking", example: "French cuisine is world-famous.", emoji: "👨‍🍳", arabic: "مطبخ" }
    { word: "Turndown", meaning: "Evening room preparation", example: "Turndown service includes chocolates.", emoji: "🛏️", arabic: "تجهيز الغرفة" }
    { word: "Banquet", meaning: "A formal dinner", example: "The banquet hall seats 200.", emoji: "🏛️", arabic: "مأدبة" }
    { word: "Occupancy", meaning: "Room availability rate", example: "Hotel occupancy is at 85%.", emoji: "📊", arabic: "معدل الإشغال" }
    { word: "Minibar", meaning: "Small in-room fridge", example: "The minibar has snacks and drinks.", emoji: "🧊", arabic: "ثلاجة صغيرة" }
    { word: "Bellhop", meaning: "Porter who carries bags", example: "The bellhop took our luggage.", emoji: "🧳", arabic: "حامل الأمتعة" }
    { word: "Buffet", meaning: "A self-service meal", example: "The breakfast buffet opens at 7 AM.", emoji: "🍽️", arabic: "بوفيه" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore safety & emergency." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Fire evacuation, first aid, and emergency protocols" }
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
    { question: "What does 'Gratuity' mean?", options: ["A tip for service", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Sommelier' mean?", options: ["A wine expert", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Valet' mean?", options: ["Parking attendant", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Cuisine' mean?", options: ["Style of cooking", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Turndown' mean?", options: ["Evening room preparation", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of safety & emergency, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in safety & emergency?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in safety & emergency?", options: ["Gratuity", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to safety & emergency?", options: ["Sommelier", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional safety & emergency, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Valet':", options: ["Give your keys to the valet.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Cuisine'?", options: ["Style of cooking", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Turndown' correctly:", options: ["Turndown service includes chocolates.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "hospitality-14": {
    levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: 14,
    title: "Cultural Sensitivity", description: "Serving international guests with cultural awareness",
    vocabulary: [
    { word: "Sommelier", meaning: "A wine expert", example: "The sommelier recommended a Merlot.", emoji: "🍷", arabic: "خبير النبيذ" }
    { word: "Valet", meaning: "Parking attendant", example: "Give your keys to the valet.", emoji: "🚗", arabic: "خادم" }
    { word: "Cuisine", meaning: "Style of cooking", example: "French cuisine is world-famous.", emoji: "👨‍🍳", arabic: "مطبخ" }
    { word: "Turndown", meaning: "Evening room preparation", example: "Turndown service includes chocolates.", emoji: "🛏️", arabic: "تجهيز الغرفة" }
    { word: "Banquet", meaning: "A formal dinner", example: "The banquet hall seats 200.", emoji: "🏛️", arabic: "مأدبة" }
    { word: "Occupancy", meaning: "Room availability rate", example: "Hotel occupancy is at 85%.", emoji: "📊", arabic: "معدل الإشغال" }
    { word: "Minibar", meaning: "Small in-room fridge", example: "The minibar has snacks and drinks.", emoji: "🧊", arabic: "ثلاجة صغيرة" }
    { word: "Bellhop", meaning: "Porter who carries bags", example: "The bellhop took our luggage.", emoji: "🧳", arabic: "حامل الأمتعة" }
    { word: "Buffet", meaning: "A self-service meal", example: "The breakfast buffet opens at 7 AM.", emoji: "🍽️", arabic: "بوفيه" }
    { word: "Gratuity", meaning: "A tip for service", example: "A 15% gratuity is customary.", emoji: "💵", arabic: "إكرامية" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore cultural sensitivity." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Serving international guests with cultural awareness" }
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
    { question: "What does 'Sommelier' mean?", options: ["A wine expert", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Valet' mean?", options: ["Parking attendant", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Cuisine' mean?", options: ["Style of cooking", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Turndown' mean?", options: ["Evening room preparation", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Banquet' mean?", options: ["A formal dinner", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of cultural sensitivity, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in cultural sensitivity?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in cultural sensitivity?", options: ["Sommelier", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to cultural sensitivity?", options: ["Valet", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional cultural sensitivity, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Cuisine':", options: ["French cuisine is world-famous.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Turndown'?", options: ["Evening room preparation", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Banquet' correctly:", options: ["The banquet hall seats 200.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "hospitality-15": {
    levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: 15,
    title: "Bar & Lounge Service", description: "Cocktail vocabulary, bar etiquette, and service",
    vocabulary: [
    { word: "Valet", meaning: "Parking attendant", example: "Give your keys to the valet.", emoji: "🚗", arabic: "خادم" }
    { word: "Cuisine", meaning: "Style of cooking", example: "French cuisine is world-famous.", emoji: "👨‍🍳", arabic: "مطبخ" }
    { word: "Turndown", meaning: "Evening room preparation", example: "Turndown service includes chocolates.", emoji: "🛏️", arabic: "تجهيز الغرفة" }
    { word: "Banquet", meaning: "A formal dinner", example: "The banquet hall seats 200.", emoji: "🏛️", arabic: "مأدبة" }
    { word: "Occupancy", meaning: "Room availability rate", example: "Hotel occupancy is at 85%.", emoji: "📊", arabic: "معدل الإشغال" }
    { word: "Minibar", meaning: "Small in-room fridge", example: "The minibar has snacks and drinks.", emoji: "🧊", arabic: "ثلاجة صغيرة" }
    { word: "Bellhop", meaning: "Porter who carries bags", example: "The bellhop took our luggage.", emoji: "🧳", arabic: "حامل الأمتعة" }
    { word: "Buffet", meaning: "A self-service meal", example: "The breakfast buffet opens at 7 AM.", emoji: "🍽️", arabic: "بوفيه" }
    { word: "Gratuity", meaning: "A tip for service", example: "A 15% gratuity is customary.", emoji: "💵", arabic: "إكرامية" }
    { word: "Sommelier", meaning: "A wine expert", example: "The sommelier recommended a Merlot.", emoji: "🍷", arabic: "خبير النبيذ" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore bar & lounge service." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Cocktail vocabulary, bar etiquette, and service" }
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
    { question: "What does 'Valet' mean?", options: ["Parking attendant", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Cuisine' mean?", options: ["Style of cooking", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Turndown' mean?", options: ["Evening room preparation", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Banquet' mean?", options: ["A formal dinner", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Occupancy' mean?", options: ["Room availability rate", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of bar & lounge service, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in bar & lounge service?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in bar & lounge service?", options: ["Valet", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to bar & lounge service?", options: ["Cuisine", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional bar & lounge service, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Turndown':", options: ["Turndown service includes chocolates.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Banquet'?", options: ["A formal dinner", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Occupancy' correctly:", options: ["Hotel occupancy is at 85%.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "hospitality-16": {
    levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: 16,
    title: "Spa & Wellness", description: "Treatment types, booking, and wellness vocabulary",
    vocabulary: [
    { word: "Cuisine", meaning: "Style of cooking", example: "French cuisine is world-famous.", emoji: "👨‍🍳", arabic: "مطبخ" }
    { word: "Turndown", meaning: "Evening room preparation", example: "Turndown service includes chocolates.", emoji: "🛏️", arabic: "تجهيز الغرفة" }
    { word: "Banquet", meaning: "A formal dinner", example: "The banquet hall seats 200.", emoji: "🏛️", arabic: "مأدبة" }
    { word: "Occupancy", meaning: "Room availability rate", example: "Hotel occupancy is at 85%.", emoji: "📊", arabic: "معدل الإشغال" }
    { word: "Minibar", meaning: "Small in-room fridge", example: "The minibar has snacks and drinks.", emoji: "🧊", arabic: "ثلاجة صغيرة" }
    { word: "Bellhop", meaning: "Porter who carries bags", example: "The bellhop took our luggage.", emoji: "🧳", arabic: "حامل الأمتعة" }
    { word: "Buffet", meaning: "A self-service meal", example: "The breakfast buffet opens at 7 AM.", emoji: "🍽️", arabic: "بوفيه" }
    { word: "Gratuity", meaning: "A tip for service", example: "A 15% gratuity is customary.", emoji: "💵", arabic: "إكرامية" }
    { word: "Sommelier", meaning: "A wine expert", example: "The sommelier recommended a Merlot.", emoji: "🍷", arabic: "خبير النبيذ" }
    { word: "Valet", meaning: "Parking attendant", example: "Give your keys to the valet.", emoji: "🚗", arabic: "خادم" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore spa & wellness." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Treatment types, booking, and wellness vocabulary" }
    { speaker: "Student", text: "Can you give me a practical example?" }
    { speaker: "Instructor", text: "Of course! Let's start with the key vocabulary." },
    ],
    grammar: { title: "Conditional Sentences", explanation: "Conditionals express hypothetical situations. Type 0: general truths (If+present, present). Type 1: real future (If+present, will+verb). Type 2: unreal present (If+past, would+verb). Type 3: unreal past (If+had+PP, would have+PP).", examples: [
      { sentence: "If you heat water, it boils.", note: "Type 0 — general truth" }
      { sentence: "If it rains, we will cancel.", note: "Type 1 — real possibility" }
      { sentence: "If I had time, I would help.", note: "Type 2 — hypothetical" }
      { sentence: "If she had studied, she would have passed.", note: "Type 3 — regret" },
    ]},
    vocabExercises: [
    { question: "What does 'Cuisine' mean?", options: ["Style of cooking", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Turndown' mean?", options: ["Evening room preparation", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Banquet' mean?", options: ["A formal dinner", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Occupancy' mean?", options: ["Room availability rate", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Minibar' mean?", options: ["Small in-room fridge", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of spa & wellness, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in spa & wellness?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in spa & wellness?", options: ["Cuisine", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to spa & wellness?", options: ["Turndown", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional spa & wellness, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Banquet':", options: ["The banquet hall seats 200.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Occupancy'?", options: ["Room availability rate", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Minibar' correctly:", options: ["The minibar has snacks and drinks.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "hospitality-17": {
    levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: 17,
    title: "Catering Services", description: "Buffet setup, plated service, and special events",
    vocabulary: [
    { word: "Turndown", meaning: "Evening room preparation", example: "Turndown service includes chocolates.", emoji: "🛏️", arabic: "تجهيز الغرفة" }
    { word: "Banquet", meaning: "A formal dinner", example: "The banquet hall seats 200.", emoji: "🏛️", arabic: "مأدبة" }
    { word: "Occupancy", meaning: "Room availability rate", example: "Hotel occupancy is at 85%.", emoji: "📊", arabic: "معدل الإشغال" }
    { word: "Minibar", meaning: "Small in-room fridge", example: "The minibar has snacks and drinks.", emoji: "🧊", arabic: "ثلاجة صغيرة" }
    { word: "Bellhop", meaning: "Porter who carries bags", example: "The bellhop took our luggage.", emoji: "🧳", arabic: "حامل الأمتعة" }
    { word: "Buffet", meaning: "A self-service meal", example: "The breakfast buffet opens at 7 AM.", emoji: "🍽️", arabic: "بوفيه" }
    { word: "Gratuity", meaning: "A tip for service", example: "A 15% gratuity is customary.", emoji: "💵", arabic: "إكرامية" }
    { word: "Sommelier", meaning: "A wine expert", example: "The sommelier recommended a Merlot.", emoji: "🍷", arabic: "خبير النبيذ" }
    { word: "Valet", meaning: "Parking attendant", example: "Give your keys to the valet.", emoji: "🚗", arabic: "خادم" }
    { word: "Cuisine", meaning: "Style of cooking", example: "French cuisine is world-famous.", emoji: "👨‍🍳", arabic: "مطبخ" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore catering services." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Buffet setup, plated service, and special events" }
    { speaker: "Student", text: "Can you give me a practical example?" }
    { speaker: "Instructor", text: "Of course! Let's start with the key vocabulary." },
    ],
    grammar: { title: "Reported Speech", explanation: "When reporting what someone said, we shift tenses back: present→past, past→past perfect, will→would. Pronouns and time expressions also change.", examples: [
      { sentence: "He said he was busy.", note: "Direct: 'I am busy' → Reported: past tense" }
      { sentence: "She told me she had finished.", note: "Direct: 'I finished' → past perfect" }
      { sentence: "They said they would come.", note: "Direct: 'We will come' → would" }
      { sentence: "He asked if I liked it.", note: "Direct: 'Do you like it?' → if clause" },
    ]},
    vocabExercises: [
    { question: "What does 'Turndown' mean?", options: ["Evening room preparation", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Banquet' mean?", options: ["A formal dinner", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Occupancy' mean?", options: ["Room availability rate", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Minibar' mean?", options: ["Small in-room fridge", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Bellhop' mean?", options: ["Porter who carries bags", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of catering services, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in catering services?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in catering services?", options: ["Turndown", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to catering services?", options: ["Banquet", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional catering services, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Occupancy':", options: ["Hotel occupancy is at 85%.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Minibar'?", options: ["Small in-room fridge", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Bellhop' correctly:", options: ["The bellhop took our luggage.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "hospitality-18": {
    levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: 18,
    title: "Travel Agency English", description: "Booking tours, itineraries, and travel advice",
    vocabulary: [
    { word: "Banquet", meaning: "A formal dinner", example: "The banquet hall seats 200.", emoji: "🏛️", arabic: "مأدبة" }
    { word: "Occupancy", meaning: "Room availability rate", example: "Hotel occupancy is at 85%.", emoji: "📊", arabic: "معدل الإشغال" }
    { word: "Minibar", meaning: "Small in-room fridge", example: "The minibar has snacks and drinks.", emoji: "🧊", arabic: "ثلاجة صغيرة" }
    { word: "Bellhop", meaning: "Porter who carries bags", example: "The bellhop took our luggage.", emoji: "🧳", arabic: "حامل الأمتعة" }
    { word: "Buffet", meaning: "A self-service meal", example: "The breakfast buffet opens at 7 AM.", emoji: "🍽️", arabic: "بوفيه" }
    { word: "Gratuity", meaning: "A tip for service", example: "A 15% gratuity is customary.", emoji: "💵", arabic: "إكرامية" }
    { word: "Sommelier", meaning: "A wine expert", example: "The sommelier recommended a Merlot.", emoji: "🍷", arabic: "خبير النبيذ" }
    { word: "Valet", meaning: "Parking attendant", example: "Give your keys to the valet.", emoji: "🚗", arabic: "خادم" }
    { word: "Cuisine", meaning: "Style of cooking", example: "French cuisine is world-famous.", emoji: "👨‍🍳", arabic: "مطبخ" }
    { word: "Turndown", meaning: "Evening room preparation", example: "Turndown service includes chocolates.", emoji: "🛏️", arabic: "تجهيز الغرفة" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore travel agency english." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Booking tours, itineraries, and travel advice" }
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
    { question: "What does 'Banquet' mean?", options: ["A formal dinner", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Occupancy' mean?", options: ["Room availability rate", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Minibar' mean?", options: ["Small in-room fridge", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Bellhop' mean?", options: ["Porter who carries bags", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Buffet' mean?", options: ["A self-service meal", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of travel agency english, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in travel agency english?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in travel agency english?", options: ["Banquet", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to travel agency english?", options: ["Occupancy", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional travel agency english, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Minibar':", options: ["The minibar has snacks and drinks.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Bellhop'?", options: ["Porter who carries bags", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Buffet' correctly:", options: ["The breakfast buffet opens at 7 AM.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "hospitality-19": {
    levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: 19,
    title: "Customer Loyalty", description: "Loyalty programs, feedback, and repeat guests",
    vocabulary: [
    { word: "Occupancy", meaning: "Room availability rate", example: "Hotel occupancy is at 85%.", emoji: "📊", arabic: "معدل الإشغال" }
    { word: "Minibar", meaning: "Small in-room fridge", example: "The minibar has snacks and drinks.", emoji: "🧊", arabic: "ثلاجة صغيرة" }
    { word: "Bellhop", meaning: "Porter who carries bags", example: "The bellhop took our luggage.", emoji: "🧳", arabic: "حامل الأمتعة" }
    { word: "Buffet", meaning: "A self-service meal", example: "The breakfast buffet opens at 7 AM.", emoji: "🍽️", arabic: "بوفيه" }
    { word: "Gratuity", meaning: "A tip for service", example: "A 15% gratuity is customary.", emoji: "💵", arabic: "إكرامية" }
    { word: "Sommelier", meaning: "A wine expert", example: "The sommelier recommended a Merlot.", emoji: "🍷", arabic: "خبير النبيذ" }
    { word: "Valet", meaning: "Parking attendant", example: "Give your keys to the valet.", emoji: "🚗", arabic: "خادم" }
    { word: "Cuisine", meaning: "Style of cooking", example: "French cuisine is world-famous.", emoji: "👨‍🍳", arabic: "مطبخ" }
    { word: "Turndown", meaning: "Evening room preparation", example: "Turndown service includes chocolates.", emoji: "🛏️", arabic: "تجهيز الغرفة" }
    { word: "Banquet", meaning: "A formal dinner", example: "The banquet hall seats 200.", emoji: "🏛️", arabic: "مأدبة" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore customer loyalty." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Loyalty programs, feedback, and repeat guests" }
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
    { question: "What does 'Occupancy' mean?", options: ["Room availability rate", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Minibar' mean?", options: ["Small in-room fridge", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Bellhop' mean?", options: ["Porter who carries bags", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Buffet' mean?", options: ["A self-service meal", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Gratuity' mean?", options: ["A tip for service", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of customer loyalty, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in customer loyalty?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in customer loyalty?", options: ["Occupancy", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to customer loyalty?", options: ["Minibar", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional customer loyalty, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Bellhop':", options: ["The bellhop took our luggage.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Buffet'?", options: ["A self-service meal", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Gratuity' correctly:", options: ["A 15% gratuity is customary.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "hospitality-20": {
    levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: 20,
    title: "Career in Hospitality", description: "Job interviews, CVs, and career development",
    vocabulary: [
    { word: "Minibar", meaning: "Small in-room fridge", example: "The minibar has snacks and drinks.", emoji: "🧊", arabic: "ثلاجة صغيرة" }
    { word: "Bellhop", meaning: "Porter who carries bags", example: "The bellhop took our luggage.", emoji: "🧳", arabic: "حامل الأمتعة" }
    { word: "Buffet", meaning: "A self-service meal", example: "The breakfast buffet opens at 7 AM.", emoji: "🍽️", arabic: "بوفيه" }
    { word: "Gratuity", meaning: "A tip for service", example: "A 15% gratuity is customary.", emoji: "💵", arabic: "إكرامية" }
    { word: "Sommelier", meaning: "A wine expert", example: "The sommelier recommended a Merlot.", emoji: "🍷", arabic: "خبير النبيذ" }
    { word: "Valet", meaning: "Parking attendant", example: "Give your keys to the valet.", emoji: "🚗", arabic: "خادم" }
    { word: "Cuisine", meaning: "Style of cooking", example: "French cuisine is world-famous.", emoji: "👨‍🍳", arabic: "مطبخ" }
    { word: "Turndown", meaning: "Evening room preparation", example: "Turndown service includes chocolates.", emoji: "🛏️", arabic: "تجهيز الغرفة" }
    { word: "Banquet", meaning: "A formal dinner", example: "The banquet hall seats 200.", emoji: "🏛️", arabic: "مأدبة" }
    { word: "Occupancy", meaning: "Room availability rate", example: "Hotel occupancy is at 85%.", emoji: "📊", arabic: "معدل الإشغال" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore career in hospitality." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Job interviews, CVs, and career development" }
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
    { question: "What does 'Minibar' mean?", options: ["Small in-room fridge", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Bellhop' mean?", options: ["Porter who carries bags", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Buffet' mean?", options: ["A self-service meal", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Gratuity' mean?", options: ["A tip for service", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Sommelier' mean?", options: ["A wine expert", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of career in hospitality, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in career in hospitality?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in career in hospitality?", options: ["Minibar", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to career in hospitality?", options: ["Bellhop", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional career in hospitality, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Buffet':", options: ["The breakfast buffet opens at 7 AM.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Gratuity'?", options: ["A tip for service", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Sommelier' correctly:", options: ["The sommelier recommended a Merlot.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
};
