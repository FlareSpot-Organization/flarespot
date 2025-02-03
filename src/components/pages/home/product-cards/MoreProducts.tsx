import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useVisualization from "@/hooks/useVisualization";
import { addToCart } from "@/services/features/cart/cartSlice";
import { AppDispatch } from "@/store";
import { getCartItems } from "@/utils/CartDb";

import { Heart, Loader2, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const MoreProducts = ({ productsDemo }: { productsDemo: any }) => {
  const { products, loading, hasMore, loadingRef, formatPrice } =
    useVisualization(productsDemo);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const cart = getCartItems();
    const cartProductIds = cart?.map((item) => item.asin);
    setCartItems(cartProductIds);
  }, []);

  const handleAdd = (product: any) => {
    dispatch(addToCart(product));
    toast.success("Item Added Successfully", {
      description: `${product.product_title}`,
    });
    setCartItems((prev) => [...prev, product.asin]);
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold my-8 text-gray-800 dark:text-gray-100">
        More to love
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products?.map((product) => (
          <Card
            key={product?.asin}
            className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 relative border-0">
            {/* Wishlist Button */}
            <button className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2.5 rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-700 transition-colors z-10 group-hover:opacity-100 opacity-0">
              <Heart className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors" />
            </button>

            {/* Image Container */}
            <div className="relative aspect-[4/3] p-3 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900">
              <img
                src={product?.product_photo}
                alt={product?.product_title}
                className="w-[full] h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
              />
              {product?.discount && (
                <div className="absolute left-4 top-4 bg-red-500 text-white text-sm font-semibold px-2.5 py-1 rounded-lg">
                  {product?.discount}% OFF
                </div>
              )}
            </div>

            {/* Content Container */}
            <div className="p-5 space-y-4">
              {/* Title */}
              <h3 className="font-medium text-gray-800 dark:text-gray-100 line-clamp-2 min-h-[2.5rem] text-sm">
                {product?.product_title}
              </h3>

              {/* Price and Rating Container */}
              <div className="space-y-3">
                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(product?.product_price)}
                  </span>
                  {product?.product_original_price && (
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 line-through">
                      {formatPrice(product?.product_original_price)}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {product?.product_star_rating ?? "No rating"}
                    </span>
                  </div>
                </div>

                {/* Shipping */}
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium line-clamp-1">
                  {product?.delivery}
                </p>
              </div>

              {/* Add to Cart Button */}
              {cartItems.includes(product.asin) ? (
                <Button disabled className="cursor-not-allowed w-full">
                  <ShoppingCart className="w-4 h-4" />
                  <span>In Cart</span>
                </Button>
              ) : (
                <Button className="w-full" onClick={() => handleAdd(product)}>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Loading Indicator */}
      <div ref={loadingRef} className="w-full py-12 text-center">
        {loading && (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-gray-500 dark:text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              Loading more products...
            </p>
          </div>
        )}
        {!hasMore && products.length > 0 && (
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            You've reached the end of the list
          </p>
        )}
      </div>
    </div>
  );
};

export default MoreProducts;
