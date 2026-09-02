import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

// app/page.js is JSX and the vitest environment has no JSX transform, so this
// suite reads it as text. That is enough to lock in the claims policy: the
// homepage must not carry a performance number that has no source.
//
// Comments are stripped first. A comment naming a claim that was removed — and
// saying why, so it does not come back — is exactly what should be there, and
// asserting on raw text would forbid writing one.
const raw = readFileSync(path.resolve(process.cwd(), 'app/page.js'), 'utf8');
const source = raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

describe('homepage claims', () => {
  it('drops the unbacked Top 1% claim', () => {
    expect(source).not.toContain('Top 1%');
  });

  it('drops the filler goal stat', () => {
    expect(source).not.toContain('Goal: Scale Your Business');
  });

  it('drops the unsourced scan count', () => {
    expect(source).not.toContain('SEO &amp; AI Scans');
  });

  /* The live stats band went out with the redesign, so there is no longer a
     searchWins import to check. The policy it enforced still holds: any
     performance number on this page has to come from lib/searchWins, which
     carries the source and the as-of date. Either the import is there and
     stamps the date, or there is no such number on the page at all. */
  it('sources any performance number from lib/searchWins', () => {
    const readsSearchWins = source.includes("from '../lib/searchWins'");
    if (readsSearchWins) {
      expect(source).toContain('SEARCH_WINS.asOf');
    } else {
      expect(source).not.toContain('SEARCH_WINS');
    }
  });

  /* The hero owns its own call to action now: app/page.js renders
     <HomeSplitHero /> and the link lives inside that component, so reading
     app/page.js alone can no longer see it. Follow the hero to wherever it is
     assembled rather than asserting on the page that mounts it. */
  it('sends the hero call to action to the site scan form', () => {
    const hero = readFileSync(
      path.resolve(process.cwd(), 'components/HomeSplitHero.js'),
      'utf8'
    );
    expect(hero).toMatch(/href[:=]\s*['"]\/free-site-scan['"]/);
  });

  it('mounts that hero on the homepage', () => {
    expect(source).toContain('<HomeSplitHero');
  });
});

describe('homepage FAQ', () => {
  it('renders FAQPage schema', () => {
    expect(source).toContain("'@type': 'FAQPage'");
  });

  it('renders answers as static markup, not an accordion', () => {
    expect(source).toContain('HOMEPAGE_FAQ.map');
    expect(source).not.toContain('useState');
  });
});
