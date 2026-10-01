// @/components/StoreSkeleton.tsx
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-espresso/10 ${className}`}
    ></div>
  );
}
