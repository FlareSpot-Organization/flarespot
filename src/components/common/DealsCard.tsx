import React from "react";

const DealsCard: React.FC<any> = ({
  deal_photo,
  deal_title,
  deal_price,
  list_price,
  deal_badge,
  savings_amount,
  savings_percentage,
  deal_ends_at,
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
      {/* Image Section */}
      <div className="relative flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-2">
        <img
          src={deal_photo}
          alt={deal_title}
          className="w-[70%] object-cover"
        />
        {deal_badge && (
          <span className="absolute top-2 left-2 bg-red-500 dark:bg-red-600 text-white px-2 py-1 rounded-md text-[10px]">
            {deal_badge}
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-[12px] font-semibold line-clamp-2 mb-2 text-gray-900 dark:text-gray-100">
          {deal_title}
        </h3>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
            {deal_price?.currency}{" "}
            {Number(deal_price?.amount)?.toLocaleString()}
          </span>
          {list_price && (
            <span className="text-[9px] text-gray-500 dark:text-gray-400 line-through">
              {list_price?.currency}{" "}
              {Number(list_price?.amount)?.toLocaleString()}
            </span>
          )}
        </div>

        {/* Savings */}
        {savings_amount && (
          <div className="text-green-500 dark:text-green-400 text-[10px] mb-2">
            Save {savings_amount?.currency}{" "}
            {Number(savings_amount?.amount)?.toLocaleString()} (
            {savings_percentage}%)
          </div>
        )}

        {/* Deal End Date */}
        <div className="text-[11px] text-gray-600 dark:text-gray-400 mb-2">
          Ends on:{" "}
          {new Date(deal_ends_at)?.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>

        {/* Action Button */}
        <button className="w-full bg-gray-900 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-600 text-white py-1.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 text-[12px] font-medium">
          <span>View Deal</span>
        </button>
      </div>
    </div>
  );
};

export default DealsCard;
