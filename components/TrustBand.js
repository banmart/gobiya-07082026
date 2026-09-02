import { yearsInBusiness } from '../lib/authority';

/**
 * The trust band — the homepage's `.gb-trusted` section, as a component.
 *
 * The homepage still carries this markup inline. This is the same section with
 * its content lifted into props and the homepage's own values as the defaults,
 * so a sub page gets the identical band with its own figures in it.
 *
 * Every default here is a claim the site already makes and can back:
 * years in business is derived from lib/authority.js, and the 500+ and Google
 * Partner tiles are the homepage's. A page passing its own badges is
 * responsible for them being true — see lib/searchWins and the case studies for
 * where measured figures come from.
 */
const DEFAULT_PLATFORMS = [
  { name: 'Trustpilot', score: '5.0' },
  { name: 'Clutch', score: '5.0' },
  { name: 'Google', score: '5.0' },
];

export default function TrustBand({
  title = 'Trusted by 500+ Los Angeles Businesses',
  sub = 'Professional SEO & Digital Marketing Since 2009',
  badges,
  platforms = DEFAULT_PLATFORMS,
  cta = {
    text: 'Schedule Your Free Strategy Consultation Today!',
    href: '?onboarding=true',
  },
  note = null,
}) {
  const tiles = badges || [
    { num: String(yearsInBusiness()), label: 'Years in Business' },
    { num: '500+', label: 'Clients Served' },
    { num: 'Google', label: 'Partner Agency' },
  ];

  return (
    <section className="gb-trusted">
      <div className="container">
        <h2 className="gb-trusted__title">{title}</h2>
        {sub && <p className="gb-trusted__sub">{sub}</p>}

        <div className="gb-trusted__badges">
          {tiles.map((b) => (
            <div className="gb-trusted__badge" key={b.label}>
              <span className="gb-trusted__badge-num">{b.num}</span>
              <span className="gb-trusted__badge-label">{b.label}</span>
            </div>
          ))}
        </div>

        {/* Where a figure came from, when a page puts a measured one in the
            tiles. A performance number with no source does not belong here. */}
        {note && <p className="gb-trusted__note">{note}</p>}

        <div className="gb-trusted__platforms">
          {platforms.map((p) => (
            <div className="gb-trusted__platform" key={p.name}>
              <span className="gb-trusted__platform-stars">★★★★★</span>
              <span className="gb-trusted__platform-name">{p.name}</span>
              <span className="gb-trusted__platform-score">{p.score}</span>
            </div>
          ))}
        </div>

        {cta && (
          <a href={cta.href} className="gb-btn gb-btn--accent" title={cta.text}>
            {cta.text}
          </a>
        )}
      </div>
    </section>
  );
}
