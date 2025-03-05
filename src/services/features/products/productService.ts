import axiosClient from "@/services/api/axiosClient";
import axios from "axios";

const getCachedData = (key: string) => {
  try {
    const cached = localStorage.getItem(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    return null;
  }
};

const getProductCategories = async () => {
  const cachedData = getCachedData("categories");
  if (cachedData) return cachedData;

  const response = await axiosClient.get("/product-category-list");
  if (response.data) {
    localStorage.setItem("categories", JSON.stringify(response.data));
  }
  return response.data;
};

const getProductsByCategory = async (category_id: number) => {
  const response = await axiosClient.get("/api-ecom?api=item_search&q=shoes");
  return response.data;
};

// Regular API calls without localStorage
const getProductDetails = async (itemId: string) => {
  const response = await axiosClient.get(
    `/api-ecom?api=item_detail&itemId=${itemId}`
  );
  return response.data;
};

const getProductReviews = async (asin: string) => {
  const response = await axiosClient.get("/product-reviews", {
    params: { asin },
  });
  return response.data;
};

const getBestSellers = async (category: string) => {
  const response = await axiosClient.get("/best-sellers", {
    params: { category },
  });
  return response.data;
};

const getDeals = async () => {
  const cachedData = getCachedData("deals");
  if (cachedData) return cachedData;

  const response = await axiosClient.get("/deals-v2");
  if (response.data) {
    localStorage.setItem("deals", JSON.stringify(response.data));
  }
  return response.data;
};

const searchProducts = async (query: string) => {
  const response = await axiosClient.get(
    `/api-ecom?api=item_search&q=${query}`
  );

  if (response.data) {
    localStorage.setItem("flarespots_search", JSON.stringify(response.data));
  }
  return response.data;
};

const productService = {
  getProductCategories,
  getProductsByCategory,
  getProductDetails,
  getProductReviews,
  getBestSellers,
  getDeals,
  searchProducts,
};

export default productService;
