import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import banner from "@/assets/images/categories/shopBg.jpg";
import { Timer, Gift, Zap, Star } from "lucide-react";

const Hero4 = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const texts = [
    "Act early for lovely gifts",
    "Don't miss out on exclusive deals",
    "Grab your favorites now",
    "Limited time special offers",
  ];

  // Calculate time left
  useEffect(() => {
    const endDate = new Date("2025-02-08T08:59:00+01:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      badge: "Bestseller",
      title: "Gifts for him",
      category: "Home & Living",
      icon: <Gift className="w-4 h-4" />,
      color: "bg-rose-500",
    },
    {
      badge: "100% Off",
      title: "Exclusive Deals",
      category: "Limited Time",
      icon: <Star className="w-4 h-4" />,
      color: "bg-blue-500",
    },
    {
      badge: "60% Off",
      title: "Hot Deals",
      category: "Flash Sale",
      icon: <Zap className="w-4 h-4" />,
      color: "bg-amber-500",
    },
    {
      badge: "New",
      title: "Premium Items",
      category: "Featured",
      icon: <Timer className="w-4 h-4" />,
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="relative w-[95%] mt-6 md:mt-10 rounded-lg mx-auto">
      <div className="relative h-[500px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
        <div
          className="absolute inset-0 bg-cover rounded-lg bg-center"
          style={{
            backgroundImage: `url(${banner})`,
            backgroundPosition: "center 15%",
          }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>

          <div className="absolute top-6 left-4 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Timer className="w-4 h-4" />
              <div className="text-sm font-medium">
                {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
              </div>
            </motion.div>

            <div className="h-12 mt-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTextIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  {texts[currentTextIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {cards?.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/90 backdrop-blur-sm p-2 md:p-4 rounded-lg shadow-md group hover:bg-white transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <span
                      className={`${card.color} text-white text-xs md:text-sm px-2 py-0.5 rounded-full flex items-center gap-1`}>
                      {card.icon}
                      {card.badge}
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-black/5 rounded-full group-hover:bg-black/10 transition-colors">
                      {card.icon}
                    </motion.div>
                  </div>
                  <div className="text-sm md:text-lg font-semibold mt-1 md:mt-2">
                    {card.title}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500">
                    {card.category}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-2 md:mt-3 w-full bg-black/80 text-white py-1 md:py-2 px-2 md:px-4 rounded text-xs md:text-sm hover:bg-black transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 font-medium">
                    Shop Now
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero4;
