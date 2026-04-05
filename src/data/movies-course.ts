import { LessonData } from "./lessons";

export interface MovieLessonData {
  id: number;
  level: string;
  levelLabel: string;
  title: string;
  emoji: string;
  movieTitle: string;
  youtubeId: string;
  description: string;
  sceneContext: string;
  vocabulary: { word: string; meaning: string; emoji: string; arabic: string; example: string }[];
  expressions: { phrase: string; meaning: string; emoji: string; arabic: string }[];
  questions: { question: string; options: string[]; correct: number }[];
  culturalNote?: string;
}

export const moviesCourse: MovieLessonData[] = [
  // ─── A1 – Beginner ───
  {
    id: 1, level: "A1", levelLabel: "Beginner",
    title: "Meeting New Friends", emoji: "🧸",
    movieTitle: "Toy Story",
    youtubeId: "v-PjgYDrg70",
    description: "Learn basic greetings and introductions from Toy Story",
    sceneContext: "Woody meets Buzz Lightyear for the first time. Watch how characters introduce themselves and express feelings.",
    vocabulary: [
      { word: "friend", meaning: "A person you like and enjoy spending time with", emoji: "🤝", arabic: "صديق", example: "Woody is Buzz's friend." },
      { word: "toy", meaning: "An object children play with", emoji: "🧸", arabic: "لعبة", example: "Buzz is a new toy." },
      { word: "play", meaning: "To have fun with games or toys", emoji: "🎮", arabic: "يلعب", example: "The kids play with their toys." },
      { word: "scared", meaning: "Feeling afraid of something", emoji: "😨", arabic: "خائف", example: "Woody is scared of losing his place." },
      { word: "fly", meaning: "To move through the air", emoji: "✈️", arabic: "يطير", example: "Buzz thinks he can fly!" },
      { word: "room", meaning: "A space inside a house", emoji: "🏠", arabic: "غرفة", example: "Andy's room is full of toys." },
    ],
    expressions: [
      { phrase: "To infinity and beyond!", meaning: "Going very far, no limits", emoji: "🚀", arabic: "إلى اللانهاية وما بعدها" },
      { phrase: "You're my favorite", meaning: "I like you the most", emoji: "⭐", arabic: "أنت المفضل لدي" },
      { phrase: "Let's be friends", meaning: "I want us to be friends", emoji: "🤝", arabic: "لنكن أصدقاء" },
    ],
    questions: [
      { question: "What kind of character is Buzz?", options: ["A car 🚗", "A toy 🧸", "A teacher 👩‍🏫", "A pet 🐕"], correct: 1 },
      { question: "What does 'scared' mean?", options: ["Happy 😊", "Afraid 😨", "Angry 😠", "Tired 😴"], correct: 1 },
      { question: "Who says 'To infinity and beyond'?", options: ["Woody", "Buzz 🚀", "Andy", "Rex"], correct: 1 },
      { question: "What does Buzz think he can do?", options: ["Swim 🏊", "Cook 🍳", "Fly ✈️", "Sing 🎤"], correct: 2 },
    ],
    culturalNote: "Toy Story (1995) was the first fully computer-animated feature film! 🎬",
  },
  {
    id: 2, level: "A1", levelLabel: "Beginner",
    title: "Family & Home", emoji: "🦁",
    movieTitle: "The Lion King",
    youtubeId: "lFzVJEksoDY",
    description: "Learn family words and feelings with The Lion King",
    sceneContext: "Simba learns about his family and the Circle of Life. Great for learning family vocabulary.",
    vocabulary: [
      { word: "father", meaning: "Your male parent, your dad", emoji: "👨", arabic: "أب", example: "Mufasa is Simba's father." },
      { word: "king", meaning: "The male ruler of a country", emoji: "👑", arabic: "ملك", example: "Mufasa is the king." },
      { word: "home", meaning: "The place where you live", emoji: "🏠", arabic: "بيت", example: "Pride Rock is their home." },
      { word: "remember", meaning: "To think about something from the past", emoji: "💭", arabic: "يتذكر", example: "Remember who you are!" },
      { word: "brave", meaning: "Not afraid, having courage", emoji: "💪", arabic: "شجاع", example: "Simba is a brave lion." },
      { word: "land", meaning: "An area of ground", emoji: "🌍", arabic: "أرض", example: "Everything the light touches is our land." },
    ],
    expressions: [
      { phrase: "Hakuna Matata", meaning: "No worries, don't be stressed", emoji: "😎", arabic: "لا تقلق" },
      { phrase: "Remember who you are", meaning: "Don't forget your identity", emoji: "💭", arabic: "تذكّر من أنت" },
      { phrase: "It's the Circle of Life", meaning: "Everything is connected in nature", emoji: "🔄", arabic: "إنها دورة الحياة" },
    ],
    questions: [
      { question: "Who is Simba's father?", options: ["Scar", "Timon", "Mufasa 👑", "Pumbaa"], correct: 2 },
      { question: "What does 'brave' mean?", options: ["Scared 😨", "Strong and not afraid 💪", "Sleepy 😴", "Funny 😂"], correct: 1 },
      { question: "What does 'Hakuna Matata' mean?", options: ["Good morning", "No worries 😎", "Goodbye", "Thank you"], correct: 1 },
      { question: "Where do they live?", options: ["A cave", "Pride Rock 🏔️", "A forest", "The ocean"], correct: 1 },
    ],
    culturalNote: "'Hakuna Matata' is a real Swahili phrase used in East Africa! 🌍",
  },
  {
    id: 3, level: "A1", levelLabel: "Beginner",
    title: "Colors & Magic", emoji: "❄️",
    movieTitle: "Frozen",
    youtubeId: "L0MK7qz13bU",
    description: "Learn colors, weather, and emotions with Frozen",
    sceneContext: "Elsa discovers her ice powers and sings 'Let It Go.' Perfect for learning weather and emotion words.",
    vocabulary: [
      { word: "cold", meaning: "Low temperature, not warm", emoji: "🥶", arabic: "بارد", example: "The snow is very cold." },
      { word: "snow", meaning: "White frozen water that falls from the sky", emoji: "❄️", arabic: "ثلج", example: "Elsa makes beautiful snow." },
      { word: "sister", meaning: "A girl who has the same parents as you", emoji: "👭", arabic: "أخت", example: "Anna is Elsa's sister." },
      { word: "door", meaning: "What you open to enter a room", emoji: "🚪", arabic: "باب", example: "Elsa closes her door." },
      { word: "love", meaning: "A very strong feeling of care for someone", emoji: "❤️", arabic: "حب", example: "Anna loves her sister." },
      { word: "castle", meaning: "A large, strong building where royalty lives", emoji: "🏰", arabic: "قلعة", example: "They live in a castle." },
    ],
    expressions: [
      { phrase: "Let it go!", meaning: "Stop worrying, be free", emoji: "🦋", arabic: "دعها تذهب" },
      { phrase: "Do you want to build a snowman?", meaning: "Let's play together!", emoji: "⛄", arabic: "هل تريد بناء رجل ثلج؟" },
      { phrase: "The cold never bothered me", meaning: "I'm not affected by problems", emoji: "❄️", arabic: "البرد لم يزعجني أبداً" },
    ],
    questions: [
      { question: "What power does Elsa have?", options: ["Fire 🔥", "Ice and snow ❄️", "Flying 🦅", "Invisibility 👻"], correct: 1 },
      { question: "Who is Anna to Elsa?", options: ["Her mother", "Her friend", "Her sister 👭", "Her teacher"], correct: 2 },
      { question: "What does 'Let it go' mean?", options: ["Hold on tight", "Stop worrying 🦋", "Run away", "Be quiet"], correct: 1 },
      { question: "Where do Elsa and Anna live?", options: ["A farm", "A castle 🏰", "A school", "A boat"], correct: 1 },
    ],
    culturalNote: "'Let It Go' became one of the most popular Disney songs ever, translated into 41 languages! 🎵",
  },

  // ─── A2 – Elementary ───
  {
    id: 4, level: "A2", levelLabel: "Elementary",
    title: "Dreams & Goals", emoji: "🐠",
    movieTitle: "Finding Nemo",
    youtubeId: "SPHfeNgogVs",
    description: "Learn about family bonds, ocean life, and never giving up",
    sceneContext: "Marlin crosses the ocean to find his son Nemo. Learn vocabulary about the sea, travel, and determination.",
    vocabulary: [
      { word: "ocean", meaning: "The very large body of salt water", emoji: "🌊", arabic: "محيط", example: "They swim across the ocean." },
      { word: "lost", meaning: "Unable to find the way, missing", emoji: "😟", arabic: "ضائع", example: "Nemo is lost in the ocean." },
      { word: "journey", meaning: "A long trip from one place to another", emoji: "🗺️", arabic: "رحلة", example: "Marlin goes on a long journey." },
      { word: "danger", meaning: "A situation that can harm you", emoji: "⚠️", arabic: "خطر", example: "The ocean has many dangers." },
      { word: "promise", meaning: "To tell someone you will do something", emoji: "🤞", arabic: "وعد", example: "Marlin promises to find Nemo." },
      { word: "trust", meaning: "To believe someone is good and honest", emoji: "🤝", arabic: "ثقة", example: "Nemo trusts his father." },
    ],
    expressions: [
      { phrase: "Just keep swimming", meaning: "Don't give up, keep trying", emoji: "🐟", arabic: "استمر في السباحة" },
      { phrase: "I promise", meaning: "I will definitely do it", emoji: "🤞", arabic: "أعدك" },
      { phrase: "Fish are friends, not food", meaning: "Be kind to everyone", emoji: "🦈", arabic: "الأسماك أصدقاء وليست طعام" },
    ],
    questions: [
      { question: "Who is Nemo's father?", options: ["Dory", "Marlin 🐠", "Bruce", "Gill"], correct: 1 },
      { question: "What does 'Just keep swimming' mean?", options: ["Go faster", "Don't give up 🐟", "Turn back", "Be careful"], correct: 1 },
      { question: "Where does the story take place?", options: ["In a forest 🌲", "In the ocean 🌊", "In a city 🏙️", "In the sky ☁️"], correct: 1 },
      { question: "What is Marlin's goal?", options: ["To find food", "To find Nemo", "To explore", "To make friends"], correct: 1 },
    ],
    culturalNote: "Clownfish like Nemo really do live inside sea anemones for protection! 🐠🌊",
  },
  {
    id: 5, level: "A2", levelLabel: "Elementary",
    title: "Cooking & Following Your Dream", emoji: "🐀",
    movieTitle: "Ratatouille",
    youtubeId: "3YG4h5GbTqU",
    description: "Learn food vocabulary and expressing opinions from Ratatouille",
    sceneContext: "Remy the rat dreams of becoming a chef in Paris. Learn cooking words and how to talk about your dreams.",
    vocabulary: [
      { word: "chef", meaning: "A professional cook in a restaurant", emoji: "👨‍🍳", arabic: "طباخ", example: "Remy wants to be a chef." },
      { word: "recipe", meaning: "Instructions for cooking a dish", emoji: "📋", arabic: "وصفة", example: "He follows a special recipe." },
      { word: "taste", meaning: "The flavor of food in your mouth", emoji: "👅", arabic: "طعم/يتذوق", example: "The soup has a great taste." },
      { word: "kitchen", meaning: "The room where food is prepared", emoji: "🍳", arabic: "مطبخ", example: "The kitchen is very busy." },
      { word: "ingredient", meaning: "One of the foods used to make a dish", emoji: "🥕", arabic: "مكوّن", example: "Fresh ingredients make better food." },
      { word: "restaurant", meaning: "A place where people pay to eat meals", emoji: "🍽️", arabic: "مطعم", example: "Gusteau's is a famous restaurant." },
    ],
    expressions: [
      { phrase: "Anyone can cook!", meaning: "Everyone has the ability to do great things", emoji: "👨‍🍳", arabic: "أي شخص يمكنه الطبخ" },
      { phrase: "Follow your dream", meaning: "Do what you love most", emoji: "⭐", arabic: "اتبع حلمك" },
      { phrase: "Not everyone can become a great artist, but a great artist can come from anywhere", meaning: "Talent has no boundaries", emoji: "🎨", arabic: "ليس الجميع يصبح فناناً عظيماً، لكن الفنان العظيم يأتي من أي مكان" },
    ],
    questions: [
      { question: "What animal is Remy?", options: ["A cat 🐱", "A dog 🐕", "A rat 🐀", "A bird 🐦"], correct: 2 },
      { question: "What does Remy want to be?", options: ["A singer 🎤", "A chef 👨‍🍳", "A teacher 👩‍🏫", "A doctor 🩺"], correct: 1 },
      { question: "Where is the restaurant?", options: ["London", "New York", "Paris 🇫🇷", "Rome"], correct: 2 },
      { question: "What does 'recipe' mean?", options: ["A restaurant name", "Cooking instructions 📋", "A type of food", "A kitchen tool"], correct: 1 },
    ],
    culturalNote: "Ratatouille is actually a real French vegetable dish from Nice! 🇫🇷🥕",
  },
  {
    id: 6, level: "A2", levelLabel: "Elementary",
    title: "Adventure & Friendship", emoji: "🏠",
    movieTitle: "Up",
    youtubeId: "pkqzFUhGPJg",
    description: "Learn about adventure, age, and expressing emotions",
    sceneContext: "Carl and Russell go on an incredible adventure. Learn words about travel, feelings, and helping others.",
    vocabulary: [
      { word: "adventure", meaning: "An exciting experience or journey", emoji: "🧭", arabic: "مغامرة", example: "They go on a big adventure." },
      { word: "balloon", meaning: "A thin rubber bag filled with air or gas", emoji: "🎈", arabic: "بالون", example: "The house flies with balloons." },
      { word: "explorer", meaning: "A person who travels to discover new places", emoji: "🧭", arabic: "مستكشف", example: "Russell wants to be an explorer." },
      { word: "promise", meaning: "A commitment to do something", emoji: "🤝", arabic: "وعد", example: "Carl made a promise to Ellie." },
      { word: "grumpy", meaning: "Bad-tempered, easily annoyed", emoji: "😠", arabic: "عابس", example: "Carl is a grumpy old man." },
      { word: "badge", meaning: "A small piece of metal or cloth showing achievement", emoji: "🏅", arabic: "شارة", example: "Russell needs one more badge." },
    ],
    expressions: [
      { phrase: "Adventure is out there!", meaning: "Exciting things are waiting for you", emoji: "🌄", arabic: "المغامرة هناك في الخارج" },
      { phrase: "Cross my heart", meaning: "I truly promise", emoji: "❤️", arabic: "أقسم بقلبي" },
      { phrase: "Thanks for the adventure", meaning: "Thank you for the experience", emoji: "🙏", arabic: "شكراً على المغامرة" },
    ],
    questions: [
      { question: "How does the house fly?", options: ["With wings", "With balloons 🎈", "With a rocket", "With magic"], correct: 1 },
      { question: "What does 'grumpy' mean?", options: ["Happy 😊", "Easily annoyed 😠", "Excited 🤩", "Sleepy 😴"], correct: 1 },
      { question: "What does Russell want?", options: ["A pet", "A badge 🏅", "A house", "Money"], correct: 1 },
      { question: "What does 'Adventure is out there' mean?", options: ["Stay home", "Be careful", "Exciting things are waiting 🌄", "It's dangerous"], correct: 2 },
    ],
    culturalNote: "The opening sequence of 'Up' tells an entire love story without any dialogue! 🎬❤️",
  },

  // ─── B1 – Intermediate ───
  {
    id: 7, level: "B1", levelLabel: "Intermediate",
    title: "Following Your Passion", emoji: "🎸",
    movieTitle: "Coco",
    youtubeId: "xlnPG9hcDm0",
    description: "Learn about culture, music, and family traditions",
    sceneContext: "Miguel wants to be a musician despite his family's ban on music. Rich cultural vocabulary and emotional dialogue.",
    vocabulary: [
      { word: "tradition", meaning: "A custom passed down through generations", emoji: "🎭", arabic: "تقليد", example: "Music is banned in Miguel's family tradition." },
      { word: "ancestor", meaning: "A family member from long ago", emoji: "👴", arabic: "جد/سلف", example: "Miguel visits the Land of the Dead to meet his ancestors." },
      { word: "permission", meaning: "Agreement that someone can do something", emoji: "✅", arabic: "إذن", example: "Miguel needs his family's permission." },
      { word: "blessing", meaning: "Approval or good wishes from someone", emoji: "🙏", arabic: "بركة/موافقة", example: "He needs his family's blessing to return." },
      { word: "passion", meaning: "A very strong feeling of love for something", emoji: "🔥", arabic: "شغف", example: "Music is Miguel's passion." },
      { word: "memory", meaning: "Something you remember from the past", emoji: "💭", arabic: "ذكرى", example: "Memories keep our loved ones alive." },
    ],
    expressions: [
      { phrase: "Seize your moment", meaning: "Take advantage of your opportunity", emoji: "⭐", arabic: "اغتنم فرصتك" },
      { phrase: "Never forget where you came from", meaning: "Remember your roots and family", emoji: "🌳", arabic: "لا تنسى من أين أتيت" },
      { phrase: "The real death is being forgotten", meaning: "We live on through people's memories", emoji: "💀", arabic: "الموت الحقيقي هو أن تُنسى" },
    ],
    questions: [
      { question: "What does Miguel's family ban?", options: ["Dancing 💃", "Music 🎵", "Cooking 🍳", "Sports ⚽"], correct: 1 },
      { question: "What does 'ancestor' mean?", options: ["A neighbor", "A family member from long ago 👴", "A friend", "A stranger"], correct: 1 },
      { question: "What does 'Seize your moment' mean?", options: ["Wait for later", "Run away", "Take your opportunity ⭐", "Be careful"], correct: 2 },
      { question: "What is Miguel's passion?", options: ["Painting 🎨", "Reading 📖", "Music 🎸", "Swimming 🏊"], correct: 2 },
    ],
    culturalNote: "Coco is based on the Mexican holiday 'Día de los Muertos' (Day of the Dead) 🇲🇽💀",
  },
  {
    id: 8, level: "B1", levelLabel: "Intermediate",
    title: "Emotions & Growing Up", emoji: "😊",
    movieTitle: "Inside Out",
    youtubeId: "yRUAzGQ3nSY",
    description: "Learn to express complex emotions and understand feelings",
    sceneContext: "Joy, Sadness, Anger, Fear, and Disgust control Riley's emotions. Perfect for learning emotional vocabulary.",
    vocabulary: [
      { word: "emotion", meaning: "A strong feeling such as love, anger, or fear", emoji: "💗", arabic: "عاطفة", example: "Joy is Riley's strongest emotion." },
      { word: "core memory", meaning: "An important memory that shapes who you are", emoji: "🔮", arabic: "ذكرى أساسية", example: "Core memories power the islands of personality." },
      { word: "adjust", meaning: "To change or adapt to a new situation", emoji: "🔧", arabic: "يتكيّف", example: "Riley needs to adjust to her new city." },
      { word: "headquarters", meaning: "The main center of control", emoji: "🏢", arabic: "مقر رئيسي", example: "The emotions work in headquarters." },
      { word: "personality", meaning: "The qualities that make someone unique", emoji: "🌟", arabic: "شخصية", example: "Each island represents a part of Riley's personality." },
      { word: "subconscious", meaning: "The part of the mind you're not aware of", emoji: "🧠", arabic: "اللاوعي", example: "Fears are stored in the subconscious." },
    ],
    expressions: [
      { phrase: "Take her to the moon for me", meaning: "Take care of someone I love", emoji: "🌙", arabic: "خذها إلى القمر من أجلي" },
      { phrase: "Crying helps me slow down and obsess over things", meaning: "Sadness has its purpose", emoji: "😢", arabic: "البكاء يساعدني على التأمل" },
      { phrase: "Do you ever look at someone and wonder what's going on inside their head?", meaning: "Everyone has complex inner feelings", emoji: "🤔", arabic: "هل تساءلت يوماً ما الذي يدور في رأس شخص ما؟" },
    ],
    questions: [
      { question: "How many main emotions are shown?", options: ["3", "4", "5 🎭", "6"], correct: 2 },
      { question: "What does 'adjust' mean?", options: ["To break 💔", "To adapt to change 🔧", "To forget", "To argue"], correct: 1 },
      { question: "What are 'core memories'?", options: ["Bad memories", "Forgotten memories", "Important memories that shape you 🔮", "Fake memories"], correct: 2 },
      { question: "What lesson does the movie teach?", options: ["Only happiness matters", "All emotions are important 💗", "Sadness is bad", "Anger solves problems"], correct: 1 },
    ],
    culturalNote: "Pixar consulted real psychologists to make the emotional science accurate! 🧠🎬",
  },

  // ─── B2 – Upper-Intermediate ───
  {
    id: 9, level: "B2", levelLabel: "Upper-Intermediate",
    title: "Justice & Morality", emoji: "🦇",
    movieTitle: "The Dark Knight",
    youtubeId: "EXeTwQWrcwY",
    description: "Explore complex themes of justice, chaos, and moral dilemmas",
    sceneContext: "Batman faces the Joker's moral challenges. Rich dialogue for discussing ethics and philosophy.",
    vocabulary: [
      { word: "vigilante", meaning: "A person who punishes criminals without legal authority", emoji: "🦇", arabic: "حارس أهلي", example: "Batman is a vigilante protecting Gotham." },
      { word: "chaos", meaning: "Complete disorder and confusion", emoji: "🌪️", arabic: "فوضى", example: "The Joker wants to create chaos." },
      { word: "corruption", meaning: "Dishonest behavior by people in power", emoji: "💰", arabic: "فساد", example: "Gotham suffers from corruption." },
      { word: "sacrifice", meaning: "To give up something important for others", emoji: "💔", arabic: "تضحية", example: "Batman makes a great sacrifice." },
      { word: "deserve", meaning: "To have earned something through your actions", emoji: "⚖️", arabic: "يستحق", example: "Gotham deserves a better hero." },
      { word: "symbol", meaning: "Something that represents an idea or quality", emoji: "🔰", arabic: "رمز", example: "Batman is a symbol of hope." },
    ],
    expressions: [
      { phrase: "You either die a hero or live long enough to see yourself become the villain", meaning: "Power can corrupt even good people", emoji: "⚔️", arabic: "إما أن تموت بطلاً أو تعيش لترى نفسك تصبح الشرير" },
      { phrase: "Why so serious?", meaning: "The Joker's catchphrase, questioning social norms", emoji: "🃏", arabic: "لماذا أنت جدي هكذا؟" },
      { phrase: "It's not who I am underneath, but what I do that defines me", meaning: "Actions matter more than identity", emoji: "🦇", arabic: "ليس ما أكونه في الداخل بل ما أفعله هو ما يحددني" },
    ],
    questions: [
      { question: "What does 'vigilante' mean?", options: ["A police officer", "Someone who fights crime without authority 🦇", "A lawyer", "A villain"], correct: 1 },
      { question: "What does the Joker want?", options: ["Money 💰", "Power 👑", "Chaos 🌪️", "Fame 📺"], correct: 2 },
      { question: "What does 'sacrifice' mean?", options: ["To win", "To give up something for others 💔", "To fight", "To escape"], correct: 1 },
      { question: "What defines Batman, according to the quote?", options: ["His mask", "His money", "His actions 🦇", "His name"], correct: 2 },
    ],
    culturalNote: "Heath Ledger's Joker performance is considered one of the greatest in cinema history 🎭",
  },
  {
    id: 10, level: "B2", levelLabel: "Upper-Intermediate",
    title: "Survival & Hope", emoji: "⚽",
    movieTitle: "Cast Away",
    youtubeId: "qOesTRd7ruA",
    description: "Learn survival vocabulary and expressing loneliness and hope",
    sceneContext: "Chuck Noland is stranded alone on a desert island. Powerful vocabulary about survival, isolation, and determination.",
    vocabulary: [
      { word: "stranded", meaning: "Left alone in a place with no way to leave", emoji: "🏝️", arabic: "عالق", example: "Chuck is stranded on a desert island." },
      { word: "survive", meaning: "To continue to live despite danger", emoji: "💪", arabic: "ينجو", example: "He must survive alone." },
      { word: "isolation", meaning: "Being completely alone and separated from others", emoji: "🧍", arabic: "عزلة", example: "The isolation is the hardest part." },
      { word: "rescue", meaning: "To save someone from danger", emoji: "🚁", arabic: "إنقاذ", example: "He hopes for rescue." },
      { word: "determination", meaning: "A firm decision to do something despite difficulty", emoji: "🔥", arabic: "إصرار", example: "His determination keeps him alive." },
      { word: "raft", meaning: "A flat structure for floating on water", emoji: "🛶", arabic: "طوافة", example: "He builds a raft to escape." },
    ],
    expressions: [
      { phrase: "I gotta keep breathing", meaning: "I must keep going, keep living", emoji: "🌬️", arabic: "يجب أن أستمر في التنفس" },
      { phrase: "Tomorrow the sun will rise", meaning: "There is always hope for a new day", emoji: "🌅", arabic: "غداً ستشرق الشمس" },
      { phrase: "I had power over nothing", meaning: "I couldn't control anything", emoji: "😔", arabic: "لم يكن لدي سيطرة على شيء" },
    ],
    questions: [
      { question: "Where is Chuck stranded?", options: ["In a forest", "On a desert island 🏝️", "In a cave", "On a mountain"], correct: 1 },
      { question: "What does 'isolation' mean?", options: ["Being with friends", "Being completely alone 🧍", "Being at work", "Being happy"], correct: 1 },
      { question: "What does Chuck build to escape?", options: ["A boat ⛵", "A raft 🛶", "A bridge", "An airplane"], correct: 1 },
      { question: "What is the main theme of the movie?", options: ["Romance ❤️", "Comedy 😂", "Survival and hope 💪", "Mystery 🔍"], correct: 2 },
    ],
    culturalNote: "Tom Hanks lost 50 pounds to look realistic as a stranded man! 🎬",
  },

  // ─── C1 – Advanced ───
  {
    id: 11, level: "C1", levelLabel: "Advanced",
    title: "Reality & Perception", emoji: "🔴",
    movieTitle: "The Matrix",
    youtubeId: "vKQi3bBA1y8",
    description: "Explore philosophical concepts about reality, choice, and free will",
    sceneContext: "Neo discovers that reality is a simulation. Complex dialogue about philosophy, technology, and consciousness.",
    vocabulary: [
      { word: "simulation", meaning: "An artificial representation of reality", emoji: "🖥️", arabic: "محاكاة", example: "The Matrix is a simulation of reality." },
      { word: "perception", meaning: "The way you see and understand things", emoji: "👁️", arabic: "إدراك", example: "Your perception shapes your reality." },
      { word: "destiny", meaning: "Events that will happen in the future, fate", emoji: "🔮", arabic: "قدر", example: "Neo must fulfill his destiny." },
      { word: "consciousness", meaning: "The state of being aware of your surroundings", emoji: "🧠", arabic: "وعي", example: "What is consciousness in a simulated world?" },
      { word: "rebel", meaning: "To fight against authority or control", emoji: "✊", arabic: "يتمرد", example: "The humans rebel against the machines." },
      { word: "illusion", meaning: "Something that appears real but isn't", emoji: "🪄", arabic: "وهم", example: "The world is an illusion." },
    ],
    expressions: [
      { phrase: "There is no spoon", meaning: "Reality is what you make it — limitations are mental", emoji: "🥄", arabic: "لا توجد ملعقة" },
      { phrase: "Free your mind", meaning: "Let go of limiting beliefs", emoji: "🧠", arabic: "حرر عقلك" },
      { phrase: "Welcome to the real world", meaning: "This is the truth, even if it's hard", emoji: "🌍", arabic: "مرحباً بك في العالم الحقيقي" },
    ],
    questions: [
      { question: "What is the Matrix?", options: ["A video game", "A simulation of reality 🖥️", "A dream", "A country"], correct: 1 },
      { question: "What does 'perception' mean?", options: ["A type of technology", "The way you understand things 👁️", "A movie genre", "A weapon"], correct: 1 },
      { question: "What does 'There is no spoon' mean?", options: ["You can't eat", "Reality is what you make it 🥄", "Spoons don't exist", "It's a joke"], correct: 1 },
      { question: "What do the humans fight against?", options: ["Aliens 👽", "Each other", "Machines 🤖", "Nature"], correct: 2 },
    ],
    culturalNote: "The Matrix popularized 'bullet time' cinematography, now used in many action films! 🎬🔫",
  },
  {
    id: 12, level: "C1", levelLabel: "Advanced",
    title: "Social Class & Ambition", emoji: "🎩",
    movieTitle: "The Great Gatsby",
    youtubeId: "rARN6agiW7o",
    description: "Explore themes of wealth, social class, and the American Dream",
    sceneContext: "Jay Gatsby's lavish parties hide a deeper obsession. Rich literary language for advanced learners.",
    vocabulary: [
      { word: "extravagant", meaning: "Spending or costing much more than necessary", emoji: "💎", arabic: "مُسرف/باذخ", example: "Gatsby throws extravagant parties." },
      { word: "obsession", meaning: "An unhealthy fixation on something", emoji: "🔄", arabic: "هوس", example: "His obsession with Daisy drives everything." },
      { word: "facade", meaning: "A false front or appearance that hides the truth", emoji: "🎭", arabic: "واجهة زائفة", example: "Gatsby's wealth is a facade." },
      { word: "disillusionment", meaning: "The feeling of disappointment when something isn't as expected", emoji: "💔", arabic: "خيبة أمل", example: "The story ends in disillusionment." },
      { word: "nouveau riche", meaning: "People who recently became rich", emoji: "💰", arabic: "الأثرياء الجدد", example: "Gatsby is considered nouveau riche." },
      { word: "elusive", meaning: "Difficult to find, catch, or achieve", emoji: "🌫️", arabic: "بعيد المنال", example: "The American Dream proves elusive." },
    ],
    expressions: [
      { phrase: "So we beat on, boats against the current", meaning: "We keep trying despite being pushed back", emoji: "⛵", arabic: "نستمر في المضي قدماً رغم التيار" },
      { phrase: "Old sport", meaning: "A friendly term of address (old-fashioned)", emoji: "🎩", arabic: "يا صديقي القديم" },
      { phrase: "Can't repeat the past? Why of course you can!", meaning: "An obsessive belief in recreating what was lost", emoji: "⏰", arabic: "لا يمكن تكرار الماضي؟ بالطبع يمكنك!" },
    ],
    questions: [
      { question: "What does 'facade' mean?", options: ["A building", "A false front 🎭", "A celebration", "A friendship"], correct: 1 },
      { question: "What is Gatsby obsessed with?", options: ["Money 💰", "Power 👑", "Daisy 💕", "Fame 📺"], correct: 2 },
      { question: "What does 'elusive' mean?", options: ["Easy to find", "Very expensive", "Difficult to achieve 🌫️", "Very old"], correct: 2 },
      { question: "What does the novel critique?", options: ["Education", "The American Dream 🇺🇸", "Technology", "Religion"], correct: 1 },
    ],
    culturalNote: "F. Scott Fitzgerald wrote The Great Gatsby in 1925, and it's now considered one of the greatest American novels 📚",
  },

  // ─── C2 – Mastery ───
  {
    id: 13, level: "C2", levelLabel: "Mastery",
    title: "Time, Memory & Identity", emoji: "🌀",
    movieTitle: "Inception",
    youtubeId: "YoHD9XEInc0",
    description: "Master complex vocabulary about dreams, time, and the nature of reality",
    sceneContext: "Dom Cobb navigates layers of dreams within dreams. Exceptionally complex dialogue about consciousness and subconscious.",
    vocabulary: [
      { word: "inception", meaning: "The beginning or establishment of something; planting an idea", emoji: "🌱", arabic: "بداية/زرع فكرة", example: "Inception is planting an idea in someone's subconscious." },
      { word: "limbo", meaning: "An uncertain state between two conditions", emoji: "🌀", arabic: "برزخ", example: "Falling into limbo means losing yourself forever." },
      { word: "subconscious", meaning: "The part of the mind below conscious awareness", emoji: "🧠", arabic: "العقل الباطن", example: "Dreams tap into the subconscious." },
      { word: "paradox", meaning: "A statement or situation that contradicts itself", emoji: "♾️", arabic: "مفارقة", example: "The Penrose stairs are a visual paradox." },
      { word: "catharsis", meaning: "The release of strong emotions, bringing relief", emoji: "😌", arabic: "تطهير عاطفي", example: "Cobb experiences catharsis through confronting his guilt." },
      { word: "totem", meaning: "An object with special significance used to test reality", emoji: "🎲", arabic: "طوطم", example: "The spinning top is Cobb's totem." },
    ],
    expressions: [
      { phrase: "An idea is like a virus — resilient, highly contagious", meaning: "Ideas spread and are impossible to remove", emoji: "🦠", arabic: "الفكرة كالفيروس — مرنة وشديدة العدوى" },
      { phrase: "You mustn't be afraid to dream a little bigger", meaning: "Think bigger, aim higher", emoji: "💭", arabic: "لا تخف من أن تحلم أكبر" },
      { phrase: "Do you want to take a leap of faith?", meaning: "Are you willing to take a big risk?", emoji: "🪂", arabic: "هل تريد أن تخاطر؟" },
    ],
    questions: [
      { question: "What does 'inception' mean in the movie?", options: ["Dreaming", "Planting an idea in someone's mind 🌱", "Time travel", "Memory loss"], correct: 1 },
      { question: "What is a 'totem' used for?", options: ["As a weapon", "To test if you're in reality 🎲", "To enter dreams", "To wake up"], correct: 1 },
      { question: "What does 'paradox' mean?", options: ["A perfect solution", "A self-contradicting situation ♾️", "A type of dream", "A mental illness"], correct: 1 },
      { question: "What is Cobb's main motivation?", options: ["Money 💰", "Fame 📺", "Returning to his children 👨‍👧‍👦", "Power 👑"], correct: 2 },
    ],
    culturalNote: "Christopher Nolan spent 10 years writing the Inception screenplay! The ending is still debated 🎬🌀",
  },
  {
    id: 14, level: "C2", levelLabel: "Mastery",
    title: "Language & Communication", emoji: "👽",
    movieTitle: "Arrival",
    youtubeId: "tFMo3UJ4B4g",
    description: "Explore linguistics, communication, and the nature of time",
    sceneContext: "Dr. Louise Banks must communicate with aliens. Perfect for advanced learners interested in how language shapes thought.",
    vocabulary: [
      { word: "linguistics", meaning: "The scientific study of language and its structure", emoji: "📖", arabic: "لسانيات", example: "Dr. Banks is an expert in linguistics." },
      { word: "decipher", meaning: "To decode or interpret something difficult to understand", emoji: "🔍", arabic: "يفك الشيفرة", example: "She must decipher the alien language." },
      { word: "nonlinear", meaning: "Not following a straight line or sequence", emoji: "🌀", arabic: "غير خطي", example: "The aliens perceive time as nonlinear." },
      { word: "determinism", meaning: "The belief that all events are predetermined", emoji: "🔗", arabic: "حتمية", example: "The film explores linguistic determinism." },
      { word: "cognition", meaning: "The mental process of acquiring knowledge", emoji: "🧠", arabic: "إدراك", example: "Language affects cognition." },
      { word: "empathy", meaning: "The ability to understand and share another's feelings", emoji: "💗", arabic: "تعاطف", example: "Communication requires empathy." },
    ],
    expressions: [
      { phrase: "Language is the first weapon drawn in a conflict", meaning: "Words are the first tool used in disagreements", emoji: "⚔️", arabic: "اللغة هي أول سلاح يُشهر في الصراع" },
      { phrase: "If you could see your whole life laid out, would you change things?", meaning: "Knowing the future — would it change your choices?", emoji: "🔮", arabic: "لو رأيت حياتك كاملة، هل ستغير شيئاً؟" },
      { phrase: "The weapon is their language", meaning: "The tool they offer is communication itself", emoji: "📝", arabic: "السلاح هو لغتهم" },
    ],
    questions: [
      { question: "What is Dr. Banks' profession?", options: ["Physicist", "Linguist 📖", "Astronaut", "Military officer"], correct: 1 },
      { question: "What does 'decipher' mean?", options: ["To destroy", "To decode something difficult 🔍", "To teach", "To forget"], correct: 1 },
      { question: "How do the aliens perceive time?", options: ["As linear", "As nonlinear 🌀", "They don't perceive time", "As very fast"], correct: 1 },
      { question: "What concept does the film explore?", options: ["How exercise affects health", "How language shapes thought 🧠", "How music affects mood", "How food affects energy"], correct: 1 },
    ],
    culturalNote: "Arrival is based on Ted Chiang's novella 'Story of Your Life' and explores the Sapir-Whorf hypothesis 📚🧠",
  },
  {
    id: 15, level: "C2", levelLabel: "Mastery",
    title: "Power of Words & Truth", emoji: "📰",
    movieTitle: "The King's Speech",
    youtubeId: "EcxBrTvLbBM",
    description: "Master formal English, public speaking, and overcoming personal challenges",
    sceneContext: "King George VI overcomes his stammer to deliver a crucial wartime speech. Formal English and powerful emotional dialogue.",
    vocabulary: [
      { word: "stammer", meaning: "To speak with involuntary pauses and repetitions", emoji: "🗣️", arabic: "تأتأة", example: "The King has a terrible stammer." },
      { word: "abdicate", meaning: "To formally give up the throne or power", emoji: "👑", arabic: "يتنازل عن العرش", example: "His brother abdicated the throne." },
      { word: "eloquence", meaning: "The art of fluent and persuasive speaking", emoji: "🎤", arabic: "فصاحة", example: "The speech therapist teaches him eloquence." },
      { word: "impediment", meaning: "A hindrance or obstruction", emoji: "🚧", arabic: "عائق", example: "His speech impediment is a major challenge." },
      { word: "sovereignty", meaning: "Supreme power or authority of a state", emoji: "🏛️", arabic: "سيادة", example: "The King represents national sovereignty." },
      { word: "fortitude", meaning: "Courage and strength in facing adversity", emoji: "🛡️", arabic: "صلابة", example: "He shows great fortitude." },
    ],
    expressions: [
      { phrase: "I have a voice!", meaning: "I matter and deserve to be heard", emoji: "📢", arabic: "لدي صوت!" },
      { phrase: "Timing isn't my strong suit", meaning: "I'm not good at choosing the right moment", emoji: "⏰", arabic: "التوقيت ليس نقطة قوتي" },
      { phrase: "My castle, my rules", meaning: "In my domain, I decide how things are done", emoji: "🏰", arabic: "قلعتي، قوانيني" },
    ],
    questions: [
      { question: "What problem does the King have?", options: ["He can't read", "He has a stammer 🗣️", "He's deaf", "He's blind"], correct: 1 },
      { question: "What does 'abdicate' mean?", options: ["To marry", "To give up the throne 👑", "To declare war", "To travel"], correct: 1 },
      { question: "What does 'eloquence' mean?", options: ["Silence", "Fluent and persuasive speaking 🎤", "A type of music", "Writing"], correct: 1 },
      { question: "Why must the King speak well?", options: ["For entertainment", "To lead the nation during war 🏛️", "For a movie", "For a party"], correct: 1 },
    ],
    culturalNote: "The real King George VI's wartime speech in 1939 rallied the entire British nation 🇬🇧📻",
  },
];

// Generate lesson data for the main lessons system
export const moviesLessons: Record<string, LessonData> = {};

moviesCourse.forEach((movie, index) => {
  const lessonNum = index + 1;
  moviesLessons[`movies-${lessonNum}`] = {
    levelId: "movies",
    levelLabel: "English through Movies & Series",
    lessonNumber: lessonNum,
    title: movie.title,
    description: movie.description,
    vocabulary: movie.vocabulary.map(v => ({
      word: v.word,
      meaning: v.meaning,
      example: v.example,
      emoji: v.emoji,
      arabic: v.arabic,
    })),
    dialogue: movie.expressions.map(e => ({
      speaker: movie.movieTitle,
      text: `"${e.phrase}" — ${e.meaning} ${e.emoji}`,
    })),
    grammar: {
      title: `Expressions from ${movie.movieTitle}`,
      explanation: movie.sceneContext,
      examples: movie.expressions.map(e => ({
        sentence: e.phrase,
        note: `${e.meaning} (${e.arabic})`,
      })),
    },
    vocabExercises: movie.questions.slice(0, 2),
    conversationExercises: movie.questions.slice(2, 3),
    grammarExercises: [],
    examQuestions: movie.questions.slice(3),
    homeworkQuestions: [],
  };
});
