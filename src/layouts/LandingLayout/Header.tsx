import React from "react";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

const Header: React.FC = () => {
  return (
    <div className="w-full">
      <div className="bg-gray-900 text-white">
        {/* Mobile Header */}
        <MobileLayout />

        {/* Desktop Header - Keeping original implementation exactly as is */}
        <DesktopLayout />
      </div>
    </div>
  );
};

export default Header;
