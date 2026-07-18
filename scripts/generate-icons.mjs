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
