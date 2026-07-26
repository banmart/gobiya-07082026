import { NextResponse } from 'next/server';
import { createAdminSupabase } from '../../../../lib/supabase/admin';
import { siteUrl } from '../../../../lib/supabase/env';
import { sendRecoveryEmail } from '../../../../lib/emails/invite';

// Always returns 200 with the same body, whether or not the account exists.
// Any difference in status, timing detail, or wording would let someone probe
// which email addresses are registered.
export async function POST(request) {
  let email;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ ok: true });
  }

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ ok: true });
  }

  try {
    const supabase = createAdminSupabase();
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email: email.trim().toLowerCase(),
    });

    if (!error && data?.properties?.hashed_token) {
      const actionLink =
        `${siteUrl()}/auth/callback` +
        `?token_hash=${encodeURIComponent(data.properties.hashed_token)}` +
        `&type=recovery&next=${encodeURIComponent('/set-password')}`;
      await sendRecoveryEmail({ to: email, actionLink });
    }
  } catch (err) {
    console.error('Password reset failed:', err);
  }

  return NextResponse.json({ ok: true });
}
