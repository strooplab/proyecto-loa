export type TallaItem = {
  nombre: string;
  orden: number;
};

export type ColorItem = {
  nombre: string;
  slug: string;
  hex: string;
};

/**
 * @property {number} stock - Cantidad de productos disponibles
 * @property {string[]} imagenes - Debe haber al menos una imágen asociada al producto
 */
export interface Producto {
  id: string;
  categoria_id: string;
  categoria_slug: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  detalles?: string | null;
  precio: number;
  descuento: number | null;
  stock: number;
  imagenes: string[];
  dimensiones?: string | null;
  colores: ColorItem[];
  tallas: TallaItem[];
  destacado: boolean;
  orden?: number;
  creado_en?: string;
}
