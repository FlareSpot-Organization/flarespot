import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Check,
  CheckCircle,
  ChevronRight,
  FolderSyncIcon,
  Recycle,
  Timer,
  TruckIcon,
} from "lucide-react";

import Loader from "@/components/common/Loader";
import ProductDescription from "@/components/pages/product/ProductDescription";
import ProductImageGallery from "@/components/pages/product/ProductImageGallery";
import PropertySelector from "@/components/pages/product/PropertySelector";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/services/features/cart/cartSlice";
import { getProductDetails } from "@/services/features/products/productSlice";
import { AppDispatch } from "@/store";
import { CartItem, Sku, SkuProp, SkuValue } from "@/types/product_types";

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
  const [quantity, setQuantity] = useState(1);
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

  useEffect(() => {
    // If product has no selectable properties, set the default SKU as active
    if (!hasSelectableProps && defaultSku) {
      setActiveSku(defaultSku);
    }

    // Check if item is in cart
    const cart = JSON.parse(localStorage.getItem("user_cart") || "[]");
    const isInCart = cart.some(
      (item: CartItem) =>
        item.itemId === parseInt(singleProduct?.result?.item?.itemId)
    );
    setInCart(isInCart);
  }, [singleProduct, hasSelectableProps, defaultSku]);

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
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (maxQuantity || 1)) {
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
      selectedSku: hasSelectableProps ? activeSku : defaultSku,
      image: singleProduct?.result?.item?.images[0],
    };

    dispatch(addToCart(cartItem));
    toast.success("Item Added Successfully", {
      description: singleProduct.result.item.title,
    });
    setInCart(true);
  };

  const isInteractionDisabled = hasSelectableProps && !areAllPropsSelected();

  // Track image loading
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  // Handle initial data loading and image preloading
  useEffect(() => {
    if (!isLoading && singleProduct && images.length > 0) {
      let loadedCount = 0;
      const totalImages = images.length;
      const preloadImages = images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loadedCount++;

            resolve(true);
          };
          img.onerror = () => {
            loadedCount++;

            resolve(false);
          };
        });
      });

      Promise.all(preloadImages).then(() => {
        setIsFullyLoaded(true);
      });
    }
  }, [isLoading, singleProduct, images]);
  return (
    <>
      {isLoading ? (
        <Loader content="Fetching Product" />
      ) : (
        <div className="bg-gray-200">
          <div className=" w-full max-w-[1600px] mx-auto px-4 py-6 ">
            <div className="grid bg-white rounded-md p-4 md:p-5 grid-cols-1 md:grid-cols-2 gap-6">
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
                <h1 className="text-lg">
                  {singleProduct?.result?.item?.title}
                </h1>

                {/* Reviews Section */}
                {singleProduct?.result?.reviews?.averageStar > 0 && (
                  <div className="flex items-center gap-1 my-2">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-7 h-7 ${
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
                    <h3 className="font-bold sm:text-[28px] text-[24px]">
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
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l"
                        disabled={quantity <= 1 || isInteractionDisabled}>
                        −
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                          handleQuantityChange(parseInt(e.target.value))
                        }
                        className="w-16 h-8 text-center border-t border-b border-gray-300"
                        min="1"
                        max={maxQuantity}
                        disabled={isInteractionDisabled}
                      />
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r"
                        disabled={
                          !maxQuantity ||
                          quantity >= maxQuantity ||
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

                {/* Shipping and Return Section */}
                <div className="space-y-1 mt-6">
                  <h3 className="text-sm font-bold mb-3">
                    Shipping and Return
                  </h3>
                  <div className="group hover:bg-gray-50 rounded-lg transition-all duration-200 cursor-pointer">
                    <div className="flex items-center ">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <svg
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            aria-hidden="true">
                            <path d="M686.1 148.5c59.4 0 107.5 48.1 107.5 107.5l-0.1 20.4 147.9 58.5c43.7 17.3 72.4 59.5 72.4 106.5l0 214.4c0 49.7-33.7 91.5-79.5 103.8 0.9 2.6 1.3 5.5 1.3 8.4 0 63.7-51.2 115.5-114.5 115.5-63.3 0-114.5-51.8-114.5-115.5 0-1.7 0.1-3.5 0.4-5.1l-295.9 0c0.3 1.7 0.4 3.4 0.4 5.1 0 63.7-51.2 115.5-114.5 115.5-63.3 0-114.5-51.8-114.5-115.5 0-2 0.2-3.9 0.5-5.8-53.9-5.6-96-51.3-96-106.8l0-52.6c0-17 13.8-30.7 30.8-30.8 17 0 30.7 13.8 30.7 30.8l0 52.6c0 25.4 20.6 46.1 46.1 46l537.5 0 0.1-445.4c0-23.5-17.6-42.9-40.3-45.7l-5.8-0.4-491.5 0c-25.4 0-46.1 20.6-46.1 46.1l-0.1 56.2 180.8 0.1c15.3 0 27.9 11.1 30.3 25.7l0.4 5c0 17-13.8 30.7-30.7 30.7l-211.4 0c-17 0-30.7-13.8-30.8-30.7l0-87c0-59.4 48.1-107.5 107.6-107.5l491.5 0z m-335.6 614.4l-107 0c0.3 1.7 0.4 3.4 0.4 5.1 0 29.9 23.8 54.1 53.1 54.1 29.2 0 53.1-24.1 53.1-54.1 0-1.7 0.1-3.4 0.4-5.1z m524 0.3l-106.9 0 0.4 4.8c0 29.9 23.8 54.1 53.1 54.1 29.2 0 53.1-24.1 53-54.1l0.4-4.8z m-81-420.7l0 359.3 112.7 0c23.5 0 42.9-17.6 45.8-40.3l0.3-5.7 0-214.4c0-21.8-13.3-41.3-33.5-49.4l-125.3-49.5z m-614.3 102.9c17 0 30.7 13.8 30.7 30.8 0 17-13.8 30.7-30.7 30.7l-143.4 0c-17 0-30.7-13.8-30.7-30.7 0-17 13.8-30.7 30.7-30.8l143.4 0z"></path>
                          </svg>
                        </div>
                        <span
                          className="text-gray-700 font-[400] text-[14px]"
                          style={{ lineBreak: "anywhere" }}>
                          Free shipping on all orders in USA
                          <span className="ml-2 inline-block">🇺🇸</span>
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>

                  <div className="group hover:bg-gray-50 rounded-lg transition-all duration-200 cursor-pointer">
                    <div className="flex items-center ">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-50 rounded-lg">
                          <FolderSyncIcon className="w-3 h-3 text-green-600" />
                        </div>
                        <span
                          className="text-gray-700 font-[400] text-[14px]"
                          style={{ lineBreak: "anywhere" }}>
                          30 Day Money Back Guarantee
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>

                  <div className="group hover:bg-gray-50 rounded-lg transition-all duration-200 cursor-pointer">
                    <div className="flex items-center ">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-50 rounded-lg">
                          <Recycle className="w-3 h-3 text-purple-600" />
                        </div>
                        <span
                          className="text-gray-700 font-[400] text-[14px]"
                          style={{ lineBreak: "anywhere" }}>
                          Recurring Subscription Guide
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </div>

                {/* Product Specification */}
                {singleProduct?.result?.item?.properties?.list?.length > 0 && (
                  <div className="space-y-1 mt-6">
                    <h3 className="text-sm font-bold mb-3">
                      Product Specification
                    </h3>
                    <div className="">
                      <div className="space-y-2">
                        {singleProduct?.result?.item?.properties?.list?.map(
                          (spec: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                              <div
                                className="text-[14px] font-[400] text-[#222]"
                                style={{ lineBreak: "anywhere" }}>
                                {spec.name}: {spec.value}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}

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
      )}
    </>
  );
};

export default SingleProduct;
