import type { LessonData, MCQItem, VocabWord } from "./lessons";

/**
 * English Phonics Course — 20 lessons covering the complete English
 * phonics scope & sequence: letter sounds → blends → digraphs → magic e →
 * vowel teams → r-controlled → diphthongs → soft sounds → silent letters →
 * syllables & suffixes.
 *
 * Lesson content is authored as structured sound data; exercises are built
 * from that data so every lesson has the same rich structure as the rest of
 * the platform (vocab, dialogue, grammar, 5 exercise banks).
 */

type PWord = { w: string; meaning: string; arabic: string; emoji: string };
type SoundGroup = { grapheme: string; ipa: string; hint: string; words: PWord[] };

type PhonicsSpec = {
  n: number;
  title: string;
  description: string;
  rule: { title: string; explanation: string; examples: { sentence: string; note: string }[] };
  groups: SoundGroup[];
  dialogue: { speaker: string; text: string }[];
};

const SPECS: PhonicsSpec[] = [
  {
    n: 1,
    title: "Letter Sounds 1 — s, a, t, p, i, n",
    description: "The first six letter sounds. Blend them to read your first real words.",
    rule: {
      title: "Blending two and three sounds",
      explanation:
        "Phonics reading means saying each sound in order and pushing them together: /s/ /a/ /t/ → 'sat'. Never say the letter name when you blend — say the sound. Keep consonant sounds short: /t/, not 'tuh'.",
      examples: [
        { sentence: "/s/ /a/ /t/ → sat", note: "Three sounds blended left to right" },
        { sentence: "/p/ /i/ /n/ → pin", note: "Short i sits in the middle" },
        { sentence: "/t/ /a/ /p/ → tap", note: "Change the last sound and you change the word" },
        { sentence: "/n/ /a/ /p/ → nap", note: "Same vowel, new beginning sound" },
      ],
    },
    groups: [
      {
        grapheme: "a", ipa: "/æ/", hint: "short a as in cat — open your mouth wide",
        words: [
          { w: "sat", meaning: "past of sit", arabic: "جلس", emoji: "🪑" },
          { w: "tap", meaning: "to hit lightly; a water tap", arabic: "صنبور", emoji: "🚰" },
          { w: "nap", meaning: "a short sleep", arabic: "قيلولة", emoji: "😴" },
          { w: "pan", meaning: "a flat cooking dish", arabic: "مقلاة", emoji: "🍳" },
          { w: "ant", meaning: "a small insect", arabic: "نملة", emoji: "🐜" },
        ],
      },
      {
        grapheme: "i", ipa: "/ɪ/", hint: "short i as in sit — a quick, small sound",
        words: [
          { w: "sit", meaning: "to rest on a chair", arabic: "يجلس", emoji: "🪑" },
          { w: "pin", meaning: "a thin sharp metal point", arabic: "دبوس", emoji: "📌" },
          { w: "tin", meaning: "a metal can", arabic: "علبة معدنية", emoji: "🥫" },
          { w: "nip", meaning: "a small quick bite", arabic: "قرصة", emoji: "🤏" },
          { w: "tip", meaning: "the pointed end; advice", arabic: "طرف / نصيحة", emoji: "💡" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Look at the word 'sat'. Say each sound: /s/ /a/ /t/." },
      { speaker: "Student", text: "/s/ /a/ /t/ — sat!" },
      { speaker: "Teacher", text: "Excellent blending. Now change /s/ to /p/. What word is it?" },
      { speaker: "Student", text: "/p/ /a/ /t/ — pat!" },
      { speaker: "Teacher", text: "You just read two words with only six letter sounds." },
    ],
  },
  {
    n: 2,
    title: "Letter Sounds 2 — c, k, e, h, r, m, d",
    description: "Seven more single-letter sounds, plus the short e vowel.",
    rule: {
      title: "When to use c and when to use k",
      explanation:
        "The sound /k/ has two common spellings. Use 'c' before a, o, u (cat, cot, cup). Use 'k' before e, i, y (kettle, kid, sky). This one rule removes most /k/ spelling mistakes.",
      examples: [
        { sentence: "cat, cot, cup", note: "c before a, o, u" },
        { sentence: "kid, kettle, key", note: "k before e, i, y" },
        { sentence: "The cat sat on the mat.", note: "Every word here is decodable" },
        { sentence: "Ken had a red pen.", note: "Short e twice: /e/" },
      ],
    },
    groups: [
      {
        grapheme: "e", ipa: "/e/", hint: "short e as in bed — lips slightly open",
        words: [
          { w: "red", meaning: "the colour of blood", arabic: "أحمر", emoji: "🔴" },
          { w: "hen", meaning: "a female chicken", arabic: "دجاجة", emoji: "🐔" },
          { w: "pen", meaning: "a tool for writing", arabic: "قلم", emoji: "🖊️" },
          { w: "bed", meaning: "where you sleep", arabic: "سرير", emoji: "🛏️" },
          { w: "ten", meaning: "the number 10", arabic: "عشرة", emoji: "🔟" },
        ],
      },
      {
        grapheme: "c / k", ipa: "/k/", hint: "a short sound made at the back of the mouth",
        words: [
          { w: "cat", meaning: "a small pet animal", arabic: "قطة", emoji: "🐱" },
          { w: "cap", meaning: "a soft hat", arabic: "قبعة", emoji: "🧢" },
          { w: "kid", meaning: "a child", arabic: "طفل", emoji: "🧒" },
          { w: "kit", meaning: "a set of tools", arabic: "طقم", emoji: "🧰" },
          { w: "mad", meaning: "very angry", arabic: "غاضب", emoji: "😠" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Why do we write 'cat' with c, but 'kid' with k?" },
      { speaker: "Student", text: "Because c comes before a, o and u." },
      { speaker: "Teacher", text: "And k comes before…?" },
      { speaker: "Student", text: "Before e, i and y — like kettle, kid and sky." },
      { speaker: "Teacher", text: "Perfect. Now read: Ken kept ten red pens." },
    ],
  },
  {
    n: 3,
    title: "Letter Sounds 3 — g, o, u, l, f, b",
    description: "Short o and short u complete the five short vowels.",
    rule: {
      title: "The five short vowels",
      explanation:
        "Every English short vowel is one quick sound: a /æ/, e /e/, i /ɪ/, o /ɒ/, u /ʌ/. A word with one vowel letter between two consonants almost always uses the short sound: hop, hug, bed.",
      examples: [
        { sentence: "hat — het — hit — hot — hut", note: "One vowel changed five times" },
        { sentence: "The dog got a big log.", note: "Short o three times" },
        { sentence: "Gus cut the bun.", note: "Short u three times" },
        { sentence: "Bob fell off the bus.", note: "Short o then short u" },
      ],
    },
    groups: [
      {
        grapheme: "o", ipa: "/ɒ/", hint: "short o as in dog — round your lips a little",
        words: [
          { w: "dog", meaning: "a friendly pet animal", arabic: "كلب", emoji: "🐕" },
          { w: "log", meaning: "a thick piece of wood", arabic: "جذع", emoji: "🪵" },
          { w: "box", meaning: "a container", arabic: "صندوق", emoji: "📦" },
          { w: "hop", meaning: "to jump on one foot", arabic: "يقفز", emoji: "🐰" },
          { w: "pot", meaning: "a deep cooking dish", arabic: "قدر", emoji: "🍲" },
        ],
      },
      {
        grapheme: "u", ipa: "/ʌ/", hint: "short u as in cup — relaxed and low",
        words: [
          { w: "cup", meaning: "a small drinking container", arabic: "كوب", emoji: "☕" },
          { w: "bus", meaning: "a large road vehicle", arabic: "حافلة", emoji: "🚌" },
          { w: "bug", meaning: "a small insect", arabic: "حشرة", emoji: "🐞" },
          { w: "sun", meaning: "the star that gives us light", arabic: "شمس", emoji: "☀️" },
          { w: "fun", meaning: "enjoyment", arabic: "متعة", emoji: "🎉" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Read this list: hat, hit, hot, hut." },
      { speaker: "Student", text: "Only the vowel changes each time." },
      { speaker: "Teacher", text: "Exactly. The vowel is the engine of the word." },
      { speaker: "Student", text: "So if I hear the vowel clearly, I can spell the word." },
      { speaker: "Teacher", text: "That is the heart of phonics." },
    ],
  },
  {
    n: 4,
    title: "Letter Sounds 4 — j, v, w, x, y, z, qu",
    description: "The last single-letter sounds, including the tricky qu pair.",
    rule: {
      title: "qu, x and y",
      explanation:
        "Three letters behave unusually. 'q' never travels alone — it is always 'qu' and says /kw/. 'x' is two sounds, /ks/. 'y' is a consonant /j/ at the start of a word (yes) but a vowel at the end (happy, my).",
      examples: [
        { sentence: "The queen asked a quick question.", note: "qu = /kw/ every time" },
        { sentence: "Six foxes in a box.", note: "x = /ks/" },
        { sentence: "Yes, you may.", note: "y as a consonant at the start" },
        { sentence: "The baby is happy.", note: "y as a vowel /i/ at the end" },
      ],
    },
    groups: [
      {
        grapheme: "qu", ipa: "/kw/", hint: "q always brings u with it",
        words: [
          { w: "quiz", meaning: "a short test", arabic: "اختبار قصير", emoji: "❓" },
          { w: "quit", meaning: "to stop doing something", arabic: "يتوقف", emoji: "🛑" },
          { w: "queen", meaning: "a female ruler", arabic: "ملكة", emoji: "👑" },
          { w: "quick", meaning: "fast", arabic: "سريع", emoji: "⚡" },
          { w: "quilt", meaning: "a thick warm blanket", arabic: "لحاف", emoji: "🛏️" },
        ],
      },
      {
        grapheme: "x / y / z", ipa: "/ks/, /j/, /z/", hint: "three unusual letters",
        words: [
          { w: "fox", meaning: "a wild animal like a small dog", arabic: "ثعلب", emoji: "🦊" },
          { w: "six", meaning: "the number 6", arabic: "ستة", emoji: "6️⃣" },
          { w: "yes", meaning: "the opposite of no", arabic: "نعم", emoji: "✅" },
          { w: "zip", meaning: "a fastener on clothes", arabic: "سحاب", emoji: "🧥" },
          { w: "van", meaning: "a small truck", arabic: "شاحنة صغيرة", emoji: "🚐" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Can 'q' ever stand alone in an English word?" },
      { speaker: "Student", text: "No — it always has u after it, and they say /kw/." },
      { speaker: "Teacher", text: "Right. And how many sounds are in 'fox'?" },
      { speaker: "Student", text: "Four: /f/ /o/ /k/ /s/, because x is two sounds." },
      { speaker: "Teacher", text: "Excellent listening." },
    ],
  },
  {
    n: 5,
    title: "Checkpoint — All 26 Letter Sounds",
    description: "Review every single-letter sound and read your first sentences.",
    rule: {
      title: "One letter, one sound — the alphabetic code",
      explanation:
        "You now know all 26 letter sounds. Reading is decoding: turn letters into sounds and blend. Spelling is encoding: turn sounds into letters. Every later lesson simply adds new spellings for sounds you already know.",
      examples: [
        { sentence: "The big red bus is fun.", note: "Every word is fully decodable" },
        { sentence: "A fox ran up the hill.", note: "Short vowels only" },
        { sentence: "Tom had ten hot buns.", note: "Blend, don't guess" },
        { sentence: "Did the dog dig in the mud?", note: "Question with short vowels" },
      ],
    },
    groups: [
      {
        grapheme: "review", ipa: "consonants", hint: "consonant sounds you have mastered",
        words: [
          { w: "hill", meaning: "a small mountain", arabic: "تل", emoji: "⛰️" },
          { w: "mud", meaning: "wet soil", arabic: "طين", emoji: "🟤" },
          { w: "bell", meaning: "an object that rings", arabic: "جرس", emoji: "🔔" },
          { w: "duck", meaning: "a water bird", arabic: "بطة", emoji: "🦆" },
          { w: "jam", meaning: "sweet fruit spread", arabic: "مربى", emoji: "🍓" },
        ],
      },
      {
        grapheme: "review", ipa: "short vowels", hint: "a, e, i, o, u",
        words: [
          { w: "bag", meaning: "something you carry things in", arabic: "حقيبة", emoji: "👜" },
          { w: "net", meaning: "a mesh for catching things", arabic: "شبكة", emoji: "🥅" },
          { w: "lip", meaning: "part of the mouth", arabic: "شفة", emoji: "👄" },
          { w: "top", meaning: "the highest part", arabic: "قمة", emoji: "🔝" },
          { w: "run", meaning: "to move fast on foot", arabic: "يجري", emoji: "🏃" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Read this sentence: The big red bus is fun." },
      { speaker: "Student", text: "I read every word without help!" },
      { speaker: "Teacher", text: "That is 26 sounds working together. What comes next?" },
      { speaker: "Student", text: "Words with two consonants together?" },
      { speaker: "Teacher", text: "Yes — blends. That is our next lesson." },
    ],
  },
  {
    n: 6,
    title: "Beginning Blends — bl, cl, fl, gl, pl, sl",
    description: "Two consonants side by side, each keeping its own sound.",
    rule: {
      title: "A blend is not a new sound",
      explanation:
        "In a blend, you hear both letters: 'flag' is /f/ /l/ /a/ /g/. This is different from a digraph, where two letters make one new sound. Stretch the first consonant, then slide into the second.",
      examples: [
        { sentence: "The black flag is flat.", note: "bl and fl blends" },
        { sentence: "Please clap for the class.", note: "pl and cl blends" },
        { sentence: "The glass slid off the shelf.", note: "gl and sl blends" },
        { sentence: "A plum fell on the plate.", note: "pl twice" },
      ],
    },
    groups: [
      {
        grapheme: "bl / cl / fl", ipa: "/bl/, /kl/, /fl/", hint: "l-blends at the start",
        words: [
          { w: "black", meaning: "the darkest colour", arabic: "أسود", emoji: "⚫" },
          { w: "clap", meaning: "to hit your hands together", arabic: "يصفق", emoji: "👏" },
          { w: "flag", meaning: "a cloth symbol of a country", arabic: "علم", emoji: "🚩" },
          { w: "block", meaning: "a solid piece; to stop", arabic: "كتلة", emoji: "🧱" },
          { w: "flat", meaning: "level, not bumpy", arabic: "مسطح", emoji: "📏" },
        ],
      },
      {
        grapheme: "gl / pl / sl", ipa: "/ɡl/, /pl/, /sl/", hint: "more l-blends",
        words: [
          { w: "glad", meaning: "happy", arabic: "سعيد", emoji: "😊" },
          { w: "glass", meaning: "a clear hard material", arabic: "زجاج", emoji: "🥛" },
          { w: "plan", meaning: "an idea for the future", arabic: "خطة", emoji: "🗒️" },
          { w: "plum", meaning: "a soft purple fruit", arabic: "برقوق", emoji: "🍑" },
          { w: "slip", meaning: "to slide and lose balance", arabic: "ينزلق", emoji: "🩴" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "How many sounds do you hear in 'flag'?" },
      { speaker: "Student", text: "Four: /f/ /l/ /a/ /g/." },
      { speaker: "Teacher", text: "So in a blend, do the letters lose their sound?" },
      { speaker: "Student", text: "No — I can still hear both of them." },
      { speaker: "Teacher", text: "That is exactly how a blend works." },
    ],
  },
  {
    n: 7,
    title: "s-Blends and Final Blends — st, sp, sn, nd, mp, nt",
    description: "Blends at the beginning and at the end of words.",
    rule: {
      title: "Blends can close a word too",
      explanation:
        "Blends appear at the start (stop, snail) and at the end (hand, jump, tent). End blends are often missed by learners — say the final two sounds clearly: han-d, jum-p.",
      examples: [
        { sentence: "Stop and stand still.", note: "st at the start and nd at the end" },
        { sentence: "I sent a gift in a tent.", note: "nt end blend twice" },
        { sentence: "The lamp is on the desk.", note: "mp and sk end blends" },
        { sentence: "She spun and jumped.", note: "sp start blend, mp end blend" },
      ],
    },
    groups: [
      {
        grapheme: "st / sp / sn / sk", ipa: "/st/, /sp/, /sn/, /sk/", hint: "s-blends open the word",
        words: [
          { w: "stop", meaning: "to end movement", arabic: "يتوقف", emoji: "🛑" },
          { w: "star", meaning: "a light in the night sky", arabic: "نجمة", emoji: "⭐" },
          { w: "spin", meaning: "to turn around fast", arabic: "يدور", emoji: "🌀" },
          { w: "snack", meaning: "a small meal", arabic: "وجبة خفيفة", emoji: "🍿" },
          { w: "skin", meaning: "the cover of your body", arabic: "جلد", emoji: "🖐️" },
        ],
      },
      {
        grapheme: "nd / mp / nt / st", ipa: "final blends", hint: "blends that close the word",
        words: [
          { w: "hand", meaning: "the end of your arm", arabic: "يد", emoji: "✋" },
          { w: "jump", meaning: "to push off the ground", arabic: "يقفز", emoji: "🦘" },
          { w: "tent", meaning: "a cloth shelter", arabic: "خيمة", emoji: "⛺" },
          { w: "nest", meaning: "a bird's home", arabic: "عش", emoji: "🪺" },
          { w: "lamp", meaning: "a light you can move", arabic: "مصباح", emoji: "💡" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Say 'hand' slowly and count the sounds." },
      { speaker: "Student", text: "/h/ /a/ /n/ /d/ — four." },
      { speaker: "Teacher", text: "Many learners say 'han'. Why is the /d/ important?" },
      { speaker: "Student", text: "Because 'han' is not a word — the blend finishes it." },
      { speaker: "Teacher", text: "Well explained." },
    ],
  },
  {
    n: 8,
    title: "Digraphs 1 — sh and ch",
    description: "Two letters that leave their own sounds behind and make one new sound.",
    rule: {
      title: "A digraph makes one sound",
      explanation:
        "Unlike a blend, a digraph's two letters make a single sound. 'sh' = /ʃ/ (ship). 'ch' = /tʃ/ (chair). Both can start or end a word: shop, fish, chin, much.",
      examples: [
        { sentence: "The fish is in the shop.", note: "sh at the start and at the end" },
        { sentence: "Chad sat on a chair.", note: "ch at the start" },
        { sentence: "I ate too much lunch.", note: "ch at the end twice" },
        { sentence: "She will wash the dish.", note: "sh three times" },
      ],
    },
    groups: [
      {
        grapheme: "sh", ipa: "/ʃ/", hint: "the quiet sound — like asking for silence",
        words: [
          { w: "ship", meaning: "a large boat", arabic: "سفينة", emoji: "🚢" },
          { w: "shop", meaning: "a place to buy things", arabic: "متجر", emoji: "🏬" },
          { w: "fish", meaning: "an animal that lives in water", arabic: "سمكة", emoji: "🐟" },
          { w: "wash", meaning: "to clean with water", arabic: "يغسل", emoji: "🧼" },
          { w: "shell", meaning: "the hard cover of a sea animal", arabic: "صدفة", emoji: "🐚" },
        ],
      },
      {
        grapheme: "ch", ipa: "/tʃ/", hint: "like a train starting: ch-ch-ch",
        words: [
          { w: "chair", meaning: "a seat with a back", arabic: "كرسي", emoji: "🪑" },
          { w: "chin", meaning: "the bottom of your face", arabic: "ذقن", emoji: "🙂" },
          { w: "cheese", meaning: "a food made from milk", arabic: "جبن", emoji: "🧀" },
          { w: "lunch", meaning: "the midday meal", arabic: "غداء", emoji: "🍱" },
          { w: "much", meaning: "a large amount", arabic: "كثير", emoji: "📊" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Is 'sh' a blend or a digraph?" },
      { speaker: "Student", text: "A digraph — I hear one sound, not /s/ and /h/." },
      { speaker: "Teacher", text: "Good. Read: She sells shells by the shore." },
      { speaker: "Student", text: "That sentence is full of /ʃ/!" },
      { speaker: "Teacher", text: "Now try: Chad chose cheap cheese." },
    ],
  },
  {
    n: 9,
    title: "Digraphs 2 — th, wh, ph, ck, ng",
    description: "Voiced and unvoiced th, plus the other essential digraphs.",
    rule: {
      title: "Two kinds of th",
      explanation:
        "'th' has a quiet, unvoiced sound /θ/ (think, bath) and a buzzing, voiced sound /ð/ (this, mother). Put your fingers on your throat: if it vibrates, it is voiced. 'ph' says /f/, 'ck' says /k/ after a short vowel, and 'ng' says /ŋ/.",
      examples: [
        { sentence: "I think this is thin.", note: "Unvoiced /θ/ then voiced /ð/" },
        { sentence: "The phone photo is clear.", note: "ph = /f/" },
        { sentence: "The duck is stuck.", note: "ck after a short vowel" },
        { sentence: "The king is singing.", note: "ng = /ŋ/" },
      ],
    },
    groups: [
      {
        grapheme: "th", ipa: "/θ/ and /ð/", hint: "tongue between the teeth",
        words: [
          { w: "think", meaning: "to use your mind", arabic: "يفكر", emoji: "🤔" },
          { w: "thin", meaning: "not thick", arabic: "رفيع", emoji: "📏" },
          { w: "bath", meaning: "washing your whole body", arabic: "حمام", emoji: "🛁" },
          { w: "this", meaning: "the thing near you", arabic: "هذا", emoji: "👉" },
          { w: "mother", meaning: "a female parent", arabic: "أم", emoji: "👩" },
        ],
      },
      {
        grapheme: "wh / ph / ck / ng", ipa: "/w/, /f/, /k/, /ŋ/", hint: "four more one-sound teams",
        words: [
          { w: "when", meaning: "at what time", arabic: "متى", emoji: "⏰" },
          { w: "wheel", meaning: "a round part that turns", arabic: "عجلة", emoji: "🛞" },
          { w: "phone", meaning: "a device for calling", arabic: "هاتف", emoji: "📱" },
          { w: "duck", meaning: "a water bird", arabic: "بطة", emoji: "🦆" },
          { w: "king", meaning: "a male ruler", arabic: "ملك", emoji: "🤴" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Put your hand on your throat and say 'think'." },
      { speaker: "Student", text: "No vibration — it is quiet." },
      { speaker: "Teacher", text: "Now say 'this'." },
      { speaker: "Student", text: "It buzzes! Same letters, different sound." },
      { speaker: "Teacher", text: "That is voiced and unvoiced th." },
    ],
  },
  {
    n: 10,
    title: "Magic e 1 — a_e and i_e",
    description: "The silent e that changes the vowel into its own name.",
    rule: {
      title: "Silent e makes the vowel say its name",
      explanation:
        "Add e to the end and the vowel becomes long: cap → cape, kit → kite. The e is never pronounced; it jumps back over one consonant and wakes the vowel up. This is the single most powerful spelling pattern in English.",
      examples: [
        { sentence: "cap → cape", note: "Short /æ/ becomes long /eɪ/" },
        { sentence: "kit → kite", note: "Short /ɪ/ becomes long /aɪ/" },
        { sentence: "I made a cake at nine.", note: "a_e and i_e together" },
        { sentence: "The white kite is mine.", note: "i_e three times" },
      ],
    },
    groups: [
      {
        grapheme: "a_e", ipa: "/eɪ/", hint: "the letter name A",
        words: [
          { w: "cake", meaning: "a sweet baked food", arabic: "كعكة", emoji: "🎂" },
          { w: "name", meaning: "what you are called", arabic: "اسم", emoji: "🏷️" },
          { w: "game", meaning: "an activity you play", arabic: "لعبة", emoji: "🎮" },
          { w: "late", meaning: "after the right time", arabic: "متأخر", emoji: "⏰" },
          { w: "plane", meaning: "a flying vehicle", arabic: "طائرة", emoji: "✈️" },
        ],
      },
      {
        grapheme: "i_e", ipa: "/aɪ/", hint: "the letter name I",
        words: [
          { w: "kite", meaning: "a toy that flies on a string", arabic: "طائرة ورقية", emoji: "🪁" },
          { w: "bike", meaning: "a two-wheeled vehicle", arabic: "دراجة", emoji: "🚲" },
          { w: "time", meaning: "hours and minutes", arabic: "وقت", emoji: "⌚" },
          { w: "nine", meaning: "the number 9", arabic: "تسعة", emoji: "9️⃣" },
          { w: "smile", meaning: "a happy face", arabic: "ابتسامة", emoji: "😄" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Read 'kit'. Now I add an e. What happens?" },
      { speaker: "Student", text: "It becomes 'kite' — the i says its name." },
      { speaker: "Teacher", text: "Do we say the e?" },
      { speaker: "Student", text: "No, it is silent. It only does magic." },
      { speaker: "Teacher", text: "Perfectly explained." },
    ],
  },
  {
    n: 11,
    title: "Magic e 2 — o_e, u_e, e_e",
    description: "Complete the silent e family and read longer words.",
    rule: {
      title: "Silent e across all five vowels",
      explanation:
        "o_e = /əʊ/ (home), u_e = /juː/ or /uː/ (cube, rule), e_e = /iː/ (these). Silent e also has a second job: it stops English words from ending in v or u — that is why we write 'have' and 'blue'.",
      examples: [
        { sentence: "hop → hope", note: "o_e long o" },
        { sentence: "cub → cube", note: "u_e long u" },
        { sentence: "These are the same rules.", note: "e_e and a_e" },
        { sentence: "I hope we drove home.", note: "o_e three times" },
      ],
    },
    groups: [
      {
        grapheme: "o_e", ipa: "/əʊ/", hint: "the letter name O",
        words: [
          { w: "home", meaning: "the place where you live", arabic: "بيت", emoji: "🏠" },
          { w: "hope", meaning: "to want something to happen", arabic: "يأمل", emoji: "🌈" },
          { w: "nose", meaning: "the part you smell with", arabic: "أنف", emoji: "👃" },
          { w: "stone", meaning: "a small rock", arabic: "حجر", emoji: "🪨" },
          { w: "drove", meaning: "past of drive", arabic: "قاد", emoji: "🚗" },
        ],
      },
      {
        grapheme: "u_e / e_e", ipa: "/juː/, /iː/", hint: "long u and long e",
        words: [
          { w: "cube", meaning: "a box-shaped solid", arabic: "مكعب", emoji: "🧊" },
          { w: "tune", meaning: "a piece of music", arabic: "لحن", emoji: "🎵" },
          { w: "rule", meaning: "an instruction to follow", arabic: "قاعدة", emoji: "📜" },
          { w: "these", meaning: "plural of this", arabic: "هؤلاء", emoji: "👐" },
          { w: "theme", meaning: "the main subject", arabic: "موضوع", emoji: "🎯" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Why does 'have' end with e if the a is short?" },
      { speaker: "Student", text: "Because English words do not end in v." },
      { speaker: "Teacher", text: "Exactly — silent e has more than one job." },
      { speaker: "Student", text: "So I cannot always trust it to make a long vowel." },
      { speaker: "Teacher", text: "Correct. Read the word, then check the sense." },
    ],
  },
  {
    n: 12,
    title: "Vowel Teams 1 — ai/ay and ee/ea",
    description: "Two vowels walking together: the first one usually does the talking.",
    rule: {
      title: "Position decides the spelling",
      explanation:
        "Long /eɪ/ is spelled 'ai' inside a word (rain) and 'ay' at the end (day). Long /iː/ is spelled 'ee' (tree) or 'ea' (sea). When two vowels are together, they usually make one long sound.",
      examples: [
        { sentence: "The rain came on Sunday.", note: "ai inside, ay at the end" },
        { sentence: "I see the green tree.", note: "ee twice" },
        { sentence: "We eat by the sea.", note: "ea twice" },
        { sentence: "Wait for the train today.", note: "ai then ay" },
      ],
    },
    groups: [
      {
        grapheme: "ai / ay", ipa: "/eɪ/", hint: "ai inside, ay at the end",
        words: [
          { w: "rain", meaning: "water falling from clouds", arabic: "مطر", emoji: "🌧️" },
          { w: "train", meaning: "a vehicle on rails", arabic: "قطار", emoji: "🚆" },
          { w: "wait", meaning: "to stay until something happens", arabic: "ينتظر", emoji: "⏳" },
          { w: "day", meaning: "24 hours", arabic: "يوم", emoji: "📅" },
          { w: "play", meaning: "to have fun", arabic: "يلعب", emoji: "⚽" },
        ],
      },
      {
        grapheme: "ee / ea", ipa: "/iː/", hint: "a long, smiling sound",
        words: [
          { w: "tree", meaning: "a tall plant with a trunk", arabic: "شجرة", emoji: "🌳" },
          { w: "green", meaning: "the colour of grass", arabic: "أخضر", emoji: "🟢" },
          { w: "sleep", meaning: "to rest at night", arabic: "ينام", emoji: "😴" },
          { w: "sea", meaning: "a large body of salt water", arabic: "بحر", emoji: "🌊" },
          { w: "eat", meaning: "to take in food", arabic: "يأكل", emoji: "🍽️" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Why is it 'rain' but 'day'?" },
      { speaker: "Student", text: "Because ay goes at the end of the word." },
      { speaker: "Teacher", text: "And which spelling never ends an English word?" },
      { speaker: "Student", text: "ai — that is why we write 'play', not 'plai'." },
      { speaker: "Teacher", text: "You are thinking like a speller now." },
    ],
  },
  {
    n: 13,
    title: "Vowel Teams 2 — oa/ow, igh/ie, ew/ue",
    description: "More long vowel teams and where each one belongs.",
    rule: {
      title: "Long o, long i and long u teams",
      explanation:
        "Long /əʊ/: 'oa' inside a word (boat), 'ow' at the end (snow). Long /aɪ/: 'igh' (light), 'ie' (pie), 'y' (my). Long /uː/: 'ew' (new), 'ue' (blue). Same sound, different spellings — position and word history decide.",
      examples: [
        { sentence: "The goat is on the boat.", note: "oa inside" },
        { sentence: "Snow falls slowly below.", note: "ow at the end" },
        { sentence: "The night light is bright.", note: "igh three times" },
        { sentence: "The new blue kite flew.", note: "ew and ue" },
      ],
    },
    groups: [
      {
        grapheme: "oa / ow", ipa: "/əʊ/", hint: "oa inside, ow at the end",
        words: [
          { w: "boat", meaning: "a small water vehicle", arabic: "قارب", emoji: "⛵" },
          { w: "goat", meaning: "a farm animal with horns", arabic: "ماعز", emoji: "🐐" },
          { w: "road", meaning: "a way for cars", arabic: "طريق", emoji: "🛣️" },
          { w: "snow", meaning: "frozen white rain", arabic: "ثلج", emoji: "❄️" },
          { w: "window", meaning: "a glass opening in a wall", arabic: "نافذة", emoji: "🪟" },
        ],
      },
      {
        grapheme: "igh / ie / ew / ue", ipa: "/aɪ/, /uː/", hint: "long i and long u teams",
        words: [
          { w: "light", meaning: "brightness", arabic: "ضوء", emoji: "💡" },
          { w: "night", meaning: "the dark part of the day", arabic: "ليل", emoji: "🌙" },
          { w: "pie", meaning: "a baked dish with filling", arabic: "فطيرة", emoji: "🥧" },
          { w: "new", meaning: "not old", arabic: "جديد", emoji: "🆕" },
          { w: "blue", meaning: "the colour of the sky", arabic: "أزرق", emoji: "🔵" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "'Boat' and 'snow' have the same vowel sound. Why two spellings?" },
      { speaker: "Student", text: "oa goes inside the word and ow goes at the end." },
      { speaker: "Teacher", text: "And how do we spell the /aɪ/ in 'night'?" },
      { speaker: "Student", text: "i-g-h — the gh is silent." },
      { speaker: "Teacher", text: "Exactly. Silent letters are coming in lesson 19." },
    ],
  },
  {
    n: 14,
    title: "r-Controlled Vowels 1 — ar and or",
    description: "When r follows a vowel, it takes control of the sound.",
    rule: {
      title: "Bossy r",
      explanation:
        "A vowel followed by r is neither short nor long — the r changes it. 'ar' = /ɑː/ (car, star). 'or' = /ɔː/ (fork, storm). Do not try to hear a separate vowel and r; hear one blended sound.",
      examples: [
        { sentence: "The car is parked in the yard.", note: "ar three times" },
        { sentence: "A storm came in the morning.", note: "or twice" },
        { sentence: "The star is far.", note: "Rhyming ar words" },
        { sentence: "Sort the forks and the corks.", note: "or three times" },
      ],
    },
    groups: [
      {
        grapheme: "ar", ipa: "/ɑː/", hint: "open, like a doctor's 'aah'",
        words: [
          { w: "car", meaning: "a road vehicle", arabic: "سيارة", emoji: "🚗" },
          { w: "star", meaning: "a light in the sky", arabic: "نجم", emoji: "⭐" },
          { w: "farm", meaning: "land for growing food", arabic: "مزرعة", emoji: "🚜" },
          { w: "park", meaning: "a green public space", arabic: "حديقة", emoji: "🌳" },
          { w: "hard", meaning: "not soft; difficult", arabic: "صعب", emoji: "🪨" },
        ],
      },
      {
        grapheme: "or", ipa: "/ɔː/", hint: "round lips, like 'oor'",
        words: [
          { w: "fork", meaning: "a tool for eating", arabic: "شوكة", emoji: "🍴" },
          { w: "storm", meaning: "very bad weather", arabic: "عاصفة", emoji: "⛈️" },
          { w: "north", meaning: "the direction opposite south", arabic: "شمال", emoji: "🧭" },
          { w: "short", meaning: "not long", arabic: "قصير", emoji: "📏" },
          { w: "morning", meaning: "the early part of the day", arabic: "صباح", emoji: "🌅" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Say 'ca' then add r. What happens to the vowel?" },
      { speaker: "Student", text: "It changes completely — it is not short a any more." },
      { speaker: "Teacher", text: "That is why we call r 'bossy'." },
      { speaker: "Student", text: "So 'car' has two sounds, not three?" },
      { speaker: "Teacher", text: "Yes: /k/ and /ɑː/." },
    ],
  },
  {
    n: 15,
    title: "r-Controlled Vowels 2 — er, ir, ur",
    description: "Three spellings, one sound — and how to choose the right one.",
    rule: {
      title: "er, ir and ur all say /ɜː/",
      explanation:
        "Her, bird and turn share the same vowel sound. 'er' is the most common, especially at the end of words (teacher, faster). 'ir' and 'ur' appear more often inside words. When unsure at the end of a word, choose 'er'.",
      examples: [
        { sentence: "Her sister is a teacher.", note: "er at the end of words" },
        { sentence: "The bird sat on the third branch.", note: "ir inside" },
        { sentence: "Turn and burn.", note: "ur inside" },
        { sentence: "The nurse heard the word.", note: "Three spellings, one sound" },
      ],
    },
    groups: [
      {
        grapheme: "er", ipa: "/ɜː/ and /ə/", hint: "the most common ending in English",
        words: [
          { w: "her", meaning: "belonging to a female", arabic: "لها", emoji: "👩" },
          { w: "teacher", meaning: "a person who teaches", arabic: "معلم", emoji: "👨‍🏫" },
          { w: "water", meaning: "the liquid we drink", arabic: "ماء", emoji: "💧" },
          { w: "winter", meaning: "the cold season", arabic: "شتاء", emoji: "🧣" },
          { w: "sister", meaning: "a female sibling", arabic: "أخت", emoji: "👧" },
        ],
      },
      {
        grapheme: "ir / ur", ipa: "/ɜː/", hint: "same sound, different letters",
        words: [
          { w: "bird", meaning: "an animal that flies", arabic: "طائر", emoji: "🐦" },
          { w: "girl", meaning: "a young female", arabic: "فتاة", emoji: "👧" },
          { w: "third", meaning: "number three in order", arabic: "الثالث", emoji: "3️⃣" },
          { w: "turn", meaning: "to change direction", arabic: "يستدير", emoji: "↩️" },
          { w: "nurse", meaning: "a medical helper", arabic: "ممرضة", emoji: "👩‍⚕️" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Listen: her, bird, turn. What do you notice?" },
      { speaker: "Student", text: "The vowel sound is identical in all three." },
      { speaker: "Teacher", text: "Which spelling is safest at the end of a word?" },
      { speaker: "Student", text: "er — like teacher and water." },
      { speaker: "Teacher", text: "A very useful spelling habit." },
    ],
  },
  {
    n: 16,
    title: "Diphthongs — oi/oy and ou/ow",
    description: "Gliding vowels where your mouth moves from one shape to another.",
    rule: {
      title: "A diphthong is a vowel in motion",
      explanation:
        "In 'coin' and 'cloud' the vowel slides. 'oi' sits inside a word, 'oy' ends it (boy). 'ou' sits inside (house), 'ow' ends it or comes before n/l (cow, town). Watch your mouth in a mirror: it should move.",
      examples: [
        { sentence: "The boy found a coin.", note: "oy at the end, oi inside" },
        { sentence: "A loud sound came from the house.", note: "ou inside" },
        { sentence: "The cow is in town now.", note: "ow at the end and before n" },
        { sentence: "Enjoy your toys.", note: "oy twice" },
      ],
    },
    groups: [
      {
        grapheme: "oi / oy", ipa: "/ɔɪ/", hint: "slide from /ɔ/ to /ɪ/",
        words: [
          { w: "coin", meaning: "metal money", arabic: "عملة معدنية", emoji: "🪙" },
          { w: "point", meaning: "to show with a finger", arabic: "يشير", emoji: "👉" },
          { w: "noise", meaning: "an unpleasant sound", arabic: "ضجيج", emoji: "🔊" },
          { w: "boy", meaning: "a young male", arabic: "ولد", emoji: "👦" },
          { w: "enjoy", meaning: "to like doing something", arabic: "يستمتع", emoji: "😀" },
        ],
      },
      {
        grapheme: "ou / ow", ipa: "/aʊ/", hint: "the sound you make when hurt: ouch!",
        words: [
          { w: "house", meaning: "a building where people live", arabic: "منزل", emoji: "🏠" },
          { w: "cloud", meaning: "white shape in the sky", arabic: "سحابة", emoji: "☁️" },
          { w: "loud", meaning: "making a lot of noise", arabic: "صاخب", emoji: "📢" },
          { w: "cow", meaning: "a farm animal that gives milk", arabic: "بقرة", emoji: "🐄" },
          { w: "town", meaning: "a small city", arabic: "بلدة", emoji: "🏘️" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Watch my mouth: 'cow'. Does it stay still?" },
      { speaker: "Student", text: "No — it moves from open to round." },
      { speaker: "Teacher", text: "That movement is what makes it a diphthong." },
      { speaker: "Student", text: "And 'coin' moves too, in a different direction." },
      { speaker: "Teacher", text: "Exactly right." },
    ],
  },
  {
    n: 17,
    title: "oo, au/aw and al",
    description: "The two oo sounds and the broad /ɔː/ family.",
    rule: {
      title: "Short oo, long oo and broad a",
      explanation:
        "'oo' has two sounds: short /ʊ/ (book, good) and long /uː/ (moon, food). There is no rule — you learn them by word families. 'au' (author), 'aw' (saw) and 'al' (talk, walk) all give the broad /ɔː/ sound.",
      examples: [
        { sentence: "I took a good book.", note: "Short oo /ʊ/" },
        { sentence: "The moon is over the pool.", note: "Long oo /uː/" },
        { sentence: "I saw the author draw.", note: "aw and au" },
        { sentence: "We walk and talk.", note: "al = /ɔː/ with silent l" },
      ],
    },
    groups: [
      {
        grapheme: "oo", ipa: "/ʊ/ and /uː/", hint: "two different lengths",
        words: [
          { w: "book", meaning: "pages you read", arabic: "كتاب", emoji: "📕" },
          { w: "good", meaning: "of high quality", arabic: "جيد", emoji: "👍" },
          { w: "foot", meaning: "the end of your leg", arabic: "قدم", emoji: "🦶" },
          { w: "moon", meaning: "the light in the night sky", arabic: "قمر", emoji: "🌕" },
          { w: "food", meaning: "what we eat", arabic: "طعام", emoji: "🍲" },
        ],
      },
      {
        grapheme: "au / aw / al", ipa: "/ɔː/", hint: "a broad, open sound",
        words: [
          { w: "saw", meaning: "past of see", arabic: "رأى", emoji: "👀" },
          { w: "draw", meaning: "to make a picture", arabic: "يرسم", emoji: "🎨" },
          { w: "autumn", meaning: "the season before winter", arabic: "خريف", emoji: "🍂" },
          { w: "talk", meaning: "to speak", arabic: "يتحدث", emoji: "💬" },
          { w: "walk", meaning: "to move on foot", arabic: "يمشي", emoji: "🚶" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Say 'book' and 'moon'. Same spelling — same sound?" },
      { speaker: "Student", text: "No, 'moon' is much longer." },
      { speaker: "Teacher", text: "Correct. English gives oo two jobs." },
      { speaker: "Student", text: "So I must learn these by word families." },
      { speaker: "Teacher", text: "Yes — reading a lot fixes them fast." },
    ],
  },
  {
    n: 18,
    title: "Soft c and Soft g, plus -dge and -tch",
    description: "When c says /s/ and g says /dʒ/, and how short vowels protect themselves.",
    rule: {
      title: "The e, i, y rule",
      explanation:
        "Before e, i or y, 'c' softens to /s/ (city, cent, cycle) and 'g' often softens to /dʒ/ (giant, gem, gym). After a short vowel we write '-dge' (bridge) and '-tch' (watch); after a long vowel or consonant we write '-ge' and '-ch' (page, march).",
      examples: [
        { sentence: "The city centre is nice.", note: "Soft c three times" },
        { sentence: "The giant gem is huge.", note: "Soft g" },
        { sentence: "Watch the bridge.", note: "-tch and -dge after short vowels" },
        { sentence: "Turn to the next page.", note: "-ge after a long vowel" },
      ],
    },
    groups: [
      {
        grapheme: "soft c / soft g", ipa: "/s/, /dʒ/", hint: "softened by e, i, y",
        words: [
          { w: "city", meaning: "a large town", arabic: "مدينة", emoji: "🌆" },
          { w: "circle", meaning: "a round shape", arabic: "دائرة", emoji: "⭕" },
          { w: "nice", meaning: "pleasant", arabic: "لطيف", emoji: "🙂" },
          { w: "giant", meaning: "very large", arabic: "عملاق", emoji: "🗿" },
          { w: "gym", meaning: "a place to exercise", arabic: "صالة رياضية", emoji: "🏋️" },
        ],
      },
      {
        grapheme: "-dge / -tch", ipa: "/dʒ/, /tʃ/", hint: "used right after a short vowel",
        words: [
          { w: "bridge", meaning: "a road over water", arabic: "جسر", emoji: "🌉" },
          { w: "edge", meaning: "the outer line of something", arabic: "حافة", emoji: "📐" },
          { w: "judge", meaning: "a person who decides in court", arabic: "قاضٍ", emoji: "⚖️" },
          { w: "watch", meaning: "to look at; a wrist clock", arabic: "يشاهد / ساعة", emoji: "⌚" },
          { w: "match", meaning: "a game; a small fire stick", arabic: "مباراة", emoji: "🔥" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Why does 'cat' say /k/ but 'city' say /s/?" },
      { speaker: "Student", text: "Because c is followed by i in 'city'." },
      { speaker: "Teacher", text: "And why 'bridge' but 'page'?" },
      { speaker: "Student", text: "'Bridge' has a short vowel, so it needs the d." },
      { speaker: "Teacher", text: "You have understood a rule most learners never learn." },
    ],
  },
  {
    n: 19,
    title: "Silent Letters — kn, wr, mb, gn, gh, st",
    description: "Letters we write but never say, and why they are still there.",
    rule: {
      title: "Silent letters are historical, not random",
      explanation:
        "Old English pronounced the k in 'knee' and the w in 'write'. The sounds disappeared but the spellings stayed. Learn them as patterns: kn- (knife), wr- (write), -mb (thumb), gn- (gnome), -gh (night), -st- (listen), -lk (talk).",
      examples: [
        { sentence: "I hurt my knee with the knife.", note: "kn = /n/" },
        { sentence: "Write the wrong answer again.", note: "wr = /r/" },
        { sentence: "My thumb is numb from the climb.", note: "-mb = /m/" },
        { sentence: "Listen — I often whistle.", note: "Silent t" },
      ],
    },
    groups: [
      {
        grapheme: "kn / wr / gn", ipa: "silent first letter",
        hint: "the first letter is written but not said",
        words: [
          { w: "knee", meaning: "the joint in your leg", arabic: "ركبة", emoji: "🦵" },
          { w: "knife", meaning: "a tool for cutting", arabic: "سكين", emoji: "🔪" },
          { w: "know", meaning: "to have information", arabic: "يعرف", emoji: "🧠" },
          { w: "write", meaning: "to put words on paper", arabic: "يكتب", emoji: "✍️" },
          { w: "wrong", meaning: "not correct", arabic: "خطأ", emoji: "❌" },
        ],
      },
      {
        grapheme: "-mb / -st- / -lk", ipa: "silent last or middle letter",
        hint: "the silent letter hides at the end or middle",
        words: [
          { w: "thumb", meaning: "the short thick finger", arabic: "إبهام", emoji: "👍" },
          { w: "climb", meaning: "to go up", arabic: "يتسلق", emoji: "🧗" },
          { w: "lamb", meaning: "a baby sheep", arabic: "حمل", emoji: "🐑" },
          { w: "listen", meaning: "to pay attention with your ears", arabic: "يستمع", emoji: "👂" },
          { w: "island", meaning: "land surrounded by water", arabic: "جزيرة", emoji: "🏝️" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "How many sounds are in 'knee'?" },
      { speaker: "Student", text: "Two: /n/ and /iː/. The k is silent." },
      { speaker: "Teacher", text: "Why is the k written at all?" },
      { speaker: "Student", text: "Because people said it hundreds of years ago." },
      { speaker: "Teacher", text: "English keeps its history in its spelling." },
    ],
  },
  {
    n: 20,
    title: "Syllables, Schwa and Endings — Reading Fluently",
    description: "Break long words into syllables and finish the phonics code.",
    rule: {
      title: "Every syllable has one vowel sound",
      explanation:
        "Split long words at the syllable: fan-tas-tic, im-por-tant. In unstressed syllables the vowel weakens to schwa /ə/ — the most common sound in English (banana, teacher, about). Endings follow rules too: -ed says /t/ (walked), /d/ (played) or /ɪd/ (wanted).",
      examples: [
        { sentence: "fan-tas-tic — three vowel sounds, three syllables", note: "Clap the syllables" },
        { sentence: "The teacher walked about the garden.", note: "Schwa in every unstressed syllable" },
        { sentence: "walked /t/, played /d/, wanted /ɪd/", note: "Three sounds of -ed" },
        { sentence: "cats /s/, dogs /z/, boxes /ɪz/", note: "Three sounds of plural -s" },
      ],
    },
    groups: [
      {
        grapheme: "syllables", ipa: "one vowel sound each", hint: "clap once per vowel sound",
        words: [
          { w: "rabbit", meaning: "a small animal with long ears", arabic: "أرنب", emoji: "🐰" },
          { w: "napkin", meaning: "paper or cloth for the table", arabic: "منديل", emoji: "🧻" },
          { w: "fantastic", meaning: "excellent", arabic: "رائع", emoji: "🌟" },
          { w: "important", meaning: "of great value", arabic: "مهم", emoji: "❗" },
          { w: "computer", meaning: "an electronic machine", arabic: "حاسوب", emoji: "💻" },
        ],
      },
      {
        grapheme: "schwa / -ed / -s", ipa: "/ə/, /t d ɪd/, /s z ɪz/", hint: "weak vowels and endings",
        words: [
          { w: "about", meaning: "concerning", arabic: "حول", emoji: "🔄" },
          { w: "banana", meaning: "a long yellow fruit", arabic: "موزة", emoji: "🍌" },
          { w: "walked", meaning: "past of walk", arabic: "مشى", emoji: "🚶" },
          { w: "played", meaning: "past of play", arabic: "لعب", emoji: "🎲" },
          { w: "wanted", meaning: "past of want", arabic: "أراد", emoji: "🙏" },
        ],
      },
    ],
    dialogue: [
      { speaker: "Teacher", text: "Clap the syllables in 'fantastic'." },
      { speaker: "Student", text: "Fan-tas-tic — three claps." },
      { speaker: "Teacher", text: "And what is the vowel sound in the first syllable of 'about'?" },
      { speaker: "Student", text: "A weak schwa — /ə/." },
      { speaker: "Teacher", text: "You have now completed the whole English phonics code." },
    ],
  },
];

/* ── Exercise builders ──────────────────────────────────────────────── */

const shuffle = <T,>(arr: T[], seed: number): T[] => {
  const copy = [...arr];
  let s = seed || 1;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const allWords = SPECS.flatMap((s) => s.groups.flatMap((g) => g.words.map((w) => w.w)));

function decoyWords(exclude: string[], seed: number, count = 3): string[] {
  const pool = allWords.filter((w) => !exclude.includes(w));
  return shuffle(Array.from(new Set(pool)), seed).slice(0, count);
}

function mcq(question: string, answer: string, distractors: string[], seed: number): MCQItem {
  const unique = Array.from(new Set(distractors.filter((d) => d && d !== answer)));
  const filled = [...unique];
  let i = 0;
  while (filled.length < 3) {
    const filler = allWords[(seed + i * 7) % allWords.length];
    if (filler !== answer && !filled.includes(filler)) filled.push(filler);
    i++;
    if (i > allWords.length) break;
  }
  const options = shuffle([answer, ...filled.slice(0, 3)], seed);
  return { question, options, correct: options.indexOf(answer) };
}

function buildLesson(spec: PhonicsSpec): LessonData {
  const seed = spec.n * 37 + 11;
  const groupWords = spec.groups.map((g) => g.words.map((w) => w.w));
  const lessonWordList = groupWords.flat();

  const vocabulary: VocabWord[] = spec.groups.flatMap((g) =>
    g.words.map((w) => ({
      word: w.w,
      meaning: w.meaning,
      example: `Listen for ${g.ipa} in "${w.w}" — ${g.hint}.`,
      emoji: w.emoji,
      arabic: w.arabic,
    })),
  );

  // Vocabulary bank — sound identification and meaning.
  const vocabExercises: MCQItem[] = [
    ...spec.groups.map((g, gi) =>
      mcq(
        `Which word has the ${g.ipa} sound of "${g.grapheme}"?`,
        g.words[0].w,
        decoyWords(lessonWordList, seed + gi * 5),
        seed + gi,
      ),
    ),
    ...spec.groups.flatMap((g, gi) =>
      g.words.slice(1, 4).map((w, wi) =>
        mcq(
          `What does "${w.w}" mean?`,
          w.meaning,
          shuffle(
            vocabulary.filter((v) => v.word !== w.w).map((v) => v.meaning),
            seed + gi * 13 + wi,
          ).slice(0, 3),
          seed + gi * 7 + wi,
        ),
      ),
    ),
  ];

  // Grammar bank — apply the phonics rule.
  const grammarExercises: MCQItem[] = [
    mcq(
      `Which spelling pattern is this lesson about?`,
      spec.groups.map((g) => g.grapheme).join(" / "),
      shuffle(
        SPECS.filter((s) => s.n !== spec.n).map((s) => s.groups.map((g) => g.grapheme).join(" / ")),
        seed + 3,
      ).slice(0, 3),
      seed + 4,
    ),
    ...spec.groups.map((g, gi) =>
      mcq(
        `Which sound does "${g.grapheme}" make?`,
        g.ipa,
        shuffle(
          Array.from(
            new Set(SPECS.flatMap((s) => s.groups.map((x) => x.ipa)).filter((x) => x !== g.ipa)),
          ),
          seed + gi + 9,
        ).slice(0, 3),
        seed + gi + 21,
      ),
    ),
    ...spec.rule.examples.slice(0, 3).map((ex, i) =>
      mcq(
        `Complete the rule — what is true about: "${ex.sentence}"?`,
        ex.note,
        shuffle(
          SPECS.filter((s) => s.n !== spec.n).flatMap((s) => s.rule.examples.map((e) => e.note)),
          seed + i + 31,
        ).slice(0, 3),
        seed + i + 41,
      ),
    ),
  ];

  // Conversation bank — from the dialogue.
  const speakers = Array.from(new Set(spec.dialogue.map((l) => l.speaker)));
  const conversationExercises: MCQItem[] = spec.dialogue.slice(0, 4).map((line, i) =>
    mcq(
      `Who says: "${line.text}"?`,
      line.speaker,
      [...speakers.filter((s) => s !== line.speaker), "Parent", "Classmate"].slice(0, 3),
      seed + i + 51,
    ),
  );

  // Exam bank — mixed sound sorting.
  const examQuestions: MCQItem[] = [
    ...spec.groups.map((g, gi) =>
      mcq(
        `Sort the sound: which word belongs with "${g.words[0].w}"?`,
        g.words[2].w,
        decoyWords(groupWords[gi], seed + gi + 61),
        seed + gi + 71,
      ),
    ),
    mcq(
      `Which word does NOT belong in this lesson?`,
      decoyWords(lessonWordList, seed + 81, 1)[0],
      shuffle(lessonWordList, seed + 83).slice(0, 3),
      seed + 87,
    ),
    ...spec.groups.map((g, gi) =>
      mcq(
        `How would you describe ${g.ipa}? — ${g.grapheme}`,
        g.hint,
        shuffle(
          SPECS.filter((s) => s.n !== spec.n).flatMap((s) => s.groups.map((x) => x.hint)),
          seed + gi + 91,
        ).slice(0, 3),
        seed + gi + 97,
      ),
    ),
  ];

  // Homework bank — spelling from sound.
  const homeworkQuestions: MCQItem[] = spec.groups.flatMap((g, gi) =>
    g.words.slice(3).map((w, wi) =>
      mcq(
        `Spell the word that means "${w.meaning}" and uses ${g.grapheme}:`,
        w.w,
        decoyWords([w.w], seed + gi * 3 + wi + 101),
        seed + gi * 3 + wi + 111,
      ),
    ),
  );

  return {
    levelId: "phonics",
    levelLabel: "English Phonics Course",
    lessonNumber: spec.n,
    title: spec.title,
    description: spec.description,
    vocabulary,
    dialogue: spec.dialogue,
    grammar: spec.rule,
    vocabExercises,
    conversationExercises,
    grammarExercises,
    examQuestions,
    homeworkQuestions,
    speakingPrompt: `Read every word in this lesson out loud, sound by sound, then blend it. Record yourself saying: ${lessonWordList
      .slice(0, 6)
      .join(", ")}. Listen back and check each sound is clear.`,
    writingPrompt: `Write 5 short sentences using words from this lesson (${lessonWordList
      .slice(0, 5)
      .join(", ")}...). Underline the phonics pattern in each word.`,
    reading: {
      title: `Sound Practice: ${spec.title}`,
      text: [
        spec.rule.explanation,
        "",
        ...spec.groups.map((g) => `${g.grapheme} ${g.ipa} — ${g.hint}\nWords: ${g.words.map((w) => w.w).join(", ")}`),
        "",
        "Read the words three times: slowly sound by sound, then blended, then at natural speed.",
      ].join("\n"),
      questions: spec.groups.map((g, gi) =>
        mcq(
          `In the passage, which words practise "${g.grapheme}"?`,
          g.words.slice(0, 3).join(", "),
          spec.groups
            .filter((x) => x.grapheme !== g.grapheme)
            .map((x) => x.words.slice(0, 3).join(", "))
            .concat(
              SPECS.filter((s) => s.n !== spec.n)
                .slice(0, 2)
                .map((s) => s.groups[0].words.slice(0, 3).join(", ")),
            )
            .slice(0, 3),
          seed + gi + 121,
        ),
      ),
    },
  };
}

export const phonicsLessons: Record<string, LessonData> = Object.fromEntries(
  SPECS.map((spec) => [`phonics-${spec.n}`, buildLesson(spec)]),
);
