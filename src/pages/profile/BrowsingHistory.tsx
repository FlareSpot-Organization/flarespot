import React, { useState, useEffect } from "react";
import {
  Trash2,
  Clock,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Eye,
  CheckCircle,
} from "lucide-react";
import Loader from "@/components/common/Loader";
import { Link } from "react-router-dom";
import { formatPrice } from "@/utils/Formatter";

// Define types
interface Product {
  itemId: number;
  title: string;
  price: string;
  promotionPrice?: string | null;
  images: string[];
  description?: any;
  catId: number;
  itemUrl: string;
  properties?: any;
  timeStamps: number;
  sku?: any;
}

interface HistoryGroup {
  date: string;
  products: Product[];
}

// Import or redefine the Pagination component
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  const generatePageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    // Always add page 1
    pages.push(1);

    // Add ellipsis after 1 if current page is not near the beginning
    if (validCurrentPage > 3) {
      pages.push("...");
    }

    // Add the current page and one adjacent page on each side if not already included
    const startPage = Math.max(2, validCurrentPage - 1);
    const endPage = Math.min(totalPages - 1, validCurrentPage + 1);

    // Only add pages if they're not already included and they're valid
    for (let i = startPage; i <= endPage; i++) {
      // Skip adding page 1 again since we already added it
      if (i > 1 && (validCurrentPage <= 3 || i >= validCurrentPage - 1)) {
        pages.push(i);
      }
    }

    // Add ellipsis and last page if needed
    if (validCurrentPage < totalPages - 2) {
      pages.push("...");
    }

    // Add the last page if it's not already included
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex items-center space-x-2 mt-3">
      <button
        onClick={() => onPageChange(validCurrentPage - 1)}
        disabled={validCurrentPage === 1}
        className="px-3 py-1 rounded-full bg-white">
        <ChevronLeft />
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm
              ${
                page === validCurrentPage
                  ? "bg-black text-white"
                  : page === "..."
                    ? "cursor-default text-gray-500"
                    : "bg-white text-black border"
              }
            `}
          disabled={page === "..."}>
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(validCurrentPage + 1)}
        disabled={validCurrentPage === totalPages}
        className="px-3 py-1 rounded-full bg-white">
        <ChevronRight />
      </button>
    </div>
  );
};

// Number of products to display per page
const ITEMS_PER_PAGE = 10;

const BrowsingHistory: React.FC = () => {
  const [historyGroups, setHistoryGroups] = useState<HistoryGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Load products from localStorage
  useEffect(() => {
    const loadProductsFromLocalStorage = () => {
      try {
        setLoading(true);
        const recentlyViewed = localStorage.getItem("recently_viewed");
        let products: Product[] = recentlyViewed
          ? JSON.parse(recentlyViewed)
          : [];

        // Sort by timeStamps (newest first)
        products.sort((a, b) => b.timeStamps - a.timeStamps);

        // Group by date
        const groups: HistoryGroup[] = [];
        products.forEach((product) => {
          const viewedDate = new Date(product.timeStamps);
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
        console.error("Error loading products from localStorage:", error);
        setLoading(false);
      }
    };

    loadProductsFromLocalStorage();
  }, []);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Filter history groups based on search term
  const filteredHistoryGroups = historyGroups
    .map((group) => {
      return {
        ...group,
        products: group.products.filter(
          (product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.properties?.list?.some((item: any) =>
              item.value.toLowerCase().includes(searchTerm.toLowerCase())
            ) ??
              false)
        ),
      };
    })
    .filter((group) => group.products.length > 0);

  // Flatten all products for pagination
  const allFilteredProducts = filteredHistoryGroups.flatMap((group) =>
    group.products.map((product) => ({
      ...product,
      dateGroup: group.date,
    }))
  );

  // Calculate pagination details
  const totalProducts = allFilteredProducts.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  // Get current page products
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = allFilteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Group current page products by date
  const paginatedGroups: HistoryGroup[] = [];
  currentProducts.forEach((product) => {
    const { dateGroup, ...productWithoutDateGroup } = product as any;

    let group = paginatedGroups.find((g) => g.date === dateGroup);
    if (!group) {
      group = { date: dateGroup, products: [] };
      paginatedGroups.push(group);
    }

    group.products.push(productWithoutDateGroup);
  });

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle product selection
  const toggleProductSelection = (
    productId: number,
    event: React.MouseEvent
  ) => {
    // Prevent event from bubbling up to parent elements
    event.stopPropagation();

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

    const productIds = group.products.map((p) => p.itemId);

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
            (product) => !selectedProducts.includes(product.itemId)
          ),
        };
      })
      .filter((group) => group.products.length > 0);

    updateLocalStorage(updatedGroups);
    setHistoryGroups(updatedGroups);
    setSelectedProducts([]);
    setIsSelectMode(false);
  };

  // Handle delete single product
  const deleteProduct = (productId: number, event: React.MouseEvent) => {
    // Prevent event from bubbling up to parent elements
    event.stopPropagation();

    const updatedGroups = historyGroups
      .map((group) => {
        return {
          ...group,
          products: group.products.filter(
            (product) => product.itemId !== productId
          ),
        };
      })
      .filter((group) => group.products.length > 0);

    updateLocalStorage(updatedGroups);
    setHistoryGroups(updatedGroups);
  };

  // Handle clear all history
  const clearAllHistory = () => {
    localStorage.removeItem("recently_viewed");
    setHistoryGroups([]);
    setSelectedProducts([]);
    setIsSelectMode(false);
  };

  // Update local storage after modifications
  const updateLocalStorage = (groups: HistoryGroup[]) => {
    const allProducts = groups.flatMap((group) => group.products);
    localStorage.setItem("recently_viewed", JSON.stringify(allProducts));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-md">
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

      {/* History Groups - Paginated */}
      {!loading &&
        paginatedGroups.map((group) => (
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
                    selectedProducts.includes(product.itemId)
                  )
                    ? "Deselect All"
                    : "Select All"}
                </button>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
              {group.products.map((product) => {
                const originalPrice = parseFloat(product?.sku?.def?.price);
                const promotionalPrice = parseFloat(
                  product?.sku?.def?.promotionPrice
                );
                const savingsAmount = originalPrice - promotionalPrice;
                const savingsPercentage = Math.round(
                  (savingsAmount / originalPrice) * 100
                );
                return (
                  <div key={product.itemId} className="group relative">
                    <div className="relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 p-1 hover:shadow">
                      {/* Select Checkbox - Only visible in Select Mode */}
                      {isSelectMode && (
                        <div
                          className="absolute top-2 right-1 z-10 p-1 rounded-full bg-gray-500 shadow-md"
                          onClick={(e) =>
                            toggleProductSelection(product.itemId, e)
                          }>
                          <div
                            className={`w-5 h-5 rounded-full border  flex items-center justify-center
                            ${
                              selectedProducts.includes(product.itemId)
                                ? "bg-blue-600 border-blue-600"
                                : "border-gray-300 bg-white"
                            }`}>
                            {selectedProducts.includes(product.itemId) && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                        </div>
                      )}

                      {/* Discount Tag */}
                      {product.sku?.def?.promotionPrice &&
                        savingsPercentage > 0 && (
                          <div className="absolute top-4 left-4 z-[5]">
                            <div className="bg-[#131920] dark:bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                              {savingsPercentage}% OFF
                            </div>
                          </div>
                        )}

                      {/* Image */}
                      <div className="aspect-square bg-gray-50 flex items-center justify-center rounded-md overflow-hidden">
                        <img
                          referrerPolicy="no-referrer"
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-1">
                        <div className="mb-1">
                          <h3 className="text-[14px] font-medium text-gray-900 dark:text-gray-100 line-clamp-2 mb-2">
                            {product.title}
                          </h3>
                        </div>

                        <div className=" items-center justify-between">
                          <div>
                            <div className="flex items-baseline gap-1">
                              {/* Check if promotion price exists and is different from regular price */}
                              {product.sku?.def?.promotionPrice &&
                              product.sku.def.promotionPrice !==
                                product.sku.def.price ? (
                                <>
                                  {/* Display promotion price as main price */}
                                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                                    {product.sku.def.promotionPrice}
                                  </span>
                                  {/* Show original price with line-through */}
                                  <span className="text-xs text-gray-400 line-through">
                                    {product.sku.def.price}
                                  </span>
                                </>
                              ) : (
                                /* If no promotion or promotion is same as regular price, just show regular price */
                                <span className="text-md font-bold text-gray-900 dark:text-gray-100">
                                  {product.sku?.def?.price}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex mt-3 space-x-2">
                            <Link
                              to={`/product?itemId=${product.itemId}`}
                              className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                              onClick={(e) => e.stopPropagation()}>
                              <Eye className="w-3 h-3" />
                            </Link>
                            <button
                              className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                              onClick={(e) => deleteProduct(product.itemId, e)}>
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}

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
    </div>
  );
};

export default BrowsingHistory;
