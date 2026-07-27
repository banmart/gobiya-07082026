import Breadcrumbs from './Breadcrumbs';
import { CONSULTING_ITEMS } from '../lib/consultingIndex';
import HeroQuickForm from './HeroQuickForm';
import TopicMarquee from './TopicMarquee';
import StoryMotif from './StoryMotif';
import HorizontalRail from './sections/HorizontalRail';
import Chapter from './sections/Chapter';
import { ServiceIcon } from './icons/HandDrawn';
import { getStory } from '../lib/serviceStory';

export default function ServiceTemplate({ service }) {
  const story = getStory(service.slug);
  return (
    <main id="top">

      <section className="page-hero page-hero--left section" style={{ paddingBottom: '3rem' }}>
        <div className="container seo-hero__grid">
          <div>
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.slug },
            ]} />
            <h1 className="statement" data-split style={{ textAlign: 'left', marginInline: 0 }}>{service.heroLines.join(' ')}</h1>
            <p className="lede" data-reveal style={{ marginInline: 0 }} dangerouslySetInnerHTML={{ __html: service.lede }} />
            <div className="hero__ctas" data-reveal style={{ justifyContent: 'flex-start' }}>
              <a href="/onboarding" className="btn btn--solid">Get a free audit</a>
              <a href="#included" className="btn btn--ghost">What&apos;s included</a>
            </div>
          </div>
          <div>
            <HeroQuickForm defaultService={service.title} />
          </div>
        </div>
      </section>
      <TopicMarquee topics={service.capabilities ? service.capabilities.map(c => c.title) : ["Search Engineering", "Content Strategy", "Link Authority", "Schema Context"]} />


      {/* ══════════ 01 · The stakes ══════════ */}
      <section className="section stakes" id="stakes">
        <div className="container stakes__grid">
          <div className="stakes__text">
            <Chapter n={1} label={story.chapters[0].label} />
            <p className="stakes__line" data-split>{story.stakes || service.problem.statement}</p>
            {story.stakes && <p className="stakes__sub" data-reveal>{service.problem.statement}</p>}
          </div>
          <div className="stakes__figure" data-parallax="0.12">
            <StoryMotif motif={story.motif} label={story.motifLabel} />
          </div>
        </div>
      </section>

      {/* ══════════ 02 · The work ══════════ */}
      <section className="section" id="included">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <Chapter n={2} label={story.chapters[2].label} title={`What ${service.title.toLowerCase()} actually involves.`} />
        </div>
        <div className="container">
          <HorizontalRail label={`${service.title} capabilities`}>
            {service.capabilities.map((c) => (
              <article className="capability-card rail__card" key={c.title}>
                <span className="capability-card__tag">{c.tag}</span>
                <h3 className="capability-card__title">{c.title}</h3>
                <p className="capability-card__desc" dangerouslySetInnerHTML={{ __html: c.desc }} />
              </article>
            ))}
          </HorizontalRail>
        </div>
      </section>

      {/* ══════════ 03 · How it runs ══════════ */}
      <section className="section section--tint" id="process">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <Chapter n={3} label={story.chapters[3].label} title="A defined process, not an open-ended retainer." />
        </div>
        <div className="container container--narrow">
          <ul className="process__list process__list--timeline" data-timeline>
            <span className="process__spine" aria-hidden="true"><i data-timeline-fill /></span>
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
          <Chapter n={4} label={story.chapters[4].label} title={`${service.title}, plainly explained.`} />
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
          <div className="related__grid">
            {(() => {
              const siblings = CONSULTING_ITEMS.filter((s) => s.slug !== service.slug);
              const related = [
                ...siblings.filter((s) => s.tag === service.pillar),
                ...siblings.filter((s) => s.tag !== service.pillar),
              ].slice(0, 3);
              return related.map((s) => (
                <a className="svc-card" href={s.href} key={s.slug} data-reveal>
                  <ServiceIcon slug={s.slug} />
                  <span className="svc-card__tag">{s.tag}</span>
                  <h3 className="svc-card__title">{s.title}</h3>
                  <p className="svc-card__desc">{s.desc}</p>
                </a>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="cta section" id="contact">
        <div className="container container--narrow">
          <h2 className="cta__title" data-split>{service.ctaTitle}</h2>
          <div className="cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Schedule a Consultation</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
