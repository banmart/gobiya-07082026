import { GLOSSARY, getGlossaryTerm } from '../../lib/glossary';
import { HUBS, hubForTerm } from '../../lib/glossaryHubs';
import GlossaryIndex from '../../components/GlossaryIndex';
import TopicMarquee from '../../components/TopicMarquee';
import Breadcrumbs from '../../components/Breadcrumbs';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'SEO Glossary | Search & AI Terms, Plainly Defined | Gobiya',
  description:
    'An SEO glossary in plain English — 77 terms across technical SEO, AI citations, GEO, site speed, and Google Ads, grouped into six guides for site owners.',
  path: '/glossary',
});

// Every term keeps a URL in the structured data — its anchor on the hub that
// now holds it, never the retired standalone URL, which redirects.
const DEFINED_TERM_SET_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'Gobiya Search Engine & Web Optimization Glossary',
  description: 'Definitions of SEO, AI search (GEO), web development, and PPC terms.',
  url: 'https://www.gobiya.com/glossary',
  hasPart: HUBS.map((h) => ({
    '@type': 'DefinedTermSet',
    name: h.title,
    url: `https://www.gobiya.com/glossary/${h.slug}`,
  })),
  hasDefinedTerm: GLOSSARY.map((t) => {
    const hub = hubForTerm(t.slug);
    return {
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.shortDefinition,
      url: `https://www.gobiya.com/glossary/${hub.slug}#${t.slug}`,
    };
  }),
};

export default function GlossaryPage() {
  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(DEFINED_TERM_SET_SCHEMA) }}
      />

      <TopicMarquee
        topics={[
          'AI & GEO Terms',
          'Website & Technical Terms',
          'SEO Terms',
          'PPC & Google Ads Terms',
        ]}
      />

      <section className="page-hero section" style={{ paddingBottom: '2rem' }}>
        <div className="container container--narrow">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Glossary' }]} />
          <h1 className="statement">SEO Glossary: Search and AI Terms, Plainly Defined</h1>
          <p className="lede">
            An SEO glossary written for site owners, not for other agencies. All{' '}
            {GLOSSARY.length} terms are grouped into the six guides below &mdash;
            each one defined in a sentence you can act on, then explained in full,
            in the context of the other terms it depends on.
          </p>
        </div>
      </section>

      {/* The six hubs, as the primary route into the glossary. */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="ghub-cards">
            {HUBS.map((hub, i) => (
              <a
                key={hub.slug}
                href={`/glossary/${hub.slug}`}
                className="ghub-card"
                title={hub.title}
              >
                <span className="ghub-card__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="ghub-card__title">{hub.title}</h2>
                <p className="ghub-card__count">{hub.terms.length} terms</p>
                <p className="ghub-card__intro">{hub.intro}</p>
                <ul className="ghub-card__peek">
                  {hub.terms.slice(0, 4).map((slug) => (
                    <li key={slug}>{getGlossaryTerm(slug)?.term}</li>
                  ))}
                  {hub.terms.length > 4 && <li className="ghub-card__more">+{hub.terms.length - 4} more</li>}
                </ul>
                <span className="ghub-card__go" aria-hidden="true">
                  Read the guide →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* The full A–Z stays, so any single term is still one click from here and
          nothing depends on the reader guessing which hub holds it. */}
      <section className="section section--tint" id="terms">
        <div className="container container--narrow">
          <h2 className="statement statement--small">Every term, A&ndash;Z</h2>
          <p className="lede" style={{ marginBottom: '2rem' }}>
            All {GLOSSARY.length} terms in one list. Each links to its definition
            on the guide that covers it.
          </p>
          <GlossaryIndex terms={GLOSSARY} />
        </div>
      </section>

      <section className="cta section" id="contact">
        <div className="container container--narrow">
          <h2 className="cta__title">Don&apos;t see a term you&apos;re looking for?</h2>
          <div className="cta__actions">
            <a
              href="?onboarding=true"
              className="btn btn--solid btn--big"
              title="Schedule a free strategy consultation"
            >
              Schedule a Consultation
            </a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big" title="Call Gobiya at 323-744-1338">
              323-744-1338
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
