import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { SERVICES_FLAT } from '../../lib/servicesFlat.js';
import { SERVICE_SLUGS, getService, keywordFromSlug } from '../../lib/serviceIndex.js';

// buildMetadata in lib/meta.js appends ' — Gobiya' (9 chars) unless the title
// already contains the brand. Titles must fit Google's ~60 char display budget
// including that suffix.
const SUFFIX = ' — Gobiya';
const rendered = (t) => (t.toLowerCase().includes('gobiya') ? t : t + SUFFIX);

// Keywords contain regex metacharacters ('C++'-style slugs would break a bare
// interpolation), so escape before building a pattern from one.
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

describe('service page metadata', () => {
  it('keeps every rendered title within 60 characters', () => {
    for (const slug of SERVICE_SLUGS) {
      const t = getService(slug).metaTitle;
      expect(rendered(t).length, `${slug}: ${rendered(t)}`).toBeLessThanOrEqual(60);
    }
  });

  it('keeps every meta description within 155 characters', () => {
    for (const slug of SERVICE_SLUGS) {
      expect(getService(slug).metaDescription.length, slug).toBeLessThanOrEqual(155);
    }
  });

  it('names Los Angeles in the technical SEO page description', () => {
    expect(SERVICES_FLAT['technical-seo'].metaDescription).toMatch(/Los Angeles/);
  });
});

// The nine layouts replaced the single ServiceTemplate on 2026-09-01. All nine
// build their JSON-LD from serviceSchema() in serviceShared.js, so this is
// still one place the checks below can regress.
describe('service schema', () => {
  const tpl = readFileSync(
    path.resolve(process.cwd(), 'components/services/serviceShared.js'),
    'utf8'
  );

  it('does not claim the whole United States as the service area', () => {
    expect(tpl).not.toContain("name: 'United States'");
  });

  it('names Los Angeles and California as the service area', () => {
    expect(tpl).toContain("name: 'Los Angeles'");
    expect(tpl).toContain("name: 'California'");
  });

  // The old ServiceTemplate emitted no JSON-LD at all, so four of the eight
  // service pages shipped with no structured data. One template means one
  // place this can regress.
  it('emits Service and FAQPage structured data', () => {
    expect(tpl).toContain("'@type': 'Service'");
    expect(tpl).toContain("'@type': 'FAQPage'");
  });
});

// Nine layouts replaced the one template, so "does the page render its authored
// content" has to be asked of each of them. A layout that quietly drops the
// problem statement or the process steps would otherwise ship unnoticed.
describe('every service layout renders its authored content', () => {
  const dir = path.resolve(process.cwd(), 'components/services');
  const layouts = readdirSync(dir)
    .filter((f) => f.startsWith('Svc'))
    .map((f) => ({ name: f, src: readFileSync(path.join(dir, f), 'utf8') }));
  const shared = readFileSync(path.join(dir, 'serviceShared.js'), 'utf8');

  it('has a layout for each of the nine services', () => {
    expect(layouts).toHaveLength(9);
  });

  for (const field of ['problem', 'process', 'capabilities', 'featureRows']) {
    it(`renders service.${field} on every layout`, () => {
      const missing = layouts
        .filter((l) => !l.src.includes(`service.${field}`))
        .map((l) => l.name);
      expect(missing).toEqual([]);
    });
  }

  it('prefers the authored CTA title when present', () => {
    expect(shared).toContain('service.ctaTitle');
  });

  it('uses the authored h1 rather than the short nav label', () => {
    const missing = layouts.filter((l) => !l.src.includes('service.h1')).map((l) => l.name);
    expect(missing).toEqual([]);
  });
});

