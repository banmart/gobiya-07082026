// Synthesizes the Facebook ad music bed as a 16-bit stereo WAV. Same
// rationale as scripts/generate-hero-music.mjs — we own it outright, no stock
// license or attribution — but pushed harder: 128 BPM, four-on-the-floor,
// 16th-note pluck arp, and a riser into the CTA, because this cut lands a
// hard edit roughly every two seconds and the hero bed is too patient for it.
//
//   node scripts/generate-fb-ad-music.mjs
//
// Writes public/fb-ad/audio/music.wav. Layers enter on section boundaries
// derived from remotion/facebook-ad/timing.json, so re-run this after
// regenerating narration if the caption frames move much.

import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const AUDIO_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../public/fb-ad/audio');
const WAV = resolve(AUDIO_DIR, 'music.wav');
const OUT = resolve(AUDIO_DIR, 'music.mp3');

const SR = 44100;
const DUR = 35; // narration is 34.0s; the tail covers the held end card
const BPM = 128;
const BEAT = 60 / BPM; // 0.46875s
const BAR = BEAT * 4; // 1.875s
const N = SR * DUR;

// Section starts in seconds, matched to the edit (see timing.json):
// brand reveal ≈ 11.8s, proof block ≈ 20.8s, CTA ≈ 29.2s.
const IN_PULSE = 3.0;
const IN_KICK = 6.5;
const IN_FULL = 11.8;
const IN_ARP = 20.8;
const RISER_START = 27.6;
const IN_CTA = 29.2;

const left = new Float64Array(N);
const right = new Float64Array(N);

const freq = (midi) => 440 * Math.pow(2, (midi - 69) / 12);
const NOTES = {
  D2: 38, F2: 41, Bb2: 46, C3: 48, D3: 50, F3: 53, G3: 55, A3: 57, Bb3: 58,
  C4: 60, D4: 62, E4: 64, F4: 65, A4: 69, D5: 74, F5: 77,
};

// Dm – Bb – F – C, one chord per bar (twice as fast as the hero bed) so the
// harmony moves with the cut rate instead of sitting under it.
const PROG = [
  { root: 'D2', tones: ['D3', 'F3', 'A3', 'D4'], arp: ['D4', 'F4', 'A4', 'D5'] },
  { root: 'Bb2', tones: ['Bb3', 'D4', 'F4'], arp: ['D4', 'F4', 'Bb3', 'F4'] },
  { root: 'F2', tones: ['F3', 'A3', 'C4'], arp: ['C4', 'F4', 'A4', 'F5'] },
  { root: 'C3', tones: ['C4', 'E4', 'G3'], arp: ['C4', 'E4', 'G3', 'E4'] },
];
const CHORD_LEN = BAR;

const clamp01 = (x) => Math.max(0, Math.min(1, x));
// ramp from 0→1 over `len` seconds starting at `at`
const ramp = (t, at, len) => clamp01((t - at) / len);

function masterEnv(t) {
  const fadeIn = clamp01(t / 0.8);
  const fadeOut = clamp01((DUR - t) / 1.8);
  // step up entering the proof block and again on the CTA
  const lift = 1 + 0.1 * ramp(t, IN_ARP, 1.5) + 0.12 * ramp(t, IN_CTA, 0.5);
  return fadeIn * fadeOut * lift;
}

// Sidechain duck against the four-on-the-floor: deeper than the hero bed's so
// the voiceover and the kick both stay clear of the pads.
function duck(t) {
  if (t < IN_KICK) return 1;
  const p = (t % BEAT) / BEAT;
  const depth = 0.34 * ramp(t, IN_KICK, 1.5);
  return 1 - depth * Math.exp(-p * 7);
}

// deterministic LCG so re-runs are byte-identical
let seed = 1337;
const rand = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296 - 0.5;
};

