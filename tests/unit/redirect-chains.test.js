import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { GLOSSARY } from '../../lib/glossary.js';
import { termRedirects } from '../../lib/glossaryHubs.js';

// next.config.mjs exports an async function in some Next versions, so parse the
// redirect rules out of the source text instead of importing and invoking it.
const source = readFileSync(path.resolve(process.cwd(), 'next.config.mjs'), 'utf8');

const literalRules = [
  ...source.matchAll(/source:\s*'([^']+)',\s*destination:\s*'([^']+)'/g),
].map((m) => ({ source: m[1], destination: m[2] }));

// The glossary term redirects are spread into the table from a generator rather
// than written out as literals, so the regex above cannot see them. Include
// them explicitly or the chain guarantee below would silently skip 77 rules.
const generatedRules = termRedirects(GLOSSARY.map((entry) => entry.slug));

const rules = [...literalRules, ...generatedRules];

describe('redirect rules', () => {
  it('finds the redirect table', () => {
    expect(rules.length).toBeGreaterThan(100);
  });

  it('never points a redirect at a URL that is itself redirected', () => {
    const sources = new Set(rules.map((r) => r.source));
    // Anchored destinations chain on their path, not the full URL.
    const chained = rules.filter((r) => sources.has(r.destination.split('#')[0]));
    expect(chained.map((r) => `${r.source} -> ${r.destination}`)).toEqual([]);
  });
});
