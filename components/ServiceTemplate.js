import Breadcrumbs from './Breadcrumbs';
import { SERVICES } from '../lib/services';
import HeroQuickForm from './HeroQuickForm';
import TopicMarquee from './TopicMarquee';

export default function ServiceTemplate({ service }) {
  return (
    <main id="top">

      <section className="page-hero page-hero--left section" style={{ paddingBottom: '3rem' }}>
        <div className="container seo-hero__grid">
          <div>
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Consulting', href: '/services' },
              { label: service.title },
            ]} />
            <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>{service.pillar} &middot; {service.title}</p>
            <h1 className="statement" data-split style={{ textAlign: 'left', marginInline: 0 }}>{service.heroLines.join(' ')}</h1>
            <p className="lede" data-reveal style={{ marginInline: 0 }} dangerouslySetInnerHTML={{ __html: service.lede }} />
            <div className="hero__ctas" data-reveal style={{ justifyContent: 'flex-start' }}>
              <a href="/onboarding" className="btn btn--solid">Get a free audit</a>
              <a href="#included" className="btn btn--ghost">What&apos;s included</a>
            </div>
          </div>
          <div>
            <HeroQuickForm />
          </div>
        </div>
      </section>
      <TopicMarquee topics={[service.title, service.pillar, ...service.capabilities.map(c => c.title), "Enterprise SEO"]} />


      {/* ══════════ Problem ══════════ */}
      <section className="about section section--tint" id="problem">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>{service.problem.eyebrow}</p>
          <h2 className="statement statement--small" data-split>{service.problem.statement}</h2>
        </div>
      </section>

      {/* ══════════ Capabilities ══════════ */}
      <section className="section" id="included">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>What&apos;s included</p>
        </div>
        <div className="container">
          <div className="capability-grid">
            {service.capabilities.map((c) => (
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
      <section className="section section--tint" id="process">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>How it runs</p>
          <h2 className="statement statement--small" data-split>A defined process, not an open-ended retainer.</h2>
        </div>
        <div className="container container--narrow">
          <ul className="process__list">
            {service.process.map((p) => (
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
      <section className="faq section" id="faq">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Common questions</p>
          <h2 className="statement statement--small" data-reveal style={{ marginBottom: '3rem' }}>{service.title}, plainly explained.</h2>
          <dl className="faq__list">
            {service.faqs.map((f) => (
              <div className="faq__item" key={f.q} data-reveal>
                <dt>{f.q}</dt>
                <dd dangerouslySetInnerHTML={{ __html: f.a }} />
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ══════════ Related consulting ══════════ */}
      <section className="related section section--tint" id="related">
        <div className="container">
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Related consulting</p>
          <div className="related__grid">
            {(() => {
              const siblings = Object.values(SERVICES).filter((s) => s.slug !== service.slug);
              const related = [
                ...siblings.filter((s) => s.pillar === service.pillar),
                ...siblings.filter((s) => s.pillar !== service.pillar),
              ].slice(0, 3);
              return related.map((s) => (
                <a className="svc-card" href={`/services/${s.slug}`} key={s.slug} data-reveal>
                  <span className="svc-card__tag">{s.pillar}</span>
                  <h3 className="svc-card__title">{s.title}</h3>
                  <p className="svc-card__desc">{s.blurb}</p>
                </a>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="cta section" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-split>{service.ctaTitle}</h2>
          <div className="cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Book a strategy call</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
