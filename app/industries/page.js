import HeroQuickForm from '../../components/HeroQuickForm';
import { INDUSTRIES } from '../../lib/industries';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Industries — SEO for Enterprise, Local, Healthcare & Professional Services',
  description:
    'Gobiya works across enterprise & B2B, local service businesses, healthcare & dental, and professional services — each with its own buyer journey and search behavior.',
  path: '/industries',
});

export default function IndustriesPage() {
  const industries = Object.values(INDUSTRIES);

  return (
    <main id="top">

      
      <section className="page-hero page-hero--left section" style={{ paddingBottom: '3rem' }}>
        <div className="container seo-hero__grid">
          <div>
            
        
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Industries</p>
          <h1 className="statement" style={{ textAlign: 'left', marginInline: 0 }} data-split>Every industry searches differently.</h1>
          <p className="lede" style={{ marginInline: 0 }} data-reveal>A B2B buyer, a patient, and a homeowner calling a plumber all use search completely differently — we build for the one you're actually selling to.</p>
        
          </div>
          <div>
            <HeroQuickForm />
          </div>
        </div>
      </section>


      <section className="section" id="industries">
        <div className="container">
          <div className="insights__grid">
            {industries.map((ind) => (
              <a className="insights__card" href={`/industries/${ind.slug}`} key={ind.slug} data-reveal>
                <span className="insights__card-cat">Industry</span>
                <h2 className="insights__card-title">{ind.title}</h2>
                <p className="insights__card-dek">{ind.metaDescription}</p>
                <span className="link-arrow">Learn more<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="cta section section--tint" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-split>Don't see your industry listed?</h2>
          <div className="cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Book a strategy call</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
