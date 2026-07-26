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

  if (!tokenHash || !type) {
    return NextResponse.redirect(`${origin}/login?error=invalid_link`);
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=expired_link`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
