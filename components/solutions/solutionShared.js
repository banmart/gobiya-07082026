import ClientLogos from '../ClientLogos';
import TestimonialsCompact from '../TestimonialsCompact';
import { getService } from '../../lib/serviceIndex';
import { solutionPath } from '../../lib/solutions';

const BASE = 'https://www.gobiya.com';

/**
 * Shared pieces for the three solution pages: schema, the recommended-services
 * block, proof and the closing banner. Layout belongs to each solution.
 */

export function solutionSchema(sol) {
  const url = `${BASE}${solutionPath(sol.slug)}`;
  const graph = [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      name: sol.title,
      description: sol.metaDescription,
      url,
      isPartOf: { '@id': `${BASE}/#website` },
      about: { '@id': `${BASE}/#organization` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${BASE}/solutions` },
        { '@type': 'ListItem', position: 3, name: sol.title, item: url },
      ],
    },
  ];

  if (sol.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: sol.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: String(f.a).replace(/<[^>]*>/g, '') },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export function SolutionSchema({ sol }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionSchema(sol)) }}
    />
  );
}

export function RecommendedServices({ sol, heading = 'What fixes it' }) {
  const services = (sol.recommendedServices || [])
    .map((slug) => ({ slug, svc: getService(slug) }))
    .filter((s) => s.svc);

  if (!services.length) return null;

  return (
    <section className="sol-rec">
      <div className="container container--narrow">
        <h2 className="sol-rec__title">{heading}</h2>
        <ul className="sol-rec__list">
          {services.map(({ slug, svc }) => (
            <li key={slug}>
              <a href={`/services/${slug}`}>
                <strong>{svc.navTitle || svc.title}</strong>
                <span>{svc.metaDescription}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SolutionFaqs({ sol }) {
  if (!sol.faq?.length) return null;
  return (
    <section className="sol-faq" id="faq">
      <div className="container container--narrow">
        <h2 className="statement statement--small">Questions we get about this</h2>
        <div className="sol-faq__list">
          {sol.faq.map((f) => (
            <details key={f.q} className="sol-faq__item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SolutionProof() {
  return (
    <>
      <TestimonialsCompact heading="What Los Angeles Clients Say" />
      <ClientLogos />
    </>
  );
}

export function SolutionCta({ title = 'Ready to fix this on your site?' }) {
  return (
    <section className="cta section section--tint" id="contact">
      <div className="container container--narrow">
        <h2 className="cta__title">{title}</h2>
        <div className="cta__actions">
          <a href="/free-site-scan" className="btn btn--solid btn--big">
            Run a free site scan
          </a>
          <a href="tel:+13237441338" className="btn btn--ghost btn--big">
            323-744-1338
          </a>
        </div>
      </div>
    </section>
  );
}
