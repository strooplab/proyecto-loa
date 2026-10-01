// @/components/services/CategoriasPreview.tsx
import { getTopCategories, getProductsByCategory } from "@/services/previewProductsService";
import Preview from "@/components/sections/CategoriasPreviewClient";

export default async function CategoriasPreview() {
  // Top 5 categorias
  let categorias, productos;
  try {
    categorias = await getTopCategories(3);
    if (!categorias.length) return null;
    productos = await getProductsByCategory(categorias[0].slug, 5);
  } catch (e) {
    console.error("Error cargando preview:", e);
    return null;
  }

  return <Preview initialCategories={categorias} initialProducts={productos} />;
}
