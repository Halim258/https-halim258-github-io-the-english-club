/**
 * Lightweight synthetic UI sounds (Web Audio API — no audio files, no network).
 *
 * Design goals: warm, soft, "premium" feel. Every sound goes through a shared
 * master chain (gentle low-pass + soft limiter + a short synthetic room reverb)
 * so tones never sound thin, harsh or clicky.
 */

const STORAGE_KEY = "ui-sound-enabled";
const VOLUME_KEY = "ui-sound-volume";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let dry: GainNode | null = null;
let wet: GainNode | null = null;
let lastPlay = 0;

/** Short, dense, quickly-decaying impulse response = small warm room. */
function buildImpulse(audio: AudioContext, seconds = 0.9, decay = 3.2): AudioBuffer {
  const length = Math.max(1, Math.floor(audio.sampleRate * seconds));
  const impulse = audio.createBuffer(2, length, audio.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      const t = i / length;
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay);
    }
  }
  return impulse;
}

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || (window as any).webkitAudioContext;
  if (!Ctor) return null;

  if (!ctx) {
    ctx = new Ctor();

    // ── master chain ────────────────────────────────────────────────
    master = ctx.createGain();
    master.gain.value = 0.9;

    // Tame any brittle top end.
    const tone = ctx.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.value = 5200;
    tone.Q.value = 0.4;

    // Remove inaudible rumble that muddies small speakers.
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 180;

    // Soft-knee limiter so stacked sounds never spike.
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -14;
    limiter.knee.value = 24;
    limiter.ratio.value = 6;
    limiter.attack.value = 0.003;
    limiter.release.value = 0.18;

    dry = ctx.createGain();
    dry.gain.value = 1;

    wet = ctx.createGain();
    wet.gain.value = 0.18;

    const reverb = ctx.createConvolver();
    try {
      reverb.buffer = buildImpulse(ctx);
      wet.connect(reverb);
      reverb.connect(limiter);
    } catch {
      // Convolver unsupported — dry path still works.
    }

    master.connect(dry);
    master.connect(wet);
    dry.connect(tone);
    tone.connect(hp);
    hp.connect(limiter);
    limiter.connect(ctx.destination);
  }

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

type Tone = {
  freq: number;
  start: number;
  dur: number;
  gain?: number;
  type?: OscillatorType;
  /** Adds a quiet octave-up partial for shimmer. */
  shimmer?: number;
  /** Pitch glide target in Hz. */
  glideTo?: number;
  /** Attack time in seconds (default derived from duration). */
  attack?: number;
};

/**
 * Sounds use soft sine/triangle partials, musical intervals and short
 * decays, so the interface feels alive rather than beepy.
 */
