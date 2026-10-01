// utils/filters.ts
import { getColors } from "@/services/colorService";
import { ColorItem } from "@/types/product";

export type FilterItem = {
  label: string;
  value: string;
  children?: ColorItem[];
};

const staticFilters = [
  { label: "Destacados", value: "destacados" },
  { label: "Novedades", value: "novedades" },
  { label: "Menor Precio", value: "precio-asc" },
  { label: "Mayor Precio", value: "precio-desc" },
];

export async function getFilters(): Promise<FilterItem[]> {
  const colors = await getColors();

  try {
    const Filters: FilterItem[] = [
      staticFilters[0], // Destacados
      staticFilters[1], // Novedades
      staticFilters[2], // Menor Precio
      staticFilters[3], // Mayor Precio
      {
        label: "Color",
        value: "color",
        children: [
          { nombre: "Todos los colores", slug: "", hex: "" },
          // Mapping Categories
          ...colors.map((c) => ({
            nombre: c.nombre,
            slug: c.slug,
            hex: c.hex,
          })),
        ],
      },
    ];
    return Filters;
  } catch (e) {
    console.error("Error getting filters: ", e);
    return [];
  }
}

// Función auxiliar para obtener el hex dado un slug
export async function getColorHex(slug: string): Promise<string> {
  const colors = await getColors();
  const found = colors.find((c) => c.slug === slug);
  return found ? found.hex : "#CCCCCC"; // DEFAULT COLOR
}
