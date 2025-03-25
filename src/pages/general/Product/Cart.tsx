import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import {
  removeItem,
  updateItemQuantity,
  clearCartItems,
} from "@/services/features/cart/cartSlice";
import { formatPrice } from "@/utils/Formatter";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  PackageOpen,
  ShoppingBag,
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
import { CartItem } from "@/types/product_types";
import { cleanImageUrl, extractPropertyValues } from "@/utils/helpers";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: any) => state?.auth);
  const navigate = useNavigate();
  const cartItems: CartItem[] = useSelector((state: any) => state?.cart?.items);

  const handleIncreaseQuantity = (itemId: number, skuId?: string) => {
    dispatch(updateItemQuantity({ itemId, skuId, quantity: 1 }));
  };

  const handleDecreaseQuantity = (itemId: number, skuId?: string) => {
    const item = cartItems.find(
      (item) =>
        item.itemId === itemId &&
        (skuId ? item.selectedSku?.skuId === skuId : true)
    );

    if (item && item.quantity > 0) {
      dispatch(updateItemQuantity({ itemId, skuId, quantity: -1 }));
    }
  };

  const handleViewItem = (itemId: number) => {
    navigate(`/product?itemId=${itemId}`);
    toast?.info("Viewing product details");
  };

  const handleRemoveItem = (itemId: number, skuId?: string) => {
    if (skuId !== undefined) {
      // For products with variants
      dispatch(removeItem({ itemId, skuId }));
    } else {
      // For simple products without variants
      dispatch(removeItem(itemId));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCartItems());
    toast?.success("Cart cleared");
  };

  const handleCheckout = () => {
    // Filter out items with zero quantity
    const zeroQuantityItems = cartItems.filter((item) => item.quantity === 0);

    // Remove zero quantity items before checkout
    if (zeroQuantityItems.length > 0) {
      zeroQuantityItems.forEach((item) => {
        if (item.selectedSku?.skuId) {
          dispatch(
            removeItem({ itemId: item.itemId, skuId: item.selectedSku.skuId })
          );
        } else {
          dispatch(removeItem(item.itemId));
        }
      });

      toast?.info(
        `Removed ${zeroQuantityItems.length} item(s) with zero quantity`
      );
    }

    // Calculate if there are any items left with quantity > 0
    const hasItemsToCheckout = cartItems.some((item) => item.quantity > 0);

    if (hasItemsToCheckout) {
      toast?.success("Proceeding to checkout");
      navigate("/checkout");
    } else {
      toast?.error("Cannot checkout with an empty cart");
    }
  };

  const handleContinueShopping = () => {
    toast?.info("Redirecting to products page");
    navigate("/");
  };

  // Fixed totalAmount calculation - only count items with quantity > 0
  const totalAmount = cartItems?.reduce((total, item) => {
    // Skip items with zero quantity
    if (item.quantity === 0) return total;

    // Get price from selectedSku.promotionPrice first, then fall back to other locations if needed
    const price = parseFloat(
      item?.selectedSku?.promotionPrice || item?.sku?.def?.promotionPrice || "0"
    );
    return total + price * item?.quantity;
  }, 0);

  const totalItems = cartItems?.reduce(
    (total, item) => total + (item?.quantity > 0 ? item?.quantity : 0),
    0
  );

  if (cartItems?.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-12 pb-8">
            <PackageOpen className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Your cart is empty
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Looks like you haven't added any items yet?.
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
              Shopping Cart
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {totalItems} items
            </p>
          </div>
          <Button variant="ghost" onClick={handleContinueShopping}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems?.map((item) => {
              const values = extractPropertyValues(
                item.selectedProperties,
                item.sku?.props
              );

              return (
                <Card
                  key={item?.selectedSku?.skuId || item.itemId}
                  className={`overflow-hidden ${item.quantity === 0 ? "border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50" : ""}`}>
                  <CardContent className="p-4 dark:bg-[#131920]">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <img
                          src={`${item?.image}`}
                          alt={item?.title}
                          onClick={() => handleViewItem(item?.itemId)}
                          referrerPolicy="no-referrer"
                          className={`w-full h-full object-cover rounded-lg ${item.quantity === 0 ? "opacity-50" : ""}`}
                        />
                        <Badge
                          className={`absolute -top-2 -right-2 ${item.quantity === 0 ? "bg-gray-400 dark:bg-gray-600" : ""}`}>
                          {item?.quantity}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3
                            onClick={() => handleViewItem(item?.itemId)}
                            className={`font-medium text-md cursor-pointer line-clamp-2 pr-4 text-gray-900 dark:text-gray-100 ${item.quantity === 0 ? "text-gray-500 dark:text-gray-400" : ""}`}>
                            {item?.title}
                            {item.quantity === 0 && (
                              <span className="ml-2 text-xs text-red-500">
                                (Zero quantity)
                              </span>
                            )}
                          </h3>
                          <p className="font-semibold whitespace-nowrap text-gray-900 dark:text-gray-100">
                            {item?.selectedSku?.promotionPrice ||
                              item?.sku?.def?.promotionPrice}
                          </p>
                        </div>

                        <div className="flex items-start justify-between">
                          {/* Left side - Property values */}
                          <div className="mt-2 space-y-1">
                            {values && Object.keys(values).length > 0 ? (
                              /* Display property values if they exist */
                              <>
                                {Object.entries(values).map(([key, value]) => (
                                  <div
                                    key={key}
                                    className="flex text-sm text-gray-500 dark:text-gray-300">
                                    <span className="font-medium mr-2">
                                      {key}:
                                    </span>
                                    <span>{value}</span>
                                  </div>
                                ))}
                              </>
                            ) : (
                              /* Show just the quantity available if no other properties */
                              <div className="flex text-sm text-gray-500 dark:text-gray-300"></div>
                            )}
                          </div>

                          {/* Right side - Quantity controls and buttons */}
                          <div className="mt-4 flex flex-col items-end space-y-3">
                            {/* Quantity controls on top */}
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  handleDecreaseQuantity(
                                    item?.itemId,
                                    item.selectedSku?.skuId
                                  )
                                }
                                disabled={item.quantity === 0}
                                className="h-8 w-8">
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-8 text-center dark:text-gray-300">
                                {item?.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  handleIncreaseQuantity(
                                    item?.itemId,
                                    item.selectedSku?.skuId
                                  )
                                }
                                disabled={item.quantity >= item.maxQuantity}
                                className={`h-8 w-8 ${item.quantity >= item.maxQuantity ? "bg-gray-200" : ""}`}>
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Action buttons below */}
                            <div className="flex items-center space-x-2">
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
                                onClick={() =>
                                  handleRemoveItem(
                                    item.itemId,
                                    item.selectedSku?.skuId
                                  )
                                }
                                className="text-red-500 hover:text-red-600 bg-accent hover:bg-red-50 dark:hover:bg-red-950/50 dark:hover:text-red-400">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove Item
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <Card className=" dark:bg-[#131920]">
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Order Summary
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal
                    </span>
                    <span className="dark:text-gray-100">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Shipping
                    </span>
                    <span className="text-green-600 dark:text-green-400">
                      Free
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900 dark:text-gray-100">
                      Total
                    </span>
                    <span className="text-gray-900 dark:text-gray-100">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>

                  {cartItems.some((item) => item.quantity === 0) && (
                    <div className="mt-2 text-xs text-orange-500 bg-orange-50 dark:bg-orange-950/30 p-2 rounded">
                      Note: Items with zero quantity will be removed during
                      checkout
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex w-full flex-col gap-4">
                {token ? (
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={!cartItems.some((item) => item.quantity > 0)}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Checkout
                  </Button>
                ) : (
                  <Link to="/auth/login" className="w-full">
                    <Button
                      className="w-full dark:bg-gray-800 dark:text-white"
                      size="lg">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Sign In / Register
                    </Button>
                  </Link>
                )}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleClearCart}>
                  Clear Cart
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
