import { useEffect, useState } from "react";
import { Star, Flame, Trophy, XCircle, Sparkles } from "lucide-react";
import { isSoundEnabled, getSoundVolume } from "@/lib/ui-sounds";

/* Small synth feedback sound — no assets needed.
   Correct = rising major arpeggio, wrong = short descending buzz. */
export function playRewardSound(correct: boolean) {
  try {
    if (!isSoundEnabled()) return;
    const level = (getSoundVolume() / 100) * (correct ? 0.14 : 0.11);
    if (level <= 0) return;
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    if (ctx.state === "suspended") void ctx.resume();
    const notes = correct ? [523.25, 659.25, 783.99, 1046.5] : [349.23, 261.63, 196.0];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = correct ? "triangle" : "sawtooth";
      osc.frequency.value = freq;
      const start = ctx.currentTime + i * (correct ? 0.085 : 0.11);
      const dur = correct ? 0.24 : 0.2;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(level, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + dur + 0.02);
    });
    setTimeout(() => ctx.close(), 1200);
  } catch {
    /* audio not available — silent */
  }
}


export const XP_PER_CORRECT = 10;

/* Running XP + streak badge for the lesson header */
export function XPBadge({ xp, combo }: { xp: number; combo: number }) {
  const [bump, setBump] = useState(false);
  useEffect(() => {
    if (xp === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [xp]);

  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] font-sans text-primary transition-transform duration-300 ${
          bump ? "scale-110" : "scale-100"
        }`}
        aria-label={`${xp} experience points earned this lesson`}
      >
        <Star className="h-3 w-3 fill-current" />
        {xp}
      </div>
      {combo >= 2 && (
        <div className="flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2 py-1 text-[10px] font-bold font-sans text-accent animate-pulse">
          <Flame className="h-3 w-3" />
          {combo}
        </div>
      )}
    </div>
  );
}

const PRAISE = ["¡Excelente!", "Great job!", "Perfect!", "Brilliant!", "Nailed it!"];
const ENCOURAGE = ["Keep going!", "Almost there!", "Try the next one!", "Learning in progress!"];

/* Full-card celebratory / encouraging burst shown right after an answer */
export function AnswerReward({
  correct,
  combo,
  xp,
}: {
  correct: boolean;
  combo: number;
  xp: number;
}) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1600);
    return () => clearTimeout(t);
  }, []);

  const message = correct
    ? PRAISE[Math.floor(combo) % PRAISE.length]
    : ENCOURAGE[Math.floor(Math.random() * ENCOURAGE.length)];

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-live="polite"
    >
      {/* confetti-ish sparks */}
      {correct &&
        Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-accent animate-ping"
            style={{
              left: `${15 + i * 7}%`,
              top: `${25 + ((i * 13) % 50)}%`,
              animationDelay: `${i * 60}ms`,
              animationDuration: "1.1s",
            }}
          />
        ))}

      <div
        className={`flex flex-col items-center gap-2 rounded-2xl border px-6 py-4 shadow-lg backdrop-blur-sm transition-transform duration-500 ${
          visible ? "scale-100" : "scale-95"
        } ${
          correct
            ? "border-accent/40 bg-accent/15"
            : "border-destructive/30 bg-destructive/10"
        }`}
      >
        {correct ? (
          <Trophy className="h-7 w-7 text-accent" />
        ) : (
          <XCircle className="h-7 w-7 text-destructive" />
        )}
        <p
          className={`text-base font-bold font-display ${
            correct ? "text-accent" : "text-destructive"
          }`}
        >
          {message}
        </p>
        {correct ? (
          <p className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.16em] font-sans text-accent">
            <Sparkles className="h-3 w-3" /> +{xp} XP
            {combo >= 2 && <span className="ml-1">· {combo}x streak</span>}
          </p>
        ) : (
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] font-sans text-muted-foreground">
            No XP — streak reset
          </p>
        )}
      </div>
    </div>
  );
}