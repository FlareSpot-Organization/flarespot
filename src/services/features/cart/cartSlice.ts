import {
  addItemToCart,
  clearCart,
  getCartItems,
  removeCartItem,
  updateCartItem,
} from "@/utils/CartDb";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItem } from "@/types/product_types";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: getCartItems() || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      addItemToCart(action.payload);
      state.items = getCartItems() || [];
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{
        itemId: number;
        skuId?: string;
        quantity: number;
      }>
    ) => {
      const { itemId, skuId, quantity } = action.payload;
      updateCartItem(itemId, skuId, quantity);
      state.items = getCartItems() || [];
    },
    // Support both old and new formats of removeItem
    removeItem: (
      state,
      action: PayloadAction<number | { itemId: number; skuId?: string }>
    ) => {
      if (typeof action.payload === "number") {
        // Old way - just itemId for simple products
        console.log(action.payload);
        removeCartItem(action.payload);
      } else {
        console.log(action.payload);
        // New way with support for variants
        const { itemId, skuId } = action.payload;
        removeCartItem(itemId, skuId);
      }
      state.items = getCartItems() || [];
    },
    clearCartItems: (state) => {
      clearCart();
      state.items = [];
    },
  },
});

export const { addToCart, updateItemQuantity, removeItem, clearCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;
