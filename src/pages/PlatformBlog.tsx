import { useMemo, useState } from "react";
import { BarChart3, BookMarked, BookOpen, CalendarDays, CheckCircle2, Clipboard, Download, Facebook, FileText, GraduationCap, LayoutDashboard, MessageCircle, PenLine, Search, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

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
};

const dailyPosts: HelpPost[] = [
  {
    id: "courses",
    title: "Find the right course and start learning",
    section: "Courses",
    route: "/courses",
    icon: BookOpen,
    english: "Open Courses to choose your level, school track, or special course. Each course has lessons, practice activities, and progress tracking.",
    arabic: "افتح صفحة الكورسات علشان تختار مستواك أو نظام المدرسة أو كورس متخصص. كل كورس فيه دروس وتدريبات ومتابعة للتقدم بتاعك.",
    steps: ["Log in to your account", "Open Courses from the top menu", "Choose a level or Egyptian Public School track", "Press Start Lesson"],
    facebookIntro: "Today’s platform tip: help students start from the correct course instead of searching around the site.",
  },
  {
    id: "dashboard",
    title: "Use your dashboard to follow progress",
    section: "Student Dashboard",
    route: "/dashboard",
    icon: LayoutDashboard,
    english: "The dashboard shows your XP, streak, recent learning, and next recommended actions so you always know what to study next.",
    arabic: "الداشبورد بتوضح نقاطك، الاستريك، آخر حاجة درستها، والخطوة الجاية المقترحة علشان تعرف تذاكر إيه بعد كده.",
    steps: ["Log in", "Open Dashboard", "Check XP and streak", "Continue the suggested lesson"],
    facebookIntro: "Today’s platform tip: students can track their learning from one simple dashboard.",
  },
  {
    id: "groups",
    title: "Join a school group online",
    section: "Groups",
    route: "/groups",
    icon: Users,
    english: "Groups lets students see available school groups, check the schedule, and request or complete enrollment directly from the website.",
    arabic: "صفحة الجروبات بتخلي الطالب يشوف الجروبات المتاحة والمواعيد ويطلب الاشتراك أو يكمل التسجيل من الموقع مباشرة.",
    steps: ["Open Groups", "Review level, days, and time", "Choose the suitable group", "Submit your enrollment"],
    facebookIntro: "Today’s platform tip: families can check available groups before contacting the school.",
  },
  {
    id: "teacher-dashboard",
    title: "Teachers can review enrollments and answers",
    section: "Teacher Tools",
    route: "/teacher-dashboard",
    icon: GraduationCap,
    english: "Teacher Dashboard helps teachers follow enrollments, review student answers, and manage classroom work in one place.",
    arabic: "داشبورد المدرس بتساعد المدرسين يتابعوا الاشتراكات، يراجعوا إجابات الطلبة، وينظموا شغل الحصة من مكان واحد.",
    steps: ["Log in with a teacher account", "Open Teacher Dashboard", "Check Enrollments", "Review Student Answers"],
    facebookIntro: "Today’s platform tip: teachers can follow students and homework from their own dashboard.",
  },
  {
    id: "ai-tutor",
    title: "Practice English with the AI tutor",
    section: "AI Tutor",
    route: "/ai-tutor",
    icon: MessageCircle,
    english: "AI Tutor gives students guided English practice through roleplay, questions, and conversation support at any time.",
    arabic: "مدرس الذكاء الاصطناعي بيدي الطالب تدريب إنجليزي من خلال محادثات وتمثيل مواقف وأسئلة في أي وقت.",
    steps: ["Open AI Tutor", "Choose a practice topic", "Write or speak your answer", "Read the correction and continue"],
    facebookIntro: "Today’s platform tip: students can practice English conversation even after school hours.",
  },
  {
    id: "dictionary",
    title: "Use the dictionary when you meet a new word",
    section: "Dictionary",
    route: "/dictionary",
    icon: Search,
    english: "The dictionary helps students check meaning, pronunciation, and examples without leaving the learning platform.",
    arabic: "القاموس بيساعد الطالب يعرف معنى الكلمة والنطق والأمثلة من غير ما يخرج من منصة التعلم.",
    steps: ["Open Dictionary", "Type the word", "Read the meaning and example", "Listen and repeat"],
    facebookIntro: "Today’s platform tip: students can use the built-in dictionary while studying lessons.",
  },
  {
    id: "public-school",
    title: "Study with the Egyptian Public School track",
    section: "Public School English",
    route: "/courses/egyptian-public",
    icon: Sparkles,
    english: "The Public School track supports Ministry-style learning with vocabulary, workbook practice, reading, writing, and term revision.",
    arabic: "مسار مدارس الحكومة بيساعد الطالب على منهج الوزارة من خلال كلمات، تدريبات وورك بوك، قراءة، كتابة، ومراجعة الترم.",
    steps: ["Open Courses", "Choose Public School English", "Select Primary, Preparatory, or Secondary", "Download the yearly plan if needed"],
    facebookIntro: "Today’s platform tip: public-school students can study with a Ministry-style support plan.",
  },
  {
    id: "placement-level",
    title: "Find your English level before choosing a book",
    section: "Placement Test",
    route: "/placement-test",
    icon: BarChart3,
    english: "The placement test helps students identify their current level before starting lessons, so they can choose the correct book, course, and practice path.",
    arabic: "اختبار تحديد المستوى بيساعد الطالب يعرف مستواه الحقيقي قبل ما يبدأ، علشان يختار الكتاب والكورس والتدريبات المناسبة ليه.",
    steps: ["Log in", "Open Placement Test", "Answer all questions carefully", "Use the result to choose your level"],
    facebookIntro: "Today’s platform tip: students should identify their level before starting a book or course.",
  },
  {
    id: "book-materials",
    title: "Use the lesson materials with your school book",
    section: "Books & Materials",
    route: "/courses/egyptian-public",
    icon: BookMarked,
    english: "Each school-track lesson supports the book with vocabulary, reading, grammar, writing practice, and workbook-style activities for revision at home.",
    arabic: "كل درس في مسار المدرسة بيساعد الطالب يستخدم الكتاب من خلال كلمات، قراءة، جرامر، كتابة، وتدريبات شبه الورك بوك للمراجعة في البيت.",
    steps: ["Open Public School English", "Choose your stage", "Start the matching lesson", "Complete the practice after reading"],
    facebookIntro: "Today’s platform tip: students can use the website beside the school book for guided practice.",
  },
  {
    id: "yearly-plan",
    title: "Download the yearly reading and workbook plan",
    section: "Ministry Plan PDF",
    route: "/courses/egyptian-public",
    icon: Download,
    english: "Families can download a yearly plan that organizes reading, workbook practice, revision, and exam preparation month by month.",
    arabic: "الأهالي يقدروا ينزلوا خطة سنوية بتنظم القراءة وتدريبات الورك بوك والمراجعة والاستعداد للامتحانات شهر بشهر.",
    steps: ["Open the Egyptian Public School course", "Select the correct stage", "Press Download PDF Plan", "Follow the monthly plan"],
    facebookIntro: "Today’s platform tip: parents can download a clear yearly study plan from the website.",
  },
  {
    id: "workbook-practice",
    title: "Practise workbook questions after each lesson",
    section: "Workbook Practice",
    route: "/courses/egyptian-public",
    icon: PenLine,
    english: "Workbook practice helps students check understanding after studying the lesson, especially vocabulary, grammar, reading questions, and short writing tasks.",
    arabic: "تدريبات الورك بوك بتساعد الطالب يتأكد إنه فاهم بعد الدرس، خصوصًا الكلمات والجرامر وأسئلة القراءة والكتابة القصيرة.",
    steps: ["Finish the lesson", "Review the vocabulary", "Answer the workbook-style tasks", "Repeat difficult questions"],
    facebookIntro: "Today’s platform tip: workbook practice should come after the lesson, not before it.",
  },
  {
    id: "revision-exams",
    title: "Revise before monthly and term exams",
    section: "Exams & Revision",
    route: "/courses/egyptian-public",
    icon: FileText,
    english: "Revision activities help students prepare for monthly tests and term exams by reviewing key vocabulary, grammar, comprehension, and writing tasks.",
    arabic: "أنشطة المراجعة بتجهز الطالب لاختبارات الشهر وامتحانات الترم من خلال مراجعة الكلمات المهمة والجرامر والفهم والكتابة.",
    steps: ["Open your school stage", "Review completed lessons", "Practise exam-style questions", "Check weak points before the test"],
    facebookIntro: "Today’s platform tip: students can use the platform for monthly and term revision.",
  },
];

