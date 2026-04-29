import { useMemo, useState } from "react";
import {
  BarChart3, BookMarked, BookOpen, CalendarDays, CheckCircle2, Clipboard, Download,
  Facebook, FileText, Flame, GraduationCap, LayoutDashboard, MessageCircle, Mic2,
  PenLine, Search, Sparkles, Star, Trophy, Users, Volume2, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type PreviewKind =
  | "courses" | "dashboard" | "groups" | "teacher" | "ai-tutor" | "dictionary"
  | "public-school" | "placement" | "book" | "yearly-plan" | "workbook" | "exams"
  | "flashcards" | "writing" | "pronunciation" | "leaderboard" | "community";

type HelpPost = {
  id: string;
  title: string;
  section: string;
  route: string;
  icon: typeof BookOpen;
  english: string;
  arabic: string;
  steps: string[];
  facebookIntro: string;
  preview: PreviewKind;
  hashtags: string[];
};

const dailyPosts: HelpPost[] = [
  {
    id: "courses",
    title: "Find the right course and start learning today",
    section: "Courses",
    route: "/courses",
    icon: BookOpen,
    preview: "courses",
    english:
      "Open the Courses page to pick your level (A1–C2), the Egyptian Public School track, or a specialised course like Movies, Stories or Kids. Every course has full lessons, practice exercises and progress tracking.",
    arabic:
      "ادخل صفحة الكورسات واختار مستواك (A1 لحد C2)، أو مسار مدارس الحكومة، أو كورس متخصص زي الأفلام والقصص والأطفال. كل كورس فيه دروس كاملة وتمارين ومتابعة لمستواك أول بأول.",
    steps: [
      "Sign in to your account",
      "Open Courses from the top menu",
      "Choose your level or school track",
      "Press Start Lesson and begin",
    ],
    facebookIntro:
      "📚 Daily tip: don't waste time searching around — start from the correct course on the website.",
    hashtags: ["#TheEnglishClubAlexandria", "#LearnEnglish", "#EnglishCourses"],
  },
  {
    id: "dashboard",
    title: "Use your dashboard to follow your progress",
    section: "Student Dashboard",
    route: "/dashboard",
    icon: LayoutDashboard,
    preview: "dashboard",
    english:
      "Your dashboard shows your XP, daily streak, recent lessons and the next recommended step. It's the easiest way to know exactly what to study next.",
    arabic:
      "الداشبورد بتاعتك بتوريك نقاطك (XP)، استريك المذاكرة اليومي، آخر درس عملته، والخطوة الجاية المقترحة. أسهل طريقة تعرف بيها تذاكر إيه بعد كده.",
    steps: [
      "Sign in to your account",
      "Open Dashboard from the menu",
      "Check your XP, streak and badges",
      "Press Continue Learning",
    ],
    facebookIntro:
      "🎯 Daily tip: one simple page tells the student exactly what to study next.",
    hashtags: ["#StudentDashboard", "#StudySmart", "#TheEnglishClubAlexandria"],
  },
  {
    id: "groups",
    title: "Check available school groups online",
    section: "Groups",
    route: "/groups",
    icon: Users,
    preview: "groups",
    english:
      "The Groups page shows every group open for enrolment with its level, days and time. You can request a place or complete enrolment directly online without coming to the school.",
    arabic:
      "صفحة الجروبات بتعرض كل الجروبات المفتوحة بمواعيدها ومستواها. تقدر تحجز مكان أو تكمل التسجيل من الموقع على طول من غير ما تنزل المدرسة.",
    steps: [
      "Open the Groups page",
      "Filter by level and timing",
      "Pick the most suitable group",
      "Submit your enrolment request",
    ],
    facebookIntro:
      "👨‍👩‍👧 Daily tip: parents can see all open groups, days and times before contacting us.",
    hashtags: ["#EnrollNow", "#EnglishGroups", "#TheEnglishClubAlexandria"],
  },
  {
    id: "teacher-dashboard",
    title: "Teachers: review enrolments and student answers",
    section: "Teacher Tools",
    route: "/teacher-dashboard",
    icon: GraduationCap,
    preview: "teacher",
    english:
      "The Teacher Dashboard helps instructors follow group enrolments, read every student's written answers, and manage their classes from one professional workspace.",
    arabic:
      "داشبورد المدرس بتساعد المدرسين على متابعة اشتراكات الجروبات، قراءة إجابات الطلبة المكتوبة، وإدارة كل الفصول من مكان واحد منظم.",
    steps: [
      "Sign in with a teacher account",
      "Open Teacher Dashboard",
      "Open the Enrolments tab",
      "Switch to Student Answers to grade",
    ],
    facebookIntro:
      "🎓 Daily tip for teachers: track enrolments and homework from one place.",
    hashtags: ["#TeacherTools", "#EnglishTeachers", "#TheEnglishClubAlexandria"],
  },
  {
    id: "ai-tutor",
    title: "Practise English anytime with the AI tutor",
    section: "AI Tutor",
    route: "/ai-tutor",
    icon: MessageCircle,
    preview: "ai-tutor",
    english:
      "The AI tutor gives you guided English practice through realistic roleplay, free chat and instant correction. Speak or type — perfect for practising even after school hours.",
    arabic:
      "مدرس الذكاء الاصطناعي بيدّيلك تمرين إنجليزي حقيقي من خلال محادثات وتمثيل مواقف وتصحيح فوري. تقدر تكتب أو تتكلم في أي وقت بعد المدرسة.",
    steps: [
      "Open AI Tutor from the menu",
      "Choose a roleplay scenario",
      "Type or speak your reply",
      "Read the correction and try again",
    ],
    facebookIntro:
      "🤖 Daily tip: students can practise English conversations 24/7 — no extra cost, no booking needed.",
    hashtags: ["#AITutor", "#SpeakEnglish", "#TheEnglishClubAlexandria"],
  },
  {
    id: "dictionary",
    title: "Look up new words without leaving your lesson",
    section: "Dictionary",
    route: "/dictionary",
    icon: Search,
    preview: "dictionary",
    english:
      "The built-in dictionary gives meaning, pronunciation and example sentences for any word. You can listen to American or British accent and save the word for revision.",
    arabic:
      "القاموس بتاع الموقع بيوريك معنى الكلمة، نطقها، وأمثلة عليها. تقدر تسمعها بالكنة الأمريكي أو البريطاني وتحفظها علشان تراجعها بعدين.",
    steps: [
      "Open Dictionary from the menu",
      "Type any English word",
      "Read the meaning and example",
      "Press the speaker to listen and repeat",
    ],
    facebookIntro:
      "🔎 Daily tip: stop opening Google Translate — there's a real dictionary inside the website.",
    hashtags: ["#Vocabulary", "#EnglishDictionary", "#TheEnglishClubAlexandria"],
  },
  {
    id: "public-school",
    title: "Study with the Egyptian Public School track",
    section: "Public School English",
    route: "/courses/egyptian-public",
    icon: Sparkles,
    preview: "public-school",
    english:
      "The Public School track follows the Ministry of Education syllabus exactly. Each lesson supports the school book with vocabulary, reading, grammar, writing and term revision.",
    arabic:
      "مسار مدارس الحكومة بيمشي مع منهج الوزارة كلمة بكلمة. كل درس بيدعم الكتاب المدرسي بالكلمات والقراءة والجرامر والكتابة ومراجعة الترم.",
    steps: [
      "Open Courses from the menu",
      "Choose Public School English",
      "Select Primary, Prep or Secondary",
      "Start the lesson that matches the school",
    ],
    facebookIntro:
      "🏫 Daily tip: public-school students get a Ministry-aligned support plan, lesson by lesson.",
    hashtags: ["#PublicSchool", "#MinistryCurriculum", "#TheEnglishClubAlexandria"],
  },
  {
    id: "placement-level",
    title: "Discover your real English level in 10 minutes",
    section: "Placement Test",
    route: "/placement-test",
    icon: BarChart3,
    preview: "placement",
    english:
      "The adaptive placement test asks 25 smart questions and gives you a clear CEFR level (A1 to C2). Use the result to pick the correct course, book and study path.",
    arabic:
      "اختبار تحديد المستوى الذكي بيسألك 25 سؤال وبيطلعلك مستواك بدقة (من A1 لحد C2). النتيجة بتساعدك تختار الكورس والكتاب والتدريب المناسب ليك.",
    steps: [
      "Sign in to your account",
      "Open Placement Test",
      "Answer all 25 questions honestly",
      "Use your level to pick the right course",
    ],
    facebookIntro:
      "📊 Daily tip: never start a course before you know your real level.",
    hashtags: ["#PlacementTest", "#CEFR", "#TheEnglishClubAlexandria"],
  },
  {
    id: "book-materials",
    title: "Use the lesson materials beside your school book",
    section: "Books & Materials",
    route: "/courses/egyptian-public",
    icon: BookMarked,
    preview: "book",
    english:
      "Each school-track lesson works as a digital companion to the book: vocabulary cards, reading, grammar, writing tasks and workbook-style practice — all aligned to the unit.",
    arabic:
      "كل درس في مسار المدرسة شغّال كمكمّل للكتاب المدرسي: كروت كلمات، قراءة، جرامر، كتابة، وتدريبات شبه الورك بوك — كله متطابق مع الوحدة.",
    steps: [
      "Open Public School English",
      "Pick your stage and unit",
      "Open the matching lesson",
      "Finish the practice after reading",
    ],
    facebookIntro:
      "📖 Daily tip: study the school book and the website side by side — same unit, double practice.",
    hashtags: ["#StudyMaterials", "#EnglishBook", "#TheEnglishClubAlexandria"],
  },
  {
    id: "yearly-plan",
    title: "Download a clear yearly study plan (PDF)",
    section: "Yearly Plan",
    route: "/courses/egyptian-public",
    icon: Download,
    preview: "yearly-plan",
    english:
      "Parents can download a free yearly PDF plan that organises reading, workbook practice, monthly revision and exam preparation month by month.",
    arabic:
      "الأهالي يقدروا ينزلوا خطة سنوية PDF مجانية بتنظم القراءة وتدريبات الورك بوك والمراجعة الشهرية والاستعداد للامتحانات شهر بشهر.",
    steps: [
      "Open the Egyptian Public School course",
      "Pick your child's stage",
      "Press Download PDF Plan",
      "Follow the plan month by month",
    ],
    facebookIntro:
      "📅 Daily tip for parents: a free monthly study plan is one click away.",
    hashtags: ["#StudyPlan", "#ParentsCorner", "#TheEnglishClubAlexandria"],
  },
  {
    id: "workbook-practice",
    title: "Practise workbook questions after every lesson",
    section: "Workbook Practice",
    route: "/courses/egyptian-public",
    icon: PenLine,
    preview: "workbook",
    english:
      "Workbook-style practice helps the student check understanding right after the lesson — vocabulary, grammar, reading questions and short writing tasks.",
    arabic:
      "تدريبات شبه الورك بوك بتساعد الطالب يتأكد إنه فاهم بعد الدرس على طول — كلمات، جرامر، أسئلة قراءة، وكتابة قصيرة.",
    steps: [
      "Finish the lesson first",
      "Review the new vocabulary",
      "Answer the workbook tasks",
      "Repeat any question you got wrong",
    ],
    facebookIntro:
      "✍️ Daily tip: practice comes AFTER the lesson — not before.",
    hashtags: ["#Workbook", "#EnglishPractice", "#TheEnglishClubAlexandria"],
  },
  {
    id: "revision-exams",
    title: "Revise smartly before monthly and term exams",
    section: "Exams & Revision",
    route: "/courses/egyptian-public",
    icon: FileText,
    preview: "exams",
    english:
      "Revision activities prepare the student for monthly tests and term exams: key vocabulary, grammar drills, reading comprehension and writing models — all in one place.",
    arabic:
      "أنشطة المراجعة بتجهّز الطالب لامتحانات الشهر والترم: أهم الكلمات، تدريبات جرامر، فهم قراءة، ونماذج كتابة — كله في مكان واحد.",
    steps: [
      "Open your school stage",
      "Review every completed lesson",
      "Try the exam-style questions",
      "Focus on your weak points",
    ],
    facebookIntro:
      "📝 Daily tip: organised revision = better marks. Use the platform every week, not only before the exam.",
    hashtags: ["#ExamRevision", "#StudyTips", "#TheEnglishClubAlexandria"],
  },
  {
    id: "flashcards",
    title: "Memorise vocabulary fast with flashcards",
    section: "Flashcards",
    route: "/flashcards",
    icon: Zap,
    preview: "flashcards",
    english:
      "Flashcards use spaced repetition to lock new vocabulary into long-term memory. Flip the card, listen to the pronunciation, and rate how well you remember it.",
    arabic:
      "الفلاش كاردز بتستخدم نظام التكرار الذكي علشان تثبّت الكلمات في دماغك لفترة طويلة. اقلب الكارت، اسمع النطق، وقيّم نفسك إنت فاكر الكلمة قد إيه.",
    steps: [
      "Open Flashcards from the menu",
      "Pick a vocabulary deck",
      "Read the word and try to recall",
      "Flip and rate your answer",
    ],
    facebookIntro:
      "⚡ Daily tip: 5 minutes of flashcards a day beats 1 hour the night before the exam.",
    hashtags: ["#Flashcards", "#VocabularyDaily", "#TheEnglishClubAlexandria"],
  },
  {
    id: "writing",
    title: "Improve your writing with instant AI feedback",
    section: "Writing Practice",
    route: "/writing",
    icon: PenLine,
    preview: "writing",
    english:
      "Submit a paragraph or short essay and the platform grades it instantly: grammar, vocabulary, structure and a clear band score with suggestions to improve.",
    arabic:
      "اكتب فقرة أو مقال قصير والموقع بيصححه فورًا: جرامر، كلمات، تنظيم، ودرجة واضحة مع اقتراحات تحسين.",
    steps: [
      "Open Writing Practice",
      "Choose a topic or write freely",
      "Submit your text",
      "Read the feedback and rewrite",
    ],
    facebookIntro:
      "✍️ Daily tip: written feedback in seconds — perfect for IGCSE, Thanaweya and IELTS writing.",
    hashtags: ["#WritingPractice", "#IELTS", "#TheEnglishClubAlexandria"],
  },
  {
    id: "pronunciation",
    title: "Fix your pronunciation word by word",
    section: "Pronunciation",
    route: "/pronunciation",
    icon: Mic2,
    preview: "pronunciation",
    english:
      "Read a sentence into the microphone and the system scores your pronunciation in real time, highlighting the words you said correctly and the ones you need to repeat.",
    arabic:
      "اقرأ جملة في الميكروفون والموقع بيقيّم نطقك على طول، وبيلوّن الكلمات الصح والكلمات اللي محتاج تعيدها.",
    steps: [
      "Open Pronunciation Checker",
      "Press the microphone",
      "Read the sentence clearly",
      "Repeat any red word",
    ],
    facebookIntro:
      "🎙️ Daily tip: pronunciation is a skill — train it 5 minutes a day with instant feedback.",
    hashtags: ["#Pronunciation", "#SpeakClearly", "#TheEnglishClubAlexandria"],
  },
  {
    id: "leaderboard",
    title: "Compete and stay motivated on the leaderboard",
    section: "Leaderboard",
    route: "/leaderboard",
    icon: Trophy,
    preview: "leaderboard",
    english:
      "Earn XP from every lesson, exercise and writing task. Climb the weekly leaderboard, unlock badges, and celebrate your daily streak with the whole school.",
    arabic:
      "اجمع نقاط XP من كل درس وتمرين ومحاولة كتابة. اطلع في ترتيب الأسبوع، افتح شارات إنجاز، واحتفل بالاستريك بتاعك مع كل المدرسة.",
    steps: [
      "Study daily to earn XP",
      "Open the Leaderboard tab",
      "Check the weekly ranking",
      "Aim for the top 10 next week",
    ],
    facebookIntro:
      "🏆 Daily tip: a little healthy competition = much faster progress.",
    hashtags: ["#Leaderboard", "#StudyMotivation", "#TheEnglishClubAlexandria"],
  },
  {
    id: "community",
    title: "Ask questions in the student community",
    section: "Community",
    route: "/community",
    icon: Users,
    preview: "community",
    english:
      "The community feed is a friendly space to ask grammar questions, share tips, celebrate achievements and learn together with other students and teachers.",
    arabic:
      "الكوميونيتي مساحة ودودة تقدر تسأل فيها أي سؤال جرامر، تشارك خبراتك، تحتفل بإنجازاتك، وتتعلم مع الطلبة والمدرسين.",
    steps: [
      "Open Community from the menu",
      "Read the latest posts",
      "Write your question or tip",
      "Reply to help another student",
    ],
    facebookIntro:
      "💬 Daily tip: learning together is faster — join the community feed today.",
    hashtags: ["#Community", "#StudyTogether", "#TheEnglishClubAlexandria"],
  },
];

function getDailyPostIndex() {
  const start = new Date("2026-01-01T00:00:00");
  const today = new Date();
  const diff = Math.floor((today.getTime() - start.getTime()) / 86_400_000);
  return Math.abs(diff) % dailyPosts.length;
}

/* ─────────────────────── Realistic feature previews ─────────────────────── */

function PreviewFrame({ route, children }: { route: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-elevated min-w-0">
      <div className="flex h-9 items-center gap-2 border-b bg-muted/60 px-3 sm:px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
        <span className="ml-2 truncate text-xs text-muted-foreground">theenglishclub.app{route}</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function CoursesPreview() {
  const cards = [
    { lvl: "A1", color: "bg-emerald-500/15 text-emerald-600", title: "Beginner", lessons: 60 },
    { lvl: "B1", color: "bg-amber-500/15 text-amber-600", title: "Intermediate", lessons: 84 },
    { lvl: "C1", color: "bg-primary/15 text-primary", title: "Advanced", lessons: 72 },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {cards.map((c) => (
        <div key={c.lvl} className="rounded-lg border bg-background p-3">
          <div className={`mb-2 inline-flex rounded-md px-2 py-0.5 text-xs font-bold ${c.color}`}>{c.lvl}</div>
          <p className="text-sm font-semibold">{c.title}</p>
          <p className="text-xs text-muted-foreground">{c.lessons} lessons</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-2/3 bg-primary" />
          </div>
        </div>
      ))}
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-primary/10 p-3">
          <p className="text-[10px] font-semibold uppercase text-primary">XP</p>
          <p className="text-lg font-bold">2,840</p>
        </div>
        <div className="rounded-lg bg-amber-500/10 p-3">
          <p className="flex items-center gap-1 text-[10px] font-semibold uppercase text-amber-600"><Flame className="h-3 w-3" />Streak</p>
          <p className="text-lg font-bold">12 days</p>
        </div>
        <div className="rounded-lg bg-emerald-500/10 p-3">
          <p className="text-[10px] font-semibold uppercase text-emerald-600">Badges</p>
          <p className="text-lg font-bold">7</p>
        </div>
      </div>
      <div className="rounded-lg border bg-background p-3">
        <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">Continue learning</p>
        <p className="text-sm font-semibold">Unit 4 — Past Simple</p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-3/4 bg-primary" />
        </div>
      </div>
    </div>
  );
}

function GroupsPreview() {
  const rows = [
    { lvl: "B1", time: "Sat & Tue · 5–7pm", filled: "5/20" },
    { lvl: "A2", time: "Sun & Wed · 4–6pm", filled: "12/20" },
    { lvl: "C1", time: "Mon & Thu · 6–8pm", filled: "18/20" },
  ];
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div key={r.lvl + r.time} className="flex items-center justify-between rounded-lg border bg-background px-3 py-2.5">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-primary/15 px-2 py-0.5 text-xs font-bold text-primary">{r.lvl}</span>
            <span className="text-sm">{r.time}</span>
          </div>
          <span className="text-xs font-semibold text-muted-foreground">{r.filled} joined</span>
        </div>
      ))}
    </div>
  );
}

