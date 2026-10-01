// @/app/(public)/[categoria]/[producto]/loading.tsx

import { Skeleton } from "@/components/skeletons/StoreSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-espresso/5">
      <div className="mx-auto max-w-2xl px-6 lg:px-12 mt-6 lg:max-w-7xl pt-18">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Skeleton className="w-48 h-6" />
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12 mb-12">
          <div>
            <div className="block lg:hidden w-full mb-4">
              <Skeleton className="w-full h-96 rounded-lg" />
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4 mb-2">
              <Skeleton
                className="col-span-2 relative aspect-4/3 xl:aspect-9/16 
                    w-full rounded-xl"
              />
              {[1, 2].map((item) => (
                <Skeleton key={item} className="relative aspect-square w-full rounded-lg" />
              ))}
            </div>
          </div>
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 space-y-6">
            <Skeleton className="w-3/4 h-10" /> {/* h1 */}
            <div className="mt-3">
              <Skeleton className="w-1/3 h-8" /> {/* h2 & p */}
            </div>
            {/* ProductAddSection */}
            <Skeleton className="w-full h-14 rounded-xl" />
            {/* Descripción y Detalles del producto */}
            <div className="mt-10 pt-10 border-t border-gray-200 space-y-3">
              {/* h3 */}
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-full h-20" /> {/* Descripción */}
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 space-y-3">
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-full h-20" /> {/* Detalles */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
