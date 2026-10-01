// @/store/useCarrito.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartState } from "@/types/cartItem";
import { cartKey } from "@/utils/cartKey";

let resetTimer: ReturnType<typeof setTimeout> | undefined;

export const useCarrito = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isItemAdded: false,

      // Añadir item o aumentar cantidad del item existente en el carrito
      addItem: (newItem) => {
        const newKey = cartKey(newItem.id, newItem.talla, newItem.color);
        set((state) => {
          const idx = state.items.findIndex((i) => cartKey(i.id, i.talla, i.color) === newKey);

          if (idx > -1) {
            const items = state.items.map((item, n) =>
              n === idx ? { ...item, cantidad: item.cantidad + newItem.cantidad } : item,
            );
            return { items, isItemAdded: true };
          }
          return { items: [...state.items, newItem], isItemAdded: true };
        });

        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => set({ isItemAdded: false }), 600);
      },
      // Eliminar de carrito
      removeItem: (id, talla, color) => {
        const key = cartKey(id, talla, color);
        set((state) => ({
          items: state.items.filter((item) => cartKey(item.id, item.talla, item.color) !== key),
        }));
      },

      // Aumentar cantidad del producto a pedir
      updateCantidad: (id, talla, color, cantidad) => {
        const key = cartKey(id, talla, color);
        set((state) => ({
          items: state.items.map((item) =>
            cartKey(item.id, item.talla, item.color) === key
              ? { ...item, cantidad: Math.max(1, cantidad || 0) }
              : item,
          ),
        }));
      },

      // Vaciar carrito
      clearCart: () => set({ items: [] }),

      // Obtener el total de productos en el carrito
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.cantidad, 0);
      },

      // Calcular total acumulado ($)
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.precio * item.cantidad, 0);
      },

      // Resetear animación manualmente
      resetAnimation: () => set({ isItemAdded: false }),
    }),
    {
      name: "loa-cart-storage",
      version: 1,
      partialize: (state) => ({ items: state.items }),
      migrate: (persisted) => {
        // Fix: Corregir duplicados del carrito
        const old = persisted as { items?: CartState["items"] };
        const merged = new Map<string, CartState["items"][number]>();
        for (const it of old.items ?? []) {
          const k = cartKey(it.id, it.talla, it.color);
          const prev = merged.get(k);
          merged.set(k, prev ? { ...prev, cantidad: prev.cantidad + it.cantidad } : it);
        }
        return { items: [...merged.values()] } as CartState;
      },
    },
  ),
);
