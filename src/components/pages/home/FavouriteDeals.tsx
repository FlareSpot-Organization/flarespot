import { ChevronRight } from "lucide-react";
import React from "react";
import { dealsOfDay, favorites } from "@/utils/Content";
import ProductCard2 from "./product-cards/ProductCard2";

const FavouriteDeals: React.FC = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6">
      <div className="flex sm:flex-row flex-col sm:space-x-8 space-x-0">
        {/* Deals of the Day Section */}
        <div className="sm:w-1/2 w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-700">
              deals of the day
            </h2>
            <a
              href="#"
              className="text-xs text-gray-500 flex items-center hover:text-gray-700 transition-colors">
              view all <ChevronRight className="w-3 h-3 ml-0.5" />
            </a>
          </div>
          <div className="grid grid-cols-3 sm:gap-6 gap-2">
            {dealsOfDay.map((product) => (
              <ProductCard2 key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Fresh-picked Favorites Section */}
        <div className="sm:w-1/2 w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-700">
              fresh-picked favorites
            </h2>
            <a
              href="#"
              className="text-xs text-gray-500 flex items-center hover:text-gray-700 transition-colors">
              view all <ChevronRight className="w-3 h-3 ml-0.5" />
            </a>
          </div>
          <div className="grid grid-cols-3 sm:gap-6 gap-2">
            {favorites.map((product) => (
              <ProductCard2 key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavouriteDeals;