function TeacherPreview() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs">
        <span className="rounded-md bg-primary/15 px-2 py-0.5 font-semibold text-primary">Enrolments</span>
        <span className="rounded-md bg-muted px-2 py-0.5 text-muted-foreground">Student Answers</span>
      </div>
      {["Mariam — Essay 2 · pending", "Omar — Reading Q · graded", "Salma — Listening · pending"].map((s) => (
        <div key={s} className="flex items-center justify-between rounded-lg border bg-background px-3 py-2 text-sm">
          <span>{s}</span>
          <CheckCircle2 className="h-4 w-4 text-success" />
        </div>
      ))}
    </div>
  );
}

function AITutorPreview() {
  return (
    <div className="space-y-2">
      <div className="rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-sm max-w-[85%]">
        <p className="text-[10px] font-semibold uppercase text-muted-foreground">AI tutor</p>
        Hi! Today let's roleplay ordering coffee in a café. ☕
      </div>
      <div className="ml-auto rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-sm text-primary-foreground max-w-[85%]">
        I would like one cappuccino, please.
      </div>
      <div className="rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-sm max-w-[85%]">
        ✅ Perfect! Try also: "Could I have…"
      </div>
    </div>
  );
}

function DictionaryPreview() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">achievement</span>
      </div>
      <div className="rounded-lg border bg-background p-3">
        <div className="flex items-center justify-between">
          <p className="font-semibold">achievement <span className="text-xs text-muted-foreground">/əˈtʃiːv.mənt/</span></p>
          <Volume2 className="h-4 w-4 text-primary" />
        </div>
        <p className="mt-1 text-xs text-muted-foreground">noun · something good you have done after a lot of work.</p>
        <p className="mt-2 rounded-md bg-muted px-2 py-1 text-xs italic">"Passing the exam was a great achievement."</p>
      </div>
    </div>
  );
}

