import React, { useState, useRef, useEffect } from "react";
import { Camera, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const SearchBar = ({
  setIsMobileMenuOpen,
  handleOverlay,
  handleOverlayClose,
  setHoveringState,
}: {
  setIsMobileMenuOpen?: any;
  handleOverlay?: () => void;
  handleOverlayClose?: () => void;
  setHoveringState?: (isHovering: boolean) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showImageSearch, setShowImageSearch] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleImageUrlChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}&page=1`);
    }
  };

  const handleSearchButtonClick = (): void => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}&page=1`);
    }
  };

  const handleImageSearch = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    if (imageUrl.trim()) {
      window.open(`/image-search?q=${encodeURIComponent(imageUrl)}&page=1`);
    }
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        console.log("Image pasted:", blob);
      }
    }
  };

  // Toggle the dropdown on camera icon click
  const handleCameraClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowImageSearch(!showImageSearch);

    // Notify parent about state change
    if (setHoveringState) setHoveringState(!showImageSearch);
    if (showImageSearch) {
      if (handleOverlayClose) handleOverlayClose();
    } else {
      if (handleOverlay) handleOverlay();
    }
  };

  // Modified click handler to close when clicking outside the entire search bar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowImageSearch(false);

        // Notify parent about hovering state
        if (setHoveringState) setHoveringState(false);
        if (handleOverlayClose) handleOverlayClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleOverlayClose, setHoveringState]);

  return (
    <div className="relative w-full" ref={searchBarRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative flex-1 p-[1px] bg-white rounded-full overflow-hidden flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for..."
            className="w-full px-6 text-gray-700 outline-none"
          />
          <div className="flex items-center space-x-2">
            <div
              ref={dropdownContainerRef}
              className="relative"
              onClick={handleCameraClick}>
              <Camera className="h-6 w-6 text-gray-600 cursor-pointer" />
            </div>

            <button
              type="button"
              onClick={handleSearchButtonClick}
              aria-label="Search"
              className="h-[2.15rem] w-14 rounded-full bg-gray-900 flex items-center justify-center hover:bg-black transition-colors">
              <Search className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </form>
      {showImageSearch && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: "0px",
            width: "100%",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 16px rgba(0, 0, 0, 0.12)",
            border: "1px solid #eaeaea",
            marginTop: "10px",
            zIndex: 1000,
            opacity: 1,
            visibility: "visible",
          }}
          onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up
        >
          {/* Triangle pointer */}
          <div
            style={{
              position: "absolute",
              top: "-6px",
              right: "63px",
              width: "12px",
              height: "12px",
              backgroundColor: "white",
              transform: "rotate(45deg)",
              borderTop: "1px solid rgba(0, 0, 0, 0.1)",
              borderLeft: "1px solid rgba(0, 0, 0, 0.1)",
            }}></div>

          <div className="relative z-10 p-4">
            <h5 className="font-medium text-sm text-[#222] mb-2">
              Search by image
            </h5>
            <p className="text-xs text-gray-500 mb-3">
              Find what you love with better prices on AliExpress by using an
              image search
            </p>

            <div className="p-2 border border-dashed rounded-md mb-3 bg-gray-50 flex items-center justify-center">
              <p className="text-xs text-gray-500 text-center py-6">
                Drag an image here
                <br />
                or
              </p>
            </div>

            <div className="mb-3">
              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-md text-sm"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click bubbling
                  document.getElementById("fileInput")?.click();
                }}>
                Upload a photo
              </button>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="mb-3">
              <p className="text-xs text-gray-700 mb-1">Or paste image URL:</p>
              <input
                type="text"
                value={imageUrl}
                onChange={handleImageUrlChange}
                onPaste={handlePaste}
                placeholder="https://example.com/image.jpg"
                className="w-full p-2 border rounded-md text-xs text-[#222]"
                onClick={(e) => e.stopPropagation()} // Prevent click bubbling
              />
            </div>

            <div>
              <Button
                className="w-full bg-gray-800 hover:bg-black text-white rounded-md text-xs"
                onClick={handleImageSearch}>
                Search
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              *For a quick search hit CTRL+V to paste an image into the search
              box
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
