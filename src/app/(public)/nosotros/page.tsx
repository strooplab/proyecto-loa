import Image from "next/image";

export default function NosotrosPage() {
  return (
    <div className="min-h-full">
      <main className="mx-auto mb-10">
        {/* BANNER NOSOTROS */}
        <section className="min-w-full">
          <div className="h-50 md:h-70 lg:h-96 w-full bg-espresso relative overflow-hidden">
            <div className="relative h-full w-full">
              <Image
                src="https://pub-415cf98523294c368075ea9561ec3752.r2.dev/Development/src/Banner1.jpg"
                alt="Nosotros - Banner"
                width={1920}
                height={100}
                loading="eager"
                className="h-full w-full object-cover bg-espresso/10 opacity-40"
              />
              <div className="absolute inset-0 flex items-center justify-center mt-6 px-6 sm:px-12 lg:px-16">
                <h1
                  className="text-4xl md:text-7xl font-sans font-semibold tracking-tight text-cream 
                  uppercase"
                >
                  Nosotros
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN HISTORIA / PROPÓSITO*/}
        <section className="mx-auto max-w-7xl px-6 lg:px-12 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest text-espresso/60 font-semibold">
                Nuestra Esencia
              </span>
              <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-espresso">
                Diseñamos piezas que cuentan historias y acompañan tu ritmo.
              </h2>
              <p className="text-espresso/80 leading-relaxed">
                Creemos firmemente que la moda va más allá de las tendencias pasajeras. Cada prenda
                que conceptualizamos nace de un proceso minucioso, priorizando cortes limpios,
                siluetas que realzan la figura y una selección rigurosa de materiales que garantizan
                tanto comodidad como durabilidad.
              </p>
              <p className="text-espresso/70 leading-relaxed text-sm">
                Buscamos inspirar confianza y autenticidad en cada mujer, ofreciendo una curaduría
                exclusiva de prendas versátiles para el día a día y ocasiones especiales.
              </p>
            </div>

            <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-xl bg-espresso/5">
              <Image
                src="https://images.pexels.com/photos/601316/pexels-photo-601316.jpeg"
                alt="Detalle de diseño y moda"
                fill
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* VALORES O PILARES DE LA MARCA */}
        <section className="mx-auto max-w-7xl px-6 lg:px-12 mt-14">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-sans font-bold tracking-tight text-espresso">
              Lo que nos define
            </h2>
            <p className="text-espresso/70 text-sm mt-2">
              Pilares fundamentales en cada colección que creamos para ti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-cream p-8 rounded-xl border border-espresso/10 shadow-sm flex flex-col items-start">
              <div className="w-12 h-12 rounded-full bg-espresso/10 flex items-center justify-center text-espresso mb-6">
                <span className="material-symbols-outlined">checkroom</span>
              </div>
              <h3 className="text-lg font-semibold text-espresso mb-2">Diseño Exclusivo</h3>
              <p className="text-sm text-espresso/70 leading-relaxed">
                Colecciones limitadas y cuidadas al detalle para asegurar un estilo único,
                sofisticado y alejado de la producción masiva.
              </p>
            </div>

            <div className="bg-cream p-8 rounded-xl border border-espresso/10 shadow-sm flex flex-col items-start">
              <div className="w-12 h-12 rounded-full bg-espresso/10 flex items-center justify-center text-espresso mb-6">
                <span className="material-symbols-outlined">eco</span>
              </div>
              <h3 className="text-lg font-semibold text-espresso mb-2">Consciencia y Calidad</h3>
              <p className="text-sm text-espresso/70 leading-relaxed">
                Seleccionamos texturas de alta calidad y trabajamos con procesos locales que valoran
                el oficio y cuidan cada acabado.
              </p>
            </div>

            <div className="bg-cream p-8 rounded-xl border border-espresso/10 shadow-sm flex flex-col items-start">
              <div className="w-12 h-12 rounded-full bg-espresso/10 flex items-center justify-center text-espresso mb-6">
                <span className="material-symbols-outlined">favorite</span>
              </div>
              <h3 className="text-lg font-semibold text-espresso mb-2">Enfoque Personal</h3>
              <p className="text-sm text-espresso/70 leading-relaxed">
                Pensado para resaltar la figura de manera natural, brindando comodidad y seguridad
                en cualquier momento de tu día.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
