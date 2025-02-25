import { cleanImageUrl } from "@/utils/helpers";
import { useState, useEffect, useRef } from "react";
import ProductDescriptionImages from "./ProductDescriptionImages";

interface ProductGalleryProps {
  images: string[];
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  previousImage: () => void;
  nextImage: () => void;
}

const ProductImageGallery = ({
  images,
  currentImageIndex,
  setCurrentImageIndex,
  previousImage,
  nextImage,
}: ProductGalleryProps) => {
  const [mainImageHeight, setMainImageHeight] = useState(450); // Default fallback height
  const mainImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (mainImageRef.current) {
        setMainImageHeight(mainImageRef.current.clientHeight);
      }
    };

    // Update height when the image loads
    const imgElement = mainImageRef.current;
    if (imgElement) {
      imgElement.onload = updateHeight;
    }

    // Also update on window resize
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [currentImageIndex]); // Re-run when image changes

  return (
    <div className="order-1 md:order-1">
      <div className="flex">
        {/* Thumbnails Column - Dynamically Adjust Height */}
        <div
          className="hidden md:block overflow-y-scroll scrollbar-none scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          style={{ height: `${mainImageHeight}px` }} // Set dynamic height
        >
          {images.map((img: string, index: number) => (
            <div
              key={index}
              style={{ borderRadius: "2px" }}
              className={`cursor-pointer border-[#e6e6e6] overflow-hidden bg-[#e6e6e6] border-2 ml-1 mr-1 mb-1 ${
                currentImageIndex === index
                  ? "border-gray-800"
                  : "border-transparent"
              }`}
              onMouseEnter={() => setCurrentImageIndex(index)}>
              <img
                src={`${img}_60x60.jpg`}
                data-src={cleanImageUrl(`${img}_.webp`)}
                alt={`Product view ${index + 1}`}
                className={`${currentImageIndex === index ? "border-[0.5px] border-white" : ""} w-[60px] h-[60px] object-contain mix-blend-multiply flex-shrink-0 hover:border-[0.5px] hover:border-white hover:border-solid`}
                onClick={() => setCurrentImageIndex(index)}
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>

        {/* Main Image Container */}
        <div className="relative flex-1 group">
          <div
            style={{ borderRadius: "2px" }}
            className="relative overflow-hidden bg-[#e6e6e6]">
            <img
              src={images[currentImageIndex]}
              ref={mainImageRef} // Attach ref to track height
              referrerPolicy="no-referrer"
              alt="Main product view"
              className="mix-blend-multiply"
            />

            {/* Navigation Arrows */}
            <div className="hidden md:group-hover:block">
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-white/90 p-3 rounded-full shadow-lg">
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
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-white/90 p-3 rounded-full shadow-lg">
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
      </div>

      {/* Description - Order last on mobile */}
      <div className="order-3 col-span-1 md:col-span-2 mt-6 sm:block hidden">
        <ProductDescriptionImages images={images} />
      </div>

      {/* Mobile Thumbnails - Visible only on mobile */}
      <div className="flex overflow-x-auto space-x-2 mt-2 md:hidden bg-[#e6e6e6]">
        {images.map((img, index) => (
          <img
            key={index}
            src={`${img}_60x60.jpg`}
            data-src={cleanImageUrl(`${img}_.webp`)}
            referrerPolicy="no-referrer"
            alt={`Product view ${index + 1}`}
            className="w-[60px] h-[60px] mix-blend-multiply rounded-sm object-cover flex-shrink-0"
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
