import React, { useState, useRef, useEffect } from "react";
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
  >({
    "Sort by: Relevance": ["Relevance"],
  });

  const sortButtonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openFilter &&
        dropdownRef.current &&
        sortButtonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !sortButtonRef.current.contains(event.target as Node)
      ) {
        setOpenFilter("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openFilter]);

  const handleFilterClick = (filterName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (filterName === "Filters") {
      setShowSidebar(true);
      return;
    }

    setOpenFilter(openFilter === filterName ? "" : filterName);
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
    <div className="w-full max-w-[1600px] mx-auto rounded-lg ">
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

          {/* Sort button and dropdown in the same container */}
          <div className="relative" ref={sortButtonRef}>
            <button
              onClick={(e) => handleFilterClick("Sort by: Relevance", e)}
              className={`flex items-center px-3 py-2 rounded-full ${
                openFilter === "Sort by: Relevance"
                  ? "bg-white text-[#000] shadow-md"
                  : "bg-gray-100 text-[#838181]"
              } hover:bg-gray-100 text-sm text-gray-700`}>
              Sort by:{" "}
              {selectedOptions["Sort by: Relevance"]?.[0] || "Relevance"}
              <ChevronDown
                className={`w-4 h-4 ml-1 transform transition-transform ${
                  openFilter === "Sort by: Relevance" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openFilter === "Sort by: Relevance" && (
              <div
                ref={dropdownRef}
                className="absolute right-0 top-full mt-1 z-50 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[160px]">
                {filterOptions[openFilter].children.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(openFilter, option)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between">
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

        {showSidebar && (
          <FilterSidebar
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            setShowSidebar={setShowSidebar}
          />
        )}
      </div>
    </div>
  );
};

export default FilterSection;
