// @/services/clientProductService.ts
"use server";

import { query } from "@/lib/db";
import { Producto } from "@/types/product";

// Sin cache de almacenamiento
export async function searchProducts(searchTerm: string = ""): Promise<Producto[]> {
  const Search = searchTerm.trim();

  // Si no hay texto de búsqueda, retornamos vacío de inmediato
  if (!Search) {
    return [];
  }
  try {
    const productos = await query<Producto>(
      `SELECT
      p.id, p.categoria_id, p.nombre, p.slug, p.descripcion, p.detalles, p.precio, 
      p.descuento, p.stock, p.imagenes, p.dimensiones, p.destacado,
      cat.slug AS categoria_slug,
      COALESCE(
        json_agg(jsonb_build_object('nombre', c.nombre, 'slug', c.slug, 'hex', c.hex))
        FILTER (WHERE c.id IS NOT NULL), '[]'
      ) AS colores, 
      COALESCE( 
        array_agg(DISTINCT t.nombre)
        FILTER (WHERE t.id IS NOT NULL), '{}'
      ) AS tallas 
      FROM productos p 
      INNER JOIN categorias cat ON p.categoria_id = cat.id
      LEFT JOIN producto_colores pc ON p.id = pc.producto_id
      LEFT JOIN colores c ON pc.color_id = c.id 
      LEFT JOIN producto_tallas pt ON p.id = pt.producto_id
      LEFT JOIN tallas t ON pt.tallas_id = t.id
      WHERE p.visible = true AND (p.nombre ILIKE $1 OR $1 = '')
      GROUP BY p.id, cat.slug
      ORDER BY p.destacado DESC, p.creado_en DESC
      LIMIT 20`,
      [`%${Search}%`],
    );
    return productos;
  } catch (e) {
    console.error(`Error searching products:`, e);
    return [];
  }
}
