import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Mic, MicOff, RotateCcw, Volume2, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTTS } from "@/hooks/useTTS";

const PHRASES = [
  { text: "How are you doing today?", level: "A1", tip: "Focus on the 'oo' sound in 'doing'" },
  { text: "I would like to order a coffee, please.", level: "A1", tip: "Stress 'like' and 'coffee'" },
  { text: "Could you tell me where the nearest station is?", level: "A2", tip: "Link 'tell me' smoothly" },
  { text: "She's been working here since last year.", level: "A2", tip: "Pronounce 'been' as /bɪn/" },
  { text: "I'm looking forward to meeting you.", level: "B1", tip: "Don't pause between 'forward' and 'to'" },
  { text: "The weather has been unpredictable lately.", level: "B1", tip: "Stress the third syllable: un-pre-DICT-able" },
  { text: "If I had known earlier, I would have acted differently.", level: "B2", tip: "Reduce 'would have' to /wʊdəv/" },
  { text: "The consequences of climate change are becoming increasingly apparent.", level: "C1", tip: "Smooth rhythm on 'increasingly apparent'" },
  { text: "Notwithstanding the challenges, the project was completed successfully.", level: "C1", tip: "Keep 'notwithstanding' at natural pace" },
  { text: "The phenomenon has sparked considerable debate among scholars.", level: "C2", tip: "Stress 'phe-NOM-enon'" },
  { text: "What time does the bus leave?", level: "A1", tip: "Clear 'th' sound in 'the'" },
  { text: "I think we should reconsider our approach.", level: "B1", tip: "Stress 're-con-SID-er'" },
  { text: "He thoroughly enjoyed the performance.", level: "B2", tip: "'Thoroughly' = /ˈθʌrəli/" },
  { text: "Despite the overwhelming evidence, he remained skeptical.", level: "C1", tip: "Link 'remained skeptical' smoothly" },
  { text: "Can I have a glass of water?", level: "A1", tip: "American: 'wɑːtər', British: 'wɔːtə'" },
];

function similarity(a: string, b: string): number {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z\s]/g, "").trim().split(/\s+/);
  const wa = normalize(a);
  const wb = normalize(b);
  if (wb.length === 0) return 0;
  let matches = 0;
  wb.forEach((w) => { if (wa.includes(w)) matches++; });
  return Math.round((matches / wb.length) * 100);
}

export default function PronunciationChecker() {
  const { speak } = useTTS();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [history, setHistory] = useState<{ phrase: string; score: number }[]>([]);
  const recognitionRef = useRef<any>(null);

  const phrase = PHRASES[currentIdx];

  const startListening = useCallback(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser. Try Chrome.");
      return;
    }
    setTranscript("");
    setScore(null);
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      setTranscript(text);
      const s = similarity(text, phrase.text);
      setScore(s);
      setHistory((h) => [...h, { phrase: phrase.text, score: s }]);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, [phrase]);

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const nextPhrase = () => {
    setCurrentIdx((i) => (i + 1) % PHRASES.length);
    setTranscript("");
    setScore(null);
  };

  const avgScore = history.length > 0
    ? Math.round(history.reduce((s, h) => s + h.score, 0) / history.length)
    : 0;

  const getScoreColor = (s: number) =>
    s >= 80 ? "text-emerald-600" : s >= 50 ? "text-amber-600" : "text-red-500";

  const getScoreLabel = (s: number) =>
    s >= 90 ? "Excellent! 🌟" : s >= 75 ? "Great job! 👏" : s >= 50 ? "Good try! 💪" : "Keep practicing! 📖";

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-950/20 dark:via-background dark:to-fuchsia-950/20 py-12">
        <div className="container mx-auto px-4">
          <Link to="/courses" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Back to Courses
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">🎙️</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display">Pronunciation Checker</h1>
              <p className="text-muted-foreground mt-1">Read the phrase aloud — get instant feedback on accuracy</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 max-w-lg">
          {/* Stats bar */}
          {history.length > 0 && (
            <div className="flex items-center gap-4 mb-6 bg-muted/50 rounded-xl p-3">
              <div className="text-center flex-1">
                <p className="text-2xl font-bold">{history.length}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Attempts</p>
              </div>
              <div className="text-center flex-1">
                <p className={`text-2xl font-bold ${getScoreColor(avgScore)}`}>{avgScore}%</p>
                <p className="text-[10px] text-muted-foreground uppercase">Avg Score</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-2xl font-bold">{history.filter((h) => h.score >= 80).length}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Passed</p>
              </div>
            </div>
          )}

          {/* Phrase Card */}
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border-2 bg-card shadow-lg p-8 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Badge variant="outline">{phrase.level}</Badge>
              <Badge variant="secondary" className="text-[10px]">
                {currentIdx + 1}/{PHRASES.length}
              </Badge>
            </div>

            <h2 className="text-xl md:text-2xl font-bold font-display leading-relaxed mb-3">
              "{phrase.text}"
            </h2>

            <button
              onClick={() => speak(phrase.text)}
              className="mx-auto flex items-center gap-2 text-sm text-primary hover:underline mb-4"
            >
              <Volume2 className="h-4 w-4" /> Listen first
            </button>

            <div className="bg-muted/30 rounded-lg px-4 py-2 text-sm text-muted-foreground mb-6">
              💡 <strong>Tip:</strong> {phrase.tip}
            </div>

            {/* Mic button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={listening ? stopListening : startListening}
                className={`h-20 w-20 rounded-full flex items-center justify-center transition-all ${
                  listening
                    ? "bg-red-500 text-white animate-pulse scale-110"
                    : "bg-primary text-primary-foreground hover:scale-105"
                }`}
              >
                {listening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              {listening ? "🔴 Listening... speak now!" : "Tap the mic and read the phrase aloud"}
            </p>

            {/* Results */}
            <AnimatePresence>
              {score !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t pt-4"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {score >= 80 ? (
                      <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-400" />
                    )}
                    <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}%</span>
                  </div>
                  <p className="text-sm font-medium mb-2">{getScoreLabel(score)}</p>

                  <div className="mb-3">
                    <Progress value={score} className="h-2" />
                  </div>

                  <div className="bg-muted/30 rounded-lg p-3 text-left text-sm">
                    <p className="text-muted-foreground mb-1">You said:</p>
                    <p className="font-medium">"{transcript}"</p>
                  </div>

                  <div className="flex gap-3 justify-center mt-4">
                    <Button variant="outline" size="sm" className="rounded-full gap-1" onClick={() => { setScore(null); setTranscript(""); }}>
                      <RotateCcw className="h-3.5 w-3.5" /> Try Again
                    </Button>
                    <Button size="sm" className="rounded-full" onClick={nextPhrase}>
                      Next Phrase →
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Skip button */}
          {score === null && (
            <div className="text-center mt-4">
              <Button variant="ghost" size="sm" onClick={nextPhrase}>Skip →</Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
