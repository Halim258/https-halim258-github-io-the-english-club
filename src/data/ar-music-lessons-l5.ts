import type { LessonData } from "./lessons";
import { buildMusicLesson } from "./ar-music-shared";

const L = "ar-mus-5";
const LB = "المستوى الخامس — القراءة الموسيقية";

export const arMusicLessonsL5: Record<string, LessonData> = {
  "ar-mus-5-1": buildMusicLesson({
    levelId: L, levelLabel: LB, lessonNumber: 1,
    title: "قراءة النوتة في مفتاح صول (Sight-reading)",
    description: "قراءة سريعة للنغمات على المدرج، والتعرّف الفوري على الأسطر والمسافات.",
    vocab: [
      { word: "قراءة أولى", meaning: "Sight-reading", example: "قراءة نوتة لأول مرة.", emoji: "👀" },
      { word: "تعرّف فوري", meaning: "Instant recognition", example: "بلا حساب.", emoji: "⚡" },
      { word: "بطاقات فلاش", meaning: "Flash cards", example: "تدريب سريع للتعرّف.", emoji: "🃏" },
      { word: "سطر", meaning: "Line", example: "مي صول سي ري فا.", emoji: "➖" },
      { word: "مسافة", meaning: "Space", example: "فا لا دو مي (FACE).", emoji: "▫️" },
      { word: "خطوط إضافية", meaning: "Ledger lines", example: "أعلى وأسفل المدرج.", emoji: "➖" },
      { word: "زمن نبض", meaning: "Pulse", example: "احفظ النبض أثناء القراءة.", emoji: "💓" },
      { word: "نظرة أمامية", meaning: "Look-ahead", example: "اقرأ ما بعد النغمة الحالية.", emoji: "👁️" },
      { word: "بطء متعمّد", meaning: "Deliberate slowness", example: "بطء يبني الدقة.", emoji: "🐢" },
      { word: "استمرارية", meaning: "Continuity", example: "لا تتوقف عند الخطأ.", emoji: "➡️" },
      { word: "تقنية أساسية", meaning: "Core technique", example: "القراءة مهارة يومية.", emoji: "📚" },
      { word: "تدريب يومي", meaning: "Daily drill", example: "10 دقائق يوميًا.", emoji: "📅" },
      { word: "قطعة جديدة", meaning: "Unseen piece", example: "قطعة لم تُقرأ من قبل.", emoji: "📄" },
      { word: "تحليل بصري", meaning: "Visual analysis", example: "افحص القطعة قبل العزف.", emoji: "🔍" },
      { word: "ثقة", meaning: "Confidence", example: "تنمو مع التكرار.", emoji: "💪" },
    ],
    dialogue: [
      { speaker: "المعلم", text: "احفظ أسطر ومسافات مفتاح صول." },
      { speaker: "الطالب", text: "مي صول سي ري فا / فا لا دو مي." },
      { speaker: "المعلم", text: "الآن اسم النوتة في ثانية دون حساب." },
      { speaker: "المعلم", text: "استعمل بطاقات فلاش يوميًا 5 دقائق." },
      { speaker: "الطالب", text: "أنسى بسرعة." },
      { speaker: "المعلم", text: "التكرار وحده يبني التعرّف الفوري." },
      { speaker: "المعلم", text: "قبل قراءة قطعة: افحصها بصريًا 30 ثانية." },
      { speaker: "الطالب", text: "ماذا أفحص؟" },
      { speaker: "المعلم", text: "المفتاح، الميزان، النغمات الصعبة، وأنماط متكررة." },
      { speaker: "المعلم", text: "ثم اقرأ ببطء بلا توقف." },
    ],
    concept: {
      title: "القراءة عادة يومية — Reading as Habit",
      explanation:
        "القراءة الموسيقية مهارة تشبه القراءة اللغوية: تحتاج تعرّفًا فوريًا لا حسابًا.\n\n" +
        "**خطوات القراءة الأولى**:\n1. **افحص القطعة 30 ثانية**: المفتاح، الميزان، النغمات القصوى، الأنماط المتكررة.\n2. **حدّد النبض** بميترونوم بطيء.\n3. **اقرأ ببطء بلا توقف** — الاستمرارية أهم من الدقة أول مرة.\n4. **أعد بسرعة أعلى** بعد تنقية الأخطاء.\n\n" +
        "**تدريب يومي**: 5 دقائق بطاقات فلاش + 10 دقائق قراءة قطعة جديدة. خلال 3 أشهر ستقرأ بطلاقة.\n\nقاعدة: النظرة الأمامية (النظر لنغمتين بعد الحالية) تعطيك الوقت للاستعداد.",
      tips: [
        { sentence: "احفظ أسطر ومسافات المفتاح ذهنيًا.", note: "أساس التعرف." },
        { sentence: "استخدم بطاقات فلاش يوميًا 5 دقائق.", note: "التكرار المُتباعد." },
        { sentence: "افحص القطعة قبل العزف.", note: "خطة تقلّل الأخطاء." },
        { sentence: "لا تتوقف عند الخطأ.", note: "الاستمرارية أهم." },
        { sentence: "نظرة أمامية على النغمتين التاليتين.", note: "استعداد." },
        { sentence: "قطعة جديدة يوميًا مهما كانت بسيطة.", note: "العادة تصنع المهارة." },
      ],
    },
    exam: [
      { question: "أسطر مفتاح صول:", options: ["مي صول سي ري فا", "دو ري مي فا", "FACE", "لا شيء"], correct: 0 },
      { question: "مسافات مفتاح صول:", options: ["FACE (فا لا دو مي)", "GACE", "دو ري مي", "لا شيء"], correct: 0 },
      { question: "قبل القراءة افحص:", options: ["المفتاح والميزان والأنماط", "لا شيء", "السعر", "بلا فحص"], correct: 0 },
      { question: "عند الخطأ في القراءة الأولى:", options: ["استمر", "توقف واعد", "احذف", "لا شيء"], correct: 0 },
      { question: "التدريب اليومي المقترح:", options: ["15 دقيقة (فلاش + قراءة)", "شهريًا", "بلا تدريب", "ساعة عشوائية"], correct: 0 },
    ],
    homework: [
      { question: "بطاقات فلاش:", options: ["يوميًا 5 دقائق للتعرّف الفوري", "لا شيء", "شهريًا", "بلا بطاقات"], correct: 0 },
      { question: "قطعة جديدة:", options: ["يوميًا 10 دقائق قراءة أولى", "بلا قطعة", "لا شيء", "شهريًا"], correct: 0 },
      { question: "افحص القطعة:", options: ["30 ثانية بصريًا قبل العزف", "لا شيء", "3 ساعات", "بلا فحص"], correct: 0 },
      { question: "نظرة أمامية:", options: ["نغمتين قبل الحالية", "بلا نظر", "خلفية", "لا شيء"], correct: 0 },
      { question: "التالي:", options: ["مفتاح فا (Bass Clef)", "لا شيء", "الرسم", "الرقص"], correct: 0 },
    ],
  }),

  "ar-mus-5-2": buildMusicLesson({
    levelId: L, levelLabel: LB, lessonNumber: 2,
    title: "قراءة مفتاح فا (Bass Clef)",
    description: "أسطر ومسافات مفتاح فا، وربطه باليد اليسرى في البيانو.",
    vocab: [
      { word: "مفتاح فا", meaning: "Bass clef", example: "𝄢 — للأصوات الغليظة.", emoji: "🎼" },
      { word: "أسطر بايس", meaning: "Bass lines", example: "صول سي ري فا لا.", emoji: "➖" },
      { word: "مسافات بايس", meaning: "Bass spaces", example: "لا دو مي صول (ACEG).", emoji: "▫️" },
      { word: "يد يسرى", meaning: "Left hand", example: "غالبًا في مفتاح فا.", emoji: "🤚" },
      { word: "دو المتوسط", meaning: "Middle C", example: "بين المفتاحين.", emoji: "🎹" },
      { word: "مقارنة", meaning: "Comparison", example: "قارن بين المفتاحين.", emoji: "⚖️" },
      { word: "قاعدة حفظ", meaning: "Mnemonic", example: "Good Boys Do Fine Always.", emoji: "🧠" },
      { word: "ربط بصري", meaning: "Visual link", example: "ربط النوتة بالمفتاح الصحيح.", emoji: "🔗" },
      { word: "تنسيق", meaning: "Coordination", example: "قراءة يدين معًا.", emoji: "🤲" },
      { word: "مدرج مزدوج", meaning: "Grand staff", example: "مفتاح صول + فا معًا.", emoji: "🎼" },
      { word: "بايس عميق", meaning: "Deep bass", example: "خطوط إضافية أدنى.", emoji: "⬇️" },
      { word: "خطوط أعلى", meaning: "Upper ledger", example: "لأعلى النطاق.", emoji: "⬆️" },
      { word: "بطاقات مزدوجة", meaning: "Two-clef flashcards", example: "درّب المفتاحين.", emoji: "🃏" },
      { word: "تدرّج", meaning: "Gradual", example: "أضف الفا بعد إتقان الصول.", emoji: "📈" },
      { word: "طلاقة", meaning: "Fluency", example: "قراءة سلسة للمفتاحين.", emoji: "💧" },
    ],
    dialogue: [
      { speaker: "المعلم", text: "مفتاح فا للأصوات الغليظة." },
      { speaker: "الطالب", text: "شكله مختلف." },
      { speaker: "المعلم", text: "نعم — نقطتان تحيطان بسطر «فا»." },
      { speaker: "المعلم", text: "أسطره: صول سي ري فا لا." },
      { speaker: "الطالب", text: "قاعدة الحفظ؟" },
      { speaker: "المعلم", text: "Good Boys Do Fine Always." },
      { speaker: "المعلم", text: "مسافاته: لا دو مي صول = All Cows Eat Grass." },
      { speaker: "الطالب", text: "متى أستخدمه؟" },
      { speaker: "المعلم", text: "لليد اليسرى في البيانو ولباص الأوركسترا." },
      { speaker: "المعلم", text: "درّب بطاقات فلاش للمفتاحين معًا." },
    ],
    concept: {
      title: "المدرج المزدوج — Grand Staff",
      explanation:
        "**المدرج المزدوج**: مفتاح صول (أعلى) + مفتاح فا (أسفل)، ودو المتوسط بينهما على خط إضافي.\n\n" +
        "**مفتاح فا (Bass Clef)**:\n• الأسطر من الأسفل: صول-سي-ري-فا-لا (Good Boys Do Fine Always).\n• المسافات من الأسفل: لا-دو-مي-صول (All Cows Eat Grass).\n\n" +
        "**قاعدة الربط**: دو المتوسط:\n• على خط إضافي أول تحت مفتاح صول.\n• على خط إضافي أول فوق مفتاح فا.\n\n" +
        "**تدرّج التعلّم**: أتقن الصول 3 أسابيع، ثم أضف الفا. لا تخلط قبل إتقان كل واحد.",
      tips: [
        { sentence: "احفظ قاعدتي الحفظ بصوت مسموع.", note: "الذاكرة السمعية أقوى." },
        { sentence: "لا تبدأ مفتاح فا قبل إتقان صول 3 أسابيع.", note: "التتابع." },
        { sentence: "استخدم بطاقات ثنائية المفاتيح.", note: "تدريب مركز." },
        { sentence: "دو المتوسط جسر بين المدرجين.", note: "نقطة مرجعية." },
        { sentence: "اقرأ يد اليسرى وحدها في القطع قبل الجمع.", note: "استقلال." },
        { sentence: "يوميًا 5 دقائق مفتاح فا وحده.", note: "المداومة." },
      ],
    },
    exam: [
      { question: "أسطر مفتاح فا:", options: ["صول سي ري فا لا", "مي صول سي ري فا", "FACE", "لا شيء"], correct: 0 },
      { question: "مسافات مفتاح فا:", options: ["لا دو مي صول", "فا لا دو مي", "GACE", "لا شيء"], correct: 0 },
      { question: "دو المتوسط:", options: ["على خط إضافي بين المدرجين", "أعلى الصول", "أسفل الفا", "لا يوجد"], correct: 0 },
      { question: "مفتاح فا لليد:", options: ["اليمنى غالبًا", "اليسرى غالبًا", "بلا يد", "لا شيء"], correct: 1 },
      { question: "أفضل بداية:", options: ["أتقن الصول ثم أضف الفا", "الفا فورًا", "لا شيء", "خلطهما فورًا"], correct: 0 },
    ],
    homework: [
      { question: "احفظ:", options: ["أسطر ومسافات مفتاح فا بقاعدتَي الحفظ", "لا شيء", "أسطر الصول فقط", "بلا حفظ"], correct: 0 },
      { question: "بطاقات فلاش:", options: ["ثنائية المفاتيح 10 دقائق يوميًا", "شهريًا", "لا شيء", "بلا بطاقات"], correct: 0 },
      { question: "اقرأ قطعة:", options: ["يد يسرى وحدها بمفتاح فا", "يمنى فقط", "لا شيء", "معًا فورًا"], correct: 0 },
      { question: "دو المتوسط:", options: ["استخدمه كنقطة مرجعية للربط", "تجاهله", "لا شيء", "احذفه"], correct: 0 },
      { question: "التالي:", options: ["الأنغام (بيمول/دييز) وسلالم متعددة", "لا شيء", "الرسم", "الرقص"], correct: 0 },
    ],
  }),

  "ar-mus-5-3": buildMusicLesson({
    levelId: L, levelLabel: LB, lessonNumber: 3,
    title: "الأنغام العارضة والسلالم المتعددة",
    description: "الدييز (♯) والبيمول (♭)، وسلالم صول ولا وفا الكبيرة.",
    vocab: [
      { word: "دييز", meaning: "Sharp (♯)", example: "يرفع نصف نغمة.", emoji: "♯" },
      { word: "بيمول", meaning: "Flat (♭)", example: "يخفض نصف نغمة.", emoji: "♭" },
      { word: "بيكار", meaning: "Natural (♮)", example: "يلغي الدييز/البيمول.", emoji: "♮" },
      { word: "علامة عارضة", meaning: "Accidental", example: "تنطبق ضمن المازورة.", emoji: "❕" },
      { word: "دليل مقام", meaning: "Key signature", example: "دييز/بيمول في بداية المدرج.", emoji: "🎼" },
      { word: "صول كبير", meaning: "G major", example: "دييز واحد (فا♯).", emoji: "1️⃣" },
      { word: "ري كبير", meaning: "D major", example: "دييزان (فا♯، دو♯).", emoji: "2️⃣" },
      { word: "لا كبير", meaning: "A major", example: "3 دييز.", emoji: "3️⃣" },
      { word: "فا كبير", meaning: "F major", example: "بيمول واحد (سي♭).", emoji: "1️⃣" },
      { word: "دائرة خامسات", meaning: "Circle of fifths", example: "خريطة السلالم.", emoji: "⭕" },
      { word: "مقام", meaning: "Key", example: "المقام يحدد الشخصية.", emoji: "🔑" },
      { word: "بنية ثابتة", meaning: "Constant formula", example: "ك-ك-ن-ك-ك-ك-ن دومًا.", emoji: "🧱" },
      { word: "نقل", meaning: "Transposition", example: "نقل اللحن لمقام آخر.", emoji: "🔀" },
      { word: "توسع مدى", meaning: "Range expansion", example: "الأنغام تفتح مدى المهارة.", emoji: "📏" },
      { word: "قراءة ذكية", meaning: "Smart reading", example: "افحص دليل المقام أولًا.", emoji: "🧠" },
    ],
    dialogue: [
      { speaker: "المعلم", text: "الدييز (♯) يرفع النغمة نصف نغمة." },
      { speaker: "الطالب", text: "فا♯ = ؟" },
      { speaker: "المعلم", text: "المفتاح الأسود بين فا وصول." },
      { speaker: "المعلم", text: "البيمول (♭) عكسه — يخفض نصف نغمة." },
      { speaker: "الطالب", text: "سي♭ = ؟" },
      { speaker: "المعلم", text: "المفتاح الأسود بين لا وسي." },
      { speaker: "المعلم", text: "دليل المقام يوضع بعد المفتاح ويعمل طوال القطعة." },
      { speaker: "الطالب", text: "صول الكبير؟" },
      { speaker: "المعلم", text: "دييز واحد على سطر فا — كل فا في القطعة تصير فا♯." },
      { speaker: "المعلم", text: "افحص دليل المقام قبل قراءة أي قطعة." },
    ],
    concept: {
      title: "الأنغام العارضة ودائرة الخامسات",
      explanation:
        "**العلامات**:\n• دييز (♯): +½ نغمة. • بيمول (♭): –½ نغمة. • بيكار (♮): إلغاء.\n\n" +
        "**دليل المقام** (Key Signature): يوضع مرة واحدة بعد المفتاح ويطبّق طوال القطعة على النغمات المذكورة.\n\n" +
        "**سلالم شائعة**:\n• دو كبير: 0 دييز/بيمول.\n• صول كبير: فا♯.\n• ري كبير: فا♯، دو♯.\n• لا كبير: فا♯، دو♯، صول♯.\n• فا كبير: سي♭.\n\n" +
        "**دائرة الخامسات**: خريطة تربط السلالم بترتيب — كل خامسة صاعدة تضيف دييزًا، وكل خامسة نازلة تضيف بيمولًا. حفظها = مفتاح فهم المقامات كلها.",
      tips: [
        { sentence: "افحص دليل المقام قبل قراءة القطعة.", note: "خطوة أولى." },
        { sentence: "العلامة العارضة تطبّق حتى نهاية المازورة فقط.", note: "قاعدة مهمة." },
        { sentence: "احفظ دائرة الخامسات تدريجيًا.", note: "أسبوع لكل سلم." },
        { sentence: "تدرّب على السلم الجديد ببطء 10 دقائق يوميًا.", note: "ذاكرة عضلية." },
        { sentence: "نقل لحن لمقام آخر ينمّي المرونة.", note: "تمرين إبداعي." },
        { sentence: "لا تحفظ الدييزات — افهم من دائرة الخامسات.", note: "الفهم يدوم." },
      ],
    },
    exam: [
      { question: "الدييز:", options: ["يرفع ½ نغمة", "يخفض ½", "يلغي", "لا شيء"], correct: 0 },
      { question: "البيمول:", options: ["يرفع", "يخفض ½", "يلغي", "يضاعف"], correct: 1 },
      { question: "صول الكبير:", options: ["0", "1 دييز", "2 بيمول", "3 دييز"], correct: 1 },
      { question: "فا الكبير:", options: ["1 دييز", "1 بيمول", "0", "3 دييز"], correct: 1 },
      { question: "العلامة العارضة تطبّق:", options: ["كل القطعة", "حتى نهاية المازورة", "لا تطبّق", "دقيقة"], correct: 1 },
    ],
    homework: [
      { question: "احفظ:", options: ["دليل مقام صول وفا الكبير", "لا شيء", "10 مقامات دفعة", "بلا حفظ"], correct: 0 },
      { question: "تدرّب على سلم صول الكبير:", options: ["10 دقائق يوميًا مع ميترونوم", "شهريًا", "لا شيء", "بلا ميترونوم"], correct: 0 },
      { question: "قطعة جديدة:", options: ["افحص دليل المقام قبل العزف", "لا شيء", "بلا فحص", "احذفها"], correct: 0 },
      { question: "دائرة الخامسات:", options: ["ادرس سلمًا جديدًا كل أسبوع", "10 دفعة", "لا شيء", "بلا دراسة"], correct: 0 },
      { question: "التالي:", options: ["الديناميات والعلامات التعبيرية على النوتة", "لا شيء", "الرسم", "الرقص"], correct: 0 },
    ],
  }),

  "ar-mus-5-4": buildMusicLesson({
    levelId: L, levelLabel: LB, lessonNumber: 4,
    title: "الديناميات والعلامات التعبيرية",
    description: "قراءة p, mf, f, cresc, dim, وعلامات الأداء (staccato, legato, accent).",
    vocab: [
      { word: "p", meaning: "Piano (soft)", example: "خافت.", emoji: "🔉" },
      { word: "pp", meaning: "Pianissimo (very soft)", example: "خافت جدًا.", emoji: "🔈" },
      { word: "mf", meaning: "Mezzo-forte (medium)", example: "متوسط قوة.", emoji: "🔉" },
      { word: "f", meaning: "Forte (loud)", example: "قوي.", emoji: "🔊" },
      { word: "ff", meaning: "Fortissimo (very loud)", example: "قوي جدًا.", emoji: "📢" },
      { word: "cresc.", meaning: "Crescendo (getting louder)", example: "زيادة تدريجية.", emoji: "📈" },
      { word: "dim.", meaning: "Diminuendo (getting softer)", example: "تناقص تدريجي.", emoji: "📉" },
      { word: "staccato", meaning: "Short & detached (•)", example: "نغمات قصيرة منفصلة.", emoji: "•" },
      { word: "legato", meaning: "Smooth & connected (⌢)", example: "نغمات متصلة ناعمة.", emoji: "〰️" },
      { word: "accent", meaning: "Emphasize (>)", example: "شدد على النغمة.", emoji: "❗" },
      { word: "fermata", meaning: "Hold longer (𝄐)", example: "أطل النغمة بحرّية.", emoji: "🕰️" },
      { word: "slur", meaning: "Phrase curve", example: "جملة واحدة متصلة.", emoji: "⌢" },
      { word: "tie", meaning: "Tie (same note)", example: "دمج قيمتَي نغمتين.", emoji: "⌒" },
      { word: "tempo mark", meaning: "Tempo term", example: "Allegro, Andante...", emoji: "⏱️" },
      { word: "شخصية", meaning: "Character marks", example: "dolce, giocoso...", emoji: "🎭" },
    ],
    dialogue: [
      { speaker: "المعلم", text: "الديناميات تحوّل النوتة إلى موسيقى." },
      { speaker: "الطالب", text: "ما الفرق بين p وpp؟" },
      { speaker: "المعلم", text: "pp خافت جدًا، p خافت عادي." },
      { speaker: "المعلم", text: "cresc. زيادة تدريجية، وdim. تناقص." },
      { speaker: "الطالب", text: "staccato ولegato؟" },
      { speaker: "المعلم", text: "staccato نقاط فوق النوتات — قصيرة منفصلة." },
      { speaker: "المعلم", text: "legato قوس فوق مجموعة — متصلة ناعمة." },
      { speaker: "الطالب", text: "fermata؟" },
      { speaker: "المعلم", text: "قوس ونقطة فوق النغمة — أطلها بحرّية." },
      { speaker: "المعلم", text: "قبل العزف: افحص كل العلامات وخطط التنفيذ." },
    ],
    concept: {
      title: "من النوتة إلى الموسيقى — Notes into Music",
      explanation:
        "الديناميات وعلامات الأداء هي «الروح» فوق العظام (النغمات).\n\n" +
        "**سلّم الديناميات** (من الأضعف للأقوى): pp → p → mp → mf → f → ff.\n\n" +
        "**التغيّر التدريجي**: cresc. (زيادة)، dim./decresc. (تناقص). تُرسم أحيانًا كخطين مفتوحين (<) أو مغلقين (>).\n\n" +
        "**علامات الأداء**:\n• staccato (•): نغمة قصيرة منفصلة، اقتطع نصف قيمتها تقريبًا.\n• legato (⌢): متصلة، بلا فراغ بين النغمات.\n• accent (>): شدد.\n• fermata (𝄐): أطل النغمة بحرية.\n• slur: جملة موسيقية واحدة.\n\n" +
        "**علامات السرعة**: Largo (بطيء جدًا) < Adagio < Andante < Moderato < Allegro < Presto (سريع جدًا).",
      tips: [
        { sentence: "افحص كل العلامات قبل العزف.", note: "التخطيط." },
        { sentence: "التزم بالديناميات — هي هوية القطعة.", note: "الاحترام." },
        { sentence: "cresc. تدرّج حقيقي، لا قفزة.", note: "الانسيابية." },
        { sentence: "staccato ليس صراخًا — اقتطاع فقط.", note: "الأناقة." },
        { sentence: "fermata تحتاج ذوقًا — لا مبالغة.", note: "الحسّ الفني." },
        { sentence: "علامات السرعة تُحفظ بالإحساس لا بالرقم فقط.", note: "الشخصية." },
      ],
    },
    exam: [
      { question: "p:", options: ["قوي", "خافت", "متوسط", "بلا صوت"], correct: 1 },
      { question: "ff:", options: ["خافت جدًا", "قوي جدًا", "متوسط", "لا شيء"], correct: 1 },
      { question: "cresc.:", options: ["زيادة تدريجية", "تناقص", "توقف", "سرعة"], correct: 0 },
      { question: "staccato:", options: ["متصل", "قصير منفصل", "طويل", "صمت"], correct: 1 },
      { question: "fermata:", options: ["أطل النغمة", "اقطعها", "احذفها", "لا شيء"], correct: 0 },
    ],
    homework: [
      { question: "اختر قطعة عزفتها قبلًا:", options: ["أضف ديناميات مكتوبة وطبّقها", "لا شيء", "احذفها", "غيّرها كلها"], correct: 0 },
      { question: "تدرّب على:", options: ["cresc + dim على سلم كامل", "بلا تدرّج", "قفزات فقط", "لا شيء"], correct: 0 },
      { question: "staccato:", options: ["تدرّب على سطر بالكامل ستاكاتو", "بلا تدرّب", "لا شيء", "شهريًا"], correct: 0 },
      { question: "سرعات:", options: ["اسمع 3 قطع بسرعات مختلفة وحدد Tempo mark", "لا شيء", "بلا استماع", "احفظ فقط"], correct: 0 },
      { question: "التالي:", options: ["مراجعة وأداء قراءة أولى لقطعة كاملة", "لا شيء", "الرسم", "الرقص"], correct: 0 },
    ],
  }),

  "ar-mus-5-5": buildMusicLesson({
    levelId: L, levelLabel: LB, lessonNumber: 5,
    title: "قراءة أولى لقطعة كاملة (تطبيق)",
    description: "دمج المفتاحين والديناميات والأنغام في قراءة أولى لقطعة لم تُرَ من قبل.",
    vocab: [
      { word: "قراءة أولى", meaning: "Sight-reading", example: "لأول مرة.", emoji: "👀" },
      { word: "تحضير", meaning: "Preparation", example: "30 ثانية فحص.", emoji: "📋" },
      { word: "أنماط", meaning: "Patterns", example: "سلالم/تآلفات/تكرارات.", emoji: "🔀" },
      { word: "نقاط صعبة", meaning: "Trouble spots", example: "حدّدها في الفحص.", emoji: "⚠️" },
      { word: "سرعة آمنة", meaning: "Safe tempo", example: "اختر سرعة تسمح بلا توقف.", emoji: "🛡️" },
      { word: "التزام بالنبض", meaning: "Steady pulse", example: "لا تسرّع أو تبطّئ عشوائيًا.", emoji: "💓" },
      { word: "استمرار", meaning: "Keep going", example: "لا تتوقف عند الخطأ.", emoji: "➡️" },
      { word: "تقييم", meaning: "Evaluation", example: "بعد الأداء دوّن نقاطًا.", emoji: "📝" },
      { word: "تكرار ذكي", meaning: "Smart repetition", example: "ركّز على النقاط الصعبة فقط.", emoji: "🎯" },
      { word: "توسّع", meaning: "Expansion", example: "قطعة أصعب أسبوعيًا.", emoji: "📈" },
      { word: "بنك قطع", meaning: "Piece library", example: "احتفظ بقطع للتنويع.", emoji: "📚" },
      { word: "متعة القراءة", meaning: "Joy of reading", example: "القراءة تحرر الموسيقى.", emoji: "😊" },
      { word: "ثقة", meaning: "Confidence", example: "تنمو بالممارسة.", emoji: "💪" },
      { word: "استقلال قارئ", meaning: "Reader independence", example: "لا تعتمد على معلم دومًا.", emoji: "🕊️" },
      { word: "مسار مستمر", meaning: "Continuous path", example: "القراءة رحلة لا وجهة.", emoji: "🛤️" },
    ],
    dialogue: [
      { speaker: "المعلم", text: "قطعة جديدة أمامك — لا تعزف بعد." },
      { speaker: "الطالب", text: "أفحص أولًا." },
      { speaker: "المعلم", text: "المفتاح، الميزان، دليل المقام، أعلى/أدنى نغمة." },
      { speaker: "المعلم", text: "حدّد نقطتين صعبتين واقرأهما ذهنيًا مرتين." },
      { speaker: "الطالب", text: "ثم أعزف؟" },
      { speaker: "المعلم", text: "بسرعة آمنة — تسمح بالقراءة بلا توقف." },
      { speaker: "المعلم", text: "لا تسرّع الأجزاء السهلة ولا تبطّئ الصعبة." },
      { speaker: "الطالب", text: "بعد الانتهاء؟" },
      { speaker: "المعلم", text: "دوّن ملاحظتين ثم أعد أسرع بمقدار 5 BPM." },
      { speaker: "المعلم", text: "قطعة جديدة يوميًا لبناء الثقة." },
    ],
    concept: {
      title: "القراءة الأولى مهارة الحياة — Sight-reading for Life",
      explanation:
        "من يقرأ بطلاقة يفتح كل موسيقى العالم على قدر مهارته. البروتوكول:\n\n" +
        "1. **فحص 30 ثانية**: مفتاح، ميزان، دليل مقام، ديناميات، أنماط، نقاط صعبة.\n" +
        "2. **قراءة ذهنية للأجزاء الصعبة** مرتين.\n" +
        "3. **اختيار سرعة آمنة** = 60% من السرعة النهائية المقصودة.\n" +
        "4. **عزف بلا توقف** حتى النهاية.\n" +
        "5. **تقييم**: ما نجح؟ ماذا يحتاج تكرارًا؟\n" +
        "6. **إعادة أسرع 5 BPM** بعد 3 قراءات نظيفة.\n\n" +
        "قاعدة ذهبية: قطعة جديدة يوميًا مهما كانت بسيطة. 100 قطعة في 3 أشهر = طلاقة حقيقية.",
      tips: [
        { sentence: "افحص قبل العزف — لا تقفز مباشرة.", note: "الخطة قبل الحركة." },
        { sentence: "اختر سرعة آمنة.", note: "60% من المستهدف." },
        { sentence: "التزم بالنبض — لا تسرّع السهل.", note: "الاستقرار." },
        { sentence: "لا تتوقف عند الخطأ.", note: "استرداد فوري." },
        { sentence: "قطعة يومية.", note: "العادة." },
        { sentence: "دوّن نقطتين للتحسين لا أكثر.", note: "التركيز." },
      ],
    },
    exam: [
      { question: "قبل القراءة الأولى:", options: ["فحص 30 ثانية", "عزف فوري", "لا شيء", "احفظ"], correct: 0 },
      { question: "أفضل سرعة أولى:", options: ["60% من المستهدف", "أقصى سرعة", "لا نبض", "متغيّرة"], correct: 0 },
      { question: "أثناء الخطأ:", options: ["استمر", "توقف", "أعد من البداية", "احذف"], correct: 0 },
      { question: "بعد الأداء:", options: ["ملاحظتان للتحسين ثم إعادة", "لا شيء", "قطعة جديدة فورًا", "احذف التسجيل"], correct: 0 },
      { question: "أفضل روتين:", options: ["قطعة جديدة يوميًا", "شهريًا", "لا شيء", "قطعة واحدة للأبد"], correct: 0 },
    ],
    homework: [
      { question: "اختر:", options: ["قطعة جديدة يوميًا لأسبوع", "قطعة قديمة", "لا شيء", "شهريًا"], correct: 0 },
      { question: "فحص:", options: ["30 ثانية بصريًا قبل العزف", "بلا فحص", "3 ساعات", "لا شيء"], correct: 0 },
      { question: "سرعة:", options: ["60% من المستهدف", "أقصى فورًا", "بلا نبض", "لا شيء"], correct: 0 },
      { question: "دوّن:", options: ["نقطتين للتحسين بعد كل قطعة", "بلا تدوين", "احذف", "لا شيء"], correct: 0 },
      { question: "المستوى التالي:", options: ["الهارموني والتأليف والارتجال", "لا شيء", "الرسم", "الطبخ"], correct: 0 },
    ],
  }),
};