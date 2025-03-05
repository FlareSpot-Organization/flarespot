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
import { WishListItem } from "@/types/product_types";
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

  const handleClearWishlist = () => {
    dispatch(clearWishListItems());
    toast?.success("Wishlist cleared");
  };

  const handleContinueShopping = () => {
    toast?.info("Redirecting to products page");
    navigate("/");
  };

  if (wishlistItems?.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-12 pb-8">
            <PackageOpen className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Looks like you haven't added any items to your wishlist yet.
            </p>
            <Button onClick={handleContinueShopping} className="w-full">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Wishlist
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {wishlistItems.length} items
            </p>
          </div>
          <Button variant="ghost" onClick={handleContinueShopping}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {wishlistItems?.map((item) => (
              <Card key={item?.itemId} className="overflow-hidden">
                <CardContent className="p-4 dark:bg-[#131920]">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img
                        src={`${item?.image}`}
                        alt={item?.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-lg truncate pr-4 text-gray-900 dark:text-gray-100">
                          {item?.title}
                        </h3>
                        <p className="font-semibold whitespace-nowrap text-gray-900 dark:text-gray-100">
                          {item?.sku?.def?.promotionPrice}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewItem(item?.itemId)}
                          className="h-8">
                          <Eye className="w-4 h-4 mr-2" />
                          View Item
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item?.itemId)}
                          className="text-red-500 hover:text-red-600 bg-accent hover:bg-red-50 dark:hover:bg-red-950/50 dark:hover:text-red-400">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="dark:bg-[#131920]">
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Wishlist Summary
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Items
                    </span>
                    <span className="dark:text-gray-100">
                      {wishlistItems.length}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900 dark:text-gray-100">
                      Saved Items
                    </span>
                    <span className="text-gray-900 dark:text-gray-100">
                      {wishlistItems.length}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex w-full flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleClearWishlist}>
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
