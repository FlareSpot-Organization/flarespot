import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Keyboard, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import banner1 from "@/assets/images/slide2.jpg";
import banner2 from "@/assets/images/banner2.jpg";
import banner3 from "@/assets/images/banner3.jpg";
import banner4 from "@/assets/images/slide1.jpg";

const Hero2 = () => {
  const [isLoading, setIsLoading] = useState(true);

  const items = [
    {
      image: banner1,
      title: "Explore the Best Fits",
      subtitle: "Gadgets, fashion, and more for every style.",
      buttonText: "Shop Now",
    },
    {
      image: banner2,
      title: "Thoughtful Gifts",
      subtitle: "Jewelry, beauty, and surprises to impress.",
      buttonText: "Shop Gifts",
    },
    {
      image: banner3,
      title: "Perfect for Everyone",
      subtitle: "Home essentials and personalized picks.",
      buttonText: "Shop All",
    },
    {
      image: banner4,
      title: "New Arrivals",
      subtitle: "Discover the latest trends and styles.",
      buttonText: "Explore",
    },
  ];

  return (
    <div className="relative w-full sm:w-[90%] mx-auto">
      <Swiper
        modules={[Navigation, Autoplay, Keyboard, Pagination]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{
          type: "bullets",
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        keyboard={{
          enabled: true,
        }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        className="mySwiper">
        {items?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-12 relative gap-2 md:gap-4 h-auto rounded-lg overflow-hidden shadow-lg mt-4 md:mt-10">
              {/* Main content section */}
              <div className="col-span-12 md:col-span-8 relative">
                {isLoading && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
                )}

                <img
                  src={item.image}
                  alt={item.title}
                  onLoad={() => setIsLoading(false)}
                  className={`w-full h-[250px] md:h-[450px] object-cover transition-opacity duration-300 ${
                    isLoading ? "opacity-0" : "opacity-100"
                  }`}
                />
                <div className="absolute inset-0 flex flex-col justify-center items-start p-4 sm:p-6 md:p-10 bg-gradient-to-r from-black/50 to-transparent">
                  <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2 max-w-[80%]">
                    {item.title}
                  </h1>
                  <p className="text-xs sm:text-sm md:text-lg text-white/90 mb-2 md:mb-4 max-w-[70%]">
                    {item.subtitle}
                  </p>
                  <button className="bg-white text-gray-900 px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                    {item.buttonText}
                  </button>
                </div>
              </div>

              {/* Featured deals section */}
              <div className="col-span-12 md:col-span-4 bg-gray-800 p-4 md:p-6 flex flex-col justify-center relative md:static">
                <div className="md:absolute md:bottom-10">
                  <h2 className="text-base sm:text-lg md:text-2xl font-bold text-white mb-1 md:mb-3">
                    Featured Deals
                  </h2>
                  <p className="text-xs sm:text-sm md:text-lg text-white/90 mb-2 md:mb-4">
                    Don't miss out on our exclusive offers and discounts.
                  </p>
                  <button className="bg-white text-gray-900 px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                    View Deals
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button className="custom-prev hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-6 sm:w-8 h-6 sm:h-8 items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors duration-200 shadow-md">
        <span className="sr-only">Previous</span>
        <svg
          className="w-4 sm:w-5 h-4 sm:h-5"
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
      <button className="custom-next hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-6 sm:w-8 h-6 sm:h-8 items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors duration-200 shadow-md">
        <span className="sr-only">Next</span>
        <svg
          className="w-4 sm:w-5 h-4 sm:h-5"
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
  );
};

export default Hero2;
