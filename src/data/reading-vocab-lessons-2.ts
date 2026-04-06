import { LessonData } from "./lessons";

export const readingVocabLessons2: Record<string, LessonData> = {
  "reading-comp-3": {
    levelId: "reading-comp", levelLabel: "Reading Comprehension", lessonNumber: 3,
    title: "Understanding News Articles",
    description: "Learn to read and analyze English news articles effectively.",
    vocabulary: [
      { word: "Headline", meaning: "The title of a news article", example: "The headline grabbed my attention.", emoji: "📰", arabic: "عنوان رئيسي" },
      { word: "Source", meaning: "Where information comes from", example: "Always check your source.", emoji: "🔍", arabic: "مصدر" },
      { word: "Report", meaning: "A detailed account of an event", example: "The reporter wrote a detailed report.", emoji: "📋", arabic: "تقرير" },
      { word: "Bias", meaning: "Unfair preference for one side", example: "Good readers look for bias.", emoji: "⚖️", arabic: "تحيز" },
      { word: "Editorial", meaning: "An opinion article by the editor", example: "The editorial discussed climate change.", emoji: "✍️", arabic: "افتتاحية" },
      { word: "Column", meaning: "A regular article by one writer", example: "She writes a weekly column.", emoji: "📝", arabic: "عمود" },
      { word: "Journalist", meaning: "A person who writes news", example: "The journalist interviewed the president.", emoji: "🎤", arabic: "صحفي" },
      { word: "Breaking news", meaning: "Very recent, important news", example: "Breaking news just came in!", emoji: "🚨", arabic: "أخبار عاجلة" },
      { word: "Fact", meaning: "Something that is true", example: "That is a fact, not an opinion.", emoji: "✅", arabic: "حقيقة" },
      { word: "Opinion", meaning: "A personal belief or view", example: "That's just my opinion.", emoji: "💭", arabic: "رأي" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Let's read this news article. What's the headline about?" },
      { speaker: "Student", text: "It says 'New Study Shows Exercise Improves Memory'." },
      { speaker: "Teacher", text: "Good. Is this a fact or an opinion?" },
      { speaker: "Student", text: "It's presenting a fact from a study." },
      { speaker: "Teacher", text: "Excellent! Always distinguish facts from opinions when reading news." },
    ],
    grammar: {
      title: "Reported Speech in News",
      explanation: "News articles use reported speech: 'She said that...', 'He claimed that...', 'Experts believe that...'",
      examples: [
        { sentence: "The minister said that the plan would succeed.", note: "Direct → reported with 'said that'" },
        { sentence: "Scientists reported that temperatures are rising.", note: "'Reported that' for formal sources" },
        { sentence: "Experts believe the economy will recover.", note: "'Believe' for opinions/predictions" },
        { sentence: "The company announced it would hire 500 people.", note: "'Announced' for official statements" },
      ],
    },
    vocabExercises: [
      { question: "A 'headline' is:", options: ["The last paragraph", "The title of an article", "A picture", "An ad"], correct: 1 },
      { question: "'Bias' means:", options: ["Fairness", "Unfair preference", "A headline", "A column"], correct: 1 },
    ],
    conversationExercises: [
      { question: "How do you check if news is reliable?", options: ["Read only headlines", "Check the source", "Ignore it", "Read comments only"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'She said ___ she was happy.'", options: ["what", "that", "which", "who"], correct: 1 },
    ],
    examQuestions: [
      { question: "An 'editorial' is:", options: ["A news report", "An opinion piece by the editor", "An advertisement", "A photo"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "A 'journalist' is someone who:", options: ["Cooks food", "Writes news", "Drives buses", "Teaches math"], correct: 1 },
    ],
  },
  "reading-comp-4": {
    levelId: "reading-comp", levelLabel: "Reading Comprehension", lessonNumber: 4,
    title: "Reading for Main Ideas",
    description: "Practice identifying the main idea and supporting details in texts.",
    vocabulary: [
      { word: "Main idea", meaning: "The most important point of a text", example: "The main idea is about recycling.", emoji: "💡", arabic: "الفكرة الرئيسية" },
      { word: "Supporting detail", meaning: "Information that backs up the main idea", example: "Statistics are supporting details.", emoji: "📊", arabic: "تفصيل داعم" },
      { word: "Topic sentence", meaning: "The sentence that states the main idea", example: "The topic sentence is usually first.", emoji: "📌", arabic: "جملة موضوعية" },
      { word: "Paragraph", meaning: "A group of related sentences", example: "Each paragraph has one main idea.", emoji: "📄", arabic: "فقرة" },
      { word: "Conclusion", meaning: "The final part of a text", example: "The conclusion summarized everything.", emoji: "🏁", arabic: "خاتمة" },
      { word: "Skim", meaning: "To read quickly for general meaning", example: "Skim the article before reading carefully.", emoji: "👁️", arabic: "قراءة سريعة" },
      { word: "Scan", meaning: "To look for specific information", example: "Scan the text for the date.", emoji: "🔎", arabic: "بحث سريع" },
      { word: "Context", meaning: "The surrounding information", example: "Use context to guess word meanings.", emoji: "📚", arabic: "سياق" },
      { word: "Summarize", meaning: "To state the main points briefly", example: "Can you summarize this article?", emoji: "📝", arabic: "يلخص" },
      { word: "Infer", meaning: "To understand something not directly stated", example: "We can infer she was upset.", emoji: "🧠", arabic: "يستنتج" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Read this paragraph. What's the main idea?" },
      { speaker: "Student", text: "It's about how plastic pollution affects the ocean." },
      { speaker: "Teacher", text: "Good! What are the supporting details?" },
      { speaker: "Student", text: "It mentions 8 million tons of plastic enter the ocean yearly." },
      { speaker: "Teacher", text: "Perfect. That statistic supports the main idea." },
    ],
    grammar: {
      title: "Conjunctions for Connecting Ideas",
      explanation: "Use conjunctions to connect main ideas and details: 'because', 'therefore', 'however', 'moreover', 'in addition'.",
      examples: [
        { sentence: "Plastic is harmful because it doesn't decompose.", note: "'Because' gives a reason" },
        { sentence: "Therefore, we must reduce plastic use.", note: "'Therefore' shows a conclusion" },
        { sentence: "However, some countries have banned plastic bags.", note: "'However' shows contrast" },
        { sentence: "Moreover, recycling programs are expanding.", note: "'Moreover' adds information" },
      ],
    },
    vocabExercises: [
      { question: "To 'skim' means to:", options: ["Read slowly", "Read quickly for general meaning", "Write notes", "Memorize"], correct: 1 },
      { question: "A 'topic sentence' is:", options: ["The last sentence", "The sentence stating the main idea", "A question", "A title"], correct: 1 },
    ],
    conversationExercises: [
      { question: "To find specific information quickly, you should:", options: ["Read everything twice", "Scan the text", "Close the book", "Ask someone"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Which word shows contrast?", options: ["Because", "Moreover", "However", "Also"], correct: 2 },
    ],
    examQuestions: [
      { question: "To 'infer' means:", options: ["To state directly", "To understand something not directly said", "To copy", "To forget"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "To 'summarize' means:", options: ["To add details", "To state main points briefly", "To translate", "To memorize"], correct: 1 },
    ],
  },
  "reading-comp-5": {
    levelId: "reading-comp", levelLabel: "Reading Comprehension", lessonNumber: 5,
    title: "Critical Reading Skills",
    description: "Develop skills to evaluate, question, and analyze texts critically.",
    vocabulary: [
      { word: "Evaluate", meaning: "To judge the quality or value of something", example: "Evaluate the author's argument.", emoji: "⚖️", arabic: "يقيّم" },
      { word: "Argument", meaning: "A reason or set of reasons", example: "The author's argument was convincing.", emoji: "🗣️", arabic: "حجة" },
      { word: "Evidence", meaning: "Facts that prove something", example: "The evidence supports the claim.", emoji: "🔬", arabic: "دليل" },
      { word: "Credible", meaning: "Believable and trustworthy", example: "Is this source credible?", emoji: "✅", arabic: "موثوق" },
      { word: "Perspective", meaning: "A point of view", example: "Consider different perspectives.", emoji: "👀", arabic: "وجهة نظر" },
      { word: "Assumption", meaning: "Something accepted as true without proof", example: "Don't make assumptions.", emoji: "🤔", arabic: "افتراض" },
      { word: "Analyze", meaning: "To examine in detail", example: "Analyze the text carefully.", emoji: "🔍", arabic: "يحلل" },
      { word: "Interpret", meaning: "To explain the meaning of something", example: "How do you interpret this poem?", emoji: "💬", arabic: "يفسّر" },
      { word: "Logical", meaning: "Making sense, reasonable", example: "That's a logical conclusion.", emoji: "🧩", arabic: "منطقي" },
      { word: "Fallacy", meaning: "A false or mistaken belief", example: "That argument contains a fallacy.", emoji: "❌", arabic: "مغالطة" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "The author says 'Everyone knows this is true.' Is that good evidence?" },
      { speaker: "Student", text: "No, it's an assumption, not actual evidence." },
      { speaker: "Teacher", text: "Right! That's a logical fallacy. What would be better evidence?" },
      { speaker: "Student", text: "Statistics or research studies would be more credible." },
      { speaker: "Teacher", text: "Excellent critical thinking!" },
    ],
    grammar: {
      title: "Language of Evaluation",
      explanation: "Use evaluative language: 'It seems that...', 'The evidence suggests...', 'One could argue that...', 'This implies that...'",
      examples: [
        { sentence: "It seems that the author is biased.", note: "Tentative evaluation" },
        { sentence: "The evidence suggests a different conclusion.", note: "Evidence-based evaluation" },
        { sentence: "One could argue that this is misleading.", note: "Presenting a counterargument" },
        { sentence: "This implies that more research is needed.", note: "Drawing an implication" },
      ],
    },
    vocabExercises: [
      { question: "'Credible' means:", options: ["Funny", "Believable and trustworthy", "Expensive", "Old"], correct: 1 },
      { question: "A 'fallacy' is:", options: ["A true statement", "A false belief", "A story", "A question"], correct: 1 },
    ],
    conversationExercises: [
      { question: "Good evidence includes:", options: ["Personal feelings", "Research and statistics", "Guesses", "Opinions only"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'The evidence ___ a different conclusion.'", options: ["suggests", "sings", "plays", "eats"], correct: 0 },
    ],
    examQuestions: [
      { question: "To 'analyze' means to:", options: ["Ignore details", "Examine in detail", "Summarize quickly", "Copy text"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "A 'perspective' is:", options: ["A book", "A point of view", "A sentence", "A paragraph"], correct: 1 },
    ],
  },
  "vocab-build-2": {
    levelId: "vocab-build", levelLabel: "Vocabulary Building", lessonNumber: 2,
    title: "Word Families & Roots",
    description: "Learn how to build vocabulary through word families and root words.",
    vocabulary: [
      { word: "Root", meaning: "The base form of a word", example: "'Act' is the root of 'action'.", emoji: "🌱", arabic: "جذر" },
      { word: "Prefix", meaning: "Letters added before a root", example: "'Un-' in 'unhappy' is a prefix.", emoji: "⬅️", arabic: "سابقة" },
      { word: "Suffix", meaning: "Letters added after a root", example: "'-tion' in 'action' is a suffix.", emoji: "➡️", arabic: "لاحقة" },
      { word: "Synonym", meaning: "A word with a similar meaning", example: "'Happy' and 'glad' are synonyms.", emoji: "🔄", arabic: "مرادف" },
      { word: "Antonym", meaning: "A word with the opposite meaning", example: "'Hot' and 'cold' are antonyms.", emoji: "↔️", arabic: "نقيض" },
      { word: "Derive", meaning: "To get from a source", example: "'Happiness' is derived from 'happy'.", emoji: "🔗", arabic: "يشتق" },
      { word: "Compound", meaning: "A word made of two words", example: "'Sunflower' is a compound word.", emoji: "🌻", arabic: "كلمة مركبة" },
      { word: "Collocation", meaning: "Words that often go together", example: "'Make a decision' is a collocation.", emoji: "🤝", arabic: "تلازم لفظي" },
      { word: "Etymology", meaning: "The origin and history of a word", example: "The etymology of 'telephone' is Greek.", emoji: "📜", arabic: "أصل الكلمة" },
      { word: "Cognate", meaning: "A word similar in two languages", example: "'Hotel' is a cognate in many languages.", emoji: "🌍", arabic: "كلمة مشتركة" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "If 'act' is the root, what words can you build from it?" },
      { speaker: "Student", text: "Action, actor, active, react, interact!" },
      { speaker: "Teacher", text: "Great! What prefix did you use in 'react'?" },
      { speaker: "Student", text: "'Re-' which means 'again' or 'back'." },
      { speaker: "Teacher", text: "Perfect! Understanding roots helps you learn thousands of words." },
    ],
    grammar: {
      title: "Common Prefixes & Suffixes",
      explanation: "Prefixes change meaning (un- = not, re- = again, pre- = before). Suffixes change word type (-tion = noun, -ly = adverb, -ful = adjective).",
      examples: [
        { sentence: "unhappy = un + happy (not happy)", note: "Prefix 'un-' means 'not'" },
        { sentence: "replay = re + play (play again)", note: "Prefix 're-' means 'again'" },
        { sentence: "beautiful = beauty + ful (full of beauty)", note: "Suffix '-ful' makes adjective" },
        { sentence: "quickly = quick + ly (in a quick way)", note: "Suffix '-ly' makes adverb" },
      ],
    },
    vocabExercises: [
      { question: "A 'prefix' is added:", options: ["After a word", "Before a root word", "In the middle", "Nowhere"], correct: 1 },
      { question: "'Happy' and 'glad' are:", options: ["Antonyms", "Synonyms", "Prefixes", "Roots"], correct: 1 },
    ],
    conversationExercises: [
      { question: "A 'compound word' is:", options: ["A short word", "Two words combined into one", "A prefix", "A suffix"], correct: 1 },
    ],
    grammarExercises: [
      { question: "The prefix 'un-' means:", options: ["Again", "Not", "Before", "After"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Antonym' means:", options: ["Same meaning", "Opposite meaning", "No meaning", "Root word"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Sunflower' is a ___ word.", options: ["Root", "Prefix", "Compound", "Suffix"], correct: 2 },
    ],
  },
  "vocab-build-3": {
    levelId: "vocab-build", levelLabel: "Vocabulary Building", lessonNumber: 3,
    title: "Context Clues Strategy",
    description: "Learn to guess word meanings from context without a dictionary.",
    vocabulary: [
      { word: "Context clue", meaning: "Hints in the text that reveal word meaning", example: "Use context clues to understand new words.", emoji: "🔎", arabic: "دليل سياقي" },
      { word: "Definition clue", meaning: "The text directly defines the word", example: "A peninsula, a piece of land surrounded by water on three sides...", emoji: "📖", arabic: "دليل تعريفي" },
      { word: "Example clue", meaning: "Examples help explain the word", example: "Citrus fruits, such as oranges and lemons...", emoji: "🍊", arabic: "دليل بالأمثلة" },
      { word: "Contrast clue", meaning: "Opposite words reveal meaning", example: "Unlike her timid sister, she was bold.", emoji: "↔️", arabic: "دليل بالتضاد" },
      { word: "Restate", meaning: "To say the same thing differently", example: "He was furious; in other words, very angry.", emoji: "🔄", arabic: "يعيد الصياغة" },
      { word: "Deduce", meaning: "To figure out from available information", example: "I deduced the meaning from the sentence.", emoji: "🧠", arabic: "يستنبط" },
      { word: "Unfamiliar", meaning: "Not known or recognized", example: "This word is unfamiliar to me.", emoji: "❓", arabic: "غير مألوف" },
      { word: "Approximate", meaning: "Close but not exact", example: "I got an approximate meaning.", emoji: "≈", arabic: "تقريبي" },
      { word: "Surrounding", meaning: "The words around a target word", example: "Look at surrounding words for clues.", emoji: "🔲", arabic: "محيط" },
      { word: "Strategy", meaning: "A plan or method", example: "Using context is a reading strategy.", emoji: "🎯", arabic: "استراتيجية" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Read: 'The dog was famished after the long walk.' What does 'famished' mean?" },
      { speaker: "Student", text: "I think it means very hungry, because it was after a long walk." },
      { speaker: "Teacher", text: "You used a context clue — the situation helped you guess." },
      { speaker: "Student", text: "So I don't always need a dictionary!" },
      { speaker: "Teacher", text: "Exactly! Context clues are a powerful reading strategy." },
    ],
    grammar: {
      title: "Signal Words for Context Clues",
      explanation: "Signal words help identify clue types: 'such as' (example), 'in other words' (restatement), 'unlike' (contrast), 'means' (definition).",
      examples: [
        { sentence: "Nocturnal animals, such as owls and bats, are active at night.", note: "'Such as' signals examples" },
        { sentence: "She was elated; in other words, extremely happy.", note: "'In other words' restates meaning" },
        { sentence: "Unlike the calm sea, the river was turbulent.", note: "'Unlike' signals contrast" },
        { sentence: "A habitat means the natural home of an animal.", note: "'Means' directly defines" },
      ],
    },
    vocabExercises: [
      { question: "A 'context clue' helps you:", options: ["Spell words", "Guess word meanings", "Write essays", "Count words"], correct: 1 },
      { question: "'Such as' signals a:", options: ["Definition", "Contrast", "Example", "Restatement"], correct: 2 },
    ],
    conversationExercises: [
      { question: "'Unlike' signals a:", options: ["Definition clue", "Example clue", "Contrast clue", "No clue"], correct: 2 },
    ],
    grammarExercises: [
      { question: "'In other words' is used for:", options: ["Examples", "Contrast", "Restatement", "Definition"], correct: 2 },
    ],
    examQuestions: [
      { question: "To 'deduce' means:", options: ["To guess randomly", "To figure out from clues", "To memorize", "To copy"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Approximate' means:", options: ["Exact", "Close but not exact", "Wrong", "Perfect"], correct: 1 },
    ],
  },
  "idioms-2": {
    levelId: "idioms", levelLabel: "Idioms & Expressions", lessonNumber: 2,
    title: "Body Idioms",
    description: "Learn English idioms related to body parts.",
    vocabulary: [
      { word: "Cold feet", meaning: "To become nervous before doing something", example: "He got cold feet before the wedding.", emoji: "🥶", arabic: "خوف قبل قرار" },
      { word: "Break a leg", meaning: "Good luck (in theater)", example: "Break a leg at the audition!", emoji: "🦵", arabic: "حظاً سعيداً" },
      { word: "Keep an eye on", meaning: "To watch carefully", example: "Keep an eye on the baby.", emoji: "👁️", arabic: "يراقب" },
      { word: "Give a hand", meaning: "To help someone", example: "Can you give me a hand?", emoji: "🤲", arabic: "يساعد" },
      { word: "Shoulder to cry on", meaning: "Someone who listens to your problems", example: "She's always a shoulder to cry on.", emoji: "😢", arabic: "سند عاطفي" },
      { word: "Pull someone's leg", meaning: "To joke with someone", example: "I'm just pulling your leg!", emoji: "😂", arabic: "يمزح مع" },
      { word: "All ears", meaning: "Listening carefully", example: "Tell me — I'm all ears.", emoji: "👂", arabic: "كله آذان صاغية" },
      { word: "Cost an arm and a leg", meaning: "Very expensive", example: "That car cost an arm and a leg.", emoji: "💰", arabic: "مكلف جداً" },
      { word: "Heart of gold", meaning: "A very kind person", example: "She has a heart of gold.", emoji: "💛", arabic: "قلب طيب" },
      { word: "See eye to eye", meaning: "To agree with someone", example: "We don't see eye to eye on politics.", emoji: "👀", arabic: "يتفق مع" },
    ],
    dialogue: [
      { speaker: "Sarah", text: "I'm so nervous about my presentation tomorrow!" },
      { speaker: "Mike", text: "Don't get cold feet! You'll do great. Break a leg!" },
      { speaker: "Sarah", text: "Thanks, Mike. You always know what to say. You have a heart of gold." },
      { speaker: "Mike", text: "I'm just pulling your leg — you're the best presenter I know!" },
      { speaker: "Sarah", text: "Ha! I'm all ears for any last-minute tips though." },
    ],
    grammar: {
      title: "Using Idioms Naturally",
      explanation: "Idioms are fixed expressions — don't change the words. Use them in informal speech. They make your English sound natural and fluent.",
      examples: [
        { sentence: "She got cold feet. (NOT 'cold foot' or 'cold legs')", note: "Keep the exact words" },
        { sentence: "Break a leg! (NOT 'break a hand')", note: "Don't substitute body parts" },
        { sentence: "It cost an arm and a leg. (= very expensive)", note: "Don't take literally" },
        { sentence: "We see eye to eye. (= we agree)", note: "The meaning isn't literal" },
      ],
    },
    vocabExercises: [
      { question: "'Cold feet' means:", options: ["Frozen toes", "Nervousness before something", "Walking barefoot", "Cold weather"], correct: 1 },
      { question: "'All ears' means:", options: ["Big ears", "Listening carefully", "Deaf", "Ignoring"], correct: 1 },
    ],
    conversationExercises: [
      { question: "'Break a leg' means:", options: ["Get hurt", "Good luck", "Be careful", "Run away"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'Cost an arm and a leg' means:", options: ["Free", "Cheap", "Very expensive", "Painful"], correct: 2 },
    ],
    examQuestions: [
      { question: "'Heart of gold' describes someone who is:", options: ["Rich", "Very kind", "Strong", "Brave"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'See eye to eye' means:", options: ["To stare", "To agree", "To fight", "To cry"], correct: 1 },
    ],
  },
  "idioms-3": {
    levelId: "idioms", levelLabel: "Idioms & Expressions", lessonNumber: 3,
    title: "Weather & Nature Idioms",
    description: "Master common idioms related to weather and nature.",
    vocabulary: [
      { word: "Under the weather", meaning: "Feeling sick", example: "I'm feeling under the weather today.", emoji: "🤒", arabic: "مريض" },
      { word: "A storm in a teacup", meaning: "A big fuss about something small", example: "It's just a storm in a teacup.", emoji: "🫖", arabic: "زوبعة في فنجان" },
      { word: "Break the ice", meaning: "To start a conversation", example: "Tell a joke to break the ice.", emoji: "🧊", arabic: "كسر الجمود" },
      { word: "Every cloud has a silver lining", meaning: "Something good in every bad situation", example: "Don't worry — every cloud has a silver lining.", emoji: "☁️", arabic: "في كل محنة منحة" },
      { word: "Tip of the iceberg", meaning: "Only a small part of a bigger problem", example: "This is just the tip of the iceberg.", emoji: "🏔️", arabic: "رأس جبل الجليد" },
      { word: "Weather the storm", meaning: "To survive a difficult time", example: "We'll weather the storm together.", emoji: "⛈️", arabic: "يتحمل الصعاب" },
      { word: "Calm before the storm", meaning: "A quiet period before trouble", example: "This peace is the calm before the storm.", emoji: "🌤️", arabic: "هدوء يسبق العاصفة" },
      { word: "Raining cats and dogs", meaning: "Raining very heavily", example: "Take an umbrella — it's raining cats and dogs!", emoji: "🌧️", arabic: "تمطر بغزارة" },
      { word: "Go with the flow", meaning: "To accept things as they happen", example: "Just go with the flow.", emoji: "🌊", arabic: "ماشي مع التيار" },
      { word: "Nip in the bud", meaning: "To stop something early", example: "Nip the problem in the bud.", emoji: "🌱", arabic: "يوقف من البداية" },
    ],
    dialogue: [
      { speaker: "Anna", text: "Are you okay? You look a bit under the weather." },
      { speaker: "David", text: "Yeah, I'm not feeling great. Plus, work is stressful." },
      { speaker: "Anna", text: "Remember, every cloud has a silver lining. Things will get better." },
      { speaker: "David", text: "You're right. I just need to weather the storm." },
      { speaker: "Anna", text: "Exactly! And let's go with the flow for now." },
    ],
    grammar: {
      title: "Idioms in Conversation",
      explanation: "Idioms add color to conversations. Use them naturally in context — don't force too many at once.",
      examples: [
        { sentence: "A: 'How are you?' B: 'A bit under the weather.'", note: "Natural way to say you're sick" },
        { sentence: "'It's raining cats and dogs outside!'", note: "Describing heavy rain casually" },
        { sentence: "'Let's break the ice with a fun game.'", note: "Starting a social situation" },
        { sentence: "'This delay is just the tip of the iceberg.'", note: "Implying bigger problems exist" },
      ],
    },
    vocabExercises: [
      { question: "'Under the weather' means:", options: ["Outside", "Feeling sick", "In the rain", "Happy"], correct: 1 },
      { question: "'Raining cats and dogs' means:", options: ["Animals falling", "Light rain", "Very heavy rain", "No rain"], correct: 2 },
    ],
    conversationExercises: [
      { question: "'Break the ice' means:", options: ["Break something frozen", "Start a conversation", "End a talk", "Be cold"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'Every cloud has a silver lining' means:", options: ["Clouds are silver", "Bad times have good aspects", "Weather changes", "Rain is coming"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Tip of the iceberg' means:", options: ["A cold place", "Only a small part visible", "A big mountain", "Ice cream"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Go with the flow' means:", options: ["Swim", "Accept things as they happen", "Fight back", "Run away"], correct: 1 },
    ],
  },
  "phrasal-2": {
    levelId: "phrasal", levelLabel: "Phrasal Verbs", lessonNumber: 2,
    title: "Phrasal Verbs for Daily Life",
    description: "Learn essential phrasal verbs used in everyday conversations.",
    vocabulary: [
      { word: "Wake up", meaning: "To stop sleeping", example: "I wake up at 7 AM.", emoji: "⏰", arabic: "يستيقظ" },
      { word: "Get up", meaning: "To rise from bed", example: "Get up! You'll be late.", emoji: "🛏️", arabic: "ينهض" },
      { word: "Turn on", meaning: "To switch on a device", example: "Turn on the lights, please.", emoji: "💡", arabic: "يشغّل" },
      { word: "Turn off", meaning: "To switch off a device", example: "Turn off the TV before bed.", emoji: "📺", arabic: "يطفئ" },
      { word: "Put on", meaning: "To wear clothing", example: "Put on your jacket — it's cold.", emoji: "🧥", arabic: "يرتدي" },
      { word: "Take off", meaning: "To remove clothing", example: "Take off your shoes at the door.", emoji: "👟", arabic: "يخلع" },
      { word: "Pick up", meaning: "To lift something from a surface", example: "Pick up the book from the floor.", emoji: "📚", arabic: "يلتقط" },
      { word: "Drop off", meaning: "To leave someone/something somewhere", example: "I'll drop you off at school.", emoji: "🚗", arabic: "يوصّل" },
      { word: "Run out of", meaning: "To have no more of something", example: "We ran out of milk.", emoji: "🥛", arabic: "ينفد من" },
      { word: "Look after", meaning: "To take care of", example: "Can you look after my cat?", emoji: "🐱", arabic: "يعتني بـ" },
    ],
    dialogue: [
      { speaker: "Mom", text: "Wake up! It's time to get up for school." },
      { speaker: "Ali", text: "Five more minutes... Can you turn on the lights?" },
      { speaker: "Mom", text: "Put on your uniform and come downstairs." },
      { speaker: "Ali", text: "We've run out of cereal! What should I eat?" },
      { speaker: "Mom", text: "I'll pick up some on my way home. Now hurry up!" },
    ],
    grammar: {
      title: "Separable vs Inseparable Phrasal Verbs",
      explanation: "Some phrasal verbs are separable (object goes in between): 'Turn the TV off.' Others are inseparable: 'Look after the baby.' (NOT 'Look the baby after.')",
      examples: [
        { sentence: "Turn off the TV. / Turn the TV off. ✅", note: "Separable — both work" },
        { sentence: "Put on your shoes. / Put your shoes on. ✅", note: "Separable — both work" },
        { sentence: "Look after the children. ✅", note: "Inseparable — can't separate" },
        { sentence: "Run out of milk. ✅", note: "Inseparable — three-word phrasal verb" },
      ],
    },
    vocabExercises: [
      { question: "'Run out of' means:", options: ["To run outside", "To have no more", "To exercise", "To throw away"], correct: 1 },
      { question: "'Drop off' means:", options: ["To fall", "To leave someone somewhere", "To sleep", "To pick up"], correct: 1 },
    ],
    conversationExercises: [
      { question: "'Look after' means:", options: ["Look behind", "Take care of", "Search for", "Ignore"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Which is separable?", options: ["Look after", "Run out of", "Turn off", "Come across"], correct: 2 },
    ],
    examQuestions: [
      { question: "'Pick up' means:", options: ["Put down", "Lift from a surface", "Throw away", "Break"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Take off' (clothing) means:", options: ["To wear", "To remove", "To buy", "To wash"], correct: 1 },
    ],
  },
  "phrasal-3": {
    levelId: "phrasal", levelLabel: "Phrasal Verbs", lessonNumber: 3,
    title: "Phrasal Verbs for Work & Study",
    description: "Master phrasal verbs commonly used in work and academic settings.",
    vocabulary: [
      { word: "Hand in", meaning: "To submit work", example: "Hand in your homework by Friday.", emoji: "📝", arabic: "يسلّم" },
      { word: "Figure out", meaning: "To solve or understand", example: "I need to figure out this problem.", emoji: "🧩", arabic: "يكتشف" },
      { word: "Catch up", meaning: "To reach the same level as others", example: "I need to catch up on my reading.", emoji: "🏃", arabic: "يلحق بـ" },
      { word: "Look up", meaning: "To search for information", example: "Look up the word in a dictionary.", emoji: "🔍", arabic: "يبحث عن" },
      { word: "Go over", meaning: "To review or check", example: "Let's go over the notes.", emoji: "📋", arabic: "يراجع" },
      { word: "Carry out", meaning: "To complete a task", example: "We need to carry out the experiment.", emoji: "🔬", arabic: "ينفذ" },
      { word: "Point out", meaning: "To show or mention", example: "She pointed out the mistake.", emoji: "👉", arabic: "يشير إلى" },
      { word: "Come up with", meaning: "To think of an idea", example: "He came up with a great plan.", emoji: "💡", arabic: "يبتكر" },
      { word: "Put off", meaning: "To postpone", example: "Don't put off your studies.", emoji: "⏰", arabic: "يؤجل" },
      { word: "Keep up with", meaning: "To stay at the same pace", example: "It's hard to keep up with the class.", emoji: "📊", arabic: "يواكب" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Please hand in your essays by Monday." },
      { speaker: "Student", text: "I'm still trying to figure out the conclusion." },
      { speaker: "Teacher", text: "Go over the outline we discussed. That should help." },
      { speaker: "Student", text: "Can I look up some examples online?" },
      { speaker: "Teacher", text: "Of course! But don't put it off until Sunday night." },
    ],
    grammar: {
      title: "Phrasal Verbs in Formal vs Informal",
      explanation: "Phrasal verbs are informal. In formal writing, use single-word equivalents: 'hand in' → 'submit', 'figure out' → 'determine', 'put off' → 'postpone'.",
      examples: [
        { sentence: "Informal: Hand in your work. Formal: Submit your work.", note: "Hand in = submit" },
        { sentence: "Informal: Figure out the answer. Formal: Determine the answer.", note: "Figure out = determine" },
        { sentence: "Informal: Put off the meeting. Formal: Postpone the meeting.", note: "Put off = postpone" },
        { sentence: "Informal: Come up with a plan. Formal: Devise a plan.", note: "Come up with = devise" },
      ],
    },
    vocabExercises: [
      { question: "'Hand in' means:", options: ["To hold", "To submit", "To wave", "To throw"], correct: 1 },
      { question: "'Put off' means:", options: ["To remove", "To postpone", "To put on", "To finish"], correct: 1 },
    ],
    conversationExercises: [
      { question: "'Come up with' means:", options: ["To arrive", "To think of an idea", "To climb", "To leave"], correct: 1 },
    ],
    grammarExercises: [
      { question: "The formal equivalent of 'figure out' is:", options: ["Find", "Determine", "See", "Look"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Carry out' means:", options: ["To carry outside", "To complete a task", "To carry bags", "To leave"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Catch up' means:", options: ["To catch a ball", "To reach the same level", "To run fast", "To fall behind"], correct: 1 },
    ],
  },
};
