import React from "react";
import { Heart } from "lucide-react";
import { WishListItem } from "@/types/product_types";
import { Button } from "@/components/ui/button";

// TypeScript interfaces
interface SkuDefinition {
  price: string;
  promotionPrice: string;
}

interface Sku {
  def: SkuDefinition;
}

interface Item {
  itemId: string;
  title: string;
  sales: string;
  itemUrl: string;
  image: string;
  images?: string[];
  video: string;
  sku: Sku;
}

interface Review {
  averageStar: string;
  averageStarRate: string;
}

export interface Product {
  item: Item;
  review: Review;
}

interface ProductImageSearchCardProps {
  product: any;
  onAddToCart?: (product: Product) => void;
  onViewProduct?: (product: Product) => void;
  onAddToWishlist?: (product: WishListItem) => void;
  wishListItems: number[];
  formatPrice?: (price: string) => string;
}

const ProductImageSearchCard: React.FC<ProductImageSearchCardProps> = ({
  product,
  onAddToWishlist = () => {},
  wishListItems = [],
  formatPrice = (price) => `$${price}`,
}) => {
  const originalPrice = parseFloat(product.item.sku.def.price);
  const promotionalPrice = parseFloat(product.item.sku.def.promotionPrice);
  const savingsAmount = originalPrice - promotionalPrice;
  const savingsPercentage = Math.round((savingsAmount / originalPrice) * 100);
  const hasDiscount = savingsPercentage > 0;
  const isInWishlist = wishListItems.includes(product.item.itemId);

  const onViewProduct = () =>
    window.open(`/product?itemId=${product.item.itemId}`);

  return (
    <div className="group relative">
      <div className="relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 p-1 hover:shadow">
        {/* Discount Tag */}
        {hasDiscount && (
          <div className="absolute top-4 left-4 z-[5]">
            <div className="bg-[#131920] dark:bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
              {savingsPercentage}% OFF
            </div>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          className="absolute top-4 right-4 z-[5] p-1 rounded-full"
          onClick={() => onAddToWishlist(product.item)}>
          {isInWishlist ? (
            <Heart
              className="w-5 h-5 text-red-500 cursor-pointer"
              fill="currentColor"
            />
          ) : (
            <Heart className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors" />
          )}
        </button>

        {/* Image */}
        <div
          className="aspect-square bg-gray-50 flex items-center justify-center rounded-md overflow-hidden"
          onClick={onViewProduct}>
          <img
            referrerPolicy="no-referrer"
            src={`${product.item.image}`}
            alt={product.item.title}
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>

        {/* Content */}
        <div className="p-2">
          <div className="mb-1">
            <h3
              className="text-[14px] font-medium text-gray-900 dark:text-gray-100 line-clamp-2 mb-2"
              onClick={onViewProduct}>
              {product.item.title}
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {formatPrice(
                    product.item.sku.def.promotionPrice ||
                      product.item.sku.def.price
                  )}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.item.sku.def.price)}
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ★{" "}
                  {product.review?.averageStar &&
                  product.review?.averageStar !== "0.0"
                    ? product.review?.averageStar
                    : "New"}
                </span>
                <span className="text-xs text-gray-500">
                  {product.item.sales} sold
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <Button className="w-full " onClick={onViewProduct}>
              View Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageSearchCard;
