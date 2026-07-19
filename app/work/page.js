import HeroQuickForm from '../../components/HeroQuickForm';
import { CASE_STUDIES } from '../../lib/work';
import { buildMetadata } from '../../lib/meta';
import TopicMarquee from '../../components/TopicMarquee';

export const metadata = buildMetadata({
  title: 'Work — Client Results',
  description:
    'Selected client work from Gobiya: technical SEO rebuilds, algorithm recovery, and AI-visibility engineering across dental, local service, and B2B clients.',
  path: '/work',
});

export default function WorkPage() {
  return (
    <main id="top">

      
      <section className="page-hero page-hero--left section" style={{ paddingBottom: '3rem' }}>
        <div className="container seo-hero__grid">
          <div>
            
        
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Selected work</p>
          <h1 className="statement" style={{ textAlign: 'left', marginInline: 0 }} data-split>Real businesses. Measurable recovery and growth.</h1>
          <p className="lede" style={{ marginInline: 0 }} data-reveal>A sample of engagements across local service, healthcare, and B2B clients — each one measured against the same standard: traffic, rankings, and sales that actually moved.</p>
          <div className="hero__ctas" data-reveal>
            <a href="/onboarding" className="btn btn--solid">Start your own case study</a>
            <a href="#cases" className="btn btn--ghost">See the work</a>
          </div>
        
          </div>
          <div>
            <HeroQuickForm />
          </div>
        </div>
      </section>
      <TopicMarquee topics={["Client Portfolio", "Success Stories", "SEO Case Studies", "Search Dominance", "Proven Results"]} />



      {/* ══════════ Case studies ══════════ */}
      <section className="section" id="cases">
        <div className="container">
          <div className="capability-grid">
            {CASE_STUDIES.map((c) => (
              <div className="capability-card" key={c.client} data-reveal>
                {c.media?.logo && (
                  <div style={{ marginBottom: '1.25rem', height: '40px', display: 'flex', alignItems: 'center' }}>
                    <img src={c.media.logo} alt={`${c.client} logo`} style={{ maxHeight: '100%', maxWidth: '140px', objectFit: 'contain' }} />
                  </div>
                )}
                <a href={c.industryHref} className="capability-card__tag">{c.tag}</a>
                <h3 className="capability-card__title">{c.study ? <a href={`/work/${c.slug}`}>{c.client}</a> : c.client}</h3>
                <p className="capability-card__desc" style={{ color: 'var(--dark)', fontWeight: 550, marginBottom: '0.6rem' }}>{c.result}</p>
                <p className="capability-card__desc">{c.desc}</p>
                {c.study ? (
                  <a href={`/work/${c.slug}`} className="link-arrow" style={{ marginTop: '1.25rem' }}>Read the case study<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
                ) : (
                  <a href={c.outcomeHref} className="link-arrow" style={{ marginTop: '1.25rem' }}>See {c.tag}<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ Client sectors marquee ══════════ */}
      <section className="portfolio section section--tint" id="clients">
        <div className="container container--narrow portfolio__head">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Who we&apos;ve built for</p>
          <h2 className="statement statement--small" data-split>Local service businesses and B2B firms, engineered for search and cited by AI.</h2>
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            <span className="marquee__item">Smile Center Dentistry</span><i>✳</i>
            <span className="marquee__item marquee__item--serif">American Livescan</span><i>✳</i>
            <span className="marquee__item">SafetyCentric</span><i>✳</i>
            <span className="marquee__item marquee__item--serif">QuickPass AiD</span><i>✳</i>
            <span className="marquee__item">The ARK</span><i>✳</i>
            <span className="marquee__item marquee__item--serif">Remodel Me Pros</span><i>✳</i>
          </div>
        </div>
        <div className="marquee marquee--reverse" aria-hidden="true">
          <div className="marquee__track">
            <span className="marquee__item marquee__item--serif">The Healing Metta</span><i>✳</i>
            <span className="marquee__item">Trusted Home Contractors</span><i>✳</i>
            <span className="marquee__item marquee__item--serif">Total Capital</span><i>✳</i>
            <span className="marquee__item">Tidder</span><i>✳</i>
            <span className="marquee__item marquee__item--serif">QuickPass AiD</span><i>✳</i>
            <span className="marquee__item">American Livescan</span><i>✳</i>
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="cta section" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-split>Become the next result on this page.</h2>
          <div className="cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Book a strategy call</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
