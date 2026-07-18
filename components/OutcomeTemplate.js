import Breadcrumbs from './Breadcrumbs';
import HeroQuickForm from './HeroQuickForm';
import TopicMarquee from './TopicMarquee';

export default function OutcomeTemplate({ outcome }) {
  return (
    <main id="top">

      <section className="page-hero page-hero--left section" style={{ paddingBottom: '3rem' }}>
        <div className="container seo-hero__grid">
          <div>
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Outcomes', href: '/outcomes' },
              { label: outcome.title },
            ]} />
            <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>{outcome.eyebrow}</p>
            <h1 className="statement" data-split style={{ textAlign: 'left', marginInline: 0 }}>{outcome.heroLines.join(' ')}</h1>
            <p className="lede" data-reveal style={{ marginInline: 0 }} dangerouslySetInnerHTML={{ __html: outcome.lede }} />
            <div className="hero__ctas" data-reveal style={{ justifyContent: 'flex-start' }}>
              <a href="/onboarding" className="btn btn--solid">Talk to us about {outcome.title.toLowerCase()}</a>
              <a href="#how" className="btn btn--ghost">How it works</a>
            </div>
          </div>
          <div>
            <HeroQuickForm />
          </div>
        </div>
      </section>
      <TopicMarquee topics={[outcome.title, outcome.metric, "Traffic Growth", "Revenue Increase", "Search Performance"]} />


      {/* ══════════ Proof stats ══════════ */}
      <section className="numbers section section--tint" id="results">
        <div className="container numbers__grid">
          <div className="numbers__intro">
            <p className="numbers__lede" data-reveal>Real client outcomes, not projected estimates.</p>
          </div>
          <ul className="numbers__list">
            {outcome.stats.map((s) => (
              <li className="numbers__item" key={s.label} data-reveal>
                <span className="numbers__value">
                  {s.prefix}
                  <i
                    data-count={s.value}
                    data-decimals={s.decimals}
                    {...(s.plain ? { 'data-plain': true } : {})}
                  >0</i>
                  {s.suffix}
                </span>
                <span className="numbers__label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══════════ Proof statement ══════════ */}
      <section className="about section" id="how">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>{outcome.proof.eyebrow}</p>
          <h2 className="statement statement--small" data-split>{outcome.proof.statement}</h2>
        </div>
      </section>

      {/* ══════════ Capabilities ══════════ */}
      <section className="section section--tint" id="included">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>How we get there</p>
        </div>
        <div className="container">
          <div className="capability-grid">
            {outcome.capabilities.map((c) => (
              <div className="capability-card" key={c.title} data-reveal>
                <span className="capability-card__tag">{c.tag}</span>
                <h3 className="capability-card__title">{c.title}</h3>
                <p className="capability-card__desc" dangerouslySetInnerHTML={{ __html: c.desc }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ Process ══════════ */}
      <section className="section" id="process">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>How it runs</p>
          <h2 className="statement statement--small" data-split>A defined process, not an open-ended retainer.</h2>
        </div>
        <div className="container container--narrow">
          <ul className="process__list">
            {outcome.process.map((p) => (
              <li className="process__item" key={p.step} data-reveal>
                <span className="process__step">{p.step}</span>
                <div>
                  <h3 className="process__title">{p.title}</h3>
                  <p className="process__desc">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section className="faq section section--tint" id="faq">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Common questions</p>
          <h2 className="statement statement--small" data-reveal style={{ marginBottom: '3rem' }}>{outcome.title}, plainly explained.</h2>
          <dl className="faq__list">
            {outcome.faqs.map((f) => (
              <div className="faq__item" key={f.q} data-reveal>
                <dt>{f.q}</dt>
                <dd dangerouslySetInnerHTML={{ __html: f.a }} />
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="cta section" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-split>{outcome.ctaTitle}</h2>
          <div className="cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Book a strategy call</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
