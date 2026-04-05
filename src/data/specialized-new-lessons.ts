import { LessonData } from "./lessons";

export const specializedNewLessons: Record<string, LessonData> = {
  "travel-1": {
    levelId: "travel", levelLabel: "English for Travel", lessonNumber: 1,
    title: "At the Airport",
    description: "Essential English for navigating airports — check-in, boarding, and customs.",
    vocabulary: [
      { word: "Boarding pass", meaning: "A document allowing you to board a plane", example: "Please show your boarding pass.", emoji: "🎫", arabic: "بطاقة صعود" },
      { word: "Departure", meaning: "The act of leaving", example: "Our departure is at 3 PM.", emoji: "🛫", arabic: "مغادرة" },
      { word: "Arrival", meaning: "Reaching your destination", example: "The arrival time is 8 PM.", emoji: "🛬", arabic: "وصول" },
      { word: "Gate", meaning: "The area where you board the plane", example: "Flight 123 departs from gate B5.", emoji: "🚪", arabic: "بوابة" },
      { word: "Customs", meaning: "The place checking goods entering a country", example: "You must pass through customs.", emoji: "🛃", arabic: "جمارك" },
      { word: "Luggage", meaning: "Bags and suitcases", example: "Collect your luggage at carousel 3.", emoji: "🧳", arabic: "أمتعة" },
      { word: "Passport", meaning: "Official travel document", example: "Don't forget your passport!", emoji: "🛂", arabic: "جواز سفر" },
      { word: "Check-in", meaning: "Registering for a flight", example: "Online check-in opens 24 hours before.", emoji: "✅", arabic: "تسجيل" },
      { word: "Delay", meaning: "A flight arriving/departing late", example: "There's a two-hour delay.", emoji: "⏰", arabic: "تأخير" },
      { word: "Terminal", meaning: "A building at an airport", example: "International flights are in Terminal 3.", emoji: "🏢", arabic: "صالة" },
    ],
    dialogue: [
      { speaker: "Agent", text: "Good morning! May I see your passport and booking reference?" },
      { speaker: "Traveler", text: "Here you are. Do I have a window seat?" },
      { speaker: "Agent", text: "Yes, seat 14A. Would you like to check in any luggage?" },
      { speaker: "Traveler", text: "Just this one suitcase, please. Which gate do I go to?" },
      { speaker: "Agent", text: "Gate B7. Boarding starts at 2:30 PM. Have a great flight!" },
    ],
    grammar: {
      title: "Polite Travel Phrases",
      explanation: "Use polite language at airports: 'Could you tell me...?', 'Where can I find...?', 'I'd like to...'",
      examples: [
        { sentence: "Could you tell me where gate B7 is?", note: "Polite question for directions" },
        { sentence: "I'd like a window seat, please.", note: "Polite preference" },
        { sentence: "Excuse me, where can I find the baggage claim?", note: "Asking for locations" },
        { sentence: "Is there a delay on flight EK 302?", note: "Asking about flight status" },
      ],
    },
    vocabExercises: [
      { question: "A 'boarding pass' allows you to:", options: ["Check in", "Board the plane", "Collect luggage", "Go through customs"], correct: 1 },
      { question: "'Customs' is where:", options: ["You eat", "Goods are checked", "You board", "You sleep"], correct: 1 },
    ],
    conversationExercises: [
      { question: "How do you ask for directions at an airport?", options: ["Where's the gate?!", "Could you tell me where gate B7 is?", "Gate! Now!", "I need gate"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Which is most polite?", options: ["Tell me the gate", "Where's my gate?", "Could you tell me the gate number?", "Gate number!"], correct: 2 },
    ],
    examQuestions: [
      { question: "A 'terminal' is:", options: ["A type of plane", "A building at an airport", "A passport", "A suitcase"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Delay' means:", options: ["On time", "Late", "Early", "Cancelled"], correct: 1 },
    ],
  },
  "teens-1": {
    levelId: "teens", levelLabel: "English for Teenagers", lessonNumber: 1,
    title: "Social Media & Digital Life",
    description: "Learn English vocabulary for social media, apps, and online communication.",
    vocabulary: [
      { word: "Post", meaning: "To share content online", example: "She posted a photo on Instagram.", emoji: "📱", arabic: "ينشر" },
      { word: "Follower", meaning: "Someone who subscribes to your account", example: "He has 10,000 followers.", emoji: "👥", arabic: "متابع" },
      { word: "Trend", meaning: "Something popular right now", example: "That dance is trending.", emoji: "📈", arabic: "اتجاه" },
      { word: "Stream", meaning: "To watch/play live content", example: "I stream games on Twitch.", emoji: "🎮", arabic: "بث مباشر" },
      { word: "Content", meaning: "What you create or share online", example: "She creates great content.", emoji: "🎬", arabic: "محتوى" },
      { word: "Notification", meaning: "An alert from an app", example: "I got a notification from YouTube.", emoji: "🔔", arabic: "إشعار" },
      { word: "Subscribe", meaning: "To follow a channel for updates", example: "Subscribe to my channel!", emoji: "🔔", arabic: "يشترك" },
      { word: "Viral", meaning: "Spreading rapidly online", example: "The video went viral overnight.", emoji: "🚀", arabic: "انتشار واسع" },
      { word: "Influencer", meaning: "Someone popular on social media", example: "She's a travel influencer.", emoji: "⭐", arabic: "مؤثر" },
      { word: "Meme", meaning: "A funny image/video shared online", example: "That meme made me laugh!", emoji: "😂", arabic: "ميم" },
    ],
    dialogue: [
      { speaker: "Teen 1", text: "Did you see that viral TikTok?" },
      { speaker: "Teen 2", text: "Yes! It already has 5 million views. The content is so creative." },
      { speaker: "Teen 1", text: "I want to become a content creator too." },
      { speaker: "Teen 2", text: "You should! Start by posting consistently and engaging with followers." },
      { speaker: "Teen 1", text: "Good idea! I'll subscribe to some creator channels for tips." },
    ],
    grammar: {
      title: "Internet English & Abbreviations",
      explanation: "Online communication uses abbreviations and informal grammar: 'LOL', 'BTW', 'IMO', 'ASAP', 'DM'.",
      examples: [
        { sentence: "LOL = Laughing Out Loud", note: "Used to show something is funny" },
        { sentence: "BTW = By The Way", note: "Adding extra information casually" },
        { sentence: "DM = Direct Message", note: "A private message on social media" },
        { sentence: "IMO = In My Opinion", note: "Sharing a personal view" },
      ],
    },
    vocabExercises: [
      { question: "'Viral' means:", options: ["Dangerous", "Spreading rapidly online", "Private", "Deleted"], correct: 1 },
      { question: "An 'influencer' is:", options: ["A doctor", "Someone popular on social media", "A teacher", "A virus"], correct: 1 },
    ],
    conversationExercises: [
      { question: "'DM' stands for:", options: ["Don't Mind", "Direct Message", "Digital Media", "Daily Mail"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'BTW' means:", options: ["Between", "By The Way", "Better Than Worst", "Back To Work"], correct: 1 },
    ],
    examQuestions: [
      { question: "A 'meme' is:", options: ["A long article", "A funny shared image/video", "A podcast", "A notification"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Stream' means:", options: ["A river", "To watch/play live content", "To swim", "To download"], correct: 1 },
    ],
  },
  "medical-1": {
    levelId: "medical", levelLabel: "Medical English", lessonNumber: 1,
    title: "Basic Medical Vocabulary",
    description: "Learn essential medical terms for healthcare contexts.",
    vocabulary: [
      { word: "Symptom", meaning: "A sign of illness", example: "Fever is a common symptom.", emoji: "🤒", arabic: "عَرَض" },
      { word: "Diagnosis", meaning: "Identifying an illness", example: "The diagnosis was the flu.", emoji: "🔬", arabic: "تشخيص" },
      { word: "Prescription", meaning: "A doctor's written order for medicine", example: "Here's your prescription.", emoji: "📝", arabic: "وصفة طبية" },
      { word: "Treatment", meaning: "Medical care for an illness", example: "The treatment lasted two weeks.", emoji: "💊", arabic: "علاج" },
      { word: "Patient", meaning: "A person receiving medical care", example: "The patient is recovering well.", emoji: "🏥", arabic: "مريض" },
      { word: "Examination", meaning: "A medical check-up", example: "The doctor did a full examination.", emoji: "🩺", arabic: "فحص" },
      { word: "Blood pressure", meaning: "The force of blood in vessels", example: "Your blood pressure is normal.", emoji: "❤️", arabic: "ضغط الدم" },
      { word: "Allergy", meaning: "A harmful reaction to substances", example: "She has a nut allergy.", emoji: "⚠️", arabic: "حساسية" },
      { word: "Emergency", meaning: "A serious urgent situation", example: "Call 911 in an emergency.", emoji: "🚑", arabic: "طوارئ" },
      { word: "Surgery", meaning: "A medical operation", example: "He needs knee surgery.", emoji: "🏥", arabic: "جراحة" },
    ],
    dialogue: [
      { speaker: "Doctor", text: "What symptoms are you experiencing?" },
      { speaker: "Patient", text: "I have a headache, fever, and sore throat." },
      { speaker: "Doctor", text: "Let me do a quick examination. Open your mouth, please." },
      { speaker: "Patient", text: "Is it serious?" },
      { speaker: "Doctor", text: "It looks like a viral infection. I'll write a prescription for you." },
    ],
    grammar: {
      title: "Medical Communication Phrases",
      explanation: "Doctors and patients use specific phrases: 'I'm experiencing...', 'How long have you had...?', 'I'd recommend...'",
      examples: [
        { sentence: "How long have you had these symptoms?", note: "Present Perfect for ongoing symptoms" },
        { sentence: "I've been feeling tired for a week.", note: "Present Perfect Continuous for duration" },
        { sentence: "I'd recommend rest and plenty of fluids.", note: "Polite recommendation" },
        { sentence: "Are you allergic to any medications?", note: "Important safety question" },
      ],
    },
    vocabExercises: [
      { question: "A 'symptom' is:", options: ["A cure", "A sign of illness", "A medicine", "A doctor"], correct: 1 },
      { question: "'Diagnosis' means:", options: ["Treatment", "Identifying an illness", "Surgery", "A symptom"], correct: 1 },
    ],
    conversationExercises: [
      { question: "How do you describe ongoing symptoms?", options: ["I had a headache yesterday", "I've been having headaches for a week", "I will have a headache", "I headache"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'How long ___ you ___ this pain?'", options: ["did / have", "have / had", "are / having", "do / have"], correct: 1 },
    ],
    examQuestions: [
      { question: "A 'prescription' is:", options: ["A bill", "A doctor's medicine order", "An appointment", "A symptom"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Emergency' means:", options: ["A routine visit", "A serious urgent situation", "A check-up", "An appointment"], correct: 1 },
    ],
  },
  "it-english-1": {
    levelId: "it-english", levelLabel: "IT English", lessonNumber: 1,
    title: "Tech Vocabulary & Communication",
    description: "Essential English for the tech industry — meetings, documentation, and technical discussions.",
    vocabulary: [
      { word: "Bug", meaning: "An error in software", example: "We found a bug in the code.", emoji: "🐛", arabic: "خطأ برمجي" },
      { word: "Deploy", meaning: "To release software to users", example: "We'll deploy the update tonight.", emoji: "🚀", arabic: "نشر" },
      { word: "Sprint", meaning: "A fixed work period in Agile", example: "This sprint is two weeks long.", emoji: "🏃", arabic: "سبرنت" },
      { word: "Repository", meaning: "Where code is stored", example: "Push your code to the repository.", emoji: "📦", arabic: "مستودع" },
      { word: "Pull request", meaning: "A request to merge code changes", example: "I submitted a pull request.", emoji: "🔄", arabic: "طلب دمج" },
      { word: "Debugging", meaning: "Finding and fixing errors", example: "I spent hours debugging.", emoji: "🔧", arabic: "تصحيح أخطاء" },
      { word: "Scalable", meaning: "Able to grow without problems", example: "The system is scalable.", emoji: "📈", arabic: "قابل للتوسع" },
      { word: "Bandwidth", meaning: "Capacity to handle data/work", example: "Do you have bandwidth for this task?", emoji: "📡", arabic: "سعة" },
      { word: "Standup", meaning: "A brief daily team meeting", example: "We have standup at 9 AM.", emoji: "🧍", arabic: "اجتماع يومي" },
      { word: "Blocker", meaning: "Something preventing progress", example: "What's the blocker on this task?", emoji: "🚧", arabic: "عائق" },
    ],
    dialogue: [
      { speaker: "Team Lead", text: "Good morning! What did you work on yesterday?" },
      { speaker: "Developer", text: "I fixed two bugs and submitted a pull request for review." },
      { speaker: "Team Lead", text: "Great! Any blockers?" },
      { speaker: "Developer", text: "Yes — I need access to the staging repository." },
      { speaker: "Team Lead", text: "I'll sort that out. We need to deploy by end of sprint." },
    ],
    grammar: {
      title: "Tech Communication Style",
      explanation: "Tech communication is concise and action-oriented. Use clear verbs: 'fix', 'deploy', 'review', 'merge', 'test'.",
      examples: [
        { sentence: "I'll fix the bug and push the update.", note: "Direct, action-oriented" },
        { sentence: "Can you review my pull request?", note: "Clear request" },
        { sentence: "The feature is scalable and well-tested.", note: "Technical description" },
        { sentence: "We need to prioritize this — it's a blocker.", note: "Urgency + technical term" },
      ],
    },
    vocabExercises: [
      { question: "A 'bug' in software is:", options: ["An insect", "An error", "A feature", "A tool"], correct: 1 },
      { question: "'Deploy' means:", options: ["To delete", "To release to users", "To test", "To write"], correct: 1 },
    ],
    conversationExercises: [
      { question: "A 'standup' is:", options: ["A comedy show", "A brief daily meeting", "A presentation", "A code review"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'Bandwidth' in work context means:", options: ["Internet speed", "Capacity to handle work", "A cable", "Memory"], correct: 1 },
    ],
    examQuestions: [
      { question: "A 'blocker' is:", options: ["A helper", "Something preventing progress", "A meeting", "A tool"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Scalable' means:", options: ["Small", "Able to grow", "Fixed", "Broken"], correct: 1 },
    ],
  },
  "engineering-1": {
    levelId: "engineering", levelLabel: "Engineering English", lessonNumber: 1,
    title: "Technical Reports & Specifications",
    description: "Learn to read and write engineering reports and technical specifications.",
    vocabulary: [
      { word: "Specification", meaning: "A detailed description of requirements", example: "Check the specifications before building.", emoji: "📋", arabic: "مواصفات" },
      { word: "Blueprint", meaning: "A technical drawing or plan", example: "The blueprint shows the building layout.", emoji: "📐", arabic: "مخطط" },
      { word: "Component", meaning: "A part of a larger system", example: "Each component must be tested.", emoji: "🔩", arabic: "مكوّن" },
      { word: "Tolerance", meaning: "The allowed variation in measurement", example: "The tolerance is ±0.5mm.", emoji: "📏", arabic: "تفاوت" },
      { word: "Prototype", meaning: "An early model for testing", example: "We built a prototype first.", emoji: "🔬", arabic: "نموذج أولي" },
      { word: "Calibrate", meaning: "To adjust for accuracy", example: "Calibrate the equipment before use.", emoji: "⚙️", arabic: "يُعاير" },
      { word: "Dimension", meaning: "A measurement (length, width, height)", example: "The dimensions are 10x5x3 cm.", emoji: "📐", arabic: "بُعد" },
      { word: "Feasibility", meaning: "Whether something is practical", example: "We conducted a feasibility study.", emoji: "✅", arabic: "جدوى" },
      { word: "Compliance", meaning: "Meeting required standards", example: "The product is in compliance with ISO.", emoji: "📜", arabic: "امتثال" },
      { word: "Load", meaning: "Weight or force on a structure", example: "The bridge can support heavy loads.", emoji: "🏗️", arabic: "حِمل" },
    ],
    dialogue: [
      { speaker: "Engineer", text: "The prototype meets all specifications except the weight tolerance." },
      { speaker: "Manager", text: "What's the variance?" },
      { speaker: "Engineer", text: "It's 0.8mm over. We need to recalibrate the cutting machine." },
      { speaker: "Manager", text: "Is it still in compliance with safety standards?" },
      { speaker: "Engineer", text: "Yes, the load-bearing capacity is within acceptable limits." },
    ],
    grammar: {
      title: "Passive Voice in Technical Writing",
      explanation: "Engineering reports use passive voice for objectivity: 'The test was conducted', 'The data were analyzed'.",
      examples: [
        { sentence: "The component was tested under extreme conditions.", note: "Passive — focus on the component, not who tested" },
        { sentence: "The specifications were updated last month.", note: "Passive — focus on the action" },
        { sentence: "A feasibility study has been completed.", note: "Present Perfect Passive" },
        { sentence: "The blueprint must be approved before construction.", note: "Modal passive — obligation" },
      ],
    },
    vocabExercises: [
      { question: "A 'prototype' is:", options: ["The final product", "An early model for testing", "A blueprint", "A specification"], correct: 1 },
      { question: "'Tolerance' means:", options: ["Patience", "Allowed variation", "A measurement", "A test"], correct: 1 },
    ],
    conversationExercises: [
      { question: "Why use passive voice in reports?", options: ["It sounds fancy", "For objectivity", "It's easier", "It's required by law"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'The test ___ conducted yesterday.'", options: ["is", "was", "were", "be"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Compliance' means:", options: ["A complaint", "Meeting standards", "A component", "A test"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Feasibility' studies check:", options: ["If something is fun", "If something is practical", "If something is cheap", "If something is fast"], correct: 1 },
    ],
  },
};
