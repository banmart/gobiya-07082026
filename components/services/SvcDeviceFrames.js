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
 * Web UX & Interface Design — device frames.
 *
 * The argument of the page is that a site is designed on a monitor and used on
 * a phone, so the page states that visually: a phone frame beside a desktop
 * frame in the hero, and content sections presented inside browser chrome. The
 * only service page where the content sits in a drawn container.
 */
export default function SvcDeviceFrames({ service }) {
  const dp = service.datapoint;
  const t = service.testimonial;

  return (
    <main id="top" className="svc svc--device">
      <ServiceSchema service={service} />

      <header className="svc-dev__hero">
        <div className="container">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.navTitle || service.title },
            ]}
          />
          <div className="svc-dev__heroGrid">
            <div>
              <p className="svc-dev__eyebrow">{serviceEyebrow(service)}</p>
              <h1 className="svc-dev__h1">{service.h1 || service.title}</h1>
              <p className="lede">{service.lede || service.blurb || service.intro}</p>
              {dp && (
                <p className="svc-dev__dp">
                  <strong>
                    {dp.value}
                    {dp.suffix}
                  </strong>{' '}
                  {dp.label}
                </p>
              )}
              <a
                href={service.heroCtaHref || '/contact'}
                className="btn btn--solid btn--big"
                style={{ marginTop: '1.5rem' }}
              >
                {service.heroCtaText || 'Talk about your interface'}
              </a>
            </div>

            <div className="svc-dev__devices" aria-hidden="true">
              <div className="svc-dev__desktop">
                <div className="svc-dev__chrome">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="svc-dev__screen">
                  <div className="svc-dev__ln svc-dev__ln--title" />
                  <div className="svc-dev__ln" />
                  <div className="svc-dev__ln svc-dev__ln--short" />
                  <div className="svc-dev__cta" />
                </div>
              </div>
              <div className="svc-dev__phone">
                <div className="svc-dev__notch" />
                <div className="svc-dev__screen svc-dev__screen--sm">
                  <div className="svc-dev__ln svc-dev__ln--title" />
                  <div className="svc-dev__ln svc-dev__ln--short" />
                  <div className="svc-dev__cta svc-dev__cta--thumb" />
                </div>
                <span className="svc-dev__thumb" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {service.problem && (
        <section className="svc-dev__problem">
          <div className="container container--narrow">
            <p className="svc-dev__problemEyebrow">{service.problem.eyebrow}</p>
            <p className="svc-dev__problemText">{service.problem.statement}</p>
          </div>
        </section>
      )}

      <ExperienceBlock slug={service.slug} variant="svc-exp--device" />

      {/* Each content section sits inside browser chrome. */}
      {(service.featureRows || []).map((row) => (
        <section key={row.title} className="svc-dev__framed">
          <div className="container container--narrow">
            <article className="svc-dev__window">
              <div className="svc-dev__chrome svc-dev__chrome--wide">
                <span />
                <span />
                <span />
                <p className="svc-dev__chromeUrl">{row.title}</p>
              </div>
              <div className="svc-dev__windowBody">
                <h2>{row.title}</h2>
                {row.lede && <p className="svc-dev__rowLede">{row.lede}</p>}
                {Array.isArray(row.dek)
                  ? row.dek.map((d, j) => <p key={j}>{d}</p>)
                  : row.dek && <p>{row.dek}</p>}
                {row.list && (
                  <ul className="svc-dev__list">
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
            </article>
          </div>
        </section>
      ))}

      <section className="svc-dev__caps">
        <div className="container">
          <h2 className="statement statement--small">What we design</h2>
          <div className="svc-dev__capGrid">
            {(service.capabilities || []).map((c) => (
              <article key={c.title} className="svc-dev__cap">
                <span className="svc-dev__capTag">{c.tag}</span>
                <h3>{c.href ? <a href={c.href}>{c.title}</a> : c.title}</h3>
                <p>{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-dev__process">
        <div className="container container--narrow">
          <h2 className="statement statement--small">How a redesign runs</h2>
          <ol className="svc-dev__steps">
            {(service.process || []).map((p) => (
              <li key={p.step}>
                <span className="svc-dev__stepNum">{p.step}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {t && (
        <section className="svc-dev__quote">
          <div className="container container--narrow">
            <blockquote>
              <p>&ldquo;{t.quote}&rdquo;</p>
              <footer>
                <strong>{t.name}</strong>
                {t.company && <span> · {t.company}</span>}
              </footer>
            </blockquote>
          </div>
        </section>
      )}

      <ServiceProof service={service} />

      <ServiceAreas service={service} />
      <ServiceFaqs service={service} />
      <ServiceSiblings service={service} />
      <ServiceCta service={service} />
    </main>
  );
}
