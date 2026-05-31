// 📁 ឯកសារ៖ proxy.ts (ឬ middleware.ts)
import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextAuthRequest } from 'next-auth';

// 🎯 ផ្តល់ Type : NextAuthRequest ទៅឱ្យ req ជំនួស NextRequest ធម្មតា
export const proxy = auth(async function proxy(req: NextAuthRequest) {
  const { nextUrl } = req;
  const session = await req.auth; 
  const isLoggedIn = !!session;

  const isAdminRoute = nextUrl.pathname.startsWith('/admin');

  if (isAdminRoute && !isLoggedIn) {
    const loginUrl = nextUrl.clone();
    loginUrl.pathname = '/auth';
    
    const response = NextResponse.redirect(loginUrl);
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
    return response;
  }
  return NextResponse.next();
});
export const config = {
  matcher: ['/admin/:path*'],
};