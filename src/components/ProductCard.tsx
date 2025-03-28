import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Product } from "@/lib/apollo/types";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onToggleWishlist: (productId: number) => void;
  isInWishlist: boolean;
}

export function ProductCard({
  product,
  onToggleWishlist,
  isInWishlist,
}: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleWishlistToggle = async () => {
    setIsLoading(true);
    try {
      await onToggleWishlist(product.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <img
            src={product.images[0]?.url || "/placeholder.png"}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
        <p className="text-2xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          variant={isInWishlist ? "destructive" : "default"}
          className="w-full"
          onClick={handleWishlistToggle}
          disabled={isLoading}
        >
          {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </Button>
      </CardFooter>
    </Card>
  );
}
