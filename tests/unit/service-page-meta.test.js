import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { SERVICES_FLAT } from '../../lib/servicesFlat.js';

// buildMetadata in lib/meta.js appends ' — Gobiya' (9 chars) unless the title
// already contains the brand. Titles must fit Google's ~60 char display budget
// including that suffix.
const SUFFIX = ' — Gobiya';
const rendered = (t) => (t.toLowerCase().includes('gobiya') ? t : t + SUFFIX);

describe('flat service page metadata', () => {
  it('keeps every rendered title within 60 characters', () => {
    for (const [slug, s] of Object.entries(SERVICES_FLAT)) {
      expect(rendered(s.title).length, `${slug}: ${rendered(s.title)}`).toBeLessThanOrEqual(60);
    }
  });

  it('keeps every meta description within 155 characters', () => {
    for (const [slug, s] of Object.entries(SERVICES_FLAT)) {
      expect(s.metaDescription.length, slug).toBeLessThanOrEqual(155);
    }
  });

  it('names Los Angeles in the SEO page description', () => {
    expect(SERVICES_FLAT['seo-services-los-angeles'].metaDescription).toMatch(/Los Angeles/);
  });
});

describe('service schema', () => {
  const tpl = readFileSync(path.resolve(process.cwd(), 'components/FlatServiceTemplate.js'), 'utf8');

  it('does not claim the whole United States as the service area', () => {
    expect(tpl).not.toContain("name: 'United States'");
  });

  it('names Los Angeles and California as the service area', () => {
    expect(tpl).toContain("name: 'Los Angeles'");
    expect(tpl).toContain("name: 'California'");
  });
});
