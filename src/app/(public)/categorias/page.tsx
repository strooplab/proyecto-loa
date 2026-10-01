// @/app/(public)/categorias/page.tsx

import Image from "next/image";
import getCategories from "@/services/categoryService";

export default async function Categorias() {
  const categorias = await getCategories();

  return (
    <div className="min-h-full">
      <main className="mx-auto mb-10">
        <section className="min-w-full">
          <div className="h-50 md:h-70 lg:96 w-full bg-espresso relative overflow-hidden">
            <div className="relative h-full w-full">
              <Image
                src="https://pub-415cf98523294c368075ea9561ec3752.r2.dev/Development/src/Banner1.jpg"
                alt="Categorias - Banner"
                width={1920}
                height={100}
                loading="eager"
                className="h-full w-full object-cover bg-espresso/10 opacity-40"
              />
              <div className="absolute inset-0 flex items-center justify-center mt-6 px-6 sm:px-12 lg:px-16">
                <h1 className="text-4xl md:text-7xl font-sans font-semibold tracking-tight text-cream uppercase">
                  Categorias
                </h1>
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-2xl md:max-w-7xl px-2 py-6 sm:px-6 lg:px-8">
          <div className="px-4 mb-10">
            <h2 className="text-display-lg font-display font-bold tracking-tight text-espresso">
              Encuentra tu estilo
            </h2>
            <p className="text-heading-md font-sans text-espresso/60">
              Moda a tu medida que resalta tu figura
            </p>
          </div>
          {categorias.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h2 className="text-espresso/80 text-heading-lg">Sin categorias</h2>
              <p className="text-espresso/60 text-body-sm">
                Actualmente no tenemos categorias disponibles
              </p>
            </div>
          ) : (
            <div className="mt-6 px-2 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {categorias.map((categoria) => (
                <div key={categoria.id} className="group relative">
                  <Image
                    alt={categoria.slug}
                    src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/categorias/${categoria.slug}/1.png`}
                    width={500}
                    height={500}
                    className="aspect-square w-full rounded-md bg-cream object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  />
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-body-lg font-sans text-espresso">
                        <a href={`${categoria.slug}/`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {categoria.nombre}
                        </a>
                      </h3>
                      <p className="mt-1 text-body-sm text-espresso/60">{categoria?.items} items</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
