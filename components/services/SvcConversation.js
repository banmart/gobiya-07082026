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
 * AI Systems & Consulting — a conversation.
 *
 * Most AI engagements start as a conversation where the client is trying to
 * work out what is real, so the page is shaped as that exchange: alternating
 * asked/answered turns down a thread. Capabilities sit as replies rather than
 * cards, which no other service page does.
 */
export default function SvcConversation({ service }) {
  const caps = service.capabilities || [];
  const rows = service.featureRows || [];

  return (
    <main id="top" className="svc svc--convo">
      <ServiceSchema service={service} />

      <header className="svc-convo__hero">
        <div className="container container--narrow">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.navTitle || service.title },
            ]}
          />
          <p className="svc-convo__eyebrow">{serviceEyebrow(service)}</p>
          <h1 className="svc-convo__h1">{service.h1 || service.title}</h1>
          <p className="lede">{service.lede || service.blurb || service.intro}</p>

          <div className="svc-convo__opening">
            <div className="svc-convo__turn svc-convo__turn--asked">
              <span className="svc-convo__who">The question we actually get</span>
              <p>
                &ldquo;Everyone says we should be doing something with AI and I cannot
                tell what is real. What would actually matter for a business our
                size?&rdquo;
              </p>
            </div>
            <div className="svc-convo__turn svc-convo__turn--answered">
              <span className="svc-convo__who">Where we start</span>
              <p>
                Usually by ruling things out. Most of the value in the first
                conversation is subtraction &mdash; naming the work that will not
                pay for itself at your size, so the budget goes to what will.
              </p>
            </div>
          </div>

          <a href="/contact" className="btn btn--solid btn--big" style={{ marginTop: '1.75rem' }}>
            Start that conversation
          </a>
        </div>
      </header>

      {service.problem && (
        <section className="svc-convo__problem">
          <div className="container container--narrow">
            <p className="svc-convo__problemEyebrow">{service.problem.eyebrow}</p>
            <p className="svc-convo__problemText">{service.problem.statement}</p>
          </div>
        </section>
      )}

      <ExperienceBlock slug={service.slug} variant="svc-exp--convo" />

      {/* Capabilities as thread replies. */}
      <section className="svc-convo__thread">
        <div className="container container--narrow">
          <h2 className="statement statement--small">What we actually do</h2>
          <div className="svc-convo__replies">
            {caps.map((c, i) => (
              <article
                key={c.title}
                className={`svc-convo__reply ${i % 2 ? 'svc-convo__reply--alt' : ''}`}
              >
                <span className="svc-convo__replyTag">{c.tag}</span>
                <h3>{c.href ? <a href={c.href}>{c.title}</a> : c.title}</h3>
                <p>{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {rows.map((row) => (
        <section key={row.title} className="svc-convo__block">
          <div className="container container--narrow">
            <h2>{row.title}</h2>
            {row.lede && <p className="svc-convo__blockLede">{row.lede}</p>}
            {Array.isArray(row.dek)
              ? row.dek.map((d, j) => <p key={j}>{d}</p>)
              : row.dek && <p>{row.dek}</p>}
            {row.list && (
              <ul className="svc-convo__list">
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

      <section className="svc-convo__process">
        <div className="container container--narrow">
          <h2 className="statement statement--small">How an engagement runs</h2>
          <ol className="svc-convo__steps">
            {(service.process || []).map((p) => (
              <li key={p.step}>
                <span className="svc-convo__stepNum">{p.step}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ServiceProof service={service} packages={false} />

      <ServiceAreas service={service} />
      <ServiceFaqs service={service} />
      <ServiceSiblings service={service} />
      <ServiceCta service={service} />
    </main>
  );
}
