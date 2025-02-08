import { ProductCardProps } from "@/types/product_types";
import { useEffect, useRef, useState } from "react";

interface Product {
  asin: string;
  product_title: string;
  product_price: number;
  product_original_price?: number;
  discount?: number;
  product_photo: string;
  delivery: string;
  product_minimum_offer_price?: string;
  product_star_rating: number;
}

const useVisualization = (productsDemo: ProductCardProps[] = []) => {
  const ITEMS_PER_PAGE = 20;
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef<HTMLDivElement>(null);
  const currentPage = useRef(1);

  const formatPrice = (price: number | string) => {
    return `$${Number(price).toFixed(2)}`;
  };

  // Initialize products when productsDemo changes
  useEffect(() => {
    if (productsDemo?.length > 0) {
      setProducts(productsDemo.slice(0, ITEMS_PER_PAGE));
      currentPage.current = 1;
      setHasMore(productsDemo.length > ITEMS_PER_PAGE);
    }
  }, [productsDemo]);

  const loadMoreProducts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Reduced timeout for better UX

      const startIndex = currentPage.current * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newProducts = productsDemo?.slice(startIndex, endIndex);

      if (!newProducts?.length) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
        currentPage.current += 1;
        setHasMore(endIndex < (productsDemo?.length || 0));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]); // Added loading to dependencies

  return {
    products,
    loading,
    hasMore,
    loadingRef,
    loadMoreProducts,
    formatPrice,
  };
};

export default useVisualization;
