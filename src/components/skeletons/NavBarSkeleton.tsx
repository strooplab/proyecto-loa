// @/components/NavBarSkeleton.tsx
function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`rounded-md bg-espresso/10 motion-safe:animate-pulse ${className}`} />;
}
export default function NavbarSkeleton() {
  return (
    <nav aria-hidden="true" className="fixed top-0 left-0 z-50 w-full p-3 bg-cream shadow-sm">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="sm:hidden">
            <Skeleton className="size-10" />
          </div>

          <div className="flex flex-1 items-center justify-center sm:justify-start">
            <Skeleton className="h-8 w-16 md:h-10 md:w-20" />
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center gap-2 sm:static sm:ml-6 md:gap-4">
            <Skeleton className="size-10" />
            <div className="flex items-center gap-1">
              <Skeleton className="size-10" />
              <Skeleton className="h-5 w-4 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
