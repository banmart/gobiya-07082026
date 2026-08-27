/* The navy credentials bar. Four claims, one carmine check each. */

export const PROOF_POINTS = [
  '15+ Years Experience',
  '5-Star Client Rating',
  'Proven Algorithmic Recovery',
  'Featured in Top Industry Outlets',
];

export default function ProofBar({ points = PROOF_POINTS }) {
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
