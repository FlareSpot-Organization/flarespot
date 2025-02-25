import React, { useState, useRef } from "react";
import { ChevronDown, Filter } from "lucide-react";
import FilterSidebar from "./FilterSidebar";

interface FilterOption {
  icon?: any;
  children: string[];
  type?: "sort" | "regular";
}

type FilterOptions = {
  [key: string]: FilterOption;
};

const FilterSection = ({ productsSearch }: { productsSearch: any }) => {
  const [openFilter, setOpenFilter] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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
    }
  };

  return (
    <div
      className="w-full max-w-[1600px] mx-auto rounded-lg mt-8"
      ref={containerRef}>
      <div className="flex items-center justify-between">
        <button
          onClick={(e) => handleFilterClick("Filters", e)}
          className={`flex items-center px-3 py-2 rounded-full ${
            showSidebar
              ? "bg-white text-[#000] shadow-md"
              : "bg-gray-100 text-[#838181]"
          } hover:bg-gray-100 text-sm text-gray-700`}>
          <Filter size={14} className="mx-2" />
          Filters
        </button>

        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-4">
            {productsSearch?.length}+ items
          </span>
          <button
            onClick={(e) => handleFilterClick("Sort by: Relevance", e)}
            className={`flex items-center px-3 py-2 rounded-full ${
              openFilter === "Sort by: Relevance"
                ? "bg-white text-[#000] shadow-md"
                : "bg-gray-100 text-[#838181]"
            } hover:bg-gray-100 text-sm text-gray-700`}>
            Sort by: Relevance
            <ChevronDown
              className={`w-4 h-4 ml-1 transform transition-transform ${
                openFilter === "Sort by: Relevance" ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {showSidebar && (
          <FilterSidebar
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            setShowSidebar={setShowSidebar}
          />
        )}

        {openFilter && filterOptions[openFilter].type === "sort" && (
          <div
            className="absolute z-50 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[160px]"
            style={{
              top: `${dropdownPosition.top + 8}px`,
              left: `${dropdownPosition.left}px`,
            }}>
            {filterOptions[openFilter].children.map((option) => (
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
      </div>
    </div>
  );
};

export default FilterSection;
