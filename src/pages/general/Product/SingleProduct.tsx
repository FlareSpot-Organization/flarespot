import { CheckCircle, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import Loader from "@/components/common/Loader";
import ProductDescription from "@/components/pages/product/ProductDescription";
import ProductImageGallery from "@/components/pages/product/ProductImageGallery";
import PropertySelector from "@/components/pages/product/PropertySelector";
import ShippingAndProductSpec from "@/components/pages/product/ShippingAndProductSpec";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/services/features/cart/cartSlice";
import { getProductDetails } from "@/services/features/products/productSlice";
import { AppDispatch } from "@/store";
import { CartItem, Sku, SkuProp, SkuValue } from "@/types/product_types";
import MoreProducts2 from "@/components/pages/home/product-cards/MoreProducts2";

interface SelectedProperty {
  pid: number;
  vid: number;
}

interface SelectedProperties {
  [key: string]: SelectedProperty;
}

const SingleProduct = () => {
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get("itemId") || "";
  const dispatch = useDispatch<AppDispatch>();

  const { singleProduct, isLoading } = useSelector(
    (state: any) => state.products
  );

  // Local state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedValues, setSelectedValues] = useState<any>({});
  const [activeSku, setActiveSku] = useState<Sku | null>(null);
  const [quantity, setQuantity] = useState<string | number>(1);
  const [inCart, setInCart] = useState(false);

  // Get all images including SKU images
  const skuImages = singleProduct?.result?.item?.sku?.skuImages
    ? Object.values(singleProduct.result.item.sku.skuImages)
    : [];
  const images = [...(singleProduct?.result?.item?.images || []), ...skuImages];

  // Check if product has selectable properties
  const hasSelectableProps =
    singleProduct?.result?.item?.sku?.props?.length > 0;

  // Get default SKU for products without properties
  const defaultSku = singleProduct?.result?.item?.sku?.def;

  // Get maximum available quantity
  const maxQuantity = hasSelectableProps
    ? activeSku?.quantity
    : defaultSku?.quantity;

  // Check if all required properties are selected
  const areAllPropsSelected = () => {
    if (!hasSelectableProps) return true;
    const requiredProps = singleProduct?.result?.item?.sku?.props?.length || 0;
    return Object.keys(selectedValues).length === requiredProps;
  };

  // Auto-select properties with single value
  useEffect(() => {
    if (hasSelectableProps && singleProduct?.result?.item?.sku?.props) {
      const props = singleProduct.result.item.sku.props;
      const newSelectedValues = { ...selectedValues };
      let hasNewSelection = false;

      props.forEach((prop: SkuProp) => {
        if (prop.values && prop.values.length === 1) {
          const value = prop.values[0];
          newSelectedValues[prop.name] = {
            pid: prop.pid,
            vid: value.vid,
          };
          hasNewSelection = true;
        }
      });

      if (hasNewSelection) {
        setSelectedValues(newSelectedValues);
        // Find matching SKU for auto-selected properties
        const matchingSKUs = findMatchingSkus(newSelectedValues);
        if (matchingSKUs.length === 1) {
          setActiveSku(matchingSKUs[0]);
        }
      }
    }
  }, [singleProduct]);

  useEffect(() => {
    dispatch(getProductDetails(itemId));
  }, [dispatch, itemId]);

  // Update the inCart check in your useEffect
  useEffect(() => {
    // If product has no selectable properties, set the default SKU as active
    if (!hasSelectableProps && defaultSku) {
      setActiveSku(defaultSku);
    }

    // Check if specific SKU/variant is in cart
    const cart = JSON.parse(localStorage.getItem("user_cart") || "[]");
    const isInCart = cart.some((item: CartItem) => {
      // For products without properties, check just the itemId
      if (!hasSelectableProps) {
        return item.itemId === parseInt(singleProduct?.result?.item?.itemId);
      }

      // For products with properties, check if the exact same SKU is in cart
      return (
        item.itemId === parseInt(singleProduct?.result?.item?.itemId) &&
        item.selectedSku?.skuId === activeSku?.skuId
      );
    });

    setInCart(isInCart);
  }, [singleProduct, hasSelectableProps, defaultSku, activeSku]); // Add activeSku as dependency
  // Navigation functions for images
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Function to find matching SKUs based on selected properties
  const findMatchingSkus = (selectedProps: SelectedProperties): Sku[] => {
    const base = singleProduct?.result?.item?.sku?.base || [];

    return base.filter((sku: Sku) => {
      const skuPropPairs = sku.propMap.split(";");
      const skuProps = new Map(
        skuPropPairs.map((pair) => {
          const [pid, vid] = pair.split(":").map(Number);
          return [pid, vid];
        })
      );

      return Object.values(selectedProps).every(
        ({ pid, vid }) => skuProps.get(pid) === vid
      );
    });
  };

  // Handle property selection
  const handlePropertySelect = (
    propertyName: string,
    value: (SkuValue & { pid: number }) | null
  ) => {
    if (!value) {
      const newSelectedValues = { ...selectedValues };
      delete newSelectedValues[propertyName];
      setSelectedValues(newSelectedValues);
      setActiveSku(null);
      if (propertyName.toLowerCase().includes("color")) {
        setCurrentImageIndex(0);
      }
      return;
    }

    const newSelectedValues = {
      ...selectedValues,
      [propertyName]: {
        pid: value.pid,
        vid: value.vid,
      },
    };
    setSelectedValues(newSelectedValues);

    // Find matching SKUs
    const matchingSKUs = findMatchingSkus(newSelectedValues);
    if (matchingSKUs.length === 1) {
      setActiveSku(matchingSKUs[0]);
    } else {
      setActiveSku(null);
    }

    if (propertyName.toLowerCase().includes("color") && value.image) {
      const imageIndex = images.findIndex((img) => img === value.image);
      if (imageIndex !== -1) {
        setCurrentImageIndex(imageIndex);
      }
    }
  };

  // Handle quantity changes
  const handleQuantityChange = (value: string | number) => {
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
  // Handle add to cart
  const handleAddToCart = () => {
    if (hasSelectableProps && !areAllPropsSelected()) {
      toast.error("Please select all options");
      return;
    }

    const cartItem: CartItem = {
      ...singleProduct.result.item,
      quantity,
      selectedSku: activeSku,
      selectedProperties: selectedValues,
      image: images[currentImageIndex],
    };

    dispatch(addToCart(cartItem));
    toast.success("Item Added Successfully", {
      description: singleProduct.result.item.title,
    });

    // Instead of setting inCart directly, check if the specific variant is in cart
    const cart = JSON.parse(localStorage.getItem("user_cart") || "[]");
    const isInCart = cart.some(
      (item: CartItem) =>
        item.itemId === parseInt(singleProduct?.result?.item?.itemId) &&
        item.selectedSku?.skuId === activeSku?.skuId
    );

    setInCart(isInCart);
  };

  // Add this useEffect to update inCart when properties change
  useEffect(() => {
    if (!singleProduct?.result?.item?.itemId) return;

    const cart = JSON.parse(localStorage.getItem("user_cart") || "[]");
    const isInCart = cart.some((item: CartItem) => {
      // For products without properties, check just the itemId
      if (!hasSelectableProps) {
        return item.itemId === parseInt(singleProduct?.result?.item?.itemId);
      }

      // For products with properties, check if the exact same SKU is in cart
      return (
        item.itemId === parseInt(singleProduct?.result?.item?.itemId) &&
        item.selectedSku?.skuId === activeSku?.skuId
      );
    });

    setInCart(isInCart);
  }, [
    selectedValues,
    activeSku,
    singleProduct?.result?.item?.itemId,
    hasSelectableProps,
  ]);

  const isInteractionDisabled = hasSelectableProps && !areAllPropsSelected();

  const searchResults = JSON.parse(
    localStorage.getItem("flarespots_search") ?? "{}"
  );

  return (
    <>
      {isLoading ? (
        <Loader content="Fetching Product" />
      ) : (
        <div className="bg-gray-200">
          <div className=" w-full max-w-[1600px] mx-auto px-4 py-6 ">
            <div className="grid bg-white rounded-md p-4 md:p-5 grid-cols-1 md:grid-cols-2 ">
              {/* Product images */}
              <ProductImageGallery
                images={images}
                nextImage={nextImage}
                previousImage={previousImage}
                setCurrentImageIndex={setCurrentImageIndex}
                currentImageIndex={currentImageIndex}
              />

              {/* Product Information */}
              <div className="order-2 md:order-2 px-0 md:px-8">
                <h1 className="text-[20px] leading-[22px] font-[400] text-[#222]">
                  {singleProduct?.result?.item?.title}
                </h1>

                {/* Reviews Section */}
                {singleProduct?.result?.reviews?.averageStar > 0 && (
                  <div className="flex items-center my-2">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-6 h-6 ${
                          index <
                          Math.floor(
                            parseInt(
                              singleProduct?.result?.reviews?.averageStar
                            )
                          )
                            ? "text-black"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">
                      ({singleProduct?.result?.reviews?.count})
                    </span>
                  </div>
                )}

                {/* Price Section */}
                <div className="relative">
                  <div className="flex items-center">
                    <h3 className="font-[600] sm:text-[28px] text-[24px]">
                      {(hasSelectableProps
                        ? activeSku?.promotionPrice
                        : defaultSku?.promotionPrice) ||
                        (hasSelectableProps
                          ? activeSku?.price
                          : defaultSku?.price) ||
                        defaultSku?.promotionPrice}
                    </h3>
                    <h3 className="font-[600] sm:text-[16px] text-[14px] line-through text-[#aaa] -mt-2 ml-2">
                      {activeSku?.price || defaultSku?.price}
                    </h3>
                  </div>
                </div>

                {/* Property Selectors - Only show if product has properties */}
                {hasSelectableProps &&
                  singleProduct?.result?.item?.sku?.props?.map(
                    (property: SkuProp) => (
                      <PropertySelector
                        key={property.pid}
                        property={property}
                        selectedValues={selectedValues}
                        base={singleProduct.result.item.sku.base}
                        allProps={singleProduct.result.item.sku.props}
                        onPropertySelect={handlePropertySelect}
                        onImageClick={(url) => {
                          const index = images.findIndex((img) => img === url);
                          if (index !== -1) setCurrentImageIndex(index);
                        }}
                      />
                    )
                  )}

                {/* Quantity Selection */}
                <div className="mt-5">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-[14px] font-bold">Qty:</h3>
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          const currentVal =
                            typeof quantity === "string"
                              ? parseInt(quantity) || 1
                              : quantity;
                          handleQuantityChange(Math.max(1, currentVal - 1));
                        }}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l"
                        disabled={
                          (typeof quantity === "number" && quantity <= 1) ||
                          isInteractionDisabled
                        }>
                        −
                      </button>
                      <input
                        value={quantity}
                        onChange={(e) => handleQuantityChange(e.target.value)}
                        onBlur={() => {
                          // If empty or invalid on blur, reset to 1
                          if (quantity === "" || isNaN(Number(quantity))) {
                            setQuantity(1);
                          }
                        }}
                        className="w-8 h-8 text-center outline-none border-t border-b border-gray-300"
                        min="0"
                        max={maxQuantity}
                        disabled={isInteractionDisabled}
                      />
                      <button
                        onClick={() => {
                          const currentVal =
                            typeof quantity === "string"
                              ? parseInt(quantity) || 1
                              : quantity;
                          handleQuantityChange(currentVal + 1);
                        }}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r"
                        disabled={
                          !maxQuantity ||
                          (typeof quantity === "number" &&
                            quantity >= maxQuantity) ||
                          isInteractionDisabled
                        }>
                        +
                      </button>
                    </div>

                    {/* Stock Status */}
                    {!isInteractionDisabled &&
                      (hasSelectableProps ? activeSku : defaultSku) && (
                        <div
                          className={`flex items-center space-x-2 ${
                            maxQuantity < 10
                              ? "text-orange-500"
                              : "text-green-500"
                          }`}>
                          {maxQuantity < 10 ? (
                            <Timer className="w-4 h-4 animate-spin" />
                          ) : (
                            <CheckCircle className="w-4 h-4 animate-pulse" />
                          )}
                          <span className="text-[14px]">
                            {maxQuantity < 10
                              ? `Only ${maxQuantity} left`
                              : `${maxQuantity} available`}
                          </span>
                        </div>
                      )}
                  </div>

                  {/* Add to Cart Buttons */}
                  <div className="mt-4 flex gap-4 flex-col sm:flex-row">
                    <Button
                      disabled={inCart || isInteractionDisabled}
                      size="lg"
                      className="w-full text-[20px] rounded-full h-12 sm:flex-1"
                      onClick={handleAddToCart}>
                      {inCart ? "In Cart" : "Add to Cart"}
                    </Button>
                    <Button
                      disabled={isInteractionDisabled}
                      className="w-full text-[20px] rounded-full h-12 bg-orange-500 sm:flex-1">
                      Buy Now
                    </Button>
                  </div>
                </div>

                {/* Shipping/Returns and Product Specification */}
                <div>
                  <ShippingAndProductSpec singleProduct={singleProduct} />
                </div>

                {/* Description - Order last on mobile */}
                <div className="order-3 col-span-1 md:col-span-2 mt-6 sm:hidden block">
                  <ProductDescription
                    htmlContent={singleProduct?.result?.item?.description?.html}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white mt-3 p-5 rounded-md">
              <h3 className="text-[18px] text-[#222] h-[20px] font-[600] leading-[16px]">
                Explore your interests
              </h3>
              <MoreProducts2
                productsSearch={searchResults?.result?.resultList}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
