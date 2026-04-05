import { LessonData } from "./lessons";

export const professionalGrammarExtra: Record<string, LessonData> = {
  "professional-6": {
    levelId: "professional", levelLabel: "Professional English", lessonNumber: 6,
    title: "Negotiation Skills",
    description: "Learn vocabulary and techniques for successful business negotiations.",
    vocabulary: [
      { word: "Negotiate", meaning: "To discuss terms to reach agreement", example: "They negotiated a new contract.", emoji: "🤝", arabic: "يُفاوض" },
      { word: "Proposal", meaning: "A formal suggestion", example: "We submitted a proposal.", emoji: "📑", arabic: "اقتراح" },
      { word: "Leverage", meaning: "Advantage used in negotiation", example: "Our data gives us leverage.", emoji: "⚖️", arabic: "نفوذ" },
      { word: "Deadline", meaning: "The final date for completion", example: "The deadline is next Friday.", emoji: "⏰", arabic: "موعد نهائي" },
      { word: "Terms", meaning: "Conditions of an agreement", example: "We agreed on the terms.", emoji: "📋", arabic: "شروط" },
      { word: "Concession", meaning: "Something given up in a deal", example: "Both sides made concessions.", emoji: "↔️", arabic: "تنازل" },
      { word: "Stakeholder", meaning: "Someone with interest in a project", example: "All stakeholders were consulted.", emoji: "👥", arabic: "طرف معني" },
      { word: "Counter-offer", meaning: "A response offer to an initial one", example: "They made a counter-offer.", emoji: "🔄", arabic: "عرض مقابل" },
      { word: "Win-win", meaning: "Beneficial for both parties", example: "We found a win-win solution.", emoji: "✅", arabic: "مكسب للطرفين" },
      { word: "Bottom line", meaning: "The final or lowest acceptable point", example: "Our bottom line is $10,000.", emoji: "📊", arabic: "الحد الأدنى" },
    ],
    dialogue: [
      { speaker: "Client", text: "We'd like to discuss the pricing for the annual contract." },
      { speaker: "Sales Manager", text: "Of course. We can offer a 15% discount for a two-year commitment." },
      { speaker: "Client", text: "That's interesting, but we were hoping for 20%." },
      { speaker: "Sales Manager", text: "How about 18% if you include the premium package?" },
      { speaker: "Client", text: "That sounds like a win-win. Let's review the terms." },
    ],
    grammar: {
      title: "Conditional Sentences in Negotiation",
      explanation: "Use conditionals to propose deals: 'If you agree to X, we can offer Y.' Type 1 (real) and Type 2 (hypothetical) are common.",
      examples: [
        { sentence: "If you sign today, we'll include free shipping.", note: "Type 1 — real offer" },
        { sentence: "If we could lower the price, would you commit?", note: "Type 2 — hypothetical proposal" },
        { sentence: "We'd be happy to extend the warranty if you order 100 units.", note: "Type 2 polite offer" },
        { sentence: "If the terms are acceptable, we'll proceed.", note: "Type 1 — conditional agreement" },
      ],
    },
    vocabExercises: [
      { question: "'Leverage' in negotiation means:", options: ["A tool", "An advantage", "A weakness", "A deadline"], correct: 1 },
      { question: "A 'concession' is:", options: ["A victory", "Something given up", "A proposal", "A meeting"], correct: 1 },
    ],
    conversationExercises: [
      { question: "How do you propose a deal?", options: ["Take it or leave it", "If you agree to X, we can offer Y", "I don't care", "Maybe later"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'If you ___ today, we'll give 20% off.'", options: ["signed", "sign", "signing", "signs"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Bottom line' means:", options: ["The last page", "The lowest acceptable point", "A type of graph", "A summary"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "A 'stakeholder' is:", options: ["A type of meat", "Someone with interest in a project", "A negotiation tool", "A deadline"], correct: 1 },
    ],
  },
  "professional-7": {
    levelId: "professional", levelLabel: "Professional English", lessonNumber: 7,
    title: "Meetings & Teamwork",
    description: "Master the language of leading and participating in meetings.",
    vocabulary: [
      { word: "Agenda", meaning: "A list of topics for a meeting", example: "Let's review the agenda.", emoji: "📝", arabic: "جدول أعمال" },
      { word: "Minutes", meaning: "Written record of a meeting", example: "Who's taking the minutes?", emoji: "📄", arabic: "محضر" },
      { word: "Chairperson", meaning: "The person leading a meeting", example: "The chairperson opened the meeting.", emoji: "🪑", arabic: "رئيس الجلسة" },
      { word: "Brainstorm", meaning: "To generate ideas freely", example: "Let's brainstorm solutions.", emoji: "🧠", arabic: "عصف ذهني" },
      { word: "Action item", meaning: "A task assigned during a meeting", example: "Your action item is to prepare the report.", emoji: "✅", arabic: "بند عمل" },
      { word: "Consensus", meaning: "General agreement", example: "We reached a consensus.", emoji: "🤝", arabic: "إجماع" },
      { word: "Follow-up", meaning: "Action taken after a meeting", example: "I'll send a follow-up email.", emoji: "📧", arabic: "متابعة" },
      { word: "Participant", meaning: "A person taking part", example: "All participants agreed.", emoji: "👤", arabic: "مشارك" },
      { word: "Adjourn", meaning: "To end a meeting formally", example: "Let's adjourn until tomorrow.", emoji: "🔚", arabic: "يُرفع الجلسة" },
      { word: "Delegate", meaning: "To assign a task to someone", example: "Delegate tasks to your team.", emoji: "📋", arabic: "يُفوّض" },
    ],
    dialogue: [
      { speaker: "Chair", text: "Good morning everyone. Let's go through today's agenda." },
      { speaker: "Team Member", text: "Before we start, can I add an item about the Q3 budget?" },
      { speaker: "Chair", text: "Of course. We'll cover that after item two." },
      { speaker: "Team Member", text: "Great. Also, who's taking the minutes today?" },
      { speaker: "Chair", text: "Sara volunteered. Let's begin with the first item." },
    ],
    grammar: {
      title: "Polite Requests & Suggestions in Meetings",
      explanation: "Use modal verbs for politeness: 'Could we...?', 'Shall we...?', 'I'd suggest...', 'Would it be possible to...?'",
      examples: [
        { sentence: "Could we move on to the next item?", note: "'Could we' — polite request" },
        { sentence: "I'd suggest we postpone this discussion.", note: "'I'd suggest' — soft recommendation" },
        { sentence: "Shall we take a five-minute break?", note: "'Shall we' — polite suggestion" },
        { sentence: "Would it be possible to reschedule?", note: "Very formal polite request" },
      ],
    },
    vocabExercises: [
      { question: "'Minutes' in a meeting context means:", options: ["Time units", "Written record", "A break", "A summary"], correct: 1 },
      { question: "To 'adjourn' means:", options: ["To start", "To end formally", "To argue", "To agree"], correct: 1 },
    ],
    conversationExercises: [
      { question: "How do you add an item to the agenda?", options: ["Just interrupt", "Could I add an item?", "It doesn't matter", "Talk louder"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'___ we move to the next topic?'", options: ["Will", "Shall", "Must", "Do"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Brainstorm' means:", options: ["A weather event", "To generate ideas freely", "To argue", "To take notes"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "An 'action item' is:", options: ["A movie", "A task assigned during a meeting", "A break", "An agenda"], correct: 1 },
    ],
  },
  "professional-8": {
    levelId: "professional", levelLabel: "Professional English", lessonNumber: 8,
    title: "Job Interviews Advanced",
    description: "Advanced interview techniques including behavioral questions and STAR method.",
    vocabulary: [
      { word: "Behavioral question", meaning: "A question about past actions", example: "Tell me about a time you led a team.", emoji: "💼", arabic: "سؤال سلوكي" },
      { word: "STAR method", meaning: "Situation, Task, Action, Result", example: "Use the STAR method to structure answers.", emoji: "⭐", arabic: "طريقة ستار" },
      { word: "Strengths", meaning: "Things you're good at", example: "My strengths include communication.", emoji: "💪", arabic: "نقاط قوة" },
      { word: "Weaknesses", meaning: "Areas for improvement", example: "I'm working on my time management.", emoji: "🔧", arabic: "نقاط ضعف" },
      { word: "Leadership", meaning: "The ability to guide others", example: "She demonstrated strong leadership.", emoji: "👑", arabic: "قيادة" },
      { word: "Initiative", meaning: "Taking action without being told", example: "He showed great initiative.", emoji: "🚀", arabic: "مبادرة" },
      { word: "Adaptable", meaning: "Able to adjust to change", example: "Be adaptable in new situations.", emoji: "🔄", arabic: "قابل للتكيف" },
      { word: "Accomplishment", meaning: "Something achieved successfully", example: "My biggest accomplishment was...", emoji: "🏆", arabic: "إنجاز" },
      { word: "Reference", meaning: "A person who vouches for you", example: "I have three professional references.", emoji: "📞", arabic: "مرجع" },
      { word: "Follow-up", meaning: "Contact after an interview", example: "Send a follow-up thank-you email.", emoji: "📧", arabic: "متابعة" },
    ],
    dialogue: [
      { speaker: "Interviewer", text: "Tell me about a time you handled a difficult situation at work." },
      { speaker: "Candidate", text: "In my previous role, our team missed a deadline due to unexpected issues." },
      { speaker: "Interviewer", text: "What did you do?" },
      { speaker: "Candidate", text: "I organized daily check-ins, redistributed tasks, and we delivered within a week." },
      { speaker: "Interviewer", text: "And what was the result?" },
    ],
    grammar: {
      title: "Past Tenses for STAR Method Answers",
      explanation: "Use Past Simple for actions, Past Perfect for background context, and present results with Present Perfect.",
      examples: [
        { sentence: "The situation was that we had lost a major client.", note: "Past Perfect for background" },
        { sentence: "I organized a recovery plan immediately.", note: "Past Simple for actions taken" },
        { sentence: "As a result, we have maintained a 95% retention rate.", note: "Present Perfect for ongoing results" },
        { sentence: "I had never managed a team before that project.", note: "Past Perfect for earlier experience" },
      ],
    },
    vocabExercises: [
      { question: "STAR stands for:", options: ["Skills, Tasks, Actions, Results", "Situation, Task, Action, Result", "Strengths, Talents, Abilities, Resources", "None"], correct: 1 },
      { question: "'Initiative' means:", options: ["Being lazy", "Taking action without being told", "Following orders", "Waiting"], correct: 1 },
    ],
    conversationExercises: [
      { question: "How should you answer behavioral questions?", options: ["With one word", "Using the STAR method", "By guessing", "Say I don't know"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'I ___ never managed a team before that.'", options: ["have", "had", "was", "am"], correct: 1 },
    ],
    examQuestions: [
      { question: "An 'accomplishment' is:", options: ["A failure", "Something achieved successfully", "A weakness", "A question"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Adaptable' means:", options: ["Rigid", "Able to adjust to change", "Lazy", "Fast"], correct: 1 },
    ],
  },
  "professional-9": {
    levelId: "professional", levelLabel: "Professional English", lessonNumber: 9,
    title: "Report Writing & Data Presentation",
    description: "Learn to write clear reports and present data professionally.",
    vocabulary: [
      { word: "Data", meaning: "Facts and statistics collected", example: "The data shows a 20% increase.", emoji: "📊", arabic: "بيانات" },
      { word: "Chart", meaning: "A visual display of data", example: "Look at this bar chart.", emoji: "📈", arabic: "رسم بياني" },
      { word: "Trend", meaning: "A general direction of change", example: "There's an upward trend in sales.", emoji: "📉", arabic: "اتجاه" },
      { word: "Analysis", meaning: "Detailed examination", example: "Our analysis revealed key insights.", emoji: "🔍", arabic: "تحليل" },
      { word: "Recommendation", meaning: "A suggestion for action", example: "My recommendation is to invest more.", emoji: "💡", arabic: "توصية" },
      { word: "Findings", meaning: "Results of research", example: "The findings were surprising.", emoji: "🔬", arabic: "نتائج" },
      { word: "Significant", meaning: "Important or large enough to notice", example: "There was a significant improvement.", emoji: "⭐", arabic: "ملحوظ" },
      { word: "Decline", meaning: "A decrease", example: "Sales showed a decline in Q2.", emoji: "📉", arabic: "انخفاض" },
      { word: "Benchmark", meaning: "A standard for comparison", example: "We use industry benchmarks.", emoji: "🎯", arabic: "معيار مرجعي" },
      { word: "Executive summary", meaning: "A brief overview of a report", example: "Start with an executive summary.", emoji: "📝", arabic: "ملخص تنفيذي" },
    ],
    dialogue: [
      { speaker: "Manager", text: "Can you present the quarterly report?" },
      { speaker: "Analyst", text: "Certainly. As you can see from this chart, revenue increased by 15%." },
      { speaker: "Manager", text: "That's significant. What drove this growth?" },
      { speaker: "Analyst", text: "Our analysis shows the new marketing campaign was the main factor." },
      { speaker: "Manager", text: "Excellent. What are your recommendations?" },
    ],
    grammar: {
      title: "Language for Describing Trends",
      explanation: "Use specific verbs and adverbs: 'increased sharply', 'declined gradually', 'remained stable', 'fluctuated'.",
      examples: [
        { sentence: "Sales increased sharply in the first quarter.", note: "'Sharply' = large, fast increase" },
        { sentence: "Costs declined gradually over the year.", note: "'Gradually' = slow decrease" },
        { sentence: "The market remained stable throughout July.", note: "'Remained stable' = no change" },
        { sentence: "Prices fluctuated between $10 and $15.", note: "'Fluctuated' = went up and down" },
      ],
    },
    vocabExercises: [
      { question: "'Benchmark' means:", options: ["A type of chair", "A standard for comparison", "A chart", "A decline"], correct: 1 },
      { question: "'Findings' are:", options: ["Lost items", "Results of research", "Opinions", "Guesses"], correct: 1 },
    ],
    conversationExercises: [
      { question: "How do you describe a fast increase?", options: ["Rose slightly", "Increased sharply", "Declined", "Remained stable"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'Sales ___ gradually over the year.'", options: ["declined", "declining", "decline", "declines"], correct: 0 },
    ],
    examQuestions: [
      { question: "An 'executive summary' is:", options: ["A full report", "A brief overview", "A chart", "A recommendation"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Significant' means:", options: ["Tiny", "Important or noticeable", "Invisible", "Random"], correct: 1 },
    ],
  },
  "professional-10": {
    levelId: "professional", levelLabel: "Professional English", lessonNumber: 10,
    title: "Cross-Cultural Business Communication",
    description: "Navigate international business settings with cultural awareness.",
    vocabulary: [
      { word: "Protocol", meaning: "Official rules of conduct", example: "Follow business protocol when visiting Japan.", emoji: "📜", arabic: "بروتوكول" },
      { word: "Hierarchy", meaning: "System of ranking people", example: "Some companies have a strict hierarchy.", emoji: "📊", arabic: "تسلسل هرمي" },
      { word: "Formality", meaning: "The level of officialness", example: "Business emails require formality.", emoji: "👔", arabic: "رسمية" },
      { word: "Rapport", meaning: "A friendly relationship", example: "Build rapport before discussing business.", emoji: "🤝", arabic: "علاقة ودية" },
      { word: "Time zone", meaning: "A region with the same time", example: "Consider time zones when scheduling.", emoji: "🌐", arabic: "منطقة زمنية" },
      { word: "Virtual meeting", meaning: "An online meeting", example: "We had a virtual meeting via Zoom.", emoji: "💻", arabic: "اجتماع افتراضي" },
      { word: "Body language", meaning: "Communication through gestures", example: "Body language varies by culture.", emoji: "🧍", arabic: "لغة جسد" },
      { word: "Small talk", meaning: "Light casual conversation", example: "Start with small talk before the meeting.", emoji: "💬", arabic: "حديث عابر" },
      { word: "Direct", meaning: "Straightforward communication", example: "Germans tend to be direct.", emoji: "➡️", arabic: "مباشر" },
      { word: "Indirect", meaning: "Communication through hints", example: "Some cultures prefer indirect communication.", emoji: "↪️", arabic: "غير مباشر" },
    ],
    dialogue: [
      { speaker: "Director", text: "Our new partners are from South Korea. Any cultural tips?" },
      { speaker: "Advisor", text: "Yes. Hierarchy is very important — address the senior person first." },
      { speaker: "Director", text: "Good to know. What about business cards?" },
      { speaker: "Advisor", text: "Present and receive them with both hands. It shows respect." },
      { speaker: "Director", text: "Excellent. Building rapport through small talk is also important, right?" },
    ],
    grammar: {
      title: "Formal vs. Informal Register",
      explanation: "Business communication varies in formality. Use formal register for first contacts and senior colleagues, informal for established relationships.",
      examples: [
        { sentence: "I would like to schedule a meeting at your convenience.", note: "Formal — for new contacts" },
        { sentence: "Can we catch up later this week?", note: "Informal — for colleagues you know" },
        { sentence: "We would appreciate your prompt response.", note: "Formal — business correspondence" },
        { sentence: "Thanks for getting back to me so quickly!", note: "Informal — friendly follow-up" },
      ],
    },
    vocabExercises: [
      { question: "'Protocol' means:", options: ["A greeting", "Official rules of conduct", "A type of meeting", "A time zone"], correct: 1 },
      { question: "'Rapport' means:", options: ["A report", "A friendly relationship", "A hierarchy", "A meeting"], correct: 1 },
    ],
    conversationExercises: [
      { question: "What's important when communicating across cultures?", options: ["Speaking fast", "Cultural awareness", "Using slang", "Being loud"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Which is more formal?", options: ["Hey, what's up?", "I would like to discuss...", "Let's chat", "Cool, thanks!"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Hierarchy' means:", options: ["Equality", "System of ranking", "A meeting type", "Informal talk"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Indirect communication' uses:", options: ["Shouting", "Hints", "Orders", "Silence only"], correct: 1 },
    ],
  },
  "grammar-course-8": {
    levelId: "grammar-course", levelLabel: "English Grammar Course", lessonNumber: 8,
    title: "Conditional Sentences (0, 1, 2, 3)",
    description: "Master all four types of conditional sentences.",
    vocabulary: [
      { word: "Condition", meaning: "Something that must happen first", example: "Under one condition, I'll agree.", emoji: "🔗", arabic: "شرط" },
      { word: "Hypothetical", meaning: "Imagined, not real", example: "This is a hypothetical situation.", emoji: "💭", arabic: "افتراضي" },
      { word: "Result", meaning: "What happens because of something", example: "The result was unexpected.", emoji: "📊", arabic: "نتيجة" },
      { word: "Consequence", meaning: "An outcome of an action", example: "Every action has a consequence.", emoji: "⚡", arabic: "عاقبة" },
      { word: "Unlikely", meaning: "Probably won't happen", example: "It's unlikely to rain today.", emoji: "☁️", arabic: "غير مرجح" },
      { word: "Regret", meaning: "Feeling sorry about something", example: "I regret not studying harder.", emoji: "😔", arabic: "ندم" },
      { word: "Impossible", meaning: "Cannot happen", example: "It's impossible to change the past.", emoji: "🚫", arabic: "مستحيل" },
      { word: "Realistic", meaning: "Likely to happen", example: "Set realistic goals.", emoji: "🎯", arabic: "واقعي" },
      { word: "Imagine", meaning: "To picture in your mind", example: "Imagine you could fly!", emoji: "🌈", arabic: "يتخيل" },
      { word: "Outcome", meaning: "The final result", example: "The outcome depends on your effort.", emoji: "🏁", arabic: "محصلة" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "If I heat water to 100°C, what happens?" },
      { speaker: "Student", text: "It boils! That's a zero conditional — always true." },
      { speaker: "Teacher", text: "Right! Now, if you study hard, you will pass the exam." },
      { speaker: "Student", text: "That's first conditional — a real possibility." },
      { speaker: "Teacher", text: "Excellent! And if you won the lottery, what would you do?" },
    ],
    grammar: {
      title: "All Four Conditional Types",
      explanation: "Zero (fact), First (real), Second (unreal present), Third (unreal past). Each uses different tenses.",
      examples: [
        { sentence: "If you heat ice, it melts. (Zero)", note: "Present + Present — general truth" },
        { sentence: "If it rains, I will stay home. (First)", note: "Present + will — real future" },
        { sentence: "If I were rich, I would travel. (Second)", note: "Past + would — unreal present" },
        { sentence: "If I had studied, I would have passed. (Third)", note: "Past Perfect + would have — unreal past" },
      ],
    },
    vocabExercises: [
      { question: "'Hypothetical' means:", options: ["Real", "Imagined", "Past", "Future"], correct: 1 },
      { question: "Which conditional expresses regret?", options: ["Zero", "First", "Second", "Third"], correct: 3 },
    ],
    conversationExercises: [
      { question: "'If I were you, I would study more.' This is:", options: ["Zero", "First", "Second", "Third"], correct: 2 },
    ],
    grammarExercises: [
      { question: "'If I ___ (know), I would have told you.'", options: ["know", "knew", "had known", "have known"], correct: 2 },
      { question: "'If water reaches 100°C, it ___.'", options: ["would boil", "boils", "will boil", "boiled"], correct: 1 },
    ],
    examQuestions: [
      { question: "First conditional uses:", options: ["Past + would", "Present + will", "Past Perfect + would have", "Present + Present"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'If I had known, I ___ have helped.'", options: ["will", "would", "can", "shall"], correct: 1 },
    ],
  },
  "grammar-course-9": {
    levelId: "grammar-course", levelLabel: "English Grammar Course", lessonNumber: 9,
    title: "Relative Clauses",
    description: "Learn defining and non-defining relative clauses with who, which, that, where, whose.",
    vocabulary: [
      { word: "Clause", meaning: "A group of words with a subject and verb", example: "A relative clause gives more info.", emoji: "📝", arabic: "جملة" },
      { word: "Define", meaning: "To explain the meaning of", example: "A defining clause identifies the noun.", emoji: "🔍", arabic: "يُعرّف" },
      { word: "Essential", meaning: "Absolutely necessary", example: "This information is essential.", emoji: "⭐", arabic: "ضروري" },
      { word: "Additional", meaning: "Extra, not essential", example: "Non-defining clauses give additional info.", emoji: "➕", arabic: "إضافي" },
      { word: "Comma", meaning: "The punctuation mark (,)", example: "Use commas with non-defining clauses.", emoji: "✏️", arabic: "فاصلة" },
      { word: "Pronoun", meaning: "A word replacing a noun", example: "'Who' is a relative pronoun.", emoji: "🔤", arabic: "ضمير" },
      { word: "Restrict", meaning: "To limit", example: "A defining clause restricts the meaning.", emoji: "🔒", arabic: "يُقيّد" },
      { word: "Identify", meaning: "To recognize", example: "The clause helps identify which person.", emoji: "🎯", arabic: "يُحدد" },
      { word: "Omit", meaning: "To leave out", example: "You can omit 'that' in some cases.", emoji: "❌", arabic: "يَحذف" },
      { word: "Possession", meaning: "Owning something", example: "'Whose' shows possession.", emoji: "🏠", arabic: "ملكية" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Can you give me a sentence with 'who'?" },
      { speaker: "Student", text: "The man who lives next door is a doctor." },
      { speaker: "Teacher", text: "Great! That's a defining clause — it tells us WHICH man." },
      { speaker: "Student", text: "What about: 'My mother, who is a teacher, loves reading'?" },
      { speaker: "Teacher", text: "That's non-defining — it adds extra info. Notice the commas!" },
    ],
    grammar: {
      title: "Defining vs. Non-Defining Relative Clauses",
      explanation: "Defining: essential info, no commas, can use 'that'. Non-defining: extra info, has commas, CANNOT use 'that'.",
      examples: [
        { sentence: "The book that I read was amazing. (Defining)", note: "Identifies WHICH book — no commas" },
        { sentence: "Paris, which is in France, is beautiful. (Non-defining)", note: "Extra info — commas required" },
        { sentence: "The woman whose car was stolen called the police.", note: "'Whose' shows possession" },
        { sentence: "The restaurant where we ate was excellent.", note: "'Where' for places" },
      ],
    },
    vocabExercises: [
      { question: "A defining clause is:", options: ["Extra info", "Essential info", "A comma", "A pronoun"], correct: 1 },
      { question: "'Whose' shows:", options: ["Place", "Time", "Possession", "Reason"], correct: 2 },
    ],
    conversationExercises: [
      { question: "Which sentence has a non-defining clause?", options: ["The man who called left.", "London, which is the capital, is big.", "I know the person that did it.", "The house that I like is blue."], correct: 1 },
    ],
    grammarExercises: [
      { question: "Can you use 'that' in non-defining clauses?", options: ["Yes", "No", "Sometimes", "Always"], correct: 1 },
      { question: "'The city ___ I was born is Cairo.'", options: ["who", "which", "where", "whose"], correct: 2 },
    ],
    examQuestions: [
      { question: "Non-defining clauses require:", options: ["Periods", "Commas", "Exclamation marks", "Nothing"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'The teacher ___ class I enjoy is Mr. Ali.'", options: ["who", "which", "whose", "where"], correct: 2 },
    ],
  },
  "grammar-course-10": {
    levelId: "grammar-course", levelLabel: "English Grammar Course", lessonNumber: 10,
    title: "Modal Verbs & Modality",
    description: "Master can, could, may, might, must, should, would, and their uses.",
    vocabulary: [
      { word: "Modal verb", meaning: "A helping verb expressing ability, permission, etc.", example: "Can, must, and should are modals.", emoji: "🔧", arabic: "فعل مساعد" },
      { word: "Ability", meaning: "Being able to do something", example: "'Can' expresses ability.", emoji: "💪", arabic: "قدرة" },
      { word: "Permission", meaning: "Being allowed to do something", example: "'May' asks for permission.", emoji: "✅", arabic: "إذن" },
      { word: "Obligation", meaning: "Something you must do", example: "'Must' shows obligation.", emoji: "⚠️", arabic: "التزام" },
      { word: "Possibility", meaning: "Something that could happen", example: "'Might' shows possibility.", emoji: "🔮", arabic: "احتمال" },
      { word: "Advice", meaning: "A suggestion about what to do", example: "'Should' gives advice.", emoji: "💡", arabic: "نصيحة" },
      { word: "Prohibition", meaning: "Not being allowed", example: "'Must not' shows prohibition.", emoji: "🚫", arabic: "حظر" },
      { word: "Deduction", meaning: "A logical conclusion", example: "'Must' can show deduction.", emoji: "🧠", arabic: "استنتاج" },
      { word: "Request", meaning: "Asking for something", example: "'Could you help me?' is a request.", emoji: "🙏", arabic: "طلب" },
      { word: "Necessity", meaning: "Something required", example: "'Need to' shows necessity.", emoji: "❗", arabic: "ضرورة" },
    ],
    dialogue: [
      { speaker: "Student", text: "When do I use 'must' vs 'have to'?" },
      { speaker: "Teacher", text: "'Must' is personal obligation, 'have to' is external rules." },
      { speaker: "Student", text: "So 'I must study' means I feel I should?" },
      { speaker: "Teacher", text: "Exactly! And 'I have to study' means there's an exam or rule." },
      { speaker: "Student", text: "And 'mustn't' means 'it's forbidden', right?" },
    ],
    grammar: {
      title: "Modal Verbs — Functions & Meanings",
      explanation: "Each modal verb has specific functions: ability (can/could), permission (may/can), obligation (must/should), possibility (might/could).",
      examples: [
        { sentence: "She can speak three languages. (Ability)", note: "'Can' for present ability" },
        { sentence: "You must wear a seatbelt. (Obligation)", note: "'Must' for strong obligation" },
        { sentence: "It might rain later. (Possibility)", note: "'Might' for uncertain possibility" },
        { sentence: "You should see a doctor. (Advice)", note: "'Should' for recommendation" },
      ],
    },
    vocabExercises: [
      { question: "'Must' expresses:", options: ["Possibility", "Obligation", "Ability", "Permission"], correct: 1 },
      { question: "'Might' shows:", options: ["Certainty", "Obligation", "Uncertain possibility", "Prohibition"], correct: 2 },
    ],
    conversationExercises: [
      { question: "How do you ask for permission formally?", options: ["Can I go?", "May I leave?", "I'm leaving", "Let me go"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'You ___ not park here.' (It's forbidden)", options: ["can", "should", "must", "might"], correct: 2 },
      { question: "'She ___ speak French when she was 5.'", options: ["can", "could", "may", "must"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Should' is used for:", options: ["Prohibition", "Ability", "Advice", "Certainty"], correct: 2 },
    ],
    homeworkQuestions: [
      { question: "'Mustn't' means:", options: ["Don't have to", "It's forbidden", "It's possible", "You can"], correct: 1 },
    ],
  },
  "exam-prep-6": {
    levelId: "exam-prep", levelLabel: "Exam Preparation", lessonNumber: 6,
    title: "IELTS Writing Task 1",
    description: "Learn to describe charts, graphs, and data in IELTS Writing Task 1.",
    vocabulary: [
      { word: "Overview", meaning: "A general summary", example: "Start with an overview of the data.", emoji: "📋", arabic: "نظرة عامة" },
      { word: "Trend", meaning: "A general direction", example: "The trend shows an increase.", emoji: "📈", arabic: "اتجاه" },
      { word: "Peak", meaning: "The highest point", example: "Sales peaked in December.", emoji: "🔝", arabic: "ذروة" },
      { word: "Fluctuate", meaning: "To go up and down", example: "Prices fluctuated throughout the year.", emoji: "📊", arabic: "يتذبذب" },
      { word: "Proportion", meaning: "A part of a whole", example: "A large proportion of students passed.", emoji: "🥧", arabic: "نسبة" },
      { word: "Approximately", meaning: "Close to, about", example: "Approximately 60% agreed.", emoji: "≈", arabic: "تقريباً" },
      { word: "Steadily", meaning: "At a constant rate", example: "Sales grew steadily.", emoji: "📏", arabic: "بثبات" },
      { word: "Dramatically", meaning: "In a very sudden or obvious way", example: "Costs dropped dramatically.", emoji: "💥", arabic: "بشكل كبير" },
      { word: "Whereas", meaning: "In contrast", example: "Men preferred coffee, whereas women chose tea.", emoji: "↔️", arabic: "بينما" },
      { word: "Account for", meaning: "To make up (a proportion)", example: "Oil accounts for 40% of exports.", emoji: "📊", arabic: "يُشكّل" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "How should you start an IELTS Task 1 answer?" },
      { speaker: "Student", text: "Paraphrase the question, then give an overview." },
      { speaker: "Teacher", text: "Exactly! What comes after the overview?" },
      { speaker: "Student", text: "Body paragraphs with specific data and comparisons." },
      { speaker: "Teacher", text: "And always use varied language — don't repeat the same words!" },
    ],
    grammar: {
      title: "Language for Describing Data",
      explanation: "Use varied vocabulary: 'rose sharply', 'declined steadily', 'remained constant', 'accounted for X%'.",
      examples: [
        { sentence: "The number of students rose sharply between 2010 and 2015.", note: "Verb + adverb for trends" },
        { sentence: "There was a dramatic increase in sales.", note: "Noun phrase: 'a dramatic increase'" },
        { sentence: "The figure stood at approximately 45%.", note: "'stood at' for specific values" },
        { sentence: "Oil accounted for the largest proportion.", note: "'accounted for' — made up" },
      ],
    },
    vocabExercises: [
      { question: "'Fluctuate' means:", options: ["Stay the same", "Go up and down", "Increase only", "Decrease only"], correct: 1 },
      { question: "'Peak' means:", options: ["Lowest point", "Average", "Highest point", "Start"], correct: 2 },
    ],
    conversationExercises: [
      { question: "What should you include in an overview?", options: ["Every number", "Main trends only", "Your opinion", "Predictions"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'Sales ___ sharply in 2020.'", options: ["rise", "rose", "risen", "rising"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Whereas' is used to:", options: ["Add information", "Show contrast", "Give examples", "Conclude"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Account for' means:", options: ["To blame", "To make up a proportion", "To count", "To describe"], correct: 1 },
    ],
  },
  "exam-prep-7": {
    levelId: "exam-prep", levelLabel: "Exam Preparation", lessonNumber: 7,
    title: "IELTS Writing Task 2 — Essay Structure",
    description: "Master the structure of opinion, discussion, and problem-solution essays.",
    vocabulary: [
      { word: "Thesis statement", meaning: "Your main argument in one sentence", example: "A clear thesis is essential.", emoji: "📜", arabic: "بيان الأطروحة" },
      { word: "Topic sentence", meaning: "The first sentence of a paragraph", example: "Each paragraph needs a topic sentence.", emoji: "📌", arabic: "جملة رئيسية" },
      { word: "Supporting evidence", meaning: "Facts that back up your point", example: "Use supporting evidence in body paragraphs.", emoji: "📊", arabic: "أدلة داعمة" },
      { word: "Cohesion", meaning: "How well ideas connect", example: "Good essays have strong cohesion.", emoji: "🔗", arabic: "ترابط" },
      { word: "Counterpoint", meaning: "An opposing view", example: "Address the counterpoint in your essay.", emoji: "⚖️", arabic: "وجهة نظر معاكسة" },
      { word: "Conclusion", meaning: "The final paragraph summarizing views", example: "Restate your thesis in the conclusion.", emoji: "🏁", arabic: "خاتمة" },
      { word: "Band score", meaning: "IELTS rating from 1-9", example: "She achieved a band score of 7.", emoji: "🎯", arabic: "درجة" },
      { word: "Word count", meaning: "Number of words in your answer", example: "Task 2 requires 250+ words.", emoji: "📝", arabic: "عدد الكلمات" },
      { word: "Paraphrase", meaning: "To say the same thing differently", example: "Paraphrase the question in your intro.", emoji: "🔄", arabic: "يُعيد صياغة" },
      { word: "Elaborate", meaning: "To explain in more detail", example: "Elaborate on your main points.", emoji: "📖", arabic: "يُفصّل" },
    ],
    dialogue: [
      { speaker: "Student", text: "How many paragraphs should a Task 2 essay have?" },
      { speaker: "Teacher", text: "Four or five: introduction, 2-3 body paragraphs, and conclusion." },
      { speaker: "Student", text: "Should I give my opinion in the introduction?" },
      { speaker: "Teacher", text: "For opinion essays, yes — state your thesis clearly." },
      { speaker: "Student", text: "What if I partially agree?" },
    ],
    grammar: {
      title: "Linking Words for Essays",
      explanation: "Use connectors for cohesion: 'Furthermore...', 'In contrast...', 'As a result...', 'In conclusion...'",
      examples: [
        { sentence: "Furthermore, education improves employment rates.", note: "Adds supporting info" },
        { sentence: "In contrast, rural areas lack resources.", note: "Shows difference" },
        { sentence: "As a result, many people migrated to cities.", note: "Shows consequence" },
        { sentence: "In conclusion, both sides have valid points.", note: "Signals the ending" },
      ],
    },
    vocabExercises: [
      { question: "A 'thesis statement' is:", options: ["A question", "Your main argument", "The title", "A quote"], correct: 1 },
      { question: "'Cohesion' means:", options: ["Confusion", "How well ideas connect", "Length", "Vocabulary"], correct: 1 },
    ],
    conversationExercises: [
      { question: "Where do you state your thesis?", options: ["Conclusion", "Introduction", "Body paragraph", "Title"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'___, the government should invest in education.'", options: ["Furthermore", "However", "In contrast", "Despite"], correct: 0 },
    ],
    examQuestions: [
      { question: "IELTS Task 2 minimum word count is:", options: ["150", "200", "250", "300"], correct: 2 },
    ],
    homeworkQuestions: [
      { question: "A 'topic sentence' is:", options: ["The last sentence", "The first sentence of a paragraph", "The title", "A concluding remark"], correct: 1 },
    ],
  },
  "exam-prep-8": {
    levelId: "exam-prep", levelLabel: "Exam Preparation", lessonNumber: 8,
    title: "IELTS Speaking Parts 1, 2 & 3",
    description: "Prepare for all three parts of the IELTS Speaking test.",
    vocabulary: [
      { word: "Fluency", meaning: "Speaking smoothly without pauses", example: "Fluency is assessed in the speaking test.", emoji: "🗣️", arabic: "طلاقة" },
      { word: "Cue card", meaning: "The topic card in Part 2", example: "Speak about the cue card for 2 minutes.", emoji: "🃏", arabic: "بطاقة إشارة" },
      { word: "Elaborate", meaning: "To give more detail", example: "Try to elaborate on your answers.", emoji: "📖", arabic: "يُفصّل" },
      { word: "Coherent", meaning: "Logical and organized", example: "Your answer should be coherent.", emoji: "🔗", arabic: "متماسك" },
      { word: "Pronunciation", meaning: "How you say words", example: "Clear pronunciation is important.", emoji: "🎤", arabic: "نُطق" },
      { word: "Examiner", meaning: "The person conducting the test", example: "The examiner asks the questions.", emoji: "👤", arabic: "ممتحن" },
      { word: "Brainstorm", meaning: "Quick idea generation", example: "Brainstorm ideas before speaking.", emoji: "🧠", arabic: "عصف ذهني" },
      { word: "Abstract", meaning: "Theoretical, not concrete", example: "Part 3 has abstract questions.", emoji: "💭", arabic: "مجرد" },
      { word: "Rephrase", meaning: "To say differently", example: "If confused, rephrase the question.", emoji: "🔄", arabic: "يُعيد صياغة" },
      { word: "Filler", meaning: "Words used to fill pauses", example: "Avoid too many fillers like 'um'.", emoji: "⏳", arabic: "كلمات حشو" },
    ],
    dialogue: [
      { speaker: "Examiner", text: "Do you enjoy reading?" },
      { speaker: "Student", text: "Yes, I do! I'm particularly fond of mystery novels." },
      { speaker: "Examiner", text: "Tell me about a book you've read recently." },
      { speaker: "Student", text: "Recently, I read 'The Secret Garden.' It was a fascinating story about..." },
      { speaker: "Examiner", text: "Why do you think reading is important for young people?" },
    ],
    grammar: {
      title: "Extending Answers with Reasons & Examples",
      explanation: "Don't give one-word answers. Extend with reasons, examples, and personal experiences.",
      examples: [
        { sentence: "Yes, I enjoy it because it helps me relax after work.", note: "Answer + reason" },
        { sentence: "For instance, I recently read a book about history.", note: "Adding an example" },
        { sentence: "I'd say it's important since it broadens your perspective.", note: "Using 'since' for reason" },
        { sentence: "To be honest, I've always been passionate about music.", note: "Adding personal touch" },
      ],
    },
    vocabExercises: [
      { question: "A 'cue card' is used in:", options: ["Part 1", "Part 2", "Part 3", "Writing"], correct: 1 },
      { question: "'Coherent' means:", options: ["Random", "Logical and organized", "Fast", "Quiet"], correct: 1 },
    ],
    conversationExercises: [
      { question: "How long should you speak in Part 2?", options: ["30 seconds", "1 minute", "2 minutes", "5 minutes"], correct: 2 },
    ],
    grammarExercises: [
      { question: "Which extends an answer well?", options: ["Yes", "Yes, because...", "Maybe", "No"], correct: 1 },
    ],
    examQuestions: [
      { question: "Part 3 questions are typically:", options: ["Personal", "About hobbies", "Abstract & analytical", "About your name"], correct: 2 },
    ],
    homeworkQuestions: [
      { question: "'Filler' words include:", options: ["However", "Um, well, you know", "Therefore", "In conclusion"], correct: 1 },
    ],
  },
  "exam-prep-9": {
    levelId: "exam-prep", levelLabel: "Exam Preparation", lessonNumber: 9,
    title: "TOEFL Reading Strategies",
    description: "Learn effective strategies for the TOEFL iBT Reading section.",
    vocabulary: [
      { word: "Passage", meaning: "A section of text", example: "Read the passage carefully.", emoji: "📄", arabic: "فقرة نصية" },
      { word: "Inference", meaning: "A conclusion drawn from evidence", example: "Make inferences from the text.", emoji: "🔍", arabic: "استنتاج" },
      { word: "Vocabulary in context", meaning: "Word meaning based on surrounding text", example: "Determine meaning from context.", emoji: "📚", arabic: "معنى من السياق" },
      { word: "Main idea", meaning: "The central point of a text", example: "Identify the main idea first.", emoji: "🎯", arabic: "الفكرة الرئيسية" },
      { word: "Detail", meaning: "A specific piece of information", example: "Find the detail that supports the answer.", emoji: "🔎", arabic: "تفصيل" },
      { word: "Skim", meaning: "To read quickly for main ideas", example: "Skim the passage before reading questions.", emoji: "👀", arabic: "يتصفح" },
      { word: "Scan", meaning: "To search for specific information", example: "Scan for keywords in the text.", emoji: "🔦", arabic: "يبحث" },
      { word: "Paraphrase", meaning: "To restate in different words", example: "The correct answer often paraphrases the text.", emoji: "🔄", arabic: "يُعيد صياغة" },
      { word: "Eliminate", meaning: "To remove wrong options", example: "Eliminate obviously wrong answers.", emoji: "❌", arabic: "يستبعد" },
      { word: "Time management", meaning: "Using time wisely", example: "Good time management is crucial.", emoji: "⏱️", arabic: "إدارة الوقت" },
    ],
    dialogue: [
      { speaker: "Tutor", text: "What's the first thing you should do with a TOEFL reading passage?" },
      { speaker: "Student", text: "Skim it quickly to get the main idea?" },
      { speaker: "Tutor", text: "Exactly! Then read the questions and scan for answers." },
      { speaker: "Student", text: "What if I don't know a word?" },
      { speaker: "Tutor", text: "Use context clues — the surrounding sentences usually help." },
    ],
    grammar: {
      title: "Understanding Complex Sentences in Academic Texts",
      explanation: "Academic texts use long sentences with multiple clauses. Break them into parts to understand meaning.",
      examples: [
        { sentence: "The study, which was conducted over five years, revealed significant findings.", note: "Main clause + non-defining relative clause" },
        { sentence: "Although the results were promising, further research is needed.", note: "Concession + main clause" },
        { sentence: "The data suggests that the theory is valid.", note: "Main clause + noun clause" },
        { sentence: "Having analyzed the evidence, the researchers concluded...", note: "Participle clause + main clause" },
      ],
    },
    vocabExercises: [
      { question: "'Inference' means:", options: ["A direct quote", "A conclusion from evidence", "A summary", "An opinion"], correct: 1 },
      { question: "'Skim' means:", options: ["Read slowly", "Read quickly for main ideas", "Skip entirely", "Memorize"], correct: 1 },
    ],
    conversationExercises: [
      { question: "What should you do with unknown words?", options: ["Skip the question", "Use context clues", "Guess randomly", "Panic"], correct: 1 },
    ],
    grammarExercises: [
      { question: "In academic texts, complex sentences have:", options: ["One clause", "Multiple clauses", "No verbs", "Only questions"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Eliminate' in test strategy means:", options: ["Choose all", "Remove wrong options", "Guess", "Read again"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Scan' means:", options: ["Read everything", "Search for specific info", "Write a summary", "Close the book"], correct: 1 },
    ],
  },
  "exam-prep-10": {
    levelId: "exam-prep", levelLabel: "Exam Preparation", lessonNumber: 10,
    title: "Cambridge Exam — Use of English",
    description: "Practice key word transformations, open cloze, and word formation for Cambridge exams.",
    vocabulary: [
      { word: "Transformation", meaning: "Changing the form of something", example: "Key word transformations test grammar.", emoji: "🔄", arabic: "تحويل" },
      { word: "Cloze", meaning: "A fill-in-the-gap exercise", example: "The open cloze tests grammar and vocab.", emoji: "📝", arabic: "تمرين فراغات" },
      { word: "Word formation", meaning: "Creating new words from a root", example: "'Happy' → 'happiness' is word formation.", emoji: "🔤", arabic: "تكوين كلمات" },
      { word: "Prefix", meaning: "A word part added to the beginning", example: "'Un-' is a prefix meaning 'not'.", emoji: "➡️", arabic: "بادئة" },
      { word: "Suffix", meaning: "A word part added to the end", example: "'-tion' is a common suffix.", emoji: "⬅️", arabic: "لاحقة" },
      { word: "Collocation", meaning: "Words that often go together", example: "'Make a decision' is a collocation.", emoji: "🤝", arabic: "متلازمة لفظية" },
      { word: "Synonym", meaning: "A word with similar meaning", example: "'Big' and 'large' are synonyms.", emoji: "🔁", arabic: "مرادف" },
      { word: "Antonym", meaning: "A word with opposite meaning", example: "'Hot' and 'cold' are antonyms.", emoji: "↕️", arabic: "مضاد" },
      { word: "Register", meaning: "Level of formality in language", example: "Formal register uses complex vocabulary.", emoji: "📊", arabic: "مستوى رسمية" },
      { word: "Idiomatic", meaning: "Using idioms or natural expressions", example: "'Break the ice' is idiomatic.", emoji: "🧊", arabic: "اصطلاحي" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "In key word transformations, you must use the given word." },
      { speaker: "Student", text: "Can I change the form of the key word?" },
      { speaker: "Teacher", text: "No! You must use it exactly as given, in 2-5 words." },
      { speaker: "Student", text: "What about the open cloze?" },
      { speaker: "Teacher", text: "You fill in ONE word per gap — usually grammar words like articles, prepositions, or pronouns." },
    ],
    grammar: {
      title: "Key Word Transformations",
      explanation: "Rewrite sentences using a given word. This tests grammar structures like passive, conditionals, and reported speech.",
      examples: [
        { sentence: "'They cancelled the event.' → 'The event WAS CANCELLED.' (CANCEL)", note: "Active → Passive" },
        { sentence: "'I regret not going.' → 'I WISH I HAD gone.' (WISH)", note: "Regret → Wish + Past Perfect" },
        { sentence: "'It's not necessary to come.' → 'You DON'T HAVE TO come.' (HAVE)", note: "Necessity transformation" },
        { sentence: "'She started learning at 5.' → 'She HAS BEEN LEARNING since she was 5.' (BEEN)", note: "Past → Present Perfect Continuous" },
      ],
    },
    vocabExercises: [
      { question: "A 'prefix' is added to:", options: ["The end", "The beginning", "The middle", "Nowhere"], correct: 1 },
      { question: "'Collocation' means:", options: ["A grammar rule", "Words that often go together", "A synonym", "An antonym"], correct: 1 },
    ],
    conversationExercises: [
      { question: "In open cloze, how many words per gap?", options: ["Two", "Three", "One", "Any number"], correct: 2 },
    ],
    grammarExercises: [
      { question: "Transform: 'They cancelled it.' → 'It ___ cancelled.' (was/were)", options: ["was", "were", "is", "be"], correct: 0 },
    ],
    examQuestions: [
      { question: "In key word transformations, you use:", options: ["1-3 words", "2-5 words", "Any amount", "Full sentences"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Word formation changes:", options: ["Spelling only", "The form of a word", "The language", "Nothing"], correct: 1 },
    ],
  },
  "writing-9": {
    levelId: "writing", levelLabel: "English Writing", lessonNumber: 9,
    title: "Argumentative Essays",
    description: "Learn to write compelling argumentative essays with clear structure.",
    vocabulary: [
      { word: "Claim", meaning: "A statement you argue for", example: "Your claim should be clear.", emoji: "📢", arabic: "ادعاء" },
      { word: "Evidence", meaning: "Facts supporting your argument", example: "Use evidence to support your claim.", emoji: "📊", arabic: "دليل" },
      { word: "Warrant", meaning: "The reasoning connecting evidence to claim", example: "Explain the warrant clearly.", emoji: "🔗", arabic: "تبرير" },
      { word: "Refute", meaning: "To prove wrong", example: "Refute the opposing argument.", emoji: "❌", arabic: "يُفنّد" },
      { word: "Bias", meaning: "Unfair inclination", example: "Avoid bias in your writing.", emoji: "⚖️", arabic: "تحيز" },
      { word: "Credible", meaning: "Trustworthy", example: "Use credible sources.", emoji: "✅", arabic: "موثوق" },
      { word: "Persuasive", meaning: "Convincing", example: "Write in a persuasive tone.", emoji: "💪", arabic: "مُقنع" },
      { word: "Logical", meaning: "Based on reasoning", example: "Build a logical argument.", emoji: "🧠", arabic: "منطقي" },
      { word: "Acknowledge", meaning: "To recognize or admit", example: "Acknowledge the other side.", emoji: "🤝", arabic: "يعترف بـ" },
      { word: "Assertion", meaning: "A confident statement", example: "Make your assertion clear.", emoji: "💬", arabic: "تأكيد" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "What makes a strong argumentative essay?" },
      { speaker: "Student", text: "A clear thesis, strong evidence, and addressing counterarguments." },
      { speaker: "Teacher", text: "Exactly! And always use credible sources." },
      { speaker: "Student", text: "Should I acknowledge the opposing view?" },
      { speaker: "Teacher", text: "Yes! Acknowledging and then refuting it strengthens your argument." },
    ],
    grammar: {
      title: "Cause & Effect Language",
      explanation: "Use cause-effect connectors: 'because', 'therefore', 'as a result', 'consequently', 'due to'.",
      examples: [
        { sentence: "Due to climate change, sea levels are rising.", note: "'Due to' introduces the cause" },
        { sentence: "The economy improved; consequently, unemployment fell.", note: "'Consequently' shows the result" },
        { sentence: "As a result of the new policy, crime decreased.", note: "'As a result of' links cause to effect" },
        { sentence: "Education is important because it opens doors.", note: "'Because' gives the reason" },
      ],
    },
    vocabExercises: [
      { question: "'Refute' means:", options: ["To agree", "To prove wrong", "To ignore", "To copy"], correct: 1 },
      { question: "'Credible' means:", options: ["Unbelievable", "Trustworthy", "Biased", "Weak"], correct: 1 },
    ],
    conversationExercises: [
      { question: "What strengthens an argument?", options: ["Personal opinions only", "Acknowledging and refuting counterarguments", "Ignoring opposing views", "Using emotional language only"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'___ climate change, glaciers are melting.'", options: ["Because", "Due to", "Although", "Despite"], correct: 1 },
    ],
    examQuestions: [
      { question: "A 'warrant' connects:", options: ["Two paragraphs", "Evidence to claim", "Introduction to conclusion", "Title to body"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Assertion' means:", options: ["A question", "A confident statement", "A summary", "An example"], correct: 1 },
    ],
  },
  "writing-10": {
    levelId: "writing", levelLabel: "English Writing", lessonNumber: 10,
    title: "Editing & Proofreading",
    description: "Learn essential editing and proofreading techniques for polished writing.",
    vocabulary: [
      { word: "Proofread", meaning: "To check for errors", example: "Always proofread before submitting.", emoji: "🔍", arabic: "يُدقق" },
      { word: "Typo", meaning: "A typing mistake", example: "I found a typo in paragraph two.", emoji: "⌨️", arabic: "خطأ مطبعي" },
      { word: "Revise", meaning: "To make changes to improve", example: "Revise your essay for clarity.", emoji: "✏️", arabic: "يُراجع" },
      { word: "Draft", meaning: "An early version", example: "This is my first draft.", emoji: "📄", arabic: "مسودة" },
      { word: "Clarity", meaning: "Being easy to understand", example: "Write with clarity and precision.", emoji: "💎", arabic: "وضوح" },
      { word: "Concise", meaning: "Brief but comprehensive", example: "Keep your writing concise.", emoji: "📏", arabic: "موجز" },
      { word: "Redundant", meaning: "Unnecessarily repetitive", example: "Remove redundant words.", emoji: "🔄", arabic: "زائد" },
      { word: "Punctuation", meaning: "Marks like commas and periods", example: "Check your punctuation carefully.", emoji: "❗", arabic: "علامات ترقيم" },
      { word: "Flow", meaning: "Smooth progression of ideas", example: "Good writing has natural flow.", emoji: "🌊", arabic: "تدفق" },
      { word: "Feedback", meaning: "Comments for improvement", example: "Ask for feedback on your work.", emoji: "💬", arabic: "ملاحظات" },
    ],
    dialogue: [
      { speaker: "Editor", text: "Have you proofread your essay?" },
      { speaker: "Writer", text: "Yes, but I still found three typos!" },
      { speaker: "Editor", text: "That's normal. Try reading it aloud — it helps catch errors." },
      { speaker: "Writer", text: "Good tip! Should I also check for redundant phrases?" },
      { speaker: "Editor", text: "Absolutely. Remove anything that doesn't add value." },
    ],
    grammar: {
      title: "Common Writing Errors to Avoid",
      explanation: "Watch for subject-verb agreement, run-on sentences, comma splices, and dangling modifiers.",
      examples: [
        { sentence: "The team are working hard. → The team IS working hard.", note: "Subject-verb agreement (collective noun)" },
        { sentence: "I love reading, I go to the library. → I love reading, SO I go...", note: "Fix comma splice with a conjunction" },
        { sentence: "Running down the street, the dog chased me. → While I was running...", note: "Fix dangling modifier" },
        { sentence: "Their going to the store. → THEY'RE going...", note: "Their vs. They're" },
      ],
    },
    vocabExercises: [
      { question: "'Redundant' means:", options: ["Necessary", "Unnecessarily repetitive", "Clear", "Short"], correct: 1 },
      { question: "'Draft' means:", options: ["Final version", "An early version", "A published work", "A review"], correct: 1 },
    ],
    conversationExercises: [
      { question: "How can you catch errors?", options: ["Read quickly", "Read aloud", "Skip proofreading", "Only check spelling"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Which is correct?", options: ["Their going home", "They're going home", "There going home", "Theyr going home"], correct: 1 },
    ],
    examQuestions: [
      { question: "A 'comma splice' is:", options: ["Correct punctuation", "Joining sentences with only a comma", "Using too many commas", "A type of essay"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Concise' writing is:", options: ["Very long", "Brief but comprehensive", "Full of repetition", "Unclear"], correct: 1 },
    ],
  },
};
