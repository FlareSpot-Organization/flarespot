import ProductDescription from "@/components/pages/product/ProductDescription";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/services/features/cart/cartSlice";
import { AppDispatch } from "@/store";
import { CartItem, Sku, SkuValue } from "@/types/product_types";
import myData from "@/utils/data_json/detail-10.json";
import { findSkuByValues } from "@/utils/helpers";
import {
  Check,
  CheckCircle,
  ChevronRight,
  FolderSyncIcon,
  Recycle,
  Timer,
  TruckIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const SingleProduct = () => {
  const skuImages = Object.values(myData.result.item.sku.skuImages);
  const images = [...myData.result.item.images, ...skuImages];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const dispatch = useDispatch<AppDispatch>();

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImageProperty, setSelectedImageProperty] =
    useState<SkuValue>();
  const [skuSinglSkuInfo, setSkuSingleInfo] = useState<Sku>();
  const [inCart, setInCart] = useState(false);

  const colorSchemes = myData?.result?.item?.sku?.props?.find(
    (prop) => prop?.name == "Color"
  );
  const sizeSchemes = myData?.result?.item?.sku?.props?.find(
    (prop) => prop?.name == "Size"
  );

  const handleClickImage = (clickedImageUrl: string) => {
    const matchedImageIndex = images.findIndex(
      (img) => img === clickedImageUrl
    );

    setSelectedImage(clickedImageUrl);

    if (matchedImageIndex !== -1) {
      setCurrentImageIndex(matchedImageIndex);
    }

    const result = findSkuByValues(
      myData?.result?.item?.sku?.base,
      "",
      selectedImageProperty?.vid as unknown as string
    );

    setSkuSingleInfo(result);
  };

  const handleSizeClick = (clickedSize: string) => {
    const result = findSkuByValues(
      myData?.result?.item?.sku?.base,
      clickedSize,
      selectedImageProperty?.vid as unknown as string
    );

    setSkuSingleInfo(result);
  };

  const [quantity, setQuantity] = useState(0);
  const isLowStock =
    skuSinglSkuInfo?.quantity && skuSinglSkuInfo?.quantity < 10;

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (skuSinglSkuInfo?.quantity && quantity < skuSinglSkuInfo.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (
      !isNaN(value) &&
      skuSinglSkuInfo?.quantity &&
      value >= 1 &&
      value <= skuSinglSkuInfo.quantity
    ) {
      setQuantity(value);
    }
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("user_cart") || "[]");
    const cartProductIds = cart.find(
      (item: CartItem) => item.itemId == parseInt(myData?.result?.item?.itemId)
    );
    setInCart(true);
  }, []);

  const handleAdd = (product: CartItem) => {
    dispatch(addToCart({ ...product }));
    toast.success("Item Added Successfully", {
      description: `${product.title}`,
    });
    setInCart(true);
  };

  return (
    <div className="bg-gray-200 px-4 py-6 md:px-5 md:py-10">
      <div
        className="grid bg-white rounded-md p-4 md:p-5 
        grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product images */}
        <div className="order-1 md:order-1">
          <div className="flex space-x-1">
            {/* Thumbnails Column - Hidden on mobile, visible on md+ */}
            <div
              className="hidden md:block h-[500px] 
              overflow-y-scroll scrollbar-none scrollbar-thumb-gray-300 
              scrollbar-track-gray-100">
              {images.map((img, index) => (
                <div
                  key={index}
                  style={{ borderRadius: "2px" }}
                  className={`cursor-pointer border 
                    overflow-hidden mb-2 ${
                      currentImageIndex === index
                        ? "border-gray-800"
                        : "border-transparent"
                    }`}
                  onMouseEnter={() => setCurrentImageIndex(index)}>
                  <img
                    src={img}
                    alt={`Product view ${index + 1}`}
                    className="w-[45px] h-[45px]  object-cover"
                    style={{ borderRadius: "2px" }}
                  />
                </div>
              ))}
            </div>

            {/* Main Image Container */}
            <div className="relative flex-1">
              <div
                style={{ borderRadius: "2px" }}
                className="aspect-square relative 
                overflow-hidden bg-gray-100">
                <img
                  src={images[currentImageIndex]}
                  alt="Main product view"
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows - Visible on md+ devices */}
                <button
                  onClick={previousImage}
                  className="hidden md:block absolute left-4 top-1/2 
                    -translate-y-1/2 bg-white/80 hover:bg-white 
                    p-2 rounded-full shadow-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={nextImage}
                  className="hidden md:block absolute right-4 top-1/2 
                    -translate-y-1/2 bg-white/80 hover:bg-white 
                    p-2 rounded-full shadow-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* Description - Order last on mobile */}
          <div className="order-3 col-span-1 md:col-span-2 mt-6 sm:block hidden">
            <ProductDescription
              htmlContent={myData?.result?.item?.description.html}
            />
          </div>

          {/* Mobile Thumbnails - Visible only on mobile */}
          <div className="flex overflow-x-auto space-x-2 mt-2 md:hidden">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product view ${index + 1}`}
                className="w-[48px] h-[48px] rounded-sm object-cover flex-shrink-0"
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="order-2 md:order-2 px-0 md:px-8">
          <h1 className="text-lg ">{myData?.result?.item?.title}</h1>

          {/* Price Section */}
          <div className=" relative">
            <h3 className="font-bold sm:text-[28px] text-[24px]">
              {myData?.result?.item?.sku?.def?.promotionPrice}
            </h3>
            <h3 className="font-[600] sm:text-[16px] text-[14px] line-through text-[#aaa] absolute top-1 sm:left-40 left-32">
              {myData?.result?.item?.sku?.def?.price}
            </h3>
            <p
              className="text-[14px] text-[#777] font-[400] leading-[26px] flex items-center 
              space-x-2">
              <span>
                or 4 interest-free payments of{" "}
                <span className="font-bold text-[#000]">$5.50</span> with
              </span>
              <img
                className=" h-[18px]"
                src="https://media.sezzle.com/branding/2.0/Sezzle_Logo_FullColor.svg"
                alt="Pay with Sezzle"
              />
            </p>
          </div>

          {/* Color Selection */}
          {colorSchemes && (
            <div className="mt-5">
              <h3 className="text-sm font-bold">
                Color: {selectedImageProperty?.name}
              </h3>
              <div className="flex flex-wrap gap-2 mt-3 items-center ">
                {colorSchemes?.values?.map((img: any, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer"
                    onClick={() => {
                      img.image && handleClickImage(img.image);
                      setSelectedImageProperty(img);
                    }}>
                    <div
                      className="relative overflow-hidden rounded-sm 
                      ring-1 ring-transparent hover:ring-gray-700 
                      transition-all duration-300">
                      {img.image && (
                        <>
                          <img
                            src={img.image}
                            alt={img.name}
                            className="w-[48px] h-[48px] rounded-sm object-cover 
                              transform transition-transform duration-300 
                              hover:scale-105"
                          />

                          {/* Overlay with check mark */}
                          <div
                            className={`
                              absolute inset-0 bg-black/20 
                              transition-opacity duration-300
                              ${
                                selectedImage === img.image
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}>
                            <div
                              className={`
                                absolute bottom-0 right-0 
                                transform transition-all p-0.5 bg-[#000] duration-300
                                ${
                                  selectedImage === img.image
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-2 opacity-0"
                                }`}>
                              <Check className="text-white w-2 h-2" />
                            </div>
                          </div>

                          {/* Border indicator */}
                          <div
                            className={`
                              absolute inset-0 border-2 rounded-sm 
                              transition-colors duration-300
                              ${
                                selectedImage === img.image
                                  ? "border-gray-900"
                                  : "border-transparent"
                              }`}
                          />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {sizeSchemes && (
            <div className="mt-5">
              <h3 className="text-sm font-bold">Size: {selectedSize}</h3>
              <div className="flex mt-3 flex-wrap gap-2 items-center ">
                {sizeSchemes?.values?.map((size, _) => (
                  <div
                    key={size.vid}
                    onClick={() => {
                      handleSizeClick(size.vid as unknown as string);
                      setSelectedSize(size.name);
                    }}
                    className={`${
                      selectedSize == size?.name
                        ? "border-gray-800"
                        : "border-gray-300"
                    } 
                      border hover:border-gray-800 transition-all 
                      ease-in-out duration-300 rounded-full px-3 
                      text-xs py-0.5 cursor-pointer`}>
                    <p className="text-[14px]">{size.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selection */}
          <div className="mt-5">
            <div className="flex items-center space-x-4">
              <h3 className="text-sm font-bold">Qty:</h3>
              <div className="flex items-center">
                <button
                  onClick={handleDecrement}
                  className="w-8 h-8 flex items-center justify-center 
                    border border-gray-300 rounded-l 
                    hover:bg-gray-100 disabled:opacity-50 
                    disabled:cursor-not-allowed"
                  disabled={quantity <= 1}>
                  −
                </button>
                <input
                  type="text"
                  value={quantity}
                  onChange={handleInputChange}
                  className="w-8 h-8 text-center flex items-center justify-center border-t border-b 
                    border-gray-300 focus:outline-none"
                  min="0"
                  max={skuSinglSkuInfo?.quantity}
                />
                <button
                  onClick={handleIncrement}
                  className="w-8 h-8 flex items-center justify-center 
                    border border-gray-300 rounded-r 
                    hover:bg-gray-100 disabled:opacity-50 
                    disabled:cursor-not-allowed"
                  disabled={
                    !skuSinglSkuInfo?.quantity ||
                    quantity >= skuSinglSkuInfo.quantity
                  }>
                  +
                </button>
              </div>
              <div
                className={`flex items-center space-x-2 ${
                  isLowStock ? "text-orange-500" : "text-green-500"
                }`}>
                {skuSinglSkuInfo?.quantity && skuSinglSkuInfo?.quantity > 0 && (
                  <div>
                    {isLowStock ? (
                      <Timer
                        className="w-4 h-4 
                        animate-[spin_3s_ease-in-out_infinite]"
                      />
                    ) : (
                      <CheckCircle className="w-4 h-4 animate-pulse" />
                    )}
                  </div>
                )}

                {skuSinglSkuInfo?.quantity && skuSinglSkuInfo?.quantity > 0 ? (
                  <span className="text-[14px]">
                    {isLowStock
                      ? `Only ${skuSinglSkuInfo?.quantity - quantity} left`
                      : `${skuSinglSkuInfo?.quantity - quantity} available`}
                  </span>
                ) : (
                  <span className="mx-2 text-[14px] text-gray-300">
                    out of stock
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4 flex gap-4 flex-col sm:flex-row">
              <Button
                disabled={inCart}
                className="w-full sm:flex-1"
                onClick={() =>
                  handleAdd({ ...myData?.result?.item, quantity })
                }>
                {inCart ? "In Cart" : "Add to Cart"}
              </Button>
              <Button className="w-full sm:flex-1 bg-orange-500">
                Buy Now
              </Button>
            </div>
          </div>

          {/* Shipping and Return Section */}
          <div className="space-y-1 mt-6">
            <h3 className="text-sm font-bold mb-3">Shipping and Return</h3>
            <div
              className="group hover:bg-gray-50 rounded-lg 
              transition-all duration-200 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <TruckIcon className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium text-[14px]">
                    Free shipping on all orders in USA
                    <span className="ml-2 inline-block">🇺🇸</span>
                  </span>
                </div>
                <ChevronRight
                  className="w-4 h-4 text-gray-400 
                  group-hover:text-gray-600 transform 
                  group-hover:translate-x-1 transition-all duration-200"
                />
              </div>
            </div>

            <div
              className="group hover:bg-gray-50 rounded-lg 
              transition-all duration-200 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <FolderSyncIcon className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium text-[14px]">
                    30 Day Money Back Guarantee
                  </span>
                </div>
                <ChevronRight
                  className="w-4 h-4 text-gray-400 
                  group-hover:text-gray-600 transform 
                  group-hover:translate-x-1 transition-all duration-200"
                />
              </div>
            </div>

            <div
              className="group hover:bg-gray-50 rounded-lg 
              transition-all duration-200 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Recycle className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="text-gray-700 font-medium text-[14px]">
                    Recurring Subscription Guide
                  </span>
                </div>
                <ChevronRight
                  className="w-4 h-4 text-gray-400 
                  group-hover:text-gray-600 transform 
                  group-hover:translate-x-1 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Product Specification */}
          <div className="space-y-1 mt-6">
            <h3 className="text-sm font-bold mb-3">Product Specification</h3>
            <div className="">
              <div className="space-y-2">
                {myData?.result?.item?.properties?.list?.map((spec, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 
                      hover:bg-gray-50 transition-colors duration-200">
                    <div className="text-[14px] font-medium text-gray-600">
                      {spec.name}:
                    </div>
                    <div className="text-[14px] font-semibold text-gray-900">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description - Order last on mobile */}
          <div className="order-3 col-span-1 md:col-span-2 mt-6 sm:hidden block">
            <ProductDescription
              htmlContent={myData?.result?.item?.description.html}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
