// @/utils/cartKey.ts
export const cartKey = (id: string, talla: string, color: string | string[]) =>
  `${id}-${talla}-${Array.isArray(color) ? color.join("|") : color}`;
