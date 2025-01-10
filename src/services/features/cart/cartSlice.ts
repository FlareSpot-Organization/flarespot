// cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCartItems,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "@/utils/CartDb";
import { CartItem } from "@/utils/CartDb";

const initialState = {
  items: getCartItems(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      addItemToCart(action.payload);
      state.items = getCartItems(); // Sync state with local storage
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ asin: string; quantity: number }>
    ) => {
      const { asin, quantity } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.asin === asin);
      if (itemIndex !== -1) {
        // Update quantity
        const newQuantity = state.items[itemIndex].quantity + quantity;
        if (newQuantity > 0) {
          updateCartItem(asin, newQuantity);
          state.items = getCartItems();
        }
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      removeCartItem(action.payload);
      state.items = getCartItems();
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
