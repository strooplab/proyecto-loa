// @/actions/verificarMensajeDirecto.ts
"use server";
import { headers } from "next/headers";
import { isIP } from "node:net";
import { checkRateLimit } from "@/lib/ratelimit";

export async function verificarMensaje() {
  const h = await headers();
  const raw = h.get("x-forwarded-for")?.split(",")[0].trim() ?? "";
  const ip = isIP(raw) ? raw : "sin-ip";

  const rl = await checkRateLimit("direct", ip);
  if (!rl.success) {
    return { ok: false as const, retryAt: rl.resetAt as number };
  }
  return { ok: true as const };
}
