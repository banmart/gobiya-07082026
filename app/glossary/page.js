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

      <section className="page-hero section">
        <div className="container container--narrow">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'glossary' }]} />
          <h1 className="statement" data-split>The terms behind AI search, websites, SEO, and PPC — explained plainly.</h1>
          <p className="lede" data-reveal>{GLOSSARY.length} terms, in plain English, covering everything from Core Web Vitals to Generative Engine Optimization to Quality Score. No jargon left unexplained.</p>
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
            <a href="/onboarding" className="btn btn--solid btn--big">Schedule a Consultation</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>
    </main>
  );
}
