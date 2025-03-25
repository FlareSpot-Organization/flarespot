import { ProductCardProps } from "@/types/product_types";
import { useState, useEffect } from "react";

const usePagination = (
  productsSearch: ProductCardProps[] = [],
  currentPage: number = 1
) => {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [totalPages, setTotalPages] = useState(100); // Fixed at 100 pages

  const formatPrice = (price: number | string) => {
    return `$${Number(price).toFixed(2)}`;
  };

  // Set the products based on the fetched data
  useEffect(() => {
    if (productsSearch?.length > 0) {
      // Display all products from the fetch without slicing
      setProducts(productsSearch);

      // Total pages is always 100
      setTotalPages(100);
    } else {
      setProducts([]);
      // Even if there are no products, keep totalPages as 100
      setTotalPages(100);
    }
  }, [productsSearch]);

  return {
    products,
    totalPages,
    formatPrice,
  };
};

export default usePagination;
