import { createAsyncThunkWithHandler } from "@/services/api/apiHandler";
import productService from "./productService";
import { createSlice } from "@reduxjs/toolkit";
import { initialProductStateProps } from "@/types/product_types";
import product from "@/utils/data_json/search3.json";
import product2 from "@/utils/data_json/search.json";
import categories from "@/utils/data_json/category.json";
// import searchResult from "@/utils/data_json/search5.json";
// const products = JSON.parse(localStorage.getItem("products") || "[]");
// const categories = JSON.parse(localStorage.getItem("categories") || "[]");
// const deals = JSON.parse(localStorage.getItem("deals") || "[]");

const initialState: initialProductStateProps = {
  products: product ? (product?.result?.resultList as unknown as any) : [],
  categories: categories ? (categories as unknown as any) : [],
  singleProduct: "",
  reviews: [],
  bestSellers: [],
  deals: product2 ? (product2?.result?.resultList as unknown as any) : [],
  searchResults: [],
  searchImageResults: [],
  isLoading: false,
  message: "",
  isSuccess: false,
  isError: false,
};

export const getProductCategories = createAsyncThunkWithHandler(
  "product/categories",
  async () => {
    return await productService.getProductCategories();
  }
);

export const getProductsByCategory = createAsyncThunkWithHandler(
  "product/byCategory",
  async (category_id: number) => {
    return await productService.getProductsByCategory(category_id);
  }
);

export const getProductDetails = createAsyncThunkWithHandler(
  "product/details",
  async (itemId: any) => {
    return await productService.getProductDetails(itemId);
  }
);

export const getProductReviews = createAsyncThunkWithHandler(
  "product/reviews",
  async (asin: string) => {
    return await productService.getProductReviews(asin);
  }
);

export const getBestSellers = createAsyncThunkWithHandler(
  "product/bestSellers",
  async (category: string) => {
    return await productService.getBestSellers(category);
  }
);

export const getDeals = createAsyncThunkWithHandler(
  "product/deals",
  async () => {
    return await productService.getDeals();
  }
);

export const searchProducts = createAsyncThunkWithHandler(
  "product/search",
  async (data: { query: string; page: string }) => {
    return await productService.searchProducts(data);
  }
);

export const searchProductsByImage = createAsyncThunkWithHandler(
  "product/image_search",
  async (data: { query: string }) => {
    return await productService.searchProductsByImage(data);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Product Categories
      .addCase(getProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(getProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.isSuccess = false;
      })

      // Products by Category
      .addCase(getProductsByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.isSuccess = false;
      })

      // Product Details
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleProduct = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.isSuccess = false;
      })

      // Product Reviews
      .addCase(getProductReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.reviews = action.payload;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.isSuccess = false;
      })

      // Best Sellers
      .addCase(getBestSellers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBestSellers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bestSellers = action.payload;
      })
      .addCase(getBestSellers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.isSuccess = false;
      })

      // Deals
      // .addCase(getDeals.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getDeals.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = false;
      //   state.isSuccess = true;
      //   state.deals = action.payload;
      // })
      // .addCase(getDeals.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload as string;
      //   state.isSuccess = false;
      // })

      // Search Products
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.searchResults = action.payload.result.resultList;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.isSuccess = false;
      })
      .addCase(searchProductsByImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProductsByImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.searchImageResults = action.payload.result.resultList;
      })
      .addCase(searchProductsByImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.isSuccess = false;
        state.searchImageResults = [];
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
