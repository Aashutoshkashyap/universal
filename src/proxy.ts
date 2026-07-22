import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect /admin routes (except /admin/login)
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const expectedToken = await sha256(adminPassword);
    const token = request.cookies.get('admin_token')?.value;

    if (token !== expectedToken) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
