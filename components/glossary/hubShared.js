import { getGlossaryTerm } from '../../lib/glossary';

/**
 * Pieces every hub page needs but no hub page should look like another for.
 *
 * The schema, the FAQ block and the closing CTA are genuinely the same job on
 * all six pages, so they live here. Everything that determines how a hub reads
 * — how its terms are arranged, what the eye follows — belongs to that hub's
 * own layout component and is deliberately not shared.
 */

export function hubTerms(hub) {
  return hub.terms.map((slug) => getGlossaryTerm(slug)).filter(Boolean);
}

export function groupTerms(group) {
  return group.terms.map((slug) => getGlossaryTerm(slug)).filter(Boolean);
}

/**
 * DefinedTermSet for the hub plus a FAQPage for its questions.
 *
 * Each term keeps a url of its anchor on this page, so the structured data
 * agrees with where the 301s now land.
 */
export function hubSchema(hub) {
  const url = `https://www.gobiya.com/glossary/${hub.slug}`;
  const terms = hubTerms(hub);

  const graph = [
    {
      '@type': 'DefinedTermSet',
      '@id': `${url}#termset`,
      name: hub.title,
      description: hub.metaDescription,
      url,
      hasDefinedTerm: terms.map((t) => ({
        '@type': 'DefinedTerm',
        name: t.term,
        description: t.shortDefinition,
        url: `${url}#${t.slug}`,
        inDefinedTermSet: `${url}#termset`,
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: hub.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.gobiya.com/' },
        { '@type': 'ListItem', position: 2, name: 'Glossary', item: 'https://www.gobiya.com/glossary' },
        { '@type': 'ListItem', position: 3, name: hub.title, item: url },
      ],
    },
  ];

  return { '@context': 'https://schema.org', '@graph': graph };
}

export function HubSchema({ hub }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema(hub)) }}
    />
  );
}

/** Cross-links to a term's related entries, resolved to their new anchors. */
export function RelatedLinks({ entry, hubForTerm }) {
  const related = (entry.relatedSlugs || [])
    .map((slug) => {
      const target = getGlossaryTerm(slug);
      const hub = hubForTerm(slug);
      if (!target || !hub) return null;
      return { term: target.term, href: `/glossary/${hub.slug}#${slug}` };
    })
    .filter(Boolean);

  if (related.length === 0) return null;

  return (
    <p className="ghub-related">
      <span className="ghub-related__label">See also</span>
      {related.map((r, i) => (
        <span key={r.href}>
          {i > 0 && <span aria-hidden="true"> · </span>}
          <a href={r.href}>{r.term}</a>
        </span>
      ))}
    </p>
  );
}

export function HubFaqs({ hub }) {
  return (
    <section className="section ghub-faq" id="faq">
      <div className="container container--narrow">
        <h2 className="statement statement--small">Common questions</h2>
        <div className="ghub-faq__list">
          {hub.faqs.map((f) => (
            <details key={f.q} className="ghub-faq__item">
              <summary className="ghub-faq__q">{f.q}</summary>
              <p className="ghub-faq__a">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HubClosing({ hub }) {
  return (
    <section className="cta section section--tint">
      <div className="container container--narrow">
        <h2 className="cta__title">Want this handled rather than explained?</h2>
        <div className="cta__actions">
          {hub.relatedHref && (
            <a href={hub.relatedHref} className="btn btn--solid btn--big" title={hub.relatedLabel}>
              {hub.relatedLabel}
            </a>
          )}
          <a href="tel:+13237441338" className="btn btn--ghost btn--big" title="Call Gobiya at 323-744-1338">
            323-744-1338
          </a>
        </div>
        <p className="ghub-backlink">
          <a href="/glossary">← All six glossary hubs</a>
        </p>
      </div>
    </section>
  );
}
