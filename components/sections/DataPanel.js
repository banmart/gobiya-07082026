// Tables rendered as a data panel rather than inline article markup.
//
// 35 of these across the insight articles were previously plain <table>
// elements in the prose flow, which is the wrong weight — a pricing or
// comparison table is usually the single most useful thing on the page and it
// read as an aside. This frames it, labels it, staggers the rows in on scroll,
// and on a phone makes it a horizontally scrollable panel with the first
// column pinned so the row label stays visible while you scan across.

export default function DataPanel({ headers, rows, caption }) {
  if (!headers?.length || !rows?.length) return null;

  return (
    <figure className="data-panel" data-reveal>
      <div className="data-panel__head">
        <span className="data-panel__tag">
          <span className="data-panel__dot" aria-hidden="true" />
          Data
        </span>
        <span className="data-panel__hint" aria-hidden="true">Scroll to compare →</span>
      </div>

      <div className="data-panel__scroll" tabIndex={0} role="group" aria-label={caption || 'Data table'}>
        <table className="data-panel__table" data-stagger-rows>
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} scope="col">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) =>
                  ci === 0 ? (
                    <th key={ci} scope="row" dangerouslySetInnerHTML={{ __html: cell }} />
                  ) : (
                    <td key={ci} dangerouslySetInnerHTML={{ __html: cell }} />
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {caption && <figcaption className="data-panel__cap">{caption}</figcaption>}
    </figure>
  );
}
