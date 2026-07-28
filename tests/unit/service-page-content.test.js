import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { SERVICES_FLAT } from '../../lib/servicesFlat.js';

const seo = SERVICES_FLAT['seo-services-los-angeles'];

describe('seo-services-los-angeles content', () => {
  it('covers nine capabilities', () => {
    expect(seo.capabilities).toHaveLength(9);
  });

  it('points every capability at a real internal path', () => {
    for (const c of seo.capabilities) {
      expect(c.href, c.title).toMatch(/^\/(glossary|insights|work|services)\//);
    }
  });

  it('carries thirteen FAQs', () => {
    expect(seo.faqs).toHaveLength(13);
  });

  it('answers the on-page, service-business and coverage questions', () => {
    const qs = seo.faqs.map((f) => f.q.toLowerCase()).join(' | ');
    expect(qs).toMatch(/on-page seo/);
    expect(qs).toMatch(/service businesses/);
    expect(qs).toMatch(/area/);
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

describe('service template surfaces contact details', () => {
  const tpl = readFileSync(path.resolve(process.cwd(), 'components/FlatServiceTemplate.js'), 'utf8');

  it('imports CONTACT rather than hardcoding the phone number', () => {
    expect(tpl).toContain("from '../lib/nav'");
    expect(tpl).toContain('CONTACT.phoneHref');
    expect(tpl).not.toContain('323-744-1338');
  });

  it('renders the service area list', () => {
    expect(tpl).toContain('service.serviceAreas');
  });
});
