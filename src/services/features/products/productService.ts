import axiosClient from "@/services/api/axiosClient";

const getProductCategories = async () => {
  const response = await axiosClient.get("/product-category-list");
  if (response.data) {
    localStorage.setItem("categories", JSON.stringify(response.data));
  }
  return response.data;
};

const getProductsByCategory = async (category_id: number) => {
  const response = await axiosClient.get("/products-by-category", {
    params: { category_id },
  });
  if (response.data) {
    localStorage.setItem("products", JSON.stringify(response.data));
  }
  return response.data;
};

const getProductDetails = async (asin: string) => {
  const response = await axiosClient.get("/product-details", {
    params: { asin },
  });

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
  const response = await axiosClient.get("/deals-v2");
  if (response.data) {
    localStorage.setItem("deals", JSON.stringify(response.data));
  }
  return response.data;
};

const searchProducts = async (query: string) => {
  const response = await axiosClient.get("/search", {
    params: { query },
  });
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
