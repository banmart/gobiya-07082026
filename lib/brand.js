// Gobiya brand mark — hand-built SVG geometry, no raster or generated art.
// A frame/viewfinder device: two opposing corner brackets, square-cornered
// to match the site's own design language (hairline rules, square buttons,
// square cards), with a small 4-point sparkle centered in the open middle —
// the one explicit "AI" signal, carmine accent, small only, never a large fill.
// Pure JS (no JSX) so scripts/generate-icons.mjs can import it under Node.

export const BRAND_NAVY = '#142f52';
export const BRAND_PAPER = '#f4f7fb';
export const BRAND_CARMINE = '#c8102e';

export function markInner(stroke = BRAND_NAVY, accent = BRAND_CARMINE) {
  return `<rect x="8" y="8" width="7" height="15" fill="${stroke}"/>
<rect x="8" y="8" width="15" height="7" fill="${stroke}"/>
<rect x="33" y="25" width="7" height="15" fill="${stroke}"/>
<rect x="25" y="33" width="15" height="7" fill="${stroke}"/>
<path d="M24,17 L25.8,22.2 L31,24 L25.8,25.8 L24,31 L22.2,25.8 L17,24 L22.2,22.2 Z" fill="${accent}"/>`;
}

export function markSvg({ stroke = BRAND_NAVY, accent = BRAND_CARMINE, size = 48 } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 48 48" fill="none">${markInner(stroke, accent)}</svg>`;
}
