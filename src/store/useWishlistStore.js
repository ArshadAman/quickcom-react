import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [], // Array of product objects
      
      toggleItem: (product) => {
        const { items } = get();
        const exists = items.find((item) => item.id === product.id);
        
        if (exists) {
          // Remove if it exists
          set({ items: items.filter((item) => item.id !== product.id) });
        } else {
          // Add if it doesn't
          set({ items: [...items, product] });
        }
      },
      
      removeItem: (productId) => {
        const { items } = get();
        set({ items: items.filter((item) => item.id !== productId) });
      },
      
      clearWishlist: () => set({ items: [] }),
      
      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      }
    }),
    {
      name: 'pksupermart-wishlist-storage', // unique name
    }
  )
);
