import { useState, useEffect, useRef, RefObject } from "react";

interface UseProductPageStickyScrollReturn {
  isSticky: boolean;
  productInfoRef: RefObject<HTMLDivElement>;
  interestsRef: RefObject<HTMLDivElement>;
  productInfoContainerRef: RefObject<HTMLDivElement>;
}

/**
 * Hook for managing sticky behavior of product info on scroll
 * @returns Object containing refs and isSticky state
 */
const useProductPageStickyScroll = (): UseProductPageStickyScrollReturn => {
  const [isSticky, setIsSticky] = useState<boolean>(true);
  const productInfoRef = useRef<HTMLDivElement>(null);
  const interestsRef = useRef<HTMLDivElement>(null);
  const productInfoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (): void => {
      if (
        !interestsRef.current ||
        !productInfoRef.current ||
        !productInfoContainerRef.current
      )
        return;

      // Get the interests section position
      const interestsRect = interestsRef.current.getBoundingClientRect();

      // Get product info height
      const productInfoRect = productInfoRef.current.getBoundingClientRect();
      const productInfoHeight = productInfoRect.height;

      // Get the viewport height
      const viewportHeight = window.innerHeight;

      // Calculate when to stop sticky behavior:
      // Only disable sticky when the interests section is well within the viewport
      // and the bottom of the product info would extend beyond the interests section
      const interestsSectionVisible = interestsRect.top < viewportHeight - 750;
      const productInfoWouldOverlap = interestsRect.top < productInfoHeight;

      // We want to keep the sticky behavior until we're very close to the interests section
      const shouldStopSticky =
        interestsSectionVisible && productInfoWouldOverlap;

      setIsSticky(!shouldStopSticky);
    };

    window.addEventListener("scroll", handleScroll);

    // Run immediately to set initial state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    isSticky,
    productInfoRef,
    interestsRef,
    productInfoContainerRef,
  };
};

export default useProductPageStickyScroll;
