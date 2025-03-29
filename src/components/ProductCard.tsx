import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Product } from "@/lib/apollo/types";
import { cn } from "@/lib/utils";
import { useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";
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
  const router = useRouter();
  const isWishlistRoute = router.state.location.pathname === "/wishlist";

  const handleWishlistToggle = async () => {
    setIsLoading(true);
    try {
      await onToggleWishlist(product.id);
    } finally {
      setIsLoading(false);
    }
  };

  const getWishlistIcon = () => {
    if (isInWishlist && isWishlistRoute) {
      return isHovered ? (
        <Trash2 className="h-6 w-6 text-gray-500 transition-all duration-300" />
      ) : (
        <Heart className="h-6 w-6 fill-red-500 stroke-red-500 transition-all duration-300" />
      );
    }

    return (
      <Heart
        className={cn(
          "h-6 w-6 transition-all duration-300",
          isInWishlist
            ? "fill-red-500 stroke-red-500"
            : "fill-transparent stroke-gray-600 group-hover:stroke-gray-900"
        )}
      />
    );
  };

  const getTooltipContent = () => {
    if (!isInWishlist) return "Add to wishlist";
    return "Remove from wishlist";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="group relative overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 pt-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={handleWishlistToggle}
          disabled={isLoading}
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200 cursor-pointer"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>{getWishlistIcon()}</TooltipTrigger>
              <TooltipContent>{getTooltipContent()}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
