import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { BookOpen, Headphones, Newspaper, BookMarked, Search, Loader2, Volume2, ChevronLeft, Star, Clock, Trash2, Play, Pause, SkipBack, SkipForward, X, AlertTriangle, RefreshCw, ListMusic, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTTS } from "@/hooks/useTTS";
import { useLibraryCollections, type LibItem, type LibRow } from "@/hooks/useLibraryCollections";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { cachedJson } from "@/lib/apiCache";

type Book = { id: number; title: string; authors: { name: string }[]; formats: Record<string, string>; download_count: number };
type Section = { id: string; section_number: string; title: string; listen_url: string; playtime: string };
type Audiobook = { id: string; title: string; description: string; authors: { first_name: string; last_name: string }[]; url_librivox: string; url_zip_file: string; totaltime: string; language: string; sections?: Section[] };
type Article = { id: number; title: string; url: string; image_url: string; news_site: string; summary: string; published_at: string };
type DictEntry = { word: string; phonetic?: string; phonetics: { text?: string; audio?: string }[]; meanings: { partOfSpeech: string; definitions: { definition: string; example?: string }[]; synonyms: string[] }[] };

const stripHtml = (s = "") => s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const fmtTime = (s: number) => {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

/**
 * In-app reader: fetches the source content (book HTML or article text)
 * and renders it inside our site with our own styling — no external pages,
 * no iframes. Uses Jina's free reader proxy to bypass CORS.
 */
function InAppReader({ url, title, subtitle, onClose }: { url: string; title: string; subtitle?: string; onClose: () => void }) {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<number>(() => {
    const v = Number(localStorage.getItem("reader.fontSize"));
    return v >= 14 && v <= 28 ? v : 18;
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setText("");
    // r.jina.ai returns clean readable markdown/text for any URL — free, no key.
    const proxy = `https://r.jina.ai/${url}`;
    fetch(proxy, { headers: { Accept: "text/plain" } })
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.text(); })
      .then((t) => { if (!cancelled) { setText(t); setLoading(false); } })
      .catch((e) => { if (!cancelled) { setError(e.message || "Could not load content"); setLoading(false); } });
    document.body.style.overflow = "hidden";
    return () => { cancelled = true; document.body.style.overflow = ""; };
  }, [url]);

  useEffect(() => { localStorage.setItem("reader.fontSize", String(fontSize)); }, [fontSize]);

  // Strip Jina's leading metadata block and empty markdown image/link titles.
  const cleaned = text
    .replace(/^Title:.*\n(?:URL Source:.*\n)?(?:Published Time:.*\n)?(?:Markdown Content:\s*\n)?/i, "")
    .replace(/^#+\s*\[\]\([^)]*\)\s*/m, "")
    .trim();

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-background flex flex-col">
      <div className="flex items-center gap-2 border-b px-3 py-2 bg-card sticky top-0">
        <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold line-clamp-1">{title}</p>
          {subtitle && <p className="text-[11px] text-muted-foreground line-clamp-1">{subtitle}</p>}
        </div>
        <div className="hidden sm:flex items-center gap-1 mr-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setFontSize((s) => Math.max(14, s - 2))} aria-label="Smaller text">
            <span className="text-xs font-bold">A−</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setFontSize((s) => Math.min(28, s + 2))} aria-label="Larger text">
            <span className="text-sm font-bold">A+</span>
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <article className="container mx-auto max-w-3xl px-4 py-6 md:py-10">
          <header className="mb-6 pb-4 border-b">
            <h1 className="text-2xl md:text-3xl font-bold font-display leading-tight">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground mt-1.5">{subtitle}</p>}
          </header>
          {loading && (
            <div className="space-y-3">
              <div className="h-4 bg-muted/50 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-muted/50 rounded w-full animate-pulse" />
              <div className="h-4 bg-muted/50 rounded w-5/6 animate-pulse" />
              <div className="h-4 bg-muted/50 rounded w-2/3 animate-pulse" />
              <div className="h-4 bg-muted/50 rounded w-full animate-pulse" />
              <p className="text-center text-xs text-muted-foreground pt-4">Loading content…</p>
            </div>
          )}
          {error && !loading && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
              <p className="font-semibold text-destructive mb-1">Couldn't load this in-app.</p>
              <p className="text-muted-foreground">The source may be temporarily unavailable. Please go back and try another item.</p>
            </div>
          )}
          {!loading && !error && (
            <div
              className="leading-relaxed whitespace-pre-wrap font-serif text-foreground/90"
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.75 }}
            >
              {cleaned}
            </div>
          )}
        </article>
      </div>
    </div>,
    document.body
  );
}

