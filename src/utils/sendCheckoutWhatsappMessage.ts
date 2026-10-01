// @/utils/sendCheckoutWhatsappMessage.ts
import { CartItem } from "@/types/cartItem";
import { WhatsappSendResult } from "@/types/sendWhatsapp";
import formatPrice from "@/utils/formatPrice";
import { crearPedido } from "@/actions/crearPedido";

export interface CheckoutFormData {
  nombre: string;
  celular: string;
  ciudad: string;
  direccion: string;
  barrio?: string;
  metodo: string;
  nota?: string;
}

// Generar link de WhatsApp con los datos del carrito y del formulario
export const handleWhatsAppCheckout = async (
  items: CartItem[],
  formData: CheckoutFormData,
): Promise<WhatsappSendResult> => {
  // Fix: Se abre antes del await para que el navegador no la bloquee
  const ventana = window.open("", "_blank");

  try {
    const r = await crearPedido(
      items.map((i) => ({
        id: i.id,
        talla: i.talla,
        color: i.color,
        cantidad: i.cantidad,
      })),
      { ...formData, barrio: formData.barrio ?? "", nota: formData.nota ?? "" },
    );

    if (!r.ok) {
      ventana?.close();
      return { success: false, reason: "rate_limited", retryAt: r.retryAt };
    }

    let mensaje = `¡Hola! Quiero hacer el pedido #${r.id.slice(0, 8)} desde su tienda LOA:\n\n`;
    mensaje += "*Mis datos de envío:*\n";
    mensaje += `• *Nombre:* ${formData.nombre}\n`;
    mensaje += `• *Celular:* ${formData.celular}\n`;
    mensaje += `• *Ciudad:* ${formData.ciudad}\n`;
    mensaje += `• *Dirección:* ${formData.direccion}${formData.barrio ? ` (${formData.barrio})` : ""}\n`;
    mensaje += `• *Método de pago:* ${formData.metodo}\n`;
    if (formData.nota) mensaje += `• *Detalles adicionales:* ${formData.nota}\n`;

    mensaje += "\n*Productos:*\n";
    r.lineas.forEach((l) => {
      mensaje += `- *${l.nombre}* (Talla: ${l.talla || "N/A"}, Color: ${l.color || "N/A"}) x${l.cantidad} - ${formatPrice(l.precio * l.cantidad)}\n`;
    });
    mensaje += `\n*Subtotal:* ${formatPrice(r.subtotal)}\n`;
    mensaje += "Estoy pendiente para coordinar el pago y el envío. ¡Muchas gracias!";

    const url = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    if (ventana) ventana.location.href = url;
    else window.location.href = url;

    return { success: true };
  } catch (e) {
    ventana?.close();
    console.error("Error creando el pedido:", e);
    return { success: false, reason: "error" };
  }
};
