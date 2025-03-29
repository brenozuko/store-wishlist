import { FilterSidebar } from "@/components/FilterSidebar";
import { Loader } from "@/components/Loader";
import { ProductCard } from "@/components/ProductCard";
import { useFilters } from "@/hooks/use-filters";
import { useWishlist } from "@/hooks/use-wishlist";
import { GET_PRODUCTS, ProductsFilterInput } from "@/lib/apollo/queries";
import { Product } from "@/lib/apollo/types";
import { useQuery } from "@apollo/client";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef } from "react";

export const Route = createFileRoute("/")({
  component: () => <Index />,
});

const Index = () => {
  const { filters, setPriceRange } = useFilters();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const initialUpdateDone = useRef(false);

  const filterVariables: ProductsFilterInput = useMemo(
    () => ({
      categoryId: filters.category,
      price_min: filters.priceRange[0],
      price_max: filters.priceRange[1],
    }),
    [filters.category, filters.priceRange]
  );

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: filterVariables,
  });

  const { minPrice, maxPrice, filteredProducts } = useMemo(() => {
    if (!data?.products?.length) {
      return { minPrice: 0, maxPrice: 10000, filteredProducts: [] };
    }

    const products = [...data.products];
    const prices = products.map((product: Product) => product.price);
    const minPrice = Math.floor(Math.min(...prices));
    const maxPrice = Math.ceil(Math.max(...prices));

    // Apply sorting
    switch (filters.sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        products.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        products.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return { minPrice, maxPrice, filteredProducts: products };
  }, [data?.products, filters.sortBy]);

  useEffect(() => {
    if (data?.products?.length && !initialUpdateDone.current) {
      setPriceRange([minPrice, maxPrice]);
      initialUpdateDone.current = true;
    }
  }, [data?.products, minPrice, maxPrice, setPriceRange]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-destructive">
          Error loading products: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        Find your next favorite product
      </h1>
      <p className="text-muted-foreground mb-6 sm:mb-8">
        Showing {filteredProducts.length} of {data?.products.length || 0}{" "}
        products
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        <aside>
          <FilterSidebar minPrice={minPrice} maxPrice={maxPrice} />
        </aside>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onToggleWishlist={() => toggleWishlist(product)}
              isInWishlist={isInWishlist(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
