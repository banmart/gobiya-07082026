import HeroQuickForm from '../../components/HeroQuickForm';
import { CASE_STUDIES } from '../../lib/work';
import { buildMetadata } from '../../lib/meta';
import TopicMarquee from '../../components/TopicMarquee';
import Chapter from '../../components/sections/Chapter';
import Breadcrumbs from '../../components/Breadcrumbs';

export const metadata = buildMetadata({
  title: 'Our Work | Los Angeles SEO Client Results & Case Studies',
  description:
    'See real case studies and search growth results from our Los Angeles SEO agency. Learn how we help California businesses grow online.',
  path: '/work',
});

export default function WorkPage() {
  return (
    <main id="top">

      
      <section className="page-hero page-hero--left section" style={{ paddingBottom: '3rem' }}>
        <div className="container seo-hero__grid">
          <div>
            
        
          <div>
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'work' }]} />
            <h1 className="statement" style={{ textAlign: 'left', marginInline: 0 }} data-split>Los Angeles SEO Results &amp; Proven Client Success</h1>
          </div>
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
      <TopicMarquee topics={["Search Console Evidence", "Verifiable Client Wins", "Traffic & Lead Growth", "E-Commerce & Local SEO", "Client Success Stories"]} />



      {/* ══════════ Case studies ══════════ */}
      <section className="section" id="cases">
        <div className="container">
          <Chapter n={1} label="Selected engagements" title="Every one measured against the same standard: traffic, rankings, and sales that actually moved." />
          <div className="capability-grid" data-stagger>
            {CASE_STUDIES.map((c) => (
              <div className="capability-card" key={c.client}>
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
          <Chapter n={2} label="Who we've built for" title="Local service businesses and B2B companies, built to show up in Google and get recommended by AI." />
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            <span className="marquee__item">SmileCenter.com</span><i>✳</i>
            <span className="marquee__item marquee__item--serif">American Livescan</span><i>✳</i>
            <span className="marquee__item">Safety-Centric.com</span><i>✳</i>
            <span className="marquee__item marquee__item--serif">QuickPassAiD.Com</span><i>✳</i>
            <span className="marquee__item">The ARK</span><i>✳</i>
            <span className="marquee__item marquee__item--serif">RemodelMePros.com</span><i>✳</i>
          </div>
        </div>
        <div className="marquee marquee--reverse" aria-hidden="true">
          <div className="marquee__track">
            <span className="marquee__item marquee__item--serif">The Healing Metta</span><i>✳</i>
            <span className="marquee__item">Trusted Home Contractors</span><i>✳</i>
            <span className="marquee__item marquee__item--serif">TotalCapitalInc.Com</span><i>✳</i>
            <span className="marquee__item">Tidder</span><i>✳</i>
            <span className="marquee__item marquee__item--serif">QuickPassAiD.Com</span><i>✳</i>
            <span className="marquee__item">American Livescan</span><i>✳</i>
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="cta section" id="contact">
        <div className="container container--narrow">
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
