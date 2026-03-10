import { create } from "zustand";
import type { CartItem, MenuItem, User } from "@/types";

interface CartStore {
  items: CartItem[];
  addItem: (menuItem: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateNote: (itemId: string, note: string) => void;
  clearCart: () => void;
  subtotal: () => number;
  tax: () => number;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (menuItem) =>
    set((state) => {
      const existing = state.items.find((i) => i.menuItem.id === menuItem.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.menuItem.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { menuItem, quantity: 1, specialNote: "" }] };
    }),
  removeItem: (itemId) =>
    set((state) => ({ items: state.items.filter((i) => i.menuItem.id !== itemId) })),
  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      items: quantity <= 0
        ? state.items.filter((i) => i.menuItem.id !== itemId)
        : state.items.map((i) => (i.menuItem.id === itemId ? { ...i, quantity } : i)),
    })),
  updateNote: (itemId, note) =>
    set((state) => ({
      items: state.items.map((i) => (i.menuItem.id === itemId ? { ...i, specialNote: note } : i)),
    })),
  clearCart: () => set({ items: [] }),
  subtotal: () => get().items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0),
  tax: () => get().subtotal() * 0.05,
  total: () => get().subtotal() + get().tax(),
  itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
}));
