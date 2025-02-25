import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../services/features/products/productSlice";
import authReducer from "@/services/features/auth/authSlice";
import cartReducer from "@/services/features/cart/cartSlice";
import languageReducer from "@/services/features/language/languageSlice";
import wishlistReducer from "@/services/features/wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    language: languageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
