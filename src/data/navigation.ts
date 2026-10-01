// @/data/navigation.ts
import getCategories from "@/services/categoryService";

export type NavItem = {
  name: string;
  href: string;
  children?: { name: string; href: string }[];
};

const staticRoutes = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Contacto", href: "/contacto" },
];

export async function getNavigation(): Promise<NavItem[]> {
  const categorias = await getCategories();

  try {
    // Hybrid navigation
    const Navigation: NavItem[] = [
      staticRoutes[0], // Inicio
      {
        name: "Categorías",
        href: "/categorias",
        children: [
          { name: "Ver todo", href: "/categorias" },
          // Mapping Categories
          ...categorias.map((cat) => ({
            name: cat.nombre,
            href: `/${cat.slug}`,
          })),
        ],
      },
      staticRoutes[1], // Nosotros
      staticRoutes[2], // Contacto
    ];
    return Navigation;
  } catch (e) {
    console.error("Error getting routes navigation: ", e);
    return [];
  }
}
