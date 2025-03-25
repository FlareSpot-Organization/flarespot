import { useEffect } from "react";

interface Product {
  result?: {
    item?: {
      itemId?: number;
      [key: string]: any;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

interface RecentlyViewedItem {
  itemId: number;
  timeStamps: number;
  [key: string]: any;
}

/**
 * Hook for managing recently viewed products in localStorage
 * @param product - Product data
 */
const useRecentlyViewed = (product: Product) => {
  useEffect(() => {
    if (product) {
      if (product?.result?.item?.itemId === undefined) return;

      const recentlyViewed: RecentlyViewedItem[] = JSON.parse(
        localStorage.getItem("recently_viewed") || "[]"
      );

      // Check if the product is already in recently viewed
      const checkItem = recentlyViewed.find(
        (item) => item.itemId === product?.result?.item?.itemId
      );

      // If not already in recently viewed, add it
      if (!checkItem) {
        localStorage.setItem(
          "recently_viewed",
          JSON.stringify([
            ...recentlyViewed,
            { ...product.result.item, timeStamps: new Date().getTime() },
          ])
        );
      }
    }
  }, [product]);
};

export default useRecentlyViewed;
