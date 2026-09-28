// @/types/sendWhatsapp.ts

/**
 * @property {boolean} success - Resultado de la api
 */
export type WhatsappSendResult =
  | { success: true }
  | { success: false; reason?: "rate_limited"; retryAt: number };
