import React from "react";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";
import TopNavbar from "./TopNavbar";

const Header: React.FC = () => {
  return (
    <>
      <TopNavbar />
      <div className="w-full sticky top-0 z-40">
        <div className="bg-gray-900 text-white sticky top-0 z-30">
          {/* Mobile Header */}
          <MobileLayout />

          <DesktopLayout />
        </div>
      </div>
    </>
  );
};

export default Header;
