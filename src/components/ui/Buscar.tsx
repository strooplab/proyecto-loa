// @/components/ui/Buscar.tsx

"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
  Description,
  Button,
} from "@headlessui/react";
import ProductCard from "@/components/ui/ProductCard";
import { Producto } from "@/types/product";
import { searchProducts } from "@/services/clientProductService";
import { usePanel } from "@/components/context/PanelContext";

export default function Buscar() {
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Control states del drawer
  const { activeDrawer, closeDrawer } = usePanel();
  const isOpen = activeDrawer === "Buscar";

  // Functionalities
  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      setIsLoading(true);
      const data = await searchProducts(busqueda);
      if (isMounted) {
        setProductos(data);
        setIsLoading(false);
      }
    }
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [busqueda]); // Funcion para cargar todos los productos guardados en caché

  const resultados = productos;

  return (
    <>
      <Dialog open={isOpen} onClose={closeDrawer} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out data-closed:opacity-0"
        />
        <div className="fixed inset-0 overflow-y-auto px-4 py-16 sm:py-24">
          <div className="flex min-h-full items-start justify-center">
            <DialogPanel
              transition
              className="w-full max-w-lg transform overflow-hidden rounded-md bg-cream p-6 text-left align-middle shadow-xl shadow-blue-gray-900/5 transition-all duration-300 ease-in-out data-closed:translate-y-4 data-closed:opacity-0 sm:duration-500"
            >
              <div className="flex items-center justify-between pb-4 border-b border-espresso/10">
                <div className="flex flex-col">
                  <DialogTitle className="text-heading-lg font-sans font-medium text-espresso">
                    Buscar
                  </DialogTitle>
                  <Description className="text-body-lg text-espresso/60">
                    El producto que buscas aparecerá rápidamente aquí.
                  </Description>
                </div>
                <Button
                  as="button"
                  onClick={closeDrawer}
                  aria-label="Cerrar búsqueda"
                  className="p-1 text-espresso/80 hover:text-espresso"
                >
                  <span className="material-symbols-outlined text-2xl leading-none">close</span>
                </Button>
              </div>
              <div className="w-full max-w-md px-4 mt-2 font-sans">
                <Field>
                  <Label className="text-body-xl font-medium text-espresso/80">
                    Buscar producto
                  </Label>
                  <Input
                    name="Buscar"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Ej: 'Blusa vinotinto manga corta'"
                    className="mt-3 block w-full rounded-md border-none bg-white px-3 py-2 text-body-sm text-espresso focus:outline-1 focus:outline-terracota placeholder:text-espresso/60"
                    autoFocus
                  />
                </Field>
              </div>

              {/* Resultados de la búsqueda */}
              <div className="mt-4 max-h-100 overflow-y-auto px-4">
                {isLoading ? (
                  <p className="text-espresso/60 text-body-sm text-center py-6">
                    Buscando productos...
                  </p>
                ) : productos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-2">
                    {productos.map((p) => (
                      <ProductCard key={p.id} producto={p} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-espresso/60 text-center py-6">
                    {busqueda.length > 0
                      ? `Sin resultados para: "${busqueda}"`
                      : "¿Qué tienes en mente?"}
                  </p>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
