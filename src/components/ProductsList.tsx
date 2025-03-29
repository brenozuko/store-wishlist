import { Loader } from "@/components/Loader";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/lib/apollo/types";

interface ProductsListProps {
  products: Product[];
  isLoading: boolean;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
}

export function ProductsList({
  products,
  isLoading,
  onToggleWishlist,
  isInWishlist,
}: ProductsListProps) {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {products.map((product: Product) => (
        <ProductCard
          key={product.id}
          product={product}
          onToggleWishlist={() => onToggleWishlist(product)}
          isInWishlist={isInWishlist(product.id)}
        />
      ))}
    </div>
  );
}
