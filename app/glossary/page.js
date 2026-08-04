import { GLOSSARY } from '../../lib/glossary';
import GlossaryIndex from '../../components/GlossaryIndex';
import TopicMarquee from '../../components/TopicMarquee';
import Breadcrumbs from '../../components/Breadcrumbs';
import SubHero from '../../components/SubHero';
import ClientLogos from '../../components/ClientLogos';
import { heroImage } from '../../lib/heroImages';
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

      {/* ══ 2. Hero — Image Background ONLY ══ */}
      <SubHero
        image={heroImage(6)}
        imageOnly={true}
      />

      <section className="page-hero section" style={{ paddingBottom: '1rem' }}>
        <div className="container container--narrow">
          <Breadcrumbs inHero items={[{ label: 'Home', href: '/' }, { label: 'Glossary' }]} />
          <h1 className="statement" data-split>Every Term You’ll Hear From an SEO, Finally in Plain English</h1>
          <p className="lede" data-reveal>{`${GLOSSARY.length} terms covering everything from Core Web Vitals to Generative Engine Optimization to Quality Score. No jargon left unexplained.`}</p>
        </div>
      </section>

      <TopicMarquee topics={["AI & GEO Terms", "Website & Technical Terms", "SEO Terms", "PPC & Google Ads Terms"]} />

      <section className="section" id="terms">
        <div className="container container--narrow">
          <GlossaryIndex terms={GLOSSARY} />
        </div>
      </section>

      {/* ══ Client Logo Strip ══ */}
      <ClientLogos />

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
