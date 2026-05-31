// 📁 ឯកសារ៖ proxy.ts (ឬ middleware.ts)
import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextAuthRequest } from 'next-auth';
const protectedRoutes = ['/admin', '/admin/dashboard', '/admin/projects', '/admin/messages'];
const publicRoutes = ['/auth', '/']; // ទំព័រលកអ៊ីន និងទំព័រដើម (Home)

export const proxy = auth(async function proxy(req: NextAuthRequest) {
  const { nextUrl } = req;
  const session = await req.auth; 
  const isLoggedIn = !!session;
  const path = nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  // 🔐 ករណីទី ១៖ បើជាផ្លូវការពារ (Protected) តែអត់ទាន់លកអ៊ីនទេ -> ដេញទៅ /auth ភ្លាម
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = nextUrl.clone();
    loginUrl.pathname = '/auth';
    
    const response = NextResponse.redirect(loginUrl);
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
    return response;
  }
  if (isPublicRoute && isLoggedIn && path === '/auth') {
    const adminUrl = nextUrl.clone();
    adminUrl.pathname = '/admin/dashboard'; 
    return NextResponse.redirect(adminUrl);
  }
  return NextResponse.next();
});
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};