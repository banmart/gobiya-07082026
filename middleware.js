import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

// Refreshes the Supabase session cookie on every app request, and turns away
// anonymous visitors before a protected layout renders.
//
// The matcher deliberately excludes every marketing route. Matching them would
// opt them into dynamic rendering and undo the static-render work described in
// components/ChromeGate.js.
export async function middleware(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    }
  );

  // Do not remove: this call is what refreshes an expiring token and writes
  // the rotated cookie onto the response.
  //
  // getUser() normally reports failures through `error` rather than throwing,
  // and a null user already fails closed below. The try/catch is for the
  // unexpected throw — a malformed cookie, a client-internal error — which in
  // middleware becomes a 500 on every matched route, including /auth/*. That
  // would lock a user out of the invite and password-reset links precisely
  // when something is already wrong. Treat a throw as "no user": protected
  // routes still redirect, and /auth/* stays reachable.
  let user = null;
  try {
    const result = await supabase.auth.getUser();
    user = result.data?.user ?? null;
  } catch (err) {
    console.error('Middleware session refresh failed:', err?.message ?? err);
  }

  const { pathname } = request.nextUrl;
  const isProtected = pathname.startsWith('/dashboard') || pathname.startsWith('/admin');

  // /auth/* is intentionally NOT protected. A user clicking an invite or
  // password-reset link has no session yet; bouncing them to /login would make
  // it impossible to ever set a password.
  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.search = `?next=${encodeURIComponent(pathname)}`;
    const redirectResponse = NextResponse.redirect(loginUrl);
    // Carry over any refreshed cookies, or the next request re-refreshes.
    for (const cookie of response.cookies.getAll()) {
      redirectResponse.cookies.set(cookie);
    }
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/auth/:path*'],
};
