import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Welcome to Store Wishlist</h2>
      <p>Your personal shopping companion</p>
    </div>
  ),
});
