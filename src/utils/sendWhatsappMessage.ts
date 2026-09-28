// @/utils/SendWhatsAppMessage.ts

import { WhatsappSendResult } from "@/types/sendWhatsapp";
export async function SendWhatsAppMessage(): Promise<
  WhatsappSendResult & {
    url?: string;
  }
> {
  const res = await fetch("/api/ratelimit", {
    method: "POST",
    body: JSON.stringify({ type: "direct" }),
  });
  const data = await res.json();
  const success = data.success;
  const reset = data.reset;

  if (!success) {
    return { success: false, reason: "rate_limited", retryAt: reset };
  }

  try {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const defaultMessage = "¡Hola! me gustaría recibir más información sobre las prendas.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    return { success: true, url };
  } catch (e) {
    console.error("error trying to send whatsapp message: ", e);
    return { success: false, retryAt: reset };
  }
}
