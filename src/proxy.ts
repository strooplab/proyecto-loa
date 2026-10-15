// @/proxy.ts.
import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Optimización de proxy con verificación de cookies
export function proxy(req: NextRequest) {
  if (getSessionCookie(req)) return NextResponse.next(); // Autorizado

  // A partir de aquí, el intento de acceso al entorno de administrador retorna 401
  const { pathname } = req.nextUrl;
  const isApiAdmin = pathname.startsWith("/api/admin");

  if (isApiAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 }); // El acceso no autorizado a /api/admin rebota con error 401
  }

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("callbackUrl", pathname); // Intentar acceder a /admin sin autenticación redirecciona con params a /login
  return NextResponse.redirect(loginUrl);
}

// Rutas protegidas por el proxy
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
