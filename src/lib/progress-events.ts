import { useEffect } from "react";

export const LESSON_PROGRESS_EVENT = "lesson-progress-updated";
export const SLIDE_PROGRESS_EVENT = "slide-progress-updated";

export type LessonProgressDetail = {
  levelId: string;
  lessonNumber: number;
  completed: boolean;
  score?: number | null;
  xpEarned?: number;
};

export function emitLessonProgress(detail: LessonProgressDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(LESSON_PROGRESS_EVENT, { detail }));
}

export function emitSlideProgress(lessonKey: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(SLIDE_PROGRESS_EVENT, { detail: { lessonKey } }));
}

/**
 * Re-run `onChange` whenever ANY progress signal fires
 * (lesson completion or slide advance). Safe in effects — the
 * callback is not passed a dependency, so wrap it in useCallback
 * upstream if it captures changing state.
 */
export function useProgressEvents(onChange: () => void) {
  useEffect(() => {
    const handler = () => onChange();
    window.addEventListener(LESSON_PROGRESS_EVENT, handler);
    window.addEventListener(SLIDE_PROGRESS_EVENT, handler);
    return () => {
      window.removeEventListener(LESSON_PROGRESS_EVENT, handler);
      window.removeEventListener(SLIDE_PROGRESS_EVENT, handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}