// @/services/colorService.ts

import { query } from "@/lib/db";
import { cacheLife } from "next/cache";
import { ColorItem } from "@/types/product";

export async function getColors(): Promise<ColorItem[]> {
  "use cache";
  cacheLife("hours");
  try {
    const colores = query<ColorItem>(
      `SELECT id, nombre, slug, hex FROM colores ORDER BY nombre ASC`,
    );
    return colores;
  } catch (e) {
    console.error(`Error fetching colors: `, e);
    return [];
  }
}
