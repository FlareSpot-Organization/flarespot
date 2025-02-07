import { useState } from "react";

const ProductCard = ({ item }: { item: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Safely extract pricing information
  const originalPrice =
    item?.item?.sku?.def?.price ?? item?.sku?.def?.price ?? 0;
  const promotionPrice = item?.item?.sku?.def?.promotionPrice ?? originalPrice;

  const calculateDiscount = (original: number, current: number) => {
    if (!original || current >= original) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  const discountPercentage = calculateDiscount(originalPrice, promotionPrice);

  const renderSellingPoints = () => {
    const sellingPoints = item?.sellingPoints ?? [];
    return sellingPoints
      .map((point: any) => {
        if (point?.image) {
          return (
            <img
              key={point?.id}
              src={point?.image?.replace("//", "https://")}
              alt="Selling Point"
              className="h-4 w-auto object-contain"
            />
          );
        }
        if (point?.name) {
          return (
            <span
              key={point?.id}
              className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
              {point?.name}
            </span>
          );
        }
        return null;
      })
      .filter(Boolean);
  };

  // Safely get star rating
  const averageStarRate = item?.item?.averageStarRate ?? item?.averageStarRate;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full max-w-xs mx-auto">
      {/* Product Image with zoom and view button */}
      <div
        className="relative aspect-square rounded-lg mb-3 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <div
          className={`w-full h-full transform transition-transform duration-700 ease-in-out ${
            isHovered ? "scale-110" : "scale-100"
          }`}>
          <img
            src={`${item?.item?.image}_480x480.png_.webp`}
            alt={item?.item?.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* View Button - Only visible on hover */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black/30 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}>
          <a
            href={`https:${item?.itemUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 text-sm bg-white hover:bg-gray-100 text-black rounded-full transition-colors">
            View Item
          </a>
        </div>

        {/* Sales Badge */}
        {item?.sales > 0 && (
          <div className="absolute bottom-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
            {item?.sales} sold
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-grow flex flex-col justify-between space-y-2">
        <div>
          <h2 className="text-sm font-semibold line-clamp-2 mb-2">
            {item?.item?.title}
          </h2>

          <div className="flex justify-between items-baseline mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-orange-500">
                ${promotionPrice.toFixed(2)}
              </span>
              {originalPrice !== promotionPrice && (
                <span className="text-xs text-gray-500 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {item?.type === "natural" && (
              <span className="text-xs font-semibold text-green-600">
                Natural
              </span>
            )}
          </div>

          {discountPercentage > 0 && (
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{
                    width: `${discountPercentage}%`,
                  }}
                />
              </div>
              <span className="text-sm font-medium text-gray-700">
                -{discountPercentage}%
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="min-h-[24px]">
            {averageStarRate ? (
              <div className="flex items-center gap-1">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(averageStarRate)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                <span className="text-sm text-gray-600">
                  ({averageStarRate.toFixed(1)})
                </span>
              </div>
            ) : (
              <span className="text-[12px] text-[#777]">No rating</span>
            )}
          </div>

          {/* Selling Points */}
          {renderSellingPoints().length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {renderSellingPoints()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
