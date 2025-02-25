import axiosClient from "@/services/api/axiosClient";

const getLanguages = async () => {
  const response = await axiosClient.get(
    "/api-ecom?api=system_settings&filter=baseLocale"
  );
  if (response.data) {
    localStorage.setItem(
      "languages",
      JSON.stringify(response.data.result.resultList.baseLocale)
    );
  }
  return response.data;
};

// Regular API calls without localStorage
const getRegions = async () => {
  const response = await axiosClient.get(
    `/api-ecom?api=system_settings&filter=baseRegion`
  );
  if (response.data) {
    localStorage.setItem(
      "regions",
      JSON.stringify(response.data.result.resultList.baseRegion)
    );
  }
  return response.data;
};

const getCurrencies = async () => {
  const response = await axiosClient.get(
    "/api-ecom?api=system_settings&filter=baseCurrency"
  );
  if (response.data) {
    localStorage.setItem(
      "currencies",
      JSON.stringify(response.data.result.resultList.baseCurrency)
    );
  }
  return response.data;
};

const productService = {
  getLanguages,
  getRegions,
  getCurrencies,
};

export default productService;
