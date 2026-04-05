import { LessonData } from "./lessons";

export const interactiveLessons: Record<string, LessonData> = {
  "movies-1": {
    levelId: "movies", levelLabel: "English through Movies", lessonNumber: 1,
    title: "Learning from Movie Dialogues",
    description: "Analyze real movie conversations to learn natural English expressions.",
    vocabulary: [
      { word: "Dialogue", meaning: "Conversation between characters", example: "The movie dialogue was very natural.", emoji: "💬", arabic: "حوار" },
      { word: "Expression", meaning: "A phrase with a specific meaning", example: "'Break a leg' is a common expression.", emoji: "🗣️", arabic: "تعبير" },
      { word: "Context", meaning: "The situation around a scene", example: "Understand the context to get the meaning.", emoji: "🎬", arabic: "سياق" },
      { word: "Subtitle", meaning: "Text translation on screen", example: "Watch with English subtitles first.", emoji: "📺", arabic: "ترجمة" },
      { word: "Scene", meaning: "A part of a movie", example: "Replay the scene to catch every word.", emoji: "🎥", arabic: "مشهد" },
      { word: "Genre", meaning: "Category of film", example: "Comedy is a popular genre.", emoji: "🎭", arabic: "نوع" },
      { word: "Quote", meaning: "Exact words from a character", example: "'May the Force be with you' is a famous quote.", emoji: "💎", arabic: "اقتباس" },
      { word: "Slang", meaning: "Very informal words", example: "Movies teach lots of slang.", emoji: "😎", arabic: "عامية" },
      { word: "Catchphrase", meaning: "A famous repeated phrase", example: "'I'll be back' is a catchphrase.", emoji: "🔄", arabic: "عبارة شائعة" },
      { word: "Mimic", meaning: "To copy someone's speech", example: "Mimic the actor's pronunciation.", emoji: "🎭", arabic: "يقلّد" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Let's analyze this movie scene. What does the character mean by 'That's a long shot'?" },
      { speaker: "Student", text: "It means something unlikely to happen?" },
      { speaker: "Teacher", text: "Exactly! Now try mimicking the way the actor says it." },
      { speaker: "Student", text: "That's a LONG shot... Was my intonation right?" },
      { speaker: "Teacher", text: "Perfect! You're learning natural rhythm from real speech." },
    ],
    grammar: {
      title: "Informal Grammar in Movies",
      explanation: "Movies use informal grammar: contractions, dropped words, fragments. Understanding these is key to real English.",
      examples: [
        { sentence: "'Gonna' instead of 'going to'", note: "Common informal contraction" },
        { sentence: "'You coming?' instead of 'Are you coming?'", note: "Dropped auxiliary verb" },
        { sentence: "'No way!' — a sentence fragment", note: "Fragments are normal in speech" },
        { sentence: "'I gotta go' instead of 'I have got to go'", note: "Multiple words compressed" },
      ],
    },
    vocabExercises: [
      { question: "A 'catchphrase' is:", options: ["A sentence", "A famous repeated phrase", "A subtitle", "A genre"], correct: 1 },
      { question: "To 'mimic' means:", options: ["To watch", "To copy speech", "To write", "To translate"], correct: 1 },
    ],
    conversationExercises: [
      { question: "The best way to learn from movies is:", options: ["Watch on mute", "Mimic and repeat dialogues", "Only read subtitles", "Skip dialogues"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'Gonna' is informal for:", options: ["Going to", "Want to", "Got to", "Have to"], correct: 0 },
    ],
    examQuestions: [
      { question: "'That's a long shot' means:", options: ["Something far away", "Something unlikely", "A camera angle", "A loud noise"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Why watch movies with subtitles?", options: ["For fun only", "To connect spoken and written English", "It's required", "To test hearing"], correct: 1 },
    ],
  },
  "stories-1": {
    levelId: "stories", levelLabel: "English through Stories", lessonNumber: 1,
    title: "Reading Short Stories",
    description: "Build reading and vocabulary skills through engaging short stories.",
    vocabulary: [
      { word: "Plot", meaning: "The main events of a story", example: "The plot had many surprises.", emoji: "📖", arabic: "حبكة" },
      { word: "Character", meaning: "A person in the story", example: "The main character is brave.", emoji: "🧑", arabic: "شخصية" },
      { word: "Setting", meaning: "Where/when the story happens", example: "The setting is a small village.", emoji: "🏘️", arabic: "مكان" },
      { word: "Narrator", meaning: "The person telling the story", example: "The narrator is a young girl.", emoji: "🎙️", arabic: "راوي" },
      { word: "Theme", meaning: "The main message or lesson", example: "The theme is about friendship.", emoji: "💡", arabic: "موضوع" },
      { word: "Conflict", meaning: "The problem in the story", example: "The conflict is between two brothers.", emoji: "⚔️", arabic: "صراع" },
      { word: "Resolution", meaning: "How the problem is solved", example: "The resolution was unexpected.", emoji: "✅", arabic: "حل" },
      { word: "Moral", meaning: "The lesson of the story", example: "The moral is honesty is the best policy.", emoji: "🌟", arabic: "عبرة" },
      { word: "Fiction", meaning: "A made-up story", example: "Harry Potter is fiction.", emoji: "🧙", arabic: "خيال" },
      { word: "Non-fiction", meaning: "A true story or factual text", example: "Biographies are non-fiction.", emoji: "📰", arabic: "واقعي" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "After reading the story, what was the main conflict?" },
      { speaker: "Student", text: "The boy wanted to explore the forest, but his parents said it was dangerous." },
      { speaker: "Teacher", text: "Good! And how was it resolved?" },
      { speaker: "Student", text: "He proved it was safe by bringing back beautiful flowers." },
      { speaker: "Teacher", text: "What do you think the moral is?" },
    ],
    grammar: {
      title: "Narrative Tenses in Stories",
      explanation: "Stories use Past Simple for events, Past Continuous for background, and Past Perfect for earlier events.",
      examples: [
        { sentence: "She walked into the forest. (Past Simple)", note: "Main events in sequence" },
        { sentence: "The birds were singing. (Past Continuous)", note: "Background/atmosphere" },
        { sentence: "She had never been there before. (Past Perfect)", note: "An event before the story's timeline" },
        { sentence: "Suddenly, she found a hidden path. (Past Simple)", note: "'Suddenly' — a key plot moment" },
      ],
    },
    vocabExercises: [
      { question: "The 'conflict' is:", options: ["The ending", "The problem", "The setting", "The narrator"], correct: 1 },
      { question: "'Fiction' means:", options: ["True stories", "Made-up stories", "News", "History"], correct: 1 },
    ],
    conversationExercises: [
      { question: "The 'theme' is:", options: ["The main character", "The main message", "The title", "The setting"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Background description uses:", options: ["Present Simple", "Past Continuous", "Future", "Past Perfect"], correct: 1 },
    ],
    examQuestions: [
      { question: "A 'narrator' is:", options: ["The writer", "The person telling the story", "A character", "The reader"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Resolution' means:", options: ["The beginning", "How the problem is solved", "A new conflict", "The setting"], correct: 1 },
    ],
  },
  "real-life-1": {
    levelId: "real-life", levelLabel: "Real-life Conversations", lessonNumber: 1,
    title: "At the Restaurant",
    description: "Practice ordering food, asking for recommendations, and paying the bill.",
    vocabulary: [
      { word: "Menu", meaning: "A list of food and drinks", example: "Can I see the menu, please?", emoji: "📋", arabic: "قائمة طعام" },
      { word: "Appetizer", meaning: "A small dish before the main course", example: "I'll have soup as an appetizer.", emoji: "🥗", arabic: "مقبلات" },
      { word: "Main course", meaning: "The biggest dish of the meal", example: "For my main course, I'd like pasta.", emoji: "🍝", arabic: "طبق رئيسي" },
      { word: "Dessert", meaning: "A sweet dish after the meal", example: "Would you like dessert?", emoji: "🍰", arabic: "حلوى" },
      { word: "Bill", meaning: "The paper showing what you owe", example: "Could I have the bill, please?", emoji: "💳", arabic: "فاتورة" },
      { word: "Reservation", meaning: "A booking at a restaurant", example: "I have a reservation for 7 PM.", emoji: "📅", arabic: "حجز" },
      { word: "Recommend", meaning: "To suggest something good", example: "What do you recommend?", emoji: "👨‍🍳", arabic: "يوصي" },
      { word: "Allergic", meaning: "Having an allergy to something", example: "I'm allergic to nuts.", emoji: "⚠️", arabic: "يعاني من حساسية" },
      { word: "Tip", meaning: "Extra money for service", example: "We left a generous tip.", emoji: "💰", arabic: "بقشيش" },
      { word: "Waiter", meaning: "A person who serves food", example: "The waiter was very friendly.", emoji: "🧑‍🍳", arabic: "نادل" },
    ],
    dialogue: [
      { speaker: "Waiter", text: "Good evening! Do you have a reservation?" },
      { speaker: "Customer", text: "Yes, for two under the name Ali." },
      { speaker: "Waiter", text: "Right this way. Here's the menu. Can I get you something to drink?" },
      { speaker: "Customer", text: "I'll have water, please. What do you recommend for the main course?" },
      { speaker: "Waiter", text: "The grilled salmon is excellent today!" },
    ],
    grammar: {
      title: "Polite Ordering Language",
      explanation: "Use polite phrases when ordering: 'I'd like...', 'Could I have...?', 'I'll have...', 'May I have...?'",
      examples: [
        { sentence: "I'd like the grilled chicken, please.", note: "'I'd like' — polite and natural" },
        { sentence: "Could I have the bill, please?", note: "'Could I have' — polite request" },
        { sentence: "I'll have the soup as a starter.", note: "'I'll have' — confident choice" },
        { sentence: "May I have some more water?", note: "'May I' — very formal/polite" },
      ],
    },
    vocabExercises: [
      { question: "An 'appetizer' is:", options: ["The main dish", "A drink", "A small dish before the main course", "Dessert"], correct: 2 },
      { question: "A 'reservation' is:", options: ["A complaint", "A booking", "A tip", "A menu"], correct: 1 },
    ],
    conversationExercises: [
      { question: "How do you politely ask for the bill?", options: ["Give me money!", "Could I have the bill, please?", "Bill!", "Pay now."], correct: 1 },
    ],
    grammarExercises: [
      { question: "Which is the most polite?", options: ["I want pasta", "Give me pasta", "I'd like the pasta, please", "Pasta!"], correct: 2 },
    ],
    examQuestions: [
      { question: "'Allergic' means:", options: ["Loving food", "Having an allergy", "Being hungry", "Disliking something"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "A 'tip' is:", options: ["Advice", "Extra money for service", "The menu", "A complaint"], correct: 1 },
    ],
  },
  "slang-1": {
    levelId: "slang", levelLabel: "Slang & Everyday English", lessonNumber: 1,
    title: "Common English Slang",
    description: "Understand and use informal English expressions like a native speaker.",
    vocabulary: [
      { word: "Cool", meaning: "Great, nice, impressive", example: "That jacket is really cool!", emoji: "😎", arabic: "رائع" },
      { word: "Hang out", meaning: "To spend time casually", example: "Let's hang out this weekend.", emoji: "🤙", arabic: "يقضي وقت" },
      { word: "No worries", meaning: "It's okay, don't worry", example: "'Sorry I'm late.' 'No worries!'", emoji: "✌️", arabic: "لا مشكلة" },
      { word: "Gonna", meaning: "Going to", example: "I'm gonna watch a movie.", emoji: "🎬", arabic: "سوف (عامية)" },
      { word: "Wanna", meaning: "Want to", example: "Do you wanna come with us?", emoji: "❓", arabic: "تريد (عامية)" },
      { word: "Chill", meaning: "To relax / calm", example: "Let's just chill at home.", emoji: "🧊", arabic: "يسترخي" },
      { word: "FOMO", meaning: "Fear Of Missing Out", example: "I have FOMO about the concert.", emoji: "😰", arabic: "خوف من الفوات" },
      { word: "Vibe", meaning: "A feeling or atmosphere", example: "This café has a great vibe.", emoji: "✨", arabic: "أجواء" },
      { word: "Ghost", meaning: "To suddenly stop responding", example: "He ghosted me after one date.", emoji: "👻", arabic: "يختفي فجأة" },
      { word: "Salty", meaning: "Bitter or upset", example: "She's salty about losing the game.", emoji: "🧂", arabic: "منزعج" },
    ],
    dialogue: [
      { speaker: "Alex", text: "Hey! Wanna hang out this Saturday?" },
      { speaker: "Sam", text: "Sure! What's the plan?" },
      { speaker: "Alex", text: "Nothing big — just chill at the park. The vibe there is amazing." },
      { speaker: "Sam", text: "Cool! I've got FOMO about that concert though." },
      { speaker: "Alex", text: "No worries — we can catch the next one!" },
    ],
    grammar: {
      title: "When to Use Slang (Register Awareness)",
      explanation: "Slang is for informal situations — friends, casual texts, social media. Avoid it in formal writing, interviews, and academic work.",
      examples: [
        { sentence: "Informal: 'Gonna grab some food.' Formal: 'I'm going to get something to eat.'", note: "Choose register based on audience" },
        { sentence: "Text: 'wanna hang out?' Email: 'Would you like to meet up?'", note: "Same meaning, different formality" },
        { sentence: "Friend: 'That's sick!' (= amazing) Boss: 'That's impressive.'", note: "'Sick' as slang = impressive" },
        { sentence: "Social media: 'mood 🔥' Presentation: 'This resonates with many people.'", note: "Audience determines language" },
      ],
    },
    vocabExercises: [
      { question: "'Ghost' (slang) means:", options: ["A spirit", "To suddenly stop responding", "To scare someone", "To disappear physically"], correct: 1 },
      { question: "'Vibe' means:", options: ["Music", "A feeling or atmosphere", "A dance", "A text message"], correct: 1 },
      { question: "'FOMO' stands for:", options: ["Find Our Missing Objects", "Fear Of Missing Out", "Friends Only Meet Online", "None"], correct: 1 },
    ],
    conversationExercises: [
      { question: "When should you use slang?", options: ["In a job interview", "With friends casually", "In academic papers", "In formal emails"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'That's sick!' in slang means:", options: ["That's disgusting", "That's amazing", "That's unhealthy", "That's wrong"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Salty' in slang means:", options: ["Tasty", "Bitter or upset", "Happy", "Hungry"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Chill' can mean:", options: ["Only cold", "To relax", "To exercise", "To study"], correct: 1 },
    ],
  },
};
