import logo from "@/assets/images/logo.png";
import chinaFlag from "@/assets/images/china-flag.png";
import { NavButton } from "@/components/common/NavButton";
import useLandingHeader2 from "@/hooks/useLandingHeader2";
import { demoCategoriesHeader } from "@/utils/Content";
import {
  Award,
  Menu,
  MessageCircle,
  Percent,
  Search,
  ShoppingCart,
  User,
  Warehouse,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useHeader } from "@/contexts/LandingHeaderLayouts";

const MobileLayout = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isSearchOpen,
    setIsSearchOpen,
  } = useHeader();

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between px-4 h-16">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 hover:bg-gray-800 rounded-lg">
          <Menu className="h-6 w-6" />
        </button>
        <img src={logo} alt="Logo" className="h-8" />
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg">
            <Search className="h-6 w-6" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-lg">
            <ShoppingCart className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div
        className={`overflow-hidden transition-all duration-300 ${isSearchOpen ? "h-16" : "h-0"}`}>
        <div className="px-4 py-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products"
              className="w-full px-4 py-2 rounded-lg text-gray-800 text-sm"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 mobile-nav-overlay">
          <div
            className={`fixed inset-y-0 left-0 w-full max-w-sm bg-gray-900 shadow-lg mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
              <img src={logo} alt="Logo" className="h-8" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-800 rounded-lg">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="h-[calc(100%-4rem)] overflow-y-auto pb-20">
              <div className="p-4 border-b border-gray-800">
                <Link to="/auth/login" className="flex items-center space-x-3">
                  <User className="h-5 w-5" />
                  <span className="text-base">Sign in / Register</span>
                </Link>
              </div>

              <div className="p-4 space-y-4">
                <NavButton className="hover:bg-gray-800">
                  <Award className="w-5 h-5 mr-3" />
                  5-Star Rated
                </NavButton>
                <NavButton className="hover:bg-gray-800">
                  <Percent className="w-5 h-5 mr-3" />
                  Mega Sale
                </NavButton>
                <NavButton className="hover:bg-gray-800">
                  <Warehouse className="w-5 h-5 mr-3" />
                  Local Warehouse
                </NavButton>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {demoCategoriesHeader?.map((category) => (
                    <div
                      key={category}
                      className="px-4 py-2 hover:bg-gray-800 rounded-lg cursor-pointer">
                      <span className="text-sm">{category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 max-w-sm">
              <div className="flex justify-between">
                <NavButton className="hover:bg-gray-800">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Support
                </NavButton>
                <NavButton className="hover:bg-gray-800">
                  <img
                    src={chinaFlag}
                    alt=""
                    className="rounded-full h-5 w-5 mr-2"
                  />
                  EN
                </NavButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileLayout;
