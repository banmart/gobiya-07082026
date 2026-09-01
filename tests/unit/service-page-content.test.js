import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { SERVICES_FLAT } from '../../lib/servicesFlat.js';

const seo = SERVICES_FLAT['technical-seo'];

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

// Every service page links its siblings, so a visitor reading one service can
// reach the rest of the offer. It previously listed only the current page's own
// capability headings as #anchors, which dead-ended every service page in
// itself.
//
// The nine layouts replaced the single ServiceTemplate on 2026-09-01. The
// sibling nav lives in serviceShared.js and each layout renders it, so this
// checks the source of the nav and that no layout forgets it.
describe('service pages link their siblings', () => {
  const shared = readFileSync(
    path.resolve(process.cwd(), 'components/services/serviceShared.js'),
    'utf8'
  );

  it('builds the sibling nav from the canonical service list', () => {
    expect(shared).toContain('SERVICE_LINKS');
  });

  it('does not build navigation from the page’s own capability headings', () => {
    expect(shared).not.toContain('capability-');
  });

  it('renders the sibling nav on every one of the nine layouts', () => {
    const dir = path.resolve(process.cwd(), 'components/services');
    const layouts = readdirSync(dir).filter((f) => f.startsWith('Svc'));
    expect(layouts.length, 'expected nine service layouts').toBe(9);
    const missing = layouts.filter(
      (f) => !readFileSync(path.join(dir, f), 'utf8').includes('<ServiceSiblings')
    );
    expect(missing).toEqual([]);
  });
});

describe('every service page is reachable from the services index', () => {
  // The canonical URL is /services/<slug>. /seo-services/<slug> is a 301 to it
  // (next.config.mjs), so linking the old path from the index — or from the
  // ItemList schema and the MCP resources, which read the same list — would
  // point Google and every AI crawler at a redirect instead of the page.
  it('lists every service exactly once, on its canonical path', async () => {
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
