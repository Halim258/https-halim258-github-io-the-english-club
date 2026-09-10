export interface GroupLike {
  id: string;
  legacy_id?: number | null;
  level?: string | null;
  days?: string | null;
  start_time?: string | null;
  end_time?: string | null;
}

export function groupLabel(g?: GroupLike | null): string {
  if (!g) return "—";
  const parts: string[] = [];
  if (g.level) parts.push(g.level);
  if (g.days) parts.push(g.days);
  if (g.start_time) parts.push(g.start_time);
  const label = parts.join(" · ");
  const num = g.legacy_id ? `Group #${g.legacy_id}` : `Group ${g.id.slice(0, 4)}`;
  return label ? `${num} — ${label}` : num;
}

export function groupShortLabel(g?: GroupLike | null): string {
  if (!g) return "—";
  if (g.legacy_id) return `#${g.legacy_id}${g.level ? ` ${g.level}` : ""}`;
  return g.level || `Group ${g.id.slice(0, 4)}`;
}
