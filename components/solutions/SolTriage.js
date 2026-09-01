import Breadcrumbs from '../Breadcrumbs';
import {
  SolutionSchema,
  RecommendedServices,
  SolutionFaqs,
  SolutionProof,
  SolutionCta,
} from './solutionShared';

/**
 * "Traffic dropped, rankings flat" — a triage page.
 *
 * Someone landing here has a symptom and no diagnosis, so the page is set as a
 * differential: the presenting complaint stated once at the top, then the
 * candidate causes as numbered findings you can rule in or out. Dark hero,
 * because this is the page people arrive at in a bad week.
 */
export default function SolTriage({ sol }) {
  return (
    <main id="top" className="sol sol--triage">
      <SolutionSchema sol={sol} />

      <header className="sol-triage__hero">
        <div className="container container--narrow">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Solutions', href: '/solutions' },
              { label: sol.title },
            ]}
          />
          <p className="sol-triage__eyebrow">{sol.eyebrow}</p>
          <h1 className="sol-triage__h1">{sol.title}</h1>
          <p className="sol-triage__sub">{sol.subtitle}</p>
        </div>
      </header>

      <section className="sol-triage__complaint">
        <div className="container container--narrow">
          <p className="sol-triage__complaintLabel">The presenting problem</p>
          <p className="sol-triage__complaintText">{sol.painPoint}</p>
        </div>
      </section>

      <section className="sol-triage__differential">
        <div className="container container--narrow">
          <h2 className="sol-triage__diffTitle">Work through these in order</h2>
          <p className="sol-triage__diffNote">
            Each of these produces the same symptom and needs a different fix, so
            guessing is expensive. Rule them in or out from the top.
          </p>

          <ol className="sol-triage__findings">
            {(sol.diagnosis || []).map((item, i) => (
              <li key={item.title} className="sol-triage__finding">
                <div className="sol-triage__findingHead">
                  <span className="sol-triage__findingNum" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.desc}</p>
                {item.serviceLink && (
                  <a href={item.serviceLink.href} className="sol-triage__findingLink">
                    {item.serviceLink.title} &rarr;
                  </a>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <RecommendedServices sol={sol} heading="What we would put on it" />
      <SolutionFaqs sol={sol} />
      <SolutionProof />
      <SolutionCta title="Find out which of these is actually your problem" />
    </main>
  );
}
