import { NextResponse } from 'next/server';
import { saveProspects } from '@/lib/prospector';
import { enrollProspectsInSequence, getActiveDripSequence } from '@/lib/drip';

export async function POST(request) {
  try {
    const body = await request.json();
    const { prospects, clientId } = body;

    if (!Array.isArray(prospects) || prospects.length === 0) {
      return NextResponse.json({ ok: false, error: 'No prospects provided to save.' }, { status: 400 });
    }

    // 1. Save and deduplicate prospects by email address
    const saveRes = await saveProspects(prospects, clientId || null);
    if (!saveRes.ok) {
      return NextResponse.json(saveRes, { status: 500 });
    }

    // 2. Automatically enroll all unique prospects into the active cold email drip sequence
    let enrolledCount = 0;
    let enrollError = null;
    if (Array.isArray(saveRes.prospectIds) && saveRes.prospectIds.length > 0) {
      const activeSeq = await getActiveDripSequence();
      if (activeSeq && activeSeq.id) {
        const enrollRes = await enrollProspectsInSequence(activeSeq.id, saveRes.prospectIds);
        if (enrollRes.ok) {
          enrolledCount = enrollRes.count || saveRes.prospectIds.length;
        } else {
          enrollError = enrollRes.error;
        }
      } else {
        enrollError = 'No active drip sequence found to enroll into.';
      }
    }

    const warning = enrollError ? ` (Enrollment issue: ${enrollError})` : '';
    const message = saveRes.count > 0
      ? `Successfully saved ${saveRes.count} new unique prospects and enrolled ${enrolledCount} in the Custom AI CRM email drip campaign!${warning}`
      : `Enrolled ${enrolledCount} prospects into the Custom AI CRM email drip campaign (all emails already existed in database without duplicates).${warning}`;

    return NextResponse.json({
      ok: true,
      newlySavedCount: saveRes.count,
      totalCount: saveRes.totalAssociatedCount,
      enrolledCount,
      enrollError,
      message,
    });
  } catch (err) {
    console.error('Save prospects API error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
