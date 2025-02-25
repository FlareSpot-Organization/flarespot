import React, { useState, FormEvent, ChangeEvent } from "react";
import { Search, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useProductsFetch from "@/hooks/useProductsFetch";
import { ProductCardProps } from "@/types/product_types";

interface Price {
  amount: string;
  currency: string;
}

interface Deal {
  deal_id: string;
  deal_type: string;
  deal_title: string;
  deal_photo: string;
  deal_state: string;
  deal_url: string;
  canonical_deal_url: string;
  deal_starts_at: string;
  deal_ends_at: string;
  deal_price: Price;
  list_price: Price;
  savings_percentage: number;
  savings_amount: Price;
  deal_badge: string;
  type: string;
  product_asin: string;
}

const SearchBar = ({ setIsMobileMenuOpen }: { setIsMobileMenuOpen?: any }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const { deals } = useProductsFetch();
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setShowSuggestions(false);
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSuggestionClick = (suggestion: ProductCardProps): void => {
    setSearchTerm(suggestion?.item?.title);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(suggestion?.item?.title)}`);
  };

  const filteredSuggestions = deals?.filter((deal: ProductCardProps) =>
    deal?.item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for..."
            className="w-full px-4 py-1.5 bg-white text-[14px] dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full pl-6  outline-none border dark:border-gray-700 focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary/25 transition-shadow"
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <Camera className="h-5 w-5 text-gray-400 dark:text-gray-500 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300" />
            <button
              type="submit"
              className="border dark:border-gray-700 rounded-full px-4 py-1.5 bg-primary dark:bg-[#131920] hover:bg-primary/90 transition-colors">
              <Search className="h-5 w-5 text-white dark:text-gray-400" />
            </button>
          </div>
        </div>
      </form>
      {/* 
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg dark:shadow-gray-900/50 z-50 max-h-96 overflow-y-auto border dark:border-gray-700">
          {filteredSuggestions.map((suggestion: ProductCardProps) => (
            <button
              key={suggestion.item.itemId}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex justify-between items-center group border-b dark:border-gray-700 last:border-b-0">
              <div className="flex items-center space-x-3">
                <img
                  src={suggestion?.item?.image}
                  alt={suggestion?.item?.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
                    {suggestion?.item?.title}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  ${suggestion?.item?.sku?.def?.promotionPrice}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
                  ${suggestion?.item?.sku?.def?.price}
                </span>
              </div>
            </button>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default SearchBar;
