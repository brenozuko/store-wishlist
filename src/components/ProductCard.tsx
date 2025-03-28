import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Product } from "@/lib/apollo/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
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
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlistToggle = async () => {
    setIsLoading(true);
    try {
      await onToggleWishlist(product.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="group relative overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={handleWishlistToggle}
          disabled={isLoading}
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200"
        >
          <Heart
            className={cn(
              "h-6 w-6 transition-all duration-300",
              isInWishlist
                ? "fill-red-500 stroke-red-500"
                : "fill-transparent stroke-gray-600 group-hover:stroke-gray-900"
            )}
          />
        </button>

        <CardHeader className="p-0">
          <motion.div
            className="relative aspect-square w-full"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          <p className="text-sm text-muted-foreground mb-2">
            {product.category?.name}
          </p>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">
            {product.title}
          </h3>
          <p className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
