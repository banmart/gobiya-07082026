# Gobiya Institutional Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-theme the Gobiya site to an institutional navy/carmine design (boma.org reference), replace React Bits/three.js with a bespoke GSAP motion system, ship a hand-built SVG logo, rebuild the homepage on BOMA's 8-block skeleton, and consolidate services 11 → 8 with 301s — while holding PSI mobile ≥ 95.

**Architecture:** Next.js 16 app router, static-friendly (plain `<a>` navigation = full page loads, so client motion code initializes fresh per page — no route-change handling needed). All theming flows through CSS custom properties in `app/globals.css`; all service/insight content lives in `lib/*.js` data modules consumed by shared templates.

**Tech Stack:** Next.js 16, React 19, GSAP 3.15 (core + ScrollTrigger + SplitText — all free since GSAP 3.13), `next/font` (Stack Sans Notch 400 + Inter variable), sharp (dev-only, icon rasterization).

**Spec:** `docs/superpowers/specs/2026-07-17-institutional-redesign-design.md`

## Global Constraints

- Palette: navy `#0b1f3a` (dark sections) / `#142f52` (text, buttons) / tint `#edf1f6`; accent carmine `#c8102e` used small only (dots, active states, mark node) — never large fills.
- Typography: Stack Sans Notch weight 400 only; Inter via `next/font` variable (all weights available at no extra file cost — do NOT add a `weight` array to the Inter config).
- Square corners everywhere: no `border-radius` except `0` (pills, inputs, tags all flatten).
- Motion: GSAP core + ScrollTrigger + SplitText only. No three.js, no React Bits. Max ONE pinned scroll scene per page. Every animation gated by `prefers-reduced-motion`.
- Content must never be hidden before JS runs — no CSS `opacity: 0` initial states; GSAP `.from()` tweens only.
- Retired URLs must 301 (Next.js emits 308 for `permanent: true` — that is the expected status), never 404.
- Performance gates: PSI mobile ≥ 95, LCP < 2.0s, CLS < 0.05, INP < 200ms; net route JS smaller than pre-redesign baseline. **Status as of Task 7: CLS, SEO score, and net JS reduction confirmed. LCP/perf-score are NOT confirmed passing** — local Lighthouse testing showed the homepage and a service page exceeding the LCP budget under real device throttling (though passing under Lighthouse's default lantern-simulation mode), with a 20+ point performance-score swing and 1.7s–2.7s LCP range on the *same unchanged page* purely from throttling methodology. Root-caused as a local-sandbox measurement reliability issue, not a specific code regression (see Task 7's investigation), but this gate remains **pending real PageSpeed Insights / CrUX field validation against the deployed site** as a required post-deploy follow-up before treating it as met.
- No generated/raster logo art — all brand geometry is hand-written SVG.
- **Spec deviation (approved path):** the GOBIYA wordmark renders as styled live text in Stack Sans Notch (already loaded site-wide), not converted-to-outline paths — outline conversion needs font tooling out of scope. The mark, favicons, and OG image are pure SVG geometry.

---

### Task 1: Palette + typography re-theme

**Files:**
- Modify: `app/globals.css` (tokens at :1-35, buttons :329-364, watermark :1049-1070, misc radii)

**Interfaces:**
- Produces: CSS custom properties consumed by every later task: `--main: #c8102e`, `--darkest: #142f52`, `--overlay: #0b1f3a`, `--lightest: #edf1f6`, plus unchanged token names (`--border`, `--hint`, etc.) remapped to navy values. Later tasks style new components with these existing token names.

- [ ] **Step 1: Replace the `:root` palette block**

In `app/globals.css`, replace the palette section of `:root` (lines 9-22, from `--bg` through `--border-light`) with:

```css
  /* palette — institutional navy + carmine (boma.org-reference re-theme) */
  --bg: #ffffff;
  --main: #c8102e;
  --lightest: #edf1f6;
  --lighter: #e4eaf1;
  --light: #d4dde8;
  --medium: #bcc9d8;
  --dark: #7e93ab;
  --darkest: #142f52;
  --overlay: #0b1f3a;
  --hint: rgba(17, 42, 72, 0.72);
  --border: rgba(11, 31, 58, 0.16);
  --border-strong: rgba(11, 31, 58, 0.4);
  --border-light: rgba(244, 247, 251, 0.18);
```

Also update the header comment (lines 1-6) to read:

```css
/* ═══════════════════════════════════════════════════════════
   Gobiya — design system
   Institutional corporate (boma.org reference):
   grotesque display + Inter body, ink navy on white,
   hairline rules, single carmine accent, expo easings.
   ═══════════════════════════════════════════════════════════ */
```

- [ ] **Step 2: Re-tint hardcoded warm-cream values to cool paper**

The dark sections hardcode a warm cream (`#f7f5f0` / `rgba(247, 245, 240, …)`). Global find/replace in `app/globals.css`:

- `#f7f5f0` → `#f4f7fb` (7 occurrences: `.section--dark`, `.menu`, `.founder`… )
- `rgba(247, 245, 240,` → `rgba(244, 247, 251,` (all occurrences — eyebrow--light, menu, offices, footer)

Run to confirm zero warm values remain:

```bash
grep -c "247, 245, 240\|#f7f5f0" app/globals.css
```

Expected: `0`

- [ ] **Step 3: Flatten every border-radius to square corners**

In `app/globals.css` change these exact declarations:

- `.btn` (line ~339): `border-radius: 100px;` → `border-radius: 0;`
- `.offices__tag` (line ~891): `border-radius: 100px;` → `border-radius: 0;`
- `.stepper__progress` (line ~1390): `border-radius: 100px;` → `border-radius: 0;`
- `.stepper__input, .stepper__textarea` (line ~1448): `border-radius: 8px;` → `border-radius: 0;`
- `.stepper__option` (line ~1479): `border-radius: 8px;` → `border-radius: 0;`

Verify:

```bash
grep -n "border-radius" app/globals.css | grep -v "border-radius: 0"
```

Expected: no output.

- [ ] **Step 4: Retire the global background watermark**

Delete the `body::before` rule and its mobile media query (the two blocks under `/* ═══════════ global background mark ═══════════ */`, lines ~1049-1070) plus the comment. The footer `.footer__mark` styles stay (Task 2 re-points them at the new SVG mark).

- [ ] **Step 5: Build and eyeball**

```bash
npm run build
```

Expected: build succeeds. Then `npm run dev`, load `/` — everything renders in navy/carmine, square buttons, no giant red watermark. (Red webp still appears in nav/footer logos — Task 2 replaces those.)

- [ ] **Step 6: Commit**

```bash
git add app/globals.css
git commit -m "theme: institutional navy/carmine palette, square corners, retire watermark"
```

---

### Task 2: Logo system (SVG mark, lockups, favicons, OG) — has a USER APPROVAL CHECKPOINT

