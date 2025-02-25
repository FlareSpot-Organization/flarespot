import React, { useMemo } from "react";
import { Check, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cleanImageUrl, getAvailableOptions } from "@/utils/helpers";
import { Sku, SkuProp } from "@/types/product_types";

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

  const availableOptions = useMemo(() => {
    return getAvailableOptions(base, allProps, selectedValues, property.pid);
  }, [base, allProps, selectedValues, property.pid]);

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
            className={`${selectedValues[property.name]?.vid === value.vid ? "border-2 border-gray-900" : "border-2 border-transparent"} relative overflow-hidden
                     bg-[#e6e6e6] 
                     transition-all duration-300 color-image border-2 hover:border-gray-900`}>
            <img
              src={`${value.image}_60x60.png`}
              data-src={cleanImageUrl(`${value.image}_.webp`)}
              referrerPolicy="no-referrer"
              alt={value.name}
              className={`w-[60px] h-[60px] mix-blend-multiply object-cover ${selectedValues[property.name]?.vid === value.vid ? "border-[0.5px] border-solid border-white" : ""}`}
            />
            {selectedValues[property.name]?.vid === value.vid && (
              <div className="absolute inset-0 bg-black/20">
                <div
                  className="absolute bottom-0 right-0 bg-black p-0.5"
                  style={{
                    clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 0% 90%)",
                  }}>
                  <Check className="text-white font-bold w-2 h-2 mt-1 ml-2" />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          disabled={!isAvailable}
          onClick={() =>
            isAvailable && handlePropertySelect(property.name, value)
          }
          className={`${
            selectedValues[property.name]?.vid === value.vid
              ? "border-gray-800"
              : "border-gray-300"
          } border transition-all duration-300 rounded-full px-[15px] py-[5px] hover:border hover:border-gray-900
        ${!isAvailable ? "text-[#ddd] bg-gray-100 border-dashed cursor-not-allowed" : ""}`}>
          <p className="text-[14px]">{value.name}</p>
        </button>
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
      <h3 className="text-[14px] font-bold">
        {property.name}:{" "}
        <span className="font-light">
          {selectedValues[property.name]?.vid
            ? property.values?.find(
                (v) => v.vid === selectedValues[property.name]?.vid
              )?.name
            : ""}
        </span>
      </h3>
      <div className="flex flex-wrap gap-2 mt-3 items-center">
        {property.values?.map((value, index) => renderOption(value, index))}
      </div>
    </div>
  );
};

export default PropertySelector;
