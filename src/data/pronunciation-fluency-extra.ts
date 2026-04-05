import { LessonData } from "./lessons";

export const pronunciationFluencyExtra: Record<string, LessonData> = {
  "pronunciation-6": {
    levelId: "pronunciation", levelLabel: "Pronunciation & Accent", lessonNumber: 6,
    title: "Connected Speech & Linking",
    description: "Learn how native speakers link words together in natural speech.",
    vocabulary: [
      { word: "Linking", meaning: "Connecting the end of one word to the start of the next", example: "In 'turn off', the /n/ links to /ɒ/.", emoji: "🔗", arabic: "ربط" },
      { word: "Elision", meaning: "Dropping a sound in fast speech", example: "'Last night' becomes 'las(t) night'.", emoji: "✂️", arabic: "حذف صوتي" },
      { word: "Assimilation", meaning: "A sound changes to match a nearby sound", example: "'Ten bags' → /tem bags/.", emoji: "🔄", arabic: "مماثلة" },
      { word: "Intrusion", meaning: "Adding a sound between two vowels", example: "'Go away' → 'go-w-away'.", emoji: "➕", arabic: "إقحام" },
      { word: "Catenation", meaning: "Linking a consonant to the next vowel", example: "'Pick it up' → 'pi-ki-tup'.", emoji: "⛓️", arabic: "سلسلة" },
      { word: "Reduction", meaning: "Making a sound shorter or weaker", example: "'And' becomes /ən/ in fast speech.", emoji: "📉", arabic: "اختزال" },
      { word: "Weak form", meaning: "The unstressed version of a word", example: "'Can' → /kən/ in 'I can go'.", emoji: "🔅", arabic: "صيغة ضعيفة" },
      { word: "Strong form", meaning: "The stressed version of a word", example: "'Can' → /kæn/ in 'Yes, I can!'.", emoji: "🔆", arabic: "صيغة قوية" },
      { word: "Glottal stop", meaning: "A brief closure in the throat", example: "'Button' → /bʌʔn/ in British English.", emoji: "🛑", arabic: "وقفة حنجرية" },
      { word: "Schwa", meaning: "The /ə/ sound — the most common English vowel", example: "'About' starts with a schwa.", emoji: "🔤", arabic: "شوا" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Listen carefully: 'Pick it up.' Can you hear how the words connect?" },
      { speaker: "Student", text: "'Pi-ki-tup'? The sounds blend together!" },
      { speaker: "Teacher", text: "Exactly! That's catenation — linking consonants to vowels." },
      { speaker: "Student", text: "Is that why fast English is so hard to understand?" },
      { speaker: "Teacher", text: "Yes! Once you learn connected speech, listening becomes much easier." },
    ],
    grammar: {
      title: "Patterns of Connected Speech",
      explanation: "In natural English, words don't stand alone. Speakers link, reduce, and blend sounds for fluency.",
      examples: [
        { sentence: "Turn it off → /tɜːr-nɪ-tɒf/", note: "Consonant-to-vowel linking" },
        { sentence: "Want to → /wɒnə/ (wanna)", note: "Reduction in casual speech" },
        { sentence: "Did you → /dɪdʒu/", note: "Assimilation: /d/ + /j/ = /dʒ/" },
        { sentence: "Go away → /gəʊ-w-əweɪ/", note: "Intrusive /w/ between vowels" },
      ],
    },
    vocabExercises: [
      { question: "'Elision' means:", options: ["Adding a sound", "Dropping a sound", "Changing stress", "Linking words"], correct: 1 },
      { question: "The 'schwa' sound is:", options: ["/iː/", "/æ/", "/ə/", "/ɒ/"], correct: 2 },
      { question: "'Catenation' is:", options: ["Dropping sounds", "Linking consonant to vowel", "Changing pitch", "Pausing"], correct: 1 },
    ],
    conversationExercises: [
      { question: "Why is connected speech important?", options: ["It's not important", "It helps understand native speakers", "It's only for singing", "It's slang"], correct: 1 },
      { question: "'Want to' often sounds like:", options: ["Won two", "Wanna", "Want too", "Won't"], correct: 1 },
    ],
    grammarExercises: [
      { question: "In 'Did you go?', /d/ + /j/ becomes:", options: ["/dj/", "/dʒ/", "/tʃ/", "/ʒ/"], correct: 1 },
      { question: "A 'weak form' is:", options: ["Loud pronunciation", "The unstressed version", "Incorrect speech", "A whisper"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Assimilation' means a sound:", options: ["Disappears", "Gets louder", "Changes to match nearby sounds", "Stays the same"], correct: 2 },
      { question: "Which is an example of intrusion?", options: ["Last night", "Go away → go-w-away", "Pick it up", "Want to → wanna"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "A 'glottal stop' occurs in:", options: ["The nose", "The throat", "The lips", "The tongue tip"], correct: 1 },
    ],
  },
  "pronunciation-7": {
    levelId: "pronunciation", levelLabel: "Pronunciation & Accent", lessonNumber: 7,
    title: "Vowel Sounds Deep Dive",
    description: "Master all English vowel sounds — short, long, and diphthongs.",
    vocabulary: [
      { word: "Vowel", meaning: "A sound made with an open mouth", example: "English has about 20 vowel sounds.", emoji: "🅰️", arabic: "حرف علة" },
      { word: "Diphthong", meaning: "A vowel sound that glides between two positions", example: "/aɪ/ in 'time' is a diphthong.", emoji: "🔀", arabic: "حرف علة مزدوج" },
      { word: "Monophthong", meaning: "A single vowel sound", example: "/iː/ in 'see' is a monophthong.", emoji: "🔵", arabic: "حرف علة مفرد" },
      { word: "Short vowel", meaning: "A brief vowel sound", example: "/ɪ/ in 'sit' is short.", emoji: "⏱️", arabic: "حرف علة قصير" },
      { word: "Long vowel", meaning: "A vowel held longer", example: "/iː/ in 'seat' is long.", emoji: "⏳", arabic: "حرف علة طويل" },
      { word: "Tongue position", meaning: "Where the tongue sits in the mouth", example: "High front, low back — it matters!", emoji: "👅", arabic: "موضع اللسان" },
      { word: "Lip rounding", meaning: "Shape of lips during vowel sounds", example: "/uː/ needs rounded lips.", emoji: "👄", arabic: "تدوير الشفاه" },
      { word: "IPA", meaning: "International Phonetic Alphabet", example: "IPA symbols show exact sounds.", emoji: "🔣", arabic: "الأبجدية الصوتية" },
      { word: "Pair", meaning: "Two similar sounds compared", example: "'Ship' vs 'sheep' — minimal pair.", emoji: "👥", arabic: "زوج" },
      { word: "Mouth shape", meaning: "How wide or narrow your mouth opens", example: "Open wide for /ɑː/ in 'car'.", emoji: "😮", arabic: "شكل الفم" },
    ],
    dialogue: [
      { speaker: "Coach", text: "Say 'ship' and 'sheep'. Can you hear the difference?" },
      { speaker: "Student", text: "Ship has a short /ɪ/ and sheep has a long /iː/?" },
      { speaker: "Coach", text: "Perfect! Now try 'cat' /æ/ versus 'cut' /ʌ/." },
      { speaker: "Student", text: "Cat — mouth wide. Cut — mouth relaxed in the middle." },
      { speaker: "Coach", text: "Excellent! You're getting the tongue positions right!" },
    ],
    grammar: {
      title: "Vowel Sound Categories",
      explanation: "English has 12 monophthongs (7 short + 5 long) and 8 diphthongs. Position of tongue and lips determines the sound.",
      examples: [
        { sentence: "/ɪ/ sit vs /iː/ seat", note: "Short vs long — minimal pair" },
        { sentence: "/æ/ cat vs /ʌ/ cut vs /ɑː/ car", note: "Three different 'a' sounds" },
        { sentence: "/aɪ/ time, /eɪ/ take, /ɔɪ/ boy", note: "Common diphthongs — two positions" },
        { sentence: "/ʊ/ book vs /uː/ boot", note: "Short vs long back vowels" },
      ],
    },
    vocabExercises: [
      { question: "A 'diphthong' is:", options: ["One vowel sound", "Two consonants", "A gliding vowel sound", "A silent letter"], correct: 2 },
      { question: "/iː/ is a:", options: ["Short vowel", "Long vowel", "Diphthong", "Consonant"], correct: 1 },
    ],
    conversationExercises: [
      { question: "Which pair shows short vs long vowels?", options: ["Cat/dog", "Ship/sheep", "Big/small", "Run/walk"], correct: 1 },
    ],
    grammarExercises: [
      { question: "How many monophthongs does English have?", options: ["5", "8", "12", "20"], correct: 2 },
      { question: "/aɪ/ in 'time' is a:", options: ["Monophthong", "Diphthong", "Consonant", "Schwa"], correct: 1 },
    ],
    examQuestions: [
      { question: "'IPA' stands for:", options: ["Internet Protocol Address", "International Phonetic Alphabet", "Indian Postal Area", "Initial Program Access"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "/uː/ requires:", options: ["Spread lips", "Rounded lips", "Open mouth", "Closed mouth"], correct: 1 },
    ],
  },
  "pronunciation-8": {
    levelId: "pronunciation", levelLabel: "Pronunciation & Accent", lessonNumber: 8,
    title: "Consonant Clusters & Difficult Sounds",
    description: "Practice challenging consonant combinations and sounds like /θ/, /ð/, /r/, /l/.",
    vocabulary: [
      { word: "Consonant cluster", meaning: "Two or more consonants together", example: "'Str' in 'street' is a cluster.", emoji: "🔤", arabic: "تجمع ساكن" },
      { word: "Fricative", meaning: "A sound made with friction", example: "/f/, /v/, /θ/, /ð/ are fricatives.", emoji: "💨", arabic: "احتكاكي" },
      { word: "Plosive", meaning: "A sound made by stopping airflow", example: "/p/, /b/, /t/, /d/ are plosives.", emoji: "💥", arabic: "انفجاري" },
      { word: "Nasal", meaning: "A sound through the nose", example: "/m/, /n/, /ŋ/ are nasal sounds.", emoji: "👃", arabic: "أنفي" },
      { word: "Voiced", meaning: "Vocal cords vibrate", example: "/z/ is voiced, /s/ is voiceless.", emoji: "🔊", arabic: "مجهور" },
      { word: "Voiceless", meaning: "No vibration of vocal cords", example: "/p/ is voiceless, /b/ is voiced.", emoji: "🔇", arabic: "مهموس" },
      { word: "Aspiration", meaning: "A puff of air after a sound", example: "/p/ in 'pot' has aspiration.", emoji: "🌬️", arabic: "نفث" },
      { word: "Approximant", meaning: "A sound between vowel and consonant", example: "/r/, /l/, /w/, /j/ are approximants.", emoji: "〰️", arabic: "تقريبي" },
      { word: "Dental", meaning: "Made with tongue near teeth", example: "/θ/ in 'think' is dental.", emoji: "🦷", arabic: "أسناني" },
      { word: "Alveolar", meaning: "Made with tongue on the ridge behind teeth", example: "/t/, /d/, /n/ are alveolar.", emoji: "🎯", arabic: "لثوي" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Put your tongue between your teeth and blow. What sound is that?" },
      { speaker: "Student", text: "/θ/! Like in 'think' and 'three'." },
      { speaker: "Teacher", text: "Now add voice — vibrate your throat." },
      { speaker: "Student", text: "That's /ð/! Like in 'this' and 'the'." },
      { speaker: "Teacher", text: "Great! These are the hardest sounds for most learners." },
    ],
    grammar: {
      title: "Common Consonant Cluster Patterns",
      explanation: "English allows up to 3 consonants at the start (street) and 4 at the end (texts /teksts/). Practice breaking them down.",
      examples: [
        { sentence: "/str/ — street, strong, strange", note: "3-consonant initial cluster" },
        { sentence: "/θr/ — three, through, throw", note: "Dental + approximant cluster" },
        { sentence: "/ŋk/ — think, drink, bank", note: "Nasal + plosive final cluster" },
        { sentence: "/spl/ — splash, split, splendid", note: "3-consonant initial cluster" },
      ],
    },
    vocabExercises: [
      { question: "/θ/ is made with tongue:", options: ["On the roof of mouth", "Between the teeth", "At the back of throat", "On the lips"], correct: 1 },
      { question: "A 'plosive' stops:", options: ["Vibration", "Airflow", "The tongue", "Sound waves"], correct: 1 },
    ],
    conversationExercises: [
      { question: "Which word has a /θ/ sound?", options: ["This", "Think", "Zebra", "She"], correct: 1 },
    ],
    grammarExercises: [
      { question: "/z/ is ___ while /s/ is ___.", options: ["Voiceless/voiced", "Voiced/voiceless", "Nasal/oral", "Dental/alveolar"], correct: 1 },
    ],
    examQuestions: [
      { question: "How many initial consonants can English have?", options: ["1", "2", "3", "5"], correct: 2 },
    ],
    homeworkQuestions: [
      { question: "'Aspiration' is:", options: ["Breathing in", "A puff of air after a sound", "A nasal sound", "A vowel"], correct: 1 },
    ],
  },
  "pronunciation-9": {
    levelId: "pronunciation", levelLabel: "Pronunciation & Accent", lessonNumber: 9,
    title: "Word Stress Rules",
    description: "Learn predictable patterns for word stress in English.",
    vocabulary: [
      { word: "Primary stress", meaning: "The strongest syllable in a word", example: "'COMputer' — stress on COM.", emoji: "💪", arabic: "نبرة رئيسية" },
      { word: "Secondary stress", meaning: "A weaker stressed syllable", example: "'UNderSTAND' — UN has secondary.", emoji: "💫", arabic: "نبرة ثانوية" },
      { word: "Unstressed", meaning: "A syllable with no emphasis", example: "The 'er' in 'teacher' is unstressed.", emoji: "🔅", arabic: "غير مشدد" },
      { word: "Syllable", meaning: "A unit of pronunciation", example: "'Beautiful' has 3 syllables.", emoji: "🎵", arabic: "مقطع لفظي" },
      { word: "Prefix", meaning: "A word part added to the beginning", example: "'Un-' in 'unhappy' is a prefix.", emoji: "➡️", arabic: "بادئة" },
      { word: "Suffix", meaning: "A word part added to the end", example: "'-tion' in 'nation' is a suffix.", emoji: "⬅️", arabic: "لاحقة" },
      { word: "Compound noun", meaning: "Two words forming one noun", example: "'BLACKboard' — stress on first word.", emoji: "🔗", arabic: "اسم مركب" },
      { word: "Verb-noun shift", meaning: "Stress changes with word class", example: "reCORD (verb) vs REcord (noun).", emoji: "🔄", arabic: "تحول فعل-اسم" },
      { word: "Penultimate", meaning: "Second to last", example: "Stress the penultimate syllable in '-tion'.", emoji: "2️⃣", arabic: "ما قبل الأخير" },
      { word: "Rhythm", meaning: "The pattern of stressed beats", example: "English has a stress-timed rhythm.", emoji: "🥁", arabic: "إيقاع" },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Where's the stress in 'photograph'?" },
      { speaker: "Student", text: "PHO-to-graph — on the first syllable!" },
      { speaker: "Teacher", text: "Now what about 'photography'?" },
      { speaker: "Student", text: "pho-TOG-ra-phy — it moved to the second!" },
      { speaker: "Teacher", text: "Exactly! The suffix '-y' shifts the stress. This pattern is predictable." },
    ],
    grammar: {
      title: "Stress Rules by Suffix",
      explanation: "Certain suffixes determine stress placement: '-tion'/'-sion' → stress on previous syllable, '-ic' → stress on previous syllable, '-ity' → stress on previous syllable.",
      examples: [
        { sentence: "eduCAtion, inforMAtion, organiZAtion", note: "'-tion' — stress on syllable before suffix" },
        { sentence: "fanTAStic, draMAtic, reAListic", note: "'-ic' — stress on syllable before suffix" },
        { sentence: "REcord (noun) vs reCORD (verb)", note: "Stress shifts with word class" },
        { sentence: "BLACKboard, FOOTball, AIRport", note: "Compound nouns — stress on first element" },
      ],
    },
    vocabExercises: [
      { question: "In 'COMputer', stress is on:", options: ["First syllable", "Second syllable", "Third syllable", "No stress"], correct: 0 },
      { question: "'-tion' words stress:", options: ["The suffix", "The syllable before -tion", "The first syllable", "Random"], correct: 1 },
    ],
    conversationExercises: [
      { question: "'REcord' (noun) vs 'reCORD' (verb) shows:", options: ["Same stress", "Verb-noun stress shift", "No difference", "Wrong pronunciation"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Where's the stress in 'photography'?", options: ["PHO-", "-TOG-", "-ra-", "-phy"], correct: 1 },
    ],
    examQuestions: [
      { question: "Compound nouns stress:", options: ["Both equally", "The first element", "The second element", "Neither"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Penultimate' means:", options: ["Last", "Second to last", "First", "Middle"], correct: 1 },
    ],
  },
  "pronunciation-10": {
    levelId: "pronunciation", levelLabel: "Pronunciation & Accent", lessonNumber: 10,
    title: "British vs American Pronunciation",
    description: "Compare key differences between British and American English sounds.",
    vocabulary: [
      { word: "Received Pronunciation", meaning: "Standard British English accent (RP)", example: "RP is used by BBC newsreaders.", emoji: "🇬🇧", arabic: "النطق المعياري" },
      { word: "General American", meaning: "Standard American English accent", example: "GA is the most common US accent.", emoji: "🇺🇸", arabic: "الأمريكية العامة" },
      { word: "Rhotic", meaning: "Pronouncing /r/ after vowels", example: "American English is rhotic: 'car' = /kɑːr/.", emoji: "🔤", arabic: "رائي" },
      { word: "Non-rhotic", meaning: "Not pronouncing /r/ after vowels", example: "British RP is non-rhotic: 'car' = /kɑː/.", emoji: "🔇", arabic: "غير رائي" },
      { word: "Flat A", meaning: "Pronouncing 'bath' with /æ/", example: "Americans say /bæθ/, British say /bɑːθ/.", emoji: "🛁", arabic: "ألف مسطحة" },
      { word: "T-flapping", meaning: "/t/ between vowels sounds like /d/", example: "'Water' → /wɑːdər/ in American.", emoji: "👅", arabic: "قلب التاء" },
      { word: "Dialect", meaning: "A regional variety of language", example: "Scottish English is a dialect.", emoji: "🗺️", arabic: "لهجة" },
      { word: "Accent", meaning: "The way sounds are pronounced", example: "She has an Australian accent.", emoji: "🗣️", arabic: "لكنة" },
      { word: "Spelling difference", meaning: "Words spelled differently in US/UK", example: "'Colour' (UK) vs 'color' (US).", emoji: "✏️", arabic: "فرق إملائي" },
      { word: "Intonation pattern", meaning: "The melody of speech", example: "British and American intonation differ.", emoji: "🎶", arabic: "نمط تنغيم" },
    ],
    dialogue: [
      { speaker: "Student", text: "Should I learn British or American pronunciation?" },
      { speaker: "Teacher", text: "Both are correct! Choose one and be consistent." },
      { speaker: "Student", text: "What's the biggest difference?" },
      { speaker: "Teacher", text: "The /r/ sound. Americans say 'car' with /r/, British don't." },
      { speaker: "Student", text: "And 'water' sounds different too — Americans say 'wader'!" },
    ],
    grammar: {
      title: "Key Sound Differences: RP vs GA",
      explanation: "The main differences are: rhoticity, the BATH vowel, T-flapping, and the LOT vowel.",
      examples: [
        { sentence: "Car: /kɑː/ (UK) vs /kɑːr/ (US)", note: "Rhotic vs non-rhotic" },
        { sentence: "Bath: /bɑːθ/ (UK) vs /bæθ/ (US)", note: "BATH vowel difference" },
        { sentence: "Water: /wɔːtə/ (UK) vs /wɑːɾər/ (US)", note: "T-flapping in American" },
        { sentence: "Hot: /hɒt/ (UK) vs /hɑːt/ (US)", note: "LOT vowel: rounded vs unrounded" },
      ],
    },
    vocabExercises: [
      { question: "'Rhotic' means:", options: ["Dropping /r/", "Pronouncing /r/ after vowels", "Speaking fast", "A British accent"], correct: 1 },
      { question: "T-flapping makes /t/ sound like:", options: ["/s/", "/d/", "/θ/", "/k/"], correct: 1 },
    ],
    conversationExercises: [
      { question: "Which is rhotic?", options: ["British RP", "American GA", "Both", "Neither"], correct: 1 },
    ],
    grammarExercises: [
      { question: "British say 'bath' as:", options: ["/bæθ/", "/bɑːθ/", "/beɪθ/", "/bɒθ/"], correct: 1 },
    ],
    examQuestions: [
      { question: "'RP' stands for:", options: ["Real Pronunciation", "Received Pronunciation", "Regular Pattern", "Reading Practice"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Colour' vs 'color' is a:", options: ["Sound difference", "Spelling difference", "Grammar difference", "Meaning difference"], correct: 1 },
    ],
  },
  "fluency-6": {
    levelId: "fluency", levelLabel: "Fluency Development", lessonNumber: 6,
    title: "Thinking in English",
    description: "Train your brain to think directly in English without translating.",
    vocabulary: [
      { word: "Inner voice", meaning: "The voice inside your head", example: "Try using your inner voice in English.", emoji: "🧠", arabic: "صوت داخلي" },
      { word: "Mental translation", meaning: "Converting from your language to English", example: "Avoid mental translation for speed.", emoji: "🔄", arabic: "ترجمة ذهنية" },
      { word: "Automaticity", meaning: "Doing something without conscious thought", example: "Fluency comes from automaticity.", emoji: "⚡", arabic: "تلقائية" },
      { word: "Immersion", meaning: "Surrounding yourself with the language", example: "Immersion is the fastest way to learn.", emoji: "🌊", arabic: "انغماس" },
      { word: "Label", meaning: "To name objects in a language", example: "Label things around your room in English.", emoji: "🏷️", arabic: "يُسمّي" },
      { word: "Narrate", meaning: "To describe what you're doing", example: "Narrate your daily routine in English.", emoji: "🎙️", arabic: "يروي" },
      { word: "Visualize", meaning: "To picture something in your mind", example: "Visualize the word with its meaning.", emoji: "🖼️", arabic: "يتصور" },
      { word: "Associate", meaning: "To connect ideas together", example: "Associate new words with images.", emoji: "🔗", arabic: "يربط" },
      { word: "Chunk", meaning: "A group of words used together", example: "'By the way' is a common chunk.", emoji: "📦", arabic: "مجموعة لفظية" },
      { word: "Reflex", meaning: "An automatic response", example: "Make English responses a reflex.", emoji: "⚡", arabic: "رد فعل" },
    ],
    dialogue: [
      { speaker: "Coach", text: "What did you have for breakfast? Answer without translating first." },
      { speaker: "Student", text: "I had... eggs and toast with tea!" },
      { speaker: "Coach", text: "Great! You answered in 2 seconds. No translation needed." },
      { speaker: "Student", text: "But for complex ideas, I still translate in my head." },
      { speaker: "Coach", text: "That's normal. The key is to practice narrating your daily life in English." },
    ],
    grammar: {
      title: "Techniques for Thinking in English",
      explanation: "Replace mental translation with these strategies: label objects, narrate actions, use chunks, and visualize meanings.",
      examples: [
        { sentence: "Label your room: 'door', 'window', 'chair'.", note: "Direct word-object association" },
        { sentence: "Narrate: 'I'm making coffee. I'm adding sugar.'", note: "Describe actions as you do them" },
        { sentence: "Use chunks: 'on the other hand', 'as a matter of fact'.", note: "Think in phrases, not single words" },
        { sentence: "Visualize: See a picture for 'freedom' instead of translating.", note: "Image-to-word, skip translation" },
      ],
    },
    vocabExercises: [
      { question: "'Automaticity' means:", options: ["Being robotic", "Doing without conscious thought", "Memorizing", "Translating"], correct: 1 },
      { question: "A 'chunk' is:", options: ["A single word", "A group of words used together", "A grammar rule", "A type of food"], correct: 1 },
    ],
    conversationExercises: [
      { question: "The best way to stop translating is:", options: ["Study grammar", "Practice thinking in English", "Use a dictionary more", "Speak slower"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'By the way' is an example of:", options: ["A grammar rule", "A chunk/phrase", "A word", "A translation"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Immersion' means:", options: ["Studying textbooks", "Surrounding yourself with the language", "Taking exams", "Memorizing lists"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "To 'narrate' means:", options: ["To write", "To describe what you're doing", "To listen", "To memorize"], correct: 1 },
    ],
  },
  "fluency-7": {
    levelId: "fluency", levelLabel: "Fluency Development", lessonNumber: 7,
    title: "Speed & Reaction in Conversation",
    description: "Build faster response times and reduce hesitation in real conversations.",
    vocabulary: [
      { word: "Hesitation", meaning: "Pausing before speaking", example: "Reduce hesitation by practicing.", emoji: "⏸️", arabic: "تردد" },
      { word: "Response time", meaning: "How quickly you reply", example: "Fast response time shows fluency.", emoji: "⏱️", arabic: "زمن الاستجابة" },
      { word: "Placeholder", meaning: "A word used while thinking", example: "'Well...' is a placeholder.", emoji: "💬", arabic: "كلمة مؤقتة" },
      { word: "Prepared answer", meaning: "A rehearsed response", example: "Have prepared answers for common questions.", emoji: "📋", arabic: "إجابة جاهزة" },
      { word: "Spontaneous", meaning: "Happening without planning", example: "Spontaneous speech shows true fluency.", emoji: "🎲", arabic: "تلقائي" },
      { word: "Drill", meaning: "Repetitive practice", example: "Drills build automatic responses.", emoji: "🔁", arabic: "تدريب مكرر" },
      { word: "Pattern", meaning: "A repeated structure", example: "Learn question-answer patterns.", emoji: "🔲", arabic: "نمط" },
      { word: "Instinct", meaning: "A natural automatic response", example: "Speaking with instinct means no translating.", emoji: "💡", arabic: "غريزة" },
      { word: "Confidence", meaning: "Belief in your ability", example: "Confidence reduces hesitation.", emoji: "💪", arabic: "ثقة" },
      { word: "Momentum", meaning: "Keeping speech going without stopping", example: "Maintain momentum — don't stop mid-sentence.", emoji: "🏃", arabic: "زخم" },
    ],
    dialogue: [
      { speaker: "Coach", text: "Quick! What's your favorite hobby?" },
      { speaker: "Student", text: "I love reading novels — especially mystery stories!" },
      { speaker: "Coach", text: "Why? Answer in 3 seconds!" },
      { speaker: "Student", text: "Because they keep me on the edge of my seat!" },
      { speaker: "Coach", text: "Excellent! Fast, natural, and confident. That's fluency!" },
    ],
    grammar: {
      title: "Strategies to Speak Faster",
      explanation: "Use ready-made phrases, simple structures first, then add detail. Don't aim for perfection — aim for communication.",
      examples: [
        { sentence: "Start simple: 'I like it because...'", note: "Use a basic frame, then expand" },
        { sentence: "Use fillers wisely: 'Well, actually...'", note: "Fillers buy time without silence" },
        { sentence: "Chunk responses: 'To be honest / As a matter of fact'", note: "Pre-loaded phrases boost speed" },
        { sentence: "Keep going: don't stop to self-correct minor errors.", note: "Momentum > perfection" },
      ],
    },
    vocabExercises: [
      { question: "'Momentum' in speaking means:", options: ["Speaking loudly", "Keeping speech going", "Translating fast", "Reading quickly"], correct: 1 },
      { question: "A 'placeholder' is:", options: ["A word used while thinking", "A final answer", "A grammar rule", "A pause"], correct: 0 },
    ],
    conversationExercises: [
      { question: "What builds faster responses?", options: ["More grammar study", "Repetitive practice drills", "Reading silently", "Watching TV"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Which strategy helps fluency?", options: ["Self-correct every error", "Use simple structures first", "Speak only when perfect", "Avoid fillers"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Spontaneous' speech is:", options: ["Memorized", "Planned", "Without planning", "Written down"], correct: 2 },
    ],
    homeworkQuestions: [
      { question: "'Drill' means:", options: ["A tool", "Repetitive practice", "A question", "A conversation"], correct: 1 },
    ],
  },
  "fluency-8": {
    levelId: "fluency", levelLabel: "Fluency Development", lessonNumber: 8,
    title: "Conversation Flow & Turn-Taking",
    description: "Learn natural conversation management — when to speak, listen, and respond.",
    vocabulary: [
      { word: "Turn-taking", meaning: "The system of who speaks when", example: "Good conversations have smooth turn-taking.", emoji: "🔄", arabic: "تبادل الأدوار" },
      { word: "Interrupt", meaning: "To start speaking while someone else is talking", example: "Don't interrupt — wait for a pause.", emoji: "✋", arabic: "يقاطع" },
      { word: "Back-channel", meaning: "Short responses showing you're listening", example: "'Uh-huh', 'right', 'I see' are back-channels.", emoji: "👂", arabic: "إشارات استماع" },
      { word: "Topic shift", meaning: "Moving to a new subject", example: "'By the way...' signals a topic shift.", emoji: "➡️", arabic: "تغيير موضوع" },
      { word: "Follow-up question", meaning: "A question based on what was just said", example: "Ask follow-up questions to show interest.", emoji: "❓", arabic: "سؤال متابعة" },
      { word: "Active listening", meaning: "Fully engaging with what you hear", example: "Active listening means eye contact and responses.", emoji: "🎧", arabic: "استماع فعّال" },
      { word: "Rapport", meaning: "A connection between speakers", example: "Build rapport with genuine interest.", emoji: "🤝", arabic: "علاقة ودية" },
      { word: "Conversation starter", meaning: "A sentence to begin chatting", example: "'How's your day going?' is a starter.", emoji: "🎬", arabic: "بادئ محادثة" },
      { word: "Wrap up", meaning: "To end a conversation politely", example: "'It was great talking to you!' wraps up.", emoji: "🏁", arabic: "يختتم" },
      { word: "Overlap", meaning: "Two people speaking at the same time", example: "Some overlap is natural in conversation.", emoji: "🔀", arabic: "تداخل" },
    ],
    dialogue: [
      { speaker: "Emma", text: "I just got back from a trip to Spain!" },
      { speaker: "You", text: "Oh wow! That sounds amazing — where did you go?" },
      { speaker: "Emma", text: "Barcelona mostly. The architecture was incredible." },
      { speaker: "You", text: "I've always wanted to visit! Did you see the Sagrada Familia?" },
      { speaker: "Emma", text: "Yes! It was breathtaking. You should definitely go." },
    ],
    grammar: {
      title: "Conversation Management Phrases",
      explanation: "Use specific phrases to manage conversations: start topics, show interest, change subjects, and end politely.",
      examples: [
        { sentence: "Follow-up: 'What was that like?'", note: "Shows genuine interest" },
        { sentence: "Back-channel: 'I see', 'Right', 'That makes sense'", note: "Shows active listening" },
        { sentence: "Topic shift: 'Speaking of which...', 'That reminds me...'", note: "Smooth transition to new topic" },
        { sentence: "Wrap up: 'Anyway, I should get going. Great chat!'", note: "Polite conversation ending" },
      ],
    },
    vocabExercises: [
      { question: "'Back-channel' responses include:", options: ["Long speeches", "'Uh-huh', 'I see'", "Questions", "Arguments"], correct: 1 },
      { question: "'Turn-taking' is:", options: ["A game", "Who speaks when", "A grammar rule", "An exercise"], correct: 1 },
    ],
    conversationExercises: [
      { question: "How do you show active listening?", options: ["Look at your phone", "Say 'uh-huh' and nod", "Interrupt", "Stay silent"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Which phrase shifts the topic?", options: ["I agree", "Speaking of which...", "That's right", "Goodbye"], correct: 1 },
    ],
    examQuestions: [
      { question: "A 'follow-up question' is:", options: ["The first question", "Based on what was said", "A random question", "A test question"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Wrap up' means:", options: ["To start", "To end politely", "To argue", "To listen"], correct: 1 },
    ],
  },
  "fluency-9": {
    levelId: "fluency", levelLabel: "Fluency Development", lessonNumber: 9,
    title: "Expressing Complex Ideas Simply",
    description: "Learn to communicate complex thoughts using clear, simple English.",
    vocabulary: [
      { word: "Simplify", meaning: "To make something easier to understand", example: "Simplify your explanation for clarity.", emoji: "✨", arabic: "يُبسّط" },
      { word: "Clarify", meaning: "To make something clearer", example: "Let me clarify what I mean.", emoji: "🔍", arabic: "يوضّح" },
      { word: "Rephrase", meaning: "To say the same thing differently", example: "Can I rephrase that? I mean...", emoji: "🔄", arabic: "يُعيد صياغة" },
      { word: "Analogy", meaning: "A comparison to explain something", example: "The brain is like a computer — that's an analogy.", emoji: "🔗", arabic: "تشبيه" },
      { word: "Example", meaning: "A specific case to illustrate a point", example: "For example, consider this situation.", emoji: "📌", arabic: "مثال" },
      { word: "Core idea", meaning: "The main point", example: "Focus on the core idea first.", emoji: "🎯", arabic: "فكرة جوهرية" },
      { word: "Summarize", meaning: "To give a brief overview", example: "Can you summarize in one sentence?", emoji: "📋", arabic: "يلخّص" },
      { word: "Concrete", meaning: "Specific and tangible", example: "Use concrete examples, not abstract ideas.", emoji: "🧱", arabic: "ملموس" },
      { word: "Abstract", meaning: "Theoretical, not physical", example: "'Freedom' is an abstract concept.", emoji: "☁️", arabic: "مجرد" },
      { word: "Breakdown", meaning: "A step-by-step explanation", example: "Give me a breakdown of the process.", emoji: "📊", arabic: "تحليل" },
    ],
    dialogue: [
      { speaker: "Friend", text: "Can you explain how the internet works?" },
      { speaker: "You", text: "Sure! Think of it like a postal system — your computer sends 'letters' to other computers." },
      { speaker: "Friend", text: "Oh, like digital mail?" },
      { speaker: "You", text: "Exactly! The 'letters' are data packets, and routers are like post offices that direct them." },
      { speaker: "Friend", text: "That analogy makes it so clear!" },
    ],
    grammar: {
      title: "Simplification Strategies",
      explanation: "Use short sentences, analogies, examples, and step-by-step breakdowns to explain complex ideas clearly.",
      examples: [
        { sentence: "Use analogies: 'DNA is like a recipe book for your body.'", note: "Familiar comparison = instant understanding" },
        { sentence: "Break it down: 'First... Then... Finally...'", note: "Step-by-step structure" },
        { sentence: "Use 'in other words': 'The economy contracted — in other words, it shrank.'", note: "Rephrase for clarity" },
        { sentence: "Give examples: 'For instance, consider how...'", note: "Concrete beats abstract" },
      ],
    },
    vocabExercises: [
      { question: "An 'analogy' is:", options: ["A definition", "A comparison to explain", "A question", "A summary"], correct: 1 },
      { question: "'Concrete' means:", options: ["Abstract", "Specific and tangible", "Difficult", "Long"], correct: 1 },
    ],
    conversationExercises: [
      { question: "The best way to explain a complex idea is:", options: ["Use big words", "Use analogies and examples", "Talk faster", "Skip details"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'In other words' is used to:", options: ["Start a new topic", "Rephrase for clarity", "Conclude", "Ask a question"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Breakdown' means:", options: ["A failure", "A step-by-step explanation", "A summary", "An example"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "To 'clarify' means:", options: ["To confuse", "To make clearer", "To summarize", "To rephrase"], correct: 1 },
    ],
  },
  "fluency-10": {
    levelId: "fluency", levelLabel: "Fluency Development", lessonNumber: 10,
    title: "Maintaining a Long Conversation",
    description: "Build endurance for extended English conversations without running out of things to say.",
    vocabulary: [
      { word: "Endurance", meaning: "The ability to keep going for a long time", example: "Conversational endurance improves with practice.", emoji: "🏃", arabic: "تحمّل" },
      { word: "Tangent", meaning: "Going off-topic briefly", example: "She went on a tangent about her cat.", emoji: "↗️", arabic: "استطراد" },
      { word: "Anecdote", meaning: "A short personal story", example: "Share an anecdote to keep it interesting.", emoji: "📖", arabic: "حكاية" },
      { word: "Elaborate", meaning: "To add more detail", example: "Can you elaborate on that?", emoji: "➕", arabic: "يُفصّل" },
      { word: "Segue", meaning: "A smooth transition between topics", example: "That's a perfect segue to my next point.", emoji: "➡️", arabic: "انتقال سلس" },
      { word: "Engage", meaning: "To actively participate", example: "Engage your listener with questions.", emoji: "🎯", arabic: "يُشرك" },
      { word: "Reciprocate", meaning: "To return the same kind of action", example: "If they ask you a question, reciprocate.", emoji: "🔄", arabic: "يبادل" },
      { word: "Depth", meaning: "Going deeper into a topic", example: "Add depth by sharing personal experiences.", emoji: "🌊", arabic: "عمق" },
      { word: "Surface-level", meaning: "Basic, not detailed", example: "Move beyond surface-level small talk.", emoji: "🏊", arabic: "سطحي" },
      { word: "Thread", meaning: "A line of conversation to follow", example: "Pick up a conversation thread from earlier.", emoji: "🧵", arabic: "خيط محادثة" },
    ],
    dialogue: [
      { speaker: "Ali", text: "What do you think about working remotely?" },
      { speaker: "Sara", text: "I love it! The flexibility is amazing. But I do miss office social life." },
      { speaker: "Ali", text: "That's interesting — that reminds me of a study I read about loneliness in remote workers." },
      { speaker: "Sara", text: "Oh really? Can you elaborate on that?" },
      { speaker: "Ali", text: "Sure! It said that regular video calls and coworking days can really help. Speaking of which, have you tried coworking spaces?" },
    ],
    grammar: {
      title: "Techniques for Extended Conversations",
      explanation: "Use these strategies to keep conversations going: elaborate, share anecdotes, ask follow-ups, and make smooth segues.",
      examples: [
        { sentence: "Elaborate: 'What I mean is...' or 'To give you an idea...'", note: "Adds depth to your point" },
        { sentence: "Anecdote: 'That reminds me of when I...'", note: "Personal stories keep it engaging" },
        { sentence: "Segue: 'Speaking of which...', 'On a related note...'", note: "Smooth topic transitions" },
        { sentence: "Reciprocate: 'What about you? Have you ever...?'", note: "Keep the other person talking too" },
      ],
    },
    vocabExercises: [
      { question: "A 'segue' is:", options: ["A vehicle", "A smooth transition", "A question", "An ending"], correct: 1 },
      { question: "'Reciprocate' means:", options: ["To argue", "To return the same action", "To leave", "To agree"], correct: 1 },
    ],
    conversationExercises: [
      { question: "How do you add depth to a conversation?", options: ["Give one-word answers", "Share personal experiences", "Change the subject often", "Stay quiet"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'Speaking of which...' is a:", options: ["Conclusion", "Segue", "Question", "Greeting"], correct: 1 },
    ],
    examQuestions: [
      { question: "A 'tangent' is:", options: ["Staying on topic", "Going off-topic briefly", "Ending a chat", "Starting a chat"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Surface-level' conversation is:", options: ["Deep and detailed", "Basic, not detailed", "Emotional", "Private"], correct: 1 },
    ],
  },
};
