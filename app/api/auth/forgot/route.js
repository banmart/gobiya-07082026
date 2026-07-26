import { NextResponse } from 'next/server';
import { createAdminSupabase } from '../../../../lib/supabase/admin';
import { siteUrl } from '../../../../lib/supabase/env';
import { sendRecoveryEmail } from '../../../../lib/emails/invite';

// Always returns 200 with the same body, whether or not the account exists.
// Any difference in status, wording, or timing would let someone probe which
// email addresses are registered.
//
// Timing is the difficult one. Only the existing-account path makes the extra
// Resend round trip, so an unpadded handler answers "is this address
// registered?" through response latency alone, no matter how identical the
// status and body are. Every response is therefore held to the same floor.
const MIN_RESPONSE_MS = 1200;

async function uniformResponse(startedAt) {
  const elapsed = Date.now() - startedAt;
  if (elapsed < MIN_RESPONSE_MS) {
    await new Promise((resolve) => setTimeout(resolve, MIN_RESPONSE_MS - elapsed));
  }
  return NextResponse.json({ ok: true });
}

export async function POST(request) {
  const startedAt = Date.now();

  let email;
  try {
    ({ email } = await request.json());
  } catch {
    return uniformResponse(startedAt);
  }

  if (!email || typeof email !== 'string') {
    return uniformResponse(startedAt);
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const supabase = createAdminSupabase();
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email: normalizedEmail,
    });

    if (!error && data?.properties?.hashed_token) {
      const actionLink =
        `${siteUrl()}/auth/callback` +
        `?token_hash=${encodeURIComponent(data.properties.hashed_token)}` +
        `&type=recovery&next=${encodeURIComponent('/set-password')}`;
      // Sent to the normalised address, matching the one just looked up.
      await sendRecoveryEmail({ to: normalizedEmail, actionLink });
    }
  } catch (err) {
    console.error('Password reset failed:', err);
  }

  return uniformResponse(startedAt);
}
