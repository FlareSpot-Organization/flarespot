import React, { useState, useEffect } from "react";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = "w-12 h-10 rounded-md object-cover transform transition-transform duration-300 hover:scale-105",
  fallbackSrc = "/placeholder-image.png", // Optional default placeholder
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [imageError, setImageError] = useState(false);

  // Clean URL function to handle // prefixes
  const cleanImageUrl = (url: string) => {
    return url.replace(/^\/\//, "https://");
  };

  // Image error handling
  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      // Try fallback or placeholder
      setImageSrc(fallbackSrc);
    }
  };

  // Effect to clean URL on initial render
  useEffect(() => {
    setImageSrc(cleanImageUrl(src));
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleImageError}
      loading="lazy" // Lazy loading for performance
      decoding="async" // Asynchronous decoding
    />
  );
};

export default ResponsiveImage;
