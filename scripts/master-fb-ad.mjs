// Loudness-masters the rendered Facebook ad and remuxes it in place.
//
//   node scripts/master-fb-ad.mjs [in.mp4] [out.mp4]
//
// The raw Remotion render lands around -24 LUFS because the synthesized music
// bed is normalized to -6 dBFS peak, not to a loudness target. Meta normalizes
// feed playback to roughly -16 LUFS, so an unmastered upload either plays
// noticeably quieter than the posts around it or gets gained up by Facebook
// with no headroom control on our side. Two-pass loudnorm to -16 LUFS with a
// -1.5 dBTP ceiling puts us where the platform expects, and the video stream
// is copied so there's no second generation of h264 loss.

import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, renameSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const IN = resolve(ROOT, process.argv[2] ?? 'out/ads/gobiya-facebook-ad-4x5.mp4');
const OUT = resolve(ROOT, process.argv[3] ?? IN);

const TARGET_I = -16;
const TARGET_TP = -1.5;
const TARGET_LRA = 11;

if (!existsSync(IN)) {
  console.error(`No such file: ${IN}\nRender first: npx remotion render remotion/index.js FacebookAd ${IN}`);
  process.exit(1);
}

// Pass 1 — measure. loudnorm prints its JSON summary on stderr even on a
// clean exit, so this reads stderr directly rather than going through the
// throw path of execFileSync.
const probe = spawnSync(
  'ffmpeg',
  ['-i', IN, '-af', `loudnorm=I=${TARGET_I}:TP=${TARGET_TP}:LRA=${TARGET_LRA}:print_format=json`, '-f', 'null', '-'],
  { encoding: 'utf8' }
);
const stderr = probe.stderr ?? '';
const open = stderr.lastIndexOf('{');
const close = stderr.lastIndexOf('}');
if (open === -1 || close <= open) {
  console.error(stderr.split('\n').slice(-20).join('\n'));
  throw new Error('loudnorm did not emit a measurement block');
}
const measured = JSON.parse(stderr.slice(open, close + 1));

console.log(`measured: ${measured.input_i} LUFS, TP ${measured.input_tp} dBTP`);

// Pass 2 — apply, feeding the measurements back in so loudnorm runs in its
// accurate linear mode rather than the single-pass dynamic one.
const tmp = `${OUT}.master.mp4`;
const filter = [
  `loudnorm=I=${TARGET_I}:TP=${TARGET_TP}:LRA=${TARGET_LRA}`,
  `measured_I=${measured.input_i}`,
  `measured_TP=${measured.input_tp}`,
  `measured_LRA=${measured.input_lra}`,
  `measured_thresh=${measured.input_thresh}`,
  `offset=${measured.target_offset}`,
  'linear=true',
  'print_format=summary',
].join(':');

execFileSync('ffmpeg', [
  '-y', '-i', IN,
  '-af', filter,
  '-c:v', 'copy',
  '-c:a', 'aac', '-b:a', '192k', '-ar', '48000',
  '-movflags', '+faststart', // Facebook streams the upload; moov belongs up front
  tmp,
], { stdio: ['ignore', 'ignore', 'pipe'] });

if (existsSync(OUT)) rmSync(OUT);
renameSync(tmp, OUT);
console.log(`mastered → ${OUT} (${TARGET_I} LUFS, ${TARGET_TP} dBTP, faststart)`);
