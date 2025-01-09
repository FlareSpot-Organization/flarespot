import DealsCard from "@/components/common/DealsCard";
import DealsSection from "@/components/common/DealsSection";
import { hotDeals, newArrivals, trending } from "@/utils/Content";
import { Clock, Package, Tags } from "lucide-react";
import React from "react";

const TopArrivals: React.FC = () => {
  return (
    <div className="w-[90%] mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-8">
        New Arrivals
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8">
        <DealsSection
          title="Trending deals"
          icon={Package}
          badge="3+ from $2.99">
          {trending.map((deal, index) => (
            <DealsCard key={index} {...deal} />
          ))}
        </DealsSection>

        <DealsSection title="Hot deals" icon={Clock} badge="Ends in: 22:48:10">
          {hotDeals.map((deal, index) => (
            <DealsCard key={index} {...deal} />
          ))}
        </DealsSection>

        <DealsSection title="Top Arrivals" icon={Tags} badge="500+ Brands">
          {newArrivals.map((deal, index) => (
            <DealsCard key={index} {...deal} />
          ))}
        </DealsSection>
      </div>
    </div>
  );
};

export default TopArrivals;
