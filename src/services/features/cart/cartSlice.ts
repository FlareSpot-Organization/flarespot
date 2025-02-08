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
      action: PayloadAction<{ itemId: number; quantity: number }>
    ) => {
      const { itemId, quantity } = action.payload;
      const itemIndex = state.items?.findIndex(
        (item) => item.itemId === itemId
      );
      if (itemIndex !== -1) {
        const newQuantity = state.items[itemIndex].quantity + quantity;
        if (newQuantity > 0) {
          updateCartItem(itemId, newQuantity);
          state.items = getCartItems() || [];
        }
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      removeCartItem(action.payload);
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
