import { NextResponse } from 'next/server';
import { sendOnboardingEmail } from '../../../lib/leadForms';
import { recordFormSubmission } from '../../../lib/submissions';
import { createAdminSupabase } from '../../../lib/supabase/admin';
import { normalizeUrl } from '../../../lib/scan/url.js';

export const runtime = 'nodejs';

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields. Web-only concept, stays in the route.
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  /* Order matters. The lead is recorded and Steve is notified before any scan
   * work is set up, so a scan that never runs cannot cost us the prospect.
   * Everything after the notification is best-effort. */

  const submission = await recordFormSubmission({
    type: 'audit',
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    website: data.website,
    payload: {
      industry: data.industry,
      goal: data.goal,
      challenges: data.challenges,
      budget: data.budget,
      timeline: data.timeline,
      notes: data.notes,
    },
  });

  if (!submission.ok) {
    // Already logged inside recordFormSubmission. The notification below is a
    // second record of the lead, so a CRM outage is not a lost enquiry.
    console.error('Site scan lead not recorded to CRM:', submission.error);
  }

  const result = await sendOnboardingEmail(data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  /* Only create an audit row when there is something to scan. `website` is not
   * a required field, and a blank one sends the visitor to the existing
   * thank-you page rather than a report that could never be built. */
  const normalized = normalizeUrl(data.website);
  if (!normalized.ok) {
    return NextResponse.json({ ok: true });
  }

  try {
    const admin = createAdminSupabase();
    const { data: audit, error } = await admin
      .from('ai_audits')
      .insert({
        url: normalized.url,
        email: data.email,
        status: 'pending',
        submission_id: submission.ok ? submission.id : null,
      })
      .select('id')
      .single();

    if (error) throw error;
    return NextResponse.json({ ok: true, auditId: audit.id });
  } catch (err) {
    // The lead is safe and Steve has been notified; the visitor just gets the
    // thank-you page instead of a report.
    console.error('Could not create site scan record:', err);
    return NextResponse.json({ ok: true });
  }
}
