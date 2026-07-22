import { buildMetadata } from '../../lib/meta';
import HeroQuickForm from '../../components/HeroQuickForm';
import TopicMarquee from '../../components/TopicMarquee';

export const metadata = buildMetadata({
  title: 'About Gobiya | Los Angeles SEO & Marketing Firm',
  description:
    'Gobiya is a Los Angeles internet marketing consulting firm founded in 2010 by Steve Martin — BBB A+ rated, Google Partner 2015-2019. Free SEO audit.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <main id="top">

      <section className="page-hero page-hero--left section">
        <div className="container seo-hero__grid">
          <div>
            <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>About Gobiya · Los Angeles SEO Agency Since 2010</p>
            <h1 className="statement" data-split style={{ textAlign: 'left', marginInline: 0 }}>Fourteen years recovering traffic that algorithm updates took away.</h1>
            <p className="lede" data-reveal style={{ marginInline: 0 }}>Gobiya is a Los Angeles internet marketing consulting firm, founded in 2010 by Steve Martin and incorporated as an LLC in 2012. BBB A+ rated. Certified Google Partner, 2015–2019.</p>
          </div>
          <div>
            <HeroQuickForm />
          </div>
        </div>
      </section>
      <TopicMarquee topics={["Gobiya History", "Algorithm Recovery", "Los Angeles Agency", "Search First Consulting", "Since 2010"]} />


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

      {/* ══════════ FAQ ══════════ */}
      <section className="faq section" id="faq">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Common questions</p>
          <h2 className="statement statement--small" data-reveal style={{ marginBottom: '3rem' }}>
            About Gobiya, plainly explained.
          </h2>
          <dl className="faq__list">
            <div className="faq__item" data-reveal>
              <dt>Is Gobiya really based in Los Angeles, or is this a marketing front for an offshore team?</dt>
              <dd dangerouslySetInnerHTML={{ __html: 'One real office at 3580 Wilshire Blvd in Los Angeles, founded and still run day-to-day by Steve Martin. <a href="/about/steve-martin">Meet Steve</a>, or see the office details on our <a href="/contact">contact page</a>.' }} />
            </div>
            <div className="faq__item" data-reveal>
              <dt>How big is the Gobiya team, and will I actually work with senior people?</dt>
              <dd dangerouslySetInnerHTML={{ __html: 'Gobiya is built around direct access to the person doing the strategy work, rather than an account-management layer between you and execution. <a href="/about/steve-martin">Steve runs engagements directly</a>, instead of handing them off to a rotating junior team.' }} />
            </div>
            <div className="faq__item" data-reveal>
              <dt>Does Gobiya only work with businesses in Los Angeles?</dt>
              <dd dangerouslySetInnerHTML={{ __html: 'Our roots and a lot of our referral relationships are in Los Angeles, but the work itself — technical SEO, GEO, content, and paid search — travels. We work with local and national clients alike; see examples across industries in <a href="/work">our case studies</a>.' }} />
            </div>
            <div className="faq__item" data-reveal>
              <dt>Why has Gobiya been around since 2010 while a lot of agencies don&apos;t last?</dt>
              <dd dangerouslySetInnerHTML={{ __html: 'Because the company was built around adapting to how search actually changes, not a single fixed playbook. <a href="/about/approach">Our approach</a> walks through the process that&apos;s been rebuilt as algorithms and AI answer engines have evolved over fourteen years.' }} />
            </div>
          </dl>
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
