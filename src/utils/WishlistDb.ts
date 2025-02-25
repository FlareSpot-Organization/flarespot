import { WishListItem } from "@/types/product_types";

// WishListDb.ts

const CART_KEY = "user_wishlist";

// Retrieve the wishList from local storage
export const getWishListItems = (): WishListItem[] => {
  const wishList = localStorage.getItem(CART_KEY);
  return wishList ? JSON.parse(wishList) : [];
};

// Add a new item to the wishList
export const addItemToWishList = (product: WishListItem): void => {
  const wishList = getWishListItems();
  const existingItemIndex = wishList.find(
    (item) => item.itemId == product.itemId
  );

  if (!existingItemIndex) {
    wishList.push({ ...product });
  } else {
    return removeWishListItem(product.itemId);
  }

  localStorage.setItem(CART_KEY, JSON.stringify(wishList));
};

// Remove an item from the wishList
export const removeWishListItem = (itemId: number): void => {
  const wishList = getWishListItems();
  const updatedWishList = wishList.filter((item) => item.itemId !== itemId);

  localStorage.setItem(CART_KEY, JSON.stringify(updatedWishList));
};

// Clear the wishList entirely
export const clearWishList = (): void => {
  localStorage.removeItem(CART_KEY);
};
