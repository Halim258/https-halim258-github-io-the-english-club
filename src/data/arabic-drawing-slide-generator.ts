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

  // 3) شرح فني مترابط بدل بطاقات الأدوات
  if (lesson.vocabulary.length > 0) {
    const items = lesson.vocabulary.slice(0, 5);
    const intro = `درس اليوم عن «${lesson.title}». ${lesson.description}`;
    const body =
      "قبل أن نمسك القلم، من المهم أن نفهم الأدوات والمفاهيم التي سنستخدمها في الرسم. " +
      items
        .map((v, idx) => {
          const meaning = v.meaning.split("—")[0].trim();
          const connector =
            idx === 0
              ? "نبدأ بـ"
              : idx === items.length - 1
              ? "وأخيرًا نحتاج"
              : ["ثم نستخدم", "ويأتي بعده", "ومن الأساسيات أيضًا"][idx % 3];
          return `${connector} «${v.word}»، وهو ${meaning}. ويظهر دوره حين ${v.example}`;
        })
        .join(" ");
    const closing =
      `بفهم هذه الأدوات وطريقة استخدامها، نصبح جاهزين لتنفيذ خطوات رسم ${lesson.title} ` +
      `بثقة وترتيب في باقي الدرس.`;
    slides.push({
      id: id(),
      type: "info",
      title: "📖 شرح الدرس",
      subtitle: "افهم الأدوات قبل أن ترسم",
      emoji: "📖",
      bgColor: "from-blue-500/10 to-blue-500/5",
      content: {
        kind: "info",
        paragraphs: [intro, body, closing],
      },
    });
  }

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

  // 7) نشاط الرسم العملي — تطبيق مباشر
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

  // 8) تحديات فنية — أفكار رسم إضافية (بدون أسئلة اختيارية)
  slides.push({
    id: id(),
    type: "info",
    title: "🎯 تحديات فنية",
    subtitle: "جرّب هذه الأفكار الإضافية",
    emoji: "🎯",
    bgColor: "from-teal-500/10 to-teal-500/5",
    content: {
      kind: "info",
      paragraphs: [
        "التحدي 1: كرّر نفس الرسمة بحجم أصغر مع الحفاظ على النسب.",
        "التحدي 2: ارسم نفس الموضوع من زاوية مختلفة (جانبية أو من الأعلى).",
        "التحدي 3: نفّذ الرسمة بألوان بدل الرصاص فقط.",
        "التحدي 4: ارسم نفس الموضوع بأسلوب كرتوني مبسّط.",
        "لا يهم الكمال — الهدف تجريب وتطوير أسلوبك الشخصي.",
      ],
    },
  });

  // 9) ملخّص الدرس
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

  // 10) المشروع المنزلي — نشاط رسم كامل
  slides.push({
    id: id(),
    type: "info",
    title: "🏠 المشروع المنزلي",
    subtitle: "طبّق ما تعلّمته في البيت",
    emoji: "🏠",
    bgColor: "from-emerald-500/10 to-emerald-500/5",
    content: {
      kind: "info",
      paragraphs: [
        `المشروع: ارسم لوحة كاملة تعتمد على درس «${lesson.title}».`,
        "خصّص 30–45 دقيقة في مكان هادئ بإضاءة جيدة.",
        "استخدم كل الأدوات والنصائح التي تعلّمتها اليوم.",
        "التقط صورة للرسمة قبل التلوين وبعده لمقارنة التقدّم.",
        "شارك النتيجة مع المعلم في الدرس القادم للحصول على تقييم.",
      ],
    },
  });

  return slides;
}