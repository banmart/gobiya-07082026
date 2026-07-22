import Image from 'next/image';
import Breadcrumbs from './Breadcrumbs';
import HeroQuickForm from './HeroQuickForm';
import TopicMarquee from './TopicMarquee';
import { CONSULTING_ITEMS } from '../lib/consultingIndex';
import { ServiceIcon } from './icons/HandDrawn';

export default function FlatServiceTemplate({ service }) {
  return (
    <main id="top">

      <section className="page-hero page-hero--left section" style={{ paddingBottom: '3rem' }}>
        <div className="container seo-hero__grid">
          <div>
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Consulting', href: '/services' },
              { label: service.title.split(' - ')[0] },
            ]} />
            <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>{service.eyebrow}</p>
            <h1 className="statement" data-split style={{ textAlign: 'left', marginInline: 0 }}>{service.h1}</h1>
            <p className="lede" data-reveal style={{ marginInline: 0 }}>{service.intro}</p>
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
      <TopicMarquee topics={[service.title.split(' - ')[0], ...service.capabilities.slice(0, 3).map(c => c.title), 'Enterprise SEO']} />

      {/* ══════════ Real datapoint ══════════ */}
      <section className="seo-proof">
        <div className="container">
          <div className="seo-proof__grid" style={{ gridTemplateColumns: '1fr' }}>
            <a className="seo-proof__item" data-reveal href={service.datapoint.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className="seo-proof__value">
                <i data-count={service.datapoint.value} data-plain>{service.datapoint.value}</i>
                {service.datapoint.suffix && <em>{service.datapoint.suffix}</em>}
              </span>
              <span className="seo-proof__label">{service.datapoint.label}</span>
              <p style={{ fontSize: '0.8125rem', color: 'var(--hint)', marginTop: '0.5rem' }}>{service.datapoint.sourceNote}</p>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════ Testimonial ══════════ */}
      <section className="testimonials section section--dark" id="testimonial" aria-label={`What ${service.testimonial.company} said`}>
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center eyebrow--light" data-reveal><span className="eyebrow__dot"></span>In their own words</p>
          <div className="testimonial-rotator" data-reveal>
            <blockquote className="testimonial-rotator__quote">
              <p>{service.testimonial.quote}</p>
            </blockquote>
            <div className="testimonial-rotator__byline">
              <div className="testimonial-rotator__who">
                {service.testimonial.photo && (
                  <Image
                    src={service.testimonial.photo}
                    alt={service.testimonial.name || service.testimonial.company}
                    width={56}
                    height={56}
                    className="testimonial-rotator__photo"
                  />
                )}
                <p className="testimonial-rotator__attrib">
                  {service.testimonial.name && (
                    <>
                      <span className="testimonial-rotator__name">{service.testimonial.name}</span>
                      <span className="testimonial-rotator__sep" aria-hidden="true">&middot;</span>
                    </>
                  )}
                  <a href={service.testimonial.href} className="testimonial-rotator__company" style={{ textDecoration: 'underline' }}>{service.testimonial.company}</a>
                  <span className="testimonial-rotator__sep" aria-hidden="true">&middot;</span>
                  <span className="testimonial-rotator__role">{service.testimonial.role}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
          <h2 className="statement statement--small" data-reveal style={{ marginBottom: '3rem' }}>{service.title.split(' - ')[0]}, plainly explained.</h2>
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

      {/* ══════════ Related ══════════ */}
      <section className="related section section--tint" id="related">
        <div className="container">
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Related consulting</p>
          <div className="related__grid">
            {CONSULTING_ITEMS
              .filter((s) => s.slug !== service.slug)
              .slice(0, 3)
              .map((s) => (
                <a className="svc-card" href={s.href} key={s.slug} data-reveal>
                  <ServiceIcon slug={s.slug} />
                  <span className="svc-card__tag">{s.tag}</span>
                  <h3 className="svc-card__title">{s.title}</h3>
                </a>
              ))}
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
