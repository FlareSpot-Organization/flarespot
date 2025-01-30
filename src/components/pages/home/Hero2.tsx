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
    <div className="relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <Swiper
        modules={[Navigation, Autoplay, Keyboard, Pagination]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          type: "bullets",
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
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
        }}
        className="mySwiper">
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-12 gap-2 md:gap-4 h-auto md:h-[350px] rounded-lg overflow-hidden shadow-lg mt-4 md:mt-10">
              {/* Main content section */}
              <div className="col-span-12 md:col-span-8 relative h-[250px] md:h-full">
                {isLoading && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}
                <img
                  src={item.image}
                  alt={item.title}
                  onLoad={() => setIsLoading(false)}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    isLoading ? "opacity-0" : "opacity-100"
                  }`}
                />
                <div className="absolute inset-0 flex flex-col justify-center items-start p-4 md:p-8 bg-gradient-to-r from-black/40 to-transparent">
                  <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">
                    {item.title}
                  </h1>
                  <p className="text-sm md:text-lg text-white/90 mb-3 md:mb-4">
                    {item.subtitle}
                  </p>
                  <button className="bg-white text-gray-900 px-4 md:px-5 py-1.5 md:py-2 rounded-full text-sm md:text-base font-medium hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                    {item.buttonText}
                  </button>
                </div>
              </div>

              {/* Featured deals section */}
              <div className="col-span-12 md:col-span-4 bg-gray-800 p-4 md:p-6 flex flex-col justify-center">
                <h2 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-3">
                  Featured Deals
                </h2>
                <p className="text-sm md:text-lg text-white/90 mb-3 md:mb-4">
                  Don't miss out on our exclusive offers and discounts.
                </p>
                <button className="bg-white text-gray-900 px-4 md:px-5 py-1.5 md:py-2 rounded-full text-sm md:text-base font-medium hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                  View Deals
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      <div className="swiper-button-next after:!text-[10px] md:after:!text-[12px] !w-8 !h-8 md:!w-10 md:!h-10 !text-white !bg-black/50 !rounded-full !right-2 md:!right-4 hover:!bg-black/70 transition-all duration-200">
        <span className="!after:content-[''] !w-3 md:!w-4 !h-3 md:!h-4" />
      </div>
      <div className="swiper-button-prev after:!text-[10px] md:after:!text-[12px] !w-8 !h-8 md:!w-10 md:!h-10 !text-white !bg-black/50 !rounded-full !left-2 md:!left-4 hover:!bg-black/70 transition-all duration-200">
        <span className="!after:content-[''] !w-3 md:!w-4 !h-3 md:!h-4" />
      </div>
    </div>
  );
};

export default Hero2;
