import React from "react";
import { Star } from "lucide-react";

// Review Rating Component
const RatingStars: React.FC<{ rating: number; size?: "small" | number }> = ({
  rating,
  size = 16,
}) => {
  // Convert 'small' string value to a pixel number
  const sizeInPixels = size === "small" ? 12 : size;

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={sizeInPixels}
          className={`${
            star <= rating ? "text-[#222] fill-[#222]" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default RatingStars;
