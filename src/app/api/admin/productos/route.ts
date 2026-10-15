// @/app/api/admin/productos/route.ts
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  return NextResponse.json({ ok: true });
}
