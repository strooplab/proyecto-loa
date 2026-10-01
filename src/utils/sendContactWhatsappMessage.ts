// @/utils/sendContactWhatsappMessage.ts
import { WhatsappSendResult } from "@/types/sendWhatsapp";
import { verificarContacto } from "@/actions/verificarContacto";

export interface ContactFormData {
  nombre: string;
  email: string | null;
  asunto: string | null;
  mensaje: string;
}

export const handleWhatsappContactForm = async (
  formData: ContactFormData,
): Promise<WhatsappSendResult> => {
  // Fix: Se abre antes del await para que el navegador no la bloquee
  const ventana = window.open("", "_blank");

  try {
    const r = await verificarContacto();
    if (!r.ok) {
      ventana?.close();
      return { success: false, reason: "rate_limited", retryAt: r.retryAt };
    }
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
    if (ventana) ventana.location.href = url;
    else window.location.href = url;

    return { success: true };
  } catch (e) {
    ventana?.close();
    console.error("error trying to send whatsapp message: ", e);
    return { success: false, reason: "error" };
  }
};
