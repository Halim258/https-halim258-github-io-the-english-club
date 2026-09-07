/**
 * Learning badge: a single, easy-to-read rank that shows how much a student
 * has learned so far. It blends lessons finished, XP earned and study time.
 */

export type LearningRank = {
  key: string;
  /** Short public name of the badge. */
  name: string;
  /** One line explaining what the badge means. */
  tagline: string;
  /** Points needed to reach this rank. */
  min: number;
  /** Tailwind classes for the badge medal (semantic tokens only). */
  medal: string;
};

export const LEARNING_RANKS: LearningRank[] = [
  { key: "starter", name: "New Learner", tagline: "Your journey has just begun.", min: 0, medal: "bg-muted text-muted-foreground border-border" },
  { key: "explorer", name: "Explorer", tagline: "Building a steady habit.", min: 60, medal: "bg-secondary text-secondary-foreground border-border" },
  { key: "builder", name: "Word Builder", tagline: "Real progress is showing.", min: 180, medal: "bg-primary/10 text-primary border-primary/30" },
  { key: "achiever", name: "Achiever", tagline: "Learning with real momentum.", min: 400, medal: "bg-primary/15 text-primary border-primary/40" },
  { key: "scholar", name: "Scholar", tagline: "Consistent, serious study.", min: 750, medal: "bg-primary/20 text-primary border-primary/50" },
  { key: "master", name: "Club Master", tagline: "Among our strongest learners.", min: 1300, medal: "bg-primary text-primary-foreground border-primary" },
];

export type LearningInput = {
  lessonsCompleted: number;
  totalXp: number;
  currentStreak: number;
  studyMinutes: number;
};

/** Weighted score behind the badge. */
export function learningPoints({ lessonsCompleted, totalXp, currentStreak, studyMinutes }: LearningInput) {
  return Math.round(
    lessonsCompleted * 12 +
      totalXp * 0.35 +
      currentStreak * 8 +
      studyMinutes * 0.6,
  );
}

export function rankForPoints(points: number) {
  let index = 0;
  for (let i = 0; i < LEARNING_RANKS.length; i++) {
    if (points >= LEARNING_RANKS[i].min) index = i;
  }
  const rank = LEARNING_RANKS[index];
  const next = LEARNING_RANKS[index + 1] ?? null;
  const span = next ? next.min - rank.min : 1;
  const progress = next ? Math.min(100, Math.round(((points - rank.min) / span) * 100)) : 100;
  const pointsToNext = next ? Math.max(0, next.min - points) : 0;
  return { rank, next, progress, pointsToNext, level: index + 1, totalLevels: LEARNING_RANKS.length };
}

export function learningRank(input: LearningInput) {
  const points = learningPoints(input);
  return { points, ...rankForPoints(points) };
}