type PlayerTrack = { bookId: string; bookTitle: string; author: string; sections: Section[]; index: number; resumeAt?: number; baseMetadata?: Record<string, any> };

export default function Library() {
  const [tab, setTab] = useState("books");
  const collections = useLibraryCollections();
  const [track, setTrack] = useState<PlayerTrack | null>(null);
  return (
    <div className="min-h-screen pb-32">
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
          <TabsContent value="audio"><AudiobooksTab collections={collections} onPlay={setTrack} currentBookId={track?.bookId} /></TabsContent>
          <TabsContent value="news"><NewsTab collections={collections} /></TabsContent>
          <TabsContent value="dict"><DictionaryTab collections={collections} /></TabsContent>
          <TabsContent value="favs"><CollectionTab rows={collections.favorites} loading={collections.loading} emptyText="No favorites yet. Tap the ⭐ on any item to save it here." onRemove={(r) => collections.toggleFavorite(r)} /></TabsContent>
          <TabsContent value="hist"><CollectionTab rows={collections.history} loading={collections.loading} emptyText="Your recently opened items will appear here." onClear={collections.clearHistory} /></TabsContent>
        </Tabs>
      </div>

      {track && <AudioPlayer track={track} setTrack={setTrack} />}
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
  const [reading, setReading] = useState<{ url: string; title: string; subtitle?: string } | null>(null);

  useEffect(() => {
    setLoading(true);
    const url = query
      ? `https://gutendex.com/books/?languages=en&search=${encodeURIComponent(query)}`
      : `https://gutendex.com/books/?languages=en&sort=popular`;
    // Books rarely change — cache 1 hour
    cachedJson<{ results: Book[] }>(url, { ttlMs: 60 * 60 * 1000 })
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
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="rounded-full mt-auto w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        collections.recordView(item);
                        setReading({ url: read, title: b.title, subtitle: b.authors.map((a) => a.name).join(", ") || "Unknown" });
                      }}
                    >
                      Read <BookOpen className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
      <p className="text-xs text-muted-foreground text-center mt-6">Powered by Project Gutenberg via Gutendex — public-domain books.</p>
      {reading && (
        <InAppReader url={reading.url} title={reading.title} subtitle={reading.subtitle} onClose={() => setReading(null)} />
      )}
    </div>
  );
}

