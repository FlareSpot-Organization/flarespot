import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ShoppingBag, Truck, Users, Check } from "lucide-react";
import { Link } from "react-router-dom";

interface LaunchPhase {
  quarter: string;
  title: string;
  description: string;
}

export const BusinessTimelines: React.FC = () => {
  // Launch phases
  const launchPhases: LaunchPhase[] = [
    {
      quarter: "Q2 2025",
      title: "Platform Beta Launch",
      description:
        "Initial release to selected partners for testing and feedback",
    },
    {
      quarter: "Q3 2025",
      title: "Public Launch",
      description:
        "Full platform availability with core commerce and dropshipping features",
    },
    {
      quarter: "Q4 2025",
      title: "Marketplace Expansion",
      description:
        "Opening of the Flarespot supplier marketplace and expanded shipping options",
    },
    {
      quarter: "Q1 2026",
      title: "Global Scaling",
      description:
        "International expansion with localized support and regional logistics networks",
    },
  ];

  return (
    <>
      {/* Launch Roadmap */}
      <div className="py-16 px-4 mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Launch Roadmap</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Our journey to transform e-commerce is just beginning
        </p>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Horizontal line */}
            <div className="absolute top-10 left-0 right-0 h-0.5 bg-purple-200 hidden md:block"></div>

            {/* Timeline items */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {launchPhases.map((phase, index) => (
                <div key={index} className="relative">
                  {/* Circle marker */}
                  <div className="hidden md:flex absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 rounded-full h-5 w-5 z-10"></div>

                  {/* Content */}
                  <div className="pt-6 md:pt-16 px-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm h-full">
                      <div className="text-purple-600 font-bold mb-2">
                        {phase.quarter}
                      </div>
                      <h3 className="font-bold text-lg mb-3">{phase.title}</h3>
                      <p className="text-gray-600 text-sm">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="/register">
            <Button
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50">
              Sign Up for Updates <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* Partner With Us */}
      <div className="py-16 px-4 bg-[#f8f5ff] rounded-xl mb-16">
        <h2 className="text-3xl font-bold mb-4 text-center">Partner With Us</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Join us in building the future of e-commerce
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-8 flex flex-col items-center text-center">
              <div className="mb-6 text-purple-600">
                <ShoppingBag className="h-12 w-12" />
              </div>
              <h3 className="font-bold text-xl mb-4">Early Sellers</h3>
              <p className="text-gray-600 mb-6">
                Join our early access program to be among the first to use the
                platform and help shape its development.
              </p>
              <Button
                variant="outline"
                className="mt-auto border-purple-600 text-purple-600 hover:bg-purple-50"
                disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-8 flex flex-col items-center text-center">
              <div className="mb-6 text-purple-600">
                <Truck className="h-12 w-12" />
              </div>
              <h3 className="font-bold text-xl mb-4">
                Suppliers & Manufacturers
              </h3>
              <p className="text-gray-600 mb-6">
                Become a verified supplier on our network and connect with
                sellers around the world.
              </p>
              <Button
                variant="outline"
                className="mt-auto border-purple-600 text-purple-600 hover:bg-purple-50"
                disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-8 flex flex-col items-center text-center">
              <div className="mb-6 text-purple-600">
                <Users className="h-12 w-12" />
              </div>
              <h3 className="font-bold text-xl mb-4">Technology Partners</h3>
              <p className="text-gray-600 mb-6">
                Integrate your services with our platform and reach a global
                network of e-commerce businesses.
              </p>
              <Button
                variant="outline"
                className="mt-auto border-purple-600 text-purple-600 hover:bg-purple-50"
                disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
