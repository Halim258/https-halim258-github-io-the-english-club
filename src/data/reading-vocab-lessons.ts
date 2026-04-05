import { LessonData } from "./lessons";

export const readingVocabLessons: Record<string, LessonData> = {
  "reading-comp-1": {
    levelId: "reading-comp", levelLabel: "Reading Comprehension", lessonNumber: 1,
    title: "Skimming & Scanning Techniques",
    description: "Learn to quickly find information and understand main ideas in texts.",
    vocabulary: [
      { word: "Skim", meaning: "To read quickly for the main idea", example: "Skim the article to get the gist.", emoji: "👀", arabic: "يتصفح" },
      { word: "Scan", meaning: "To search for specific information", example: "Scan the text for the date.", emoji: "🔍", arabic: "يبحث" },
      { word: "Main idea", meaning: "The central point of a text", example: "The main idea is in the first paragraph.", emoji: "🎯", arabic: "الفكرة الرئيسية" },
      { word: "Detail", meaning: "A specific piece of information", example: "Find the detail about the author.", emoji: "📌", arabic: "تفصيل" },
      { word: "Heading", meaning: "A title for a section", example: "Read headings before the full text.", emoji: "📑", arabic: "عنوان فرعي" },
      { word: "Paragraph", meaning: "A section of writing", example: "Each paragraph has one main idea.", emoji: "📄", arabic: "فقرة" },
      { word: "Topic sentence", meaning: "The first sentence stating the main point", example: "The topic sentence introduces the idea.", emoji: "📝", arabic: "جملة رئيسية" },
      { word: "Keyword", meaning: "An important word to look for", example: "Search for keywords to find answers.", emoji: "🔑", arabic: "كلمة مفتاحية" },
      { word: "Context", meaning: "The surrounding information", example: "Use context to understand new words.", emoji: "📖", arabic: "سياق" },
      { word: "Gist", meaning: "The general meaning", example: "I got the gist of the article.", emoji: "💡", arabic: "المعنى العام" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Before reading the whole article, what should you do first?" },
      { speaker: "Student", text: "Skim it — read the headings and first sentences of each paragraph." },
      { speaker: "Teacher", text: "Exactly! And if you need a specific date or name?" },
      { speaker: "Student", text: "I should scan — look for keywords without reading everything." },
      { speaker: "Teacher", text: "Perfect! Skimming for the big picture, scanning for details." },
    ],
    grammar: {
      title: "Reading Strategy Signals",
      explanation: "Texts use signal words to organize ideas: 'First', 'However', 'In conclusion', 'For example'. Recognizing these helps comprehension.",
      examples: [
        { sentence: "Firstly, the study examined the effects.", note: "'Firstly' introduces the first point" },
        { sentence: "However, the results were unexpected.", note: "'However' signals a contrast" },
        { sentence: "For example, many students improved.", note: "'For example' introduces evidence" },
        { sentence: "In conclusion, reading is essential.", note: "'In conclusion' signals the ending" },
      ],
    },
    vocabExercises: [
      { question: "'Skim' means:", options: ["Read every word", "Read quickly for main idea", "Read slowly", "Skip the text"], correct: 1 },
      { question: "A 'topic sentence' is usually:", options: ["The last sentence", "The first sentence", "In the middle", "Not in the paragraph"], correct: 1 },
      { question: "'Gist' means:", options: ["Exact details", "The general meaning", "A question", "A heading"], correct: 1 },
    ],
    conversationExercises: [
      { question: "When do you scan a text?", options: ["To enjoy it", "To find specific info", "To memorize it", "To write about it"], correct: 1 },
      { question: "What helps you understand unknown words?", options: ["A dictionary only", "Context clues", "Skipping them", "Guessing randomly"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'However' signals:", options: ["Addition", "Contrast", "Example", "Conclusion"], correct: 1 },
      { question: "Signal words help with:", options: ["Pronunciation", "Text organization", "Spelling", "Grammar rules"], correct: 1 },
    ],
    examQuestions: [
      { question: "The best order for reading an article is:", options: ["Read word by word", "Skim headings → read → review", "Start from the end", "Only read the first line"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "A 'keyword' is:", options: ["Any word", "An important word to search for", "A heading", "A paragraph"], correct: 1 },
    ],
  },
  "reading-comp-2": {
    levelId: "reading-comp", levelLabel: "Reading Comprehension", lessonNumber: 2,
    title: "Making Inferences",
    description: "Learn to read between the lines and draw conclusions from text.",
    vocabulary: [
      { word: "Inference", meaning: "A conclusion based on evidence", example: "Make an inference from the clues.", emoji: "🔍", arabic: "استنتاج" },
      { word: "Imply", meaning: "To suggest without saying directly", example: "The author implies that change is needed.", emoji: "💭", arabic: "يُلمّح" },
      { word: "Evidence", meaning: "Information supporting a conclusion", example: "What evidence supports your answer?", emoji: "📊", arabic: "دليل" },
      { word: "Clue", meaning: "A hint that helps understanding", example: "The text gives several clues.", emoji: "🕵️", arabic: "تلميح" },
      { word: "Conclude", meaning: "To reach a decision based on info", example: "We can conclude that he was upset.", emoji: "✅", arabic: "يستنتج" },
      { word: "Assumption", meaning: "Something accepted as true without proof", example: "Don't make assumptions without evidence.", emoji: "🤔", arabic: "افتراض" },
      { word: "Interpret", meaning: "To explain the meaning of something", example: "How do you interpret this passage?", emoji: "📖", arabic: "يُفسّر" },
      { word: "Tone", meaning: "The author's attitude", example: "The tone is sarcastic.", emoji: "🎭", arabic: "نبرة" },
      { word: "Purpose", meaning: "The reason for writing", example: "The purpose is to persuade.", emoji: "🎯", arabic: "غرض" },
      { word: "Explicit", meaning: "Stated clearly and directly", example: "The answer is explicit in paragraph 2.", emoji: "📢", arabic: "صريح" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "The character slammed the door and didn't speak. How did she feel?" },
      { speaker: "Student", text: "She was probably angry or frustrated." },
      { speaker: "Teacher", text: "Good inference! The text didn't say 'angry' — you read between the lines." },
      { speaker: "Student", text: "So inference means using clues to figure out what's not directly said?" },
      { speaker: "Teacher", text: "Exactly! It's like being a detective with words." },
    ],
    grammar: {
      title: "Language of Inference",
      explanation: "Use specific phrases when making inferences: 'This suggests that...', 'We can infer that...', 'It seems likely that...'",
      examples: [
        { sentence: "This suggests that the character is nervous.", note: "'Suggests' — soft inference" },
        { sentence: "We can infer that the economy is declining.", note: "'Can infer' — evidence-based conclusion" },
        { sentence: "It seems likely that she will resign.", note: "'Seems likely' — probability" },
        { sentence: "The evidence indicates that...", note: "'Indicates' — points toward a conclusion" },
      ],
    },
    vocabExercises: [
      { question: "'Imply' means:", options: ["To state directly", "To suggest without saying", "To ask", "To deny"], correct: 1 },
      { question: "'Explicit' means:", options: ["Hidden", "Stated clearly", "Implied", "Unknown"], correct: 1 },
    ],
    conversationExercises: [
      { question: "Making an inference requires:", options: ["Guessing randomly", "Using text clues and evidence", "Asking the author", "Reading the title only"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'This suggests that...' is used for:", options: ["Stating facts", "Making inferences", "Asking questions", "Giving orders"], correct: 1 },
    ],
    examQuestions: [
      { question: "The author's 'tone' is:", options: ["The font used", "The author's attitude", "The length of text", "The topic"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "An 'assumption' is:", options: ["A proven fact", "Something accepted without proof", "An inference", "A clue"], correct: 1 },
    ],
  },
  "vocab-build-1": {
    levelId: "vocab-build", levelLabel: "Vocabulary Building", lessonNumber: 1,
    title: "Word Roots & Families",
    description: "Learn to decode new words by understanding roots, prefixes, and suffixes.",
    vocabulary: [
      { word: "Root", meaning: "The base part of a word", example: "'Act' is the root of 'action'.", emoji: "🌱", arabic: "جذر" },
      { word: "Prefix", meaning: "Letters added before a root", example: "'Un-' makes 'happy' → 'unhappy'.", emoji: "➡️", arabic: "بادئة" },
      { word: "Suffix", meaning: "Letters added after a root", example: "'-tion' makes 'act' → 'action'.", emoji: "⬅️", arabic: "لاحقة" },
      { word: "Derivation", meaning: "Creating new words from a root", example: "'Play' → 'player', 'playful', 'replay'.", emoji: "🔄", arabic: "اشتقاق" },
      { word: "Etymology", meaning: "The origin and history of a word", example: "'Telephone' comes from Greek.", emoji: "📜", arabic: "أصل الكلمة" },
      { word: "Compound", meaning: "A word made from two words", example: "'Bookshelf' = 'book' + 'shelf'.", emoji: "🔗", arabic: "كلمة مركبة" },
      { word: "Synonym", meaning: "A word with similar meaning", example: "'Happy' and 'glad' are synonyms.", emoji: "🔁", arabic: "مرادف" },
      { word: "Antonym", meaning: "A word with opposite meaning", example: "'Hot' and 'cold' are antonyms.", emoji: "↕️", arabic: "مضاد" },
      { word: "Collocation", meaning: "Words that naturally go together", example: "'Make a decision' — not 'do a decision'.", emoji: "🤝", arabic: "متلازمة لفظية" },
      { word: "Word family", meaning: "A group of related words", example: "Act, action, active, actor, activity.", emoji: "👨‍👩‍👧‍👦", arabic: "عائلة كلمات" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "If 'bio' means 'life', what does 'biology' mean?" },
      { speaker: "Student", text: "The study of life! 'Bio' + 'logy' = study of life." },
      { speaker: "Teacher", text: "Excellent! Now, what about 'autobiography'?" },
      { speaker: "Student", text: "'Auto' means self, 'bio' means life, 'graphy' means writing — so it's writing about your own life!" },
      { speaker: "Teacher", text: "You've just decoded a word using roots! This works with thousands of English words." },
    ],
    grammar: {
      title: "Common Word Roots from Latin & Greek",
      explanation: "Many English words come from Latin and Greek roots. Knowing these roots helps you guess meanings of unfamiliar words.",
      examples: [
        { sentence: "Port (carry): transport, portable, import, export", note: "'Port' = to carry → transport = carry across" },
        { sentence: "Scrib/Script (write): describe, manuscript, prescription", note: "'Scrib' = to write" },
        { sentence: "Aud (hear): audience, audio, auditorium", note: "'Aud' = to hear" },
        { sentence: "Vis/Vid (see): visible, video, vision", note: "'Vis' = to see" },
      ],
    },
    vocabExercises: [
      { question: "A 'prefix' is added:", options: ["After the root", "Before the root", "In the middle", "Nowhere"], correct: 1 },
      { question: "If 'port' means 'carry', 'export' means:", options: ["Carry in", "Carry out", "Carry up", "Carry down"], correct: 1 },
    ],
    conversationExercises: [
      { question: "'Autobiography' breaks into:", options: ["Auto+bio+graph", "Aut+obio+graphy", "A+uto+biography", "Auto+biog+raphy"], correct: 0 },
    ],
    grammarExercises: [
      { question: "'Un-' is a prefix meaning:", options: ["Again", "Not", "Before", "After"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Etymology' studies:", options: ["Grammar", "Word origins", "Pronunciation", "Spelling"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "A 'collocation' is:", options: ["A random pair", "Words that naturally go together", "A single word", "A root"], correct: 1 },
    ],
  },
  "idioms-1": {
    levelId: "idioms", levelLabel: "Idioms & Expressions", lessonNumber: 1,
    title: "Everyday English Idioms",
    description: "Learn the most common idioms used in daily English conversations.",
    vocabulary: [
      { word: "Break the ice", meaning: "To start a conversation in a social setting", example: "He told a joke to break the ice.", emoji: "🧊", arabic: "يكسر الجمود" },
      { word: "Piece of cake", meaning: "Something very easy", example: "The test was a piece of cake!", emoji: "🍰", arabic: "سهل جداً" },
      { word: "Hit the nail on the head", meaning: "To be exactly right", example: "You hit the nail on the head!", emoji: "🔨", arabic: "أصاب كبد الحقيقة" },
      { word: "Under the weather", meaning: "Feeling sick", example: "I'm feeling under the weather today.", emoji: "🌧️", arabic: "يشعر بالمرض" },
      { word: "Cost an arm and a leg", meaning: "Very expensive", example: "That car cost an arm and a leg!", emoji: "💰", arabic: "مكلف جداً" },
      { word: "Let the cat out of the bag", meaning: "To reveal a secret", example: "She let the cat out of the bag about the party.", emoji: "🐱", arabic: "يفشي السر" },
      { word: "Once in a blue moon", meaning: "Very rarely", example: "We go there once in a blue moon.", emoji: "🌙", arabic: "نادراً جداً" },
      { word: "Bite the bullet", meaning: "To endure something difficult", example: "I had to bite the bullet and apologize.", emoji: "😬", arabic: "يتحمل الصعوبة" },
      { word: "On the same page", meaning: "In agreement", example: "Let's make sure we're on the same page.", emoji: "📄", arabic: "متفقون" },
      { word: "Burn the midnight oil", meaning: "To work late at night", example: "She burned the midnight oil studying.", emoji: "🕯️", arabic: "يسهر للعمل" },
    ],
    dialogue: [
      { speaker: "Sara", text: "How was your exam?" },
      { speaker: "Ali", text: "It was a piece of cake! I studied hard last night — burned the midnight oil." },
      { speaker: "Sara", text: "Great! I was feeling under the weather, so I couldn't study much." },
      { speaker: "Ali", text: "Oh no! I hope you're better now. You should bite the bullet and rest." },
      { speaker: "Sara", text: "You hit the nail on the head — rest is what I need!" },
    ],
    grammar: {
      title: "Using Idioms Naturally",
      explanation: "Idioms are fixed expressions — you can't change the words. Use them in informal speech and writing to sound natural.",
      examples: [
        { sentence: "The exam was a piece of cake. (Easy)", note: "Don't say 'a piece of pie' — it's fixed" },
        { sentence: "I'm feeling under the weather. (Sick)", note: "Used casually, not in medical contexts" },
        { sentence: "Let's not let the cat out of the bag. (Keep the secret)", note: "Informal — don't use in formal writing" },
        { sentence: "That only happens once in a blue moon. (Rarely)", note: "Emphasizes rarity" },
      ],
    },
    vocabExercises: [
      { question: "'Piece of cake' means:", options: ["A dessert", "Very easy", "Very hard", "A celebration"], correct: 1 },
      { question: "'Under the weather' means:", options: ["Outside", "Feeling sick", "Happy", "Cold"], correct: 1 },
      { question: "'Once in a blue moon' means:", options: ["Every month", "Very rarely", "At night", "During rain"], correct: 1 },
    ],
    conversationExercises: [
      { question: "To 'break the ice' means:", options: ["Break something frozen", "Start a conversation", "End a fight", "Tell a secret"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Can you change words in an idiom?", options: ["Yes, freely", "No, they're fixed", "Sometimes", "Only verbs"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Burn the midnight oil' means:", options: ["Cook late", "Work late at night", "Use a lamp", "Have a fire"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Cost an arm and a leg' means:", options: ["Free", "Very expensive", "Cheap", "Painful"], correct: 1 },
    ],
  },
  "phrasal-1": {
    levelId: "phrasal", levelLabel: "Phrasal Verbs", lessonNumber: 1,
    title: "Essential Phrasal Verbs",
    description: "Master the most common phrasal verbs used in everyday English.",
    vocabulary: [
      { word: "Look up", meaning: "To search for information", example: "I looked up the word in the dictionary.", emoji: "🔍", arabic: "يبحث عن" },
      { word: "Give up", meaning: "To stop trying", example: "Don't give up — keep practicing!", emoji: "🏳️", arabic: "يستسلم" },
      { word: "Turn on/off", meaning: "To start/stop a device", example: "Turn off the lights before leaving.", emoji: "💡", arabic: "يشغّل / يطفئ" },
      { word: "Pick up", meaning: "To lift / to learn casually", example: "I picked up some Spanish on vacation.", emoji: "📦", arabic: "يلتقط / يتعلم" },
      { word: "Put off", meaning: "To postpone", example: "Don't put off your homework.", emoji: "⏰", arabic: "يؤجل" },
      { word: "Find out", meaning: "To discover", example: "I found out the truth.", emoji: "🕵️", arabic: "يكتشف" },
      { word: "Come across", meaning: "To find by chance", example: "I came across an old photo.", emoji: "📸", arabic: "يصادف" },
      { word: "Run out of", meaning: "To have no more of something", example: "We ran out of milk.", emoji: "🥛", arabic: "ينفد" },
      { word: "Get along", meaning: "To have a good relationship", example: "Do you get along with your neighbors?", emoji: "🤝", arabic: "ينسجم مع" },
      { word: "Bring up", meaning: "To mention a topic", example: "She brought up an interesting point.", emoji: "💬", arabic: "يطرح موضوع" },
    ],
    dialogue: [
      { speaker: "Friend", text: "Did you find out what happened?" },
      { speaker: "You", text: "Yes! I came across the article online and looked up all the details." },
      { speaker: "Friend", text: "I can't believe they put off the event again." },
      { speaker: "You", text: "I know. But don't give up — they'll reschedule." },
      { speaker: "Friend", text: "You're right. Let's not bring up the delay to the organizers." },
    ],
    grammar: {
      title: "Separable vs. Inseparable Phrasal Verbs",
      explanation: "Some phrasal verbs can be separated (turn the light off) and some can't (look after the baby — not 'look the baby after').",
      examples: [
        { sentence: "Turn off the TV. / Turn the TV off. (Separable)", note: "Object can go in the middle or after" },
        { sentence: "I came across a great book. (Inseparable)", note: "Object must go after the whole phrase" },
        { sentence: "Pick it up. NOT: Pick up it. (Pronoun rule)", note: "Pronouns MUST go in the middle" },
        { sentence: "I look after my sister. (Inseparable)", note: "Can't say 'look my sister after'" },
      ],
    },
    vocabExercises: [
      { question: "'Give up' means:", options: ["To start", "To stop trying", "To give a gift", "To go up"], correct: 1 },
      { question: "'Run out of' means:", options: ["To exercise", "To have no more", "To escape", "To fill up"], correct: 1 },
    ],
    conversationExercises: [
      { question: "'Come across' means:", options: ["To cross a road", "To find by chance", "To be angry", "To leave"], correct: 1 },
    ],
    grammarExercises: [
      { question: "With pronouns, separable phrasal verbs:", options: ["Stay together", "Must be separated", "Are never used", "Become inseparable"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Put off' means:", options: ["To remove", "To postpone", "To put on", "To cancel"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Bring up' means:", options: ["To carry upstairs", "To mention a topic", "To raise a child only", "To wake up"], correct: 1 },
    ],
  },
};