function getDailyPostIndex() {
  const start = new Date("2026-01-01T00:00:00");
  const today = new Date();
  const diff = Math.floor((today.getTime() - start.getTime()) / 86_400_000);
  return Math.abs(diff) % dailyPosts.length;
}

function FeatureScreenshot({ post }: { post: HelpPost }) {
  const Icon = post.icon;
  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-elevated">
      <div className="flex h-9 items-center gap-2 border-b bg-muted/60 px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
        <span className="ml-2 text-xs text-muted-foreground">theenglishclub.app{post.route}</span>
      </div>
      <div className="grid gap-4 p-5 md:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border bg-background p-4">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{post.section}</p>
              <p className="font-display text-lg font-bold">{post.title}</p>
            </div>
          </div>
          <div className="space-y-2">
            {post.steps.map((step, index) => (
              <div key={step} className="flex items-center gap-2 rounded-md bg-muted/60 px-3 py-2 text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">{index + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border bg-background p-4">
          <div className="mb-4 h-3 w-32 rounded-full bg-muted" />
          <div className="space-y-3">
            <div className="h-24 rounded-lg bg-primary/10" />
            <div className="grid grid-cols-3 gap-2">
              <div className="h-14 rounded-md bg-accent/20" />
              <div className="h-14 rounded-md bg-muted" />
              <div className="h-14 rounded-md bg-secondary/15" />
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-2.5 w-full rounded-full bg-muted" />
              <div className="h-2.5 w-4/5 rounded-full bg-muted" />
              <div className="h-2.5 w-2/3 rounded-full bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlatformBlog() {
  const [selectedId, setSelectedId] = useState(dailyPosts[getDailyPostIndex()].id);
  const post = dailyPosts.find((item) => item.id === selectedId) ?? dailyPosts[0];
  const todayLabel = useMemo(() => new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(new Date()), []);
  const facebookCopy = `${post.facebookIntro}\n\n${post.title}\n\nEnglish: ${post.english}\n\nArabic Egyptian: ${post.arabic}\n\nWhere to find it: ${post.route}\n\nSteps:\n${post.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}`;

  const copyFacebookPost = async () => {
    await navigator.clipboard.writeText(facebookCopy);
    toast({ title: "Facebook post copied", description: "The bilingual daily post is ready to paste on the school page." });
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b bg-card">
        <div className="container mx-auto grid gap-8 px-4 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/60 px-3 py-1 text-sm font-medium text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-primary" /> Daily platform guide · {todayLabel}
            </div>
            <h1 className="font-display text-3xl font-bold tracking-normal md:text-5xl">Daily help blog for students and parents</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              A ready-to-share daily post explaining one website feature in English and Egyptian Arabic, with a website-style screenshot and Facebook copy.
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
        <aside className="space-y-2">
          {dailyPosts.map((item, index) => {
            const Icon = item.icon;
            const active = item.id === post.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors ${active ? "border-primary bg-primary/10 text-primary" : "bg-card text-muted-foreground hover:bg-muted/60 hover:text-foreground"}`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold uppercase tracking-widest">Day {index + 1}</span>
                  <span className="block truncate text-sm font-medium">{item.section}</span>
                </span>
              </button>
            );
          })}
        </aside>

        <article className="rounded-lg border bg-card p-5 shadow-soft md:p-7">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">{post.section}</p>
              <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">{post.title}</h2>
            </div>
            <Button variant="outline" onClick={copyFacebookPost} className="gap-2">
              <Clipboard className="h-4 w-4" /> Copy
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-background p-4">
              <h3 className="mb-2 font-semibold">English note</h3>
              <p className="leading-7 text-muted-foreground">{post.english}</p>
            </div>
            <div className="rounded-lg border bg-background p-4" dir="rtl">
              <h3 className="mb-2 font-semibold">الملاحظة بالمصري</h3>
              <p className="leading-8 text-muted-foreground">{post.arabic}</p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border bg-background p-4">
            <h3 className="mb-3 font-semibold">Where to find it</h3>
            <div className="mb-4 rounded-md bg-muted px-3 py-2 font-mono text-sm text-muted-foreground">{post.route}</div>
            <div className="grid gap-2 md:grid-cols-2">
              {post.steps.map((step, index) => (
                <div key={step} className="flex items-start gap-2 rounded-md border bg-card px-3 py-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span><strong>Step {index + 1}:</strong> {step}</span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}