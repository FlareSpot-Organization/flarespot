import React, { useState } from "react";

const ProductCard = ({ product }: { product: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (priceStr: string) => {
    return Number(priceStr?.replace("$", ""));
  };

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm my-2 cursor-pointer hover:shadow-lg">
      {/* Product Image with zoom and view button */}
      <div
        className="relative aspect-square overflow-hidden rounded-lg mb-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <div
          className={`w-full h-full transform transition-transform duration-700 ease-in-out ${
            isHovered ? "scale-110" : "scale-100"
          }`}>
          <img
            src={product.product_photo}
            alt={product.product_title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* View Button - Only visible on hover */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}>
          <button className="px-6 py-1.5 text-[11px] bg-black/90 hover:bg-black/70 text-white rounded-full transition-colors">
            View Item
          </button>
        </div>

        {/* Items Left Badge */}
        {product.sales_volume && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
            Only {product.sales_volume} left
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-orange-500">
              ${formatPrice(product.product_price).toFixed(1)}
            </span>
            <span className="text-xs text-gray-500 line-through">
              ${formatPrice(product.product_original_price).toFixed(1)}
            </span>
          </div>
          {product.is_best_seller && (
            <span className="text-xs font-semibold text-green-600">
              Best Seller
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 rounded-full"
              style={{
                width: `${calculateDiscount(
                  formatPrice(product.product_original_price),
                  formatPrice(product.product_price)
                )}%`,
              }}
            />
          </div>
          <span className="text-sm font-medium text-gray-700">
            -
            {calculateDiscount(
              formatPrice(product.product_original_price),
              formatPrice(product.product_price)
            ) || 5}
            %
          </span>
        </div>

        <h3 className="text-sm font-medium  line-clamp-1">
          {product.product_title}
        </h3>

        <div className="flex items-center gap-1">
          {Array(5)
            ?.fill(null)
            ?.map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < (product.product_star_rating || 0)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          {product.product_num_reviews && (
            <span className="text-sm text-gray-600">
              ({product.product_num_reviews})
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