function AudiobooksTab({ collections, onPlay, currentBookId }: { collections: Coll; onPlay: (t: PlayerTrack) => void; currentBookId?: string }) {
  const [items, setItems] = useState<Audiobook[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    const base = "https://librivox.org/api/feed/audiobooks/?format=json&limit=30&extended=1";
    const url = q ? `${base}&title=^${encodeURIComponent(q)}` : base;
    const cacheKey = `librivox:${url}`;
    const ttl = 60 * 60 * 1000; // 1h
    const tryFetch = async (): Promise<Audiobook[]> => {
      try {
        const d = await cachedJson<{ books: Audiobook[] }>(url, { ttlMs: ttl, cacheKey });
        return d.books || [];
      } catch {
        const proxied = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
        const d = await cachedJson<{ books: Audiobook[] }>(proxied, { ttlMs: ttl, cacheKey });
        return d.books || [];
      }
    };
    tryFetch()
      .then((b) => setItems(b))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [q]);

  const [search, setSearch] = useState("");
  const [reading, setReading] = useState<{ url: string; title: string; subtitle?: string } | null>(null);

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
            const author = (b.authors || []).map((a) => `${a.first_name} ${a.last_name}`).join(", ") || "Various";
            const sections = b.sections || [];
            const isPlaying = currentBookId === String(b.id);
            return (
            <Card key={b.id} className={`p-4 hover:shadow-lg transition-shadow ${isPlaying ? "ring-2 ring-primary" : ""}`}>
              <div className="flex items-start gap-3 mb-2">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shrink-0">
                  <Headphones className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm line-clamp-2">{b.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {author}
                  </p>
                </div>
                <FavBtn item={item} collections={collections} />
              </div>
              <p className="text-xs text-muted-foreground line-clamp-3 mb-3">{stripHtml(b.description)}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-[10px]">⏱ {b.totaltime}</Badge>
                <Badge variant="outline" className="text-[10px]">{b.language}</Badge>
                {sections.length > 0 && <Badge variant="outline" className="text-[10px]">{sections.length} chapters</Badge>}
                <div className="flex-1" />
                {sections.length > 0 ? (
                  <Button
                    size="sm"
                    className="rounded-full"
                    onClick={async () => {
                      collections.recordView(item);
                      let resumeIndex = 0;
                      let resumeAt = 0;
                      let baseMetadata: Record<string, any> = {};
                      if (user) {
                        const { data } = await supabase
                          .from("library_history")
                          .select("metadata")
                          .eq("user_id", user.id)
                          .eq("item_type", "audiobook")
                          .eq("item_key", String(b.id))
                          .maybeSingle();
                        const meta = ((data?.metadata as any) || {}) as Record<string, any>;
                        baseMetadata = meta;
                        const idx = Number(meta.resume_index);
                        const pos = Number(meta.resume_position);
                        if (Number.isFinite(idx) && idx >= 0 && idx < sections.length) resumeIndex = idx;
                        if (Number.isFinite(pos) && pos > 5) resumeAt = pos;
                      }
                      onPlay({ bookId: String(b.id), bookTitle: b.title, author, sections, index: resumeIndex, resumeAt, baseMetadata });
                    }}
                  >
                    <Play className="h-3.5 w-3.5 mr-1" /> {isPlaying ? "Playing" : "Play"}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => {
                      collections.recordView(item);
                      setReading({ url: b.url_librivox, title: b.title, subtitle: author });
                    }}
                  >
                    Open <BookOpen className="h-3 w-3 ml-1" />
                  </Button>
                )}
              </div>
            </Card>
          ); })}
          {!items.length && <p className="text-sm text-muted-foreground col-span-full text-center py-8">No audiobooks found.</p>}
        </div>
      )}
      <p className="text-xs text-muted-foreground text-center mt-6">Powered by LibriVox — free public-domain audiobooks.</p>
      {reading && (
        <InAppReader url={reading.url} title={reading.title} subtitle={reading.subtitle} onClose={() => setReading(null)} />
      )}
    </div>
  );
}

