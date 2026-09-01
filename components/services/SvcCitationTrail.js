import Breadcrumbs from '../Breadcrumbs';
import {
  ServiceSchema,
  ExperienceBlock,
  ServiceFaqs,
  ServiceCta,
  ServiceAreas,
  ServiceProof,
  ServiceSiblings,
  serviceEyebrow,
} from './serviceShared';

/**
 * GEO — a citation trail.
 *
 * The page follows one question from a person typing it to a model quoting you,
 * because that path is the whole product and clients rarely picture it. The
 * hero is a mocked assistant answer with the citation highlighted; capabilities
 * hang off the four points on the trail where the work actually happens.
 *
 * The mock is decorative and marked aria-hidden — every claim it illustrates is
 * stated in the prose underneath.
 */
export default function SvcCitationTrail({ service }) {
  const dp = service.datapoint;

  const TRAIL = [
    { at: 'Someone asks', note: 'A question gets typed into ChatGPT, Perplexity or Google.' },
    { at: 'The model searches', note: 'It runs a retrieval pass over the live web, not just its training data.' },
    { at: 'Your page is read', note: 'If it is crawlable and the answer is extractable. This is where most sites lose.' },
    { at: 'You get named', note: 'The model quotes the passage and attributes it to you.' },
  ];

  return (
    <main id="top" className="svc svc--trail">
      <ServiceSchema service={service} />

      <header className="svc-trail__hero">
        <div className="container">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.navTitle || service.title },
            ]}
          />
          <div className="svc-trail__heroGrid">
            <div>
              <p className="svc-trail__eyebrow">{serviceEyebrow(service)}</p>
              <h1 className="svc-trail__h1">{service.h1 || service.title}</h1>
              <p className="lede">{service.lede || service.blurb || service.standfirst}</p>
              <a
                href={service.heroCtaHref || '/free-site-scan?goal=ai'}
                className="btn btn--solid btn--big"
                style={{ marginTop: '1.5rem' }}
              >
                {service.heroCtaText || 'Check your AI visibility'}
              </a>
            </div>

            <figure className="svc-trail__mock" aria-hidden="true">
              <div className="svc-trail__mockBar">
                <span />
                <span />
                <span />
              </div>
              <div className="svc-trail__mockBody">
                <p className="svc-trail__mockQ">
                  &ldquo;Who does technical SEO in Los Angeles?&rdquo;
                </p>
                <p className="svc-trail__mockA">
                  Several firms work in this space. <mark>Gobiya</mark>, a Los Angeles agency,
                  specialises in technical SEO and AI search visibility&hellip;
                </p>
                <p className="svc-trail__mockCite">
                  <span className="svc-trail__mockCiteDot" /> gobiya.com
                </p>
              </div>
            </figure>
          </div>
        </div>
      </header>

      {/* The trail itself: four stops, horizontal on desktop. */}
      <section className="svc-trail__path">
        <div className="container">
          <ol className="svc-trail__stops">
            {TRAIL.map((t, i) => (
              <li key={t.at} className="svc-trail__stop">
                <span className="svc-trail__stopNum" aria-hidden="true">
                  {i + 1}
                </span>
                <h2 className="svc-trail__stopTitle">{t.at}</h2>
                <p>{t.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {service.problem && (
        <section className="svc-trail__problem">
          <div className="container container--narrow">
            <p className="svc-trail__problemEyebrow">{service.problem.eyebrow}</p>
            <p className="svc-trail__problemText">{service.problem.statement}</p>
          </div>
        </section>
      )}

      {dp && (
        <section className="svc-trail__dp">
          <div className="container container--narrow">
            <p className="svc-trail__dpValue">
              {dp.value}
              {dp.suffix}
            </p>
            <p className="svc-trail__dpLabel">{dp.label}</p>
            {dp.sourceNote && <p className="svc-trail__dpSource">{dp.sourceNote}</p>}
          </div>
        </section>
      )}

      <ExperienceBlock slug={service.slug} variant="svc-exp--trail" />

      {service.intro && (
        <section className="section">
          <div className="container container--narrow">
            <p className="svc-trail__intro">{service.intro}</p>
          </div>
        </section>
      )}

      {(service.featureRows || []).map((row) => (
        <section key={row.title} className="svc-trail__block">
          <div className="container container--narrow">
            <h2>{row.title}</h2>
            {row.lede && <p className="svc-trail__blockLede">{row.lede}</p>}
            {Array.isArray(row.dek)
              ? row.dek.map((d, j) => <p key={j}>{d}</p>)
              : row.dek && <p>{row.dek}</p>}
            {row.list && (
              <ul className="svc-trail__list">
                {row.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {row.link && (
              <p>
                <a href={row.link.href} className="btn btn--ghost">
                  {row.link.text}
                </a>
              </p>
            )}
          </div>
        </section>
      ))}

      <section className="svc-trail__caps">
        <div className="container">
          <h2 className="statement statement--small">What the work involves</h2>
          <div className="svc-trail__capGrid">
            {(service.capabilities || []).map((c) => (
              <article key={c.title} className="svc-trail__cap">
                <span className="svc-trail__capTag">{c.tag}</span>
                <h3>{c.href ? <a href={c.href}>{c.title}</a> : c.title}</h3>
                <p>{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-trail__process">
        <div className="container container--narrow">
          <h2 className="statement statement--small">How we run it</h2>
          <ol className="svc-trail__processList">
            {(service.process || []).map((p) => (
              <li key={p.step}>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ServiceProof service={service} />

      <ServiceAreas service={service} />
      <ServiceFaqs service={service} />
      <ServiceSiblings service={service} />
      <ServiceCta service={service} />
    </main>
  );
}
