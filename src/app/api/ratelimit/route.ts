// @/app/api/ratelimit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  const { type } = await req.json();
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "anon";
  const { success, resetAt } = await checkRateLimit(type, ip);

  return NextResponse.json({ success, reset: resetAt });
}
