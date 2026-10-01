/**
 * @property {string} nombre - Display categoria
 * @property {string} slug - Identificador entre variables e images, format = blusa-cuadros
 * @property {number} orden - Orden en un carrusel
 */
export default interface Categoria {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  orden: number;
  items?: number;
}
