/* Report delivery.
 *
 * Two messages from one call: the report to the visitor, and a copy to Steve so
 * the lead arrives with its findings attached rather than as a bare name.
 *
 * Failures here are logged and swallowed. By the time this runs the report is
 * already saved and on the visitor's screen, so a Resend outage must not turn a
 * finished scan into an error page.
 */

import { resend } from '../resend';

const SEVERITY_COLOR = { high: '#C4380C', medium: '#b7791f', low: '#475569' };

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function findingBlock(finding) {
  const color = SEVERITY_COLOR[finding.severity] || SEVERITY_COLOR.low;
  return `
    <tr>
      <td style="padding:16px 0;border-bottom:1px solid #e5e7eb;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${color};">${escapeHtml(finding.severity)}</p>
        <p style="margin:0 0 6px;font-size:15px;font-weight:600;color:#0C1050;">${escapeHtml(finding.title)}</p>
        <p style="margin:0 0 6px;font-size:14px;line-height:1.6;color:#334155;">${escapeHtml(finding.why)}</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#475569;"><strong>Fix:</strong> ${escapeHtml(finding.fix)}</p>
      </td>
    </tr>`;
}

function buildHtml({ url, score, report, reportUrl, unmeasured }) {
  const scoreColor = score >= 80 ? '#15803d' : score >= 50 ? '#b7791f' : '#E1420F';

  return `
  <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:640px;margin:0 auto;padding:8px;">
    <p style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#64748B;margin:0 0 6px;">Gobiya site scan</p>
    <h1 style="font-size:22px;font-weight:600;color:#0C1050;margin:0 0 4px;">Your site scan results</h1>
    <p style="font-size:14px;color:#475569;margin:0 0 24px;">${escapeHtml(url)}</p>

    <div style="border:1px solid #e5e7eb;border-radius:10px;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#64748B;">Overall score</p>
      <p style="margin:0;font-size:40px;font-weight:700;line-height:1;color:${scoreColor};">${score}<span style="font-size:18px;color:#94A3B8;font-weight:500;">/100</span></p>
    </div>

    <p style="font-size:15px;line-height:1.65;color:#334155;margin:0 0 24px;">${escapeHtml(report.summary)}</p>

    <h2 style="font-size:16px;font-weight:600;color:#0C1050;margin:0 0 4px;">What we found</h2>
    <table style="width:100%;border-collapse:collapse;">${report.findings.map(findingBlock).join('')}</table>

    ${report.nextSteps?.length ? `
      <h2 style="font-size:16px;font-weight:600;color:#0C1050;margin:28px 0 8px;">Where to start</h2>
      <ol style="margin:0;padding-left:20px;font-size:14px;line-height:1.7;color:#334155;">
        ${report.nextSteps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}
      </ol>` : ''}

    ${unmeasured.length ? `
      <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#64748B;">
        We could not complete these checks on this run: ${escapeHtml(unmeasured.join(', '))}.
        They are not counted for or against your score.
      </p>` : ''}

    <p style="margin:28px 0 0;font-size:13px;line-height:1.6;color:#64748B;">
      This scan looked at the single page above, not every page on the site.
    </p>

    <div style="margin-top:28px;padding-top:20px;border-top:1px solid #e5e7eb;">
      <a href="${escapeHtml(reportUrl)}" style="display:inline-block;background:#0C1050;color:#ffffff;font-size:14px;font-weight:600;padding:12px 22px;border-radius:6px;text-decoration:none;">View the full report</a>
      <p style="margin:16px 0 0;font-size:14px;color:#475569;">
        Questions? Reply to this email or call <a href="tel:+13237441338" style="color:#C4380C;">323-744-1338</a>. Steve answers both himself.
      </p>
    </div>
  </div>`;
}

export async function sendSiteScanEmails({ to, name, url, score, report, reportUrl, collectorStatus }) {
  const unmeasured = Object.entries(collectorStatus || {})
    .filter(([, value]) => value.state !== 'ok')
    .map(([key]) => key);

  const html = buildHtml({ url, score, report, reportUrl, unmeasured });
  const from = process.env.SITE_SCAN_FROM_EMAIL
    || process.env.ONBOARDING_FROM_EMAIL
    || 'Gobiya Site Scan <onboarding@gobiya.com>';

  const results = await Promise.allSettled([
    resend.emails.send({
      from,
      to,
      replyTo: process.env.ONBOARDING_NOTIFY_EMAIL || 'banmart@gmail.com',
      subject: `Your site scan results — ${url}`,
      html,
    }),
    resend.emails.send({
      from,
      to: process.env.ONBOARDING_NOTIFY_EMAIL || 'banmart@gmail.com',
      replyTo: to,
      subject: `Site scan complete — ${name || to} — ${score}/100`,
      html,
    }),
  ]);

  results.forEach((result, index) => {
    const label = index === 0 ? 'visitor' : 'internal';
    if (result.status === 'rejected') {
      console.error(`Site scan ${label} email failed:`, result.reason);
    } else if (result.value?.error) {
      console.error(`Site scan ${label} email failed:`, result.value.error);
    }
  });

  return { ok: true };
}
