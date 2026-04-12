import type { LessonData } from "./lessons";

export const examPrepExtra: Record<string, LessonData> = {
  // ═══ READING SKILLS ═══
  "exam-prep-21": {
    levelId: "exam-prep",
    levelLabel: "Exam Preparation",
    lessonNumber: 21,
    title: "IELTS Reading — True/False/Not Given",
    description: "Master the most challenging IELTS reading question type with proven strategies.",
    vocabulary: [
      { word: "True", meaning: "The statement agrees with the passage", example: "Mark TRUE if the information matches.", emoji: "✅", arabic: "صحيح" },
      { word: "False", meaning: "The statement contradicts the passage", example: "Mark FALSE if it contradicts the text.", emoji: "❌", arabic: "خطأ" },
      { word: "Not Given", meaning: "The information is not in the passage", example: "Mark NOT GIVEN if you can't find it.", emoji: "❓", arabic: "غير مذكور" },
      { word: "Paraphrase", meaning: "To express the same idea in different words", example: "The question paraphrases the original text.", emoji: "🔄", arabic: "إعادة صياغة" },
      { word: "Inference", meaning: "A conclusion drawn from evidence", example: "Don't make inferences — stick to the text.", emoji: "🧠", arabic: "استنتاج" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "True/False/Not Given is the trickiest part of IELTS Reading. Many students confuse FALSE with NOT GIVEN." },
      { speaker: "Student", text: "What's the difference exactly?" },
      { speaker: "Teacher", text: "FALSE means the passage says the OPPOSITE. NOT GIVEN means the passage simply doesn't mention it at all." },
      { speaker: "Student", text: "So if I can't find the information, it's Not Given?" },
      { speaker: "Teacher", text: "Exactly! Don't use your own knowledge — only what's written in the passage counts." },
    ],
    grammar: {
      title: "Strategy: T/F/NG Step by Step",
      explanation: "Step 1: Read the statement carefully. Step 2: Locate the relevant section in the passage. Step 3: Compare — does it match (TRUE), contradict (FALSE), or is it absent (NOT GIVEN)? Step 4: Watch for paraphrasing — the passage rarely uses the exact same words as the question.",
      examples: [
        "Passage: 'The bridge was completed in 1998.' | Statement: 'The bridge was finished in 1998.' → TRUE (completed = finished)",
        "Passage: 'The project cost $2 million.' | Statement: 'The project cost $5 million.' → FALSE (contradicts)",
        "Passage: 'The bridge connects two cities.' | Statement: 'The bridge is painted blue.' → NOT GIVEN (no mention of color)",
      ],
    },
    vocabExercises: [
      { question: "If the passage says the opposite of the statement, mark it as ___.", options: ["True", "False", "Not Given", "Maybe"], correct: 1 },
      { question: "If information is simply not mentioned, mark ___.", options: ["True", "False", "Not Given", "Incorrect"], correct: 2 },
      { question: "The passage uses different words with the same meaning. This is called ___.", options: ["Contradiction", "Paraphrase", "Inference", "Summary"], correct: 1 },
    ],
  },

  "exam-prep-22": {
    levelId: "exam-prep",
    levelLabel: "Exam Preparation",
    lessonNumber: 22,
    title: "IELTS Reading — Matching Headings & Paragraphs",
    description: "Learn to match headings to paragraphs quickly and accurately.",
    vocabulary: [
      { word: "Heading", meaning: "A short title summarizing a paragraph", example: "Choose the best heading for each paragraph.", emoji: "📌", arabic: "عنوان" },
      { word: "Main idea", meaning: "The central point of a paragraph", example: "Identify the main idea before matching.", emoji: "💡", arabic: "الفكرة الرئيسية" },
      { word: "Topic sentence", meaning: "The sentence that introduces the paragraph's theme", example: "The topic sentence is usually first.", emoji: "📝", arabic: "جملة الموضوع" },
      { word: "Distractor", meaning: "A wrong option designed to confuse", example: "Watch out for distractors in the heading list.", emoji: "⚠️", arabic: "مشتت" },
      { word: "Skim", meaning: "To read quickly for general understanding", example: "Skim each paragraph before choosing.", emoji: "👁️", arabic: "قراءة سريعة" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "For matching headings, always read ALL the headings first before looking at paragraphs." },
      { speaker: "Student", text: "Should I read the whole paragraph?" },
      { speaker: "Teacher", text: "No! Skim it. Focus on the first and last sentences — they usually contain the main idea." },
      { speaker: "Student", text: "What if two headings seem to fit?" },
      { speaker: "Teacher", text: "Choose the one that covers the WHOLE paragraph, not just one detail." },
    ],
    grammar: {
      title: "Matching Headings Technique",
      explanation: "1) Read all headings first and underline key words. 2) Skim each paragraph — focus on the first 2 sentences. 3) Match the most obvious paragraphs first. 4) Use elimination for harder ones. 5) The heading should reflect the MAIN idea, not a single detail.",
      examples: [
        "Paragraph about rising sea levels affecting coastal cities → Heading: 'Environmental threats to urban areas' ✓",
        "Paragraph about a new study on sleep → Don't pick 'Health benefits of exercise' just because health is mentioned once.",
      ],
    },
    vocabExercises: [
      { question: "The best place to find a paragraph's main idea is usually the ___ sentence.", options: ["Last", "First", "Middle", "Random"], correct: 1 },
      { question: "A heading should summarize the ___ of the paragraph.", options: ["First detail", "Last example", "Main idea", "Author's name"], correct: 2 },
      { question: "Reading quickly for general understanding is called ___.", options: ["Scanning", "Skimming", "Analyzing", "Translating"], correct: 1 },
    ],
  },

  "exam-prep-23": {
    levelId: "exam-prep",
    levelLabel: "Exam Preparation",
    lessonNumber: 23,
    title: "TOEFL Reading — Vocabulary in Context",
    description: "Learn to determine word meanings from context clues in TOEFL reading passages.",
    vocabulary: [
      { word: "Context clue", meaning: "Hints in the text that help determine meaning", example: "Use context clues to guess unknown words.", emoji: "🔍", arabic: "دليل سياقي" },
      { word: "Synonym", meaning: "A word with a similar meaning", example: "Find the synonym of 'abundant' in the passage.", emoji: "🔁", arabic: "مرادف" },
      { word: "Substitute", meaning: "To replace one thing with another", example: "Substitute each answer choice into the sentence.", emoji: "🔄", arabic: "يستبدل" },
      { word: "Connotation", meaning: "The feeling or association a word carries", example: "'Cheap' and 'affordable' have different connotations.", emoji: "💭", arabic: "دلالة" },
      { word: "Eliminate", meaning: "To remove from consideration", example: "Eliminate answers that change the sentence meaning.", emoji: "✂️", arabic: "يستبعد" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "TOEFL vocabulary questions ask you to find the meaning of a word AS USED in the passage." },
      { speaker: "Student", text: "So the dictionary definition might not be correct?" },
      { speaker: "Teacher", text: "Exactly! A word can have multiple meanings. You need the one that fits THIS context." },
      { speaker: "Student", text: "How do I check my answer?" },
      { speaker: "Teacher", text: "Substitute your answer choice into the original sentence. If the meaning stays the same, it's correct." },
    ],
    grammar: {
      title: "Vocabulary-in-Context Strategy",
      explanation: "1) Read the sentence containing the word. 2) Read sentences before and after for more context. 3) Try to predict the meaning before looking at choices. 4) Substitute each choice into the sentence. 5) The correct answer keeps the overall meaning intact.",
      examples: [
        "'The abundant rainfall led to flooding.' — abundant means: plentiful (not rare, not moderate)",
        "'She resolved the conflict quickly.' — resolved means: settled (not started, not ignored)",
      ],
    },
    vocabExercises: [
      { question: "In TOEFL, vocabulary questions test meaning ___.", options: ["From a dictionary", "In context", "In isolation", "By spelling"], correct: 1 },
      { question: "To check your answer, ___ it into the original sentence.", options: ["Translate", "Substitute", "Delete", "Highlight"], correct: 1 },
      { question: "Words with similar meanings are called ___.", options: ["Antonyms", "Homonyms", "Synonyms", "Acronyms"], correct: 2 },
    ],
  },

  // ═══ LISTENING SKILLS ═══
  "exam-prep-24": {
    levelId: "exam-prep",
    levelLabel: "Exam Preparation",
    lessonNumber: 24,
    title: "IELTS Listening — Section 1 & 2 Strategies",
    description: "Master the first two IELTS Listening sections: everyday conversations and monologues.",
    vocabulary: [
      { word: "Gap-fill", meaning: "Write the missing word in a sentence", example: "Listen carefully for gap-fill answers.", emoji: "📝", arabic: "ملء الفراغات" },
      { word: "Prediction", meaning: "Guessing what comes next", example: "Predict the answer type before listening.", emoji: "🔮", arabic: "تنبؤ" },
      { word: "Spelling", meaning: "Writing words with correct letters", example: "Spelling must be correct in IELTS Listening.", emoji: "🔤", arabic: "تهجئة" },
      { word: "Word limit", meaning: "Maximum number of words allowed", example: "Write NO MORE THAN TWO WORDS.", emoji: "📏", arabic: "حد الكلمات" },
      { word: "Signpost", meaning: "A word that signals what comes next", example: "'However' signals a contrasting point.", emoji: "🪧", arabic: "كلمة دالة" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Section 1 is a conversation — like booking a hotel or registering for a course. Section 2 is one person speaking — like a tour guide." },
      { speaker: "Student", text: "Are these the easiest sections?" },
      { speaker: "Teacher", text: "Yes! That's why you need to get maximum marks here. Use the time to read questions BEFORE the audio starts." },
      { speaker: "Student", text: "What if I miss an answer?" },
      { speaker: "Teacher", text: "Move on immediately! Don't lose the next answer trying to go back." },
    ],
    grammar: {
      title: "Section 1 & 2 Question Types",
      explanation: "Section 1: Form/note completion (names, numbers, dates), multiple choice. Section 2: Map/plan labelling, matching, sentence completion. Key tips: Read ahead during pauses. Write answers as you hear them. Check word limits. Spelling counts! Numbers and dates are common in Section 1.",
      examples: [
        "Q: Name: ___ → Listen for spelling: 'My name is Johnson, J-O-H-N-S-O-N'",
        "Q: Check-in date: ___ → Listen for: '15th of March' or 'March 15'",
        "Q: The museum is open from ___ to 5pm → Listen for the opening time",
      ],
    },
    vocabExercises: [
      { question: "In IELTS Listening, spelling must be ___.", options: ["Close enough", "Perfect", "American only", "Optional"], correct: 1 },
      { question: "Section 1 is usually a ___.", options: ["Lecture", "Conversation", "Debate", "Song"], correct: 1 },
      { question: "If you miss an answer, you should ___.", options: ["Stop and think", "Move on", "Replay", "Guess randomly"], correct: 1 },
    ],
  },

  "exam-prep-25": {
    levelId: "exam-prep",
    levelLabel: "Exam Preparation",
    lessonNumber: 25,
    title: "IELTS Listening — Section 3 & 4 Academic",
    description: "Tackle the harder academic sections of IELTS Listening with advanced strategies.",
    vocabulary: [
      { word: "Academic discussion", meaning: "A conversation about studies or research", example: "Section 3 features an academic discussion.", emoji: "🎓", arabic: "نقاش أكاديمي" },
      { word: "Lecture", meaning: "A formal talk on a topic", example: "Section 4 is always a lecture.", emoji: "🎤", arabic: "محاضرة" },
      { word: "Distractor", meaning: "An incorrect option that sounds correct", example: "Be careful of distractors in multiple choice.", emoji: "⚠️", arabic: "مشتت" },
      { word: "Note-taking", meaning: "Writing key points while listening", example: "Practice note-taking during lectures.", emoji: "📋", arabic: "تدوين ملاحظات" },
      { word: "Transition word", meaning: "A word connecting ideas (however, moreover)", example: "'On the other hand' signals a change.", emoji: "🔗", arabic: "كلمة انتقالية" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Sections 3 and 4 are the hardest. Section 3 has 2-4 speakers discussing academic work. Section 4 is a university lecture." },
      { speaker: "Student", text: "Do they speak faster?" },
      { speaker: "Teacher", text: "Yes, and the vocabulary is more academic. Listen for transition words like 'however', 'in contrast', 'furthermore'." },
      { speaker: "Student", text: "Any tips for Section 4?" },
      { speaker: "Teacher", text: "The questions follow the order of the audio. And you get time to read ALL questions before it starts — use it!" },
    ],
    grammar: {
      title: "Sections 3 & 4 Advanced Techniques",
      explanation: "Section 3: Multiple speakers may change opinions — listen for who says what. Watch for 'I disagree', 'actually', 'well, I think...' Section 4: No pause in the middle — read all 10 questions before the audio. Focus on stressed words and examples that signal answers. Answers come in order.",
      examples: [
        "Speaker A: 'I think we should survey 100 people.' Speaker B: 'Actually, 50 would be enough.' → Answer: 50",
        "Lecturer: 'The PRIMARY cause — and I want to stress this — was deforestation.' → Key word: primary cause = deforestation",
      ],
    },
    vocabExercises: [
      { question: "Section 4 of IELTS Listening is always a ___.", options: ["Conversation", "Debate", "Lecture", "Song"], correct: 2 },
      { question: "Words like 'however' and 'moreover' are called ___ words.", options: ["Academic", "Transition", "Distractor", "Prediction"], correct: 1 },
      { question: "In Section 3, you need to identify ___ says what.", options: ["When", "Where", "Who", "Why"], correct: 2 },
    ],
  },

  "exam-prep-26": {
    levelId: "exam-prep",
    levelLabel: "Exam Preparation",
    lessonNumber: 26,
    title: "TOEFL Listening — Conversations & Lectures",
    description: "Understand TOEFL Listening format and master note-taking for conversations and lectures.",
    vocabulary: [
      { word: "Main idea", meaning: "The central topic of the conversation", example: "The first question usually asks for the main idea.", emoji: "🎯", arabic: "الفكرة الرئيسية" },
      { word: "Detail question", meaning: "A question about specific facts", example: "Detail questions test what you heard.", emoji: "🔎", arabic: "سؤال تفصيلي" },
      { word: "Inference question", meaning: "Understanding something not directly stated", example: "What can be inferred about the student?", emoji: "🧠", arabic: "سؤال استنتاجي" },
      { word: "Replay question", meaning: "A question that replays a short section", example: "Listen again to this part of the lecture.", emoji: "🔁", arabic: "سؤال إعادة" },
      { word: "Function question", meaning: "Why the speaker said something", example: "Why does the professor mention the experiment?", emoji: "💬", arabic: "سؤال الغرض" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "TOEFL Listening has two types: campus conversations and academic lectures. You can take notes!" },
      { speaker: "Student", text: "What should I write down?" },
      { speaker: "Teacher", text: "Main topic, key details, examples, and any opinions or disagreements." },
      { speaker: "Student", text: "What about replay questions?" },
      { speaker: "Teacher", text: "They test WHY the speaker said something — the purpose or attitude, not just what they said." },
    ],
    grammar: {
      title: "TOEFL Listening Question Types",
      explanation: "1) Main idea: What is the conversation mainly about? 2) Detail: According to the professor, what is...? 3) Inference: What can be inferred? 4) Function: Why does the speaker say...? 5) Attitude: What is the professor's opinion? Note-taking tip: Use abbreviations and symbols (→, =, ≠, +).",
      examples: [
        "Main idea Q: 'Why does the student visit the professor?' → Listen to the first 30 seconds",
        "Function Q: 'Why does the professor mention volcanoes?' → To give an example of geological activity",
      ],
    },
    vocabExercises: [
      { question: "In TOEFL Listening, you ___ take notes.", options: ["Cannot", "Can", "Must not", "Should avoid"], correct: 1 },
      { question: "Replay questions test the speaker's ___.", options: ["Vocabulary", "Purpose or attitude", "Grammar", "Speed"], correct: 1 },
      { question: "The main idea is usually found in the ___ of the conversation.", options: ["Middle", "End", "Beginning", "Title"], correct: 2 },
    ],
  },

  "exam-prep-27": {
    levelId: "exam-prep",
    levelLabel: "Exam Preparation",
    lessonNumber: 27,
    title: "Cambridge Listening — Parts 1–4 Overview",
    description: "Prepare for all four parts of Cambridge B2 First and C1 Advanced listening tests.",
    vocabulary: [
      { word: "Multiple matching", meaning: "Match speakers to statements", example: "Part 3 uses multiple matching.", emoji: "🔗", arabic: "مطابقة متعددة" },
      { word: "Extract", meaning: "A short piece from a longer recording", example: "Part 1 has short extracts.", emoji: "✂️", arabic: "مقتطف" },
      { word: "Monologue", meaning: "One person speaking alone", example: "Part 2 is a monologue.", emoji: "🎤", arabic: "حديث فردي" },
      { word: "Gist", meaning: "The general meaning", example: "Listen for the gist first.", emoji: "📌", arabic: "المعنى العام" },
      { word: "Attitude", meaning: "The speaker's feeling or opinion", example: "What is the speaker's attitude towards...?", emoji: "😊", arabic: "موقف" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Cambridge Listening has 4 parts. Part 1 tests understanding short extracts. Part 4 is the hardest — a long interview or discussion." },
      { speaker: "Student", text: "How is it different from IELTS?" },
      { speaker: "Teacher", text: "Cambridge focuses more on understanding attitude, opinion, and purpose — not just facts." },
      { speaker: "Student", text: "Is there gap-fill like IELTS?" },
      { speaker: "Teacher", text: "Yes, in Part 2! You complete sentences from a monologue. Spelling counts here too." },
    ],
    grammar: {
      title: "Cambridge Listening Parts Breakdown",
      explanation: "Part 1: 8 short extracts with multiple choice (feeling, attitude, gist). Part 2: Sentence completion from a monologue (1-3 words). Part 3: Multiple matching — 5 speakers matched to 8 options. Part 4: Multiple choice from a long conversation/interview (7 questions). Total: 30 questions in ~40 minutes.",
      examples: [
        "Part 1: 'How does the woman feel?' → Listen for tone and emotion words",
        "Part 3: Match each speaker to what they say about their job → Listen for each speaker's unique point",
      ],
    },
    vocabExercises: [
      { question: "Cambridge Part 1 tests understanding of ___ and attitude.", options: ["Grammar", "Spelling", "Gist", "Vocabulary"], correct: 2 },
      { question: "Part 3 requires matching ___ to statements.", options: ["Paragraphs", "Speakers", "Words", "Dates"], correct: 1 },
      { question: "Cambridge Listening has ___ parts.", options: ["3", "4", "5", "6"], correct: 1 },
    ],
  },

  // ═══ SPEAKING SKILLS ═══
  "exam-prep-28": {
    levelId: "exam-prep",
    levelLabel: "Exam Preparation",
    lessonNumber: 28,
    title: "TOEFL Speaking — Independent & Integrated Tasks",
    description: "Master both types of TOEFL Speaking tasks with templates and strategies.",
    vocabulary: [
      { word: "Independent task", meaning: "Give your opinion on a topic", example: "Task 1 is an independent speaking task.", emoji: "💭", arabic: "مهمة مستقلة" },
      { word: "Integrated task", meaning: "Combine reading, listening, and speaking", example: "Tasks 2-4 are integrated tasks.", emoji: "🔗", arabic: "مهمة متكاملة" },
      { word: "Template", meaning: "A ready-made structure for your answer", example: "Use a template to organize your response.", emoji: "📋", arabic: "قالب" },
      { word: "Preparation time", meaning: "Seconds given before speaking", example: "You get 15-30 seconds of preparation time.", emoji: "⏱️", arabic: "وقت التحضير" },
      { word: "Fluency", meaning: "Speaking smoothly without hesitation", example: "Fluency is more important than big vocabulary.", emoji: "🌊", arabic: "طلاقة" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "TOEFL Speaking has 4 tasks. Task 1 is independent — state your preference with reasons." },
      { speaker: "Student", text: "How long do I speak?" },
      { speaker: "Teacher", text: "45-60 seconds per task. For Task 1, use this template: State preference → Reason 1 with example → Reason 2 with example → Conclusion." },
      { speaker: "Student", text: "What about the integrated tasks?" },
      { speaker: "Teacher", text: "You read a passage, listen to a lecture, then summarize the connection. Don't give your opinion — just report!" },
    ],
    grammar: {
      title: "TOEFL Speaking Templates",
      explanation: "Task 1 (Independent): 'I believe/prefer... for two main reasons. First,... For example,... Second,... For instance,...' Tasks 2-4 (Integrated): 'The reading discusses... The lecture/conversation adds... According to the professor,...' Key: Speak at a natural pace. Use transition words. Don't memorize — practice the structure.",
      examples: [
        "Task 1: 'Do you prefer studying alone or in a group?' → 'I prefer studying in a group for two reasons...'",
        "Task 3: 'The reading explains photosynthesis. The professor gives an example of...'",
      ],
    },
    vocabExercises: [
      { question: "TOEFL Speaking Task 1 asks for your ___.", options: ["Summary", "Opinion", "Translation", "Reading"], correct: 1 },
      { question: "Integrated tasks combine reading, listening, and ___.", options: ["Writing", "Speaking", "Grammar", "Vocabulary"], correct: 1 },
      { question: "You get ___ seconds to prepare for most tasks.", options: ["5", "15-30", "60", "120"], correct: 1 },
    ],
  },

  "exam-prep-29": {
    levelId: "exam-prep",
    levelLabel: "Exam Preparation",
    lessonNumber: 29,
    title: "Cambridge Speaking — Collaborative & Individual Tasks",
    description: "Prepare for Cambridge B2/C1 speaking exam with partner and individual strategies.",
    vocabulary: [
      { word: "Collaborative task", meaning: "Working with a partner to make a decision", example: "Part 3 is a collaborative task.", emoji: "🤝", arabic: "مهمة تعاونية" },
      { word: "Long turn", meaning: "Speaking alone for 1 minute about photos", example: "Part 2 is the long turn.", emoji: "🖼️", arabic: "الدور الطويل" },
      { word: "Interlocutor", meaning: "The examiner who asks questions", example: "The interlocutor gives you the instructions.", emoji: "👤", arabic: "المحاور" },
      { word: "Speculate", meaning: "To guess or suggest possibilities", example: "Speculate about what the people might be feeling.", emoji: "🤔", arabic: "يتكهن" },
      { word: "Negotiate", meaning: "To discuss and reach an agreement", example: "Negotiate with your partner to decide.", emoji: "💬", arabic: "يتفاوض" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Cambridge Speaking has 4 parts and takes about 14 minutes. You do it with another candidate." },
      { speaker: "Student", text: "What's the hardest part?" },
      { speaker: "Teacher", text: "Part 3 — the collaborative task. You must discuss options with your partner AND reach a decision together." },
      { speaker: "Student", text: "What if my partner is very quiet?" },
      { speaker: "Teacher", text: "Ask them questions! 'What do you think about...?' 'Do you agree that...?' The examiners want to see interaction." },
    ],
    grammar: {
      title: "Cambridge Speaking Parts",
      explanation: "Part 1 (2 min): Personal questions — hobbies, studies, future plans. Part 2 (4 min): Compare two photos and answer a question (1 min each). Part 3 (4 min): Discuss visual prompts together and reach a decision. Part 4 (4 min): Discussion questions related to Part 3 topic. Key phrases: 'I'd say...', 'It seems to me...', 'What's your view?', 'Shall we decide on...?'",
      examples: [
        "Part 2: 'These photos show people exercising. Compare them and say which person might enjoy it more.'",
        "Part 3: 'Here are some ways to improve a city. Discuss which would be most effective.'",
      ],
    },
    vocabExercises: [
      { question: "In Part 2, you compare ___ photos.", options: ["1", "2", "3", "4"], correct: 1 },
      { question: "Part 3 requires you to ___ with your partner.", options: ["Argue", "Collaborate", "Compete", "Ignore them"], correct: 1 },
      { question: "When comparing photos, you should ___ about what's happening.", options: ["Describe exactly", "Speculate", "Count objects", "Read text"], correct: 1 },
    ],
  },

  // ═══ READING (additional) ═══
  "exam-prep-30": {
    levelId: "exam-prep",
    levelLabel: "Exam Preparation",
    lessonNumber: 30,
    title: "SAT Reading — Evidence-Based Questions",
    description: "Master SAT Reading's evidence-based approach and paired question strategy.",
    vocabulary: [
      { word: "Evidence-based", meaning: "Supported by specific text", example: "SAT uses evidence-based reading questions.", emoji: "📊", arabic: "مبني على الأدلة" },
      { word: "Paired questions", meaning: "Two questions linked together", example: "Question 1 asks what, Question 2 asks where in the text.", emoji: "🔗", arabic: "أسئلة مزدوجة" },
      { word: "Best evidence", meaning: "The strongest proof from the passage", example: "Which lines provide the best evidence?", emoji: "✨", arabic: "أفضل دليل" },
      { word: "Tone", meaning: "The author's attitude in writing", example: "The author's tone is critical.", emoji: "🎭", arabic: "نبرة" },
      { word: "Purpose", meaning: "Why the author wrote the passage", example: "The main purpose of the passage is to inform.", emoji: "🎯", arabic: "غرض" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "SAT Reading has a unique feature: paired questions. The first asks WHAT, the second asks WHERE you found the answer." },
      { speaker: "Student", text: "So I need to find the exact lines?" },
      { speaker: "Teacher", text: "Yes! Look at the line references in the evidence question first — they can help you answer BOTH questions." },
      { speaker: "Student", text: "How many passages are there?" },
      { speaker: "Teacher", text: "5 passages in 65 minutes. One is always a pair of related passages you must compare." },
    ],
    grammar: {
      title: "SAT Reading Strategy",
      explanation: "5 passages: 1 literature, 2 science, 2 history/social studies. 52 questions in 65 minutes (~13 min per passage). For paired questions: Read the evidence choices FIRST, then answer the main question. For tone/purpose questions: Look at word choice — positive, negative, neutral? Always go back to the text — never answer from memory.",
      examples: [
        "Q1: 'The author suggests that...' Q2: 'Which lines best support the answer to Q1?' → Read Q2 choices first!",
        "Tone words: 'enthusiastic', 'skeptical', 'objective', 'dismissive' — know these!",
      ],
    },
    vocabExercises: [
      { question: "SAT Reading has ___ passages.", options: ["3", "4", "5", "6"], correct: 2 },
      { question: "Paired questions link a question to ___.", options: ["Another passage", "Evidence lines", "Vocabulary", "Grammar"], correct: 1 },
      { question: "For paired questions, read the ___ question first.", options: ["Main", "Evidence", "Vocabulary", "Graph"], correct: 1 },
    ],
  },
};
