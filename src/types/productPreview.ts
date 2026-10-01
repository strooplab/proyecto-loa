/**
 * @property {string} nombre - Display categoria
 * @property {string} slug - Identificador entre variables e images, format = blusa-cuadros
 * @property {number} orden - Orden en un carrusel
 */
export interface Categoria {
  id: string;
  nombre: string;
  slug: string;
  orden: number;
}

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
  precio: number;
  descuento: number | null;
  stock: number;
  imagenes: string[];
  colores: string[];
  tallas: string[];
  destacado: boolean;
}
