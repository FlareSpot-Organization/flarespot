import banner2 from "@/assets/images/categories/bags.jpg";
import banner from "@/assets/images/categories/beauty.png";
import banner3 from "@/assets/images/categories/category-sale3.png";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Gift, Heart, Package, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

const Hero3 = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 50]);

  const features = [
    {
      icon: ShoppingBag,
      text: "Free Worldwide Shipping on All Orders Over $50",
    },
    { icon: Heart, text: "Exclusive VIP Member Benefits " },
    { icon: Package, text: "Next-Day Express Delivery " },
    { icon: Gift, text: "Complimentary Luxury Gift " },
  ];

  const images = [
    { url: banner, alt: "Fashion collection 1" },
    { url: banner2, alt: "Fashion collection 2" },
    { url: banner3, alt: "Fashion collection 3" },
  ];

  const contentSlides = [
    {
      title: "Summer Collection",
      description: "Light and breathable pieces for warm days",
      price: "29.99",
    },
    {
      title: "New Arrivals",
      description: "Fresh styles just landed this week",
      price: "39.99",
    },
    {
      title: "Limited Edition",
      description: "Exclusive designs you won't find elsewhere",
      price: "49.99",
    },
  ];

  const [activeFeature, setActiveFeature] = useState(0);
  const [activeContent, setActiveContent] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    const contentInterval = setInterval(() => {
      setActiveContent((prev) => (prev + 1) % contentSlides.length);
    }, 4000);

    const imageInterval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => {
      clearInterval(featureInterval);
      clearInterval(contentInterval);
      clearInterval(imageInterval);
    };
  }, []);

  return (
    <div className="flex justify-center w-full sm:h-[500px] h-[900px] overflow-hidden">
      {/* Entire hero section with 90% width on larger screens */}
      <div className="relative w-full max-w-[1600px] 2xl:w-[90%] h-full">
        {/* Extended background elements contained within the 90% width */}
        <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full">
          <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-black"></div>
          <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-gray-100"></div>
        </div>

        {/* Content container */}
        <div className="relative w-full h-full flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="relative w-full md:w-1/2 h-[300px] md:h-full">
            <motion.div
              className="h-full w-full flex items-center bg-black"
              style={{ y }}>
              <div className="w-full px-8 md:px-12">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
                  Discover Your Style
                </motion.h1>

                <motion.div className="space-y-4 mb-6 w-full max-w-sm">
                  {features?.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{
                        x: activeFeature === index ? 0 : -20,
                        opacity: activeFeature === index ? 1 : 0.3,
                      }}
                      className="flex items-center space-x-3 text-white">
                      <feature.icon size={18} />
                      <span className="text-sm">{feature.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-black px-6 py-2 rounded-full flex items-center space-x-2 group text-sm">
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right Section */}
          <div className="relative w-full md:w-1/2 h-[300px] md:h-full">
            <motion.div
              className="h-full w-full relative bg-gray-100"
              style={{ y: useTransform(scrollY, [0, 300], [0, 30]) }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              <div className="relative h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, scale: isHovered ? 1.05 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      opacity: { duration: 0.8 },
                      scale: { duration: 0.5 },
                    }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${images[activeImage].url})`,
                    }}
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute sm:bottom-16 bottom-2 left-6 right-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeContent}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-1">
                        {contentSlides[activeContent].title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {contentSlides[activeContent].description}
                      </p>
                      <div className="flex space-x-3">
                        <span className="text-xs font-medium">
                          Starting from
                        </span>
                        <span className="text-sm font-bold">
                          ${contentSlides[activeContent].price}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero3;
