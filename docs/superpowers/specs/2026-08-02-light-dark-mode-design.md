# Light / Dark Mode — Design

**Date:** 2026-08-02
**Status:** Approved

## Goal

Every public marketing page renders correctly in both a light and a dark theme,
switchable from a control in the site header. Dark mode is not a filter or an
inversion — it is a second set of values for the same design system.

## Scope

**In:** every public page — home, services, areas-we-serve, insights, glossary,
work, tools, pricing, about, contact, free-site-scan, lp, legal. Everything
styled by `app/globals.css` and by inline styles in `components/` and `app/`.

**Out:** the logged-in dashboard (`app/dashboard.css`) and the auth screens
(`app/auth.css`). They carry their own color system and are a separate pass. The
token layer this spec introduces is what they would adopt when that happens.

**Out:** email HTML built inside `app/api/*/route.js`. Mail clients do not see
our stylesheet, and those colors must stay literal.

## The problem this has to solve

`app/globals.css` opens with a `:root` palette block, but 608 hex literals and
147 rgba values appear *after* it, hardcoded into rules. Redefining the palette
alone darkens almost nothing. The literals have to become tokens first.

There is also no theming plumbing anywhere in the repo today: no
`prefers-color-scheme`, no `data-theme`, no `color-scheme`.

## Architecture

### 1. Theme state

`data-theme="light" | "dark"` on `<html>`. One attribute, set in three places:

- **Before paint.** An inline script in `app/layout.js` `<head>` reads
  `localStorage['gobiya-theme']`; absent that, `matchMedia('(prefers-color-scheme: dark)')`.
  It must be inline and synchronous — a `useEffect` would flash the wrong theme.
- **On toggle.** `components/ThemeToggle.js` writes the attribute and persists
  the choice.
- **On OS change.** While no explicit choice is stored, a `matchMedia` listener
  keeps following the system.

Storage holds `'light'`, `'dark'`, or nothing. Nothing means "follow the OS" —
that is the first-visit state, and it is why we store a choice rather than a
resolved theme.

`<meta name="color-scheme" content="light dark">` ships in the same head so
scrollbars, form controls, and the browser's own chrome follow the theme.

### 2. Token layer

`:root` gains a semantic layer above the existing palette:

| Token | Role |
|---|---|
| `--surface` | page background |
| `--surface-raised` | cards, panels, popovers |
| `--surface-sunken` | tinted section bands |
| `--surface-inverse` | deliberately dark panels, both themes |
| `--text` | body copy |
| `--text-muted` | secondary copy, captions |
| `--text-on-inverse` | copy on `--surface-inverse` |
| `--border` / `--border-strong` | hairlines and emphasized rules |
| `--link` | accent used as text |

`[data-theme="dark"]` redefines these. Rules reference tokens, never literals.

Existing tokens (`--bg`, `--darkest`, `--main`, …) stay and are re-pointed, so
no rule that already uses them needs to change.

### 3. Dark palette

Navy-based rather than black, to hold the institutional identity:

- surface `#0B1220`, raised `#111C2E`, sunken `#16233A`
- text `#E6ECF5`, muted `#A8B6CA`
- borders `rgba(255, 255, 255, 0.12)`, strong `rgba(255, 255, 255, 0.28)`
- gold `#F5B83D` is unchanged — it already reads on both
- burgundy `#8B263E` fails contrast as text on a dark surface, so `--link`
  lifts to a brighter carmine in dark mode. Button *fills* keep the brand value,
  because there the burgundy is the background and white sits on it.

### 4. What stays fixed

Some colors are not theme-dependent and inverting them is a bug:

- the logo
- anything painted over a photo or video — overlay scrims, gradient washes, and
  the text sitting on them
- `.section--dark`, which is already navy. In dark mode it becomes a *raised*
  panel, slightly lighter than the page. Inverting it to white would make those
  bands the brightest thing on the page.

### 5. Interaction with the accessibility widget

`AccessibilityControls` already sets `a11y-high-contrast`, `a11y-grayscale`, and
text-size classes on `<html>`. Those are orthogonal to theme and must keep
working in both. High contrast wins where the two overlap: its rules are written
against the same tokens, so it layers on top rather than fighting.

The theme control does **not** move into that panel. It belongs in the header
where people look for it.

### 6. Switcher

A sun/moon icon button in `nav__right`, beside the existing account icon,
styled to match `nav__user-btn`. `aria-pressed` reflects the active theme and
the label announces the action ("Switch to dark theme"), not the state.

## Verification

- `next build` clean
- 134 unit tests still green
- Both themes checked on a representative page from each template family:
  home, a service page, an area page, an insight, the glossary, a tool, the
  free-site-scan flow, and a legal page
- High-contrast mode still legible in both themes
- No flash of the wrong theme on a hard reload in either setting

## Non-goals

- Theming the dashboard or auth screens
- Per-page or per-section theme overrides
- Persisting the choice server-side or across devices
