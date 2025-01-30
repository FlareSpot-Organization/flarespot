// contexts/HeaderContext.tsx
import React, { createContext, useContext, useState } from "react";

interface HeaderContextType {
  hoveredCategory: string | null;
  setHoveredCategory: (category: string | null) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  overlay: boolean;
  setOverLay: (overlay: boolean) => void;
  handleOverlay: () => void;
  handleOverlayClose: () => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [overlay, setOverLay] = useState(false);

  const handleOverlay = () => {
    setOverLay(true);
  };

  const handleOverlayClose = () => {
    setOverLay(false);
  };

  return (
    <HeaderContext.Provider
      value={{
        hoveredCategory,
        setHoveredCategory,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isSearchOpen,
        setIsSearchOpen,
        overlay,
        setOverLay,
        handleOverlay,
        handleOverlayClose,
      }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
};
