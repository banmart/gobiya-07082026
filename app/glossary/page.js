import { GLOSSARY } from '../../lib/glossary';
import GlossaryIndex from '../../components/GlossaryIndex';
import TopicMarquee from '../../components/TopicMarquee';
import Breadcrumbs from '../../components/Breadcrumbs';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'SEO & AI Search Glossary | Plainly Defined',
  description:
    'Definitions for technical SEO, AI citations, GEO, web development, and Google Ads terms — plain English, written for site owners.',
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

      <section className="section" id="terms">
        <div className="container container--narrow">
          <GlossaryIndex terms={GLOSSARY} />
        </div>
      </section>


      <section className="cta section section--tint" id="contact">
        <div className="container container--narrow">
          <h2 className="cta__title">Don&apos;t see a term you&apos;re looking for?</h2>
          <div className="cta__actions">
            <a href="?onboarding=true" className="btn btn--solid btn--big">Schedule a Consultation</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>
    </main>
  );
}
