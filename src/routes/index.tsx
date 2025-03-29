import { Loader } from "@/components/Loader";
import { ProductCard } from "@/components/ProductCard";
import { useWishlist } from "@/hooks/use-wishlist";
import { GET_PRODUCTS } from "@/lib/apollo/queries";
import { Product } from "@/lib/apollo/types";
import { useQuery } from "@apollo/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <Index />,
});

const Index = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const { isInWishlist, toggleWishlist } = useWishlist();

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
        Showing {data?.products.length || 0} of {data?.products.length || 0}{" "}
        products
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {data?.products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onToggleWishlist={() => toggleWishlist(product)}
            isInWishlist={isInWishlist(product.id)}
          />
        ))}
      </div>
    </div>
  );
};
