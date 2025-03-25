import { PaginationProps } from "@/types/product_types";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export default Pagination;
