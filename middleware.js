import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isLpRoute = pathname === '/lp' || pathname.startsWith('/lp/');

  if (!isLpRoute) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-minimal-chrome', '1');

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ['/lp', '/lp/:path*'],
};
