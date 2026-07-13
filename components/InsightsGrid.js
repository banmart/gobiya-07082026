'use client';

import { useMemo, useRef, useState } from 'react';

const PAGE_SIZE = 6;

export default function InsightsGrid({ articles }) {
  const categories = useMemo(() => {
    const list = ['All'];
    for (const a of articles) {
      if (!list.includes(a.category)) list.push(a.category);
    }
    return list;
  }, [articles]);

  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);
  const gridRef = useRef(null);

  const filtered = useMemo(
    () => (activeCategory === 'All' ? articles : articles.filter((a) => a.category === activeCategory)),
    [articles, activeCategory]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function selectCategory(cat) {
    setActiveCategory(cat);
    setPage(1);
  }

  function goToPage(n) {
    setPage(n);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      <div className="insights__filters" role="group" aria-label="Filter articles by category" data-reveal>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`insights__filter${cat === activeCategory ? ' is-active' : ''}`}
            aria-pressed={cat === activeCategory}
            onClick={() => selectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="insights__grid" ref={gridRef}>
        {paginated.map((a) => (
          <a className="insights__card" href={`/insights/${a.slug}`} key={a.slug}>
            <span className="insights__card-cat">{a.category}</span>
            <h2 className="insights__card-title">{a.title}</h2>
            <p className="insights__card-dek">{a.dek}</p>
            <span className="link-arrow">Read<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></span>
          </a>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="insights__pagination" aria-label="Insights pagination">
          <button
            type="button"
            className="insights__page-btn insights__page-btn--nav"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              className={`insights__page-btn${n === currentPage ? ' is-active' : ''}`}
              aria-current={n === currentPage ? 'page' : undefined}
              onClick={() => goToPage(n)}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            className="insights__page-btn insights__page-btn--nav"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </nav>
      )}
    </>
  );
}
