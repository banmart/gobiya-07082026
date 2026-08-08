import Breadcrumbs from './Breadcrumbs';
import PlatformStrip from './PlatformStrip';
import HeroScanWidget from './HeroScanWidget';
import IridescenceCanvas from './IridescenceCanvas';
import ReliableService from './ReliableService';
import FeatureRows from './FeatureRows';
import { renderBlock } from './ContentBlocks';
import SavingsOffer from './SavingsOffer';
import { servicePath, SERVICE_LINKS } from '../lib/serviceIndex';
import { SERVICE_BODIES } from '../lib/serviceBodies';
import { SEARCH_WINS } from '../lib/searchWins';
import { AREAS } from '../lib/areas';
import { CONTACT } from '../lib/nav';

// The single service page layout, on the homepage's frame:
//
//   split hero (copy + scan widget) → platform strip → the problem in one line
//   → capability rail → stat bar → numbered method → authored body beside the
//   sticky CTA rail → reviews and client marks → closing navy banner.
//
// Same section vocabulary and same order as app/page.js, so a visitor moving
// from / to a service page keeps the frame and gets the promises in the order
// they already read them.
//
// It also renders what each service has always authored in servicesFlat.js /
// services.js — problem, capabilities, process, testimonial, datapoint — which
// the old SubHero layout carried in the data but never put on the page. Only
// `faqs` stays schema-only.

const STAT_IDS = ['ai-citations', 'impressions'];
const winById = (id) => SEARCH_WINS.cards.find((c) => c.id === id);

