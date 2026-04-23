import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Volume2, ChevronLeft, BookOpen, Loader2, ExternalLink, Languages, ListChecks } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { lessons } from "@/data/lessons";
import { useTTS } from "@/hooks/useTTS";
import type { VocabWord } from "@/data/lessons";

interface DictionaryWord extends VocabWord {
  level: string;
  lessonTitle: string;
}

interface ApiMeaning {
  partOfSpeech: string;
  definitions: { definition: string; example?: string; synonyms?: string[] }[];
  synonyms?: string[];
}

interface ApiDictionaryEntry {
  word: string;
  phonetic?: string;
  phonetics?: { text?: string; audio?: string }[];
  meanings?: ApiMeaning[];
  sourceUrls?: string[];
}

export default function Dictionary() {
  const [query, setQuery] = useState("");
  const [selectedWord, setSelectedWord] = useState("");
  const [apiEntry, setApiEntry] = useState<ApiDictionaryEntry | null>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const { speak } = useTTS();

  const allWords = useMemo(() => {
    const words: DictionaryWord[] = [];
    const seen = new Set<string>();
    Object.values(lessons).forEach((lesson) => {
      lesson.vocabulary.forEach((w) => {
        const key = w.word.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          words.push({ ...w, level: lesson.levelLabel, lessonTitle: lesson.title });
        }
      });
    });
    return words.sort((a, b) => a.word.localeCompare(b.word));
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return allWords.slice(0, 50);
    const q = query.toLowerCase();
    return allWords.filter(
      (w) =>
        w.word.toLowerCase().includes(q) ||
        w.meaning.toLowerCase().includes(q) ||
        w.arabic.toLowerCase().includes(q)
    );
  }, [query, allWords]);

  const selectedLocalWord = useMemo(
    () => allWords.find((w) => w.word.toLowerCase() === selectedWord.toLowerCase()),
    [allWords, selectedWord]
  );

  const audioUrl = useMemo(
    () => apiEntry?.phonetics?.find((p) => p.audio)?.audio || "",
    [apiEntry]
  );

  useEffect(() => {
    const word = query.trim().split(/\s+/)[0];
    if (!word || /[^a-zA-Z'-]/.test(word)) {
      setSelectedWord("");
      setApiEntry(null);
      setApiError("");
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setSelectedWord(word);
      setApiLoading(true);
      setApiError("");
      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("No enhanced entry found");
        const data = (await response.json()) as ApiDictionaryEntry[];
        setApiEntry(data[0] ?? null);
      } catch (error) {
        if (!controller.signal.aborted) {
          setApiEntry(null);
          setApiError(error instanceof Error ? error.message : "No enhanced entry found");
        }
      } finally {
        if (!controller.signal.aborted) setApiLoading(false);
      }
    }, 450);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query]);

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20 py-12">
        <div className="container mx-auto px-4">
          <Link to="/courses" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Back to Courses
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">📖</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display">Dictionary</h1>
              <p className="text-muted-foreground mt-1">Search {allWords.length} words across all courses</p>
            </div>
          </div>
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by English, meaning, or Arabic..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 text-base rounded-xl"
            />
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-sm text-muted-foreground mb-4">
            {query ? `${filtered.length} results` : `Showing first 50 of ${allWords.length} words`}
          </p>
          <ScrollArea className="h-[60vh]">
            <div className="grid gap-2">
              <AnimatePresence mode="popLayout">
                {filtered.map((w, i) => (
                  <motion.div
                    key={w.word}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: Math.min(i * 0.02, 0.5) }}
                    className="flex items-start gap-3 p-3 rounded-xl border bg-card hover:bg-muted/50 transition-colors cursor-pointer group"
                    onClick={() => speak(`${w.word}. ${w.meaning}`)}
                  >
                    <span className="text-2xl">{w.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold">{w.word}</span>
                        <span className="text-xs text-muted-foreground">({w.arabic})</span>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">{w.level}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{w.meaning}</p>
                      <p className="text-xs text-primary/70 mt-1 italic">"{w.example}"</p>
                    </div>
                    <Volume2 className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                  </motion.div>
                ))}
              </AnimatePresence>
              {filtered.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>No words found for "{query}"</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </section>
    </div>
  );
}
