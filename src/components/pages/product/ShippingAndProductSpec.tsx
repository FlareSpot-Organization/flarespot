import { ChevronRight } from "lucide-react";
import React from "react";

const ShippingAndProductSpec = ({ singleProduct }: { singleProduct: any }) => {
  return (
    <div>
      {/* Shipping and Return Section */}
      <div className="space-y-1 mt-6">
        <h3 className="text-[18px] text-[#222] h-[20px] font-[600] leading-[16px]">
          Shipping and Return
        </h3>
        <div className="space-y-2">
          <div className="group  rounded-lg transition-all duration-200 cursor-pointer">
            <div className="flex items-center ">
              <div className="flex items-center space-x-2">
                <div className=" rounded-lg">
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    aria-hidden="true">
                    <path d="M686.1 148.5c59.4 0 107.5 48.1 107.5 107.5l-0.1 20.4 147.9 58.5c43.7 17.3 72.4 59.5 72.4 106.5l0 214.4c0 49.7-33.7 91.5-79.5 103.8 0.9 2.6 1.3 5.5 1.3 8.4 0 63.7-51.2 115.5-114.5 115.5-63.3 0-114.5-51.8-114.5-115.5 0-1.7 0.1-3.5 0.4-5.1l-295.9 0c0.3 1.7 0.4 3.4 0.4 5.1 0 63.7-51.2 115.5-114.5 115.5-63.3 0-114.5-51.8-114.5-115.5 0-2 0.2-3.9 0.5-5.8-53.9-5.6-96-51.3-96-106.8l0-52.6c0-17 13.8-30.7 30.8-30.8 17 0 30.7 13.8 30.7 30.8l0 52.6c0 25.4 20.6 46.1 46.1 46l537.5 0 0.1-445.4c0-23.5-17.6-42.9-40.3-45.7l-5.8-0.4-491.5 0c-25.4 0-46.1 20.6-46.1 46.1l-0.1 56.2 180.8 0.1c15.3 0 27.9 11.1 30.3 25.7l0.4 5c0 17-13.8 30.7-30.7 30.7l-211.4 0c-17 0-30.7-13.8-30.8-30.7l0-87c0-59.4 48.1-107.5 107.6-107.5l491.5 0z m-335.6 614.4l-107 0c0.3 1.7 0.4 3.4 0.4 5.1 0 29.9 23.8 54.1 53.1 54.1 29.2 0 53.1-24.1 53.1-54.1 0-1.7 0.1-3.4 0.4-5.1z m524 0.3l-106.9 0 0.4 4.8c0 29.9 23.8 54.1 53.1 54.1 29.2 0 53.1-24.1 53-54.1l0.4-4.8z m-81-420.7l0 359.3 112.7 0c23.5 0 42.9-17.6 45.8-40.3l0.3-5.7 0-214.4c0-21.8-13.3-41.3-33.5-49.4l-125.3-49.5z m-614.3 102.9c17 0 30.7 13.8 30.7 30.8 0 17-13.8 30.7-30.7 30.7l-143.4 0c-17 0-30.7-13.8-30.7-30.7 0-17 13.8-30.7 30.7-30.8l143.4 0z"></path>
                  </svg>
                </div>
                <span
                  className="text-gray-700 font-[400] text-[14px]"
                  style={{ lineBreak: "anywhere" }}>
                  Free shipping on all orders in USA
                  <span className="ml-2 inline-block">🇺🇸</span>
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </div>

          <div className="group  rounded-lg transition-all duration-200 cursor-pointer">
            <div className="flex items-center ">
              <div className="flex items-center space-x-2">
                <div className=" rounded-lg">
                  <img
                    className="w-[1em] h-[1em]"
                    src="https://commimg-us.kwcdn.com/upload_commimg/order/5285d5e7-586e-4cd6-b8ba-849ec78c975d.png.slim.png?imageView2/2/w/800/q/70/format/webp"
                    alt=""
                    aria-hidden="true"
                    data-did-mount="1"
                  />
                </div>
                <span
                  className="text-gray-700 font-[400] text-[14px]"
                  style={{ lineBreak: "anywhere" }}>
                  30 Day Money Back Guarantee
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </div>

          <div className="group  rounded-lg transition-all duration-200 cursor-pointer">
            <div className="flex items-center ">
              <div className="flex items-center space-x-2">
                <div className="rounded-lg">
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    className=""
                    aria-hidden="true">
                    <path d="M750.1 54l6.8 12.3 7.9 15.2 8.8 17.8 14.7 31.1c24.2 53.6 45.6 110.7 61.8 169.4 46.6 167.9 43.7 318-29.6 434.3-72.2 114.5-205.8 181.6-395.2 201l-19.8 1.9c-20.7 2.1-37.4 1.9-50-0.6-12.6-2.5-29-11.2-49.3-26.2-17.4-13.4-34.2-27.8-50.2-43.6-107.3-105.6-144.3-230.5-62.7-367 56.3-94.2 130.1-155.3 249.3-222l57.6-31.8 25-14.6c86.9-52.4 123.5-94 138.1-164 3.4-18.6 19.2-32.8 39-35.7 19.7-2.7 38.7 6.3 47.8 22.5z m-36.7 62.2l-2.2 6.7c-24 64.2-70.5 110.5-155 161.4l-26.2 15.3-57.4 31.6c-116.2 65-178.7 119.8-226.6 200-61.6 103.1-42.5 197.6 53.1 291.6 11.4 11.2 23.5 21.9 35.8 31.9 22.3-123.3 61.8-223.6 118.6-300.9 60.6-82.5 158.3-146.5 293-191.8-113.3 71.8-195.3 148.1-245.9 228.9-47.1 75.1-80.5 170-100.4 284.8 183.3-15.3 305.5-74.8 368.3-174.4 59.8-94.9 67-224.2 22.4-385.1-14.8-53.3-34.6-107.3-58.3-159.7l-14-29.9-5.2-10.4z"></path>
                  </svg>
                </div>
                <span
                  className="text-gray-700 font-[400] text-[14px]"
                  style={{ lineBreak: "anywhere" }}>
                  Recurring Subscription Guide
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Specification */}
      {singleProduct?.result?.item?.properties?.list?.length > 0 && (
        <div
          className="space-y-1 py-5 mt-6"
          style={{ borderTop: "1px solid #ececec" }}>
          <h3 className="text-[18px] text-[#222] h-[20px] font-[600] leading-[16px]">
            Product Specification
          </h3>
          <div className="">
            <div className="space-y-2">
              {singleProduct?.result?.item?.properties?.list?.map(
                (spec: { name: string; value: string }, index: number) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer  transition-colors duration-200">
                    <div
                      className="text-[14px] font-[400] text-[#222]"
                      style={{ lineBreak: "anywhere" }}>
                      {spec.name}: {spec.value}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingAndProductSpec;
