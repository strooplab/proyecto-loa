// @/components/sections/HeroSwiperClient.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";
import Link from "next/link";

export default function HeroSwiperClient() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      effect={"fade"}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      speed={500}
      className="h-200 md:h-300 w-full"
    >
      {/* Slide 1 */}
      <SwiperSlide className="relative h-full w-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/categorias/blusas/blusa-rombos-elegante/1.png`}
          alt="image 1"
          fill
          priority
          className="h-full w-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50 z-10">
          <div className="w-3/4 text-center space-y-2 md:w-2/4">
            <h1 className="text-display-xl font-display font-bold tracking-tight text-cream md:text-4xl lg:text-5xl">
              Lettre d&apos;amour
            </h1>
            <h3 className="text-blush font-medium text-heading-md">
              Vestir como mereces tambien es amor.
            </h3>
            <p className="mb-6 text-cream/80 text-body-lg">
              Apasiona e inspira a quienes amas con lo mejor de la moda.
            </p>
            <div className="flex justify-center gap-2">
              <Link
                href="/categorias"
                className="rounded-lg bg-cream px-5 py-3 font-medium text-espresso hover:bg-cream/80 transition"
              >
                Explora
              </Link>
              <Link
                href="/contacto"
                className="rounded-lg border border-cream px-5 py-3 font-medium text-cream hover:bg-cream/10 transition"
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide className="relative h-full w-full">
        <Image
          src="https://images.pexels.com/photos/29826122/pexels-photo-29826122.jpeg"
          alt="image 2"
          fill
          className="h-full w-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/50 z-10">
          <div className="w-3/4 pl-12 space-y-2 md:w-2/4 md:pl-20 lg:pl-32">
            <h1 className="text-3xl font-display tracking-tight font-bold text-cream md:text-4xl lg:text-5xl">
              A 1994 Dream
            </h1>
            <p className="mb-6 text-cream/80 text-body-lg">
              La experiencia de más de 30 años de trabajo que nos une.
            </p>
            <div className="flex gap-2">
              <Link
                href="/categorias"
                className="rounded-lg bg-cream px-5 py-3 font-medium text-espresso hover:bg-cream/80 transition"
              >
                Explora
              </Link>
              <Link
                href="/nosotros"
                className="rounded-lg border border-cream px-5 py-3 font-medium text-cream hover:bg-cream/10 transition"
              >
                Nosotros
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide className="relative h-full w-full">
        <Image
          src="https://images.pexels.com/photos/15761459/pexels-photo-15761459.jpeg"
          alt="image 3"
          fill
          className="h-full w-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 grid h-full w-full items-end bg-black/50 z-10">
          <div className="w-3/4 pl-12 pb-12 space-y-2 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
            <h1 className="text-display-xl font-display font-bold text-cream tracking-tight uppercase md:text-4xl lg:text-5xl">
              Perfeita
            </h1>
            <p className="mb-6 text-cream/80 text-body-lg">
              Diseñamos para todos, para todos los estilos en todos los colores, para cualquiera que
              se atreve a <span>soñar</span>.
            </p>
            <div className="flex gap-2">
              <Link
                href="/categorias"
                className="rounded-lg bg-cream px-5 py-3 font-medium text-espresso hover:bg-cream/80 transition"
              >
                Explora
              </Link>
              <Link
                href="/contacto"
                className="rounded-lg border border-cream px-5 py-3 font-medium text-cream hover:bg-cream/10 transition"
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
