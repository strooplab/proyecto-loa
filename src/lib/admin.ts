// src/lib/admin.ts
import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// Capa extra: acceso no permitido a usuarios con emails o cookies no autorizadas,
// en caso de fallar el middleware o el bloqueo de sign-up
export async function getAdminSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  const allowed = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (!session || !allowed.includes(session.user.email.toLowerCase())) return null;
  return session;
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/login");
  return session;
}
