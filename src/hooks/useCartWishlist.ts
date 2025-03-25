import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { addToCart } from "@/services/features/cart/cartSlice";
import { addToWishList } from "@/services/features/wishlist/wishlistSlice";
import { CartItem, Sku, WishListItem } from "@/types/product_types";

interface SelectedProperty {
  pid: number;
  vid: number;
}

interface SelectedProperties {
  [key: string]: SelectedProperty;
}

interface UseCartWishlistProps {
  product: any;
  activeSku: Sku | null;
  hasSelectableProps: boolean;
  selectedValues: SelectedProperties;
  images: any[];
  currentImageIndex: number;
  maxQuantity?: number;
}

interface UseCartWishlistReturn {
  inCart: boolean;
  wishListItems: number[];
  quantity: number | string;
  setQuantity: React.Dispatch<React.SetStateAction<number | string>>;
  handleQuantityChange: (value: string | number) => void;
  handleAddToCart: () => void;
  handleAddWishlist: (product: WishListItem) => void;
  areAllPropsSelected: () => boolean;
}

/**
 * Hook for managing cart and wishlist functionality
 */
const useCartWishlist = ({
  product,
  activeSku,
  hasSelectableProps,
  selectedValues,
  images,
  currentImageIndex,
  maxQuantity,
}: UseCartWishlistProps): UseCartWishlistReturn => {
  const dispatch = useDispatch();
  const [inCart, setInCart] = useState<boolean>(false);
  const [wishListItems, setWishListItems] = useState<number[]>([]);
  const [quantity, setQuantity] = useState<number | string>(1);

  // Initialize wishlist data
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("user_wishlist") || "[]");
    const wishlistIds = wishlist.map((item: any) => item.itemId);
    setWishListItems(wishlistIds);
  }, []);

  // Check if the current product/variant is in cart
  useEffect(() => {
    if (!product?.result?.item?.itemId) return;

    const cart = JSON.parse(localStorage.getItem("user_cart") || "[]");
    const isInCart = cart.some((item: CartItem) => {
      // For products without properties, check just the itemId
      if (!hasSelectableProps) {
        return item.itemId === parseInt(product?.result?.item?.itemId);
      }

      // For products with properties, check if the exact same SKU is in cart
      return (
        item.itemId === parseInt(product?.result?.item?.itemId) &&
        item.selectedSku?.skuId === activeSku?.skuId
      );
    });

    setInCart(isInCart);
  }, [product, hasSelectableProps, activeSku, selectedValues]);

  // Handle quantity changes
  const handleQuantityChange = (value: string | number): void => {
    // If it's a number already (from button clicks)
    if (typeof value === "number") {
      if (value >= 1 && value <= (maxQuantity || Infinity)) {
        setQuantity(value);
      }
      return;
    }

    // For string input (from typing)
    if (value === "") {
      setQuantity(""); // Allow temporary empty state
      return;
    }

    const newQuantity = parseInt(value);

    // Check if it's a valid number and in range
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 1 &&
      newQuantity <= (maxQuantity || Infinity)
    ) {
      setQuantity(newQuantity);
    }
  };

  // Check if all required properties are selected
  const areAllPropsSelected = (): boolean => {
    if (!hasSelectableProps) return true;
    const requiredProps = product?.result?.item?.sku?.props?.length || 0;
    return Object.keys(selectedValues).length === requiredProps;
  };

  // Handle add to cart
  const handleAddToCart = (): void => {
    if (hasSelectableProps && !areAllPropsSelected()) {
      toast.error("Please select all options");
      return;
    }

    const cartItem: CartItem = {
      ...product.result.item,
      quantity,
      selectedSku: activeSku,
      selectedProperties: selectedValues,
      image: images[currentImageIndex],
      maxQuantity,
    };

    dispatch(addToCart(cartItem));
    toast.success("Item Added Successfully", {
      description: product.result.item.title,
    });

    // Update inCart state
    setInCart(true);
  };

  // Handle add to wishlist
  const handleAddWishlist = (whishlistProduct: WishListItem): void => {
    const checkWishList = wishListItems.includes(whishlistProduct.itemId);
    dispatch(
      addToWishList({
        ...whishlistProduct,
        image: product.result.item.images[0],
      })
    );

    if (!checkWishList) {
      toast.success("Item Added Successfully", {
        description: `${whishlistProduct.title}`,
      });
      setWishListItems((prev) => [...prev, whishlistProduct.itemId]);
    } else {
      toast.info("Item Removed Successfully", {
        description: `${whishlistProduct.title}`,
      });
      setWishListItems((prev) =>
        prev.filter((item) => item !== whishlistProduct.itemId)
      );
    }
  };

  return {
    inCart,
    wishListItems,
    quantity,
    setQuantity,
    handleQuantityChange,
    handleAddToCart,
    handleAddWishlist,
    areAllPropsSelected,
  };
};

export default useCartWishlist;
