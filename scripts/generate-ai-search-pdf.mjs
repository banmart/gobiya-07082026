// Renders scripts/pdf/art-of-ai-search.html to public/downloads/the-art-of-ai-search.pdf
// using the local Chrome install driven over CDP (no puppeteer dependency in this repo —
// see project memory on headless screenshots for why: --user-data-dir must be an absolute
// Windows path or Chrome exits silently).
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
import { mkdtemp, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9333;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, 'pdf', 'art-of-ai-search.html');
const outPath = path.join(__dirname, '..', 'public', 'downloads', 'the-art-of-ai-search.pdf');

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

function send(ws, id, method, params = {}) {
  ws.send(JSON.stringify({ id, method, params }));
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
  const userDataDir = await mkdtemp(path.join(tmpdir(), 'gobiya-pdf-chrome-'));

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

  try {
    await waitForDebugger();

    const versionRes = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    const { webSocketDebuggerUrl } = await versionRes.json();
    const ws = new WebSocket(webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve, { once: true });
      ws.addEventListener('error', reject, { once: true });
    });

    // Open a new tab (page target) rather than driving the initial browser-level target
    let id = 1;
    send(ws, id, 'Target.createTarget', { url: 'about:blank' });
    const created = await waitForMessage(ws, (m) => m.id === id);
    const targetId = created.result.targetId;
    id++;

    send(ws, id, 'Target.attachToTarget', { targetId, flatten: true });
    const attached = await waitForMessage(ws, (m) => m.id === id);
    const sessionId = attached.result.sessionId;
    id++;

    function sendSession(method, params = {}) {
      const msgId = id++;
      ws.send(JSON.stringify({ id: msgId, method, params, sessionId }));
      return msgId;
    }

    function waitForSessionMessage(predicate) {
      return waitForMessage(ws, (m) => m.sessionId === sessionId && predicate(m));
    }

    sendSession('Page.enable');

    const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
    const navId = sendSession('Page.navigate', { url: fileUrl });
    await waitForSessionMessage((m) => m.id === navId);
    await waitForSessionMessage((m) => m.method === 'Page.loadEventFired');
    // Give web fonts (PT Serif / Inter from Google Fonts) time to finish loading
    await sleep(1500);

    const printId = sendSession('Page.printToPDF', {
      printBackground: true,
      preferCSSPageSize: true,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      displayHeaderFooter: false,
    });
    const printResult = await waitForSessionMessage((m) => m.id === printId);

    if (printResult.error) {
      throw new Error(`Page.printToPDF failed: ${printResult.error.message}`);
    }

    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, Buffer.from(printResult.result.data, 'base64'));
    console.log(`Wrote ${outPath}`);

    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
