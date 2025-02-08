import FilterSection from "@/components/common/FilterSection";
import Loader from "@/components/common/Loader";
import NotFound from "@/components/common/NotFound";
import MoreProducts2 from "@/components/pages/home/product-cards/MoreProducts2";
import { searchProducts } from "@/services/features/products/productSlice";
import { AppDispatch } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, searchResults } = useSelector(
    (state: any) => state.products
  );

  useEffect(() => {
    dispatch(searchProducts(query));
  }, [query]);

  return (
    <div className=" mx-auto px-4 py-2">
      <div className="w-full lg:w-[95%] mx-auto relative">
        {isLoading ? (
          <Loader />
        ) : searchResults?.length > 0 ? (
          <>
            <FilterSection />
            <MoreProducts2 productsDemo={searchResults} />
          </>
        ) : (
          <NotFound query={query} />
        )}
      </div>
    </div>
  );
};

export default Search;
