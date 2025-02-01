import React, { useState } from "react";

const ProductCard2 = ({ product }: { product: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative w-full cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.primaryImage}
          alt={product.title}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-in-out ${
            isHovered ? "scale-110 opacity-0" : "scale-100 opacity-100"
          }`}
        />
        <img
          src={product.secondaryImage}
          alt={`${product.title} - alternate view`}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-in-out ${
            isHovered ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        />
        {product.tag && (
          <span
            className={`absolute sm:left-3 left-0 top-3 rounded-full px-2 py-1 text-[7px] font-medium uppercase tracking-wide text-white ${
              product.tag.toLowerCase() === "sale"
                ? "bg-red-500"
                : "bg-blue-500"
            }`}>
            {product.tag}
          </span>
        )}
      </div>

      <div className="space-y-1 p-3">
        <h3 className="text-xs font-medium text-gray-900 truncate">
          {product.title}
        </h3>
        {product.price && (
          <p className="text-xs font-medium text-gray-700">{product.price}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard2;