function PublicSchoolPreview() {
  return (
    <div className="space-y-2">
      {["Primary 4 · Unit 3 — My Family", "Prep 2 · Unit 5 — Healthy Food", "Secondary 1 · Unit 2 — Travel"].map((s) => (
        <div key={s} className="flex items-center justify-between rounded-lg border bg-background px-3 py-2 text-sm">
          <span>{s}</span>
          <span className="rounded-md bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">Ministry</span>
        </div>
      ))}
    </div>
  );
}

function PlacementPreview() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase text-muted-foreground">Question 12 of 25</p>
      <p className="text-sm font-semibold">Choose the correct option:</p>
      <p className="text-sm">She ______ to Cairo last summer.</p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-md border bg-background px-3 py-2">A. go</div>
        <div className="rounded-md border-2 border-primary bg-primary/10 px-3 py-2 font-semibold text-primary">B. went</div>
        <div className="rounded-md border bg-background px-3 py-2">C. goes</div>
        <div className="rounded-md border bg-background px-3 py-2">D. gone</div>
      </div>
    </div>
  );
}

function BookPreview() {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {[
        { t: "Vocabulary", c: "12 words" },
        { t: "Reading", c: "Story + 5 Qs" },
        { t: "Grammar", c: "Past Simple" },
        { t: "Writing", c: "Short paragraph" },
      ].map((b) => (
        <div key={b.t} className="rounded-lg border bg-background p-3">
          <p className="text-xs font-semibold uppercase text-muted-foreground">{b.t}</p>
          <p className="text-sm">{b.c}</p>
        </div>
      ))}
    </div>
  );
}

