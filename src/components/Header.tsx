import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/use-wishlist";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";

export default function Header() {
  const { items } = useWishlist();
  const wishlistCount = items.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">My Wishlist</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="relative cursor-pointer"
              >
                <Heart className="h-6 w-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
