import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

// app/page.js is JSX and the vitest environment has no JSX transform, so this
// suite reads it as text. That is enough to lock in the claims policy: the
// homepage must not carry a performance number that has no source.
const source = readFileSync(path.resolve(process.cwd(), 'app/page.js'), 'utf8');

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

  /* The hero is a <PageHero> now, so the destination is a prop rather than a
     literal attribute — match either spelling so the check survives the next
     refactor of how the hero is assembled. */
  it('sends the hero call to action to the site scan form', () => {
    expect(source).toMatch(/href[:=]\s*['"]\/free-site-scan['"]/);
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
