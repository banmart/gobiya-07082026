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
// status and body are.
//
// A floor alone is not enough: padding fast responses up still leaves a slow
// send poking out above the floor, and that tail is the same oracle. So the
// response time is fixed at the budget from BOTH sides — the work is raced
// against the deadline, and a fast result is padded up to it. Every response
// takes the same time whether the account exists or not.
//
// The trade-off: a Resend call slower than the budget stops being awaited. The
// send has already been issued and normally still completes, but on a serverless
// host it can be cut short when the response returns. Raise the budget if the
// provider's tail latency ever grows.
const RESPONSE_BUDGET_MS = 1500;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request) {
  const startedAt = Date.now();

  // Every failure is swallowed inside here. The caller below cares only that
  // this settles or the deadline passes, never about the outcome.
  const work = (async () => {
    let email;
    try {
      ({ email } = await request.json());
    } catch {
      return;
    }

    if (!email || typeof email !== 'string') return;

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
  })();

  // Ceiling, then floor.
  await Promise.race([work, sleep(RESPONSE_BUDGET_MS)]);
  const elapsed = Date.now() - startedAt;
  if (elapsed < RESPONSE_BUDGET_MS) await sleep(RESPONSE_BUDGET_MS - elapsed);

  return NextResponse.json({ ok: true });
}
