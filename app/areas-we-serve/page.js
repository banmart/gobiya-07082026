import { AREAS } from '../../lib/areas';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Areas We Serve in Los Angeles | Gobiya SEO',
  description: 'Gobiya SEO serves businesses across Los Angeles — Burbank, Hollywood, Silver Lake, Studio City, Sherman Oaks, Koreatown, Echo Park, Los Feliz, Downtown LA, and more. Get a FREE site scan today.',
  path: '/areas-we-serve',
});

export default function AreasWeServePage() {
  return (
    <main id="top">
      {/* Hero */}
      <section className="mw-area-hero">
        <div className="container">
          <p className="mw-area-hero__eyebrow">Serving Los Angeles Since 2010</p>
          <h1 className="mw-area-hero__title">Areas We Serve Across Los Angeles</h1>
          <p className="mw-area-hero__desc">
            From Burbank to Downtown LA, Gobiya&apos;s expert SEO and digital marketing team serves businesses across the city and the San Fernando Valley. Get honest, affordable, results-driven service — no long-term contracts.
          </p>
          <div className="mw-area-hero__actions">
            <a href="/free-site-scan" className="mw-area-hero__btn mw-area-hero__btn--primary">
              Get a FREE Site Scan
            </a>
            <a href="tel:+13237441338" className="mw-area-hero__btn mw-area-hero__btn--secondary">
              Call 323-744-1338
            </a>
          </div>
        </div>
      </section>

      {/* City Grid */}
      <section className="mw-areas-index">
        <div className="container">
          <h2 className="mw-areas-index__heading">Los Angeles Neighborhoods & Cities</h2>
          <p className="mw-areas-index__intro">
            Select your area below to learn how Gobiya helps businesses like yours grow in your local market.
          </p>
          <div className="mw-areas-index__grid">
            {AREAS.map((area) => (
              <a
                key={area.slug}
                href={`/areas-we-serve/${area.slug}`}
                className="mw-areas-index__card"
              >
                <span className="mw-areas-index__icon">📍</span>
                <h3 className="mw-areas-index__city">{area.name}</h3>
                <p className="mw-areas-index__region">{area.region}</p>
                <p className="mw-areas-index__teaser">{area.desc.slice(0, 100)}…</p>
                <span className="mw-areas-index__link">Learn More →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mw-area-bottom-cta">
        <div className="container">
          <h2 className="mw-area-bottom-cta__title">
            Don&apos;t See Your Area? We Still Serve You.
          </h2>
          <p className="mw-area-bottom-cta__desc">
            We serve all of Greater Los Angeles and the San Fernando Valley. Call us today or get your free site scan — we&apos;ll tell you exactly what&apos;s holding your business back online.
          </p>
          <div className="mw-area-bottom-cta__actions">
            <a href="/free-site-scan" className="mw-area-hero__btn mw-area-hero__btn--primary">
              Get a FREE Site Scan
            </a>
            <a href="/contact" className="mw-area-hero__btn mw-area-hero__btn--secondary">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
