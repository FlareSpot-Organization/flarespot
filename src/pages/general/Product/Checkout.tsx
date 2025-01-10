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
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface CartItem {
  asin: string;
  product_title: string;
  product_price: string;
  product_photo: string;
  quantity: number;
}

const SHIPPING_COST = 5.0;

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cartItems: CartItem[] = useSelector((state: any) => state.cart.items);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleIncreaseQuantity = (asin: string) => {
    dispatch(updateItemQuantity({ asin, quantity: 1 }));
  };

  const handleDecreaseQuantity = (asin: string) => {
    dispatch(updateItemQuantity({ asin, quantity: -1 }));
  };

  const handleRemoveItem = (asin: string) => {
    dispatch(removeItem(asin));
    toast.success("Item removed from cart");
  };

  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.product_price.replace("$", ""));
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
            <PackageOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">
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
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-gray-500 mt-1">
            Review your order ({totalItems} items)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Order Items</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.asin}
                    className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img
                        src={item.product_photo}
                        alt={item.product_title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Badge className="absolute -top-2 -right-2">
                        {item.quantity}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium text-lg truncate pr-4">
                          {item.product_title}
                        </h3>
                        <p className="font-semibold whitespace-nowrap">
                          {formatPrice(
                            parseFloat(item.product_price.replace("$", "")) *
                              item.quantity
                          )}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        {item.product_price} each
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDecreaseQuantity(item.asin)}
                            className="h-8 w-8">
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleIncreaseQuantity(item.asin)}
                            className="h-8 w-8">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.asin)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-900">
              <CardHeader>
                <h2 className="text-xl font-semibold">Shipping & Payment</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg">
                    <Truck className="w-6 h-6 text-blue-500" />
                    <div>
                      <h3 className="font-medium ">Standard Shipping</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-100">
                        Delivery within 3-5 business days
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-green-50  dark:bg-gray-800  rounded-lg">
                    <ShieldCheck className="w-6 h-6 text-green-500" />
                    <div>
                      <h3 className="font-medium">Secure Payment</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-100">
                        Your payment information is encrypted
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="dark:bg-gray-900">
              <CardHeader>
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{formatPrice(SHIPPING_COST)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full dark:bg-gray-800 dark:text-white"
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

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-100 text-center">
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
