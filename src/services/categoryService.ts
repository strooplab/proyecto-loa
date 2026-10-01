// @/services/categoryService.ts
import { query } from "@/lib/db";
import Categoria from "@/types/category";
import { cacheLife } from "next/cache";

export default async function getCategories(): Promise<Categoria[]> {
  "use cache";
  cacheLife("hours");
  const categorias = await query<Categoria>(
    `SELECT c.id, c.nombre, c.slug, c.descripcion,
    COUNT(DISTINCT p.id) AS items
    FROM categorias c
    LEFT JOIN productos p ON c.id = p.categoria_id AND p.visible = true
    WHERE c.activo = true
    GROUP BY c.id, c.nombre, c.slug, c.descripcion
    ORDER BY c.orden ASC`,
  );
  return categorias;
}
