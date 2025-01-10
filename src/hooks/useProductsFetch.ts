import {
  getDeals,
  getProductCategories,
  getProductsByCategory,
} from "@/services/features/products/productSlice";
import { AppDispatch } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useProductsFetch = () => {
  const { categories, isLoading, deals, products } = useSelector(
    (state: any) => state.products
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (categories?.data?.length == 0) {
      dispatch(getProductCategories());
    }

    if (deals?.data?.deals?.length == 0) {
      dispatch(getDeals());
    }

    if (products?.data?.products?.length == 0) {
      dispatch(getProductsByCategory(0));
    }
  }, []);

  return { categories, isLoading, deals, products };
};

export default useProductsFetch;
