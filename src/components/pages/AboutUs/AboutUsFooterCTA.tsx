import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export const AboutUsFooterCTA: React.FC = () => {
  return (
    <div className="bg-[#222] text-white py-20 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Connected</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Sign up for updates, special offers, and announcements from Flarespot.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a href="/register">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 px-8 py-6 text-lg">
              Sign Up
            </Button>
          </a>
          <a href="/contact-us">
            <Button
              variant="outline"
              size="lg"
              className="border-white hover:bg-white/20 hover:text-white px-8 py-6 text-lg">
              Contact Us
            </Button>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-400" />
            <span>Special offers</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-400" />
            <span>New product notifications</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-400" />
            <span>Helpful shopping tips</span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-full h-full">
        <div className="absolute left-10 top-20 rounded-full h-64 w-64 bg-purple-600/5"></div>
        <div className="absolute right-20 bottom-10 rounded-full h-96 w-96 bg-purple-600/10"></div>
      </div>
    </div>
  );
};
