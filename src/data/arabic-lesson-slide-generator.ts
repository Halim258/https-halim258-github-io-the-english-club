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

  // 3) شرح الدرس — مقدمة موجزة ومترابطة
  {
    const keyTerms = lesson.vocabulary.slice(0, 3).map((v) => v.word);
    const explanationParas = lesson.grammar.explanation
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
    const paragraphs: string[] = [
      `${lesson.description} يتناول درس اليوم «${lesson.title}» بأسلوب متدرّج، من الفكرة العامة إلى التطبيق العملي.`,
    ];
    if (explanationParas.length > 0) paragraphs.push(explanationParas[0]);
    if (keyTerms.length > 0) {
      paragraphs.push(
        `وسنتوقف خلال الشرح عند مصطلحات محورية أبرزها: ${keyTerms.join("، ")}. ` +
          `سنعرّف كلًّا منها بمثال واضح، ثم نوظّفها في التدريبات والاختبار.`,
      );
    }
    slides.push({
      id: id(),
      type: "info",
      title: "📖 شرح الدرس",
      subtitle: "قراءة موجزة قبل الدخول في التفاصيل",
      emoji: "📖",
      bgColor: "from-blue-500/10 to-blue-500/5",
      content: { kind: "info", paragraphs },
    });
  }

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

  // 5) نشاط تطبيقي — بنية واضحة: الهدف، الخطوات، التقييم الذاتي، تحدٍّ إضافي
  if (lesson.dialogue.length > 0) {
    const teacherSteps = lesson.dialogue
      .filter((d) => d.speaker === "المعلم" || d.speaker.includes("teacher"))
      .map((d) => d.text.trim())
      .filter(Boolean);
    const rawSteps =
      teacherSteps.length > 0 ? teacherSteps : lesson.dialogue.map((d) => d.text.trim()).filter(Boolean);
    const steps = rawSteps.slice(0, 6);
    const firstTip = lesson.grammar.examples[0]?.sentence;
    const secondTip = lesson.grammar.examples[1]?.sentence;

    if (steps.length > 0) {
      // Slide 5a: تعليمات النشاط
      slides.push({
        id: id(),
        type: "info",
        title: "🎯 نشاط تطبيقي",
        subtitle: `طبّق «${lesson.grammar.title}» عمليًا`,
        emoji: "🎯",
        bgColor: "from-cyan-500/10 to-cyan-500/5",
        content: {
          kind: "info",
          paragraphs: [
            `🎯 الهدف: أن تتقن ${lesson.grammar.title} من خلال تجربة عملية قصيرة.`,
            `⏱️ المدة المقترحة: من 5 إلى 10 دقائق.\n📍 المكان: مكان هادئ يسمح بالتركيز.\n👤 التنفيذ: بمفردك، أو مع زميل يراقبك ويعطيك ملاحظة.`,
            "🧭 خطوات التنفيذ (اتبعها بالترتيب، ولا تنتقل لخطوة قبل إتقان التي قبلها):",
            ...steps.map((s, k) => `${k + 1}. ${s}`),
          ],
        },
      });

      // Slide 5b: التقييم الذاتي والتحدي
      slides.push({
        id: id(),
        type: "info",
        title: "✅ قيّم أداءك",
        subtitle: "تحقّق من نفسك قبل الانتقال",
        emoji: "✅",
        bgColor: "from-cyan-500/10 to-teal-500/5",
        content: {
          kind: "info",
          paragraphs: [
            "راجع أداءك على هذه النقاط، وضع ✅ أمام ما أتقنته و🔁 أمام ما يحتاج تكرارًا:",
            firstTip ? `• ${firstTip}` : "• نفّذت الخطوات بالترتيب دون تسرّع.",
            secondTip ? `• ${secondTip}` : "• حافظت على تركيزي طوال النشاط.",
            "• شعرت بتحسّن ملحوظ بين المحاولة الأولى والأخيرة.",
            `🏆 تحدٍّ إضافي: أعِد النشاط مرة ثانية مع تسجيل صوتي أو مرئي، ثم قارن بين المحاولتين واكتب ملاحظة واحدة عن ما تحسّن.`,
          ],
        },
      });
    }
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
        title: "تدريبات",
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
        questions: lesson.vocabExercises.slice(0, 1),
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
    chunk(drills, 1).forEach((c, i, arr) => {
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
    chunk(lesson.examQuestions, 1).forEach((c, i, arr) => {
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
    chunk(lesson.homeworkQuestions, 1).forEach((c, i, arr) => {
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