// Web Audio API sound effects & music for kids games
// No external API needed — generates retro-style sounds in the browser

const audioCtx = () => {
  if (!(window as any).__gameAudioCtx) {
    (window as any).__gameAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return (window as any).__gameAudioCtx as AudioContext;
};

function playTone(freq: number, duration: number, type: OscillatorType = "square", volume = 0.15) {
  const ctx = audioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

function playNoise(duration: number, volume = 0.08) {
  const ctx = audioCtx();
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  source.connect(gain);
  gain.connect(ctx.destination);
  source.start();
}

// ─── Sound Effects ──────────────────────────────────────

export const sfx = {
  // General
  click: () => playTone(800, 0.08, "square", 0.1),
  correct: () => {
    playTone(523, 0.12, "square", 0.12);
    setTimeout(() => playTone(659, 0.12, "square", 0.12), 100);
    setTimeout(() => playTone(784, 0.2, "square", 0.12), 200);
  },
  wrong: () => {
    playTone(300, 0.15, "sawtooth", 0.1);
    setTimeout(() => playTone(250, 0.25, "sawtooth", 0.1), 120);
  },
  win: () => {
    const notes = [523, 659, 784, 1047];
    notes.forEach((n, i) => setTimeout(() => playTone(n, 0.2, "square", 0.12), i * 120));
  },
  lose: () => {
    const notes = [400, 350, 300, 200];
    notes.forEach((n, i) => setTimeout(() => playTone(n, 0.25, "sawtooth", 0.1), i * 150));
  },
  // Tic Tac Toe
  place: () => playTone(600, 0.1, "triangle", 0.12),
  // Space Duck
  flap: () => playTone(400, 0.06, "triangle", 0.1),
  score: () => {
    playTone(880, 0.08, "square", 0.1);
    setTimeout(() => playTone(1100, 0.12, "square", 0.1), 60);
  },
  crash: () => {
    playNoise(0.3, 0.15);
    playTone(150, 0.3, "sawtooth", 0.12);
  },
  // Mario Jump
  jump: () => {
    const ctx = audioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  },
  land: () => playTone(200, 0.05, "triangle", 0.08),
  // Chess
  move: () => {
    playTone(500, 0.06, "sine", 0.1);
    setTimeout(() => playTone(700, 0.08, "sine", 0.1), 50);
  },
  capture: () => {
    playTone(300, 0.08, "square", 0.12);
    playNoise(0.1, 0.06);
  },
  check: () => {
    playTone(880, 0.1, "square", 0.15);
    setTimeout(() => playTone(880, 0.1, "square", 0.15), 150);
  },
  // Match / Memory
  flip: () => playTone(500, 0.06, "sine", 0.08),
  match: () => {
    playTone(660, 0.1, "square", 0.1);
    setTimeout(() => playTone(880, 0.15, "square", 0.1), 80);
  },
};

// ─── Background Music (simple looping arpeggios) ────────

let bgMusicInterval: ReturnType<typeof setInterval> | null = null;
let bgMusicPlaying = false;

const musicPatterns: Record<string, { notes: number[]; tempo: number; type: OscillatorType }> = {
  spaceduck: { notes: [262, 330, 392, 330, 262, 196, 262, 330], tempo: 200, type: "triangle" },
  mario: { notes: [330, 392, 523, 392, 330, 262, 330, 392], tempo: 180, type: "square" },
  chess: { notes: [220, 262, 330, 262, 220, 196, 220, 262], tempo: 400, type: "sine" },
  tictactoe: { notes: [392, 440, 523, 440, 392, 330, 392, 440], tempo: 300, type: "triangle" },
};

export function startBgMusic(game: keyof typeof musicPatterns) {
  stopBgMusic();
  const pattern = musicPatterns[game];
  if (!pattern) return;
  
  let noteIdx = 0;
  bgMusicPlaying = true;
  
  bgMusicInterval = setInterval(() => {
    if (!bgMusicPlaying) return;
    playTone(pattern.notes[noteIdx % pattern.notes.length], pattern.tempo / 1000 * 0.8, pattern.type, 0.04);
    noteIdx++;
  }, pattern.tempo);
}

export function stopBgMusic() {
  bgMusicPlaying = false;
  if (bgMusicInterval) {
    clearInterval(bgMusicInterval);
    bgMusicInterval = null;
  }
}

export function isBgMusicPlaying() {
  return bgMusicPlaying;
}
