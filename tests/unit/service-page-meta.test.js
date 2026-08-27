import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { SERVICES_FLAT } from '../../lib/servicesFlat.js';
import { SERVICE_SLUGS, getService, keywordFromSlug } from '../../lib/serviceIndex.js';

// buildMetadata in lib/meta.js appends ' — Gobiya' (9 chars) unless the title
// already contains the brand. Titles must fit Google's ~60 char display budget
// including that suffix.
const SUFFIX = ' — Gobiya';
const rendered = (t) => (t.toLowerCase().includes('gobiya') ? t : t + SUFFIX);

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

describe('service schema', () => {
  const tpl = readFileSync(path.resolve(process.cwd(), 'components/ServiceTemplate.js'), 'utf8');

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

describe('service template renders its authored content', () => {
  const tpl = readFileSync(path.resolve(process.cwd(), 'components/ServiceTemplate.js'), 'utf8');

  it('renders the problem statement', () => {
    expect(tpl).toContain('service.problem');
  });

  it('renders the process steps', () => {
    expect(tpl).toContain('service.process');
  });

  it('renders the capability blocks', () => {
    expect(tpl).toContain('service.capabilities');
  });

  it('prefers the authored CTA title when present', () => {
    expect(tpl).toContain('service.ctaTitle');
  });

  it('uses the authored headline rather than the short rail label', () => {
    expect(tpl).toContain('service.headline');
  });
});

describe('service pages name their city', () => {
  // The city used to have to be inside each hand-written h1. It is now carried
  // by the hero itself — the eyebrow ('<Service> · Los Angeles') and the
  // secondary heading, both rendered by ServiceTemplate for every service — so
  // it cannot be missing from one page and present on another. Asserting on the
  // template is a stronger guarantee than nine substring checks.
  it('renders the city in the hero of every service page', () => {
    const tpl = readFileSync(path.resolve(process.cwd(), 'components/ServiceTemplate.js'), 'utf8');
    expect(tpl).toContain('· Los Angeles');
    expect(tpl).toContain('Expert Service in Los Angeles and the San Fernando Valley');
  });

  it('names Los Angeles in every service page title', () => {
    for (const slug of SERVICE_SLUGS) {
      expect(getService(slug).metaTitle, slug).toMatch(/Los Angeles/);
    }
  });
});

describe('service page metadata follows the homepage pattern', () => {
  // Homepage: 'Los Angeles SEO & Marketing | The Valley & Glendale | Gobiya'
  it('leads with the city, closes with the brand, and names a geo segment', () => {
    for (const slug of SERVICE_SLUGS) {
      const t = getService(slug).metaTitle;
      expect(t, slug).toMatch(/^Los Angeles .+ \| The Valley( & Glendale)? \| Gobiya$/);
    }
  });

  // Homepage: 'Get top-ranking Los Angeles and San Fernando Valley SEO services
  // when you contact Gobiya SEO today. We also offer free, online audits. Call now!'
  it('opens on the offer and closes on the call to action', () => {
    for (const slug of SERVICE_SLUGS) {
      const d = getService(slug).metaDescription;
      expect(d, slug).toMatch(/^Get top-ranking Los Angeles and San Fernando Valley /);
      expect(d, slug).toMatch(/We also offer free, online audits\. Call now!$/);
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
