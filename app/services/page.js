import HeroQuickForm from '../../components/HeroQuickForm';
import { SERVICES } from '../../lib/services';
import { buildMetadata } from '../../lib/meta';
import TopicMarquee from '../../components/TopicMarquee';

export const metadata = buildMetadata({
  title: 'SEO Services & Digital Marketing Agency — Gobiya',
  description:
    'Gobiya digital marketing agency services: SEO services, search engine marketing, content optimization, digital PR and link building, GEO/AI writing, CRO, Google Ads, and full-stack web development.',
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

      
      <section className="page-hero page-hero--left section" style={{ paddingBottom: '3rem' }}>
        <div className="container seo-hero__grid">
          <div>
            
        
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Consulting</p>
          <h1 className="statement" style={{ textAlign: 'left', marginInline: 0 }} data-split>Every lever, built to work together.</h1>
          <p className="lede" style={{ marginInline: 0 }} data-reveal>Performance, creativity, and relations — three disciplines that compound instead of compete when they're run by one team.</p>
        
          </div>
          <div>
            <HeroQuickForm />
          </div>
        </div>
      </section>
      <TopicMarquee topics={["Core Services", "Technical SEO", "AI Optimization", "Link Building", "Web Development"]} />



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

      <section className="faq section" id="faq">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Common questions</p>
          <h2 className="statement statement--small" data-reveal style={{ marginBottom: '3rem' }}>
            SEO and digital marketing, plainly explained.
          </h2>
          <dl className="faq__list">
            <div className="faq__item" data-reveal>
              <dt>How do SEO services compare to content marketing?</dt>
              <dd>SEO services cover the full system: technical foundation, site authority, content strategy, and on-page optimization. Content marketing is the editorial and production side — writing, publishing, and distributing content. In practice, content marketing without SEO produces pieces that are well-written but rarely found; SEO without content produces a technically clean site with nothing worth ranking. Gobiya runs both as a single system — every piece is planned around real search demand and written to rank and convert. <a href="/services/seo-web-copywriting">See how SEO copywriting and content strategy work together.</a></dd>
            </div>
            <div className="faq__item" data-reveal>
              <dt>What is the difference between an SEO agency and a digital marketing agency?</dt>
              <dd>An SEO agency focuses on organic search visibility — rankings, traffic, and the technical and content work that drives both. A digital marketing agency typically covers a broader set of channels: paid search, paid social, email, creative, and branding alongside SEO. Gobiya operates at the intersection: search-first strategy across SEO, content, and paid search, run as an integrated system rather than siloed channels. <a href="/services/google-ads-ppc">See how search engine marketing integrates with our paid search work.</a></dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="cta section section--tint" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-split>Not sure which service you need?</h2>
          <div className="cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Book a strategy call</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
