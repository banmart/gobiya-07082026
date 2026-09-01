import ClientLogos from '../ClientLogos';
import PackagesOffer from '../PackagesOffer';
import CommunityReviews from '../CommunityReviews';
import { servicePath } from '../../lib/serviceIndex';
import { experienceFor } from '../../lib/serviceExperience';
import { FOUNDER, yearsExperience } from '../../lib/authority';
import { FOUNDED_YEAR } from '../../lib/authority';

/**
 * The parts every service page needs and no service page should look distinct
 * for: schema, the experience block, FAQs, the closing CTA.
 *
 * Layout — the arrangement of hero, capabilities, process and proof — belongs
 * to each service's own component. That is the whole point of the exercise, so
 * nothing that decides visual structure lives here.
 */

export function serviceSchema(service) {
  const url = `https://www.gobiya.com${servicePath(service.slug)}`;
  const graph = [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: service.navTitle || service.title,
      serviceType: service.eyebrow || service.title,
      description: service.metaDescription || service.standfirst || service.blurb,
      url,
      provider: { '@id': 'https://www.gobiya.com/#organization' },
      areaServed: { '@type': 'City', name: 'Los Angeles' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.gobiya.com/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.gobiya.com/services' },
        { '@type': 'ListItem', position: 3, name: service.navTitle || service.title, item: url },
      ],
    },
  ];

  if (service.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: service.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: String(f.a).replace(/<[^>]*>/g, '') },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export function ServiceSchema({ service }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }}
    />
  );
}

/**
 * The first-hand block. Renders nothing when a service has no authored
 * experience, rather than printing a generic placeholder — an empty credibility
 * block is worse than none.
 */
export function ExperienceBlock({ slug, variant = '' }) {
  const exp = experienceFor(slug);
  if (!exp) return null;

  return (
    <section className={`svc-exp ${variant}`}>
      <div className="container container--narrow">
        <div className="svc-exp__inner">
          <p className="svc-exp__eyebrow">
            <span className="svc-exp__dot" aria-hidden="true" />
            From {yearsExperience()} years of doing this
          </p>
          <h2 className="svc-exp__heading">{exp.heading}</h2>
          {exp.body.map((p, i) => (
            <p key={i} className="svc-exp__para">
              {p}
            </p>
          ))}
          {exp.source && (
            <p className="svc-exp__source">
              <a href={exp.source.href}>{exp.source.text}</a>
            </p>
          )}
          <p className="svc-exp__byline">
            &mdash; <a href={FOUNDER.url}>{FOUNDER.name}</a>, {FOUNDER.jobTitle}
          </p>
        </div>
      </div>
    </section>
  );
}

export function ServiceFaqs({ service, variant = '' }) {
  if (!service.faqs?.length) return null;
  return (
    <section className={`svc-faq ${variant}`} id="faq">
      <div className="container container--narrow">
        <h2 className="statement statement--small">Questions we get asked</h2>
        <div className="svc-faq__list">
          {service.faqs.map((f) => (
            <details key={f.q} className="svc-faq__item">
              <summary>{f.q}</summary>
              <div dangerouslySetInnerHTML={{ __html: f.a }} />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceCta({ service }) {
  return (
    <section className="cta section section--tint" id="contact">
      <div className="container container--narrow">
        <h2 className="cta__title">{service.ctaTitle || 'Ready to get started?'}</h2>
        <div className="cta__actions">
          <a href="?onboarding=true" className="btn btn--solid btn--big" title="Schedule a free consultation">
            Schedule a Consultation
          </a>
          <a href="tel:+13237441338" className="btn btn--ghost btn--big" title="Call Gobiya at 323-744-1338">
            323-744-1338
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Logos, packages and reviews — the proof and offer sections every service
 * page carried before the de-templating, kept so nothing was silently dropped.
 *
 * These are components rather than layout: each page decides *where* they sit
 * (some before the FAQs, some after the process), which is why the position is
 * the caller's choice and not fixed here. `packages` is opt-out for services
 * that do not sell a packaged offer.
 */
export function ServiceProof({ service, packages = true }) {
  const displayTitle = service.navTitle || service.title;
  return (
    <>
      <ClientLogos />
      {packages && (
        <PackagesOffer
          title={`Exclusive Savings on Expert ${displayTitle}`}
          sub="Exclusive Gobiya Performance Packages"
          dek="Professional service, exceptional value. Explore our current promotions."
          more={{ text: 'View all pricing', href: '/pricing' }}
        />
      )}
      <CommunityReviews
        heading="Trusted by Businesses Across Los Angeles"
        dek={`Since ${FOUNDED_YEAR}, Los Angeles businesses have trusted us for honest, reliable search work.`}
        featured={service.testimonial}
        more={{ text: 'View all client work', href: '/work' }}
      />
    </>
  );
}

/** Service areas, shown as plain text so the list stays crawlable. */
export function ServiceAreas({ service }) {
  const areas = service.serviceAreas || [];
  if (!areas.length) return null;
  return (
    <section className="svc-areas">
      <div className="container container--narrow">
        <h2 className="svc-areas__title">Where we work</h2>
        <p className="svc-areas__list">{areas.join(' · ')}</p>
      </div>
    </section>
  );
}
