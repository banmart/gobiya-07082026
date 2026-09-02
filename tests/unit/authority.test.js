import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import {
  CAREER_START_YEAR,
  FOUNDED_YEAR,
  LLC_YEAR,
  yearsExperience,
  yearsInBusiness,
  credentials,
  personSchema,
} from '../../lib/authority.js';

describe('authority facts', () => {
  it('holds the facts Steve confirmed', () => {
    expect(CAREER_START_YEAR).toBe(1996);
    expect(FOUNDED_YEAR).toBe(2009);
    expect(LLC_YEAR).toBe(2012);
  });

  it('derives 30 years of experience as of 2026', () => {
    expect(yearsExperience(new Date('2026-06-01'))).toBe(30);
    expect(yearsInBusiness(new Date('2026-06-01'))).toBe(17);
  });

  // The point of deriving rather than hardcoding: the figure must age.
  it('ages the experience figure on its own', () => {
    expect(yearsExperience(new Date('2027-06-01'))).toBe(31);
  });

  it('builds a Person schema carrying the derived figure', () => {
    const p = personSchema(new Date('2026-06-01'));
    expect(p.description).toContain('30 years');
    expect(p.knowsAbout.length).toBeGreaterThan(0);
    expect(p['@id']).toBe('https://www.gobiya.com/about/steve-martin#person');
  });

  it('states no credential it cannot back up', () => {
    const text = JSON.stringify(credentials(new Date('2026-06-01')));
    // No invented certifications, awards or partner badges.
    expect(text).not.toMatch(/certifi|award|accredit|partner of the year/i);
  });
});

// Guards the defect this module exists to fix: two numbers, on two pages,
// disagreeing about the same fact.
describe('site-wide consistency', () => {
  const roots = ['app', 'components', 'lib'];

  function walk(dir, out = []) {
    for (const name of readdirSync(dir)) {
      const full = path.join(dir, name);
      if (statSync(full).isDirectory()) walk(full, out);
      else if (/\.(js|jsx)$/.test(name)) out.push(full);
    }
    return out;
  }

  const files = roots.flatMap((r) => walk(path.resolve(process.cwd(), r)));

  // authority.js is the one file allowed to name these figures — it is where
  // they are defined, and its comments quote the wrong values it was written
  // to eliminate.
  const AUTHORITY = path.join('lib', 'authority.js');

  // seoMyths.js says Google dropped the meta keywords tag "over fifteen years
  // ago". That is a claim about Google's history, not about Gobiya's
  // experience, and is correct as written.
  const MYTHS = path.join('lib', 'seoMyths.js');

  // Comments legitimately quote the wrong values, to record what was fixed and
  // stop it coming back. Only shipped strings are checked.
  function stripComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  }

  const sources = files
    .filter((f) => !f.endsWith(AUTHORITY))
    .map((f) => ({ f, src: stripComments(readFileSync(f, 'utf8')) }));

  it('claims no founding year other than 2009', () => {
    // "since 2010" appeared in four files against "since 2009" everywhere else.
    const offenders = sources
      .filter(({ src }) => /since\s+(19\d\d|20(?!09)\d\d)/i.test(src))
      .map(({ f, src }) => {
        const m = src.match(/since\s+(19\d\d|20(?!09)\d\d)/i);
        return `${path.relative(process.cwd(), f)}: "${m[0]}"`;
      })
      // 1996 is the career start and a legitimate thing to say "since" about.
      .filter((s) => !s.includes('1996'));
    expect(offenders).toEqual([]);
  });

  it('states no hardcoded years-of-experience figure', () => {
    const offenders = sources
      .filter(({ f }) => !f.endsWith(MYTHS))
      .filter(({ src }) => /(thirty|fifteen|twenty)\s+years/i.test(src))
      .map(({ f, src }) => {
        const m = src.match(/(thirty|fifteen|twenty)\s+years/i);
        return `${path.relative(process.cwd(), f)}: "${m[0]}"`;
      });
    expect(offenders).toEqual([]);
  });

  /* The word-form check above missed the digit form, and five files drifted
     underneath it: "15+ Years Experience", "15+ Years of Proven Results",
     "16 Years of Getting LA Businesses Found", "refined over 16 years", and
     three "16 years" claims in the Studio City copy — all against a founding
     date of 2009 that several of the same sentences also stated.

     Only 10–49 is banned. Content legitimately talks about short spans — the
     6–12 month AI citation freshness window, "2–3 years" of evergreen SEO
     content, "first 3 years" of patient value — and none of those is a claim
     about how long Gobiya has existed. A tenure figure is always in the teens
     or above, so the range separates the two cleanly without an allowlist that
     would need maintaining. */
  it('states no hardcoded tenure figure in digits either', () => {
    const DIGITS = /\b([1-4]\d)\+?\s*years\b/i;
    const offenders = sources
      .filter(({ f }) => !f.endsWith(MYTHS))
      .filter(({ src }) => DIGITS.test(src))
      .map(({ f, src }) => {
        const m = src.match(DIGITS);
        return `${path.relative(process.cwd(), f)}: "${m[0]}"`;
      });
    expect(offenders).toEqual([]);
  });
});
