import type { LessonData } from "./lessons";
import type { Slide } from "./slide-types";
import drawingToolsHero from "@/assets/drawing-tools-hero.jpg";

/**
 * منشئ الشرائح لدروس الرسم — قالب فني (لا لغوي).
 * يعيد تشكيل بيانات الدرس اللغوية على شكل درس فني:
 * مقدمة، أدوات، شرح تقني، خطوات الرسم، نصائح، تدريب موجّه، معرض، ملخّص، مشروع.
 */
function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function generateArabicDrawingSlides(lesson: LessonData): Slide[] {
  const slides: Slide[] = [];
  let n = 0;
  const id = () => `ar-draw-slide-${n++}`;

  // 1) لوحة العنوان
  slides.push({
    id: id(),
    type: "title",
    title: lesson.title,
    subtitle: `الدرس رقم (${lesson.lessonNumber}) — ${lesson.levelLabel}`,
    emoji: "🎨",
    bgColor: "from-rose-500/10 to-amber-500/10",
    image: drawingToolsHero,
    content: {
      kind: "title",
      heading: lesson.title,
      description: lesson.description,
      level: lesson.levelLabel,
      lessonNumber: lesson.lessonNumber,
    },
  });

  // 2) ماذا سنرسم اليوم؟ (أهداف فنية)
  slides.push({
    id: id(),
    type: "info",
    title: "🖼️ ماذا سنرسم اليوم؟",
    subtitle: "أهداف الدرس الفنية",
    emoji: "🖼️",
    bgColor: "from-fuchsia-500/10 to-fuchsia-500/5",
    content: {
      kind: "info",
      paragraphs: [
        `موضوع الدرس: ${lesson.title}.`,
        lesson.description,
        "في نهاية الدرس ستكون قادرًا على تنفيذ الرسمة بخطوات صحيحة وفهم الأساسيات الفنية وراءها.",
      ],
    },
  });

  // 3) الأدوات والمصطلحات الفنية
  chunk(lesson.vocabulary, 4).forEach((c, i, arr) => {
    slides.push({
      id: id(),
      type: "vocabulary",
      title: "🧰 الأدوات والمصطلحات الفنية",
      subtitle: arr.length > 1 ? `الجزء ${i + 1} من ${arr.length}` : "ما تحتاجه لهذه الرسمة",
      emoji: "🧰",
      bgColor: "from-blue-500/10 to-blue-500/5",
      content: { kind: "vocab", words: c },
    });
  });

  // 4) الشرح الفني (النظري)
  slides.push({
    id: id(),
    type: "info",
    title: "📐 الشرح الفني",
    subtitle: lesson.grammar.title,
    emoji: "📐",
    bgColor: "from-violet-500/10 to-violet-500/5",
    content: {
      kind: "info",
      paragraphs: lesson.grammar.explanation
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean),
    },
  });

  // 5) خطوات الرسم (نستخدم الحوار كخطوات تعليمية مصوّرة)
  if (lesson.dialogue.length > 0) {
    const steps = lesson.dialogue
      .filter((d) => d.speaker === "المعلم")
      .map((d, i) => `الخطوة ${i + 1}: ${d.text}`);
    if (steps.length > 0) {
      chunk(steps, 4).forEach((c, i, arr) => {
        slides.push({
          id: id(),
          type: "info",
          title: "✏️ خطوات الرسم",
          subtitle: arr.length > 1 ? `الجزء ${i + 1} من ${arr.length}` : "اتّبع الخطوات بالترتيب",
          emoji: "✏️",
          bgColor: "from-cyan-500/10 to-cyan-500/5",
          content: { kind: "info", paragraphs: c },
        });
      });
    }
  }

  // 6) نصائح فنية ومحاور مهمة (grammar examples → tips)
  if (lesson.grammar.examples.length > 0) {
    chunk(lesson.grammar.examples, 3).forEach((c, i, arr) => {
      const paragraphs = c.map(
        (ex, k) => `نصيحة (${i * 3 + k + 1}): ${ex.sentence}${ex.note ? `\n— ${ex.note}` : ""}`,
      );
      slides.push({
        id: id(),
        type: "info",
        title: "💡 نصائح فنية",
        subtitle: arr.length > 1 ? `الجزء ${i + 1} من ${arr.length}` : "أخطاء شائعة وحلول",
        emoji: "💡",
        bgColor: "from-amber-500/10 to-amber-500/5",
        content: { kind: "info", paragraphs },
      });
    });
  }

  // 7) تدريب موجّه (mini-quiz على المفاهيم)
  const quickCheck = [
    ...lesson.vocabExercises.slice(0, 2),
    ...lesson.grammarExercises.slice(0, 2),
  ];
  if (quickCheck.length > 0) {
    slides.push({
      id: id(),
      type: "exercise",
      title: "🧠 تحقّق من فهمك",
      subtitle: "أسئلة سريعة قبل التطبيق",
      emoji: "🧠",
      bgColor: "from-orange-500/10 to-orange-500/5",
      content: {
        kind: "exercise",
        label: "سؤال",
        questions: quickCheck,
      },
    });
  }

  // 8) نشاط الرسم العملي
  slides.push({
    id: id(),
    type: "info",
    title: "🖌️ نشاط الرسم",
    subtitle: "ارسم الآن بنفسك",
    emoji: "🖌️",
    bgColor: "from-pink-500/10 to-pink-500/5",
    image: drawingToolsHero,
    content: {
      kind: "info",
      paragraphs: [
        `افتح دفتر الرسم وطبّق موضوع: «${lesson.title}».`,
        "1) ابدأ بالاسكتش الأولي بخطوط خفيفة.",
        "2) ثبّت الخطوط الأساسية وراجع النسب.",
        "3) أضف التفاصيل ثم التظليل تدريجيًا من الفاتح للغامق.",
        "4) راجع رسمتك من مسافة، وعدّل ما يحتاج.",
        "صوّر رسمتك وشاركها مع المعلم للحصول على ملاحظات.",
      ],
    },
  });

  // 9) تحديات إضافية (باقي التمارين — اختياري)
  const challenges = [
    ...lesson.vocabExercises.slice(2),
    ...lesson.conversationExercises,
    ...lesson.grammarExercises.slice(2),
  ];
  if (challenges.length > 0) {
    chunk(challenges, 2).forEach((c, i, arr) => {
      slides.push({
        id: id(),
        type: "exercise",
        title: "🎯 تحديات فنية",
        subtitle: arr.length > 1 ? `تحدي ${i + 1} من ${arr.length}` : undefined,
        emoji: "🎯",
        bgColor: "from-teal-500/10 to-teal-500/5",
        content: { kind: "exercise", label: "تحدي", questions: c },
      });
    });
  }

  // 10) ملخّص الدرس
  slides.push({
    id: id(),
    type: "summary",
    title: "📌 ملخّص الدرس",
    emoji: "📌",
    bgColor: "from-primary/10 to-accent/10",
    content: {
      kind: "summary",
      points: [
        `تعرّفت على ${lesson.vocabulary.length} أداة/مصطلح فني.`,
        `فهمت المفهوم الفني: ${lesson.grammar.title}.`,
        "نفّذت خطوات الرسم مع نصائح لتفادي الأخطاء الشائعة.",
        "أنجزت نشاط الرسم العملي.",
      ],
    },
  });

  // 11) التقويم الفني
  if (lesson.examQuestions.length > 0) {
    chunk(lesson.examQuestions, 2).forEach((c, i, arr) => {
      slides.push({
        id: id(),
        type: "exercise",
        title: "✅ تقويم الدرس",
        subtitle: arr.length > 1 ? `الجزء ${i + 1} من ${arr.length}` : undefined,
        emoji: "✅",
        bgColor: "from-red-500/10 to-red-500/5",
        content: { kind: "exercise", label: "اختبار", questions: c },
      });
    });
  }

  // 12) المشروع المنزلي
  if (lesson.homeworkQuestions.length > 0) {
    chunk(lesson.homeworkQuestions, 2).forEach((c, i, arr) => {
      slides.push({
        id: id(),
        type: "exercise",
        title: "🏠 المشروع المنزلي",
        subtitle: arr.length > 1 ? `الجزء ${i + 1} من ${arr.length}` : "طبّق ما تعلّمته في البيت",
        emoji: "🏠",
        bgColor: "from-emerald-500/10 to-emerald-500/5",
        content: { kind: "exercise", label: "مشروع", questions: c },
      });
    });
  }

  return slides;
}