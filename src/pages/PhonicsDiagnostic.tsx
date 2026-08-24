import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Sparkles, Target, Volume2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInUp } from "@/components/AnimatedSection";

type Question = {
  stage: 1 | 2 | 3 | 4 | 5;
  skill: string;
  prompt: string;
  options: string[];
  answer: string;
  explain: string;
  say?: string;
};

const STAGES: Record<number, { code: string; title: string; from: number; to: number; blurb: string }> = {
  1: { code: "Stage 1", title: "Letter Sounds & Blending", from: 1, to: 5, blurb: "Start from the single letter sounds and learn to blend them into words." },
  2: { code: "Stage 2", title: "Blends & Digraphs", from: 6, to: 9, blurb: "You know the letter sounds — next come consonant blends and two-letter sounds." },
  3: { code: "Stage 3", title: "Long Vowels & Vowel Teams", from: 10, to: 13, blurb: "Blends are solid. Time for magic e and vowel teams." },
  4: { code: "Stage 4", title: "r-Controlled & Diphthongs", from: 14, to: 17, blurb: "Strong decoder. Focus on r-controlled vowels and diphthongs." },
  5: { code: "Stage 5", title: "Advanced Code & Fluency", from: 18, to: 20, blurb: "Excellent control of the code. Polish soft sounds, silent letters and syllables." },
};

// 3 questions per stage, ordered easiest → hardest
const QUESTIONS: Question[] = [
  // Stage 1
  { stage: 1, skill: "Letter sound", prompt: "Which letter makes the first sound in “sun”?", options: ["s", "c", "z", "f"], answer: "s", explain: "“Sun” begins with the /s/ sound, spelled with the letter s.", say: "sun" },
  { stage: 1, skill: "Blending", prompt: "Blend the sounds /p/ – /i/ – /n/. What is the word?", options: ["pin", "pan", "nip", "pen"], answer: "pin", explain: "/p/ + /i/ + /n/ blends into “pin”.", say: "pin" },
  { stage: 1, skill: "Short vowels", prompt: "Which word has the short /a/ sound?", options: ["cat", "cake", "car", "cave"], answer: "cat", explain: "“Cat” has a short a. The others use magic e or r-controlled a.", say: "cat" },
  // Stage 2
  { stage: 2, skill: "Beginning blends", prompt: "Which word starts with a consonant blend?", options: ["frog", "fog", "log", "dog"], answer: "frog", explain: "“Frog” starts with the blend fr — two sounds said together.", say: "frog" },
  { stage: 2, skill: "Digraphs", prompt: "Which two letters make one sound in “ship”?", options: ["sh", "hi", "ip", "sp"], answer: "sh", explain: "sh is a digraph: two letters, one sound /ʃ/.", say: "ship" },
  { stage: 2, skill: "Final blends", prompt: "Which word ends with the /ŋ/ sound spelled ng?", options: ["king", "kin", "kick", "knee"], answer: "king", explain: "“King” ends in ng, the single sound /ŋ/.", say: "king" },
  // Stage 3
  { stage: 3, skill: "Magic e", prompt: "Why does “cap” become “cape”?", options: ["The e makes a say its name", "The e is silent and changes nothing", "The p doubles", "The a becomes short"], answer: "The e makes a say its name", explain: "Magic e makes the vowel long: cap → cape.", say: "cape" },
  { stage: 3, skill: "Vowel teams", prompt: "Which word uses the same vowel sound as “rain”?", options: ["day", "ran", "rat", "run"], answer: "day", explain: "ai and ay both spell the long /eɪ/ sound.", say: "rain, day" },
  { stage: 3, skill: "Vowel teams", prompt: "Which spelling gives the long /oʊ/ sound in “boat”?", options: ["oa", "ou", "aw", "oi"], answer: "oa", explain: "oa spells long o, as in boat and coat.", say: "boat" },
  // Stage 4
  { stage: 4, skill: "r-controlled", prompt: "Which word has the same vowel sound as “bird”?", options: ["turn", "bar", "bore", "bead"], answer: "turn", explain: "ir and ur both make the /ɜːr/ sound: bird, turn.", say: "bird, turn" },
  { stage: 4, skill: "Diphthongs", prompt: "Which word contains the diphthong /ɔɪ/?", options: ["coin", "cone", "corn", "coon"], answer: "coin", explain: "oi/oy spell /ɔɪ/, as in coin and boy.", say: "coin" },
  { stage: 4, skill: "oo / aw", prompt: "Which word has the same sound as “saw”?", options: ["tall", "take", "tool", "tile"], answer: "tall", explain: "aw and al often share the /ɔː/ sound: saw, tall.", say: "saw, tall" },
  // Stage 5
  { stage: 5, skill: "Soft c / g", prompt: "In which word is c soft (/s/)?", options: ["city", "cat", "cup", "cot"], answer: "city", explain: "c is soft before e, i and y: city, cent, cycle.", say: "city" },
  { stage: 5, skill: "Silent letters", prompt: "Which letter is silent in “knight”?", options: ["k and gh", "n", "t", "i"], answer: "k and gh", explain: "kn spells /n/ and gh is silent: knight = /naɪt/.", say: "knight" },
  { stage: 5, skill: "Syllables & schwa", prompt: "How many syllables are in “important”, and where is the schwa?", options: ["3 — the first a", "2 — the o", "4 — the i", "3 — no schwa"], answer: "3 — the first a", explain: "im-por-tant has 3 syllables; the unstressed vowel reduces to schwa /ə/.", say: "important" },
];

function speak(text: string) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.85;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch {
    /* speech not supported */
  }
}

