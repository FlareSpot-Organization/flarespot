import React, { useState, useEffect } from "react";
import { ChevronRight, Ticket, AlertCircle } from "lucide-react";

// Define types
type TabType = "unused" | "used" | "expired";

const Coupons: React.FC = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [activeTab, setActiveTab] = useState<TabType>("unused");

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

    // Update URL without page refresh
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.pushState({}, "", url.toString());
  };

  // Function to handle coupon code input change
  const handleCouponInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
  };

  // Function to handle apply button click
  const handleApply = () => {
    console.log("Applying coupon:", couponCode);
    // Add logic to apply coupon
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
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
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter coupon code"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
            value={couponCode}
            onChange={handleCouponInputChange}
          />
          <button
            className="py-3 px-8 bg-white text-neutral-900 font-medium border border-gray-300 rounded-full hover:bg-gray-50"
            onClick={handleApply}>
            Apply
          </button>
        </div>

        {/* Coupon list section */}
        <div className="space-y-4 mb-8">
          <div className="bg-white p-4 border border-gray-200 rounded-lg flex justify-between items-center hover:shadow-sm transition-shadow">
            <div className="text-neutral-900 font-medium">
              Seller's exclusive coupon for specific item
            </div>
            <ChevronRight className="text-gray-400" />
          </div>

          <div className="bg-white p-4 border border-gray-200 rounded-lg flex justify-between items-center hover:shadow-sm transition-shadow">
            <div className="text-neutral-900 font-medium">
              Temu's exclusive coupon for specific item
            </div>
            <ChevronRight className="text-gray-400" />
          </div>
        </div>

        {/* No coupons available section */}
        <div className="py-12 flex flex-col items-center justify-center">
          <div className="w-24 h-24 flex items-center justify-center border border-gray-200 rounded-lg mb-4">
            <Ticket className="text-gray-300 h-12 w-12" strokeWidth={1} />
          </div>
          <p className="text-neutral-900 font-medium text-lg mb-12">
            You don't have any coupons or offers available
          </p>

          {/* Help section */}
          <div className="w-full">
            <h3 className="text-neutral-900 font-medium mb-4">
              Can't find your coupon(s)?
            </h3>
            <div className="space-y-4">
              <div className="border border-gray-300 rounded-lg p-4 flex justify-between items-center">
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

              <div className="border border-gray-300 rounded-lg p-4 flex justify-between items-center">
                <span className="text-neutral-800">
                  Self-service to find coupon(s)
                </span>
                <ChevronRight className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
