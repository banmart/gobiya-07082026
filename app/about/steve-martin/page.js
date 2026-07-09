import SplitText from '../../../components/SplitText';

export const metadata = {
  title: 'Steve Martin — Founder',
  description:
    'Steve Martin is the founder and principal of Gobiya, a Los Angeles technical SEO and AI-visibility agency. 25+ years in web development and search, tracking every major Google algorithm update since Panda in 2011.',
};

export default function SteveMartinPage() {
  return (
    <main id="top">

      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>About · Steve Martin</p>
          <SplitText tag="h1" className="statement" text="Twenty-five years of watching search change, and adapting every time." splitType="words" delay={18} duration={0.9} />
          <p className="lede" data-reveal>Founder and Principal of Gobiya. Steve has worked in web development and search since 1996 — long enough to have built for the web before Google existed, and to have tracked every major shift in how it ranks pages since.</p>
        </div>
      </section>

      {/* ══════════ Founder ══════════ */}
      <section className="founder section section--tint" id="founder">
        <div className="container founder__grid">
          <div className="founder__portrait" data-reveal aria-hidden="true">
            <span>SM</span>
          </div>
          <div className="founder__text">
            <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Founder &amp; Principal</p>
            <h2 className="founder__name" data-reveal>Steve Martin</h2>
            <p className="founder__role" data-reveal>Gobiya, Los Angeles</p>
            <p className="founder__bio" data-reveal>Steve founded Gobiya in 2010 after more than a decade already spent in web development and search, including time at AT&amp;T WorldNet and Webcastr.com. Gobiya was incorporated as an LLC in 2012 and earned Google Partner certification from 2015 through 2019. Steve is bilingual in English and Spanish, and works directly with clients rather than handing engagements off to an account team.</p>
            <a href="/contact" className="link-arrow" data-reveal>Talk to Steve<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
          </div>
        </div>
      </section>

      {/* ══════════ Philosophy ══════════ */}
      <section className="about section" id="philosophy">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>On algorithm recovery</p>
          <h2 className="statement statement--small" data-words>“Every update since Panda has punished the same thing, in a different disguise: sites that were built for search engines instead of the people using them.”</h2>
        </div>
      </section>

      {/* ══════════ Specialties ══════════ */}
      <section className="section section--tint" id="specialties">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Where Steve focuses</p>
        </div>
        <div className="container">
          <div className="capability-grid">
            <div className="capability-card" data-reveal>
              <span className="capability-card__tag">Diagnosis</span>
              <h3 className="capability-card__title">Algorithm & penalty recovery</h3>
              <p className="capability-card__desc">Fourteen years of tracking Google&apos;s core updates means recognizing the pattern of a new one fast, and knowing which fixes actually address it versus which just look like activity.</p>
            </div>
            <div className="capability-card" data-reveal>
              <span className="capability-card__tag">Engineering</span>
              <h3 className="capability-card__title">Technical SEO & development</h3>
              <p className="capability-card__desc">A background in hands-on web development means technical recommendations come from someone who has actually built and shipped the fix, not just diagnosed it from a report.</p>
            </div>
            <div className="capability-card" data-reveal>
              <span className="capability-card__tag">Frontier</span>
              <h3 className="capability-card__title">AI visibility & GEO</h3>
              <p className="capability-card__desc">The same instinct that tracked Panda, Penguin, and Core Updates in real time is now applied to how AI Overviews, ChatGPT, and Perplexity decide what to cite.</p>
            </div>
            <div className="capability-card" data-reveal>
              <span className="capability-card__tag">Access</span>
              <h3 className="capability-card__title">Bilingual client relationships</h3>
              <p className="capability-card__desc">English and Spanish fluency means direct communication with a broader range of Los Angeles business owners, without anything getting lost in translation between agency and client.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ Timeline ══════════ */}
      <section className="numbers section" id="timeline">
        <div className="container numbers__grid">
          <div className="numbers__intro">
            <p className="numbers__lede" data-reveal>A career spent adjusting to search, not fighting it.</p>
            <a href="/about" className="link-arrow" data-reveal>The Gobiya story<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
          </div>
          <ul className="numbers__list">
            <li className="numbers__item" data-reveal>
              <span className="numbers__label">Begins working in web development and search</span>
              <span className="numbers__value">1996</span>
            </li>
            <li className="numbers__item" data-reveal>
              <span className="numbers__label">Digital marketing and engineering roles, including AT&amp;T WorldNet and Webcastr.com</span>
              <span className="numbers__value">1996–2010</span>
            </li>
            <li className="numbers__item" data-reveal>
              <span className="numbers__label">Founds Gobiya in Los Angeles</span>
              <span className="numbers__value">2010</span>
            </li>
            <li className="numbers__item" data-reveal>
              <span className="numbers__label">Begins tracking every major Google algorithm shift, starting with Panda</span>
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
              <span className="numbers__label">AI visibility and GEO added as a core specialization</span>
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
