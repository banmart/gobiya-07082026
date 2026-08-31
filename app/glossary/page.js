import { GLOSSARY } from '../../lib/glossary';
import GlossaryIndex from '../../components/GlossaryIndex';
import TopicMarquee from '../../components/TopicMarquee';
import Breadcrumbs from '../../components/Breadcrumbs';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'SEO Glossary | Search & AI Terms, Plainly Defined | Gobiya',
  description:
    'An SEO glossary in plain English — every term across technical SEO, AI citations, GEO, web development, and Google Ads, defined for site owners.',
  path: '/glossary',
});

const DEFINED_TERM_SET_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'Gobiya Search Engine & Web Optimization Glossary',
  description: 'Definitions of SEO, AI search (GEO), web development, and PPC terms.',
  url: 'https://www.gobiya.com/glossary',
  hasDefinedTerm: GLOSSARY.map((t) => ({
    '@type': 'DefinedTerm',
    name: t.term,
    description: t.shortDefinition,
    url: `https://www.gobiya.com/glossary/${t.slug}`,
  })),
};

export default function GlossaryPage() {
  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(DEFINED_TERM_SET_SCHEMA) }}
      />

      <TopicMarquee topics={["AI & GEO Terms", "Website & Technical Terms", "SEO Terms", "PPC & Google Ads Terms"]} />

      {/* The page carried no h1 — the index below opens straight on the A/B/C
          letter headings. The heading and the line under it are the page's
          only prose, so they carry the keyword. */}
      <section className="page-hero section" style={{ paddingBottom: '2rem' }}>
        <div className="container container--narrow">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Glossary' }]} />
          <h1 className="statement">SEO Glossary: Search and AI Terms, Plainly Defined</h1>
          <p className="lede">
            An SEO glossary written for site owners, not for other agencies. Every
            term covers technical SEO, AI citations, GEO, web development, and
            Google Ads &mdash; defined in one sentence you can act on, then
            explained in full.
          </p>
        </div>
      </section>

      <section className="section" id="terms" style={{ paddingTop: 0 }}>
        <div className="container container--narrow">
          <GlossaryIndex terms={GLOSSARY} />
        </div>
      </section>


      <section className="cta section section--tint" id="contact">
        <div className="container container--narrow">
          <h2 className="cta__title">Don&apos;t see a term you&apos;re looking for?</h2>
          <div className="cta__actions">
            <a href="?onboarding=true" className="btn btn--solid btn--big" title="Schedule a free strategy consultation">Schedule a Consultation</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big" title="Call Gobiya at 323-744-1338">323-744-1338</a>
          </div>
        </div>
      </section>
    </main>
  );
}
