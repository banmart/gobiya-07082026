import { NextResponse } from 'next/server';
import { processDripQueue, sendTestDripEmail } from '../../../../lib/drip';

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, sequenceId, testEmail, sequenceTitle } = body;

    if (action === 'send_test') {
      if (!testEmail) {
        return NextResponse.json({ ok: false, error: 'Recipient email required for test.' }, { status: 400 });
      }
      const testRes = await sendTestDripEmail(testEmail, sequenceTitle);
      return NextResponse.json(testRes);
    }

    const result = await processDripQueue({ sequenceId });
    return NextResponse.json(result);
  } catch (err) {
    console.error('Drip API error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
