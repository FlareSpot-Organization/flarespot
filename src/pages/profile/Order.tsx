import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "@/components/common/Loader";

// Types
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
}

interface ShippingDetails {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Order {
  id: string;
  date: string;
  deliveryDate: string;
  status: OrderStatus;
  trackingNumber?: string;
  products: Product[];
  total: number;
  shipTo: string;
  shipToDetails: ShippingDetails;
}

type OrderStatus = "all" | "processing" | "shipped" | "delivered" | "returns";

// Component
const Order: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Get the selected tab from search params or default to "all"
  const selectedTab = (searchParams.get("status") as OrderStatus) || "all";

  useEffect(() => {
    // Fetch dummy products and create orders
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const products = await response.json();
        console.log("Fetched products:", products);

        if (!Array.isArray(products) || products.length === 0) {
          console.warn("API returned empty or invalid products array");
        }

        // Generate dummy orders using the products
        const dummyOrders: Order[] = generateDummyOrders(products);
        setOrders(dummyOrders);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Generate some orders anyway with empty products array
        const dummyOrders: Order[] = generateDummyOrders([]);
        setOrders(dummyOrders);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Generate dummy orders with different statuses
  const generateDummyOrders = (products: any[]): Order[] => {
    const statuses: OrderStatus[] = [
      "processing",
      "shipped",
      "delivered",
      "delivered", // More delivered to match the image
      "returns",
    ];
    const dummyOrders: Order[] = [];
    const names = [
      "INESA PONOMARIOVAITE",
      "JOHN DOE",
      "JANE SMITH",
      "ROBERT JOHNSON",
    ];

    // Create 20 dummy orders
    for (let i = 1; i <= 20; i++) {
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];
      const orderProducts = [];

      // Create 1-3 products per order
      const numProducts = Math.floor(Math.random() * 2) + 1;

      // Either use a product from the API or create a custom one for the first product
      if (products.length > 0) {
        // For the first product in each order, randomly decide whether to show the shampoo or an API product
        if (i % 3 === 0) {
          // Shampoo product (as in the image)
          const shampooProduct = {
            id: 999 + i,
            title:
              "YAFUSIPE 2 Pack Ginger Hair Regrowth Shampoo Bar, Turmeric Bar Soap Shampoo for Hair Growth, Shampoo Bar Solid Ginger Shampoo Bars Ginger Soap Bars 4.23OZ/120g",
            price: 11.01,
            description: "Ginger hair regrowth shampoo bar",
            category: "beauty",
            image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg", // Using an actual FakeStore API image
            quantity: 2,
          };
          orderProducts.push(shampooProduct);
        } else {
          // Use a random product from the API
          const randomIndex = Math.floor(Math.random() * products.length);
          const apiProduct = {
            ...products[randomIndex],
            quantity: Math.floor(Math.random() * 2) + 1,
          };
          orderProducts.push(apiProduct);
        }
      } else {
        // Fallback if API doesn't return products
        const shampooProduct = {
          id: 999 + i,
          title:
            "YAFUSIPE 2 Pack Ginger Hair Regrowth Shampoo Bar, Turmeric Bar Soap Shampoo for Hair Growth, Shampoo Bar Solid Ginger Shampoo Bars Ginger Soap Bars 4.23OZ/120g",
          price: 11.01,
          description: "Ginger hair regrowth shampoo bar",
          category: "beauty",
          image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
          quantity: 2,
        };
        orderProducts.push(shampooProduct);
      }

      // Add additional random products if needed
      if (numProducts > 1 && products.length > 0) {
        // Find a different product than the first one (if possible)
        let randomIndex = Math.floor(Math.random() * products.length);

        // If we're using API products, make sure we don't duplicate
        if (orderProducts.length > 0 && products.length > 1) {
          // Try to find a different product index
          const firstProductId = orderProducts[0].id;
          let attempts = 0;

          while (products[randomIndex].id === firstProductId && attempts < 5) {
            randomIndex = Math.floor(Math.random() * products.length);
            attempts++;
          }
        }

        const additionalProduct = {
          ...products[randomIndex],
          quantity: Math.floor(Math.random() * 2) + 1,
        };
        orderProducts.push(additionalProduct);
      }

      // Create order date (use Dec 21, 2024 as in the image)
      const orderDate = new Date(2024, 11, 21); // Month is 0-indexed

      // Create delivery date (Dec 23, 2024 as in the image)
      const deliveryDate = new Date(2024, 11, 23);

      // Create return window date (January 31, 2025 as in the image)
      const returnWindowDate = new Date(2025, 0, 31);

      // Create random order ID in the format shown in the image
      const orderId = `114-${Math.floor(1000000 + Math.random() * 9000000)}`;

      // Randomly select a ship to name
      const shipToName = names[Math.floor(Math.random() * names.length)];

      // Create shipping address
      const shipToDetails = {
        address: `${Math.floor(Math.random() * 999) + 1} ${["Main", "Oak", "Maple", "Cedar", "Pine"][Math.floor(Math.random() * 5)]} ${["St", "Ave", "Blvd", "Rd", "Ln"][Math.floor(Math.random() * 5)]}`,
        city: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"][
          Math.floor(Math.random() * 5)
        ],
        state: ["NY", "CA", "IL", "TX", "AZ"][Math.floor(Math.random() * 5)],
        zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
        country: "United States",
      };

      dummyOrders.push({
        id: orderId,
        date: orderDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        deliveryDate: deliveryDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        }),
        status: randomStatus,
        products: orderProducts,
        total: 22.02,
        shipTo: shipToName,
        shipToDetails: shipToDetails,
      });
    }

    return dummyOrders;
  };

  // Handle tab change
  const handleTabChange = (status: OrderStatus) => {
    searchParams.set("status", status);
    setSearchParams(searchParams);

    // Close any open dropdown when changing tabs
    setActiveDropdown(null);
  };

  // Toggle shipping address dropdown
  const toggleShipToDropdown = (orderId: string) => {
    setActiveDropdown((prevActive) =>
      prevActive === orderId ? null : orderId
    );
  };

  // Filter orders based on selected tab
  const filteredOrders = orders.filter((order) =>
    selectedTab === "all" ? true : order.status === selectedTab
  );

  // Filter orders based on search query
  const searchedOrders = filteredOrders.filter((order) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    // Search by order ID or product title
    return (
      order.id.toString().includes(query) ||
      order.products.some((product) =>
        product.title.toLowerCase().includes(query)
      )
    );
  });

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-md">
      {/* Tabs */}
      <div className="flex border-b mb-8">
        {(
          [
            "all",
            "processing",
            "shipped",
            "delivered",
            "returns",
          ] as OrderStatus[]
        ).map((status) => (
          <button
            key={status}
            className={`px-4 py-2 capitalize ${
              selectedTab === status
                ? "border-b-2 border-blue-500 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => handleTabChange(status)}>
            {status === "all" ? "All orders" : status}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className="relative mb-8">
        <input
          type="search"
          className="w-full p-3 pl-10 pr-4 border rounded-lg"
          placeholder="Item name / Order ID / Tracking No."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <svg
          className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Orders list */}
      {loading ? (
        <Loader content="Fetching Orders" />
      ) : searchedOrders.length > 0 ? (
        <div className="grid gap-6">
          {searchedOrders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg bg-white shadow-sm overflow-hidden">
              {/* Order header section */}
              <div className="grid grid-cols-4 p-3 bg-white border-b">
                <div>
                  <div className="text-gray-600 text-xs font-medium">
                    ORDER PLACED
                  </div>
                  <div className="text-sm">{order.date}</div>
                </div>
                <div>
                  <div className="text-gray-600 text-xs font-medium">TOTAL</div>
                  <div className="text-sm">${order.total.toFixed(2)}</div>
                </div>
                <div className="relative">
                  <div className="text-gray-600 text-xs font-medium">
                    SHIP TO
                  </div>
                  <div
                    className="flex items-center text-blue-600 text-sm cursor-pointer"
                    onClick={() => toggleShipToDropdown(order.id)}>
                    {order.shipTo}
                    <svg
                      className={`h-3 w-3 ml-1 transition-transform ${activeDropdown === order.id ? "transform rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {/* Dropdown panel */}
                  {activeDropdown === order.id && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white border shadow-lg rounded-md z-10 p-3 text-black">
                      <div className="text-sm font-medium mb-1">
                        {order.shipTo}
                      </div>
                      <div className="text-xs text-gray-700">
                        {order.shipToDetails.address}
                      </div>
                      <div className="text-xs text-gray-700">
                        {order.shipToDetails.city}, {order.shipToDetails.state}{" "}
                        {order.shipToDetails.zipCode}
                      </div>
                      <div className="text-xs text-gray-700">
                        {order.shipToDetails.country}
                      </div>
                    </div>
                  )}
                </div>
                <div className="">
                  <div className="text-gray-600 text-right text-xs">
                    ORDER # {order.id}
                  </div>
                  <div className="flex justify-end gap-3 text-blue-600 text-xs">
                    <a href="#" className="hover:underline">
                      Order details
                    </a>
                    <a href="#" className="hover:underline">
                      Invoice
                    </a>
                  </div>
                </div>
              </div>

              {/* Order details section */}
              <div className="px-4">
                <div className="">
                  {/* Products section - shown for all order statuses */}
                  {order.products.map((product) => (
                    <div className="border-t py-3">
                      {/* Order status header - different for each status */}
                      {order.status === "delivered" && (
                        <div className="mb-3">
                          <h3 className="text-xs font-bold">
                            Delivered {order.deliveryDate}
                          </h3>
                          <p className="text-[10px] text-gray-700">
                            Your package was left near the front door or porch.
                          </p>
                        </div>
                      )}

                      {order.status === "processing" && (
                        <div className="mb-3">
                          <h3 className="text-[14px] font-bold">Processing</h3>
                          <p className="text-[12px] text-gray-700">
                            Your order is being prepared for shipment.
                          </p>
                        </div>
                      )}

                      {order.status === "shipped" && (
                        <div className="mb-3">
                          <h3 className="text-xs font-bold">Shipped</h3>
                          <p className="text-[10px] text-gray-700">
                            Your package is on its way. Expected delivery:{" "}
                            {order.deliveryDate}
                          </p>
                        </div>
                      )}

                      {order.status === "returns" && (
                        <div className="mb-3">
                          <h3 className="text-xs font-bold">
                            Return in Progress
                          </h3>
                          <p className="text-[10px] text-gray-700">
                            We're processing your return.
                          </p>
                        </div>
                      )}
                      <div key={product.id} className="flex gap-4 ">
                        <div className="w-20 h-20">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain border"
                          />
                        </div>
                        <div className="flex-1">
                          <a
                            href="#"
                            className="text-blue-600 hover:underline text-sm">
                            {product.title}
                          </a>
                          <div className="text-xs mt-1">
                            Return window closed on January 31, 2025
                          </div>
                          <div className="font-sans text-xs text-gray-600 flex flex-wrap items-center gap-x-3">
                            <p className="flex items-center">
                              <span className="font-medium mr-0.5">Color:</span>
                              <span>Blue</span>
                            </p>
                            <p className="flex items-center">
                              <span className="font-medium mr-0.5">Size:</span>
                              <span>M</span>
                            </p>
                            <p className="flex items-center">
                              <span className="font-medium mr-0.5">
                                Material:
                              </span>
                              <span>Cotton</span>
                            </p>
                            <p className="flex items-center">
                              <span className="font-medium mr-0.5">SKU:</span>
                              <span>BLU-M-2023</span>
                            </p>
                          </div>
                          <div className="mt-2 flex gap-1">
                            {/* <button className="bg-indigo-600 hover:bg-indigo-400 text-white px-2 py-1 text-xs rounded-full flex items-center gap-1">
                              <svg
                                className="h-3 w-3"
                                viewBox="0 0 24 24"
                                fill="currentColor">
                                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                                <path d="M11 11h2v6h-2zm0-4h2v2h-2z" />
                              </svg>
                              <span className="text-[10px]"> Buy it again</span>
                            </button> */}
                            <button className="border bg-indigo-600 hover:bg-indigo-400 text-white px-4 py-1 text-[10px] rounded-full">
                              View your item
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button className="border hover:bg-gray-100 text-black px-4 py-1 text-xs rounded-full w-48 text-center">
                            Ask Product Question
                          </button>
                          <button className="border hover:bg-gray-100 text-black px-4 py-1 text-xs rounded-full w-48 text-center">
                            Leave seller feedback
                          </button>
                          <button className="border hover:bg-gray-100 text-black px-4 py-1 text-xs rounded-full w-48 text-center">
                            Write a product review
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="mb-4">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect
                x="16"
                y="16"
                width="32"
                height="32"
                stroke="#E5E7EB"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M28 24L36 32M36 24L28 32"
                stroke="#E5E7EB"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">
            You don't have any orders
          </h3>

          <div className="mt-8 w-full max-w-xl">
            <h4 className="text-md font-medium mb-4">Can't find your order?</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <button className="flex justify-between items-center border rounded-lg p-4 text-left">
                <span>Try signing in with another account</span>
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button className="flex justify-between items-center border rounded-lg p-4 text-left">
                <span>Self-service to find order</span>
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button className="flex justify-between items-center border rounded-lg p-4 text-left md:col-span-2">
                <span>Switch countries to view orders in other countries</span>
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
