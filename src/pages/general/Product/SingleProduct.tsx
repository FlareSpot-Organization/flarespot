import React, { useState } from "react";
import myData from "@/utils/data_json/detail-10.json";
import DOMPurify from "dompurify";
import ProductDescription from "@/components/pages/product/ProductDescription";

const SingleProduct = () => {
  const skuImages = Object.values(myData.result.item.sku.skuImages);
  const images = [...myData.result.item.images, ...skuImages];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [skuImage, setSkuImage] = useState("");
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleClickImage = (e: React.MouseEvent<HTMLImageElement>) => {
    const clickedImageUrl = e.currentTarget.src;

    // Find the index of the image that matches the clicked URL
    const matchedImageIndex = images.findIndex(
      (img) => img === clickedImageUrl
    );

    // If a matching image is found, set it as the current image
    if (matchedImageIndex !== -1) {
      setCurrentImageIndex(matchedImageIndex);
    }
  };

  return (
    <div className="bg-gray-200 px-5 py-10">
      <div className="grid bg-white rounded-md p-5 grid-cols-2">
        {/* Product images and description */}
        <div className="">
          <div className="flex items-center justify-center">
            {/* Thumbnails Column */}
            <div className="h-[500px] w-[11%] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border-2 rounded overflow-hidden mb-2 ${
                    currentImageIndex === index
                      ? "border-gray-800"
                      : "border-transparent"
                  }`}
                  onMouseEnter={() => setCurrentImageIndex(index)}>
                  <img
                    src={img}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Image Container */}
            <div className=" relative flex-1">
              <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={images[currentImageIndex]}
                  alt="Main product view"
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg">
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg">
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
          {/* Description */}
          <div className="mt-5">
            <ProductDescription
              htmlContent={myData?.result?.item?.description.html}
            />
          </div>
        </div>

        {/* Product informations */}
        <div className="px-8">
          <h1 className="text-lg">{myData?.result?.item?.title}</h1>

          <div>
            <h3 className="font-bold text-lg">
              {myData?.result?.item?.sku?.def?.price}
            </h3>
            <p className="text-xs text-gray-500 mt-2 flex items-center space-x-2">
              <span> or 4 interest-free payments of $5.50 with Pay with</span>
              <img
                className="w-[10%]"
                src="https://media.sezzle.com/branding/2.0/Sezzle_Logo_FullColor.svg"
                alt="Pay with Sezzle"
              />
            </p>
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-bold">Color: </h3>
            <div className="flex mt-3 items-center space-x-2 ">
              {myData?.result?.item?.sku?.props[1]?.values?.map(
                (img, index) => (
                  <img
                    src={img?.image}
                    alt=""
                    onClick={() => handleClickImage(img?.image)}
                    key={index}
                    className="w-12 h-12"
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
