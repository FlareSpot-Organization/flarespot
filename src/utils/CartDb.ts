import { CartItem } from "@/types/product_types";

// CartDb.ts

const CART_KEY = "user_cart";

// Retrieve the cart from local storage
export const getCartItems = (): CartItem[] => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

// Create a unique identifier for cart items based on itemId and SKU
const getCartItemKey = (product: CartItem): string => {
  // If the product has a selected SKU, use its SKU ID along with the item ID
  if (product.selectedSku?.skuId) {
    return `${product.itemId}_${product.selectedSku.skuId}`;
  }
  // Otherwise just use the item ID (for products without variants)
  return `${product.itemId}`;
};

// Add a new item to the cart
export const addItemToCart = (product: CartItem): void => {
  const cart = getCartItems();

  // Create a unique key for this product
  const productKey = getCartItemKey(product);

  // Find if this exact product variant is already in cart
  const existingItemIndex = cart.findIndex((item) => {
    const itemKey = getCartItemKey(item);
    return itemKey === productKey;
  });

  if (existingItemIndex !== -1) {
    // If it exists, update the quantity
    cart[existingItemIndex].quantity =
      (typeof product.quantity === "number" ? product.quantity : 1) +
      (typeof cart[existingItemIndex].quantity === "number"
        ? cart[existingItemIndex].quantity
        : 0);
  } else {
    // Otherwise add it as a new item
    cart.push({ ...product });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Update the quantity of an item in the cart
export const updateCartItem = (
  itemId: number,
  skuId: string | undefined,
  quantityChange: number
): void => {
  const cart = getCartItems();

  const itemIndex = cart.findIndex((item) => {
    if (skuId !== undefined && item.selectedSku?.skuId !== undefined) {
      return item.itemId === itemId && item.selectedSku.skuId === skuId;
    }
    return item.itemId === itemId && item.selectedSku?.skuId === undefined;
  });

  if (itemIndex !== -1) {
    // Calculate the new quantity by adding the change to the current quantity
    const newQuantity = cart[itemIndex].quantity + quantityChange;

    if (newQuantity > 0) {
      // Update the quantity if it's greater than zero
      cart[itemIndex].quantity = newQuantity;
    } else {
      // Remove the item if the new quantity would be zero or negative
      cart.splice(itemIndex, 1);
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
};

// Remove an item from the cart
export const removeCartItem = (itemId: number, skuId?: string): void => {
  console.log(skuId);
  const cart = getCartItems();
  let updatedCart;

  if (skuId !== undefined) {
    // Remove only the specific variant
    updatedCart = cart.filter((item) => {
      // Keep items that don't match this specific combination
      return !(item.itemId === itemId && item.selectedSku?.skuId === skuId);
    });
  } else {
    // If skuId is not provided, we're dealing with a simple product without variants,
    // or with the legacy removal method that doesn't specify skuId
    updatedCart = cart.filter((item) => {
      // For backward compatibility: if no skuId is provided, only remove simple products
      // (those without a selected SKU) that match the itemId
      return !(item.itemId === itemId && !item.selectedSku?.skuId);
    });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
};

// Clear the cart entirely
export const clearCart = (): void => {
  localStorage.removeItem(CART_KEY);
};
