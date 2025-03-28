import type { Product } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  items: Product[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isInWishlist: (productId: string) =>
        get().items.some((item) => item.id === productId),
      toggleWishlist: (product: Product) =>
        set((state) => {
          const isInWishlist = state.items.some(
            (item) => item.id === product.id
          );
          if (isInWishlist) {
            return {
              items: state.items.filter((item) => item.id !== product.id),
            };
          }
          return {
            items: [...state.items, product],
          };
        }),
    }),
    {
      name: "wishlist-storage",
    }
  )
);
