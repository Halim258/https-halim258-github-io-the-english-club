export interface DocumentaryLessonData {
  id: number;
  level: string;
  levelLabel: string;
  title: string;
  emoji: string;
  documentaryTitle: string;
  youtubeId: string;
  description: string;
  sceneContext: string;
  vocabulary: { word: string; meaning: string; emoji: string; arabic: string; example: string }[];
  transcript: { time: string; text: string; translation: string }[];
  expressions: { phrase: string; meaning: string; emoji: string; arabic: string }[];
  questions: { question: string; options: string[]; correct: number }[];
  culturalNote?: string;
}

export const documentaryCourse: DocumentaryLessonData[] = [
  // ─── 1. Nature ───
  {
    id: 1, level: "A1", levelLabel: "Beginner",
    title: "Life in the Ocean", emoji: "🐳",
    documentaryTitle: "Our Planet — Coastal Seas",
    youtubeId: "r9PeYPHdpNo",
    description: "Discover ocean life and learn basic nature vocabulary",
    sceneContext: "Explore the stunning underwater world of coastal seas, where diverse marine creatures thrive in coral reefs and kelp forests.",
    vocabulary: [
      { word: "ocean", meaning: "The large body of salt water that covers most of Earth", emoji: "🌊", arabic: "محيط", example: "The ocean is very deep." },
      { word: "fish", meaning: "An animal that lives in water and breathes through gills", emoji: "🐟", arabic: "سمكة", example: "There are many fish in the reef." },
      { word: "coral", meaning: "A hard, colorful structure built by tiny sea animals", emoji: "🪸", arabic: "مرجان", example: "Coral reefs are beautiful." },
      { word: "wave", meaning: "A moving ridge on the surface of water", emoji: "🌊", arabic: "موجة", example: "The waves crash on the shore." },
      { word: "deep", meaning: "Extending far down from the surface", emoji: "⬇️", arabic: "عميق", example: "The ocean is very deep." },
      { word: "surface", meaning: "The top layer of something", emoji: "🔝", arabic: "سطح", example: "Dolphins swim to the surface to breathe." },
      { word: "breathe", meaning: "To take air in and out of your lungs", emoji: "💨", arabic: "يتنفس", example: "Whales breathe air like humans." },
      { word: "shark", meaning: "A large predatory fish with sharp teeth", emoji: "🦈", arabic: "قرش", example: "Sharks are important for the ocean." },
      { word: "turtle", meaning: "A reptile with a hard shell that lives in water", emoji: "🐢", arabic: "سلحفاة", example: "Sea turtles travel long distances." },
      { word: "protect", meaning: "To keep safe from harm", emoji: "🛡️", arabic: "يحمي", example: "We must protect the ocean." },
    ],
    transcript: [
      { time: "0:00", text: "The ocean covers over 70 percent of our planet.", translation: "يغطي المحيط أكثر من 70 بالمئة من كوكبنا." },
      { time: "0:08", text: "Beneath the surface lies a world full of life.", translation: "تحت السطح يكمن عالم مليء بالحياة." },
      { time: "0:15", text: "Coral reefs are home to thousands of species.", translation: "الشعاب المرجانية هي موطن لآلاف الأنواع." },
      { time: "0:22", text: "Fish swim among the colorful corals.", translation: "تسبح الأسماك بين المرجان الملون." },
      { time: "0:30", text: "Sharks patrol the deeper waters.", translation: "تجوب أسماك القرش المياه الأعمق." },
      { time: "0:38", text: "Sea turtles travel thousands of miles.", translation: "تسافر السلاحف البحرية آلاف الأميال." },
      { time: "0:45", text: "The ocean needs our protection.", translation: "المحيط يحتاج لحمايتنا." },
    ],
    expressions: [
      { phrase: "beneath the surface", meaning: "Under the top layer; also means hidden", emoji: "🔍", arabic: "تحت السطح" },
      { phrase: "full of life", meaning: "Having many living things; very lively", emoji: "🌱", arabic: "مليء بالحياة" },
      { phrase: "home to", meaning: "A place where something lives or exists", emoji: "🏠", arabic: "موطن لـ" },
    ],
    questions: [
      { question: "How much of Earth does the ocean cover?", options: ["50%", "60%", "Over 70% 🌊", "90%"], correct: 2 },
      { question: "What lives in coral reefs?", options: ["Only fish", "Thousands of species 🪸", "Only sharks", "No animals"], correct: 1 },
      { question: "What does 'deep' mean?", options: ["Shallow", "Far down ⬇️", "Wide", "Narrow"], correct: 1 },
      { question: "What do sea turtles do?", options: ["Stay in one place", "Fly", "Travel thousands of miles 🐢", "Live on land"], correct: 2 },
    ],
    culturalNote: "Our Planet is a Netflix nature documentary narrated by Sir David Attenborough, highlighting Earth's biodiversity.",
  },

  // ─── 2. Space ───
  {
    id: 2, level: "A1", levelLabel: "Beginner",
    title: "Exploring the Solar System", emoji: "🪐",
    documentaryTitle: "The Planets — BBC",
    youtubeId: "libKVRa01L8",
    description: "Learn about planets and space vocabulary",
    sceneContext: "Journey through our solar system, visiting each planet and understanding what makes them unique.",
    vocabulary: [
      { word: "planet", meaning: "A large object that orbits a star", emoji: "🪐", arabic: "كوكب", example: "Earth is the third planet from the Sun." },
      { word: "star", meaning: "A huge ball of hot gas that gives off light", emoji: "⭐", arabic: "نجم", example: "The Sun is a star." },
      { word: "orbit", meaning: "The path an object takes around another object in space", emoji: "🔄", arabic: "مدار", example: "Earth orbits the Sun." },
      { word: "gravity", meaning: "The force that pulls things toward each other", emoji: "⬇️", arabic: "جاذبية", example: "Gravity keeps us on the ground." },
      { word: "atmosphere", meaning: "The layer of gases surrounding a planet", emoji: "🌫️", arabic: "غلاف جوي", example: "Earth's atmosphere protects us." },
      { word: "moon", meaning: "A natural satellite that orbits a planet", emoji: "🌙", arabic: "قمر", example: "The Moon orbits Earth." },
      { word: "spacecraft", meaning: "A vehicle designed for travel in space", emoji: "🚀", arabic: "مركبة فضائية", example: "The spacecraft landed on Mars." },
      { word: "discover", meaning: "To find something for the first time", emoji: "🔭", arabic: "يكتشف", example: "Scientists discover new things about space." },
      { word: "distance", meaning: "How far apart two things are", emoji: "📏", arabic: "مسافة", example: "The distance to Mars is very large." },
      { word: "solar", meaning: "Related to the Sun", emoji: "☀️", arabic: "شمسي", example: "We live in the solar system." },
    ],
    transcript: [
      { time: "0:00", text: "Our solar system has eight planets.", translation: "يحتوي نظامنا الشمسي على ثمانية كواكب." },
      { time: "0:07", text: "Mercury is the closest planet to the Sun.", translation: "عطارد هو أقرب كوكب إلى الشمس." },
      { time: "0:14", text: "Earth is the only planet known to support life.", translation: "الأرض هي الكوكب الوحيد المعروف بدعم الحياة." },
      { time: "0:22", text: "Mars is called the Red Planet.", translation: "يُسمى المريخ الكوكب الأحمر." },
      { time: "0:29", text: "Jupiter is the largest planet in our solar system.", translation: "المشتري هو أكبر كوكب في نظامنا الشمسي." },
      { time: "0:36", text: "Saturn has beautiful rings made of ice and rock.", translation: "زحل لديه حلقات جميلة من الجليد والصخور." },
      { time: "0:44", text: "Scientists continue to explore the mysteries of space.", translation: "يواصل العلماء استكشاف أسرار الفضاء." },
    ],
    expressions: [
      { phrase: "light years away", meaning: "Extremely far away in distance", emoji: "✨", arabic: "على بعد سنوات ضوئية" },
      { phrase: "known to", meaning: "Recognized or understood as", emoji: "📖", arabic: "معروف بـ" },
      { phrase: "the Red Planet", meaning: "A nickname for Mars because of its color", emoji: "🔴", arabic: "الكوكب الأحمر" },
    ],
    questions: [
      { question: "How many planets are in our solar system?", options: ["6", "7", "8 🪐", "9"], correct: 2 },
      { question: "Which planet is closest to the Sun?", options: ["Earth", "Mercury ☀️", "Venus", "Mars"], correct: 1 },
      { question: "What does 'orbit' mean?", options: ["To fall", "To spin in circles", "The path around another object 🔄", "To stop"], correct: 2 },
      { question: "What is Jupiter?", options: ["The smallest planet", "The hottest planet", "The largest planet 🪐", "The closest to Earth"], correct: 2 },
    ],
    culturalNote: "BBC's The Planets series uses stunning CGI to explore each planet in our solar system.",
  },

  // ─── 3. Animals ───
  {
    id: 3, level: "A2", levelLabel: "Elementary",
    title: "Amazing Animal Migration", emoji: "🦋",
    documentaryTitle: "Great Migrations — National Geographic",
    youtubeId: "qYII5yXGsQk",
    description: "Learn about animal migration and survival vocabulary",
    sceneContext: "Follow millions of animals as they embark on incredible journeys across continents for food, warmth, and survival.",
    vocabulary: [
      { word: "migration", meaning: "Moving from one region to another, usually seasonally", emoji: "🦅", arabic: "هجرة", example: "Bird migration happens every spring." },
      { word: "journey", meaning: "A long trip from one place to another", emoji: "🗺️", arabic: "رحلة", example: "The journey takes many weeks." },
      { word: "survival", meaning: "The act of continuing to live, especially in difficult conditions", emoji: "💪", arabic: "بقاء", example: "Survival depends on finding food." },
      { word: "herd", meaning: "A large group of animals that live together", emoji: "🐘", arabic: "قطيع", example: "A herd of elephants crossed the river." },
      { word: "predator", meaning: "An animal that hunts other animals for food", emoji: "🐆", arabic: "مفترس", example: "Lions are predators." },
      { word: "prey", meaning: "An animal that is hunted by other animals", emoji: "🐁", arabic: "فريسة", example: "Zebras are prey for lions." },
      { word: "instinct", meaning: "A natural behavior that animals are born with", emoji: "🧠", arabic: "غريزة", example: "Migration is driven by instinct." },
      { word: "habitat", meaning: "The natural home of an animal or plant", emoji: "🌿", arabic: "موطن طبيعي", example: "Forests are habitats for many animals." },
      { word: "endangered", meaning: "At risk of becoming extinct", emoji: "⚠️", arabic: "مهدد بالانقراض", example: "Many species are endangered." },
      { word: "flock", meaning: "A group of birds that fly together", emoji: "🐦", arabic: "سرب", example: "A flock of birds flew south." },
    ],
    transcript: [
      { time: "0:00", text: "Every year, millions of animals begin an incredible journey.", translation: "كل عام، تبدأ ملايين الحيوانات رحلة مذهلة." },
      { time: "0:08", text: "Wildebeest herds cross the African savanna.", translation: "تعبر قطعان الحيوانات البرية السافانا الأفريقية." },
      { time: "0:16", text: "They face predators, rivers, and harsh weather.", translation: "يواجهون المفترسين والأنهار والطقس القاسي." },
      { time: "0:24", text: "Monarch butterflies travel over 3,000 miles.", translation: "تسافر فراشات المونارك أكثر من 3000 ميل." },
      { time: "0:32", text: "This journey is guided by pure instinct.", translation: "هذه الرحلة تُوجَّه بالغريزة الصرفة." },
      { time: "0:40", text: "Migration is one of nature's greatest spectacles.", translation: "الهجرة هي واحدة من أعظم مشاهد الطبيعة." },
    ],
    expressions: [
      { phrase: "face challenges", meaning: "To deal with difficult situations", emoji: "💪", arabic: "يواجه تحديات" },
      { phrase: "driven by instinct", meaning: "Motivated by natural, innate behavior", emoji: "🧭", arabic: "بدافع الغريزة" },
      { phrase: "harsh weather", meaning: "Severe or extreme weather conditions", emoji: "🌪️", arabic: "طقس قاسٍ" },
      { phrase: "one of nature's greatest", meaning: "Among the most impressive things in nature", emoji: "🌟", arabic: "من أعظم مشاهد الطبيعة" },
    ],
    questions: [
      { question: "What does 'migration' mean?", options: ["Staying in one place", "Moving to another region 🦅", "Sleeping", "Eating"], correct: 1 },
      { question: "How far do Monarch butterflies travel?", options: ["100 miles", "500 miles", "Over 3,000 miles 🦋", "10 miles"], correct: 2 },
      { question: "What is a predator?", options: ["An animal that eats plants", "An animal that hunts others 🐆", "A baby animal", "A type of bird"], correct: 1 },
      { question: "What guides animal migration?", options: ["Maps", "GPS", "Instinct 🧠", "Humans"], correct: 2 },
    ],
    culturalNote: "National Geographic's Great Migrations took over two years to film across 20 countries!",
  },

  // ─── 4. History ───
  {
    id: 4, level: "A2", levelLabel: "Elementary",
    title: "Ancient Egypt Revealed", emoji: "🏛️",
    documentaryTitle: "Egypt's Unexplained Files",
    youtubeId: "hO1tzmi1V5g",
    description: "Explore ancient Egyptian civilization and learn history vocabulary",
    sceneContext: "Uncover the mysteries of ancient Egypt — the pyramids, pharaohs, and the remarkable civilization that built them.",
    vocabulary: [
      { word: "ancient", meaning: "Belonging to a very long time ago", emoji: "🏛️", arabic: "قديم", example: "Ancient Egypt was a great civilization." },
      { word: "pyramid", meaning: "A large stone structure with triangular sides", emoji: "🔺", arabic: "هرم", example: "The pyramids are in Egypt." },
      { word: "pharaoh", meaning: "A ruler of ancient Egypt", emoji: "👑", arabic: "فرعون", example: "The pharaoh ruled over all of Egypt." },
      { word: "tomb", meaning: "A place where a dead person is buried", emoji: "⚰️", arabic: "مقبرة", example: "The pharaoh's tomb was full of gold." },
      { word: "civilization", meaning: "An advanced society with culture and government", emoji: "🌆", arabic: "حضارة", example: "Egyptian civilization lasted thousands of years." },
      { word: "treasure", meaning: "Valuable items like gold and jewels", emoji: "💎", arabic: "كنز", example: "They found treasure in the tomb." },
      { word: "desert", meaning: "A very dry area with little rain", emoji: "🏜️", arabic: "صحراء", example: "The pyramids stand in the desert." },
      { word: "mystery", meaning: "Something that is difficult to explain", emoji: "🔮", arabic: "لغز", example: "How the pyramids were built is still a mystery." },
      { word: "hieroglyphics", meaning: "Picture writing used in ancient Egypt", emoji: "📜", arabic: "هيروغليفية", example: "The walls were covered with hieroglyphics." },
      { word: "monument", meaning: "A large structure built to remember something", emoji: "🗿", arabic: "نصب تذكاري", example: "The Sphinx is a famous monument." },
    ],
    transcript: [
      { time: "0:00", text: "Ancient Egypt was one of the greatest civilizations in history.", translation: "كانت مصر القديمة واحدة من أعظم الحضارات في التاريخ." },
      { time: "0:09", text: "The pyramids were built over 4,500 years ago.", translation: "بُنيت الأهرامات منذ أكثر من 4500 عام." },
      { time: "0:17", text: "Pharaohs were buried with incredible treasures.", translation: "دُفن الفراعنة مع كنوز مذهلة." },
      { time: "0:25", text: "Hieroglyphics tell stories of everyday life.", translation: "تروي الهيروغليفية قصص الحياة اليومية." },
      { time: "0:33", text: "The Sphinx guards the entrance to the pyramids.", translation: "يحرس أبو الهول مدخل الأهرامات." },
      { time: "0:40", text: "Many mysteries of ancient Egypt remain unsolved.", translation: "لا تزال العديد من ألغاز مصر القديمة دون حل." },
    ],
    expressions: [
      { phrase: "one of the greatest", meaning: "Among the most important or impressive", emoji: "🏆", arabic: "واحدة من أعظم" },
      { phrase: "buried with", meaning: "Placed in a tomb along with objects", emoji: "⚰️", arabic: "دُفن مع" },
      { phrase: "remain unsolved", meaning: "Still without an answer or solution", emoji: "❓", arabic: "لا تزال دون حل" },
    ],
    questions: [
      { question: "When were the pyramids built?", options: ["1,000 years ago", "2,000 years ago", "Over 4,500 years ago 🔺", "500 years ago"], correct: 2 },
      { question: "What is a pharaoh?", options: ["A type of building", "A ruler of ancient Egypt 👑", "A kind of food", "A river"], correct: 1 },
      { question: "What are hieroglyphics?", options: ["Modern art", "Picture writing 📜", "A type of music", "A weapon"], correct: 1 },
      { question: "What does 'ancient' mean?", options: ["New", "Modern", "Very old 🏛️", "Small"], correct: 2 },
    ],
    culturalNote: "The Great Pyramid of Giza is the oldest of the Seven Wonders of the Ancient World and the only one still standing!",
  },

  // ─── 5. Science ───
  {
    id: 5, level: "B1", levelLabel: "Intermediate",
    title: "How the Human Body Works", emoji: "🫀",
    documentaryTitle: "Inside the Human Body — BBC",
    youtubeId: "wTlVnHbJpKM",
    description: "Understand the human body and learn scientific vocabulary",
    sceneContext: "Take a journey inside the human body to understand how our organs, cells, and systems work together to keep us alive.",
    vocabulary: [
      { word: "organ", meaning: "A part of the body with a specific function", emoji: "🫀", arabic: "عضو", example: "The heart is a vital organ." },
      { word: "cell", meaning: "The smallest unit of life in an organism", emoji: "🔬", arabic: "خلية", example: "The human body has trillions of cells." },
      { word: "blood", meaning: "The red liquid that flows through your body", emoji: "🩸", arabic: "دم", example: "Blood carries oxygen to your organs." },
      { word: "oxygen", meaning: "A gas we need to breathe to stay alive", emoji: "💨", arabic: "أكسجين", example: "Your lungs take in oxygen from the air." },
      { word: "skeleton", meaning: "The framework of bones in the body", emoji: "🦴", arabic: "هيكل عظمي", example: "The skeleton supports your body." },
      { word: "muscle", meaning: "Body tissue that produces movement", emoji: "💪", arabic: "عضلة", example: "Muscles help you move and lift things." },
      { word: "nerve", meaning: "A fiber that carries signals between the brain and body", emoji: "⚡", arabic: "عصب", example: "Nerves send messages to your brain." },
      { word: "digest", meaning: "To break down food in the stomach", emoji: "🍽️", arabic: "يهضم", example: "Your body digests food to get energy." },
      { word: "immune system", meaning: "The body's defense against disease", emoji: "🛡️", arabic: "جهاز مناعي", example: "A strong immune system fights infections." },
      { word: "circulation", meaning: "The movement of blood through the body", emoji: "♻️", arabic: "دورة دموية", example: "Good circulation keeps you healthy." },
      { word: "tissue", meaning: "A group of cells that work together", emoji: "🧬", arabic: "نسيج", example: "Muscle tissue contracts to create movement." },
      { word: "metabolism", meaning: "Chemical processes in the body that convert food to energy", emoji: "🔥", arabic: "أيض", example: "Exercise speeds up your metabolism." },
    ],
    transcript: [
      { time: "0:00", text: "The human body is the most complex machine on Earth.", translation: "جسم الإنسان هو أكثر آلة تعقيداً على الأرض." },
      { time: "0:08", text: "Your heart beats about 100,000 times every day.", translation: "ينبض قلبك حوالي 100,000 مرة كل يوم." },
      { time: "0:16", text: "Blood travels through 60,000 miles of blood vessels.", translation: "يسافر الدم عبر 60,000 ميل من الأوعية الدموية." },
      { time: "0:24", text: "Your brain processes millions of signals every second.", translation: "يعالج دماغك ملايين الإشارات كل ثانية." },
      { time: "0:32", text: "The immune system is your body's defense force.", translation: "الجهاز المناعي هو قوة الدفاع في جسمك." },
      { time: "0:40", text: "Every cell in your body has a specific job to do.", translation: "كل خلية في جسمك لها وظيفة محددة." },
      { time: "0:48", text: "Understanding your body helps you take better care of it.", translation: "فهم جسمك يساعدك على العناية به بشكل أفضل." },
    ],
    expressions: [
      { phrase: "the most complex", meaning: "Having the greatest number of parts or difficulty", emoji: "🧩", arabic: "الأكثر تعقيداً" },
      { phrase: "defense force", meaning: "A system that protects against attack", emoji: "🛡️", arabic: "قوة دفاع" },
      { phrase: "take care of", meaning: "To look after and maintain", emoji: "❤️", arabic: "يعتني بـ" },
      { phrase: "specific job", meaning: "A particular task or function", emoji: "🎯", arabic: "وظيفة محددة" },
    ],
    questions: [
      { question: "How many times does your heart beat daily?", options: ["1,000", "10,000", "About 100,000 🫀", "1,000,000"], correct: 2 },
      { question: "What does the immune system do?", options: ["Digests food", "Moves muscles", "Defends against disease 🛡️", "Creates blood"], correct: 2 },
      { question: "What is a 'cell'?", options: ["A type of organ", "The smallest unit of life 🔬", "A bone", "A nerve"], correct: 1 },
      { question: "What carries oxygen through the body?", options: ["Nerves", "Muscles", "Blood 🩸", "Bones"], correct: 2 },
      { question: "What does 'circulation' refer to?", options: ["Breathing", "Thinking", "Blood movement ♻️", "Eating"], correct: 2 },
    ],
    culturalNote: "BBC's Inside the Human Body uses cutting-edge CGI to show processes happening at a cellular level inside our bodies.",
  },

  // ─── 6. Technology ───
  {
    id: 6, level: "B1", levelLabel: "Intermediate",
    title: "The Rise of Artificial Intelligence", emoji: "🤖",
    documentaryTitle: "AI: The Future of Everything",
    youtubeId: "5dZ_lvDgevk",
    description: "Explore AI technology and learn tech vocabulary",
    sceneContext: "Discover how artificial intelligence is transforming our world — from self-driving cars to virtual assistants and medical breakthroughs.",
    vocabulary: [
      { word: "artificial", meaning: "Made by humans, not natural", emoji: "🔧", arabic: "اصطناعي", example: "Artificial intelligence mimics human thinking." },
      { word: "algorithm", meaning: "A set of rules a computer follows to solve a problem", emoji: "📊", arabic: "خوارزمية", example: "The algorithm recommends videos you might like." },
      { word: "data", meaning: "Information collected for analysis", emoji: "📈", arabic: "بيانات", example: "AI learns from large amounts of data." },
      { word: "automate", meaning: "To make something work without human help", emoji: "⚙️", arabic: "أتمتة", example: "Robots automate factory work." },
      { word: "robot", meaning: "A machine that can perform tasks automatically", emoji: "🤖", arabic: "روبوت", example: "Robots can work 24 hours a day." },
      { word: "neural network", meaning: "A computer system inspired by the human brain", emoji: "🧠", arabic: "شبكة عصبية", example: "Neural networks help AI recognize images." },
      { word: "innovation", meaning: "A new idea, method, or invention", emoji: "💡", arabic: "ابتكار", example: "AI is a major innovation of our time." },
      { word: "predict", meaning: "To say what will happen in the future", emoji: "🔮", arabic: "يتنبأ", example: "AI can predict weather patterns." },
      { word: "transform", meaning: "To change completely", emoji: "🔄", arabic: "يحوّل", example: "AI will transform healthcare." },
      { word: "privacy", meaning: "The right to keep personal information secret", emoji: "🔒", arabic: "خصوصية", example: "AI raises questions about privacy." },
      { word: "efficiency", meaning: "Achieving maximum output with minimum waste", emoji: "⚡", arabic: "كفاءة", example: "AI improves efficiency in manufacturing." },
      { word: "autonomous", meaning: "Operating independently without human control", emoji: "🚗", arabic: "ذاتي", example: "Autonomous cars drive themselves." },
    ],
    transcript: [
      { time: "0:00", text: "Artificial intelligence is no longer science fiction.", translation: "لم يعد الذكاء الاصطناعي خيالاً علمياً." },
      { time: "0:08", text: "AI systems can now recognize faces, translate languages, and even drive cars.", translation: "يمكن لأنظمة الذكاء الاصطناعي الآن التعرف على الوجوه وترجمة اللغات وحتى قيادة السيارات." },
      { time: "0:18", text: "Machine learning algorithms improve with more data.", translation: "تتحسن خوارزميات التعلم الآلي مع المزيد من البيانات." },
      { time: "0:26", text: "However, AI also raises important ethical questions.", translation: "ومع ذلك، يثير الذكاء الاصطناعي أيضاً أسئلة أخلاقية مهمة." },
      { time: "0:34", text: "Who is responsible when an AI makes a mistake?", translation: "من المسؤول عندما يرتكب الذكاء الاصطناعي خطأ؟" },
      { time: "0:42", text: "The future of AI depends on how we choose to use it.", translation: "يعتمد مستقبل الذكاء الاصطناعي على كيفية اختيارنا لاستخدامه." },
    ],
    expressions: [
      { phrase: "science fiction", meaning: "Stories about imagined future technology", emoji: "📚", arabic: "خيال علمي" },
      { phrase: "raise questions", meaning: "To cause people to think about important issues", emoji: "❓", arabic: "يثير تساؤلات" },
      { phrase: "no longer", meaning: "Not anymore; has changed", emoji: "🔄", arabic: "لم يعد" },
      { phrase: "depends on", meaning: "Is determined by; relies on", emoji: "⚖️", arabic: "يعتمد على" },
    ],
    questions: [
      { question: "What can AI systems do now?", options: ["Only play games", "Recognize faces and drive cars 🤖", "Only count numbers", "Nothing useful"], correct: 1 },
      { question: "What does 'algorithm' mean?", options: ["A type of robot", "A set of rules for solving problems 📊", "A computer screen", "An app"], correct: 1 },
      { question: "What does AI raise according to the documentary?", options: ["Money", "Ethical questions ❓", "Buildings", "Animals"], correct: 1 },
      { question: "What does 'autonomous' mean?", options: ["Controlled by humans", "Very slow", "Operating independently 🚗", "Broken"], correct: 2 },
      { question: "What does 'privacy' concern?", options: ["Speed", "Cost", "Keeping personal information secret 🔒", "Size"], correct: 2 },
    ],
    culturalNote: "The term 'artificial intelligence' was first coined in 1956 at a conference at Dartmouth College.",
  },

  // ─── 7. Climate ───
  {
    id: 7, level: "B1", levelLabel: "Intermediate",
    title: "Climate Change Explained", emoji: "🌡️",
    documentaryTitle: "Before the Flood",
    youtubeId: "D9xFFyUOpXo",
    description: "Understand climate change through environmental vocabulary",
    sceneContext: "Leonardo DiCaprio travels across the globe to witness the devastating effects of climate change and explore solutions.",
    vocabulary: [
      { word: "climate", meaning: "The weather conditions in an area over a long period", emoji: "🌍", arabic: "مناخ", example: "The climate is getting warmer." },
      { word: "greenhouse", meaning: "A glass building for growing plants; also gases that trap heat", emoji: "🏠", arabic: "دفيئة", example: "Greenhouse gases trap heat in the atmosphere." },
      { word: "emission", meaning: "The release of gas or radiation into the atmosphere", emoji: "💨", arabic: "انبعاث", example: "Carbon emissions must be reduced." },
      { word: "fossil fuel", meaning: "Energy sources like coal, oil, and gas formed from ancient organisms", emoji: "⛽", arabic: "وقود أحفوري", example: "Burning fossil fuels causes pollution." },
      { word: "renewable", meaning: "Energy that can be replaced naturally", emoji: "♻️", arabic: "متجدد", example: "Solar energy is renewable." },
      { word: "deforestation", meaning: "Cutting down large areas of forest", emoji: "🪓", arabic: "إزالة الغابات", example: "Deforestation destroys animal habitats." },
      { word: "glacier", meaning: "A large body of ice that moves slowly", emoji: "🧊", arabic: "نهر جليدي", example: "Glaciers are melting due to warming." },
      { word: "carbon", meaning: "A chemical element found in all living things", emoji: "⚛️", arabic: "كربون", example: "We need to reduce our carbon footprint." },
      { word: "sustainable", meaning: "Able to continue without damaging the environment", emoji: "🌱", arabic: "مستدام", example: "We need sustainable energy sources." },
      { word: "drought", meaning: "A long period without rain", emoji: "☀️", arabic: "جفاف", example: "Climate change causes more droughts." },
    ],
    transcript: [
      { time: "0:00", text: "Climate change is the defining issue of our time.", translation: "تغير المناخ هو القضية الحاسمة في عصرنا." },
      { time: "0:09", text: "The planet has warmed by over one degree Celsius since 1900.", translation: "ارتفعت حرارة الكوكب بأكثر من درجة مئوية واحدة منذ 1900." },
      { time: "0:18", text: "Glaciers are melting at an alarming rate.", translation: "تذوب الأنهار الجليدية بمعدل مقلق." },
      { time: "0:25", text: "Fossil fuels are the biggest contributor to greenhouse gases.", translation: "الوقود الأحفوري هو أكبر مساهم في غازات الاحتباس الحراري." },
      { time: "0:34", text: "Renewable energy offers a path to a cleaner future.", translation: "تقدم الطاقة المتجددة طريقاً لمستقبل أنظف." },
      { time: "0:42", text: "Every person can make a difference.", translation: "كل شخص يمكنه إحداث فرق." },
    ],
    expressions: [
      { phrase: "the defining issue", meaning: "The most important problem of a particular time", emoji: "🎯", arabic: "القضية الحاسمة" },
      { phrase: "at an alarming rate", meaning: "Happening dangerously fast", emoji: "⚠️", arabic: "بمعدل مقلق" },
      { phrase: "make a difference", meaning: "To have a positive effect or impact", emoji: "✨", arabic: "يُحدث فرقاً" },
    ],
    questions: [
      { question: "What is the biggest contributor to greenhouse gases?", options: ["Trees", "Fossil fuels ⛽", "Water", "Animals"], correct: 1 },
      { question: "What does 'renewable' mean?", options: ["Cannot be replaced", "Can be replaced naturally ♻️", "Very expensive", "Old"], correct: 1 },
      { question: "What is happening to glaciers?", options: ["Growing", "Melting 🧊", "Moving faster", "Turning green"], correct: 1 },
      { question: "What does 'sustainable' mean?", options: ["Harmful to nature", "Temporary", "Can continue without damage 🌱", "Very fast"], correct: 2 },
    ],
    culturalNote: "Before the Flood (2016) was produced by Leonardo DiCaprio and National Geographic. It was released for free on YouTube!",
  },

  // ─── 8. Culture ───
  {
    id: 8, level: "B2", levelLabel: "Upper-Intermediate",
    title: "The Story of Human Language", emoji: "🗣️",
    documentaryTitle: "The Story of Human Language — TTC",
    youtubeId: "KdouFpd1qkc",
    description: "Explore linguistics and the evolution of human language",
    sceneContext: "Discover how human language evolved, how languages spread across continents, and why some languages disappear.",
    vocabulary: [
      { word: "linguistics", meaning: "The scientific study of language", emoji: "📖", arabic: "لسانيات", example: "Linguistics helps us understand how language works." },
      { word: "dialect", meaning: "A regional variety of a language", emoji: "🗺️", arabic: "لهجة", example: "British and American English are different dialects." },
      { word: "syntax", meaning: "The arrangement of words in a sentence", emoji: "📝", arabic: "تركيب نحوي", example: "English syntax follows subject-verb-object order." },
      { word: "etymology", meaning: "The study of the origin and history of words", emoji: "📚", arabic: "أصل الكلمات", example: "The etymology of 'telephone' is Greek." },
      { word: "bilingual", meaning: "Able to speak two languages fluently", emoji: "🌐", arabic: "ثنائي اللغة", example: "Many people in Canada are bilingual." },
      { word: "extinct", meaning: "No longer in existence or use", emoji: "💀", arabic: "منقرض", example: "Many languages have become extinct." },
      { word: "phonetics", meaning: "The study of speech sounds", emoji: "🔊", arabic: "علم الصوتيات", example: "Phonetics helps with pronunciation." },
      { word: "lingua franca", meaning: "A common language used between speakers of different languages", emoji: "🤝", arabic: "لغة مشتركة", example: "English is the lingua franca of business." },
      { word: "evolve", meaning: "To change and develop gradually over time", emoji: "🔄", arabic: "يتطور", example: "Languages evolve over centuries." },
      { word: "indigenous", meaning: "Originating naturally in a particular place", emoji: "🌿", arabic: "أصلي", example: "Indigenous languages are disappearing rapidly." },
      { word: "morphology", meaning: "The study of the form and structure of words", emoji: "🔬", arabic: "صرف", example: "Morphology examines how words are formed." },
      { word: "cognitive", meaning: "Related to thinking and understanding", emoji: "🧠", arabic: "إدراكي", example: "Bilingualism has cognitive benefits." },
    ],
    transcript: [
      { time: "0:00", text: "There are approximately 7,000 languages spoken around the world today.", translation: "هناك حوالي 7,000 لغة يتم التحدث بها حول العالم اليوم." },
      { time: "0:10", text: "All human languages share certain fundamental features.", translation: "تشترك جميع اللغات البشرية في خصائص أساسية معينة." },
      { time: "0:19", text: "Languages continuously evolve, borrowing words from each other.", translation: "تتطور اللغات باستمرار، مستعيرةً كلمات من بعضها البعض." },
      { time: "0:28", text: "A language dies every two weeks on average.", translation: "تموت لغة كل أسبوعين في المتوسط." },
      { time: "0:36", text: "Preserving linguistic diversity is crucial for human heritage.", translation: "الحفاظ على التنوع اللغوي أمر حاسم للتراث الإنساني." },
      { time: "0:44", text: "English has become the dominant lingua franca of the modern world.", translation: "أصبحت الإنجليزية اللغة المشتركة المهيمنة في العالم الحديث." },
    ],
    expressions: [
      { phrase: "lingua franca", meaning: "A bridge language used for communication between groups", emoji: "🌉", arabic: "لغة تواصل مشتركة" },
      { phrase: "on average", meaning: "Typically; as a general rule", emoji: "📊", arabic: "في المتوسط" },
      { phrase: "borrowing words", meaning: "Taking words from another language", emoji: "🔀", arabic: "استعارة كلمات" },
      { phrase: "linguistic diversity", meaning: "The variety of languages in the world", emoji: "🌈", arabic: "تنوع لغوي" },
    ],
    questions: [
      { question: "How many languages exist today?", options: ["About 500", "About 2,000", "About 7,000 🗣️", "About 20,000"], correct: 2 },
      { question: "How often does a language die?", options: ["Every day", "Every two weeks 💀", "Every year", "Every century"], correct: 1 },
      { question: "What is a 'dialect'?", options: ["A dead language", "A regional variety 🗺️", "A writing system", "A grammar rule"], correct: 1 },
      { question: "What does 'bilingual' mean?", options: ["Can speak one language", "Can speak two languages 🌐", "Can't speak any language", "Can read only"], correct: 1 },
      { question: "What is 'etymology'?", options: ["Study of animals", "Study of word origins 📚", "Study of math", "Study of music"], correct: 1 },
    ],
    culturalNote: "English has borrowed words from over 350 languages! Words like 'algebra' (Arabic), 'tsunami' (Japanese), and 'chocolate' (Nahuatl).",
  },

  // ─── 9. Psychology ───
  {
    id: 9, level: "B2", levelLabel: "Upper-Intermediate",
    title: "The Science of Happiness", emoji: "😊",
    documentaryTitle: "The Happy Secret — TED",
    youtubeId: "fLJsdqxnZb0",
    description: "Learn about psychology and well-being vocabulary",
    sceneContext: "Explore what scientific research tells us about happiness — how our brains work, what truly makes us happy, and practical strategies for well-being.",
    vocabulary: [
      { word: "well-being", meaning: "The state of being happy, healthy, and comfortable", emoji: "🌟", arabic: "رفاهية", example: "Exercise improves your well-being." },
      { word: "gratitude", meaning: "The feeling of being thankful", emoji: "🙏", arabic: "امتنان", example: "Practicing gratitude improves happiness." },
      { word: "resilience", meaning: "The ability to recover from difficulties", emoji: "💪", arabic: "مرونة", example: "Resilience helps you overcome challenges." },
      { word: "mindfulness", meaning: "The practice of being fully present and aware", emoji: "🧘", arabic: "اليقظة الذهنية", example: "Mindfulness reduces stress and anxiety." },
      { word: "dopamine", meaning: "A brain chemical associated with pleasure and reward", emoji: "⚡", arabic: "دوبامين", example: "Dopamine is released when you achieve a goal." },
      { word: "perception", meaning: "The way you see and interpret the world", emoji: "👁️", arabic: "إدراك", example: "Happiness depends on your perception." },
      { word: "neuroscience", meaning: "The study of the brain and nervous system", emoji: "🧠", arabic: "علم الأعصاب", example: "Neuroscience reveals how happiness works in the brain." },
      { word: "therapy", meaning: "Treatment to help with mental or physical health", emoji: "💊", arabic: "علاج", example: "Therapy can help with anxiety and depression." },
      { word: "social connection", meaning: "Meaningful relationships with other people", emoji: "🤝", arabic: "تواصل اجتماعي", example: "Social connection is key to happiness." },
      { word: "meditation", meaning: "A practice of focused attention for calmness", emoji: "🧘‍♂️", arabic: "تأمل", example: "Daily meditation reduces stress." },
    ],
    transcript: [
      { time: "0:00", text: "What makes us truly happy is not what we think.", translation: "ما يجعلنا سعداء حقاً ليس ما نعتقد." },
      { time: "0:09", text: "Research shows that money only increases happiness to a certain point.", translation: "تظهر الأبحاث أن المال يزيد السعادة إلى حد معين فقط." },
      { time: "0:18", text: "Strong social connections are the number one predictor of happiness.", translation: "العلاقات الاجتماعية القوية هي المؤشر الأول للسعادة." },
      { time: "0:27", text: "Gratitude journals can rewire your brain for positivity.", translation: "يمكن لدفاتر الامتنان إعادة برمجة دماغك للإيجابية." },
      { time: "0:36", text: "Mindfulness meditation changes brain structure in just eight weeks.", translation: "يغير تأمل اليقظة الذهنية بنية الدماغ في ثمانية أسابيع فقط." },
      { time: "0:44", text: "Happiness is a skill that can be practiced and improved.", translation: "السعادة مهارة يمكن ممارستها وتحسينها." },
    ],
    expressions: [
      { phrase: "to a certain point", meaning: "Up to a limit; not beyond", emoji: "📍", arabic: "إلى حد معين" },
      { phrase: "rewire your brain", meaning: "To change the way your brain works", emoji: "🔌", arabic: "إعادة برمجة دماغك" },
      { phrase: "number one predictor", meaning: "The most important factor that indicates something", emoji: "🥇", arabic: "المؤشر الأول" },
    ],
    questions: [
      { question: "What is the number one predictor of happiness?", options: ["Money", "Social connections 🤝", "Career success", "Good weather"], correct: 1 },
      { question: "What does 'gratitude' mean?", options: ["Being angry", "Being thankful 🙏", "Being tired", "Being confused"], correct: 1 },
      { question: "What does 'resilience' mean?", options: ["Being weak", "Giving up", "Recovering from difficulties 💪", "Being lazy"], correct: 2 },
      { question: "What can change brain structure in 8 weeks?", options: ["Reading", "Sleeping", "Mindfulness meditation 🧘", "Eating"], correct: 2 },
      { question: "What is 'dopamine'?", options: ["A vitamin", "A brain chemical for pleasure ⚡", "A type of food", "A meditation technique"], correct: 1 },
    ],
    culturalNote: "Harvard's 75-year study on happiness found that relationships, not money or fame, are the key to a fulfilling life.",
  },

  // ─── 10. Nature 2 ───
  {
    id: 10, level: "C1", levelLabel: "Advanced",
    title: "The Hidden Life of Forests", emoji: "🌲",
    documentaryTitle: "Intelligent Trees",
    youtubeId: "Un2yBgIAxYs",
    description: "Advanced vocabulary about ecosystems and forest science",
    sceneContext: "Discover the groundbreaking science that reveals how trees communicate through underground fungal networks, share resources, and form complex forest communities.",
    vocabulary: [
      { word: "ecosystem", meaning: "A community of living organisms interacting with their environment", emoji: "🌳", arabic: "نظام بيئي", example: "A forest is a complex ecosystem." },
      { word: "symbiosis", meaning: "A close relationship between two species that benefits at least one", emoji: "🤝", arabic: "تكافل", example: "Trees and fungi live in symbiosis." },
      { word: "photosynthesis", meaning: "The process plants use to convert sunlight into food", emoji: "☀️", arabic: "تمثيل ضوئي", example: "Photosynthesis produces oxygen." },
      { word: "mycelium", meaning: "The network of fungal threads in soil", emoji: "🍄", arabic: "فطريات جذرية", example: "Mycelium connects trees underground." },
      { word: "canopy", meaning: "The upper layer of leaves in a forest", emoji: "🌿", arabic: "مظلة أشجار", example: "The canopy blocks most sunlight." },
      { word: "biodiversity", meaning: "The variety of plant and animal life in an area", emoji: "🦜", arabic: "تنوع حيوي", example: "Rainforests have the highest biodiversity." },
      { word: "decompose", meaning: "To decay and break down naturally", emoji: "🍂", arabic: "يتحلل", example: "Dead leaves decompose and enrich the soil." },
      { word: "nutrient", meaning: "A substance that provides nourishment for growth", emoji: "🧪", arabic: "مغذيات", example: "Trees share nutrients through root networks." },
      { word: "resilient", meaning: "Able to withstand or recover quickly from difficult conditions", emoji: "🛡️", arabic: "صامد", example: "Old-growth forests are remarkably resilient." },
      { word: "interdependence", meaning: "The mutual reliance between organisms", emoji: "🔗", arabic: "ترابط", example: "Forest life shows deep interdependence." },
      { word: "undergrowth", meaning: "Dense vegetation growing beneath forest trees", emoji: "🌱", arabic: "نباتات سفلية", example: "The undergrowth provides shelter for small animals." },
      { word: "sequester", meaning: "To isolate or capture; trees sequester carbon", emoji: "🔒", arabic: "يحبس", example: "Forests sequester millions of tons of carbon." },
    ],
    transcript: [
      { time: "0:00", text: "Beneath our feet lies a vast hidden network connecting every tree in the forest.", translation: "تحت أقدامنا تكمن شبكة واسعة مخفية تربط كل شجرة في الغابة." },
      { time: "0:10", text: "Scientists call it the 'Wood Wide Web' — a fungal internet of sorts.", translation: "يسميها العلماء 'الشبكة الخشبية العالمية' — إنترنت فطري من نوع ما." },
      { time: "0:20", text: "Mother trees can recognize their offspring and send them extra nutrients.", translation: "يمكن للأشجار الأم التعرف على نسلها وإرسال مغذيات إضافية لها." },
      { time: "0:30", text: "When one tree is attacked by insects, it sends chemical warnings to its neighbors.", translation: "عندما تتعرض شجرة لهجوم حشري، ترسل تحذيرات كيميائية لجيرانها." },
      { time: "0:40", text: "This research has fundamentally changed our understanding of forest ecology.", translation: "غيّر هذا البحث بشكل جذري فهمنا لعلم بيئة الغابات." },
      { time: "0:50", text: "Forests are not just collections of trees — they are superorganisms.", translation: "الغابات ليست مجرد مجموعات أشجار — إنها كائنات خارقة." },
    ],
    expressions: [
      { phrase: "Wood Wide Web", meaning: "The underground fungal network connecting trees (play on World Wide Web)", emoji: "🕸️", arabic: "الشبكة الخشبية العالمية" },
      { phrase: "of sorts", meaning: "Of a kind; in some way", emoji: "🤷", arabic: "من نوع ما" },
      { phrase: "fundamentally changed", meaning: "Changed in the most basic and important way", emoji: "🔄", arabic: "غيّر بشكل جذري" },
      { phrase: "chemical warnings", meaning: "Signals sent through chemicals to alert others", emoji: "⚠️", arabic: "تحذيرات كيميائية" },
    ],
    questions: [
      { question: "What is the 'Wood Wide Web'?", options: ["A website about trees", "A fungal network connecting trees 🍄", "A type of spider web", "A book about forests"], correct: 1 },
      { question: "What can mother trees do?", options: ["Move to new locations", "Recognize offspring and share nutrients 🌳", "Produce electricity", "Grow overnight"], correct: 1 },
      { question: "What does 'symbiosis' mean?", options: ["Competition between species", "A close beneficial relationship 🤝", "Destruction of nature", "Plant disease"], correct: 1 },
      { question: "What does 'sequester' mean in the context of forests?", options: ["To cut down", "To capture and store 🔒", "To burn", "To plant"], correct: 1 },
      { question: "What are forests described as in the documentary?", options: ["Simple systems", "Just trees", "Superorganisms 🌲", "Dead zones"], correct: 2 },
    ],
    culturalNote: "Dr. Suzanne Simard's research on tree communication networks inspired the concept of 'Hometree' in the movie Avatar!",
  },
];

// Merge with batch 2
import { documentaryCourse2 } from "./documentary-course-2";
documentaryCourse.push(...documentaryCourse2);