export default function PhonicsDiagnostic() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(() => QUESTIONS.map(() => null));
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[index];
  const total = QUESTIONS.length;
  const progress = Math.round(((done ? total : index) / total) * 100);

  const result = useMemo(() => {
    const perStage: Record<number, { correct: number; total: number }> = {};
    QUESTIONS.forEach((question, i) => {
      const s = question.stage;
      perStage[s] = perStage[s] ?? { correct: 0, total: 0 };
      perStage[s].total += 1;
      if (answers[i] === question.answer) perStage[s].correct += 1;
    });
    const correct = QUESTIONS.filter((question, i) => answers[i] === question.answer).length;
    // Placement: first stage where the learner scores below 2/3 — that's where to start.
    let stage: 1 | 2 | 3 | 4 | 5 = 5;
    for (const s of [1, 2, 3, 4, 5] as const) {
      if (perStage[s].correct < 2) {
        stage = s;
        break;
      }
    }
    return { perStage, correct, stage };
  }, [answers]);

  function choose(option: string) {
    if (picked) return;
    setPicked(option);
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = option;
      return next;
    });
    if (q.say) speak(q.say);
  }

  function next() {
    setPicked(null);
    if (index + 1 >= total) {
      setDone(true);
      try {
        localStorage.setItem(
          "phonics-diagnostic",
          JSON.stringify({ stage: result.stage, correct: result.correct, total, at: Date.now() })
        );
      } catch {
        /* storage unavailable */
      }
      return;
    }
    setIndex(index + 1);
  }

  function restart() {
    setAnswers(QUESTIONS.map(() => null));
    setIndex(0);
    setPicked(null);
    setDone(false);
  }

  if (done) {
    const placed = STAGES[result.stage];
    return (
      <div className="container mx-auto max-w-3xl px-4 py-10 md:py-16">
        <FadeInUp>
          <div className="rounded-3xl border bg-card p-6 md:p-10 shadow-card">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <Sparkles className="h-4 w-4" /> Your phonics placement
            </div>
            <h1 className="mt-3 font-display text-2xl md:text-3xl font-bold">
              Start at {placed.code} — {placed.title}
            </h1>
            <p className="mt-2 text-muted-foreground">{placed.blurb}</p>
            <p className="mt-4 text-sm font-semibold">
              Score: <span className="tabular-nums">{result.correct}/{total}</span> · Recommended lessons {placed.from}–{placed.to}
            </p>

            <div className="mt-6 grid gap-2">
              {([1, 2, 3, 4, 5] as const).map((s) => {
                const st = STAGES[s];
                const r = result.perStage[s];
                const pct = Math.round((r.correct / r.total) * 100);
                const isPlaced = s === result.stage;
                return (
                  <div
                    key={s}
                    className={`rounded-xl border p-3 ${isPlaced ? "border-primary/50 bg-primary/5" : "bg-muted/30"}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">
                        {st.code} · {st.title}
                      </p>
                      <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                        {r.correct}/{r.total}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${pct >= 67 ? "bg-emerald-500" : "bg-amber-500"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                className="rounded-full font-semibold"
                onClick={() => navigate(`/courses/phonics/${placed.from}`)}
              >
                Start at lesson {placed.from} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button variant="outline" className="rounded-full" asChild>
                <Link to="/courses/phonics">See all 20 lessons</Link>
              </Button>
              <Button variant="ghost" className="rounded-full" onClick={restart}>
                <RotateCcw className="mr-1 h-4 w-4" /> Retake
              </Button>
            </div>
          </div>
        </FadeInUp>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:py-14">
      <FadeInUp>
        <Link to="/courses/phonics" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Phonics course
        </Link>
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
          <Target className="h-4 w-4" /> Phonics diagnostic quiz
        </div>
        <h1 className="mt-2 font-display text-2xl md:text-3xl font-bold">Find your starting stage</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {total} short questions across the five stages of the phonics code. Answer honestly — you will be placed at the first stage that needs work.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-xs font-semibold tabular-nums text-muted-foreground">
            {index + 1}/{total}
          </span>
        </div>
      </FadeInUp>

      <motion.div
        key={index}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 rounded-3xl border bg-card p-5 md:p-8 shadow-soft"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            {STAGES[q.stage].code} · {q.skill}
          </span>
          {q.say && (
            <button
              type="button"
              onClick={() => speak(q.say!)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:text-primary"
              aria-label="Listen"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          )}
        </div>

        <h2 className="mt-4 font-display text-lg md:text-xl font-semibold leading-snug">{q.prompt}</h2>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {q.options.map((option) => {
            const isAnswer = option === q.answer;
            const isPicked = option === picked;
            const state = !picked
              ? "border-border hover:border-primary/50 hover:bg-primary/5"
              : isAnswer
              ? "border-emerald-500/60 bg-emerald-500/10"
              : isPicked
              ? "border-red-500/60 bg-red-500/10"
              : "border-border opacity-60";
            return (
              <button
                key={option}
                type="button"
                onClick={() => choose(option)}
                disabled={!!picked}
                className={`flex min-h-[48px] items-center justify-between gap-2 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${state}`}
              >
                <span>{option}</span>
                {picked && isAnswer && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />}
                {picked && isPicked && !isAnswer && <XCircle className="h-4 w-4 shrink-0 text-red-500" />}
              </button>
            );
          })}
        </div>

        {picked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 rounded-xl bg-muted/40 p-4">
            <p className="text-sm leading-relaxed text-muted-foreground">{q.explain}</p>
            <Button className="mt-4 rounded-full font-semibold" onClick={next}>
              {index + 1 >= total ? "See my placement" : "Next question"} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
