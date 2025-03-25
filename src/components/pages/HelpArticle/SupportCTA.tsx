import React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SupportCTA: React.FC = () => {
  return (
    <div className="mt-8 bg-purple-50 rounded-lg p-6 flex flex-col md:flex-row items-center transform transition-all hover:bg-purple-100 hover:shadow-md">
      <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-purple-200 opacity-50 blur-sm animate-pulse"></div>
          <div className="relative bg-purple-100 p-3 rounded-full">
            <MessageCircle className="h-10 w-10 text-purple-600" />
          </div>
        </div>
      </div>
      <div className="text-center md:text-left">
        <h3 className="text-lg font-bold mb-1 text-purple-800">
          Still need help?
        </h3>
        <p className="text-gray-700 mb-3">
          Our support team is available 24/7 to assist you with any questions or
          issues.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center md:justify-start">
          <Button className="bg-purple-600 hover:bg-purple-700">
            Chat with Us
          </Button>
          <Button
            variant="outline"
            className="border-purple-300 text-purple-700 hover:bg-purple-100 hover:text-purple-800">
            Email Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupportCTA;
