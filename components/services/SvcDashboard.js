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
 * PPC — a dashboard.
 *
 * Paid media clients live in a reporting UI, so the page borrows one: a KPI row
 * under the hero, capabilities as panel cards on a tinted board, and the
 * process as a campaign timeline. Tabular figures throughout, which no other
 * service page uses.
 */
export default function SvcDashboard({ service }) {
  const dp = service.datapoint;
  const t = service.testimonial;

  return (
    <main id="top" className="svc svc--dash">
      <ServiceSchema service={service} />

      <header className="svc-dash__hero">
        <div className="container">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.navTitle || service.title },
            ]}
          />
          <p className="svc-dash__eyebrow">{serviceEyebrow(service)}</p>
          <h1 className="svc-dash__h1">{service.h1 || service.title}</h1>
          <p className="lede">{service.lede || service.blurb || service.intro}</p>
          <a
            href={service.heroCtaHref || '/contact'}
            className="btn btn--solid btn--big"
            style={{ marginTop: '1.5rem' }}
          >
            {service.heroCtaText || 'Get a campaign review'}
          </a>
        </div>
      </header>

      {/* The KPI strip. Only the datapoint is a measured figure; the other
          tiles are labels for what we manage, not claimed results. */}
      <section className="svc-dash__kpis">
        <div className="container">
          <div className="svc-dash__kpiRow">
            {dp && (
              <div className="svc-dash__kpi svc-dash__kpi--hero">
                <p className="svc-dash__kpiValue">
                  {dp.value}
                  {dp.suffix}
                </p>
                <p className="svc-dash__kpiLabel">{dp.label}</p>
                {dp.sourceNote && <p className="svc-dash__kpiSource">{dp.sourceNote}</p>}
              </div>
            )}
            <div className="svc-dash__kpi">
              <p className="svc-dash__kpiValue">CPA</p>
              <p className="svc-dash__kpiLabel">Cost per real customer, not per click</p>
            </div>
            <div className="svc-dash__kpi">
              <p className="svc-dash__kpiValue">ROAS</p>
              <p className="svc-dash__kpiLabel">Measured against your margin, not a benchmark</p>
            </div>
            <div className="svc-dash__kpi">
              <p className="svc-dash__kpiValue">QS</p>
              <p className="svc-dash__kpiLabel">Quality Score, because it decides what you pay</p>
            </div>
          </div>
        </div>
      </section>

      {service.problem && (
        <section className="svc-dash__problem">
          <div className="container container--narrow">
            <p className="svc-dash__problemEyebrow">{service.problem.eyebrow}</p>
            <p className="svc-dash__problemText">{service.problem.statement}</p>
          </div>
        </section>
      )}

      <ExperienceBlock slug={service.slug} variant="svc-exp--dash" />

      <section className="svc-dash__board">
        <div className="container">
          <h2 className="statement statement--small">What we manage</h2>
          <div className="svc-dash__panels">
            {(service.capabilities || []).map((c) => (
              <article key={c.title} className="svc-dash__panel">
                <header className="svc-dash__panelHead">
                  <span className="svc-dash__panelTag">{c.tag}</span>
                </header>
                <h3>{c.href ? <a href={c.href}>{c.title}</a> : c.title}</h3>
                <p>{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {(service.featureRows || []).map((row) => (
        <section key={row.title} className="svc-dash__block">
          <div className="container container--narrow">
            <h2>{row.title}</h2>
            {row.lede && <p className="svc-dash__blockLede">{row.lede}</p>}
            {Array.isArray(row.dek)
              ? row.dek.map((d, j) => <p key={j}>{d}</p>)
              : row.dek && <p>{row.dek}</p>}
            {row.list && (
              <ul className="svc-dash__list">
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

      <section className="svc-dash__timeline">
        <div className="container">
          <h2 className="statement statement--small">Campaign timeline</h2>
          <ol className="svc-dash__track">
            {(service.process || []).map((p) => (
              <li key={p.step} className="svc-dash__phase">
                <span className="svc-dash__phaseBar" aria-hidden="true" />
                <span className="svc-dash__phaseNum">{p.step}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {t && (
        <section className="svc-dash__quote">
          <div className="container container--narrow">
            <blockquote>
              <p>&ldquo;{t.quote}&rdquo;</p>
              <footer>
                <strong>{t.name}</strong>
                {t.company && <span> · {t.company}</span>}
                {t.role && <span className="svc-dash__quoteRole">{t.role}</span>}
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
