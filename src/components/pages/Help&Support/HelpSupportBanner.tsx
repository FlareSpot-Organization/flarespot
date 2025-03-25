import React from "react";
import { ArrowDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HelpSearchBannerProps {
  bannerSearchQuery: string;
  setBannerSearchQuery: (query: string) => void;
  handleBannerSearch: () => void;
  popularTopics: string[];
}

export const HelpSupportBanner: React.FC<HelpSearchBannerProps> = ({
  bannerSearchQuery,
  setBannerSearchQuery,
  handleBannerSearch,
  popularTopics,
}) => {
  return (
    <div className="bg-[#222] mx-auto text-white p-8 md:p-16 relative overflow-hidden flex items-center">
      <div className="mx-auto max-w-[1600px] relative z-10 w-full">
        <h3 className="text-xl md:text-2xl font-medium mb-2">Help Center</h3>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Find solutions fast.
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Search hundreds of articles in our help library
        </p>

        <div className="max-w-3xl p-1 flex items-center rounded-md overflow-hidden border border-white/30">
          <Input
            placeholder="Search Articles"
            className="flex-grow pl-4 py-3 text-lg bg-[#222] text-white placeholder:text-white/60 border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={bannerSearchQuery}
            onChange={(e) => setBannerSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleBannerSearch();
                document
                  .getElementById("help-topics")
                  ?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
          <Button
            className="h-full px-4 bg-purple-600 hover:bg-purple-700 rounded-lg"
            onClick={() => {
              handleBannerSearch();
              document
                .getElementById("help-topics")
                ?.scrollIntoView({ behavior: "smooth" });
            }}>
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>

        <div className="mt-8 flex items-center flex-wrap">
          <span className="text-white mr-3 text-lg">Popular:</span>
          {popularTopics.map((tag) => (
            <Button
              key={tag}
              variant="outline"
              className="mr-2 text-white border-white bg-transparent hover:bg-white/20 hover:text-white"
              onClick={() => {
                setBannerSearchQuery(tag);
                handleBannerSearch();
              }}>
              {tag}
            </Button>
          ))}
        </div>

        {/* Scroll down indicator */}
        <div className="mt-16 text-center">
          <div
            className="animate-bounce inline-block cursor-pointer"
            onClick={() =>
              document
                .getElementById("popular-categories")
                ?.scrollIntoView({ behavior: "smooth" })
            }>
            <ArrowDown className="h-8 w-8" />
          </div>
          <p
            className="text-white/80 cursor-pointer"
            onClick={() => {
              document
                .getElementById("popular-categories")
                ?.scrollIntoView({ behavior: "smooth" });
            }}>
            Scroll down for more help options
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute right-0 bottom-0 w-1/2 h-1/2">
        <div className="relative w-full h-full">
          <div className="absolute right-10 md:right-20 bottom-10 md:bottom-20 rounded-full h-24 w-24 bg-purple-600/30"></div>
          <div className="absolute right-32 md:right-48 bottom-32 md:bottom-48 rounded-full h-12 w-12 bg-purple-500/20"></div>
          <div className="absolute right-16 md:right-32 bottom-48 md:bottom-64 rounded-full h-16 w-16 bg-purple-700/25"></div>
        </div>
      </div>
    </div>
  );
};
