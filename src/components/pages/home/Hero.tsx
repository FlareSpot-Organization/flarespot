import banner1 from "@/assets/images/banner1.jpg";
import banner2 from "@/assets/images/banner2.jpg";
import banner3 from "@/assets/images/banner3.jpg";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Explore the Best Fits",
      subtitle: "Gadgets, fashion, and more for every style.",
      buttonText: "Shop Now",
      image: banner1,
      imageAlt: "Stylish accessories and gadgets",
    },
    {
      title: "Thoughtful Gifts",
      subtitle: "Jewelry, beauty, and surprises to impress.",
      buttonText: "Shop Gifts",
      image: banner2,
      imageAlt: "Wrapped presents on display",
    },
    {
      title: "Perfect for Everyone",
      subtitle: "Home essentials and personalized picks.",
      buttonText: "Shop All",
      image: banner3,
      imageAlt: "A variety of unique gift items",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[280px] md:h-[400px] lg:h-[300px]  overflow-hidden mx-auto mb-6 custom-hero">
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          initial={false}
          animate={{
            opacity: currentSlide === index ? 1 : 0,
            zIndex: currentSlide === index ? 1 : 0,
          }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
          style={{
            pointerEvents: currentSlide === index ? "auto" : "none",
          }}>
          <div
            className="relative h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundPosition: "0px",
            }}
            aria-label={slide.imageAlt}>
            <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 bg-black/40">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: currentSlide === index ? 0 : 20,
                  opacity: currentSlide === index ? 1 : 0,
                }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 text-center md:text-left">
                {slide.title}
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: currentSlide === index ? 0 : 20,
                  opacity: currentSlide === index ? 1 : 0,
                }}
                transition={{ delay: 0.3 }}
                className="text-sm sm:text-base md:text-lg text-white/90 mb-6 text-center md:text-left">
                {slide.subtitle}
              </motion.p>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: currentSlide === index ? 0 : 20,
                  opacity: currentSlide === index ? 1 : 0,
                }}
                transition={{ delay: 0.4 }}
                className="bg-white text-gray-900 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium text-sm sm:text-base
                          hover:bg-gray-100 transition-colors duration-200 self-center md:self-start">
                {slide.buttonText}
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 
                      ${currentSlide === index ? "bg-white w-6" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
