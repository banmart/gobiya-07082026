// Generates the Facebook ad voiceover with the ElevenLabs API, one line per
// request so the edit can be frame-locked to real measured durations instead
// of guessing at silencedetect boundaries.
//
//   ELEVENLABS_API_KEY=sk_... node scripts/generate-fb-ad-narration.mjs
//
// Writes:
//   .cache/fb-ad-lines/NN.mp3         per-line stems (kept for re-timing)
//   public/fb-ad/audio/narration.mp3  padded, concatenated master
//   remotion/facebook-ad/timing.json  frame in/out per line at 30fps
//
// previous_text / next_text are passed so ElevenLabs carries prosody across
// the line boundaries — without them each line lands as its own flat sentence.

import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const AUDIO_DIR = join(ROOT, 'public/fb-ad/audio');
// Stems live outside public/ — only narration.mp3 and music.mp3 are read at
// render time, and shipping a dozen unused mp3s in the Next bundle is waste.
const LINES_DIR = join(ROOT, '.cache/fb-ad-lines');
const TIMING_OUT = join(ROOT, 'remotion/facebook-ad/timing.json');

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error('Missing ELEVENLABS_API_KEY');
  process.exit(1);
}

// Brian — deep, measured American read. Enough authority to carry "premium"
// without the hard-sell announcer tone the brand voice avoids.
const VOICE_ID = 'nPczCjzI2devNBz1zQrb';
const MODEL_ID = 'eleven_multilingual_v2';
const FPS = 30;

// `say` is what ElevenLabs speaks; `caption` is what burns on screen. They
// differ where numerals read wrong out loud ("A.I." vs "AI", spelled-out
// figures) — the on-screen copy stays in the site's own formatting.
// `gap` is the silence appended after the line, in seconds.
const SCRIPT = [
  { say: "Right now, someone's asking A.I. who to hire.", caption: "Right now, someone's asking AI who to hire.", gap: 0.28 },
  { say: "If your business isn't the answer, you're invisible.", caption: "If your business isn't the answer, you're invisible.", gap: 0.42 },
  { say: 'Google, ChatGPT, Perplexity — they answer before anyone clicks.', caption: 'Google, ChatGPT, Perplexity — they answer before anyone clicks.', gap: 0.4 },
  { say: 'Gobiya makes you the answer.', caption: 'Gobiya makes you the answer.', gap: 0.34 },
  { say: 'Websites built to convert.', caption: 'Websites built to convert.', gap: 0.14 },
  { say: 'S.E.O. that earns the top spot.', caption: 'SEO that earns the top spot.', gap: 0.14 },
  { say: 'A.I. visibility that gets you cited.', caption: 'AI visibility that gets you cited.', gap: 0.4 },
  { say: 'Impressions, up thirty-four percent.', caption: '310,962 impressions. Up 34%.', gap: 0.2 },
  { say: 'A.I. citations, up one hundred forty-two percent.', caption: '4,850 AI citations. Up 142%.', gap: 0.4 },
  { say: 'One accountable team in Los Angeles.', caption: 'One accountable team in Los Angeles.', gap: 0.26 },
  { say: 'Get your free A.I. visibility audit.', caption: 'Get your free AI visibility audit.', gap: 0.22 },
  { say: 'Gobiya. Be seen first.', caption: 'Gobiya. Be seen first.', gap: 0.9 },
];

// Low stability + high style pushes the read energetic and varied; the ad has
// hard cuts every ~2s and a flat monotone read fights that pacing.
const VOICE_SETTINGS = {
  stability: 0.34,
  similarity_boost: 0.8,
  style: 0.45,
  use_speaker_boost: true,
};

const durationOf = (file) =>
  parseFloat(
    execFileSync('ffprobe', [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1',
      file,
    ]).toString().trim()
  );

async function tts(line, index, prev, next) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'xi-api-key': API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: line.say,
      model_id: MODEL_ID,
      voice_settings: VOICE_SETTINGS,
      previous_text: prev,
      next_text: next,
    }),
  });
  if (!res.ok) {
    throw new Error(`line ${index}: ${res.status} ${await res.text()}`);
  }
  const file = join(LINES_DIR, `${String(index).padStart(2, '0')}.mp3`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  return file;
}

async function main() {
  if (existsSync(LINES_DIR)) rmSync(LINES_DIR, { recursive: true });
  mkdirSync(LINES_DIR, { recursive: true });

  const stems = [];
  for (let i = 0; i < SCRIPT.length; i++) {
    const file = await tts(SCRIPT[i], i, SCRIPT[i - 1]?.say, SCRIPT[i + 1]?.say);
    const seconds = durationOf(file);
    stems.push({ file, seconds, ...SCRIPT[i] });
    console.log(`  ${String(i).padStart(2, '0')}  ${seconds.toFixed(2)}s  ${SCRIPT[i].say}`);
  }

  // Concat each stem followed by its gap of digital silence. Building the
  // filtergraph by hand (rather than the concat demuxer) keeps the gaps exact.
  const inputs = stems.flatMap((s) => ['-i', s.file]);
  const parts = stems
    .map((s, i) => `[${i}:a]apad=pad_dur=${s.gap}[a${i}]`)
    .join(';');
  const chain = stems.map((_, i) => `[a${i}]`).join('');
  const narration = join(AUDIO_DIR, 'narration.mp3');
  execFileSync('ffmpeg', [
    '-y', ...inputs,
    '-filter_complex', `${parts};${chain}concat=n=${stems.length}:v=0:a=1[out]`,
    '-map', '[out]', '-b:a', '192k', narration,
  ], { stdio: ['ignore', 'ignore', 'pipe'] });

  // Walk the same padded timeline to derive caption frames.
  let t = 0;
  const captions = stems.map((s) => {
    const start = Math.round(t * FPS);
    const end = Math.round((t + s.seconds) * FPS);
    t += s.seconds + s.gap;
    return { text: s.caption, start, end };
  });

  const total = durationOf(narration);
  const timing = {
    fps: FPS,
    narrationSeconds: total,
    narrationFrames: Math.ceil(total * FPS),
    captions,
  };
  mkdirSync(dirname(TIMING_OUT), { recursive: true });
  writeFileSync(TIMING_OUT, `${JSON.stringify(timing, null, 2)}\n`);

  console.log(`\nnarration: ${total.toFixed(2)}s (${timing.narrationFrames} frames)`);
  console.log(`timing:    ${TIMING_OUT}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
