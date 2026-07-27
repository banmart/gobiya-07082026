import { GLOSSARY } from '../../lib/glossary';
import GlossaryIndex from '../../components/GlossaryIndex';
import TopicMarquee from '../../components/TopicMarquee';
import Breadcrumbs from '../../components/Breadcrumbs';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'AI, SEO, Websites & PPC Glossary — Gobiya',
  description:
    'A plain-English glossary of AI search, website, SEO, and PPC terms — from Core Web Vitals to GEO to Quality Score, explained clearly.',
  path: '/glossary',
});

const DEFINED_TERM_SET_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'Gobiya AI, Websites, SEO & PPC Glossary',
  description: 'A plain-English glossary of AI search, website, SEO, and PPC terms.',
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

      {/* ══ 1. Breadcrumb Bar ══ */}
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Glossary' }]} />

      {/* ══ 2. Dark Subhero ══ */}
      <section className="mw-subhero">
        <div className="container">
          <h1 className="mw-subhero__title">AI Search, SEO, Websites &amp; PPC — Explained Plainly</h1>
          <p className="mw-subhero__dek">{GLOSSARY.length} terms covering everything from Core Web Vitals to Generative Engine Optimization to Quality Score. No jargon left unexplained.</p>
        </div>
      </section>

      <TopicMarquee topics={["AI & GEO Terms", "Website & Technical Terms", "SEO Terms", "PPC & Google Ads Terms"]} />

      <section className="section" id="terms">
        <div className="container container--narrow">
          <GlossaryIndex terms={GLOSSARY} />
        </div>
      </section>

      <section className="cta section section--tint" id="contact">
        <div className="container container--narrow">
          <h2 className="cta__title" data-split>Don&apos;t see a term you&apos;re looking for?</h2>
          <div className="cta__actions" data-reveal>
            <a href="/free-site-scan" className="btn btn--solid btn--big">Schedule a Consultation</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>
    </main>
  );
}
