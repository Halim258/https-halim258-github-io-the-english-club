import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Clock, Target, Timer } from "lucide-react";
import { formatRelativeTime } from "@/lib/format-time";
import { formatDuration } from "@/lib/study-time";

/**
 * Unified course progress component. Single source of truth for
 * dashboard rows, course cards, and the ContinueLearning banner.
 *
 * States derived from (completed, total):
 *   completed === total && total > 0  → "completed"
 *   completed > 0                     → "in-progress"
 *   otherwise                         → "not-started"
 */

export type CourseProgressData = {
  completed: number;
  total: number;
  /** Optional: last lesson number the student reached (for Resume). */
  lastLesson?: number;
  /** Optional ISO string: when they last studied. */
  lastAt?: string;
  /** Optional next lesson to resume (falls back to lastLesson). */
  nextLesson?: number;
  /** Optional: average exercise accuracy across scored lessons (0–100). */
  avgAccuracy?: number;
  /** Optional: total minutes the student has spent inside this course. */
  minutes?: number;
};

export type CourseProgressVariant = "card" | "row" | "banner";
export type CourseProgressAccent = "primary" | "amber";

type Props = {
  data: CourseProgressData;
  variant?: CourseProgressVariant;
  accent?: CourseProgressAccent;
  /** Show "Not started" placeholder when zero. Default false (hides). */
  showEmpty?: boolean;
  /** Optional short label like "A1", used on rows. */
  label?: string;
  className?: string;
};

const barGradient = (accent: CourseProgressAccent) =>
  accent === "amber"
    ? "bg-gradient-to-r from-amber-500 to-orange-500"
    : "bg-gradient-to-r from-primary to-accent";

function pct(d: CourseProgressData) {
  if (!d.total) return 0;
  return Math.min(100, Math.round((d.completed / d.total) * 100));
}

function state(d: CourseProgressData): "completed" | "in-progress" | "not-started" {
  if (d.total > 0 && d.completed >= d.total) return "completed";
  if (d.completed > 0 || d.lastLesson) return "in-progress";
  return "not-started";
}

