import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  if (token) {
    try {
      const payload = parseJwt(token);

      if (Date.now() >= payload.exp * 1000) {
        return handleTokenError(request, pathname);
      }

      if (pathname === '/login') {
        return NextResponse.redirect(new URL('/products', request.url));
      }
    } catch (error) {
      return handleTokenError(request, pathname);
    }
  } else if (pathname.startsWith('/products') || pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname === '/' && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

function handleTokenError(request: NextRequest, pathname: string) {
  if (pathname.startsWith('/products') || pathname.startsWith('/dashboard')) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.set('token', '', { path: '/', expires: new Date(0) });
    return response;
  }

  return NextResponse.next();
}

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    throw new Error('Failed to parse token');
  }
}

export const config = {
  matcher: ['/', '/products/:path*', '/dashboard/:path*', '/login'],
};