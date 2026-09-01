// Verifies the de-templating actually happened: no two of the 25 commercial
// pages share a structural signature.
//
// The signature is the ordered list of the page's own layout class names —
// site chrome (header, footer, cookie bar) is excluded, since every page
// legitimately shares that.
const BASE = process.env.BASE || 'http://localhost:3000';

const PAGES = [
  'services/technical-seo', 'services/geo', 'services/content-marketing',
  'services/link-building', 'services/ppc', 'services/cro',
  'services/web-ux', 'services/web-dev', 'services/ai-consulting',
  'van-nuys-seo', 'los-angeles-seo', 'glendale-seo', 'studio-city-seo',
  'solutions/traffic-dropped-rankings-flat', 'solutions/not-showing-up-in-chatgpt',
  'solutions/site-is-slow-losing-leads',
  'work/smile-center-dentistry', 'work/american-livescan', 'work/safetycentric',
  'work/quickpass-aid', 'work/remodel-me-pros', 'work/the-healing-metta',
  'work/total-capital', 'work/dg-plumbing', 'work/mtw',
];

// Layout namespaces introduced by the de-templating.
const PREFIXES = /\b(svc|loc|sol|case|ghub)-[a-z]+__[A-Za-z]+/g;

const sigs = new Map();
for (const p of PAGES) {
  const html = await fetch(`${BASE}/${p}`).then((r) => r.text());
  const classes = [...new Set(html.match(PREFIXES) || [])].sort();
  sigs.set(p, classes);
}

let fail = 0;
const seen = new Map();
for (const [p, classes] of sigs) {
  const key = classes.join('|');
  if (!classes.length) {
    console.log(`EMPTY  ${p} — no layout classes found`);
    fail++;
    continue;
  }
  if (seen.has(key)) {
    console.log(`DUPLICATE  ${p} shares its structure with ${seen.get(key)}`);
    fail++;
  }
  seen.set(key, p);
}

// Also check pairwise overlap: two pages could differ by one class and still
// be essentially the same layout.
const entries = [...sigs.entries()];
for (let i = 0; i < entries.length; i++) {
  for (let j = i + 1; j < entries.length; j++) {
    const [pa, a] = entries[i];
    const [pb, b] = entries[j];
    const shared = a.filter((c) => b.includes(c)).length;
    const overlap = shared / Math.min(a.length, b.length);
    if (overlap > 0.6) {
      console.log(`SIMILAR  ${pa} and ${pb} share ${Math.round(overlap * 100)}% of layout classes`);
      fail++;
    }
  }
}

console.log('');
for (const [p, classes] of sigs) {
  console.log(String(classes.length).padStart(3), 'classes ', p);
}
console.log('');
console.log(fail === 0
  ? `OK: all ${PAGES.length} pages have a distinct layout signature`
  : `${fail} problems`);
process.exit(fail === 0 ? 0 : 1);
