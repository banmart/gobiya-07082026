// Shared chrome for the Gobiya book PDFs. The styles here are lifted verbatim
// from scripts/pdf/art-of-ai-search.html so every title in the series prints
// identically — that file predates this module and is left untouched.
//
// Pages are a fixed 8.5x11in with overflow:hidden, so anything too long for a
// page is silently clipped rather than reflowed. generate-book-pdfs.mjs checks
// for that before printing; don't remove that guard.

export const NAVY = '#0B1E36';
export const CARMINE = '#8B263E';
export const GOLD = '#F5B83D';

const CSS = `
  :root {
    --navy: #0B1E36;
    --carmine: #8B263E;
    --gold: #F5B83D;
    --paper: #FAFAFA;
    --ink: #1B2733;
    --hint: rgba(11, 30, 54, 0.72);
    --border: rgba(11, 30, 54, 0.14);
    --font-serif: 'PT Serif', Georgia, serif;
    --font-sans: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  }

  * { box-sizing: border-box; }

  @page { size: 8.5in 11in; margin: 0; }

  html, body {
    margin: 0;
    padding: 0;
    background: #fff;
    color: var(--ink);
    font-family: var(--font-sans);
    font-size: 10.6pt;
    line-height: 1.55;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    width: 8.5in;
    height: 11in;
    padding: 0.8in 0.85in 0.65in;
    position: relative;
    overflow: hidden;
    page-break-after: always;
    display: flex;
    flex-direction: column;
  }
  .page:last-of-type { page-break-after: auto; }

  h1, h2, h3 { font-family: var(--font-serif); font-weight: 700; margin: 0; color: var(--navy); }
  p { margin: 0 0 0.7em; }
  a { color: var(--carmine); }

  .kicker {
    font-family: var(--font-sans);
    font-size: 8.5pt;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--carmine);
    margin-bottom: 0.5em;
  }

  .rule-gold { height: 3px; width: 48px; background: var(--gold); border: none; margin: 0.9em 0 1.1em; }

  .footer {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7.6pt;
    color: var(--hint);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    border-top: 1px solid var(--border);
    padding-top: 0.16in;
  }
  .footer__brand { display: flex; align-items: center; gap: 6px; }
  .footer__logo { width: 12px; height: 12px; flex: none; }

  .checklist { list-style: none; margin: 0; padding: 0; }
  .checklist li {
    display: flex;
    gap: 0.6em;
    align-items: flex-start;
    margin-bottom: 0.65em;
    font-size: 10pt;
  }
  .checklist .box {
    flex: none;
    width: 13px;
    height: 13px;
    margin-top: 2px;
    border: 1.5px solid var(--navy);
    border-radius: 2px;
  }

  table { width: 100%; border-collapse: collapse; font-size: 9.2pt; margin: 0.6em 0 1em; }
  th, td { text-align: left; padding: 0.5em 0.6em; border-bottom: 1px solid var(--border); vertical-align: top; }
  th { font-family: var(--font-sans); font-weight: 600; color: var(--navy); font-size: 8pt; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1.5px solid var(--navy); }

  .stat-line { font-family: var(--font-serif); font-size: 15pt; color: var(--carmine); font-weight: 700; }

  .content-title { font-size: 21pt; margin-bottom: 0.15em; }
  .content-sub { font-size: 10pt; color: var(--hint); margin-bottom: 1.1em; font-style: italic; }

  .platform-name { font-size: 19pt; margin-bottom: 0.05em; }
  .platform-meta { display:flex; gap: 1.6em; margin: 0.7em 0 1em; }
  .platform-meta div { font-size: 8.5pt; color: var(--hint); text-transform: uppercase; letter-spacing: 0.04em; }
  .platform-meta strong { display:block; font-family: var(--font-serif); font-size: 15pt; color: var(--navy); text-transform: none; letter-spacing: 0; margin-top: 2px; }

  .two-col { display: flex; gap: 1.2in; flex: 1; }
  .two-col > div { flex: 1; }

  .pillar-num { font-family: var(--font-serif); font-size: 46pt; color: var(--gold); line-height: 1; margin-bottom: 0.05em; }

  .phase-tag {
    display: inline-block;
    background: var(--navy);
    color: #fff;
    font-size: 7.8pt;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.3em 0.7em;
    margin-bottom: 0.8em;
  }

  .takeaway-list li { margin-bottom: 0.9em; font-size: 10.5pt; }
  .takeaway-list { list-style: none; padding: 0; margin: 0; counter-reset: t; }
  .takeaway-list li { counter-increment: t; padding-left: 1.6em; position: relative; }
  .takeaway-list li::before {
    content: counter(t);
    position: absolute; left: 0; top: 0;
    font-family: var(--font-serif); color: var(--carmine); font-weight: 700; font-size: 11pt;
  }

  /* ---- Cover ---- */
  .cover {
    background: var(--navy);
    color: #fff;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0;
  }
  .cover__mark { margin-bottom: 1.4in; }
  .cover__kicker { font-family: var(--font-sans); font-size: 10pt; letter-spacing: 0.24em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.6em; }
  .cover__title { font-family: var(--font-serif); font-size: 46pt; line-height: 1.05; margin-bottom: 0.35em; color: #fff; }
  .cover__tag { font-size: 12.5pt; color: rgba(255,255,255,0.78); max-width: 5in; margin: 0 auto 1.6in; line-height: 1.5; }
  .cover__author { font-size: 9.5pt; color: rgba(255,255,255,0.6); letter-spacing: 0.03em; }
  .cover__author strong { color: #fff; }

  /* ---- TOC ---- */
  .toc-list { list-style: none; margin: 0; padding: 0; }
  .toc-list li {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0.55em 0;
    border-bottom: 1px solid var(--border);
    font-size: 11pt;
  }
  .toc-list .num { font-family: var(--font-serif); color: var(--carmine); font-size: 10.5pt; }
  .toc-list .pg { font-family: var(--font-serif); color: var(--hint); }

  /* ---- About / CTA ---- */
  .cta-page { background: var(--navy); color: #fff; justify-content: center; }
  .cta-page h1 { color: #fff; }
  .cta-page .rule-gold { background: var(--gold); }
  .cta-page a { color: var(--gold); }
  .cta-contact { margin-top: 1.4em; font-size: 11.5pt; }
  .cta-contact strong { display:block; font-family: var(--font-serif); font-size: 16pt; margin-bottom: 0.2em; color: var(--gold); }
`;

