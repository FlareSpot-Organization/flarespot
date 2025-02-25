import React from "react";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";
import TopNavbar from "./TopNavbar";

const Header: React.FC = () => {
  return (
    <>
      <div className="w-full sticky top-0 z-40">
        <div className="bg-[#131920] text-white sticky top-0 z-30">
          {/* Mobile Header */}
          <MobileLayout />

          <DesktopLayout />
        </div>
      </div>
    </>
  );
};

export default Header;