export default function ServiceTemplate({ service }) {
  const displayTitle = service.navTitle || service.title;
  const hero = service.hero;
  const body = SERVICE_BODIES[service.slug];
  const otherServices = SERVICE_LINKS.filter((s) => s.slug !== service.slug);
  const stats = STAT_IDS.map(winById).filter(Boolean);
  // The sticky CTA rail belongs beside a prose column. Pages that run the
  // full-width feature rows drop it and let the areas grid take the width.
  const hasRail = !service.featureRows?.length;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: displayTitle,
    serviceType: service.eyebrow || displayTitle,
    description: service.metaDescription || service.standfirst,
    url: `https://www.gobiya.com${servicePath(service.slug)}`,
    provider: { '@id': 'https://www.gobiya.com/#organization' },
    // Every service page is a Los Angeles page, and SiteSchema already declares
    // City: Los Angeles for the organization. Claiming the whole country here
    // would contradict it.
    areaServed: [
      { '@type': 'City', name: 'Los Angeles' },
      { '@type': 'State', name: 'California' },
    ],
  };

  const faqSchema = service.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: service.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      }
    : null;

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* hero — same iridescence background as the homepage */}
      <section className="mw-hero mw-hero--sub mw-hero--waves">
        <div className="mw-hero__waves" aria-hidden="true">
          <IridescenceCanvas intensity={0.92} speed={0.65} amplitude={0.12} />
        </div>
        <div className="mw-hero__overlay" />
        <div className="container">
          <div className="mw-hero__layout">
            <div className="mw-hero__card">
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Services', href: '/seo-services' },
                  { label: displayTitle },
                ]}
                inHero
              />
              <div className="mw-hero__eyebrow">{displayTitle} · Los Angeles</div>
              {/* h1 — authored per service in servicesFlat.js or services.js;
                  serviceIndex normalises both shapes into `headline`. */}
              <h1 className="mw-hero__title">
                {service.headline || `${displayTitle} in Los Angeles`}
              </h1>
              {hero?.excerpt && (
                <h2 className="mw-hero__secondary-heading">{hero.excerpt}</h2>
              )}
              <div className="mw-hero__actions">
                <a href={service.heroCtaHref || '?onboarding=true'} className="mw-hero__btn">
                  {service.heroCtaText || 'Request a Quote'}
                </a>
                <a href={CONTACT.phoneHref} className="mw-hero__btn mw-hero__btn--ghost">
                  Call {CONTACT.phone}
                </a>
              </div>

              <div className="mw-hero__trust">
                <div className="mw-hero__trust-since">
                  <span>Trusted</span>
                  <strong>since 2010</strong>
                </div>
                <div className="mw-hero__trust-rating">
                  <div className="mw-hero__trust-stars" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <svg key={i} viewBox="0 0 20 20" width="14" height="14">
                        <path
                          fill="currentColor"
                          d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9z"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="mw-hero__trust-label">
                    Five-star Google reviews from Los Angeles business owners
                  </span>
                </div>
              </div>
            </div>

            <HeroScanWidget />
          </div>
        </div>
      </section>

      {/* ══ 2. Platform Strip ══ */}
      <PlatformStrip />

      {/* ══ 3. The problem, in one line ══ */}
      {service.problem && (
        <section className="mw-hero-statement mw-hero-statement--problem">
          <div className="container">
            {service.problem.eyebrow && (
              <p className="mw-hero-statement__eyebrow">{service.problem.eyebrow}</p>
            )}
            <p className="mw-hero-statement__text">{service.problem.statement}</p>
          </div>
        </section>
      )}

      {/* ══ 4. Capability rail — the homepage's card rail, text-only ══ */}
      {service.capabilities?.length > 0 && (
        <section className="mw-move">
          <div className="container">
            <h2 className="mw-move__heading">What this actually covers</h2>

            <div className="mw-move__rail">
              {service.capabilities.map((cap) => (
                <a
                  key={cap.title}
                  href={cap.href || servicePath(service.slug)}
                  className="mw-move-card mw-move-card--text"
                >
                  <div className="mw-move-card__head">
                    <span className="mw-move-card__eyebrow">{cap.tag}</span>
                    <h3 className="mw-move-card__title">{cap.title}</h3>
                  </div>
                  <p className="mw-move-card__desc">{cap.desc}</p>
                  <span className="mw-move-card__go">Learn more &rarr;</span>
                </a>
              ))}
            </div>

            <div className="mw-move__footer">
              <a href="?onboarding=true" className="mw-simple__btn">
                Request a Quote <span>&rarr;</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ══ 5. Stat bar — this service's verified datapoint beside the blended
             Search Console numbers ══ */}
      <section className="mw-stats mw-stats--band">
        <div className="container">
          <h3 className="mw-stats__heading">The numbers, not the sales pitch</h3>
          <div className="mw-stats__grid mw-stats__grid--bar">
            <div>
              <div className="mw-stats__num">16</div>
              <div className="mw-stats__label">Years Experience</div>
              <div className="mw-stats__detail">
                Optimizing search for small and mid-sized businesses since 2010.
              </div>
            </div>

            {service.datapoint && (
              <div>
                <div className="mw-stats__num">
                  {service.datapoint.value}
                  {service.datapoint.suffix || ''}
                </div>
                <div className="mw-stats__label">{service.datapoint.label}</div>
                <div className="mw-stats__detail">{service.datapoint.sourceNote}</div>
              </div>
            )}

            {stats.map((card) => (
              <div key={card.id}>
                <div className="mw-stats__num">
                  {card.display}
                  {card.suffix || ''}
                </div>
                <div className="mw-stats__label">{card.label}</div>
                <div className="mw-stats__detail">
                  {card.detail} <span className="mw-stats__window">{card.window}.</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mw-stats__note">
            Live numbers from every site we run search for — pulled straight from Google Search Console and AI assistant grounding data. Updated {SEARCH_WINS.asOf}.
          </p>
        </div>
      </section>

      {/* ══ 6. The method, numbered ══ */}
      {service.process?.length > 0 && (
        <section className="mw-method">
          <div className="container">
            <div className="mw-method__panel">
              <div className="mw-method__head">
                <h2 className="mw-method__heading">How the work runs</h2>
                <a href="/process" className="mw-method__more">
                  See the full process &rarr;
                </a>
              </div>

              <ol className="mw-method__grid">
                {service.process.map((step, i) => (
                  <li key={step.title} className="mw-method__step">
                    <div className="mw-method__marker">
                      <span className="mw-method__num">{i + 1}</span>
                      <span className="mw-method__arrow" aria-hidden="true">
                        {i === service.process.length - 1 ? '✓✓' : '→'}
                      </span>
                    </div>
                    <h3 className="mw-method__step-title">{step.title}</h3>
                    <p className="mw-method__step-body">{step.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* ══ 7a. Body as alternating rows, where the service authors them ══
             `featureRows` carries the same copy the prose column used to, laid
             out full width like the homepage. A service that defines them has
             no SERVICE_BODIES entry, so the two never both render. */}
      {service.featureRows?.length > 0 && <FeatureRows rows={service.featureRows} />}

      {/* ══ 7b. Body: authored prose column + sticky CTA rail ══
             The rail only runs beside a prose column. A feature-row page has
             already made both of its offers full width — the scan widget in the
             hero and the capability rail — so repeating them in a sidebar is a
             third ask for the same click, and the areas grid takes the width
             back instead. */}
      <section className="mw-area-body">
        <div className="container">
          <div className={`mw-area-body__grid${hasRail ? '' : ' mw-area-body__grid--full'}`}>
            <div className="mw-area-body__main">
              {body?.map(renderBlock)}

              <h3 className="mw-area-body__services-heading">Areas We Serve</h3>
              {/* Four areas paired up beside a prose column; the full-width
                  layout has room for all of them, several across. */}
              <div className={`mw-svc-cards${hasRail ? ' mw-svc-cards--two' : ''}`}>
                {AREAS.slice(0, hasRail ? 4 : AREAS.length).map((a) => (
                  <a key={a.slug} href={`/areas-we-serve/${a.slug}`} className="mw-svc-card">
                    <p className="mw-svc-card__tag">{a.region}</p>
                    <h4 className="mw-svc-card__title">{a.name}</h4>
                    <p className="mw-svc-card__desc">{a.excerpt}</p>
                    <span className="mw-svc-card__link">
                      View area <span aria-hidden="true">&rarr;</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {hasRail && (
            <aside className="mw-area-body__sidebar">
              <div className="mw-area-body__cta-card">
                <p className="mw-area-body__cta-eyebrow">Free for Los Angeles Businesses</p>
                <h3 className="mw-area-body__cta-title">Get Your Free Website &amp; SEO Scan</h3>
                <p className="mw-area-body__cta-desc">
                  We check your site for hidden errors, Google ranking problems, and AI search gaps, then send you the findings. No cost, no obligation.
                </p>
                <a href="?onboarding=true" className="mw-area-body__cta-btn">
                  Request a Quote <span aria-hidden="true">&rarr;</span>
                </a>
                <p className="mw-area-body__cta-divider">or call us directly</p>
                <a href={CONTACT.phoneHref} className="mw-area-body__cta-phone">
                  {CONTACT.phone}
                </a>
              </div>

              <div className="mw-area-body__other-areas">
                <h4 className="mw-area-body__other-title">Other Services</h4>
                <ul className="mw-area-body__other-list">
                  {otherServices.map((s) => (
                    <li key={s.slug}>
                      <a href={s.href}>
                        <span className="mw-area-body__other-city">{s.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a href="/seo-services" className="mw-area-body__other-all">
                  All services <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </aside>
            )}
          </div>
        </div>
      </section>

      {/* ══ 8. Reviews and client marks ══ */}
      <ReliableService featured={service.testimonial} />

      {/* ══ 9. CRM offer — opt-in per service via `showOffer` in lib/services.js ══ */}
      {service.showOffer && <SavingsOffer />}

      {/* ══ 10. Bottom Navy CTA Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">
            {service.ctaTitle || service.headline || `Ready to Grow Your Business with ${displayTitle}?`}
          </h2>
          <p className="mw-navy-banner__dek">
            SEO, AI search, and PPC for Los Angeles businesses since 2010. Month-to-month, no long-term contracts, no surprises.
          </p>
          <a href={service.heroCtaHref || '?onboarding=true'} className="mw-navy-banner__btn">
            {service.heroCtaText || 'Request a Quote'}
          </a>
        </div>
      </section>
    </main>
  );
}
