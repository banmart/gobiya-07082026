import PageHero from '../components/PageHero';
import DisciplineRail, { Icon } from '../components/DisciplineRail';
import ProofBar from '../components/ProofBar';
import CommunityReviews from '../components/CommunityReviews';
import ExcellenceGrid from '../components/ExcellenceGrid';
import LocalAreas from '../components/LocalAreas';
import PackagesOffer from '../components/PackagesOffer';
import ClosingCta from '../components/ClosingCta';
import { buildMetadata } from '../lib/meta';
import { HOMEPAGE_FAQ } from '../lib/homepageFaq';

// The title already carries the brand, so buildMetadata appends no suffix.
export const metadata = buildMetadata({
  title: 'Gobiya -  Digital marketing for every touchpoint.',
  description:
    'Digital marketing that meets your buyers at every touchpoint — Google, AI answers, maps, and ads. Free Los Angeles site audit. Call now!',
  path: '/',
});

const HEADLINE_SERVICES = [
  { title: 'Technical & Semantic SEO', icon: 'bars', href: '/services/technical-seo' },
  { title: 'Generative Engine Optimization (GEO)', icon: 'globe', href: '/services/geo' },
  { title: 'High-Converting Web Architecture', icon: 'code', href: '/services/web-dev' },
];

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
      <PageHero
        badge="Proudly Serving Los Angeles Since 2009"
        title="Digital Marketing for Every Touchpoint"
        accent="Celebrating Over 15 Years of Strategic Digital Growth!"
        dek="Digital marketing that reaches your buyers everywhere they look — Google, AI answers, maps, and ads. Expert SEO, GEO, web architecture, and conversion solutions you can rely on for any business."
        primary={{ text: 'Get Your Analysis', href: '/free-site-scan' }}
        secondary={{ text: 'Contact Us', href: '/contact' }}
      />

      {/* ══ 2. Discipline rail ══ */}
      <DisciplineRail />

      {/* ══ 3. We Handle It All ══ */}
      <section className="gb-handle">
        <div className="container">
          <div className="gb-sechead">
            <div>
              <h2 className="gb-sechead__title">We Handle It All So You Don&apos;t Have To</h2>
              <p className="gb-sechead__dek">
                Whether it&rsquo;s an algorithmic drop, poor conversion rates, or invisible
                search rankings, our specialists have you covered.
              </p>
            </div>
            <a href="/services" className="gb-sechead__link">
              View All Digital Services <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <ul className="gb-handle__grid">
            {HEADLINE_SERVICES.map((s) => (
              <li key={s.title}>
                <a href={s.href} className="gb-svc">
                  <span className="gb-svc__icon">
                    <Icon name={s.icon} size={20} />
                  </span>
                  <span className="gb-svc__title">{s.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ 4. Trusted specialists ══ */}
      <section className="gb-trusted">
        <div className="container">
          <h2 className="gb-trusted__title">
            Trusted Los Angeles Digital Marketing &amp; Conversion Specialists
          </h2>
          <p className="gb-trusted__sub">
            Professional Search Engine Optimization &amp; Development Since 2009
          </p>
          <p className="gb-trusted__body">
            For over 15 years, the Gobiya team has delivered targeted, reliable, and
            high-ROI digital solutions across Los Angeles and the San Fernando Valley.
            Throughout our history, we have proudly served local businesses by tackling
            their toughest organic visibility and technical hurdles.
          </p>
          <a href="?onboarding=true" className="gb-btn gb-btn--accent">
            Schedule Your Free Strategy Consultation Today!
          </a>
        </div>
      </section>

      {/* ══ 5. Proof bar ══ */}
      <ProofBar />

      {/* ══ 6. Hear From the Community ══ */}
      <CommunityReviews />

      {/* ══ 7. Excellence in Every Optimization ══ */}
      <ExcellenceGrid />

      {/* ══ 8. Local communities ══ */}
      <LocalAreas />

      {/* ══ 9. Performance packages ══ */}
      <PackagesOffer />

      {/* ══ 10. Closing CTA ══ */}
      <ClosingCta />
    </main>
  );
}
