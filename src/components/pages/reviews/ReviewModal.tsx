import React, { useState, useEffect } from "react";
import { Star, X } from "lucide-react";
import { Product, Review } from "@/types/public";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: Partial<Review>) => void;
  isFollowUp: boolean;
  initialData?: Partial<Review>;
  product?: Product;
}

// Review Modal Component
const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  product,
  isFollowUp = false, // Ensure isFollowUp has a default value
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [rating, setRating] = useState(initialData?.rating || 5);
  const [images, setImages] = useState<string[]>([]);
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setRating(initialData.rating || 5);
    } else {
      // Reset form when creating a new review
      setTitle("");
      setContent("");
      setRating(5);
      setImages([]);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      content,
      rating,
      productId: product?.id,
      isFollowUp, // Include isFollowUp in the submitted data
      parentReviewId: initialData?.parentReviewId || null,
      originalReviewId: initialData?.originalReviewId,
    });
    onClose();
  };

  const addImage = () => {
    if (imageUrl && !images.includes(imageUrl)) {
      setImages([...images, imageUrl]);
      setImageUrl("");
      setShowImageInput(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {initialData?.id
              ? isFollowUp
                ? "Add Follow-up Review"
                : "Edit Review"
              : "Write a Review"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {product && (
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-16 h-16 object-contain"
            />
            <div>
              <h3 className="font-medium text-sm line-clamp-2">
                {product.title}
              </h3>
              <p className="text-xs text-gray-500">{product.category}</p>
              <p className="text-xs text-gray-500 mt-1">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none">
                  <Star
                    size={30}
                    className={`${
                      star <= rating
                        ? "text-[#222] fill-[#222]"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-700">
                {rating} of 5 stars
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Review Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Summarize your experience in one line"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              Review Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded-md min-h-[100px]"
              placeholder="What did you like or dislike? How was your experience using this product?"
              required
            />
          </div>

          {/* Image upload section */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Add Photos (optional)
            </label>

            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-16 h-16 border rounded-md overflow-hidden">
                    <img
                      src={img}
                      alt={`Review photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages(images.filter((_, i) => i !== index))
                      }
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {showImageInput ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Paste image URL"
                  className="flex-1 p-2 border rounded-md"
                />
                <button
                  type="button"
                  onClick={addImage}
                  className="px-3 py-2 bg-gray-800 text-white rounded-md">
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowImageInput(false);
                    setImageUrl("");
                  }}
                  className="px-3 py-2 border rounded-md">
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowImageInput(true)}
                className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                Add Photos
              </button>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Photos help other customers make better buying decisions.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              {initialData?.id
                ? isFollowUp
                  ? "Submit Follow-up"
                  : "Update Review"
                : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
