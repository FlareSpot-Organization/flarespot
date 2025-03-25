import React, { useState, useRef, useEffect } from "react";
import logo from "@/assets/images/logo.png";
import { NavButton } from "@/components/common/NavButton";
import SearchBar from "@/components/common/Searchbar";
import { Button } from "@/components/ui/button";
import { useHeader } from "@/contexts/LandingHeaderLayouts";
import { useLanguage } from "@/contexts/LanguageSelector";
import { demoCategoriesHeader, demoProductsHeader } from "@/utils/Content";
import {
  Award,
  ChevronDown,
  Clock,
  Heart,
  LogOut,
  Percent,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { LogoutUser } from "@/services/features/auth/authSlice";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DesktopLayout = () => {
  const {
    hoveredCategory,
    setHoveredCategory,
    handleOverlay,
    handleOverlayClose,
    setOverLay,
  } = useHeader();

  // Add refs for tracking hover state
  const categoryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const accountTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const overlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringCategoryRef = useRef<boolean>(false);
  const isHoveringAccountRef = useRef<boolean>(false);
  const isHoveringSearchRef = useRef<boolean>(false);

  const cartItems = useSelector((state: any) => state.cart.items);
  const { user, token } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const onClose = () => {};
  const {
    isLanguageModalOpen,
    setIsLanguageModalOpen,
    selectedCurrency,
    flagSrc,
  } = useLanguage({ onClose });

  const handleLogout = () => {
    dispatch(LogoutUser());
  };
  const userImage = user?.image;

  // Category container mouse handlers
  const handleCategoryMouseEnter = () => {
    isHoveringCategoryRef.current = true;

    if (categoryTimeoutRef.current) {
      clearTimeout(categoryTimeoutRef.current);
      categoryTimeoutRef.current = null;
    }

    handleOverlay();
  };

  const handleCategoryMouseLeave = () => {
    isHoveringCategoryRef.current = false;

    categoryTimeoutRef.current = setTimeout(() => {
      if (
        !isHoveringCategoryRef.current &&
        !isHoveringAccountRef.current &&
        !isHoveringSearchRef.current
      ) {
        handleOverlayClose();
      }
    }, 100);
  };

  // Account container mouse handlers
  const handleAccountMouseEnter = () => {
    isHoveringAccountRef.current = true;

    if (accountTimeoutRef.current) {
      clearTimeout(accountTimeoutRef.current);
      accountTimeoutRef.current = null;
    }

    handleOverlay();
  };

  const handleAccountMouseLeave = () => {
    isHoveringAccountRef.current = false;

    accountTimeoutRef.current = setTimeout(() => {
      if (
        !isHoveringCategoryRef.current &&
        !isHoveringAccountRef.current &&
        !isHoveringSearchRef.current
      ) {
        handleOverlayClose();
      }
    }, 100);
  };

  // Search hover state tracker
  const setSearchHovering = (isHovering: boolean) => {
    isHoveringSearchRef.current = isHovering;

    if (isHovering) {
      handleOverlay();
    } else {
      // Delay hiding overlay to check if other elements are being hovered
      overlayTimeoutRef.current = setTimeout(() => {
        if (
          !isHoveringCategoryRef.current &&
          !isHoveringAccountRef.current &&
          !isHoveringSearchRef.current
        ) {
          handleOverlayClose();
        }
      }, 100);
    }
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (categoryTimeoutRef.current) {
        clearTimeout(categoryTimeoutRef.current);
      }
      if (accountTimeoutRef.current) {
        clearTimeout(accountTimeoutRef.current);
      }
      if (overlayTimeoutRef.current) {
        clearTimeout(overlayTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <LanguageSelector
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
      />
      <div className="sticky top-0">
        <div className="hidden lg:block px-4 py-2 relative z-30 ">
          <div className="flex relative max-w-[1600px] items-center justify-between gap-2 w-full mx-auto">
            {/* Left Side */}
            <div className="flex items-center flex-shrink-0">
              <div className="mr-2">
                <Link to="/">
                  {" "}
                  <img src={logo} alt="Logo" className="h-10" />
                </Link>
              </div>

              <NavButton>
                <Award className="w-5 h-5 mr-0.5" />
                5-Star Rated
              </NavButton>

              <NavButton>
                <Percent className="w-5 h-5 mr-0.5" />
                Mega Sale
              </NavButton>

              <div
                className="dropdown-container relative"
                onMouseEnter={handleCategoryMouseEnter}
                onMouseLeave={handleCategoryMouseLeave}>
                <NavButton>
                  <span className="flex items-center">
                    Categories
                    <ChevronDown className="w-5 h-5 mr-0.5 ml-1 chevron-rotate" />
                  </span>
                </NavButton>

                <div
                  className="mega-dropdown flex"
                  onMouseEnter={handleCategoryMouseEnter}
                  onMouseLeave={handleCategoryMouseLeave}>
                  {/* Invisible bridge to prevent dropdown closing */}
                  <div className="dropdown-bridge"></div>

                  <div className="w-1/3 border-r border-gray-100 mt-5 categories-scroll">
                    {demoCategoriesHeader.map((category) => (
                      <div
                        key={category}
                        onMouseEnter={() => setHoveredCategory(category)}
                        className={`px-4 py-1 cursor-pointer ${
                          hoveredCategory === category
                            ? "bg-gray-50 rounded-[8px] text-red-600"
                            : "text-gray-700"
                        }`}>
                        <span className="text-[14px] font-medium">
                          {category}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex-1 p-4">
                    <div className="grid grid-cols-4 gap-3">
                      {demoProductsHeader.map((product, idx) => (
                        <div key={idx} className="group cursor-pointer">
                          <div className="aspect-square bg-gray-100 rounded-lg mb-1">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <h3 className="text-[10px] text-gray-700 group-hover:text-red-600 truncate">
                            {product.name}
                          </h3>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 min-w-0 mx-1">
              <div className="relative max-w-[1200px]">
                <SearchBar
                  setHoveringState={setSearchHovering}
                  handleOverlay={handleOverlay}
                  handleOverlayClose={handleOverlayClose}
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center flex-shrink-0">
              {token ? (
                <div
                  className="register-container relative"
                  onMouseEnter={handleAccountMouseEnter}
                  onMouseLeave={handleAccountMouseLeave}>
                  <NavButton>
                    <Avatar className="w-7 h-7 mr-1 " color="black">
                      {userImage ? (
                        <AvatarImage
                          src={userImage}
                          alt={user?.name?.firstname || "User"}
                        />
                      ) : (
                        <AvatarFallback className="bg-blue-800 text-primary-foreground">
                          {user?.name?.firstname
                            ? user?.name?.lastname.charAt(0).toUpperCase()
                            : "U"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    Account & Orders
                  </NavButton>

                  <div
                    className="register-dropdown"
                    onMouseEnter={handleAccountMouseEnter}
                    onMouseLeave={handleAccountMouseLeave}>
                    {/* Invisible bridge to prevent dropdown closing */}
                    <div className="dropdown-bridge"></div>

                    <div className="p-4 w-full space-y-5">
                      <Link
                        to="/user/profile"
                        className="flex items-center gap-2 text-[#222] transition-colors">
                        <User size={16} /> My Account
                      </Link>

                      <Link
                        to="/user/orders"
                        className="flex items-center gap-2 text-[#222] transition-colors">
                        <ShoppingBag size={16} /> My Orders
                      </Link>

                      <Link
                        to="/wishlist"
                        className="flex items-center gap-2 text-[#222] transition-colors">
                        <Heart size={16} /> Wish List
                      </Link>

                      <Link
                        to="/user/browsing-history"
                        className="flex items-center gap-2 text-[#222] transition-colors">
                        <Clock size={16} /> Browsing History
                      </Link>

                      <div className="pt-3 border-t mt-1">
                        <Button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-center gap-2"
                          variant="outline">
                          <LogOut size={16} /> Sign Out
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="register-container relative"
                  onMouseEnter={handleAccountMouseEnter}
                  onMouseLeave={handleAccountMouseLeave}>
                  <NavButton>Sign in / Register</NavButton>

                  <div
                    className="register-dropdown flex"
                    onMouseEnter={handleAccountMouseEnter}
                    onMouseLeave={handleAccountMouseLeave}>
                    {/* Invisible bridge to prevent dropdown closing */}
                    <div className="dropdown-bridge"></div>

                    <div className="p-[13px] w-full space-y-2 ">
                      <div>
                        <Link to="/auth/login" className="w-full mb-3">
                          <Button className="w-full">Sign in</Button>
                        </Link>
                      </div>
                      <div>
                        <Link to="/auth/register" className="w-full">
                          <Button className="w-full" variant="outline">
                            Register
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Link to="/help-support">
                <NavButton>Help & Support</NavButton>
              </Link>

              <div onClick={() => setIsLanguageModalOpen(true)}>
                <NavButton>
                  <img
                    src={flagSrc}
                    alt=""
                    className="rounded-full h-5 w-5 mr-0.5"
                  />
                  {selectedCurrency}
                </NavButton>
              </div>

              <Link to="cart">
                <NavButton>
                  <div className="flex items-center">
                    <ShoppingCart className="h-5 w-5" />
                    <div>
                      <h6 className="border px-2 py-0 leading-3 font-bold text-[10px] bg-white text-black rounded-full">
                        {cartItems?.length}
                      </h6>
                      <h6 className="text-[10px]">Cart</h6>
                    </div>
                  </div>
                </NavButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopLayout;
