import HomeSplitHero from '../components/HomeSplitHero';
import HomeScanChooser from '../components/HomeScanChooser';
import HomeBenefitTabs from '../components/HomeBenefitTabs';
import HomeServicesGrid from '../components/HomeServicesGrid';
import PlatformStrip from '../components/PlatformStrip';
import CommunityReviews from '../components/CommunityReviews';
import HomeFaq from '../components/HomeFaq';
import HomeDomainScanBanner from '../components/HomeDomainScanBanner';
import ClosingCta from '../components/ClosingCta';
import { buildMetadata } from '../lib/meta';
import { HOMEPAGE_FAQ } from '../lib/homepageFaq';
import { yearsInBusiness } from '../lib/authority';

// The title already carries the brand, so buildMetadata appends no suffix.
export const metadata = buildMetadata({
  title: 'Gobiya | AI, SEO, Websites, Paid Ads (Los Angeles & Van Nuys)',
  description:
    'Digital marketing that meets your buyers at every touchpoint — Google, AI answers, maps, and ads. Free Los Angeles site audit. Call now!',
  path: '/',
});

export default function Home() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOMEPAGE_FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ══ 1. Hero ══ */}
      <HomeSplitHero />

      {/* ══ 2. Platform strip ══ */}
      <PlatformStrip />

      {/* ══ 3. Scan or pick a track ══ */}
      <HomeScanChooser />

      {/* ══ 4. Trusted specialists ══ */}
      <section className="gb-trusted">
        <div className="container">
          <h2 className="gb-trusted__title">
            Trusted by 500+ Los Angeles Businesses
          </h2>
          <p className="gb-trusted__sub">
            Professional SEO &amp; Digital Marketing Since 2009
          </p>

          {/* ── Credential badges ──
              A "Top 1% of LA SEO Agencies" badge sat here. Nothing backs it —
              there is no ranking body that publishes such a list — and
              tests/unit/homepage-claims.test.js bans it by name: a performance
              number on this page has to come from lib/searchWins, which carries
              its source and as-of date.

              Years in business is derived from lib/authority.js rather than
              written down. It read "15+" against a 2009 founding date, which
              was both wrong and going to age badly. */}
          <div className="gb-trusted__badges">
            <div className="gb-trusted__badge">
              <span className="gb-trusted__badge-num">{yearsInBusiness()}</span>
              <span className="gb-trusted__badge-label">Years in Business</span>
            </div>
            <div className="gb-trusted__badge">
              <span className="gb-trusted__badge-num">500+</span>
              <span className="gb-trusted__badge-label">Clients Served</span>
            </div>
            <div className="gb-trusted__badge">
              <span className="gb-trusted__badge-num">Google</span>
              <span className="gb-trusted__badge-label">Partner Agency</span>
            </div>
          </div>

          {/* ── Review platform row ── */}
          <div className="gb-trusted__platforms">
            <div className="gb-trusted__platform">
              <span className="gb-trusted__platform-stars">★★★★★</span>
              <span className="gb-trusted__platform-name">Trustpilot</span>
              <span className="gb-trusted__platform-score">5.0</span>
            </div>
            <div className="gb-trusted__platform">
              <span className="gb-trusted__platform-stars">★★★★★</span>
              <span className="gb-trusted__platform-name">Clutch</span>
              <span className="gb-trusted__platform-score">5.0</span>
            </div>
            <div className="gb-trusted__platform">
              <span className="gb-trusted__platform-stars">★★★★★</span>
              <span className="gb-trusted__platform-name">Google</span>
              <span className="gb-trusted__platform-score">5.0</span>
            </div>
          </div>

          <a href="?onboarding=true" className="gb-btn gb-btn--accent" title="Schedule your free strategy consultation">
            Schedule Your Free Strategy Consultation Today!
          </a>
        </div>
      </section>

      {/* ══ 5. Benefit tabs ══ */}
      <HomeBenefitTabs />

      {/* ══ 6. Services grid ══ */}
      <HomeServicesGrid />

      {/* ══ 7. Closing CTA ══ */}
      <ClosingCta />

      {/* ══ 8. Hear From the Community ══ */}
      <CommunityReviews />

      {/* ══ 9. FAQ ══ */}
      <HomeFaq />

      {/* ══ 10. Domain scan banner ══ */}
      <HomeDomainScanBanner />
    </main>
  );
}
