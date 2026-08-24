import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { playSound } from "@/lib/ui-sounds";

/**
 * Attaches subtle global interaction sounds (clicks + page transitions).
 * Mount once inside the router.
 */
const SoundProvider = () => {
  const location = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    const onPointerDown = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest(
        "button, a, [role='button'], [role='tab'], [role='menuitem'], [role='option'], input[type='checkbox'], input[type='radio'], label[for]"
      ) as HTMLElement | null;
      if (!el) return;
      if (el.hasAttribute("disabled") || el.getAttribute("aria-disabled") === "true") return;
      if (el.dataset.noSound !== undefined) return;
      playSound("click");
    };

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    playSound("navigate");
  }, [location.pathname]);

  return null;
};

export default SoundProvider;
