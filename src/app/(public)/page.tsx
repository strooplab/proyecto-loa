import { Suspense } from "react";
import Image from "next/image";
import CategoriasPreview from "@/components/services/CategoriasPreview";
import CategoriesSkeleton from "@/components/skeletons/CategoriesSkeleton";
import HeroSwiperClient from "@/components/sections/HeroSwiperClient";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-full">
      <main className="mx-auto mb-10">
        <section className="min-w-full">
          {/* Landing Page Content */}
          <Suspense fallback={<div className="h-200 w-full bg-neutral-900 animate-pulse" />}>
            <HeroSwiperClient />
          </Suspense>
        </section>
        <section className="mx-auto h-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex flex-col items-start w-full px-3 py-6 space-y-4 md:py-12">
            <h1 className="font-display text-display-lg font-bold text-espresso tracking-tight">
              Nuestra tienda
            </h1>
            <div className="flex">
              <h3 className="font-display text-heading-md text-espresso">
                En{" "}
                <Link href="/" className="font-semibold">
                  Lucero Ortega Atelier 1994{" "}
                </Link>
                nos complace presentarte nuestra nueva imagen, un reflejo directo de nuestra
                evolución como Boutique, hacia la creación de estilos nuevos, donde la alta costura
                y la esencia del hoy se encuentran. Cada prenda o accesorio lleva consigo una
                historia de más de 30 años de experiencia continua.
              </h3>
            </div>
            <Link
              href="/nosotros"
              className="rounded-lg border border-espresso mt-2 px-5 py-3 font-medium text-espresso hover:bg-espresso/10 transition"
            >
              Quienes somos &rarr;
            </Link>
          </div>
        </section>
        <section className="mx-auto h-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <Suspense fallback={<CategoriesSkeleton />}>
            {/* Categories section */}
            <CategoriasPreview />
          </Suspense>
        </section>
        <section className="mx-auto h-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gold-light/40 px-6 py-24 sm:py-32 lg:px-8">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,bg-cream,transparent)] opacity-10" />
            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg]  shadow-xl  bg-espresso/10  sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
            <div className="mx-auto max-w-2xl  lg:max-w-4xl">
              <Link
                href="/"
                className="flex flex-col items-center tracking-tight uppercase text-espresso"
              >
                <span className="font-display font-bold text-3xl">LUCERO ORTEGA</span>
                <span className="text-xs font-sans tracking-widest px-2.5 py-1 rounded-full bg-mocha/20 font-semibold">
                  Atelier 1994
                </span>
              </Link>
              <figure className="mt-10">
                <blockquote className="text-center text-xl/8 font-semibold text-espresso/60 sm:text-2xl/9">
                  <p>
                    “Soy una diseñadora de modas apasionada por crear prendas que resalten la
                    feminidad, la silueta y reflejan la esencia de cada mujer. Diseño con
                    sensibilidad, elegancia y atención a cada detalle, porque vestir bien es
                    sentirse auténtica”
                  </p>
                </blockquote>
                <figcaption className="mt-10">
                  <Image
                    alt="Diseñadora"
                    src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/testimonios/disenadora/1.png`}
                    width={500}
                    height={500}
                    className="mx-auto size-20 rounded-full"
                  />
                  <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                    <div className="font-semibold text-espresso">Lucero Ortega</div>
                    <svg
                      width={3}
                      height={3}
                      viewBox="0 0 2 2"
                      aria-hidden="true"
                      className="fill-mocha/60"
                    >
                      <circle r={1} cx={1} cy={1} />
                    </svg>
                    <div className="text-mocha/60">Diseñadora de modas</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
