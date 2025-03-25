import { CheckCircle, Timer } from "lucide-react";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import ProductPageSkeletalLoader from "@/components/Loaders/SingleProductLoader";
import MoreProducts2 from "@/components/pages/home/product-cards/MoreProducts2";
import ProductDescription from "@/components/pages/product/ProductDescription";
import ProductImageGallery from "@/components/pages/product/ProductImageGallery";
import PropertySelector from "@/components/pages/product/PropertySelector";
import ShippingAndProductSpec from "@/components/pages/product/ShippingAndProductSpec";
import { Button } from "@/components/ui/button";
import useCartWishlist from "@/hooks/useCartWishlist";
import useProductPageStickyScroll from "@/hooks/useProductPageStickyScroll";
import useRecentlyViewed from "@/hooks/useRecentlyViewed";
import { getProductDetails } from "@/services/features/products/productSlice";
import { AppDispatch } from "@/store";
import { Sku, SkuProp, SkuValue } from "@/types/product_types";
import { getUniqueImages } from "@/utils/helpers";

// Import Custom Hooks

interface SelectedProperty {
  pid: number;
  vid: number;
}

interface SelectedProperties {
  [key: string]: SelectedProperty;
}

const SingleProduct = ({
  itemIdFromModal,
}: {
  itemIdFromModal?: number | string;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const itemId = itemIdFromModal
    ? itemIdFromModal
    : searchParams.get("itemId") || "";
  const skuIdFromUrl = searchParams.get("skuId") || "";
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { singleProduct, isLoading } = useSelector(
    (state: any) => state.products
  );

  // Local state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedValues, setSelectedValues] = useState<any>({});
  const [activeSku, setActiveSku] = useState<Sku | null>(null);

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

  // Use recently viewed products hook
  useRecentlyViewed(singleProduct);

  // Cart and wishlist functionality from custom hook
  const {
    inCart,
    wishListItems,
    quantity,
    setQuantity,
    handleQuantityChange,
    handleAddToCart,
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
   * Initial data loading
   */
  useEffect(() => {
    dispatch(getProductDetails(itemId));
  }, [dispatch, itemId]);

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

      // Store current scroll position
      const scrollPosition = window.scrollY;

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
        // No longer auto-select from multiple matching SKUs

        // Restore scroll position after updates
        setTimeout(() => window.scrollTo(0, scrollPosition), 0);
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
      // Otherwise, don't auto-select anything unless it's properties with only one value
      // which is handled by the other useEffects
    }
  }, [singleProduct?.result?.item?.sku, hasSelectableProps, skuIdFromUrl]);

  /**
   * Update URL when active SKU changes
   */
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (activeSku && hasSelectableProps) {
      // Only update URL if we have a complete selection
      if (areAllPropsSelected()) {
        // Using setTimeout to debounce URL updates and prevent flickering
        timeoutId = setTimeout(() => {
          setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("skuId", activeSku.skuId);
            return newParams;
          });
        }, 300); // 300ms delay to allow UI to settle
      }
    }

    // Cleanup timeout to prevent memory leaks
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeSku, hasSelectableProps, areAllPropsSelected, setSearchParams]);

  /**
   * Auto-select SKU from URL when page loads
   */
  useEffect(() => {
    // Skip if we don't have both skuId and product data
    if (!skuIdFromUrl || !singleProduct?.result?.item?.sku?.base) return;

    // Skip if we already have selected values (prevents overriding user selections)
    if (Object.keys(selectedValues).length > 0) return;

    const skuFromUrl = findSkuById(skuIdFromUrl);

    if (skuFromUrl) {
      const newSelectedValues = propMapToSelectedValues(skuFromUrl.propMap);

      // Set values with a short delay to avoid race conditions
      setTimeout(() => {
        setSelectedValues(newSelectedValues);
        setActiveSku(skuFromUrl);

        // If we have color property with image, select the corresponding image
        Object.entries(newSelectedValues).forEach(([propName, propValue]) => {
          const prop = singleProduct.result.item.sku.props.find(
            (p: SkuProp) => p.pid === propValue.pid
          );

          if (prop && propName.toLowerCase().includes("color")) {
            const value = prop.values?.find(
              (v: any) => v.vid === propValue.vid
            );
            if (value && value.image) {
              const imageIndex = images.findIndex((img) => {
                if (typeof img === "object" && img.url) return false;
                return img === value.image;
              });

              if (imageIndex !== -1) {
                setCurrentImageIndex(imageIndex);
              }
            }
          }
        });
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      // Use history.replaceState to update URL without triggering a re-render
      if (window.history) {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("skuId");
        window.history.replaceState(
          { path: newUrl.toString() },
          "",
          newUrl.toString()
        );
      }

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

      // We'll let the useEffect that watches activeSku handle this URL update
      // since it's important that it's synchronized with the active SKU
    } else {
      setActiveSku(null);

      // Use history.replaceState to update URL without triggering a re-render
      if (window.history) {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("skuId");
        window.history.replaceState(
          { path: newUrl.toString() },
          "",
          newUrl.toString()
        );
      }
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

  // Explore your interests
  const searchResults = JSON.parse(
    localStorage.getItem("flarespots_search") ?? "{}"
  );

  return (
    <>
      {isLoading ? (
        <ProductPageSkeletalLoader />
      ) : (
        <div className="bg-gray-200">
          <div className="w-full max-w-[1600px] mx-auto px-4 py-6">
            <div className="grid bg-white rounded-md p-4 md:p-5 grid-cols-1 md:grid-cols-2 gap-4">
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
                className={`order-2 md:order-2 mb-10 p-1 ${
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
                        wishListItems.includes(
                          singleProduct?.result?.item?.itemId
                        )
                          ? "bg-red-500" // Red background when in wishlist
                          : "bg-gray-200 hover:bg-gray-300" // Neutral color when not in wishlist
                      }`}
                      onClick={() =>
                        handleAddWishlist(singleProduct.result.item)
                      }
                      aria-label={
                        wishListItems.includes(
                          singleProduct?.result?.item?.itemId
                        )
                          ? "Remove from Wishlist"
                          : "Add to Wishlist"
                      }>
                      <svg
                        className={`w-6 h-6 ${
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
                            const index = images.findIndex(
                              (img) => img === url
                            );
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
                              <Timer className="w-6 h-6 animate-spin" />
                            ) : (
                              <CheckCircle className="w-6 h-6 animate-pulse" />
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
                        onClick={handleAddToCart}>
                        {inCart
                          ? "In Cart"
                          : maxQuantity === 0
                            ? "Out of Stock"
                            : "Add to Cart"}
                      </Button>
                      <Button
                        disabled={isInteractionDisabled || maxQuantity === 0}
                        className="w-full text-[20px] rounded-full h-12 bg-orange-500 sm:flex-1">
                        {maxQuantity === 0 ? "Out of Stock" : "Buy Now"}
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
                      htmlContent={
                        singleProduct?.result?.item?.description?.html
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Explore your interests section - with ref for sticky detection */}
            {!itemIdFromModal && (
              <div className="bg-white mt-3 p-5 rounded-md" ref={interestsRef}>
                <h3 className="text-[18px] text-[#222] h-[20px] font-[600] leading-[16px]">
                  Explore your interests
                </h3>
                <MoreProducts2
                  productsSearch={searchResults?.result?.resultList}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
