/* The navy credentials bar. Four claims, one carmine check each.
   Nothing imports this component at present — the tenure figure is derived
   from lib/authority.js anyway, so it states the right number if it is ever
   mounted again rather than the "15+" that contradicted the 2009 founding
   date. */

import { yearsInBusiness } from '../lib/authority';

export function proofPoints(now = new Date()) {
  return [
    `${yearsInBusiness(now)} Years in Business`,
    '5-Star Client Rating',
    'Proven Algorithmic Recovery',
    'Featured in Top Industry Outlets',
  ];
}

export default function ProofBar({ points = proofPoints() }) {
  return (
    <section className="gb-proof" aria-label="Credentials">
      <div className="container">
        <ul className="gb-proof__list">
          {points.map((p) => (
            <li key={p} className="gb-proof__item">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="gb-proof__check"
                aria-hidden="true"
              >
                <path d="M4 12.5l5.5 5.5L20 6.5" />
              </svg>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
