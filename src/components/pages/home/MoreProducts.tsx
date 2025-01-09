import { Card } from "@/components/ui/card";
import { productsDemo } from "@/utils/Content";
import { Heart, Loader2, ShoppingCart, Star } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  shipping: string;
  badge?: string;
  rating: number;
  reviews: number;
}

const ITEMS_PER_PAGE = 20;

const MoreProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(
    productsDemo.slice(0, ITEMS_PER_PAGE)
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef<HTMLDivElement>(null);
  const currentPage = useRef(1);

  const formatPrice = (price: number): string => {
    return price.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const loadMoreProducts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const nextPage = currentPage.current + 1;
    const startIndex = currentPage.current * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newProducts = productsDemo.slice(startIndex, endIndex);

    if (newProducts.length === 0) {
      setHasMore(false);
    } else {
      setProducts((prev) => [...prev, ...newProducts]);
      currentPage.current = nextPage;
    }

    setLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold my-8 text-gray-800">More to love</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 relative border-0">
            {/* Wishlist Button */}
            <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-sm hover:bg-white transition-colors z-10 group-hover:opacity-100 opacity-0">
              <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
            </button>

            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              {product.discount && (
                <div className="absolute left-4 top-4 bg-red-500 text-white text-sm font-semibold px-2.5 py-1 rounded-lg">
                  {product.discount}% OFF
                </div>
              )}
            </div>

            {/* Content Container */}
            <div className="p-5 space-y-4">
              {/* Title */}
              <h3 className="font-medium text-gray-800 line-clamp-2 min-h-[2.5rem] text-sm">
                {product.title}
              </h3>

              {/* Price and Rating Container */}
              <div className="space-y-3">
                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-gray-900">
                    ${formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[10px] text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    ({product.reviews.toLocaleString()})
                  </span>
                </div>

                {/* Shipping */}
                <p className="text-xs text-gray-500 font-medium">
                  {product.shipping}
                </p>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-gray-900 hover:bg-black text-white py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 text-sm font-medium">
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Loading Indicator */}
      <div ref={loadingRef} className="w-full py-12 text-center">
        {loading && (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
            <p className="text-gray-500 font-medium">
              Loading more products...
            </p>
          </div>
        )}
        {!hasMore && products.length > 0 && (
          <p className="text-gray-600 font-medium">
            You've reached the end of the list
          </p>
        )}
      </div>
    </div>
  );
};

export default MoreProducts;
