import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight,
  ShoppingBag,
  Truck,
  PieChart,
  Target,
  TrendingUp,
  Shield,
  Globe,
} from "lucide-react";

interface CompanyPrinciple {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const PlatformFeatures: React.FC = () => {
  // Platform features
  const platformFeatures = [
    {
      value: "Advanced AI",
      description:
        "AI-powered inventory optimization and market trend analysis",
    },
    {
      value: "Global Reach",
      description: "Built-in international shipping and multi-currency support",
    },
    {
      value: "Supplier Network",
      description: "Vetted suppliers and streamlined dropshipping integration",
    },
    {
      value: "Smart Analytics",
      description: "Real-time data on sales, customers, and market trends",
    },
  ];

  // Company principles
  const companyPrinciples: CompanyPrinciple[] = [
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Customer Obsession",
      description:
        "We build everything with the customer experience at the forefront",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      title: "Innovation",
      description:
        "We challenge the status quo to create a better e-commerce experience",
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Trustworthiness",
      description:
        "We prioritize security, privacy, and transparency in everything we do",
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      title: "Global Vision",
      description:
        "We're building for a borderless world where anyone can sell anywhere",
    },
  ];

  return (
    <>
      {/* Platform Features */}
      <div className="py-16 px-4 mx-auto ">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Platform Highlights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div className="space-y-10">
            {platformFeatures.slice(0, 2).map((feature, index) => (
              <div key={index} className="flex gap-6">
                <div className="bg-purple-100 h-14 w-14 rounded-full flex items-center justify-center shrink-0">
                  <div className="bg-purple-600 h-8 w-8 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.value}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-10">
            {platformFeatures.slice(2, 4).map((feature, index) => (
              <div key={index} className="flex gap-6">
                <div className="bg-purple-100 h-14 w-14 rounded-full flex items-center justify-center shrink-0">
                  <div className="bg-purple-600 h-8 w-8 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.value}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() =>
              document
                .getElementById("expanded-features")
                ?.classList.toggle("hidden")
            }>
            Explore All Features <ChevronRight className="ml-1 h-4 w-4" />
          </Button>

          {/* Expandable features section - initially hidden */}
          <div
            id="expanded-features"
            className="hidden mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-bold mb-2">One-Click Store Setup</h4>
                <p className="text-gray-600 text-sm">
                  Launch your store in minutes with professionally designed
                  templates
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-bold mb-2">Multi-Channel Integration</h4>
                <p className="text-gray-600 text-sm">
                  Sell across social media, marketplaces, and your own site from
                  one dashboard
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-bold mb-2">Automated Tax Calculation</h4>
                <p className="text-gray-600 text-sm">
                  Correct taxes calculated automatically for global selling
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-bold mb-2">Custom Shipping Rules</h4>
                <p className="text-gray-600 text-sm">
                  Create shipping policies based on location, product type, and
                  more
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-bold mb-2">Mobile-First Management</h4>
                <p className="text-gray-600 text-sm">
                  Full-featured mobile app for on-the-go store management
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-bold mb-2">Abandoned Cart Recovery</h4>
                <p className="text-gray-600 text-sm">
                  Automated tools to recapture lost sales
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Core Platforms */}
      <div className="py-16 px-4 mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Our Core Platforms
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border hover:shadow-lg transition-shadow bg-white">
            <CardContent className="pt-8 pb-8 flex flex-col items-center">
              <div className="mb-6 bg-purple-100 p-4 rounded-full">
                <ShoppingBag className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-center">
                Flarespot Commerce
              </h3>
              <p className="text-gray-600 text-center">
                Our flagship store platform with integrated payments, inventory
                management, and marketing tools designed for businesses of all
                sizes.
              </p>
            </CardContent>
          </Card>

          <Card className="border hover:shadow-lg transition-shadow bg-white">
            <CardContent className="pt-8 pb-8 flex flex-col items-center">
              <div className="mb-6 bg-purple-100 p-4 rounded-full">
                <Truck className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-center">
                Flarespot Connect
              </h3>
              <p className="text-gray-600 text-center">
                Our supplier and logistics network enabling seamless
                dropshipping, inventory sourcing, and global fulfillment
                capabilities.
              </p>
            </CardContent>
          </Card>

          <Card className="border hover:shadow-lg transition-shadow bg-white">
            <CardContent className="pt-8 pb-8 flex flex-col items-center">
              <div className="mb-6 bg-purple-100 p-4 rounded-full">
                <PieChart className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-center">
                Flarespot Insights
              </h3>
              <p className="text-gray-600 text-center">
                Our AI-powered analytics suite providing actionable market
                intelligence, performance metrics, and optimization
                recommendations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Guiding Principles */}
      <div className="py-16 px-4 bg-[#222] text-white rounded-xl mb-16 mt-16">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Our Guiding Principles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {companyPrinciples.map((principle, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 bg-white/10 p-4 rounded-full">
                {principle.icon}
              </div>
              <h3 className="font-bold text-xl mb-2">{principle.title}</h3>
              <p className="text-gray-300">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
