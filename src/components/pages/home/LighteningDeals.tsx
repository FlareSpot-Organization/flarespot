import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules"; // Added Autoplay import
import { Zap, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./product-cards/ProductCard";

const LightningDeals = ({ products }: { products: any }) => {
  return (
    <div className="w-full relative group mt-10">
      {/* Header */}
      <div className="bg-gray-900 text-white px-2 py-3 rounded-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6" />
          <h2 className="text-xl font-bold">Lightning deals</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Limited time offer</span>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Custom Navigation Buttons - Now visible by default */}
      <button className="custom-prev-button absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-800 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white">
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button className="custom-next-button absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-800 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white">
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slider */}
      <Swiper
        modules={[Navigation, Autoplay]} // Added Autoplay to modules
        spaceBetween={20}
        slidesPerView={5}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: ".custom-prev-button",
          nextEl: ".custom-next-button",
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 5 },
        }}
        className="p-4 navigation-styled">
        {products.map((product: any) => (
          <SwiperSlide key={product.asin}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LightningDeals;
