import Breadcrumbs from '../../components/Breadcrumbs';
import SubHero from '../../components/SubHero';
import PlatformStrip from '../../components/PlatformStrip';
import ClientLogos from '../../components/ClientLogos';
import { AREAS, AREA_SERVICES } from '../../lib/areas';
import { heroImage } from '../../lib/heroImages';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Areas We Serve in Los Angeles | Gobiya SEO',
  description: 'Gobiya SEO serves businesses across Los Angeles — Burbank, Glendale, Hollywood, Silver Lake, Studio City, Sherman Oaks, Koreatown, Echo Park, Los Feliz, Downtown LA, and more. Get a FREE site scan today.',
  path: '/areas-we-serve',
});

export default function AreasWeServePage() {
  return (
    <main id="top">
      <SubHero
        image={heroImage(19)}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Areas We Serve' },
        ]}
        eyebrow="Affordable Solutions, Exceptional Service"
        title="Exclusive Gobiya Savings"
        excerpt="Keep your website running smoothly and your ROI increase with our latest savings and special offers."
        primary={{ text: 'Get Your Free Site Scan', href: '/free-site-scan' }}
        secondary={{ text: 'Call 323-744-1338', href: 'tel:+13237441338' }}
      />

      {/* ══ Platform Strip — directly under hero ══ */}
      <PlatformStrip />

      {/* ══ City grid ══ */}
      <section className="mw-areas-index">
        <div className="container">
          <h2 className="mw-areas-index__heading">Los Angeles Neighborhoods &amp; Cities</h2>
          <p className="mw-areas-index__intro">
            Pick your area to see how we help businesses like yours get found in your local market.
          </p>
          <div className="mw-areas-index__grid">
            {AREAS.map((area) => (
              <a
                key={area.slug}
                href={`/areas-we-serve/${area.slug}`}
                className="mw-areas-index__card"
              >
                <p className="mw-areas-index__region">{area.region}</p>
                <h3 className="mw-areas-index__city">{area.name}</h3>
                <p className="mw-areas-index__teaser">{area.excerpt}</p>
                <span className="mw-areas-index__link">
                  View {area.name} <span aria-hidden="true">→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ What we run in every area ══ */}
      <section className="mw-area-services">
        <div className="container">
          <h2 className="mw-area-services__heading">What We Run in Every Area</h2>
          <p className="mw-area-services__intro">
            The same four services, wherever you are in Los Angeles County.
          </p>
          <div className="mw-svc-cards">
            {AREA_SERVICES.map((s) => (
              <a key={s.href} href={s.href} className="mw-svc-card">
                <p className="mw-svc-card__tag">{s.tag}</p>
                <h3 className="mw-svc-card__title">{s.title}</h3>
                <p className="mw-svc-card__desc">{s.desc}</p>
                <span className="mw-svc-card__link">
                  View service <span aria-hidden="true">→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Closing CTA ══ */}
      <section className="mw-area-bottom-cta">
        <div className="container">
          <h2 className="mw-area-bottom-cta__title">
            Don&apos;t See Your Area? We Still Serve You.
          </h2>
          <p className="mw-area-bottom-cta__desc">
            We cover all of Greater Los Angeles and the San Fernando Valley. Call us or start a free site scan, and we&apos;ll tell you exactly what is holding your business back online.
          </p>
          <div className="mw-area-bottom-cta__actions">
            <a href="/free-site-scan" className="mw-area-cta__btn mw-area-cta__btn--primary">
              Get Your Free Site Scan
            </a>
            <a href="/contact" className="mw-area-cta__btn mw-area-cta__btn--secondary">
              Contact Us
            </a>
          </div>
          <div className="mw-cta-arrow-wrapper">
            <img src="/assets/img/get-started-grey.png" alt="Get started today" className="mw-arrow-img mw-arrow-img--light" />
            <img src="/assets/img/get-started-arrow.png" alt="Get started today" className="mw-arrow-img mw-arrow-img--dark" />
          </div>
        </div>
      </section>
    </main>
  );
}
