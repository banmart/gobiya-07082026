// Synthesizes the hero-intro music bed as a 16-bit stereo WAV. We own this
// outright (no stock license, no attribution) and it stays tempo-locked to
// the Remotion edit: 120 BPM, 44s, minor-key pad + gated sub pulse + ticks,
// mixed low so the voiceover always sits on top.
//
//   node scripts/generate-hero-music.mjs
//
// Writes public/hero-intro/audio/music.wav — re-run after tweaking layers.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../public/hero-intro/audio/music.wav');

const SR = 44100;
const DUR = 44; // seconds
const BPM = 120;
const BEAT = 60 / BPM; // 0.5s
const BAR = BEAT * 4; // 2s
const N = SR * DUR;

const left = new Float64Array(N);
const right = new Float64Array(N);

// note name → frequency
const freq = (midi) => 440 * Math.pow(2, (midi - 69) / 12);
const NOTES = { D2: 38, D3: 50, F3: 53, A3: 57, C4: 60, E4: 64, Bb2: 46, Bb3: 58, D4: 62, F4: 65, F2: 41, C3: 48, A4: 69, C2: 36, G3: 55, G4: 67 };

// One chord per 2 bars (4s), Dm9 – Bbmaj7 – Fmaj7 – Cadd9 cycle, hopeful minor.
const PROG = [
  { root: 'D2', tones: ['D3', 'F3', 'A3', 'E4'] },
  { root: 'Bb2', tones: ['Bb3', 'D4', 'F4', 'A4'] },
  { root: 'F2', tones: ['F3', 'A3', 'C4', 'E4'] },
  { root: 'C2', tones: ['C3', 'E4', 'G3', 'D4'] },
];
const CHORD_LEN = BAR * 2; // 4s

const clamp01 = (x) => Math.max(0, Math.min(1, x));

// master arc: fade in over 1.5s, gentle lift entering the stats section
// (~21s), fade to silence over the last 2.5s
function masterEnv(t) {
  const fadeIn = clamp01(t / 1.5);
  const fadeOut = clamp01((DUR - t) / 2.5);
  const lift = 1 + 0.12 * clamp01((t - 21) / 3);
  return fadeIn * fadeOut * lift;
}

// per-beat duck (sidechain feel): dips 25% at each beat start, recovers by half-beat
function duck(t) {
  const p = (t % BEAT) / BEAT;
  return 1 - 0.25 * Math.exp(-p * 9);
}

for (let i = 0; i < N; i++) {
  const t = i / SR;
  const master = masterEnv(t);
  if (master === 0) continue;

  const chordIdx = Math.floor(t / CHORD_LEN) % PROG.length;
  const chord = PROG[chordIdx];
  const tInChord = t % CHORD_LEN;
  // pad: soft attack per chord, sustained, slight shimmer detune between ears
  const padEnv = clamp01(tInChord / 0.9) * (1 - 0.15 * clamp01((tInChord - CHORD_LEN + 0.6) / 0.6));
  let padL = 0;
  let padR = 0;
  for (let v = 0; v < chord.tones.length; v++) {
    const f = freq(NOTES[chord.tones[v]]);
    const shimmer = 1 + 0.0015 * Math.sin(2 * Math.PI * (0.11 + v * 0.05) * t);
    // two low harmonics only — keeps it lowpassed/warm without a filter pass
    padL += Math.sin(2 * Math.PI * f * shimmer * t) * 0.5 + Math.sin(2 * Math.PI * 2 * f * shimmer * t) * 0.08;
    padR += Math.sin(2 * Math.PI * f * (2 - shimmer) * t) * 0.5 + Math.sin(2 * Math.PI * 2 * f * (2 - shimmer) * t) * 0.08;
  }
  const padGain = 0.085 * padEnv * duck(t);
  padL *= padGain;
  padR *= padGain;

  // sub pulse: gated 8th-note root, enters at 8s
  let sub = 0;
  if (t >= 8) {
    const eighth = BEAT / 2;
    const pIn8 = t % eighth;
    const subEnv = Math.exp(-pIn8 * 10) * clamp01((t - 8) / 2);
    sub = Math.sin(2 * Math.PI * freq(NOTES[chord.root]) * t) * 0.16 * subEnv;
  }

  // soft kick thump on beats 1 & 3 of each bar, enters at 16s
  let kick = 0;
  if (t >= 16) {
    const tInBar = t % BAR;
    const beatInBar = Math.floor(tInBar / BEAT);
    if (beatInBar === 0 || beatInBar === 2) {
      const tk = tInBar - beatInBar * BEAT;
      const pitch = 95 * Math.exp(-tk * 22) + 48;
      kick = Math.sin(2 * Math.PI * pitch * tk) * Math.exp(-tk * 16) * 0.30 * clamp01((t - 16) / 2);
    }
  }

  left[i] = (padL + sub + kick) * master;
  right[i] = (padR + sub + kick) * master;
}

// tick hats on offbeats from 16s: pre-generated decaying noise burst so the
// random source is identical in both ears (centered, unobtrusive)
const tickLen = Math.floor(SR * 0.02);
const tick = new Float64Array(tickLen);
let seed = 42;
const rand = () => {
  // deterministic LCG so re-runs are identical
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296 - 0.5;
};
let hp = 0;
for (let i = 0; i < tickLen; i++) {
  const n = rand();
  hp = 0.85 * hp + n - (i > 0 ? 0 : 0); // leaky highpass-ish accumulator
  tick[i] = (n - hp * 0.2) * Math.exp(-i / (SR * 0.004));
}
for (let beatT = 16 + BEAT / 2; beatT < DUR - 2.5; beatT += BEAT) {
  const start = Math.floor(beatT * SR);
  const g = 0.05 * masterEnv(beatT);
  for (let i = 0; i < tickLen && start + i < N; i++) {
    left[start + i] += tick[i] * g;
    right[start + i] += tick[i] * g;
  }
}

// soft-clip + peak normalize to -6 dBFS headroom
let peak = 0;
for (let i = 0; i < N; i++) {
  left[i] = Math.tanh(left[i] * 1.2);
  right[i] = Math.tanh(right[i] * 1.2);
  peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
}
const norm = peak > 0 ? 0.5 / peak : 1;

const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0);
buf.writeUInt32LE(36 + N * 4, 4);
buf.write('WAVE', 8);
buf.write('fmt ', 12);
buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20); // PCM
buf.writeUInt16LE(2, 22); // stereo
buf.writeUInt32LE(SR, 24);
buf.writeUInt32LE(SR * 4, 28);
buf.writeUInt16LE(4, 32);
buf.writeUInt16LE(16, 34);
buf.write('data', 36);
buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  buf.writeInt16LE(Math.round(left[i] * norm * 32767), 44 + i * 4);
  buf.writeInt16LE(Math.round(right[i] * norm * 32767), 46 + i * 4);
}
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, buf);
console.log(`Wrote ${OUT} (${(buf.length / 1e6).toFixed(1)} MB, ${DUR}s)`);
