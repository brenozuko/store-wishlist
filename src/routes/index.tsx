import { ProductCard } from "@/components/ProductCard";
import { GET_PRODUCTS } from "@/lib/apollo/queries";
import { Product } from "@/lib/apollo/types";
import { useQuery } from "@apollo/client";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: () => <Index />,
});

const Index = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
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
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">
        Find your next favorite product
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onToggleWishlist={toggleWishlist}
            isInWishlist={wishlist.includes(product.id)}
          />
        ))}
      </div>
    </div>
  );
};
