import { LessonData } from "./lessons";

export const specializedLessons7: Record<string, LessonData> = {
  "medical-4": {
    levelId: "medical", levelLabel: "Medical English", lessonNumber: 4,
    title: "Pharmacy & Medications",
    description: "Learn vocabulary for buying medicine and understanding prescriptions.",
    vocabulary: [
      { word: "Over-the-counter", meaning: "Medicine available without a prescription", example: "Aspirin is an over-the-counter drug.", emoji: "💊", arabic: "بدون وصفة" },
      { word: "Side effect", meaning: "An unwanted reaction to medicine", example: "Drowsiness is a common side effect.", emoji: "⚠️", arabic: "أثر جانبي" },
      { word: "Dosage", meaning: "The amount of medicine to take", example: "Follow the recommended dosage.", emoji: "📋", arabic: "جرعة" },
      { word: "Tablet", meaning: "A solid form of medicine", example: "Take two tablets after meals.", emoji: "💊", arabic: "قرص" },
      { word: "Syrup", meaning: "Liquid medicine", example: "Give the child one spoon of syrup.", emoji: "🥄", arabic: "شراب" },
      { word: "Antibiotic", meaning: "Medicine that fights bacteria", example: "The doctor prescribed an antibiotic.", emoji: "🦠", arabic: "مضاد حيوي" },
      { word: "Painkiller", meaning: "Medicine that reduces pain", example: "Take a painkiller for the headache.", emoji: "🩹", arabic: "مسكن" },
      { word: "Expiry date", meaning: "When medicine should no longer be used", example: "Check the expiry date before taking it.", emoji: "📅", arabic: "تاريخ انتهاء الصلاحية" },
      { word: "Pharmacist", meaning: "A person who prepares and sells medicine", example: "Ask the pharmacist for advice.", emoji: "👨‍⚕️", arabic: "صيدلاني" },
      { word: "Ointment", meaning: "A cream applied to the skin", example: "Apply the ointment twice a day.", emoji: "🧴", arabic: "مرهم" },
    ],
    dialogue: [
      { speaker: "Customer", text: "Hi, I have a prescription from my doctor." },
      { speaker: "Pharmacist", text: "Let me check. This is an antibiotic — take one tablet twice a day after meals." },
      { speaker: "Customer", text: "Are there any side effects?" },
      { speaker: "Pharmacist", text: "You might feel a bit drowsy. Also, do you need a painkiller? It's over-the-counter." },
      { speaker: "Customer", text: "Yes, please. And when does this ointment expire?" },
    ],
    grammar: {
      title: "Instructions with Imperatives & Frequency",
      explanation: "Medicine instructions use imperatives with frequency: 'Take twice daily', 'Apply every 8 hours', 'Do not exceed 3 tablets'.",
      examples: [
        { sentence: "Take one tablet twice a day.", note: "Frequency instruction" },
        { sentence: "Apply the ointment every 8 hours.", note: "Time-based instruction" },
        { sentence: "Do not exceed the recommended dosage.", note: "Negative imperative — warning" },
        { sentence: "Shake well before use.", note: "Preparation instruction" },
      ],
    },
    vocabExercises: [
      { question: "'Over-the-counter' means:", options: ["Expensive", "Available without prescription", "Imported", "Expired"], correct: 1 },
      { question: "A 'side effect' is:", options: ["The main effect", "An unwanted reaction", "A cure", "A symptom"], correct: 1 },
    ],
    conversationExercises: [
      { question: "A 'pharmacist' is:", options: ["A doctor", "A person who sells medicine", "A nurse", "A surgeon"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'___ one tablet twice a day.'", options: ["Taking", "Takes", "Take", "Took"], correct: 2 },
    ],
    examQuestions: [
      { question: "'Dosage' refers to:", options: ["The name of medicine", "The amount to take", "The price", "The brand"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Expiry date' tells you:", options: ["When to buy", "When medicine should no longer be used", "The price", "The brand"], correct: 1 },
    ],
  },
  "medical-5": {
    levelId: "medical", levelLabel: "Medical English", lessonNumber: 5,
    title: "Mental Health Vocabulary",
    description: "Learn to discuss mental health topics with sensitivity and accuracy.",
    vocabulary: [
      { word: "Anxiety", meaning: "Excessive worry or fear", example: "She suffers from anxiety.", emoji: "😰", arabic: "قلق" },
      { word: "Depression", meaning: "A condition of persistent sadness", example: "Depression is a serious condition.", emoji: "😔", arabic: "اكتئاب" },
      { word: "Therapy", meaning: "Treatment through talking", example: "She started therapy last month.", emoji: "🗣️", arabic: "علاج نفسي" },
      { word: "Counselor", meaning: "A professional who gives guidance", example: "Talk to a school counselor.", emoji: "👩‍⚕️", arabic: "مستشار" },
      { word: "Well-being", meaning: "The state of being healthy and happy", example: "Focus on your well-being.", emoji: "🌟", arabic: "رفاهية" },
      { word: "Stress", meaning: "Mental or emotional pressure", example: "Work stress affects health.", emoji: "😤", arabic: "ضغط نفسي" },
      { word: "Cope", meaning: "To deal with something difficult", example: "How do you cope with stress?", emoji: "💪", arabic: "يتعامل مع" },
      { word: "Self-care", meaning: "Taking care of your own health", example: "Self-care is important.", emoji: "🧘", arabic: "عناية بالنفس" },
      { word: "Mindfulness", meaning: "Being aware of the present moment", example: "Practice mindfulness daily.", emoji: "🧠", arabic: "الوعي الذهني" },
      { word: "Stigma", meaning: "Negative attitudes toward something", example: "We must reduce the stigma around mental health.", emoji: "🚫", arabic: "وصمة" },
    ],
    dialogue: [
      { speaker: "Student", text: "I've been feeling really stressed and anxious lately." },
      { speaker: "Counselor", text: "I'm glad you're talking about it. How long have you felt this way?" },
      { speaker: "Student", text: "A few weeks. I can't cope with all the pressure." },
      { speaker: "Counselor", text: "Self-care and mindfulness can help. Have you considered therapy?" },
      { speaker: "Student", text: "I was worried about stigma, but I want to focus on my well-being." },
    ],
    grammar: {
      title: "Talking About Feelings Sensitively",
      explanation: "Use gentle language: 'I've been feeling...', 'It seems like...', 'Would you like to talk about...?', 'It's okay to feel...'",
      examples: [
        { sentence: "I've been feeling overwhelmed lately.", note: "Present perfect for ongoing state" },
        { sentence: "It's okay to ask for help.", note: "Supportive language" },
        { sentence: "Would you like to talk about what's bothering you?", note: "Gentle invitation" },
        { sentence: "It seems like you're under a lot of pressure.", note: "Empathetic observation" },
      ],
    },
    vocabExercises: [
      { question: "'Stigma' means:", options: ["Support", "Negative attitudes", "A cure", "A symptom"], correct: 1 },
      { question: "'Mindfulness' is:", options: ["Overthinking", "Being aware of the present", "Sleeping well", "Exercising"], correct: 1 },
    ],
    conversationExercises: [
      { question: "'Self-care' means:", options: ["Being selfish", "Taking care of your health", "Working harder", "Ignoring problems"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'I've been ___ stressed lately.'", options: ["feel", "felt", "feeling", "feels"], correct: 2 },
    ],
    examQuestions: [
      { question: "'Therapy' involves:", options: ["Surgery", "Treatment through talking", "Medicine only", "Exercise only"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "To 'cope' means:", options: ["To avoid", "To deal with something", "To run away", "To ignore"], correct: 1 },
    ],
  },
  "it-english-4": {
    levelId: "it-english", levelLabel: "IT English", lessonNumber: 4,
    title: "Project Management in IT",
    description: "Learn English for managing software projects and team communication.",
    vocabulary: [
      { word: "Deadline", meaning: "The final date for completing work", example: "The deadline is next Friday.", emoji: "⏰", arabic: "موعد نهائي" },
      { word: "Milestone", meaning: "An important point in a project", example: "We reached a major milestone.", emoji: "🏁", arabic: "نقطة فارقة" },
      { word: "Stakeholder", meaning: "A person with interest in the project", example: "Present the demo to stakeholders.", emoji: "👥", arabic: "صاحب مصلحة" },
      { word: "Scope", meaning: "The extent of what a project covers", example: "Don't expand the scope mid-project.", emoji: "📐", arabic: "نطاق" },
      { word: "Agile", meaning: "A flexible development methodology", example: "We use Agile for our projects.", emoji: "🔄", arabic: "أجايل" },
      { word: "Standup", meaning: "A brief daily team meeting", example: "Share your updates at the standup.", emoji: "🧍", arabic: "اجتماع يومي قصير" },
      { word: "Backlog", meaning: "A list of tasks to be done", example: "Add the feature to the backlog.", emoji: "📝", arabic: "قائمة المهام" },
      { word: "Blocker", meaning: "Something preventing progress", example: "What's the blocker on this task?", emoji: "🚫", arabic: "عائق" },
      { word: "MVP", meaning: "Minimum Viable Product", example: "Let's ship the MVP first.", emoji: "🚀", arabic: "أقل منتج قابل للتطبيق" },
      { word: "Retrospective", meaning: "A meeting to review what went well/badly", example: "Let's discuss this in the retrospective.", emoji: "🔍", arabic: "اجتماع مراجعة" },
    ],
    dialogue: [
      { speaker: "PM", text: "Good morning team! Let's start the standup. Any blockers?" },
      { speaker: "Developer", text: "I'm blocked on the API — waiting for the backend team." },
      { speaker: "PM", text: "I'll follow up with them. We need to hit the milestone by Thursday." },
      { speaker: "Designer", text: "The MVP design is ready. Should I add it to the backlog?" },
      { speaker: "PM", text: "Yes. Let's keep the scope tight — the deadline is in two weeks." },
    ],
    grammar: {
      title: "Reporting Progress & Status",
      explanation: "Use these patterns: 'I'm working on...', 'I've completed...', 'I'm blocked by...', 'The next step is...'",
      examples: [
        { sentence: "I'm currently working on the login feature.", note: "Present continuous — in progress" },
        { sentence: "I've completed the database migration.", note: "Present perfect — done" },
        { sentence: "I'm blocked by a dependency issue.", note: "Reporting a problem" },
        { sentence: "The next step is to run QA tests.", note: "Stating next action" },
      ],
    },
    vocabExercises: [
      { question: "A 'blocker' is:", options: ["A tool", "Something preventing progress", "A feature", "A meeting"], correct: 1 },
      { question: "'MVP' stands for:", options: ["Most Valuable Player", "Minimum Viable Product", "Major Version Plan", "None"], correct: 1 },
    ],
    conversationExercises: [
      { question: "A 'standup' is:", options: ["Comedy show", "A brief daily meeting", "A presentation", "A report"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'I ___ completed the migration.' (done)", options: ["am", "have", "was", "had"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Scope' refers to:", options: ["Team size", "What the project covers", "The budget", "The timeline"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "A 'retrospective' is:", options: ["A deadline", "A review meeting", "A standup", "A demo"], correct: 1 },
    ],
  },
  "it-english-5": {
    levelId: "it-english", levelLabel: "IT English", lessonNumber: 5,
    title: "Tech Support & Troubleshooting",
    description: "Learn to describe technical problems and provide solutions in English.",
    vocabulary: [
      { word: "Troubleshoot", meaning: "To find and fix problems", example: "Let me troubleshoot the issue.", emoji: "🔧", arabic: "استكشاف الأخطاء" },
      { word: "Crash", meaning: "When software stops working suddenly", example: "The app crashed during the update.", emoji: "💥", arabic: "توقف مفاجئ" },
      { word: "Reboot", meaning: "To restart a device", example: "Try rebooting your computer.", emoji: "🔄", arabic: "إعادة تشغيل" },
      { word: "Error message", meaning: "Text that describes a problem", example: "What does the error message say?", emoji: "❌", arabic: "رسالة خطأ" },
      { word: "Lag", meaning: "Slow response or delay", example: "The video call is lagging.", emoji: "🐢", arabic: "تأخر" },
      { word: "Compatible", meaning: "Able to work together", example: "Is this software compatible with Mac?", emoji: "✅", arabic: "متوافق" },
      { word: "Update", meaning: "A newer version of software", example: "Install the latest update.", emoji: "⬆️", arabic: "تحديث" },
      { word: "Bandwidth", meaning: "The amount of data a connection can handle", example: "Low bandwidth causes lag.", emoji: "📶", arabic: "عرض النطاق" },
      { word: "Cache", meaning: "Stored data for faster access", example: "Clear your browser cache.", emoji: "🗄️", arabic: "ذاكرة مؤقتة" },
      { word: "Ticket", meaning: "A support request record", example: "I'll open a support ticket.", emoji: "🎫", arabic: "تذكرة دعم" },
    ],
    dialogue: [
      { speaker: "User", text: "My computer keeps crashing when I open the app." },
      { speaker: "Support", text: "I see. What error message do you get?" },
      { speaker: "User", text: "It says 'Out of memory'. The whole system lags before crashing." },
      { speaker: "Support", text: "Try clearing your cache and rebooting. Is your software up to date?" },
      { speaker: "User", text: "I'm not sure. Let me check for updates." },
    ],
    grammar: {
      title: "Describing Technical Problems",
      explanation: "Use Present Simple for recurring issues: 'It crashes every time.' Use Present Perfect for current state: 'It has stopped working.'",
      examples: [
        { sentence: "The app crashes every time I open it.", note: "Recurring — Present Simple" },
        { sentence: "My computer has stopped responding.", note: "Current state — Present Perfect" },
        { sentence: "I've been experiencing lag for a week.", note: "Ongoing — Present Perfect Continuous" },
        { sentence: "The error appeared after the update.", note: "Sequence — Past Simple" },
      ],
    },
    vocabExercises: [
      { question: "'Lag' means:", options: ["Speed", "Slow response or delay", "A crash", "An update"], correct: 1 },
      { question: "'Cache' is:", options: ["Money", "Stored data for faster access", "A virus", "A password"], correct: 1 },
    ],
    conversationExercises: [
      { question: "'Reboot' means:", options: ["Shut down permanently", "Restart a device", "Delete files", "Install software"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'The app ___ every time I open it.' (recurring)", options: ["crashed", "crashes", "crashing", "has crashed"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Compatible' means:", options: ["Broken", "Able to work together", "Expensive", "Old"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "A 'ticket' in IT support is:", options: ["A cinema ticket", "A support request record", "A bus pass", "A receipt"], correct: 1 },
    ],
  },
  "engineering-4": {
    levelId: "engineering", levelLabel: "Engineering English", lessonNumber: 4,
    title: "Materials & Properties",
    description: "Learn to describe engineering materials and their properties in English.",
    vocabulary: [
      { word: "Tensile strength", meaning: "Resistance to being pulled apart", example: "Steel has high tensile strength.", emoji: "💪", arabic: "مقاومة الشد" },
      { word: "Durable", meaning: "Long-lasting and strong", example: "We need durable materials.", emoji: "🛡️", arabic: "متين" },
      { word: "Corrosion", meaning: "Damage caused by chemical reaction", example: "Protect against corrosion.", emoji: "🔶", arabic: "تآكل" },
      { word: "Alloy", meaning: "A mixture of metals", example: "Bronze is an alloy of copper and tin.", emoji: "⚙️", arabic: "سبيكة" },
      { word: "Conductivity", meaning: "Ability to transfer heat or electricity", example: "Copper has high conductivity.", emoji: "⚡", arabic: "موصلية" },
      { word: "Brittle", meaning: "Hard but breaks easily", example: "Glass is brittle.", emoji: "💔", arabic: "هش" },
      { word: "Flexible", meaning: "Can bend without breaking", example: "Rubber is very flexible.", emoji: "🔄", arabic: "مرن" },
      { word: "Composite", meaning: "A material made from two or more substances", example: "Carbon fiber is a composite material.", emoji: "🧱", arabic: "مادة مركبة" },
      { word: "Density", meaning: "Mass per unit volume", example: "Lead has a high density.", emoji: "⚖️", arabic: "كثافة" },
      { word: "Fatigue", meaning: "Weakening from repeated stress", example: "Metal fatigue can cause failure.", emoji: "📉", arabic: "إجهاد المواد" },
    ],
    dialogue: [
      { speaker: "Engineer A", text: "What material should we use for the bridge support?" },
      { speaker: "Engineer B", text: "Steel — it has excellent tensile strength and is very durable." },
      { speaker: "Engineer A", text: "What about corrosion? It'll be near the sea." },
      { speaker: "Engineer B", text: "We can use a stainless steel alloy. It resists corrosion well." },
      { speaker: "Engineer A", text: "Good. We should also check for metal fatigue in the design." },
    ],
    grammar: {
      title: "Comparatives for Material Properties",
      explanation: "Compare materials using comparatives: 'stronger than', 'more flexible than', 'less brittle than', 'as durable as'.",
      examples: [
        { sentence: "Steel is stronger than aluminum.", note: "Short adjective + -er" },
        { sentence: "Plastic is more flexible than glass.", note: "'More' + long adjective" },
        { sentence: "Carbon fiber is lighter but stronger than steel.", note: "Double comparison" },
        { sentence: "This alloy is as durable as titanium.", note: "'As...as' for equal comparison" },
      ],
    },
    vocabExercises: [
      { question: "'Brittle' means:", options: ["Flexible", "Hard but breaks easily", "Soft", "Heavy"], correct: 1 },
      { question: "'Corrosion' is:", options: ["Strength", "Chemical damage", "Flexibility", "Weight"], correct: 1 },
    ],
    conversationExercises: [
      { question: "An 'alloy' is:", options: ["A pure metal", "A mixture of metals", "A gas", "A liquid"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'Steel is ___ than aluminum.'", options: ["more strong", "stronger", "most strong", "strong"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Fatigue' in engineering means:", options: ["Being tired", "Weakening from repeated stress", "Corrosion", "Flexibility"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Conductivity' is the ability to:", options: ["Resist force", "Transfer heat or electricity", "Bend", "Break"], correct: 1 },
    ],
  },
  "engineering-5": {
    levelId: "engineering", levelLabel: "Engineering English", lessonNumber: 5,
    title: "Project Planning & Communication",
    description: "Learn to communicate effectively in engineering project meetings.",
    vocabulary: [
      { word: "Blueprint", meaning: "A detailed technical drawing", example: "Review the blueprint before building.", emoji: "📐", arabic: "مخطط هندسي" },
      { word: "Budget", meaning: "The amount of money available", example: "The project is within budget.", emoji: "💰", arabic: "ميزانية" },
      { word: "Timeline", meaning: "A schedule of when things happen", example: "The timeline shows a 6-month plan.", emoji: "📅", arabic: "جدول زمني" },
      { word: "Contractor", meaning: "A person hired to do specific work", example: "The contractor starts next week.", emoji: "👷", arabic: "مقاول" },
      { word: "Milestone", meaning: "A key achievement in a project", example: "We reached the first milestone.", emoji: "🏆", arabic: "نقطة فارقة" },
      { word: "Procurement", meaning: "Obtaining materials and supplies", example: "Handle the procurement of steel.", emoji: "📦", arabic: "شراء وتوريد" },
      { word: "Delegate", meaning: "To assign tasks to others", example: "Delegate the testing to the team.", emoji: "👉", arabic: "يُفوّض" },
      { word: "Scope creep", meaning: "Uncontrolled growth of project scope", example: "Watch out for scope creep.", emoji: "📈", arabic: "توسع غير مخطط" },
      { word: "Deliverable", meaning: "A tangible output of a project", example: "The final deliverable is the report.", emoji: "📄", arabic: "مُخرج" },
      { word: "Stakeholder", meaning: "Someone with interest in the project", example: "Keep the stakeholders informed.", emoji: "👥", arabic: "صاحب مصلحة" },
    ],
    dialogue: [
      { speaker: "Project Lead", text: "Let's review the timeline. Are we on track for the first milestone?" },
      { speaker: "Engineer", text: "Yes, but procurement of materials is slightly delayed." },
      { speaker: "Project Lead", text: "Can you delegate some tasks to speed things up?" },
      { speaker: "Engineer", text: "I'll assign the testing to the junior team. The blueprint is already approved." },
      { speaker: "Project Lead", text: "Good. Let's avoid scope creep — stay within the approved deliverables." },
    ],
    grammar: {
      title: "Reporting & Updating in Meetings",
      explanation: "Use status reporting language: 'We're on track', 'There's a delay in...', 'The next step is...', 'I'd recommend...'",
      examples: [
        { sentence: "We're on track to meet the deadline.", note: "Positive status" },
        { sentence: "There's been a delay in procurement.", note: "Reporting a problem" },
        { sentence: "I'd recommend increasing the budget.", note: "Making a suggestion" },
        { sentence: "The key deliverable is due next month.", note: "Stating a deadline" },
      ],
    },
    vocabExercises: [
      { question: "'Scope creep' means:", options: ["Good progress", "Uncontrolled project growth", "A type of bug", "A deadline"], correct: 1 },
      { question: "A 'deliverable' is:", options: ["A package", "A tangible project output", "A meeting", "A tool"], correct: 1 },
    ],
    conversationExercises: [
      { question: "'Procurement' means:", options: ["Selling products", "Obtaining materials", "Hiring staff", "Testing"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'We're on ___ to meet the deadline.'", options: ["way", "track", "road", "line"], correct: 1 },
    ],
    examQuestions: [
      { question: "A 'blueprint' is:", options: ["A budget", "A technical drawing", "A contract", "A meeting"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Delegate' means:", options: ["To do everything yourself", "To assign tasks to others", "To quit", "To complain"], correct: 1 },
    ],
  },
};
