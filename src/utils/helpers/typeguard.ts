import { Product, Review } from "@/types/public";

// Type guard functions to help TypeScript understand our data
export function isProduct(item: any): item is Product {
  return (
    item && typeof item.price === "number" && typeof item.category === "string"
  );
}

export function isReview(item: any): item is Review {
  return (
    item &&
    typeof item.content === "string" &&
    typeof item.isFollowUp === "boolean"
  );
}

// Helper function to determine if a field is a product or review safely
export function determineDisplayType<T>(
  selectedTab: string,
  item: T
): "product" | "review" {
  if (selectedTab === "published") return "review";
  if (selectedTab === "pending") return "product";

  // Fallback using type checking
  if (isProduct(item)) return "product";
  if (isReview(item)) return "review";

  // If all else fails
  return "product";
}
