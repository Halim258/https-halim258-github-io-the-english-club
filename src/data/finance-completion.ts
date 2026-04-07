import type { LessonData } from "./lessons";

export const financeCompletion: Record<string, LessonData> = {
  "finance-11": {
    levelId: "finance", levelLabel: "English for Finance", lessonNumber: 11,
    title: "Insurance & Risk Management", description: "Premiums, claims, coverage, and risk vocabulary",
    vocabulary: [
    { word: "Premium", meaning: "Insurance payment", example: "Pay your monthly premium.", emoji: "💳", arabic: "قسط تأمين" }
    { word: "Compliance", meaning: "Following regulations", example: "Compliance is mandatory.", emoji: "📋", arabic: "امتثال" }
    { word: "Blockchain", meaning: "Digital transaction ledger", example: "Blockchain ensures transparency.", emoji: "🔗", arabic: "سلسلة الكتل" }
    { word: "Portfolio", meaning: "Collection of investments", example: "Diversify your portfolio.", emoji: "📂", arabic: "محفظة استثمارية" }
    { word: "Acquisition", meaning: "Buying another company", example: "The acquisition was worth billions.", emoji: "🏢", arabic: "استحواذ" }
    { word: "Mortgage", meaning: "Loan for property", example: "The mortgage rate is 5%.", emoji: "🏠", arabic: "رهن عقاري" }
    { word: "Forecast", meaning: "Financial prediction", example: "The forecast shows growth.", emoji: "📈", arabic: "توقعات" }
    { word: "Equity", meaning: "Ownership stake", example: "They sold 20% equity.", emoji: "📊", arabic: "حقوق ملكية" }
    { word: "Forex", meaning: "Foreign exchange market", example: "Forex trading is volatile.", emoji: "💱", arabic: "سوق العملات" }
    { word: "GAAP", meaning: "Accounting standards", example: "Follow GAAP guidelines.", emoji: "📖", arabic: "المعايير المحاسبية" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore insurance & risk management." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Premiums, claims, coverage, and risk vocabulary" }
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
    { question: "What does 'Premium' mean?", options: ["Insurance payment", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Compliance' mean?", options: ["Following regulations", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Blockchain' mean?", options: ["Digital transaction ledger", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Portfolio' mean?", options: ["Collection of investments", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Acquisition' mean?", options: ["Buying another company", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of insurance & risk management, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in insurance & risk management?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in insurance & risk management?", options: ["Premium", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to insurance & risk management?", options: ["Compliance", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional insurance & risk management, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Blockchain':", options: ["Blockchain ensures transparency.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Portfolio'?", options: ["Collection of investments", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Acquisition' correctly:", options: ["The acquisition was worth billions.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "finance-12": {
    levelId: "finance", levelLabel: "English for Finance", lessonNumber: 12,
    title: "Financial Regulations", description: "Compliance, auditing, and regulatory frameworks",
    vocabulary: [
    { word: "Compliance", meaning: "Following regulations", example: "Compliance is mandatory.", emoji: "📋", arabic: "امتثال" }
    { word: "Blockchain", meaning: "Digital transaction ledger", example: "Blockchain ensures transparency.", emoji: "🔗", arabic: "سلسلة الكتل" }
    { word: "Portfolio", meaning: "Collection of investments", example: "Diversify your portfolio.", emoji: "📂", arabic: "محفظة استثمارية" }
    { word: "Acquisition", meaning: "Buying another company", example: "The acquisition was worth billions.", emoji: "🏢", arabic: "استحواذ" }
    { word: "Mortgage", meaning: "Loan for property", example: "The mortgage rate is 5%.", emoji: "🏠", arabic: "رهن عقاري" }
    { word: "Forecast", meaning: "Financial prediction", example: "The forecast shows growth.", emoji: "📈", arabic: "توقعات" }
    { word: "Equity", meaning: "Ownership stake", example: "They sold 20% equity.", emoji: "📊", arabic: "حقوق ملكية" }
    { word: "Forex", meaning: "Foreign exchange market", example: "Forex trading is volatile.", emoji: "💱", arabic: "سوق العملات" }
    { word: "GAAP", meaning: "Accounting standards", example: "Follow GAAP guidelines.", emoji: "📖", arabic: "المعايير المحاسبية" }
    { word: "Premium", meaning: "Insurance payment", example: "Pay your monthly premium.", emoji: "💳", arabic: "قسط تأمين" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore financial regulations." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Compliance, auditing, and regulatory frameworks" }
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
    { question: "What does 'Compliance' mean?", options: ["Following regulations", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Blockchain' mean?", options: ["Digital transaction ledger", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Portfolio' mean?", options: ["Collection of investments", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Acquisition' mean?", options: ["Buying another company", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Mortgage' mean?", options: ["Loan for property", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of financial regulations, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in financial regulations?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in financial regulations?", options: ["Compliance", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to financial regulations?", options: ["Blockchain", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional financial regulations, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Portfolio':", options: ["Diversify your portfolio.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Acquisition'?", options: ["Buying another company", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Mortgage' correctly:", options: ["The mortgage rate is 5%.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "finance-13": {
    levelId: "finance", levelLabel: "English for Finance", lessonNumber: 13,
    title: "Cryptocurrency & Blockchain", description: "Digital currencies and blockchain terminology",
    vocabulary: [
    { word: "Blockchain", meaning: "Digital transaction ledger", example: "Blockchain ensures transparency.", emoji: "🔗", arabic: "سلسلة الكتل" }
    { word: "Portfolio", meaning: "Collection of investments", example: "Diversify your portfolio.", emoji: "📂", arabic: "محفظة استثمارية" }
    { word: "Acquisition", meaning: "Buying another company", example: "The acquisition was worth billions.", emoji: "🏢", arabic: "استحواذ" }
    { word: "Mortgage", meaning: "Loan for property", example: "The mortgage rate is 5%.", emoji: "🏠", arabic: "رهن عقاري" }
    { word: "Forecast", meaning: "Financial prediction", example: "The forecast shows growth.", emoji: "📈", arabic: "توقعات" }
    { word: "Equity", meaning: "Ownership stake", example: "They sold 20% equity.", emoji: "📊", arabic: "حقوق ملكية" }
    { word: "Forex", meaning: "Foreign exchange market", example: "Forex trading is volatile.", emoji: "💱", arabic: "سوق العملات" }
    { word: "GAAP", meaning: "Accounting standards", example: "Follow GAAP guidelines.", emoji: "📖", arabic: "المعايير المحاسبية" }
    { word: "Premium", meaning: "Insurance payment", example: "Pay your monthly premium.", emoji: "💳", arabic: "قسط تأمين" }
    { word: "Compliance", meaning: "Following regulations", example: "Compliance is mandatory.", emoji: "📋", arabic: "امتثال" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore cryptocurrency & blockchain." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Digital currencies and blockchain terminology" }
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
    { question: "What does 'Blockchain' mean?", options: ["Digital transaction ledger", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Portfolio' mean?", options: ["Collection of investments", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Acquisition' mean?", options: ["Buying another company", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Mortgage' mean?", options: ["Loan for property", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Forecast' mean?", options: ["Financial prediction", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of cryptocurrency & blockchain, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in cryptocurrency & blockchain?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in cryptocurrency & blockchain?", options: ["Blockchain", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to cryptocurrency & blockchain?", options: ["Portfolio", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional cryptocurrency & blockchain, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Acquisition':", options: ["The acquisition was worth billions.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Mortgage'?", options: ["Loan for property", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Forecast' correctly:", options: ["The forecast shows growth.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "finance-14": {
    levelId: "finance", levelLabel: "English for Finance", lessonNumber: 14,
    title: "Financial Planning", description: "Retirement, estates, and wealth management",
    vocabulary: [
    { word: "Portfolio", meaning: "Collection of investments", example: "Diversify your portfolio.", emoji: "📂", arabic: "محفظة استثمارية" }
    { word: "Acquisition", meaning: "Buying another company", example: "The acquisition was worth billions.", emoji: "🏢", arabic: "استحواذ" }
    { word: "Mortgage", meaning: "Loan for property", example: "The mortgage rate is 5%.", emoji: "🏠", arabic: "رهن عقاري" }
    { word: "Forecast", meaning: "Financial prediction", example: "The forecast shows growth.", emoji: "📈", arabic: "توقعات" }
    { word: "Equity", meaning: "Ownership stake", example: "They sold 20% equity.", emoji: "📊", arabic: "حقوق ملكية" }
    { word: "Forex", meaning: "Foreign exchange market", example: "Forex trading is volatile.", emoji: "💱", arabic: "سوق العملات" }
    { word: "GAAP", meaning: "Accounting standards", example: "Follow GAAP guidelines.", emoji: "📖", arabic: "المعايير المحاسبية" }
    { word: "Premium", meaning: "Insurance payment", example: "Pay your monthly premium.", emoji: "💳", arabic: "قسط تأمين" }
    { word: "Compliance", meaning: "Following regulations", example: "Compliance is mandatory.", emoji: "📋", arabic: "امتثال" }
    { word: "Blockchain", meaning: "Digital transaction ledger", example: "Blockchain ensures transparency.", emoji: "🔗", arabic: "سلسلة الكتل" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore financial planning." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Retirement, estates, and wealth management" }
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
    { question: "What does 'Portfolio' mean?", options: ["Collection of investments", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Acquisition' mean?", options: ["Buying another company", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Mortgage' mean?", options: ["Loan for property", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Forecast' mean?", options: ["Financial prediction", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Equity' mean?", options: ["Ownership stake", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of financial planning, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in financial planning?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in financial planning?", options: ["Portfolio", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to financial planning?", options: ["Acquisition", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional financial planning, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Mortgage':", options: ["The mortgage rate is 5%.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Forecast'?", options: ["Financial prediction", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Equity' correctly:", options: ["They sold 20% equity.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "finance-15": {
    levelId: "finance", levelLabel: "English for Finance", lessonNumber: 15,
    title: "Mergers & Acquisitions", description: "Due diligence, takeovers, and corporate finance",
    vocabulary: [
    { word: "Acquisition", meaning: "Buying another company", example: "The acquisition was worth billions.", emoji: "🏢", arabic: "استحواذ" }
    { word: "Mortgage", meaning: "Loan for property", example: "The mortgage rate is 5%.", emoji: "🏠", arabic: "رهن عقاري" }
    { word: "Forecast", meaning: "Financial prediction", example: "The forecast shows growth.", emoji: "📈", arabic: "توقعات" }
    { word: "Equity", meaning: "Ownership stake", example: "They sold 20% equity.", emoji: "📊", arabic: "حقوق ملكية" }
    { word: "Forex", meaning: "Foreign exchange market", example: "Forex trading is volatile.", emoji: "💱", arabic: "سوق العملات" }
    { word: "GAAP", meaning: "Accounting standards", example: "Follow GAAP guidelines.", emoji: "📖", arabic: "المعايير المحاسبية" }
    { word: "Premium", meaning: "Insurance payment", example: "Pay your monthly premium.", emoji: "💳", arabic: "قسط تأمين" }
    { word: "Compliance", meaning: "Following regulations", example: "Compliance is mandatory.", emoji: "📋", arabic: "امتثال" }
    { word: "Blockchain", meaning: "Digital transaction ledger", example: "Blockchain ensures transparency.", emoji: "🔗", arabic: "سلسلة الكتل" }
    { word: "Portfolio", meaning: "Collection of investments", example: "Diversify your portfolio.", emoji: "📂", arabic: "محفظة استثمارية" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore mergers & acquisitions." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Due diligence, takeovers, and corporate finance" }
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
    { question: "What does 'Acquisition' mean?", options: ["Buying another company", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Mortgage' mean?", options: ["Loan for property", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Forecast' mean?", options: ["Financial prediction", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Equity' mean?", options: ["Ownership stake", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Forex' mean?", options: ["Foreign exchange market", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of mergers & acquisitions, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in mergers & acquisitions?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in mergers & acquisitions?", options: ["Acquisition", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to mergers & acquisitions?", options: ["Mortgage", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional mergers & acquisitions, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Forecast':", options: ["The forecast shows growth.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Equity'?", options: ["Ownership stake", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Forex' correctly:", options: ["Forex trading is volatile.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "finance-16": {
    levelId: "finance", levelLabel: "English for Finance", lessonNumber: 16,
    title: "Real Estate Finance", description: "Mortgages, appraisals, and property investment",
    vocabulary: [
    { word: "Mortgage", meaning: "Loan for property", example: "The mortgage rate is 5%.", emoji: "🏠", arabic: "رهن عقاري" }
    { word: "Forecast", meaning: "Financial prediction", example: "The forecast shows growth.", emoji: "📈", arabic: "توقعات" }
    { word: "Equity", meaning: "Ownership stake", example: "They sold 20% equity.", emoji: "📊", arabic: "حقوق ملكية" }
    { word: "Forex", meaning: "Foreign exchange market", example: "Forex trading is volatile.", emoji: "💱", arabic: "سوق العملات" }
    { word: "GAAP", meaning: "Accounting standards", example: "Follow GAAP guidelines.", emoji: "📖", arabic: "المعايير المحاسبية" }
    { word: "Premium", meaning: "Insurance payment", example: "Pay your monthly premium.", emoji: "💳", arabic: "قسط تأمين" }
    { word: "Compliance", meaning: "Following regulations", example: "Compliance is mandatory.", emoji: "📋", arabic: "امتثال" }
    { word: "Blockchain", meaning: "Digital transaction ledger", example: "Blockchain ensures transparency.", emoji: "🔗", arabic: "سلسلة الكتل" }
    { word: "Portfolio", meaning: "Collection of investments", example: "Diversify your portfolio.", emoji: "📂", arabic: "محفظة استثمارية" }
    { word: "Acquisition", meaning: "Buying another company", example: "The acquisition was worth billions.", emoji: "🏢", arabic: "استحواذ" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore real estate finance." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Mortgages, appraisals, and property investment" }
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
    { question: "What does 'Mortgage' mean?", options: ["Loan for property", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Forecast' mean?", options: ["Financial prediction", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Equity' mean?", options: ["Ownership stake", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Forex' mean?", options: ["Foreign exchange market", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'GAAP' mean?", options: ["Accounting standards", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of real estate finance, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in real estate finance?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in real estate finance?", options: ["Mortgage", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to real estate finance?", options: ["Forecast", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional real estate finance, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Equity':", options: ["They sold 20% equity.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Forex'?", options: ["Foreign exchange market", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'GAAP' correctly:", options: ["Follow GAAP guidelines.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "finance-17": {
    levelId: "finance", levelLabel: "English for Finance", lessonNumber: 17,
    title: "Corporate Budgeting", description: "Budget allocation, forecasting, and variance",
    vocabulary: [
    { word: "Forecast", meaning: "Financial prediction", example: "The forecast shows growth.", emoji: "📈", arabic: "توقعات" }
    { word: "Equity", meaning: "Ownership stake", example: "They sold 20% equity.", emoji: "📊", arabic: "حقوق ملكية" }
    { word: "Forex", meaning: "Foreign exchange market", example: "Forex trading is volatile.", emoji: "💱", arabic: "سوق العملات" }
    { word: "GAAP", meaning: "Accounting standards", example: "Follow GAAP guidelines.", emoji: "📖", arabic: "المعايير المحاسبية" }
    { word: "Premium", meaning: "Insurance payment", example: "Pay your monthly premium.", emoji: "💳", arabic: "قسط تأمين" }
    { word: "Compliance", meaning: "Following regulations", example: "Compliance is mandatory.", emoji: "📋", arabic: "امتثال" }
    { word: "Blockchain", meaning: "Digital transaction ledger", example: "Blockchain ensures transparency.", emoji: "🔗", arabic: "سلسلة الكتل" }
    { word: "Portfolio", meaning: "Collection of investments", example: "Diversify your portfolio.", emoji: "📂", arabic: "محفظة استثمارية" }
    { word: "Acquisition", meaning: "Buying another company", example: "The acquisition was worth billions.", emoji: "🏢", arabic: "استحواذ" }
    { word: "Mortgage", meaning: "Loan for property", example: "The mortgage rate is 5%.", emoji: "🏠", arabic: "رهن عقاري" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore corporate budgeting." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Budget allocation, forecasting, and variance" }
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
    { question: "What does 'Forecast' mean?", options: ["Financial prediction", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Equity' mean?", options: ["Ownership stake", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Forex' mean?", options: ["Foreign exchange market", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'GAAP' mean?", options: ["Accounting standards", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Premium' mean?", options: ["Insurance payment", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of corporate budgeting, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in corporate budgeting?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in corporate budgeting?", options: ["Forecast", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to corporate budgeting?", options: ["Equity", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional corporate budgeting, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Forex':", options: ["Forex trading is volatile.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'GAAP'?", options: ["Accounting standards", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Premium' correctly:", options: ["Pay your monthly premium.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "finance-18": {
    levelId: "finance", levelLabel: "English for Finance", lessonNumber: 18,
    title: "Venture Capital & Startups", description: "Funding rounds, equity, and valuation",
    vocabulary: [
    { word: "Equity", meaning: "Ownership stake", example: "They sold 20% equity.", emoji: "📊", arabic: "حقوق ملكية" }
    { word: "Forex", meaning: "Foreign exchange market", example: "Forex trading is volatile.", emoji: "💱", arabic: "سوق العملات" }
    { word: "GAAP", meaning: "Accounting standards", example: "Follow GAAP guidelines.", emoji: "📖", arabic: "المعايير المحاسبية" }
    { word: "Premium", meaning: "Insurance payment", example: "Pay your monthly premium.", emoji: "💳", arabic: "قسط تأمين" }
    { word: "Compliance", meaning: "Following regulations", example: "Compliance is mandatory.", emoji: "📋", arabic: "امتثال" }
    { word: "Blockchain", meaning: "Digital transaction ledger", example: "Blockchain ensures transparency.", emoji: "🔗", arabic: "سلسلة الكتل" }
    { word: "Portfolio", meaning: "Collection of investments", example: "Diversify your portfolio.", emoji: "📂", arabic: "محفظة استثمارية" }
    { word: "Acquisition", meaning: "Buying another company", example: "The acquisition was worth billions.", emoji: "🏢", arabic: "استحواذ" }
    { word: "Mortgage", meaning: "Loan for property", example: "The mortgage rate is 5%.", emoji: "🏠", arabic: "رهن عقاري" }
    { word: "Forecast", meaning: "Financial prediction", example: "The forecast shows growth.", emoji: "📈", arabic: "توقعات" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore venture capital & startups." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Funding rounds, equity, and valuation" }
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
    { question: "What does 'Equity' mean?", options: ["Ownership stake", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Forex' mean?", options: ["Foreign exchange market", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'GAAP' mean?", options: ["Accounting standards", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Premium' mean?", options: ["Insurance payment", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Compliance' mean?", options: ["Following regulations", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of venture capital & startups, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in venture capital & startups?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in venture capital & startups?", options: ["Equity", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to venture capital & startups?", options: ["Forex", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional venture capital & startups, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'GAAP':", options: ["Follow GAAP guidelines.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Premium'?", options: ["Insurance payment", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Compliance' correctly:", options: ["Compliance is mandatory.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "finance-19": {
    levelId: "finance", levelLabel: "English for Finance", lessonNumber: 19,
    title: "International Trade Finance", description: "Letters of credit, imports, and forex",
    vocabulary: [
    { word: "Forex", meaning: "Foreign exchange market", example: "Forex trading is volatile.", emoji: "💱", arabic: "سوق العملات" }
    { word: "GAAP", meaning: "Accounting standards", example: "Follow GAAP guidelines.", emoji: "📖", arabic: "المعايير المحاسبية" }
    { word: "Premium", meaning: "Insurance payment", example: "Pay your monthly premium.", emoji: "💳", arabic: "قسط تأمين" }
    { word: "Compliance", meaning: "Following regulations", example: "Compliance is mandatory.", emoji: "📋", arabic: "امتثال" }
    { word: "Blockchain", meaning: "Digital transaction ledger", example: "Blockchain ensures transparency.", emoji: "🔗", arabic: "سلسلة الكتل" }
    { word: "Portfolio", meaning: "Collection of investments", example: "Diversify your portfolio.", emoji: "📂", arabic: "محفظة استثمارية" }
    { word: "Acquisition", meaning: "Buying another company", example: "The acquisition was worth billions.", emoji: "🏢", arabic: "استحواذ" }
    { word: "Mortgage", meaning: "Loan for property", example: "The mortgage rate is 5%.", emoji: "🏠", arabic: "رهن عقاري" }
    { word: "Forecast", meaning: "Financial prediction", example: "The forecast shows growth.", emoji: "📈", arabic: "توقعات" }
    { word: "Equity", meaning: "Ownership stake", example: "They sold 20% equity.", emoji: "📊", arabic: "حقوق ملكية" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore international trade finance." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "Letters of credit, imports, and forex" }
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
    { question: "What does 'Forex' mean?", options: ["Foreign exchange market", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'GAAP' mean?", options: ["Accounting standards", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Premium' mean?", options: ["Insurance payment", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Compliance' mean?", options: ["Following regulations", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Blockchain' mean?", options: ["Digital transaction ledger", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of international trade finance, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in international trade finance?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in international trade finance?", options: ["Forex", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to international trade finance?", options: ["GAAP", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional international trade finance, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Premium':", options: ["Pay your monthly premium.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Compliance'?", options: ["Following regulations", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Blockchain' correctly:", options: ["Blockchain ensures transparency.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
  "finance-20": {
    levelId: "finance", levelLabel: "English for Finance", lessonNumber: 20,
    title: "Financial Reporting Standards", description: "IFRS, GAAP, and financial statement analysis",
    vocabulary: [
    { word: "GAAP", meaning: "Accounting standards", example: "Follow GAAP guidelines.", emoji: "📖", arabic: "المعايير المحاسبية" }
    { word: "Premium", meaning: "Insurance payment", example: "Pay your monthly premium.", emoji: "💳", arabic: "قسط تأمين" }
    { word: "Compliance", meaning: "Following regulations", example: "Compliance is mandatory.", emoji: "📋", arabic: "امتثال" }
    { word: "Blockchain", meaning: "Digital transaction ledger", example: "Blockchain ensures transparency.", emoji: "🔗", arabic: "سلسلة الكتل" }
    { word: "Portfolio", meaning: "Collection of investments", example: "Diversify your portfolio.", emoji: "📂", arabic: "محفظة استثمارية" }
    { word: "Acquisition", meaning: "Buying another company", example: "The acquisition was worth billions.", emoji: "🏢", arabic: "استحواذ" }
    { word: "Mortgage", meaning: "Loan for property", example: "The mortgage rate is 5%.", emoji: "🏠", arabic: "رهن عقاري" }
    { word: "Forecast", meaning: "Financial prediction", example: "The forecast shows growth.", emoji: "📈", arabic: "توقعات" }
    { word: "Equity", meaning: "Ownership stake", example: "They sold 20% equity.", emoji: "📊", arabic: "حقوق ملكية" }
    { word: "Forex", meaning: "Foreign exchange market", example: "Forex trading is volatile.", emoji: "💱", arabic: "سوق العملات" },
    ],
    dialogue: [
    { speaker: "Instructor", text: "Today we'll explore financial reporting standards." }
    { speaker: "Student", text: "That sounds interesting! What should I know first?" }
    { speaker: "Instructor", text: "IFRS, GAAP, and financial statement analysis" }
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
    { question: "What does 'GAAP' mean?", options: ["Accounting standards", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Premium' mean?", options: ["Insurance payment", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Compliance' mean?", options: ["Following regulations", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Blockchain' mean?", options: ["Digital transaction ledger", "The opposite meaning", "A type of food", "A greeting"], correct: 0 }
    { question: "What does 'Portfolio' mean?", options: ["Collection of investments", "The opposite meaning", "A type of food", "A greeting"], correct: 0 },
    ],
    conversationExercises: [
    { question: "In the context of financial reporting standards, what is most important?", options: ["Speaking clearly", "Using technical vocabulary", "Both A and B", "Neither"], correct: 2 }
    { question: "How should you ask for clarification?", options: ["Say nothing", "'Could you explain that?'", "Walk away", "Guess"], correct: 1 }
    { question: "What is a key skill in financial reporting standards?", options: ["Ignoring details", "Active listening", "Speaking fast", "Using slang"], correct: 1 },
    ],
    grammarExercises: [
    { question: "Choose the correct form:", options: ["If I was you, I'll go.", "If I were you, I would go.", "If I am you, I go.", "If I be you, I went."], correct: 1 }
    { question: "Select the reported speech:", options: ["He says he is happy.", "He said he was happy.", "He said he is happy.", "He says he was happy."], correct: 1 }
    { question: "Which uses a relative clause?", options: ["I went home.", "The man who called left.", "She runs fast.", "It rained."], correct: 1 }
    { question: "Complete: 'She ___ have arrived by now.'", options: ["must", "can", "do", "are"], correct: 0 },
    ],
    examQuestions: [
    { question: "What is a key concept in financial reporting standards?", options: ["GAAP", "Randomness", "Nothing", "Silence"], correct: 0 }
    { question: "Which vocabulary word relates to financial reporting standards?", options: ["Premium", "Banana", "Playground", "Cloud"], correct: 0 }
    { question: "Choose the most professional response:", options: ["Yeah whatever", "I understand, let me help.", "I don't know", "Not my problem"], correct: 1 }
    { question: "In professional financial reporting standards, you should:", options: ["Be casual", "Use appropriate terminology", "Avoid speaking", "Use only slang"], correct: 1 }
    { question: "The best way to learn new vocabulary is:", options: ["Memorize lists", "Use words in context", "Ignore them", "Read once"], correct: 1 },
    ],
    homeworkQuestions: [
    { question: "Write a sentence using 'Compliance':", options: ["Compliance is mandatory.", "I like pizza.", "The sky is blue.", "Hello world."], correct: 0 }
    { question: "Which definition matches 'Blockchain'?", options: ["Digital transaction ledger", "A type of sport", "A kind of weather", "A musical instrument"], correct: 0 }
    { question: "Use 'Portfolio' correctly:", options: ["Diversify your portfolio.", "The table is green.", "I went shopping.", "It was Tuesday."], correct: 0 },
    ],
  },
};
