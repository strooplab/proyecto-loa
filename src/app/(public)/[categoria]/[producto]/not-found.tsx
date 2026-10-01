import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <div className="min-h-[70vh] relative flex flex-col items-center justify-center text-center px-4">
      <div className="absolute inset-x-0 top-0 h-26 bg-espresso"></div>
      <span className="material-symbols-outlined text-6xl text-espresso mb-4">
        sentiment_dissatisfied
      </span>
      <h2 className="text-3xl font-sans font-semibold text-espresso mb-2">
        Producto no encontrado
      </h2>
      <p className="text-espresso max-w-md mb-8 text-sm">
        Parece que el producto que buscas no existe o ha sido movido. Explora nuestros otros
        productos disponibles.
      </p>
      <Link
        href="/categorias"
        className="px-6 py-3 bg-cream text-espresso font-medium rounded-full hover:bg-cream/90 transition-colors text-sm"
      >
        Volver a la tienda
      </Link>
    </div>
  );
}
