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
 * AI Systems & Consulting.
 *
 * Built out of the same homepage sections as technical-seo — see
 * SvcAuditReport for the reasoning. This replaces what was here before: a
 * bespoke layout shaped as an asked/answered thread, matching no other page
 * on the site. The opening exchange that thread led with lives on below, in
 * ExperienceBlock's first-hand copy for this service.
 */

const TAG_ICONS = {
  Strategy: 'bars',
  Search: 'globe',
  Automation: 'wrench',
  Chat: 'signal',
};

export default function SvcConversation({ service }) {
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
          text: service.heroCtaText || 'Start that conversation',
          href: service.heroCtaHref || '/contact',
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
          text: service.heroCtaText || 'Start that conversation',
          href: service.heroCtaHref || '/contact',
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
          title="What AI consulting changes for your business"
          sub="The difference between AI hype and AI that saves your team hours"
          cta={service.featureRows[0]?.link}
        />
      )}

      <TrackCards
        title="What we actually do"
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
        title="How an engagement runs"
        dek="The same four steps on every engagement"
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

      <HomeFaq faqs={service.faqs} title="AI consulting questions, answered" />

      <ServiceAreas service={service} />
      <ServiceSiblings service={service} />

      <ClosingCta title={service.ctaTitle} phone />
    </main>
  );
}
