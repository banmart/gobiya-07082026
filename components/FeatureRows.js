import Image from 'next/image';

/* Alternating content/image rows — the homepage band, made reusable so a
   service page can carry its body copy in the same shape.

   Rows alternate sides via :nth-child in globals.css, so reordering the array
   flips the layout automatically; never hard-code a side on a row.

   A row is data, not markup:
     title   the h2
     lede    optional bold line under it
     dek     a paragraph, or an array of them
     list    optional checkmark list
     stats   optional [{ num, label }] block
     range   optional { from, to } rail
     link    optional { text, href }
     image   { src, alt } */

function Check() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="mw-frow__check">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 6L9 17l-5-5"
      />
    </svg>
  );
}

export default function FeatureRows({ rows, className = '' }) {
  if (!rows?.length) return null;

  return (
    <section className={`mw-frows ${className}`.trim()}>
      <div className="container">
        {rows.map((row) => {
          const deks = Array.isArray(row.dek) ? row.dek : row.dek ? [row.dek] : [];

          return (
            <div className="mw-frow" key={row.title}>
              <div className="mw-frow__copy">
                <h2 className="mw-frow__title">{row.title}</h2>
                {row.lede && <p className="mw-frow__lede">{row.lede}</p>}
                {deks.map((d) => (
                  <p className="mw-frow__dek" key={d}>{d}</p>
                ))}

                {row.stats && (
                  <div className="mw-frow__stats">
                    {row.stats.map((s) => (
                      <div key={s.label}>
                        <div className="mw-frow__stat-num">{s.num}</div>
                        <div className="mw-frow__stat-label">{s.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {row.range && (
                  <div className="mw-frow__range">
                    <div className="mw-frow__range-bar" />
                    <div className="mw-frow__range-ends">
                      <span>{row.range.from}</span>
                      <span>{row.range.to}</span>
                    </div>
                  </div>
                )}

                {row.list && (
                  <ul className="mw-frow__list">
                    {row.list.map((item) => (
                      <li key={item}><Check /> {item}</li>
                    ))}
                  </ul>
                )}

                {row.link && (
                  <a href={row.link.href} className="mw-frow__link">
                    {row.link.text}{' '}
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
              </div>

              <div className="mw-frow__art">
                <Image
                  src={row.image.src}
                  alt={row.image.alt}
                  width={720}
                  height={480}
                  className="mw-frow__img"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
