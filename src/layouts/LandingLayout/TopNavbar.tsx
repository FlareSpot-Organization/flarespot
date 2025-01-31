import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Tag, Heart, User, Search, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import { Atm, Payment } from "@mui/icons-material";

const TopNavbar = () => {
  const [currentPromo, setCurrentPromo] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const promos = [
    { icon: <Tag className="w-4 h-4" />, text: "Winter Sale - Up to 50% Off" },
    {
      icon: <Truck className="w-4 h-4" />,
      text: "Free Delivery on Orders $50+",
    },
    {
      icon: <Tag className="w-4 h-4" />,
      text: "New Customer? 10% Off First Order",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-12 flex items-center justify-between text-sm">
          {/* Left section */}
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4" />
            <span className="text-[11px]">Free Shipping on Orders $50+</span>
          </div>

          {/* Middle animated section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPromo}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-2">
              {promos[currentPromo].icon}
              <span className="text-[11px]">{promos[currentPromo].text}</span>
            </motion.div>
          </AnimatePresence>

          {/* Right section */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Payment className="w-3 h-3" style={{ fontSize: "12px" }} />
              <span className="text-[11px]">Safe & Secured Payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
