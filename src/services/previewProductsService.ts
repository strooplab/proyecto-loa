// @/services/previewProductsService.ts
import { query } from "@/lib/db";
import { cacheLife } from "next/cache";
import type { Producto } from "@/types/product";
import type Categoria from "@/types/category";

export type CategoriaPreview = Pick<Categoria, "id" | "nombre" | "slug">;

/**
 * Primeras tres categorías para visualizador rápido del landing page
 */
export async function getTopCategories(limit: number = 3): Promise<CategoriaPreview[]> {
  "use cache";
  cacheLife("hours");
  return query<CategoriaPreview>(
    `SELECT id, nombre, slug
     FROM categorias
     WHERE activo = true
     ORDER BY orden ASC
     LIMIT $1`,
    [limit],
  );
}

/**
 * Contiene 5 productos destacados o en su defecto los últimos 5 productos
 * agregados de la categoría.
 */
export async function getProductsByCategory(slug: string, limit: number = 5): Promise<Producto[]> {
  "use cache";
  cacheLife("hours");
  return query<Producto>(
    `SELECT
        p.id, p.categoria_id, p.nombre, p.slug, p.descripcion,
        p.precio::float AS precio, p.descuento::float AS descuento,
        p.stock, p.imagenes, p.destacado,
        cat.slug AS categoria_slug,
        COALESCE(
          jsonb_agg(DISTINCT jsonb_build_object('nombre', c.nombre, 'slug', c.slug, 'hex', c.hex))
            FILTER (WHERE c.id IS NOT NULL), '[]'::jsonb
        ) AS colores,
        COALESCE(
          jsonb_agg(DISTINCT jsonb_build_object('nombre', t.nombre, 'orden', t.orden))
            FILTER (WHERE t.id IS NOT NULL), '[]'::jsonb
        ) AS tallas
     FROM productos p
     INNER JOIN categorias cat ON p.categoria_id = cat.id
     LEFT JOIN producto_colores pc ON p.id = pc.producto_id
     LEFT JOIN colores c ON pc.color_id = c.id
     LEFT JOIN producto_tallas pt ON p.id = pt.producto_id
     LEFT JOIN tallas t ON pt.tallas_id = t.id
     WHERE cat.slug = $1 AND p.visible = true
     GROUP BY p.id, cat.slug
     ORDER BY p.destacado DESC, p.creado_en DESC
     LIMIT $2`,
    [slug, limit],
  );
}
