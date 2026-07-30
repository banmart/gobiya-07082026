import { AREAS } from '../../../lib/areas';
import { buildMetadata } from '../../../lib/meta';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return AREAS.map((area) => ({ city: area.slug }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const area = AREAS.find((a) => a.slug === city);
  if (!area) return {};
  return buildMetadata({
    title: `${area.tagline} | Gobiya SEO`,
    description: `${area.desc} Get a FREE site scan today — serving ${area.name} since 2010.`,
    path: `/areas-we-serve/${area.slug}`,
  });
}

export default async function AreaPage({ params }) {
  const { city } = await params;
  const area = AREAS.find((a) => a.slug === city);
  if (!area) notFound();

  return (
    <main id="top">
      {/* Hero */}
      <section className="mw-area-hero">
        <div className="container">
          <p className="mw-area-hero__eyebrow">Gobiya SEO · Los Angeles</p>
          <h1 className="mw-area-hero__title">{area.tagline}</h1>
          <p className="mw-area-hero__desc">{area.desc}</p>
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

      {/* About the Area */}
      <section className="mw-area-body">
        <div className="container">
          <div className="mw-area-body__grid">
            <div className="mw-area-body__main">
              <h2 className="mw-area-body__heading">
                Serving {area.name} Businesses Since 2010
              </h2>
              <p className="mw-area-body__region">
                <strong>Region:</strong> {area.region} &bull; <strong>County:</strong> {area.county}
              </p>
              <ul className="mw-area-body__list">
                {area.details.map((point, i) => (
                  <li key={i} className="mw-area-body__list-item">
                    <span className="mw-area-body__check">✓</span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mw-area-body__services">
                <h3 className="mw-area-body__services-heading">Our Services in {area.name}</h3>
                <div className="mw-area-body__services-grid">
                  <a href="/seo-services" className="mw-area-body__service-card">
                    <span className="mw-area-body__service-icon">🔍</span>
                    <strong>Local & Technical SEO</strong>
                    <span>Fix rankings, fix code, dominate Google Maps.</span>
                  </a>
                  <a href="/geo-services-los-angeles" className="mw-area-body__service-card">
                    <span className="mw-area-body__service-icon">🤖</span>
                    <strong>AI & GEO Search</strong>
                    <span>Get cited by ChatGPT, Claude & Perplexity.</span>
                  </a>
                  <a href="/ppc-management-services" className="mw-area-body__service-card">
                    <span className="mw-area-body__service-icon">📈</span>
                    <strong>PPC & Paid Ads</strong>
                    <span>High-ROI Google Ads and lead generation.</span>
                  </a>
                  <a href="/content-marketing-strategies" className="mw-area-body__service-card">
                    <span className="mw-area-body__service-icon">✍️</span>
                    <strong>Content Strategy</strong>
                    <span>Publish content AI and Google both trust.</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar CTA */}
            <aside className="mw-area-body__sidebar">
              <div className="mw-area-body__cta-card">
                <p className="mw-area-body__cta-eyebrow">Free for {area.name} Businesses</p>
                <h3 className="mw-area-body__cta-title">Get Your Free Website & SEO Scan</h3>
                <p className="mw-area-body__cta-desc">
                  Our technical audit checks your site for hidden errors, Google ranking issues, and AI search visibility gaps — at no cost.
                </p>
                <a href="/free-site-scan" className="mw-area-body__cta-btn">
                  Start My Free Scan →
                </a>
                <div className="mw-area-body__cta-divider">or call us directly</div>
                <a href="tel:+13237441338" className="mw-area-body__cta-phone">
                  📞 323-744-1338
                </a>
              </div>

              {/* Other areas */}
              <div className="mw-area-body__other-areas">
                <h4 className="mw-area-body__other-title">Other Areas We Serve</h4>
                <ul className="mw-area-body__other-list">
                  {AREAS.filter((a) => a.slug !== city).map((a) => (
                    <li key={a.slug}>
                      <a href={`/areas-we-serve/${a.slug}`}>
                        <span>📍</span> {a.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mw-area-bottom-cta">
        <div className="container">
          <h2 className="mw-area-bottom-cta__title">
            Ready to Grow Your {area.name} Business?
          </h2>
          <p className="mw-area-bottom-cta__desc">
            Professional SEO, AI search, and PPC services — serving {area.name} and all of Los Angeles since 2010. No long-term contracts. No surprises.
          </p>
          <div className="mw-area-bottom-cta__actions">
            <a href="/free-site-scan" className="mw-area-hero__btn mw-area-hero__btn--primary">
              Get a FREE Site Scan
            </a>
            <a href="/services" className="mw-area-hero__btn mw-area-hero__btn--secondary">
              View All Services
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
