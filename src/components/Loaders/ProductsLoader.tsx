import React from "react";

const ProductsLoader = () => {
  // Create an array of 10 items to display in grid
  const skeletonItems = Array(20).fill(null);

  return (
    <div className="w-full max-w-[1600px] mx-auto mt-5">
      {/* Top bar with filters and sort */}
      <div className="flex justify-between items-center mb-4 px-2">
        <div className="h-10 w-28 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow overflow-hidden">
            {/* Product image skeleton */}
            <div className="relative h-48 bg-gray-200 animate-pulse">
              <div className="absolute top-2 left-2 h-6 w-16 bg-gray-300 rounded-full"></div>
              <div className="absolute top-2 right-2 h-6 w-6 bg-gray-300 rounded-full"></div>
            </div>

            {/* Product info skeleton */}
            <div className="p-3">
              <div className="h-4 bg-gray-200 rounded w-4/5 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-3/5 mb-3 animate-pulse"></div>

              <div className="flex items-center space-x-2">
                <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
              </div>

              <div className="h-4 w-10 bg-gray-200 rounded mt-2 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsLoader;
