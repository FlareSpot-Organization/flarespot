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
    <div className="w-[90%] mx-auto px-4 py-8">
      {searchResults?.data?.products?.length > 0 && (
        <h1 className="text-xl font-semibold mb-4">
          Search Results for: <span className="text-primary">{query}</span>
        </h1>
      )}

      <div className="sm:w-[90%] w-[95%] m-auto">
        {isLoading ? (
          <Loader />
        ) : searchResults?.data?.products?.length > 0 ? (
          <MoreProducts2 productsDemo={searchResults?.data?.products} />
        ) : (
          <NotFound query={query} />
        )}
      </div>
    </div>
  );
};

export default Search;