**Files:**
- Create: `lib/brand.js` (pure JS — no JSX, importable from Node scripts), `components/Logo.js`, `app/brand-preview/page.js`, `scripts/generate-icons.mjs`
- Modify: `components/Header.js:1-12`, `components/Footer.js:1-15`, `app/globals.css` (`.footer__mark`, `.nav__logo`), `package.json` (add sharp devDependency)
- Replace (generated): `public/assets/img/icon-32.png`, `icon-192.png`, `apple-icon-180.png`, `og-default.jpg`

**Interfaces:**
- Produces: `lib/brand.js` named exports `markInner(stroke, accent)` (inner SVG elements string) and `markSvg({ stroke, accent, size })` (complete standalone SVG string, used by the icon script); `components/Logo.js` named export `LogoMark({ size?: number, light?: boolean, className?: string })` — React component. Tasks 4+ import `{ LogoMark }` from `../components/Logo`.

- [ ] **Step 1: Create `lib/brand.js` (single source of the mark geometry)**

```js
// Gobiya brand mark — hand-built SVG geometry, no raster or generated art.
// Four signal strokes of unequal length converging on a carmine node:
// "the thread search engines and AI follow back to you."
// Pure JS (no JSX) so scripts/generate-icons.mjs can import it under Node.

export const BRAND_NAVY = '#142f52';
export const BRAND_PAPER = '#f4f7fb';
export const BRAND_CARMINE = '#c8102e';

export function markInner(stroke = BRAND_NAVY, accent = BRAND_CARMINE) {
  return `<path d="M5 9 L19.6 19.6" stroke="${stroke}" stroke-width="2.6" stroke-linecap="square"/>
<path d="M43 5 L28.4 19.6" stroke="${stroke}" stroke-width="2.6" stroke-linecap="square"/>
<path d="M9 43 L19.6 28.4" stroke="${stroke}" stroke-width="2.6" stroke-linecap="square"/>
<path d="M39 39 L28.4 28.4" stroke="${stroke}" stroke-width="2.6" stroke-linecap="square"/>
<circle cx="24" cy="24" r="4.2" fill="${accent}"/>`;
}

export function markSvg({ stroke = BRAND_NAVY, accent = BRAND_CARMINE, size = 48 } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 48 48" fill="none">${markInner(stroke, accent)}</svg>`;
}
```

Then create `components/Logo.js`:

```jsx
import { markInner, BRAND_NAVY, BRAND_PAPER } from '../lib/brand';

export function LogoMark({ size = 28, light = false, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: markInner(light ? BRAND_PAPER : BRAND_NAVY) }}
    />
  );
}
```

- [ ] **Step 2: Create the brand preview route `app/brand-preview/page.js`**

```jsx
import { LogoMark } from '../../components/Logo';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Brand Preview',
  description: 'Internal brand lockup preview.',
  path: '/brand-preview',
  robots: { index: false, follow: false },
});

const Row = ({ dark, children }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '3rem',
      padding: '3rem',
      background: dark ? 'var(--overlay)' : '#fff',
      color: dark ? '#f4f7fb' : 'var(--darkest)',
      borderBottom: '1px solid var(--border)',
    }}
  >
    {children}
  </div>
);

export default function BrandPreview() {
  return (
    <main style={{ paddingTop: 'calc(var(--nav-h) + 2rem)' }}>
      <Row>
        <LogoMark size={16} />
        <LogoMark size={28} />
        <LogoMark size={48} />
        <LogoMark size={120} />
        <span className="nav__logo"><LogoMark size={30} /><span className="nav__logo-word">Gobiya</span></span>
      </Row>
      <Row dark>
        <LogoMark size={16} light />
        <LogoMark size={28} light />
        <LogoMark size={48} light />
        <LogoMark size={120} light />
        <span className="nav__logo" style={{ color: '#f4f7fb' }}><LogoMark size={30} light /><span className="nav__logo-word">Gobiya</span></span>
      </Row>
    </main>
  );
}
```

- [ ] **Step 3: CHECKPOINT — user approves the mark**

Run `npm run dev`, direct the user to `http://localhost:3000/brand-preview`. **Stop and iterate on the SVG geometry with the user until they approve.** Do not proceed to Step 4 (asset replacement) without explicit approval.

- [ ] **Step 4: Install sharp and create `scripts/generate-icons.mjs`**

```bash
npm install --save-dev sharp
```

```js
// scripts/generate-icons.mjs — rasterize brand SVG geometry into favicons + OG.
// Run: node scripts/generate-icons.mjs
import sharp from 'sharp';
import { markInner, BRAND_CARMINE } from '../lib/brand.js';

const DEEP = '#0b1f3a';

// Favicons: navy mark on white, small padding.
async function icon(px, out) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 56 56">
    <rect width="56" height="56" fill="#ffffff"/>
    <g transform="translate(4,4)">${markInner()}</g>
  </svg>`;
  await sharp(Buffer.from(svg)).resize(px, px).png().toFile(out);
  console.log('wrote', out);
}

// OG: deep navy field, large centered light mark, carmine baseline rule.
async function og() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="${DEEP}"/>
    <g transform="translate(420,135) scale(7.5)">${markInner('#f4f7fb')}</g>
    <rect x="420" y="540" width="360" height="4" fill="${BRAND_CARMINE}"/>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile('public/assets/img/og-default.jpg');
  console.log('wrote og-default.jpg');
}

await icon(32, 'public/assets/img/icon-32.png');
await icon(192, 'public/assets/img/icon-192.png');
await icon(180, 'public/assets/img/apple-icon-180.png');
await og();
```

Run: `node scripts/generate-icons.mjs`
Expected: four `wrote …` lines; open the files to confirm they render the mark.

- [ ] **Step 5: Swap the logo in Header and Footer**

`components/Header.js` — replace lines 1 and 10:

```jsx
import { LogoMark } from './Logo';
```

and

```jsx
<a className="nav__logo" href="/" aria-label="Gobiya — home">
  <LogoMark className="nav__logo-mark" size={30} />
  <span className="nav__logo-word">Gobiya</span>
</a>
```

Remove the now-unused `import Image from 'next/image';` **only if** no other `Image` usage remains in the file (there is none).

`components/Footer.js` — replace the two `Image` usages:

```jsx
import { LogoMark } from './Logo';
```

Line 8 (background mark):

```jsx
<div className="footer__mark" aria-hidden="true"><LogoMark size={520} light /></div>
```

Lines 12-15 (brand lockup):

```jsx
<a className="nav__logo footer__logo" href="#top">
  <LogoMark className="nav__logo-mark" size={30} light />
  <span className="nav__logo-word">Gobiya</span>
