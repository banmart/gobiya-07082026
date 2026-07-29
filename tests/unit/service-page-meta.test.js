import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { SERVICES_FLAT } from '../../lib/servicesFlat.js';
import { SERVICE_SLUGS, getService } from '../../lib/serviceIndex.js';

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

  it('names Los Angeles in the SEO page description', () => {
    expect(SERVICES_FLAT['seo-services-los-angeles'].metaDescription).toMatch(/Los Angeles/);
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

describe('service page headlines name their city', () => {
  it('gives every service page a headline containing Los Angeles', () => {
    for (const slug of SERVICE_SLUGS) {
      expect(getService(slug).headline, slug).toMatch(/Los Angeles/);
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