const SOUNDS: Record<string, Tone[]> = {
  // Felt more than heard: a soft muted tap.
  click: [
    { freq: 392, start: 0, dur: 0.09, gain: 0.05, type: "sine", attack: 0.004, shimmer: 0.25 },
  ],
  hover: [{ freq: 784, start: 0, dur: 0.05, gain: 0.018, type: "sine", attack: 0.006 }],
  toggle: [
    { freq: 523.25, start: 0, dur: 0.1, gain: 0.045, type: "sine", attack: 0.005 },
    { freq: 784, start: 0.055, dur: 0.16, gain: 0.038, type: "sine", shimmer: 0.3 },
  ],
  // Gentle two-note rise, like turning a page.
  navigate: [
    { freq: 440, start: 0, dur: 0.14, gain: 0.03, type: "sine", attack: 0.012 },
    { freq: 587.33, start: 0.07, dur: 0.22, gain: 0.028, type: "sine", shimmer: 0.35 },
  ],
  // Warm major arpeggio (C–E–G–C).
  success: [
    { freq: 523.25, start: 0, dur: 0.16, gain: 0.05, type: "sine" },
    { freq: 659.25, start: 0.09, dur: 0.18, gain: 0.048, type: "sine" },
    { freq: 783.99, start: 0.18, dur: 0.22, gain: 0.045, type: "sine", shimmer: 0.35 },
    { freq: 1046.5, start: 0.27, dur: 0.42, gain: 0.032, type: "sine", shimmer: 0.5 },
  ],
  // Polite descending minor third — no buzzy sawtooth.
  error: [
    { freq: 349.23, start: 0, dur: 0.18, gain: 0.045, type: "triangle", attack: 0.008 },
    { freq: 261.63, start: 0.11, dur: 0.3, gain: 0.04, type: "triangle", attack: 0.01 },
  ],
  // Bell-like notify with a soft octave shimmer.
  notify: [
    { freq: 880, start: 0, dur: 0.16, gain: 0.042, type: "sine", shimmer: 0.4 },
    { freq: 1174.66, start: 0.1, dur: 0.5, gain: 0.032, type: "sine", shimmer: 0.45 },
  ],
  // Rewards / XP: bright quick sparkle.
  reward: [
    { freq: 659.25, start: 0, dur: 0.12, gain: 0.04, type: "sine" },
    { freq: 987.77, start: 0.07, dur: 0.16, gain: 0.036, type: "sine", shimmer: 0.4 },
    { freq: 1318.5, start: 0.15, dur: 0.5, gain: 0.026, type: "sine", shimmer: 0.5 },
  ],
  // Sub-tap for opening panels/sheets.
  open: [{ freq: 220, start: 0, dur: 0.2, gain: 0.05, type: "sine", glideTo: 330, attack: 0.01 }],
  close: [{ freq: 330, start: 0, dur: 0.2, gain: 0.045, type: "sine", glideTo: 196, attack: 0.01 }],
};

export type SoundName = keyof typeof SOUNDS;

function voice(audio: AudioContext, out: AudioNode, t: Tone, level: number) {
  const osc = audio.createOscillator();
  const gain = audio.createGain();

  osc.type = t.type || "sine";
  const startAt = audio.currentTime + t.start + 0.005;
  osc.frequency.setValueAtTime(t.freq, startAt);
  if (t.glideTo) {
    osc.frequency.exponentialRampToValueAtTime(t.glideTo, startAt + t.dur * 0.8);
  }

  const peak = Math.max(0.0002, (t.gain ?? 0.04) * level);
  const attack = Math.min(t.attack ?? Math.max(0.01, t.dur * 0.15), t.dur * 0.5);

  // Smooth attack + long exponential tail = no clicks, natural decay.
  gain.gain.setValueAtTime(0.00008, startAt);
  gain.gain.linearRampToValueAtTime(peak, startAt + attack);
  gain.gain.exponentialRampToValueAtTime(0.00008, startAt + t.dur);

  osc.connect(gain);
  gain.connect(out);
  osc.start(startAt);
  osc.stop(startAt + t.dur + 0.05);

  if (t.shimmer) {
    const hi = audio.createOscillator();
    const hiGain = audio.createGain();
    hi.type = "sine";
    hi.frequency.setValueAtTime(t.freq * 2, startAt);
    const hiPeak = Math.max(0.0001, peak * t.shimmer);
    hiGain.gain.setValueAtTime(0.00008, startAt);
    hiGain.gain.linearRampToValueAtTime(hiPeak, startAt + attack * 0.8);
    hiGain.gain.exponentialRampToValueAtTime(0.00008, startAt + t.dur * 0.85);
    hi.connect(hiGain);
    hiGain.connect(out);
    hi.start(startAt);
    hi.stop(startAt + t.dur + 0.05);
  }
}

export function playSound(
  name: SoundName | string,
  opts: { force?: boolean; volume?: number } = {}
) {
  if (typeof window === "undefined") return;
  if (!isSoundEnabled() && !opts.force) return;

  // Respect users who ask for calmer interfaces.
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches && !opts.force) return;

  const tones = SOUNDS[name];
  if (!tones) return;

  const level = (opts.volume ?? getSoundVolume()) / 100;
  if (level <= 0) return;

  // Throttle so rapid interactions don't stack into noise.
  const now = Date.now();
  if (!opts.force && now - lastPlay < 60) return;
  lastPlay = now;

  const audio = getCtx();
  if (!audio || !master) return;

  tones.forEach((t) => voice(audio, master!, t, level));
}
