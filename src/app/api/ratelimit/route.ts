// @/app/api/ratelimit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  const { type } = await req.json();
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "anon";
  const { success, resetAt } = await checkRateLimit(type, ip);
  // Forzar la inclusión del tipo correcto por parte del form de contacto y el botón absoluto de wsapp
  if (!["contact", "direct"].includes(type)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  return NextResponse.json({ success, reset: resetAt });
}
