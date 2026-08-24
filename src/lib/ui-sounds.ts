/**
 * Lightweight synthetic UI sounds (Web Audio API — no audio files, no network).
 * Sounds are intentionally short and quiet so the site feels alive, not noisy.
 */

const STORAGE_KEY = "ui-sound-enabled";
const VOLUME_KEY = "ui-sound-volume";

let ctx: AudioContext | null = null;
let lastPlay = 0;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || (window as any).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) !== "off";
}

export function setSoundEnabled(enabled: boolean) {
  localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  window.dispatchEvent(new CustomEvent("ui-sound-change", { detail: enabled }));
  if (enabled) playSound("toggle");
}

/** Volume as a 0–100 integer. */
export function getSoundVolume(): number {
  if (typeof window === "undefined") return 70;
  const raw = Number(localStorage.getItem(VOLUME_KEY));
  if (!Number.isFinite(raw) || raw < 0 || raw > 100) return 70;
  return Math.round(raw);
}

export function setSoundVolume(volume: number) {
  const clamped = Math.max(0, Math.min(100, Math.round(volume)));
  localStorage.setItem(VOLUME_KEY, String(clamped));
  window.dispatchEvent(new CustomEvent("ui-volume-change", { detail: clamped }));
}


type Tone = { freq: number; start: number; dur: number; gain?: number; type?: OscillatorType };

const SOUNDS: Record<string, Tone[]> = {
  click: [{ freq: 620, start: 0, dur: 0.055, gain: 0.05, type: "triangle" }],
  hover: [{ freq: 880, start: 0, dur: 0.035, gain: 0.02, type: "sine" }],
  toggle: [
    { freq: 520, start: 0, dur: 0.06, gain: 0.045 },
    { freq: 780, start: 0.05, dur: 0.08, gain: 0.04 },
  ],
  navigate: [
    { freq: 440, start: 0, dur: 0.07, gain: 0.035, type: "sine" },
    { freq: 660, start: 0.06, dur: 0.09, gain: 0.03, type: "sine" },
  ],
  success: [
    { freq: 660, start: 0, dur: 0.09, gain: 0.06 },
    { freq: 880, start: 0.08, dur: 0.09, gain: 0.06 },
    { freq: 1180, start: 0.16, dur: 0.16, gain: 0.05 },
  ],
  error: [
    { freq: 300, start: 0, dur: 0.12, gain: 0.05, type: "sawtooth" },
    { freq: 200, start: 0.1, dur: 0.16, gain: 0.04, type: "sawtooth" },
  ],
  notify: [
    { freq: 990, start: 0, dur: 0.08, gain: 0.05 },
    { freq: 1320, start: 0.09, dur: 0.14, gain: 0.045 },
  ],
};

export type SoundName = keyof typeof SOUNDS;

export function playSound(name: SoundName | string) {
  if (!isSoundEnabled()) return;
  const tones = SOUNDS[name];
  if (!tones) return;

  // Throttle so rapid interactions don't stack into noise.
  const now = Date.now();
  if (now - lastPlay < 45) return;
  lastPlay = now;

  const audio = getCtx();
  if (!audio) return;

  tones.forEach((t) => {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = t.type || "triangle";
    osc.frequency.value = t.freq;
    const startAt = audio.currentTime + t.start;
    const peak = t.gain ?? 0.04;
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(peak, startAt + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + t.dur);
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(startAt);
    osc.stop(startAt + t.dur + 0.02);
  });
}
