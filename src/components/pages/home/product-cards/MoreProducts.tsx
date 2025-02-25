import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useVisualization from "@/hooks/useVisualization";
import { addToCart } from "@/services/features/cart/cartSlice";
import { addToWishList } from "@/services/features/wishlist/wishlistSlice";
import { CartItem, WishListItem } from "@/types/product_types";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const MoreProducts = ({ productsDemo }: { productsDemo: any[] }) => {
  const { products, loading, hasMore, loadingRef, formatPrice } =
    useVisualization(productsDemo);

  const [cartItems, setCartItems] = useState<number[]>([]);
  const [wishListItems, setWishListItems] = useState<number[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("user_cart") || "[]");
    const cartProductIds = cart.map((item: any) => item.itemId);
    setCartItems(cartProductIds);

    const wishlist = JSON.parse(localStorage.getItem("user_wishlist") || "[]");
    const wishlistIds = wishlist.map((item: any) => item.itemId);
    setWishListItems(wishlistIds);
  }, []);

  const handleAdd = (product: CartItem) => {
    dispatch(addToCart({ ...product }));
    toast.success("Item Added Successfully", {
      description: `${product.title}`,
    });
    setCartItems((prev) => [...prev, product.itemId]);
  };

  const handleAddWishlist = (product: WishListItem) => {
    const checkWishList = wishListItems.includes(product.itemId);
    dispatch(addToWishList({ ...product }));
    if (!checkWishList) {
      toast.success("Item Added Successfully", {
        description: `${product.title}`,
      });
      setWishListItems((prev) => [...prev, product.itemId]);
    } else {
      toast.info("Item Removed Successfully", {
        description: `${product.title}`,
      });
      setWishListItems((prev) =>
        prev.filter((item) => item !== product.itemId)
      );
    }
  };
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold my-8 text-gray-800 dark:text-gray-100">
        More to love
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products?.map((product) => {
          const originalPrice = parseFloat(product?.item?.sku?.def?.price);
          const promotionalPrice = parseFloat(
            product?.item?.sku?.def?.promotionPrice
          );
          const savingsAmount = originalPrice - promotionalPrice;
          const savingsPercentage = Math.round(
            (savingsAmount / originalPrice) * 100
          );
          return (
            <Card
              key={product?.item?.itemId}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 relative border-0">
              {/* Wishlist Button */}
              <button
                onClick={() => handleAddWishlist(product.item)}
                className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2.5 rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-700 transition-colors z-10 opacity-100 ">
                {wishListItems.includes(product.item.itemId) ? (
                  <Heart
                    className="w-5 h-5 text-red-500 cursor-pointer"
                    fill="currentColor"
                  />
                ) : (
                  <Heart className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors" />
                )}
              </button>

              <a href={`/product?itemId=${product?.item?.itemId}`}>
                {/* Image Container */}
                <div className="relative aspect-[4/3] p-3 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#131920]">
                  <img
                    src={product?.item?.image}
                    alt={product?.item?.title}
                    className="w-[full] h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {product?.item?.sku?.def?.promotionPrice &&
                    savingsPercentage > 0 && (
                      <div className="absolute left-4 top-4 bg-red-500 text-white text-sm font-semibold px-2.5 py-1 rounded-lg">
                        {savingsPercentage} % OFF
                      </div>
                    )}
                </div>

                {/* Content Container */}
                <div className="p-5 space-y-4">
                  {/* Title */}
                  <h3 className="font-medium text-gray-800 dark:text-gray-100 line-clamp-2 min-h-[2.5rem] text-sm">
                    {product?.item?.title}
                  </h3>

                  {/* Price and Rating Container */}
                  <div className="space-y-3">
                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        {formatPrice(
                          product?.item?.sku?.def?.promotionPrice ||
                            product?.item?.sku?.def?.price
                        )}
                      </span>
                      {product?.item?.sku?.def?.price !==
                        product?.item?.sku?.def?.promotionPrice && (
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 line-through">
                          {formatPrice(product?.item?.sku?.def?.price)}
                        </span>
                      )}
                    </div>

                    {/* Rating Placeholder */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          No rating
                        </span>
                      </div>
                    </div>

                    {/* Shipping Placeholder */}
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium line-clamp-1">
                      Free Shipping
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  {cartItems.includes(product.item.itemId) ? (
                    <Button disabled className="cursor-not-allowed w-full">
                      <ShoppingCart className="w-4 h-4" />
                      <span>In Cart</span>
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() =>
                        handleAdd({ ...product.item, quantity: 1 })
                      }>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </Button>
                  )}
                </div>
              </a>
            </Card>
          );
        })}
      </div>
      {/* Loading State */}
      <div ref={loadingRef} className="my-12 text-center">
        {loading && (
          <div className="text-gray-500 dark:text-gray-400">
            Loading more products...
          </div>
        )}
        {!hasMore && products.length > 0 && (
          <div className="text-gray-500 dark:text-gray-400">
            You've reached the end of the list
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreProducts;
