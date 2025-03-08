import Loader from "@/components/common/Loader";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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

interface Order {
  id: number;
  date: string;
  status: OrderStatus;
  trackingNumber?: string;
  products: Product[];
  total: number;
}

type OrderStatus = "all" | "processing" | "shipped" | "delivered" | "returns";

// Component
const Order: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Get the selected tab from search params or default to "all"
  const selectedTab = (searchParams.get("status") as OrderStatus) || "all";

  useEffect(() => {
    // Fetch dummy products and create orders
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();

        // Generate dummy orders using the products
        const dummyOrders: Order[] = generateDummyOrders(products);
        setOrders(dummyOrders);
      } catch (error) {
        console.error("Error fetching products:", error);
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
      "returns",
    ];
    const dummyOrders: Order[] = [];

    // Create 20 dummy orders
    for (let i = 1; i <= 20; i++) {
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];
      const orderProducts = [];
      const numProducts = Math.floor(Math.random() * 3) + 1; // 1-3 products per order

      let total = 0;
      for (let j = 0; j < numProducts; j++) {
        const randomProductIndex = Math.floor(Math.random() * products.length);
        const product = products[randomProductIndex];
        const quantity = Math.floor(Math.random() * 3) + 1;

        orderProducts.push({
          ...product,
          quantity,
        });

        total += product.price * quantity;
      }

      // Create tracking number for shipped and delivered orders
      const trackingNumber =
        randomStatus === "shipped" || randomStatus === "delivered"
          ? `TRK${Math.floor(1000000 + Math.random() * 9000000)}`
          : undefined;

      // Create random date within the last 30 days
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));

      dummyOrders.push({
        id: i,
        date: date.toISOString().split("T")[0],
        status: randomStatus,
        trackingNumber,
        products: orderProducts,
        total: parseFloat(total.toFixed(2)),
      });
    }

    return dummyOrders;
  };

  // Handle tab change
  const handleTabChange = (status: OrderStatus) => {
    searchParams.set("status", status);
    setSearchParams(searchParams);
  };

  // Filter orders based on selected tab
  const filteredOrders = orders.filter((order) =>
    selectedTab === "all" ? true : order.status === selectedTab
  );

  // Filter orders based on search query
  const searchedOrders = filteredOrders.filter((order) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    // Search by order ID, tracking number, or product title
    return (
      order.id.toString().includes(query) ||
      (order.trackingNumber &&
        order.trackingNumber.toLowerCase().includes(query)) ||
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
    <div className="container mx-auto px-4 py-8">
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
            <div key={order.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-500">
                    Placed on {order.date}
                  </p>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "processing"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "shipped"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}>
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>
              </div>

              {order.trackingNumber && (
                <div className="mb-4">
                  <p className="text-sm">
                    <span className="text-gray-500">Tracking Number:</span>{" "}
                    {order.trackingNumber}
                  </p>
                </div>
              )}

              <div className="border-t pt-4">
                {order.products.map((product) => (
                  <div key={product.id} className="flex mb-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-contain mr-4"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{product.title}</h4>
                      <p className="text-sm text-gray-500">
                        Qty: {product.quantity}
                      </p>
                      <p className="text-sm">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 text-right">
                <p className="font-semibold">
                  Total: ${order.total.toFixed(2)}
                </p>
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
