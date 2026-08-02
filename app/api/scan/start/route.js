import { NextResponse } from 'next/server';
import { createAdminSupabase } from '../../../../lib/supabase/admin';
import { normalizeUrl } from '../../../../lib/scan/url.js';
import { checkRateLimit } from '../../../../lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const rawUrl = String(body?.url || '').trim();
  if (!rawUrl) {
    return NextResponse.json({ error: 'Please enter a website URL.' }, { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkRateLimit(ip, 'scan-start', 10, 24)) {
    return NextResponse.json(
      { error: 'You have reached the scan limit for today. Email hello@gobiya.com for a manual audit.' },
      { status: 429 }
    );
  }

  const normalized = normalizeUrl(rawUrl);
  if (!normalized.ok) {
    return NextResponse.json({ error: normalized.reason || 'Please enter a valid website URL.' }, { status: 400 });
  }

  try {
    const admin = createAdminSupabase();
    const { data: audit, error } = await admin
      .from('ai_audits')
      .insert({
        url: normalized.url,
        status: 'pending',
      })
      .select('id, url')
      .single();

    if (error || !audit) {
      console.error('Failed to insert pending site scan audit:', error);
      return NextResponse.json({ error: 'Could not initialize site scan. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, auditId: audit.id, url: audit.url });
  } catch (err) {
    console.error('Error in /api/scan/start:', err);
    return NextResponse.json({ error: 'Internal server error while starting scan.' }, { status: 500 });
  }
}