function CompletedPill({ size = "xs" }: { size?: "xs" | "sm" }) {
  const cls = size === "sm" ? "text-xs px-2.5 py-0.5" : "text-[10px] px-2 py-0.5";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-emerald-500/15 font-bold text-emerald-700 dark:text-emerald-400 ${cls}`}>
      <CheckCircle2 className={size === "sm" ? "h-3 w-3" : "h-2.5 w-2.5"} /> Completed
    </span>
  );
}

function LastMeta({ d }: { d: CourseProgressData }) {
  if (!d.lastLesson || !d.lastAt) return null;
  return (
    <span className="inline-flex items-center gap-1 text-muted-foreground">
      <Clock className="h-2.5 w-2.5" />
      Last: L{d.lastLesson} · {formatRelativeTime(d.lastAt)}
    </span>
  );
}

function accuracyTone(v: number) {
  if (v >= 80) return "text-emerald-600 dark:text-emerald-400";
  if (v >= 50) return "text-amber-600 dark:text-amber-400";
  return "text-rose-600 dark:text-rose-400";
}

function MetricPills({ d, compact = false }: { d: CourseProgressData; compact?: boolean }) {
  const hasAcc = typeof d.avgAccuracy === "number" && d.avgAccuracy > 0;
  const hasTime = typeof d.minutes === "number" && d.minutes > 0;
  if (!hasAcc && !hasTime) return null;
  const cls = compact ? "text-[10px]" : "text-[11px]";
  return (
    <>
      {hasAcc && (
        <span className={`inline-flex items-center gap-1 font-semibold tabular-nums ${accuracyTone(d.avgAccuracy!)} ${cls}`}>
          <Target className="h-2.5 w-2.5" /> {d.avgAccuracy}% acc
        </span>
      )}
      {hasTime && (
        <span className={`inline-flex items-center gap-1 text-muted-foreground tabular-nums ${cls}`}>
          <Timer className="h-2.5 w-2.5" /> {formatDuration(d.minutes!)}
        </span>
      )}
    </>
  );
}

export default function CourseProgress({
  data,
  variant = "card",
  accent = "primary",
  showEmpty = false,
  label,
  className = "",
}: Props) {
  const s = state(data);
  const p = pct(data);
  const done = s === "completed";
  const barColor = done ? "bg-emerald-500" : barGradient(accent);
  const resumeLesson = data.nextLesson ?? data.lastLesson;

  if (s === "not-started" && !showEmpty) return null;

  // ─── Banner variant (ContinueLearning) ───────────────────────
  if (variant === "banner") {
    if (s === "not-started") {
      return (
        <div className={`text-[11px] text-muted-foreground ${className}`}>Ready when you are.</div>
      );
    }
    return (
      <div className={className}>
        <div className="mb-1.5 flex items-center justify-between text-[11px]">
          <span className="font-medium text-muted-foreground">Course progress</span>
          <span className="font-bold text-primary tabular-nums">
            {data.completed}/{data.total} · {p}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${p}%` }}
            transition={{ duration: 0.8 }}
            className={`h-full rounded-full ${barColor}`}
          />
        </div>
        {(data.avgAccuracy || data.minutes) && (
          <div className="mt-1.5 flex items-center gap-3">
            <MetricPills d={data} compact />
          </div>
        )}
      </div>
    );
  }

  // ─── Row variant (Dashboard level list) ──────────────────────
  if (variant === "row") {
    return (
      <div className={className}>
        <div className="flex items-center gap-3">
          {label && (
            <span className="text-xs font-bold font-display w-14 shrink-0 uppercase">{label}</span>
          )}
          <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${p}%` }}
              transition={{ duration: 0.8 }}
              className={`h-full rounded-full ${barColor}`}
            />
          </div>
          <span className="text-[11px] font-semibold w-16 text-right shrink-0 tabular-nums text-muted-foreground">
            {data.completed}/{data.total}
          </span>
        </div>
        <div className={`mt-1 ${label ? "ml-[3.75rem]" : ""} flex items-center gap-2 text-[10px] flex-wrap`}>
          {done ? (
            <CompletedPill />
          ) : s === "in-progress" ? (
            <span className="inline-flex items-center gap-1 text-primary font-semibold">
              <ArrowRight className="h-3 w-3" /> Resume Lesson {resumeLesson ?? data.completed + 1} · {p}%
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-muted-foreground">Not started</span>
          )}
          <LastMeta d={data} />
          <MetricPills d={data} compact />
        </div>
      </div>
    );
  }

  // ─── Card variant (default) ──────────────────────────────────
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex justify-between items-center text-[10px] font-medium">
        <span className="text-muted-foreground">
          {data.completed}/{data.total} lessons
        </span>
        {done ? (
          <CompletedPill />
        ) : s === "in-progress" ? (
          <span className="font-bold text-primary tabular-nums">{p}%</span>
        ) : (
          <span className="text-muted-foreground">Not started</span>
        )}
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${p}%` }}
        />
      </div>
      {s === "in-progress" && (data.lastLesson || resumeLesson) && (
        <p className="text-[10px] text-muted-foreground flex items-center gap-1">
          {data.lastAt ? (
            <>
              <Clock className="h-2.5 w-2.5" />
              Last: Lesson {data.lastLesson} · {formatRelativeTime(data.lastAt)}
            </>
          ) : (
            <>
              <ArrowRight className="h-2.5 w-2.5" />
              Resume Lesson {resumeLesson}
            </>
          )}
        </p>
      )}
      {(data.avgAccuracy || data.minutes) && (
        <div className="flex items-center gap-3 pt-0.5">
          <MetricPills d={data} compact />
        </div>
      )}
    </div>
  );
}