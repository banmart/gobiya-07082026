# Facebook ad — `FacebookAd`

One 34.8s cut at 30fps, delivered in three placement ratios. Targets people
searching for web design, SEO, and AI visibility.

| Composition | Size | Output | Placement |
|---|---|---|---|
| `FacebookAd` | 1080×1350 | `out/ads/gobiya-facebook-ad-4x5.mp4` | feed (primary) |
| `FacebookAdSquare` | 1080×1080 | `out/ads/gobiya-facebook-ad-1x1.mp4` | feed fallback, Marketplace, right column, Audience Network |
| `FacebookAdVertical` | 1080×1920 | `out/ads/gobiya-facebook-ad-9x16.mp4` | Reels, Stories |

All three share one set of scene components, one narration track and one music
bed — there is no duplicated creative to keep in sync.

## Build

```bash
# 1. Voiceover (costs ElevenLabs credits — only re-run if the script changes)
ELEVENLABS_API_KEY=sk_... npm run ad:narration

# 2. Music bed (deterministic, free, re-run any time)
npm run ad:music

# 3. Render + loudness master
npm run ad:build:all        # all three ratios
npm run ad:build            # 4:5 only
npm run ad:build:1x1
npm run ad:build:9x16
```

## How the ratios work

Every placement is 1080 wide, so horizontal layout never changes and only the
vertical room differs. Scenes are authored against the 4:5 master and wrap
their content in `<Stage>` (`Chrome.jsx`), which reads `layout.js` and scales
by composition height:

| Ratio | Scale | Shift | Caption bottom | Why |
|---|---|---|---|---|
| 1:1 | 0.92 | 0 | 62px | 270px shorter than the master; the tall scenes would otherwise crowd the caption bar |
| 4:5 | 1.00 | 0 | 74px | design size |
| 9:16 | 1.08 | −70px | 300px | fills the taller frame; captions must clear Meta's bottom UI block |

The 9:16 scale is capped at 1.08 — the widest surface is the services card at
912px, which lands at 985px and still keeps a margin inside the 1080 frame.
Push it further and the cards touch the edges.

`Background` sits outside `Stage` so it stays full-bleed at every ratio.

## How the timing works

`scripts/generate-fb-ad-narration.mjs` sends each script line to ElevenLabs as
its own request, measures the returned mp3 with `ffprobe`, concatenates the
stems with explicit silence gaps, and writes `timing.json` — the measured frame
in/out of every line. `Captions.jsx` renders straight off that file, and each
scene documents its animation offsets against the absolute frames in
`FacebookAd.jsx`'s `STARTS` array.

So: **if you re-run step 1, the line durations will shift** (the voice settings
are deliberately non-deterministic for a livelier read), and `STARTS` plus the
per-scene offsets need re-checking against the new `timing.json`. Steps 2 and 3
alone are always safe.

## Assets

| Path | Notes |
|---|---|
| `public/fb-ad/audio/narration.mp3` | generated, step 1 |
| `public/fb-ad/audio/music.mp3` | generated, step 2 — 128 BPM, we own it outright |
| `.cache/fb-ad-lines/` | per-line stems, gitignored, not shipped |
| `public/hero-intro/audio/*.wav` | SFX, shared with the hero intro cut |

## Delivery notes

- Mastered to **-16 LUFS / -1.5 dBTP** to match Meta's feed normalization, and
  muxed with `+faststart`. Every ratio needs its own master pass — the render
  step does not do this.
- Captions are burned in and stop at frame 944, where the end card's own type
  takes over. Most of the feed plays muted — do not remove them.
- The two figures in `ProofScene.jsx` are carried over verbatim from the
  shipped hero-intro cut. If those are ever restated, change both.
