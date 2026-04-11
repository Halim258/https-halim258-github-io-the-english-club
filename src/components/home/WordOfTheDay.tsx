import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Volume2, RefreshCw } from "lucide-react";
import { useTTS } from "@/hooks/useTTS";

const words = [
  { word: "Resilient", phonetic: "/rɪˈzɪl.i.ənt/", meaning: "Able to recover quickly from difficulties", example: "She's incredibly resilient and always bounces back.", level: "B2" },
  { word: "Eloquent", phonetic: "/ˈel.ə.kwənt/", meaning: "Fluent or persuasive in speaking or writing", example: "He gave an eloquent speech at the ceremony.", level: "C1" },
  { word: "Ambiguous", phonetic: "/æmˈbɪɡ.ju.əs/", meaning: "Open to more than one interpretation", example: "The ending of the movie was deliberately ambiguous.", level: "B2" },
  { word: "Serendipity", phonetic: "/ˌser.ənˈdɪp.ɪ.ti/", meaning: "The occurrence of happy events by chance", example: "Finding that bookshop was pure serendipity.", level: "C1" },
  { word: "Pragmatic", phonetic: "/præɡˈmæt.ɪk/", meaning: "Dealing with things in a practical way", example: "We need a more pragmatic approach to this problem.", level: "B2" },
  { word: "Quintessential", phonetic: "/ˌkwɪn.tɪˈsen.ʃəl/", meaning: "Representing the most perfect example", example: "She's the quintessential modern leader.", level: "C1" },
  { word: "Meticulous", phonetic: "/məˈtɪk.jə.ləs/", meaning: "Showing great attention to detail", example: "His meticulous planning ensured the event's success.", level: "B2" },
  { word: "Ephemeral", phonetic: "/ɪˈfem.ər.əl/", meaning: "Lasting for a very short time", example: "Social media fame is often ephemeral.", level: "C2" },
  { word: "Ubiquitous", phonetic: "/juːˈbɪk.wɪ.təs/", meaning: "Present, appearing, or found everywhere", example: "Smartphones have become ubiquitous in modern life.", level: "C1" },
  { word: "Perseverance", phonetic: "/ˌpɜː.sɪˈvɪə.rəns/", meaning: "Persistence in doing something despite difficulty", example: "Her perseverance paid off when she passed the exam.", level: "B2" },
  { word: "Inevitable", phonetic: "/ɪˈnev.ɪ.tə.bəl/", meaning: "Certain to happen; unavoidable", example: "Change is inevitable in any growing organization.", level: "B1" },
  { word: "Versatile", phonetic: "/ˈvɜː.sə.taɪl/", meaning: "Able to adapt or be adapted to many functions", example: "She's a versatile performer who excels in every genre.", level: "B2" },
  { word: "Gregarious", phonetic: "/ɡrɪˈɡeə.ri.əs/", meaning: "Fond of company; sociable", example: "His gregarious nature makes him popular at parties.", level: "C1" },
  { word: "Tenacious", phonetic: "/tɪˈneɪ.ʃəs/", meaning: "Tending to keep a firm hold of something", example: "She's a tenacious negotiator who never gives up.", level: "C1" },
];

export default function WordOfTheDay() {
  const dayIndex = Math.floor(Date.now() / 86400000) % words.length;
  const [currentIndex, setCurrentIndex] = useState(dayIndex);
  const word = words[currentIndex];
  const { speak } = useTTS();

  const shuffle = () => {
    let next = currentIndex;
    while (next === currentIndex) next = Math.floor(Math.random() * words.length);
    setCurrentIndex(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border bg-card p-6 shadow-soft"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold font-display flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          Word of the Day
        </h3>
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full px-2 py-0.5">
            {word.level}
          </span>
          <button onClick={shuffle} className="p-1.5 rounded-full hover:bg-muted/50 text-muted-foreground transition-colors" title="New word">
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-3 mb-3">
        <h4 className="text-2xl font-bold font-display">{word.word}</h4>
        <button
          onClick={() => speak(word.word)}
          className="p-1.5 rounded-full hover:bg-primary/10 text-primary transition-colors"
          title="Listen"
        >
          <Volume2 className="h-4 w-4" />
        </button>
      </div>
      <p className="text-xs text-muted-foreground font-mono mb-2">{word.phonetic}</p>
      <p className="text-sm mb-3">{word.meaning}</p>
      <div className="rounded-lg bg-muted/30 border px-3 py-2">
        <p className="text-xs italic text-muted-foreground">"{word.example}"</p>
      </div>
    </motion.div>
  );
}
