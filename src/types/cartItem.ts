// @/types/cartItem.ts

export interface CartItem {
  id: string;
  categoria_slug: string;
  nombre: string;
  precio: number;
  descripcion?: string;
  imagen: string; // Imagen[0]
  color: string;
  talla: string;
  cantidad: number;
  slug: string;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, talla: string, color: string) => void;
  updateCantidad: (id: string, talla: string, color: string, cantidad: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  resetAnimation: () => void;
  isItemAdded: boolean;
}
