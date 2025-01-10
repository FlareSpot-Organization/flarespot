import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { clearCartItems } from "@/services/features/cart/cartSlice";
import { AppDispatch } from "@/store";
import { PDFExport } from "@progress/kendo-react-pdf";
import {
  Calendar,
  CheckCircle2,
  Download,
  Hash,
  Mail,
  MapPin,
  Phone,
  Receipt,
  ShoppingBag,
} from "lucide-react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const pdfExportComponent = useRef<any>(null);
  const cart = useSelector((state: any) => state.cart.items);
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const subtotal = cart.reduce((total: number, item: any) => {
    const price = parseFloat(item.product_price.replace("$", ""));
    return total + price * item.quantity;
  }, 0);

  const shipping = 5;
  const total = subtotal + shipping;
  const receiptId = `REC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const downloadReceipt = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
      dispatch(clearCartItems());
      navigate("/");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto dark:bg-gray-950">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 mb-4">
            <CheckCircle2 className="w-16 h-16 text-green-500 dark:text-green-400" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-600 dark:text-green-400">
            Payment Successful!
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Thank you for your purchase,{" "}
            <span className="font-semibold">
              {user?.name?.firstname} {user?.name?.lastname}
            </span>
            !
          </p>
        </CardHeader>

        <CardContent>
          <PDFExport ref={pdfExportComponent} paperSize="A4" fileName="receipt">
            {/* Keep receipt card in light theme for PDF export */}
            <Card className="bg-gray-50 dark:bg-gray-900 dark:text-white border border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      Payment Receipt
                    </h2>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-100 flex items-center gap-2 justify-end">
                      <Calendar className="w-4 h-4 dark:text-gray-100" />
                      {currentDate}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-100 flex items-center gap-2 justify-end">
                      <Hash className="w-4 h-4 dark:text-gray-100" />
                      {receiptId}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-100 flex items-center gap-2">
                      <Mail className="w-4 h-4 dark:text-gray-100" />
                      {user?.email}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-100 flex items-center gap-2">
                      <Phone className="w-4 h-4 dark:text-gray-100" />
                      {user?.phone}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-100 flex items-center gap-2">
                      <MapPin className="w-4 h-4 dark:text-gray-100" />
                      {user?.address?.street}, {user?.address?.city}
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-100">
                          Item
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-100">
                          Qty
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-100">
                          Price
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-100">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cart.map((item: any, index: number) => (
                        <tr
                          key={index}
                          className="text-sm text-gray-800 dark:text-gray-100">
                          <td className="px-4 py-3">{item.product_title}</td>
                          <td className="px-4 py-3">{item.quantity}</td>
                          <td className="px-4 py-3">{item.product_price}</td>
                          <td className="px-4 py-3">
                            $
                            {(
                              item.quantity *
                              parseFloat(item.product_price.replace("$", ""))
                            )?.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 space-y-2">
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-100">
                      Subtotal
                    </span>
                    <span className="text-gray-800 dark:text-gray-100">
                      ${subtotal?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-100">
                      Shipping
                    </span>
                    <span className="text-gray-800 dark:text-gray-100">
                      ${shipping?.toFixed(2)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-gray-900 dark:text-gray-100">
                    <span>Total</span>
                    <span>${total?.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </PDFExport>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
            onClick={downloadReceipt}>
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/")}>
            <ShoppingBag className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
