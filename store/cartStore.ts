"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type AddPayload = {
  id: string;
  name: string;
  price: number;
};

type CartState = {
  items: CartItem[];
  lastAddedItemId: string | null;
  addFeedbackOpen: boolean;
  addItem: (item: AddPayload) => void;
  closeAddFeedback: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      lastAddedItemId: null,
      addFeedbackOpen: false,
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
              lastAddedItemId: item.id,
              addFeedbackOpen: true,
            };
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }],
            lastAddedItemId: item.id,
            addFeedbackOpen: true,
          };
        }),
      closeAddFeedback: () => set({ addFeedbackOpen: false }),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "yori-cart-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        lastAddedItemId: state.lastAddedItemId,
      }),
    }
  )
);
