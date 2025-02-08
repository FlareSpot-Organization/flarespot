import React, { useState, useRef } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface FilterOption {
  icon?: any;
  children: string[];
  type?: "sort" | "regular";
}

type FilterOptions = {
  [key: string]: FilterOption;
};

const FilterSection = () => {
  const [openFilter, setOpenFilter] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  const filterOptions: FilterOptions = {
    Filters: {
      icon: <Filter size={14} className="mx-2" />,
      children: ["Price Range", "Rating", "Shipping Options", "Seller Rating"],
      type: "regular",
    },
    "Sort by: Relevance": {
      children: ["Relevance", "Top sales", "Most recent", "Price"],
      type: "sort",
    },
    Category: {
      children: [
        "Headphones, Earbuds & Accessories",
        "Motorcycles",
        "Smartwatch & Accessories",
      ],
      type: "regular",
    },
    "Battery Properties": {
      children: ["300mAh", "400mAh", "500mAh", "1000mAh"],
      type: "regular",
    },
    "Wireless Property": {
      children: [
        "wireless",
        "other wireless functions",
        "NFC",
        "With wireless charging function",
        "With app function",
        "With Wi-Fi function",
      ],
      type: "regular",
    },
    "Rechargeable Battery": {
      children: ["Rechargeable Battery", "Without Battery"],
      type: "regular",
    },
  };

  const handleFilterClick = (filterName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (filterName === "Filters") {
      setShowSidebar(true);
      return;
    }

    if (openFilter === filterName) {
      setOpenFilter("");
      return;
    }

    const button = e.currentTarget as HTMLButtonElement;
    const rect = button.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      setDropdownPosition({
        top: rect.bottom - containerRect.top,
        left: rect.left - containerRect.left,
      });
    }

    setOpenFilter(filterName);
  };

  const handleOptionSelect = (filterName: string, option: string) => {
    if (filterOptions[filterName].type === "sort") {
      setSelectedOptions((prev) => ({
        ...prev,
        [filterName]: [option],
      }));
      setOpenFilter("");
    } else {
      setSelectedOptions((prev) => ({
        ...prev,
        [filterName]: prev[filterName]?.includes(option)
          ? prev[filterName].filter((item) => item !== option)
          : [...(prev[filterName] || []), option],
      }));
    }
  };

  const getFilterChildren = (filterName: string): string[] => {
    return filterOptions[filterName]?.children || [];
  };

  return (
    <div className="w-full rounded-lg mt-8" ref={containerRef}>
      <div className="flex items-center space-x-2">
        {Object.entries(filterOptions).map(([name, { icon, type }]) => (
          <button
            onClick={(e) => handleFilterClick(name, e)}
            className={`flex items-center  px-3 py-2 rounded-full ${
              openFilter === name || (name === "Filters" && showSidebar)
                ? "bg-white text-[#000] shadow-md"
                : "bg-gray-100 text-[#838181]"
            } hover:bg-gray-100 text-sm text-gray-700 `}>
            {icon && <span>{icon}</span>}
            {name}
            <ChevronDown
              className={`w-4 h-4 ml-1 transform transition-transform ${
                openFilter === name ? "rotate-180" : ""
              }`}
            />
          </button>
        ))}

        {/* Sidebar for Filters */}
        {showSidebar && (
          <div className="fixed inset-0 bg-black bg-opacity-30 z-40">
            <div
              className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50"
              onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={() => setShowSidebar(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto h-[calc(100%-130px)] p-4">
                {Object.entries(filterOptions)
                  .filter(
                    ([name, { type }]) =>
                      name !== "Filters" && name !== "Sort by: Relevance"
                  )
                  .map(([name, { children }]) => (
                    <div key={name} className="mb-6">
                      <h4 className="text-base font-medium mb-3">{name}</h4>
                      <div className="space-y-2">
                        {children.map((option) => (
                          <label
                            key={option}
                            className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={
                                selectedOptions[name]?.includes(option) || false
                              }
                              onChange={() => handleOptionSelect(name, option)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t">
                <div className="flex gap-4">
                  <button
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      const newSelectedOptions = { ...selectedOptions };
                      Object.keys(filterOptions).forEach((key) => {
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
        )}

        {/* Sort Dropdown */}
        {openFilter && filterOptions[openFilter].type === "sort" && (
          <div
            className="absolute z-50 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[160px]"
            style={{
              top: `${dropdownPosition.top + 8}px`,
              left: `${dropdownPosition.left}px`,
            }}>
            {getFilterChildren(openFilter).map((option) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(openFilter, option)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                {option}
                {selectedOptions[openFilter]?.[0] === option && (
                  <span className="ml-2 text-blue-600">✓</span>
                )}
              </button>
            ))}
          </div>
        )}

        <button
          ref={navigationPrevRef}
          className="shadow-xl hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-6 sm:w-8 h-6 sm:h-8 items-center justify-center rounded-full bg-white hover:bg-white transition-colors duration-200">
          <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
        </button>
        <button
          ref={navigationNextRef}
          className="shadow-xl hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-6 sm:w-8 h-6 sm:h-8 items-center justify-center rounded-full bg-white hover:bg-white transition-colors duration-200">
          <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
