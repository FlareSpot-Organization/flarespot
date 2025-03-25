// File: components/HelpSupport/LoginBanner.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

export const HelpLoginBanner: React.FC = () => {
  return (
    <div className="md:col-span-2 bg-[#222] text-white p-8 rounded-lg flex flex-col justify-center">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Get Support</h3>
        <p className="text-white/90">
          Log in for personalized service and assistance.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div className="mb-6">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-[#f0e8d9] rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <User className="h-10 w-10 text-[#222]" />
            </div>
          </div>
        </div>

        <Link to="/auth/login">
          <Button
            variant="secondary"
            className="bg-white text-[#222] hover:bg-white/90 px-8 py-2 text-lg font-medium w-[120px]">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};
