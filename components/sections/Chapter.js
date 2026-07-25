// Numbered chapter heading. Shared by both service templates and the case
// studies — numbering the sections is what turns a stack of blocks into an
// argument with an order to it.

export default function Chapter({ n, label, title, light = false }) {
  return (
    <div className="chapter" data-chapter>
      <p className={`chapter__eyebrow${light ? ' chapter__eyebrow--light' : ''}`}>
        <span className="chapter__num">{String(n).padStart(2, '0')}</span>
        <span className="chapter__rule" data-rule aria-hidden="true" />
        {label}
      </p>
      {title && <h2 className="statement statement--small" data-split>{title}</h2>}
    </div>
  );
}
