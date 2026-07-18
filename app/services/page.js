import { SERVICES } from '../../lib/services';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Consulting Services — SEO, AI Visibility & Growth Marketing',
  description:
    'Gobiya internet marketing consulting services: technical SEO & discoverability, copywriting and content strategy, digital PR and link building, GEO/AI writing, CRO, Google Ads and AI creative, and full-stack web development.',
  path: '/services',
});

const PILLARS = ['Performance', 'Creativity', 'Relations'];

export default function ServicesPage() {
  const byPillar = PILLARS.map((pillar) => ({
    pillar,
    items: Object.values(SERVICES).filter((s) => s.pillar === pillar),
  }));

  return (
    <main id="top">

      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Consulting</p>
          <h1 className="statement" data-split>Every lever, built to work together.</h1>
          <p className="lede" data-reveal>Performance, creativity, and relations — three disciplines that compound instead of compete when they're run by one team.</p>
        </div>
      </section>

      {byPillar.map(({ pillar, items }) => (
        <section className="section" id={pillar.toLowerCase()} key={pillar}>
          <div className="container">
            <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>{pillar}</p>
            <div className="insights__grid">
              {items.map((s) => (
                <a className="insights__card" href={`/services/${s.slug}`} key={s.slug} data-reveal>
                  <span className="insights__card-cat">{s.pillar}</span>
                  <h2 className="insights__card-title">{s.title}</h2>
                  <p className="insights__card-dek">{s.metaDescription}</p>
                  <span className="link-arrow">Learn more<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></span>
                </a>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="cta section section--tint" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-split>Not sure which service you need?</h2>
          <div className="cta__actions" data-reveal>
            <a href="mailto:hello@gobiya.com" className="btn btn--solid btn--big">hello@gobiya.com</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
