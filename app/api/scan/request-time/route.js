import { NextResponse } from 'next/server';
import { createAdminSupabase } from '../../../../lib/supabase/admin';
import { checkRateLimit } from '../../../../lib/rate-limit';

export const runtime = 'nodejs';

import { resend } from '../../../../lib/resend';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const id = String(body?.id || '');
  const preferredTime = String(body?.preferredTime || '').slice(0, 400);
  const note = String(body?.note || '').slice(0, 2000);

  if (!id || !preferredTime.trim()) {
    return NextResponse.json({ error: 'A preferred time is required.' }, { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkRateLimit(ip, 'scan-request-time', 5, 24)) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  const admin = createAdminSupabase();

  const { data: audit } = await admin
    .from('ai_audits')
    .select('id, url, email, score, submission_id')
    .eq('id', id)
    .single();

  if (!audit) {
    return NextResponse.json({ error: 'Report not found.' }, { status: 404 });
  }

  /* Merge into the existing lead rather than inserting a new row. This person
   * already submitted the form — they are one lead who has now asked for a
   * call, and splitting that into two CRM records makes the pipeline lie. */
  let name = '';
  if (audit.submission_id) {
    const { data: submission } = await admin
      .from('form_submissions')
      .select('name, payload')
      .eq('id', audit.submission_id)
      .single();

    if (submission) {
      name = submission.name || '';
      const { error } = await admin
        .from('form_submissions')
        .update({
          payload: { ...(submission.payload || {}), requestedTime: preferredTime, callNote: note },
        })
        .eq('id', audit.submission_id);
      if (error) console.error('Could not attach requested time to lead:', error);
    }
  }

  try {
    const { error } = await resend.emails.send({
      from: process.env.SITE_SCAN_FROM_EMAIL
        || process.env.ONBOARDING_FROM_EMAIL
        || 'Gobiya Site Scan <onboarding@gobiya.com>',
      to: process.env.ONBOARDING_NOTIFY_EMAIL || 'banmart@gmail.com',
      replyTo: audit.email || undefined,
      subject: `Call requested — ${name || audit.email || audit.url}`,
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:640px;margin:0 auto;">
          <h1 style="font-size:18px;font-weight:600;color:#0B1E36;">Call requested from a site scan report</h1>
          <p style="font-size:14px;color:#334155;"><strong>Site:</strong> ${escapeHtml(audit.url)}</p>
          <p style="font-size:14px;color:#334155;"><strong>Score:</strong> ${escapeHtml(audit.score ?? '—')}/100</p>
          <p style="font-size:14px;color:#334155;"><strong>Contact:</strong> ${escapeHtml(name)} ${escapeHtml(audit.email || '')}</p>
          <p style="font-size:14px;color:#334155;"><strong>Preferred time:</strong> ${escapeHtml(preferredTime)}</p>
          ${note ? `<p style="font-size:14px;color:#334155;"><strong>Note:</strong> ${escapeHtml(note).replace(/\n/g, '<br />')}</p>` : ''}
        </div>`,
    });
    if (error) throw error;
  } catch (err) {
    console.error('Call request email failed:', err);
    return NextResponse.json({ error: 'Could not send that request.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
