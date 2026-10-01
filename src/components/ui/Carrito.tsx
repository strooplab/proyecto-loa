// @/components/ui/Carrito.tsx

"use client";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Button } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { usePanel } from "@/components/context/PanelContext";
import { useCarrito } from "@/store/useCarrito";
import formatPrice from "@/utils/formatPrice";

export default function Carrito() {
  // Context controlar el panel
  const { activeDrawer, closeDrawer } = usePanel();
  const isOpen = activeDrawer === "Carrito";

  // Store
  const { items, removeItem, updateCantidad, getSubtotal } = useCarrito();
  const subtotal = getSubtotal();

  return (
    <Dialog open={isOpen} onClose={closeDrawer} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out
        data-closed:opacity-0"
      />

      {/* Panel */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md 
              transform transition duration-300 ease-in-out
              data-closed:translate-x-full sm:duration-500"
            >
              <div className="flex h-full flex-col overflow-y-auto bg-cream shadow-xl shadow-blue-gray-900/5">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-heading-lg font-sans font-medium text-espresso">
                      Tu carrito
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <Button
                        as="button"
                        onClick={closeDrawer}
                        aria-label="Cerrar carrito"
                        aria-expanded={activeDrawer === "Carrito"}
                        className="relative -m-2 p-2 text-espresso/80 hover:text-espresso"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="material-symbols-outlined text-2xl leading-none">
                          close
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="mt-8">
                    {items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <h2 className="text-espresso/80 text-heading-lg">Tu carrito está vacío</h2>
                        <p className="text-espresso/60 text-body-sm">
                          Continua explorando nuestra tienda!
                        </p>
                      </div>
                    ) : (
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-espresso/10">
                          {items.map((producto) => {
                            return (
                              <li
                                key={`${producto.id}-${producto.talla}-${producto.color}`}
                                className="flex py-6"
                              >
                                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-espresso/10">
                                  <Image
                                    src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${producto.imagen}`}
                                    alt={producto.nombre || ""}
                                    width={360}
                                    height={360}
                                    className="size-full object-cover"
                                  />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-body-lg font-sans font-medium text-espresso">
                                      <h3>
                                        <Link
                                          href={`/${producto.categoria_slug}/${producto.slug}`}
                                          onClick={closeDrawer}
                                        >
                                          {producto.nombre}
                                        </Link>
                                      </h3>
                                      <p className="ml-4">{formatPrice(producto.precio)}</p>
                                    </div>
                                    <p className="mt-1 text-body-sm text-espresso/80">
                                      {producto.color}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-body-sm">
                                    <div className="flex flex-col mt-3">
                                      <p className="text-espresso/60">Talla: {producto.talla}</p>
                                      <div className="mt-8">
                                        <h3 className="text-sm font-medium text-espresso mb-3">
                                          Cantidad
                                        </h3>
                                        <div className="inline-flex items-center border border-espresso/10 rounded-md overflow-hidden bg-white">
                                          <Button
                                            type="button"
                                            onClick={() =>
                                              updateCantidad(
                                                producto.id,
                                                producto.talla,
                                                producto.color,
                                                producto.cantidad - 1,
                                              )
                                            }
                                            className="px-3 py-1.5 text-espresso/70 hover:bg-espresso/5 transition-colors text-sm font-medium cursor-pointer"
                                            aria-label="Disminuir cantidad"
                                          >
                                            -
                                          </Button>
                                          <input
                                            type="number"
                                            min="1"
                                            value={producto.cantidad}
                                            onChange={(e) => {
                                              const val = parseInt(e.target.value);
                                              updateCantidad(
                                                producto.id,
                                                producto.talla,
                                                producto.color,
                                                isNaN(val) ? 1 : val,
                                              );
                                            }}
                                            className="w-12 text-center text-sm font-medium text-espresso bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                          />
                                          <Button
                                            type="button"
                                            onClick={() =>
                                              updateCantidad(
                                                producto.id,
                                                producto.talla,
                                                producto.color,
                                                producto.cantidad + 1,
                                              )
                                            }
                                            className="px-3 py-1.5 text-espresso/70 hover:bg-espresso/5 transition-colors text-sm font-medium cursor-pointer"
                                            aria-label="Aumentar cantidad"
                                          >
                                            +
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex">
                                      <Button
                                        as="button"
                                        onClick={() =>
                                          removeItem(producto.id, producto.talla, producto.color)
                                        }
                                        className="font-medium text-terracota hover:text-terracota/80"
                                      >
                                        Eliminar
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {items.length > 0 && (
                  <div className="border-t border-espresso/10 px-4 py-6 sm:px-6">
                    <div className="flex justify-between font-sans font-medium text-body-lg text-espresso">
                      <p>Subtotal</p>
                      <p>{formatPrice(subtotal)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-espresso/60">
                      El costo de envío se suma al total luego de confirmar el pedido
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/checkout"
                        onClick={closeDrawer}
                        className="flex items-center justify-center rounded-md border 
                        border-transparent bg-terracota px-6 py-3 text-body-lg 
                        font-medium text-cream shadow-xs hover:bg-terracota/90
                        transition-all ease-in-out duration-200"
                      >
                        Confirmar pedido
                      </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-body-sm text-espresso/60">
                      <p>
                        o{" "}
                        <Button
                          as="button"
                          onClick={closeDrawer}
                          className="font-medium text-espresso/60 hover:text-espresso inline-flex items-center gap-1"
                        >
                          Sigue comprando
                          <span aria-hidden="true">&rarr;</span>
                        </Button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
