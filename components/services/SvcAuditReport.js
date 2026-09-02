import SplitHero from '../SplitHero';
import PlatformStrip from '../PlatformStrip';
import TrustBand from '../TrustBand';
import TrackCards from '../TrackCards';
import HomeBenefitTabs from '../HomeBenefitTabs';
import HomeFaq from '../HomeFaq';
import CommunityReviews from '../CommunityReviews';
import ClosingCta from '../ClosingCta';
import {
  ServiceSchema,
  ExperienceBlock,
  ServiceAreas,
  ServiceSiblings,
  leadSentence,
  afterLeadSentence,
} from './serviceShared';

/**
 * Technical SEO.
 *
 * Built entirely out of the homepage's sections: the split hero, the platform
 * strip, the trust band, the tabbed benefits, the track cards, the accordion
 * FAQ, the reviews grid and the closing card. Nothing on this page is a shape
 * that exists only here — every band is a component the homepage either renders
 * or defines, with this service's copy in it.
 *
 * That is deliberate and it replaces what was here before: a bespoke
 * "audit report" layout whose hero, cards and panels were its own markup and
 * its own CSS namespace, matching no other page on the site.
 *
 * Where the service record maps on:
 *
 *   eyebrow, h1, intro, heroCta  → the hero
 *   datapoint                    → the trust band's first tile, with its source
 *   featureRows                  → the benefit tabs
 *   capabilities                 → track cards
 *   process                      → the same cards, numbered
 *   testimonial                  → the reviews grid
 *   faqs                         → the accordion
 *   ctaTitle                     → the closing card
 */

// Capability tags to the icon set in DisciplineRail. A tag with no entry falls
// back to the wrench rather than rendering an empty slot.
const TAG_ICONS = {
  Performance: 'signal',
  Crawlability: 'globe',
  Schema: 'code',
  'On-Page': 'doc',
  Local: 'pin',
  Diagnostics: 'wrench',
};

export default function SvcAuditReport({ service }) {
  const dp = service.datapoint;
  const t = service.testimonial;

  // featureRows carry their detail as `list` (an array of points), `dek` (a
  // string), or `dek` as an array of paragraphs. The tabs want bullets, so
  // normalise all three to one shape.
  const tabs = (service.featureRows || []).map((row) => ({
    label: row.title,
    heading: row.lede || row.title,
    bullets: row.list || (Array.isArray(row.dek) ? row.dek : [row.dek]).filter(Boolean),
    img: { src: row.image?.src, alt: row.image?.alt || '' },
  }));

  return (
    <main id="top" className="svc">
      <ServiceSchema service={service} />

      <SplitHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.navTitle || service.title },
        ]}
        eyebrow={service.hero?.excerpt || service.navTitle}
        title={service.h1 || service.title}
        dek={leadSentence(service.intro)}
        primary={{
          text: service.heroCtaText || 'Request a Free Technical SEO Check',
          href: service.heroCtaHref || '/free-site-scan',
        }}
        secondary={{ text: 'CONTACT US', href: '/contact' }}
        image={service.hero?.image}
      />

      <PlatformStrip />

      {/* The measured figure leads the band. It is the one number on this page
          that claims a result, and it carries its source — the case study it
          came from is linked from the note. */}
      <TrustBand
        title={service.problem?.eyebrow || 'Trusted by 500+ Los Angeles Businesses'}
        sub={service.problem?.statement}
        badges={
          dp
            ? [
                { num: `${dp.value}${dp.suffix || ''}`, label: dp.label },
                { num: '500+', label: 'Clients Served' },
                { num: 'Google', label: 'Partner Agency' },
              ]
            : undefined
        }
        note={dp?.sourceNote}
        cta={{
          text: service.heroCtaText || 'Get a Free Technical SEO Check',
          href: service.heroCtaHref || '/free-site-scan',
        }}
      />

      {tabs.length > 0 && (
        <HomeBenefitTabs
          tabs={tabs}
          title="What technical SEO changes for your business"
          sub="The foundation Google and AI crawlers read before they read anything else"
          cta={{ text: 'Get a Free Site Audit', href: '/free-site-scan?goal=rankings' }}
        />
      )}

      <TrackCards
        title="Every layer of your technical foundation"
        dek={afterLeadSentence(service.intro)}
        items={service.capabilities.map((c) => ({
          icon: TAG_ICONS[c.tag] || 'wrench',
          title: c.title,
          dek: c.desc,
          cta: c.href ? { text: `About ${c.tag}`, href: c.href } : null,
        }))}
      />

      <TrackCards
        tint
        title="How the work runs"
        dek="The same four steps on every technical engagement"
        items={service.process.map((p) => ({
          step: p.step,
          title: p.title,
          dek: p.desc,
        }))}
      />

      <ExperienceBlock slug={service.slug} />

      <CommunityReviews
        heading="Clients love Gobiya"
        dek="Let our clients tell you their story of growth, performance, and revenue impact."
        featured={t}
      />

      <HomeFaq faqs={service.faqs} title="Technical SEO questions, answered" />

      <ServiceAreas service={service} />
      <ServiceSiblings service={service} />

      <ClosingCta title={service.ctaTitle} phone />
    </main>
  );
}
