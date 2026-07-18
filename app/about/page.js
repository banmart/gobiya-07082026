import { buildMetadata } from '../../lib/meta';
import HeroQuickForm from '../../components/HeroQuickForm';

export const metadata = buildMetadata({
  title: 'About — Los Angeles Internet Marketing Consulting Firm',
  description:
    'Gobiya is a Los Angeles internet marketing consulting firm founded in 2010 by Steve Martin. BBB A+ rated, Google Partner 2015–2019.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <main id="top">

      <section className="page-hero page-hero--left section">
        <div className="container seo-hero__grid">
          <div>
            <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>About Gobiya</p>
            <h1 className="statement" data-split style={{ textAlign: 'left', marginInline: 0 }}>Fourteen years recovering traffic that algorithm updates took away.</h1>
            <p className="lede" data-reveal style={{ marginInline: 0 }}>Gobiya is a Los Angeles internet marketing consulting firm, founded in 2010 by Steve Martin and incorporated as an LLC in 2012. BBB A+ rated. Certified Google Partner, 2015–2019.</p>
          </div>
          <div>
            <HeroQuickForm />
          </div>
        </div>
      </section>

      {/* ══════════ Timeline ══════════ */}
      <section className="numbers section" id="timeline">
        <div className="container numbers__grid">
          <div className="numbers__intro">
            <p className="numbers__lede" data-reveal>Gobiya&apos;s specialization in algorithm recovery and, more recently, AI visibility, comes from tracking search behavior continuously since before "internet marketing consulting" was a common practice.</p>
            <a href="/ai-visibility" className="link-arrow" data-reveal>Our AI visibility approach<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
          </div>
          <ul className="numbers__list">
            <li className="numbers__item" data-reveal>
              <span className="numbers__label">Gobiya founded by Steve Martin in Los Angeles</span>
              <span className="numbers__value">2010</span>
            </li>
            <li className="numbers__item" data-reveal>
              <span className="numbers__label">Tracking every major Google algorithm shift, starting with Panda</span>
              <span className="numbers__value">2011</span>
            </li>
            <li className="numbers__item" data-reveal>
              <span className="numbers__label">Gobiya LLC incorporated</span>
              <span className="numbers__value">2012</span>
            </li>
            <li className="numbers__item" data-reveal>
              <span className="numbers__label">Certified Google Partner</span>
              <span className="numbers__value">2015–19</span>
            </li>
            <li className="numbers__item" data-reveal>
              <span className="numbers__label">AI visibility &amp; GEO added as a core specialization</span>
              <span className="numbers__value">Now</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="cta section" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-split>Fourteen years of algorithm recovery, ready to look at your traffic.</h2>
          <div className="cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Book a strategy call</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
