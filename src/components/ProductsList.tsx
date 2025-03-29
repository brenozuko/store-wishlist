import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/lib/apollo/types";
import { Suspense, lazy } from "react";

interface ProductsListProps {
  products: Product[];
  isLoading: boolean;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
}

const LazyProductCard = lazy(() =>
  import("@/components/ProductCard").then((module) => ({
    default: module.ProductCard,
  }))
);

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <Skeleton className="aspect-square w-full" />
      <div className="p-6">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-8 w-32" />
      </div>
    </div>
  );
}

export function ProductsList({
  products,
  isLoading,
  onToggleWishlist,
  isInWishlist,
}: ProductsListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(6)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {products.map((product: Product) => (
        <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
          <LazyProductCard
            product={product}
            onToggleWishlist={() => onToggleWishlist(product)}
            isInWishlist={isInWishlist(product.id)}
          />
        </Suspense>
      ))}
    </div>
  );
}
