import Breadcrumbs from '../../../components/Breadcrumbs';
import { SERVICES } from '../../../lib/services';
import { buildMetadata } from '../../../lib/meta';
import HeroQuickForm from '../../../components/HeroQuickForm';
import TopicMarquee from '../../../components/TopicMarquee';

const service = SERVICES['seo-discoverability'];

export const metadata = buildMetadata({
  title: service.title,
  description: service.metaDescription,
  path: '/services/seo-discoverability',
});

const ARROW = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function SeoDiscoverabilityPage() {
  const siblings = Object.values(SERVICES).filter((s) => s.slug !== service.slug);
  const related = [
    ...siblings.filter((s) => s.pillar === service.pillar),
    ...siblings.filter((s) => s.pillar !== service.pillar),
  ].slice(0, 3);

  return (
    <>
      {/* Sets data-nav-light before first paint; removed once scrolled past hero */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function () {
          var html = document.documentElement;
          html.setAttribute('data-nav-light', '');
          function check() {
            var el = document.querySelector('.seo-hero');
            var h = el ? el.offsetHeight : window.innerHeight * 0.8;
            if (window.scrollY > h - 80) {
              html.removeAttribute('data-nav-light');
              window.removeEventListener('scroll', check);
            }
          }
          window.addEventListener('scroll', check, { passive: true });
        })();
      ` }} />
      <main id="top">

      {/* ══ 1. Dark split hero ══ */}
      <section className="seo-hero">
        <div className="container seo-hero__grid">

          <div className="seo-hero__left">
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Consulting', href: '/services' },
              { label: service.title },
            ]} />
            <p className="eyebrow eyebrow--light" data-reveal>
              <span className="eyebrow__dot"></span>{service.pillar} · {service.title}
            </p>
            <h1 className="seo-hero__title" data-split>
              {service.heroLines[0]}<br />{service.heroLines[1]}
            </h1>
            <p
              className="seo-hero__lede"
              data-reveal
              dangerouslySetInnerHTML={{ __html: service.lede }}
            />
            <div className="hero__ctas" data-reveal>
              <a href="/onboarding" className="btn btn--solid">Get a free audit</a>
              <a href="#included" className="btn btn--ghost btn--ghost-light">What&apos;s included</a>
            </div>
          </div>

          <aside className="seo-hero__right" aria-label="Request consultation">
            <HeroQuickForm />
          </aside>

        </div>
      </section>
      <TopicMarquee topics={["Technical SEO Audits", "Crawl Budget", "Indexation Fixes", "Site Architecture", "Schema Markup"]} />


      {/* ══ 2. Problem — pull-quote band ══ */}
      <section className="seo-pull" id="problem">
        <div className="container">
          <p className="eyebrow eyebrow--center" data-reveal>
            <span className="eyebrow__dot"></span>{service.problem.eyebrow}
          </p>
          <div className="seo-pull__inner">
            <i className="seo-pull__rule" data-rule></i>
            <p className="seo-pull__quote" data-split>
              {service.problem.statement}
            </p>
            <i className="seo-pull__rule" data-rule></i>
          </div>
        </div>
      </section>

      {/* ══ 3. Capabilities — pinned scroll (dark) ══ */}
      <section className="seo-pin" id="included" data-pin-scene>
        <div className="container">
          <div className="seo-pin__header">
            <p className="eyebrow eyebrow--light" data-reveal>
              <span className="eyebrow__dot"></span>What&apos;s included
            </p>
            <h2 className="statement statement--small seo-pin__heading" data-split>
              Four disciplines. One foundation.
            </h2>
          </div>
          <div className="seo-pin__cards">
            {service.capabilities.map((c, i) => (
              <div className="seo-pin__card" key={c.title} data-pin-row>
                <span className="seo-pin__card-num">0{i + 1}</span>
                <div className="seo-pin__card-meta">
                  <span className="seo-pin__card-tag">{c.tag}</span>
                  <h3 className="seo-pin__card-title">{c.title}</h3>
                </div>
                <p
                  className="seo-pin__card-desc"
                  dangerouslySetInnerHTML={{ __html: c.desc }}
                />
              </div>
            ))}
          </div>
          <div className="seo-pin__footer">
            <a href="/onboarding" className="link-arrow link-arrow--light" data-reveal>
              Start with a technical audit{ARROW}
            </a>
          </div>
        </div>
      </section>

      {/* ══ 4. Process — 3-column rows ══ */}
      <section className="section section--tint" id="process">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <p className="eyebrow eyebrow--center" data-reveal>
            <span className="eyebrow__dot"></span>How it runs
          </p>
          <h2 className="statement statement--small" data-split>
            A defined process, not an open-ended retainer.
          </h2>
        </div>
        <div className="container">
          <ul className="seo-process__list">
            {service.process.map((p) => (
              <li className="seo-process__row" key={p.step} data-reveal>
                <span className="seo-process__num">{p.step}</span>
                <h3 className="seo-process__title">{p.title}</h3>
                <p className="seo-process__desc">{p.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ 5. Proof stats — dark band ══ */}
      <section className="seo-proof">
        <div className="container">
          <div className="seo-proof__grid">
            <div className="seo-proof__item" data-reveal>
              <span className="seo-proof__value">
                +<i data-count="47" data-plain>47</i>
              </span>
              <span className="seo-proof__label">Page-one keywords gained after a technical rebuild</span>
            </div>
            <div className="seo-proof__item" data-reveal>
              <span className="seo-proof__value">
                <i data-count="61" data-plain>61</i><em>%</em>
              </span>
              <span className="seo-proof__label">Reduction in cost-per-lead once organic traffic recovered</span>
            </div>
            <div className="seo-proof__item" data-reveal>
              <span className="seo-proof__value">
                <i data-count="213" data-plain>213</i>K
              </span>
              <span className="seo-proof__label">Monthly search impressions for one client, post-fix</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. FAQ ══ */}
      <section className="faq section" id="faq">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal>
            <span className="eyebrow__dot"></span>Common questions
          </p>
          <h2 className="statement statement--small" data-reveal style={{ marginBottom: '3rem' }}>
            {service.title}, plainly explained.
          </h2>
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

      {/* ══ 7. Related consulting ══ */}
      <section className="related section section--tint" id="related">
        <div className="container">
          <p className="eyebrow" data-reveal>
            <span className="eyebrow__dot"></span>Related consulting
          </p>
          <div className="related__grid">
            {related.map((s) => (
              <a className="svc-card" href={`/services/${s.slug}`} key={s.slug} data-reveal>
                <span className="svc-card__tag">{s.pillar}</span>
                <h3 className="svc-card__title">{s.title}</h3>
                <p className="svc-card__desc">{s.blurb}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. Full-bleed carmine CTA ══ */}
      <section className="seo-cta" id="contact">
        <div className="container container--narrow">
          <h2 className="seo-cta__title" data-split>{service.ctaTitle}</h2>
          <div className="hero__ctas seo-cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Book a strategy call</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
    </>
  );
}
