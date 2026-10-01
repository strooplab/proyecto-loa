// @/app/(public)/[categoria]/loading.tsx

import { Skeleton } from "@/components/skeletons/StoreSkeleton";
export default function Loading() {
  return (
    <div className="min-h-full">
      <div className="mx-auto mb-16">
        {/* Banner */}
        <div className="w-full">
          <div className="h-64 md:h-80 lg:h-96 w-full bg-espresso/20 relative flex items-center">
            <div className="absolute inset-0 flex items-center px-6 sm:px-12 lg:px-16 z-10">
              <div className="flex flex-col items-start max-w-6xl w-full mx-auto space-y-3">
                {/* Breadcrumb */}
                <Skeleton className="w-32 h-4" />
                {/* Categoria */}
                <Skeleton className="w-3/4 md:w-1/2 h-12 md:h-16" />
                {/* Subtitulo */}
                <Skeleton className="w-full md:w-1/3 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Categorías y filtros */}
        <div className="mt-6">
          {/* Slider */}
          <div className="w-full lg:py-4 overflow-hidden">
            <div className="pl-4 sm:pl-6 lg:pl-36 max-w-360 mx-auto">
              <div className="flex gap-3 overflow-hidden">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Skeleton key={item} className="w-28 h-10 rounded-full shrink-0" />
                ))}
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="mx-auto max-w-2xl md:max-w-7xl px-6 lg:px-12 mt-4">
            <div className="flex items-center justify-between flex-wrap gap-4 py-4 border-b border-espresso/10 mb-8">
              <Skeleton className="w-32 h-4" />
              <div className="flex items-center gap-2">
                <Skeleton className="w-24 h-8 rounded-full" />
                <Skeleton className="w-24 h-8 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 xl:gap-x-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="flex flex-col p-6 border border-espresso/10 rounded-md space-y-4"
              >
                {/* Imagen */}
                <Skeleton className="aspect-square w-full rounded-md" />
                {/* Título y color */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-3 w-2/5" />
                </div>
                {/* Precio */}
                <Skeleton className="h-5 w-1/3 pt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
