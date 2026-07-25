// Article lists rendered as numbered cards instead of bullets.
//
// Most of the 30 lists in the insight articles are sequential or enumerated
// ("three delivery models", "four checks to run") — the kind of thing a reader
// scans rather than reads. Bullets flatten them into more prose; numbering and
// framing each item makes the count legible at a glance and gives the scroll
// something to stagger.
//
// Items may contain HTML (most lead with a <strong> label), so the first
// <strong> is pulled out as the card's title when present.

function splitLabel(html) {
  const m = /^\s*<strong>(.*?)<\/strong>:?\s*/i.exec(html);
  if (!m) return { label: null, body: html };
  return { label: m[1], body: html.slice(m[0].length) };
}

export default function StepList({ items }) {
  if (!items?.length) return null;

  return (
    <ol className="step-list" data-stagger>
      {items.map((raw, i) => {
        const { label, body } = splitLabel(raw);
        return (
          <li className="step-list__item" key={i}>
            <span className="step-list__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div className="step-list__content">
              {label && <span className="step-list__label">{label}</span>}
              <span className="step-list__body" dangerouslySetInnerHTML={{ __html: body }} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