for (let i = 0; i < N; i++) {
  const t = i / SR;
  const master = masterEnv(t);
  if (master === 0) continue;

  const chord = PROG[Math.floor(t / CHORD_LEN) % PROG.length];
  const tInChord = t % CHORD_LEN;
  const d = duck(t);

  // --- pad: fast attack, sustained, detuned across the stereo field
  const padEnv = clamp01(tInChord / 0.25);
  let padL = 0;
  let padR = 0;
  for (let v = 0; v < chord.tones.length; v++) {
    const f = freq(NOTES[chord.tones[v]]);
    const shimmer = 1 + 0.0022 * Math.sin(2 * Math.PI * (0.13 + v * 0.06) * t);
    padL += Math.sin(2 * Math.PI * f * shimmer * t) * 0.5 + Math.sin(2 * Math.PI * 2 * f * shimmer * t) * 0.1;
    padR += Math.sin(2 * Math.PI * f * (2 - shimmer) * t) * 0.5 + Math.sin(2 * Math.PI * 2 * f * (2 - shimmer) * t) * 0.1;
  }
  const padGain = 0.075 * padEnv * d;
  padL *= padGain;
  padR *= padGain;

  // --- sub: gated 8th-note root
  let sub = 0;
  if (t >= IN_PULSE) {
    const eighth = BEAT / 2;
    const pIn8 = t % eighth;
    const env = Math.exp(-pIn8 * 11) * ramp(t, IN_PULSE, 1.2);
    const f = freq(NOTES[chord.root]);
    // a little second harmonic so it reads on phone speakers with no low end
    sub = (Math.sin(2 * Math.PI * f * t) * 0.8 + Math.sin(2 * Math.PI * 2 * f * t) * 0.2) * 0.2 * env;
  }

  // --- kick: four-on-the-floor
  let kick = 0;
  if (t >= IN_KICK) {
    const tk = t % BEAT;
    const pitch = 110 * Math.exp(-tk * 26) + 46;
    kick = Math.sin(2 * Math.PI * pitch * tk) * Math.exp(-tk * 14) * 0.42 * ramp(t, IN_KICK, 1.2);
  }

  // --- 16th-note pluck arp: the main energy layer over the proof block
  let arpL = 0;
  let arpR = 0;
  if (t >= IN_ARP) {
    const step = BEAT / 4;
    const idx = Math.floor((t % BAR) / step) % chord.arp.length;
    const tIn = t % step;
    const env = Math.exp(-tIn * 26) * ramp(t, IN_ARP, 1.0);
    const f = freq(NOTES[chord.arp[idx]]);
    const v = (Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(2 * Math.PI * 3 * f * t)) * 0.075 * env * d;
    // ping-pong the odd/even steps for width
    const pan = idx % 2 === 0 ? 0.65 : 0.35;
    arpL += v * pan;
    arpR += v * (1 - pan);
  }

  // --- riser into the CTA: noise sweep + rising sine
  let riser = 0;
  if (t >= RISER_START && t < IN_CTA) {
    const p = (t - RISER_START) / (IN_CTA - RISER_START);
    const f = 220 + 900 * p * p;
    riser = (Math.sin(2 * Math.PI * f * t) * 0.5 + rand() * 0.5) * 0.09 * p * p;
  }

  left[i] = (padL + sub + kick + arpL + riser) * master;
  right[i] = (padR + sub + kick + arpR + riser) * master;
}

// --- transient layer: hats on offbeats, clap on 2 & 4. Pre-rendered noise
// bursts so both ears get the identical (centered) source.
function noiseBurst(seconds, decay) {
  const len = Math.floor(SR * seconds);
  const buf = new Float64Array(len);
  for (let i = 0; i < len; i++) buf[i] = rand() * 2 * Math.exp(-i / (SR * decay));
  return buf;
}
const hat = noiseBurst(0.03, 0.005);
const clap = noiseBurst(0.12, 0.028);

const stamp = (buf, atT, gain) => {
  const start = Math.floor(atT * SR);
  for (let i = 0; i < buf.length && start + i < N; i++) {
    if (start + i < 0) continue;
    left[start + i] += buf[i] * gain;
    right[start + i] += buf[i] * gain;
  }
};

for (let t = IN_KICK + BEAT / 2; t < DUR - 1.8; t += BEAT / 2) {
  // full 16th feel only once the arp lands; offbeat 8ths before that
  const isOffbeat = Math.abs((t % BEAT) - BEAT / 2) < 1e-6;
  if (!isOffbeat && t < IN_ARP) continue;
  stamp(hat, t, 0.055 * masterEnv(t) * (isOffbeat ? 1 : 0.55));
}
for (let t = IN_FULL + BEAT; t < DUR - 1.8; t += BAR) {
  stamp(clap, t, 0.16 * masterEnv(t)); // beat 2
  stamp(clap, t + BEAT * 2, 0.16 * masterEnv(t)); // beat 4
}

// soft-clip + peak normalize to -6 dBFS headroom
let peak = 0;
for (let i = 0; i < N; i++) {
  left[i] = Math.tanh(left[i] * 1.25);
  right[i] = Math.tanh(right[i] * 1.25);
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
// Synthesize to WAV, then encode to the mp3 the composition actually loads —
// the intermediate is not kept, so public/ only ever holds the shipped file.
mkdirSync(AUDIO_DIR, { recursive: true });
writeFileSync(WAV, buf);
execFileSync('ffmpeg', ['-y', '-i', WAV, '-b:a', '192k', OUT], { stdio: ['ignore', 'ignore', 'pipe'] });
rmSync(WAV);
console.log(`Wrote ${OUT} (${DUR}s @ ${BPM} BPM)`);
