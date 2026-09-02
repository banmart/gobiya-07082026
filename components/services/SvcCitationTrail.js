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
 * GEO.
 *
 * Built out of the same homepage sections as technical-seo — see
 * SvcAuditReport for the reasoning. This replaces what was here before: a
 * bespoke "citation trail" layout with its own mocked assistant answer and a
 * four-stop path graphic, matching no other page on the site.
 */

const TAG_ICONS = {
  Structure: 'doc',
  Research: 'globe',
  Format: 'bars',
  Voice: 'signal',
};

export default function SvcCitationTrail({ service }) {
  const dp = service.datapoint;
  const intro = service.intro || service.lede || service.blurb;

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
        dek={leadSentence(intro)}
        primary={{
          text: service.heroCtaText || 'Check your AI visibility',
          href: service.heroCtaHref || '/free-site-scan?goal=ai',
        }}
        secondary={{ text: 'CONTACT US', href: '/contact' }}
        image={service.hero?.image}
      />

      <PlatformStrip />

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
          text: service.heroCtaText || 'Check your AI visibility',
          href: service.heroCtaHref || '/free-site-scan?goal=ai',
        }}
      />

      {(service.featureRows || []).length > 0 && (
        <HomeBenefitTabs
          tabs={service.featureRows.map((row) => ({
            label: row.title,
            heading: row.lede || row.title,
            bullets: row.list || (Array.isArray(row.dek) ? row.dek : [row.dek]).filter(Boolean),
            img: { src: row.image?.src, alt: row.image?.alt || '' },
          }))}
          title="What GEO changes for your business"
          sub="The difference between being findable and being the answer AI gives"
          cta={service.featureRows[0]?.link}
        />
      )}

      <TrackCards
        title="What the work involves"
        dek={afterLeadSentence(intro)}
        items={service.capabilities.map((c) => ({
          icon: TAG_ICONS[c.tag] || 'wrench',
          title: c.title,
          dek: c.desc,
          cta: c.href ? { text: `About ${c.tag}`, href: c.href } : null,
        }))}
      />

      <TrackCards
        tint
        title="How we run it"
        dek="The same four steps on every GEO engagement"
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
        featured={service.testimonial}
      />

      <HomeFaq faqs={service.faqs} title="GEO questions, answered" />

      <ServiceAreas service={service} />
      <ServiceSiblings service={service} />

      <ClosingCta title={service.ctaTitle} phone />
    </main>
  );
}
