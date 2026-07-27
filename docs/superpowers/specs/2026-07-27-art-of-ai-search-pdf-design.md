# The Art of AI Search — Branded PDF Guide

## Goal

Ship a real, downloadable, branded PDF behind the "Download Free Guide (PDF)" button on the homepage (`app/page.js:302`) and the "The Art of AI Search (PDF)" nav item (`lib/nav.js:106`). Today both point at `/ai-visibility`, a marketing landing page — there is no actual PDF. This replaces that with a genuine ~22-page guide people can download and read.

## Content structure (~22 pages)

1. Cover — navy background, gold accent rule, "Gobiya Technical Series" kicker, title "The Art of AI Search," subtitle "The Complete Guide to Search & AI Visibility," author credit (Steve Martin, Founder of Gobiya) — mirrors the book mockup already on the homepage (`app/page.js:274-279`).
2. Table of contents
3. Intro — "less than 10% of businesses capture top ChatGPT/Google recommendations" framing already used on the homepage (`app/page.js:287`)
4. Platform breakdown — one section each for Google AI Overviews, ChatGPT, Perplexity, Gemini, Claude. Sourced from the existing `get-cited-by-chatgpt-perplexity-ai-overviews` insights article (`lib/insights.js:1064`) for citation-rate stats and per-platform citation drivers, so figures match what's already published on the site.
5. The 4-Pillar Framework — one spread per pillar: Technical Foundation, Entity & Structured Data, Citable Content, Trust & Authority. Mirrors the existing 01–04 framework on `/ai-visibility` (`app/ai-visibility/page.js:84-189`).
6. Self-audit checklist — practical checklist the reader runs against their own site.
7. 90-day action plan — phased rollout tied to the 4 pillars.
8. About Gobiya / CTA — contact info, phone, consultation link.

**Voice:** plain, 9th-grade reading level, brand-first — matches the tone on `/ai-visibility`, not the denser tone in the existing long-form insights articles. Stats and figures are copied verbatim from existing site content, not invented.

## Build mechanism

No PDF library exists in this repo (`package.json` has no puppeteer/react-pdf/pdf-lib). Per prior work in this project (see reference memory on headless screenshots), the established pattern for browser automation here is driving the local Chrome install directly over CDP with Node's built-in `WebSocket` — no new dependency.

- Write one static HTML file (`scripts/pdf/art-of-ai-search.html`) styled with the site's real brand tokens: navy `#0B1E36`, carmine `#8B263E`, gold `#F5B83D`, PT Serif for headings / Inter for body (matching `app/globals.css:10-29`), with print CSS (`@page`, `page-break-before`, running footer with page numbers).
- Write a one-off Node script (`scripts/generate-ai-search-pdf.mjs`) that launches `C:/Program Files/Google/Chrome/Application/chrome.exe` headless with a remote debugging port, connects over CDP, navigates to the local HTML file, and calls `Page.printToPDF` to produce `public/downloads/the-art-of-ai-search.pdf`. This follows the same script pattern as the existing `scripts/generate-fb-ad-*.mjs` one-off content-generation scripts.
- This is a build-time artifact, not rendered per-request — the PDF is committed to `public/downloads/` like any other static asset.

## Wiring changes

- `app/page.js:302` — `Download Free Guide (PDF)` button links directly to `/downloads/the-art-of-ai-search.pdf` instead of `/ai-visibility`.
- `lib/nav.js:106` — link updated to `/downloads/the-art-of-ai-search.pdf`; description corrected from "Our 352-page complete guide to AI recommendation engines" to accurately describe the real guide (page count, actual scope).
- `/ai-visibility` page left untouched — it remains a separate SEO landing page unrelated to the PDF.

## Out of scope

- No email-gating / lead capture in front of the download (direct download, per decision).
- No changes to the long-form insights articles used as source material.
- No new npm dependencies.
