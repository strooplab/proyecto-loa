import { NextResponse } from "next/server";
import { getProductsByCategory } from "@/services/previewProductsService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoriaSlug = searchParams.get("categoria");

  if (!categoriaSlug) {
    return NextResponse.json({ error: "Categoria requerida" }, { status: 400 });
  }

  const productos = await getProductsByCategory(categoriaSlug, 5);
  return NextResponse.json(productos);
}
