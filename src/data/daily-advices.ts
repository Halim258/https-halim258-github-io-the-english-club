export type DailyAdvice = {
  id: string;
  category: "Speaking" | "Listening" | "Vocabulary" | "Grammar" | "Writing" | "Habits" | "Exams";
  title: string;
  english: string;
  arabic: string;
  action: string;
  hashtags: string[];
};

export const dailyAdvices: DailyAdvice[] = [
  { id: "a1", category: "Habits", title: "15 focused minutes beat 2 random hours",
    english: "Study every day at the same time, even for 15 minutes. Consistency builds memory much faster than long sessions once a week.",
    arabic: "ذاكر كل يوم في نفس الوقت، ولو ١٥ دقيقة بس. الاستمرارية بتثبّت المعلومة أسرع بكتير من مذاكرة طويلة مرة في الأسبوع.",
    action: "Set a daily 15-minute alarm and open one lesson.", hashtags: ["#StudyHabits", "#LearnEnglish"] },
  { id: "a2", category: "Speaking", title: "Talk to yourself out loud for 3 minutes",
    english: "Describe your day out loud in English. Mistakes are fine — the goal is to move your mouth and build fluency, not to be perfect.",
    arabic: "اتكلم مع نفسك بصوت عالي بالإنجليزي عن يومك ٣ دقايق. الغلط عادي، الهدف تدرّب لسانك على الطلاقة مش الكمال.",
    action: "Record yourself once and listen back.", hashtags: ["#SpeakEnglish", "#Fluency"] },
  { id: "a3", category: "Vocabulary", title: "Learn words in phrases, not alone",
    english: "Instead of memorising 'decision', learn 'make a decision'. Collocations make you sound natural immediately.",
    arabic: "متحفظش الكلمة لوحدها. بدل ما تحفظ decision احفظ make a decision. المتلازمات اللفظية بتخلي كلامك طبيعي فورًا.",
    action: "Write 5 new phrases in your notebook today.", hashtags: ["#Vocabulary", "#Collocations"] },
  { id: "a4", category: "Listening", title: "Listen twice: once for meaning, once for detail",
    english: "Play a short clip, understand the idea, then replay it and catch the exact words and linking sounds.",
    arabic: "اسمع المقطع مرة تفهم الفكرة، وبعدين اسمعه تاني وركّز على الكلمات ونطقها بالظبط.",
    action: "Use one lesson audio or a 2-minute video.", hashtags: ["#Listening", "#EnglishTips"] },
  { id: "a5", category: "Grammar", title: "Grammar sticks when you use it, not read it",
    english: "After any grammar rule, write 3 sentences about your own life using it. Personal sentences are remembered longer.",
    arabic: "بعد أي قاعدة، اكتب ٣ جمل عن حياتك بيها. الجمل الشخصية بتفضل في دماغك مدة أطول.",
    action: "Do it in the Activity tab of your lesson.", hashtags: ["#Grammar", "#PracticeEnglish"] },
  { id: "a6", category: "Writing", title: "Write 5 lines a day — no more",
    english: "A short daily paragraph is easier to finish and easier to correct. Quality feedback beats long unread essays.",
    arabic: "اكتب ٥ سطور بس كل يوم. الفقرة القصيرة أسهل تخلّصها وأسهل تتصحح، والتصحيح المفيد أحسن من مقال طويل محدش قراه.",
    action: "Use Writing Practice for instant feedback.", hashtags: ["#WritingPractice", "#EnglishWriting"] },
  { id: "a7", category: "Habits", title: "Review yesterday before starting today",
    english: "Spend the first 3 minutes reviewing yesterday's words. This single habit doubles what you keep long-term.",
    arabic: "أول ٣ دقايق راجع كلمات امبارح. العادة البسيطة دي بتضاعف اللي فاضل معاك على المدى الطويل.",
    action: "Open Flashcards and clear today's review.", hashtags: ["#Revision", "#Flashcards"] },
  { id: "a8", category: "Speaking", title: "Shadow a native speaker",
    english: "Play one sentence, pause, and repeat it copying the rhythm and intonation exactly. This fixes pronunciation fast.",
    arabic: "شغّل جملة، وقّف، وكرّرها بنفس الإيقاع والنغمة بالظبط. الطريقة دي بتصلّح النطق بسرعة.",
    action: "Try it in Pronunciation Checker.", hashtags: ["#Pronunciation", "#Shadowing"] },
  { id: "a9", category: "Vocabulary", title: "Use a new word 3 times today",
    english: "A word becomes yours after you use it in speaking or writing, not after you read its meaning.",
    arabic: "الكلمة تبقى بتاعتك لما تستخدمها في كلام أو كتابة، مش لما تقرأ معناها بس.",
    action: "Post one sentence in the Community feed.", hashtags: ["#Vocabulary", "#Community"] },
  { id: "a10", category: "Exams", title: "Practise with the clock on",
    english: "Time pressure is a skill. Do one timed section per week so exam day feels familiar, not stressful.",
    arabic: "الوقت في الامتحان مهارة لازم تتدرب عليها. اعمل قطعة بالتوقيت مرة كل أسبوع، فيوم الامتحان مش هتتوتر.",
    action: "Take the placement test or an exam section.", hashtags: ["#ExamPrep", "#PlacementTest"] },
  { id: "a11", category: "Listening", title: "Subtitles second, not first",
    english: "Watch a clip without subtitles, then check with English subtitles. Your ears train only when they work first.",
    arabic: "اتفرج على المقطع بدون ترجمة الأول، وبعدين شغّل الترجمة الإنجليزي للمراجعة. ودنك بتتدرب لما تشتغل الأول.",
    action: "Use a Movies or Documentary lesson.", hashtags: ["#Listening", "#EnglishMovies"] },
  { id: "a12", category: "Habits", title: "Protect your streak, not your mood",
    english: "On tired days do the minimum: one flashcard set or one short lesson. Never break the chain.",
    arabic: "في اليوم اللي تكون تعبان فيه اعمل الحد الأدنى: مجموعة فلاش كاردز أو درس قصير. المهم متقطعش السلسلة.",
    action: "Check your streak on the Dashboard.", hashtags: ["#Streak", "#Consistency"] },
  { id: "a13", category: "Grammar", title: "Fix one mistake at a time",
    english: "Pick your most repeated error this week (articles, past tense, prepositions) and hunt only that one.",
    arabic: "اختار الغلطة اللي بتكررها أكتر الأسبوع ده (a/the، الماضي، حروف الجر) وركز عليها هي بس.",
    action: "Write your target mistake at the top of your notebook.", hashtags: ["#Grammar", "#EnglishMistakes"] },
  { id: "a14", category: "Writing", title: "Read your writing out loud",
    english: "Your ear finds broken sentences your eye skips. Read every paragraph aloud before you submit it.",
    arabic: "ودنك بتكشف الجمل الغلط اللي عينك بتعديها. اقرأ كل فقرة بصوت عالي قبل تسلّمها.",
    action: "Do it with today's writing task.", hashtags: ["#WritingTips", "#EnglishWriting"] },
];

export function getDailyAdviceIndex(date = new Date()) {
  const start = new Date("2026-01-01T00:00:00");
  const diff = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
  return Math.abs(diff) % dailyAdvices.length;
}
