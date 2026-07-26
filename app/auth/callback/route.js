import { NextResponse } from 'next/server';
import { createServerSupabase } from '../../../lib/supabase/server';
import { safeNextPath } from '../../../lib/safeNext';

// Invite and password-reset links land here. We email links built around a
// token_hash rather than using Supabase's own delivery, so this route verifies
// the OTP server-side and sets the session cookie. That avoids the URL-fragment
// handling an implicit-flow callback would need.
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = safeNextPath(searchParams.get('next'));

  // Allowlisted rather than passed through. Supabase rejects unknown types
  // server-side anyway, but an allowlist keeps an attacker from probing the
  // OTP surface through our own route.
  const ALLOWED_TYPES = ['invite', 'recovery', 'signup', 'email', 'magiclink', 'email_change'];

  if (!tokenHash || !type || !ALLOWED_TYPES.includes(type)) {
    return NextResponse.redirect(`${origin}/login?error=invalid_link`);
  }

  const supabase = await createServerSupabase();

  // verifyOtp re-throws non-AuthError exceptions — a network failure here
  // would be an unhandled 500 instead of the designed redirect, breaking the
  // invite flow at the exact moment something is already wrong.
  let error;
  try {
    ({ error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash }));
  } catch (err) {
    console.error('verifyOtp failed:', err);
    return NextResponse.redirect(`${origin}/login?error=expired_link`);
  }

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=expired_link`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
