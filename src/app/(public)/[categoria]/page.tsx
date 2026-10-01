// @/app/(public)/[categoria]/page.tsx

import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import getCategories from "@/services/categoryService";
import { getAllProducts } from "@/services/productService";
import { getFilters } from "@/utils/filters";
import CategoriesSlider from "@/components/sections/CategoriesSlider";
import CategoryFilters from "@/components/sections/CategoryFilters";
import formatPrice from "@/utils/formatPrice";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/skeletons/StoreSkeleton";

interface categoriasPageProps {
  params: Promise<{ categoria: string }>; // [categoria] (slug)
  searchParams: Promise<{ sort?: string; color?: string }>;
}

async function getCategoriasInfo(categoria: string) {
  const categorias = await getCategories();
  // Buscar ruta exacta [categoria]
  return categorias?.find((cat) => cat.slug === categoria); // Si el objeto es null, activa not-found
}

export default async function CategoriaPage({ params, searchParams }: categoriasPageProps) {
  const { categoria: categoriaSlug } = await params;
  const { sort = "destacados", color } = await searchParams;
  const categoriaInfo = await getCategoriasInfo(categoriaSlug);

  if (!categoriaInfo) {
    notFound(); // not-found.tsx
  }
  const [allCategories, productosItem, AllFilters] = await Promise.all([
    getCategories(),
    getAllProducts(),
    getFilters(), // Filtros con los colores
  ]);
  let productos = productosItem.filter((p) => p.categoria_slug === categoriaSlug);

  // Filtro por color
  if (color) {
    const colorBusqueda = color.toLowerCase();
    productos = productos.filter((p) => {
      if (!p.colores || !Array.isArray(p.colores)) return false;

      return p.colores.some(
        (c) =>
          c.nombre.toLowerCase().includes(colorBusqueda) ||
          c.slug.toLowerCase().includes(colorBusqueda),
      );
    });
  }

  // Filtro por orden
  if (sort === "novedades") {
    productos.sort(
      (a, b) => new Date(b.creado_en ?? 0).getTime() - new Date(a.creado_en ?? 0).getTime(),
    );
  } else if (sort === "precio-asc") {
    productos.sort((a, b) => a.precio - b.precio);
  } else if (sort === "precio-desc") {
    productos.sort((a, b) => b.precio - a.precio);
  } else {
    // "destacados"
    productos.sort((a, b) => Number(b.destacado) - Number(a.destacado));
  }

  return (
    <div className="min-h-full">
      <main className="mx-auto mb-16">
        <section className="w-full">
          <div className="h-64 md:h-80 lg:h-96 w-full bg-espresso relative flex items-center">
            <div className="absolute inset-0">
              <Image
                src="https://pub-415cf98523294c368075ea9561ec3752.r2.dev/Development/src/Banner1.jpg"
                alt={categoriaInfo.nombre}
                width={1920}
                height={400}
                loading="eager"
                priority
                className="h-full w-full object-cover bg-espresso/10 opacity-40"
              />
            </div>

            <div className="absolute inset-0 flex items-center px-6 sm:px-12 lg:px-16 z-10">
              <div className="flex flex-col items-start max-w-6xl w-full mx-auto">
                <div className="mb-1">
                  <Suspense fallback={<Skeleton className="px-6 py-4" />}>
                    <Breadcrumb />
                  </Suspense>
                </div>

                <h1 className="text-4xl md:text-6xl font-sans font-semibold tracking-tight text-cream uppercase">
                  {categoriaInfo.nombre}
                </h1>
                <p className="text-cream/80 text-sm md:text-base mt-2">
                  Explora nuestra selección exclusiva de {categoriaInfo.nombre.toLowerCase()}.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-6">
          <Suspense
            fallback={<div className="h-12 w-full animate-pulse bg-espresso/5 rounded-full" />}
          >
            <CategoriesSlider categorias={allCategories} />
          </Suspense>
          <div className="mx-auto max-w-2xl md:max-w-7xl px-6 lg:px-12 mt-4">
            <Suspense fallback={<Skeleton className="px-32 py-4" />}>
              <CategoryFilters filters={AllFilters} />
            </Suspense>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
          {productos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h2 className="text-espresso/80 text-heading-lg">Sin productos en esta categoría</h2>
              <p className="text-espresso/60 text-body-sm">
                Actualmente no tenemos productos asociados a esta categoria disponibles
              </p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {productos.map((p) => {
                const productHref = `/${categoriaInfo.slug}/${p.slug}`
                  .toLowerCase()
                  .replace(/\/+/g, "/");
                return (
                  <Link
                    key={p.id}
                    href={productHref}
                    className="group relative p-6 border border-espresso/10 rounded-md shadow-xl shadow-black/10 transform transition duration-300 
		            hover:scale-102 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <Image
                      alt={p.slug}
                      src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${p.imagenes[0]}`} // Imagen display
                      width={500}
                      height={500}
                      className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80 transition duration-300"
                    />
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">{p.nombre}</h3>
                        <div className="mt-1 flex items-center gap-1.5">
                          {Array.isArray(p.colores) ? (
                            p.colores.map((col, idx) => (
                              <span key={idx} className="text-xs text-gray-500">
                                {col.nombre}
                                {idx < p.colores.length - 1 ? " • " : ""}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-gray-500">{p.colores}</span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{formatPrice(p.precio)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
