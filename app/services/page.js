import SubHero from '../../components/SubHero';
import PlatformStrip from '../../components/PlatformStrip';
import TestimonialsCompact from '../../components/TestimonialsCompact';
import ClientLogos from '../../components/ClientLogos';
import { heroImage } from '../../lib/heroImages';
import { buildMetadata } from '../../lib/meta';

// Same pattern the nine service pages generate from their slug (see
// serviceMetaTitle in lib/serviceIndex.js): city-led title, geo segment, brand
// last; description opens on the offer and closes on the call to action. The
// keyword list is what keeps this from reading as a duplicate of the homepage
// description, which is otherwise the same sentence.
export const metadata = buildMetadata({
  title: 'Digital Marketing Services in Los Angeles | Gobiya',
  description:
    'Digital marketing services for Los Angeles: technical SEO, AI search (GEO), content, digital PR, PPC, CRO, and web development. Free audit. Call now!',
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
        eyebrow="All Services · Los Angeles"
        title="Digital Marketing Services Engineered for Search & Revenue Growth"
        excerpt="Expert Service in Los Angeles and the San Fernando Valley"
        dek="Nine digital marketing services, each with a clear scope and a technical execution standard you can hold us to. Choose the capability your business needs and see exactly what it covers."
        primary={{ text: 'Request a Quote', href: '?onboarding=true' }}
        secondary={{ text: 'Call 323-744-1338', href: 'tel:+13237441338' }}
        icon={<svg viewBox="0 0 24 24" fill="none" stroke="#0047AB" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>}
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
                title={service.title}
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

      {/* ══ 3. Client social proof ══ */}
      <TestimonialsCompact heading="What Los Angeles Clients Say" />
      <ClientLogos />

      {/* ══ 4. Bottom Navy CTA Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">
            Not sure which service your business needs?
          </h2>
          <a href="?onboarding=true" title="Request a Quote" className="mw-navy-banner__btn">
            Request a Quote
          </a>
        </div>
      </section>
    </main>
  );
}
