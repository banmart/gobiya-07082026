import Breadcrumbs from '../Breadcrumbs';
import {
  ServiceSchema,
  ExperienceBlock,
  ServiceFaqs,
  ServiceCta,
  ServiceAreas,
  ServiceProof,
} from './serviceShared';

/**
 * Content Marketing — an editorial spread.
 *
 * A page about publishing should look like something published: a drop-cap
 * opening, prose set at a reading measure, capabilities as a contents list in
 * the margin, and the process as a production schedule. The widest type on the
 * site, and the only service page that centres its measure.
 */
export default function SvcEditorial({ service }) {
  const dp = service.datapoint;
  const intro = service.intro || service.lede || service.blurb;

  return (
    <main id="top" className="svc svc--editorial">
      <ServiceSchema service={service} />

      <header className="svc-ed__masthead">
        <div className="container container--narrow">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.navTitle || service.title },
            ]}
          />
          <p className="svc-ed__kicker">{service.eyebrow || service.pillar}</p>
          <h1 className="svc-ed__h1">{service.h1 || service.title}</h1>
          <div className="svc-ed__rule" aria-hidden="true" />
          {intro && <p className="svc-ed__standfirst">{intro}</p>}
        </div>
      </header>

      <div className="container">
        <div className="svc-ed__grid">
          <aside className="svc-ed__margin">
            <p className="svc-ed__marginTitle">In this piece</p>
            <ol className="svc-ed__contents">
              {(service.featureRows || []).map((r) => (
                <li key={r.title}>
                  <a href={`#${slug(r.title)}`}>{r.title}</a>
                </li>
              ))}
              <li>
                <a href="#capabilities">What we handle</a>
              </li>
              <li>
                <a href="#faq">Questions</a>
              </li>
            </ol>

            {dp && (
              <div className="svc-ed__pull">
                <p className="svc-ed__pullValue">
                  {dp.value}
                  {dp.suffix}
                </p>
                <p className="svc-ed__pullLabel">{dp.label}</p>
              </div>
            )}
          </aside>

          <div className="svc-ed__body">
            {service.problem && (
              <p className="svc-ed__lead">{service.problem.statement}</p>
            )}

            {(service.featureRows || []).map((row) => (
              <section key={row.title} id={slug(row.title)} className="svc-ed__section">
                <h2>{row.title}</h2>
                {row.lede && <p className="svc-ed__sectionLede">{row.lede}</p>}
                {Array.isArray(row.dek)
                  ? row.dek.map((d, j) => <p key={j}>{d}</p>)
                  : row.dek && <p>{row.dek}</p>}
                {row.list && (
                  <ul className="svc-ed__list">
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
              </section>
            ))}

            <section id="capabilities" className="svc-ed__section">
              <h2>What we handle</h2>
              <dl className="svc-ed__caps">
                {(service.capabilities || []).map((c) => (
                  <div key={c.title}>
                    <dt>{c.href ? <a href={c.href}>{c.title}</a> : c.title}</dt>
                    <dd>{c.desc}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="svc-ed__section">
              <h2>How a piece gets made</h2>
              <ol className="svc-ed__schedule">
                {(service.process || []).map((p) => (
                  <li key={p.step}>
                    <strong>{p.title}</strong>
                    <span>{p.desc}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </div>

      <ServiceProof service={service} />

      <ExperienceBlock slug={service.slug} variant="svc-exp--editorial" />
      <ServiceAreas service={service} />
      <ServiceFaqs service={service} />
      <ServiceCta service={service} />
    </main>
  );
}

function slug(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
