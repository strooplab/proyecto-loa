// @/components/skeletons/CategoriesSkeleton.tsx
export default function CategoriesSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-pulse">
      <div className="mb-8 border-b border-espresso/20 pb-4 flex justify-between">
        <div className="h-6 w-48 bg-espresso/10 rounded"></div>
        <div className="h-6 w-20 bg-espresso/10 rounded"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-64 bg-espresso/10 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}
