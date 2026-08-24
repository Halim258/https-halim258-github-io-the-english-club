/**
 * Remembers exactly where a student was inside a lesson: which tab
 * (vocabulary, grammar, reading, ...) and which card within that tab.
 * Stored per lesson key in localStorage so "Continue Learning" can
 * drop the student back on the exact card they left off on.
 */
export interface LessonPosition {
  tab: string;
  card: number;
  updatedAt: number;
}

const PREFIX = "lesson-position:";

export function getLessonPosition(lessonKey: string | null | undefined): LessonPosition | null {
  if (!lessonKey || typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PREFIX + lessonKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LessonPosition>;
    if (typeof parsed.tab !== "string" || typeof parsed.card !== "number") return null;
    return { tab: parsed.tab, card: parsed.card, updatedAt: parsed.updatedAt ?? 0 };
  } catch {
    return null;
  }
}

export function setLessonPosition(lessonKey: string | null | undefined, tab: string, card: number) {
  if (!lessonKey || typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      PREFIX + lessonKey,
      JSON.stringify({ tab, card, updatedAt: Date.now() } satisfies LessonPosition)
    );
    window.localStorage.setItem("lesson-position:last", lessonKey);
  } catch {
    /* ignore quota / privacy-mode errors */
  }
}

/** The lesson key the student most recently studied (if any). */
export function getLastLessonKey(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem("lesson-position:last");
  } catch {
    return null;
  }
}