const markSvg = (fill, star) => `<svg width="52" height="52" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="8" width="7" height="15" fill="${fill}"/>
      <rect x="8" y="8" width="15" height="7" fill="${fill}"/>
      <rect x="33" y="25" width="7" height="15" fill="${fill}"/>
      <rect x="25" y="33" width="15" height="7" fill="${fill}"/>
      <path d="M24,17 L25.8,22.2 L31,24 L25.8,25.8 L24,31 L22.2,25.8 L17,24 L22.2,22.2 Z" fill="${star}"/>
    </svg>`;

const footerLogo = (fill, star) =>
  `<svg class="footer__logo" viewBox="0 0 48 48"><rect x="8" y="8" width="7" height="15" fill="${fill}"/><rect x="8" y="8" width="15" height="7" fill="${fill}"/><rect x="33" y="25" width="7" height="15" fill="${fill}"/><rect x="25" y="33" width="15" height="7" fill="${fill}"/><path d="M24,17 L25.8,22.2 L31,24 L25.8,25.8 L24,31 L22.2,25.8 L17,24 L22.2,22.2 Z" fill="${star}"/></svg>`;

/** A standard interior page. `n` is the printed page number. */
export function page(bookTitle, n, inner) {
  return `<section class="page">
${inner}
  <div class="footer">
    <span class="footer__brand">${footerLogo(NAVY, CARMINE)}Gobiya · ${bookTitle}</span>
    <span>${n}</span>
  </div>
</section>`;
}

export function cover({ title, tagline }) {
  return `<section class="page cover">
  <div class="cover__mark">${markSvg(GOLD, '#ffffff')}</div>
  <div class="cover__kicker">Gobiya Technical Series</div>
  <h1 class="cover__title">${title}</h1>
  <p class="cover__tag">${tagline}</p>
  <div class="cover__author">Written by <strong>Steve Martin</strong>, Founder of Gobiya</div>
</section>`;
}

export function toc(entries) {
  const rows = entries
    .map(
      (e) =>
        `    <li><span><span class="num">${e.num}</span>&nbsp;&nbsp;${e.label}</span><span class="pg">${e.pg}</span></li>`
    )
    .join('\n');
  return `<section class="page">
  <div class="kicker">Contents</div>
  <h1 class="content-title">Table of Contents</h1>
  <hr class="rule-gold">
  <ul class="toc-list">
${rows}
  </ul>
</section>`;
}

export function cta(bookTitle, n, { heading, blurb }) {
  return `<section class="page cta-page">
  <div class="kicker" style="color:var(--gold);">About Gobiya</div>
  <h1 style="font-size:24pt;">${heading}</h1>
  <hr class="rule-gold">
  <p style="color:rgba(255,255,255,0.82); max-width:5in;">${blurb}</p>
  <div class="cta-contact">
    <strong>Ready to see where you stand?</strong>
    Schedule a free consultation and we'll walk through your baseline together.<br><br>
    <a href="tel:+13237441338">323-744-1338</a> &nbsp;·&nbsp; <a href="https://gobiya.com">gobiya.com</a>
  </div>
  <div class="footer" style="border-top-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.55);">
    <span class="footer__brand">${footerLogo(GOLD, '#ffffff')}Gobiya · ${bookTitle}</span>
    <span>${n}</span>
  </div>
</section>`;
}

/** Wrap finished sections in the document shell. */
export function document_(title, sections) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${title} — Gobiya</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${CSS}</style>
</head>
<body>

${sections.join('\n\n')}

</body>
</html>
`;
}

/** Checklist block — matches the .checklist styles. */
export function checklist(items) {
  return `  <ul class="checklist">
${items.map((i) => `    <li><span class="box"></span><span>${i}</span></li>`).join('\n')}
  </ul>`;
}

/** Numbered takeaway list. */
export function numbered(items) {
  return `  <ul class="takeaway-list">
${items.map((i) => `    <li>${i}</li>`).join('\n')}
  </ul>`;
}

/** Simple data table. */
export function table(headers, rows) {
  return `  <table>
    <thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>
${rows.map((r) => `      <tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('\n')}
    </tbody>
  </table>`;
}