</a>
```

Remove `import Image from 'next/image';` from Footer.

- [ ] **Step 6: Straighten the footer mark CSS**

In `app/globals.css`, `.footer__mark` (line ~1074): change `opacity: 0.06;` → `opacity: 0.05;` and delete the line `transform: rotate(-9deg);`. Also delete `height: auto;` (the SVG sizes itself) and change `width: clamp(...)` to `width: auto;`. Delete the `@media (max-width: 48rem) { .footer__mark { … } }` override.

- [ ] **Step 7: Build, verify no red-webp references remain in components**

```bash
npm run build && grep -rn "logo-gobiya-red" app components lib
```

Expected: build passes; grep returns no output. (The webp file itself stays on disk — external sites may hotlink it; removing is optional later.)

- [ ] **Step 8: Commit**

```bash
git add components/Logo.js components/Header.js components/Footer.js app/brand-preview scripts/generate-icons.mjs app/globals.css public/assets/img package.json package-lock.json
git commit -m "brand: hand-built SVG signal mark, new favicons and OG, retire red webp logo"
```

---

### Task 3: GSAP motion system + React Bits/three.js removal

**Files:**
- Create: `components/Motion.js`
- Modify: `app/layout.js:49-66`, `public/js/main.js` (trim), `app/globals.css` (delete reveal CSS), every file importing SplitText/ScrollReveal/Ballpit (list in Step 4)
- Delete: `components/SplitText.js`, `components/ScrollReveal.js`, `components/Ballpit.js`, `components/BallpitLazy.js`
- Modify: `package.json` (remove `three`)

**Interfaces:**
- Consumes: nothing from other tasks (palette tokens only).
- Produces: data-attribute motion API used by Tasks 4-5 markup:
  - `data-split` — headline: masked line-by-line rise (GSAP SplitText `type: 'lines'`)
  - `data-reveal` — block: fade + 28px rise on scroll entry (also honors existing `style={{'--d'}}` no longer needed — stagger is automatic per batch)
  - `data-count` / `data-decimals` / `data-plain` / `data-prefix` — count-up numbers (same attribute contract as the old main.js)
  - `data-rule` — element whose `scaleX` draws 0→1 on entry (stats band hairlines)
  - `data-pin-scene` + `data-pin-row` — ONE pinned ScrollTrigger scene; rows go dim→lit in sequence
  - `data-draw` — SVG container whose `path` elements self-draw via stroke-dashoffset
  - `.btn--solid` — magnetic hover on fine pointers

- [ ] **Step 1: Create `components/Motion.js`**

```jsx
'use client';

// Bespoke motion system — GSAP core + ScrollTrigger + SplitText only.
// Content is never hidden pre-JS: everything animates FROM a hidden state
// via gsap.from(), so no-JS and reduced-motion users see the final layout.

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export default function Motion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const ctx = gsap.context(() => {
      // ── masked line reveals (wait for fonts so lines split correctly) ──
      const ready = document.fonts ? document.fonts.ready : Promise.resolve();
      ready.then(() => {
        document.querySelectorAll('[data-split]').forEach((el) => {
          const split = SplitText.create(el, { type: 'lines', mask: 'lines' });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 0.9,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          });
        });
        ScrollTrigger.refresh();
      });

      // ── generic block reveals ──
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.from(els, {
            opacity: 0,
            y: 28,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.07,
          }),
      });

      // ── count-up numbers ──
      document.querySelectorAll('[data-count]').forEach((el) => {
        const target = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const prefix = el.dataset.prefix || '';
        const plain = el.hasAttribute('data-plain');
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate() {
            el.textContent =
              prefix +
              (plain
                ? Math.round(obj.v).toString()
                : obj.v.toLocaleString('en-US', {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                  }));
          },
        });
      });

      // ── self-drawing hairline rules ──
      document.querySelectorAll('[data-rule]').forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });

      // ── the single pinned scene (AI visibility band) ──
      const scene = document.querySelector('[data-pin-scene]');
      if (scene) {
        const rows = scene.querySelectorAll('[data-pin-row]');
        gsap
          .timeline({
            scrollTrigger: {
              trigger: scene,
              start: 'top top+=72',
              end: '+=120%',
              pin: true,
              scrub: 0.5,
            },
          })
          .from(rows, { opacity: 0.15, y: 36, stagger: 0.4, ease: 'none' });
      }

      // ── SVG glyph self-draw ──
      document.querySelectorAll('[data-draw] path').forEach((path) => {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: { trigger: path.closest('[data-draw]'), start: 'top 85%', once: true },
          }
        );
      });

      // ── magnetic primary CTAs (fine pointers only) ──
      if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.btn--solid').forEach((btn) => {
          const move = (e) => {
            const r = btn.getBoundingClientRect();
            gsap.to(btn, {
              x: (e.clientX - r.left - r.width / 2) * 0.15,
              y: (e.clientY - r.top - r.height / 2) * 0.25,
              duration: 0.4,
              ease: 'power2.out',
            });
          };
          const reset = () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'expo.out' });
          btn.addEventListener('mousemove', move);
          btn.addEventListener('mouseleave', reset);
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
```

- [ ] **Step 2: Mount Motion in `app/layout.js`**

Add `import Motion from '../components/Motion';` and render `<Motion />` inside `<body>` directly after `{children}` (before the `<Script>` tag).

- [ ] **Step 3: Trim `public/js/main.js` to chrome-only duties**

Delete these blocks (Motion.js owns them now):
- the `[data-words]` word-splitting block (lines 22-36)
- the reveal IntersectionObserver block (lines 38-54)
- the count-up block (lines 56-96), including `easeExpoOut`, `countUp`, `ioCount`

Keep: `finishLoading`/`is-loaded`, smart nav, parallax, mobile menu, office clocks, initial `onScroll()`. Update the header comment to `/* Gobiya — chrome interactions: smart nav, mobile menu, parallax, clocks */`.

- [ ] **Step 4: Replace React Bits usages sitewide**

Mechanical rules — apply to every file below:

**Rule A — SplitText:** `<SplitText tag="h1" className="statement" text={EXPR} splitType="…" delay={…} duration={…} … />` becomes `<h1 className="statement" data-split>{EXPR}</h1>` (same for `tag="span"`/`tag="h2"` → that element). Delete the `import SplitText from …` line.

Example (components/ServiceTemplate.js line 10):

```jsx
// before
<SplitText tag="h1" className="statement" text={service.heroLines.join(' ')} splitType="words" delay={18} duration={0.9} />
// after
<h1 className="statement" data-split>{service.heroLines.join(' ')}</h1>
```

**Rule B — ScrollReveal:** `<ScrollReveal containerClassName="statement about__reveal">{EXPR}</ScrollReveal>` becomes `<p className="statement about__reveal" data-split>{EXPR}</p>`. Delete the import.

**Rule C — data-words:** every `data-words` attribute becomes `data-split` (the CSS/JS that powered `data-words` is gone).

**Rule D — Ballpit (app/page.js only):** delete `import Ballpit from '../components/BallpitLazy';` and the entire `<div className="cta__canvas">…</div>` block (lines 246-257). Task 4 restyles the CTA; leaving it plain here is fine.

Files to update (from grep): `app/page.js`, `app/about/page.js`, `app/about/approach/page.js`, `app/about/steve-martin/page.js`, `app/ai-visibility/page.js`, `app/contact/page.js`, `app/industries/page.js`, `app/insights/page.js`, `app/onboarding/page.js`, `app/outcomes/page.js`, `app/services/page.js`, `app/work/page.js`, `components/ArticleTemplate.js`, `components/CaseStudyTemplate.js`, `components/IndustryTemplate.js`, `components/LocationTemplate.js`, `components/OutcomeTemplate.js`, `components/ServiceTemplate.js`.

Hero title lines in `app/page.js` (lines 23-26): the three `SplitText tag="span"` instances collapse to plain spans — Task 4 rewrites this hero entirely, so an interim `<span className="hero__title-line">AI Driven</span>` etc. is sufficient.

- [ ] **Step 5: Delete dead components and the three.js dependency**

```bash
git rm components/SplitText.js components/ScrollReveal.js components/Ballpit.js components/BallpitLazy.js
npm uninstall three
```

- [ ] **Step 6: Delete superseded CSS**

In `app/globals.css` delete these blocks entirely:
- `/* scroll-reveal (React Bits) word spans */` block (`.scroll-reveal`, `.scroll-reveal-text .word`)
- `/* split-text (React Bits) hero headings */` block (`.statement.split-parent`, `.hero__title-line`, keep `.hero__title-accent` — still used)
- `/* word-by-word reveal */` block (`[data-words] .w` rules)
- `/* generic reveal */` block (`[data-reveal] { opacity: 0; … }` and `.in-view` rule) — **this is the "never hidden pre-JS" fix**
- In the reduced-motion block: the `[data-reveal], .line, [data-words] .w > span` override and the `.split-char, .split-word, .split-line, .scroll-reveal-text .word` override (no longer needed — Motion.js early-returns on reduced motion, leaving content untouched)

- [ ] **Step 7: Verify**

```bash
grep -rn "SplitText\|ScrollReveal\|Ballpit\|from 'three'\|data-words" app components lib | grep -v node_modules
npm run build
```

Expected: grep only matches `components/Motion.js` (`gsap/SplitText` import) — nothing else; build passes. Then `npm run dev`: scroll `/services/seo-discoverability` — headlines rise in masked lines, blocks reveal, no console errors; with DevTools "Emulate prefers-reduced-motion" everything is static and fully visible.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "motion: bespoke GSAP system replaces React Bits; drop three.js"
```

