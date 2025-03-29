import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FilterOptions {
  category?: number;
  priceRange: [number, number];
  sortBy: string;
}

interface FiltersStore {
  filters: FilterOptions;
  setCategory: (category: number | undefined) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: string) => void;
  resetFilters: (minPrice: number, maxPrice: number) => void;
}

const DEFAULT_SORT = "featured";

export const useFilters = create<FiltersStore>()(
  persist(
    (set) => ({
      filters: {
        category: undefined,
        priceRange: [1, 110],
        sortBy: DEFAULT_SORT,
      },
      setCategory: (category) =>
        set((state) => ({
          filters: {
            ...state.filters,
            category,
          },
        })),
      setPriceRange: (range) =>
        set((state) => ({
          filters: {
            ...state.filters,
            priceRange: range,
          },
        })),
      setSortBy: (sort) =>
        set((state) => ({
          filters: {
            ...state.filters,
            sortBy: sort,
          },
        })),
      resetFilters: (minPrice, maxPrice) =>
        set({
          filters: {
            category: undefined,
            priceRange: [minPrice, maxPrice],
            sortBy: DEFAULT_SORT,
          },
        }),
    }),
    {
      name: "filters-storage",
    }
  )
);
