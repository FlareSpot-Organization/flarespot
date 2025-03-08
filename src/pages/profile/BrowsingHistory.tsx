import React, { useState, useEffect } from "react";
import {
  Trash2,
  Clock,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import Loader from "@/components/common/Loader";

// Define types
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  viewedAt: string; // When the product was viewed
}

interface HistoryGroup {
  date: string;
  products: Product[];
}

const BrowsingHistory: React.FC = () => {
  const [historyGroups, setHistoryGroups] = useState<HistoryGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);

  // Fetch products from Fakestore API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        let products: Product[] = await response.json();

        // Add random viewed dates within the last 30 days
        products = products.map((product) => {
          const daysAgo = Math.floor(Math.random() * 30);
          const viewedDate = new Date();
          viewedDate.setDate(viewedDate.getDate() - daysAgo);

          return {
            ...product,
            viewedAt: viewedDate.toISOString(),
          };
        });

        // Sort by viewed date (newest first)
        products.sort(
          (a, b) =>
            new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime()
        );

        // Group by date
        const groups: HistoryGroup[] = [];
        products.forEach((product) => {
          const viewedDate = new Date(product.viewedAt);
          const dateString = viewedDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          });

          let group = groups.find((g) => g.date === dateString);
          if (!group) {
            group = { date: dateString, products: [] };
            groups.push(group);
          }

          group.products.push(product);
        });

        setHistoryGroups(groups);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter history groups based on search term
  const filteredHistoryGroups = historyGroups
    .map((group) => {
      return {
        ...group,
        products: group.products.filter(
          (product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      };
    })
    .filter((group) => group.products.length > 0);

  // Handle product selection
  const toggleProductSelection = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Handle select all for a specific date
  const toggleSelectAllForDate = (date: string) => {
    const group = historyGroups.find((g) => g.date === date);
    if (!group) return;

    const productIds = group.products.map((p) => p.id);

    if (productIds.every((id) => selectedProducts.includes(id))) {
      // If all are selected, deselect them
      setSelectedProducts(
        selectedProducts.filter((id) => !productIds.includes(id))
      );
    } else {
      // Otherwise, select all
      const newSelectedProducts = [...selectedProducts];
      productIds.forEach((id) => {
        if (!newSelectedProducts.includes(id)) {
          newSelectedProducts.push(id);
        }
      });
      setSelectedProducts(newSelectedProducts);
    }
  };

  // Handle delete selected products
  const deleteSelectedProducts = () => {
    const updatedGroups = historyGroups
      .map((group) => {
        return {
          ...group,
          products: group.products.filter(
            (product) => !selectedProducts.includes(product.id)
          ),
        };
      })
      .filter((group) => group.products.length > 0);

    setHistoryGroups(updatedGroups);
    setSelectedProducts([]);
    setIsSelectMode(false);
  };

  // Handle delete single product
  const deleteProduct = (productId: number) => {
    const updatedGroups = historyGroups
      .map((group) => {
        return {
          ...group,
          products: group.products.filter(
            (product) => product.id !== productId
          ),
        };
      })
      .filter((group) => group.products.length > 0);

    setHistoryGroups(updatedGroups);
  };

  // Handle clear all history
  const clearAllHistory = () => {
    setHistoryGroups([]);
    setSelectedProducts([]);
    setIsSelectMode(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6">Browsing History</h1>

        {/* Search and Actions */}
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search your browsing history"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-3">
            {isSelectMode ? (
              <>
                <button
                  onClick={() => setIsSelectMode(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button
                  onClick={deleteSelectedProducts}
                  disabled={selectedProducts.length === 0}
                  className={`px-4 py-2 rounded-lg text-white flex items-center ${
                    selectedProducts.length > 0
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-red-300 cursor-not-allowed"
                  }`}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected ({selectedProducts.length})
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsSelectMode(true)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
                  Select
                </button>
                <button
                  onClick={clearAllHistory}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && <Loader content="Loading History" />}

      {/* Empty State */}
      {!loading && historyGroups.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
          <div className="bg-gray-100 p-6 rounded-full mb-4">
            <Clock className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            No browsing history
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            Products you've viewed will appear here. Start exploring to see your
            browsing history.
          </p>
        </div>
      )}

      {/* History Groups */}
      {!loading &&
        filteredHistoryGroups.map((group) => (
          <div key={group.date} className="mb-10">
            {/* Date Header with Select All option */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium text-gray-800">
                {group.date}
              </h2>
              {isSelectMode && (
                <button
                  onClick={() => toggleSelectAllForDate(group.date)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  {group.products.every((product) =>
                    selectedProducts.includes(product.id)
                  )
                    ? "Deselect All"
                    : "Select All"}
                </button>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {group.products.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition duration-200 relative ${
                    isSelectMode && selectedProducts.includes(product.id)
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}>
                  {/* Selection Checkbox */}
                  {isSelectMode && (
                    <div className="absolute top-2 left-2 z-10">
                      <div
                        className={`h-5 w-5 rounded border flex items-center justify-center cursor-pointer ${
                          selectedProducts.includes(product.id)
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300 bg-white"
                        }`}
                        onClick={() => toggleProductSelection(product.id)}>
                        {selectedProducts.includes(product.id) && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Delete Button */}
                  {!isSelectMode && (
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 hover:bg-gray-100"
                      title="Remove from history">
                      <XCircle className="h-5 w-5 text-gray-500" />
                    </button>
                  )}

                  {/* Product Image */}
                  <div className="h-48 flex items-center justify-center p-4 bg-gray-50 relative group">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-1">
                      {product.category}
                    </div>
                    <h3
                      className="font-medium text-gray-900 mb-1 line-clamp-2 h-12"
                      title={product.title}>
                      {product.title}
                    </h3>

                    {/* Price and Rating */}
                    <div className="flex justify-between items-center mt-2">
                      <div className="font-semibold text-lg">
                        ${product.price.toFixed(2)}
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center mr-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`h-4 w-4 ${
                                star <= Math.round(product.rating.rate)
                                  ? "text-black"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          ({product.rating.count})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      {/* No Results Found */}
      {!loading && searchTerm && filteredHistoryGroups.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
          <div className="bg-gray-100 p-6 rounded-full mb-4">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            No results found
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            We couldn't find any products matching "{searchTerm}" in your
            browsing history.
          </p>
        </div>
      )}

      {/* Pagination */}
      {!loading && filteredHistoryGroups.length > 0 && (
        <div className="flex justify-center mt-12 mb-8">
          <nav className="flex items-center">
            <button
              className="p-2 border rounded-l-lg hover:bg-gray-50 disabled:opacity-50"
              disabled>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="px-4 py-2 border-t border-b">
              <span className="font-medium">1</span> of <span>1</span>
            </div>
            <button
              className="p-2 border rounded-r-lg hover:bg-gray-50 disabled:opacity-50"
              disabled>
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default BrowsingHistory;
