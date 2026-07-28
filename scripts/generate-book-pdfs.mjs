// Renders the Gobiya book series to public/downloads/*.pdf.
//
// Same Chrome-over-CDP approach as generate-ai-search-pdf.mjs (no puppeteer in
// this repo — see project memory on headless screenshots for why). The addition
// here is an overflow check: .page is a fixed 8.5x11in box with overflow:hidden,
// so content that runs long is silently clipped in the PDF rather than
// reflowing. We measure every page in the DOM before printing and refuse to
// write a PDF that would lose content.
//
// Usage:  node scripts/generate-book-pdfs.mjs [slug ...]
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
import { mkdtemp, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as acquired from './pdf/books/acquired.mjs';
import * as architecture from './pdf/books/architecture.mjs';
import * as closingTheDeal from './pdf/books/closing-the-deal.mjs';
import * as beginnersGuide from './pdf/books/beginners-guide.mjs';

const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9334;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BOOKS = [acquired, architecture, closingTheDeal, beginnersGuide];

async function waitForDebugger() {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) return;
    } catch {
      // not up yet
    }
    await sleep(200);
  }
  throw new Error('Chrome remote debugging port never came up');
}

function waitForMessage(ws, predicate) {
  return new Promise((resolve) => {
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (predicate(msg)) {
        ws.removeEventListener('message', handler);
        resolve(msg);
      }
    };
    ws.addEventListener('message', handler);
  });
}

async function main() {
  const only = process.argv.slice(2);
  const selected = only.length ? BOOKS.filter((b) => only.includes(b.meta.slug)) : BOOKS;
  if (!selected.length) {
    throw new Error(`No books matched: ${only.join(', ')}`);
  }

  // Write the HTML first so it's inspectable even if Chrome misbehaves.
  const htmlDir = path.join(__dirname, 'pdf');
  await mkdir(htmlDir, { recursive: true });
  for (const book of selected) {
    const htmlPath = path.join(htmlDir, `${book.meta.slug}.html`);
    await writeFile(htmlPath, book.build(), 'utf8');
    console.log(`  html  ${path.relative(process.cwd(), htmlPath)}`);
  }

  const userDataDir = await mkdtemp(path.join(tmpdir(), 'gobiya-books-chrome-'));
  const chrome = spawn(
    CHROME_PATH,
    [
      '--headless=new',
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${userDataDir}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-gpu',
    ],
    { stdio: 'ignore' }
  );

  const problems = [];

  try {
    await waitForDebugger();
    const { webSocketDebuggerUrl } = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json();
    const ws = new WebSocket(webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve, { once: true });
      ws.addEventListener('error', reject, { once: true });
    });

    let id = 1;
    const send = (method, params = {}) => {
      const msgId = id++;
      ws.send(JSON.stringify({ id: msgId, method, params }));
      return msgId;
    };

    for (const book of selected) {
      const createId = send('Target.createTarget', { url: 'about:blank' });
      const created = await waitForMessage(ws, (m) => m.id === createId);
      const targetId = created.result.targetId;

      const attachId = send('Target.attachToTarget', { targetId, flatten: true });
      const attached = await waitForMessage(ws, (m) => m.id === attachId);
      const sessionId = attached.result.sessionId;

      const sendSession = (method, params = {}) => {
        const msgId = id++;
        ws.send(JSON.stringify({ id: msgId, method, params, sessionId }));
        return msgId;
      };
      const waitSession = (predicate) => waitForMessage(ws, (m) => m.sessionId === sessionId && predicate(m));

      sendSession('Page.enable');

      const htmlPath = path.join(htmlDir, `${book.meta.slug}.html`);
      const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
      const navId = sendSession('Page.navigate', { url: fileUrl });
      await waitSession((m) => m.id === navId);
      await waitSession((m) => m.method === 'Page.loadEventFired');
      // Web fonts (PT Serif / Inter) load from Google Fonts; give them time or
      // the measurement below runs against fallback metrics.
      await sleep(1800);

      // Overflow guard — .page is a fixed-height box with overflow:hidden, so
      // content that runs long is clipped silently.
      //
      // scrollHeight is useless here: .page is a flex column whose footer has
      // margin-top:auto, so children always stretch to fill and scrollHeight
      // never exceeds clientHeight. Measuring it reports 0 for every page,
      // including a near-empty cover. Instead clone each page at height:auto
      // and compare its natural height against the fixed box.
      const evalId = sendSession('Runtime.evaluate', {
        returnByValue: true,
        expression: `JSON.stringify([...document.querySelectorAll('.page')]
          .map((p, i) => {
            const c = p.cloneNode(true);
            c.style.height = 'auto';
            c.style.overflow = 'visible';
            c.style.position = 'absolute';
            c.style.left = '-9999px';
            c.style.visibility = 'hidden';
            c.style.width = getComputedStyle(p).width;
            document.body.appendChild(c);
            const natural = c.offsetHeight;
            c.remove();
            return { page: i + 1, over: natural - p.offsetHeight };
          })
          .filter((x) => x.over > 0))`,
      });
      const evalRes = await waitSession((m) => m.id === evalId);
      const overflows = JSON.parse(evalRes.result.result.value);

      if (overflows.length) {
        problems.push({ book: book.meta.title, overflows });
        console.error(
          `  FAIL  ${book.meta.title} — ${overflows.length} page(s) overflow: ` +
            overflows.map((o) => `p${o.page} by ${o.over}px`).join(', ')
        );
        sendSession('Page.close');
        continue;
      }

      const printId = sendSession('Page.printToPDF', {
        printBackground: true,
        preferCSSPageSize: true,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        displayHeaderFooter: false,
      });
      const printResult = await waitSession((m) => m.id === printId);
      if (printResult.error) {
        throw new Error(`printToPDF failed for ${book.meta.slug}: ${printResult.error.message}`);
      }

      const outPath = path.join(__dirname, '..', 'public', 'downloads', book.meta.out);
      await mkdir(path.dirname(outPath), { recursive: true });
      await writeFile(outPath, Buffer.from(printResult.result.data, 'base64'));
      console.log(`  pdf   ${path.relative(process.cwd(), outPath)}`);

      sendSession('Page.close');
    }

    ws.close();
  } finally {
    chrome.kill();
  }

  if (problems.length) {
    console.error('\nRefused to write PDFs with clipped content. Shorten the pages listed above.');
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
