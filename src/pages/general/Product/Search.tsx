import ProductsLoader from "@/components/Loaders/ProductsLoader";
import FilterSection from "@/components/common/FilterSection";
import Loader from "@/components/common/Loader";
import NotFound from "@/components/common/NotFound";
import MoreProductsPaginated from "@/components/pages/home/product-cards/MoreProductsPaginated";
import { searchProducts } from "@/services/features/products/productSlice";
import { AppDispatch } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = searchParams.get("page") || "1";

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, searchResults } = useSelector(
    (state: any) => state.products
  );

  useEffect(() => {
    dispatch(searchProducts({ query, page }));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [query, page, dispatch]);

  return (
    <div className="mx-auto px-4 py-2">
      <div className="w-full lg:w-[95%] mx-auto relative">
        {isLoading ? (
          <ProductsLoader />
        ) : searchResults?.length > 0 ? (
          <>
            <FilterSection productsSearch={searchResults} />
            <MoreProductsPaginated productsSearch={searchResults} />
          </>
        ) : (
          <NotFound query={query} />
        )}
      </div>
    </div>
  );
};

export default Search;
