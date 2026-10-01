// @/components/sections/CategoriasPreviewClient.tsx
"use client";

import { useState, useTransition } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Button } from "@headlessui/react";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { Producto } from "@/types/product";
import type { CategoriaPreview } from "@/services/previewProductsService";

interface CategoriesClientProps {
  initialCategories: CategoriaPreview[];
  initialProducts: Producto[];
}

export default function Preview({ initialCategories, initialProducts }: CategoriesClientProps) {
  const [activeTab, setActiveTab] = useState<string>(initialCategories[0]?.slug || "");
  const [productos, setProductos] = useState<Producto[]>(initialProducts);
  const [, startTransition] = useTransition();

  const handleTabChange = async (slug: string) => {
    setActiveTab(slug);
    startTransition(async () => {
      try {
        const res = await fetch(`/api/public/productos/preview?categoria=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProductos(data);
        }
      } catch (e) {
        console.error("Error fetching products: ", e);
      }
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-espresso/20 pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        {/* Navegación de categorías */}
        <nav className="flex space-x-6 overflow-x-auto w-full sm:w-auto hide-scrollbar order-2 sm:order-1">
          {initialCategories.map((cat) => (
            <Button
              key={cat.id}
              onClick={() => handleTabChange(cat.slug)}
              className={`font-display text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
                activeTab === cat.slug
                  ? "border-b-2 border-espresso text-espresso pb-2"
                  : "font-normal text-espresso/60 hover:text-espresso pb-2 transition-all ease-in-out duration-200"
              }`}
            >
              {cat.nombre}
            </Button>
          ))}
        </nav>

        {/* Enlace Ver Todo  */}
        <Link
          href="/categorias"
          className="font-sans text-xs font-bold uppercase tracking-widest text-espresso hover:underline order-1 sm:order-2 self-start sm:self-auto"
        >
          Ver todo &rarr;
        </Link>
      </div>

      {/* Carrusel de productos */}
      <div className="relative group/swiper">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={1.2} // Vista Móvil
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 4, spaceBetween: 24 }, // Vista Desktop
          }}
          className="w-full pb-4"
        >
          {productos.map((producto) => (
            <SwiperSlide key={producto.id}>
              <ProductCard producto={producto} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
