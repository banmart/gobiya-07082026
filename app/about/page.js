import Image from 'next/image';
import SplitText from '../../components/SplitText';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'About — Los Angeles Technical SEO & AI Visibility Agency',
  description:
    'Gobiya is a Los Angeles technical SEO and AI visibility agency founded in 2010 by Steve Martin. BBB A+ rated, Google Partner 2015–2019.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <main id="top">

      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>About Gobiya</p>
          <SplitText tag="h1" className="statement" text="Fourteen years recovering traffic that algorithm updates took away." splitType="words" delay={18} duration={0.9} />
          <p className="lede" data-reveal>Gobiya is a Los Angeles technical SEO and AI-visibility agency, founded in 2010 by Steve Martin and incorporated as an LLC in 2012. BBB A+ rated. Certified Google Partner, 2015–2019.</p>
        </div>
      </section>

      {/* ══════════ Founder ══════════ */}
      <section className="founder section section--tint" id="founder">
        <div className="container founder__grid">
          <div className="founder__portrait" data-reveal>
            <Image src="/assets/img/steve-portrait.webp" alt="Steve Martin, founder of Gobiya" fill sizes="(max-width: 768px) 90vw, 42vw" priority />
          </div>
          <div className="founder__text">
            <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Founder</p>
            <h2 className="founder__name" data-reveal>Steve Martin</h2>
            <p className="founder__role" data-reveal>Founder &amp; Principal, Gobiya</p>
            <p className="founder__bio" data-reveal>Steve has worked in web development and search since 1996, bringing 25+ years of digital marketing and engineering experience — including time at AT&amp;T WorldNet and Webcastr.com — to every engagement. He has tracked and adapted to every major Google algorithm shift since Panda in 2011, which is the foundation of Gobiya&apos;s specialty in recovering traffic after algorithm updates.</p>
            <a href="/contact" className="link-arrow" data-reveal>Talk to Steve<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
          </div>
        </div>
      </section>

      {/* ══════════ Timeline ══════════ */}
      <section className="numbers section" id="timeline">
        <div className="container numbers__grid">
          <div className="numbers__intro">
            <p className="numbers__lede" data-reveal>Gobiya&apos;s specialization in algorithm recovery and, more recently, AI visibility, comes from tracking search behavior continuously since before "SEO agency" was a common job title.</p>
            <a href="/ai-visibility" className="link-arrow" data-reveal>Our AI visibility approach<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
          </div>
          <ul className="numbers__list">
            <li className="numbers__item" data-reveal>
              <span className="numbers__label">Steve begins working in web development and search</span>
              <span className="numbers__value">1996</span>
            </li>
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
          <h2 className="cta__title" data-words>Work directly with the person who does the work.</h2>
          <div className="cta__actions" data-reveal>
            <a href="mailto:hello@gobiya.com" className="btn btn--solid btn--big">hello@gobiya.com</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
