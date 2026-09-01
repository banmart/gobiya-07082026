import Breadcrumbs from '../Breadcrumbs';
import {
  SolutionSchema,
  RecommendedServices,
  SolutionFaqs,
  SolutionProof,
  SolutionCta,
} from './solutionShared';

/**
 * "Site is slow, losing leads" — a stopwatch.
 *
 * Everything on this page is measured in time, so the page is too: a seconds
 * scale in the hero, and causes laid out as the stage of the load they belong
 * to rather than as a ranked list. Light throughout, in contrast to the triage
 * page's dark hero, because this is a fixable engineering problem rather than
 * a mystery.
 */
export default function SolStopwatch({ sol }) {
  const SCALE = [
    { t: '0–1s', note: 'Feels instant. Nothing is lost here.' },
    { t: '1–3s', note: 'Noticeable. Impatient visitors start leaving.' },
    { t: '3–5s', note: 'Most mobile visitors are gone before the page paints.' },
    { t: '5s+', note: 'You are paying for traffic that never sees the page.' },
  ];

  return (
    <main id="top" className="sol sol--watch">
      <SolutionSchema sol={sol} />

      <header className="sol-watch__hero">
        <div className="container container--narrow">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Solutions', href: '/solutions' },
              { label: sol.title },
            ]}
          />
          <p className="sol-watch__eyebrow">{sol.eyebrow}</p>
          <h1 className="sol-watch__h1">{sol.title}</h1>
          <p className="sol-watch__sub">{sol.subtitle}</p>
        </div>
      </header>

      <section className="sol-watch__scale">
        <div className="container">
          <ol className="sol-watch__ticks">
            {SCALE.map((s, i) => (
              <li key={s.t} className="sol-watch__tick" style={{ '--tick': i }}>
                <span className="sol-watch__tickBar" aria-hidden="true" />
                <strong>{s.t}</strong>
                <span>{s.note}</span>
              </li>
            ))}
          </ol>
          <p className="sol-watch__scaleNote">
            A scale, not a measurement of your site. What your own pages do is
            what the scan reports.
          </p>
        </div>
      </section>

      <section className="sol-watch__complaint">
        <div className="container container--narrow">
          <p className="sol-watch__complaintLabel">The cost of the delay</p>
          <p className="sol-watch__complaintText">{sol.painPoint}</p>
        </div>
      </section>

      <section className="sol-watch__stages">
        <div className="container container--narrow">
          <h2 className="sol-watch__stagesTitle">Where the time goes</h2>
          <div className="sol-watch__stageList">
            {(sol.diagnosis || []).map((item, i) => (
              <article key={item.title} className="sol-watch__stage">
                <span className="sol-watch__stageTime" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  {item.serviceLink && (
                    <a href={item.serviceLink.href}>{item.serviceLink.title} &rarr;</a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RecommendedServices sol={sol} heading="How we get the time back" />
      <SolutionFaqs sol={sol} />
      <SolutionProof />
      <SolutionCta title="Find out what your pages actually take" />
    </main>
  );
}
