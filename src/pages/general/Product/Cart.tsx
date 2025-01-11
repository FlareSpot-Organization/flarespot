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

interface CartItem {
  asin: string;
  product_title: string;
  product_price: string;
  product_photo: string;
  quantity: number;
}

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const cartItems: CartItem[] = useSelector((state: any) => state.cart.items);

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

  const handleClearCart = () => {
    dispatch(clearCartItems());
    toast.success("Cart cleared");
  };

  const handleCheckout = () => {
    toast.success("Proceeding to checkout...");
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    toast.info("Redirecting to products...");
    navigate("/");
  };

  const totalAmount = cartItems.reduce((total, item) => {
    const price = parseFloat(item.product_price.replace("$", ""));
    return total + price * item.quantity;
  }, 0);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

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
              Looks like you haven't added any items yet.
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
            {cartItems.map((item) => (
              <Card key={item.asin} className="overflow-hidden">
                <CardContent className="p-4 dark:bg-gray-900">
                  <div className="flex gap-4">
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
                      <div className="flex justify-between">
                        <h3 className="font-medium text-lg truncate pr-4 text-gray-900 dark:text-gray-100">
                          {item.product_title}
                        </h3>
                        <p className="font-semibold whitespace-nowrap text-gray-900 dark:text-gray-100">
                          {item.product_price}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDecreaseQuantity(item.asin)}
                            className="h-8 w-8">
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center dark:text-gray-300">
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
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 dark:hover:text-red-400">
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
            <Card className=" dark:bg-gray-900">
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
                </div>
              </CardContent>
              <CardFooter className="flex w-full flex-col gap-4">
                {token ? (
                  <Button
                    className="w-full dark:bg-gray-800 dark:text-white"
                    size="lg"
                    onClick={handleCheckout}>
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
