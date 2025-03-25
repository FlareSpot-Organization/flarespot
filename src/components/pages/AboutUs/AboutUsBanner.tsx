import React from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const AboutUsBanner: React.FC = () => {
  return (
    <div className="bg-[#222] mx-auto text-white p-8 md:p-16 relative overflow-hidden flex items-center min-h-[60vh]">
      <div className="mx-auto max-w-[1600px] relative z-10 w-full">
        <h3 className="text-xl md:text-2xl font-medium mb-2 text-purple-400">
          Introducing Flarespot
        </h3>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          The future of
          <br /> e-commerce is here.
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-300">
          Launching in 2025, Flarespot is building the next generation of
          e-commerce and dropshipping technology to democratize global online
          selling.
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 text-lg">
            Shop With Us
          </Button>
          <Link to="/help-support">
            <Button
              variant="outline"
              size="lg"
              className="border-white hover:bg-white/20 hover:text-white px-6 py-3 text-lg">
              Help & Support
            </Button>
          </Link>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-16 text-center">
          <div
            className="animate-bounce inline-block cursor-pointer"
            onClick={() =>
              document
                .getElementById("our-vision")
                ?.scrollIntoView({ behavior: "smooth" })
            }>
            <ArrowDown className="h-8 w-8" />
          </div>
          <p
            className="text-white/80 cursor-pointer"
            onClick={() => {
              document
                .getElementById("our-vision")
                ?.scrollIntoView({ behavior: "smooth" });
            }}>
            Scroll down to learn more
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
