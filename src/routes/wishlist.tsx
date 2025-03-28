import { ProductCard } from "@/components/ProductCard";
import { useWishlist } from "@/hooks/use-wishlist";
import { Product } from "@/lib/apollo/types";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/wishlist")({
  component: () => <Wishlist />,
});

const Wishlist = () => {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Your wishlist is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onToggleWishlist={() => {}}
            isInWishlist={true}
          />
        ))}
      </div>
    </div>
  );
};
