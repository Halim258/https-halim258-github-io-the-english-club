import { LessonData } from "./lessons";

export const specializedLessons6: Record<string, LessonData> = {
  "travel-4": {
    levelId: "travel", levelLabel: "English for Travel", lessonNumber: 4,
    title: "Public Transportation",
    description: "Navigate buses, trains, and metros with confidence in English.",
    vocabulary: [
      { word: "Platform", meaning: "Where you wait for a train", example: "The train arrives at Platform 3.", emoji: "🚉", arabic: "رصيف" },
      { word: "Fare", meaning: "The cost of a ride", example: "What's the bus fare?", emoji: "💰", arabic: "أجرة" },
      { word: "Transfer", meaning: "To change from one line to another", example: "Transfer at the next station.", emoji: "🔄", arabic: "تحويل" },
      { word: "Timetable", meaning: "A schedule of departure times", example: "Check the timetable online.", emoji: "📅", arabic: "جدول مواعيد" },
      { word: "One-way ticket", meaning: "A ticket for one direction only", example: "A one-way ticket to London, please.", emoji: "🎫", arabic: "تذكرة ذهاب فقط" },
      { word: "Return ticket", meaning: "A ticket for going and coming back", example: "I'd like a return ticket.", emoji: "🎟️", arabic: "تذكرة ذهاب وعودة" },
      { word: "Next stop", meaning: "The upcoming station", example: "The next stop is Central Park.", emoji: "📍", arabic: "المحطة التالية" },
      { word: "Rush hour", meaning: "The busiest travel time", example: "Avoid the metro during rush hour.", emoji: "🕐", arabic: "ساعة الذروة" },
      { word: "Conductor", meaning: "Person who checks tickets on a train", example: "The conductor checked our tickets.", emoji: "👨‍✈️", arabic: "مراقب التذاكر" },
      { word: "Commuter", meaning: "Someone who travels to work daily", example: "The train is full of commuters.", emoji: "👔", arabic: "مسافر يومي" },
    ],
    dialogue: [
      { speaker: "Traveler", text: "Excuse me, which platform for the train to Oxford?" },
      { speaker: "Staff", text: "Platform 5. It departs in 10 minutes." },
      { speaker: "Traveler", text: "I'd like a return ticket, please. What's the fare?" },
      { speaker: "Staff", text: "£25 for a return. You'll need to transfer at Reading." },
      { speaker: "Traveler", text: "Thank you! Is it busy during rush hour?" },
    ],
    grammar: {
      title: "Asking for Information Politely",
      explanation: "Use indirect questions for politeness: 'Could you tell me...?', 'Do you know...?', 'I'd like to know...'",
      examples: [
        { sentence: "Could you tell me which platform the train leaves from?", note: "Indirect question — polite" },
        { sentence: "Do you know what time the next bus is?", note: "Polite information request" },
        { sentence: "I'd like to know how much a return ticket costs.", note: "Formal and polite" },
        { sentence: "Would you mind telling me where to transfer?", note: "Very polite request" },
      ],
    },
    vocabExercises: [
      { question: "'Fare' means:", options: ["A ticket", "The cost of a ride", "A platform", "A seat"], correct: 1 },
      { question: "'Rush hour' is:", options: ["Early morning", "The busiest travel time", "Midnight", "Weekend"], correct: 1 },
    ],
    conversationExercises: [
      { question: "A 'return ticket' covers:", options: ["One direction", "Going and coming back", "Multiple trips", "A month"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Which is more polite?", options: ["What time is the bus?", "Could you tell me what time the bus is?", "Bus time?", "Tell me the bus time"], correct: 1 },
    ],
    examQuestions: [
      { question: "A 'commuter' is:", options: ["A tourist", "Someone who travels to work daily", "A pilot", "A driver"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Transfer' means:", options: ["To wait", "To change lines", "To buy a ticket", "To exit"], correct: 1 },
    ],
  },
  "travel-5": {
    levelId: "travel", levelLabel: "English for Travel", lessonNumber: 5,
    title: "Emergency Situations While Traveling",
    description: "Learn essential English for dealing with emergencies abroad.",
    vocabulary: [
      { word: "Emergency", meaning: "A serious, unexpected situation", example: "Call 911 in an emergency.", emoji: "🚨", arabic: "طوارئ" },
      { word: "Embassy", meaning: "Your country's office in another country", example: "Contact the embassy for help.", emoji: "🏛️", arabic: "سفارة" },
      { word: "Insurance", meaning: "Protection against loss/damage", example: "Do you have travel insurance?", emoji: "🛡️", arabic: "تأمين" },
      { word: "Stolen", meaning: "Taken without permission", example: "My wallet was stolen!", emoji: "😰", arabic: "مسروق" },
      { word: "Lost", meaning: "Unable to find / not knowing where you are", example: "I'm lost. Can you help me?", emoji: "🗺️", arabic: "ضائع" },
      { word: "Police station", meaning: "Where police officers work", example: "I need to go to the police station.", emoji: "👮", arabic: "مركز شرطة" },
      { word: "First aid", meaning: "Basic medical help", example: "Is there a first aid kit?", emoji: "🏥", arabic: "إسعافات أولية" },
      { word: "Ambulance", meaning: "A vehicle for emergencies", example: "Call an ambulance!", emoji: "🚑", arabic: "إسعاف" },
      { word: "Report", meaning: "To tell authorities about something", example: "I need to report a theft.", emoji: "📋", arabic: "يبلغ" },
      { word: "Urgent", meaning: "Needing immediate attention", example: "This is urgent — please help!", emoji: "⏰", arabic: "عاجل" },
    ],
    dialogue: [
      { speaker: "Traveler", text: "Help! My passport and wallet were stolen!" },
      { speaker: "Hotel staff", text: "I'm sorry to hear that. We need to report this to the police." },
      { speaker: "Traveler", text: "Do I need to contact my embassy?" },
      { speaker: "Hotel staff", text: "Yes, for a replacement passport. Do you have travel insurance?" },
      { speaker: "Traveler", text: "Yes, I do. This is urgent — my flight is tomorrow!" },
    ],
    grammar: {
      title: "Emergency Phrases & Imperative",
      explanation: "In emergencies, use short imperative sentences: 'Help!', 'Call an ambulance!', 'Stop!' Also use 'I need to...' for urgency.",
      examples: [
        { sentence: "Help! Please call an ambulance!", note: "Direct imperative" },
        { sentence: "I need to report a theft.", note: "'Need to' for urgency" },
        { sentence: "Please take me to the hospital.", note: "Polite imperative" },
        { sentence: "Don't move — help is coming.", note: "Negative imperative" },
      ],
    },
    vocabExercises: [
      { question: "An 'embassy' is:", options: ["A hotel", "Your country's office abroad", "A restaurant", "An airport"], correct: 1 },
      { question: "'Urgent' means:", options: ["Not important", "Needing immediate attention", "Slow", "Optional"], correct: 1 },
    ],
    conversationExercises: [
      { question: "If your passport is stolen, contact:", options: ["The hotel only", "Your embassy", "The airline", "Your school"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Which is correct in an emergency?", options: ["I'd like help sometime", "Call an ambulance!", "Maybe help later", "It's fine"], correct: 1 },
    ],
    examQuestions: [
      { question: "'First aid' is:", options: ["A hospital", "Basic medical help", "An ambulance", "Insurance"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "To 'report' a crime means:", options: ["To hide it", "To tell authorities", "To forget it", "To film it"], correct: 1 },
    ],
  },
  "teens-4": {
    levelId: "teens", levelLabel: "English for Teenagers", lessonNumber: 4,
    title: "Making Plans & Invitations",
    description: "Learn to make plans, invite friends, and respond to invitations in English.",
    vocabulary: [
      { word: "Hang out", meaning: "To spend time casually", example: "Want to hang out on Saturday?", emoji: "🤙", arabic: "يقضي وقت" },
      { word: "Plan", meaning: "An arrangement for the future", example: "What's the plan for tonight?", emoji: "📝", arabic: "خطة" },
      { word: "Available", meaning: "Free to do something", example: "Are you available this weekend?", emoji: "📅", arabic: "متاح" },
      { word: "Invite", meaning: "To ask someone to come", example: "I'd like to invite you to my party.", emoji: "💌", arabic: "يدعو" },
      { word: "Cancel", meaning: "To call off an event", example: "Sorry, I have to cancel.", emoji: "❌", arabic: "يلغي" },
      { word: "Suggest", meaning: "To propose an idea", example: "I suggest we go to the cinema.", emoji: "💡", arabic: "يقترح" },
      { word: "Confirm", meaning: "To make sure something is certain", example: "Can you confirm the time?", emoji: "✅", arabic: "يؤكد" },
      { word: "Reschedule", meaning: "To change to a different time", example: "Can we reschedule for next week?", emoji: "🔄", arabic: "يعيد جدولة" },
      { word: "RSVP", meaning: "Please respond to an invitation", example: "Don't forget to RSVP!", emoji: "📬", arabic: "الرجاء الرد" },
      { word: "Rain check", meaning: "To postpone to another time", example: "Can I take a rain check?", emoji: "🌧️", arabic: "تأجيل" },
    ],
    dialogue: [
      { speaker: "Maya", text: "Hey! Are you available this Saturday? I want to hang out." },
      { speaker: "Lina", text: "I'd love to! What do you suggest?" },
      { speaker: "Maya", text: "How about the new ice cream place? I'll invite Noor too." },
      { speaker: "Lina", text: "Sounds great! Can you confirm the time later?" },
      { speaker: "Maya", text: "Sure! I'll text everyone. Don't forget to RSVP! 😄" },
    ],
    grammar: {
      title: "Making Suggestions & Invitations",
      explanation: "Use: 'How about...?', 'Why don't we...?', 'Let's...', 'Would you like to...?', 'Do you fancy...?' (UK)",
      examples: [
        { sentence: "How about going to the movies?", note: "'How about' + gerund" },
        { sentence: "Why don't we try the new café?", note: "'Why don't we' + base verb" },
        { sentence: "Would you like to come to my party?", note: "Polite invitation" },
        { sentence: "Let's meet at 5 PM.", note: "'Let's' for suggestions" },
      ],
    },
    vocabExercises: [
      { question: "'Available' means:", options: ["Busy", "Free to do something", "Tired", "Late"], correct: 1 },
      { question: "'Rain check' means:", options: ["Check the weather", "Postpone to another time", "Cancel forever", "Go outside"], correct: 1 },
    ],
    conversationExercises: [
      { question: "'RSVP' means:", options: ["Cancel", "Please respond", "Maybe", "Don't come"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'How about ___ to the park?'", options: ["go", "going", "went", "goes"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Reschedule' means:", options: ["Cancel", "Change to a different time", "Confirm", "Forget"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Suggest' means:", options: ["To demand", "To propose an idea", "To refuse", "To forget"], correct: 1 },
    ],
  },
  "teens-5": {
    levelId: "teens", levelLabel: "English for Teenagers", lessonNumber: 5,
    title: "Expressing Opinions & Debating",
    description: "Learn to share your opinions and debate respectfully in English.",
    vocabulary: [
      { word: "In my opinion", meaning: "Introducing your personal view", example: "In my opinion, education is key.", emoji: "🗣️", arabic: "في رأيي" },
      { word: "Disagree", meaning: "To have a different view", example: "I respectfully disagree.", emoji: "🙅", arabic: "يختلف" },
      { word: "Agree", meaning: "To share the same view", example: "I completely agree with you.", emoji: "👍", arabic: "يوافق" },
      { word: "Point", meaning: "An argument or idea", example: "That's a good point.", emoji: "💡", arabic: "نقطة" },
      { word: "Debate", meaning: "A formal discussion of different views", example: "We had a lively debate in class.", emoji: "⚔️", arabic: "مناظرة" },
      { word: "Convince", meaning: "To make someone agree with you", example: "She convinced me to try it.", emoji: "🎯", arabic: "يُقنع" },
      { word: "Fair", meaning: "Just and reasonable", example: "That's a fair point.", emoji: "⚖️", arabic: "عادل" },
      { word: "Perspective", meaning: "A way of looking at things", example: "Try to see it from my perspective.", emoji: "👀", arabic: "منظور" },
      { word: "On the other hand", meaning: "Introducing a contrasting view", example: "On the other hand, it could work.", emoji: "✋", arabic: "من ناحية أخرى" },
      { word: "Valid", meaning: "Having a good basis in logic", example: "That's a valid argument.", emoji: "✅", arabic: "صحيح / مقنع" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Should students have homework? What's your opinion?" },
      { speaker: "Yara", text: "In my opinion, homework helps us practice. But it shouldn't be too much." },
      { speaker: "Adam", text: "I disagree. On the other hand, we learn better through projects." },
      { speaker: "Yara", text: "That's a fair point. But homework builds discipline." },
      { speaker: "Teacher", text: "Both perspectives are valid! That's what a good debate looks like." },
    ],
    grammar: {
      title: "Expressing Agreement & Disagreement",
      explanation: "Agree: 'I agree', 'Exactly!', 'That's a good point.' Disagree politely: 'I see your point, but...', 'I'm not sure about that.'",
      examples: [
        { sentence: "I completely agree with you.", note: "Strong agreement" },
        { sentence: "I see your point, but I think differently.", note: "Polite disagreement" },
        { sentence: "I'm not sure I agree with that.", note: "Gentle disagreement" },
        { sentence: "That's exactly what I was thinking!", note: "Enthusiastic agreement" },
      ],
    },
    vocabExercises: [
      { question: "'Valid' means:", options: ["Wrong", "Having good logic", "Old", "Simple"], correct: 1 },
      { question: "'Perspective' means:", options: ["A picture", "A way of looking at things", "A fact", "A rule"], correct: 1 },
    ],
    conversationExercises: [
      { question: "A polite way to disagree is:", options: ["You're wrong!", "I see your point, but...", "No way!", "That's stupid"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'___, it could also work.' (contrasting)", options: ["Also", "And", "On the other hand", "Because"], correct: 2 },
    ],
    examQuestions: [
      { question: "'Convince' means:", options: ["To confuse", "To make someone agree", "To argue loudly", "To ignore"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "A 'debate' is:", options: ["A fight", "A formal discussion", "A test", "A lecture"], correct: 1 },
    ],
  },
  "medical-3": {
    levelId: "medical", levelLabel: "Medical English", lessonNumber: 3,
    title: "At the Hospital",
    description: "Learn vocabulary and phrases for hospital visits and procedures.",
    vocabulary: [
      { word: "Ward", meaning: "A room in a hospital with beds", example: "She was moved to the maternity ward.", emoji: "🏥", arabic: "جناح" },
      { word: "Outpatient", meaning: "A patient who visits but doesn't stay", example: "He's an outpatient — no overnight stay.", emoji: "🚶", arabic: "مريض خارجي" },
      { word: "Inpatient", meaning: "A patient who stays in hospital", example: "She was admitted as an inpatient.", emoji: "🛏️", arabic: "مريض داخلي" },
      { word: "Surgeon", meaning: "A doctor who performs operations", example: "The surgeon is very experienced.", emoji: "👨‍⚕️", arabic: "جرّاح" },
      { word: "Nurse", meaning: "A healthcare professional who helps patients", example: "The nurse checked my blood pressure.", emoji: "👩‍⚕️", arabic: "ممرض/ة" },
      { word: "X-ray", meaning: "An image of inside the body", example: "We need to take an X-ray.", emoji: "🦴", arabic: "أشعة سينية" },
      { word: "Anesthesia", meaning: "Medicine to prevent pain during surgery", example: "The patient received local anesthesia.", emoji: "💉", arabic: "تخدير" },
      { word: "Discharge", meaning: "To release a patient from hospital", example: "She was discharged after two days.", emoji: "🚪", arabic: "خروج من المستشفى" },
      { word: "Emergency room", meaning: "ER — for urgent medical cases", example: "Go to the emergency room now!", emoji: "🚨", arabic: "غرفة الطوارئ" },
      { word: "Vital signs", meaning: "Heart rate, blood pressure, temperature", example: "The nurse monitored the vital signs.", emoji: "❤️", arabic: "علامات حيوية" },
    ],
    dialogue: [
      { speaker: "Nurse", text: "Welcome. I'll check your vital signs first." },
      { speaker: "Patient", text: "Will I need an X-ray?" },
      { speaker: "Nurse", text: "The doctor will decide after examining you." },
      { speaker: "Patient", text: "How long will I need to stay?" },
      { speaker: "Nurse", text: "If you're an outpatient, you can go home today. If we need to admit you, it could be a few days." },
    ],
    grammar: {
      title: "Conditional Sentences in Medical Contexts",
      explanation: "Doctors use conditionals: 'If the test is positive, we'll start treatment.' 'If you had come earlier, it would have been easier.'",
      examples: [
        { sentence: "If the X-ray shows a fracture, you'll need a cast.", note: "First conditional — likely" },
        { sentence: "If you take the medicine, you should feel better.", note: "First conditional — expected" },
        { sentence: "If the pain persists, come back immediately.", note: "First conditional — instruction" },
        { sentence: "If it were more serious, we would operate.", note: "Second conditional — hypothetical" },
      ],
    },
    vocabExercises: [
      { question: "An 'outpatient' is:", options: ["A patient who stays overnight", "A patient who visits but doesn't stay", "A doctor", "A nurse"], correct: 1 },
      { question: "'Discharge' means:", options: ["To admit", "To release from hospital", "To operate", "To test"], correct: 1 },
    ],
    conversationExercises: [
      { question: "'Vital signs' include:", options: ["Name and age", "Heart rate and blood pressure", "Height and weight only", "Eye color"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'If the test is positive, we ___ treatment.' (likely future)", options: ["started", "will start", "would start", "start"], correct: 1 },
    ],
    examQuestions: [
      { question: "A 'surgeon' is:", options: ["A nurse", "A doctor who performs operations", "A pharmacist", "A patient"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Anesthesia' prevents:", options: ["Hunger", "Pain during surgery", "Coughing", "Sneezing"], correct: 1 },
    ],
  },
  "it-english-3": {
    levelId: "it-english", levelLabel: "IT English", lessonNumber: 3,
    title: "Cybersecurity Vocabulary",
    description: "Learn essential English terms for cybersecurity and data protection.",
    vocabulary: [
      { word: "Firewall", meaning: "A security system that monitors network traffic", example: "The firewall blocked the attack.", emoji: "🔥", arabic: "جدار حماية" },
      { word: "Phishing", meaning: "Fake emails designed to steal information", example: "That email is a phishing attempt.", emoji: "🎣", arabic: "تصيد احتيالي" },
      { word: "Encryption", meaning: "Converting data into a secret code", example: "All data is protected by encryption.", emoji: "🔐", arabic: "تشفير" },
      { word: "Malware", meaning: "Malicious software", example: "The computer is infected with malware.", emoji: "🦠", arabic: "برمجيات خبيثة" },
      { word: "Breach", meaning: "An unauthorized access to data", example: "There was a data breach last night.", emoji: "💥", arabic: "اختراق" },
      { word: "Authenticate", meaning: "To verify identity", example: "Authenticate using your fingerprint.", emoji: "🔑", arabic: "يتحقق من الهوية" },
      { word: "Vulnerability", meaning: "A weakness that can be exploited", example: "We found a vulnerability in the system.", emoji: "⚠️", arabic: "ثغرة" },
      { word: "Patch", meaning: "A software update to fix bugs", example: "Install the security patch immediately.", emoji: "🩹", arabic: "تحديث أمني" },
      { word: "Two-factor", meaning: "Authentication using two methods", example: "Enable two-factor authentication.", emoji: "2️⃣", arabic: "مصادقة ثنائية" },
      { word: "Backup", meaning: "A copy of data for safety", example: "Always keep a backup of your files.", emoji: "💾", arabic: "نسخة احتياطية" },
    ],
    dialogue: [
      { speaker: "Manager", text: "We had a security breach last night. What happened?" },
      { speaker: "IT Specialist", text: "Someone clicked a phishing email. Malware got into the system." },
      { speaker: "Manager", text: "Is the data encrypted?" },
      { speaker: "IT Specialist", text: "Yes. We also installed a patch for the vulnerability." },
      { speaker: "Manager", text: "Good. Enable two-factor authentication for all accounts." },
    ],
    grammar: {
      title: "Passive Voice in Security Reports",
      explanation: "Security incidents use passive voice: 'The data was encrypted', 'The breach was detected', 'All accounts have been secured'.",
      examples: [
        { sentence: "The vulnerability was discovered yesterday.", note: "Past passive" },
        { sentence: "All passwords have been reset.", note: "Present perfect passive" },
        { sentence: "The patch must be installed immediately.", note: "Modal passive — urgency" },
        { sentence: "Two-factor authentication should be enabled.", note: "Modal passive — recommendation" },
      ],
    },
    vocabExercises: [
      { question: "'Phishing' is:", options: ["A sport", "Fake emails to steal info", "A type of software", "A programming language"], correct: 1 },
      { question: "'Encryption' means:", options: ["Deleting data", "Converting data into code", "Printing data", "Sharing data"], correct: 1 },
    ],
    conversationExercises: [
      { question: "A 'breach' is:", options: ["A backup", "Unauthorized access to data", "A firewall", "A password"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'The patch ___ installed yesterday.' (passive)", options: ["is", "was", "were", "been"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Malware' is:", options: ["Good software", "Malicious software", "An email", "A website"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "A 'backup' is:", options: ["A virus", "A copy of data for safety", "A password", "An email"], correct: 1 },
    ],
  },
  "engineering-3": {
    levelId: "engineering", levelLabel: "Engineering English", lessonNumber: 3,
    title: "Safety & Risk Assessment",
    description: "Learn safety terminology and risk assessment language for engineering.",
    vocabulary: [
      { word: "Hazard", meaning: "A potential source of danger", example: "Identify all hazards before starting.", emoji: "⚠️", arabic: "خطر" },
      { word: "Risk assessment", meaning: "Evaluating potential dangers", example: "Conduct a risk assessment first.", emoji: "📋", arabic: "تقييم المخاطر" },
      { word: "PPE", meaning: "Personal Protective Equipment", example: "Always wear your PPE on site.", emoji: "🦺", arabic: "معدات الوقاية الشخصية" },
      { word: "Compliance", meaning: "Following rules and regulations", example: "Ensure compliance with safety codes.", emoji: "✅", arabic: "امتثال" },
      { word: "Inspection", meaning: "Checking for quality or safety", example: "The safety inspection is tomorrow.", emoji: "🔍", arabic: "تفتيش" },
      { word: "Incident", meaning: "An unplanned event that could cause harm", example: "Report any incident immediately.", emoji: "📝", arabic: "حادثة" },
      { word: "Mitigate", meaning: "To reduce the severity of something", example: "We must mitigate the risk.", emoji: "🛡️", arabic: "يخفف" },
      { word: "Protocol", meaning: "A set of rules or procedures", example: "Follow the safety protocol.", emoji: "📜", arabic: "بروتوكول" },
      { word: "Evacuation", meaning: "Leaving a building in an emergency", example: "The evacuation drill is at 2 PM.", emoji: "🚪", arabic: "إخلاء" },
      { word: "Permit", meaning: "Official permission to do something", example: "You need a work permit for this area.", emoji: "📄", arabic: "تصريح" },
    ],
    dialogue: [
      { speaker: "Safety Officer", text: "Have you completed the risk assessment for this area?" },
      { speaker: "Engineer", text: "Yes. We identified three hazards and created a mitigation plan." },
      { speaker: "Safety Officer", text: "Good. Is all PPE available for the team?" },
      { speaker: "Engineer", text: "Yes. We also scheduled the safety inspection for Friday." },
      { speaker: "Safety Officer", text: "Make sure everyone follows the evacuation protocol." },
    ],
    grammar: {
      title: "Must, Should & Need to for Safety Rules",
      explanation: "Safety language uses strong modals: 'must' (mandatory), 'should' (recommended), 'need to' (necessary).",
      examples: [
        { sentence: "You must wear PPE at all times.", note: "'Must' — mandatory rule" },
        { sentence: "All incidents should be reported immediately.", note: "'Should' — strong recommendation" },
        { sentence: "Workers need to complete safety training.", note: "'Need to' — requirement" },
        { sentence: "Hazardous materials must not be stored here.", note: "'Must not' — prohibition" },
      ],
    },
    vocabExercises: [
      { question: "'PPE' stands for:", options: ["Public Planning Equipment", "Personal Protective Equipment", "Professional Project Engineering", "None"], correct: 1 },
      { question: "'Mitigate' means:", options: ["To increase", "To reduce severity", "To ignore", "To measure"], correct: 1 },
    ],
    conversationExercises: [
      { question: "A 'hazard' is:", options: ["A tool", "A potential source of danger", "A safety rule", "A report"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'You ___ wear PPE at all times.' (mandatory)", options: ["could", "might", "must", "may"], correct: 2 },
    ],
    examQuestions: [
      { question: "'Compliance' means:", options: ["Breaking rules", "Following regulations", "Ignoring safety", "Working fast"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "An 'evacuation' is:", options: ["Moving equipment", "Leaving a building in emergency", "A meeting", "A report"], correct: 1 },
    ],
  },
};
