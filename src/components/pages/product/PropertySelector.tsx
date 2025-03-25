import React, { useMemo } from "react";
import { AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cleanImageUrl, getAvailableOptions } from "@/utils/helpers";
import { Sku, SkuProp } from "@/types/product_types";

interface SelectedProperty {
  pid: number;
  vid: number;
}

interface SelectedProperties {
  [key: string]: SelectedProperty;
}

const PropertySelector = ({
  property,
  selectedValues,
  base,
  allProps,
  onPropertySelect,
  onImageClick,
}: {
  property: SkuProp;
  selectedValues: Record<string, { pid: number; vid: number }>;
  base: Sku[];
  allProps: SkuProp[];
  onPropertySelect: (propertyName: string, value: any) => void;
  onImageClick: (imageUrl: string) => void;
}) => {
  const isColorProperty = property.name.toLowerCase().includes("color");

  const availableOptions = getAvailableOptions(
    base,
    allProps,
    selectedValues,
    property.pid
  );

  const isValueAvailable = (value: any) => {
    return availableOptions.has(value.vid);
  };

  const handlePropertySelect = (propertyName: string, value: any) => {
    if (selectedValues[propertyName]?.vid === value.vid) {
      onPropertySelect(propertyName, null);
      if (isColorProperty) {
        onImageClick("");
      }
    } else {
      onPropertySelect(propertyName, {
        ...value,
        pid: property.pid,
      });
      if (isColorProperty && value.image) {
        onImageClick(value.image);
      }
    }
  };

  const CustomTooltipContent = ({ optionName }: { optionName: string }) => (
    <div className="px-4 py-3 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-xl border border-gray-700/50 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-gray-100">
        <AlertCircle className="w-4 h-4 text-amber-400" />
        <p className="font-medium text-sm">Unavailable Option</p>
      </div>
      <p className="text-xs text-gray-300 mt-1 max-w-[200px]">
        {`"${optionName}" cannot be selected with your current choices. Try adjusting other options first.`}
      </p>
    </div>
  );

  const renderOption = (value: any, index: number) => {
    const isAvailable = isValueAvailable(value);
    const isSelected = selectedValues[property.name]?.vid === value.vid;

    const content =
      isColorProperty && value.image ? (
        <div
          className={`relative group ${!isAvailable ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => {
            if (isAvailable) {
              handlePropertySelect(property.name, value);
            }
          }}>
          <div
            className={`
    image-option-container 
    image-option-outer 
    image-option-inner
    ${isSelected ? "image-option-selected" : ""}
  `}>
            <img
              src={`${value.image}_50x50.png`}
              data-src={cleanImageUrl(`${value.image}_.webp`)}
              referrerPolicy="no-referrer"
              alt={value.name}
              className="image-option-img"
            />

            {isSelected && (
              <>
                <div className="image-option-overlay"></div>
                <div className="image-option-checkmark">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 12"
                    className="image-option-check mt-1 ml-1"
                    fill="white">
                    <path d="M5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c.3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path>
                  </svg>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="relative">
          <button
            disabled={!isAvailable}
            onClick={() =>
              isAvailable && handlePropertySelect(property.name, value)
            }
            className={`text-sku ${
              isSelected ? "selected-sku" : ""
            } transition-all duration-300 rounded-full px-[15px] py-[5px] box-border
  ${!isAvailable ? "text-[#ddd] bg-gray-100 border-dashed cursor-not-allowed" : ""}`}>
            <p className="text-[14px] text-[#222] font-[400] leading-[20px]">
              {value.name}
            </p>
          </button>
        </div>
      );

    return !isAvailable ? (
      <TooltipProvider key={index}>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={5}
            className="animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2">
            <CustomTooltipContent optionName={value.name} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      <React.Fragment key={index}>{content}</React.Fragment>
    );
  };

  return (
    <div className="mt-5">
      <h3 className="text-[14px] font-[600] text-[#222] leading-[18px]">
        {property.name}:{" "}
        <span className="font-[400]">
          {selectedValues[property.name]?.vid
            ? property.values?.find(
                (v) => v.vid === selectedValues[property.name]?.vid
              )?.name
            : ""}
        </span>
      </h3>
      <div className="flex flex-wrap gap-2 mt-1 items-center">
        {property.values?.map((value, index) => renderOption(value, index))}
      </div>
    </div>
  );
};

export default PropertySelector;
