const isVideo = (item: any) => item && typeof item === "object" && item.url;
import { cleanImageUrl } from "@/utils/helpers";
import { useState, useEffect, useRef } from "react";
import ProductDescriptionImages from "./ProductDescriptionImages";
import ProductReviews from "./ProductReviews";

interface ProductGalleryProps {
  images: any[]; // Changed to any[] to accommodate both image strings and video objects
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
  // Create a ref for the video element
  const videoRef = useRef<HTMLVideoElement>(null);

  // State to track if video is playing
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  // State to track if this is the initial load
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  // State to track if a video has been seen before
  const [viewedVideos, setViewedVideos] = useState<Set<string>>(new Set());

  // Toggle video playback - when user explicitly clicks play button
  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;

    // Only handle playing, never auto-pause
    if (videoRef.current.paused) {
      // User clicked play button, start playing
      videoRef.current.play().catch((err) => {
        console.log("Video play failed:", err);
        // Reset playing state in case of error
        setIsVideoPlaying(false);
      });

      // Add controls only when user starts playback
      if (!videoRef.current.hasAttribute("controls")) {
        videoRef.current.setAttribute("controls", "true");
      }
    }
  };

  // Initialize the refs array with the correct length
  useEffect(() => {
    thumbnailRefs.current = thumbnailRefs.current.slice(0, images.length);
  }, [images.length]);

  // Initialize isInitialLoad on component mount
  useEffect(() => {
    // Set initial load flag to true when component mounts
    setIsInitialLoad(true);
    console.log("Component mounted, setting isInitialLoad to true");

    // Clean up when component unmounts
    return () => {
      console.log("Component unmounting");
    };
  }, []);

  // Scroll the selected thumbnail into view when currentImageIndex changes
  useEffect(() => {
    if (thumbnailRefs.current[currentImageIndex] && sidebarRef.current) {
      const thumbnail = thumbnailRefs.current[currentImageIndex];
      const sidebar = sidebarRef.current;
      if (!thumbnail) return;

      const thumbnailTop = thumbnail.offsetTop;
      const thumbnailHeight = thumbnail.offsetHeight;
      const sidebarScrollTop = sidebar.scrollTop;
      const sidebarHeight = sidebar.offsetHeight;

      // If the thumbnail is not fully visible in the sidebar
      if (
        thumbnailTop < sidebarScrollTop ||
        thumbnailTop + thumbnailHeight > sidebarScrollTop + sidebarHeight
      ) {
        // Store the current page scroll position
        const pageScrollPosition = window.scrollY;

        // Instead of using scrollIntoView which affects the entire page,
        // directly control the scroll position of the sidebar container
        sidebar.scrollTo({
          top: thumbnailTop - sidebarHeight / 2 + thumbnailHeight / 2,
          behavior: "smooth",
        });

        // Restore the page scroll position after a short delay
        // This ensures the page doesn't jump when thumbnail scrolling happens
        setTimeout(() => {
          window.scrollTo(0, pageScrollPosition);
        }, 0);
      }
    }

    // Handle video behavior
    const currentItem = images[currentImageIndex];
    if (isVideo(currentItem) && videoRef.current) {
      const videoUrl = currentItem.url;

      // Only attempt to play on the initial load
      if (isInitialLoad) {
        console.log("Initial load detected with video");

        // Add event listener for the canplaythrough event
        const handleCanPlay = () => {
          console.log("Video can play through, attempting autoplay");

          // Remove the event listener to prevent multiple play attempts
          videoRef.current?.removeEventListener(
            "canplaythrough",
            handleCanPlay
          );

          // Mute to help with autoplay policies
          if (videoRef.current) {
            videoRef.current.muted = true;

            // Wait a bit to ensure no other loads are in progress
            setTimeout(() => {
              if (videoRef.current) {
                const playPromise = videoRef.current.play();

                if (playPromise !== undefined) {
                  playPromise
                    .then(() => {
                      console.log("Video autoplay successful");
                      setIsVideoPlaying(true);

                      // Add controls and unmute after successful play
                      if (videoRef.current) {
                        videoRef.current.muted = false;
                        videoRef.current.setAttribute("controls", "true");
                      }

                      // Mark this video as viewed
                      setViewedVideos((prev) => {
                        const newSet = new Set(prev);
                        newSet.add(videoUrl);
                        return newSet;
                      });
                    })
                    .catch((error) => {
                      console.error("Autoplay failed:", error);
                      setIsVideoPlaying(false);
                    });
                }
              }
            }, 500);
          }
        };

        // Clean up existing listeners and add new one
        videoRef.current.removeEventListener("canplaythrough", handleCanPlay);
        videoRef.current.addEventListener("canplaythrough", handleCanPlay);

        // Ensure the video has proper attributes
        videoRef.current.playsInline = true;
        videoRef.current.preload = "auto";

        // Set a timeout to turn off initial load flag
        const timer = setTimeout(() => {
          setIsInitialLoad(false);
        }, 3000); // Longer timeout to ensure video has chance to load

        return () => {
          clearTimeout(timer);
          videoRef.current?.removeEventListener(
            "canplaythrough",
            handleCanPlay
          );
        };
      } else if (viewedVideos.has(videoUrl)) {
        // On subsequent views, wait for user interaction
        console.log("Return visit, waiting for user to press play");

        // Make sure video is reset and paused
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          setIsVideoPlaying(false);

          // Remove controls until user initiates playback
          if (videoRef.current.hasAttribute("controls")) {
            videoRef.current.removeAttribute("controls");
          }
        }
      }
    }
  }, [currentImageIndex, images, isInitialLoad, viewedVideos]);

  // Function to get appropriate thumbnail source
  const getThumbnailSrc = (item: any, index: number) => {
    if (isVideo(item)) {
      return item.thumbnail;
    }
    return `${item}_65x65.jpg`;
  };

  // Function to get mobile thumbnail source
  const getMobileThumbnailSrc = (item: any, index: number) => {
    if (isVideo(item)) {
      return item.thumbnail;
    }
    return `${item}_60x60.jpg`;
  };

  // Handle video play state
  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    // Add controls only after user starts playback
    if (videoRef.current && !videoRef.current.hasAttribute("controls")) {
      videoRef.current.setAttribute("controls", "true");
    }
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  // Instead of conditionally rendering different elements, we'll render both
  // and toggle their display properties, matching the implementation in the HTML you shared
  const currentItem = images[currentImageIndex];
  const isCurrentVideo = isVideo(currentItem);

  return (
    <div className="order-1 md:order-1">
      <div className="flex relative">
        {/* Thumbnails Column - Fixed Height */}
        <div
          ref={sidebarRef}
          className="hidden h-[100%] absolute md:block overflow-y-scroll scrollbar-none scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {images.map((item: any, index: number) => (
            <div
              ref={(el) => (thumbnailRefs.current[index] = el)}
              key={index}
              style={{ borderRadius: "2px" }}
              className={`
              image-option-container2 ${index === images.length - 1 ? "mb-0" : "mb-1"} 
              image-option-outer 
              image-option-inner
              ${currentImageIndex === index ? "image-option-selected" : ""}
              relative
            `}
              onMouseEnter={() => setCurrentImageIndex(index)}
              onClick={() => setCurrentImageIndex(index)}>
              <img
                src={getThumbnailSrc(item, index)}
                data-src={
                  isVideo(item)
                    ? item.thumbnail
                    : cleanImageUrl(`${item}_.webp`)
                }
                alt={`Product view ${index + 1}`}
                className="image-option-img"
                referrerPolicy="no-referrer"
              />
              {/* Video indicator icon for video thumbnails - exact match to image */}
              {isVideo(item) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="rounded-full bg-black bg-opacity-70 flex items-center justify-center shadow-lg"
                    style={{ width: "30px", height: "30px" }}>
                    <svg
                      className="w-[20px] h-[20px] text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Image/Video Container - With aspect ratio handling */}
        <div className="relative flex-1 group main-image-container">
          <div
            style={{ borderRadius: "2px", paddingBottom: "100%" }}
            className="relative overflow-hidden bg-[#e6e6e6] w-full h-0">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Always render both image and video, but toggle their display */}
              <img
                src={isCurrentVideo ? currentItem.thumbnail : currentItem}
                style={{
                  display: isCurrentVideo && isVideoPlaying ? "none" : "block",
                }}
                referrerPolicy="no-referrer"
                alt="Main product view"
                className="max-w-full max-h-full object-contain mix-blend-multiply"
              />

              <video
                ref={videoRef}
                src={isCurrentVideo ? currentItem.url : ""}
                style={{
                  display: isCurrentVideo && isVideoPlaying ? "block" : "none",
                }}
                className="max-w-full max-h-full object-contain"
                poster={isCurrentVideo ? currentItem.thumbnail : ""}
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onCanPlayThrough={() =>
                  console.log("Video can play through event fired")
                }
                onLoadedData={() =>
                  console.log("Video loaded data event fired")
                }
                onEnded={() => {
                  console.log("Video ended");
                  setIsVideoPlaying(false);
                  // Remove controls when video ends
                  if (
                    videoRef.current &&
                    videoRef.current.hasAttribute("controls")
                  ) {
                    videoRef.current.removeAttribute("controls");
                  }
                  // Reset to beginning
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                  }
                }}
                preload="auto"
                muted={false}
                playsInline={true}>
                Your browser does not support the video tag.
              </video>

              {/* Large centered play button overlay for video - only show when not playing */}
              {isCurrentVideo && !isVideoPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={toggleVideoPlayback}>
                  <div
                    className="rounded-full bg-black bg-opacity-70 flex items-center justify-center shadow-lg"
                    style={{ width: "60px", height: "60px" }}>
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Arrows - Only show for non-video items or when video is not playing */}
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
        <ProductDescriptionImages
          images={images.filter((item) => !isVideo(item))}
        />
      </div>

      {/* Mobile Thumbnails - Visible only on mobile */}
      <div className="flex overflow-x-auto space-x-2 mt-2 md:hidden bg-[#e6e6e6]">
        {images.map((item, index) => (
          <div
            key={index}
            className="relative w-[60px] h-[60px] flex-shrink-0"
            onClick={() => setCurrentImageIndex(index)}>
            <img
              src={getMobileThumbnailSrc(item, index)}
              data-src={
                isVideo(item) ? item.thumbnail : cleanImageUrl(`${item}_.webp`)
              }
              referrerPolicy="no-referrer"
              alt={`Product view ${index + 1}`}
              className="w-full h-full mix-blend-multiply rounded-sm object-cover"
            />
            {/* Video indicator for mobile thumbnails */}
            {isVideo(item) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="rounded-full bg-black bg-opacity-70 flex items-center justify-center"
                  style={{ width: "24px", height: "24px" }}>
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
