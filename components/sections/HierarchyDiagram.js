// A framework hierarchy drawn as SVG rather than typed as ASCII art.
//
// The OmniSEO article arrived with its structure as a monospace box drawing.
// The article body has no code block to put that in, and a <pre> inside a 42rem
// column wraps and falls apart on a phone. So the shape is taken as data — one
// apex, N branches, a couple of leaf labels under each — and drawn, which also
// means it themes with the rest of the page instead of sitting there as text.
//
// Type is sized in user units against a 720-wide viewBox. On a narrow screen
// the SVG keeps a min-width and the wrapper scrolls, the same affordance the
// data tables use, rather than shrinking the labels into nothing.

export default function HierarchyDiagram({ apex, apexNote, branches, caption }) {
  if (!apex || !branches?.length) return null;

  const W = 720;
  const GAP = 36;
  const n = branches.length;
  const colW = (W - GAP * (n - 1)) / n;
  const colX = (i) => i * (colW + GAP);
  const colC = (i) => colX(i) + colW / 2;

  const APEX_H = 68;
  const SPINE_Y = 96; // the rail the branches hang from
  const BOX_Y = 124;
  const BOX_H = 58;
  const LEAF_Y = 216; // first leaf baseline
  const LEAF_STEP = 24;
  const maxLeaves = Math.max(...branches.map((b) => b.items?.length || 0));
  const H = LEAF_Y + LEAF_STEP * Math.max(maxLeaves - 1, 0) + 12;

  const label = caption || `${apex} hierarchy`;

  return (
    <figure className="hier" data-reveal>
      <div className="hier__scroll" tabIndex={0} role="group" aria-label={label}>
        <svg className="hier__svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}>
          {/* apex */}
          <rect className="hier__apex" x={W / 2 - 170} y="0" width="340" height={APEX_H} />
          <text className="hier__apex-title" x={W / 2} y="32" textAnchor="middle">{apex}</text>
          {apexNote && (
            <text className="hier__apex-note" x={W / 2} y="52" textAnchor="middle">
              {apexNote.toUpperCase()}
            </text>
          )}

          {/* spine + drops */}
          <path className="hier__rule" d={`M${W / 2} ${APEX_H} V${SPINE_Y}`} />
          {n > 1 && <path className="hier__rule" d={`M${colC(0)} ${SPINE_Y} H${colC(n - 1)}`} />}

          {branches.map((b, i) => (
            <g key={b.title}>
              <path className="hier__rule" d={`M${colC(i)} ${SPINE_Y} V${BOX_Y}`} />
              <rect className="hier__box" x={colX(i)} y={BOX_Y} width={colW} height={BOX_H} />
              <rect className="hier__box-cap" x={colX(i)} y={BOX_Y} width={colW} height="3" />
              <text className="hier__box-title" x={colC(i)} y={BOX_Y + 36} textAnchor="middle">
                {b.title}
              </text>
              {b.items?.length > 0 && (
                <path className="hier__rule" d={`M${colC(i)} ${BOX_Y + BOX_H} V${BOX_Y + BOX_H + 16}`} />
              )}
              {b.items?.map((item, j) => (
                <g key={item}>
                  <rect
                    className="hier__dot"
                    x={colX(i) + 2}
                    y={LEAF_Y + LEAF_STEP * j - 9}
                    width="6"
                    height="6"
                  />
                  <text className="hier__leaf" x={colX(i) + 16} y={LEAF_Y + LEAF_STEP * j}>
                    {item}
                  </text>
                </g>
              ))}
            </g>
          ))}
        </svg>
      </div>
      {caption && <figcaption className="hier__cap">{caption}</figcaption>}
    </figure>
  );
}
