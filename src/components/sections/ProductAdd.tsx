// @/components/sections/ProductAdd.tsx
"use client";

import { useState } from "react";
import { Button } from "@headlessui/react";
import GuiaModal from "@/components/services/Guia";
import { useCarrito } from "@/store/useCarrito";
import { ColorItem, TallaItem, Producto } from "@/types/product";

interface ProductAddProps {
  productoItem: Producto;
  allColors: ColorItem[];
}

export default function ProductAddSection({ productoItem, allColors }: ProductAddProps) {
  // Estado local
  const [cantidad, setCantidad] = useState(1);
  const addItem = useCarrito((state) => state.addItem);

  const handleAddToCart = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Color y talla
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const colorSeleccionado = formData.get("color") as string;
    const tallaSeleccionada = formData.get("size") as string;

    const colorObj = allColors.find((c) => c.slug === colorSeleccionado);
    const colSlug = productoItem.colores?.find((c) => c.slug === colorSeleccionado);

    const colorNombre = colorObj?.nombre || colSlug?.nombre || colorSeleccionado;
    // Zustand
    addItem({
      id: productoItem.id,
      categoria_slug: productoItem.categoria_slug,
      nombre: productoItem.nombre,
      precio: productoItem.precio,
      descripcion: productoItem.descripcion || "",
      imagen: productoItem.imagenes?.[0] || "",
      color: colorNombre,
      talla: tallaSeleccionada,
      cantidad: cantidad,
      slug: productoItem.slug,
    });
  };

  return (
    <form onSubmit={handleAddToCart} className="mt-6">
      {/* Selector de Colores */}
      {productoItem.colores && productoItem.colores.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-espresso">Color</h3>
          <fieldset aria-label="Elige un color" className="mt-4">
            <div className="flex items-center gap-x-3">
              {productoItem.colores.map((colSlug, index: number) => {
                const colorObj = allColors.find((c) => c.slug === colSlug.slug);
                const colorName = colorObj ? colorObj.nombre : colSlug.nombre;
                const hexValue = colorObj ? colorObj.hex : "#CCCCCC";

                return (
                  <label
                    key={index}
                    title={colorName}
                    className="relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-espresso/20"
                  >
                    <input
                      type="radio"
                      name="color"
                      defaultChecked={index === 0}
                      value={colSlug.slug}
                      aria-label={colorName}
                      className="size-8 appearance-none rounded-full border border-black/10 checked:ring-2 checked:ring-espresso checked:ring-offset-2 cursor-pointer transition-all"
                      style={{ backgroundColor: hexValue }}
                    />
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>
      )}

      {/* Selector de Tallas */}
      {productoItem.tallas && productoItem.tallas.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-espresso">Talla</h3>
            <GuiaModal />
          </div>

          <fieldset aria-label="Elige una talla" className="mt-4">
            <div className="grid grid-cols-4 gap-3">
              {productoItem.tallas.map((size: TallaItem, index: number) => (
                <label
                  key={index}
                  aria-label={size.nombre}
                  className="group relative flex items-center justify-center rounded-md border border-espresso/20 bg-cream/50 p-3 text-sm font-medium text-espresso uppercase cursor-pointer hover:bg-espresso/5 has-checked:border-espresso has-checked:bg-espresso has-checked:text-cream transition-all"
                >
                  <input
                    type="radio"
                    name="size"
                    defaultChecked={index === 0}
                    value={size.nombre}
                    className="absolute inset-0 appearance-none focus:outline-none cursor-pointer"
                  />
                  <span>{size.nombre}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      )}

      {/* Selector de Cantidad */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-espresso mb-3">Cantidad</h3>
        <div className="inline-flex items-center border border-espresso/10 rounded-md overflow-hidden bg-white">
          <Button
            type="button"
            onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
            className="px-3 py-1.5 text-espresso/70 hover:bg-espresso/5 transition-colors text-sm font-medium cursor-pointer"
            aria-label="Disminuir cantidad"
          >
            -
          </Button>
          <input
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setCantidad(isNaN(val) ? 1 : Math.max(1, val));
            }}
            className="w-12 text-center text-sm font-medium text-espresso bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <Button
            type="button"
            onClick={() => setCantidad((prev) => prev + 1)}
            className="px-3 py-1.5 text-espresso/70 hover:bg-espresso/5 transition-colors text-sm font-medium cursor-pointer"
            aria-label="Aumentar cantidad"
          >
            +
          </Button>
        </div>
      </div>

      {/* Botón de Agregar al carrito */}
      <Button
        type="submit"
        className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-terracota px-8 py-3 text-base font-medium text-cream hover:bg-terracota/80 focus:outline-none focus:ring-2 focus:ring-espresso focus:ring-offset-2 transition-colors shadow-md cursor-pointer"
      >
        Añadir al carrito
      </Button>
    </form>
  );
}
