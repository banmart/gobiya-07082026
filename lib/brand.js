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
