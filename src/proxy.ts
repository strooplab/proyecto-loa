// @/proxy.ts.

import { type NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminPage = pathname.startsWith("/admin"); // Portal de administrador
  const isApiAdmin = pathname.startsWith("/api/admin");
  const isLoginPage = pathname === "/login"; // Username/Email y contraseña requerida

  // Better Auth cookie de sesión session_token
  const sessionCookie =
    req.cookies.get("better-auth.session_token") ||
    req.cookies.get("__Secure-better-auth.session_token");

  const isAuth = !!sessionCookie;

  // 1. Redirección al login si no tiene credenciales guardadas
  if ((isAdminPage || isApiAdmin) && !isAuth) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Redirección al panel admin si intenta ingresar a /login ya con credenciales
  if (isLoginPage && isAuth) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

// Rutas protegidas por el proxy
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/login"],
};
