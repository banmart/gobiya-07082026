import SubHero from '../../components/SubHero';
import PlatformStrip from '../../components/PlatformStrip';
import { heroImage } from '../../lib/heroImages';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Los Angeles SEO & Growth Services | Built Around Your Next Win',
  description:
    'Los Angeles SEO, GEO, content, PPC, CRO, and web design services — canonical taxonomy built around one goal: the growth outcome you actually want.',
  path: '/services',
});

const ALL_SERVICES_BENTO = [
  {
    title: 'Local & Technical SEO',
    href: '/services/technical-seo',
    image: '/assets/img/developer-dashboard-review.webp',
    spanClass: 'mw-bento-card--lg',
  },
  {
    title: 'AI & GEO Search Optimization',
    href: '/services/geo',
    image: '/assets/img/tech-lab-standup.webp',
    spanClass: 'mw-bento-card--md',
  },
  {
    title: 'Content Strategy & Marketing',
    href: '/services/content-marketing',
    image: '/assets/img/hallway-code-review.webp',
    spanClass: 'mw-bento-card--sm',
  },
  {
    title: 'Digital PR & Link Building',
    href: '/services/link-building',
    image: '/assets/img/office-lounge-meeting.webp',
    spanClass: 'mw-bento-card--sm',
  },
  {
    title: 'PPC & Lead Generation',
    href: '/services/ppc',
    image: '/assets/img/corporate-atrium-walking.webp',
    spanClass: 'mw-bento-card--sm',
  },
  {
    title: 'CRO & Conversion Optimization',
    href: '/services/cro',
    image: '/assets/img/open-office-team-table.webp',
    spanClass: 'mw-bento-card--md',
  },
  {
    title: 'Web Design & Development',
    href: '/services/web-dev',
    image: '/assets/img/open-office-desks.webp',
    spanClass: 'mw-bento-card--half',
  },
  {
    title: 'AI Systems & Consulting',
    href: '/services/ai-consulting',
    image: '/assets/img/office-huddle-skyline.webp',
    spanClass: 'mw-bento-card--half',
  },
];

export default function ServicesPage() {
  return (
    <main id="top">
      {/* ══ 1. SubHero Banner ══ */}
      <SubHero
        image={heroImage(1)}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
        eyebrow="Canonical Taxonomy, Outcome-Driven Engineering"
        title="Every Service Engineered to Drive Search & Revenue Growth"
        excerpt="Choose the capability your business requires. Explore clear scopes and technical execution standards."
        primary={{ text: 'Request a Quote', href: '?onboarding=true' }}
        secondary={{ text: 'Call 323-744-1338', href: 'tel:+13237441338' }}
      />

      {/* ══ Platform Strip — directly under hero ══ */}
      <PlatformStrip />

      {/* ══ 2. All Services Bento Grid ══ */}
      <section className="mw-bento-section">
        <div className="container">
          <h2 className="mw-simple__heading" style={{ textAlign: 'center' }}>
            Canonical Services & Core Capabilities
          </h2>
          <p className="mw-simple__intro" style={{ textAlign: 'center', marginInline: 'auto' }}>
            From technical SEO foundations to custom Next.js builds and AI search grounding — explore our canonical services.
          </p>

          <div className="mw-bento-grid">
            {ALL_SERVICES_BENTO.map((service, i) => (
              <a
                key={i}
                href={service.href}
                className={`mw-bento-card ${service.spanClass}`}
                style={{ backgroundImage: `url('${service.image}')` }}
              >
                <div className="mw-bento-card__overlay" />
                <div className="mw-bento-card__content">
                  <h3 className="mw-bento-card__title">{service.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. Bottom Navy CTA Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">
            Not sure which service your business needs?
          </h2>
          <a href="?onboarding=true" className="mw-navy-banner__btn">
            Request a Quote
          </a>
        </div>
      </section>
    </main>
  );
}
