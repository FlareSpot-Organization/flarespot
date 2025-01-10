import { configureStore } from "@reduxjs/toolkit";
import cartReducer, {
  addToCart,
  updateItemQuantity,
  removeItem,
  clearCartItems,
} from "./cartSlice";
import {
  getCartItems,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "@/utils/CartDb";
import { CartItem } from "@/utils/CartDb";

jest.mock("@/utils/CartDb");

describe("cartSlice", () => {
  let store: any;
  const initialCartItem: CartItem = {
    asin: "asin456",
    product_title: "Phone",
    quantity: 1,
    product_price: 500,
  };

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    // Set up initial mock implementation
    (getCartItems as jest.Mock).mockReturnValue([initialCartItem]);

    // Create store with initial state
    store = configureStore({
      reducer: {
        cart: cartReducer,
      },
      preloadedState: {
        cart: {
          items: [initialCartItem],
        },
      },
    });
  });

  it("should add item to the cart", () => {
    const newItem: CartItem = {
      asin: "asin789",
      product_title: "Laptop",
      quantity: 1,
      product_price: 1000,
    };

    const updatedItems = [initialCartItem, newItem];
    (getCartItems as jest.Mock).mockReturnValueOnce(updatedItems);

    store.dispatch(addToCart(newItem));

    expect(addItemToCart).toHaveBeenCalledWith(newItem);
    expect(getCartItems).toHaveBeenCalled();
    expect(store.getState().cart.items).toEqual(updatedItems);
  });

  it("should update item quantity in the cart", () => {
    const updatedItem = {
      ...initialCartItem,
      quantity: 3,
    };

    (getCartItems as jest.Mock).mockReturnValueOnce([updatedItem]);

    store.dispatch(updateItemQuantity({ asin: "asin456", quantity: 2 }));

    expect(updateCartItem).toHaveBeenCalledWith("asin456", 3);
    expect(getCartItems).toHaveBeenCalled();
    expect(store.getState().cart.items).toEqual([updatedItem]);
  });

  it("should remove item from the cart", () => {
    (getCartItems as jest.Mock).mockReturnValueOnce([]);

    store.dispatch(removeItem("asin456"));

    expect(removeCartItem).toHaveBeenCalledWith("asin456");
    expect(getCartItems).toHaveBeenCalled();
    expect(store.getState().cart.items).toEqual([]);
  });

  it("should clear all items from the cart", () => {
    store.dispatch(clearCartItems());

    expect(clearCart).toHaveBeenCalled();
    expect(store.getState().cart.items).toEqual([]);
  });
});
