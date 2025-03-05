import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  removeItem,
  updateItemQuantity,
} from "@/services/features/cart/cartSlice";
import { AppDispatch } from "@/store";
import { formatPrice } from "@/utils/Formatter";
import {
  CreditCard,
  Minus,
  PackageOpen,
  Plus,
  ShieldCheck,
  Trash2,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CartItem } from "@/types/product_types"; // Use your existing CartItem type
import { extractPropertyValues } from "@/utils/helpers";

const SHIPPING_COST = 5.0;

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cartItems: CartItem[] = useSelector((state: any) => state.cart.items);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleIncreaseQuantity = (itemId: number, skuId?: string) => {
    dispatch(updateItemQuantity({ itemId, skuId, quantity: 1 }));
  };

  const handleDecreaseQuantity = (itemId: number, skuId?: string) => {
    dispatch(updateItemQuantity({ itemId, skuId, quantity: -1 }));
  };

  const handleRemoveItem = (itemId: number, skuId?: string) => {
    if (skuId !== undefined) {
      // For products with variants
      dispatch(removeItem({ itemId, skuId }));
    } else {
      // For simple products without variants
      dispatch(removeItem(itemId));
    }
    toast.success("Item removed from cart");
  };

  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(
      item.selectedSku?.promotionPrice?.replace("$", "") || "0"
    );
    return total + price * item.quantity;
  }, 0);

  const totalAmount = subtotal + SHIPPING_COST;
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleCheckout = async () => {
    setIsProcessing(true);
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    toast.success("Payment processed successfully!");
    navigate("/paymentSuccess");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-12 pb-8">
            <PackageOpen className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Your cart is empty
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Add some items to proceed with checkout.
            </p>
            <Button onClick={() => navigate("/")} className="w-full">
              Browse Products
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Checkout
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Review your order ({totalItems} items)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Order Items
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => {
                  const values = extractPropertyValues(
                    item.selectedProperties,
                    item.sku.props
                  );
                  return (
                    <div
                      key={item.itemId + (item.selectedSku?.skuId || "")}
                      className="flex gap-4 p-4 bg-gray-50 dark:bg-[#131920] rounded-lg">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                        <Badge className="absolute -top-2 -right-2">
                          {item.quantity}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-2">
                          <Link to={`/product?itemId=${item.itemId}`}>
                            <h3 className="font-medium text-lg line-clamp-2 hover:underline pr-4 text-gray-900 dark:text-gray-100">
                              {item.title}
                            </h3>
                          </Link>
                          <p className="font-semibold whitespace-nowrap text-gray-900 dark:text-gray-100">
                            {formatPrice(
                              parseFloat(
                                item.selectedSku?.promotionPrice?.replace(
                                  "$",
                                  ""
                                ) || "0"
                              ) * item.quantity
                            )}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          {item.selectedSku?.promotionPrice} each
                        </p>

                        {/* Display property values if available */}
                        {values && Object.keys(values).length > 0 && (
                          <div className="mt-1 mb-3 space-y-1">
                            {Object.entries(values).map(([key, value]) => (
                              <div
                                key={key}
                                className="flex text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-medium mr-2">{key}:</span>
                                <span>{value}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                handleDecreaseQuantity(
                                  item.itemId,
                                  item.selectedSku?.skuId
                                )
                              }
                              className="h-8 w-8">
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center dark:text-gray-300">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                handleIncreaseQuantity(
                                  item.itemId,
                                  item.selectedSku?.skuId
                                )
                              }
                              className="h-8 w-8">
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
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
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="dark:bg-[#131920]">
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Shipping & Payment
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg">
                    <Truck className="w-6 h-6 text-blue-500" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        Standard Shipping
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Delivery within 3-5 business days
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-gray-800 rounded-lg">
                    <ShieldCheck className="w-6 h-6 text-green-500" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        Secure Payment
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Your payment information is encrypted
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="dark:bg-[#131920]">
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
                    <span className="text-gray-900 dark:text-gray-100">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Shipping
                    </span>
                    <span className="text-gray-900 dark:text-gray-100">
                      {formatPrice(SHIPPING_COST)}
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
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isProcessing}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  {isProcessing
                    ? "Processing..."
                    : `Pay ${formatPrice(totalAmount)}`}
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-[#131920] rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                By completing this purchase you agree to our terms of service
                and privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
