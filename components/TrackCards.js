import { Icon } from './DisciplineRail';

/**
 * The homepage's track card, as a grid that holds any number of them.
 *
 * `.gb-track` is the card the homepage uses for its two "which way in" doors —
 * title, icon, copy, button. The card styling is reused verbatim; only the
 * wrapper is new, because the homepage's own `.gb-chooser__tracks` is a fixed
 * three-column grid (card, the word "or", card) capped at 46rem and holds
 * exactly two. Six capabilities need a grid that wraps.
 *
 * `step` renders in place of the icon, for a numbered sequence. Same card, so a
 * process and a capability list on one page read as one system rather than as
 * two components that happen to sit near each other.
 */
export default function TrackCards({
  title,
  dek,
  items,
  tint = false,
  foot = null,
}) {
  return (
    <section className={`gb-chooser${tint ? ' gb-chooser--tint' : ''}`}>
      <div className="container">
        {title && <h2 className="gb-chooser__title">{title}</h2>}
        {dek && <p className="gb-chooser__dek">{dek}</p>}

        <div className="gb-cards">
          {items.map((item) => (
            <div className="gb-track" key={item.title}>
              <h3 className="gb-track__title">{item.title}</h3>

              {item.step ? (
                <span className="gb-track__step" aria-hidden="true">
                  {item.step}
                </span>
              ) : (
                item.icon && (
                  <span className="gb-track__icon" aria-hidden="true">
                    <Icon name={item.icon} size={40} />
                  </span>
                )
              )}

              <p className="gb-track__dek">{item.dek}</p>

              {item.cta && (
                <a
                  href={item.cta.href}
                  className="gb-btn gb-btn--accent gb-track__cta"
                  title={item.cta.text}
                >
                  {item.cta.text}
                </a>
              )}
            </div>
          ))}
        </div>

        {foot && <p className="gb-chooser__foot">{foot}</p>}
      </div>
    </section>
  );
}
