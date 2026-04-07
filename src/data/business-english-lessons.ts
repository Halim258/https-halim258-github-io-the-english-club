import type { LessonData } from "./lessons";

const l = (n: number, title: string, desc: string, vocab: LessonData["vocabulary"], dialogue: LessonData["dialogue"], grammar: LessonData["grammar"], vocabEx: LessonData["vocabExercises"], convEx: LessonData["conversationExercises"], gramEx: LessonData["grammarExercises"], exam: LessonData["examQuestions"], hw: LessonData["homeworkQuestions"]): LessonData => ({
  levelId: "business", levelLabel: "Business English", lessonNumber: n, title, description: desc,
  vocabulary: vocab, dialogue, grammar, vocabExercises: vocabEx, conversationExercises: convEx,
  grammarExercises: gramEx, examQuestions: exam, homeworkQuestions: hw,
});

export const businessEnglishLessons: Record<string, LessonData> = {
  "business-1": l(1, "Business Introductions", "Learn to introduce yourself professionally in meetings and networking events.",
    [
      { word: "Colleague", meaning: "A person you work with", example: "My colleague handles the marketing.", emoji: "👥", arabic: "زميل" },
      { word: "Stakeholder", meaning: "A person with interest in a business", example: "We need to update all stakeholders.", emoji: "📊", arabic: "صاحب مصلحة" },
      { word: "Agenda", meaning: "A list of items to discuss", example: "Let's review the meeting agenda.", emoji: "📋", arabic: "جدول أعمال" },
      { word: "Network", meaning: "To connect with professionals", example: "I network at industry events.", emoji: "🤝", arabic: "شبكة علاقات" },
      { word: "Position", meaning: "Job role or title", example: "What position do you hold?", emoji: "💼", arabic: "منصب" },
      { word: "Department", meaning: "A division of a company", example: "She works in the finance department.", emoji: "🏢", arabic: "قسم" },
      { word: "Branch", meaning: "A local office of a company", example: "Our branch is in Cairo.", emoji: "🏛️", arabic: "فرع" },
      { word: "Headquarters", meaning: "Main office of a company", example: "HQ is in London.", emoji: "🌆", arabic: "مقر رئيسي" },
      { word: "Resume", meaning: "Document listing qualifications", example: "Send your resume by Friday.", emoji: "📄", arabic: "سيرة ذاتية" },
      { word: "Pitch", meaning: "A short presentation or proposal", example: "Give me your elevator pitch.", emoji: "🎤", arabic: "عرض تقديمي" },
    ],
    [
      { speaker: "Sarah", text: "Hi, I'm Sarah from the marketing department. Nice to meet you." },
      { speaker: "Ahmed", text: "Pleased to meet you, Sarah. I'm Ahmed. I handle client relations." },
      { speaker: "Sarah", text: "How long have you been with the company?" },
      { speaker: "Ahmed", text: "About three years now. What about you?" },
      { speaker: "Sarah", text: "I just started last month. Still getting to know everyone." },
    ],
    { title: "Formal vs. Informal Introductions", explanation: "In business, use formal language with new contacts. Use titles (Mr./Ms.) until invited to use first names. Phrases like 'Pleased to meet you' are more formal than 'Nice to meet you'.",
      examples: [
        { sentence: "How do you do? I'm Dr. Williams.", note: "Very formal — used in first meetings" },
        { sentence: "Pleased to meet you. I'm the project lead.", note: "Formal but warm" },
        { sentence: "Hey, I'm Tom from sales.", note: "Informal — for casual settings" },
        { sentence: "Allow me to introduce my colleague, Ms. Chen.", note: "Introducing someone formally" },
      ]},
    [
      { question: "What is a 'stakeholder'?", options: ["A stock trader", "A person with interest in a business", "A manager", "A customer only"], correct: 1 },
      { question: "What does 'HQ' stand for?", options: ["High Quality", "Headquarters", "Head Quarters", "Human Quotient"], correct: 1 },
    ],
    [
      { question: "Which is most formal?", options: ["Hey, I'm John.", "Nice to meet you.", "How do you do?", "What's up?"], correct: 2 },
      { question: "When networking, you should:", options: ["Avoid eye contact", "Share your elevator pitch", "Talk only about yourself", "Leave immediately"], correct: 1 },
    ],
    [
      { question: "Which phrase introduces someone else?", options: ["I'd like you to meet...", "I am...", "How are you?", "See you later."], correct: 0 },
      { question: "'Pleased to meet you' is:", options: ["Slang", "Informal", "Formal", "Rude"], correct: 2 },
    ],
    [
      { question: "A 'resume' is:", options: ["A meeting room", "A document listing qualifications", "A business card", "An email"], correct: 1 },
      { question: "An 'agenda' lists:", options: ["Employee names", "Items to discuss", "Company profits", "Phone numbers"], correct: 1 },
      { question: "Which greeting suits a first business meeting?", options: ["Yo!", "How do you do?", "What's happening?", "Sup?"], correct: 1 },
    ],
    [
      { question: "Write the correct formal introduction: 'Allow me to ___ my colleague.'", options: ["show", "introduce", "tell", "say"], correct: 1 },
      { question: "A company's main office is its:", options: ["Branch", "Department", "Headquarters", "Network"], correct: 2 },
    ]
  ),

  "business-2": l(2, "Business Meetings", "Master vocabulary and phrases for running and participating in meetings.",
    [
      { word: "Minutes", meaning: "Written record of a meeting", example: "Who's taking the minutes today?", emoji: "📝", arabic: "محضر اجتماع" },
      { word: "Chairperson", meaning: "Person leading a meeting", example: "The chairperson opened the discussion.", emoji: "🪑", arabic: "رئيس الجلسة" },
      { word: "Adjourn", meaning: "To end a meeting temporarily", example: "Let's adjourn until tomorrow.", emoji: "⏸️", arabic: "تأجيل" },
      { word: "Consensus", meaning: "General agreement", example: "We reached a consensus on the budget.", emoji: "✅", arabic: "إجماع" },
      { word: "Deadline", meaning: "Final date for completion", example: "The deadline is next Friday.", emoji: "⏰", arabic: "موعد نهائي" },
      { word: "Action item", meaning: "Task assigned during a meeting", example: "Each person has two action items.", emoji: "📌", arabic: "بند عمل" },
      { word: "Follow up", meaning: "To check on progress later", example: "I'll follow up with you next week.", emoji: "🔄", arabic: "متابعة" },
      { word: "Recap", meaning: "Brief summary", example: "Let me give a quick recap.", emoji: "🔁", arabic: "ملخص" },
      { word: "Quorum", meaning: "Minimum number for a valid meeting", example: "We don't have a quorum yet.", emoji: "👥", arabic: "نصاب" },
      { word: "Motion", meaning: "A formal proposal", example: "I'd like to make a motion to approve.", emoji: "🗳️", arabic: "اقتراح" },
    ],
    [
      { speaker: "Chair", text: "Let's call the meeting to order. First item on the agenda?" },
      { speaker: "Lina", text: "We need to discuss the Q3 budget allocation." },
      { speaker: "Chair", text: "Good. Does everyone have the report? Let's go through it." },
      { speaker: "Omar", text: "I'd like to raise a concern about the marketing spend." },
      { speaker: "Chair", text: "Noted. Let's table that for now and revisit after the presentation." },
    ],
    { title: "Modal Verbs for Polite Suggestions", explanation: "In meetings, use modal verbs like 'could', 'might', 'would' to make polite suggestions. Direct commands sound too aggressive in a professional setting.",
      examples: [
        { sentence: "Could we perhaps look at the data first?", note: "'Could' softens the suggestion" },
        { sentence: "We might want to reconsider the timeline.", note: "'Might' makes it tentative" },
        { sentence: "Would it be possible to extend the deadline?", note: "Very polite request" },
        { sentence: "I'd suggest we table this for now.", note: "'I'd suggest' = diplomatic" },
      ]},
    [
      { question: "'Minutes' in a meeting context means:", options: ["Time units", "Written record", "Small details", "Short breaks"], correct: 1 },
      { question: "To 'adjourn' means to:", options: ["Start a meeting", "End temporarily", "Cancel completely", "Reschedule"], correct: 1 },
    ],
    [
      { question: "A polite way to disagree is:", options: ["You're wrong.", "I see your point, but...", "That's stupid.", "No way."], correct: 1 },
      { question: "Who takes the minutes?", options: ["The boss always", "A designated person", "Everyone", "No one"], correct: 1 },
    ],
    [
      { question: "Which is more polite?", options: ["Do it now.", "Could you possibly do it?", "You must do it.", "Do it."], correct: 1 },
      { question: "'I'd suggest we...' is:", options: ["Rude", "Diplomatic", "Casual", "Aggressive"], correct: 1 },
    ],
    [
      { question: "A 'quorum' is:", options: ["A meeting room", "The minimum people needed", "A type of report", "A voting system"], correct: 1 },
      { question: "An 'action item' is:", options: ["An agenda topic", "A task assigned", "A meeting type", "A company rule"], correct: 1 },
      { question: "'Let's table this' means:", options: ["Put it on the table", "Discuss it later", "Cancel it", "Vote on it"], correct: 1 },
    ],
    [
      { question: "'Follow up' means:", options: ["Lead a meeting", "Check on progress", "Write a report", "Send an email"], correct: 1 },
      { question: "A 'consensus' means:", options: ["A vote", "General agreement", "A disagreement", "A report"], correct: 1 },
    ]
  ),

  "business-3": l(3, "Business Emails", "Write professional emails with proper structure, tone, and etiquette.",
    [
      { word: "Subject line", meaning: "Title of an email", example: "Use a clear subject line.", emoji: "📧", arabic: "عنوان الرسالة" },
      { word: "Attachment", meaning: "File sent with an email", example: "Please find the attachment.", emoji: "📎", arabic: "مرفق" },
      { word: "CC", meaning: "Carbon Copy — send a copy to", example: "CC your manager on this.", emoji: "📋", arabic: "نسخة كربونية" },
      { word: "BCC", meaning: "Blind Carbon Copy", example: "BCC the client for privacy.", emoji: "👁️", arabic: "نسخة مخفية" },
      { word: "Regards", meaning: "Formal closing phrase", example: "Best regards, Sarah.", emoji: "✍️", arabic: "تحيات" },
      { word: "Inquiry", meaning: "A formal question or request", example: "Thank you for your inquiry.", emoji: "❓", arabic: "استفسار" },
      { word: "Acknowledge", meaning: "To confirm receipt", example: "I acknowledge your email.", emoji: "✔️", arabic: "يُقر" },
      { word: "Correspondence", meaning: "Written communication", example: "Keep all correspondence on file.", emoji: "📬", arabic: "مراسلات" },
      { word: "Prompt", meaning: "Quick, without delay", example: "Thank you for your prompt reply.", emoji: "⚡", arabic: "سريع" },
      { word: "Clarify", meaning: "To make clearer", example: "Could you clarify this point?", emoji: "🔍", arabic: "يوضح" },
    ],
    [
      { speaker: "Manager", text: "Did you send the project update to the client?" },
      { speaker: "Employee", text: "Yes, I emailed it this morning with the report attached." },
      { speaker: "Manager", text: "Did you CC the team lead?" },
      { speaker: "Employee", text: "Yes, and I BCC'd the director as requested." },
      { speaker: "Manager", text: "Perfect. Always use a professional closing like 'Best regards'." },
    ],
    { title: "Email Structure & Formal Phrases", explanation: "Professional emails follow: Greeting → Purpose → Details → Call to Action → Closing. Use formal phrases: 'I am writing to...', 'Please find attached...', 'I look forward to...'",
      examples: [
        { sentence: "Dear Mr. Johnson, I am writing to inquire about...", note: "Formal opening + purpose" },
        { sentence: "Please find attached the quarterly report.", note: "Introducing attachments" },
        { sentence: "I would appreciate your prompt response.", note: "Polite call to action" },
        { sentence: "Kind regards, Sarah Thompson", note: "Professional closing" },
      ]},
    [
      { question: "'CC' stands for:", options: ["Copy Clearly", "Carbon Copy", "Complete Copy", "Central Copy"], correct: 1 },
      { question: "An 'attachment' is:", options: ["A link", "A file sent with email", "A signature", "A greeting"], correct: 1 },
    ],
    [
      { question: "Which opening is most professional?", options: ["Hey!", "Dear Sir/Madam,", "What's up?", "Yo!"], correct: 1 },
      { question: "Best closing for a formal email:", options: ["Later!", "Cheers", "Best regards,", "Bye"], correct: 2 },
    ],
    [
      { question: "'I am writing to inquire about...' is:", options: ["Too casual", "A formal opening", "Rude", "Outdated"], correct: 1 },
      { question: "'Please find attached' means:", options: ["Look for the file", "The file is included", "Attach a file", "Delete the file"], correct: 1 },
    ],
    [
      { question: "'Correspondence' means:", options: ["Phone calls", "Written communication", "Meetings", "Presentations"], correct: 1 },
      { question: "A 'prompt' reply is:", options: ["Delayed", "Quick", "Rude", "Long"], correct: 1 },
      { question: "When should you CC someone?", options: ["Never", "When they need to be informed", "Always", "Only on Mondays"], correct: 1 },
    ],
    [
      { question: "'BCC' hides the recipient from:", options: ["The sender", "Other recipients", "The server", "No one"], correct: 1 },
      { question: "A clear subject line should:", options: ["Be very long", "Summarize the email topic", "Use all caps", "Be empty"], correct: 1 },
    ]
  ),

  "business-4": l(4, "Negotiations & Deals", "Learn key phrases and strategies for business negotiations.",
    [
      { word: "Negotiate", meaning: "To discuss terms for agreement", example: "Let's negotiate the contract terms.", emoji: "🤝", arabic: "يفاوض" },
      { word: "Compromise", meaning: "Each side gives up something", example: "We need to find a compromise.", emoji: "⚖️", arabic: "حل وسط" },
      { word: "Proposal", meaning: "A formal suggestion or plan", example: "We submitted a proposal.", emoji: "📄", arabic: "مقترح" },
      { word: "Counter-offer", meaning: "A response offer to an initial one", example: "They made a counter-offer.", emoji: "🔄", arabic: "عرض مضاد" },
      { word: "Terms", meaning: "Conditions of an agreement", example: "Review the contract terms.", emoji: "📋", arabic: "شروط" },
      { word: "Leverage", meaning: "Power or advantage in negotiation", example: "We have strong leverage.", emoji: "💪", arabic: "نفوذ" },
      { word: "Concession", meaning: "Something given up in negotiation", example: "We made a small concession.", emoji: "🎁", arabic: "تنازل" },
      { word: "Bottom line", meaning: "The minimum acceptable outcome", example: "What's your bottom line?", emoji: "📉", arabic: "الحد الأدنى" },
      { word: "Win-win", meaning: "Beneficial for both sides", example: "We aim for a win-win deal.", emoji: "🏆", arabic: "فوز للطرفين" },
      { word: "Clause", meaning: "A section of a contract", example: "Check the termination clause.", emoji: "📃", arabic: "بند" },
    ],
    [
      { speaker: "Buyer", text: "We'd like to propose a 15% discount on bulk orders." },
      { speaker: "Seller", text: "That's a bit steep. How about 10% with free shipping?" },
      { speaker: "Buyer", text: "Could we meet in the middle — 12% with shipping included?" },
      { speaker: "Seller", text: "Let me check with my team. I think we can work with that." },
      { speaker: "Buyer", text: "Great. Let's put it in writing." },
    ],
    { title: "Conditional Sentences in Negotiation", explanation: "Use conditional sentences (If...then) to propose deals and explore options. First conditional for likely outcomes, second conditional for hypothetical situations.",
      examples: [
        { sentence: "If you increase the order, we'll offer a discount.", note: "First conditional — real offer" },
        { sentence: "If we could extend the deadline, we'd accept the terms.", note: "Second conditional — hypothetical" },
        { sentence: "If you agree today, we can start next week.", note: "Creating urgency" },
        { sentence: "We would consider it if you revised the pricing.", note: "Polite counter" },
      ]},
    [
      { question: "A 'counter-offer' is:", options: ["The first offer", "A response offer", "A rejection", "A discount"], correct: 1 },
      { question: "'Bottom line' means:", options: ["The last page", "Minimum acceptable outcome", "Maximum profit", "A type of chart"], correct: 1 },
    ],
    [
      { question: "A 'win-win' deal is:", options: ["One side wins", "Both sides benefit", "Nobody wins", "A draw"], correct: 1 },
      { question: "Best approach to negotiate:", options: ["Be aggressive", "Refuse everything", "Find common ground", "Give in immediately"], correct: 2 },
    ],
    [
      { question: "'If you increase the order, we ___ a discount.'", options: ["will offer", "offered", "offering", "offers"], correct: 0 },
      { question: "'If we ___ extend the deadline, we'd accept.'", options: ["can", "could", "will", "do"], correct: 1 },
    ],
    [
      { question: "A 'clause' is:", options: ["A type of deal", "A section of a contract", "A discount", "A negotiation style"], correct: 1 },
      { question: "'Leverage' in business means:", options: ["A tool", "Advantage in negotiation", "A type of loan", "A salary raise"], correct: 1 },
      { question: "A 'concession' means:", options: ["A win", "Something given up", "A bonus", "A contract"], correct: 1 },
    ],
    [
      { question: "'Compromise' means:", options: ["One side wins", "Both give up something", "No agreement", "A legal term"], correct: 1 },
      { question: "'Terms' of a contract are its:", options: ["Pages", "Conditions", "Signatures", "Dates"], correct: 1 },
    ]
  ),

  "business-5": l(5, "Presentations & Public Speaking", "Deliver impactful business presentations with confidence.",
    [
      { word: "Slide", meaning: "A page in a presentation", example: "Move to the next slide.", emoji: "🖥️", arabic: "شريحة" },
      { word: "Audience", meaning: "People watching or listening", example: "Engage your audience.", emoji: "👥", arabic: "جمهور" },
      { word: "Visual aid", meaning: "Charts, graphs, images used", example: "Use visual aids to clarify data.", emoji: "📊", arabic: "وسيلة بصرية" },
      { word: "Handout", meaning: "Printed material for audience", example: "Take a handout on your way out.", emoji: "📄", arabic: "نشرة" },
      { word: "Transition", meaning: "Moving from one topic to next", example: "Let me transition to our goals.", emoji: "➡️", arabic: "انتقال" },
      { word: "Conclusion", meaning: "Final part of presentation", example: "In conclusion, sales are up.", emoji: "🏁", arabic: "خاتمة" },
      { word: "Q&A", meaning: "Question and Answer session", example: "We'll have Q&A at the end.", emoji: "❓", arabic: "أسئلة وأجوبة" },
      { word: "Keynote", meaning: "Main speech at an event", example: "She delivered the keynote.", emoji: "🎤", arabic: "كلمة رئيسية" },
      { word: "Elaborate", meaning: "To explain in more detail", example: "Could you elaborate on that?", emoji: "🔎", arabic: "يُفصّل" },
      { word: "Highlight", meaning: "To emphasize key points", example: "I'd like to highlight our growth.", emoji: "⭐", arabic: "يُبرز" },
    ],
    [
      { speaker: "Presenter", text: "Good morning, everyone. Today I'll be presenting our Q3 results." },
      { speaker: "Presenter", text: "As you can see from this chart, revenue increased by 15%." },
      { speaker: "Presenter", text: "Moving on to our challenges — shipping costs rose significantly." },
      { speaker: "Audience", text: "Could you elaborate on the cost reduction strategy?" },
      { speaker: "Presenter", text: "Great question. I'll cover that in the next slide." },
    ],
    { title: "Signposting Language", explanation: "Signposting helps your audience follow your presentation. Use phrases to introduce topics, transition between sections, and summarize.",
      examples: [
        { sentence: "First, I'd like to talk about...", note: "Introducing a topic" },
        { sentence: "Moving on to the next point...", note: "Transitioning" },
        { sentence: "To sum up...", note: "Summarizing" },
        { sentence: "As you can see from this graph...", note: "Referring to visuals" },
      ]},
    [
      { question: "A 'visual aid' is:", options: ["A microphone", "Charts or images", "A script", "A podium"], correct: 1 },
      { question: "'Q&A' stands for:", options: ["Quick Answers", "Question and Answer", "Quality Assurance", "Quarterly Analysis"], correct: 1 },
    ],
    [
      { question: "To start a presentation:", options: ["Just start talking", "Greet and state purpose", "Ask the audience to leave", "Read silently"], correct: 1 },
      { question: "Signposting helps the audience:", options: ["Sleep better", "Follow the structure", "Take notes faster", "Disagree"], correct: 1 },
    ],
    [
      { question: "'Moving on to...' is a ___ phrase.", options: ["Greeting", "Transition", "Closing", "Question"], correct: 1 },
      { question: "'To sum up' means:", options: ["To add more", "To summarize", "To start over", "To question"], correct: 1 },
    ],
    [
      { question: "A 'keynote' is:", options: ["A minor speech", "The main speech", "A Q&A session", "A handout"], correct: 1 },
      { question: "'Elaborate' means:", options: ["To shorten", "To explain in detail", "To end", "To repeat"], correct: 1 },
      { question: "Best way to handle Q&A:", options: ["Ignore questions", "Answer clearly", "Get angry", "Leave the room"], correct: 1 },
    ],
    [
      { question: "A 'handout' is:", options: ["A type of slide", "Printed material", "A microphone", "A greeting"], correct: 1 },
      { question: "'Highlight' means to:", options: ["Hide", "Emphasize", "Delete", "Ignore"], correct: 1 },
    ]
  ),

  "business-6": l(6, "Financial Reports & Budgets", "Understand and discuss financial documents in English.",
    [
      { word: "Revenue", meaning: "Total income before expenses", example: "Revenue grew by 20% this year.", emoji: "💰", arabic: "إيرادات" },
      { word: "Expenditure", meaning: "Money spent by a company", example: "We must reduce expenditure.", emoji: "💸", arabic: "إنفاق" },
      { word: "Profit margin", meaning: "Percentage of profit from sales", example: "Our profit margin is 15%.", emoji: "📈", arabic: "هامش ربح" },
      { word: "Forecast", meaning: "A prediction of future trends", example: "The forecast shows growth.", emoji: "🔮", arabic: "توقعات" },
      { word: "Quarterly", meaning: "Every three months", example: "We review budgets quarterly.", emoji: "📅", arabic: "ربع سنوي" },
      { word: "Allocate", meaning: "To distribute resources", example: "We allocated funds to R&D.", emoji: "🎯", arabic: "يخصص" },
      { word: "ROI", meaning: "Return on Investment", example: "What's the ROI on this project?", emoji: "📊", arabic: "عائد الاستثمار" },
      { word: "Overhead", meaning: "Ongoing business costs", example: "Rent is our biggest overhead.", emoji: "🏢", arabic: "تكاليف عامة" },
      { word: "Break-even", meaning: "Point where costs equal revenue", example: "We'll break even in Q2.", emoji: "⚖️", arabic: "نقطة التعادل" },
      { word: "Audit", meaning: "Official financial examination", example: "The annual audit starts Monday.", emoji: "🔍", arabic: "تدقيق" },
    ],
    [
      { speaker: "CFO", text: "Let's review the quarterly financials. Revenue is up 12%." },
      { speaker: "Manager", text: "That's great, but overhead costs also increased." },
      { speaker: "CFO", text: "True. We need to improve our profit margin." },
      { speaker: "Manager", text: "Should we allocate more to cost reduction initiatives?" },
      { speaker: "CFO", text: "Yes. Let's aim to break even on the new project by Q3." },
    ],
    { title: "Comparatives for Trends", explanation: "Use comparatives to describe financial changes: higher/lower, more/less, greater/smaller. Add 'than' for comparisons between periods.",
      examples: [
        { sentence: "Revenue is higher than last quarter.", note: "Comparing two periods" },
        { sentence: "Costs have been significantly lower this year.", note: "Adding emphasis with 'significantly'" },
        { sentence: "The profit margin is slightly better.", note: "'Slightly' = small change" },
        { sentence: "Expenditure was much greater than expected.", note: "'Much' for big differences" },
      ]},
    [
      { question: "'ROI' stands for:", options: ["Rate of Income", "Return on Investment", "Report of Interest", "Revenue of Industry"], correct: 1 },
      { question: "'Overhead' means:", options: ["Profits", "Ongoing costs", "Revenue", "Savings"], correct: 1 },
    ],
    [
      { question: "A 'forecast' is:", options: ["A past report", "A prediction", "A receipt", "A budget cut"], correct: 1 },
      { question: "'Quarterly' means:", options: ["Every year", "Every 3 months", "Every week", "Every day"], correct: 1 },
    ],
    [
      { question: "'Revenue is ___ than last year.'", options: ["high", "higher", "highest", "highly"], correct: 1 },
      { question: "'Costs were significantly ___.'", options: ["low", "lower", "lowest", "lowing"], correct: 1 },
    ],
    [
      { question: "'Break-even' is when:", options: ["Profit is maximum", "Costs equal revenue", "Company closes", "Prices drop"], correct: 1 },
      { question: "An 'audit' is:", options: ["A meeting", "A financial examination", "A report", "A budget"], correct: 1 },
      { question: "'Allocate' means:", options: ["To save", "To distribute", "To reduce", "To hide"], correct: 1 },
    ],
    [
      { question: "'Profit margin' is:", options: ["Total revenue", "Percentage of profit", "Total cost", "Tax rate"], correct: 1 },
      { question: "'Expenditure' means:", options: ["Income", "Money spent", "Savings", "Investments"], correct: 1 },
    ]
  ),

  "business-7": l(7, "Human Resources", "Learn HR vocabulary for recruitment, policies, and employee management.",
    [
      { word: "Recruit", meaning: "To hire new employees", example: "We need to recruit more staff.", emoji: "🔍", arabic: "يوظف" },
      { word: "Onboarding", meaning: "Process of integrating new hires", example: "Onboarding takes two weeks.", emoji: "🎓", arabic: "تهيئة" },
      { word: "Probation", meaning: "Trial period for new employees", example: "You're on probation for 3 months.", emoji: "⏳", arabic: "فترة اختبار" },
      { word: "Appraisal", meaning: "Performance review", example: "Annual appraisals are in December.", emoji: "📊", arabic: "تقييم أداء" },
      { word: "Benefits", meaning: "Extra perks beyond salary", example: "Benefits include health insurance.", emoji: "🎁", arabic: "مزايا" },
      { word: "Terminate", meaning: "To end employment", example: "His contract was terminated.", emoji: "🚫", arabic: "إنهاء" },
      { word: "Policy", meaning: "Company rules and guidelines", example: "Read the company policy handbook.", emoji: "📖", arabic: "سياسة" },
      { word: "Leave", meaning: "Approved time off work", example: "She's on maternity leave.", emoji: "🏖️", arabic: "إجازة" },
      { word: "Payroll", meaning: "System for paying employees", example: "Payroll runs on the 25th.", emoji: "💰", arabic: "كشف الرواتب" },
      { word: "Compliance", meaning: "Following rules and regulations", example: "We must ensure compliance.", emoji: "✅", arabic: "امتثال" },
    ],
    [
      { speaker: "HR", text: "Welcome aboard! Let me walk you through the onboarding process." },
      { speaker: "New hire", text: "Thank you. When does my probation period end?" },
      { speaker: "HR", text: "After three months. You'll have a performance appraisal then." },
      { speaker: "New hire", text: "What benefits does the company offer?" },
      { speaker: "HR", text: "Health insurance, paid leave, and a pension plan." },
    ],
    { title: "Passive Voice in Policies", explanation: "Company policies often use passive voice to sound objective. 'Employees are required to...' is more formal than 'You must...'",
      examples: [
        { sentence: "Employees are required to submit timesheets weekly.", note: "Passive — formal policy" },
        { sentence: "Leave must be approved by your manager.", note: "Passive — procedure" },
        { sentence: "Performance is reviewed annually.", note: "Passive — routine" },
        { sentence: "Violations will be addressed by HR.", note: "Passive — consequences" },
      ]},
    [
      { question: "'Onboarding' is:", options: ["Firing someone", "Integrating new hires", "A board meeting", "A training course"], correct: 1 },
      { question: "'Probation' is:", options: ["A promotion", "A trial period", "A type of leave", "A salary raise"], correct: 1 },
    ],
    [
      { question: "Who handles recruitment?", options: ["IT department", "HR department", "Finance", "Marketing"], correct: 1 },
      { question: "'Benefits' include:", options: ["Only salary", "Extra perks", "Overtime only", "Taxes"], correct: 1 },
    ],
    [
      { question: "'Employees ___ required to submit reports.'", options: ["is", "are", "be", "was"], correct: 1 },
      { question: "'Leave must ___ approved.'", options: ["is", "are", "be", "being"], correct: 2 },
    ],
    [
      { question: "'Payroll' relates to:", options: ["Product delivery", "Paying employees", "Marketing", "Customer service"], correct: 1 },
      { question: "'Compliance' means:", options: ["Breaking rules", "Following regulations", "Making rules", "Ignoring rules"], correct: 1 },
      { question: "An 'appraisal' is a:", options: ["Salary cut", "Performance review", "Job interview", "Company event"], correct: 1 },
    ],
    [
      { question: "'Terminate' means to:", options: ["Begin", "End employment", "Promote", "Transfer"], correct: 1 },
      { question: "Company 'policy' is:", options: ["Advice", "Rules and guidelines", "Suggestions", "Opinions"], correct: 1 },
    ]
  ),

  "business-8": l(8, "Marketing & Branding", "Master marketing terminology and discuss brand strategies in English.",
    [
      { word: "Brand", meaning: "Identity of a product or company", example: "Apple is a strong brand.", emoji: "🏷️", arabic: "علامة تجارية" },
      { word: "Campaign", meaning: "Organized marketing effort", example: "We launched a new ad campaign.", emoji: "📢", arabic: "حملة" },
      { word: "Target audience", meaning: "Intended group of customers", example: "Our target audience is millennials.", emoji: "🎯", arabic: "جمهور مستهدف" },
      { word: "Market share", meaning: "Company's portion of sales", example: "We increased market share by 5%.", emoji: "📊", arabic: "حصة سوقية" },
      { word: "SEO", meaning: "Search Engine Optimization", example: "SEO drives organic traffic.", emoji: "🔍", arabic: "تحسين محركات البحث" },
      { word: "Engagement", meaning: "Interaction with content", example: "Social media engagement is up.", emoji: "❤️", arabic: "تفاعل" },
      { word: "Conversion", meaning: "Turning visitor into customer", example: "Our conversion rate improved.", emoji: "🔄", arabic: "تحويل" },
      { word: "Analytics", meaning: "Data analysis for decisions", example: "Check the website analytics.", emoji: "📈", arabic: "تحليلات" },
      { word: "Launch", meaning: "To introduce a new product", example: "We'll launch the product in May.", emoji: "🚀", arabic: "إطلاق" },
      { word: "Slogan", meaning: "A catchy phrase for a brand", example: "Nike's slogan: 'Just Do It'.", emoji: "💬", arabic: "شعار" },
    ],
    [
      { speaker: "Director", text: "How's the new campaign performing?" },
      { speaker: "Marketer", text: "Engagement is up 30%, and conversion rates have improved." },
      { speaker: "Director", text: "Excellent. What about our SEO rankings?" },
      { speaker: "Marketer", text: "We've moved to the first page for key terms." },
      { speaker: "Director", text: "Great work. Let's prepare for the product launch next month." },
    ],
    { title: "Present Perfect for Results", explanation: "Use present perfect (have/has + past participle) to discuss results and achievements that are relevant now.",
      examples: [
        { sentence: "We have increased brand awareness significantly.", note: "Result still relevant now" },
        { sentence: "The campaign has generated 10,000 leads.", note: "Completed with current relevance" },
        { sentence: "Our market share has grown by 5%.", note: "Recent achievement" },
        { sentence: "We haven't launched the product yet.", note: "Hasn't happened — still planned" },
      ]},
    [
      { question: "'SEO' stands for:", options: ["Sales and Exchange Office", "Search Engine Optimization", "Social Engagement Online", "Strategic Execution Order"], correct: 1 },
      { question: "'Conversion' means:", options: ["Viewing a page", "Turning a visitor into a customer", "Writing content", "Advertising"], correct: 1 },
    ],
    [
      { question: "A 'target audience' is:", options: ["All people", "Intended customers", "Competitors", "Employees"], correct: 1 },
      { question: "High 'engagement' means:", options: ["People ignore content", "People interact a lot", "Low traffic", "Bad reviews"], correct: 1 },
    ],
    [
      { question: "'We ___ increased sales by 20%.'", options: ["has", "have", "had", "having"], correct: 1 },
      { question: "'The campaign ___ generated great results.'", options: ["have", "has", "had", "is"], correct: 1 },
    ],
    [
      { question: "A 'slogan' is:", options: ["A logo", "A catchy phrase", "A product name", "A price tag"], correct: 1 },
      { question: "'Market share' is:", options: ["Total market size", "Company's portion of sales", "Stock price", "Employee count"], correct: 1 },
      { question: "'Analytics' helps with:", options: ["Guessing", "Data-driven decisions", "Avoiding work", "Design only"], correct: 1 },
    ],
    [
      { question: "'Launch' means:", options: ["To end a product", "To introduce a product", "To discount", "To remove"], correct: 1 },
      { question: "A 'campaign' is:", options: ["A single ad", "An organized marketing effort", "A discount code", "A brand name"], correct: 1 },
    ]
  ),

  "business-9": l(9, "Supply Chain & Logistics", "Learn vocabulary for managing supply chains, shipping, and inventory.",
    [
      { word: "Supply chain", meaning: "System from production to delivery", example: "Our supply chain is efficient.", emoji: "🔗", arabic: "سلسلة التوريد" },
      { word: "Inventory", meaning: "Stock of goods", example: "Check the inventory levels.", emoji: "📦", arabic: "مخزون" },
      { word: "Shipment", meaning: "Goods being transported", example: "The shipment arrives Friday.", emoji: "🚚", arabic: "شحنة" },
      { word: "Warehouse", meaning: "Building for storing goods", example: "The warehouse is near the port.", emoji: "🏭", arabic: "مستودع" },
      { word: "Logistics", meaning: "Managing transport and supply", example: "Logistics handles all deliveries.", emoji: "📋", arabic: "لوجستيات" },
      { word: "Procurement", meaning: "Process of obtaining goods", example: "Procurement negotiates with suppliers.", emoji: "🛒", arabic: "مشتريات" },
      { word: "Lead time", meaning: "Time from order to delivery", example: "Lead time is two weeks.", emoji: "⏱️", arabic: "وقت التسليم" },
      { word: "Vendor", meaning: "A seller or supplier", example: "We work with three vendors.", emoji: "🤝", arabic: "مورد" },
      { word: "Customs", meaning: "Government import/export checks", example: "The package is stuck in customs.", emoji: "🛃", arabic: "جمارك" },
      { word: "Freight", meaning: "Goods transported in bulk", example: "Freight costs have risen.", emoji: "🚢", arabic: "شحن" },
    ],
    [
      { speaker: "Manager", text: "Has the shipment from our vendor arrived?" },
      { speaker: "Logistics", text: "Not yet. It's stuck in customs clearance." },
      { speaker: "Manager", text: "What's the expected lead time?" },
      { speaker: "Logistics", text: "About five more days. I'll update inventory once it arrives." },
      { speaker: "Manager", text: "Please coordinate with procurement for the next order." },
    ],
    { title: "Future Tense for Planning", explanation: "Use 'will' for decisions made now, 'going to' for planned actions, and present continuous for fixed arrangements.",
      examples: [
        { sentence: "The shipment will arrive next week.", note: "'Will' for predictions" },
        { sentence: "We're going to switch vendors next quarter.", note: "'Going to' for plans" },
        { sentence: "I'm meeting the supplier tomorrow.", note: "Present continuous for arrangements" },
        { sentence: "Freight costs will likely increase.", note: "'Will' for forecasts" },
      ]},
    [
      { question: "'Lead time' is:", options: ["Shipping cost", "Time from order to delivery", "A type of product", "A warehouse location"], correct: 1 },
      { question: "'Procurement' is:", options: ["Selling goods", "Obtaining goods", "Delivering goods", "Storing goods"], correct: 1 },
    ],
    [
      { question: "'Customs' relates to:", options: ["Traditions", "Import/export checks", "Customer service", "Marketing"], correct: 1 },
      { question: "An 'inventory' is:", options: ["A tool", "Stock of goods", "A vehicle", "A building"], correct: 1 },
    ],
    [
      { question: "'The order ___ arrive on Monday.' (prediction)", options: ["will", "going to", "is", "was"], correct: 0 },
      { question: "'We ___ to change suppliers.' (plan)", options: ["will", "are going", "is going", "were going"], correct: 1 },
    ],
    [
      { question: "A 'warehouse' is for:", options: ["Selling products", "Storing goods", "Manufacturing", "Advertising"], correct: 1 },
      { question: "'Freight' means:", options: ["Light goods", "Bulk goods transported", "A type of ship", "A discount"], correct: 1 },
      { question: "A 'vendor' is:", options: ["A buyer", "A seller/supplier", "A manager", "A customer"], correct: 1 },
    ],
    [
      { question: "'Supply chain' covers:", options: ["Only delivery", "Production to delivery", "Only manufacturing", "Only sales"], correct: 1 },
      { question: "'Logistics' manages:", options: ["Marketing", "Transport and supply", "Hiring", "Finance"], correct: 1 },
    ]
  ),

  "business-10": l(10, "Customer Service Excellence", "Handle customer complaints, inquiries, and feedback professionally.",
    [
      { word: "Complaint", meaning: "Expression of dissatisfaction", example: "We received a complaint.", emoji: "😤", arabic: "شكوى" },
      { word: "Resolve", meaning: "To find a solution", example: "Let's resolve this issue.", emoji: "✅", arabic: "يحل" },
      { word: "Refund", meaning: "Money returned to customer", example: "We'll process your refund.", emoji: "💰", arabic: "استرداد" },
      { word: "Escalate", meaning: "To pass to a higher authority", example: "I'll escalate this to management.", emoji: "⬆️", arabic: "يصعّد" },
      { word: "Feedback", meaning: "Customer opinions and comments", example: "We value your feedback.", emoji: "💬", arabic: "ملاحظات" },
      { word: "Satisfaction", meaning: "Customer happiness with service", example: "Customer satisfaction is our priority.", emoji: "😊", arabic: "رضا" },
      { word: "Warranty", meaning: "Guarantee on a product", example: "The warranty covers 2 years.", emoji: "🛡️", arabic: "ضمان" },
      { word: "Exchange", meaning: "To swap for another item", example: "Can I exchange this product?", emoji: "🔄", arabic: "استبدال" },
      { word: "Empathy", meaning: "Understanding others' feelings", example: "Show empathy to upset customers.", emoji: "❤️", arabic: "تعاطف" },
      { word: "SLA", meaning: "Service Level Agreement", example: "Our SLA guarantees 24h response.", emoji: "📋", arabic: "اتفاقية مستوى الخدمة" },
    ],
    [
      { speaker: "Customer", text: "I'm not happy with the product I received. It's damaged." },
      { speaker: "Agent", text: "I'm sorry to hear that. Let me look into this for you." },
      { speaker: "Customer", text: "I'd like a refund or an exchange." },
      { speaker: "Agent", text: "Of course. I can process an exchange right away. Would that work?" },
      { speaker: "Customer", text: "Yes, thank you. I appreciate your help." },
    ],
    { title: "Empathetic Language Patterns", explanation: "Use empathetic phrases to acknowledge feelings before offering solutions. This de-escalates situations and builds trust.",
      examples: [
        { sentence: "I understand your frustration.", note: "Acknowledging the feeling" },
        { sentence: "I'm sorry for the inconvenience.", note: "Apologizing sincerely" },
        { sentence: "Let me see what I can do for you.", note: "Showing willingness to help" },
        { sentence: "I appreciate your patience.", note: "Thanking the customer" },
      ]},
    [
      { question: "To 'escalate' means:", options: ["To fix immediately", "To pass to higher authority", "To ignore", "To apologize"], correct: 1 },
      { question: "'SLA' stands for:", options: ["Sales Lead Action", "Service Level Agreement", "Standard Legal Advice", "Special Loyalty Award"], correct: 1 },
    ],
    [
      { question: "First step with an upset customer:", options: ["Argue back", "Show empathy", "Offer a discount", "Ignore them"], correct: 1 },
      { question: "'I understand your frustration' shows:", options: ["Anger", "Empathy", "Indifference", "Confusion"], correct: 1 },
    ],
    [
      { question: "'I ___ sorry for the inconvenience.'", options: ["is", "am", "are", "be"], correct: 1 },
      { question: "'Let me ___ what I can do.'", options: ["seeing", "sees", "see", "saw"], correct: 2 },
    ],
    [
      { question: "A 'warranty' is:", options: ["A receipt", "A product guarantee", "A complaint", "An invoice"], correct: 1 },
      { question: "'Refund' means:", options: ["Extra charge", "Money returned", "Discount", "Free product"], correct: 1 },
      { question: "Good customer service requires:", options: ["Speed only", "Empathy and solutions", "Ignoring problems", "Blaming the customer"], correct: 1 },
    ],
    [
      { question: "'Feedback' is:", options: ["A product", "Customer opinions", "A warranty", "A price"], correct: 1 },
      { question: "'Satisfaction' means:", options: ["Anger", "Happiness with service", "A complaint", "A refund"], correct: 1 },
    ]
  ),

  "business-11": l(11, "Project Management", "Learn project management vocabulary and discuss timelines, tasks, and teamwork.",
    [
      { word: "Milestone", meaning: "Key achievement in a project", example: "We reached a major milestone.", emoji: "🏆", arabic: "إنجاز رئيسي" },
      { word: "Scope", meaning: "Range of work in a project", example: "Don't expand the project scope.", emoji: "📐", arabic: "نطاق" },
      { word: "Deliverable", meaning: "A completed work product", example: "The report is a key deliverable.", emoji: "📦", arabic: "مُخرَج" },
      { word: "Stakeholder", meaning: "Person with project interest", example: "Keep stakeholders updated.", emoji: "👥", arabic: "صاحب مصلحة" },
      { word: "Sprint", meaning: "Short, focused work period", example: "This sprint lasts two weeks.", emoji: "🏃", arabic: "سباق عمل" },
      { word: "Bottleneck", meaning: "A point causing delay", example: "Testing is our bottleneck.", emoji: "🔧", arabic: "عنق زجاجة" },
      { word: "KPI", meaning: "Key Performance Indicator", example: "Track your KPIs weekly.", emoji: "📊", arabic: "مؤشر أداء" },
      { word: "Risk", meaning: "Potential problem or threat", example: "We need a risk assessment.", emoji: "⚠️", arabic: "مخاطرة" },
      { word: "Resource", meaning: "People, time, or money available", example: "We lack resources for this task.", emoji: "💡", arabic: "مورد" },
      { word: "Iteration", meaning: "A repeated cycle of improvement", example: "Each iteration improves the product.", emoji: "🔄", arabic: "تكرار" },
    ],
    [
      { speaker: "PM", text: "Where are we on the project timeline?" },
      { speaker: "Developer", text: "We've completed the first milestone. Testing starts this sprint." },
      { speaker: "PM", text: "Any bottlenecks we should address?" },
      { speaker: "Developer", text: "We need more resources for QA testing." },
      { speaker: "PM", text: "I'll talk to stakeholders about reallocating budget." },
    ],
    { title: "Reporting Progress with Tenses", explanation: "Use past simple for completed tasks, present perfect for recent achievements, and present continuous for ongoing work.",
      examples: [
        { sentence: "We completed the design phase last week.", note: "Past simple — finished" },
        { sentence: "We've finished the first sprint.", note: "Present perfect — recent" },
        { sentence: "We're currently working on the backend.", note: "Present continuous — ongoing" },
        { sentence: "The next milestone is due on Friday.", note: "Present simple — scheduled" },
      ]},
    [
      { question: "A 'milestone' is:", options: ["A type of stone", "A key achievement", "A budget item", "A team member"], correct: 1 },
      { question: "'KPI' stands for:", options: ["Key Project Item", "Key Performance Indicator", "Knowledge Process Index", "Known Priority Issue"], correct: 1 },
    ],
    [
      { question: "A 'bottleneck' causes:", options: ["Speed", "Delays", "Savings", "Promotions"], correct: 1 },
      { question: "'Scope' in a project means:", options: ["Budget", "Range of work", "Team size", "Location"], correct: 1 },
    ],
    [
      { question: "'We ___ the design phase last week.'", options: ["complete", "completed", "completing", "have completed"], correct: 1 },
      { question: "'We ___ currently working on testing.'", options: ["is", "are", "was", "were"], correct: 1 },
    ],
    [
      { question: "A 'deliverable' is:", options: ["A deadline", "A completed work product", "A team meeting", "A budget"], correct: 1 },
      { question: "A 'sprint' is:", options: ["A long project", "A short work period", "A type of report", "A meeting"], correct: 1 },
      { question: "'Risk' means:", options: ["Certainty", "Potential problem", "A reward", "A milestone"], correct: 1 },
    ],
    [
      { question: "'Iteration' means:", options: ["A final version", "A repeated improvement cycle", "A team event", "A deadline"], correct: 1 },
      { question: "A 'resource' can be:", options: ["Only money", "People, time, or money", "Only people", "Only time"], correct: 1 },
    ]
  ),

  "business-12": l(12, "Leadership & Management", "Develop English skills for leadership roles and team management.",
    [
      { word: "Delegate", meaning: "To assign tasks to others", example: "Good leaders delegate effectively.", emoji: "📋", arabic: "يُفوّض" },
      { word: "Mentor", meaning: "An experienced advisor", example: "She's my mentor at work.", emoji: "🧑‍🏫", arabic: "مرشد" },
      { word: "Initiative", meaning: "Taking action without being told", example: "She shows great initiative.", emoji: "🚀", arabic: "مبادرة" },
      { word: "Accountability", meaning: "Being responsible for actions", example: "We need more accountability.", emoji: "✅", arabic: "مساءلة" },
      { word: "Vision", meaning: "A clear plan for the future", example: "Share your vision with the team.", emoji: "👁️", arabic: "رؤية" },
      { word: "Empower", meaning: "To give authority or confidence", example: "Empower your team to decide.", emoji: "💪", arabic: "يُمكّن" },
      { word: "Motivate", meaning: "To inspire to take action", example: "A good leader motivates others.", emoji: "🔥", arabic: "يُحفّز" },
      { word: "Feedback", meaning: "Constructive comments on work", example: "Give specific feedback.", emoji: "💬", arabic: "ملاحظات" },
      { word: "Strategy", meaning: "A long-term plan", example: "Our strategy focuses on growth.", emoji: "♟️", arabic: "استراتيجية" },
      { word: "Collaborate", meaning: "To work together", example: "Let's collaborate on this project.", emoji: "🤝", arabic: "يتعاون" },
    ],
    [
      { speaker: "CEO", text: "How's the team performing this quarter?" },
      { speaker: "Manager", text: "They've shown great initiative. Morale is high." },
      { speaker: "CEO", text: "Are you delegating enough? You seem overloaded." },
      { speaker: "Manager", text: "I've started empowering team leads to make decisions." },
      { speaker: "CEO", text: "That's the right approach. A good leader builds leaders." },
    ],
    { title: "Gerunds vs. Infinitives in Management", explanation: "Some verbs take gerunds (verb+ing), others take infinitives (to+verb). Learn which management verbs use which form.",
      examples: [
        { sentence: "I enjoy mentoring new employees.", note: "Enjoy + gerund" },
        { sentence: "We need to delegate more tasks.", note: "Need + infinitive" },
        { sentence: "Consider empowering your team.", note: "Consider + gerund" },
        { sentence: "I want to motivate my team.", note: "Want + infinitive" },
      ]},
    [
      { question: "To 'delegate' means:", options: ["To do everything yourself", "To assign tasks", "To quit", "To complain"], correct: 1 },
      { question: "'Accountability' means:", options: ["Avoiding blame", "Being responsible", "Hiding mistakes", "Working alone"], correct: 1 },
    ],
    [
      { question: "A good leader should:", options: ["Micromanage everything", "Empower their team", "Avoid feedback", "Work alone"], correct: 1 },
      { question: "'Initiative' means:", options: ["Waiting for orders", "Taking action proactively", "Following only", "Avoiding risk"], correct: 1 },
    ],
    [
      { question: "'I enjoy ___ new employees.'", options: ["mentor", "mentoring", "to mentor", "mentored"], correct: 1 },
      { question: "'We need ___ more tasks.'", options: ["delegate", "delegating", "to delegate", "delegated"], correct: 2 },
    ],
    [
      { question: "A 'mentor' is:", options: ["A competitor", "An experienced advisor", "A new hire", "A vendor"], correct: 1 },
      { question: "'Strategy' is:", options: ["A short-term task", "A long-term plan", "A meeting", "A tool"], correct: 1 },
      { question: "'Collaborate' means:", options: ["Work alone", "Compete", "Work together", "Avoid others"], correct: 2 },
    ],
    [
      { question: "'Empower' means:", options: ["To control", "To give authority", "To fire", "To limit"], correct: 1 },
      { question: "'Vision' in leadership is:", options: ["Eyesight", "A clear future plan", "A dream", "A report"], correct: 1 },
    ]
  ),

  "business-13": l(13, "Business Etiquette", "Understand cultural norms and professional behavior in business settings.",
    [
      { word: "Etiquette", meaning: "Rules of polite behavior", example: "Business etiquette varies by culture.", emoji: "🎩", arabic: "آداب" },
      { word: "Punctual", meaning: "On time", example: "Always be punctual for meetings.", emoji: "⏰", arabic: "دقيق في المواعيد" },
      { word: "Dress code", meaning: "Rules about clothing", example: "The dress code is business casual.", emoji: "👔", arabic: "قواعد اللباس" },
      { word: "Small talk", meaning: "Light, casual conversation", example: "Start with small talk before business.", emoji: "💬", arabic: "حديث عابر" },
      { word: "Protocol", meaning: "Official procedure or rules", example: "Follow the meeting protocol.", emoji: "📜", arabic: "بروتوكول" },
      { word: "Courtesy", meaning: "Polite and considerate behavior", example: "Show courtesy to all visitors.", emoji: "🙏", arabic: "لطف" },
      { word: "Confidential", meaning: "Private, not to be shared", example: "This information is confidential.", emoji: "🔒", arabic: "سري" },
      { word: "Appropriate", meaning: "Suitable for the situation", example: "Is this outfit appropriate?", emoji: "✅", arabic: "مناسب" },
      { word: "Diplomatic", meaning: "Tactful and sensitive", example: "Be diplomatic when criticizing.", emoji: "🕊️", arabic: "دبلوماسي" },
      { word: "Handshake", meaning: "Greeting by shaking hands", example: "A firm handshake shows confidence.", emoji: "🤝", arabic: "مصافحة" },
    ],
    [
      { speaker: "Colleague A", text: "Is it okay to arrive a few minutes late to meetings here?" },
      { speaker: "Colleague B", text: "No, being punctual is very important in our company culture." },
      { speaker: "Colleague A", text: "What about the dress code?" },
      { speaker: "Colleague B", text: "Business casual on regular days, formal for client meetings." },
      { speaker: "Colleague A", text: "Got it. Thanks for the heads up!" },
    ],
    { title: "Should/Shouldn't for Advice", explanation: "Use 'should' and 'shouldn't' to give advice about professional behavior and etiquette.",
      examples: [
        { sentence: "You should arrive on time for all meetings.", note: "Positive advice" },
        { sentence: "You shouldn't use your phone during presentations.", note: "Negative advice" },
        { sentence: "You should dress appropriately for client meetings.", note: "Professional tip" },
        { sentence: "You shouldn't share confidential information.", note: "Warning" },
      ]},
    [
      { question: "'Punctual' means:", options: ["Late", "On time", "Early always", "Absent"], correct: 1 },
      { question: "'Confidential' means:", options: ["Public", "Private", "Open", "Shared"], correct: 1 },
    ],
    [
      { question: "Good business etiquette includes:", options: ["Being late", "Being punctual and polite", "Ignoring others", "Talking loudly"], correct: 1 },
      { question: "'Small talk' is:", options: ["Whispering", "Light casual conversation", "Arguing", "Negotiating"], correct: 1 },
    ],
    [
      { question: "'You ___ arrive on time.'", options: ["should", "shouldn't", "mustn't", "can't"], correct: 0 },
      { question: "'You ___ share private data.'", options: ["should", "shouldn't", "must", "can"], correct: 1 },
    ],
    [
      { question: "'Diplomatic' means:", options: ["Rude", "Tactful", "Aggressive", "Silent"], correct: 1 },
      { question: "A 'dress code' is:", options: ["A secret code", "Clothing rules", "A password", "A greeting"], correct: 1 },
      { question: "'Protocol' means:", options: ["Casual behavior", "Official procedures", "Breaking rules", "Ignoring norms"], correct: 1 },
    ],
    [
      { question: "'Courtesy' means:", options: ["Rudeness", "Polite behavior", "Formality only", "Speed"], correct: 1 },
      { question: "'Appropriate' means:", options: ["Wrong", "Suitable", "Casual", "Expensive"], correct: 1 },
    ]
  ),

  "business-14": l(14, "International Trade", "Learn vocabulary for import/export, tariffs, and global business.",
    [
      { word: "Export", meaning: "To sell goods to another country", example: "We export to 30 countries.", emoji: "📤", arabic: "تصدير" },
      { word: "Import", meaning: "To buy goods from another country", example: "We import raw materials.", emoji: "📥", arabic: "استيراد" },
      { word: "Tariff", meaning: "Tax on imported goods", example: "New tariffs increased costs.", emoji: "💲", arabic: "تعريفة جمركية" },
      { word: "Quota", meaning: "Limit on quantity of imports", example: "There's a quota on steel imports.", emoji: "📊", arabic: "حصة" },
      { word: "Trade agreement", meaning: "Deal between countries for trade", example: "We signed a new trade agreement.", emoji: "📝", arabic: "اتفاقية تجارية" },
      { word: "Currency", meaning: "Money used in a country", example: "Pay in local currency.", emoji: "💱", arabic: "عملة" },
      { word: "Commodity", meaning: "A basic good traded in bulk", example: "Oil is a key commodity.", emoji: "🛢️", arabic: "سلعة" },
      { word: "Embargo", meaning: "Ban on trade with a country", example: "The embargo affected imports.", emoji: "🚫", arabic: "حظر" },
      { word: "Bilateral", meaning: "Involving two parties/countries", example: "A bilateral trade deal was signed.", emoji: "🤝", arabic: "ثنائي" },
      { word: "Surplus", meaning: "More than needed; excess", example: "We have a trade surplus.", emoji: "📈", arabic: "فائض" },
    ],
    [
      { speaker: "Trader", text: "How will the new tariffs affect our imports?" },
      { speaker: "Analyst", text: "Costs will increase by about 8%." },
      { speaker: "Trader", text: "Should we look for domestic suppliers?" },
      { speaker: "Analyst", text: "That's one option. Or we could negotiate better terms." },
      { speaker: "Trader", text: "Let's explore both options and compare costs." },
    ],
    { title: "Cause and Effect with Trade", explanation: "Use linking words to show cause and effect in trade discussions: because, due to, as a result, therefore, consequently.",
      examples: [
        { sentence: "Due to new tariffs, costs have risen.", note: "'Due to' introduces the cause" },
        { sentence: "Trade increased; therefore, GDP grew.", note: "'Therefore' shows the result" },
        { sentence: "As a result of the embargo, supplies dropped.", note: "'As a result' for consequences" },
        { sentence: "Exports fell because of currency devaluation.", note: "'Because of' for reasons" },
      ]},
    [
      { question: "A 'tariff' is:", options: ["A trade route", "A tax on imports", "A shipping method", "A currency"], correct: 1 },
      { question: "'Bilateral' means:", options: ["One country", "Two parties", "Many countries", "No parties"], correct: 1 },
    ],
    [
      { question: "An 'embargo' is:", options: ["A trade bonus", "A ban on trade", "A tariff reduction", "A quota increase"], correct: 1 },
      { question: "A 'surplus' means:", options: ["Shortage", "Excess", "Balance", "Loss"], correct: 1 },
    ],
    [
      { question: "'___ new tariffs, costs rose.'", options: ["Due to", "Although", "Despite", "Instead of"], correct: 0 },
      { question: "'Trade grew; ___, GDP improved.'", options: ["however", "therefore", "although", "despite"], correct: 1 },
    ],
    [
      { question: "A 'commodity' is:", options: ["A luxury good", "A basic traded good", "A service", "A brand"], correct: 1 },
      { question: "'Quota' means:", options: ["Price limit", "Quantity limit", "Quality standard", "Tax rate"], correct: 1 },
      { question: "'Currency' is:", options: ["A product", "Money of a country", "A stock", "A tariff"], correct: 1 },
    ],
    [
      { question: "'Export' means to:", options: ["Buy from abroad", "Sell to another country", "Store goods", "Manufacture"], correct: 1 },
      { question: "A 'trade agreement' is:", options: ["A personal deal", "A deal between countries", "A company policy", "A tariff"], correct: 1 },
    ]
  ),

  "business-15": l(15, "Entrepreneurship & Startups", "Learn the language of startups, funding, and innovation.",
    [
      { word: "Startup", meaning: "A new business venture", example: "She launched a tech startup.", emoji: "🚀", arabic: "شركة ناشئة" },
      { word: "Pitch deck", meaning: "Presentation for investors", example: "Prepare a strong pitch deck.", emoji: "📊", arabic: "عرض استثماري" },
      { word: "Venture capital", meaning: "Investment in startups", example: "They secured venture capital.", emoji: "💰", arabic: "رأس مال مخاطر" },
      { word: "Scalable", meaning: "Able to grow efficiently", example: "Is your business model scalable?", emoji: "📈", arabic: "قابل للتوسع" },
      { word: "MVP", meaning: "Minimum Viable Product", example: "Launch the MVP first.", emoji: "🛠️", arabic: "منتج أولي" },
      { word: "Pivot", meaning: "To change business direction", example: "We need to pivot our strategy.", emoji: "🔄", arabic: "تغيير اتجاه" },
      { word: "Disruption", meaning: "Innovation that changes an industry", example: "Uber disrupted transportation.", emoji: "💥", arabic: "اضطراب" },
      { word: "Equity", meaning: "Ownership share in a company", example: "Investors received 20% equity.", emoji: "📃", arabic: "حصة ملكية" },
      { word: "Bootstrap", meaning: "Self-fund without investors", example: "We bootstrapped the company.", emoji: "👢", arabic: "تمويل ذاتي" },
      { word: "Incubator", meaning: "Program to help startups grow", example: "We joined a startup incubator.", emoji: "🏢", arabic: "حاضنة أعمال" },
    ],
    [
      { speaker: "Founder", text: "We've built our MVP and have 500 users." },
      { speaker: "Investor", text: "Impressive. What's your plan to scale?" },
      { speaker: "Founder", text: "We're expanding to three new markets next quarter." },
      { speaker: "Investor", text: "How much equity are you offering?" },
      { speaker: "Founder", text: "15% for a $500K investment." },
    ],
    { title: "Present Perfect Continuous for Ongoing Work", explanation: "Use present perfect continuous (have been + verb-ing) to describe ongoing activities that started in the past and continue.",
      examples: [
        { sentence: "We've been developing the product for six months.", note: "Started 6 months ago, still going" },
        { sentence: "She's been working on the pitch deck all week.", note: "Ongoing activity" },
        { sentence: "They've been seeking venture capital since January.", note: "Continuous search" },
        { sentence: "I've been bootstrapping the company for a year.", note: "Self-funding continues" },
      ]},
    [
      { question: "'MVP' stands for:", options: ["Most Valuable Player", "Minimum Viable Product", "Maximum Value Price", "Main Vendor Platform"], correct: 1 },
      { question: "To 'pivot' means:", options: ["To quit", "To change direction", "To copy", "To merge"], correct: 1 },
    ],
    [
      { question: "'Venture capital' is:", options: ["A bank loan", "Investment in startups", "Government funding", "Personal savings"], correct: 1 },
      { question: "A 'scalable' business can:", options: ["Only stay small", "Grow efficiently", "Only work locally", "Never change"], correct: 1 },
    ],
    [
      { question: "'We've been ___ the product for months.'", options: ["develop", "develops", "developing", "developed"], correct: 2 },
      { question: "'She ___ been working on the deck.'", options: ["have", "has", "had", "is"], correct: 1 },
    ],
    [
      { question: "'Equity' means:", options: ["Debt", "Ownership share", "A loan", "A salary"], correct: 1 },
      { question: "To 'bootstrap' means:", options: ["Get a loan", "Self-fund", "Go bankrupt", "Hire investors"], correct: 1 },
      { question: "An 'incubator' helps:", options: ["Large corporations", "Startups grow", "Banks", "Governments"], correct: 1 },
    ],
    [
      { question: "'Disruption' in business means:", options: ["Chaos", "Innovation that changes industry", "A failure", "A merger"], correct: 1 },
      { question: "A 'pitch deck' is for:", options: ["Employees", "Investors", "Customers only", "Competitors"], correct: 1 },
    ]
  ),

  "business-16": l(16, "Corporate Social Responsibility", "Discuss CSR, sustainability, and ethical business practices.",
    [
      { word: "CSR", meaning: "Corporate Social Responsibility", example: "Our CSR program supports education.", emoji: "🌱", arabic: "المسؤولية الاجتماعية" },
      { word: "Sustainability", meaning: "Meeting needs without harming future", example: "Sustainability is our core value.", emoji: "♻️", arabic: "استدامة" },
      { word: "Ethical", meaning: "Morally right and fair", example: "We follow ethical practices.", emoji: "⚖️", arabic: "أخلاقي" },
      { word: "Carbon footprint", meaning: "Total CO2 emissions", example: "We're reducing our carbon footprint.", emoji: "🌍", arabic: "البصمة الكربونية" },
      { word: "Stakeholder", meaning: "Person affected by company actions", example: "Stakeholders care about CSR.", emoji: "👥", arabic: "صاحب مصلحة" },
      { word: "Philanthropy", meaning: "Charitable giving", example: "Our philanthropy fund grows yearly.", emoji: "❤️", arabic: "عمل خيري" },
      { word: "Transparency", meaning: "Openness in operations", example: "We practice full transparency.", emoji: "🔍", arabic: "شفافية" },
      { word: "Renewable", meaning: "Can be replenished naturally", example: "We use renewable energy.", emoji: "☀️", arabic: "متجدد" },
      { word: "Impact", meaning: "Effect on society/environment", example: "Measure your social impact.", emoji: "💫", arabic: "تأثير" },
      { word: "Governance", meaning: "System of company management", example: "Good governance prevents corruption.", emoji: "🏛️", arabic: "حوكمة" },
    ],
    [
      { speaker: "Director", text: "How is our CSR initiative performing?" },
      { speaker: "Manager", text: "We've reduced our carbon footprint by 20%." },
      { speaker: "Director", text: "Excellent. And our community programs?" },
      { speaker: "Manager", text: "Philanthropy spending is up. We funded three schools." },
      { speaker: "Director", text: "This aligns with our sustainability goals. Keep it up." },
    ],
    { title: "Quantifying Impact", explanation: "Use specific numbers and percentages to make CSR reports impactful. Combine with comparative structures.",
      examples: [
        { sentence: "We reduced emissions by 25% compared to last year.", note: "Specific percentage + comparison" },
        { sentence: "Over 10,000 students benefited from our program.", note: "Large numbers for impact" },
        { sentence: "We've invested $2M in renewable energy.", note: "Specific financial commitment" },
        { sentence: "Employee volunteering increased threefold.", note: "Multiplier for dramatic effect" },
      ]},
    [
      { question: "'CSR' stands for:", options: ["Customer Service Review", "Corporate Social Responsibility", "Company Sales Report", "Central Supply Room"], correct: 1 },
      { question: "'Sustainability' means:", options: ["Short-term profit", "Meeting needs without harming future", "Reducing staff", "Increasing sales"], correct: 1 },
    ],
    [
      { question: "'Carbon footprint' refers to:", options: ["Shoe size", "Total CO2 emissions", "Land area", "Water usage"], correct: 1 },
      { question: "Good 'governance' prevents:", options: ["Growth", "Corruption", "Innovation", "Hiring"], correct: 1 },
    ],
    [
      { question: "'We reduced emissions ___ 25%.'", options: ["with", "by", "for", "at"], correct: 1 },
      { question: "'We've invested $2M ___ renewable energy.'", options: ["by", "for", "in", "at"], correct: 2 },
    ],
    [
      { question: "'Philanthropy' means:", options: ["Profit-making", "Charitable giving", "Tax avoidance", "Marketing"], correct: 1 },
      { question: "'Transparency' means:", options: ["Secrecy", "Openness", "Complexity", "Speed"], correct: 1 },
      { question: "'Renewable' energy can be:", options: ["Used once", "Replenished naturally", "Only nuclear", "Fossil fuel"], correct: 1 },
    ],
    [
      { question: "'Ethical' means:", options: ["Profitable", "Morally right", "Legal only", "Popular"], correct: 1 },
      { question: "'Impact' means:", options: ["A collision", "Effect on society", "A product", "A meeting"], correct: 1 },
    ]
  ),

  "business-17": l(17, "Mergers & Acquisitions", "Learn M&A vocabulary for discussing company mergers, acquisitions, and takeovers.",
    [
      { word: "Merger", meaning: "Two companies combining into one", example: "The merger created a tech giant.", emoji: "🤝", arabic: "اندماج" },
      { word: "Acquisition", meaning: "Buying another company", example: "The acquisition cost $5 billion.", emoji: "💰", arabic: "استحواذ" },
      { word: "Takeover", meaning: "Gaining control of a company", example: "A hostile takeover was attempted.", emoji: "🏴", arabic: "استيلاء" },
      { word: "Due diligence", meaning: "Thorough investigation before deal", example: "Complete due diligence first.", emoji: "🔍", arabic: "العناية الواجبة" },
      { word: "Synergy", meaning: "Combined value greater than parts", example: "The merger created synergies.", emoji: "⚡", arabic: "تآزر" },
      { word: "Valuation", meaning: "Estimated worth of a company", example: "The valuation was $10 billion.", emoji: "📊", arabic: "تقييم" },
      { word: "Shareholder", meaning: "Person who owns company shares", example: "Shareholders approved the deal.", emoji: "📈", arabic: "مساهم" },
      { word: "Subsidiary", meaning: "Company owned by a parent company", example: "It became a wholly-owned subsidiary.", emoji: "🏢", arabic: "شركة تابعة" },
      { word: "Integration", meaning: "Combining operations after merger", example: "Post-merger integration is key.", emoji: "🔗", arabic: "تكامل" },
      { word: "Divest", meaning: "To sell off a business unit", example: "They divested the media division.", emoji: "📤", arabic: "يتخلص من" },
    ],
    [
      { speaker: "CEO", text: "We're considering acquiring TechStart Inc." },
      { speaker: "CFO", text: "What's their current valuation?" },
      { speaker: "CEO", text: "Around $200 million. Due diligence is underway." },
      { speaker: "CFO", text: "And the expected synergies?" },
      { speaker: "CEO", text: "We expect $30 million in annual cost savings." },
    ],
    { title: "Reported Speech in Business News", explanation: "When reporting what someone said, change tenses back: present → past, will → would, can → could.",
      examples: [
        { sentence: "The CEO said the merger would create synergies.", note: "'Will create' → 'would create'" },
        { sentence: "They announced that they were acquiring the company.", note: "'Are acquiring' → 'were acquiring'" },
        { sentence: "Analysts reported that the deal could fail.", note: "'Can fail' → 'could fail'" },
        { sentence: "She stated that due diligence had been completed.", note: "'Has been' → 'had been'" },
      ]},
    [
      { question: "A 'merger' is:", options: ["Buying a company", "Two companies combining", "Selling a division", "Going bankrupt"], correct: 1 },
      { question: "'Due diligence' is:", options: ["A legal requirement", "Investigation before a deal", "A type of merger", "A financial report"], correct: 1 },
    ],
    [
      { question: "'Synergy' means:", options: ["Energy savings", "Combined value > parts", "A type of merger", "A loss"], correct: 1 },
      { question: "A 'subsidiary' is:", options: ["A parent company", "A company owned by another", "A competitor", "An investor"], correct: 1 },
    ],
    [
      { question: "He said the deal ___ create value.", options: ["will", "would", "can", "is"], correct: 1 },
      { question: "They announced they ___ acquiring the firm.", options: ["are", "were", "is", "be"], correct: 1 },
    ],
    [
      { question: "A 'takeover' is:", options: ["A friendly merger", "Gaining control of a company", "A joint venture", "A partnership"], correct: 1 },
      { question: "'Valuation' means:", options: ["Revenue", "Estimated worth", "Profit", "Cost"], correct: 1 },
      { question: "To 'divest' means:", options: ["To buy", "To sell off", "To merge", "To invest"], correct: 1 },
    ],
    [
      { question: "'Integration' after a merger means:", options: ["Separation", "Combining operations", "Competition", "Downsizing"], correct: 1 },
      { question: "A 'shareholder' owns:", options: ["Bonds", "Company shares", "The building", "The brand only"], correct: 1 },
    ]
  ),

  "business-18": l(18, "Business Law Basics", "Understand essential legal vocabulary for business contracts and regulations.",
    [
      { word: "Contract", meaning: "Legally binding agreement", example: "Sign the contract by Friday.", emoji: "📝", arabic: "عقد" },
      { word: "Liability", meaning: "Legal responsibility", example: "The company has limited liability.", emoji: "⚖️", arabic: "مسؤولية قانونية" },
      { word: "Compliance", meaning: "Following laws and regulations", example: "Ensure compliance with tax law.", emoji: "✅", arabic: "امتثال" },
      { word: "Intellectual property", meaning: "Creative works protected by law", example: "Protect your intellectual property.", emoji: "💡", arabic: "ملكية فكرية" },
      { word: "Breach", meaning: "Violation of a contract", example: "That's a breach of contract.", emoji: "🚫", arabic: "خرق" },
      { word: "Indemnity", meaning: "Protection against loss", example: "The indemnity clause protects us.", emoji: "🛡️", arabic: "تعويض" },
      { word: "Litigation", meaning: "Process of taking legal action", example: "We want to avoid litigation.", emoji: "⚔️", arabic: "تقاضي" },
      { word: "Arbitration", meaning: "Dispute resolution outside court", example: "Let's settle through arbitration.", emoji: "🤝", arabic: "تحكيم" },
      { word: "Non-disclosure", meaning: "Agreement not to share info", example: "Sign the non-disclosure agreement.", emoji: "🔒", arabic: "عدم إفشاء" },
      { word: "Jurisdiction", meaning: "Authority of a court/area", example: "Which jurisdiction applies?", emoji: "🏛️", arabic: "اختصاص قضائي" },
    ],
    [
      { speaker: "Lawyer", text: "Before signing, review the liability clause carefully." },
      { speaker: "Client", text: "What if the other party breaches the contract?" },
      { speaker: "Lawyer", text: "The indemnity clause protects you in that case." },
      { speaker: "Client", text: "And if we can't resolve it?" },
      { speaker: "Lawyer", text: "We can pursue arbitration before considering litigation." },
    ],
    { title: "Must/Must Not for Legal Obligations", explanation: "Use 'must' for legal requirements and 'must not' for prohibitions. These are stronger than 'should'.",
      examples: [
        { sentence: "You must sign the contract before starting.", note: "'Must' = obligation" },
        { sentence: "Employees must not disclose confidential information.", note: "'Must not' = prohibition" },
        { sentence: "Companies must comply with labor laws.", note: "Legal requirement" },
        { sentence: "You must not breach the non-disclosure agreement.", note: "Strict prohibition" },
      ]},
    [
      { question: "A 'breach' of contract is:", options: ["A renewal", "A violation", "An extension", "A negotiation"], correct: 1 },
      { question: "'Arbitration' is:", options: ["Going to court", "Dispute resolution outside court", "A type of contract", "A law"], correct: 1 },
    ],
    [
      { question: "'Non-disclosure' means:", options: ["Sharing everything", "Not sharing information", "Publishing data", "Advertising"], correct: 1 },
      { question: "'Intellectual property' includes:", options: ["Buildings", "Creative works", "Raw materials", "Employees"], correct: 1 },
    ],
    [
      { question: "'You ___ sign before starting.'", options: ["should", "must", "can", "might"], correct: 1 },
      { question: "'You ___ not disclose secrets.'", options: ["should", "must", "can", "may"], correct: 1 },
    ],
    [
      { question: "'Liability' means:", options: ["Profit", "Legal responsibility", "Asset", "Revenue"], correct: 1 },
      { question: "'Compliance' means:", options: ["Breaking rules", "Following regulations", "Making rules", "Ignoring laws"], correct: 1 },
      { question: "'Litigation' is:", options: ["Negotiation", "Legal action process", "A contract type", "A meeting"], correct: 1 },
    ],
    [
      { question: "'Jurisdiction' refers to:", options: ["Contract length", "Authority of a court", "Company size", "Tax rate"], correct: 1 },
      { question: "'Indemnity' provides:", options: ["Punishment", "Protection against loss", "A bonus", "A discount"], correct: 1 },
    ]
  ),

  "business-19": l(19, "Remote Work & Virtual Teams", "Navigate remote work communication, tools, and challenges.",
    [
      { word: "Remote", meaning: "Working from outside the office", example: "I work remotely three days a week.", emoji: "🏠", arabic: "عن بُعد" },
      { word: "Virtual meeting", meaning: "Online meeting via video", example: "Join the virtual meeting at 10.", emoji: "💻", arabic: "اجتماع افتراضي" },
      { word: "Bandwidth", meaning: "Capacity for tasks (or internet)", example: "I don't have bandwidth for that now.", emoji: "📶", arabic: "سعة" },
      { word: "Asynchronous", meaning: "Not happening at the same time", example: "We communicate asynchronously.", emoji: "⏰", arabic: "غير متزامن" },
      { word: "Time zone", meaning: "Regional time difference", example: "We're in different time zones.", emoji: "🌍", arabic: "منطقة زمنية" },
      { word: "Productivity", meaning: "Efficiency in completing work", example: "Remote work boosts productivity.", emoji: "📈", arabic: "إنتاجية" },
      { word: "Collaboration tool", meaning: "Software for team work", example: "Use Slack as our collaboration tool.", emoji: "🛠️", arabic: "أداة تعاون" },
      { word: "Onboarding", meaning: "Integrating new remote hires", example: "Remote onboarding needs more effort.", emoji: "🎓", arabic: "تهيئة" },
      { word: "Work-life balance", meaning: "Healthy division of work and life", example: "Maintain good work-life balance.", emoji: "⚖️", arabic: "توازن العمل والحياة" },
      { word: "Hybrid", meaning: "Mix of office and remote work", example: "We use a hybrid model.", emoji: "🔀", arabic: "هجين" },
    ],
    [
      { speaker: "Manager", text: "How's the remote team adjusting to the new schedule?" },
      { speaker: "Team lead", text: "Time zones are challenging, but async communication helps." },
      { speaker: "Manager", text: "Are productivity levels maintained?" },
      { speaker: "Team lead", text: "Yes, actually they've improved with the hybrid model." },
      { speaker: "Manager", text: "Great. Let's keep the weekly virtual check-ins." },
    ],
    { title: "Phrasal Verbs for Remote Work", explanation: "Common phrasal verbs in remote work: log in, sign off, dial in, catch up, follow up, set up.",
      examples: [
        { sentence: "I'll log in to the meeting at 9 AM.", note: "'Log in' = connect digitally" },
        { sentence: "Let's catch up on the project status.", note: "'Catch up' = update each other" },
        { sentence: "I need to sign off early today.", note: "'Sign off' = end work for the day" },
        { sentence: "Can you set up the Zoom call?", note: "'Set up' = prepare/arrange" },
      ]},
    [
      { question: "'Asynchronous' means:", options: ["At the same time", "Not at the same time", "Very fast", "In person"], correct: 1 },
      { question: "'Hybrid' work model is:", options: ["Fully remote", "Fully office", "Mix of both", "No work"], correct: 2 },
    ],
    [
      { question: "'Bandwidth' in work context means:", options: ["Internet speed only", "Capacity for tasks", "A type of tool", "A meeting"], correct: 1 },
      { question: "Good remote work requires:", options: ["No communication", "Clear async communication", "Being always online", "Ignoring time zones"], correct: 1 },
    ],
    [
      { question: "'I'll ___ in to the meeting.'", options: ["log", "sign", "turn", "get"], correct: 0 },
      { question: "'Let's ___ up on the project.'", options: ["sign", "log", "catch", "set"], correct: 2 },
    ],
    [
      { question: "'Work-life balance' means:", options: ["Working 24/7", "Healthy work-life division", "No personal time", "Only working"], correct: 1 },
      { question: "A 'collaboration tool' is:", options: ["A hammer", "Team work software", "A document", "A phone"], correct: 1 },
      { question: "'Productivity' means:", options: ["Being busy", "Efficiency in work", "Working long hours", "Attending meetings"], correct: 1 },
    ],
    [
      { question: "'Time zone' differences affect:", options: ["Nothing", "Meeting scheduling", "Product quality", "Salaries"], correct: 1 },
      { question: "'Sign off' means:", options: ["Start working", "End work for the day", "Send an email", "Join a call"], correct: 1 },
    ]
  ),

  "business-20": l(20, "Business Strategy & Planning", "Discuss company strategy, competitive analysis, and strategic planning.",
    [
      { word: "SWOT", meaning: "Strengths, Weaknesses, Opportunities, Threats", example: "Let's do a SWOT analysis.", emoji: "📊", arabic: "تحليل نقاط القوة والضعف" },
      { word: "Competitive advantage", meaning: "Edge over competitors", example: "Innovation is our competitive advantage.", emoji: "🏆", arabic: "ميزة تنافسية" },
      { word: "Market research", meaning: "Studying customer needs and trends", example: "Market research guides our decisions.", emoji: "🔍", arabic: "بحث السوق" },
      { word: "Benchmark", meaning: "Standard for comparison", example: "Benchmark against industry leaders.", emoji: "📏", arabic: "معيار مرجعي" },
      { word: "Diversify", meaning: "To expand into new areas", example: "We should diversify our products.", emoji: "🌐", arabic: "ينوّع" },
      { word: "Forecast", meaning: "To predict future performance", example: "The forecast looks positive.", emoji: "🔮", arabic: "توقعات" },
      { word: "Objective", meaning: "A specific goal to achieve", example: "Our main objective is market expansion.", emoji: "🎯", arabic: "هدف" },
      { word: "Execute", meaning: "To carry out a plan", example: "Execute the strategy this quarter.", emoji: "⚡", arabic: "يُنفّذ" },
      { word: "Roadmap", meaning: "Plan showing key milestones", example: "Follow the product roadmap.", emoji: "🗺️", arabic: "خريطة طريق" },
      { word: "Agile", meaning: "Flexible and responsive to change", example: "We use an agile approach.", emoji: "🏃", arabic: "مرن" },
    ],
    [
      { speaker: "Director", text: "What does our SWOT analysis reveal?" },
      { speaker: "Strategist", text: "Our strength is brand loyalty. Weakness: limited product range." },
      { speaker: "Director", text: "And opportunities?" },
      { speaker: "Strategist", text: "We can diversify into digital services. The market is growing." },
      { speaker: "Director", text: "Let's create a roadmap and execute within six months." },
    ],
    { title: "Expressing Plans and Intentions", explanation: "Use different structures for varying levels of certainty: 'We plan to...', 'We intend to...', 'We aim to...', 'Our goal is to...'",
      examples: [
        { sentence: "We plan to diversify into new markets.", note: "'Plan to' = definite intention" },
        { sentence: "Our objective is to increase market share by 10%.", note: "Formal goal statement" },
        { sentence: "We aim to execute the strategy by Q4.", note: "'Aim to' = target" },
        { sentence: "We intend to benchmark against top competitors.", note: "'Intend to' = firm plan" },
      ]},
    [
      { question: "'SWOT' stands for:", options: ["Sales, Work, Output, Time", "Strengths, Weaknesses, Opportunities, Threats", "Strategy, Wins, Objectives, Targets", "Systems, Work, Operations, Teams"], correct: 1 },
      { question: "To 'diversify' means:", options: ["To focus on one thing", "To expand into new areas", "To reduce", "To merge"], correct: 1 },
    ],
    [
      { question: "A 'benchmark' is:", options: ["A type of seat", "A standard for comparison", "A profit goal", "A team name"], correct: 1 },
      { question: "A 'roadmap' shows:", options: ["Driving directions", "Key milestones", "Employee names", "Daily tasks"], correct: 1 },
    ],
    [
      { question: "'We ___ to expand into Asia.'", options: ["plan", "plans", "planning", "planned"], correct: 0 },
      { question: "'Our objective ___ to grow by 15%.'", options: ["are", "is", "be", "were"], correct: 1 },
    ],
    [
      { question: "'Competitive advantage' is:", options: ["Equal performance", "Edge over competitors", "A type of strategy", "A weakness"], correct: 1 },
      { question: "'Agile' means:", options: ["Rigid", "Flexible", "Slow", "Traditional"], correct: 1 },
      { question: "To 'execute' a plan means:", options: ["To cancel it", "To carry it out", "To write it", "To discuss it"], correct: 1 },
    ],
    [
      { question: "'Market research' studies:", options: ["Employee satisfaction", "Customer needs and trends", "Office space", "Legal issues"], correct: 1 },
      { question: "'Forecast' means:", options: ["To remember", "To predict", "To calculate past data", "To audit"], correct: 1 },
    ]
  ),
};
