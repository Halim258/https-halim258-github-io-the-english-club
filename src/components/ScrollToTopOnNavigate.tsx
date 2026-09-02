import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll position on route change so every page starts at the top,
 * except when the URL carries a hash anchor (then scroll to that element).
 */
export default function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
