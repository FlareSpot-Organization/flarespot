import React, { useState } from "react";
import {
  CreditCard,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  ChevronRight,
  Shield,
  AlertCircle,
  Lock,
} from "lucide-react";

const PaymentMethods = () => {
  // Mock payment methods data
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Visa",
      cardNumber: "•••• •••• •••• 4242",
      expiryDate: "05/28",
      cardholderName: "Sophia Anderson",
      isDefault: true,
    },
    {
      id: 2,
      type: "Mastercard",
      cardNumber: "•••• •••• •••• 5555",
      expiryDate: "11/26",
      cardholderName: "Sophia Anderson",
      isDefault: false,
    },
  ]);

  // Function to handle payment method deletion
  const handleDeletePaymentMethod = (id: number) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  // Function to set default payment method
  const handleSetDefault = (id: number) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  // Get card logo based on type
  const getCardLogo = (type: string) => {
    switch (type.toLowerCase()) {
      case "visa":
        return "bg-blue-600";
      case "mastercard":
        return "bg-red-600";
      case "amex":
        return "bg-blue-500";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-md">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-neutral-800 rounded-full mr-4">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Payment Methods
              </h1>
              <p className="text-gray-600 text-sm">
                Manage your saved payment methods
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Payment Method Button */}
      <div
        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden mb-6 cursor-pointer"
        role="button">
        <div className="p-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="p-3 bg-neutral-800 bg-opacity-10 rounded-full mr-4">
              <Plus className="h-6 w-6 text-neutral-800" />
            </div>
            <p className="font-medium text-neutral-800">
              Add a new payment method
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Payment Methods List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            Your Payment Methods
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {paymentMethods.map((method) => (
            <div key={method.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between mb-3">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-6 ${getCardLogo(
                      method.type
                    )} rounded mr-3 flex items-center justify-center text-white text-xs font-bold`}>
                    {method.type.substring(0, 4)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">
                      {method.type}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {method.cardNumber}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Edit className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => handleDeletePaymentMethod(method.id)}>
                    <Trash2 className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="text-gray-600 text-sm mb-1">
                Expires: {method.expiryDate}
              </div>
              <div className="text-gray-600 text-sm mb-3">
                Name: {method.cardholderName}
              </div>
              <div className="flex items-center">
                {method.isDefault ? (
                  <span className="bg-neutral-800 text-white text-xs px-2 py-1 rounded-full">
                    Default
                  </span>
                ) : (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="flex items-center text-sm text-neutral-800 hover:text-neutral-900">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Set as default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Information */}
      <div className="bg-neutral-900 rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-white mr-3" />
            <h3 className="text-white text-lg font-semibold">
              Payment Security
            </h3>
          </div>
          <p className="text-white text-opacity-80 mb-4">
            Your payment information is encrypted and securely stored following
            PCI DSS compliance standards. We never store your full card details
            on our servers.
          </p>
          <div className="flex items-center mb-4">
            <Lock className="h-5 w-5 text-white mr-2" />
            <p className="text-white text-opacity-90">
              All transactions are protected with industry-standard encryption
            </p>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            Payment Information
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          <div className="p-4 flex items-start">
            <AlertCircle className="h-5 w-5 text-gray-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-800 font-medium">
                Automatic Payment Processing
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Your default payment method will be used for automatic renewals
                and subscriptions.
              </p>
            </div>
          </div>
          <div className="p-4 flex items-start">
            <AlertCircle className="h-5 w-5 text-gray-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-800 font-medium">
                International Transaction Fees
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Some banks may charge additional fees for international
                transactions. Please check with your bank for details.
              </p>
            </div>
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-50 text-center">
          <button className="text-neutral-800 font-medium hover:text-neutral-900">
            View Billing History
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
