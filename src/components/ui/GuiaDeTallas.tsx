// @/components/modals/GuiaDeTallas.tsx
"use client";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
  Button,
} from "@headlessui/react";
import { Fragment } from "react";

interface GuiaDeTallasProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuiaDeTallasModal({ isOpen, onClose }: GuiaDeTallasProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-espresso/40 backdrop-blur-xs" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-xl transform overflow-hidden rounded-xl bg-cream p-6 text-left align-middle shadow-xl transition-all border border-espresso/10">
                <div className="flex items-center justify-between border-b border-espresso/10 pb-4">
                  <DialogTitle as="h3" className="text-lg font-bold text-espresso">
                    Guía de Tallas
                  </DialogTitle>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-1 text-espresso/60 hover:bg-espresso/5 hover:text-espresso transition-colors"
                  >
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-4 space-y-4 text-sm text-espresso/80">
                  <p>
                    Encuentra tu medida ideal, lee la guia para encontrar el ajuste perfecto en
                    nuestras prendas de alta costura. Las medidas estan en centímetros.
                  </p>

                  {/* Tabla de medidas */}
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="border-b border-espresso/20 text-espresso font-semibold">
                          <th className="py-2.5 px-3">Talla</th>
                          <th className="py-2.5 px-3">Busto (cm)</th>
                          <th className="py-2.5 px-3">Cintura (cm)</th>
                          <th className="py-2.5 px-3">Cadera (cm)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-espresso/10 text-espresso/70">
                        <tr>
                          <td className="py-2.5 px-3 font-medium text-espresso">XS</td>
                          <td className="py-2.5 px-3">78-82</td>
                          <td className="py-2.5 px-3">60-64</td>
                          <td className="py-2.5 px-3">86-90</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-medium text-espresso">S</td>
                          <td className="py-2.5 px-3">83-87</td>
                          <td className="py-2.5 px-3">65-69</td>
                          <td className="py-2.5 px-3">91-95</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-medium text-espresso">M</td>
                          <td className="py-2.5 px-3">88-92</td>
                          <td className="py-2.5 px-3">70-74</td>
                          <td className="py-2.5 px-3">96-100</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-medium text-espresso">L</td>
                          <td className="py-2.5 px-3">93-97</td>
                          <td className="py-2.5 px-3">75-79</td>
                          <td className="py-2.5 px-3">101-105</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-medium text-espresso">PLUS</td>
                          <td className="py-2.5 px-3">A PEDIDO</td>
                          <td className="py-2.5 px-3">A PEDIDO</td>
                          <td className="py-2.5 px-3">A PEDIDO</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 rounded-lg bg-espresso/5 p-3 text-xs text-espresso/70 leading-relaxed">
                    <span className="font-semibold text-espresso">Nota:</span> Si estás decidiendote
                    entre dos tallas, te recomendamos elegir la talla superior debido al corte de
                    nuestras piezas.
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    type="button"
                    onClick={onClose}
                    className="inline-flex justify-center rounded-md bg-espresso px-4 py-2 text-sm font-medium text-cream hover:bg-espresso/90 transition-colors"
                  >
                    Entendido
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
