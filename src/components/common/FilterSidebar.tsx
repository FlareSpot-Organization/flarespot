import React, { useState } from "react";
import { X } from "lucide-react";
interface SelectedOptions {
  [key: string]: string[];
}

interface FilterSidebarProps {
  setShowSidebar: (show: boolean) => void;
  selectedOptions: SelectedOptions;
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  setShowSidebar,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [customLocation, setCustomLocation] = useState<string>("");
  const [customPriceLow, setCustomPriceLow] = useState<string>("");
  const [customPriceHigh, setCustomPriceHigh] = useState<string>("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-40">
      <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto pb-24">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button onClick={() => setShowSidebar(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Filter by category */}
          <div>
            <h4 className="font-medium mb-2">Filter by category</h4>
            <button className="w-full p-3 border rounded-lg text-left flex justify-between items-center">
              <span>Baby Carriers & Wraps</span>
              <span>&gt;</span>
            </button>
          </div>

          {/* Special offers */}
          <div>
            <h4 className="font-medium mb-2">Special offers</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>FREE shipping</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>On sale</span>
              </label>
            </div>
          </div>

          {/* Shop Location */}
          <div>
            <h4 className="font-medium mb-2">Shop Location</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="radio" name="location" defaultChecked />
                <span>Anywhere</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="location" />
                <span>Nigeria</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="location" />
                <span>Custom</span>
              </label>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full p-2 border rounded-lg mt-2"
                value={customLocation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCustomLocation(e.target.value)
                }
              />
            </div>
          </div>

          {/* Item format */}
          <div>
            <h4 className="font-medium mb-2">Item format</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="radio" name="format" defaultChecked />
                <span>All</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="format" />
                <span>Physical items</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="format" />
                <span>Digital downloads</span>
              </label>
            </div>
          </div>

          {/* Etsy's best */}
          <div>
            <h4 className="font-medium mb-2">Etsy's best</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Etsy's Pick</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="text-purple-600">Star Seller</span>
                    <span className="text-purple-600">★</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Consistently earned 5-star reviews, shipped orders on time,
                    and replied quickly to messages
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Ready to ship */}
          <div>
            <h4 className="font-medium mb-2">Ready to ship in</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>1 day</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>1-3 days</span>
              </label>
            </div>
          </div>

          {/* Price */}
          <div>
            <h4 className="font-medium mb-2">Price ($)</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="radio" name="price" defaultChecked />
                <span>Any price</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="price" />
                <span>Under USD 25</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="price" />
                <span>USD 25 to USD 50</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="price" />
                <span>USD 50 to USD 100</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="price" />
                <span>Over USD 100</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="price" />
                <span>Custom</span>
              </label>
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  placeholder="Low"
                  className="w-24 p-2 border rounded-lg"
                  value={customPriceLow}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCustomPriceLow(e.target.value)
                  }
                />
                <span>to</span>
                <input
                  type="text"
                  placeholder="High"
                  className="w-24 p-2 border rounded-lg"
                  value={customPriceHigh}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCustomPriceHigh(e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Color */}
          <div>
            <h4 className="font-medium mb-2">Color</h4>
            <div className="space-y-2">
              {["Beige", "Black", "Blue", "Bronze", "Brown"].map((color) => (
                <label key={color} className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>{color}</span>
                </label>
              ))}
              <button className="text-gray-600 flex items-center space-x-1">
                <span>Show more</span>
              </button>
            </div>
          </div>

          {/* Item type */}
          <div>
            <h4 className="font-medium mb-2">Item type</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="radio" name="type" defaultChecked />
                <span>All items</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="type" />
                <span>Vintage</span>
              </label>
            </div>
          </div>

          {/* Ordering options */}
          <div>
            <h4 className="font-medium mb-2">Ordering options</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Accepts Etsy gift cards</span>
              </label>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-80 p-4 bg-white border-t">
          <div className="flex gap-4">
            <button
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
              onClick={() => {
                const newSelectedOptions = { ...selectedOptions };
                Object.keys(newSelectedOptions).forEach((key) => {
                  if (key !== "Filters" && key !== "Sort by: Relevance") {
                    newSelectedOptions[key] = [];
                  }
                });
                setSelectedOptions(newSelectedOptions);
              }}>
              Reset
            </button>
            <button
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
              onClick={() => setShowSidebar(false)}>
              Show results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
