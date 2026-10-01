// @/components/sections/CategoriesSlider.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Categoria from "@/types/category";

interface CategoriesSliderProps {
  categorias: Categoria[];
}

export default function CategoriesSlider({ categorias }: CategoriesSliderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchString = searchParams.toString();
  const queryString = searchString ? `?${searchString}` : "";

  return (
    <div className="w-full lg:py-4 overflow-hidden">
      <div className="pl-4 sm:pl-6 lg:pl-36 max-w-360 mx-auto">
        <Swiper
          modules={[FreeMode, Mousewheel]}
          freeMode={{
            enabled: true,
            sticky: false,
            momentumBounce: true,
          }}
          mousewheel={{ forceToAxis: true }}
          slidesPerView="auto"
          spaceBetween={12}
          scrollbar={false}
          slidesOffsetAfter={24}
          className="w-full pb-3 pr-4 cursor-grab active:cursor-grabbing"
        >
          {categorias.map((cat) => {
            const formatURLCat = `/${cat.slug}`;
            // Para conservar los filtros incluso habiendo cambiado de categoria
            const conserveFiltersURL = `${formatURLCat}${queryString}`;
            const isActive = pathname === formatURLCat;
            return (
              <SwiperSlide key={cat.slug} className="w-auto!">
                <Link
                  href={conserveFiltersURL}
                  scroll={false}
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-full text-label md:text-sm font-sans uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-espresso text-cream font-semibold shadow-md"
                      : "bg-espresso/5 text-espresso hover:bg-espresso/10"
                  }`}
                >
                  {cat.nombre}
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
