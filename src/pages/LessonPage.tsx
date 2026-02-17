import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Volume2, Eye, EyeOff, ArrowRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

// ---- Mock data for Lesson 1: Meeting & Greeting ----
const vocabWords = [
  { ar: "مَرْحَبًا", en: "Hello", translit: "marḥaban" },
  { ar: "أَهْلًا", en: "Welcome", translit: "ahlan" },
  { ar: "صَبَاحَ الخَيْرِ", en: "Good morning", translit: "ṣabāḥ al-khayr" },
  { ar: "مَسَاءَ الخَيْرِ", en: "Good evening", translit: "masāʾ al-khayr" },
  { ar: "كَيْفَ حَالُكَ؟", en: "How are you? (m)", translit: "kayfa ḥāluk?" },
  { ar: "أَنَا بِخَيْرٍ", en: "I am fine", translit: "anā bi-khayr" },
  { ar: "شُكْرًا", en: "Thank you", translit: "shukran" },
  { ar: "مَعَ السَّلَامَةِ", en: "Goodbye", translit: "maʿa as-salāma" },
  { ar: "اِسْمِي", en: "My name is", translit: "ismī" },
  { ar: "مِنْ فَضْلِكَ", en: "Please (m)", translit: "min faḍlik" },
];

const dialogue = [
  { speaker: "أحمد", ar: "مَرْحَبًا! أَنَا أَحْمَد. مَا اسْمُكِ؟", en: "Hello! I am Ahmed. What is your name?", translit: "marḥaban! anā Aḥmad. mā ismuki?" },
  { speaker: "سارة", ar: "أَهْلًا! أَنَا سَارَة. كَيْفَ حَالُكَ؟", en: "Welcome! I am Sara. How are you?", translit: "ahlan! anā Sāra. kayfa ḥāluk?" },
  { speaker: "أحمد", ar: "أَنَا بِخَيْرٍ، شُكْرًا. وَأَنْتِ؟", en: "I am fine, thank you. And you?", translit: "anā bi-khayr, shukran. wa-anti?" },
  { speaker: "سارة", ar: "بِخَيْرٍ، الحَمْدُ لِلَّهِ.", en: "Fine, praise be to God.", translit: "bi-khayr, al-ḥamdu lillāh." },
];

const grammarRule = {
  title: "Personal Pronouns — أنا / أنتَ / أنتِ",
  explanation: "Arabic uses different pronouns for masculine and feminine \"you\". أنتَ (anta) is for males, أنتِ (anti) for females. أنا (anā) means \"I\" for both genders.",
  examples: [
    { ar: "أَنَا طَالِبٌ", en: "I am a student (m)" },
    { ar: "أَنَا طَالِبَةٌ", en: "I am a student (f)" },
    { ar: "أَنْتَ مُعَلِّمٌ", en: "You are a teacher (m)" },
    { ar: "أَنْتِ مُعَلِّمَةٌ", en: "You are a teacher (f)" },
  ],
};

