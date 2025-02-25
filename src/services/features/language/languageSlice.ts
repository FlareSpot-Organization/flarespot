import { createAsyncThunkWithHandler } from "@/services/api/apiHandler";
import { InitialLanguageProps } from "@/types/public";
import { createSlice } from "@reduxjs/toolkit";
import languageService from "./languageService";

// import regions from "@/utils/data_json/region.json";
// import languages from "@/utils/data_json/locale.json";
// import currencies from "@/utils/data_json/currencies.json";

const regions = JSON.parse(localStorage.getItem("regions") || "[]");
const languages = JSON.parse(localStorage.getItem("languages") || "[]");
const currencies = JSON.parse(localStorage.getItem("currencies") || "[]");

const initialState: InitialLanguageProps = {
  regions: regions ? regions : [],
  languages: languages ? languages : [],
  currencies: currencies ? currencies : [],
  message: "",
  isSuccess: false,
  isError: false,
  isLoading: false,
};

export const getLanguages = createAsyncThunkWithHandler(
  "language/getLanguages",
  async () => {
    return await languageService.getLanguages();
  }
);

export const getRegions = createAsyncThunkWithHandler(
  "language/getRegions",
  async () => {
    return await languageService.getRegions();
  }
);

export const getCurrencies = createAsyncThunkWithHandler(
  "language/getCurrencies",
  async () => {
    return await languageService.getCurrencies();
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

      .addCase(getCurrencies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrencies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currencies = action.payload.result?.resultList?.baseCurrency;
      })
      .addCase(getCurrencies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.isSuccess = false;
      })

      .addCase(getLanguages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLanguages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.languages = action.payload.result?.resultList?.baseLocale;
      })
      .addCase(getLanguages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.isSuccess = false;
      })

      .addCase(getRegions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRegions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.regions = action.payload.result?.resultList?.baseRegion;
      })
      .addCase(getRegions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.isSuccess = false;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
