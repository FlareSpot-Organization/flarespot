import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import banner1 from "@/assets/images/slider10.jpg";
// import banner2 from "@/assets/images/slider7.jpg";
// import banner3 from "@/assets/images/slider7.jpg";
import banner4 from "@/assets/images/slider9.jpg";

const Hero = () => {
  const slides = [
    {
      title: "Modern furniture for contemporary homes",
      buttonText: "Shop Collection",
      image: banner1,
    },

    {
      title: "Timeless pieces for your space",
      buttonText: "Discover",
      image: banner4,
    },
  ];

  return (
    <div className="relative h-[320px]  overflow-hidden shadow-lg">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        className="h-full">
        {slides?.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-full bg-cover hero-banner"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}>
              {/* Optional overlay to enhance text readability */}
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors duration-200 shadow-md">
        <span className="sr-only">Previous</span>
        <svg
          className="w-5 h-5"
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
      <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors duration-200 shadow-md">
        <span className="sr-only">Next</span>
        <svg
          className="w-5 h-5"
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

      {/* Custom Pagination */}
      <div className="custom-pagination absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2"></div>
    </div>
  );
};

export default Hero;
