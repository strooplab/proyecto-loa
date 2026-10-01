"use client";

import { useState } from "react";
import Image from "next/image";
import { handleWhatsappContactForm } from "@/utils/sendContactWhatsappMessage";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Link from "next/link";
import { Field, Fieldset, Input, Label, Textarea } from "@headlessui/react";
import clsx from "clsx";

export default function ContactoPage() {
  const [contactData, setContactData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  }); // Inicialización de datos del form

  const isDisabled = contactData.nombre.trim() === "" || contactData.mensaje.trim() === "";
  const [intentoEnviar, setIntentoEnviar] = useState(false);
  const [rateLimitedUntil, setRateLimitedUntil] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleEnviarContacto = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIntentoEnviar(true);

    // Campos obligatorios
    if (!contactData.nombre || !contactData.mensaje) {
      return;
    }
    const result = await handleWhatsappContactForm(contactData);
    if (!result.success) {
      if (result.reason === "rate_limited") {
        setRateLimitedUntil(result.retryAt);
      } else {
        console.log("Error al enviar form");
      }
      return;
    }
    setRateLimitedUntil(null);
  };

  return (
    <div className="min-h-full">
      <main className="mx-auto mb-16">
        {/* BANNER PRINCIPAL */}
        <section className="w-full">
          <div className="h-50 md:h-70 lg:h-96 w-full bg-espresso relative overflow-hidden">
            <Image
              src="https://pub-415cf98523294c368075ea9561ec3752.r2.dev/Development/src/Banner1.jpg"
              alt="Contacto - Banner"
              width={1920}
              height={400}
              loading="eager"
              priority
              className="h-full w-full object-cover bg-espresso/10 opacity-40"
            />
            <div className="absolute inset-0 flex items-center justify-center mt-6 px-6 sm:px-12 lg:px-16">
              <div className="flex flex-col items-start max-w-6xl w-full mx-auto">
                <div className="mb-4">
                  <Breadcrumb />
                </div>
                <h1 className="text-4xl md:text-7xl font-sans font-semibold tracking-tight text-cream uppercase">
                  Contacto
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* INFORMACIÓN Y FORMULARIO */}
        <section className="mx-auto max-w-2xl md:max-w-7xl px-6 lg:px-12 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Columna Izquierda: Información de contacto y canales */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-espresso/60 font-semibold">
                  Hablemos
                </span>
                <h2 className="text-3xl font-sans font-bold tracking-tight text-espresso mt-1">
                  Ponte en contacto directamente con la diseñadora
                </h2>
                <p className="text-espresso/70 text-sm mt-3 leading-relaxed">
                  ¿Tienes preguntas sobre tallas, envíos o disponibilidad? Completa el formulario o
                  comunícate directamente a través de nuestros canales oficiales.
                </p>
              </div>

              <div className="space-y-6 border-t border-espresso/10 pt-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-espresso shrink-0 mt-1">
                    <span className="material-symbols-outlined text-xl leading-none">
                      alternate_email
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-espresso">Correo electrónico</h3>
                    <Link
                      href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                      className="text-sm text-espresso/70 mt-0.5"
                    >
                      {process.env.NEXT_PUBLIC_EMAIL}
                    </Link>
                  </div>
                </div>

                {/* Teléfono / WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-espresso shrink-0 mt-1">
                    <span className="material-symbols-outlined text-xl leading-none">
                      smartphone
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-espresso">Teléfono</h3>
                    <Link
                      href={`https://wa.me/+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                      className="text-sm text-espresso/70 mt-0.5"
                    >
                      {process.env.NEXT_PUBLIC_NUMBER}
                    </Link>
                  </div>
                </div>

                {/* Horarios */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-espresso shrink-0 mt-1">
                    <span className="material-symbols-outlined text-xl">schedule</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-espresso">Horarios de atención</h3>
                    <p className="text-sm text-espresso/70 mt-0.5">
                      Lunes a Viernes: 9:00 a.m. – 6:00 p.m.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Formulario de Contacto */}
            <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl border border-espresso/10 shadow-md">
              <div className="flex flex-col gap-2 pb-4 font-sans border-b border-espresso/10">
                <h2 className="font-bold text-espresso text-heading-md tracking-tight">
                  Tus datos
                </h2>
                <p className="text-espresso/60 text-body-sm">
                  Completa la info y contáctate con nosotros.
                </p>
              </div>
              <div className="w-full">
                <form onSubmit={handleEnviarContacto} noValidate>
                  <Fieldset className="space-y-6 rounded-xl px-2 py-4 sm:py-4">
                    <Field>
                      <Label className="flex text-espresso/80 text-body-md font-medium">
                        Nombre completo <p className="text-red-500">*</p>
                      </Label>
                      <Input
                        name="nombre"
                        placeholder="Nombres y apellidos"
                        value={contactData.nombre}
                        onChange={handleChange}
                        className={clsx(
                          "mt-3 block w-full rounded-md border-b shadow-md px-3 py-3 text-body-sm text-espresso",
                          intentoEnviar && !contactData.nombre
                            ? "border-red-500 focus:outline-red-500"
                            : "border-gray-400 focus:not-data-focus:outline-gray-400 data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gold-light/50",
                        )}
                      />
                    </Field>

                    <Field>
                      <Label className="flex text-espresso/80 text-body-md font-medium">
                        Email
                      </Label>
                      <Input
                        name="email"
                        placeholder="tucorreo@ejemplo.com"
                        value={contactData.email}
                        onChange={handleChange}
                        className="mt-3 block w-full rounded-md border-b shadow-md px-3 py-3 text-body-sm text-espresso border-gray-400 focus:not-data-focus:outline-gray-400 data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gold-light/50"
                      />
                    </Field>

                    <Field>
                      <Label className="flex text-espresso/80 text-body-md font-medium">
                        Asunto
                      </Label>
                      <Input
                        name="asunto"
                        placeholder="¿Tienes alguna duda?"
                        value={contactData.asunto}
                        onChange={handleChange}
                        className="mt-3 block w-full rounded-md border-b shadow-md px-3 py-3 text-body-sm text-espresso border-gray-400 focus:not-data-focus:outline-gray-400 data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gold-light/50"
                      />
                    </Field>

                    <Field>
                      <Label className="flex text-espresso/80 text-body-md font-medium">
                        Mensaje <p className="text-red-500">*</p>
                      </Label>
                      <Textarea
                        name="mensaje"
                        placeholder="Escribe tu mensaje aquí..."
                        value={contactData.mensaje}
                        onChange={handleChange}
                        className={clsx(
                          "mt-3 block w-full resize-none rounded-md border-b shadow-md px-3 py-2 text-body-sm text-espresso",
                          intentoEnviar && !contactData.mensaje
                            ? "border-red-500 focus:outline-red-500"
                            : "border-gray-400 focus:not-data-focus:outline-gray-400 data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gold-light/50",
                        )}
                        rows={3}
                      />
                    </Field>
                    {rateLimitedUntil && (
                      <p className="text-sm text-red-500 mt-2">
                        Ya enviaste un mensaje recientemente. Intenta de nuevo{" "}
                        {new Date(rateLimitedUntil).toLocaleTimeString()}.
                      </p>
                    )}
                  </Fieldset>

                  <button
                    type="submit"
                    disabled={isDisabled}
                    className={clsx(
                      "flex items-center justify-center gap-2 rounded-md w-full px-4 py-2 text-body-md font-medium text-white transition-colors mt-4",
                      !isDisabled
                        ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                        : "disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400",
                    )}
                  >
                    {/* Icono de WhatsApp */}
                    <svg
                      className="w-4 h-4 fill-current shrink-0"
                      xmlns="http://www.3worldw3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    Enviar por WhatsApp
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
