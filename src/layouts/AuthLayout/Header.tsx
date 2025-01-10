import logo from "@/assets/images/logo.png";
import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <>
      <div className="w-full bg-gray-900 text-white  z-40 sticky top-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between sm:h-12 h-16">
            {/* Logo */}
            <div>
              <Link to="/">
                <img src={logo} alt="Flarespot" className="w-[70%]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
