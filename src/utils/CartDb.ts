// CartDb.ts
export interface CartItem {
  asin: string;
  product_title: string;
  product_price: number;
  quantity: number;
  product_photo?: string;
}

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
    (item) => item.asin === product.asin
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Update the quantity of an item in the cart
export const updateCartItem = (asin: string, quantity: number): void => {
  const cart = getCartItems();
  const itemIndex = cart.findIndex((item) => item.asin === asin);

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
export const removeCartItem = (asin: string): void => {
  const cart = getCartItems();
  const updatedCart = cart.filter((item) => item.asin !== asin);

  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
};

// Clear the cart entirely
export const clearCart = (): void => {
  localStorage.removeItem(CART_KEY);
};
