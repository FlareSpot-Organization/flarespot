import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";
import { addToWishList } from "@/services/features/wishlist/wishlistSlice";
import { AppDispatch } from "@/store";
import { WishListItem } from "@/types/product_types";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const MoreProductsPaginated = ({ productsSearch }: { productsSearch: any }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const { products, totalPages, formatPrice } = usePagination(
    productsSearch,
    currentPage
  );

  const [cartItems, setCartItems] = useState<number[]>([]);
  const [wishListItems, setWishListItems] = useState<number[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("user_cart") || "[]");
    const cartProductIds = cart.map((item: any) => item.itemId);
    setCartItems(cartProductIds);

    const wishlist = JSON.parse(localStorage.getItem("user_wishlist") || "[]");
    const wishlistIds = wishlist.map((item: any) => item.itemId);

    setWishListItems(wishlistIds);
  }, []);

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

  const handlePageChange = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto py-4">
      <div className="mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
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
              <div key={product.item.itemId} className="group relative">
                <div className="relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 p-1 hover:shadow">
                  {/* Discount Tag */}
                  {product.item.sku.def.promotionPrice &&
                    savingsPercentage > 0 && (
                      <div className="absolute top-4 left-4 z-[5]">
                        <div className="bg-[#131920] dark:bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                          {savingsPercentage}% OFF
                        </div>
                      </div>
                    )}
                  {/* Wishlist Button */}
                  <button
                    className="absolute top-4 right-4 z-[5] p-1 rounded-full"
                    onClick={() => handleAddWishlist(product.item)}>
                    {wishListItems.includes(product.item.itemId) ? (
                      <Heart
                        className="w-5 h-5 text-red-500 cursor-pointer"
                        fill="currentColor"
                      />
                    ) : (
                      <Heart className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors" />
                    )}
                  </button>
                  {/* Image */}
                  <Link to={`/product?itemId=${product?.item?.itemId}`}>
                    <div className="aspect-square bg-gray-50 flex items-center justify-center rounded-md overflow-hidden">
                      <img
                        referrerPolicy="no-referrer"
                        src={product.item.image}
                        alt={product.item.title}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-1">
                      <div className="mb-1">
                        <h3 className="text-[14px] font-medium text-gray-900 dark:text-gray-100 line-clamp-2 mb-2">
                          {product.item.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                              {formatPrice(product.item.sku.def.promotionPrice)}
                            </span>
                            {product.item.sku.def.promotionPrice && (
                              <span className="text-sm text-gray-400 line-through">
                                {formatPrice(product.item.sku.def.price)}
                              </span>
                            )}
                          </div>
                          <div className="mt-1">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              ★ New
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center">
          {/* Pagination */}
          {totalPages > 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MoreProductsPaginated;