function YearlyPlanPreview() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between rounded-lg border bg-background px-3 py-2">
        <span className="text-sm font-semibold">Yearly Plan — Prep 1</span>
        <span className="rounded-md bg-primary px-2 py-1 text-[10px] font-bold text-primary-foreground">PDF</span>
      </div>
      {["September — Unit 1 & 2", "October — Unit 3 + Test", "November — Unit 4 & Revision"].map((m) => (
        <div key={m} className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2 text-xs">
          <CalendarDays className="h-3.5 w-3.5 text-primary" /> {m}
        </div>
      ))}
    </div>
  );
}

function WorkbookPreview() {
  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">Q1. Fill in the blank:</p>
      <p>I usually ______ (eat) breakfast at 7 am.</p>
      <div className="rounded-md border-2 border-success bg-success/10 px-3 py-2 text-success">eat ✓</div>
      <p className="pt-2 font-semibold">Q2. Write the opposite:</p>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-md bg-muted px-2 py-1.5">happy → sad</div>
        <div className="rounded-md bg-muted px-2 py-1.5">big → small</div>
      </div>
    </div>
  );
}

function ExamsPreview() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border bg-background p-3">
        <p className="text-xs font-semibold uppercase text-muted-foreground">Mock Test · Term 1</p>
        <p className="text-2xl font-bold text-primary">82<span className="text-base text-muted-foreground">/100</span></p>
        <p className="text-xs text-success">+8 from last attempt</p>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-md bg-muted/60 p-2"><p className="font-bold">22</p><p className="text-[10px] text-muted-foreground">Vocab</p></div>
        <div className="rounded-md bg-muted/60 p-2"><p className="font-bold">28</p><p className="text-[10px] text-muted-foreground">Grammar</p></div>
        <div className="rounded-md bg-muted/60 p-2"><p className="font-bold">32</p><p className="text-[10px] text-muted-foreground">Reading</p></div>
      </div>
    </div>
  );
}

