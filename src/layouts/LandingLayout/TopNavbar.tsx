import { removeItem } from "@/services/features/wishlist/wishlistSlice";
import { AppDispatch } from "@/store";
import { WishListItem } from "@/types/product_types";
import { AnimatePresence, motion } from "framer-motion";
import {
  DollarSign,
  ExternalLink,
  Heart,
  Tag,
  Trash,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const TopNavbar = () => {
  const [currentPromo, setCurrentPromo] = useState(0);
  const [showWishlist, setShowWishlist] = useState(false);

  const wishlistItems = useSelector((state: any) => state.wishlist);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteItem = (product: WishListItem) => {
    dispatch(removeItem(product.itemId));
    toast.error("Item Removed Successfully", {
      description: `${product.title}`,
    });
  };

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
      <div className="relative w-full max-w-[1600px] mx-auto px-4">
        <div className="h-12 flex items-center justify-between text-sm">
          {/* Left section */}
          <div className="sm:flex hidden items-center space-x-2">
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

          {/* Right section with Wishlist */}
          <div className="relative sm:flex hidden items-center space-x-6">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onMouseEnter={() => setShowWishlist(true)}
              onMouseLeave={() => setShowWishlist(false)}>
              <div className="relative">
                <Heart
                  className="w-5 h-5 text-red-500 cursor-pointer"
                  fill="currentColor"
                />
                {wishlistItems?.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                    {wishlistItems?.items.length}
                  </span>
                )}
              </div>
              <span className="text-[11px]">Wishlist</span>

              {/* Wishlist Popup */}
              <AnimatePresence>
                {showWishlist && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-8 right-0 bg-white text-black rounded-md shadow-lg w-80 z-50">
                    <div className="p-4">
                      <h3 className="font-semibold mb-3">My Wishlist</h3>
                      {wishlistItems?.items.length > 0 ? (
                        <>
                          <div className="space-y-4">
                            {wishlistItems.items
                              .slice(0, 3)
                              ?.map((item: WishListItem) => (
                                <motion.div
                                  key={item.itemId}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="flex items-start space-x-3 border-b pb-4">
                                  {/* Thumbnail */}
                                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                    <img
                                      src={`${item?.image}`}
                                      alt={item?.title}
                                      referrerPolicy="no-referrer"
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  </div>

                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                      {item.title}
                                    </p>
                                    <div className="flex items-baseline mt-1">
                                      {item.sku.def.promotionPrice ? (
                                        <>
                                          <span className="text-red-600 text-sm font-medium">
                                            ${item.sku.def.promotionPrice}
                                          </span>
                                          <span className="text-gray-400 text-xs line-through ml-2">
                                            ${item.sku.def.price}
                                          </span>
                                        </>
                                      ) : (
                                        <span className="text-gray-900 text-sm">
                                          ${item.sku.def.price}
                                        </span>
                                      )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between mt-2">
                                      <a
                                        href={`/product?itemId=${item.itemId}`}>
                                        <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                                          <ExternalLink className="w-3 h-3" />
                                          <span>View Item</span>
                                        </button>
                                      </a>
                                      <Trash
                                        className="w-4 h-4 text-red-500 cursor-pointer"
                                        fill="currentColor"
                                        onClick={() => handleDeleteItem(item)}
                                      />
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                          </div>
                          <Link to="/wishlist">
                            <button className="w-full mt-4 bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800 transition-colors">
                              View All Wishlist Items
                            </button>
                          </Link>
                        </>
                      ) : (
                        <div className="text-center py-6">
                          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-600 text-sm">
                            Your wishlist is empty
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            Add items you love to your wishlist
                          </p>
                          <button className="mt-4 bg-black text-white py-2 px-4 rounded-md text-sm hover:bg-gray-800 transition-colors">
                            Start Shopping
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span className="text-[11px]">Safe & Secured Payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
