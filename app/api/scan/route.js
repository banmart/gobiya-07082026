import { NextResponse } from 'next/server';
import { createAdminSupabase } from '../../../lib/supabase/admin';
import { checkRateLimit } from '../../../lib/rate-limit';
import { runScan } from '../../../lib/scan/index.js';
import { scoreFacts } from '../../../lib/scan/score.js';
import { generateReport } from '../../../lib/scan/report.js';
import { sendSiteScanEmails } from '../../../lib/emails/siteScan.js';

// node:dns and node:tls are used by the collectors, so this cannot run on edge.
export const runtime = 'nodejs';
// The PageSpeed call alone can take 30s.
export const maxDuration = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.gobiya.com';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const id = String(body?.id || '');
  if (!id) {
    return NextResponse.json({ error: 'Missing report id.' }, { status: 400 });
  }

  const admin = createAdminSupabase();
  const { data: audit, error } = await admin
    .from('ai_audits')
    .select('id, url, email, status, score, report_data, collector_status')
    .eq('id', id)
    .single();

  if (error || !audit) {
    return NextResponse.json({ error: 'Report not found.' }, { status: 404 });
  }

  /* Idempotency guard, before the rate limit.
   *
   * Refreshing a finished report must not re-scan or send a second email, and
   * it must not burn the visitor's rate-limit allowance either — otherwise
   * reading your own report twice locks you out of it. */
  if (audit.status === 'complete') {
    return NextResponse.json({
      status: 'complete',
      url: audit.url,
      score: audit.score,
      report: audit.report_data,
      collectorStatus: audit.collector_status,
    });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkRateLimit(ip, 'site-scan', 6, 24)) {
    return NextResponse.json(
      { error: 'You have reached the scan limit for today. Email steve@gobiya.com and we will run it for you.' },
      { status: 429 }
    );
  }

  const scan = await runScan(audit.url);

  // Nothing to scan at all — record it rather than leaving the row pending
  // forever, and tell the visitor plainly.
  if (!scan.ok) {
    await admin
      .from('ai_audits')
      .update({ status: 'failed', collector_status: { reason: scan.reason }, completed_at: new Date().toISOString() })
      .eq('id', id);

    return NextResponse.json({ status: 'failed', url: audit.url, reason: scan.reason });
  }

  const { score, breakdown, measuredCount } = scoreFacts(scan.facts);
  const report = await generateReport({ url: scan.url, score, breakdown });

  const reportData = {
    ...report,
    breakdown,
    measuredCount,
    facts: scan.facts,
    scannedAt: new Date().toISOString(),
  };

  const { error: writeError } = await admin
    .from('ai_audits')
    .update({
      status: 'complete',
      score,
      report_data: reportData,
      collector_status: scan.collectorStatus,
      completed_at: new Date().toISOString(),
    })
    .eq('id', id);

  // A failed write is logged but not fatal: the report is already built and the
  // visitor is waiting for it. They lose the permanent link, not the report.
  if (writeError) {
    console.error('Failed to persist site scan:', writeError);
  }

  if (audit.email) {
    await sendSiteScanEmails({
      to: audit.email,
      name: body?.name,
      url: scan.url,
      score,
      report,
      reportUrl: `${SITE_URL}/free-site-scan/report/${id}`,
      collectorStatus: scan.collectorStatus,
    });
  }

  return NextResponse.json({
    status: 'complete',
    url: scan.url,
    score,
    report: reportData,
    collectorStatus: scan.collectorStatus,
  });
}
