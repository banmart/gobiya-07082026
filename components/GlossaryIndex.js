'use client';

import { useMemo, useState } from 'react';
import { GLOSSARY_CATEGORIES } from '../lib/glossary';
import { hubForTerm } from '../lib/glossaryHubs';

export default function GlossaryIndex({ terms }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(
    () => (activeCategory === 'All' ? terms : terms.filter((t) => t.category === activeCategory)),
    [terms, activeCategory]
  );

  const grouped = useMemo(() => {
    const byLetter = new Map();
    for (const t of [...filtered].sort((a, b) => a.term.localeCompare(b.term))) {
      const letter = t.term[0].toUpperCase();
      if (!byLetter.has(letter)) byLetter.set(letter, []);
      byLetter.get(letter).push(t);
    }
    return [...byLetter.entries()];
  }, [filtered]);

  return (
    <>
      <div className="insights__filters" role="group" aria-label="Filter terms by category" data-reveal>
        {['All', ...GLOSSARY_CATEGORIES].map((cat) => (
          <button
            key={cat}
            type="button"
            className={`insights__filter${cat === activeCategory ? ' is-active' : ''}`}
            aria-pressed={cat === activeCategory}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {grouped.map(([letter, entries]) => (
        <div key={letter} className="glossary-letter-group">
          <h2 className="glossary-letter-heading">{letter}</h2>
          <ul className="archive-list">
            {/* Straight to the term's anchor on its hub. Linking the retired
                standalone URL would send every click through a 301. */}
            {entries.map((t) => {
              const hub = hubForTerm(t.slug);
              return (
                <li key={t.slug} className="archive-list__item">
                  <a href={`/glossary/${hub.slug}#${t.slug}`} className="archive-list__link">
                    <span className="archive-list__title">{t.term}</span>
                    <span className="archive-list__meta">{t.category}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}
