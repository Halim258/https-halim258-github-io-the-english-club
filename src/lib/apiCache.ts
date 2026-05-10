// Lightweight cache + request throttling layer for public Library APIs.
// Features:
//   - In-memory + sessionStorage persistence (survives tab navigation)
//   - TTL per entry
//   - In-flight request de-duplication (concurrent callers share one promise)
//   - Per-host minimum interval throttle to avoid rate-limit bursts
//   - Per-host max concurrency

type CacheEntry<T> = { value: T; expiresAt: number };

const memCache = new Map<string, CacheEntry<unknown>>();
const inflight = new Map<string, Promise<unknown>>();
const lastCallAt = new Map<string, number>(); // host -> last fetch timestamp
const activeCount = new Map<string, number>(); // host -> in-flight count

const STORAGE_PREFIX = "libcache:";

function readStorage<T>(key: string): CacheEntry<T> | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry<T>;
    if (parsed.expiresAt < Date.now()) {
      sessionStorage.removeItem(STORAGE_PREFIX + key);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeStorage<T>(key: string, entry: CacheEntry<T>) {
  try {
    sessionStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(entry));
  } catch {
    /* quota — ignore */
  }
}

function getHost(url: string): string {
  try { return new URL(url).host; } catch { return "unknown"; }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Per-host throttle config
const HOST_RULES: Record<string, { minIntervalMs: number; maxConcurrent: number }> = {
  "gutendex.com":              { minIntervalMs: 250, maxConcurrent: 2 },
  "librivox.org":              { minIntervalMs: 600, maxConcurrent: 1 },
  "api.allorigins.win":        { minIntervalMs: 600, maxConcurrent: 1 },
  "api.spaceflightnewsapi.net":{ minIntervalMs: 250, maxConcurrent: 2 },
  "api.dictionaryapi.dev":     { minIntervalMs: 200, maxConcurrent: 3 },
};
const DEFAULT_RULE = { minIntervalMs: 200, maxConcurrent: 3 };

async function acquire(host: string) {
  const rule = HOST_RULES[host] || DEFAULT_RULE;
  // wait while at concurrency cap
  while ((activeCount.get(host) || 0) >= rule.maxConcurrent) {
    await sleep(80);
  }
  // enforce min interval between starts
  const last = lastCallAt.get(host) || 0;
  const wait = last + rule.minIntervalMs - Date.now();
  if (wait > 0) await sleep(wait);
  lastCallAt.set(host, Date.now());
  activeCount.set(host, (activeCount.get(host) || 0) + 1);
}

function release(host: string) {
  activeCount.set(host, Math.max(0, (activeCount.get(host) || 1) - 1));
}

export type CachedFetchOptions = {
  ttlMs?: number;        // how long to cache (default 10 min)
  cacheKey?: string;     // override cache key (defaults to URL)
  forceRefresh?: boolean;
};

/**
 * Throttled, de-duplicated, cached JSON fetch.
 */
export async function cachedJson<T>(url: string, opts: CachedFetchOptions = {}): Promise<T> {
  const ttlMs = opts.ttlMs ?? 10 * 60 * 1000;
  const key = opts.cacheKey ?? url;

  if (!opts.forceRefresh) {
    const mem = memCache.get(key) as CacheEntry<T> | undefined;
    if (mem && mem.expiresAt > Date.now()) return mem.value;
    const stored = readStorage<T>(key);
    if (stored) {
      memCache.set(key, stored);
      return stored.value;
    }
  }

  const existing = inflight.get(key) as Promise<T> | undefined;
  if (existing) return existing;

  const host = getHost(url);
  const promise = (async () => {
    await acquire(host);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as T;
      const entry: CacheEntry<T> = { value: data, expiresAt: Date.now() + ttlMs };
      memCache.set(key, entry);
      writeStorage(key, entry);
      return data;
    } finally {
      release(host);
      inflight.delete(key);
    }
  })();
  inflight.set(key, promise);
  return promise;
}

export function clearLibraryCache() {
  memCache.clear();
  try {
    Object.keys(sessionStorage)
      .filter((k) => k.startsWith(STORAGE_PREFIX))
      .forEach((k) => sessionStorage.removeItem(k));
  } catch { /* ignore */ }
}