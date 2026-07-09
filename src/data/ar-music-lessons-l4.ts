import type { LessonData } from "./lessons";
import { buildMusicLesson } from "./ar-music-shared";

const L = "ar-mus-4";
const LB = "المستوى الرابع — العزف الأساسي";

export const arMusicLessonsL4: Record<string, LessonData> = {
  "ar-mus-4-1": buildMusicLesson({
    levelId: L, levelLabel: LB, lessonNumber: 1,
    title: "التعرّف على الآلة: البيانو والجيتار",
    description: "أجزاء البيانو والجيتار، ووضعية الجلوس، ووضع اليدين.",
    vocab: [
      { word: "بيانو", meaning: "Piano", example: "لوحة مفاتيح 88 مفتاحًا.", emoji: "🎹" },
      { word: "جيتار", meaning: "Guitar", example: "6 أوتار عادةً.", emoji: "🎸" },
      { word: "مفاتيح", meaning: "Keys", example: "بيضاء وسوداء.", emoji: "⬜" },
      { word: "أوتار", meaning: "Strings", example: "أوتار الجيتار الست.", emoji: "🎼" },
      { word: "دساتين", meaning: "Frets", example: "دستان يفصل بين نصف نغمة.", emoji: "🎸" },
      { word: "ريشة", meaning: "Pick", example: "لعزف الجيتار.", emoji: "🎸" },
      { word: "دواسة", meaning: "Pedal", example: "دواسة بيانو للاستمرار.", emoji: "🦶" },
      { word: "وضعية جلوس", meaning: "Posture", example: "ظهر مستقيم، قدمان على الأرض.", emoji: "🪑" },
      { word: "يد يمنى", meaning: "Right hand", example: "لحن أو ريشة.", emoji: "✋" },
      { word: "يد يسرى", meaning: "Left hand", example: "باص أو مفاتيح دستان.", emoji: "🤚" },
      { word: "أصابع مقوّسة", meaning: "Curved fingers", example: "على مفاتيح البيانو.", emoji: "🤲" },
      { word: "دو المتوسط", meaning: "Middle C", example: "مركز البيانو.", emoji: "🎼" },
      { word: "وتر مفتوح", meaning: "Open string", example: "بدون ضغط أصبع.", emoji: "🎵" },
      { word: "ضبط", meaning: "Tuning", example: "الآلة تُضبط قبل العزف.", emoji: "🔧" },
      { word: "صيانة", meaning: "Maintenance", example: "نظّف آلتك دائمًا.", emoji: "🧼" },
    ],
    dialogue: [
      { speaker: "المعلم", text: "أي آلة تفضّل: بيانو أم جيتار؟" },
      { speaker: "الطالب", text: "بيانو." },
      { speaker: "المعلم", text: "ابحث عن دو المتوسط — أمام قفل البيانو مباشرة." },
      { speaker: "المعلم", text: "اجلس ظهرك مستقيمًا، قدماك على الأرض." },
      { speaker: "الطالب", text: "واليدان؟" },
      { speaker: "المعلم", text: "أصابع مقوّسة كأنك تمسك تفاحة." },
      { speaker: "المعلم", text: "لا تشدّ الكتفين ولا الرسغين." },
      { speaker: "الطالب", text: "متى أعزف؟" },
      { speaker: "المعلم", text: "بعد إتقان الوضعية 3 أيام." },
      { speaker: "المعلم", text: "الوضعية الخاطئة تسبب ألمًا وتوقفًا مبكرًا." },
    ],
    concept: {
      title: "الوضعية قبل النغمة — Posture First",
      explanation:
        "معظم إصابات العازفين سببها وضعية سيئة تُتكرر لسنوات.\n\n" +
        "**البيانو**:\n• كرسي على ارتفاع يجعل الساعدين موازيين للأرض.\n• ظهر مستقيم، قدمان مستويتان.\n• أصابع مقوّسة، رسغ مسترخٍ.\n\n" +
        "**الجيتار**:\n• جلوس مع تثبيت الآلة على الفخذ الأيمن (للأيمن) أو ركبة يسرى (كلاسيك).\n• عنق الجيتار مائل قليلًا للأعلى.\n• إبهام اليد اليسرى خلف العنق في وسطه.\n\n" +
        "**قاعدة**: ألم أثناء العزف = توقّف وراجع الوضعية.",
      tips: [
        { sentence: "اضبط ارتفاع الكرسي/الحزام قبل كل جلسة.", note: "الأساس الصحي." },
        { sentence: "استرخِ الكتفين — لا يجب أن يرتفعا.", note: "التوتر يمنع السرعة." },
        { sentence: "قوّس الأصابع دائمًا.", note: "قوة وتحكم." },
        { sentence: "استرح 5 دقائق كل 25 دقيقة عزف.", note: "بومودورو موسيقي." },
        { sentence: "لا تعزف مع ألم — أوقف فورًا.", note: "الوقاية." },
        { sentence: "امسح الآلة بعد كل جلسة.", note: "صيانة تُطيل عمرها." },
      ],
    },
    exam: [
      { question: "دو المتوسط في البيانو:", options: ["على اليمين", "أمام القفل مباشرة", "على اليسار", "لا يوجد"], correct: 1 },
      { question: "أصابع البيانو:", options: ["ممدودة", "مقوّسة كتفاحة", "مغلقة", "لا يهم"], correct: 1 },
      { question: "الكتفان:", options: ["مرتفعان", "مسترخيان", "مشدودان", "لا يهم"], correct: 1 },
      { question: "عند الألم:", options: ["استمر", "توقّف وراجع الوضعية", "زد الحدة", "لا شيء"], correct: 1 },
      { question: "أفضل جدول:", options: ["25 عزف / 5 راحة", "ساعتان بلا راحة", "دقيقة", "لا شيء"], correct: 0 },
    ],
    homework: [
      { question: "تدرّب 15 دقيقة على:", options: ["الوضعية الصحيحة أمام مرآة", "بلا مرآة", "لا شيء", "أعلى سرعة"], correct: 0 },
      { question: "عرّف على آلتك:", options: ["اكتب أجزاءها في دفترك", "لا شيء", "بيعها", "احفظ فقط"], correct: 0 },
      { question: "استرح:", options: ["كل 25 دقيقة", "بلا استراحة", "كل ساعتين", "لا شيء"], correct: 0 },
      { question: "قبل العزف:", options: ["اضبط الآلة", "اعزف مباشرة", "بلا فحص", "لا شيء"], correct: 0 },
      { question: "التالي:", options: ["أول 5 نغمات على الآلة", "لا شيء", "الرسم", "الرقص"], correct: 0 },
    ],
  }),

  "ar-mus-4-2": buildMusicLesson({
    levelId: L, levelLabel: LB, lessonNumber: 2,
    title: "أول 5 نغمات (Five-Finger Pattern)",
    description: "عزف دو ري مي فا صول باليدين، صعودًا ونزولًا مع الميترونوم.",
    vocab: [
      { word: "نمط الأصابع الخمسة", meaning: "5-finger pattern", example: "دو ري مي فا صول.", emoji: "🖐️" },
      { word: "إبهام", meaning: "Thumb (finger 1)", example: "على دو.", emoji: "👍" },
      { word: "سبابة", meaning: "Index (finger 2)", example: "على ري.", emoji: "👆" },
      { word: "وسطى", meaning: "Middle (3)", example: "على مي.", emoji: "🖕" },
      { word: "بنصر", meaning: "Ring (4)", example: "على فا.", emoji: "💍" },
      { word: "خنصر", meaning: "Pinky (5)", example: "على صول.", emoji: "🤏" },
      { word: "صعود", meaning: "Ascending", example: "من دو إلى صول.", emoji: "⬆️" },
      { word: "نزول", meaning: "Descending", example: "من صول إلى دو.", emoji: "⬇️" },
      { word: "قانوني", meaning: "Legato", example: "نغمات متصلة ناعمة.", emoji: "〰️" },
      { word: "مقطّع", meaning: "Staccato", example: "نغمات قصيرة منفصلة.", emoji: "•" },
      { word: "توازن الأصابع", meaning: "Finger balance", example: "كل نغمة بنفس القوة.", emoji: "⚖️" },
      { word: "استقلال اليدين", meaning: "Hand independence", example: "كل يد بدور مختلف.", emoji: "🤲" },
      { word: "بطء تدريجي", meaning: "Slow build-up", example: "60 → 80 → 100 BPM.", emoji: "📈" },
      { word: "تكرار مركّز", meaning: "Focused repetition", example: "5 تكرارات ممتازة أفضل من 20 مهملة.", emoji: "🎯" },
      { word: "ذاكرة عضلية", meaning: "Muscle memory", example: "تُبنى بالتكرار الصحيح.", emoji: "💪" },
    ],
    dialogue: [
      { speaker: "المعلم", text: "ضع الإبهام الأيمن على دو المتوسط." },
      { speaker: "الطالب", text: "حاضر." },
      { speaker: "المعلم", text: "أصابعك 1-2-3-4-5 على دو-ري-مي-فا-صول." },
      { speaker: "المعلم", text: "اضغط نغمة نغمة صعودًا ثم نزولًا مع الميترونوم على 60." },
      { speaker: "الطالب", text: "بأصابع مقوّسة؟" },
      { speaker: "المعلم", text: "دومًا، وبقوة متساوية." },
      { speaker: "المعلم", text: "الآن اليد اليسرى على أوكتاف أدنى." },
      { speaker: "الطالب", text: "ثم معًا؟" },
      { speaker: "المعلم", text: "نعم — الاستقلال يأتي مع الوقت." },
      { speaker: "المعلم", text: "5 تكرارات ممتازة أفضل من 20 مهملة." },
    ],
    concept: {
      title: "الأساس الحركي — Motor Foundation",
      explanation:
        "أول ما نتقنه هو حركة نظيفة لكل إصبع مع صوت واضح متساوٍ.\n\n" +
        "**بروتوكول التعلّم**:\n1. اليد اليمنى وحدها 3 مرات صعودًا ونزولًا (60 BPM).\n2. اليد اليسرى وحدها بنفس الطريقة.\n3. اليدان معًا ببطء (50 BPM).\n4. زد 5 BPM بعد نجاح 3 تكرارات نظيفة.\n\n" +
        "**قانوني (Legato)**: كل نغمة تعزف قبل رفع السابقة قليلًا — يعطي انسيابية.\n**مقطّع (Staccato)**: نغمات قصيرة منفصلة — يعطي حيوية.\n\n" +
        "لا تتخطى مرحلة قبل إتقانها. الذاكرة العضلية تحفظ الأخطاء كما تحفظ الصواب.",
      tips: [
        { sentence: "قوّس الأصابع دومًا.", note: "قوة وتحكم." },
        { sentence: "استخدم ميترونوم من أول ثانية.", note: "الساعة الداخلية." },
        { sentence: "اليدين منفردتين قبل الاجتماع.", note: "الاستقلال قبل التنسيق." },
        { sentence: "توقف عند الخطأ وأعد المقطع بطيئًا.", note: "لا تكرّر الخطأ." },
        { sentence: "الجودة قبل الكمية.", note: "خمس دقائق مركّزة > ساعة مشتتة." },
        { sentence: "سجّل نفسك أسبوعيًا للمقارنة.", note: "تتبع التقدم." },
      ],
    },
    exam: [
      { question: "الإبهام الأيمن على:", options: ["دو المتوسط", "صول", "لا", "لا شيء"], correct: 0 },
      { question: "الخنصر على:", options: ["دو", "ري", "مي", "صول"], correct: 3 },
      { question: "أفضل بداية:", options: ["يد واحدة ببطء", "اليدان بأقصى سرعة", "بدون ميترونوم", "بلا نمط"], correct: 0 },
      { question: "Legato:", options: ["مقطّع", "متصل ناعم", "بطيء جدًا", "صمت"], correct: 1 },
      { question: "زيادة السرعة:", options: ["+5 BPM بعد 3 تكرارات نظيفة", "قفزة كبيرة", "بلا زيادة", "أقصى سرعة فورًا"], correct: 0 },
    ],
    homework: [
      { question: "يوميًا:", options: ["10 دقائق نمط 5 أصابع لكل يد", "بلا تمرين", "شهريًا", "أعلى سرعة فقط"], correct: 0 },
      { question: "ابدأ:", options: ["يد يمنى وحدها ثم يسرى", "اليدان مباشرة", "بلا يد", "لا شيء"], correct: 0 },
      { question: "الميترونوم:", options: ["60 BPM ثم تدرّج", "أقصى سرعة", "بلا ميترونوم", "لا شيء"], correct: 0 },
      { question: "عند الخطأ:", options: ["كرّر بطيئًا حتى ينظف", "استمر", "توقف نهائيًا", "لا شيء"], correct: 0 },
      { question: "التالي:", options: ["السلم الكبير الكامل والتآلفات الأساسية", "لا شيء", "الرسم", "الرقص"], correct: 0 },
    ],
  }),

  "ar-mus-4-3": buildMusicLesson({
    levelId: L, levelLabel: LB, lessonNumber: 3,
    title: "السلم الكبير الكامل (C Major Scale)",
    description: "عزف سلم دو الكبير أوكتاف كامل مع تبديل الأصابع (thumb-under).",
    vocab: [
      { word: "سلم كبير", meaning: "Major scale", example: "دو ري مي فا صول لا سي دو.", emoji: "📶" },
      { word: "أوكتاف", meaning: "Octave", example: "8 نغمات كاملة.", emoji: "🎹" },
      { word: "نصف نغمة", meaning: "Half step", example: "بين مي-فا وسي-دو.", emoji: "½" },
      { word: "نغمة كاملة", meaning: "Whole step", example: "بين دو-ري وري-مي.", emoji: "1️⃣" },
      { word: "بنية السلم", meaning: "Scale formula", example: "ك-ك-ن-ك-ك-ك-ن.", emoji: "🧱" },
      { word: "ثم تحت", meaning: "Thumb-under", example: "الإبهام يمر تحت الأصابع.", emoji: "👍" },
      { word: "أصابع صعودًا", meaning: "Ascending fingering", example: "1-2-3-1-2-3-4-5.", emoji: "⬆️" },
      { word: "أصابع نزولًا", meaning: "Descending fingering", example: "5-4-3-2-1-3-2-1.", emoji: "⬇️" },
      { word: "تنسيق يدين", meaning: "Two-hand coordination", example: "اليدان بحركة مرآة.", emoji: "🪞" },
      { word: "انسيابية", meaning: "Fluidity", example: "بدون تعثّر.", emoji: "🌊" },
      { word: "استقامة رسغ", meaning: "Wrist alignment", example: "دون كسر لأعلى أو أسفل.", emoji: "✋" },
      { word: "تركيز", meaning: "Focus", example: "دقيقتان مركّزتان > عشرة مشتتة.", emoji: "🎯" },
      { word: "لغة سلم", meaning: "Scale language", example: "أساس اللحن والارتجال.", emoji: "🗣️" },
      { word: "تحضير ذهني", meaning: "Mental preview", example: "تخيّل الحركة قبل تنفيذها.", emoji: "🧠" },
      { word: "إتقان", meaning: "Mastery", example: "بالتدرّج والصبر.", emoji: "🏆" },
    ],
    dialogue: [
      { speaker: "المعلم", text: "سلم دو الكبير بلا صولفة سوداء." },
      { speaker: "الطالب", text: "لماذا نبدأ به؟" },
      { speaker: "المعلم", text: "أبسط سلم، وأساس فهم بقية السلالم." },
      { speaker: "المعلم", text: "اليد اليمنى: 1-2-3-1-2-3-4-5 صعودًا." },
      { speaker: "الطالب", text: "ما هذا التبديل؟" },
      { speaker: "المعلم", text: "«ثم تحت» — الإبهام يمر تحت الأصابع لتغطية 8 نغمات." },
      { speaker: "المعلم", text: "نزولًا: 5-4-3-2-1-3-2-1." },
      { speaker: "الطالب", text: "واليسرى؟" },
      { speaker: "المعلم", text: "بالعكس تقريبًا: 5-4-3-2-1-3-2-1 صعودًا." },
      { speaker: "المعلم", text: "ابدأ 60 BPM يد وحدها." },
    ],
    concept: {
      title: "السلم الكبير — بنيته وسرّه",
      explanation:
        "**بنية السلم الكبير** (ك = نغمة كاملة، ن = نصف نغمة):\nك-ك-ن-ك-ك-ك-ن\n\nمن دو: دو → ري (ك) → مي (ك) → فا (ن) → صول (ك) → لا (ك) → سي (ك) → دو (ن). أنصاف النغمات دائمًا بين 3-4 و 7-8.\n\n" +
        "**سرّ تبديل الأصابع**: عندنا 5 أصابع و 8 نغمات → لا بدّ من عبور الإبهام تحت الوسطى صعودًا، أو عبور الوسطى فوق الإبهام نزولًا. الأصابع القياسية:\n• يد يمنى صعودًا: 1-2-3-1-2-3-4-5.\n• يد يمنى نزولًا: 5-4-3-2-1-3-2-1.\n\n" +
        "**تدرّج السرعة**: 60 → 70 → 80 → 100 BPM بعد كل نجاح.",
      tips: [
        { sentence: "احفظ بنية السلم قبل حفظ الأصابع.", note: "الفهم قبل الحفظ." },
        { sentence: "الإبهام يمر تحت بسلاسة بلا رفع الرسغ.", note: "الحركة الاقتصادية." },
        { sentence: "لا تكسر الرسغ لأعلى.", note: "استقامة تحمي وتُسرّع." },
        { sentence: "يمين وحدها ثم يسرى ثم معًا.", note: "التدرج." },
        { sentence: "تخيّل الحركة قبل تنفيذها.", note: "تحضير ذهني." },
        { sentence: "ثلاث تكرارات نظيفة قبل زيادة السرعة.", note: "الجودة قبل الكمّ." },
      ],
    },
    exam: [
      { question: "أنصاف النغمات في السلم الكبير بين:", options: ["1-2 و 5-6", "3-4 و 7-8", "لا يوجد", "كل النغمات"], correct: 1 },
      { question: "بنية السلم الكبير:", options: ["ك-ك-ن-ك-ك-ك-ن", "ك-ن-ك-ن-ك-ن-ك", "كلها ن", "كلها ك"], correct: 0 },
      { question: "أصابع يد يمنى صعودًا:", options: ["1-2-3-1-2-3-4-5", "1-2-3-4-5", "5-4-3-2-1", "عشوائي"], correct: 0 },
      { question: "«ثم تحت»:", options: ["الإبهام تحت الأصابع", "رفع الرسغ", "عزف مغلوط", "لا شيء"], correct: 0 },
      { question: "أفضل بداية:", options: ["يد واحدة ببطء", "اليدان بأقصى سرعة", "بدون ميترونوم", "بلا نمط"], correct: 0 },
    ],
    homework: [
      { question: "يوميًا:", options: ["سلم دو أوكتاف صعود ونزول 10 مرات لكل يد", "بلا تمرين", "شهريًا", "بلا يد"], correct: 0 },
      { question: "الميترونوم:", options: ["60 → 100 BPM تدرّجًا", "أقصى سرعة", "بلا ميترونوم", "لا شيء"], correct: 0 },
      { question: "الإبهام:", options: ["يمر تحت بسلاسة بلا كسر رسغ", "يقفز فوق", "لا شيء", "بلا حركة"], correct: 0 },
      { question: "اليدان:", options: ["منفردتين ثم معًا", "معًا فورًا", "لا شيء", "لا يد"], correct: 0 },
      { question: "التالي:", options: ["التآلفات الثلاثية (دو-مي-صول)", "لا شيء", "الرسم", "الرقص"], correct: 0 },
    ],
  }),

  "ar-mus-4-4": buildMusicLesson({
    levelId: L, levelLabel: LB, lessonNumber: 4,
    title: "التآلفات الأساسية (Basic Chords)",
    description: "بناء التآلف الكبير والصغير، وعزف تآلفات I-IV-V في مقام دو.",
    vocab: [
      { word: "تآلف", meaning: "Chord", example: "3 نغمات معًا.", emoji: "🎹" },
      { word: "تآلف كبير", meaning: "Major chord", example: "مشرق (دو-مي-صول).", emoji: "☀️" },
      { word: "تآلف صغير", meaning: "Minor chord", example: "حزين (لا-دو-مي).", emoji: "🌙" },
      { word: "قرار", meaning: "Root", example: "أساس التآلف.", emoji: "🏠" },
      { word: "ثالثة", meaning: "Third", example: "تحدد كبير أم صغير.", emoji: "3️⃣" },
      { word: "خامسة", meaning: "Fifth", example: "تعطي الاستقرار.", emoji: "5️⃣" },
      { word: "I", meaning: "Tonic (root chord)", example: "التآلف الأول (دو).", emoji: "1️⃣" },
      { word: "IV", meaning: "Subdominant", example: "التآلف الرابع (فا).", emoji: "4️⃣" },
      { word: "V", meaning: "Dominant", example: "التآلف الخامس (صول).", emoji: "5️⃣" },
      { word: "تسلسل", meaning: "Progression", example: "I-IV-V-I أساس آلاف الأغاني.", emoji: "🔗" },
      { word: "قلب أول", meaning: "First inversion", example: "الثالثة في الأسفل.", emoji: "🔄" },
      { word: "قلب ثانٍ", meaning: "Second inversion", example: "الخامسة في الأسفل.", emoji: "🔃" },
      { word: "رنين", meaning: "Sustain", example: "استمرار الصوت.", emoji: "🎵" },
      { word: "توزيع", meaning: "Voicing", example: "ترتيب نغمات التآلف.", emoji: "🎼" },
      { word: "مصاحبة", meaning: "Accompaniment", example: "تآلفات تحت اللحن.", emoji: "🎶" },
    ],
    dialogue: [
      { speaker: "المعلم", text: "تآلف دو الكبير: دو-مي-صول." },
      { speaker: "الطالب", text: "أعزفها معًا بيد واحدة؟" },
      { speaker: "المعلم", text: "نعم — 1، 3، 5." },
      { speaker: "المعلم", text: "لتحويله لصغير: أنزل مي نصف نغمة إلى مي بيمول." },
      { speaker: "الطالب", text: "الفرق واضح — أشرق ثم أحزن." },
      { speaker: "المعلم", text: "بالضبط. الثالثة هي التي تحدد المزاج." },
      { speaker: "المعلم", text: "الآن I-IV-V في دو = دو-فا-صول." },
      { speaker: "الطالب", text: "أعرف هذه من أغانٍ كثيرة!" },
      { speaker: "المعلم", text: "لأن هذا التسلسل يحرّك آلاف الأغاني الشعبية." },
      { speaker: "المعلم", text: "تدرّب على انتقال سلس بين الثلاثة." },
    ],
    concept: {
      title: "التآلف — قصة ثلاث نغمات",
      explanation:
        "**بناء التآلف الثلاثي (Triad)**: قرار + ثالثة + خامسة.\n\n" +
        "• **كبير**: ثالثة كبيرة (2 نغمة كاملة) + ثالثة صغيرة (1.5). مثال: دو-مي-صول.\n" +
        "• **صغير**: ثالثة صغيرة + كبيرة. مثال: لا-دو-مي.\n\n" +
        "**تسلسل I-IV-V** في دو الكبير:\n• I = دو (دو-مي-صول)\n• IV = فا (فا-لا-دو)\n• V = صول (صول-سي-ري)\n\n" +
        "هذا التسلسل الأساس لآلاف الأغاني (بلوز، بوب، شعبي). تعلّمه = تفتح خزينة الموسيقى.\n\n" +
        "**القلوب (Inversions)**: نفس نغمات التآلف بترتيب مختلف، تجعل الانتقالات ناعمة.",
      tips: [
        { sentence: "احفظ شكل يدك لكل تآلف قبل السرعة.", note: "الشكل ذاكرة." },
        { sentence: "الثالثة تحدد الشعور (كبير/صغير).", note: "مفتاح المزاج." },
        { sentence: "استخدم القلوب لجعل الانتقال ناعمًا.", note: "أقل حركة يد." },
        { sentence: "تدرّب على I-IV-V-I في كل السلالم البسيطة.", note: "نقل المفاهيم." },
        { sentence: "اعزف تآلفات ببطء وأصغِ للتناغم.", note: "الأذن تتعلم." },
        { sentence: "الشبك مع اللحن يجيء بعد إتقان التآلفات وحدها.", note: "الأساس أولًا." },
      ],
    },
    exam: [
      { question: "تآلف دو الكبير:", options: ["دو-مي-صول", "دو-فا-لا", "دو-ري-مي", "دو-صول-سي"], correct: 0 },
      { question: "الفرق بين كبير وصغير:", options: ["الثالثة", "الخامسة", "القرار", "لا فرق"], correct: 0 },
      { question: "V في دو =", options: ["فا", "صول", "لا", "دو"], correct: 1 },
      { question: "التسلسل الأشهر:", options: ["I-IV-V", "V-I-VI", "III-VI-II", "لا شيء"], correct: 0 },
      { question: "القلب الأول:", options: ["الثالثة في الأسفل", "القرار في الأسفل", "الخامسة في الوسط", "لا شيء"], correct: 0 },
    ],
    homework: [
      { question: "احفظ:", options: ["3 تآلفات: دو، فا، صول بيدك اليمنى", "بلا حفظ", "10 تآلفات فورًا", "لا شيء"], correct: 0 },
      { question: "تدرّب على:", options: ["انتقال I-IV-V-I ببطء", "بأقصى سرعة", "بلا انتقال", "لا شيء"], correct: 0 },
      { question: "استمع لأغنية بوب:", options: ["حاول التعرّف على I-IV-V فيها", "لا شيء", "احفظ اسمها فقط", "بلا استماع"], correct: 0 },
      { question: "قارن:", options: ["دو كبير ودو صغير — لاحظ المزاج", "لا مقارنة", "لا شيء", "احذف"], correct: 0 },
      { question: "التالي:", options: ["مصاحبة لحن بسيط بتآلفات", "لا شيء", "الرسم", "الرقص"], correct: 0 },
    ],
  }),

  "ar-mus-4-5": buildMusicLesson({
    levelId: L, levelLabel: LB, lessonNumber: 5,
    title: "أول قطعة كاملة: أغنية شعبية",
    description: "دمج السلم والتآلفات لعزف أغنية بسيطة كاملة (مثل «ليلة عيد»).",
    vocab: [
      { word: "قطعة", meaning: "Piece", example: "أول قطعة كاملة.", emoji: "🎵" },
      { word: "لحن", meaning: "Melody", example: "الخط الأساسي.", emoji: "🎶" },
      { word: "مصاحبة", meaning: "Accompaniment", example: "تآلفات تحت اللحن.", emoji: "🎹" },
      { word: "يد يمنى لحن", meaning: "RH melody", example: "اللحن باليمنى.", emoji: "✋" },
      { word: "يد يسرى تآلفات", meaning: "LH chords", example: "التآلفات باليسرى.", emoji: "🤚" },
      { word: "تقسيم", meaning: "Sectioning", example: "قسّم القطعة لجمل.", emoji: "✂️" },
      { word: "جملة", meaning: "Phrase", example: "4 مازورات عادةً.", emoji: "📝" },
      { word: "تكرار", meaning: "Repetition", example: "كل جملة 5 مرات.", emoji: "🔁" },
      { word: "تسلسل تعلّم", meaning: "Learning sequence", example: "يمنى → يسرى → معًا.", emoji: "📶" },
      { word: "بروڤة", meaning: "Run-through", example: "أداء بلا توقف.", emoji: "🎤" },
      { word: "خطأ نظيف", meaning: "Recover smoothly", example: "استمر لا تتوقف.", emoji: "✅" },
      { word: "تسجيل", meaning: "Recording", example: "قيّم أدائك.", emoji: "🎙️" },
      { word: "متعة", meaning: "Enjoyment", example: "أول قطعة = فرح كبير!", emoji: "🎉" },
      { word: "التزام", meaning: "Commitment", example: "20 دقيقة يوميًا.", emoji: "📅" },
      { word: "خطوة قادمة", meaning: "Next step", example: "قطعة أكبر أو نوع جديد.", emoji: "➡️" },
    ],
    dialogue: [
      { speaker: "المعلم", text: "اليوم نعزف قطعتك الأولى: أغنية بسيطة." },
      { speaker: "الطالب", text: "متحمس!" },
      { speaker: "المعلم", text: "اللحن باليد اليمنى، والتآلفات باليسرى." },
      { speaker: "المعلم", text: "قسّم القطعة إلى 4 جمل، كل جملة 4 مازورات." },
      { speaker: "الطالب", text: "بم أبدأ؟" },
      { speaker: "المعلم", text: "يمنى وحدها كل جملة 5 مرات، ثم يسرى، ثم معًا." },
      { speaker: "المعلم", text: "60 BPM ثم زد بعد نجاح 3 تكرارات نظيفة." },
      { speaker: "الطالب", text: "إذا أخطأت؟" },
      { speaker: "المعلم", text: "استمر — تعلّم استرداد الخطأ يبني الأداء." },
      { speaker: "المعلم", text: "سجّل الأداء النهائي واحتفل به." },
    ],
    concept: {
      title: "أول قطعة — طقس مقدّس",
      explanation:
        "أول قطعة كاملة لحظة فارقة. البروتوكول الذي يضمن النجاح:\n\n" +
        "1. **اقرأ النوتة كاملة** أولًا بلا عزف — افهم البنية.\n" +
        "2. **قسّم إلى جمل** (عادةً 4 مازورات لكل جملة).\n" +
        "3. **يد يمنى وحدها** لكل جملة 5 مرات ببطء (50 BPM).\n" +
        "4. **يد يسرى وحدها** بنفس الطريقة.\n" +
        "5. **معًا ببطء** ثم تدرّج السرعة.\n" +
        "6. **بروڤة كاملة** بلا توقف حتى مع الأخطاء.\n" +
        "7. **سجّل واستمع** — دوّن ملاحظتين للتحسين.\n\n" +
        "استرداد الخطأ مهارة أهم من عدم الخطأ. لا تتوقف في الأداء الحقيقي.",
      tips: [
        { sentence: "افهم القطعة قبل عزفها.", note: "الفهم يقلّل التكرار." },
        { sentence: "قسّم — الجمل الصغيرة أسرع تعلمًا.", note: "التقسيم قوة." },
        { sentence: "يد وحدها قبل الجمع.", note: "الأساس." },
        { sentence: "لا تتوقف عند الخطأ في البروڤة الكاملة.", note: "استرداد." },
        { sentence: "سجّل واستمع بأمانة.", note: "التقدم." },
        { sentence: "احتفل بالإنجاز.", note: "الفرح وقود." },
      ],
    },
    exam: [
      { question: "أول خطوة قبل العزف:", options: ["اقرأ النوتة وافهم البنية", "اعزف مباشرة", "لا شيء", "احفظ عشوائيًا"], correct: 0 },
      { question: "أفضل تقسيم:", options: ["جمل من 4 مازورات", "المقطع كله دفعة", "بلا تقسيم", "مازورة واحدة"], correct: 0 },
      { question: "التسلسل الصحيح:", options: ["يمنى → يسرى → معًا", "معًا فورًا", "يسرى فقط", "لا يد"], correct: 0 },
      { question: "أثناء البروڤة الكاملة عند الخطأ:", options: ["استمر", "توقف", "أعد من البداية", "احذف"], correct: 0 },
      { question: "بعد الأداء:", options: ["سجّل ودوّن ملاحظتين", "احذف", "لا شيء", "شارك دون تقييم"], correct: 0 },
    ],
    homework: [
      { question: "اختر أغنية بسيطة (I-IV-V):", options: ["اعزفها كاملة خلال أسبوع", "لا شيء", "أغنية معقدة", "بلا اختيار"], correct: 0 },
      { question: "يوميًا:", options: ["20 دقيقة تمرين مقسّم لجمل", "بلا تمرين", "شهريًا", "دقائق قليلة عشوائية"], correct: 0 },
      { question: "الميترونوم:", options: ["50 → 80 BPM تدرّجًا", "بلا ميترونوم", "أقصى سرعة", "لا شيء"], correct: 0 },
      { question: "بروڤة كاملة:", options: ["مرة يوميًا بلا توقف", "لا شيء", "شهريًا", "مع توقف كل مازورة"], correct: 0 },
      { question: "المستوى التالي:", options: ["القراءة الموسيقية المتقدمة", "لا شيء", "الرسم", "الطبخ"], correct: 0 },
    ],
  }),
};