function FlashcardsPreview() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex h-32 w-full max-w-xs items-center justify-center rounded-xl border-2 border-dashed border-primary/40 bg-primary/5">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">resilient</p>
          <p className="text-xs text-muted-foreground">tap to flip</p>
        </div>
      </div>
      <div className="flex gap-2 text-xs">
        <span className="rounded-md bg-destructive/15 px-3 py-1 text-destructive">Hard</span>
        <span className="rounded-md bg-amber-500/15 px-3 py-1 text-amber-600">Good</span>
        <span className="rounded-md bg-success/15 px-3 py-1 text-success">Easy</span>
      </div>
    </div>
  );
}

function WritingPreview() {
  return (
    <div className="space-y-2 text-sm">
      <div className="rounded-lg border bg-background p-3">
        <p className="text-xs italic text-muted-foreground">"My favorite hobby is reading books because…"</p>
      </div>
      <div className="rounded-lg border-l-4 border-success bg-success/10 p-3">
        <p className="text-xs font-bold text-success">Score: 7.5 / 9</p>
        <p className="text-xs">✓ Good vocabulary range</p>
        <p className="text-xs">✗ Watch articles (a / the)</p>
      </div>
    </div>
  );
}

function PronunciationPreview() {
  return (
    <div className="space-y-3 text-sm">
      <p className="leading-7">
        <span className="rounded bg-success/20 px-1 text-success">The</span>{" "}
        <span className="rounded bg-success/20 px-1 text-success">weather</span>{" "}
        <span className="rounded bg-destructive/20 px-1 text-destructive">today</span>{" "}
        <span className="rounded bg-success/20 px-1 text-success">is</span>{" "}
        <span className="rounded bg-amber-500/20 px-1 text-amber-600">beautiful</span>.
      </p>
      <div className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2 text-xs">
        <span className="font-semibold">Accuracy</span>
        <span className="font-bold text-success">82%</span>
      </div>
    </div>
  );
}

