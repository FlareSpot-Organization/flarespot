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

const useVisualization = (productsDemo: any) => {
  const ITEMS_PER_PAGE = 20;
  const [products, setProducts] = useState<Product[]>(
    productsDemo?.slice(0, ITEMS_PER_PAGE)
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef<HTMLDivElement>(null);
  const currentPage = useRef(1);

  const formatPrice = (price: number): string => {
    return price?.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const loadMoreProducts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const nextPage = currentPage.current + 1;
    const startIndex = currentPage.current * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newProducts = productsDemo?.slice(startIndex, endIndex);

    if (newProducts.length === 0) {
      setHasMore(false);
    } else {
      setProducts((prev) => [...prev, ...newProducts]);
      currentPage.current = nextPage;
    }

    setLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore]);

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
