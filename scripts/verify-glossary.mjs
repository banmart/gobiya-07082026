// One-off verification: every retired term URL must 30x to an anchor that
// actually exists in the destination page's HTML.
import { GLOSSARY } from '../lib/glossary.js';
import { HUB_SLUGS, hubForTerm } from '../lib/glossaryHubs.js';

const BASE = process.env.BASE || 'http://localhost:3000';

const pages = new Map();
for (const slug of HUB_SLUGS) {
  const res = await fetch(`${BASE}/glossary/${slug}`);
  pages.set(slug, { status: res.status, html: await res.text() });
}

let bad = 0;
for (const entry of GLOSSARY) {
  const hub = hubForTerm(entry.slug);
  const res = await fetch(`${BASE}/glossary/${entry.slug}`, { redirect: 'manual' });
  const loc = res.headers.get('location') || '';
  const expected = `/glossary/${hub.slug}#${entry.slug}`;

  const redirectOk = (res.status === 301 || res.status === 308) && loc.endsWith(expected);
  const page = pages.get(hub.slug);
  const anchorOk = page.html.includes(`id="${entry.slug}"`);

  if (!redirectOk || !anchorOk) {
    bad++;
    console.log(`FAIL ${entry.slug}`);
    if (!redirectOk) console.log(`   redirect: ${res.status} -> ${loc || '(none)'}  expected ${expected}`);
    if (!anchorOk) console.log(`   anchor id="${entry.slug}" missing from /glossary/${hub.slug}`);
  }
}

console.log('');
for (const [slug, p] of pages) {
  const words = p.html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ')
    .split(/\s+/).filter(Boolean).length;
  console.log(`${p.status}  ${String(words).padStart(5)} words  /glossary/${slug}`);
}
console.log('');
console.log(bad === 0 ? `OK: all ${GLOSSARY.length} terms redirect to a live anchor` : `${bad} FAILURES`);
process.exit(bad === 0 ? 0 : 1);
