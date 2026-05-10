import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Headphones, Newspaper, BookMarked, Search, Loader2, ExternalLink, Volume2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useTTS } from "@/hooks/useTTS";

type Book = { id: number; title: string; authors: { name: string }[]; formats: Record<string, string>; download_count: number };
type Audiobook = { id: string; title: string; description: string; authors: { first_name: string; last_name: string }[]; url_librivox: string; url_zip_file: string; totaltime: string; language: string };
type Article = { id: number; title: string; url: string; image_url: string; news_site: string; summary: string; published_at: string };
type DictEntry = { word: string; phonetic?: string; phonetics: { text?: string; audio?: string }[]; meanings: { partOfSpeech: string; definitions: { definition: string; example?: string }[]; synonyms: string[] }[] };

const stripHtml = (s = "") => s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

export default function Library() {
  const [tab, setTab] = useState("books");
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-amber-950/20 dark:via-background dark:to-rose-950/20 py-8">
        <div className="container mx-auto px-4">
          <Link to="/" className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">📚</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-display">Free English Library</h1>
              <p className="text-muted-foreground text-sm">Books, audiobooks, news & dictionary — all free, all in one place.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid grid-cols-4 w-full mb-6 h-auto">
            <TabsTrigger value="books" className="flex flex-col gap-1 py-2.5"><BookOpen className="h-4 w-4" /><span className="text-xs">Books</span></TabsTrigger>
            <TabsTrigger value="audio" className="flex flex-col gap-1 py-2.5"><Headphones className="h-4 w-4" /><span className="text-xs">Audiobooks</span></TabsTrigger>
            <TabsTrigger value="news" className="flex flex-col gap-1 py-2.5"><Newspaper className="h-4 w-4" /><span className="text-xs">News</span></TabsTrigger>
            <TabsTrigger value="dict" className="flex flex-col gap-1 py-2.5"><BookMarked className="h-4 w-4" /><span className="text-xs">Dictionary</span></TabsTrigger>
          </TabsList>

          <TabsContent value="books"><BooksTab /></TabsContent>
          <TabsContent value="audio"><AudiobooksTab /></TabsContent>
          <TabsContent value="news"><NewsTab /></TabsContent>
          <TabsContent value="dict"><DictionaryTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function BooksTab() {
  const [q, setQ] = useState("");
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = query
      ? `https://gutendex.com/books/?languages=en&search=${encodeURIComponent(query)}`
      : `https://gutendex.com/books/?languages=en&sort=popular`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => setBooks((d.results || []).slice(0, 24)))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div>
      <form
        onSubmit={(e) => { e.preventDefault(); setQuery(q.trim()); }}
        className="flex gap-2 mb-5"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search books, authors (e.g. Sherlock Holmes)" className="pl-9 rounded-full" />
        </div>
        <Button type="submit" className="rounded-full">Search</Button>
      </form>

      {loading ? <Loading /> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((b) => {
            const cover = b.formats["image/jpeg"];
            const read = b.formats["text/html"] || b.formats["text/html; charset=utf-8"] || b.formats["application/epub+zip"] || b.formats["text/plain; charset=utf-8"];
            return (
              <Card key={b.id} className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                {cover ? (
                  <img src={cover} alt={b.title} loading="lazy" className="w-full aspect-[2/3] object-cover bg-muted" />
                ) : <div className="w-full aspect-[2/3] bg-muted flex items-center justify-center"><BookOpen className="h-8 w-8 text-muted-foreground" /></div>}
                <div className="p-3 flex flex-col flex-1">
                  <h3 className="font-semibold text-sm line-clamp-2 mb-1">{b.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{b.authors.map((a) => a.name).join(", ") || "Unknown"}</p>
                  <Badge variant="secondary" className="text-[10px] w-fit mb-2">{b.download_count.toLocaleString()} downloads</Badge>
                  {read && (
                    <Button asChild size="sm" variant="outline" className="rounded-full mt-auto w-full">
                      <a href={read} target="_blank" rel="noreferrer">Read <ExternalLink className="h-3 w-3 ml-1" /></a>
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
      <p className="text-xs text-muted-foreground text-center mt-6">Powered by Project Gutenberg via Gutendex — public-domain books.</p>
    </div>
  );
}

function AudiobooksTab() {
  const [items, setItems] = useState<Audiobook[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    setLoading(true);
    const base = "https://librivox.org/api/feed/audiobooks/?format=json&limit=30&extended=1";
    const url = q ? `${base}&title=^${encodeURIComponent(q)}` : base;
    // LibriVox sometimes blocks CORS; use a fallback proxy if direct fails
    const tryFetch = async () => {
      try {
        const r = await fetch(url);
        if (!r.ok) throw new Error();
        const d = await r.json();
        return d.books || [];
      } catch {
        const r = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
        const d = await r.json();
        return d.books || [];
      }
    };
    tryFetch()
      .then((b) => setItems(b))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [q]);

  const [search, setSearch] = useState("");

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); setQ(search.trim()); }} className="flex gap-2 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search audiobooks by title…" className="pl-9 rounded-full" />
        </div>
        <Button type="submit" className="rounded-full">Search</Button>
      </form>

      {loading ? <Loading /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((b) => (
            <Card key={b.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3 mb-2">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shrink-0">
                  <Headphones className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm line-clamp-2">{b.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {(b.authors || []).map((a) => `${a.first_name} ${a.last_name}`).join(", ") || "Various"}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-3 mb-3">{stripHtml(b.description)}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-[10px]">⏱ {b.totaltime}</Badge>
                <Badge variant="outline" className="text-[10px]">{b.language}</Badge>
                <div className="flex-1" />
                <Button asChild size="sm" variant="outline" className="rounded-full">
                  <a href={b.url_librivox} target="_blank" rel="noreferrer">Listen <ExternalLink className="h-3 w-3 ml-1" /></a>
                </Button>
              </div>
            </Card>
          ))}
          {!items.length && <p className="text-sm text-muted-foreground col-span-full text-center py-8">No audiobooks found.</p>}
        </div>
      )}
      <p className="text-xs text-muted-foreground text-center mt-6">Powered by LibriVox — free public-domain audiobooks.</p>
    </div>
  );
}

function NewsTab() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=20")
      .then((r) => r.json())
      .then((d) => setArticles(d.results || []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">Read real English news to practice. Tap an article to open.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((a) => (
          <motion.a
            key={a.id}
            href={a.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="block"
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
              {a.image_url && <img src={a.image_url} alt={a.title} loading="lazy" className="w-full h-40 object-cover bg-muted" />}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-[10px]">{a.news_site}</Badge>
                  <span className="text-[10px] text-muted-foreground">{new Date(a.published_at).toLocaleDateString()}</span>
                </div>
                <h3 className="font-semibold text-sm line-clamp-2 mb-1">{a.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-3">{a.summary}</p>
              </div>
            </Card>
          </motion.a>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-6">News feed via Spaceflight News API — free & open.</p>
    </div>
  );
}

function DictionaryTab() {
  const { speak } = useTTS();
  const [word, setWord] = useState("serendipity");
  const [input, setInput] = useState("serendipity");
  const [data, setData] = useState<DictEntry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!word) return;
    setLoading(true);
    setError(null);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)
      .then((r) => r.ok ? r.json() : Promise.reject("Word not found"))
      .then((d) => setData(d))
      .catch(() => { setData(null); setError(`No results for "${word}"`); })
      .finally(() => setLoading(false));
  }, [word]);

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); setWord(input.trim().toLowerCase()); }} className="flex gap-2 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a word…" className="pl-9 rounded-full" />
        </div>
        <Button type="submit" className="rounded-full">Look up</Button>
      </form>

      {loading && <Loading />}
      {error && <p className="text-sm text-muted-foreground text-center py-6">{error}</p>}
      {data && data.map((entry, i) => (
        <Card key={i} className="p-5 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-2xl font-bold font-display">{entry.word}</h2>
            <button onClick={() => speak(entry.word)} className="text-muted-foreground hover:text-primary">
              <Volume2 className="h-5 w-5" />
            </button>
            {entry.phonetic && <span className="text-sm text-muted-foreground">{entry.phonetic}</span>}
          </div>
          {entry.meanings.map((m, j) => (
            <div key={j} className="mb-3">
              <Badge variant="outline" className="mb-2 italic">{m.partOfSpeech}</Badge>
              <ol className="list-decimal pl-5 space-y-1.5 text-sm">
                {m.definitions.slice(0, 4).map((d, k) => (
                  <li key={k}>
                    {d.definition}
                    {d.example && <p className="text-xs text-muted-foreground italic mt-0.5">"{d.example}"</p>}
                  </li>
                ))}
              </ol>
              {m.synonyms?.length > 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="font-semibold">Synonyms:</span> {m.synonyms.slice(0, 6).join(", ")}
                </p>
              )}
            </div>
          ))}
        </Card>
      ))}
      <p className="text-xs text-muted-foreground text-center mt-6">Powered by Free Dictionary API.</p>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex items-center justify-center py-16">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  );
}