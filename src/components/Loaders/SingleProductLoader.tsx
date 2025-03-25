const ProductPageSkeletalLoader = () => {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-[1600px] mx-auto p-4 gap-6">
      {/* Left side - Image gallery */}
      <div className="w-full md:w-1/2 flex gap-0.5">
        {/* Thumbnail sidebar */}
        <div className="hidden md:flex flex-col gap-2 w-16 float-left mr-2">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="h-16 w-16 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>

        {/* Main product images */}
        <div className="flex-1">
          <div className="h-[600px] w-full bg-gray-200 animate-pulse rounded mb-2"></div>
        </div>
      </div>

      {/* Right side - Product info */}
      <div className="w-full md:w-1/2">
        {/* Product title */}
        <div className="h-8 bg-gray-200 animate-pulse rounded w-full mb-3"></div>

        {/* Seller info */}
        <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3 mb-6"></div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-6 bg-gray-200 animate-pulse rounded w-24"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-16"></div>
        </div>

        {/* Color selection */}
        <div className="mb-6">
          <div className="h-4 bg-gray-200 animate-pulse rounded w-16 mb-2"></div>
          <div className="flex gap-2 flex-wrap">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-10 bg-gray-200 animate-pulse rounded-md"></div>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 bg-gray-200 animate-pulse rounded w-16 mb-2"></div>
          <div className="flex border rounded">
            <div className="h-8 w-8 bg-gray-200 animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 animate-pulse"></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mb-6">
          <div className="h-12 bg-gray-200 animate-pulse rounded w-1/2"></div>
          <div className="h-12 bg-gray-200 animate-pulse rounded w-1/2"></div>
        </div>

        {/* Shipping */}
        <div className="mb-6">
          <div className="h-5 bg-gray-200 animate-pulse rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-4/5 mb-2"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
        </div>

        {/* Product specs */}
        <div className="mb-6">
          <div className="h-5 bg-gray-200 animate-pulse rounded w-1/3 mb-3"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-4/5"></div>
        </div>

        {/* Reviews section */}
        <div className="mt-8 border-t pt-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-5 bg-gray-200 animate-pulse rounded w-24"></div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-4 bg-gray-200 animate-pulse rounded-full"></div>
              ))}
            </div>
          </div>

          {/* Review */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-32"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-20 ml-auto"></div>
            </div>

            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-4 bg-gray-200 animate-pulse rounded-full"></div>
              ))}
            </div>

            <div className="h-5 bg-gray-200 animate-pulse rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeletalLoader;
