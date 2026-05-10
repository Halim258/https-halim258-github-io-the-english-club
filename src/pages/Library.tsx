import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Headphones, Newspaper, BookMarked, Search, Loader2, ExternalLink, Volume2, ChevronLeft, Star, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useTTS } from "@/hooks/useTTS";
import { useLibraryCollections, type LibItem, type LibRow } from "@/hooks/useLibraryCollections";

type Book = { id: number; title: string; authors: { name: string }[]; formats: Record<string, string>; download_count: number };
type Audiobook = { id: string; title: string; description: string; authors: { first_name: string; last_name: string }[]; url_librivox: string; url_zip_file: string; totaltime: string; language: string };
type Article = { id: number; title: string; url: string; image_url: string; news_site: string; summary: string; published_at: string };
type DictEntry = { word: string; phonetic?: string; phonetics: { text?: string; audio?: string }[]; meanings: { partOfSpeech: string; definitions: { definition: string; example?: string }[]; synonyms: string[] }[] };

const stripHtml = (s = "") => s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

export default function Library() {
  const [tab, setTab] = useState("books");
  const collections = useLibraryCollections();
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
          <TabsList className="grid grid-cols-3 sm:grid-cols-6 w-full mb-6 h-auto">
            <TabsTrigger value="books" className="flex flex-col gap-1 py-2.5"><BookOpen className="h-4 w-4" /><span className="text-xs">Books</span></TabsTrigger>
            <TabsTrigger value="audio" className="flex flex-col gap-1 py-2.5"><Headphones className="h-4 w-4" /><span className="text-xs">Audio</span></TabsTrigger>
            <TabsTrigger value="news" className="flex flex-col gap-1 py-2.5"><Newspaper className="h-4 w-4" /><span className="text-xs">News</span></TabsTrigger>
            <TabsTrigger value="dict" className="flex flex-col gap-1 py-2.5"><BookMarked className="h-4 w-4" /><span className="text-xs">Dictionary</span></TabsTrigger>
            <TabsTrigger value="favs" className="flex flex-col gap-1 py-2.5"><Star className="h-4 w-4" /><span className="text-xs">Favorites</span></TabsTrigger>
            <TabsTrigger value="hist" className="flex flex-col gap-1 py-2.5"><Clock className="h-4 w-4" /><span className="text-xs">Recent</span></TabsTrigger>
          </TabsList>

          <TabsContent value="books"><BooksTab collections={collections} /></TabsContent>
          <TabsContent value="audio"><AudiobooksTab collections={collections} /></TabsContent>
          <TabsContent value="news"><NewsTab collections={collections} /></TabsContent>
          <TabsContent value="dict"><DictionaryTab collections={collections} /></TabsContent>
          <TabsContent value="favs"><CollectionTab rows={collections.favorites} loading={collections.loading} emptyText="No favorites yet. Tap the ⭐ on any item to save it here." onRemove={(r) => collections.toggleFavorite(r)} /></TabsContent>
          <TabsContent value="hist"><CollectionTab rows={collections.history} loading={collections.loading} emptyText="Your recently opened items will appear here." onClear={collections.clearHistory} /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

type Coll = ReturnType<typeof useLibraryCollections>;

function FavBtn({ item, collections, className = "" }: { item: LibItem; collections: Coll; className?: string }) {
  const fav = collections.isFavorite(item.item_type, item.item_key);
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); collections.toggleFavorite(item); }}
      aria-label={fav ? "Remove favorite" : "Add to favorites"}
      className={`inline-flex items-center justify-center rounded-full p-1.5 transition-colors ${fav ? "text-amber-500" : "text-muted-foreground hover:text-amber-500"} ${className}`}
    >
      <Star className={`h-4 w-4 ${fav ? "fill-amber-400" : ""}`} />
    </button>
  );
}

