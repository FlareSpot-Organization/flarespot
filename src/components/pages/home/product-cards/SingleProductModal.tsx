import { CheckCircle, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductPageSkeletalLoader from "@/components/Loaders/SingleProductLoader";
import ProductDescription from "@/components/pages/product/ProductDescription";
import ProductImageGallery from "@/components/pages/product/ProductImageGallery";
import PropertySelector from "@/components/pages/product/PropertySelector";
import ShippingAndProductSpec from "@/components/pages/product/ShippingAndProductSpec";
import { Button } from "@/components/ui/button";
import useCartWishlist from "@/hooks/useCartWishlist";
import useProductPageStickyScroll from "@/hooks/useProductPageStickyScroll";
import { AppDispatch } from "@/store";
import { Sku, SkuProp, SkuValue } from "@/types/product_types";
import { getUniqueImages } from "@/utils/helpers";

// This is a wrapper component for the SingleProduct that works in modal context

interface SelectedProperty {
  pid: number;
  vid: number;
}

interface SelectedProperties {
  [key: string]: SelectedProperty;
}

interface SingleProductModalProps {
  itemId: string;
  onClose: () => void;
  onAddToCart: (product: any) => void;
}

const SingleProductModal = ({
  itemId,
  onClose,
  onAddToCart,
}: SingleProductModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { singleProduct, isLoading } = useSelector(
    (state: any) => state.products
  );

  // Local state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedValues, setSelectedValues] = useState<any>({});
  const [activeSku, setActiveSku] = useState<Sku | null>(null);
  const [skuIdFromUrl, setSkuIdFromUrl] = useState<string>("");

  // Refs for sticky behavior from custom hook
  const { isSticky, productInfoRef, interestsRef, productInfoContainerRef } =
    useProductPageStickyScroll();

  const images = getUniqueImages(singleProduct);

  // Check if product has selectable properties
  const hasSelectableProps =
    singleProduct?.result?.item?.sku?.props?.length > 0;

  // Get default SKU for products without properties
  const defaultSku = singleProduct?.result?.item?.sku?.def;

  // Get maximum available quantity
  const maxQuantity = hasSelectableProps
    ? activeSku?.quantity
    : defaultSku?.quantity;

  // Cart and wishlist functionality from custom hook
  const {
    inCart,
    wishListItems,
    quantity,
    setQuantity,
    handleQuantityChange,
    handleAddToCart: originalHandleAddToCart,
    handleAddWishlist,
    areAllPropsSelected,
  } = useCartWishlist({
    product: singleProduct,
    activeSku,
    hasSelectableProps,
    selectedValues,
    images,
    currentImageIndex,
    maxQuantity,
  });

  // Custom add to cart handler for modal
  const handleAddToCartWrapper = () => {
    if (isInteractionDisabled || maxQuantity === 0) return;

    const productToAdd = {
      ...singleProduct.result.item,
      quantity:
        typeof quantity === "string" ? parseInt(quantity) || 1 : quantity,
      sku: activeSku || defaultSku,
    };

    onAddToCart(productToAdd);
  };

  // Function to find SKU by skuId
  const findSkuById = (skuId: string): Sku | undefined => {
    if (!singleProduct?.result?.item?.sku?.base) return undefined;
    return singleProduct.result.item.sku.base.find(
      (sku: Sku) => sku.skuId === skuId
    );
  };

  // Function to convert propMap to selectedValues format
  const propMapToSelectedValues = (
    propMap: string
  ): Record<string, SelectedProperty> => {
    if (!propMap || !singleProduct?.result?.item?.sku?.props) return {};

    const selectedValues: Record<string, SelectedProperty> = {};

    // Parse the propMap
    const propPairs = propMap.split(";");
    const propMapObj: Record<number, number> = {};

    propPairs.forEach((pair) => {
      const [pid, vid] = pair.split(":").map(Number);
      propMapObj[pid] = vid;
    });

    // Map the propMap to selectedValues format
    singleProduct.result.item.sku.props.forEach((prop: SkuProp) => {
      const pid = prop.pid;
      const vid = propMapObj[pid];

      if (vid !== undefined) {
        const value = prop.values?.find((v) => v.vid === vid);
        if (value) {
          selectedValues[prop.name] = {
            pid: pid,
            vid: vid,
          };
        }
      }
    });

    return selectedValues;
  };

  /**
   * Auto-select properties with exactly one value
   * Only single-value properties (like if there's only one size option) are auto-selected
   */
  useEffect(() => {
    if (
      hasSelectableProps &&
      singleProduct?.result?.item?.sku?.props &&
      !skuIdFromUrl
    ) {
      const props = singleProduct.result.item.sku.props;
      const newSelectedValues = { ...selectedValues };
      let hasNewSelection = false;

      // Only auto-select properties with exactly one value
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
    } else if (!hasSelectableProps && defaultSku) {
      // If product has no selectable properties, set the default SKU as active
      setActiveSku(defaultSku);
    }
  }, [singleProduct, hasSelectableProps, defaultSku, skuIdFromUrl]);

  /**
   * Check if there are any in-stock options
   */
  const hasInStockOptions = () => {
    if (!singleProduct?.result?.item?.sku?.base) return false;

    // For products without properties, check default SKU
    if (!hasSelectableProps) {
      return defaultSku && defaultSku.quantity > 0;
    }

    // For products with properties, check if any SKU has stock
    return singleProduct.result.item.sku.base.some(
      (sku: Sku) => sku.quantity > 0
    );
  };

  /**
   * Handle stock check and initialization based on SKU availability
   */
  useEffect(() => {
    if (!singleProduct?.result?.item?.sku) return;

    // Check if there's any stock
    const hasStock = hasInStockOptions();

    if (hasStock && hasSelectableProps) {
      // If we have a skuId from URL, select that specific SKU
      if (skuIdFromUrl) {
        const skuFromUrl = findSkuById(skuIdFromUrl);

        if (skuFromUrl) {
          const newSelectedValues = propMapToSelectedValues(skuFromUrl.propMap);
          setSelectedValues(newSelectedValues);
          setActiveSku(skuFromUrl);
        }
      }
    }
  }, [singleProduct?.result?.item?.sku, hasSelectableProps, skuIdFromUrl]);

  /**
   * Update SKU URL param when active SKU changes (for modal we just track it locally)
   */
  useEffect(() => {
    if (activeSku && hasSelectableProps) {
      // Only update URL if we have a complete selection
      if (areAllPropsSelected()) {
        setSkuIdFromUrl(activeSku.skuId);
      }
    }
  }, [activeSku, hasSelectableProps, areAllPropsSelected]);

  useEffect(() => {
    // If product has no selectable properties, set the default SKU as active
    if (!hasSelectableProps && defaultSku) {
      setActiveSku(defaultSku);
    }
  }, [singleProduct, hasSelectableProps, defaultSku]);

  /**
   * Function to find matching SKUs based on selected properties
   */
  const findMatchingSkus = (selectedProps: SelectedProperties): Sku[] => {
    const base = singleProduct?.result?.item?.sku?.base || [];

    // If no properties are selected, return all SKUs
    if (Object.keys(selectedProps).length === 0) {
      return base;
    }

    return base.filter((sku: Sku) => {
      if (!sku.propMap) return false;

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

  /**
   * Handle property selection
   */
  const handlePropertySelect = (
    propertyName: string,
    value: (SkuValue & { pid: number }) | null
  ) => {
    // Create a local copy to avoid race conditions
    const currentSelectedValues = { ...selectedValues };

    if (!value) {
      // Deselecting a property
      const newSelectedValues = { ...currentSelectedValues };
      delete newSelectedValues[propertyName];

      // Update state first
      setSelectedValues(newSelectedValues);
      setActiveSku(null);

      if (propertyName.toLowerCase().includes("color")) {
        setCurrentImageIndex(0);
      }

      setSkuIdFromUrl("");

      return;
    }

    // Selecting a property
    const newSelectedValues = {
      ...currentSelectedValues,
      [propertyName]: {
        pid: value.pid,
        vid: value.vid,
      },
    };

    // Find matching SKUs
    const matchingSKUs = findMatchingSkus(newSelectedValues);

    // Update state
    setSelectedValues(newSelectedValues);

    if (matchingSKUs.length === 1) {
      setActiveSku(matchingSKUs[0]);
    } else {
      setActiveSku(null);
      setSkuIdFromUrl("");
    }

    // Handle color property image selection
    if (propertyName.toLowerCase().includes("color") && value.image) {
      const imageIndex = images.findIndex((img) => {
        // Skip video objects
        if (typeof img === "object" && img.url) return false;
        return img === value.image;
      });

      if (imageIndex !== -1) {
        setCurrentImageIndex(imageIndex);
      }
    }
  };

  /**
   * Update the navigation functions for images/videos
   */
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const isInteractionDisabled = hasSelectableProps && !areAllPropsSelected();

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <ProductPageSkeletalLoader />
      </div>
    );
  }

  return (
    <div className="bg-white w-full">
      <div className="w-full mx-auto px-4 py-6">
        <div className="grid bg-white rounded-md p-4 md:p-5 grid-cols-1 md:grid-cols-2">
          {/* Product images */}
          <ProductImageGallery
            images={images}
            nextImage={nextImage}
            previousImage={previousImage}
            setCurrentImageIndex={setCurrentImageIndex}
            currentImageIndex={currentImageIndex}
          />

          {/* Product Information - Simplified sticky behavior */}
          <div
            ref={productInfoContainerRef}
            className={`order-2 md:order-2 px-0 md:px-8 ${
              isSticky
                ? "md:sticky md:top-20 max-h-[calc(100vh-40px)] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-none"
                : "md:relative"
            }`}>
            <div ref={productInfoRef}>
              {/* Product Information Section */}
              <div className="flex items-start justify-between">
                <h1 className="text-[20px] leading-[22px] font-[400] text-[#222]">
                  {singleProduct?.result?.item?.title}
                </h1>
                {/* Wishlist button - icon only design */}
                <button
                  className={`p-1.5 m-2 rounded-full shadow-md transition-all duration-300 hover:scale-110 ${
                    wishListItems.includes(singleProduct?.result?.item?.itemId)
                      ? "bg-red-500" // Red background when in wishlist
                      : "bg-gray-200 hover:bg-gray-300" // Neutral color when not in wishlist
                  }`}
                  onClick={() => handleAddWishlist(singleProduct.result.item)}
                  aria-label={
                    wishListItems.includes(singleProduct?.result?.item?.itemId)
                      ? "Remove from Wishlist"
                      : "Add to Wishlist"
                  }>
                  <svg
                    className={`w-4 h-4 ${
                      wishListItems.includes(
                        singleProduct?.result?.item?.itemId
                      )
                        ? "text-white" // White icon when in wishlist
                        : "text-gray-700" // Dark icon when not in wishlist
                    }`}
                    fill={
                      wishListItems.includes(
                        singleProduct?.result?.item?.itemId
                      )
                        ? "currentColor"
                        : "none"
                    }
                    stroke="currentColor"
                    strokeWidth={
                      wishListItems.includes(
                        singleProduct?.result?.item?.itemId
                      )
                        ? "0"
                        : "2"
                    }
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>

              {/* Sellers Information */}
              <div className="flex items-center my-3">
                <span className="text-sm text-gray-600">Sold by:</span>
                <a
                  href={
                    singleProduct?.result?.seller?.storeUrl ||
                    "//www.aliexpress.com/store/1102411094"
                  }
                  className="ml-2 text-sm font-medium text-[#222] hover:text-blue-600 transition-colors">
                  {singleProduct?.result?.seller?.storeTitle}
                </a>
              </div>

              {/* Reviews Section */}
              {singleProduct?.result?.reviews?.averageStar > 0 && (
                <div className="flex items-center my-2">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${
                        index <
                        Math.floor(
                          parseInt(singleProduct?.result?.reviews?.averageStar)
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

              {/* Price Section with Wishlist Icon */}
              <div className="relative flex justify-between items-center mt-2">
                <div className="flex items-center">
                  {/* Get current SKU */}
                  {(() => {
                    // First determine which SKU to use for price display
                    const currentSku = hasSelectableProps
                      ? activeSku || defaultSku // Use activeSku if available, otherwise fallback to defaultSku
                      : defaultSku;
                    const hasPromo =
                      currentSku?.promotionPrice &&
                      currentSku?.promotionPrice !== currentSku?.price;

                    return (
                      <>
                        {/* Main Price Display */}
                        <h3 className="font-[600] sm:text-[28px] text-[24px]">
                          {hasPromo
                            ? currentSku?.promotionPrice
                            : currentSku?.price}
                        </h3>

                        {/* Original Price (Only display if promotion exists) */}
                        {hasPromo && (
                          <h3 className="font-[600] sm:text-[16px] text-[14px] line-through text-[#aaa] -mt-2 ml-2">
                            {currentSku.price}
                          </h3>
                        )}
                      </>
                    );
                  })()}
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
                      className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l ${
                        (typeof quantity === "number" && quantity <= 1) ||
                        isInteractionDisabled
                          ? "bg-gray-200" // Gray background when disabled
                          : ""
                      }`}
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
                      className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r ${
                        !maxQuantity ||
                        (typeof quantity === "number" &&
                          quantity >= maxQuantity) ||
                        isInteractionDisabled
                          ? "bg-gray-200" // Gray background when disabled
                          : ""
                      }`}
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
                    disabled={
                      inCart || isInteractionDisabled || maxQuantity === 0
                    }
                    size="lg"
                    className="w-full text-[20px] rounded-full h-12 sm:flex-1"
                    onClick={handleAddToCartWrapper}>
                    {inCart
                      ? "In Cart"
                      : maxQuantity === 0
                        ? "Out of Stock"
                        : "Add to Cart"}
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="w-full text-[20px] rounded-full h-12 sm:flex-1">
                    View Full Details
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
        </div>
      </div>
    </div>
  );
};

export default SingleProductModal;
