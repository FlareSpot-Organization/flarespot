import { Button } from "@/components/ui/button";
import { useState } from "react";

const ProductDescriptionImages = ({ images }: { images: string[] }) => {
  const [showAll, setShowAll] = useState(false);

  // If showAll is true, display all images, otherwise show first 2
  const displayedImages = showAll ? images : images?.slice(0, 2);
  const hasMoreImages = images?.length > 2;
  const remainingImages = images?.length - 2;

  return (
    <div className="w-full space-y-4">
      <h1 className="text-[18px] text-[#222] h-[20px] font-[600] leading-[16px]">
        Description
      </h1>

      <div className="grid grid-cols-1 gap-1 relative">
        {displayedImages?.map((image, index) => (
          <div
            key={index}
            className={`relative aspect-square overflow-hidden rounded-lg
            ${
              !showAll && index === displayedImages.length - 1
                ? "after:absolute after:inset-x-0 after:bottom-0 after:h-1/3 after:bg-gradient-to-t after:from-white after:to-white/0 after:pointer-events-none"
                : ""
            }`}>
            <img
              src={image}
              referrerPolicy="no-referrer"
              alt={`Product image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {hasMoreImages && !showAll && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <Button
              onClick={() => setShowAll(true)}
              className="bg-white hover:bg-gray-100 text-[#222222] text-sm font-medium px-4 py-2 ">
              <div className="flex items-center text-[14px] leading-[16px] font-[400] cursor-pointer text-[#222] gap-1">
                See {remainingImages} more{" "}
                {remainingImages === 1 ? "image" : "images"}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 10.4L4 6.4L4.933 5.467L8 8.534L11.067 5.467L12 6.4L8 10.4Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescriptionImages;
