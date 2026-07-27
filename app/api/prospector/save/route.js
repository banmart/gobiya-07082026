import { NextResponse } from 'next/server';
import { saveProspects } from '@/lib/prospector';
import { enrollProspectsInSequence } from '@/lib/drip';

export async function POST(request) {
  try {
    const body = await request.json();
    const { prospects, clientId } = body;

    if (!Array.isArray(prospects) || prospects.length === 0) {
      return NextResponse.json({ ok: false, error: 'No prospects provided to save.' }, { status: 400 });
    }

    // 1. Save prospects to database
    const saveRes = await saveProspects(prospects, clientId || null);
    if (!saveRes.ok) {
      return NextResponse.json(saveRes, { status: 500 });
    }

    // 2. Automatically enroll all saved prospects into the main cold email drip sequence (seq-prospector-drip)
    let enrolledCount = 0;
    if (Array.isArray(saveRes.prospectIds) && saveRes.prospectIds.length > 0) {
      const enrollRes = await enrollProspectsInSequence('seq-prospector-drip', saveRes.prospectIds);
      enrolledCount = enrollRes.count || saveRes.prospectIds.length;
    }

    return NextResponse.json({
      ok: true,
      savedCount: saveRes.count || prospects.length,
      enrolledCount,
      message: `Successfully saved ${saveRes.count} real prospects to database and automatically enrolled them in the Q3 Growth Bundle email drip campaign!`,
    });
  } catch (err) {
    console.error('Save prospects API error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
