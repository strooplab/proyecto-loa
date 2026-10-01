// @/components/ui/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Producto } from "@/types/product";
import formatPrice from "@/utils/formatPrice";

type ProductoCard = Pick<
  Producto,
  "nombre" | "slug" | "categoria_slug" | "descripcion" | "precio" | "imagenes" | "colores"
>;

export default function ProductCard({ producto }: { producto: ProductoCard }) {
  return (
    <div className="group relative">
      <div className="aspect-square w-full overflow-hidden rounded-md bg-cream/50 object-cover group-hover:opacity-80 lg:aspect-auto lg:h-80 border border-espresso/10">
        <Image
          src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${producto.imagenes[0]}`} // Si tiene muchas imagenes para el card solo se usa una
          alt={producto.descripcion || ""}
          width={500}
          height={500}
          className="size-full object-cover"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-sans font-medium text-espresso">
            <Link href={`${producto.categoria_slug}/${producto.slug}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {producto.nombre}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-espresso/60">
            {producto.colores?.map((c) => c.nombre).join(", ")}
          </p>
        </div>
        {/* Formato moneda */}
        <p className="text-sm font-medium text-espresso">{formatPrice(producto.precio)}</p>
      </div>
    </div>
  );
}
