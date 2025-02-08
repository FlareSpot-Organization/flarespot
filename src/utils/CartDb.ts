import { CartItem } from "@/types/product_types";

// CartDb.ts

const CART_KEY = "user_cart";

// Retrieve the cart from local storage
export const getCartItems = (): CartItem[] => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

// Add a new item to the cart
export const addItemToCart = (product: CartItem): void => {
  const cart = getCartItems();
  const existingItemIndex = cart.findIndex(
    (item) => item.itemId == product.itemId
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ ...product });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Update the quantity of an item in the cart
export const updateCartItem = (itemId: number, quantity: number): void => {
  const cart = getCartItems();
  const itemIndex = cart.findIndex((item) => item.itemId === itemId);

  if (itemIndex !== -1) {
    if (quantity > 0) {
      cart[itemIndex].quantity = quantity;
    } else {
      cart.splice(itemIndex, 1); // Remove the item if quantity is zero
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
};

// Remove an item from the cart
export const removeCartItem = (itemId: number): void => {
  const cart = getCartItems();
  const updatedCart = cart.filter((item) => item.itemId !== itemId);

  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
};

// Clear the cart entirely
export const clearCart = (): void => {
  localStorage.removeItem(CART_KEY);
};
