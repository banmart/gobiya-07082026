# Homepage Hero Intro Video — Design

Date: 2026-07-23 · Status: approved (chat, 2026-07-23)

## Goal

A ~40-second branded intro video for a new right column in the homepage hero.
It answers the visitor's query ("SEO services company near me" / AI visibility)
with real data and pushes them toward the `/onboarding` audit CTA. Hand-built
motion graphics — explicitly not AI-generated footage.

## Approach

Remotion composition rendered offline and embedded as a static video file.
Rejected alternatives: AI-generated video (Higgsfield/vidIQ compose) — reads
as AI slop, which the brief forbids; live-action edit — no footage exists.

## Composition

- `GobiyaHeroIntro` in `remotion/hero-intro/`, registered in `remotion/Root.jsx`.
- 1080×1350 (4:5 portrait), 30 fps, ~40 s, fast 10–12-frame transitions.
- Brand device: the logo's viewfinder corner brackets (geometry from
  `lib/brand.js`) frame and "lock onto" each scene; the carmine 4-point
  sparkle pings on key numbers. Palette navy `#142f52` / paper `#f4f7fb` /
  carmine `#c8102e`. Fonts loaded via `@remotion/google-fonts` to match the
  site (Stack Sans Notch heading precedent from citation-study theme, Inter body).

## Script & scenes (female American English VO)

1. **Hook** — "Someone just asked ChatGPT to recommend a business like yours.
   Were you the answer?"
2. **Shift** — search moved from the Google box into conversations
   (AI Overviews, ChatGPT, Perplexity).
3. **Positioning** — Gobiya: one accountable LA team for SEO + AI visibility.
4. **Proof** — count-up stats from `lib/searchWins.js` (real, verified):
   310,962 impressions (+34%), avg. position 42.8 → 32.9, CTR 0.32% → 0.35%,
   4,850 AI citations (+142%).
5. **Services flash** — SEO · GEO · Web · Content, rapid cuts.
6. **CTA** — "Get your free AI visibility audit — gobiya.com."

Only numbers already published in the repo are used (no AI Overview GSC
claims — that data doesn't exist yet per project memory).

## Audio

- VO: vidIQ voiceover generation, female US voice.
- Music: energetic minimal bed via Higgsfield `generate_audio`.
- SFX: whoosh/tick/ping accents via Higgsfield `generate_audio`.
- Assets stored under `public/hero-intro/audio/`; mixed in the composition
  with `<Audio>` tracks (music ducked under VO).
- Burned-in caption track (Captions component, chatbrat pattern) so the
  video works fully muted.

## Embed

- New right column in `.hero__row` on `app/page.js`: a 4:5 video card.
- Autoplays muted + looped with captions; tap-to-unmute button overlay
  (browsers block autoplay with sound); pauses for `prefers-reduced-motion`.
- Rendered to `public/assets/videos/hero-intro.webm` + `.mp4` fallback with
  a poster image; `preload="none"` + poster so the pending LCP gate is not
  regressed.
- Small client component (`components/HeroIntroVideo.js`) owns the
  unmute/replay state; page stays a server component.

## Testing / verification

- `npx remotion render` completes for both formats; visual pass in Remotion
  Studio.
- `npm run build` passes; hero renders with the new column at desktop and
  mobile widths (column stacks under the CTAs on mobile).
- Audio sync: caption timings derived from the actual VO file duration.