---

### Task 4: Header utility bar + homepage rebuild (BOMA 8-block skeleton)

**Files:**
- Modify: `components/Header.js` (add topbar), `app/page.js` (full rewrite), `app/globals.css` (append new-block styles), `lib/services.js` (add `blurb` per entry)

**Interfaces:**
- Consumes: `LogoMark` from Task 2; `data-split`/`data-reveal`/`data-count`/`data-rule`/`data-pin-scene`/`data-pin-row`/`data-draw` from Task 3; `SERVICES` from `lib/services.js`; `INSIGHTS` from `lib/insights.js` (array of `{ slug, date, category, title, dek }`).
- Produces: `blurb: string` field on every `SERVICES` entry (Task 6 preserves blurbs on merge survivors); CSS classes `.topbar`, `.stats-band`, `.svc-grid`, `.svc-card`, `.pillars`, `.logo-strip` reusable on inner pages later.

- [ ] **Step 1: Add `blurb` to every entry in `lib/services.js`**

Insert `blurb: '…',` directly after each entry's `title:` line:

| Entry | blurb |
|---|---|
| seo-discoverability | `Crawlability, structured data, and Core Web Vitals — the technical foundation search and AI crawlers actually read.` |
| geo-ai-content-writing | `Content engineered to be quoted verbatim by ChatGPT, Perplexity, and Google AI Overviews.` |
| authority-link-building | `Editorial links and clean citations that build the trust AI systems check first.` |
| web-app-development | `React and Next.js builds with SEO engineered in from the first commit.` |
| google-ads-ppc | `Campaigns rebuilt around cost per lead, not clicks.` |
| cro-ux | `Find the friction costing you conversions — and fix it with evidence.` |
| ai-llm-consulting | `Practical AI integration: what is worth building, scoped and implemented.` |
| seo-web-copywriting | `Pages written to rank in Google and convert once they do.` |
| content-strategy | `Editorial plans built on real demand, not a publishing habit.` |
| ai-video-ads | `Fast-iteration ad creative without the production shoot.` |
| digital-pr | `Earned coverage that produces links a journalist chose to place.` |

- [ ] **Step 2: Add the utility bar to `components/Header.js`**

Inside `<header className="nav" id="nav">`, insert before `<div className="nav__inner">`:

```jsx
<div className="topbar">
  <div className="topbar__inner">
    <span className="topbar__note">Los Angeles · Est. 2010 · BBB A+ Rated</span>
    <div className="topbar__links">
      <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
      <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
      <a href="/onboarding" className="topbar__cta">Get an AI visibility audit</a>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Rewrite `app/page.js`**

Full replacement:

```jsx
import Image from 'next/image';
import { buildMetadata } from '../lib/meta';
import { SERVICES } from '../lib/services';
import { INSIGHTS } from '../lib/insights';

export const metadata = buildMetadata({
  title: 'AI Driven Internet Marketing Consultants',
  description:
    'Gobiya is a team of AI driven internet marketing consultants in Los Angeles: SEO built into web development and web design, algorithm recovery, and AI visibility that gets brands cited in ChatGPT, Perplexity, and AI Overviews.',
  path: '/',
});

const ARROW = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const PILLARS = [
  {
    title: 'Findable',
    desc: 'Technical SEO and site architecture a crawler can read on the first pass.',
    d: 'M24 6a18 18 0 1 0 0 36 18 18 0 0 0 0-36M24 14v20M14 24h20',
  },
  {
    title: 'Credible',
    desc: 'Authority signals — links, citations, entities — that hold up to scrutiny.',
    d: 'M24 5 40 11v12c0 10-7 17-16 20C15 40 8 33 8 23V11ZM17 24l5 5 9-10',
  },
  {
    title: 'Cited',
    desc: 'Content structured so AI answer engines quote you, not a competitor.',
    d: 'M12 16h8v8c0 5-3 8-8 8M28 16h8v8c0 5-3 8-8 8',
  },
  {
    title: 'Chosen',
    desc: 'Landing experiences and offers tuned until traffic becomes booked business.',
    d: 'M24 10a14 14 0 1 0 0 28 14 14 0 0 0 0-28M24 18a6 6 0 1 0 0 12 6 6 0 0 0 0-12',
  },
];

const CLIENT_LOGOS = [
  { src: '/assets/img/americanlivescan.webp', alt: 'American Livescan' },
  { src: '/assets/img/smilecenter.webp', alt: 'Smile Center Dentistry' },
  { src: '/assets/img/totalcapital.webp', alt: 'Total Capital' },
  { src: '/assets/img/remodelmepros.webp', alt: 'Remodel Me Pros' },
  { src: '/assets/img/safetycentric-logo.png', alt: 'SafetyCentric' },
  { src: '/assets/img/client-5.webp', alt: 'Gobiya client' },
];

