import { auth } from '@/auth';

export default auth((req) => {
  if (!req.auth) {
    return Response.redirect(
      new URL('/auth', req.url)
    );
  }
});

export const config = {
  matcher: ['/admin/:path*'],
};