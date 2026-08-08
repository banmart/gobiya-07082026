// Renders one block of an authored `body` array. Used by the city pages
// (lib/areas.js) and the service pages (lib/serviceBodies.js) so both are laid
// out identically and the copy stays plain data rather than markup.
//
// `cta` is the repeated phone line, kept as a block type rather than prose so
// the number and the contact link stay linked wherever it appears.
export function renderBlock(block, i) {
  if (block.h2) return <h2 key={i} className="mw-area-body__heading">{block.h2}</h2>;
  if (block.h3) return <h3 key={i} className="mw-area-body__services-heading">{block.h3}</h3>;
  if (block.h4) return <h4 key={i} className="mw-area-body__minihead">{block.h4}</h4>;
  if (block.excerpt) return <p key={i} className="mw-area-body__excerpt">{block.excerpt}</p>;
  if (block.p) return <p key={i} className="mw-area-body__text">{block.p}</p>;
  if (block.list) {
    return (
      <ul key={i} className="mw-area-body__list">
        {block.list.map((item) => <li key={item}>{item}</li>)}
      </ul>
    );
  }
  if (block.button) {
    return (
      <p key={i} className="mw-area-body__btn-wrap">
        <a href={block.button.href || '?onboarding=true'} className="mw-area-body__btn">
          {block.button.text} <span aria-hidden="true">→</span>
        </a>
      </p>
    );
  }
  if (block.cta) {
    // `cta: true` is the bold excerpt treatment on the main number; pass an
    // object to change the lead-in, the number, the tail, or render it as body
    // text instead.
    const cfg = block.cta === true ? {} : block.cta;
    const cls = cfg.style === 'text' ? 'mw-area-body__text' : 'mw-area-body__excerpt';
    const phone = cfg.phone || '(323) 744-1338';
    return (
      <p key={i} className={`${cls} mw-area-body__cta-line`}>
        {cfg.lead || 'Reach out to us at'}{' '}
        <a href={`tel:+1${phone.replace(/\D/g, '')}`}>{phone}</a> or{' '}
        <a href="/contact">contact us online</a>{' '}
        {cfg.tail || 'for all your SEO needs.'}
      </p>
    );
  }
  return null;
}