export default function Home() {
  const services = Object.values(SERVICES);
  const latest = [...INSIGHTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <main id="top">

      {/* ══ 1. Hero ══ */}
      <section className="hero" id="hero">
        <div className="container">
          <p className="eyebrow hero__eyebrow" data-reveal><span className="eyebrow__dot"></span>Internet Marketing Consulting · Los Angeles · Est. 2010</p>
          <h1 className="hero__title" data-split>
            AI-driven internet marketing consultants for the <em className="hero__title-accent">era of answers.</em>
          </h1>
          <div className="hero__row">
            <p className="hero__sub" data-reveal>Gobiya&apos;s AI driven internet marketing consultants make companies findable in Google and cited by ChatGPT, Perplexity, and AI Overviews — technical SEO, algorithm recovery, and SEO built into web development.</p>
            <div className="hero__ctas" data-reveal>
              <a href="/onboarding" className="btn btn--solid">Get an AI visibility audit</a>
              <a href="/ai-visibility" className="btn btn--ghost">How AI visibility works</a>
            </div>
          </div>
        </div>
        <div className="hero__media" data-parallax>
          <Image
            src="/assets/img/team-desk-huddle.webp"
            alt="A team of five reviewing code and a strategy whiteboard around a shared desk"
            width={1800}
            height={1005}
            sizes="100vw"
            priority
            fetchPriority="high"
          />
        </div>
      </section>

      {/* ══ 2. Stats band ══ */}
      <section className="stats-band" aria-label="Results and credentials">
        <div className="container">
          <i className="stats-band__rule" data-rule></i>
          <ul className="stats-band__grid">
            {/* Server-rendered text is the FINAL value — no-JS and reduced-motion
                users see real numbers; Motion.js animates 0→value on capable clients. */}
            <li><span className="stat__value"><i data-count="16" data-plain>16</i></span><span className="stat__label">Years in practice</span></li>
            <li><span className="stat__value">A+</span><span className="stat__label">BBB rating</span></li>
            <li><span className="stat__value"><i data-count="5.7" data-decimals="1">5.7</i>x</span><span className="stat__label">Google Ads ROAS</span></li>
            <li><span className="stat__value"><i data-count="213" data-plain>213</i>K</span><span className="stat__label">Monthly impressions, one client</span></li>
            <li><span className="stat__value"><i data-count="61" data-plain>61</i>%</span><span className="stat__label">Cost-per-lead reduction</span></li>
            <li><span className="stat__value">+<i data-count="47" data-plain>47</i></span><span className="stat__label">Page-one keywords after rebuild</span></li>
          </ul>
          <i className="stats-band__rule" data-rule></i>
        </div>
      </section>

      {/* ══ 3. Services grid ══ */}
      <section className="section section--tint" id="services">
        <div className="container">
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Consulting</p>
          <h2 className="statement statement--small" data-split style={{ textAlign: 'left' }}>Every discipline a search-first company needs, under one mandate.</h2>
          <div className="svc-grid">
            {services.map((s) => (
              <a className="svc-card" href={`/services/${s.slug}`} key={s.slug} data-reveal>
                <span className="svc-card__tag">{s.pillar}</span>
                <h3 className="svc-card__title">{s.title}</h3>
                <p className="svc-card__desc">{s.blurb}</p>
                <span className="link-arrow">Explore{ARROW}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. AI Visibility feature (pinned scene) ══ */}
      <section className="offices section section--dark" id="ai-visibility-teaser" data-pin-scene>
        <div className="container">
          <p className="eyebrow eyebrow--light" data-reveal><span className="eyebrow__dot"></span>Where buyers ask first, now</p>
          <h2 className="offices__title" data-split>Search didn&apos;t disappear. It moved into a conversation.</h2>
          <ul className="offices__list">
            <li className="offices__row offices__row--3col" data-pin-row>
              <span className="offices__city">Google AI Overviews</span>
              <span className="offices__addr">Summarized answers above the fold, sourced from a handful of cited pages</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col" data-pin-row>
              <span className="offices__city">ChatGPT</span>
              <span className="offices__addr">Browses and cites live sources when asked for recommendations or comparisons</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col" data-pin-row>
              <span className="offices__city">Perplexity</span>
              <span className="offices__addr">Built entirely around citing sources — visibility here is binary: cited or invisible</span>
              <span className="offices__tag">Live</span>
            </li>
          </ul>
          <a href="/ai-visibility" className="link-arrow" data-reveal style={{ marginTop: '2.5rem' }}>See how AI visibility works{ARROW}</a>
        </div>
      </section>

      {/* ══ 5. Four pillars ══ */}
      <section className="pillars section">
        <div className="container">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>The mandate</p>
          <h2 className="statement statement--small" data-split>Make you the answer, not just a result.</h2>
          <div className="pillars__grid">
            {PILLARS.map((p) => (
              <div className="pillar" key={p.title} data-reveal>
                <svg className="pillar__glyph" viewBox="0 0 48 48" width="48" height="48" data-draw aria-hidden="true">
                  <path d={p.d} fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <h3 className="pillar__title">{p.title}</h3>
                <p className="pillar__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. Insights ══ */}
      <section className="section section--tint" id="insights-teaser">
        <div className="container">
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Latest insights</p>
          <div className="insights__grid">
            {latest.map((a) => (
              <a className="insights__card" href={`/insights/${a.slug}`} key={a.slug} data-reveal>
                <span className="insights__card-cat">{a.category}</span>
                <h3 className="insights__card-title">{a.title}</h3>
                <p className="insights__card-dek">{a.dek}</p>
                <span className="link-arrow">Read{ARROW}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. Client logo strip ══ */}
      <section className="logo-strip section" aria-label="Selected clients">
        <div className="container container--narrow portfolio__head">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Who we&apos;ve built for</p>
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((l, i) => (
              <span className="logo-strip__item" key={i}>
                <Image src={l.src} alt={i < CLIENT_LOGOS.length ? l.alt : ''} width={220} height={80} loading="lazy" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. CTA ══ */}
      <section className="cta section section--dark" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center eyebrow--light" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-split>Be the answer AI gives — not the link it skips.</h2>
          <div className="cta__actions" data-reveal>
            <a href="mailto:hello@gobiya.com" className="btn btn--solid btn--big">hello@gobiya.com</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--ghost-light btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
```

- [ ] **Step 4: Append new-block CSS to `app/globals.css`**

```css
/* ═══════════ utility topbar ═══════════ */
.topbar {
  background: var(--overlay);
  color: rgba(244, 247, 251, 0.85);
  font-size: 0.75rem;
  letter-spacing: 0.03em;
  overflow: hidden;
  max-height: 2.4rem;
  transition: max-height 0.4s var(--expo-out);
}
.nav.is-scrolled .topbar { max-height: 0; }
.topbar__inner {
  height: 2.4rem;
  padding-inline: var(--gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}
.topbar__links { display: flex; align-items: center; gap: 1.5rem; }
.topbar__links a:hover { color: #fff; }
.topbar__cta {
  color: #fff;
  font-weight: 600;
  border-left: 1px solid var(--border-light);
  padding-left: 1.5rem;
}
.topbar__cta:hover { color: var(--main); }
@media (max-width: 48rem) { .topbar__note { display: none; } }

/* nav wayfinding weight */
.nav__link { font-weight: 600; letter-spacing: 0.02em; }

/* ═══════════ stats band ═══════════ */
.stats-band { padding-block: clamp(2.5rem, 5vw, 4rem); }
.stats-band__rule { display: block; height: 1px; background: var(--border-strong); }
.stats-band__grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: clamp(1rem, 2.5vw, 2.5rem);
  padding-block: clamp(1.5rem, 3vw, 2.5rem);
}
.stats-band__grid li { display: flex; flex-direction: column; gap: 0.4rem; }
.stat__value {
  font-family: var(--font-heading);
  font-size: clamp(1.9rem, 3.4vw, 3rem);
  line-height: 1;
}
.stat__label {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--hint);
}
@media (max-width: 64rem) { .stats-band__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 40rem) { .stats-band__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }

/* ═══════════ services grid ═══════════ */
.svc-grid {
  margin-top: clamp(2.5rem, 5vw, 4rem);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
}
.svc-card {
  background: var(--bg);
  padding: clamp(1.5rem, 2.5vw, 2.25rem);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: background 0.3s var(--expo-out);
}
.svc-card:hover { background: var(--lightest); }
.svc-card__tag {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--main);
  margin-bottom: 0.9rem;
}
.svc-card__title {
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: clamp(1.15rem, 1.8vw, 1.4rem);
  line-height: 1.25;
  margin-bottom: 0.6rem;
}
.svc-card__desc { font-size: 0.875rem; line-height: 1.6; color: var(--hint); flex-grow: 1; margin-bottom: 1.25rem; }
@media (max-width: 64rem) { .svc-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 40rem) { .svc-grid { grid-template-columns: 1fr; } }

/* ═══════════ pillars ═══════════ */
.pillars__grid {
  margin-top: clamp(2.5rem, 5vw, 4rem);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1.5rem, 3vw, 3rem);
}
.pillar { text-align: left; }
.pillar__glyph { color: var(--darkest); margin-bottom: 1.1rem; }
.pillar__title { font-family: var(--font-heading); font-weight: 400; font-size: 1.35rem; margin-bottom: 0.5rem; }
.pillar__desc { font-size: 0.9rem; line-height: 1.65; color: var(--hint); }
@media (max-width: 64rem) { .pillars__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 40rem) { .pillars__grid { grid-template-columns: 1fr; } }

/* ═══════════ client logo strip ═══════════ */
.logo-strip__item { display: flex; align-items: center; }
.logo-strip__item img {
  width: auto;
  height: clamp(2.2rem, 4vw, 3.2rem);
  object-fit: contain;
  filter: grayscale(1);
  opacity: 0.65;
  transition: filter 0.4s, opacity 0.4s;
}
.logo-strip__item:hover img { filter: grayscale(0); opacity: 1; }

/* dark-ground ghost button */
.btn--ghost-light { border-color: rgba(244, 247, 251, 0.5); color: #f4f7fb; }

/* institutional hero scale — down from the 11rem editorial maximum */
.hero__title { font-size: clamp(3rem, 8.5vw, 8rem); }
```

(The `.hero__title` override sits after the original rule in the cascade; alternatively edit the original `clamp(3.4rem, 11.5vw, 11rem)` in place — either is fine, do not do both.)

Also delete the now-unused `.marquee__item` / `.marquee__item--serif` rules and the `.marquee__track i` rule (text marquee retired; `.marquee`/`.marquee__track` container rules stay — the logo strip reuses them). Delete the `.hero__scroll` block and its `@media` reference (element no longer rendered), and the `.hero__media-caption` block.

- [ ] **Step 5: Verify**

```bash
npm run build
```

Expected: pass. Dev-check `/`: topbar collapses on scroll; stats rules draw + numbers count; services grid shows all SERVICES entries with blurbs; AI band pins once and releases; pillars self-draw; client logos render grayscale→color on hover; CTA is a clean navy band. Mobile width 360px: grids collapse per media queries.

- [ ] **Step 6: Commit**

```bash
git add app/page.js components/Header.js app/globals.css lib/services.js
git commit -m "home: rebuild on institutional 8-block skeleton with utility bar and stats band"
```

---

### Task 5: Breadcrumbs + inner-template upgrades

**Files:**
- Create: `components/Breadcrumbs.js`
- Modify: `components/ServiceTemplate.js`, `components/OutcomeTemplate.js`, `components/IndustryTemplate.js`, `components/LocationTemplate.js`, `components/ArticleTemplate.js`, `app/globals.css` (crumbs + left hero + related CSS)

**Interfaces:**
- Consumes: `SERVICES` map (for the related block), palette tokens.
- Produces: `Breadcrumbs({ items: Array<{ label: string, href?: string }> })` — renders visible breadcrumb nav + `BreadcrumbList` JSON-LD. Last item has no `href`.

- [ ] **Step 1: Create `components/Breadcrumbs.js`**

```jsx
// Visible breadcrumb trail + BreadcrumbList structured data.
// items: [{ label, href }] — the current page is the last item (no href).

const BASE_URL = 'https://www.gobiya.com';

export default function Breadcrumbs({ items }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${BASE_URL}${item.href}` } : {}),
    })),
  };
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="crumbs__list">
        {items.map((item) => (
          <li key={item.label} className="crumbs__item">
            {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

- [ ] **Step 2: Add crumbs / left-hero / related CSS to `app/globals.css`**

```css
/* ═══════════ breadcrumbs ═══════════ */
.crumbs { margin-bottom: clamp(1.5rem, 3vw, 2.5rem); }
.crumbs__list { display: flex; flex-wrap: wrap; gap: 0.5rem; font-size: 0.75rem; letter-spacing: 0.04em; color: var(--hint); }
.crumbs__item + .crumbs__item::before { content: '/'; margin-right: 0.5rem; opacity: 0.5; }
.crumbs__item a:hover { color: var(--main); }
.crumbs__item [aria-current] { color: var(--darkest); }

/* ═══════════ left-aligned page hero ═══════════ */
.page-hero--left { text-align: left; }
.page-hero--left .statement { text-align: left; }
.page-hero--left .lede { margin-inline: 0; }
.page-hero--left .hero__ctas { justify-content: flex-start; }

/* ═══════════ related services ═══════════ */
.related__grid {
  margin-top: clamp(2rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
}
@media (max-width: 48rem) { .related__grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Upgrade `components/ServiceTemplate.js`**

Add imports:

```jsx
import Breadcrumbs from './Breadcrumbs';
import { SERVICES } from '../lib/services';
```

Replace the hero section (post-Task-3 state) with a left-aligned version:

```jsx
<section className="page-hero page-hero--left section">
  <div className="container container--narrow">
    <Breadcrumbs items={[
      { label: 'Home', href: '/' },
      { label: 'Consulting', href: '/services' },
      { label: service.title },
    ]} />
    <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>{service.pillar} &middot; {service.title}</p>
    <h1 className="statement" data-split style={{ textAlign: 'left' }}>{service.heroLines.join(' ')}</h1>
    <p className="lede" data-reveal dangerouslySetInnerHTML={{ __html: service.lede }} />
    <div className="hero__ctas" data-reveal>
      <a href="/onboarding" className="btn btn--solid">Get a free audit</a>
      <a href="#included" className="btn btn--ghost">What&apos;s included</a>
    </div>
  </div>
</section>
```

Then insert a Related block between the FAQ and CTA sections:

```jsx
{/* ══════════ Related consulting ══════════ */}
<section className="related section section--tint" id="related">
  <div className="container">
    <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Related consulting</p>
    <div className="related__grid">
      {(() => {
        const siblings = Object.values(SERVICES).filter((s) => s.slug !== service.slug);
        const related = [
          ...siblings.filter((s) => s.pillar === service.pillar),
          ...siblings.filter((s) => s.pillar !== service.pillar),
        ].slice(0, 3);
        return related.map((s) => (
          <a className="svc-card" href={`/services/${s.slug}`} key={s.slug} data-reveal>
            <span className="svc-card__tag">{s.pillar}</span>
            <h3 className="svc-card__title">{s.title}</h3>
            <p className="svc-card__desc">{s.blurb}</p>
          </a>
        ));
      })()}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Add breadcrumbs + left hero to the other four templates**

Same pattern as Step 3 (import `Breadcrumbs`, add `page-hero--left` + `<Breadcrumbs …/>` at the top of the hero container, left-align the `data-split` h1). Trails:

- `OutcomeTemplate.js`: `[{ label: 'Home', href: '/' }, { label: 'Outcomes', href: '/outcomes' }, { label: outcome.title }]`
- `IndustryTemplate.js`: `[{ label: 'Home', href: '/' }, { label: 'Industries', href: '/industries' }, { label: industry.title }]`
- `LocationTemplate.js`: `[{ label: 'Home', href: '/' }, { label: 'Local Service', href: '/industries/local-service' }, { label: location.city }]`
- `ArticleTemplate.js`: `[{ label: 'Home', href: '/' }, { label: 'Insights', href: '/insights' }, { label: article.title }]` — ArticleTemplate's hero stays centered (long titles); add only the `<Breadcrumbs>` component, not `page-hero--left`.

Check each template's prop name for the title field before writing the trail (`outcome.title` / `industry.title` / `location.city` / `article.title` — confirm against the actual destructured prop in each file and adjust the accessor if it differs).

- [ ] **Step 5: Verify**

```bash
npm run build
```

Dev-check `/services/seo-discoverability`: breadcrumb trail renders; hero left-aligned; related block shows 3 sibling services. View source: one `BreadcrumbList` JSON-LD block. Repeat spot-check on one outcome, one industry, one article.

- [ ] **Step 6: Commit**

```bash
git add components/Breadcrumbs.js components/*Template.js app/globals.css
git commit -m "templates: breadcrumbs with BreadcrumbList schema, left heroes, related-services block"
```

---

### Task 6: Services consolidation 11 → 8 (merges, redirects, link sweep)

**Files:**
- Modify: `lib/services.js`, `lib/nav.js:22-36`, `next.config.mjs` (redirects), `public/llms.txt:13`, plus every file the link sweep finds (`app/services/page.js`, `components/SiteSchema.js`, `lib/industries.js`, `lib/insights.js`)
- Delete: `app/services/content-strategy/`, `app/services/digital-pr/`, `app/services/ai-video-ads/`

**Interfaces:**
- Consumes: `blurb` fields from Task 4.
- Produces: `SERVICES` with exactly 8 keys (sitemap, homepage grid, related blocks, and services hub all derive from `Object.keys(SERVICES)` automatically).

- [ ] **Step 1: Merge `content-strategy` into `seo-web-copywriting`**

In the `seo-web-copywriting` entry change these fields:

```js
title: 'SEO Copywriting & Content Strategy',
blurb: 'Pages written to rank and convert — planned by an editorial strategy built on real demand.',
metaDescription:
  'SEO copywriting and content strategy from Gobiya: core site pages written to rank in Google and convert, planned around real search demand and AI citation potential.',
lede: 'Most SEO copy reads like it was written for an algorithm, and most content calendars are built around habit instead of demand. We do both jobs as one: an editorial strategy built on what buyers actually search, executed as pages that rank and genuinely read well.',
```

Append to its `capabilities` array (copied verbatim from the `content-strategy` entry): the `'Topic & gap analysis'` item and the `'Content hub planning'` item.

Append to its `faqs` array (copied verbatim from `content-strategy`): the `'How much content do we actually need to publish?'` item and the `'How do you decide what topics are worth covering?'` item. (Skip `content-strategy`'s other FAQ — it links to `seo-web-copywriting`, which would now self-link.)

Then delete the entire `'content-strategy'` entry.

- [ ] **Step 2: Merge `digital-pr` into `authority-link-building`**

In the `authority-link-building` entry change:

```js
title: 'Digital PR & Link Building',
blurb: 'Earned coverage and editorial links that build the trust AI systems check first.',
metaDescription:
  'Digital PR and link building from Gobiya: earned press coverage and white-hat editorial outreach that build the domain trust search engines and AI systems use to decide who to cite.',
lede: 'Search engines and AI knowledge graphs use backlinks, citations, and coverage as votes of confidence. We earn them the only durable way — real stories pitched to real publications, manual editorial outreach, and cleanup of the <a href="/industries/local-service">citation inconsistencies</a> that quietly undermine local trust.',
```

Append to `capabilities` (verbatim from `digital-pr`): the `'Data & survey PR'` item and the `'Journalist relationship building'` item.

Append to `faqs` (verbatim from `digital-pr`): the `'How is this different from link building?'` item and the `'How long does it take to see results from a PR campaign?'` item.

Delete the entire `'digital-pr'` entry.

- [ ] **Step 3: Merge `ai-video-ads` into `google-ads-ppc`**

In the `google-ads-ppc` entry change:

```js
title: 'Google Ads, PPC & AI Creative',
blurb: 'Campaigns rebuilt around cost per lead — with ad creative produced at the speed they burn through it.',
metaDescription:
  'Google Ads management and AI ad creative from Gobiya: campaign structure, negative keywords, landing pages, and fast-iteration video creative, all accountable to cost per lead.',
```

Append to `capabilities` (verbatim from `ai-video-ads`): the `'AI-generated video assets'` item and the `'Creative variant testing'` item. (Skip `'Paid media integration'` — it links to `google-ads-ppc`, now a self-link, and `'Platform-native formats'` — 6 capabilities is the grid max.)

Append to `faqs` (verbatim from `ai-video-ads`): the `'Does AI-generated video actually perform as well as traditionally produced ads?'` item.

Delete the entire `'ai-video-ads'` entry.

- [ ] **Step 4: Delete the three page routes**

```bash
git rm -r app/services/content-strategy app/services/digital-pr app/services/ai-video-ads
```

- [ ] **Step 5: Redirects in `next.config.mjs`**

Add to the `redirects()` array:

```js
// Services consolidation (2026-07): three overlapping pages merged into
// the survivor that owns the stronger commercial query.
{ source: '/services/content-strategy', destination: '/services/seo-web-copywriting', permanent: true },
{ source: '/services/digital-pr', destination: '/services/authority-link-building', permanent: true },
{ source: '/services/ai-video-ads', destination: '/services/google-ads-ppc', permanent: true },
```

And retarget the existing entry at line 70 to avoid a redirect chain:

```js
{ source: '/guides/topic-cluster-architecture', destination: '/services/seo-web-copywriting', permanent: true },
```

- [ ] **Step 6: Update `lib/nav.js`**

In the Consulting groups: Creativity group drops the `Content Strategy` and `AI Video & Ads` items and relabels `SEO & Web Copywriting` → `SEO Copywriting & Content Strategy`; Relations group drops `Digital PR & Media Outreach` and relabels `Authority & Link Building` → `Digital PR & Link Building`; Performance group relabels `Google Ads & PPC` → `Google Ads, PPC & AI Creative`.

- [ ] **Step 7: Sweep every remaining internal link to retired slugs**

```bash
grep -rn "services/content-strategy\|services/digital-pr\|services/ai-video-ads" app components lib public --include="*.js" --include="*.txt"
```

For each hit, rewrite the href to the survivor (`content-strategy` → `seo-web-copywriting`, `digital-pr` → `authority-link-building`, `ai-video-ads` → `google-ads-ppc`) and fix the anchor text to match the new page title where it reads oddly. Known hit locations: `lib/services.js` (ledes/FAQs), `lib/insights.js`, `lib/industries.js`, `app/services/page.js`, `components/SiteSchema.js`. Re-run the grep until it returns nothing.

Also open `app/services/page.js` and confirm the hub copy/description reflects 8 services (update its `description` meta text: replace `content strategy, digital PR` phrasing with `copywriting and content strategy, digital PR and link building`).

- [ ] **Step 8: Update `public/llms.txt`**

Line 11: relabel to `Digital PR & Link Building` with the same URL. Line 13: change the trailing description to `SEO, copywriting and content strategy, digital PR and link building, Google Ads and AI creative, CRO, web development, AI/LLM consulting`.

- [ ] **Step 9: Verify**

```bash
npm run build
grep -rn "services/content-strategy\|services/digital-pr\|services/ai-video-ads" app components lib public --include="*.js" --include="*.txt" | grep -v next.config
```

Expected: build passes (a stale reference would throw at build time in the deleted pages' absence); grep only matches `next.config.mjs` redirect entries — nothing else. Sitemap check: `Object.keys(SERVICES).length` is 8 (sitemap derives automatically).

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "seo: consolidate services 11->8 with 301s, focused keyword targets"
```

---

### Task 7: Verification pass + cleanup

**Files:**
- Delete: `app/brand-preview/`
- No other source changes expected — this task gates the release.

- [ ] **Step 1: Remove the brand preview route**

```bash
git rm -r app/brand-preview
```

- [ ] **Step 2: Full build + dead-reference sweep**

```bash
npm run build
grep -rn "SplitText\|ScrollReveal\|Ballpit\|logo-gobiya-red\|data-words" app components lib | grep -v "gsap/SplitText"
node -e "const p=require('./package.json'); if (p.dependencies.three) throw new Error('three still present'); console.log('deps clean')"
```

Expected: build passes; grep empty; `deps clean`.

- [ ] **Step 3: Redirect tests**

```bash
npm run start &
sleep 5
for u in /services/content-strategy /services/digital-pr /services/ai-video-ads /guides/topic-cluster-architecture; do
  curl -s -o /dev/null -w "%{http_code} %{redirect_url} $u\n" "http://localhost:3000$u"
done
```

Expected: each line starts `308` with the survivor URL (Next emits 308 for permanent redirects — acceptable per spec's "301" intent; both are permanent).

- [ ] **Step 4: Lighthouse gates (mobile) on `/`, one service page, one article**

With `npm run start` still running:

```bash
npx lighthouse http://localhost:3000/ --only-categories=performance,seo --form-factor=mobile --screenEmulation.mobile --chrome-flags="--headless" --output=json --output-path=./lh-home.json
node -e "const r=require('./lh-home.json'); const a=r.audits; console.log('perf', r.categories.performance.score*100, 'seo', r.categories.seo.score*100, 'LCP', a['largest-contentful-paint'].displayValue, 'CLS', a['cumulative-layout-shift'].displayValue)"
```

Repeat for `/services/seo-discoverability` and one `/insights/<slug>` page. **Gates: performance ≥ 95, LCP < 2.0s, CLS < 0.05.** If a gate fails: identify the failing audit in the JSON, fix (typical suspects: hero image priority, layout shift from the topbar — ensure `max-height` initial state matches server render), and re-run. Do not proceed with failing gates. Delete the `lh-*.json` scratch files afterward.

- [ ] **Step 5: Reduced-motion and breakpoint manual checks**

In DevTools:
1. Rendering → Emulate `prefers-reduced-motion: reduce` → reload `/`: all content visible, no pinned scene, no count-ups (static text is the pre-JS content — counters show `0`? **No:** with reduced motion Motion.js early-returns, so `data-count` elements keep their server-rendered text. Confirm the server-rendered text is the FINAL value, not `0` — if page.js renders `>0<` as placeholder, change each to render the target number as its text content, e.g. `<i data-count="16" data-plain>16</i>`, so no-JS/reduced-motion users see real numbers. Apply this fix in `app/page.js` if not already done.)
2. Device toolbar at 360px, 768px, 1280px, 1920px on `/`, `/services/seo-discoverability`, `/insights`: no horizontal overflow, grids collapse correctly, topbar behaves.

- [ ] **Step 6: Schema validation**

View source on `/services/seo-discoverability` — copy the `BreadcrumbList` JSON-LD into https://validator.schema.org/ (or `npx structured-data-testing-tool` if offline): zero errors. Confirm existing Organization/FAQ schema from `SiteSchema.js` still renders.

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "chore: remove brand preview, verification pass for institutional redesign"
```
