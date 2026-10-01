// @/utils/SendWhatsAppMessage.ts

import { WhatsappSendResult } from "@/types/sendWhatsapp";
import { verificarMensaje } from "@/actions/verificarMensajeDirecto";

export async function SendWhatsAppMessage(): Promise<
  WhatsappSendResult & {
    url?: string;
  }
> {
  // Fix: Se abre antes del await para que el navegador no la bloquee
  const ventana = window.open("", "_blank");

  try {
    const r = await verificarMensaje();
    if (!r.ok) {
      ventana?.close();
      return { success: false, reason: "rate_limited", retryAt: r.retryAt };
    }
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const defaultMessage = "¡Hola! me gustaría recibir más información sobre las prendas.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    return { success: true, url };
  } catch (e) {
    console.error("error trying to send whatsapp message: ", e);
    return { success: false, reason: "error" };
  }
}
