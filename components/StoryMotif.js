// Signature figure per service topic. Server-rendered inline SVG — no JS
// needed to see it, and Motion.js animates it on scroll via the data hooks.
//
// Each motif is the page's argument drawn once: the crawler reading a page,
// citations forming around a source, spend consolidating, thin pages merging.
// Same navy/carmine palette as everything else — the variation is geometry,
// not colour.

const STROKE = 'rgba(11, 31, 58, 0.22)';
const INK = '#0C1050';
const ACCENT = '#E1420F';

function Grid() {
  // a crawler sweeping a page: rows resolve, one line lights up
  const rows = [0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox="0 0 320 200" fill="none" role="img" aria-label="A crawler reading the page">
      <rect x="0.5" y="0.5" width="319" height="199" stroke={STROKE} />
      {rows.map((r) => (
        <line
          key={r}
          x1="24"
          x2={r % 2 === 0 ? 250 : 210}
          y1={36 + r * 24}
          y2={36 + r * 24}
          stroke={r === 2 ? ACCENT : STROKE}
          strokeWidth={r === 2 ? 3 : 2}
          data-motif-row
        />
      ))}
      <rect x="24" y="18" width="64" height="8" fill={INK} data-motif-row />
      <line x1="0" y1="84" x2="320" y2="84" stroke={ACCENT} strokeWidth="2" data-motif-scan />
    </svg>
  );
}

function Nodes() {
  // one source, citations attaching to it
  const pts = [
    [70, 48], [252, 60], [58, 148], [262, 146], [160, 26], [160, 176],
  ];
  return (
    <svg viewBox="0 0 320 200" fill="none" role="img" aria-label="Citations forming around a source">
      <rect x="0.5" y="0.5" width="319" height="199" stroke={STROKE} />
      {pts.map(([x, y], i) => (
        <line key={`l${i}`} x1="160" y1="100" x2={x} y2={y} stroke={STROKE} strokeWidth="2" data-motif-row />
      ))}
      {pts.map(([x, y], i) => (
        <circle key={`c${i}`} cx={x} cy={y} r="7" fill={INK} data-motif-row />
      ))}
      <circle cx="160" cy="100" r="16" fill={ACCENT} data-motif-pulse />
    </svg>
  );
}

function Bars() {
  // spend spread thin, then consolidated onto the one that converts
  const bars = [28, 52, 40, 96, 34, 62, 44];
  return (
    <svg viewBox="0 0 320 200" fill="none" role="img" aria-label="Spend consolidating onto what converts">
      <rect x="0.5" y="0.5" width="319" height="199" stroke={STROKE} />
      <line x1="24" y1="168" x2="296" y2="168" stroke={STROKE} strokeWidth="2" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={32 + i * 38}
          y={168 - h}
          width="24"
          height={h}
          fill={i === 3 ? ACCENT : INK}
          opacity={i === 3 ? 1 : 0.28}
          data-motif-row
        />
      ))}
    </svg>
  );
}

function Lines() {
  // several thin pages collapsing into one that actually answers
  const thin = [0, 1, 2, 3];
  return (
    <svg viewBox="0 0 320 200" fill="none" role="img" aria-label="Thin pages consolidating into one that answers">
      <rect x="0.5" y="0.5" width="319" height="199" stroke={STROKE} />
      {thin.map((i) => (
        <rect
          key={i}
          x={26 + i * 34}
          y="34"
          width="24"
          height="52"
          stroke={STROKE}
          strokeWidth="2"
          data-motif-row
        />
      ))}
      <path d="M96 100 L160 124" stroke={STROKE} strokeWidth="2" data-motif-row />
      <rect x="170" y="112" width="124" height="62" fill={ACCENT} data-motif-pulse />
      <line x1="184" y1="132" x2="264" y2="132" stroke="#fff" strokeWidth="3" />
      <line x1="184" y1="148" x2="240" y2="148" stroke="#fff" strokeWidth="3" />
    </svg>
  );
}

const MOTIFS = { grid: Grid, nodes: Nodes, bars: Bars, lines: Lines };

export default function StoryMotif({ motif = 'grid', label }) {
  const Shape = MOTIFS[motif] || Grid;
  return (
    <figure className="story-motif" data-motif>
      <Shape />
      {label && <figcaption className="story-motif__cap">{label}</figcaption>}
    </figure>
  );
}
