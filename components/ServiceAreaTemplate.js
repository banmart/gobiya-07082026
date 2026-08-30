import PageHero from './PageHero';
import ClosingCta from './ClosingCta';
import { AREA_SERVICES, LIVE_AREAS } from '../lib/areas';
import { CONTACT } from '../lib/nav';

const BASE = 'https://www.gobiya.com';

// The service-area pages: /studio-city-seo and /glendale-seo.
//
// Distinct from components/LocationTemplate.js on one point that matters.
// LocationTemplate is for the two cities Gobiya has an office in, so it
// publishes a PostalAddress, a map embed and a "Visit Us" panel. Gobiya has no
// office in Studio City or Glendale, so this template publishes none of those:
// a street address here would be a fabricated local signal, and Google treats
// a business claiming an address it does not hold as a listing violation, not
// a ranking boost.
//
// What it publishes instead is a Service node whose `provider` points at the
// sitewide organization @id from components/SiteSchema.js. That is the honest
// shape for "we serve this city from somewhere else": one business entity,
// named once, with an areaServed that says where it works.
function areaSchema(area) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE}/${area.liveSlug}#service`,
    name: `${area.name} SEO`,
    serviceType: 'Search engine optimization',
    description: area.metaDescription,
    url: `${BASE}/${area.liveSlug}`,
    provider: { '@id': `${BASE}/#organization` },
    areaServed: [
      { '@type': 'City', name: area.name },
      { '@type': 'AdministrativeArea', name: area.region },
      { '@type': 'AdministrativeArea', name: area.county },
      { '@type': 'State', name: 'California' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `SEO services in ${area.name}`,
      itemListElement: AREA_SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, url: `${BASE}${s.href}` },
      })),
    },
  };
}

// Renders one block of an authored `body` array from lib/areas.js. `cta` is the
// repeated phone line, kept as a block type rather than prose so the number and
// the contact link stay linked wherever it appears.
//
// The class names are the surviving mw-area-body__* rules in app/globals.css —
// those outlived the routes that used them, so this renders against styles that
// are already written rather than adding a second set.
function renderBlock(block, i) {
  if (block.h2) return <h2 key={i} className="mw-area-body__heading">{block.h2}</h2>;
  if (block.h3) return <h3 key={i} className="mw-area-body__services-heading">{block.h3}</h3>;
  if (block.h4) return <h4 key={i} className="mw-area-body__minihead">{block.h4}</h4>;
  if (block.excerpt) return <p key={i} className="mw-area-body__excerpt">{block.excerpt}</p>;
  if (block.p) return <p key={i} className="mw-area-body__text">{block.p}</p>;
  if (block.list) {
    return (
      <ul key={i} className="mw-area-body__list">
        {block.list.map((item) => <li key={item}>{item}</li>)}
      </ul>
    );
  }
  if (block.button) {
    return (
      <p key={i} className="mw-area-body__btn-wrap">
        <a href={block.button.href || '/free-site-scan'} className="mw-area-body__btn">
          {block.button.text} <span aria-hidden="true">→</span>
        </a>
      </p>
    );
  }
  if (block.cta) {
    // `cta: true` is the bold excerpt treatment on the main number; pass an
    // object to change the lead-in, the number, or render it as body text.
    const cfg = block.cta === true ? {} : block.cta;
    const cls = cfg.style === 'text' ? 'mw-area-body__text' : 'mw-area-body__excerpt';
    const phone = cfg.phone || CONTACT.phone;
    return (
      <p key={i} className={`${cls} mw-area-body__cta-line`}>
        {cfg.lead || 'Reach out to us at'}{' '}
        <a href={`tel:+1${phone.replace(/\D/g, '')}`}>{phone}</a> or{' '}
        <a href="/contact">contact us online</a>{' '}
        {cfg.tail || 'for all your SEO needs.'}
      </p>
    );
  }
  return null;
}

