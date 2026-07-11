import type { LessonData } from "./lessons";
import type { Slide } from "./slide-types";

/**
 * منشئ شرائح كرتوني للأطفال — دورة التخاطب.
 * أسلوب مرح، ألوان زاهية، جمل قصيرة، مكافآت نجوم.
 * مختلف تمامًا عن قالب الدروس اللغوية الرسمي.
 */
function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const FUN_EMOJIS = ["🌈", "🎈", "🐣", "🦄", "🐻", "🐳", "🌟", "🎨", "🎪", "🍭", "🐤", "🦋"];

export function generateArabicTherapySlides(lesson: LessonData): Slide[] {
  const slides: Slide[] = [];
  let n = 0;
  const id = () => `th-slide-${n++}`;
  const funEmoji = (i: number) => FUN_EMOJIS[i % FUN_EMOJIS.length];

  // 1) بوستر ترحيبي كرتوني
  slides.push({
    id: id(),
    type: "title",
    title: `${funEmoji(lesson.lessonNumber)} ${lesson.title}`,
    subtitle: `مغامرة رقم ${lesson.lessonNumber} 🎉`,
    emoji: "🎪",
    bgColor: "from-pink-400/20 via-yellow-300/20 to-sky-400/20",
    content: {
      kind: "title",
      heading: `أهلاً يا بطل! 👋\n${lesson.title}`,
      description: `اليوم هنلعب ونتعلم كلام جديد! 🌈✨`,
      level: lesson.levelLabel,
      lessonNumber: lesson.lessonNumber,
    },
  });

  // 2) "هدفنا اليوم" — بلغة طفل
  slides.push({
    id: id(),
    type: "info",
    title: "🎯 هدفنا اليوم",
    subtitle: "خلّينا نبدأ سوا!",
    emoji: "🎯",
    bgColor: "from-fuchsia-400/20 to-pink-300/20",
    content: {
      kind: "info",
      paragraphs: [
        `🌟 هنتعلم كلمات جديدة عن: ${lesson.title}`,
        "🗣️ هنقول الكلمات بصوت واضح وحلو.",
        "🎮 هنلعب ألعاب ونجاوب أسئلة سهلة.",
        "🏆 كل إجابة صح = نجمة تلمع!",
      ],
    },
  });

  // 3) شرح الدرس — نص فصيح ومترابط
  {
    const keyTerms = lesson.vocabulary.slice(0, 3).map((v) => v.word);
    const explanationParas = lesson.grammar.explanation
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
    const paragraphs: string[] = [
      `${lesson.description} في هذا الدرس نتناول موضوع «${lesson.title}» بأسلوب مبسّط يناسب الطفل، خطوة بخطوة.`,
    ];
    if (explanationParas.length > 0) paragraphs.push(explanationParas[0]);
    if (keyTerms.length > 0) {
      paragraphs.push(
        `وسنتعرّف خلال الدرس على مفاهيم مهمة مثل: ${keyTerms.join("، ")}. ` +
          `سنشرحها بأمثلة قريبة من حياة الطفل، ثم نتدرّب عليها في الأنشطة التالية.`,
      );
    }
    slides.push({
      id: id(),
      type: "info",
      title: "📖 شرح الدرس",
      subtitle: "اقرأ بهدوء وافهم الفكرة",
      emoji: "📖",
      bgColor: "from-yellow-300/25 to-orange-300/20",
      content: { kind: "info", paragraphs },
    });
  }

  // 4) "قلّدني!" — تمارين نطق / تقليد
  if (lesson.vocabulary.length > 0) {
    const top = lesson.vocabulary.slice(0, 5);
    slides.push({
      id: id(),
      type: "info",
      title: "🎤 قلّدني!",
      subtitle: "قول ورايا بصوت عالي وواضح 👂",
      emoji: "🎤",
      bgColor: "from-emerald-300/25 to-teal-300/20",
      content: {
        kind: "info",
        paragraphs: [
          "اتفرج على شفايفي وقول ورايا 3 مرات:",
          ...top.map((v, k) => `${k + 1}) ${v.emoji || "🔊"}  «${v.word}»  —  قولها بصوت واضح!`),
          "لو قلتها صح = صفّق لنفسك 👏👏👏",
        ],
      },
    });
  }

  // 5) "حكاية صغيرة" — dialogue كقصة كرتونية
  if (lesson.dialogue.length > 0) {
    chunk(lesson.dialogue, 4).forEach((c, i, arr) => {
      slides.push({
        id: id(),
        type: "dialogue",
        title: "📖 حكاية صغيرة",
        subtitle: arr.length > 1 ? `الفصل ${i + 1} من ${arr.length} 🌸` : "اسمع ودوس التالي 🎧",
        emoji: "📖",
        bgColor: "from-sky-300/25 to-indigo-300/20",
        content: { kind: "dialogue", lines: c },
      });
    });
  }

  // 6) "لعبة نصائح" — grammar examples ولكن بلغة نصائح للطفل والأم
  if (lesson.grammar.examples.length > 0) {
    chunk(lesson.grammar.examples, 3).forEach((c, i, arr) => {
      const paragraphs = c.map(
        (ex, k) => `💡 ${ex.sentence}\n   ↳ ${ex.note || "جرّبها كده!"}`,
      );
      slides.push({
        id: id(),
        type: "info",
        title: "🧠 حيلة ذكية",
        subtitle: arr.length > 1 ? `حيلة ${i + 1} من ${arr.length}` : "سرّ النجاح!",
        emoji: "💡",
        bgColor: "from-lime-300/25 to-green-300/20",
        content: { kind: "info", paragraphs },
      });
    });
  }

  // 7) لعبة سؤال وجواب — vocab exercises
  if (lesson.vocabExercises.length > 0) {
    chunk(lesson.vocabExercises, 2).forEach((c, i, arr) => {
      slides.push({
        id: id(),
        type: "exercise",
        title: "🎮 لعبة: اختار الصح",
        subtitle: arr.length > 1 ? `جولة ${i + 1} من ${arr.length} 🏁` : "ركّز وجاوب! 🎯",
        emoji: "🎮",
        bgColor: "from-orange-300/25 to-red-300/20",
        content: { kind: "exercise", label: "لعبة", questions: c },
      });
    });
  }

  // 8) لعبة موقف — conversation exercises
  if (lesson.conversationExercises.length > 0) {
    chunk(lesson.conversationExercises, 2).forEach((c, i, arr) => {
      slides.push({
        id: id(),
        type: "exercise",
        title: "🎭 لعبة: تصرّف صح",
        subtitle: arr.length > 1 ? `موقف ${i + 1} من ${arr.length}` : "شوف الموقف واختار!",
        emoji: "🎭",
        bgColor: "from-purple-300/25 to-fuchsia-300/20",
        content: { kind: "exercise", label: "موقف", questions: c },
      });
    });
  }

  // 9) لعبة مهارة — grammar exercises
  if (lesson.grammarExercises.length > 0) {
    chunk(lesson.grammarExercises, 2).forEach((c, i, arr) => {
      slides.push({
        id: id(),
        type: "exercise",
        title: "🧩 لعبة: ركّب الفكرة",
        subtitle: arr.length > 1 ? `أحجية ${i + 1} من ${arr.length}` : "فكّر معايا!",
        emoji: "🧩",
        bgColor: "from-cyan-300/25 to-blue-300/20",
        content: { kind: "exercise", label: "أحجية", questions: c },
      });
    });
  }

  // 10) نشاط عملي مرح
  slides.push({
    id: id(),
    type: "info",
    title: "🎨 نشاط ممتع في البيت",
    subtitle: "اعمله مع ماما أو بابا 💖",
    emoji: "🏡",
    bgColor: "from-rose-300/25 to-pink-300/20",
    content: {
      kind: "info",
      paragraphs: [
        `🎈 العبوا لعبة عن «${lesson.title}» لمدة 5 دقائق.`,
        "🪞 قف قدام المراية وقول 3 كلمات من درس اليوم.",
        "📸 صوّر نفسك أو سجّل صوتك وأنت بتقولها.",
        "🎁 لما تخلص = خد نجمة كبيرة على كراستك!",
      ],
    },
  });

  // 11) "أنا نجم!" — ملخص مرح
  slides.push({
    id: id(),
    type: "summary",
    title: "🌟 أنا نجم اليوم!",
    emoji: "🏆",
    bgColor: "from-yellow-300/30 via-amber-300/25 to-orange-300/20",
    content: {
      kind: "summary",
      points: [
        `🎉 تعلمت ${lesson.vocabulary.length} كلمة سحرية جديدة.`,
        `🗣️ قلت الكلمات بصوت واضح.`,
        `🧠 عرفت حيلة جديدة عن: ${lesson.grammar.title}.`,
        `🏅 أنا شاطر وأستاهل نجمة كبيرة!`,
      ],
    },
  });

  // 12) اختبار سريع (لعبة النهائي)
  if (lesson.examQuestions.length > 0) {
    chunk(lesson.examQuestions, 2).forEach((c, i, arr) => {
      slides.push({
        id: id(),
        type: "exercise",
        title: "🏁 التحدي الأخير",
        subtitle: arr.length > 1 ? `تحدي ${i + 1} من ${arr.length}` : "اكسب الميدالية! 🥇",
        emoji: "🏆",
        bgColor: "from-red-300/25 to-orange-300/20",
        content: { kind: "exercise", label: "تحدي", questions: c },
      });
    });
  }

  // 13) واجب مرح
  if (lesson.homeworkQuestions.length > 0) {
    chunk(lesson.homeworkQuestions, 2).forEach((c, i, arr) => {
      slides.push({
        id: id(),
        type: "exercise",
        title: "🎁 مفاجأة البيت",
        subtitle: arr.length > 1 ? `مفاجأة ${i + 1} من ${arr.length}` : "جاوب مع ماما 💕",
        emoji: "🎁",
        bgColor: "from-emerald-300/25 to-green-300/20",
        content: { kind: "exercise", label: "مفاجأة", questions: c },
      });
    });
  }

  return slides;
}