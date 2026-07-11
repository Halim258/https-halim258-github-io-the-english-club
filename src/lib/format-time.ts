/** Compact relative time formatter: "just now", "5m ago", "2h ago", "3d ago", "Jan 5". */
export function formatRelativeTime(input: string | number | Date | null | undefined): string {
  if (!input) return "";
  const d = typeof input === "string" || typeof input === "number" ? new Date(input) : input;
  const ms = Date.now() - d.getTime();
  if (Number.isNaN(ms)) return "";
  if (ms < 60_000) return "just now";
  const m = Math.floor(ms / 60_000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}