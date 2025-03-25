import React, { useState } from "react";
import { X } from "lucide-react";
import { Product } from "@/types/public";

// Product Selection Modal
const ProductSelectionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  products: Product[];
}> = ({ isOpen, onClose, onSelectProduct, products }) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select a Product to Review</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="relative mb-4">
          <input
            type="search"
            className="w-full p-3 pl-10 pr-4 border rounded-md"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 flex items-center gap-3 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50"
              onClick={() => onSelectProduct(product)}>
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-16 object-contain"
              />
              <div className="flex-1">
                <h5 className="font-medium text-sm line-clamp-2">
                  {product.title}
                </h5>
                <p className="text-xs text-gray-500 mt-1">{product.category}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No products found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSelectionModal;
