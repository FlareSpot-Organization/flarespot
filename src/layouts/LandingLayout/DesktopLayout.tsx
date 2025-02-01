import { NavButton } from "@/components/common/NavButton";
import { demoCategoriesHeader, demoProductsHeader } from "@/utils/Content";
import {
  Award,
  ChevronDown,
  MessageCircle,
  Percent,
  Search,
  ShoppingCart,
  User,
  Warehouse,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import chinaFlag from "@/assets/images/china-flag.png";
import { useHeader } from "@/contexts/LandingHeaderLayouts";
import SearchBar from "@/components/common/Searchbar";
import { useSelector } from "react-redux";

const DesktopLayout = () => {
  const {
    hoveredCategory,
    setHoveredCategory,
    handleOverlay,
    handleOverlayClose,
  } = useHeader();

  const cartItems = useSelector((state: any) => state.cart.items);

  return (
    <>
      <div className="hidden lg:block px-4 py-2 relative z-30">
        <div className="flex items-center justify-between gap-2  w-full  mx-auto">
          {/* Left Side */}
          <div className="flex items-center flex-shrink-0">
            <div className="mr-2">
              <Link to="/">
                {" "}
                <img src={logo} alt="Logo" className="h-8" />
              </Link>
            </div>

            <NavButton>
              <Award className="w-3 h-3 mr-0.5" />
              5-Star Rated
            </NavButton>

            <NavButton>
              <Percent className="w-3 h-3 mr-0.5" />
              Mega Sale
            </NavButton>

            {/* <NavButton>
              <Warehouse className="w-3 h-3 mr-0.5" />
              Local Warehouse
            </NavButton> */}

            <div
              className="dropdown-container relative"
              onMouseEnter={handleOverlay}
              onMouseLeave={handleOverlayClose}>
              <NavButton>
                <span className="flex items-center">
                  Categories
                  <ChevronDown className="w-3 h-3 mr-0.5 ml-1 chevron-rotate" />
                </span>
              </NavButton>

              <div className="mega-dropdown flex">
                <div className="w-1/4 border-r border-gray-100 categories-scroll">
                  {demoCategoriesHeader.map((category) => (
                    <div
                      key={category}
                      onMouseEnter={() => setHoveredCategory(category)}
                      className={`px-4 py-1 cursor-pointer ${
                        hoveredCategory === category
                          ? "bg-gray-50 text-red-600"
                          : "text-gray-700"
                      }`}>
                      <span className="text-[12px] font-medium">
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
              <SearchBar />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center flex-shrink-0">
            <div
              className="register-container relative"
              onMouseEnter={handleOverlay}
              onMouseLeave={handleOverlayClose}>
              <NavButton>
                <User className="h-4 w-4 mr-0.5" />
                <div>
                  <span className="text-[12px]">Sign in / Register</span>
                </div>
              </NavButton>

              <div className="register-dropdown flex">
                <div className="p-2 w-full">
                  <Link to="/auth/login" className="w-full">
                    <button className="w-full py-1.5 px-4 text-[12px] bg-gray-900 dark:bg-gray-800 text-white rounded-sm hover:bg-gray-800 transition-colors duration-200 font-medium">
                      Sign in
                    </button>
                  </Link>
                  <div className="mt-3 text-center">
                    <a
                      href="/auth/login"
                      className="block mt-2 text-sm text-gray-900 dark:text-gray-100 hover:text-purple-600 transition-colors duration-200 font-medium">
                      Register
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <NavButton>
              <MessageCircle className="h-4 w-4 mr-0.5" />
              <span className="text-[12px]">Support</span>
            </NavButton>

            <NavButton>
              <img
                src={chinaFlag}
                alt=""
                className="rounded-full h-4 w-4 mr-0.5"
              />
              <span className="text-[12px]">EN</span>
            </NavButton>

            <Link to="cart">
              <NavButton>
                <div className="flex items-center">
                  <ShoppingCart className="h-4 w-4" />
                  <div>
                    <h6 className="border px-2 py-0 text-[8px] bg-white text-black rounded-full">
                      {cartItems?.length}
                    </h6>
                    <h6 className="font-bold text-[8px]">Cart</h6>
                  </div>
                </div>
              </NavButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopLayout;
