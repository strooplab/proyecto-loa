// @/src/app/checkout/page.tsx
"use client";

import { useState } from "react";
import {
  Button,
  Field,
  Fieldset,
  Description,
  Input,
  Label,
  Legend,
  Select,
  Textarea,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useCarrito } from "@/store/useCarrito";
import { handleWhatsAppCheckout } from "@/utils/sendCheckoutWhatsappMessage";

export default function CheckoutPage() {
  // INICIALIZACIÓN DE VARIABLES
  // Inicialización de router
  const router = useRouter();

  // Datos del carrito
  const items = useCarrito((state) => state.items);
  const updateQuantity = useCarrito((state) => state.updateCantidad);
  const removeItem = useCarrito((state) => state.removeItem);

  // Calculo del subtotal
  const subtotal = items.reduce((acc, producto) => {
    const precio = Number(producto.precio) || 0;
    const cantidad = Number(producto.cantidad) || 1;
    return acc + precio * cantidad;
  }, 0);

  // Inicialización de datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    celular: "",
    ciudad: "",
    direccion: "",
    barrio: "",
    metodo: "transferencia",
    nota: "",
  });

  const [intentoEnviar, setIntentoEnviar] = useState(false); // Para manejar la ausencia de datos digitados en el formulario
  const [rateLimitedUntil, setRateLimitedUntil] = useState<number | null>(null); // Definición del rate limit

  // FUNCIONES
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEnviarWhatsApp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIntentoEnviar(true);

    // Campos obligatorios
    if (!formData.nombre || !formData.celular || !formData.ciudad || !formData.direccion) {
      return; // Detiene el envío si falta un campo
    }
    const result = await handleWhatsAppCheckout(items, subtotal, formData);
    if (!result.success) {
      setRateLimitedUntil(result.retryAt);
      return;
    }
    setRateLimitedUntil(null);
  };

  // Función para botón cancelar compra
  const handleCancelar = () => {
    router.back();
  };

  return (
    <div className="min-h-full">
      <main className="mx-auto mb-8">
        <div className="mx-auto max-w-2xl px-6 mt-8 md:max-w-7xl lg:px-12 lg:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* RESUMEN DEL CARRITO */}
            <section className="flex flex-col w-full gap-4 p-6 mb-2 bg-cream rounded-xl">
              <div className="bg-cream h-auto">
                <div className="flex flex-col gap-2 font-sans">
                  <h2 className="font-bold text-espresso text-heading-md tracking-tight">
                    Tu carrito
                  </h2>
                  <p className="text-espresso/60 text-body-sm">
                    Verifica cada ítem y escribe tus datos para crear tu orden.
                  </p>
                </div>
                <div className="mt-8 p-2">
                  <div className="flow-root">
                    {items.length === 0 ? (
                      <p className="text-espresso/60 text-body-sm py-4 text-center">
                        Tu carrito está vacío.
                      </p>
                    ) : (
                      <ul role="list" className="-my-6 divide-y divide-espresso/10">
                        {items.map((producto) => {
                          const imageUrl = Array.isArray(producto.imagen)
                            ? producto.imagen[0]
                            : producto.imagen;

                          return (
                            <li key={producto.id} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-espresso/10">
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${imageUrl}`}
                                  alt={producto.descripcion || producto.nombre}
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
                                        href={`/${producto.categoria_slug}/${producto.slug}` || "#"}
                                      >
                                        {producto.nombre}
                                      </Link>
                                    </h3>
                                    <p className="ml-4">
                                      {Number(producto.precio).toLocaleString("CO")}
                                    </p>
                                  </div>
                                  {Array.isArray(producto.color) ? (
                                    producto.color.map((col, idx) => (
                                      <span key={idx} className="text-xs text-gray-500">
                                        {col.replace("-", " ")}
                                        {idx < producto.color.length - 1 ? " • " : ""}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-xs text-gray-500">{producto.color}</span>
                                  )}
                                </div>
                                <div className="flex flex-1 items-end justify-between text-body-sm">
                                  <div className="flex flex-col mt-3">
                                    <p className="text-espresso/60">Talla: {producto.talla}</p>
                                    {/* SELECTOR DE CANTIDAD */}
                                    <div className="flex items-center border border-espresso/10 rounded-md overflow-hidden bg-white mt-1">
                                      <Button
                                        type="button"
                                        onClick={() => {
                                          const currencyQty = Number(producto.cantidad) || 1;
                                          if (currencyQty > 1) {
                                            updateQuantity(
                                              producto.id,
                                              producto.talla,
                                              producto.color,
                                              currencyQty - 1,
                                            );
                                          }
                                        }}
                                        className="px-2.5 py-1 text-espresso/70 hover:bg-espresso/5 transition-colors text-body-sm font-medium"
                                        aria-label="Disminuir cantidad"
                                      >
                                        -
                                      </Button>
                                      <Input
                                        type="number"
                                        min="1"
                                        value={producto.cantidad}
                                        onChange={(e) => {
                                          const val = parseInt(e.target.value);
                                          const newQty = isNaN(val) ? 1 : Math.max(1, val);
                                          updateQuantity(
                                            producto.id,
                                            producto.talla,
                                            producto.color,
                                            newQty,
                                          );
                                        }}
                                        className="w-10 text-center text-sm font-medium text-espresso bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                      />
                                      <Button
                                        type="button"
                                        onClick={() => {
                                          const currencyQty = Number(producto.cantidad) || 0;
                                          updateQuantity(
                                            producto.id,
                                            producto.talla,
                                            producto.color,
                                            currencyQty + 1,
                                          );
                                        }}
                                        className="px-2.5 py-1 text-espresso/70 hover:bg-espresso/5 transition-colors text-body-sm font-medium"
                                        aria-label="Aumentar cantidad"
                                      >
                                        +
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="flex">
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        removeItem(producto.id, producto.talla, producto.color)
                                      }
                                      className="font-medium text-terracota hover:text-terracota/80 cursor-pointer"
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
                    )}
                  </div>
                </div>

                <div className="flex flex-col mt-4 space-y-3 border-t border-espresso/10 pt-4">
                  <div className="flex items-center justify-between text-espresso">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-heading-md">Costo de envío</span>
                      <Popover className="relative flex items-center">
                        <PopoverButton
                          aria-label="Más información sobre el envío"
                          className="flex items-center justify-center w-4 h-4 rounded-full bg-espresso/10 text-espresso text-[10px] font-bold hover:bg-espresso/20 focus:outline-none focus:ring-2 focus:ring-gold-light/55 transition-colors cursor-pointer"
                        >
                          ?
                        </PopoverButton>
                        <PopoverPanel className="absolute left-0 bottom-full mb-2 z-10 w-64 p-3 text-xs text-espresso bg-white rounded-lg shadow-xl border border-espresso/10">
                          El costo de envío exacto se calcula y se acuerda directamente por WhatsApp
                          según tu ciudad y dirección.
                        </PopoverPanel>
                      </Popover>
                    </div>
                    <span className="font-medium text-heading-md">A calcular</span>
                  </div>
                  <div className="flex items-center justify-between text-espresso">
                    <div className="flex flex-col">
                      <span className="font-bold text-heading-md">Subtotal:</span>
                      <span className="text-xs text-espresso/60">(Sin envío incluido)</span>
                    </div>
                    <span className="font-medium text-heading-md">
                      {subtotal.toLocaleString("CO")}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* FORMULARIO DE DATOS */}
            <section className="flex flex-col w-full gap-4 p-6 mb-2 rounded-md">
              <div className="flex flex-col gap-2 pb-4 font-sans border-b border-espresso/10">
                <h2 className="font-bold text-espresso text-heading-md tracking-tight">
                  Tus datos
                </h2>
                <p className="text-espresso/60 text-body-sm">
                  Completa tu compra llenando el formulario con tus datos.
                </p>
              </div>
              <div className="w-full max-w-lg">
                <form onSubmit={handleEnviarWhatsApp} noValidate>
                  <Fieldset className="space-y-6 rounded-xl px-6 py-4 sm:px-8 sm:py-4">
                    <Legend className="text-heading-md tracking-tight font-bold text-espresso">
                      Confirmando orden
                    </Legend>
                    <Field>
                      <Label className="flex text-espresso/80 text-body-md font-medium">
                        Nombre completo <p className="text-red-500">*</p>
                      </Label>
                      <Input
                        name="nombre"
                        placeholder="Nombres y apellidos"
                        value={formData.nombre}
                        onChange={handleChange}
                        className={clsx(
                          "mt-3 block w-full rounded-md border-b shadow-md px-3 py-2 text-body-sm text-espresso",
                          intentoEnviar && !formData.nombre
                            ? "border-red-500 focus:outline-red-500"
                            : "border-gray-400 focus:not-data-focus:outline-gray-400 data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gold-light/50",
                        )}
                      />
                      {intentoEnviar && !formData.nombre && (
                        <Description className="text-red-500 text-body-sm mt-1 font-medium">
                          Este campo es obligatorio.
                        </Description>
                      )}
                    </Field>
                    <Field>
                      <Label className="flex text-espresso/80 text-body-md font-medium">
                        Celular <p className="text-red-500">*</p>
                      </Label>
                      <Input
                        name="celular"
                        placeholder="Ej: 3161234567"
                        value={formData.celular}
                        onChange={handleChange}
                        className={clsx(
                          "mt-3 block w-full rounded-md border-b shadow-md px-3 py-2 text-body-sm text-espresso",
                          intentoEnviar && !formData.celular
                            ? "border-red-500 focus:outline-red-500"
                            : "border-gray-400 focus:not-data-focus:outline-gray-400 data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gold-light/50",
                        )}
                      />
                      {intentoEnviar && !formData.celular && (
                        <Description className="text-red-500 text-body-sm mt-1 font-medium">
                          Este campo es obligatorio.
                        </Description>
                      )}
                    </Field>
                    <Field>
                      <Label className="flex text-espresso/80 text-body-md font-medium">
                        Ciudad <p className="text-red-500">*</p>
                      </Label>
                      <Input
                        name="ciudad"
                        placeholder="Ciudad donde recibirá el pedido"
                        value={formData.ciudad}
                        onChange={handleChange}
                        className={clsx(
                          "mt-3 block w-full rounded-md border-b shadow-md px-3 py-2 text-body-sm text-espresso",
                          intentoEnviar && !formData.ciudad
                            ? "border-red-500 focus:outline-red-500"
                            : "border-gray-400 focus:not-data-focus:outline-gray-400 data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gold-light/50",
                        )}
                      />
                      {intentoEnviar && !formData.ciudad && (
                        <Description className="text-red-500 text-body-sm mt-1 font-medium">
                          Este campo es obligatorio.
                        </Description>
                      )}
                    </Field>
                    <Field>
                      <Label className="flex text-espresso/80 text-body-md font-medium">
                        Dirección <p className="text-red-500">*</p>
                      </Label>
                      <Input
                        name="direccion"
                        placeholder="Ej: Cr. 1 #30-33"
                        value={formData.direccion}
                        onChange={handleChange}
                        className={clsx(
                          "mt-3 block w-full rounded-md border-b shadow-md px-3 py-2 text-body-sm text-espresso",
                          intentoEnviar && !formData.direccion
                            ? "border-red-500 focus:outline-red-500"
                            : "border-gray-400 focus:not-data-focus:outline-gray-400 data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gold-light/50",
                        )}
                      />
                      {intentoEnviar && !formData.direccion && (
                        <Description className="text-red-500 text-body-sm mt-1 font-medium">
                          Este campo es obligatorio.
                        </Description>
                      )}
                    </Field>
                    <Field>
                      <Label className="text-espresso/80 text-body-md font-medium">Barrio</Label>
                      <Input
                        name="barrio"
                        placeholder="Las Palmas"
                        value={formData.barrio}
                        onChange={handleChange}
                        className="mt-3 block w-full rounded-md border-b border-gray-400 shadow-md px-3 py-2 text-body-sm text-espresso focus:not-data-focus:outline-gray-400 data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gold-light/50"
                      />
                    </Field>
                    <Field>
                      <Label className="text-espresso/80 text-body-md font-medium">
                        Forma de pago
                      </Label>
                      <Description className="text-espresso/60 text-body-sm">
                        Actualmente solo aceptamos transferencia como método de pago fuera de
                        nuestra ciudad.
                      </Description>
                      <div className="relative">
                        <Select
                          name="metodo"
                          value={formData.metodo}
                          onChange={handleChange}
                          aria-label="Elige el método de pago"
                          className="mt-3 block w-full rounded-md border-b border-gray-400 shadow-md px-3 py-2 text-body-sm text-espresso focus:not-data-focus:outline-gray-400 data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gold-light/50"
                        >
                          <option value="transferencia">Transferencia</option>
                          <option value="efectivo">Efectivo</option>
                        </Select>
                      </div>
                    </Field>
                    <Field>
                      <Label className="text-espresso/80 text-body-md font-medium">
                        Nota adicional
                      </Label>
                      <Description className="text-espresso/60 text-body-sm">
                        (Opcional)
                      </Description>
                      <Textarea
                        name="nota"
                        placeholder="Ej: Puede dejarlo en recepción"
                        value={formData.nota}
                        onChange={handleChange}
                        className="mt-3 block w-full resize-none rounded-md border-b border-gray-400 shadow-md px-3 py-2 text-body-sm text-espresso focus:not-data-focus:outline-gray-400 data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gold-light/50"
                        rows={3}
                      />
                    </Field>
                    {rateLimitedUntil && (
                      <p className="text-sm text-red-500 mt-2">
                        Ya enviaste varios mensajes. Intenta de nuevo{" "}
                        {new Date(rateLimitedUntil).toLocaleTimeString()}.
                      </p>
                    )}
                  </Fieldset>
                  <div className="flex flex-col p-4 gap-4 mt-2">
                    <Button
                      type="submit"
                      disabled={items.length === 0}
                      className={clsx(
                        "flex items-center justify-center gap-2 rounded-md px-4 py-2 text-body-md font-medium text-white transition-colors",
                        items.length === 0
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 data-hover:bg-green-700 cursor-pointer",
                      )}
                    >
                      {/* Icono de WhatsApp */}
                      <svg
                        className="w-4 h-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      Enviar por WhatsApp
                    </Button>
                    <Button
                      onClick={handleCancelar}
                      className="rounded-md px-4 py-2 text-body-md font-medium text-espresso data-hover:bg-gray-100 cursor-pointer"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
