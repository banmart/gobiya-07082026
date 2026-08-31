'use client';

import { useState } from 'react';
import { HOMEPAGE_FAQ } from '../lib/homepageFaq';

export default function HomeFaq() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section className="hfaq">
      <div className="container">
        <h2 className="hfaq__title">Frequently asked questions</h2>

        <div className="hfaq__list">
          {HOMEPAGE_FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`hfaq__item${isOpen ? ' hfaq__item--open' : ''}`}>
                <button
                  className="hfaq__trigger"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  title={isOpen ? 'Collapse this question' : 'Expand this question'}
                >
                  <span className="hfaq__q">{item.q}</span>
                  <span className="hfaq__icon" aria-hidden="true">
                    {isOpen ? '×' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="hfaq__answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
