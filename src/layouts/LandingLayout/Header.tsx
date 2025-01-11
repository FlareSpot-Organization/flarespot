import logo from "@/assets/images/logo.png";
import SearchBar from "@/components/common/Searchbar";
import useLandingHeader from "@/hooks/useLandingHeader";
import { GetUser, LogoutUser } from "@/services/features/auth/authSlice";
import { AppDispatch } from "@/store";
import { categoryData, mainCategories } from "@/utils/Content";
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  LogOut,
  Menu,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    showSignInDropdown,
    selectedCategory,
    setSelectedCategory,
    showMegaMenu,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    showMobileCategories,
    setShowMobileCategories,
    selectedMobileCategory,
    showMobileCategoryItems,
    megaMenuRef,
    categoryButtonRef,
    handleMouseEnter,
    handleMouseLeave,
    commonButtonClasses,
    handleCategoryClick,
    handleBackToCategories,
    handleBackToMenu,
  } = useLandingHeader();

  const { user, token } = useSelector((state: any) => state.auth);
  const cartItems = useSelector((state: any) => state.cart.items);

  useEffect(() => {
    if (token) {
      dispatch(GetUser());
    }
  }, []);

  const UserProfileButton = () => (
    <div className="relative group">
      <button className={`${commonButtonClasses} flex items-center space-x-2`}>
        <User size={16} />
        <span>{user?.name?.firstname}</span>
        <ChevronDown size={16} />
      </button>

      <div
        className="invisible group-hover:visible opacity-0 group-hover:opacity-100
        absolute left-1/2 transform -translate-x-1/2  
        w-64 bg-white dark:bg-gray-900 rounded-md shadow-lg
        transition-all duration-200 ease-out z-40">
        <div className="p-4">
          <div className="text-gray-900 mb-4">
            <p className="font-medium">{`${user?.name?.firstname} ${user?.name?.lastname}`}</p>
            <p className="text-sm text-gray-600 dark:text-gray-100">
              {user?.email}
            </p>
          </div>
          <button
            className="w-full py-3 px-4 bg-gray-900 dark:bg-gray-800 text-white rounded-md 
            hover:bg-gray-800 transition-colors duration-200
            font-medium">
            View Profile
          </button>
          <div className="mt-3 text-center">
            <a
              href="#"
              onClick={() => dispatch(LogoutUser())}
              className="block mt-2 text-sm text-gray-900 dark:text-gray-100 hover:text-purple-600
              transition-colors duration-200 font-medium">
              Sign Out
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const SignInButton = () => (
    <div className="relative group">
      <button className={commonButtonClasses}>Sign in / Register</button>

      <div
        className="invisible group-hover:visible opacity-0 group-hover:opacity-100
        absolute left-1/2 transform -translate-x-1/2 
        w-64 bg-white dark:bg-gray-900 rounded-md shadow-lg
        transition-all duration-200 ease-out z-50">
        <div className="p-4 mt-5">
          <Link to="/auth/login">
            <button
              className="w-full py-3 px-4 bg-gray-900 dark:bg-gray-800  text-white rounded-md 
            hover:bg-gray-800 transition-colors duration-200
            font-medium">
              Sign in
            </button>
          </Link>
          <div className="mt-3 text-center">
            <a
              href="/auth/login"
              className="block mt-2 text-sm text-gray-900 dark:text-gray-100 hover:text-purple-600
              transition-colors duration-200 font-medium">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Overlay */}
      {(showSignInDropdown || showMegaMenu) && (
        <div className="absolute w-full inset-0 h-screen bg-black bg-opacity-50 z-40 transition-opacity duration-300" />
      )}

      <div className="w-full bg-gray-900 text-white z-40 sticky top-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between sm:h-12 h-16">
            {/* Logo */}
            <Link to="/">
              <div>
                <img src={logo} alt="Flarespot" className="w-[70%]" />
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex space-x-4 items-center">
              <div className="flex items-center">
                <button
                  className={`${commonButtonClasses} w-full justify-center`}>
                  EN
                </button>
                <Link to="cart">
                  <div className="flex justify-center">
                    <div className="relative cursor-pointer">
                      <ShoppingCart className="h-6 w-6" />
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems?.length}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              <button
                className="text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-2 items-center w-[90%] justify-end">
              <div
                ref={categoryButtonRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <button className={commonButtonClasses}>
                  <span>Categories</span>
                  {showMegaMenu ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              </div>
              <div className="w-[45%]">
                <SearchBar />
              </div>

              <div className="flex items-center space-x-1">
                {user ? <UserProfileButton /> : <SignInButton />}
                <button className={commonButtonClasses}>Help & Support</button>
                <button className={commonButtonClasses}>EN</button>

                <Link to="cart">
                  <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
                    <ShoppingCart className="h-6 w-6" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems?.length}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu - Full Screen */}
          <div
            className={`lg:hidden fixed inset-0 bg-gray-900 transform ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out z-50 mobile-menu`}>
            {/* Close button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white hover:bg-opacity-10 rounded-full">
              <X size={24} />
            </button>

            {showMobileCategories ? (
              <div className="h-full">
                <div className="p-4 border-b border-gray-800">
                  <button
                    onClick={handleBackToMenu}
                    className="flex items-center text-white">
                    <ChevronLeft size={24} />
                    <span className="ml-2">Back to Menu</span>
                  </button>
                </div>
                {showMobileCategoryItems ? (
                  <div className="p-4">
                    <button
                      onClick={handleBackToCategories}
                      className="flex items-center text-white mb-4">
                      <ChevronLeft size={24} />
                      <span className="ml-2">Back to Categories</span>
                    </button>
                    <h2 className="text-xl mb-4">{selectedMobileCategory}</h2>
                    <div className="space-y-4 overflow-y-scroll h-screen">
                      {Object.entries(
                        categoryData[selectedMobileCategory] || {}
                      ).map(([subCategory, items]) => (
                        <div key={subCategory}>
                          <h3 className="text-lg font-medium mb-2">
                            {subCategory}
                          </h3>
                          <div className="space-y-2">
                            {items.map((item) => (
                              <a
                                key={item}
                                href="#"
                                className="block text-gray-300 hover:text-white py-1 pl-4">
                                {item}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    <h2 className="text-xl mb-4">Categories</h2>
                    <div className="space-y-4">
                      {mainCategories.map((category) => (
                        <button
                          key={category}
                          onMouseEnter={() => handleCategoryClick(category)}
                          className="w-full text-left text-gray-300 hover:text-white py-2 flex items-center justify-between">
                          <span>{category}</span>
                          <ChevronDown
                            size={16}
                            className="transform -rotate-90"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 pt-16 space-y-4">
                <div className="space-y-2">
                  <SearchBar setIsMobileMenuOpen={setIsMobileMenuOpen} />
                  <button
                    onClick={() => setShowMobileCategories(true)}
                    className={`${commonButtonClasses} w-full justify-between`}>
                    <span>Categories</span>
                    <ChevronDown size={16} />
                  </button>

                  {user ? (
                    <div className="space-y-2">
                      <div className="bg-gray-800 rounded-md p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <User size={20} />
                          <div>
                            <p className="font-medium">{`${user?.name?.firstname} ${user?.name?.lastname}`}</p>
                            <p className="text-sm text-gray-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <button
                          className="w-full py-2 px-4 bg-gray-900 text-white rounded-md 
                          hover:bg-gray-700 transition-colors duration-200 mt-2
                          font-medium flex items-center justify-center space-x-2">
                          <span>View Profile</span>
                        </button>
                      </div>
                      <button
                        onClick={() => dispatch(LogoutUser())}
                        className={`${commonButtonClasses} w-full justify-center flex items-center space-x-2`}>
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <Link to="/auth/login">
                      <button
                        className={`${commonButtonClasses} w-full justify-center`}>
                        Sign in / Register
                      </button>
                    </Link>
                  )}

                  <button
                    className={`${commonButtonClasses} w-full justify-center`}>
                    Help & Support
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mega Menu */}
          <div
            ref={megaMenuRef}
            className={`
              absolute left-0 w-full bg-white dark:bg-gray-900 shadow-lg z-40 
              transition-all duration-200 
              ${showMegaMenu ? "opacity-100 visible" : "opacity-0 invisible"}
            `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <div className="max-w-7xl mx-auto grid grid-cols-5 gap-8 p-6">
              <div className="col-span-1 border-r border-gray-200">
                {mainCategories.map((category) => (
                  <div
                    key={category}
                    className="relative group"
                    onMouseEnter={() => setSelectedCategory(category)}>
                    <button
                      className={`w-full text-left px-4 py-2 text-sm ${
                        selectedCategory === category
                          ? "text-purple-600 bg-gray-100"
                          : "text-gray-600 dark:text-gray-100 hover:text-purple-600 hover:bg-gray-50"
                      }`}>
                      {category}
                    </button>
                  </div>
                ))}
              </div>

              <div className="col-span-4">
                {selectedCategory === "Sports & Outdoors" && (
                  <div className="grid grid-cols-4 gap-8">
                    {Object.entries(categoryData["Sports & Outdoors"]).map(
                      ([category, items]) => (
                        <div key={category}>
                          <h3 className="font-medium text-gray-900 mb-2">
                            {category}
                          </h3>
                          <ul className="space-y-2">
                            {items.map((item) => (
                              <li key={item}>
                                <a
                                  href="#"
                                  className="text-sm text-gray-600 dark:text-gray-100 hover:text-purple-600">
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
