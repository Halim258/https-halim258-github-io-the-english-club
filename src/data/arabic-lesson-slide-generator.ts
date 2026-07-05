import type { LessonData } from "./lessons";
import type { Slide } from "./slide-types";

/**
 * منشئ الشرائح للدروس العربية — 12 قسم موحّد لجميع الدروس اللغوية/الفنية/الموسيقية.
 * Maps existing LessonData fields onto the 12-section Arabic lesson template so
 * we don't have to rewrite every lesson dataset.
 */
function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function generateArabicLessonSlides(lesson: LessonData): Slide[] {
  const slides: Slide[] = [];
  let n = 0;
  const id = () => `ar-slide-${n++}`;

  // 1) عنوان الدرس
  slides.push({
    id: id(),
    type: "title",
    title: lesson.title,
    subtitle: `الدرس رقم (${lesson.lessonNumber})`,
    emoji: "📘",
    bgColor: "from-primary/10 to-primary/5",
    content: {
      kind: "title",
      heading: lesson.title,
      description: lesson.description,
      level: lesson.levelLabel,
      lessonNumber: lesson.lessonNumber,
    },
  });

  // 2) أهداف التعلم
  const topVocab = lesson.vocabulary.slice(0, 4).map((v) => v.word);
  const objectives = [
    `فهم مفهوم: ${lesson.title}.`,
    topVocab.length
      ? `التعرّف على المصطلحات: ${topVocab.join("، ")}.`
      : "التعرّف على المصطلحات الأساسية للدرس.",
    `تطبيق ${lesson.grammar.title} من خلال أمثلة عملية.`,
    "حل التدريبات والاختبار بنجاح وأداء نشاط عملي.",
  ];
  slides.push({
    id: id(),
    type: "info",
    title: "🎯 أهداف التعلم",
    subtitle: "بعد الانتهاء من هذا الدرس سيكون الطالب قادرًا على:",
    emoji: "🎯",
    bgColor: "from-indigo-500/10 to-indigo-500/5",
    content: { kind: "info", paragraphs: objectives },
  });

  // 3) المفردات والمصطلحات
  chunk(lesson.vocabulary, 4).forEach((c, i, arr) => {
    slides.push({
      id: id(),
      type: "vocabulary",
      title: "📚 المفردات والمصطلحات",
      subtitle: arr.length > 1 ? `الجزء ${i + 1} من ${arr.length}` : undefined,
      emoji: "📚",
      bgColor: "from-blue-500/10 to-blue-500/5",
      content: { kind: "vocab", words: c },
    });
  });

  // 4) الشرح النظري
  slides.push({
    id: id(),
    type: "info",
    title: "📖 الشرح النظري",
    subtitle: lesson.grammar.title,
    emoji: "📖",
    bgColor: "from-violet-500/10 to-violet-500/5",
    content: {
      kind: "info",
      paragraphs: lesson.grammar.explanation
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean),
    },
  });

  // 5) الشرح المصور (نستخدم الحوار كسيناريو توضيحي بصري بين المعلم والطالب)
  if (lesson.dialogue.length > 0) {
    chunk(lesson.dialogue, 5).forEach((c, i, arr) => {
      slides.push({
        id: id(),
        type: "dialogue",
        title: "🖼️ الشرح المصور — حوار المعلم والطالب",
        subtitle: arr.length > 1 ? `الجزء ${i + 1} من ${arr.length}` : undefined,
        emoji: "🖼️",
        bgColor: "from-cyan-500/10 to-cyan-500/5",
        content: { kind: "dialogue", lines: c },
      });
    });
  }

  // 6) أمثلة محلولة (من grammar examples)
  if (lesson.grammar.examples.length > 0) {
    chunk(lesson.grammar.examples, 3).forEach((c, i, arr) => {
      const paragraphs = c.map(
        (ex, k) => `مثال (${i * 3 + k + 1}): ${ex.sentence}\nالشرح: ${ex.note || "—"}`,
      );
      slides.push({
        id: id(),
        type: "info",
        title: "✍️ أمثلة محلولة",
        subtitle: arr.length > 1 ? `الجزء ${i + 1} من ${arr.length}` : undefined,
        emoji: "✍️",
        bgColor: "from-amber-500/10 to-amber-500/5",
        content: { kind: "info", paragraphs },
      });
    });
  }

  // 7) نشاط داخل الدرس (تطبيق مباشر — vocabExercises أول جزء)
  if (lesson.vocabExercises.length > 0) {
    slides.push({
      id: id(),
      type: "exercise",
      title: "🧩 نشاط داخل الدرس",
      subtitle: "طبّق ما تعلّمته مباشرة",
      emoji: "🧩",
      bgColor: "from-orange-500/10 to-orange-500/5",
      content: {
        kind: "exercise",
        label: "نشاط",
        questions: lesson.vocabExercises.slice(0, 3),
      },
    });
  }

  // 8) تدريبات (باقي vocabExercises + conversationExercises + grammarExercises)
  const drills = [
    ...lesson.vocabExercises.slice(3),
    ...lesson.conversationExercises,
    ...lesson.grammarExercises,
  ];
  if (drills.length > 0) {
    chunk(drills, 2).forEach((c, i, arr) => {
      slides.push({
        id: id(),
        type: "exercise",
        title: "📝 تدريبات",
        subtitle: arr.length > 1 ? `تدريب ${i + 1} من ${arr.length}` : undefined,
        emoji: "📝",
        bgColor: "from-teal-500/10 to-teal-500/5",
        content: { kind: "exercise", label: "تدريب", questions: c },
      });
    });
  }

  // 9) نشاط عملي
  slides.push({
    id: id(),
    type: "info",
    title: "🎨 نشاط عملي",
    subtitle: "طبّق مهارة اليوم بشكل عملي",
    emoji: "🎨",
    bgColor: "from-pink-500/10 to-pink-500/5",
    content: {
      kind: "info",
      paragraphs: [
        `اختر نشاطًا عمليًا يناسب موضوع الدرس «${lesson.title}»:`,
        "• عزف / غناء / تصفيق إيقاعي إذا كان الدرس موسيقيًا.",
        "• رسم أو تلوين أو تصميم إذا كان الدرس فنيًا.",
        "• تسجيل صوتي أو تمثيل أدوار إذا كان الدرس لغويًا أو تخاطبيًا.",
        "سجّل الأداء وشاركه مع المعلم للحصول على تقييم.",
      ],
    },
  });

  // 10) ملخص الدرس
  slides.push({
    id: id(),
    type: "summary",
    title: "🧠 ملخص الدرس",
    emoji: "🧠",
    bgColor: "from-primary/10 to-accent/10",
    content: {
      kind: "summary",
      points: [
        `تعلّمت ${lesson.vocabulary.length} مصطلحًا جديدًا.`,
        `فهمت: ${lesson.grammar.title}.`,
        `طبّقت ${drills.length + Math.min(3, lesson.vocabExercises.length)} تدريبًا.`,
        "أنجزت النشاط العملي واستعدّيت للاختبار.",
      ],
    },
  });

  // 11) التقويم (الاختبار)
  if (lesson.examQuestions.length > 0) {
    chunk(lesson.examQuestions, 2).forEach((c, i, arr) => {
      slides.push({
        id: id(),
        type: "exercise",
        title: "✅ التقويم — الاختبار",
        subtitle: arr.length > 1 ? `الجزء ${i + 1} من ${arr.length}` : undefined,
        emoji: "✅",
        bgColor: "from-red-500/10 to-red-500/5",
        content: { kind: "exercise", label: "اختبار", questions: c },
      });
    });
  }

  // 12) الواجب المنزلي
  if (lesson.homeworkQuestions.length > 0) {
    chunk(lesson.homeworkQuestions, 2).forEach((c, i, arr) => {
      slides.push({
        id: id(),
        type: "exercise",
        title: "🏠 الواجب المنزلي",
        subtitle: arr.length > 1 ? `الجزء ${i + 1} من ${arr.length}` : undefined,
        emoji: "🏠",
        bgColor: "from-emerald-500/10 to-emerald-500/5",
        content: { kind: "exercise", label: "واجب", questions: c },
      });
    });
  }

  return slides;
}