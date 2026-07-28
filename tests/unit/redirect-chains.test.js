import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

// next.config.mjs exports an async function in some Next versions, so parse the
// redirect rules out of the source text instead of importing and invoking it.
const source = readFileSync(path.resolve(process.cwd(), 'next.config.mjs'), 'utf8');

const rules = [...source.matchAll(/source:\s*'([^']+)',\s*destination:\s*'([^']+)'/g)].map(
  (m) => ({ source: m[1], destination: m[2] })
);

describe('redirect rules', () => {
  it('finds the redirect table', () => {
    expect(rules.length).toBeGreaterThan(100);
  });

  it('never points a redirect at a URL that is itself redirected', () => {
    const sources = new Set(rules.map((r) => r.source));
    const chained = rules.filter((r) => sources.has(r.destination));
    expect(chained.map((r) => `${r.source} -> ${r.destination}`)).toEqual([]);
  });
});
