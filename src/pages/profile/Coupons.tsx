import React, { useState, useEffect } from "react";
import { ChevronRight, Ticket, AlertCircle, X } from "lucide-react";

// Define types
type TabType = "unused" | "used" | "expired";

interface Coupon {
  id: string;
  code: string;
  description: string;
  discount: string;
  expiry: string;
  status: "unused" | "used" | "expired";
  usedDate?: string;
}

const Coupons: React.FC = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [activeTab, setActiveTab] = useState<TabType>("unused");
  const [error, setError] = useState<string | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: "1",
      code: "WELCOME20",
      description: "20% off your first order",
      discount: "20% off",
      expiry: "March 30, 2025",
      status: "unused",
    },
    {
      id: "2",
      code: "SUMMER15",
      description: "15% off summer collection",
      discount: "15% off",
      expiry: "August 31, 2025",
      status: "unused",
    },
    {
      id: "3",
      code: "FREESHIP50",
      description: "Free shipping on orders over $50",
      discount: "Free shipping",
      expiry: "December 31, 2025",
      status: "unused",
    },
    {
      id: "4",
      code: "WINTER10",
      description: "10% off winter essentials",
      discount: "10% off",
      expiry: "January 15, 2025",
      status: "used",
      usedDate: "January 5, 2025",
    },
    {
      id: "5",
      code: "FLASH25",
      description: "25% off flash sale items",
      discount: "25% off",
      expiry: "February 1, 2025",
      status: "used",
      usedDate: "January 28, 2025",
    },
    {
      id: "6",
      code: "BLACK30",
      description: "30% off Black Friday deals",
      discount: "30% off",
      expiry: "November 30, 2024",
      status: "expired",
    },
    {
      id: "7",
      code: "HOLIDAY20",
      description: "20% off holiday collection",
      discount: "20% off",
      expiry: "December 25, 2024",
      status: "expired",
    },
  ]);

  // Get the active tab from URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab") as TabType;

    if (tabParam && ["unused", "used", "expired"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);

  // Function to handle tab changes by updating URL and state
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setError(null); // Clear error when changing tabs

    // Update URL without page refresh
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.pushState({}, "", url.toString());
  };

  // Function to handle coupon code input change
  const handleCouponInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
    setError(null); // Clear error when typing
  };

  // Function to handle apply button click
  const handleApply = () => {
    if (!couponCode.trim()) {
      setError("Please enter a coupon code");
      return;
    }

    // Simulating coupon validation
    // In a real app, this would make an API call to validate the coupon
    setTimeout(() => {
      // Check if the coupon already exists
      const couponExists = coupons.some(
        (coupon) => coupon.code.toLowerCase() === couponCode.toLowerCase()
      );

      if (couponExists) {
        setError("This coupon has already been added to your account");
      } else {
        // For demo purposes, all manually entered coupons are invalid
        setError("Invalid coupon code. Please check and try again");
      }
    }, 500);
  };

  // Filter coupons based on active tab
  const filteredCoupons = coupons.filter(
    (coupon) => coupon.status === activeTab
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-md">
      <div>
        {/* Heading and tabs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-8 border-b border-gray-200 w-full">
            {(["unused", "used", "expired"] as const).map((tab) => (
              <button
                key={tab}
                className={`py-2 px-1 font-medium ${
                  activeTab === tab
                    ? "text-neutral-900 border-b-2 border-neutral-900"
                    : "text-gray-500"
                } capitalize`}
                onClick={() => handleTabChange(tab)}>
                {tab}
              </button>
            ))}
            <div className="flex-grow"></div>
            <button className="py-2 px-1 font-medium text-neutral-900">
              FAQs
            </button>
          </div>
        </div>

        {/* Coupon code input section */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              className={`flex-grow p-3 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900`}
              value={couponCode}
              onChange={handleCouponInputChange}
            />
            <button
              className="py-3 px-8 bg-white text-neutral-900 font-medium border border-gray-300 rounded-full hover:bg-gray-50"
              onClick={handleApply}>
              Apply
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-center text-red-500 text-sm mt-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </div>
          )}
        </div>

        {/* Coupon list section */}
        <div className="space-y-4 mb-8">
          {filteredCoupons.length > 0 ? (
            filteredCoupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-white p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-center">
                  <div className="text-neutral-900 font-medium">
                    {coupon.description}
                  </div>
                  <ChevronRight className="text-gray-400" />
                </div>

                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Code:</span> {coupon.code}
                  </div>
                  <div>
                    <span className="font-medium">Value:</span>{" "}
                    {coupon.discount}
                  </div>
                  {coupon.status === "unused" && (
                    <div>
                      <span className="font-medium">Expires:</span>{" "}
                      {coupon.expiry}
                    </div>
                  )}
                  {coupon.status === "used" && coupon.usedDate && (
                    <div>
                      <span className="font-medium">Used on:</span>{" "}
                      {coupon.usedDate}
                    </div>
                  )}
                  {coupon.status === "expired" && (
                    <div>
                      <span className="font-medium">Expired on:</span>{" "}
                      {coupon.expiry}
                    </div>
                  )}
                </div>

                {coupon.status === "unused" && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Ready to use
                    </span>
                  </div>
                )}

                {coupon.status === "used" && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Used
                    </span>
                  </div>
                )}

                {coupon.status === "expired" && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Expired
                    </span>
                  </div>
                )}
              </div>
            ))
          ) : (
            // No coupons available section
            <div className="py-12 flex flex-col items-center justify-center">
              <div className="w-24 h-24 flex items-center justify-center border border-gray-200 rounded-lg mb-4">
                <Ticket className="text-gray-300 h-12 w-12" strokeWidth={1} />
              </div>
              <p className="text-neutral-900 font-medium text-lg mb-12">
                You don't have any {activeTab} coupons
              </p>
            </div>
          )}
        </div>

        {/* Help section (always present) */}
        <div className="w-full mt-8">
          <h3 className="text-neutral-900 font-medium mb-4">
            Can't find your coupon(s)?
          </h3>
          <div className="space-y-4">
            <div className="border border-gray-300 rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
              <div className="flex items-center">
                <span className="text-neutral-800">
                  Try signing in with another account
                </span>
                <div className="flex ml-4 space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                    G
                  </div>
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-xs">
                    A
                  </div>
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">
                    F
                  </div>
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-xs">
                    X
                  </div>
                </div>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>

            <div className="border border-gray-300 rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
              <span className="text-neutral-800">
                Self-service to find coupon(s)
              </span>
              <ChevronRight className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
