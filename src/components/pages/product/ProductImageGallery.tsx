import { cleanImageUrl } from "@/utils/helpers";
import { useState, useEffect, useRef } from "react";
import ProductDescriptionImages from "./ProductDescriptionImages";
import ProductReviews from "./ProductReviews";

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
  // Create a refs array to store references to all thumbnails
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Create a ref for the sidebar container
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Initialize the refs array with the correct length
  useEffect(() => {
    thumbnailRefs.current = thumbnailRefs.current.slice(0, images.length);
  }, [images.length]);

  // Scroll the selected thumbnail into view when currentImageIndex changes
  useEffect(() => {
    if (thumbnailRefs.current[currentImageIndex] && sidebarRef.current) {
      const thumbnail = thumbnailRefs.current[currentImageIndex];
      const sidebar = sidebarRef.current;

      const thumbnailTop = thumbnail!.offsetTop;
      const thumbnailHeight = thumbnail!.offsetHeight;
      const sidebarScrollTop = sidebar.scrollTop;
      const sidebarHeight = sidebar.offsetHeight;

      // If the thumbnail is not fully visible in the sidebar
      if (
        thumbnailTop < sidebarScrollTop ||
        thumbnailTop + thumbnailHeight > sidebarScrollTop + sidebarHeight
      ) {
        // Scroll the thumbnail into view with smooth behavior
        thumbnail!.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [currentImageIndex]);

  return (
    <div className="order-1 md:order-1">
      <div className="flex relative">
        {/* Thumbnails Column - Fixed Height */}
        <div
          ref={sidebarRef}
          className="hidden h-[100%] absolute md:block overflow-y-scroll scrollbar-none scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {images.map((img: string, index: number) => (
            <div
              ref={(el) => (thumbnailRefs.current[index] = el)}
              key={index}
              style={{ borderRadius: "2px" }}
              className={`
                image-option-container2 ${index === images.length - 1 ? "mb-0" : "mb-1"} 
                image-option-outer 
                image-option-inner
                ${currentImageIndex === index ? "image-option-selected" : ""}
              `}
              onMouseEnter={() => setCurrentImageIndex(index)}
              onClick={() => setCurrentImageIndex(index)}>
              <img
                src={`${img}_65x65.jpg`}
                data-src={cleanImageUrl(`${img}_.webp`)}
                alt={`Product view ${index + 1}`}
                className="image-option-img "
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>

        {/* Rest of your component remains the same */}
        {/* Main Image Container - With aspect ratio handling */}
        <div className="relative flex-1 group main-image-container">
          <div
            style={{ borderRadius: "2px", paddingBottom: "100%" }}
            className="relative overflow-hidden bg-[#e6e6e6] w-full h-0">
            <div className="absolute inset-0 flex items-center justify-center">
              {images[currentImageIndex] && (
                <img
                  src={images[currentImageIndex]}
                  referrerPolicy="no-referrer"
                  alt="Main product view"
                  className="max-w-full max-h-full object-contain mix-blend-multiply"
                />
              )}
            </div>

            {/* Navigation Arrows */}
            <div className="hidden md:group-hover:block">
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-white/90 p-3 rounded-full shadow-lg z-10">
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
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-white/90 p-3 rounded-full shadow-lg z-10">
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

      <ProductReviews />

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