function BooksTab({ collections }: { collections: Coll }) {
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
            const item: LibItem = {
              item_type: "book",
              item_key: String(b.id),
              title: b.title,
              subtitle: b.authors.map((a) => a.name).join(", ") || "Unknown",
              image_url: cover || null,
              url: read || null,
            };
            return (
              <Card key={b.id} className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                <div className="relative">
                  {cover ? (
                    <img src={cover} alt={b.title} loading="lazy" className="w-full aspect-[2/3] object-cover bg-muted" />
                  ) : <div className="w-full aspect-[2/3] bg-muted flex items-center justify-center"><BookOpen className="h-8 w-8 text-muted-foreground" /></div>}
                  <div className="absolute top-1.5 right-1.5 bg-background/85 backdrop-blur rounded-full">
                    <FavBtn item={item} collections={collections} />
                  </div>
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <h3 className="font-semibold text-sm line-clamp-2 mb-1">{b.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{b.authors.map((a) => a.name).join(", ") || "Unknown"}</p>
                  <Badge variant="secondary" className="text-[10px] w-fit mb-2">{b.download_count.toLocaleString()} downloads</Badge>
                  {read && (
                    <Button asChild size="sm" variant="outline" className="rounded-full mt-auto w-full">
                      <a href={read} target="_blank" rel="noreferrer" onClick={() => collections.recordView(item)}>Read <ExternalLink className="h-3 w-3 ml-1" /></a>
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

function AudiobooksTab({ collections }: { collections: Coll }) {
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
          {items.map((b) => {
            const item: LibItem = {
              item_type: "audiobook",
              item_key: String(b.id),
              title: b.title,
              subtitle: (b.authors || []).map((a) => `${a.first_name} ${a.last_name}`).join(", ") || "Various",
              url: b.url_librivox,
              metadata: { totaltime: b.totaltime, language: b.language },
            };
            return (
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
                <FavBtn item={item} collections={collections} />
              </div>
              <p className="text-xs text-muted-foreground line-clamp-3 mb-3">{stripHtml(b.description)}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-[10px]">⏱ {b.totaltime}</Badge>
                <Badge variant="outline" className="text-[10px]">{b.language}</Badge>
                <div className="flex-1" />
                <Button asChild size="sm" variant="outline" className="rounded-full">
                  <a href={b.url_librivox} target="_blank" rel="noreferrer" onClick={() => collections.recordView(item)}>Listen <ExternalLink className="h-3 w-3 ml-1" /></a>
                </Button>
              </div>
            </Card>
          ); })}
          {!items.length && <p className="text-sm text-muted-foreground col-span-full text-center py-8">No audiobooks found.</p>}
        </div>
      )}
      <p className="text-xs text-muted-foreground text-center mt-6">Powered by LibriVox — free public-domain audiobooks.</p>
    </div>
  );
}

function NewsTab({ collections }: { collections: Coll }) {
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
        {articles.map((a) => {
          const item: LibItem = {
            item_type: "article",
            item_key: String(a.id),
            title: a.title,
            subtitle: a.news_site,
            image_url: a.image_url || null,
            url: a.url,
            metadata: { summary: a.summary, published_at: a.published_at },
          };
          return (
            <motion.div key={a.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="relative">
              <a href={a.url} target="_blank" rel="noreferrer" onClick={() => collections.recordView(item)} className="block">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  {a.image_url && <img src={a.image_url} alt={a.title} loading="lazy" className="w-full h-40 object-cover bg-muted" />}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-[10px]">{a.news_site}</Badge>
                      <span className="text-[10px] text-muted-foreground">{new Date(a.published_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-semibold text-sm line-clamp-2 mb-1 pr-8">{a.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-3">{a.summary}</p>
                  </div>
                </Card>
              </a>
              <div className="absolute top-2 right-2 bg-background/85 backdrop-blur rounded-full">
                <FavBtn item={item} collections={collections} />
              </div>
            </motion.div>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-6">News feed via Spaceflight News API — free & open.</p>
    </div>
  );
}

function DictionaryTab({ collections }: { collections: Coll }) {
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
      .then((d) => {
        setData(d);
        const first = (d as DictEntry[])[0];
        if (first) {
          const meaning = first.meanings?.[0];
          collections.recordView({
            item_type: "word",
            item_key: first.word.toLowerCase(),
            title: first.word,
            subtitle: meaning?.definitions?.[0]?.definition?.slice(0, 120) || meaning?.partOfSpeech || "",
            metadata: { phonetic: first.phonetic },
          });
        }
      })
      .catch(() => { setData(null); setError(`No results for "${word}"`); })
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div className="ml-auto">
              <FavBtn
                item={{
                  item_type: "word",
                  item_key: entry.word.toLowerCase(),
                  title: entry.word,
                  subtitle: entry.meanings?.[0]?.definitions?.[0]?.definition?.slice(0, 120) || "",
                  metadata: { phonetic: entry.phonetic },
                }}
                collections={collections}
              />
            </div>
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

function CollectionTab({
  rows, loading, emptyText, onRemove, onClear,
}: {
  rows: LibRow[]; loading: boolean; emptyText: string;
  onRemove?: (r: LibRow) => void; onClear?: () => void;
}) {
  if (loading) return <Loading />;
  if (!rows.length) return <p className="text-sm text-muted-foreground text-center py-12">{emptyText}</p>;

  const typeLabel: Record<string, { icon: any; label: string }> = {
    book: { icon: BookOpen, label: "Book" },
    audiobook: { icon: Headphones, label: "Audiobook" },
    article: { icon: Newspaper, label: "Article" },
    word: { icon: BookMarked, label: "Word" },
  };

  return (
    <div>
      {onClear && (
        <div className="flex justify-end mb-3">
          <Button onClick={onClear} variant="ghost" size="sm" className="rounded-full text-muted-foreground">
            <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Clear history
          </Button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {rows.map((r) => {
          const t = typeLabel[r.item_type];
          const Icon = t.icon;
          const Wrapper: any = r.url ? "a" : "div";
          const wrapperProps = r.url ? { href: r.url, target: "_blank", rel: "noreferrer" } : {};
          return (
            <Card key={r.id} className="p-3 flex items-center gap-3 hover:shadow-md transition-shadow">
              {r.image_url ? (
                <img src={r.image_url} alt="" className="h-14 w-14 rounded-md object-cover bg-muted shrink-0" />
              ) : (
                <div className="h-14 w-14 rounded-md bg-gradient-to-br from-amber-100 to-rose-100 dark:from-amber-900/30 dark:to-rose-900/30 flex items-center justify-center shrink-0">
                  <Icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
              )}
              <Wrapper {...wrapperProps} className="flex-1 min-w-0 block">
                <Badge variant="secondary" className="text-[10px] mb-0.5">{t.label}</Badge>
                <h3 className="font-semibold text-sm line-clamp-1">{r.title}</h3>
                {r.subtitle && <p className="text-xs text-muted-foreground line-clamp-1">{r.subtitle}</p>}
              </Wrapper>
              {onRemove && (
                <button onClick={() => onRemove(r)} aria-label="Remove" className="text-muted-foreground hover:text-destructive p-1.5">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              {r.url && !onRemove && (
                <a href={r.url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary p-1.5" aria-label="Open">
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </Card>
          );
        })}
      </div>
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