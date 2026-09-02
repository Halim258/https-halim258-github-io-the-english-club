import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll position on every route change so pages always open from the top.
 * - Uses `useLayoutEffect` to scroll before the browser paints, preventing a flash
 *   of the previous scroll position.
 * - Disables the browser's native scroll restoration so back/forward navigation
 *   also starts at the top.
 * - Still honors URL hash anchors when they point to an existing element.
 */
export default function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();

  // Disable native scroll restoration as soon as the app mounts.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Scroll before paint on every pathname change.
  useLayoutEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

