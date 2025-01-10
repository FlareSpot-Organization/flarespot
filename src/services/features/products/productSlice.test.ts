import { configureStore } from "@reduxjs/toolkit";
import productReducer, {
  getProductCategories,
  getProductsByCategory,
  getProductDetails,
  getProductReviews,
  getBestSellers,
  getDeals,
  searchProducts,
  reset,
} from "./productSlice";
import { initialProductStateProps } from "@/types/product_types";

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock axiosClient
jest.mock("@/services/api/axiosClient", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe("productSlice", () => {
  let store: any;
  let axiosClient: any;

  beforeEach(() => {
    // Clear localStorage and mocks
    localStorageMock.clear();
    jest.clearAllMocks();

    // Get reference to mocked axios client
    axiosClient = require("@/services/api/axiosClient").default;

    // Create fresh store before each test
    store = configureStore({
      reducer: {
        products: productReducer,
      },
    });
  });

  it("should handle initial state", () => {
    const state = store.getState().products as initialProductStateProps;
    expect(state).toEqual({
      products: [],
      categories: [],
      singleProduct: {},
      reviews: [],
      bestSellers: [],
      deals: [],
      searchResults: [],
      isLoading: false,
      message: "",
      isSuccess: false,
      isError: false,
    });
  });

  describe("getProductCategories", () => {
    it("should handle successful categories fetch", async () => {
      const mockCategories = [
        { id: 1, name: "Electronics" },
        { id: 2, name: "Books" },
      ];

      axiosClient.get.mockResolvedValueOnce({ data: mockCategories });

      await store.dispatch(getProductCategories());

      const state = store.getState().products;
      expect(state.categories).toEqual(mockCategories);
      expect(state.isLoading).toBe(false);
      expect(state.isError).toBe(false);
      expect(state.isSuccess).toBe(true);
      expect(localStorage.getItem("categories")).toBe(
        JSON.stringify(mockCategories)
      );
    });

    it("should handle categories fetch error", async () => {
      const errorMessage = "Network Error";
      axiosClient.get.mockRejectedValueOnce({
        response: { data: { message: errorMessage } },
      });

      await store.dispatch(getProductCategories());

      const state = store.getState().products;
      expect(state.isLoading).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.isSuccess).toBe(false);
      expect(state.message).toBe(errorMessage);
    });
  });

  describe("getProductsByCategory", () => {
    it("should handle successful products fetch", async () => {
      const mockProducts = [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ];
      const categoryId = 1;

      axiosClient.get.mockResolvedValueOnce({ data: mockProducts });

      await store.dispatch(getProductsByCategory(categoryId));

      const state = store.getState().products;
      expect(state.products).toEqual(mockProducts);
      expect(state.isLoading).toBe(false);
      expect(state.isError).toBe(false);
      expect(state.isSuccess).toBe(true);
      expect(localStorage.getItem("products")).toBe(
        JSON.stringify(mockProducts)
      );
      expect(axiosClient.get).toHaveBeenCalledWith("/products-by-category", {
        params: { category_id: categoryId },
      });
    });
  });

  describe("getProductDetails", () => {
    it("should handle successful product details fetch", async () => {
      const mockProduct = { asin: "123", name: "Test Product" };
      const asin = "123";

      axiosClient.get.mockResolvedValueOnce({ data: mockProduct });

      await store.dispatch(getProductDetails(asin));

      const state = store.getState().products;
      expect(state.singleProduct).toEqual(mockProduct);
      expect(state.isLoading).toBe(false);
      expect(state.isError).toBe(false);
      expect(state.isSuccess).toBe(true);
      expect(axiosClient.get).toHaveBeenCalledWith("/product-details", {
        params: { asin },
      });
    });
  });

  describe("getDeals", () => {
    it("should handle successful deals fetch", async () => {
      const mockDeals = [
        { id: 1, name: "Deal 1" },
        { id: 2, name: "Deal 2" },
      ];

      axiosClient.get.mockResolvedValueOnce({ data: mockDeals });

      await store.dispatch(getDeals());

      const state = store.getState().products;
      expect(state.deals).toEqual(mockDeals);
      expect(state.isLoading).toBe(false);
      expect(state.isError).toBe(false);
      expect(state.isSuccess).toBe(true);
      expect(localStorage.getItem("deals")).toBe(JSON.stringify(mockDeals));
      expect(axiosClient.get).toHaveBeenCalledWith("/deals-v2");
    });
  });

  describe("searchProducts", () => {
    it("should handle successful product search", async () => {
      const mockResults = [
        { id: 1, name: "Search Result 1" },
        { id: 2, name: "Search Result 2" },
      ];
      const query = "test";

      axiosClient.get.mockResolvedValueOnce({ data: mockResults });

      await store.dispatch(searchProducts(query));

      const state = store.getState().products;
      expect(state.searchResults).toEqual(mockResults);
      expect(state.isLoading).toBe(false);
      expect(state.isError).toBe(false);
      expect(state.isSuccess).toBe(true);
      expect(axiosClient.get).toHaveBeenCalledWith("/search", {
        params: { query },
      });
    });
  });

  describe("Error handling", () => {
    it("should handle API errors with custom message", async () => {
      const errorMessage = "Custom API Error";
      axiosClient.get.mockRejectedValueOnce({
        response: {
          data: {
            message: errorMessage,
          },
        },
      });

      await store.dispatch(getProductCategories());

      const state = store.getState().products;
      expect(state.isError).toBe(true);
      expect(state.message).toBe(errorMessage);
    });

    it("should handle network errors", async () => {
      const errorMessage = "Network Error";
      axiosClient.get.mockRejectedValueOnce(new Error(errorMessage));

      await store.dispatch(getProductCategories());

      const state = store.getState().products;
      expect(state.isError).toBe(true);
      expect(state.message).toBe(errorMessage);
    });
  });

  describe("reset action", () => {
    it("should reset status flags", () => {
      // Set some initial state
      store.dispatch(reset());

      const state = store.getState().products;
      expect(state.isLoading).toBe(false);
      expect(state.isSuccess).toBe(false);
      expect(state.isError).toBe(false);
      expect(state.message).toBe("");
    });
  });
});