describe('service pages name their city', () => {
  // With nine layouts there is no single hero component to assert on. The
  // guarantee moves to serviceEyebrow(), which appends the city when the
  // authored eyebrow does not carry it — only three of the nine do, and the
  // four in services.js fall back to `pillar`, which names no city at all.
  it('produces a hero eyebrow naming Los Angeles for every service', async () => {
    const { serviceEyebrow } = await import('../../lib/serviceIndex.js');
    const missing = SERVICE_SLUGS.filter(
      (slug) => !/Los Angeles/i.test(serviceEyebrow(getService(slug)))
    );
    expect(missing).toEqual([]);
  });

  it('renders that eyebrow in the hero of every layout', () => {
    const dir = path.resolve(process.cwd(), 'components/services');
    const layouts = readdirSync(dir).filter((f) => f.startsWith('Svc'));
    const missing = layouts.filter(
      (f) => !readFileSync(path.join(dir, f), 'utf8').includes('serviceEyebrow(service)')
    );
    expect(missing).toEqual([]);
  });

  it('names Los Angeles in every service page title', () => {
    for (const slug of SERVICE_SLUGS) {
      expect(getService(slug).metaTitle, slug).toMatch(/Los Angeles/);
    }
  });
});

// Service metadata is generated in lib/serviceIndex.js from the slug plus the
// OUTCOMES map, not hand-authored nine times — the raw metaTitle and
// metaDescription in servicesFlat.js and services.js still exist but only feed
// the /services index cards through SERVICE_LINKS.
//
// The four-position format is keyword-first, outcome-second:
//   title  '<Keyword> Los Angeles | <outcome.short> | Gobiya'
//   desc   '<Keyword> in Los Angeles: <outcome.long>. Free audit — call now!'
//
// These assertions check the contract that format promises rather than
// restating the template string, so rewording an outcome clause does not fail
// the suite but dropping the keyword, the city or the call to action does.
describe('service page metadata follows the four-position format', () => {
  it('leads with the keyword, names the city, and closes with the brand', () => {
    for (const slug of SERVICE_SLUGS) {
      const t = getService(slug).metaTitle;
      const keyword = keywordFromSlug(slug);
      expect(t, slug).toMatch(new RegExp(`^${escapeRe(keyword)} Los Angeles \\|`));
      expect(t, slug).toMatch(/\| Gobiya$/);
    }
  });

  it('opens the description on the keyword and city, and closes on the call to action', () => {
    for (const slug of SERVICE_SLUGS) {
      const d = getService(slug).metaDescription;
      const keyword = keywordFromSlug(slug);
      expect(d, slug).toMatch(new RegExp(`^${escapeRe(keyword)} in Los Angeles: `));
      expect(d, slug).toMatch(/Free audit — call now!$/);
    }
  });

  // The generator drops the outcome clause rather than the keyword or the brand
  // when a title would exceed its budget. Whichever branch it takes, both of
  // those have to survive — that is the point of the fallback.
  it('keeps the keyword and the brand even when the outcome is dropped', () => {
    for (const slug of SERVICE_SLUGS) {
      const t = getService(slug).metaTitle;
      expect(t, slug).toContain(keywordFromSlug(slug));
      expect(t, slug).toContain('Los Angeles');
      expect(t, slug).toContain('Gobiya');
    }
  });

  // /services/technical-seo targets 'technical SEO'. Generating the keyword
  // from the slug is what keeps the two from drifting apart.
  it('builds the keyword from the slug', () => {
    expect(keywordFromSlug('technical-seo')).toBe('Technical SEO');
    expect(keywordFromSlug('web-dev')).toBe('Web Development');
    expect(keywordFromSlug('geo')).toBe('GEO');
    for (const slug of SERVICE_SLUGS) {
      expect(getService(slug).metaTitle, slug).toContain(keywordFromSlug(slug));
      expect(getService(slug).metaDescription, slug).toContain(keywordFromSlug(slug));
    }
  });
});

describe('service data carries the fields the template needs', () => {
  it('gives all eight service pages a problem, process, faqs and CTA title', () => {
    for (const slug of SERVICE_SLUGS) {
      const s = getService(slug);
      expect(s.problem, slug).toBeTruthy();
      expect(Array.isArray(s.process), slug).toBe(true);
      expect(s.process.length, slug).toBeGreaterThan(0);
      expect(s.faqs.length, slug).toBeGreaterThan(0);
      expect(s.ctaTitle, slug).toBeTruthy();
    }
  });
});