function LeaderboardPreview() {
  const rows = [
    { n: "Yara", xp: 4820, place: 1, color: "text-amber-500" },
    { n: "Ahmed", xp: 4310, place: 2, color: "text-muted-foreground" },
    { n: "Hana", xp: 3990, place: 3, color: "text-amber-700" },
  ];
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div key={r.n} className="flex items-center justify-between rounded-lg border bg-background px-3 py-2">
          <div className="flex items-center gap-3">
            <Trophy className={`h-4 w-4 ${r.color}`} />
            <span className="text-sm font-semibold">#{r.place} {r.n}</span>
          </div>
          <span className="flex items-center gap-1 text-xs font-bold text-primary"><Star className="h-3 w-3" /> {r.xp.toLocaleString()} XP</span>
        </div>
      ))}
    </div>
  );
}

function CommunityPreview() {
  return (
    <div className="space-y-2">
      <div className="rounded-lg border bg-background p-3">
        <p className="text-xs font-semibold">Mariam · 2h</p>
        <p className="mt-1 text-sm">Can someone explain when we use "have been" vs "had been"? 🙏</p>
        <div className="mt-2 flex gap-3 text-[10px] text-muted-foreground">
          <span>♥ 12</span><span>💬 4 replies</span>
        </div>
      </div>
      <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-3">
        <p className="text-xs font-semibold text-primary">Teacher Sara replied</p>
        <p className="text-xs">"Have been" → still relevant now. "Had been" → before another past action.</p>
      </div>
    </div>
  );
}

