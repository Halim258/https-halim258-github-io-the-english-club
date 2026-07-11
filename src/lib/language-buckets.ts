export type LanguageBucket = "MSA" | "Egyptian" | "Quran" | "English" | "Other";

// Auto-map by level_id prefix. Edit this list to retag courses.
const PREFIX_MAP: ReadonlyArray<[string, LanguageBucket]> = [
  ["ar-quran", "Quran"],
  ["quran", "Quran"],
  ["ar-draw", "MSA"],
  ["ar-mus", "MSA"],
  ["ar-msa", "MSA"],
  ["ar-th", "Egyptian"],
  ["ar-sp", "Egyptian"],
  ["ar-eg", "Egyptian"],
  ["egyptian", "Egyptian"],
  ["national", "Egyptian"],
  ["international", "Egyptian"],
];

const ENGLISH_RE = /^(a1|a2|b1|b2|c1|c2|conversation|business|kids|healthcare|reading)/;

export function bucketFor(levelId: string | null | undefined): LanguageBucket {
  if (!levelId) return "Other";
  const k = levelId.toLowerCase();
  for (const [p, b] of PREFIX_MAP) if (k.startsWith(p)) return b;
  if (ENGLISH_RE.test(k)) return "English";
  return "Other";
}

export const BUCKET_COLORS: Record<LanguageBucket, string> = {
  MSA: "bg-emerald-500",
  Egyptian: "bg-amber-500",
  Quran: "bg-violet-500",
  English: "bg-blue-500",
  Other: "bg-muted-foreground",
};