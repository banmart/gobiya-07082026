// Screenshot local pages over CDP.
//
// Chrome's --screenshot + --window-size does not set the layout viewport on
// this site: pages render wider than the window and come out clipped, which
// looks exactly like horizontal overflow in the CSS and is not. Driving
// Emulation.setDeviceMetricsOverride over CDP is the reliable route.
//
//   node scripts/shot.mjs <outDir> <url> [url...]
//   node scripts/shot.mjs out/shots http://localhost:3000/glossary/ai-search-and-geo
//
// Env: WIDTH (default 1440), HEIGHT (default 900), DPR (default 1),
//      FULL=1 to capture beyond the fold.

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = Number(process.env.CDP_PORT || 9333);
const WIDTH = Number(process.env.WIDTH || 1440);
const HEIGHT = Number(process.env.HEIGHT || 900);
const DPR = Number(process.env.DPR || 1);
const FULL = process.env.FULL === '1';

const [outDir, ...urls] = process.argv.slice(2);
if (!outDir || urls.length === 0) {
  console.error('usage: node scripts/shot.mjs <outDir> <url> [url...]');
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

// Must be an absolute Windows path or Chrome exits silently.
const profile = path.resolve(os.tmpdir(), `gobiya-shot-${Date.now()}`);

const chrome = spawn(
  CHROME,
  [
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    '--headless=new',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    'about:blank',
  ],
  { stdio: 'ignore' }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function targets() {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await res.json();
      const page = list.find((t) => t.type === 'page');
      if (page) return page;
    } catch {}
    await sleep(200);
  }
  throw new Error('Chrome did not expose a CDP page target');
}

const page = await targets();
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let msgId = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
};
function send(method, params = {}) {
  const id = ++msgId;
  return new Promise((resolve) => {
    pending.set(id, resolve);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

await send('Page.enable');
await send('Runtime.enable');

for (const url of urls) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: DPR,
    mobile: WIDTH < 768,
  });

  await send('Page.navigate', { url });
  await sleep(2500);

  // Dismiss the consent banner so it does not sit over the fold, and settle
  // any scroll-reveal by walking the page once.
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const b = [...document.querySelectorAll('button')]
          .find(x => /decline/i.test(x.textContent || ''));
        if (b) b.click();
        window.scrollTo(0, document.body.scrollHeight);
        return 'ok';
      })()
    `,
  });
  await sleep(900);
  // SCROLL_TO="<css selector>" frames a specific block instead of the top.
  if (process.env.SCROLL_TO) {
    await send('Runtime.evaluate', {
      expression: `document.querySelector(${JSON.stringify(process.env.SCROLL_TO)})
        ?.scrollIntoView({ block: 'center' })`,
    });
  } else {
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0,0)' });
  }
  await sleep(700);

  let clip;
  if (FULL) {
    const { result } = await send('Runtime.evaluate', {
      expression: 'document.documentElement.scrollHeight',
      returnByValue: true,
    });
    // Chrome fails the capture outright past a few thousand pixels of height,
    // so cap rather than ask for the whole of a very long page.
    const full = Math.min(result.value, Number(process.env.MAX_H || 7000));
    await send('Emulation.setDeviceMetricsOverride', {
      width: WIDTH,
      height: full,
      deviceScaleFactor: DPR,
      mobile: WIDTH < 768,
    });
    await sleep(900);
    clip = { x: 0, y: 0, width: WIDTH, height: full, scale: 1 };
  }

  let shot = await send('Page.captureScreenshot', {
    format: 'png',
    ...(clip ? { clip, captureBeyondViewport: true } : {}),
  });

  // A tall clip can exceed what Chrome will rasterise. Fall back to the fold
  // rather than losing the page entirely.
  if (!shot.result?.data && clip) {
    console.warn(`  full-page capture failed for ${url}, falling back to viewport`);
    await send('Emulation.setDeviceMetricsOverride', {
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: DPR,
      mobile: WIDTH < 768,
    });
    await sleep(600);
    shot = await send('Page.captureScreenshot', { format: 'png' });
  }
  if (!shot.result?.data) {
    console.error(`  capture failed for ${url}: ${JSON.stringify(shot.error || shot)}`);
    continue;
  }

  const name =
    (new URL(url).pathname.replace(/\/$/, '').replace(/^\//, '').replace(/\//g, '_') || 'home') +
    `_${WIDTH}.png`;
  const file = path.join(outDir, name);
  fs.writeFileSync(file, Buffer.from(shot.result.data, 'base64'));
  console.log(file);
}

ws.close();
chrome.kill();
// Chrome can still hold the profile dir briefly; the screenshots are already
// written, so a failed cleanup must not fail the run.
try {
  fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
} catch {}
