import React from "react";
import { Button } from "../ui/button";
import { ProductCardProps } from "@/types/product_types";

const DealsCard: React.FC<any> = ({ item }) => {
  const originalPrice = parseFloat(item?.item?.sku?.def?.price);
  const promotionalPrice = parseFloat(item?.item?.sku?.def?.promotionPrice);
  const savingsAmount = originalPrice - promotionalPrice;
  const savingsPercentage = Math.round((savingsAmount / originalPrice) * 100);

  return (
    <div className="bg-white relative dark:bg-[#131920] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
      {/* Image Section */}
      <div className="relative flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-2">
        <img
          src={item?.item?.image}
          alt={item?.item?.title}
          className="w-[70%] h-[20vh] object-cover"
        />
        {savingsPercentage > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 dark:bg-red-600 text-white px-2 py-1 rounded-md text-[10px]">
            {savingsPercentage}% OFF
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-[12px] line-clamp-1 font-semibold mb-2 text-gray-900 dark:text-gray-100">
          {item?.item?.title}
        </h3>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold text-gray-900 dark:text-gray-100">
            ${promotionalPrice.toFixed(2)}
          </span>
          {originalPrice !== promotionalPrice && (
            <span className="text-[9px] text-gray-500 dark:text-gray-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Savings */}
        {savingsPercentage > 0 ? (
          <div className="text-green-500 dark:text-green-400 text-[10px] mb-2">
            Save ${savingsAmount.toFixed(2)} ({savingsPercentage}%)
          </div>
        ) : (
          <br />
        )}

        {/* Action Button */}
        <a href={`/product?itemId=${item?.item?.itemId}`}>
          <Button className="mt-2 w-full" size="xs">
            View Product
          </Button>
        </a>
      </div>
    </div>
  );
};

export default DealsCard;
