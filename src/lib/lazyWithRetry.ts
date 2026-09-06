import { lazy, type ComponentType } from "react";

const RELOAD_FLAG = "chunk_reload_at";

/**
 * Lazy-load a page, but survive stale/missing build chunks (happens right after
 * a new deploy while the old index bundle is still cached in the browser).
 * Retries once, then force-reloads the app a single time.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (err) {
      // one silent retry (transient network hiccup)
      try {
        return await factory();
      } catch {
        const last = Number(sessionStorage.getItem(RELOAD_FLAG) || 0);
        if (Date.now() - last > 20000) {
          sessionStorage.setItem(RELOAD_FLAG, String(Date.now()));
          window.location.reload();
          // keep Suspense pending while the page reloads
          return await new Promise<{ default: T }>(() => {});
        }
        throw err;
      }
    }
  });
}
