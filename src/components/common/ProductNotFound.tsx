import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  PackageSearch,
  ArrowLeft,
  Home,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProductNotFoundProps {
  itemId?: string | number;
  searchQuery?: string;
  suggestedProducts?: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  }>;
  popularCategories?: Array<{
    id: string;
    name: string;
  }>;
}

const ProductNotFound: React.FC<ProductNotFoundProps> = ({
  itemId,
  searchQuery = "",
  suggestedProducts = [],
}) => {
  const navigate = useNavigate();
  const [newSearchQuery, setNewSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSearchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(newSearchQuery)}&page=1`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-10">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-10">
          {/* Animated Icon with ItemID */}
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-[#222]/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-center">
              <PackageSearch className="w-28 h-28 text-[#222]" />
            </div>
            <div className="absolute -right-2 -bottom-2 bg-white rounded-full p-1 shadow-md">
              {itemId ? (
                <div className="w-8 h-8 rounded-full bg-[#222]/10 flex items-center justify-center text-[#222] font-bold text-xs border border-[#222]/20">
                  ID
                </div>
              ) : (
                <Search className="w-8 h-8 text-gray-500" />
              )}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h1>

          {itemId ? (
            <p className="text-lg text-gray-600 max-w-2xl">
              We couldn't find the product with ID:
              <span className="px-2 py-1 mx-1 bg-[#222]/5 text-[#222] rounded font-medium">
                {itemId}
              </span>
            </p>
          ) : searchQuery ? (
            <p className="text-lg text-gray-600 max-w-2xl">
              We couldn't find any products matching:
              <span className="px-2 py-1 mx-1 bg-[#222]/5 text-[#222] rounded font-medium">
                "{searchQuery}"
              </span>
            </p>
          ) : (
            <p className="text-lg text-gray-600 max-w-2xl">
              Sorry, we can't find the product you're looking for. It may be out
              of stock, discontinued, or the URL might be incorrect.
            </p>
          )}

          {itemId && (
            <div className="bg-[#222]/5 border border-[#222]/10 rounded-lg p-3 mt-4 max-w-lg mx-auto text-sm text-[#222]">
              <p>
                This product may have been removed or the product ID{" "}
                <strong>{itemId}</strong> might be incorrect.
              </p>
            </div>
          )}
        </div>

        {/* Search Again Section - Only if no suggested products or moved below them */}
        <div
          className={`max-w-2xl mx-auto ${suggestedProducts && suggestedProducts.length > 0 ? "mb-8" : "mb-12"}`}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            {itemId ? "Find the right product" : "Try searching again"}
          </h2>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder={
                itemId
                  ? "Search for a similar product..."
                  : "What are you looking for?"
              }
              className="flex-1"
              value={newSearchQuery}
              onChange={(e) => setNewSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              className="bg-[#222] hover:bg-[#333] text-white">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-3">
              {itemId ? "Looking for a specific item?" : "Search Tips:"}
            </h3>
            <ul className="space-y-2 text-gray-600">
              {itemId ? (
                <>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#222] flex-shrink-0" />
                    <span>
                      Try searching by product name instead of ID{" "}
                      <strong>{itemId}</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#222] flex-shrink-0" />
                    <span>Check our recommended alternatives above</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#222] flex-shrink-0" />
                    <span>
                      Contact customer support if you believe this is an error
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#222] flex-shrink-0" />
                    <span>Check for spelling errors or typos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#222] flex-shrink-0" />
                    <span>
                      Use more general keywords (e.g., "laptop" instead of
                      specific model)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#222] flex-shrink-0" />
                    <span>
                      Try searching by category or brand instead of product name
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Suggested Products Section - Prioritized */}
        {suggestedProducts && suggestedProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="h-0.5 bg-[#222]/10 flex-grow max-w-xs"></div>
              <h2 className="text-xl font-semibold text-gray-800 px-6">
                {itemId ? "Similar Products" : "You might be interested in"}
              </h2>
              <div className="h-0.5 bg-[#222]/10 flex-grow max-w-xs"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {suggestedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="block group">
                  <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#222] hover:shadow-md transition-all h-full flex flex-col">
                    <div className="h-48 overflow-hidden bg-gray-100 relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      {itemId && (
                        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-[#222]">
                          ID: {product.id}
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className="font-medium text-gray-800 mb-1 group-hover:text-[#222] transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-[#222] font-semibold">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {product.category}
                      </p>
                      <div className="mt-auto pt-3">
                        <div className="text-xs inline-block px-2 py-1 bg-[#222]/5 text-[#222] rounded-full">
                          {itemId ? "Similar item" : "Recommended"}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {itemId && (
              <p className="text-center text-sm text-gray-500 mt-4">
                These products are similar to the one you were looking for (ID:{" "}
                {itemId})
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="outline"
            className="flex items-center"
            onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>

          <Link to="/">
            <Button variant="outline" className="flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Home Page
            </Button>
          </Link>

          <Link
            to={
              itemId && suggestedProducts && suggestedProducts.length > 0
                ? `/product/${suggestedProducts[0].id}`
                : "/shop"
            }>
            <Button className="bg-[#222] hover:bg-[#333] text-white flex items-center">
              <ShoppingBag className="w-4 h-4 mr-2" />
              {itemId && suggestedProducts && suggestedProducts.length > 0
                ? "View Similar Product"
                : "Continue Shopping"}
            </Button>
          </Link>
        </div>

        {/* ItemID troubleshooting - Only shows when ItemID is provided */}
        {itemId && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-sm text-gray-500 mb-2">
                Looking for product with ID: <strong>{itemId}</strong>
              </p>
              <p className="text-xs text-gray-400">
                If you believe this product should exist, please contact our
                customer support with reference to this ID.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductNotFound;
