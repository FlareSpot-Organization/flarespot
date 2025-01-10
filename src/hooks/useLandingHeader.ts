import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const useLandingHeader = () => {
  const [showSignInDropdown, setShowSignInDropdown] = useState<boolean>(false);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showMegaMenu, setShowMegaMenu] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [showMobileCategories, setShowMobileCategories] =
    useState<boolean>(false);
  const [selectedMobileCategory, setSelectedMobileCategory] =
    useState<string>("");
  const [showMobileCategoryItems, setShowMobileCategoryItems] =
    useState<boolean>(false);

  // Refs for hover detection
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const categoryButtonRef = useRef<HTMLDivElement>(null);

  // Timer for hover delay
  const hoverTimeout = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    setShowMegaMenu(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      // Only hide if mouse isn't over either element
      if (
        !megaMenuRef.current?.matches(":hover") &&
        !categoryButtonRef.current?.matches(":hover")
      ) {
        setShowMegaMenu(false);
      }
    }, 100); // 300ms delay before hiding
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".auth-dropdown") &&
        !target.closest(".auth-trigger") &&
        !target.closest(".mobile-menu")
      ) {
        setShowSignInDropdown(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const commonButtonClasses = `
      flex items-center space-x-1 px-3 py-2 rounded-full
      transition-all duration-400 ease-in-out
      hover:bg-white hover:bg-opacity-10
      border border-transparent
      hover:border-white hover:border-opacity-20
      text-[15px]
    `;

  const handleCategoryClick = (category: string) => {
    setSelectedMobileCategory(category);
    setShowMobileCategoryItems(true);
  };

  const handleBackToCategories = () => {
    setShowMobileCategoryItems(false);
    setSelectedMobileCategory("");
  };

  const handleBackToMenu = () => {
    setShowMobileCategories(false);
    setShowMobileCategoryItems(false);
    setSelectedMobileCategory("");
  };

  return {
    showSignInDropdown,
    setShowSignInDropdown,
    selectedCategory,
    setSelectedCategory,
    showMegaMenu,
    setShowMegaMenu,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    showMobileCategories,
    setShowMobileCategories,
    selectedMobileCategory,
    setSelectedMobileCategory,
    showMobileCategoryItems,
    setShowMobileCategoryItems,
    megaMenuRef,
    categoryButtonRef,
    handleMouseEnter,
    handleMouseLeave,
    commonButtonClasses,
    handleCategoryClick,
    handleBackToCategories,
    handleBackToMenu,
  };
};

export default useLandingHeader;
