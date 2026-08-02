import { NextResponse } from 'next/server';
import { createAdminSupabase } from '../../../../lib/supabase/admin';
import { recordFormSubmission } from '../../../../lib/submissions';
import { sendSiteScanEmails } from '../../../../lib/emails/siteScan';
import { sendOnboardingEmail } from '../../../../lib/leadForms';
import { checkRateLimit } from '../../../../lib/rate-limit';

export const runtime = 'nodejs';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.gobiya.com';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot check
  if (body?.company_website) {
    return NextResponse.json({ ok: true });
  }

  const id = String(body?.id || '').trim();
  const name = String(body?.name || '').trim();
  const email = String(body?.email || '').trim().toLowerCase();
  const phone = String(body?.phone || '').trim();
  const company = String(body?.company || '').trim();
  const notes = String(body?.notes || '').trim();

  if (!id || !name || !email) {
    return NextResponse.json({ error: 'Report ID, name, and email are required.' }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkRateLimit(ip, 'scan-submit-lead', 10, 24)) {
    return NextResponse.json({ error: 'Too many lead submissions. Please try again later.' }, { status: 429 });
  }

  const admin = createAdminSupabase();

  // Load audit record
  const { data: audit, error: auditErr } = await admin
    .from('ai_audits')
    .select('id, url, status, score, report_data, collector_status, submission_id')
    .eq('id', id)
    .single();

  if (auditErr || !audit) {
    return NextResponse.json({ error: 'Audit report not found.' }, { status: 404 });
  }

  // Record submission in form_submissions CRM table
  const submission = await recordFormSubmission({
    type: 'audit',
    name,
    email,
    phone,
    company,
    website: audit.url,
    payload: {
      notes,
      auditId: audit.id,
      score: audit.score,
      scannedUrl: audit.url,
    },
  });

  if (!submission.ok) {
    console.error('Failed to write site scan lead to form_submissions:', submission.error);
  }

  // Update ai_audits row with email and submission_id
  const { error: updateErr } = await admin
    .from('ai_audits')
    .update({
      email,
      submission_id: submission.ok ? submission.id : audit.submission_id,
    })
    .eq('id', id);

  if (updateErr) {
    console.error('Failed to attach email to ai_audits:', updateErr);
  }

  // Send report email to visitor + notification copy to Steve
  if (audit.status === 'complete' && audit.report_data) {
    await sendSiteScanEmails({
      to: email,
      name,
      url: audit.url,
      score: audit.score,
      report: audit.report_data,
      reportUrl: `${SITE_URL}/free-site-scan/report/${id}`,
      collectorStatus: audit.collector_status || {},
    });
  }

  // Send additional lead notification email to Steve if needed
  try {
    await sendOnboardingEmail({
      name,
      email,
      phone,
      company,
      website: audit.url,
      notes: `[Site Scan Lead - Score: ${audit.score ?? 'Pending'}/100]\nReport URL: ${SITE_URL}/free-site-scan/report/${id}\nNotes: ${notes}`,
    });
  } catch (e) {
    console.error('Failed sending onboarding email for scan lead:', e);
  }

  return NextResponse.json({ ok: true });
}
