// @/services/productService.ts
import { cacheLife } from "next/cache";
import { query } from "@/lib/db";
import { Producto } from "@/types/product";

export async function getAllProducts(): Promise<Producto[]> {
  "use cache";
  cacheLife("hours");
  try {
    const productos = await query<Producto>(
      `SELECT
      p.id, p.categoria_id, p.nombre, p.slug, p.descripcion, p.detalles, p.precio, 
      p.descuento, p.stock, p.imagenes, p.dimensiones, p.destacado, p.creado_en,
      cat.slug AS categoria_slug,
      COALESCE(
        json_agg(DISTINCT jsonb_build_object('nombre', c.nombre, 'slug', c.slug, 'hex', c.hex))
        FILTER (WHERE c.id IS NOT NULL), '[]'
      ) AS colores, 
      COALESCE( 
        json_agg(DISTINCT jsonb_build_object('nombre', t.nombre, 'orden', t.orden))
        FILTER (WHERE t.id IS NOT NULL), '[]'
      ) AS tallas
      FROM productos p 
      INNER JOIN categorias cat ON p.categoria_id = cat.id
      LEFT JOIN producto_colores pc ON p.id = pc.producto_id
      LEFT JOIN colores c ON pc.color_id = c.id 
      LEFT JOIN producto_tallas pt ON p.id = pt.producto_id
      LEFT JOIN tallas t ON pt.tallas_id = t.id
      WHERE p.visible = true
      GROUP BY p.id, cat.slug
      ORDER BY p.destacado DESC, p.creado_en DESC`,
    );
    return productos;
  } catch (e) {
    console.error(`Error fetching products:`, e);
    return [];
  }
}

export async function getProductsBySlug(slug: string): Promise<Producto[]> {
  "use cache";
  cacheLife("hours");
  try {
    const productos = await query<Producto>(
      `SELECT
      p.id, p.categoria_id, p.nombre, p.slug, p.descripcion, p.detalles, p.precio, 
      p.descuento, p.stock, p.imagenes, p.dimensiones, p.destacado,
      cat.slug AS categoria_slug,
      COALESCE(
        json_agg(DISTINCT jsonb_build_object('nombre', c.nombre, 'slug', c.slug, 'hex', c.hex))
        FILTER (WHERE c.id IS NOT NULL), '[]'
      ) AS colores, 
      COALESCE( 
        json_agg(DISTINCT jsonb_build_object(t.nombre, t.orden))
        FILTER (WHERE t.id IS NOT NULL), '[]'
      ) AS tallas
      FROM productos p 
      INNER JOIN categorias cat ON p.categoria_id = cat.id
      LEFT JOIN producto_colores pc ON p.id = pc.producto_id
      LEFT JOIN colores c ON pc.color_id = c.id 
      LEFT JOIN producto_tallas pt ON p.id = pt.producto_id
      LEFT JOIN tallas t ON pt.tallas_id = t.id
      WHERE cat.slug = $1 AND p.visible = true
      GROUP BY p.id, cat.slug
      ORDER BY p.destacado DESC, p.creado_en DESC`,
      [slug],
    );
    return productos;
  } catch (e) {
    console.error(`Error fetching products:`, e);
    return [];
  }
}
