import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../services/features/products/productSlice";
import authReducer from "@/services/features/auth/authSlice";
import cartReducer from "@/services/features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
