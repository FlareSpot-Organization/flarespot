import FilterSection from "@/components/common/FilterSection";
import Loader from "@/components/common/Loader";
import NotFound from "@/components/common/NotFound";
import Pagination from "@/components/common/Pagination";
import ProductImageSearchCard from "@/components/pages/home/product-cards/ProductImageSearchCard";
import { searchProductsByImage } from "@/services/features/products/productSlice";
import { addToWishList } from "@/services/features/wishlist/wishlistSlice";
import { AppDispatch } from "@/store";
import { ProductCardProps, WishListItem } from "@/types/product_types";
import React, { ChangeEvent, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageSearchPage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [showCropTool, setShowCropTool] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const imageUrlQuery = searchParams.get("q") || "";

  const { isLoading, searchImageResults: searchResults } = useSelector(
    (state: any) => state.products
  );

  const [wishListItems, setWishListItems] = useState<number[]>([]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("user_wishlist") || "[]");
    const wishlistIds = wishlist.map((item: any) => item.itemId);

    setWishListItems(wishlistIds);
  }, []);

  useEffect(() => {
    dispatch(
      searchProductsByImage({
        query: imageUrlQuery,
      })
    );
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    // If there's an image URL from query params, set it in the state
    if (imageUrlQuery) {
      setImageUrl(imageUrlQuery);
    }
  }, [imageUrlQuery, dispatch]);

  // Auto-process the cropped image when the crop selection is complete
  useEffect(() => {
    if (completedCrop?.width && completedCrop?.height && imgRef.current) {
      processCroppedImage(completedCrop);
    }
  }, [completedCrop]);

  // Process the cropped image and convert to base64
  const processCroppedImage = (crop: Crop): void => {
    if (!imgRef.current || !crop) {
      return;
    }

    const image = imgRef.current;
    const canvas = document.createElement("canvas");

    // Make sure we have valid dimensions
    if (crop.width === 0 || crop.height === 0) {
      return;
    }

    // Set a specific pixel size for the canvas
    const pixelRatio = window.devicePixelRatio || 1;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Set canvas dimensions with proper scaling
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    // Get the canvas context for drawing
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    // Set rendering quality
    ctx.imageSmoothingQuality = "high";
    ctx.imageSmoothingEnabled = true;

    // Apply scaling to account for device pixel ratio
    ctx.scale(pixelRatio, pixelRatio);

    try {
      // Draw the cropped portion of the image onto the canvas
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      // Convert canvas to data URL and set as cropped image URL
      const base64Image = canvas.toDataURL("image/jpeg", 0.95);

      // Verify we have a valid base64 string
      if (base64Image && base64Image.startsWith("data:image/")) {
        setCroppedImageUrl(base64Image);
      }
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setImageUrl(e.target.value);
    setCroppedImageUrl(null); // Reset cropped image when URL changes
  };

  const handleSearch = (): void => {
    // Use cropped image if available, otherwise use the full image URL
    const searchImageUrl = croppedImageUrl || imageUrl;

    if (searchImageUrl) {
      searchParams.set("page", "1");
      searchParams.set("q", searchImageUrl);
      setSearchParams(searchParams);
      window.location.href = `/image-search?q=${encodeURIComponent(searchImageUrl)}&page=1`;
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setImageUrl(result);
          setCroppedImageUrl(null); // Reset cropped image when new image is uploaded
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddWishlist = (product: WishListItem): void => {
    const checkWishList = wishListItems.includes(product.itemId);
    dispatch(addToWishList({ ...product }));
    if (!checkWishList) {
      toast.success("Item Added Successfully", {
        description: `${product.title}`,
      });
      setWishListItems((prev) => [...prev, product.itemId]);
    } else {
      toast.info("Item Removed Successfully", {
        description: `${product.title}`,
      });
      setWishListItems((prev) =>
        prev.filter((item) => item !== product.itemId)
      );
    }
  };

  const handleViewProduct = (product: ProductCardProps): void => {
    window.open(`https:${product.item.itemUrl}`, "_blank");
  };

  // Helper function to format price
  const formatPrice = (price: string): string => {
    if (!price) return "$0.00";
    return `$${parseFloat(price).toFixed(2)}`;
  };

  const handleSearchWithCropped = (): void => {
    if (croppedImageUrl) {
      searchParams.set("page", "1");
      searchParams.set("q", croppedImageUrl);
      setSearchParams(searchParams);
      window.location.href = `/image-search?q=${encodeURIComponent(croppedImageUrl)}&page=1`;
    }
  };

  return (
    <div className="w-[95%] mx-auto max-w-[1600px]">
      <div className="flex flex-col lg:flex-row p-4 gap-6 font-sans relative">
        {/* Left side - Image Search section */}
        <div className="w-full lg:w-72 flex-shrink-0 sticky top-16 h-fit max-h-screen pb-4">
          {(imageUrl || imageUrlQuery) && (
            <div className="mb-4">
              <div className="relative">
                <div
                  className="image-container border rounded-md"
                  style={{
                    height: "280px",
                    overflow: "hidden",
                    position: "relative",
                  }}>
                  {/* Initially show the full image without crop overlay */}
                  {!showCropTool ? (
                    <div className="w-full h-full rounded-md">
                      <img
                        ref={imgRef}
                        src={imageUrl || imageUrlQuery}
                        alt="Search image"
                        className="w-full h-full object-cover rounded-md"
                        style={{ maxHeight: "280px" }}
                        crossOrigin="anonymous"
                      />
                      <button
                        onClick={() => setShowCropTool(true)}
                        className="absolute bottom-0 bg-black bg-opacity-50 w-full text-white px-3 py-1 rounded text-sm hover:bg-opacity-70 transition-all">
                        Crop Image
                      </button>
                    </div>
                  ) : (
                    <ReactCrop
                      crop={crop}
                      onChange={(c) => setCrop(c)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={undefined}
                      className="w-full h-full"
                      circularCrop={false}
                      ruleOfThirds>
                      <img
                        ref={imgRef}
                        src={imageUrl || imageUrlQuery}
                        alt="Search image for cropping"
                        className="w-full h-full object-cover rounded-md"
                        style={{ maxHeight: "280px" }}
                        crossOrigin="anonymous"
                      />
                    </ReactCrop>
                  )}
                </div>

                {/* Toolbar for crop actions */}
                {showCropTool && (
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => setShowCropTool(false)}
                      className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs">
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (completedCrop) {
                          processCroppedImage(completedCrop);
                          setShowCropTool(false);
                        }
                      }}
                      className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                      disabled={!completedCrop}>
                      Apply Crop
                    </button>
                  </div>
                )}
              </div>

              {/* Cropped image with image details section */}
              {croppedImageUrl && (
                <div className="mt-4 flex items-start">
                  <div className="w-[120px] h-[120px] mr-4 shrink-0">
                    <img
                      src={croppedImageUrl}
                      alt="Cropped image"
                      className="w-full h-full object-contain border border-gray-200 rounded"
                    />
                  </div>
                  <div className="text-xs text-gray-600">
                    <p className="mb-1 font-medium text-gray-700">
                      Cropped Selection
                    </p>
                    <p>Use this selection for more accurate results.</p>
                    <div className="mt-2 flex gap-2">
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded text-[10px]"
                        onClick={() => setCroppedImageUrl(null)}>
                        Remove
                      </button>
                      <button
                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-[10px]"
                        onClick={handleSearchWithCropped}
                        disabled={!croppedImageUrl}>
                        Use Selection
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mb-4">
            <input
              type="text"
              value={imageUrl}
              onChange={handleImageUrlChange}
              placeholder="Paste image URL here..."
              className="w-full p-2 border border-gray-300 rounded mb-2"
              style={{ color: "#222" }}
            />

            <div className="flex gap-3 mb-4">
              <label
                className="px-4 py-2 border border-gray-300 rounded text-sm cursor-pointer hover:bg-gray-100"
                style={{ color: "#222" }}>
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 disabled:bg-red-300"
                onClick={handleSearch}
                disabled={!imageUrl || isLoading}
                style={{ color: "white" }}>
                {isLoading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Product results */}
        <div className="flex-1">
          {isLoading ? (
            <Loader />
          ) : searchResults?.length > 0 ? (
            <div>
              <FilterSection productsSearch={searchResults} />

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-2">
                {searchResults?.map((product: ProductCardProps) => (
                  <ProductImageSearchCard
                    key={product.item.itemId}
                    product={product}
                    onViewProduct={() => handleViewProduct(product)}
                    onAddToWishlist={handleAddWishlist}
                    wishListItems={wishListItems}
                    formatPrice={formatPrice}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full">
              <NotFound query="No Product Found " />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageSearchPage;
