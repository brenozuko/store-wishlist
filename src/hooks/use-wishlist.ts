import { Product } from "@/lib/apollo/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  items: Product[];
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (product: Product) => void;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isInWishlist: (productId: number) =>
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