const previewMap: Record<PreviewKind, React.ComponentType> = {
  courses: CoursesPreview,
  dashboard: DashboardPreview,
  groups: GroupsPreview,
  teacher: TeacherPreview,
  "ai-tutor": AITutorPreview,
  dictionary: DictionaryPreview,
  "public-school": PublicSchoolPreview,
  placement: PlacementPreview,
  book: BookPreview,
  "yearly-plan": YearlyPlanPreview,
  workbook: WorkbookPreview,
  exams: ExamsPreview,
  flashcards: FlashcardsPreview,
  writing: WritingPreview,
  pronunciation: PronunciationPreview,
  leaderboard: LeaderboardPreview,
  community: CommunityPreview,
};

function FeatureScreenshot({ post }: { post: HelpPost }) {
  const Icon = post.icon;
  const PreviewBody = previewMap[post.preview];
  return (
    <PreviewFrame route={post.route}>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{post.section}</p>
          <p className="truncate font-display text-base font-bold sm:text-lg">{post.title}</p>
        </div>
      </div>
      <PreviewBody />
    </PreviewFrame>
  );
}

/* ─────────────────────────────────── Page ─────────────────────────────────── */

export default function PlatformBlog() {
  const [selectedId, setSelectedId] = useState(dailyPosts[getDailyPostIndex()].id);
  const post = dailyPosts.find((item) => item.id === selectedId) ?? dailyPosts[0];
  const todayLabel = useMemo(
    () => new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(new Date()),
    [],
  );

  const facebookCopy = [
    post.facebookIntro,
    "",
    `🇬🇧 ${post.title}`,
    post.english,
    "",
    `🇪🇬 ${post.title} (بالمصري)`,
    post.arabic,
    "",
    `📍 Where to find it: theenglishclub.app${post.route}`,
    "",
    "How to use it:",
    ...post.steps.map((step, index) => `${index + 1}. ${step}`),
    "",
    "👉 Try it now and tell us your feedback in the comments!",
    "📲 WhatsApp: +20 155 490 1390",
    "",
    post.hashtags.join(" "),
  ].join("\n");

  const copyFacebookPost = async () => {
    await navigator.clipboard.writeText(facebookCopy);
    toast({
      title: "Facebook post copied",
      description: "Paste it directly on the school's Facebook page.",
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b bg-card">
        <div className="container mx-auto grid gap-8 px-4 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/60 px-3 py-1 text-sm font-medium text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-primary" /> Daily platform guide · {todayLabel}
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
              One feature, every day — explained simply
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Each daily post explains one website feature in clear English and Egyptian Arabic, with a realistic preview and ready-to-paste Facebook copy for the school page.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={copyFacebookPost} className="gap-2">
                <Facebook className="h-4 w-4" /> Copy Facebook Post
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <a href={post.route}><CheckCircle2 className="h-4 w-4" /> Open Feature</a>
              </Button>
            </div>
          </div>
          <FeatureScreenshot post={post} />
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 py-8 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto -mx-4 px-4 lg:mx-0 lg:px-0">
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
            {dailyPosts.map((item, index) => {
              const Icon = item.icon;
              const active = item.id === post.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`flex shrink-0 lg:w-full items-center gap-2 lg:gap-3 rounded-lg border px-3 py-2.5 lg:py-3 text-left transition-colors ${
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "bg-card text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] lg:text-xs font-semibold uppercase tracking-widest">Day {index + 1}</span>
                    <span className="block whitespace-nowrap lg:whitespace-normal lg:truncate text-sm font-medium">{item.section}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <article className="rounded-lg border bg-card p-4 sm:p-5 shadow-soft md:p-7 min-w-0">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">{post.section}</p>
              <h2 className="mt-2 font-display text-xl sm:text-2xl font-bold md:text-3xl break-words">{post.title}</h2>
            </div>
            <Button variant="outline" onClick={copyFacebookPost} className="gap-2">
              <Clipboard className="h-4 w-4" /> Copy
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-background p-4">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">🇬🇧 English note</h3>
              <p className="leading-7 text-muted-foreground">{post.english}</p>
            </div>
            <div className="rounded-lg border bg-background p-4" dir="rtl">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">🇪🇬 الشرح بالمصري</h3>
              <p className="leading-8 text-muted-foreground">{post.arabic}</p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border bg-background p-4">
            <h3 className="mb-3 font-semibold">Where to find it</h3>
            <div className="mb-4 rounded-md bg-muted px-3 py-2 font-mono text-xs sm:text-sm text-muted-foreground break-all">
              theenglishclub.app{post.route}
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {post.steps.map((step, index) => (
                <div key={step} className="flex items-start gap-2 rounded-md border bg-card px-3 py-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span><strong>Step {index + 1}:</strong> {step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-primary/30 bg-primary/5 p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="flex items-center gap-2 font-semibold text-primary">
                <Facebook className="h-4 w-4" /> Ready-to-paste Facebook post
              </h3>
              <Button size="sm" onClick={copyFacebookPost} className="gap-1.5">
                <Clipboard className="h-3.5 w-3.5" /> Copy
              </Button>
            </div>
            <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-md bg-card p-3 text-xs leading-6 text-muted-foreground border">{facebookCopy}</pre>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {post.hashtags.map((tag) => (
                <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">{tag}</span>
              ))}
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
