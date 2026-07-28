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

  it('reads its statistics from lib/searchWins', () => {
    expect(source).toContain("from '../lib/searchWins'");
    expect(source).toContain('SEARCH_WINS.asOf');
  });

  it('sends the hero call to action to the site scan form', () => {
    expect(source).toContain('href="/free-site-scan"');
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