export default function ServiceAreaTemplate({ area }) {
  // Live cities other than this one, plus the two office pages. The old
  // sidebar listed all ten cities and linked every one of them to a URL that
  // redirected; these are the four pages that actually render.
  const elsewhere = [
    ...LIVE_AREAS.filter((a) => a.liveSlug !== area.liveSlug).map((a) => ({
      href: `/${a.liveSlug}`,
      city: a.name,
      region: a.region,
    })),
    { href: '/van-nuys-seo', city: 'Van Nuys', region: 'San Fernando Valley — our Valley office' },
    { href: '/los-angeles-seo', city: 'Los Angeles', region: 'Our headquarters' },
  ];

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaSchema(area)) }}
      />

      {/* ══ 1. Hero ══
          `title` is the city's authored h1, which is the whole point of this
          page existing again. The retired version passed a fixed promo line
          ("Exclusive Gobiya Savings") into this slot, so every city page in
          the old set shipped an h1 that named neither the city nor the
          service, and area.h1 was never rendered anywhere. */}
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: area.name }]}
        eyebrow={`SEO & Digital Marketing · ${area.name}`}
        title={area.h1}
        accent={area.tagline}
        dek={area.heroExcerpt || area.excerpt}
        primary={{ text: 'Get Your Free Site Scan', href: '/free-site-scan' }}
        secondary={{ text: `Call ${CONTACT.phone}`, href: CONTACT.phoneHref }}
      />

      {/* ══ 2. Body: content column + sticky CTA rail ══ */}
      <section className="mw-area-body">
        <div className="container">
          <div className="mw-area-body__grid">
            <div className="mw-area-body__main">
              {/* The lede carries the slug keyword through the first 100 words
                  — the fourth of the four positions. It runs ahead of the
                  authored body, which stays exactly as written. */}
              {area.lede && <p className="mw-area-body__excerpt">{area.lede}</p>}

              {area.body.map(renderBlock)}

              <h3 className="mw-area-body__services-heading">
                Our Services in {area.name}
              </h3>
              <div className="mw-svc-cards mw-svc-cards--two">
                {AREA_SERVICES.map((s) => (
                  <a key={s.href} href={s.href} className="mw-svc-card">
                    <p className="mw-svc-card__tag">{s.tag}</p>
                    <h4 className="mw-svc-card__title">{s.title}</h4>
                    <p className="mw-svc-card__desc">{s.desc}</p>
                    <span className="mw-svc-card__link">
                      View service <span aria-hidden="true">→</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <aside className="mw-area-body__sidebar">
              <div className="mw-area-body__cta-card">
                <p className="mw-area-body__cta-eyebrow">Free for {area.name} Businesses</p>
                <h3 className="mw-area-body__cta-title">Get Your Free Website &amp; SEO Scan</h3>
                <p className="mw-area-body__cta-desc">
                  We check your site for hidden errors, Google ranking problems, and AI search gaps, then send you the findings. No cost, no obligation.
                </p>
                <a href="/free-site-scan" className="mw-area-body__cta-btn">
                  Start My Free Scan <span aria-hidden="true">→</span>
                </a>
                <p className="mw-area-body__cta-divider">or call us directly</p>
                <a href={CONTACT.phoneHref} className="mw-area-body__cta-phone">
                  {CONTACT.phone}
                </a>
              </div>

              <div className="mw-area-body__other-areas">
                <h4 className="mw-area-body__other-title">Where Else We Work</h4>
                <ul className="mw-area-body__other-list">
                  {elsewhere.map((a) => (
                    <li key={a.href}>
                      <a href={a.href}>
                        <span className="mw-area-body__other-city">{a.city}</span>
                        <span className="mw-area-body__other-region">{a.region}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a href="/services" className="mw-area-body__other-all">
                  All our services <span aria-hidden="true">→</span>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ══ 3. Closing CTA ══ */}
      <ClosingCta
        title={`Get Found in ${area.name}`}
        accent="When in Doubt, Call Gobiya Out!"
        dek={`SEO, AI search, and PPC for ${area.name} businesses. Month-to-month, no long-term contracts, no surprises.`}
        cta={{ text: 'Get Your Free Site Scan', href: '/free-site-scan' }}
        phone={false}
      />
    </main>
  );
}
