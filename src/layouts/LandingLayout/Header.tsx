import React from "react";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";
import TopNavbar from "./TopNavbar";

const Header: React.FC = () => {
  return (
    <div className="w-full">
      <TopNavbar />
      <div className="bg-gray-900  text-white">
        {/* Mobile Header */}
        <MobileLayout />

        <DesktopLayout />
      </div>
    </div>
  );
};

export default Header;
