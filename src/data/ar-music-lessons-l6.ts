import type { LessonData } from "./lessons";
import { buildMusicLesson } from "./ar-music-shared";

const L = "ar-mus-6";
const LB = "المستوى السادس — الهارموني والتأليف";

export const arMusicLessonsL6: Record<string, LessonData> = {
  "ar-mus-6-1": buildMusicLesson({
    levelId: L, levelLabel: LB, lessonNumber: 1,
    title: "الفواصل الموسيقية (Intervals)",
    description: "قياس المسافة بين نغمتين: ثانية، ثالثة، رابعة، خامسة، وأنواعها.",
    vocab: [
      { word: "فاصل", meaning: "Interval", example: "المسافة بين نغمتين.", emoji: "📏" },
      { word: "ثانية", meaning: "Second", example: "دو → ري.", emoji: "2️⃣" },
      { word: "ثالثة", meaning: "Third", example: "دو → مي.", emoji: "3️⃣" },
      { word: "رابعة", meaning: "Fourth", example: "دو → فا.", emoji: "4️⃣" },
      { word: "خامسة", meaning: "Fifth", example: "دو → صول.", emoji: "5️⃣" },
      { word: "سادسة", meaning: "Sixth", example: "دو → لا.", emoji: "6️⃣" },
      { word: "سابعة", meaning: "Seventh", example: "دو → سي.", emoji: "7️⃣" },
      { word: "أوكتاف", meaning: "Octave", example: "دو → دو الأعلى.", emoji: "8️⃣" },
      { word: "كبير", meaning: "Major", example: "ثالثة كبيرة = 2 نغمة كاملة.", emoji: "☀️" },
      { word: "صغير", meaning: "Minor", example: "ثالثة صغيرة = 1.5 كاملة.", emoji: "🌙" },
      { word: "تام", meaning: "Perfect", example: "الرابعة، الخامسة، الأوكتاف.", emoji: "✅" },
      { word: "مزدوج", meaning: "Doubled", example: "نفس الفاصل مضاعفًا.", emoji: "✖️" },
      { word: "اتفاق", meaning: "Consonance", example: "فاصل مريح.", emoji: "😊" },
      { word: "تنافر", meaning: "Dissonance", example: "فاصل متوتّر.", emoji: "😬" },
      { word: "أذن تمييزية", meaning: "Ear training", example: "تعرّف الفواصل بالأذن.", emoji: "👂" },
    ],
    dialogue: [
      { speaker: "المعلم", text: "الفاصل مسافة بين نغمتين — نعدّ من الأولى إلى الثانية شاملًا الطرفين." },
      { speaker: "الطالب", text: "دو إلى مي؟" },
      { speaker: "المعلم", text: "دو-ري-مي = 3 نغمات = ثالثة." },
      { speaker: "المعلم", text: "دو إلى صول = خامسة." },
      { speaker: "الطالب", text: "متى كبيرة ومتى صغيرة؟" },
      { speaker: "المعلم", text: "ثالثة كبيرة = 2 نغمة كاملة، صغيرة = 1.5." },
      { speaker: "المعلم", text: "الرابعة والخامسة والأوكتاف نُسمّيها «تامّة»." },
      { speaker: "الطالب", text: "الاتفاق والتنافر؟" },
      { speaker: "المعلم", text: "الثالثات والسادسات مريحة (اتفاق)، الثواني والسابعات متوترة (تنافر)." },
      { speaker: "المعلم", text: "درّب أذنك: اسمع فاصلًا وسمّه." },
    ],
    concept: {
      title: "الفاصل — لبنة الهارموني",
      explanation:
        "الفاصل الرقمي يُحسب بعدّ النغمات شاملة الطرفين (دو-مي = 1-2-3 = ثالثة).\n\n" +
        "**الفواصل بالتفصيل** (من دو):\n• ثانية كبيرة: دو-ري (1 نغمة كاملة).\n• ثالثة كبيرة: دو-مي (2 كاملة). ثالثة صغيرة: دو-مي♭ (1.5).\n• رابعة تامّة: دو-فا (2.5).\n• خامسة تامّة: دو-صول (3.5).\n• سادسة كبيرة: دو-لا (4.5).\n• سابعة كبيرة: دو-سي (5.5). سابعة صغيرة: دو-سي♭ (5).\n• أوكتاف تام: دو-دو (6).\n\n" +
        "**اتفاق/تنافر**: الثالثات والسادسات والخامسات = اتفاق. الثواني والسابعات = تنافر (يحتاج حلًّا).\n\n" +
        "**تدريب الأذن**: كل فاصل مرتبط بأغنية (مثال: خامسة تامة صاعدة = بداية Twinkle Twinkle).",
      tips: [
        { sentence: "احسب الفاصل شاملًا الطرفين.", note: "قاعدة العدّ." },
        { sentence: "الرابعة والخامسة والأوكتاف = «تامّة»، لا كبيرة/صغيرة.", note: "تسمية خاصة." },
        { sentence: "الثالثات جوهر الهارموني.", note: "التآلفات مبنية عليها." },
        { sentence: "اربط كل فاصل بأغنية معروفة.", note: "ذاكرة سمعية." },
        { sentence: "تدرّب على تمييز الفواصل بالأذن يوميًا 5 دقائق.", note: "أذن حسّاسة." },
        { sentence: "التنافر ليس عيبًا — هو محرك التوتر.", note: "أدب موسيقي." },
      ],
    },
    exam: [
      { question: "دو إلى صول:", options: ["ثالثة", "رابعة", "خامسة", "سادسة"], correct: 2 },
      { question: "الرابعة والخامسة تُسمّى:", options: ["كبيرة/صغيرة", "تامّة", "لا شيء", "زائدة"], correct: 1 },
      { question: "ثالثة كبيرة:", options: ["1 كاملة", "1.5", "2 كاملة", "3"], correct: 2 },
      { question: "التنافر:", options: ["مريح", "متوتر يحتاج حلًا", "لا يوجد", "خطأ"], correct: 1 },
      { question: "أوكتاف:", options: ["3 نغمات", "8 نغمات", "10", "لا يوجد"], correct: 1 },
    ],
    homework: [
      { question: "احفظ:", options: ["الفواصل من دو مع أمثلة من أغانٍ", "لا شيء", "بلا حفظ", "أرقام فقط"], correct: 0 },
      { question: "تدريب الأذن:", options: ["5 دقائق يوميًا لتمييز الفواصل", "شهريًا", "لا شيء", "بلا تدريب"], correct: 0 },
      { question: "اعزف:", options: ["ثالثة كبيرة وصغيرة وقارن الشعور", "لا شيء", "بلا مقارنة", "احذف"], correct: 0 },
      { question: "اسمع أغنية:", options: ["حدّد فاصل بدايتها", "لا شيء", "احفظ سعرها", "بلا استماع"], correct: 0 },
      { question: "التالي:", options: ["المقامات الكبيرة والصغيرة", "لا شيء", "الرسم", "الرقص"], correct: 0 },
    ],
  }),

  "ar-mus-6-2": buildMusicLesson({
    levelId: L, levelLabel: LB, lessonNumber: 2,
    title: "المقامات الكبيرة والصغيرة (Major & Minor Keys)",
    description: "الفرق في البنية والمزاج، والمقامات النسبية، والسلم الصغير بأشكاله الثلاثة.",
    vocab: [
      { word: "مقام كبير", meaning: "Major key", example: "مشرق فرح.", emoji: "☀️" },
      { word: "مقام صغير", meaning: "Minor key", example: "حزين متأمل.", emoji: "🌙" },
      { word: "نسبي صغير", meaning: "Relative minor", example: "لا صغير نسبي دو كبير.", emoji: "🔗" },
      { word: "طبيعي", meaning: "Natural minor", example: "بدون تعديلات.", emoji: "🌱" },
      { word: "توافقي", meaning: "Harmonic minor", example: "سابعة مرفوعة.", emoji: "🎼" },
      { word: "لحني", meaning: "Melodic minor", example: "صعود مرفوع، نزول طبيعي.", emoji: "🎵" },
      { word: "درجة السلم", meaning: "Scale degree", example: "1، 2، 3... 7.", emoji: "🔢" },
      { word: "قرار", meaning: "Tonic (1st degree)", example: "بيت المقام.", emoji: "🏠" },
      { word: "مسيطر", meaning: "Dominant (5th)", example: "درجة التوتر.", emoji: "⚡" },
      { word: "قائد", meaning: "Leading tone (7th)", example: "يقود للقرار.", emoji: "➡️" },
      { word: "بنية كبيرة", meaning: "Major formula", example: "ك-ك-ن-ك-ك-ك-ن.", emoji: "☀️" },
      { word: "بنية صغيرة", meaning: "Minor formula", example: "ك-ن-ك-ك-ن-ك-ك.", emoji: "🌙" },
      { word: "حساسية", meaning: "Modal color", example: "لكل مقام لون شعوري.", emoji: "🎨" },
      { word: "تحويل", meaning: "Modulation", example: "الانتقال بين مقامات.", emoji: "🔀" },
      { word: "تحليل", meaning: "Analysis", example: "افحص مقام أي أغنية.", emoji: "🔍" },
    ],
    dialogue: [
      { speaker: "المعلم", text: "المقام الكبير مشرق، الصغير متأمل." },
      { speaker: "الطالب", text: "الفرق البنيوي؟" },
      { speaker: "المعلم", text: "الكبير: ك-ك-ن-ك-ك-ك-ن. الصغير: ك-ن-ك-ك-ن-ك-ك." },
      { speaker: "المعلم", text: "لا الصغير النسبي لدو الكبير — نفس النغمات، بداية مختلفة." },
      { speaker: "الطالب", text: "لماذا 3 أشكال للصغير؟" },
      { speaker: "المعلم", text: "الطبيعي لا يعطي إحساسًا قويًا بالحل عند السابعة." },
      { speaker: "المعلم", text: "التوافقي يرفع السابعة نصف نغمة — إحساس مشرق قوي عند الحل." },
      { speaker: "الطالب", text: "واللحني؟" },
      { speaker: "المعلم", text: "صعود: سادسة وسابعة مرفوعة. نزول: طبيعي." },
      { speaker: "المعلم", text: "استمع لأمثلة لتحسّ الفرق." },
    ],
    concept: {
      title: "المزاج الموسيقي — Key Character",
      explanation:
        "**المقام الكبير**: ك-ك-ن-ك-ك-ك-ن. طابع مشرق.\n**المقام الصغير الطبيعي**: ك-ن-ك-ك-ن-ك-ك. طابع حزين.\n\n" +
        "**المقام النسبي**: كل مقام كبير له صغير نسبي يبدأ من درجته السادسة (دو كبير ↔ لا صغير).\n\n" +
        "**أشكال الصغير**:\n• طبيعي: بلا تعديل.\n• توافقي (Harmonic): سابعة مرفوعة نصف نغمة (لتقوية الحل). مثال في لا صغير: صول → صول♯.\n• لحني (Melodic): صعودًا سادسة وسابعة مرفوعتان؛ نزولًا طبيعي.\n\n" +
        "**التحديد السريع**: انظر آخر نغمة في القطعة — غالبًا القرار. ثم افحص دليل المقام.",
      tips: [
        { sentence: "ادرس مقامًا واحدًا لأسبوع.", note: "التركيز يبني الأذن." },
        { sentence: "قارن كبير ونسبيه الصغير على البيانو.", note: "نفس النغمات، إحساس مختلف." },
        { sentence: "الصغير التوافقي أقوى في الحل.", note: "لذا الأكثر استخدامًا في الكلاسيك." },
        { sentence: "استخدم اللحني في الألحان الصاعدة.", note: "أنعم." },
        { sentence: "افحص آخر نغمة لتحديد المقام غالبًا.", note: "قاعدة عملية." },
        { sentence: "استمع لأغانٍ من مقامات مختلفة يوميًا.", note: "ذوق واسع." },
      ],
    },
    exam: [
      { question: "بنية المقام الكبير:", options: ["ك-ك-ن-ك-ك-ك-ن", "ك-ن-ك-ك-ن-ك-ك", "كلها ك", "كلها ن"], correct: 0 },
      { question: "نسبي دو الكبير:", options: ["لا صغير", "صول صغير", "فا صغير", "لا يوجد"], correct: 0 },
      { question: "الصغير التوافقي:", options: ["سابعة مرفوعة", "بلا تعديل", "خامسة مرفوعة", "لا يوجد"], correct: 0 },
      { question: "الصغير اللحني:", options: ["صعود مرفوع، نزول طبيعي", "دائمًا مرفوع", "بلا تعديل", "لا يوجد"], correct: 0 },
      { question: "الطابع الكبير:", options: ["حزين", "مشرق", "غامض", "لا شيء"], correct: 1 },
    ],
    homework: [
      { question: "اعزف:", options: ["دو كبير ولا صغير — قارن الشعور", "بلا مقارنة", "لا شيء", "احذف"], correct: 0 },
      { question: "ادرس:", options: ["مقام صغير واحد بأشكاله الثلاثة", "10 مقامات دفعة", "لا شيء", "بلا دراسة"], correct: 0 },
      { question: "استمع:", options: ["3 أغانٍ وحدد مقامها (كبير/صغير)", "لا شيء", "احفظ أسعارها", "بلا استماع"], correct: 0 },
      { question: "أنشئ:", options: ["لحن قصير في لا الصغير التوافقي", "لا شيء", "بلا إبداع", "احذف"], correct: 0 },
      { question: "التالي:", options: ["تسلسلات هارمونية شهيرة (Chord Progressions)", "لا شيء", "الرسم", "الرقص"], correct: 0 },
    ],
  }),

  "ar-mus-6-3": buildMusicLesson({
    levelId: L, levelLabel: LB, lessonNumber: 3,
    title: "التسلسلات الهارمونية الشهيرة",
    description: "I-V-vi-IV (أغاني البوب)، ii-V-I (الجاز)، الحل التام، والحلقة الخداعية.",
    vocab: [
      { word: "I-V-vi-IV", meaning: "Pop progression", example: "أشهر تسلسل في البوب.", emoji: "🎵" },
      { word: "ii-V-I", meaning: "Jazz cadence", example: "الحل الجازي.", emoji: "🎷" },
      { word: "حل تام", meaning: "Authentic cadence", example: "V → I.", emoji: "✅" },
      { word: "حل خداعي", meaning: "Deceptive cadence", example: "V → vi بدل V → I.", emoji: "🎭" },
      { word: "نصف حل", meaning: "Half cadence", example: "ينتهي على V.", emoji: "🔄" },
      { word: "بوق قاعدي", meaning: "Bass motion", example: "حركة الباص = روح التسلسل.", emoji: "🎸" },
      { word: "دوران", meaning: "Cycle", example: "تسلسل يتكرر.", emoji: "🔁" },
      { word: "ذروة", meaning: "Climax", example: "أعلى نقطة توتر.", emoji: "⛰️" },
      { word: "استقرار", meaning: "Resolution", example: "الوصول للـ I يريح الأذن.", emoji: "🏠" },
      { word: "بوغن", meaning: "Turnaround", example: "عودة سريعة للـ I.", emoji: "↩️" },
      { word: "تنويع", meaning: "Reharmonization", example: "استبدال تآلف بآخر.", emoji: "🔀" },
      { word: "خامسات نازلة", meaning: "Descending 5ths", example: "vi-ii-V-I.", emoji: "⬇️" },
      { word: "توتر", meaning: "Tension", example: "V يبني توترًا.", emoji: "⚡" },
      { word: "لون هارموني", meaning: "Harmonic color", example: "التسلسلات تلوّن الأغنية.", emoji: "🎨" },
      { word: "تحليل حسّي", meaning: "Ear analysis", example: "سمع التسلسل قبل قراءته.", emoji: "👂" },
    ],
    dialogue: [
      { speaker: "المعلم", text: "I-V-vi-IV هو المحرك الخفي لآلاف أغاني البوب." },
      { speaker: "الطالب", text: "في دو الكبير؟" },
      { speaker: "المعلم", text: "دو-صول-لا صغير-فا." },
      { speaker: "المعلم", text: "ii-V-I جوهر الجاز — تسلسل حل قوي." },
      { speaker: "الطالب", text: "في دو؟" },
      { speaker: "المعلم", text: "ري صغير-صول-دو." },
      { speaker: "المعلم", text: "الحل التام: V → I يعطي إحساس النهاية." },
      { speaker: "الطالب", text: "والخداعي؟" },
      { speaker: "المعلم", text: "V → vi بدل V → I — يخدع الأذن ويطيل الأغنية." },
      { speaker: "المعلم", text: "اسمع أغانيك المفضلة وحلّل تسلسلاتها." },
    ],
    concept: {
      title: "التسلسل يروي القصة — Progressions Tell Stories",
      explanation:
        "**I-V-vi-IV** (Pop): مشرق أمل. مثال في دو: C-G-Am-F. سمعتها في مئات الأغاني.\n\n" +
        "**ii-V-I** (Jazz): حل قوي متأنٍ. في دو: Dm-G-C.\n\n" +
        "**الحلول (Cadences)**:\n• تام (Authentic): V → I — إحساس نهاية قاطع.\n• خداعي (Deceptive): V → vi — تأجيل النهاية.\n• نصف (Half): ينتهي على V — إحساس سؤال.\n• قاطع (Plagal): IV → I — إحساس روحي («آمين»).\n\n" +
        "**دوران (Turnaround)**: I-vi-ii-V يعيد للبداية بأناقة. أساس الجاز.\n\n" +
        "قاعدة إبداعية: حلّل 5 أغانٍ تحبها هذا الأسبوع، اكتشف نمطًا مشتركًا.",
      tips: [
        { sentence: "احفظ I-V-vi-IV في 3 مقامات.", note: "نقل المهارة." },
        { sentence: "الحل التام قوي — استخدمه للنهايات.", note: "قوة الختام." },
        { sentence: "الخداعي يمنح الأغنية طولًا أنيقًا.", note: "مفاجأة محبوبة." },
        { sentence: "حلل أغانيك المفضلة.", note: "الفهم يعمّق التذوق." },
        { sentence: "الباص هو روح الهارموني.", note: "اسمعه." },
        { sentence: "جرّب استبدال تآلف بآخر (Reharm).", note: "إبداع." },
      ],
    },
    exam: [
      { question: "I-V-vi-IV في دو:", options: ["C-G-Am-F", "C-F-G-C", "Dm-G-C", "لا شيء"], correct: 0 },
      { question: "ii-V-I في دو:", options: ["Dm-G-C", "C-G-C", "C-F-C", "لا شيء"], correct: 0 },
      { question: "الحل التام:", options: ["V → I", "IV → I", "V → vi", "I → V"], correct: 0 },
      { question: "الحل الخداعي:", options: ["V → vi", "V → I", "IV → V", "لا يوجد"], correct: 0 },
      { question: "الحل القاطع (Plagal):", options: ["IV → I", "V → I", "ii → V", "لا شيء"], correct: 0 },
    ],
    homework: [
      { question: "اعزف:", options: ["I-V-vi-IV في دو، صول، فا", "بلا عزف", "لا شيء", "احفظ فقط"], correct: 0 },
      { question: "حلّل:", options: ["3 أغانٍ بوب وحدّد تسلسلها", "لا شيء", "احفظ أسعارها", "بلا تحليل"], correct: 0 },
      { question: "أنشئ:", options: ["مقطع 8 مازورات بـ ii-V-I", "لا شيء", "بلا إبداع", "احذف"], correct: 0 },
      { question: "جرّب:", options: ["حل خداعي في مقطع تعرفه", "بلا تجربة", "لا شيء", "احذف"], correct: 0 },
      { question: "التالي:", options: ["أساسيات التأليف اللحني", "لا شيء", "الرسم", "الرقص"], correct: 0 },
    ],
  }),

  "ar-mus-6-4": buildMusicLesson({
    levelId: L, levelLabel: LB, lessonNumber: 4,
    title: "أساسيات التأليف اللحني (Melody Writing)",
    description: "بناء لحن من موتيف صغير، والقفزات، والحركة الخطّية، والذروة اللحنية.",
    vocab: [
      { word: "موتيف", meaning: "Motif", example: "خلية لحنية صغيرة.", emoji: "🌱" },
      { word: "جملة لحنية", meaning: "Melodic phrase", example: "4 مازورات عادةً.", emoji: "📝" },
      { word: "سؤال وجواب", meaning: "Antecedent-consequent", example: "جملتان متكاملتان.", emoji: "🗨️" },
      { word: "حركة خطّية", meaning: "Stepwise motion", example: "بين نغمات مجاورة.", emoji: "➡️" },
      { word: "قفزة", meaning: "Leap", example: "بين نغمات بعيدة.", emoji: "🦘" },
      { word: "ذروة لحنية", meaning: "Melodic climax", example: "أعلى نغمة في اللحن.", emoji: "⛰️" },
      { word: "توازن", meaning: "Balance", example: "قفزات + خطوات = توازن.", emoji: "⚖️" },
      { word: "تكرار", meaning: "Repetition", example: "يبني الألفة.", emoji: "🔁" },
      { word: "تنويع", meaning: "Variation", example: "تكرار مع تغيير طفيف.", emoji: "🔀" },
      { word: "تسلسل", meaning: "Sequence", example: "تكرار الموتيف على درجة مختلفة.", emoji: "📈" },
      { word: "قرار قوي", meaning: "Strong resolution", example: "انتهاء على النغمة 1.", emoji: "🏠" },
      { word: "قرار مفتوح", meaning: "Open ending", example: "انتهاء على النغمة 5.", emoji: "🚪" },
      { word: "شكل ثنائي", meaning: "Binary form (AB)", example: "قسمان متضادان.", emoji: "AB" },
      { word: "شكل ثلاثي", meaning: "Ternary form (ABA)", example: "قسم يعود.", emoji: "ABA" },
      { word: "شخصية لحن", meaning: "Melodic character", example: "بسيط ومميّز = ناجح.", emoji: "🎭" },
    ],
    dialogue: [
      { speaker: "المعلم", text: "لن نبدأ بلحن كامل — بل بموتيف من 3-4 نغمات." },
      { speaker: "الطالب", text: "مثال؟" },
      { speaker: "المعلم", text: "دو-مي-صول-مي = موتيف." },
      { speaker: "المعلم", text: "الجملة الأولى «سؤال» تنتهي على 5." },
      { speaker: "المعلم", text: "الجملة الثانية «جواب» تنتهي على 1." },
      { speaker: "الطالب", text: "أنا أحب القفزات." },
      { speaker: "المعلم", text: "استخدمها باعتدال — بعد كل قفزة عد بخطوة." },
      { speaker: "الطالب", text: "الذروة؟" },
      { speaker: "المعلم", text: "أعلى نغمة مرة واحدة في اللحن — كنجمة." },
      { speaker: "المعلم", text: "احفظ: التكرار مع تنويع = الجمال." },
    ],
    concept: {
      title: "التأليف بناء عاقل — Composition is Craft",
      explanation:
        "**اللبنة الأساسية**: الموتيف — 3 إلى 5 نغمات لها إيقاع ولون واضحان.\n\n" +
        "**تطوير الموتيف**:\n• **تكرار**: نفس الموتيف مرة أخرى.\n• **تنويع**: نفس النغمات بإيقاع مختلف، أو العكس.\n• **تسلسل**: نفس الموتيف على درجة أعلى/أدنى.\n\n" +
        "**بنية الجملة**: 4 مازورات = جملة. جملتان (سؤال 4 + جواب 4) = فترة كاملة.\n\n" +
        "**قواعد ذوق**:\n1. الخطوات أكثر من القفزات.\n2. بعد قفزة كبيرة اعكس الاتجاه بخطوة.\n3. ذروة واحدة فقط.\n4. قرار قوي على 1، مفتوح على 5.\n\n" +
        "**أشكال**: AB (ثنائي)، ABA (ثلاثي — الأكثر إرضاءً للأذن)، ABACA (روندو).",
      tips: [
        { sentence: "ابدأ بموتيف قصير جدًا.", note: "أقل = أعمق." },
        { sentence: "كرّر ثم نوّع.", note: "الأذن تحب الألفة والمفاجأة." },
        { sentence: "قفزة ثم خطوة عكسية.", note: "توازن." },
        { sentence: "ذروة واحدة فقط.", note: "بؤرة واحدة أقوى." },
        { sentence: "غنِّ لحنك بلا آلة — إن غُنّي بسهولة فهو ناجح.", note: "اختبار الصوت البشري." },
        { sentence: "لا تعقّد — البسيط الأنيق يدوم.", note: "الحكمة الفنية." },
      ],
    },
    exam: [
      { question: "الموتيف:", options: ["أغنية كاملة", "خلية لحنية صغيرة (3-5 نغمات)", "تآلف", "سلم"], correct: 1 },
      { question: "جملة موسيقية غالبًا:", options: ["مازورة", "4 مازورات", "20 مازورة", "بلا حدّ"], correct: 1 },
      { question: "بعد قفزة كبيرة:", options: ["قفزة أكبر", "خطوة عكسية", "توقف", "لا شيء"], correct: 1 },
      { question: "الذروة:", options: ["كل مازورة", "مرة واحدة في اللحن", "لا يوجد", "أول نغمة"], correct: 1 },
      { question: "شكل ABA:", options: ["ثنائي", "ثلاثي (روندو مختصر)", "لا شيء", "خطأ"], correct: 1 },
    ],
    homework: [
      { question: "أنشئ:", options: ["موتيف 4 نغمات وكرّره بتنويع 3 مرات", "لا شيء", "بلا إبداع", "احذف"], correct: 0 },
      { question: "اكتب:", options: ["جملة سؤال وجملة جواب (8 مازورات)", "بلا كتابة", "لا شيء", "احذف"], correct: 0 },
      { question: "غنِّ لحنك:", options: ["اختبار الصوت البشري", "لا شيء", "بلا اختبار", "احذف"], correct: 0 },
      { question: "استمع لحن:", options: ["حدّد موتيفه الأساسي", "لا شيء", "بلا تحليل", "احذف"], correct: 0 },
      { question: "التالي:", options: ["الارتجال والتأليف الحرّ", "لا شيء", "الرسم", "الرقص"], correct: 0 },
    ],
  }),

  "ar-mus-6-5": buildMusicLesson({
    levelId: L, levelLabel: LB, lessonNumber: 5,
    title: "الارتجال وتأليف قطعتك الأولى",
    description: "دمج التآلفات والفواصل واللحن لتأليف قطعة أصلية قصيرة وتقديمها.",
    vocab: [
      { word: "ارتجال", meaning: "Improvisation", example: "تأليف فوري.", emoji: "🎨" },
      { word: "قالب هارموني", meaning: "Chord frame", example: "أساس للارتجال.", emoji: "🖼️" },
      { word: "سلم بلوز", meaning: "Blues scale", example: "6 نغمات — ارتجال سهل.", emoji: "🎷" },
      { word: "نغمات ركيزة", meaning: "Guide tones", example: "3 و 7 لكل تآلف.", emoji: "📌" },
      { word: "استماع نشط", meaning: "Active listening", example: "استمع لتآلف قبل عزفه.", emoji: "👂" },
      { word: "تخطيط", meaning: "Structure planning", example: "AABA، ABAC، وردية.", emoji: "📋" },
      { word: "قطعة أصلية", meaning: "Original piece", example: "ملكك أنت.", emoji: "🎼" },
      { word: "تسجيل نقي", meaning: "Clean recording", example: "قدّم قطعتك بجودة.", emoji: "🎙️" },
      { word: "عنوان", meaning: "Title", example: "امنح قطعتك اسمًا.", emoji: "🏷️" },
      { word: "مشاركة", meaning: "Sharing", example: "شاركها مع مجتمعك.", emoji: "🤝" },
      { word: "تقييم بنّاء", meaning: "Constructive feedback", example: "تقبّل الملاحظات بذكاء.", emoji: "💬" },
      { word: "مسار مستمر", meaning: "Ongoing journey", example: "الموسيقى رحلة عمر.", emoji: "🛤️" },
      { word: "مكتبة قطع", meaning: "Portfolio", example: "اجمع أعمالك.", emoji: "📚" },
      { word: "توقيع فني", meaning: "Signature style", example: "أسلوبك المميّز.", emoji: "✍️" },
      { word: "متعة", meaning: "Joy", example: "التأليف قبل كل شيء متعة.", emoji: "😊" },
    ],
    dialogue: [
      { speaker: "المعلم", text: "اليوم نجمع كل ما تعلّمناه." },
      { speaker: "الطالب", text: "متحمس." },
      { speaker: "المعلم", text: "اختر مقامًا (دو كبير) وقالبًا (I-V-vi-IV)." },
      { speaker: "المعلم", text: "أنشئ موتيف 4 نغمات على التآلف الأول." },
      { speaker: "الطالب", text: "ثم أطوّره على البقية؟" },
      { speaker: "المعلم", text: "بالضبط — بتكرار وتنويع وتسلسل." },
      { speaker: "المعلم", text: "خطط الشكل: AABA (32 مازورة)." },
      { speaker: "الطالب", text: "الارتجال متى؟" },
      { speaker: "المعلم", text: "في قسم B — استخدم نغمات السلم مع تركيز على 3 و7 لكل تآلف." },
      { speaker: "المعلم", text: "سجّل، سمِّ القطعة، شاركها." },
    ],
    concept: {
      title: "من طالب إلى فنان — Student to Artist",
      explanation:
        "الآن جمعت أدوات كافية: نبض، سلم، تآلف، لحن، فواصل، ديناميات. حان وقت أول قطعة أصلية.\n\n" +
        "**خطة قطعة قصيرة (32 مازورة، شكل AABA):**\n1. **A**: 8 مازورات — تعرض الموتيف الأساسي على I-V-vi-IV.\n2. **A** (تكرار): نفسها مع تنويع خفيف.\n3. **B** (جسر): 8 مازورات مختلفة (مقام آخر أو تسلسل جديد) لكسر الرتابة.\n4. **A** (عودة): يعود للأصل بختام قوي.\n\n" +
        "**الارتجال في B**: استخدم نغمات السلم مع التركيز على درجتَي 3 و7 من كل تآلف (Guide Tones) — تعطي إحساس «داخل الهارموني».\n\n" +
        "**التقديم**: تسجيل نقي + عنوان + مشاركة. لا تنتظر «الكمال» — قدّم واستمع للتقييم البنّاء.\n\n" +
        "**التطور**: قطعة كل شهر لمدة سنة = 12 عمل + مهارة عميقة.",
      tips: [
        { sentence: "خطط قبل التأليف: مقام، شكل، طابع.", note: "الفكرة قبل الصوت." },
        { sentence: "استخدم قالبًا هارمونيًا معروفًا لأول قطعة.", note: "الأمان أولًا." },
        { sentence: "الموتيف الأساسي يعود مرارًا.", note: "الوحدة." },
        { sentence: "قسم B يوفّر تباينًا.", note: "الجمال في الاختلاف." },
        { sentence: "سجّل حتى لو ناقص.", note: "التقديم يعلّم." },
        { sentence: "قطعة شهريًا = تطور حقيقي.", note: "الاستمرار." },
      ],
    },
    exam: [
      { question: "شكل AABA:", options: ["32 مازورة بأقسام متكررة وجسر", "16 مازورة عشوائية", "لا شيء", "خطأ"], correct: 0 },
      { question: "نغمات الركيزة (Guide tones):", options: ["1 و 5", "3 و 7 لكل تآلف", "بلا معنى", "لا شيء"], correct: 1 },
      { question: "قسم B:", options: ["نسخة من A", "تباين لكسر الرتابة", "بلا فائدة", "احذف"], correct: 1 },
      { question: "خطة التأليف تشمل:", options: ["مقام + شكل + طابع", "لا شيء", "سعر فقط", "بلا خطة"], correct: 0 },
      { question: "أفضل روتين تطوير:", options: ["قطعة شهريًا", "قطعة سنويًا", "لا شيء", "شهر واحد فقط"], correct: 0 },
    ],
    homework: [
      { question: "ألّف:", options: ["قطعة أصلية 32 مازورة (AABA) خلال أسبوعين", "لا شيء", "قطعة سنة", "بلا تأليف"], correct: 0 },
      { question: "قالب هارموني:", options: ["استخدم I-V-vi-IV في A", "بلا قالب", "لا شيء", "احذف"], correct: 0 },
      { question: "الارتجال في B:", options: ["نغمات السلم مع تركيز 3 و 7", "بلا خطة", "لا شيء", "احذف"], correct: 0 },
      { question: "سجّل ثم:", options: ["سمِّ القطعة وشاركها لتقييم بنّاء", "احذف", "لا شيء", "بلا مشاركة"], correct: 0 },
      { question: "الاستمرار:", options: ["قطعة شهريًا لمدة سنة", "لا شيء", "شهر واحد", "بلا خطة"], correct: 0 },
    ],
  }),
};