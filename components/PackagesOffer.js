/* The performance-package band. Homepage wording by default; sub pages pass
   their own heading and dek and get the same card.

   The grid is two columns with one card in it on purpose — the offer is meant
   to sit at half width, and a second package drops straight into the free slot
   without a layout change. */

export const PACKAGES = [
  {
    price: '$299',
    name: 'Comprehensive Technical & GEO Audit',
    includes: 'Full Crawl Analysis + Semantic Schema Verification + Competitor Keyword Map.',
    desc: 'Designed for websites experiencing stagnant traffic, algorithmic dips, or weak conversions that require a complete technical breakdown.',
    href: '/pricing',
  },
];

export default function PackagesOffer({
  title = 'Data-Driven Solutions, Maximum ROI',
  sub = 'Exclusive Gobiya Performance Packages',
  dek = 'Keep your customer pipeline full and your acquisition costs low with our core digital analysis and strategy packages.',
  packages = PACKAGES,
  more = null,
}) {
  return (
    <section className="gb-packages">
      <div className="container">
        <h2 className="gb-packages__title">{title}</h2>
        <p className="gb-packages__sub">{sub}</p>
        <p className="gb-packages__dek">{dek}</p>

        <div className="gb-packages__grid">
          {packages.map((p) => (
            <a key={p.name} href={p.href} className="gb-package">
              <span className="gb-package__price">{p.price}</span>
              <span className="gb-package__name">{p.name}</span>
              <span className="gb-package__includes">{p.includes}</span>
              <span className="gb-package__desc">{p.desc}</span>
            </a>
          ))}
        </div>

        {more && (
          <p className="gb-packages__more">
            <a href={more.href}>
              {more.text} <span aria-hidden="true">&rarr;</span>
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
