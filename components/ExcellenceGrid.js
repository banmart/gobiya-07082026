// The four service-standard cards.
//
// The header comment used to say these were shared by the homepage, /about and
// /process. They are not — nothing imports this component any more.
//
// Titles keep their trailing colon: the card reads as one sentence broken over
// two lines, which is how the copy was written.

import { yearsInBusiness } from '../lib/authority';

const STANDARDS = [
  {
    title: 'Communication You Can Count On:',
    desc: 'Direct access to experienced strategists who explain complex search dynamics in plain, actionable terms.',
  },
  {
    title: 'Transparency You Can Trust:',
    desc: 'You’ll always know what to expect with our no-nonsense, ROI-driven proposals and complimentary initial audits.',
  },
  {
    title: 'Quality & Integrity as the Standard:',
    desc: 'Every line of code, schema markup, and content strategy follows strict search engine guidelines and modern web standards.',
  },
  {
    // "15+" sat one line above "since 2009" — the same card disagreed with
    // itself. Derived, so the two halves stay in step.
    title: `${yearsInBusiness()} Years of Proven Results:`,
    desc: 'Proudly scaling Los Angeles brands since 2009 with a relentless commitment to search dominance.',
  },
];

export default function ExcellenceGrid() {
  return (
    <section className="mw-excellence">
      <div className="container">
        <h2 className="mw-excellence__heading">
          Excellence in Every Optimization
        </h2>
        <p className="mw-excellence__intro">
          From clear performance metrics to technical precision, we put your brand and revenue growth first.
        </p>

        <div className="mw-excellence__grid">
          {STANDARDS.map((s) => (
            <div className="mw-excellence__card" key={s.title}>
              <h3 className="mw-excellence__card-title">{s.title}</h3>
              <p className="mw-excellence__card-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
