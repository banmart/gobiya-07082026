'use client';

import { useMemo, useState } from 'react';

// The archive exists so every article has a crawlable path — see the note on
// .archive-list in globals.css. So filtering hides items rather than
// unmounting them: all 35 links stay in the DOM, and the default 'All' state
// means the server-rendered HTML ships the complete list either way.
export default function InsightsArchive({ articles }) {
  const [active, setActive] = useState(null);

  const categories = useMemo(() => {
    const counts = new Map();
    articles.forEach((a) => counts.set(a.category, (counts.get(a.category) || 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [articles]);

  const shown = active ? articles.filter((a) => a.category === active).length : articles.length;

  return (
    <>
      <h2 style={{ fontFamily: "'PT Serif', Georgia, serif", fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', color: '#0B1E36', marginBottom: '1.5rem' }}>
        {active ? `${shown} ${shown === 1 ? 'Article' : 'Articles'} in ${active}` : `All ${articles.length} Articles`}
      </h2>

      <div className="insights__filters" role="group" aria-label="Filter articles by category">
        <button
          type="button"
          className={`insights__filter${active === null ? ' is-active' : ''}`}
          aria-pressed={active === null}
          onClick={() => setActive(null)}
        >
          All <span aria-hidden="true">({articles.length})</span>
        </button>
        {categories.map(([name, count]) => (
          <button
            key={name}
            type="button"
            className={`insights__filter${active === name ? ' is-active' : ''}`}
            aria-pressed={active === name}
            onClick={() => setActive(active === name ? null : name)}
          >
            {name} <span aria-hidden="true">({count})</span>
          </button>
        ))}
      </div>

      {/* Screen readers get told the count changed; the visual heading already shows it. */}
      <p className="sr-only" role="status" aria-live="polite">
        {shown} of {articles.length} articles shown{active ? `, filtered to ${active}` : ''}.
      </p>

      <ul className="archive-list">
        {articles.map((a) => {
          const hidden = active !== null && a.category !== active;
          return (
            <li key={a.slug} className="archive-list__item" hidden={hidden}>
              <a href={`/insights/${a.slug}`} className="archive-list__link">
                <span className="archive-list__title">{a.title}</span>
                <span className="archive-list__meta">{a.category}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
