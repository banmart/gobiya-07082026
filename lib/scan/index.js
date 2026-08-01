import { assertPublicUrl } from './url.js';
import { collectHtml } from './html.js';
import { collectPageSpeed } from './psi.js';
import { collectDns } from './dns.js';
import { collectSsl } from './ssl.js';
import { collectDiscovery } from './discovery.js';

/* Orchestrator.
 *
 * Runs every collector concurrently and never throws. A collector that fails
 * contributes nothing to `facts` and an entry to `collectorStatus`, which is
 * what lets the report say "not measured" instead of quietly implying the check
 * passed. That distinction is the whole point — an audit that silently omits
 * what it could not test is worse than one that admits it.
 */

const COLLECTORS = [
  ['page', collectHtml],
  ['performance', collectPageSpeed],
  ['dns', collectDns],
  ['ssl', collectSsl],
  ['discovery', collectDiscovery],
];

export async function runScan(rawUrl) {
  const checked = await assertPublicUrl(rawUrl);
  if (!checked.ok) {
    // A URL we refuse to fetch is not a collector failure — there is nothing to
    // scan at all, and the caller needs to know that before doing any work.
    return { ok: false, reason: checked.reason };
  }

  const url = checked.url;

  const settled = await Promise.allSettled(
    COLLECTORS.map(async ([name, collect]) => [name, await collect(url)])
  );

  const facts = {};
  const collectorStatus = {};

  settled.forEach((outcome, index) => {
    const name = COLLECTORS[index][0];

    if (outcome.status === 'rejected') {
      collectorStatus[name] = { state: 'failed', reason: 'The check did not complete.' };
      return;
    }

    const [, result] = outcome.value;

    if (result?.ok) {
      Object.assign(facts, result.facts);
      collectorStatus[name] = { state: 'ok' };
    } else if (result?.skipped) {
      collectorStatus[name] = { state: 'skipped', reason: result.reason };
    } else {
      collectorStatus[name] = { state: 'failed', reason: result?.reason || 'The check did not complete.' };
    }
  });

  return { ok: true, url, facts, collectorStatus };
}
