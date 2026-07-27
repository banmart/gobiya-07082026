import { NextResponse } from 'next/server';
import { saveProspects } from '@/lib/prospector';
import { enrollProspectsInSequence } from '@/lib/drip';

export async function POST(request) {
  try {
    const body = await request.json();
    const { prospects, clientId } = body;

    if (!Array.isArray(prospects) || prospects.length === 0) {
      return NextResponse.json({ ok: false, error: 'No prospects provided.' }, { status: 400 });
    }

    const saveRes = await saveProspects(prospects, clientId || null);
    if (!saveRes.ok) {
      return NextResponse.json(saveRes, { status: 500 });
    }

    try {
      const prospectEmails = prospects.map((p) => p.email).filter(Boolean);
      const { createAdminSupabase } = await import('@/lib/supabase/admin.js');
      const admin = createAdminSupabase();
      const { data: dbRows } = await admin.from('prospects').select('id').in('email', prospectEmails);

      if (dbRows && dbRows.length > 0) {
        const pIds = dbRows.map((r) => r.id);
        await enrollProspectsInSequence('seq-prospector-drip', pIds);
      }
    } catch (enrollErr) {
      console.warn('Auto enrollment warning:', enrollErr);
    }

    return NextResponse.json({ ok: true, savedCount: saveRes.count || prospects.length });
  } catch (err) {
    console.error('Save prospects API error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
