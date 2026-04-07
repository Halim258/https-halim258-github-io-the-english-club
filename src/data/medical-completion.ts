import type { LessonData } from "./lessons";

export const medicalCompletion: Record<string, LessonData> = {
  "medical-18": {
    levelId: "medical", levelLabel: "Medical English", lessonNumber: 18,
    title: "Medical Research", description: "Clinical trials, peer review, and evidence-based medicine",
    vocabulary: [
    { word: "Trial", meaning: "A clinical study", example: "The clinical trial showed results.", emoji: "🔬", arabic: "تجربة سريرية" }
    { word: "Consent", meaning: "Permission for treatment", example: "Get informed consent.", emoji: "✍️", arabic: "موافقة" }
    { word: "Confidentiality", meaning: "Keeping info private", example: "Patient confidentiality is vital.", emoji: "🔒", arabic: "سرية" }
    { word: "Pandemic", meaning: "Global disease outbreak", example: "The pandemic changed everything.", emoji: "🌍", arabic: "جائحة" }
    { word: "Placebo", meaning: "Inactive treatment", example: "The placebo group showed no change.", emoji: "💊", arabic: "علاج وهمي" }
    { word: "Ethics", meaning: "Moral principles", example: "Medical ethics guide decisions.", emoji: "⚖️", arabic: "أخلاقيات" }
    { word: "Protocol", meaning: "Standard procedure", example: "Follow the treatment protocol.", emoji: "📋", arabic: "بروتوكول" }
    { word: "Peer Review", meaning: "Expert evaluation", example: "The paper passed peer review.", emoji: "👥", arabic: "مراجعة الأقران" }
    { word: "Vaccine", meaning: "Disease prevention shot", example: "The vaccine was effective.", emoji: "💉", arabic: "لقاح" }
    { word: "WHO", meaning: "World Health Organization", example: "WHO issued guidelines.", emoji: "🏥", arabic: "منظمة الصحة العالمية" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore medical research." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Clinical trials, peer review, and evidence-based medicine" }
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
    { question: "What does 'Trial' mean?", options: ["A clinical study", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Consent' mean?", options: ["Permission for treatment", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Confidentiality' mean?", options: ["Keeping info private", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Pandemic' mean?", options: ["Global disease outbreak", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Placebo' mean?", options: ["Inactive treatment", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of medical research, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in medical research?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in medical research?", options: ["Trial", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to medical research?", options: ["Consent", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional medical research, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Confidentiality':", options: ["Patient confidentiality is vital.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Pandemic'?", options: ["Global disease outbreak", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Placebo' correctly:", options: ["The placebo group showed no change.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "medical-19": {
    levelId: "medical", levelLabel: "Medical English", lessonNumber: 19,
    title: "Medical Ethics", description: "Consent, confidentiality, and ethical dilemmas",
    vocabulary: [
    { word: "Consent", meaning: "Permission for treatment", example: "Get informed consent.", emoji: "✍️", arabic: "موافقة" }
    { word: "Confidentiality", meaning: "Keeping info private", example: "Patient confidentiality is vital.", emoji: "🔒", arabic: "سرية" }
    { word: "Pandemic", meaning: "Global disease outbreak", example: "The pandemic changed everything.", emoji: "🌍", arabic: "جائحة" }
    { word: "Placebo", meaning: "Inactive treatment", example: "The placebo group showed no change.", emoji: "💊", arabic: "علاج وهمي" }
    { word: "Ethics", meaning: "Moral principles", example: "Medical ethics guide decisions.", emoji: "⚖️", arabic: "أخلاقيات" }
    { word: "Protocol", meaning: "Standard procedure", example: "Follow the treatment protocol.", emoji: "📋", arabic: "بروتوكول" }
    { word: "Peer Review", meaning: "Expert evaluation", example: "The paper passed peer review.", emoji: "👥", arabic: "مراجعة الأقران" }
    { word: "Vaccine", meaning: "Disease prevention shot", example: "The vaccine was effective.", emoji: "💉", arabic: "لقاح" }
    { word: "WHO", meaning: "World Health Organization", example: "WHO issued guidelines.", emoji: "🏥", arabic: "منظمة الصحة العالمية" }
    { word: "Trial", meaning: "A clinical study", example: "The clinical trial showed results.", emoji: "🔬", arabic: "تجربة سريرية" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore medical ethics." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Consent, confidentiality, and ethical dilemmas" }
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
    { question: "What does 'Consent' mean?", options: ["Permission for treatment", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Confidentiality' mean?", options: ["Keeping info private", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Pandemic' mean?", options: ["Global disease outbreak", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Placebo' mean?", options: ["Inactive treatment", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Ethics' mean?", options: ["Moral principles", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of medical ethics, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in medical ethics?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in medical ethics?", options: ["Consent", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to medical ethics?", options: ["Confidentiality", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional medical ethics, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Pandemic':", options: ["The pandemic changed everything.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Placebo'?", options: ["Inactive treatment", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Ethics' correctly:", options: ["Medical ethics guide decisions.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "medical-20": {
    levelId: "medical", levelLabel: "Medical English", lessonNumber: 20,
    title: "Global Health", description: "WHO, pandemics, and international health policy",
    vocabulary: [
    { word: "Confidentiality", meaning: "Keeping info private", example: "Patient confidentiality is vital.", emoji: "🔒", arabic: "سرية" }
    { word: "Pandemic", meaning: "Global disease outbreak", example: "The pandemic changed everything.", emoji: "🌍", arabic: "جائحة" }
    { word: "Placebo", meaning: "Inactive treatment", example: "The placebo group showed no change.", emoji: "💊", arabic: "علاج وهمي" }
    { word: "Ethics", meaning: "Moral principles", example: "Medical ethics guide decisions.", emoji: "⚖️", arabic: "أخلاقيات" }
    { word: "Protocol", meaning: "Standard procedure", example: "Follow the treatment protocol.", emoji: "📋", arabic: "بروتوكول" }
    { word: "Peer Review", meaning: "Expert evaluation", example: "The paper passed peer review.", emoji: "👥", arabic: "مراجعة الأقران" }
    { word: "Vaccine", meaning: "Disease prevention shot", example: "The vaccine was effective.", emoji: "💉", arabic: "لقاح" }
    { word: "WHO", meaning: "World Health Organization", example: "WHO issued guidelines.", emoji: "🏥", arabic: "منظمة الصحة العالمية" }
    { word: "Trial", meaning: "A clinical study", example: "The clinical trial showed results.", emoji: "🔬", arabic: "تجربة سريرية" }
    { word: "Consent", meaning: "Permission for treatment", example: "Get informed consent.", emoji: "✍️", arabic: "موافقة" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore global health." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "WHO, pandemics, and international health policy" }
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
    { question: "What does 'Confidentiality' mean?", options: ["Keeping info private", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Pandemic' mean?", options: ["Global disease outbreak", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Placebo' mean?", options: ["Inactive treatment", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Ethics' mean?", options: ["Moral principles", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Protocol' mean?", options: ["Standard procedure", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of global health, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in global health?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in global health?", options: ["Confidentiality", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to global health?", options: ["Pandemic", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional global health, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Placebo':", options: ["The placebo group showed no change.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Ethics'?", options: ["Moral principles", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Protocol' correctly:", options: ["Follow the treatment protocol.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
};
