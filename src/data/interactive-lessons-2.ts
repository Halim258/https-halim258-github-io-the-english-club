import { LessonData } from "./lessons";

export const interactiveLessons2: Record<string, LessonData> = {
  "real-life-2": {
    levelId: "real-life", levelLabel: "Real-life Conversations", lessonNumber: 2,
    title: "At the Doctor's Office",
    description: "Practice describing symptoms, understanding medical advice, and making appointments.",
    vocabulary: [
      { word: "Symptom", meaning: "A sign of illness", example: "What are your symptoms?", emoji: "🤒", arabic: "عَرَض" },
      { word: "Prescription", meaning: "A doctor's written order for medicine", example: "Here's your prescription.", emoji: "💊", arabic: "وصفة طبية" },
      { word: "Appointment", meaning: "A scheduled meeting with the doctor", example: "I have an appointment at 3 PM.", emoji: "📅", arabic: "موعد" },
      { word: "Fever", meaning: "High body temperature", example: "I have a fever of 39°C.", emoji: "🌡️", arabic: "حُمّى" },
      { word: "Headache", meaning: "Pain in the head", example: "I've had a headache all day.", emoji: "🤕", arabic: "صداع" },
      { word: "Examine", meaning: "To check the body for health", example: "The doctor will examine you.", emoji: "🩺", arabic: "يفحص" },
      { word: "Allergic", meaning: "Having a bad reaction to something", example: "I'm allergic to penicillin.", emoji: "⚠️", arabic: "حساسية" },
      { word: "Dose", meaning: "The amount of medicine to take", example: "Take one dose every 8 hours.", emoji: "💉", arabic: "جرعة" },
      { word: "Rest", meaning: "To relax and recover", example: "You need to rest for a few days.", emoji: "🛌", arabic: "راحة" },
      { word: "Pharmacy", meaning: "A place to buy medicine", example: "Get this from the pharmacy.", emoji: "🏥", arabic: "صيدلية" },
    ],
    dialogue: [
      { speaker: "Doctor", text: "Good morning. What seems to be the problem?" },
      { speaker: "Patient", text: "I've had a bad headache and fever for two days." },
      { speaker: "Doctor", text: "Let me examine you. Are you allergic to any medicines?" },
      { speaker: "Patient", text: "No, no allergies." },
      { speaker: "Doctor", text: "I'll write you a prescription. Take this medicine twice a day and get plenty of rest." },
    ],
    grammar: {
      title: "Describing Symptoms with Present Perfect",
      explanation: "Use Present Perfect to describe symptoms: 'I've had a headache since morning', 'I've been feeling dizzy for two days'.",
      examples: [
        { sentence: "I've had a sore throat since yesterday.", note: "'Since' for a specific time" },
        { sentence: "She's been coughing for three days.", note: "'For' for duration" },
        { sentence: "I haven't been sleeping well.", note: "Negative form" },
        { sentence: "Have you taken any medicine?", note: "Question form" },
      ],
    },
    vocabExercises: [
      { question: "A 'symptom' is:", options: ["A medicine", "A sign of illness", "A doctor", "A hospital"], correct: 1 },
      { question: "A 'prescription' is:", options: ["A hospital", "An exercise", "A doctor's order for medicine", "A diet"], correct: 2 },
    ],
    conversationExercises: [
      { question: "What should you tell the doctor about?", options: ["Your job", "Your symptoms and allergies", "Your hobbies", "Your address"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'I've had a headache ___ Monday.'", options: ["for", "since", "during", "while"], correct: 1 },
    ],
    examQuestions: [
      { question: "A 'pharmacy' is:", options: ["A hospital", "A place to buy medicine", "A clinic", "A lab"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "A 'dose' is:", options: ["A type of illness", "The amount of medicine to take", "A doctor's name", "A hospital room"], correct: 1 },
    ],
  },
  "real-life-3": {
    levelId: "real-life", levelLabel: "Real-life Conversations", lessonNumber: 3,
    title: "Shopping & Bargaining",
    description: "Learn to shop, ask about prices, and negotiate in English.",
    vocabulary: [
      { word: "Price", meaning: "How much something costs", example: "What's the price of this shirt?", emoji: "💲", arabic: "سعر" },
      { word: "Discount", meaning: "A reduction in price", example: "Is there a discount on this?", emoji: "🏷️", arabic: "خصم" },
      { word: "Receipt", meaning: "Proof of purchase", example: "Can I have a receipt, please?", emoji: "🧾", arabic: "إيصال" },
      { word: "Size", meaning: "How big or small something is", example: "Do you have this in a larger size?", emoji: "📏", arabic: "مقاس" },
      { word: "Refund", meaning: "Money returned for a product", example: "I'd like a refund, please.", emoji: "💰", arabic: "استرداد" },
      { word: "Fitting room", meaning: "A room to try on clothes", example: "Where is the fitting room?", emoji: "🚪", arabic: "غرفة القياس" },
      { word: "Cash", meaning: "Physical money (bills and coins)", example: "Do you accept cash?", emoji: "💵", arabic: "نقد" },
      { word: "Bargain", meaning: "To negotiate a price / a good deal", example: "That jacket was a real bargain!", emoji: "🤝", arabic: "صفقة" },
      { word: "Exchange", meaning: "To return and get a different item", example: "Can I exchange this for a different color?", emoji: "🔄", arabic: "استبدال" },
      { word: "On sale", meaning: "Available at a reduced price", example: "These shoes are on sale!", emoji: "🔥", arabic: "عرض خاص" },
    ],
    dialogue: [
      { speaker: "Customer", text: "Excuse me, how much is this jacket?" },
      { speaker: "Salesperson", text: "It's $89, but it's on sale for $65 today." },
      { speaker: "Customer", text: "Great! Do you have it in a medium size?" },
      { speaker: "Salesperson", text: "Let me check. Yes! Would you like to try it on? The fitting room is over there." },
      { speaker: "Customer", text: "Perfect. I'll take it! Can I pay by card?" },
    ],
    grammar: {
      title: "Polite Shopping Phrases",
      explanation: "Use polite language when shopping: 'Could you...?', 'I'd like to...', 'Do you have...?', 'Would it be possible to...?'",
      examples: [
        { sentence: "Could you help me find a shirt?", note: "Polite request for help" },
        { sentence: "I'd like to try this on, please.", note: "Polite intention" },
        { sentence: "Do you have this in blue?", note: "Asking about availability" },
        { sentence: "Would it be possible to get a discount?", note: "Very polite negotiation" },
      ],
    },
    vocabExercises: [
      { question: "A 'receipt' is:", options: ["A bag", "Proof of purchase", "A price tag", "A coupon"], correct: 1 },
      { question: "'On sale' means:", options: ["Expensive", "Sold out", "At a reduced price", "New arrival"], correct: 2 },
    ],
    conversationExercises: [
      { question: "How do you ask to try clothes on?", options: ["Give me this!", "Where do I pay?", "Can I try this on?", "How much?"], correct: 2 },
    ],
    grammarExercises: [
      { question: "Which is most polite?", options: ["I want a discount", "Give me cheaper", "Would it be possible to get a discount?", "Less money!"], correct: 2 },
    ],
    examQuestions: [
      { question: "A 'refund' is:", options: ["Extra cost", "Money returned", "A gift", "A coupon"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Exchange' means:", options: ["To buy more", "To return and get different item", "To throw away", "To keep"], correct: 1 },
    ],
  },
  "real-life-4": {
    levelId: "real-life", levelLabel: "Real-life Conversations", lessonNumber: 4,
    title: "At the Airport",
    description: "Practice essential English for air travel — check-in, boarding, and customs.",
    vocabulary: [
      { word: "Boarding pass", meaning: "The ticket to get on a plane", example: "Please show your boarding pass.", emoji: "🎫", arabic: "بطاقة صعود" },
      { word: "Gate", meaning: "The area where you board the plane", example: "Go to Gate 12.", emoji: "🚪", arabic: "بوابة" },
      { word: "Luggage", meaning: "Bags and suitcases for travel", example: "How many pieces of luggage?", emoji: "🧳", arabic: "أمتعة" },
      { word: "Passport", meaning: "Official travel document", example: "May I see your passport?", emoji: "🛂", arabic: "جواز سفر" },
      { word: "Customs", meaning: "Checking goods at border", example: "Go through customs after landing.", emoji: "🏛️", arabic: "جمارك" },
      { word: "Departure", meaning: "When the plane leaves", example: "Departure is at 10:30 AM.", emoji: "🛫", arabic: "مغادرة" },
      { word: "Arrival", meaning: "When the plane lands", example: "Arrival is scheduled for 2 PM.", emoji: "🛬", arabic: "وصول" },
      { word: "Aisle seat", meaning: "A seat next to the walkway", example: "Can I have an aisle seat?", emoji: "💺", arabic: "مقعد بجانب الممر" },
      { word: "Delay", meaning: "A late departure", example: "There's a two-hour delay.", emoji: "⏳", arabic: "تأخير" },
      { word: "Declare", meaning: "To state what items you carry", example: "Do you have anything to declare?", emoji: "📋", arabic: "يُصرّح" },
    ],
    dialogue: [
      { speaker: "Agent", text: "Good morning! May I see your passport and booking confirmation?" },
      { speaker: "Traveler", text: "Here you go. Can I have a window seat, please?" },
      { speaker: "Agent", text: "Sure! Are you checking any luggage?" },
      { speaker: "Traveler", text: "Yes, one suitcase. What gate do I go to?" },
      { speaker: "Agent", text: "Gate 14. Boarding starts at 9:45. Here's your boarding pass." },
    ],
    grammar: {
      title: "Questions at the Airport",
      explanation: "Use 'Can I...?', 'May I...?', 'Could you...?' for requests. Use 'Do I need to...?', 'Where is...?' for information.",
      examples: [
        { sentence: "Can I have an aisle seat, please?", note: "Requesting a preference" },
        { sentence: "Where is Gate 14?", note: "Asking for directions" },
        { sentence: "Do I need to go through customs?", note: "Asking about procedures" },
        { sentence: "Could you help me with my luggage?", note: "Polite request for help" },
      ],
    },
    vocabExercises: [
      { question: "A 'boarding pass' is:", options: ["A hotel key", "A ticket to board the plane", "A passport", "A visa"], correct: 1 },
      { question: "'Customs' is:", options: ["A restaurant", "Checking goods at border", "A gate", "A seat"], correct: 1 },
    ],
    conversationExercises: [
      { question: "What do you show at check-in?", options: ["Driver's license only", "Passport and booking", "Credit card only", "Nothing"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Which is correct?", options: ["Where Gate 14?", "Where is Gate 14?", "Gate 14 where?", "Is where Gate 14?"], correct: 1 },
    ],
    examQuestions: [
      { question: "A 'delay' means:", options: ["Early departure", "On time", "Late departure", "Cancelled"], correct: 2 },
    ],
    homeworkQuestions: [
      { question: "'Declare' at customs means:", options: ["To shout", "To state what items you carry", "To pay", "To leave"], correct: 1 },
    ],
  },
  "real-life-5": {
    levelId: "real-life", levelLabel: "Real-life Conversations", lessonNumber: 5,
    title: "Making Phone Calls",
    description: "Learn to make and receive phone calls in professional and casual settings.",
    vocabulary: [
      { word: "Hold on", meaning: "Wait a moment on the phone", example: "Hold on, I'll transfer you.", emoji: "📞", arabic: "انتظر" },
      { word: "Speaking", meaning: "Confirming you are the person", example: "Hello, this is John speaking.", emoji: "🗣️", arabic: "أنا المتحدث" },
      { word: "Leave a message", meaning: "To record words for someone", example: "Would you like to leave a message?", emoji: "📝", arabic: "اترك رسالة" },
      { word: "Call back", meaning: "To phone again later", example: "Can I call you back in an hour?", emoji: "🔄", arabic: "يعاود الاتصال" },
      { word: "Transfer", meaning: "To connect to another person", example: "I'll transfer you to the manager.", emoji: "➡️", arabic: "يحوّل" },
      { word: "Extension", meaning: "An internal phone number", example: "What extension number, please?", emoji: "🔢", arabic: "تحويلة" },
      { word: "Hang up", meaning: "To end a phone call", example: "Don't hang up — I need to tell you something.", emoji: "📴", arabic: "يغلق الخط" },
      { word: "Ring", meaning: "The sound a phone makes", example: "Let it ring a few more times.", emoji: "🔔", arabic: "رنين" },
      { word: "Voicemail", meaning: "A recorded phone message", example: "You've reached my voicemail.", emoji: "📨", arabic: "بريد صوتي" },
      { word: "Dial", meaning: "To press phone numbers", example: "Dial 9 for an outside line.", emoji: "🔢", arabic: "يطلب رقم" },
    ],
    dialogue: [
      { speaker: "Receptionist", text: "Good afternoon, ABC Company. How can I help you?" },
      { speaker: "Caller", text: "Hello, could I speak to Mr. Ahmed, please?" },
      { speaker: "Receptionist", text: "Hold on, I'll transfer you. ... I'm sorry, he's in a meeting. Would you like to leave a message?" },
      { speaker: "Caller", text: "Yes, please tell him Sarah called. My number is 0555-123-456." },
      { speaker: "Receptionist", text: "Got it. He'll call you back as soon as possible." },
    ],
    grammar: {
      title: "Phone Call Phrases",
      explanation: "Phone calls use specific phrases: 'This is [name] speaking', 'Could I speak to...?', 'I'm calling about...', 'Would you like to leave a message?'",
      examples: [
        { sentence: "Hello, this is Sarah speaking.", note: "Introducing yourself" },
        { sentence: "Could I speak to the manager?", note: "Asking for someone" },
        { sentence: "I'm calling about my order.", note: "Stating the reason" },
        { sentence: "I'm sorry, she's not available right now.", note: "The person is busy" },
      ],
    },
    vocabExercises: [
      { question: "'Hold on' means:", options: ["Hang up", "Wait a moment", "Call back", "Dial again"], correct: 1 },
      { question: "'Voicemail' is:", options: ["An email", "A recorded phone message", "A text", "A letter"], correct: 1 },
    ],
    conversationExercises: [
      { question: "How do you introduce yourself on the phone?", options: ["Hey it's me", "This is [name] speaking", "Who is this?", "Call me"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'Could I ___ to the manager?'", options: ["talk", "speak", "say", "tell"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Transfer' means:", options: ["To hang up", "To connect to another person", "To leave a message", "To dial"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Call back' means:", options: ["To end a call", "To phone again later", "To shout", "To text"], correct: 1 },
    ],
  },
  "slang-2": {
    levelId: "slang", levelLabel: "Slang & Everyday English", lessonNumber: 2,
    title: "Internet & Social Media Slang",
    description: "Learn popular internet abbreviations and social media language.",
    vocabulary: [
      { word: "LOL", meaning: "Laughing Out Loud", example: "That meme was hilarious LOL!", emoji: "😂", arabic: "أضحك بصوت عالي" },
      { word: "DM", meaning: "Direct Message", example: "Send me a DM with the details.", emoji: "✉️", arabic: "رسالة خاصة" },
      { word: "TBH", meaning: "To Be Honest", example: "TBH, I didn't enjoy the movie.", emoji: "😐", arabic: "بصراحة" },
      { word: "GOAT", meaning: "Greatest Of All Time", example: "Messi is the GOAT!", emoji: "🐐", arabic: "الأعظم على الإطلاق" },
      { word: "Flex", meaning: "To show off", example: "He's always flexing his new car.", emoji: "💪", arabic: "يتباهى" },
      { word: "Cap / No cap", meaning: "Lie / No lie (truth)", example: "No cap, that food was amazing.", emoji: "🧢", arabic: "كذب / بدون كذب" },
      { word: "Slay", meaning: "To do something amazingly well", example: "She totally slayed that presentation.", emoji: "✨", arabic: "أبدع" },
      { word: "Binge-watch", meaning: "To watch many episodes at once", example: "I binge-watched the entire series.", emoji: "📺", arabic: "يشاهد بنهم" },
      { word: "Lowkey", meaning: "Slightly, secretly", example: "I'm lowkey nervous about the exam.", emoji: "🤫", arabic: "بشكل خفي" },
      { word: "Highkey", meaning: "Very, openly", example: "I'm highkey excited for the trip!", emoji: "🔥", arabic: "بشكل واضح جداً" },
    ],
    dialogue: [
      { speaker: "Zoe", text: "Did you see that meme I sent? LOL!" },
      { speaker: "Max", text: "Yes! 😂 TBH, I've been binge-watching meme compilations all day." },
      { speaker: "Zoe", text: "No cap, me too. Also, did you see Lina's presentation? She totally slayed!" },
      { speaker: "Max", text: "She's the GOAT at public speaking. I'm lowkey jealous." },
      { speaker: "Zoe", text: "Same! DM her for tips — she won't mind." },
    ],
    grammar: {
      title: "Internet Slang vs Standard English",
      explanation: "Internet slang is for texting and social media ONLY. Never use it in formal writing, emails, or academic work.",
      examples: [
        { sentence: "Text: 'LOL that's so funny' → Formal: 'That was very amusing.'", note: "LOL = informal laughter" },
        { sentence: "Text: 'TBH I disagree' → Formal: 'To be honest, I disagree.'", note: "Write it out formally" },
        { sentence: "Text: 'She slayed' → Formal: 'She performed excellently.'", note: "Different register" },
        { sentence: "Text: 'No cap' → Formal: 'I'm being completely honest.'", note: "Translate to formal" },
      ],
    },
    vocabExercises: [
      { question: "'GOAT' stands for:", options: ["A farm animal", "Greatest Of All Time", "Get Out And Talk", "None"], correct: 1 },
      { question: "'Lowkey' means:", options: ["Loudly", "Slightly, secretly", "Angrily", "Happily"], correct: 1 },
    ],
    conversationExercises: [
      { question: "Where should you use internet slang?", options: ["Job applications", "Academic papers", "Texts with friends", "Business emails"], correct: 2 },
    ],
    grammarExercises: [
      { question: "'No cap' means:", options: ["No hat", "I'm lying", "I'm telling the truth", "I don't know"], correct: 2 },
    ],
    examQuestions: [
      { question: "'Binge-watch' means:", options: ["Watch one episode", "Watch many episodes at once", "Stop watching", "Record a show"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Slay' in slang means:", options: ["To kill", "To fail", "To do amazingly well", "To sleep"], correct: 2 },
    ],
  },
  "slang-3": {
    levelId: "slang", levelLabel: "Slang & Everyday English", lessonNumber: 3,
    title: "Slang for Emotions & Reactions",
    description: "Express feelings and reactions using casual everyday English.",
    vocabulary: [
      { word: "Stoked", meaning: "Very excited", example: "I'm so stoked about the concert!", emoji: "🤩", arabic: "متحمس جداً" },
      { word: "Bummed", meaning: "Disappointed or sad", example: "I'm really bummed the game was cancelled.", emoji: "😞", arabic: "محبط" },
      { word: "Cringe", meaning: "To feel embarrassed", example: "That speech was so cringe.", emoji: "😬", arabic: "محرج" },
      { word: "Lit", meaning: "Amazing, exciting", example: "The party was so lit!", emoji: "🔥", arabic: "رائع" },
      { word: "Shook", meaning: "Shocked or surprised", example: "I was shook when I heard the news.", emoji: "😱", arabic: "مصدوم" },
      { word: "Savage", meaning: "Bold and fearless (often funny)", example: "Her comeback was savage!", emoji: "💀", arabic: "جريء" },
      { word: "Dead", meaning: "Extremely funny (laughing so hard)", example: "That joke — I'm dead! 💀", emoji: "💀", arabic: "أموت من الضحك" },
      { word: "Sus", meaning: "Suspicious", example: "That excuse sounds kinda sus.", emoji: "🤨", arabic: "مشبوه" },
      { word: "Iconic", meaning: "Legendary, memorable", example: "That moment was so iconic!", emoji: "⭐", arabic: "أسطوري" },
      { word: "Basic", meaning: "Mainstream, unoriginal", example: "Pumpkin spice latte? That's so basic.", emoji: "☕", arabic: "عادي / تقليدي" },
    ],
    dialogue: [
      { speaker: "Jake", text: "Bro, did you see the finale? I was shook!" },
      { speaker: "Ryan", text: "Same! That plot twist was iconic. I'm still not over it." },
      { speaker: "Jake", text: "And the villain's speech was kinda cringe though." },
      { speaker: "Ryan", text: "True, but the hero's comeback was savage. I was dead! 💀" },
      { speaker: "Jake", text: "The whole season was lit. I'm stoked for season 2!" },
    ],
    grammar: {
      title: "Slang Adjectives as Reactions",
      explanation: "Slang adjectives work like regular adjectives but are more expressive: 'That was lit!', 'I'm shook', 'So cringe!'",
      examples: [
        { sentence: "That concert was lit! (= amazing)", note: "Describing an event" },
        { sentence: "I'm so stoked! (= very excited)", note: "Describing a feeling" },
        { sentence: "That was lowkey savage. (= bold)", note: "Combining slang words" },
        { sentence: "She's highkey iconic. (= very legendary)", note: "Intensifier + slang" },
      ],
    },
    vocabExercises: [
      { question: "'Shook' means:", options: ["Angry", "Shocked or surprised", "Tired", "Bored"], correct: 1 },
      { question: "'Lit' means:", options: ["On fire literally", "Boring", "Amazing, exciting", "Dark"], correct: 2 },
    ],
    conversationExercises: [
      { question: "'Dead' in slang means:", options: ["Not alive", "Bored", "Laughing very hard", "Sleeping"], correct: 2 },
    ],
    grammarExercises: [
      { question: "'Sus' is short for:", options: ["Sustainable", "Suspicious", "Surprising", "Super"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Cringe' describes something:", options: ["Funny", "Exciting", "Embarrassing", "Beautiful"], correct: 2 },
    ],
    homeworkQuestions: [
      { question: "'Stoked' means:", options: ["Bored", "Angry", "Very excited", "Confused"], correct: 2 },
    ],
  },
};
