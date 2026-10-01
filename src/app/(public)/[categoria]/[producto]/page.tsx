// @/app/(public)/[categoria]/[producto]/page.tsx

import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductSwiper from "@/components/sections/ProductSwiper";
import { getAllProducts } from "@/services/productService";
import { getColors } from "@/services/colorService";
import formatPrice from "@/utils/formatPrice";
import ProductAddSection from "@/components/sections/ProductAdd";
import { Suspense } from "react";
import { Skeleton } from "@/components/skeletons/StoreSkeleton";

interface productoPageProps {
  params: Promise<{ categoria: string; producto: string }>; // [producto] (slug)
}

export default async function ProductoPage({ params }: productoPageProps) {
  const { categoria: categoriaSlug, producto: productoSlug } = await params;
  const [productos, AllColors] = await Promise.all([getAllProducts(), getColors()]);
  const productoItem = productos.find(
    (p) => p.slug === productoSlug && p.categoria_slug === categoriaSlug,
  );
  if (!productoItem) {
    notFound();
  }

  return (
    <div className="min-h-full">
      <main className="mx-auto pt-18">
        <section className="mx-auto max-w-2xl px-6 lg:px-12 mt-6 lg:max-w-7xl">
          <div className="mb-4">
            <Breadcrumb />
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12 mb-12">
            <ProductSwiper images={productoItem.imagenes} productoName={productoItem.nombre} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-espresso">
                {productoItem.nombre}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Información del producto</h2>
                <p className="text-3xl tracking-tight text-espresso font-semibold">
                  {formatPrice(productoItem.precio)}
                </p>
              </div>

              <Suspense fallback={<Skeleton className="px-6 py-4" />}>
                <ProductAddSection productoItem={productoItem} allColors={AllColors} />
              </Suspense>

              {/* Descripción y detalles */}
              <div className="mt-10 border-t border-espresso/10 pt-10">
                <h3 className="text-sm font-medium text-espresso">Descripción</h3>
                <div className="mt-4 space-y-6 text-sm text-espresso/80 leading-relaxed">
                  <p>{productoItem.descripcion}</p>
                </div>
              </div>

              <div className="mt-8 border-t border-espresso/10 pt-8">
                <h3 className="text-sm font-medium text-espresso">Detalles</h3>
                <div className="mt-4 space-y-4 text-sm text-espresso/70">
                  <p>{productoItem.detalles}</p>
                </div>
              </div>
            </div>{" "}
          </div>
        </section>
      </main>
    </div>
  );
}
