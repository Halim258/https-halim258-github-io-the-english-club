import { LessonData } from "./lessons";

export const specializedLessons5: Record<string, LessonData> = {
  "travel-2": {
    levelId: "travel", levelLabel: "English for Travel", lessonNumber: 2,
    title: "Hotel Check-in & Check-out",
    description: "Learn essential phrases for booking and staying at hotels.",
    vocabulary: [
      { word: "Reservation", meaning: "A booking", example: "I have a reservation under Smith.", emoji: "📋", arabic: "حجز" },
      { word: "Check-in", meaning: "To register at a hotel", example: "Check-in is at 3 PM.", emoji: "🔑", arabic: "تسجيل دخول" },
      { word: "Check-out", meaning: "To leave and pay the hotel", example: "Check-out is at 11 AM.", emoji: "🚪", arabic: "تسجيل خروج" },
      { word: "Room service", meaning: "Food/drink delivered to your room", example: "Let's order room service.", emoji: "🍽️", arabic: "خدمة الغرف" },
      { word: "Suite", meaning: "A large, luxury hotel room", example: "We booked the honeymoon suite.", emoji: "🏨", arabic: "جناح" },
      { word: "Single room", meaning: "A room for one person", example: "I'd like a single room, please.", emoji: "🛏️", arabic: "غرفة مفردة" },
      { word: "Double room", meaning: "A room for two people", example: "Do you have a double room available?", emoji: "🛏️", arabic: "غرفة مزدوجة" },
      { word: "Complimentary", meaning: "Free of charge", example: "Breakfast is complimentary.", emoji: "🆓", arabic: "مجاني" },
      { word: "Lobby", meaning: "The entrance area of a hotel", example: "I'll meet you in the lobby.", emoji: "🏛️", arabic: "بهو" },
      { word: "Housekeeping", meaning: "The cleaning staff", example: "Call housekeeping for extra towels.", emoji: "🧹", arabic: "خدمة التنظيف" },
    ],
    dialogue: [
      { speaker: "Guest", text: "Hello, I have a reservation under the name Johnson." },
      { speaker: "Receptionist", text: "Yes, a double room for three nights. May I see your ID?" },
      { speaker: "Guest", text: "Here you go. Is breakfast included?" },
      { speaker: "Receptionist", text: "Yes, complimentary breakfast from 7 to 10 AM. Here's your key card." },
      { speaker: "Guest", text: "Thank you! What time is check-out?" },
    ],
    grammar: {
      title: "Hotel Requests with 'Could' and 'Would'",
      explanation: "Use polite modals for hotel requests: 'Could I have...?', 'Would it be possible to...?', 'I'd like to...'",
      examples: [
        { sentence: "Could I have an extra pillow?", note: "Polite request" },
        { sentence: "Would it be possible to extend my stay?", note: "Very polite question" },
        { sentence: "I'd like to book a room for two nights.", note: "Stating a wish" },
        { sentence: "Could you call a taxi for me?", note: "Asking for a service" },
      ],
    },
    vocabExercises: [
      { question: "'Complimentary' means:", options: ["Expensive", "Free of charge", "Optional", "Compulsory"], correct: 1 },
      { question: "'Housekeeping' is:", options: ["Room service", "The cleaning staff", "The lobby", "Reception"], correct: 1 },
    ],
    conversationExercises: [
      { question: "What do you show at check-in?", options: ["Passport/ID", "Credit card only", "Phone number", "Nothing"], correct: 0 },
    ],
    grammarExercises: [
      { question: "'Could I ___ an extra towel?'", options: ["has", "having", "have", "had"], correct: 2 },
    ],
    examQuestions: [
      { question: "A 'suite' is:", options: ["A small room", "A large luxury room", "The lobby", "The restaurant"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Room service' provides:", options: ["Cleaning", "Food to your room", "Wake-up calls", "Laundry"], correct: 1 },
    ],
  },
  "travel-3": {
    levelId: "travel", levelLabel: "English for Travel", lessonNumber: 3,
    title: "Asking for Directions",
    description: "Navigate confidently by asking and understanding directions in English.",
    vocabulary: [
      { word: "Straight", meaning: "In a direct line, not turning", example: "Go straight for two blocks.", emoji: "⬆️", arabic: "مستقيم" },
      { word: "Turn left", meaning: "Change direction to the left", example: "Turn left at the traffic light.", emoji: "⬅️", arabic: "انعطف يساراً" },
      { word: "Turn right", meaning: "Change direction to the right", example: "Turn right after the bank.", emoji: "➡️", arabic: "انعطف يميناً" },
      { word: "Intersection", meaning: "Where two roads cross", example: "Stop at the intersection.", emoji: "➕", arabic: "تقاطع" },
      { word: "Block", meaning: "The distance between two streets", example: "It's two blocks from here.", emoji: "🏘️", arabic: "مبنى / بلوك" },
      { word: "Landmark", meaning: "A recognizable building or place", example: "The museum is a famous landmark.", emoji: "🏛️", arabic: "معلم" },
      { word: "Across from", meaning: "On the opposite side", example: "The café is across from the park.", emoji: "↔️", arabic: "مقابل" },
      { word: "Next to", meaning: "Beside", example: "The bank is next to the post office.", emoji: "👈", arabic: "بجانب" },
      { word: "Corner", meaning: "Where two streets meet", example: "The shop is on the corner.", emoji: "📐", arabic: "زاوية" },
      { word: "Roundabout", meaning: "A circular road junction", example: "Take the second exit at the roundabout.", emoji: "🔄", arabic: "دوّار" },
    ],
    dialogue: [
      { speaker: "Tourist", text: "Excuse me, how do I get to the train station?" },
      { speaker: "Local", text: "Go straight for two blocks, then turn left at the intersection." },
      { speaker: "Tourist", text: "Is it far from here?" },
      { speaker: "Local", text: "About 10 minutes on foot. You'll see it on the corner, next to the big hotel." },
      { speaker: "Tourist", text: "Thank you so much!" },
    ],
    grammar: {
      title: "Prepositions of Place & Direction",
      explanation: "Use prepositions to describe locations: 'on' (street), 'at' (intersection), 'next to', 'across from', 'between', 'behind'.",
      examples: [
        { sentence: "The bank is on Main Street.", note: "'On' for streets" },
        { sentence: "Turn left at the traffic light.", note: "'At' for specific points" },
        { sentence: "The café is between the bank and the park.", note: "'Between' for two things" },
        { sentence: "The pharmacy is behind the hospital.", note: "'Behind' for position" },
      ],
    },
    vocabExercises: [
      { question: "An 'intersection' is:", options: ["A park", "Where two roads cross", "A building", "A bus stop"], correct: 1 },
      { question: "'Across from' means:", options: ["Behind", "Next to", "On the opposite side", "Above"], correct: 2 },
    ],
    conversationExercises: [
      { question: "How do you politely ask for directions?", options: ["Where is it?!", "Excuse me, how do I get to...?", "Tell me the way!", "Walk!"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'The bank is ___ Main Street.'", options: ["in", "at", "on", "by"], correct: 2 },
    ],
    examQuestions: [
      { question: "A 'landmark' is:", options: ["A small road", "A recognizable place", "A person", "A vehicle"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "A 'roundabout' is:", options: ["A square", "A circular road junction", "A bridge", "A tunnel"], correct: 1 },
    ],
  },
  "teens-2": {
    levelId: "teens", levelLabel: "English for Teenagers", lessonNumber: 2,
    title: "Social Media English",
    description: "Learn the language of social media platforms and online communication.",
    vocabulary: [
      { word: "Post", meaning: "Content shared on social media", example: "I liked your latest post.", emoji: "📱", arabic: "منشور" },
      { word: "Follower", meaning: "Someone who subscribes to your content", example: "She has 10K followers.", emoji: "👥", arabic: "متابع" },
      { word: "Hashtag", meaning: "# symbol used to tag topics", example: "Use the hashtag #EnglishLearning.", emoji: "#️⃣", arabic: "هاشتاج" },
      { word: "Story", meaning: "A temporary post (24 hours)", example: "Check my story for updates.", emoji: "⏰", arabic: "ستوري" },
      { word: "Feed", meaning: "The stream of content you see", example: "Your feed is full of cat videos.", emoji: "📰", arabic: "الخلاصة" },
      { word: "Share", meaning: "To repost someone's content", example: "Share this if you agree!", emoji: "🔄", arabic: "مشاركة" },
      { word: "Notification", meaning: "An alert from an app", example: "I got a notification for your comment.", emoji: "🔔", arabic: "إشعار" },
      { word: "Trending", meaning: "Currently popular", example: "That topic is trending worldwide.", emoji: "📈", arabic: "رائج" },
      { word: "Caption", meaning: "Text written with a photo", example: "Write a creative caption.", emoji: "✍️", arabic: "تعليق تصويري" },
      { word: "Viral", meaning: "Spreading rapidly online", example: "The video went viral overnight!", emoji: "🚀", arabic: "منتشر بسرعة" },
    ],
    dialogue: [
      { speaker: "Emma", text: "Did you see that video? It went totally viral!" },
      { speaker: "Liam", text: "Yeah, it's trending! I shared it on my story." },
      { speaker: "Emma", text: "I need a good caption for my new post." },
      { speaker: "Liam", text: "How about something with a trending hashtag?" },
      { speaker: "Emma", text: "Good idea! I want more followers 😄" },
    ],
    grammar: {
      title: "Present Continuous for Current Trends",
      explanation: "Use Present Continuous to talk about current trends and what's happening now on social media.",
      examples: [
        { sentence: "Everyone is talking about the new movie.", note: "Current discussion" },
        { sentence: "That song is trending right now.", note: "Current popularity" },
        { sentence: "More people are using TikTok.", note: "Current trend" },
        { sentence: "She's always posting selfies.", note: "'Always + -ing' for habits" },
      ],
    },
    vocabExercises: [
      { question: "'Viral' means:", options: ["Sick", "Spreading rapidly online", "Deleted", "Private"], correct: 1 },
      { question: "A 'hashtag' is:", options: ["A password", "A # symbol to tag topics", "A filter", "A username"], correct: 1 },
    ],
    conversationExercises: [
      { question: "A 'story' on social media is:", options: ["A novel", "A permanent post", "A temporary 24-hour post", "An email"], correct: 2 },
    ],
    grammarExercises: [
      { question: "'Everyone ___ about the news.' (currently)", options: ["talks", "is talking", "talked", "will talk"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Trending' means:", options: ["Outdated", "Currently popular", "Deleted", "Private"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "A 'caption' is:", options: ["A photo", "Text with a photo", "A filter", "A sticker"], correct: 1 },
    ],
  },
  "teens-3": {
    levelId: "teens", levelLabel: "English for Teenagers", lessonNumber: 3,
    title: "School Life Vocabulary",
    description: "Talk about school subjects, activities, and experiences in English.",
    vocabulary: [
      { word: "Subject", meaning: "An area of study", example: "Math is my favorite subject.", emoji: "📚", arabic: "مادة دراسية" },
      { word: "Assignment", meaning: "Work given by a teacher", example: "The assignment is due Friday.", emoji: "📝", arabic: "واجب" },
      { word: "Grade", meaning: "A mark or score", example: "I got a good grade on the test.", emoji: "💯", arabic: "درجة" },
      { word: "Classmate", meaning: "Someone in your class", example: "My classmate helped me study.", emoji: "👫", arabic: "زميل" },
      { word: "Semester", meaning: "Half of the school year", example: "This semester ends in June.", emoji: "📅", arabic: "فصل دراسي" },
      { word: "Elective", meaning: "A class you choose to take", example: "Art is my elective this year.", emoji: "🎨", arabic: "مادة اختيارية" },
      { word: "Principal", meaning: "The head of a school", example: "The principal gave a speech.", emoji: "👨‍💼", arabic: "مدير المدرسة" },
      { word: "Extracurricular", meaning: "Activities outside regular classes", example: "I do sports as an extracurricular.", emoji: "⚽", arabic: "نشاط لا منهجي" },
      { word: "Study group", meaning: "Students learning together", example: "Join our study group!", emoji: "📖", arabic: "مجموعة دراسية" },
      { word: "Pop quiz", meaning: "An unexpected test", example: "We had a pop quiz today!", emoji: "😱", arabic: "اختبار مفاجئ" },
    ],
    dialogue: [
      { speaker: "Mia", text: "What subjects are you taking this semester?" },
      { speaker: "Noah", text: "Math, Science, English, and Art as an elective." },
      { speaker: "Mia", text: "Art sounds fun! I chose Music. Wanna join my study group for the math exam?" },
      { speaker: "Noah", text: "Definitely! I heard there might be a pop quiz this week." },
      { speaker: "Mia", text: "Better start studying then! 📚" },
    ],
    grammar: {
      title: "Talking About Preferences with School Subjects",
      explanation: "Express preferences: 'I prefer... to...', 'My favorite subject is...', 'I'm good at...', 'I find... difficult/easy'.",
      examples: [
        { sentence: "I prefer science to math.", note: "'Prefer... to...' for comparison" },
        { sentence: "I'm good at English.", note: "'Good at' + subject/skill" },
        { sentence: "I find history interesting.", note: "'Find + noun + adjective'" },
        { sentence: "My favorite subject is art.", note: "Simple statement of preference" },
      ],
    },
    vocabExercises: [
      { question: "A 'pop quiz' is:", options: ["A planned exam", "An unexpected test", "A game", "A homework"], correct: 1 },
      { question: "'Elective' means:", options: ["Required class", "A class you choose", "A test", "A sport"], correct: 1 },
    ],
    conversationExercises: [
      { question: "'Extracurricular' activities are:", options: ["Required classes", "Activities outside class", "Exams", "Homework"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'I prefer science ___ math.'", options: ["than", "from", "to", "or"], correct: 2 },
    ],
    examQuestions: [
      { question: "A 'semester' is:", options: ["A week", "A month", "Half the school year", "A class"], correct: 2 },
    ],
    homeworkQuestions: [
      { question: "'Grade' can mean:", options: ["A color", "A score or mark", "A book", "A holiday"], correct: 1 },
    ],
  },
  "medical-2": {
    levelId: "medical", levelLabel: "Medical English", lessonNumber: 2,
    title: "Common Medical Conditions",
    description: "Learn vocabulary for common illnesses and health conditions.",
    vocabulary: [
      { word: "Infection", meaning: "Illness caused by germs", example: "He has a throat infection.", emoji: "🦠", arabic: "عدوى" },
      { word: "Fracture", meaning: "A broken bone", example: "The X-ray showed a fracture.", emoji: "🦴", arabic: "كسر" },
      { word: "Blood pressure", meaning: "The force of blood in arteries", example: "Your blood pressure is normal.", emoji: "❤️", arabic: "ضغط الدم" },
      { word: "Diagnosis", meaning: "Identifying what illness someone has", example: "The diagnosis was pneumonia.", emoji: "🔬", arabic: "تشخيص" },
      { word: "Chronic", meaning: "Long-lasting condition", example: "She has chronic back pain.", emoji: "⏳", arabic: "مزمن" },
      { word: "Acute", meaning: "Sudden and severe", example: "He felt acute chest pain.", emoji: "⚡", arabic: "حاد" },
      { word: "Symptom", meaning: "A sign of illness", example: "Coughing is a common symptom.", emoji: "🤒", arabic: "عَرَض" },
      { word: "Treatment", meaning: "Medical care to fix illness", example: "The treatment includes antibiotics.", emoji: "💊", arabic: "علاج" },
      { word: "Surgery", meaning: "A medical operation", example: "She needs surgery on her knee.", emoji: "🏥", arabic: "جراحة" },
      { word: "Recovery", meaning: "Getting better after illness", example: "Recovery takes about two weeks.", emoji: "🌟", arabic: "تعافي" },
    ],
    dialogue: [
      { speaker: "Doctor", text: "Based on your symptoms, I'd like to run some tests." },
      { speaker: "Patient", text: "What do you think it could be?" },
      { speaker: "Doctor", text: "It could be an infection. We need to confirm the diagnosis." },
      { speaker: "Patient", text: "Will I need surgery?" },
      { speaker: "Doctor", text: "No, the treatment will be antibiotics. Recovery should take about a week." },
    ],
    grammar: {
      title: "Medical Modal Verbs",
      explanation: "Doctors use modals: 'You should rest', 'You must take your medicine', 'It could be an infection', 'You might need tests'.",
      examples: [
        { sentence: "You should avoid heavy lifting.", note: "'Should' for advice" },
        { sentence: "You must take this three times a day.", note: "'Must' for strong instruction" },
        { sentence: "It could be a sprain.", note: "'Could' for possibility" },
        { sentence: "You might need to see a specialist.", note: "'Might' for uncertain suggestion" },
      ],
    },
    vocabExercises: [
      { question: "'Chronic' means:", options: ["Sudden", "Short-term", "Long-lasting", "Cured"], correct: 2 },
      { question: "'Diagnosis' is:", options: ["A medicine", "Identifying the illness", "A surgery", "A hospital"], correct: 1 },
    ],
    conversationExercises: [
      { question: "'Acute' means:", options: ["Mild", "Long-lasting", "Sudden and severe", "Cured"], correct: 2 },
    ],
    grammarExercises: [
      { question: "'You ___ take the medicine twice daily.' (strong instruction)", options: ["might", "could", "should", "must"], correct: 3 },
    ],
    examQuestions: [
      { question: "'Recovery' means:", options: ["Getting worse", "Getting better", "Surgery", "Testing"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "A 'fracture' is:", options: ["A headache", "A broken bone", "A rash", "A cough"], correct: 1 },
    ],
  },
  "it-english-2": {
    levelId: "it-english", levelLabel: "IT English", lessonNumber: 2,
    title: "Software Development Vocabulary",
    description: "Learn essential English terms used in software development.",
    vocabulary: [
      { word: "Debug", meaning: "To find and fix errors in code", example: "I need to debug this function.", emoji: "🐛", arabic: "تصحيح الأخطاء" },
      { word: "Deploy", meaning: "To release software to users", example: "We'll deploy the update tonight.", emoji: "🚀", arabic: "نشر" },
      { word: "Repository", meaning: "A storage location for code", example: "Push your code to the repository.", emoji: "📦", arabic: "مستودع" },
      { word: "Framework", meaning: "A structure for building software", example: "React is a popular framework.", emoji: "🏗️", arabic: "إطار عمل" },
      { word: "API", meaning: "Application Programming Interface", example: "The API handles data requests.", emoji: "🔌", arabic: "واجهة برمجة" },
      { word: "Sprint", meaning: "A short development cycle", example: "This sprint is two weeks.", emoji: "🏃", arabic: "سبرنت" },
      { word: "Bug", meaning: "An error in software", example: "There's a bug in the login page.", emoji: "🐛", arabic: "خلل برمجي" },
      { word: "Pull request", meaning: "A request to merge code changes", example: "Review my pull request, please.", emoji: "🔀", arabic: "طلب دمج" },
      { word: "Frontend", meaning: "The user-facing part of software", example: "She works on the frontend.", emoji: "🎨", arabic: "واجهة أمامية" },
      { word: "Backend", meaning: "The server-side part of software", example: "The backend handles the database.", emoji: "⚙️", arabic: "واجهة خلفية" },
    ],
    dialogue: [
      { speaker: "Developer", text: "There's a bug in the checkout flow. I need to debug it." },
      { speaker: "Manager", text: "Is it blocking the deployment?" },
      { speaker: "Developer", text: "Yes. I'll create a pull request with the fix." },
      { speaker: "Manager", text: "Great. We need to deploy by end of sprint." },
      { speaker: "Developer", text: "I'll have the frontend fix ready by tomorrow." },
    ],
    grammar: {
      title: "Technical Instructions with Imperatives",
      explanation: "Use imperative form for technical instructions: 'Push the code', 'Run the tests', 'Check the logs', 'Deploy to staging'.",
      examples: [
        { sentence: "Push your changes to the repository.", note: "Imperative for action" },
        { sentence: "Run the test suite before deploying.", note: "Sequential instructions" },
        { sentence: "Check the API documentation.", note: "Research instruction" },
        { sentence: "Don't merge without a code review.", note: "Negative imperative" },
      ],
    },
    vocabExercises: [
      { question: "To 'debug' means:", options: ["To write code", "To find and fix errors", "To delete files", "To restart"], correct: 1 },
      { question: "An 'API' is:", options: ["A programming language", "An interface for data exchange", "A database", "A browser"], correct: 1 },
    ],
    conversationExercises: [
      { question: "A 'sprint' in development is:", options: ["Running fast", "A short development cycle", "A long project", "A meeting"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'___ the tests before deploying.' (instruction)", options: ["Running", "Runs", "Run", "Ran"], correct: 2 },
    ],
    examQuestions: [
      { question: "'Deploy' means:", options: ["To delete", "To release to users", "To test", "To plan"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Frontend' is:", options: ["Server-side", "User-facing part", "Database", "Testing tool"], correct: 1 },
    ],
  },
  "engineering-2": {
    levelId: "engineering", levelLabel: "Engineering English", lessonNumber: 2,
    title: "Technical Reports & Specifications",
    description: "Learn to read and write engineering reports and technical specifications.",
    vocabulary: [
      { word: "Specification", meaning: "A detailed description of requirements", example: "Check the specifications before building.", emoji: "📋", arabic: "مواصفات" },
      { word: "Tolerance", meaning: "Acceptable variation in measurement", example: "The tolerance is ±0.5mm.", emoji: "📏", arabic: "تسامح / هامش" },
      { word: "Prototype", meaning: "A first model of something", example: "We tested the prototype.", emoji: "🔧", arabic: "نموذج أولي" },
      { word: "Load", meaning: "Weight or force applied", example: "The bridge can handle heavy loads.", emoji: "⚖️", arabic: "حِمل" },
      { word: "Efficiency", meaning: "How well something works with less waste", example: "The engine's efficiency improved.", emoji: "⚡", arabic: "كفاءة" },
      { word: "Calibrate", meaning: "To adjust for accuracy", example: "Calibrate the instrument before use.", emoji: "🎯", arabic: "يعاير" },
      { word: "Component", meaning: "A part of a larger system", example: "Replace the damaged component.", emoji: "🔩", arabic: "مُكوّن" },
      { word: "Dimension", meaning: "A measurement (length, width, height)", example: "What are the dimensions?", emoji: "📐", arabic: "بُعد" },
      { word: "Comply", meaning: "To follow rules or standards", example: "The design must comply with safety codes.", emoji: "✅", arabic: "يمتثل" },
      { word: "Feasibility", meaning: "Whether something is possible and practical", example: "We did a feasibility study.", emoji: "🤔", arabic: "جدوى" },
    ],
    dialogue: [
      { speaker: "Engineer", text: "The prototype passed all the tests. The dimensions are within tolerance." },
      { speaker: "Manager", text: "Does it comply with the new safety specifications?" },
      { speaker: "Engineer", text: "Yes. We also improved the efficiency by 15%." },
      { speaker: "Manager", text: "Excellent. When can we start production?" },
      { speaker: "Engineer", text: "After we calibrate the equipment — about two weeks." },
    ],
    grammar: {
      title: "Passive Voice in Technical Writing",
      explanation: "Engineering reports use passive voice: 'The test was conducted', 'The sample was measured', 'Results were recorded'.",
      examples: [
        { sentence: "The prototype was tested under extreme conditions.", note: "Passive — focus on the object" },
        { sentence: "The measurements were recorded accurately.", note: "Formal reporting style" },
        { sentence: "The system has been calibrated.", note: "Present perfect passive" },
        { sentence: "Safety regulations must be followed.", note: "Modal passive for rules" },
      ],
    },
    vocabExercises: [
      { question: "'Tolerance' in engineering means:", options: ["Patience", "Acceptable variation", "A measurement tool", "A material"], correct: 1 },
      { question: "A 'prototype' is:", options: ["The final product", "A first model", "A blueprint", "A factory"], correct: 1 },
    ],
    conversationExercises: [
      { question: "'Feasibility' refers to:", options: ["Cost only", "Whether something is possible", "Speed", "Color"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'The test ___ conducted yesterday.' (passive)", options: ["is", "was", "were", "been"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Calibrate' means:", options: ["To break", "To adjust for accuracy", "To paint", "To weigh"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Comply' means:", options: ["To ignore", "To follow rules", "To build", "To test"], correct: 1 },
    ],
  },
  "writing-9": {
    levelId: "writing", levelLabel: "Writing Skills", lessonNumber: 9,
    title: "Report Writing",
    description: "Learn to write clear, structured reports for academic and professional settings.",
    vocabulary: [
      { word: "Executive summary", meaning: "A brief overview of a report", example: "Start with an executive summary.", emoji: "📋", arabic: "ملخص تنفيذي" },
      { word: "Findings", meaning: "Results discovered in research", example: "The findings were surprising.", emoji: "🔬", arabic: "نتائج" },
      { word: "Recommendation", meaning: "A suggested course of action", example: "My recommendation is to expand.", emoji: "💡", arabic: "توصية" },
      { word: "Methodology", meaning: "The methods used in research", example: "Explain your methodology clearly.", emoji: "📊", arabic: "منهجية" },
      { word: "Appendix", meaning: "Extra material at the end of a report", example: "See Appendix A for the data.", emoji: "📎", arabic: "ملحق" },
      { word: "Objective", meaning: "The goal of the report", example: "The objective is to analyze sales.", emoji: "🎯", arabic: "هدف" },
      { word: "Data", meaning: "Facts and statistics collected", example: "The data supports our conclusion.", emoji: "📈", arabic: "بيانات" },
      { word: "Conclusion", meaning: "The final summary and judgment", example: "In conclusion, the project succeeded.", emoji: "🏁", arabic: "خاتمة" },
      { word: "Reference", meaning: "A source of information cited", example: "List all references at the end.", emoji: "📚", arabic: "مرجع" },
      { word: "Formal tone", meaning: "Professional, serious style of writing", example: "Use a formal tone in reports.", emoji: "🎩", arabic: "نبرة رسمية" },
    ],
    dialogue: [
      { speaker: "Professor", text: "Your report needs a clear structure. Did you include an executive summary?" },
      { speaker: "Student", text: "Yes, and I listed my findings in section 3." },
      { speaker: "Professor", text: "Good. What about recommendations?" },
      { speaker: "Student", text: "I included three recommendations based on the data." },
      { speaker: "Professor", text: "Don't forget to add references and an appendix." },
    ],
    grammar: {
      title: "Formal Language in Reports",
      explanation: "Reports use formal language: avoid contractions, use passive voice, and include hedging language like 'It appears that...'",
      examples: [
        { sentence: "It appears that sales have increased.", note: "Hedging — not too definitive" },
        { sentence: "The data was collected over six months.", note: "Passive voice" },
        { sentence: "It is recommended that...", note: "Formal recommendation" },
        { sentence: "This report aims to analyze...", note: "Stating purpose formally" },
      ],
    },
    vocabExercises: [
      { question: "An 'executive summary' is:", options: ["The full report", "A brief overview", "The conclusion", "An appendix"], correct: 1 },
      { question: "'Methodology' describes:", options: ["The results", "The methods used", "The conclusion", "The title"], correct: 1 },
    ],
    conversationExercises: [
      { question: "'Findings' are:", options: ["Opinions", "Results discovered", "Guesses", "Summaries"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Which is formal?", options: ["I think sales went up", "It appears that sales increased", "Sales went up I think", "Up sales went"], correct: 1 },
    ],
    examQuestions: [
      { question: "An 'appendix' contains:", options: ["The introduction", "Extra material", "The title", "The author bio"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Recommendation' means:", options: ["A question", "A suggested action", "A complaint", "A greeting"], correct: 1 },
    ],
  },
  "writing-10": {
    levelId: "writing", levelLabel: "Writing Skills", lessonNumber: 10,
    title: "Persuasive Writing",
    description: "Master the art of writing to convince and persuade your reader.",
    vocabulary: [
      { word: "Persuade", meaning: "To convince someone to agree", example: "The essay persuaded me to recycle.", emoji: "🗣️", arabic: "يُقنع" },
      { word: "Claim", meaning: "A statement you believe is true", example: "The author's main claim is clear.", emoji: "📌", arabic: "ادّعاء" },
      { word: "Counter-argument", meaning: "An opposing view", example: "Address the counter-argument.", emoji: "⚔️", arabic: "حجة مضادة" },
      { word: "Rhetorical question", meaning: "A question asked for effect", example: "Don't we all want a better future?", emoji: "❓", arabic: "سؤال بلاغي" },
      { word: "Emotive language", meaning: "Words that trigger emotions", example: "Innocent children suffer every day.", emoji: "💔", arabic: "لغة عاطفية" },
      { word: "Call to action", meaning: "Urging the reader to do something", example: "Sign the petition today!", emoji: "📢", arabic: "دعوة للعمل" },
      { word: "Statistics", meaning: "Number-based evidence", example: "80% of people agree.", emoji: "📊", arabic: "إحصائيات" },
      { word: "Credibility", meaning: "Being trustworthy", example: "Expert quotes add credibility.", emoji: "✅", arabic: "مصداقية" },
      { word: "Thesis", meaning: "The main argument of your essay", example: "State your thesis clearly.", emoji: "📝", arabic: "أطروحة" },
      { word: "Rebut", meaning: "To argue against an opposing point", example: "She rebutted the criticism effectively.", emoji: "🛡️", arabic: "يفنّد" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "What persuasive techniques did the author use?" },
      { speaker: "Student", text: "Emotive language and a rhetorical question in the opening." },
      { speaker: "Teacher", text: "Did they address counter-arguments?" },
      { speaker: "Student", text: "Yes, and rebutted them with statistics." },
      { speaker: "Teacher", text: "Great analysis! A strong call to action at the end makes it effective." },
    ],
    grammar: {
      title: "Persuasive Sentence Structures",
      explanation: "Use strong structures: 'It is essential that...', 'We must...', 'Surely, everyone agrees...', 'Evidence clearly shows...'",
      examples: [
        { sentence: "It is essential that we act now.", note: "Urgency" },
        { sentence: "Surely, everyone deserves clean water.", note: "Appealing to shared values" },
        { sentence: "Evidence clearly shows the benefits.", note: "Using evidence" },
        { sentence: "We cannot ignore this problem any longer.", note: "Strong call to action" },
      ],
    },
    vocabExercises: [
      { question: "A 'rhetorical question' is asked:", options: ["For an answer", "For effect", "For fun", "For homework"], correct: 1 },
      { question: "'Emotive language' uses:", options: ["Numbers", "Words that trigger emotions", "Formal terms", "Abbreviations"], correct: 1 },
    ],
    conversationExercises: [
      { question: "A 'call to action' is:", options: ["A phone call", "Urging the reader to act", "A summary", "A question"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Which is most persuasive?", options: ["Maybe we should try", "It is essential that we act now", "I think it's okay", "Whatever works"], correct: 1 },
    ],
    examQuestions: [
      { question: "A 'thesis' is:", options: ["A question", "The main argument", "A counter-point", "A summary"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "To 'rebut' means:", options: ["To agree", "To argue against", "To ignore", "To summarize"], correct: 1 },
    ],
  },
  "exam-prep-8": {
    levelId: "exam-prep", levelLabel: "Exam Preparation", lessonNumber: 8,
    title: "IELTS Writing Task 2",
    description: "Master the IELTS essay structure — introduction, body paragraphs, and conclusion.",
    vocabulary: [
      { word: "Band score", meaning: "IELTS grading system (1-9)", example: "She got a band score of 7.", emoji: "📊", arabic: "درجة الباند" },
      { word: "Task response", meaning: "How well you answer the question", example: "Focus on task response.", emoji: "🎯", arabic: "استجابة للمهمة" },
      { word: "Coherence", meaning: "Logical flow of ideas", example: "Your essay needs more coherence.", emoji: "🔗", arabic: "تماسك" },
      { word: "Cohesion", meaning: "How well sentences connect", example: "Use linking words for cohesion.", emoji: "🧩", arabic: "ترابط" },
      { word: "Lexical resource", meaning: "Range of vocabulary used", example: "Show strong lexical resource.", emoji: "📚", arabic: "ثروة لغوية" },
      { word: "Paraphrase", meaning: "To restate in different words", example: "Paraphrase the question in your introduction.", emoji: "🔄", arabic: "إعادة صياغة" },
      { word: "Discuss both views", meaning: "A common essay type", example: "This is a 'discuss both views' question.", emoji: "⚖️", arabic: "ناقش كلا الرأيين" },
      { word: "Topic sentence", meaning: "The first sentence of a paragraph", example: "Start each paragraph with a topic sentence.", emoji: "📌", arabic: "جملة رئيسية" },
      { word: "Supporting example", meaning: "An example to prove your point", example: "Give a supporting example.", emoji: "💡", arabic: "مثال داعم" },
      { word: "Word count", meaning: "Number of words written", example: "The minimum word count is 250.", emoji: "🔢", arabic: "عدد الكلمات" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "For IELTS Writing Task 2, how many paragraphs should you write?" },
      { speaker: "Student", text: "Four or five — introduction, 2-3 body paragraphs, and conclusion." },
      { speaker: "Teacher", text: "Good. Always paraphrase the question in your introduction." },
      { speaker: "Student", text: "And each body paragraph needs a topic sentence and examples." },
      { speaker: "Teacher", text: "Exactly! Aim for at least 250 words for a good task response." },
    ],
    grammar: {
      title: "Essay Linking Words",
      explanation: "Use linking words for coherence: 'Furthermore', 'On the other hand', 'In conclusion', 'For instance', 'As a result'.",
      examples: [
        { sentence: "Furthermore, studies show that exercise improves focus.", note: "Adding information" },
        { sentence: "On the other hand, some argue it is too expensive.", note: "Showing contrast" },
        { sentence: "For instance, many countries have adopted this policy.", note: "Giving an example" },
        { sentence: "In conclusion, the benefits outweigh the drawbacks.", note: "Concluding" },
      ],
    },
    vocabExercises: [
      { question: "'Paraphrase' means:", options: ["Copy exactly", "Restate in different words", "Delete", "Translate"], correct: 1 },
      { question: "'Coherence' means:", options: ["Good spelling", "Logical flow of ideas", "Many words", "Short sentences"], correct: 1 },
    ],
    conversationExercises: [
      { question: "IELTS Task 2 minimum word count is:", options: ["150", "200", "250", "300"], correct: 2 },
    ],
    grammarExercises: [
      { question: "'___, many countries have adopted this.' (example)", options: ["However", "For instance", "Therefore", "Although"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Lexical resource' refers to:", options: ["Grammar", "Vocabulary range", "Spelling", "Handwriting"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "A 'topic sentence' is:", options: ["The last sentence", "The first sentence of a paragraph", "A question", "A title"], correct: 1 },
    ],
  },
  "exam-prep-9": {
    levelId: "exam-prep", levelLabel: "Exam Preparation", lessonNumber: 9,
    title: "TOEFL Reading Strategies",
    description: "Learn strategies to ace the TOEFL reading section.",
    vocabulary: [
      { word: "Passage", meaning: "A section of text to read", example: "Read the passage carefully.", emoji: "📄", arabic: "نص / فقرة" },
      { word: "Inference question", meaning: "Asks what is implied, not stated", example: "This is an inference question.", emoji: "🧠", arabic: "سؤال استنتاجي" },
      { word: "Vocabulary in context", meaning: "Guessing word meaning from the text", example: "Answer vocabulary in context questions.", emoji: "📖", arabic: "مفردات في السياق" },
      { word: "Reference question", meaning: "Asks what a pronoun refers to", example: "'They' refers to the scientists.", emoji: "👆", arabic: "سؤال مرجعي" },
      { word: "Insert text", meaning: "Place a sentence in the right spot", example: "Where does this sentence fit?", emoji: "📍", arabic: "إدراج نص" },
      { word: "Summary question", meaning: "Choose main points of the passage", example: "Select the best summary.", emoji: "📝", arabic: "سؤال تلخيصي" },
      { word: "Eliminate", meaning: "To remove wrong answers", example: "Eliminate choices that don't match.", emoji: "❌", arabic: "يستبعد" },
      { word: "Time management", meaning: "Using time wisely", example: "Time management is key in TOEFL.", emoji: "⏱️", arabic: "إدارة الوقت" },
      { word: "Distractor", meaning: "A wrong answer designed to trick you", example: "Watch out for distractors.", emoji: "🎭", arabic: "خيار مُضلل" },
      { word: "Academic text", meaning: "Formal educational writing", example: "TOEFL uses academic texts.", emoji: "🎓", arabic: "نص أكاديمي" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "What's the first thing you do with a TOEFL reading passage?" },
      { speaker: "Student", text: "Skim it quickly to get the main idea." },
      { speaker: "Teacher", text: "Then read the questions. For inference questions, look for clues in the text." },
      { speaker: "Student", text: "And eliminate distractors to find the right answer?" },
      { speaker: "Teacher", text: "Yes! Time management is crucial — don't spend too long on one question." },
    ],
    grammar: {
      title: "Academic Vocabulary Patterns",
      explanation: "TOEFL uses academic patterns: 'According to the passage...', 'The author implies...', 'It can be inferred that...'",
      examples: [
        { sentence: "According to the passage, migration increased.", note: "Citing the text" },
        { sentence: "The author implies that reform is needed.", note: "Inference language" },
        { sentence: "It can be inferred that conditions improved.", note: "Drawing conclusions" },
        { sentence: "The word 'harsh' in line 3 is closest in meaning to...", note: "Vocab in context" },
      ],
    },
    vocabExercises: [
      { question: "A 'distractor' is:", options: ["The right answer", "A wrong answer designed to trick", "A passage", "A timer"], correct: 1 },
      { question: "'Eliminate' means:", options: ["To choose", "To remove wrong answers", "To guess", "To copy"], correct: 1 },
    ],
    conversationExercises: [
      { question: "For TOEFL reading, first you should:", options: ["Answer randomly", "Skim the passage", "Skip reading", "Write notes"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'___ the passage, the population grew.' (citing)", options: ["According to", "Despite", "Although", "Unless"], correct: 0 },
    ],
    examQuestions: [
      { question: "An 'inference question' asks:", options: ["What is directly stated", "What is implied", "About grammar", "About spelling"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Time management' means:", options: ["Wasting time", "Using time wisely", "Having free time", "Sleeping"], correct: 1 },
    ],
  },
  "exam-prep-10": {
    levelId: "exam-prep", levelLabel: "Exam Preparation", lessonNumber: 10,
    title: "Cambridge Speaking Test Tips",
    description: "Prepare for Cambridge speaking exams (PET, FCE, CAE) with key strategies.",
    vocabulary: [
      { word: "Examiner", meaning: "The person testing you", example: "The examiner will ask you questions.", emoji: "👩‍🏫", arabic: "ممتحن" },
      { word: "Prompt", meaning: "Material given to help you speak", example: "Look at the visual prompt.", emoji: "🖼️", arabic: "محفز" },
      { word: "Interact", meaning: "To communicate with your partner", example: "Interact naturally with your partner.", emoji: "🗣️", arabic: "يتفاعل" },
      { word: "Compare", meaning: "To discuss similarities and differences", example: "Compare these two photographs.", emoji: "🔍", arabic: "يقارن" },
      { word: "Speculate", meaning: "To guess or think about possibilities", example: "Speculate about what might happen.", emoji: "🤔", arabic: "يتكهن" },
      { word: "Justify", meaning: "To give reasons for your opinion", example: "Justify your choice.", emoji: "⚖️", arabic: "يُبرر" },
      { word: "Elaborate", meaning: "To add more detail", example: "Can you elaborate on that point?", emoji: "📝", arabic: "يسهب" },
      { word: "Fluency", meaning: "Speaking smoothly without pausing", example: "Aim for fluency, not perfection.", emoji: "💬", arabic: "طلاقة" },
      { word: "Turn-taking", meaning: "Taking turns in conversation", example: "Practice turn-taking with a partner.", emoji: "🔄", arabic: "تبادل الأدوار" },
      { word: "Self-correct", meaning: "To fix your own mistakes", example: "It's okay to self-correct.", emoji: "✏️", arabic: "يصحح نفسه" },
    ],
    dialogue: [
      { speaker: "Examiner", text: "Compare these two photos. What do they show about city life?" },
      { speaker: "Candidate", text: "In the first photo, people seem stressed in traffic, while in the second, people are relaxing in a park." },
      { speaker: "Examiner", text: "Can you speculate about which lifestyle is healthier?" },
      { speaker: "Candidate", text: "I'd say spending time in nature is healthier because it reduces stress." },
      { speaker: "Examiner", text: "Good. Can you elaborate on that?" },
    ],
    grammar: {
      title: "Speaking Exam Phrases",
      explanation: "Use these phrases: 'I'd say that...', 'It seems to me that...', 'What I mean is...', 'To be more specific...'",
      examples: [
        { sentence: "I'd say that the first option is better.", note: "Giving an opinion" },
        { sentence: "It seems to me that both have advantages.", note: "Balanced view" },
        { sentence: "What I mean is, education is key.", note: "Clarifying your point" },
        { sentence: "To be more specific, outdoor exercise is best.", note: "Elaborating" },
      ],
    },
    vocabExercises: [
      { question: "To 'speculate' means:", options: ["To know for sure", "To guess about possibilities", "To remember", "To ignore"], correct: 1 },
      { question: "'Turn-taking' means:", options: ["Running fast", "Taking turns in conversation", "Turning around", "Taking notes"], correct: 1 },
    ],
    conversationExercises: [
      { question: "It's okay to ___ during a speaking test.", options: ["Stay silent", "Self-correct mistakes", "Read from notes", "Speak only one word"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'I'd say ___ the first option is better.'", options: ["what", "that", "which", "who"], correct: 1 },
    ],
    examQuestions: [
      { question: "To 'elaborate' means:", options: ["To shorten", "To add more detail", "To stop talking", "To change topic"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Fluency' means:", options: ["Perfect grammar", "Speaking smoothly", "Writing well", "Reading fast"], correct: 1 },
    ],
  },
};
