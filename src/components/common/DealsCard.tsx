import { DealCardProps } from "@/types/public";

const DealsCard: React.FC<DealCardProps> = ({
  image,
  title,
  currentPrice,
  originalPrice,
  rating,
  soldCount,
  discount,
  savings,
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div className="relative">
      <img
        src={image}
        alt={title}
        className="w-full h-32 sm:h-48 object-cover"
      />
      {discount && (
        <span className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs sm:text-sm">
          -{discount}%
        </span>
      )}
    </div>
    <div className="p-2">
      <h3 className="text-xs sm:text-[10px] h-8 sm:h-12 line-clamp-2 mb-2">
        {title}
      </h3>
      <div className="flex items-baseline flex-wrap gap-2 mb-2">
        <span className="text-xs sm:text-[12px] font-bold">
          NGN{currentPrice.toLocaleString()}
        </span>
        {originalPrice && (
          <span className="text-xs sm:text-[10px] text-gray-500 line-through">
            {originalPrice.toLocaleString()}
          </span>
        )}
      </div>
      {savings && (
        <div className="text-red-500 text-xs sm:text-[10px] mb-2">
          You save NGN{savings.toLocaleString()}
        </div>
      )}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
        {rating && (
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span>{rating}</span>
          </div>
        )}
        {soldCount && <span>{soldCount.toLocaleString()} sold</span>}
      </div>
    </div>
  </div>
);

export default DealsCard;
