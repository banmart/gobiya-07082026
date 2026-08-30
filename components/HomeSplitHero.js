import Image from 'next/image';

export default function HomeSplitHero() {
  return (
    <section className="gh-split-hero">
      <div className="container">
        <div className="gh-split-hero__grid">

          {/* ── Copy column ── */}
          <div className="gh-split-hero__copy">
            <p className="gh-split-hero__badge">Proudly Serving Los Angeles Since 2009</p>

            <h1 className="gh-split-hero__title">
              Digital Marketing<br />for Every Touchpoint
            </h1>

            <p className="gh-split-hero__dek">
              Digital marketing that reaches your buyers everywhere they look&mdash;Google,
              AI answers, maps, and ads. Expert SEO, GEO, web architecture, and conversion
              solutions for Los Angeles businesses.
            </p>

            <div className="gh-split-hero__actions">
              <a href="/free-site-scan" className="gb-btn gb-btn--accent gh-split-hero__cta-primary">
                Get Your Analysis
              </a>
              <a href="/contact" className="gb-btn gb-btn--ghost">
                Contact Us
              </a>
            </div>

            <div className="gh-split-hero__trust">
              <span>BBB A+ Rated</span>
              <span className="gh-split-hero__dot" aria-hidden="true">&middot;</span>
              <span>Google Partner</span>
              <span className="gh-split-hero__dot" aria-hidden="true">&middot;</span>
              <span>15+ Years Experience</span>
            </div>
          </div>

          {/* ── Visual column ── */}
          <div className="gh-split-hero__visual" aria-hidden="true">
            <Image
              src="/assets/img/hero-analytics-man.webp"
              alt="Digital marketing results — campaign analytics, AI search rankings, and lead capture dashboard"
              width={800}
              height={447}
              priority
              className="gh-split-hero__img"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
