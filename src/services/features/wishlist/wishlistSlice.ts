import {
  addItemToWishList,
  clearWishList,
  getWishListItems,
  removeWishListItem,
} from "@/utils/WishlistDb";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { WishListItem } from "@/types/product_types";

interface WishListState {
  items: WishListItem[];
}

const initialState: WishListState = {
  items: getWishListItems() || [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<WishListItem>) => {
      addItemToWishList(action.payload);
      state.items = getWishListItems() || [];
    },
    removeItem: (state, action: PayloadAction<number>) => {
      removeWishListItem(action.payload);
      state.items = getWishListItems() || [];
    },
    clearWishListItems: (state) => {
      clearWishList();
      state.items = [];
    },
  },
});

export const { addToWishList, removeItem, clearWishListItems } =
  wishListSlice.actions;

export default wishListSlice.reducer;
