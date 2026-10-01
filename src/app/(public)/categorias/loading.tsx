// @/app/(public)/categorias/loading.tsx

import { Skeleton } from "@/components/skeletons/StoreSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-espresso/5 animate-pulse">
      {/* Banner de carga */}
      <div className="h-50 md:h-70 lg:h-96 w-full bg-espresso/20 flex items-center justify-center">
        <Skeleton className="w-48 h-8" />
      </div>

      {/* Grid de productos  */}
      <div className="max-w-2xl md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="flex flex-col gap-3">
              <Skeleton className="aspect-3/4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
