import DealsCard from "@/components/common/DealsCard";
import DealsSection from "@/components/common/DealsSection";
import { bigSave, bundleDeals, superDeals } from "@/utils/Content";
import { Clock, Package, Tags } from "lucide-react";
import React from "react";

const TodaysDeals: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-8">
        Today's deals
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-8">
        <DealsSection title="Bundle deals" icon={Package} badge="3+ from $2.99">
          {bundleDeals.map((deal, index) => (
            <DealsCard key={index} {...deal} />
          ))}
        </DealsSection>

        <DealsSection title="SuperDeals" icon={Clock} badge="Ends in: 22:48:10">
          {superDeals.map((deal, index) => (
            <DealsCard key={index} {...deal} />
          ))}
        </DealsSection>

        <DealsSection title="Big Save" icon={Tags} badge="500+ Brands">
          {bigSave.map((deal, index) => (
            <DealsCard key={index} {...deal} />
          ))}
        </DealsSection>
      </div>
    </div>
  );
};

export default TodaysDeals;
