import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";

import { formatPrice } from "@/utils/Formatter";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  PackageOpen,
  ShoppingBag,
  Heart,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartItem, WishListItem } from "@/types/product_types";
import { cleanImageUrl } from "@/utils/helpers";
import {
  clearWishListItems,
  removeItem,
} from "@/services/features/wishlist/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: any) => state?.auth);
  const navigate = useNavigate();
  const wishlistItems: WishListItem[] = useSelector(
    (state: any) => state?.wishlist?.items
  );

  const handleRemoveItem = (itemId: number) => {
    dispatch(removeItem(itemId));
    toast?.success("Item removed from wishlist");
  };

  const handleViewItem = (itemId: number) => {
    navigate(`/product?itemId=${itemId}`);
    toast?.info("Viewing product details");
  };

  const handleClearCart = () => {
    dispatch(clearWishListItems());
    toast?.success("Wishlists cleared");
  };

  const handleContinueShopping = () => {
    toast?.info("Redirecting to products page");
    navigate("/");
  };

  if (wishlistItems?.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="max-w-md w-full bg-white/50 backdrop-blur-sm dark:bg-gray-900/50">
          <CardContent className="pt-16 pb-12 text-center">
            <div className="relative mb-8">
              <PackageOpen className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600" />
              <Heart className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
              Start adding items you love to your wishlist and keep track of
              them all in one place.
            </p>
            <Button
              onClick={handleContinueShopping}
              className="w-full max-w-xs mx-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Discover Products
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Your Wishlist
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {wishlistItems?.length} items saved for later
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleContinueShopping}
            className="border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {wishlistItems?.map((item) => (
              <Card
                key={item?.itemId}
                className="group overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-purple-500/10">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-xl">
                      <img
                        src={item?.image}
                        alt={item?.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-xl truncate pr-4 text-gray-900 dark:text-gray-100">
                          {item?.title}
                        </h3>
                        <p className="font-bold text-xl text-purple-500">
                          {item?.sku?.def?.promotionPrice}
                        </p>
                      </div>
                      <div className="flex justify-end items-center gap-2 mt-6">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveItem(item?.itemId)}
                          className="border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleViewItem(item?.itemId)}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1 h-fit sticky top-8">
            <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Wishlist Summary
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {wishlistItems?.length} items saved
                </p>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Button
                  variant="outline"
                  className="w-full border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
                  onClick={handleClearCart}>
                  Clear Wishlist
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