// Simple quiz component for exercises
function MCQ({ question, options, correct }: { question: string; options: string[]; correct: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="mb-3 font-medium">{question}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((opt, i) => {
          let cls = "rounded-md border px-3 py-2 text-sm text-left transition-colors ";
          if (!answered) cls += "hover:bg-muted cursor-pointer";
          else if (i === correct) cls += "border-success bg-success/10";
          else if (i === selected) cls += "border-destructive bg-destructive/10";
          else cls += "opacity-50";
          return (
            <button key={i} className={cls} onClick={() => !answered && setSelected(i)} disabled={answered}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <p className={`mt-2 text-sm font-medium ${selected === correct ? "text-success" : "text-destructive"}`}>
          {selected === correct ? "✓ Correct!" : `✗ Correct answer: ${options[correct]}`}
        </p>
      )}
    </div>
  );
}

export default function LessonPage() {
  const [showTranslation, setShowTranslation] = useState(false);
  const [showTranslit, setShowTranslit] = useState(false);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Link to="/courses" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-4 w-4" /> Back to Courses
      </Link>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">A1 — Lesson 1</p>
        <h1 className="mt-1 text-2xl font-bold">Meeting & Greeting</h1>
        <p className="mt-1 text-sm text-muted-foreground">Learn essential greetings and introductions in Arabic.</p>
      </div>

      <Tabs defaultValue="vocabulary" className="space-y-6">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
          <TabsTrigger value="conversation">Conversation</TabsTrigger>
          <TabsTrigger value="grammar">Grammar</TabsTrigger>
          <TabsTrigger value="speaking">Speaking</TabsTrigger>
          <TabsTrigger value="exam">Exam</TabsTrigger>
          <TabsTrigger value="homework">Homework</TabsTrigger>
        </TabsList>

        {/* VOCABULARY */}
        <TabsContent value="vocabulary" className="space-y-6">
          <div className="grid gap-3">
            {vocabWords.map((w, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border bg-card p-4">
                <div className="flex items-center gap-4">
                  <span className="arabic-text text-xl font-bold" dir="rtl">{w.ar}</span>
                  <span className="text-sm text-muted-foreground">{w.en}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hidden text-xs text-muted-foreground sm:inline">{w.translit}</span>
                  <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold">Exercises</h3>
          <div className="space-y-4">
            <MCQ question="What does مَرْحَبًا mean?" options={["Goodbye", "Hello", "Thank you", "Please"]} correct={1} />
            <MCQ question="How do you say 'Thank you' in Arabic?" options={["أَهْلًا", "مَسَاءَ الخَيْرِ", "شُكْرًا", "مَعَ السَّلَامَةِ"]} correct={2} />
            <MCQ question="What does كَيْفَ حَالُكَ mean?" options={["Good morning", "How are you?", "My name is", "Goodbye"]} correct={1} />
          </div>
        </TabsContent>

        {/* CONVERSATION */}
        <TabsContent value="conversation" className="space-y-6">
          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={() => setShowTranslation(!showTranslation)}>
              {showTranslation ? <EyeOff className="mr-1 h-3 w-3" /> : <Eye className="mr-1 h-3 w-3" />}
              English
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowTranslit(!showTranslit)}>
              {showTranslit ? <EyeOff className="mr-1 h-3 w-3" /> : <Eye className="mr-1 h-3 w-3" />}
              Transliteration
            </Button>
          </div>

          <div className="space-y-4">
            {dialogue.map((line, i) => (
              <div key={i} className={`rounded-lg border p-4 ${i % 2 === 0 ? "bg-card" : "bg-muted/30"}`}>
                <p className="text-xs font-semibold text-primary mb-1">{line.speaker}</p>
                <p className="arabic-text text-lg font-semibold" dir="rtl">{line.ar}</p>
                {showTranslation && <p className="mt-1 text-sm text-muted-foreground">{line.en}</p>}
                {showTranslit && <p className="mt-1 text-xs italic text-muted-foreground">{line.translit}</p>}
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold">Exercises</h3>
          <MCQ
            question="In the dialogue, how does Sara respond to 'How are you?'"
            options={["شُكْرًا", "بِخَيْرٍ، الحَمْدُ لِلَّهِ", "مَا اسْمُكِ؟", "مَعَ السَّلَامَةِ"]}
            correct={1}
          />
        </TabsContent>

        {/* GRAMMAR */}
        <TabsContent value="grammar" className="space-y-6">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold">{grammarRule.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{grammarRule.explanation}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {grammarRule.examples.map((ex, i) => (
                <div key={i} className="rounded-lg bg-muted/50 p-3">
                  <p className="arabic-text text-lg font-semibold" dir="rtl">{ex.ar}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{ex.en}</p>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-lg font-semibold">Exercises</h3>
          <MCQ
            question="Which pronoun means 'you' (feminine)?"
            options={["أَنَا", "أَنْتَ", "أَنْتِ", "هُوَ"]}
            correct={2}
          />
          <MCQ
            question="'أنا طَالِبٌ' means:"
            options={["You are a teacher", "I am a student (m)", "She is a student", "I am a teacher"]}
            correct={1}
          />
        </TabsContent>

        {/* SPEAKING */}
        <TabsContent value="speaking" className="space-y-6">
          <div className="rounded-xl border bg-card p-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
              <Volume2 className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">AI Speaking Practice</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Practice speaking with AI-powered voice recognition. Record your answers and get instant feedback.
            </p>
            <p className="mt-4 text-xs text-muted-foreground italic">
              Speaking practice requires a microphone and will be available when backend is connected.
            </p>
            <Button className="mt-4" disabled>
              Coming Soon
            </Button>
          </div>
        </TabsContent>

        {/* EXAM */}
        <TabsContent value="exam" className="space-y-6">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold">Lesson 1 Exam</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Test your knowledge from this lesson. Score shown at the end.
            </p>
          </div>
          <MCQ question="What does أَهْلًا mean?" options={["Goodbye", "Welcome", "Please", "Thank you"]} correct={1} />
          <MCQ question="How do you say 'Good morning'?" options={["مَسَاءَ الخَيْرِ", "صَبَاحَ الخَيْرِ", "شُكْرًا", "مَرْحَبًا"]} correct={1} />
          <MCQ question="أَنْتَ is used for:" options={["I", "You (male)", "You (female)", "He"]} correct={1} />
        </TabsContent>

        {/* HOMEWORK */}
        <TabsContent value="homework" className="space-y-6">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold">Homework</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Complete these exercises and submit for teacher review.
            </p>
          </div>
          <MCQ question="Translate: 'مَعَ السَّلَامَةِ'" options={["Hello", "Goodbye", "How are you?", "My name is"]} correct={1} />
          <MCQ question="Choose the correct pronoun: ___ طَالِبَةٌ (I am a female student)" options={["أَنْتَ", "أَنْتِ", "أَنَا", "هِيَ"]} correct={2} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