function AudioPlayer({ track, setTrack }: { track: PlayerTrack; setTrack: (t: PlayerTrack | null) => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { user } = useAuth();
  const [playing, setPlaying] = useState(true);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryAttempt, setRetryAttempt] = useState(0);
  const [retryNonce, setRetryNonce] = useState(0);
  const retryTimerRef = useRef<number | null>(null);
  const MAX_AUTO_RETRIES = 3;
  const SPEEDS = [0.75, 1, 1.25, 1.5] as const;
  const [rate, setRate] = useState<number>(() => {
    const saved = parseFloat(localStorage.getItem("librivox:rate") || "1");
    return SPEEDS.includes(saved as any) ? saved : 1;
  });
  const section = track.sections[track.index];
  const hasPrev = track.index > 0;
  const hasNext = track.index < track.sections.length - 1;
  const resumePendingRef = useRef<number>(track.resumeAt && track.index === (track as any).index ? track.resumeAt : 0);
  const lastSavedRef = useRef<number>(0);
  const baseMetaRef = useRef<Record<string, any>>(track.baseMetadata || {});

  const persistResume = async (chapterIndex: number, position: number) => {
    if (!user) return;
    const merged = { ...baseMetaRef.current, resume_index: chapterIndex, resume_position: Math.floor(position), total_sections: track.sections.length };
    baseMetaRef.current = merged;
    await supabase
      .from("library_history")
      .update({ metadata: merged, viewed_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .eq("item_type", "audiobook")
      .eq("item_key", track.bookId);
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    setLoading(true);
    setError(null);
    setCurrent(0);
    a.src = section.listen_url;
    a.playbackRate = rate;
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    return () => {
      if (retryTimerRef.current) {
        window.clearTimeout(retryTimerRef.current);
        retryTimerRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section.listen_url, retryNonce]);

  // When chapter changes via prev/next, set pending resume offset (0 unless this is the initial resumed chapter)
  useEffect(() => {
    resumePendingRef.current = track.resumeAt && track.index === (track.baseMetadata?.resume_index ?? track.index) ? track.resumeAt : 0;
    // After applying once, clear so subsequent chapter changes don't reseek
    // (handled in onLoadedMetadata)
  }, [track.index]);

  // Persist resume on unmount (player closed)
  useEffect(() => {
    return () => {
      const a = audioRef.current;
      if (!a) return;
      const pos = a.currentTime;
      if (pos > 5) {
        // fire-and-forget
        persistResume(track.index, pos);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset retry counter when chapter changes
  useEffect(() => {
    setRetryAttempt(0);
  }, [section.listen_url]);

  const scheduleAutoRetry = () => {
    if (retryTimerRef.current) window.clearTimeout(retryTimerRef.current);
    const attempt = retryAttempt + 1;
    setRetryAttempt(attempt);
    if (attempt > MAX_AUTO_RETRIES) return;
    const delay = Math.min(8000, 1000 * 2 ** (attempt - 1));
    retryTimerRef.current = window.setTimeout(() => {
      setRetryNonce((n) => n + 1);
    }, delay);
  };

  const handleError = () => {
    setLoading(false);
    setPlaying(false);
    const offline = typeof navigator !== "undefined" && navigator.onLine === false;
    setError(
      offline
        ? "You appear to be offline. Check your connection and try again."
        : "We couldn't load this audio chapter. The stream may be temporarily unavailable."
    );
    scheduleAutoRetry();
  };

  const manualRetry = () => {
    if (retryTimerRef.current) {
      window.clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
    setRetryAttempt(0);
    setError(null);
    setLoading(true);
    setRetryNonce((n) => n + 1);
  };

  // Apply rate changes to active audio element + persist preference
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate;
    localStorage.setItem("librivox:rate", String(rate));
  }, [rate]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (error) { manualRetry(); return; }
    if (a.paused) { a.play(); setPlaying(true); }
    else {
      a.pause();
      setPlaying(false);
      if (a.currentTime > 5) persistResume(track.index, a.currentTime);
    }
  };
  const seek = (v: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = v;
    setCurrent(v);
  };
  const next = () => hasNext && setTrack({ ...track, index: track.index + 1 });
  const prev = () => hasPrev && setTrack({ ...track, index: track.index - 1 });

  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur-md shadow-2xl pb-[env(safe-area-inset-bottom)]">
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => {
          const a = e.target as HTMLAudioElement;
          setCurrent(a.currentTime);
          const now = Date.now();
          if (now - lastSavedRef.current > 5000 && a.currentTime > 5 && !a.paused) {
            lastSavedRef.current = now;
            persistResume(track.index, a.currentTime);
          }
        }}
        onLoadedMetadata={(e) => {
          const a = e.target as HTMLAudioElement;
          setDuration(a.duration);
          setLoading(false);
          setError(null);
          setRetryAttempt(0);
          const seekTo = resumePendingRef.current;
          if (seekTo && seekTo < (a.duration || Infinity) - 2) {
            try { a.currentTime = seekTo; setCurrent(seekTo); } catch {}
          }
          resumePendingRef.current = 0;
        }}
        onError={handleError}
        onStalled={() => setLoading(true)}
        onEnded={async () => {
          if (hasNext) {
            // Save resume pointer to next chapter at position 0
            persistResume(track.index + 1, 0);
            next();
          } else {
            setPlaying(false);
            if (user) {
              await supabase
                .from("library_history")
                .update({ completed: true, completed_at: new Date().toISOString(), metadata: { ...baseMetaRef.current, resume_index: 0, resume_position: 0 } })
                .eq("user_id", user.id)
                .eq("item_type", "audiobook")
                .eq("item_key", track.bookId);
            }
          }
        }}
        onWaiting={() => setLoading(true)}
        onPlaying={() => { setLoading(false); setError(null); }}
        preload="metadata"
      />
      <div className="container mx-auto px-3 py-2.5 max-w-5xl">
        {error && (
          <div className="mb-2 flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span className="flex-1 line-clamp-2">{error}</span>
            {retryAttempt > 0 && retryAttempt <= MAX_AUTO_RETRIES && (
              <span className="text-[10px] opacity-80 tabular-nums shrink-0">
                Auto-retry {retryAttempt}/{MAX_AUTO_RETRIES}…
              </span>
            )}
            <Button onClick={manualRetry} size="sm" variant="outline" className="h-7 px-2 text-xs gap-1 shrink-0">
              <RefreshCw className="h-3 w-3" /> Retry
            </Button>
            {hasNext && (
              <Button onClick={next} size="sm" variant="ghost" className="h-7 px-2 text-xs shrink-0">
                Skip
              </Button>
            )}
          </div>
        )}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shrink-0">
            <Headphones className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold line-clamp-1">{track.bookTitle}</p>
            <p className="text-[10px] text-muted-foreground line-clamp-1">
              Ch {track.index + 1}/{track.sections.length} · {stripHtml(section.title)}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Button onClick={prev} disabled={!hasPrev} size="icon" variant="ghost" className="h-9 w-9 rounded-full" aria-label="Previous chapter">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button onClick={toggle} size="icon" className="h-10 w-10 rounded-full" aria-label={error ? "Retry" : playing ? "Pause" : "Play"}>
              {error ? <RefreshCw className="h-4 w-4" /> : loading ? <Loader2 className="h-4 w-4 animate-spin" /> : playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>
            <Button onClick={next} disabled={!hasNext} size="icon" variant="ghost" className="h-9 w-9 rounded-full" aria-label="Next chapter">
              <SkipForward className="h-4 w-4" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full" aria-label="Chapters" title="Chapters">
                  <ListMusic className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" side="top" className="w-72 p-0">
                <div className="px-3 py-2 border-b">
                  <p className="text-xs font-semibold">Chapters</p>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">{track.bookTitle}</p>
                </div>
                <div className="max-h-72 overflow-y-auto py-1">
                  {track.sections.map((s, i) => {
                    const active = i === track.index;
                    return (
                      <button
                        key={s.id || i}
                        onClick={() => {
                          if (i !== track.index) {
                            persistResume(i, 0);
                            setTrack({ ...track, index: i, resumeAt: 0 });
                          }
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-left text-xs hover:bg-muted transition-colors ${active ? "bg-muted/60 font-semibold text-primary" : ""}`}
                      >
                        <span className="tabular-nums w-6 shrink-0 text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                        <span className="flex-1 line-clamp-1">{stripHtml(s.title) || `Chapter ${i + 1}`}</span>
                        {s.playtime && <span className="text-[10px] text-muted-foreground tabular-nums shrink-0">{s.playtime}</span>}
                        {active && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>
            <Button
              onClick={() => {
                const i = SPEEDS.indexOf(rate as any);
                setRate(SPEEDS[(i + 1) % SPEEDS.length]);
              }}
              size="sm"
              variant="ghost"
              className="h-9 px-2 rounded-full text-xs font-semibold tabular-nums"
              aria-label="Playback speed"
              title="Playback speed"
            >
              {rate}x
            </Button>
            <Button onClick={() => setTrack(null)} size="icon" variant="ghost" className="h-9 w-9 rounded-full text-muted-foreground" aria-label="Close player">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] text-muted-foreground tabular-nums w-10 text-right">{fmtTime(current)}</span>
          <Slider
            value={[current]}
            min={0}
            max={duration || 1}
            step={1}
            onValueChange={(v) => seek(v[0])}
            className="flex-1"
          />
          <span className="text-[10px] text-muted-foreground tabular-nums w-10">{fmtTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

function NewsTab({ collections }: { collections: Coll }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [reading, setReading] = useState<{ url: string; title: string; subtitle?: string } | null>(null);

  useEffect(() => {
    setLoading(true);
    // News refreshes more often — cache 5 minutes
    cachedJson<{ results: Article[] }>(
      "https://api.spaceflightnewsapi.net/v4/articles/?limit=20",
      { ttlMs: 5 * 60 * 1000 }
    )
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
              <button
                type="button"
                onClick={() => { collections.recordView(item); setReading({ url: a.url, title: a.title, subtitle: a.news_site }); }}
                className="block text-left w-full"
              >
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
              </button>
              <div className="absolute top-2 right-2 bg-background/85 backdrop-blur rounded-full">
                <FavBtn item={item} collections={collections} />
              </div>
            </motion.div>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-6">News feed via Spaceflight News API — free & open.</p>
      {reading && (
        <InAppReader url={reading.url} title={reading.title} subtitle={reading.subtitle} onClose={() => setReading(null)} />
      )}
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
    // Dictionary entries are very stable — cache 24h
    cachedJson<DictEntry[]>(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`,
      { ttlMs: 24 * 60 * 60 * 1000 }
    )
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
  const [reading, setReading] = useState<{ url: string; title: string; subtitle?: string } | null>(null);

  if (loading) return <Loading />;
  if (!rows.length) return <p className="text-sm text-muted-foreground text-center py-12">{emptyText}</p>;

  const typeLabel: Record<string, { icon: any; label: string }> = {
    book: { icon: BookOpen, label: "Book" },
    audiobook: { icon: Headphones, label: "Audiobook" },
    article: { icon: Newspaper, label: "Article" },
    word: { icon: BookMarked, label: "Word" },
  };
  const openInApp = (r: LibRow) =>
    r.url && (r.item_type === "book" || r.item_type === "article" || r.item_type === "audiobook")
      ? () => setReading({ url: r.url!, title: r.title, subtitle: r.subtitle || undefined })
      : null;

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
          const inApp = openInApp(r);
          const Wrapper: any = inApp ? "button" : r.url ? "a" : "div";
          const wrapperProps: any = inApp
            ? { type: "button", onClick: inApp }
            : r.url ? { href: r.url, target: "_blank", rel: "noreferrer" } : {};
          return (
            <Card key={r.id} className="p-3 flex items-center gap-3 hover:shadow-md transition-shadow">
              {r.image_url ? (
                <img src={r.image_url} alt="" className="h-14 w-14 rounded-md object-cover bg-muted shrink-0" />
              ) : (
                <div className="h-14 w-14 rounded-md bg-gradient-to-br from-amber-100 to-rose-100 dark:from-amber-900/30 dark:to-rose-900/30 flex items-center justify-center shrink-0">
                  <Icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
              )}
              <Wrapper {...wrapperProps} className="flex-1 min-w-0 block text-left">
                <Badge variant="secondary" className="text-[10px] mb-0.5">{t.label}</Badge>
                <h3 className="font-semibold text-sm line-clamp-1">{r.title}</h3>
                {r.subtitle && <p className="text-xs text-muted-foreground line-clamp-1">{r.subtitle}</p>}
              </Wrapper>
              {onRemove && (
                <button onClick={() => onRemove(r)} aria-label="Remove" className="text-muted-foreground hover:text-destructive p-1.5">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              {r.url && !onRemove && inApp && (
                <button type="button" onClick={inApp} className="text-muted-foreground hover:text-primary p-1.5" aria-label="Open in app">
                  <BookOpen className="h-4 w-4" />
                </button>
              )}
            </Card>
          );
        })}
      </div>
      {reading && (
        <InAppReader url={reading.url} title={reading.title} subtitle={reading.subtitle} onClose={() => setReading(null)} />
      )}
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