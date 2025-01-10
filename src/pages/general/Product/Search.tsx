import Loader from "@/components/common/Loader";
import MoreProducts from "@/components/pages/home/MoreProducts";
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
  }, [query]); // Added query as dependency to update results when search changes

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">
        Search Results for: <span className="text-primary">{query}</span>
      </h1>

      <div className="sm:w-[90%] w-[95%] m-auto">
        {isLoading ? (
          <Loader />
        ) : (
          <MoreProducts productsDemo={searchResults?.data?.products} />
        )}
      </div>
    </div>
  );
};

export default Search;
