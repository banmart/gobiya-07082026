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
 * Technical SEO — an audit report.
 *
 * The service is diagnostic, so the page is set as findings: a status line at
 * the top, capabilities as numbered check rows with a monospace label column,
 * and the process as a remediation schedule. Tabular, unglamorous, and the
 * closest thing on the site to the document a client actually receives.
 */
export default function SvcAuditReport({ service }) {
  const dp = service.datapoint;

  return (
    <main id="top" className="svc svc--audit">
      <ServiceSchema service={service} />

      <header className="svc-audit__hero">
        <div className="container">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.navTitle || service.title },
            ]}
          />
          <p className="svc-audit__eyebrow">{serviceEyebrow(service)}</p>
          <h1 className="svc-audit__h1">{service.h1 || service.title}</h1>

          <div className="svc-audit__statusbar">
            <div className="svc-audit__status svc-audit__status--fail">
              <span className="svc-audit__statusDot" aria-hidden="true" />
              Crawl errors
            </div>
            <div className="svc-audit__status svc-audit__status--fail">
              <span className="svc-audit__statusDot" aria-hidden="true" />
              Render blocking
            </div>
            <div className="svc-audit__status svc-audit__status--fail">
              <span className="svc-audit__statusDot" aria-hidden="true" />
              Missing schema
            </div>
            <div className="svc-audit__status svc-audit__status--pass">
              <span className="svc-audit__statusDot" aria-hidden="true" />
              After we are done
            </div>
          </div>

          <div className="svc-audit__heroActions">
            <a href={service.heroCtaHref || '/free-site-scan'} className="btn btn--solid btn--big">
              {service.heroCtaText || 'Request a free check'}
            </a>
            {dp && (
              <p className="svc-audit__dp">
                <strong>
                  {dp.value}
                  {dp.suffix}
                </strong>
                <span>{dp.label}</span>
              </p>
            )}
          </div>
        </div>
      </header>

      {service.problem && (
        <section className="svc-audit__problem">
          <div className="container container--narrow">
            <p className="svc-audit__problemEyebrow">{service.problem.eyebrow}</p>
            <p className="svc-audit__problemText">{service.problem.statement}</p>
          </div>
        </section>
      )}

      {service.intro && (
        <section className="section">
          <div className="container container--narrow">
            <p className="svc-audit__intro">{service.intro}</p>
          </div>
        </section>
      )}

      {/* Capabilities as audit line items — label column, finding column. */}
      <section className="svc-audit__findings">
        <div className="container">
          <h2 className="svc-audit__sectionTitle">
            <span className="svc-audit__sectionNum">01</span> What we inspect and fix
          </h2>
          <ol className="svc-audit__rows">
            {(service.capabilities || []).map((c, i) => (
              <li key={c.title} className="svc-audit__row">
                <span className="svc-audit__rowId" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="svc-audit__rowTag">{c.tag}</span>
                <div className="svc-audit__rowBody">
                  <h3>
                    {c.href ? <a href={c.href}>{c.title}</a> : c.title}
                  </h3>
                  <p>{c.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The prose body, kept as plain sections so nothing indexed is lost. */}
      {(service.featureRows || []).map((row, i) => (
        <section key={row.title} className="svc-audit__note">
          <div className="container container--narrow">
            <h2>{row.title}</h2>
            {row.lede && <p className="svc-audit__noteLede">{row.lede}</p>}
            {Array.isArray(row.dek)
              ? row.dek.map((d, j) => <p key={j}>{d}</p>)
              : row.dek && <p>{row.dek}</p>}
            {row.list && (
              <ul className="svc-audit__checklist">
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

      <ExperienceBlock slug={service.slug} variant="svc-exp--audit" />

      <section className="svc-audit__schedule">
        <div className="container">
          <h2 className="svc-audit__sectionTitle">
            <span className="svc-audit__sectionNum">02</span> Remediation schedule
          </h2>
          <div className="svc-audit__steps">
            {(service.process || []).map((p) => (
              <div key={p.step} className="svc-audit__step">
                <span className="svc-audit__stepNum">{p.step}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
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
