// @/utils/sendContactWhatsappMessage.ts
import { WhatsappSendResult } from "@/types/sendWhatsapp";

export interface ContactFormData {
  nombre: string;
  email: string | null;
  asunto: string | null;
  mensaje: string;
}

export const handleWhatsappContactForm = async (
  formData: ContactFormData,
): Promise<WhatsappSendResult> => {
  const res = await fetch("/api/ratelimit", {
    method: "POST",
    body: JSON.stringify({ type: "contact" }),
  });
  const { success, reset } = await res.json();

  if (!success) {
    return { success: false, reason: "rate_limited", retryAt: reset };
  }

  try {
    let mensaje = `Hola, mi nombre es *${formData.nombre}* `;
    if (formData.email) {
      mensaje += `\nEmail: ${formData.email}`;
    }
    if (formData.asunto) {
      mensaje += `\nAsunto: ${formData.asunto}`;
    }
    mensaje += `\n${formData.mensaje}`;

    const telefonoNegocio = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const url = `https://wa.me/${telefonoNegocio}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  } catch (e) {
    console.error("error trying to send whatsapp message: ", e);
  }
  return { success: true };
};
