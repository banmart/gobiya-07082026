import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { SERVICES_FLAT } from '../../lib/servicesFlat.js';

const seo = SERVICES_FLAT['seo'];

describe('seo-services content', () => {
  it('covers capabilities', () => {
    expect(seo.capabilities.length).toBeGreaterThanOrEqual(6);
  });

  it('points every capability at a real internal path', () => {
    for (const c of seo.capabilities) {
      expect(c.href, c.title).toMatch(/^\/(glossary|insights|work|services|seo-services)\/?/);
    }
  });

  it('carries FAQs', () => {
    expect(seo.faqs.length).toBeGreaterThanOrEqual(6);
  });

  it('answers the on-page, service-business and coverage questions', () => {
    const qs = seo.faqs.map((f) => f.q.toLowerCase()).join(' | ');
    expect(qs).toMatch(/website/);
    expect(qs).toMatch(/small business/);
  });

  it('lists the suburbs the redirects consolidate', () => {
    expect(seo.serviceAreas).toContain('Glendale');
    expect(seo.serviceAreas).toContain('Studio City');
    expect(seo.serviceAreas.length).toBeGreaterThanOrEqual(15);
  });

  it('makes no guarantees anywhere in the copy', () => {
    const blob = JSON.stringify(seo).toLowerCase();
    expect(blob).not.toMatch(/we guarantee|guaranteed ranking|page one in/);
  });
});

// The left rail is section navigation, not a table of contents: it links the
// sibling service pages so a visitor reading one service can reach the rest of
// the offer. It previously listed only the current page's own capability
// headings as #anchors, which dead-ended every service page in itself.
describe('service sidebar is section navigation', () => {
  const sidebar = readFileSync(path.resolve(process.cwd(), 'components/ServiceTemplate.js'), 'utf8');

  it('links the sibling service pages', () => {
    expect(sidebar).toContain('SERVICE_LINKS');
  });

  it('does not build the rail from the page’s own capability headings', () => {
    expect(sidebar).not.toContain('capability-');
  });
});

describe('every service page is reachable from the services index', () => {
  it('lists all eight services exactly once', async () => {
    const { CONSULTING_ITEMS } = await import('../../lib/consultingIndex.js');
    const { SERVICE_SLUGS } = await import('../../lib/serviceIndex.js');
    expect(CONSULTING_ITEMS).toHaveLength(SERVICE_SLUGS.length);
    const hrefs = CONSULTING_ITEMS.map((s) => s.href);
    expect(new Set(hrefs).size, 'duplicate service links').toBe(hrefs.length);
    for (const slug of SERVICE_SLUGS) {
      expect(hrefs, slug).toContain(`/services/${slug}`);
    }
  });
});
