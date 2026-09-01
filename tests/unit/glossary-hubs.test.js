import { describe, it, expect } from 'vitest';
import { GLOSSARY } from '../../lib/glossary.js';
import {
  HUBS,
  HUB_SLUGS,
  hubForTerm,
  termDestination,
  termRedirects,
} from '../../lib/glossaryHubs.js';

const termSlugs = GLOSSARY.map((e) => e.slug);

describe('glossary hub taxonomy', () => {
  it('assigns every glossary term to a hub', () => {
    const unassigned = termSlugs.filter((slug) => !hubForTerm(slug));
    expect(unassigned).toEqual([]);
  });

  it('assigns no term to more than one hub', () => {
    const seen = new Map();
    for (const hub of HUBS) {
      for (const slug of hub.terms) {
        seen.set(slug, [...(seen.get(slug) || []), hub.slug]);
      }
    }
    const duplicated = [...seen.entries()].filter(([, hubs]) => hubs.length > 1);
    expect(duplicated).toEqual([]);
  });

  it('references no term that does not exist', () => {
    const known = new Set(termSlugs);
    const dangling = HUBS.flatMap((h) =>
      h.terms.filter((slug) => !known.has(slug)).map((slug) => `${h.slug}: ${slug}`)
    );
    expect(dangling).toEqual([]);
  });

  // A hub slug that collided with a term slug would have its page shadowed by
  // that term's own 301 — the redirect would fire and the hub would never
  // render.
  it('uses hub slugs that collide with no term slug', () => {
    const collisions = HUB_SLUGS.filter((slug) => termSlugs.includes(slug));
    expect(collisions).toEqual([]);
  });

  // The whole point of the consolidation. A hub thinner than this would
  // recreate the problem it exists to solve.
  it('carries at least 7 terms on every hub', () => {
    const thin = HUBS.filter((h) => h.terms.length < 7).map(
      (h) => `${h.slug}: ${h.terms.length}`
    );
    expect(thin).toEqual([]);
  });

  // Each hub renders from its groups, not from its flat `terms` list. A term
  // present in `terms` but missing from `groups` would 301 to an anchor that
  // does not exist on the page.
  it('places every term of every hub into exactly one group', () => {
    for (const hub of HUBS) {
      const grouped = hub.groups.flatMap((g) => g.terms);
      expect(new Set(grouped).size, `${hub.slug} repeats a term across groups`).toBe(
        grouped.length
      );
      expect([...grouped].sort(), `${hub.slug} groups do not cover its terms`).toEqual(
        [...hub.terms].sort()
      );
    }
  });

  it('gives every hub a set of FAQs', () => {
    for (const hub of HUBS) {
      expect(hub.faqs.length, hub.slug).toBeGreaterThanOrEqual(3);
      for (const faq of hub.faqs) {
        expect(faq.q, hub.slug).toBeTruthy();
        expect(faq.a, hub.slug).toBeTruthy();
      }
    }
  });

  it('gives every hub the metadata a page needs', () => {
    for (const hub of HUBS) {
      expect(hub.title, hub.slug).toBeTruthy();
      expect(hub.h1, hub.slug).toBeTruthy();
      expect(hub.intro, hub.slug).toBeTruthy();
      expect(hub.metaDescription, hub.slug).toBeTruthy();
      expect(hub.metaDescription.length, `${hub.slug} meta too long`).toBeLessThanOrEqual(165);
    }
  });
});

describe('glossary term redirects', () => {
  const redirects = termRedirects(termSlugs);

  it('emits one redirect per retired term URL', () => {
    expect(redirects).toHaveLength(termSlugs.length);
  });

  it('points every term at an anchor on its own hub', () => {
    for (const slug of termSlugs) {
      const hub = hubForTerm(slug);
      expect(termDestination(slug)).toBe(`/glossary/${hub.slug}#${slug}`);
    }
  });

  it('lands every redirect on a live hub page in one hop', () => {
    const live = new Set(HUB_SLUGS);
    const broken = redirects.filter((r) => {
      const hubSlug = r.destination.replace('/glossary/', '').split('#')[0];
      return !live.has(hubSlug);
    });
    expect(broken).toEqual([]);
  });

  it('redirects no URL that is itself a live hub page', () => {
    const shadowed = redirects.filter((r) =>
      HUB_SLUGS.some((h) => r.source === `/glossary/${h}`)
    );
    expect(shadowed).toEqual([]);
  });
});
