import { NextResponse } from 'next/server';
import { createServerSupabase } from '../../../lib/supabase/server';

// POST only. A GET sign-out can be triggered by any image tag or link
// prefetch on another site.
export async function POST(request) {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL('/login', request.url), { status: 303 });
}
