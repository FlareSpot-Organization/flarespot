import DealsCard from "@/components/common/DealsCard";
import DealsSection from "@/components/common/DealsSection";
import useProductsFetch from "@/hooks/useProductsFetch";
import { ProductCardProps } from "@/types/product_types";
import { Clock, Package, Tags } from "lucide-react";
import React from "react";

const SkeletonSection = () => (
  <div className="space-y-4">
    {/* Skeleton for Title */}
    <div className="animate-pulse bg-gray-300 h-6 w-1/2 rounded-md"></div>
    {/* Skeleton for Content */}
    <div className="space-y-3">
      {[...Array(2)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse p-4 bg-gray-200 rounded-md h-20 w-full"></div>
      ))}
    </div>
  </div>
);

const TodaysDeals: React.FC = () => {
  const { isLoading, deals } = useProductsFetch();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-8">
        Today's deals
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-8">
        {isLoading ? (
          <>
            <SkeletonSection />
            <SkeletonSection />
            <SkeletonSection />
          </>
        ) : (
          <>
            <DealsSection
              title="Bundle deals"
              icon={Package}
              badge="3+ from $2.99">
              {deals
                ?.slice(0, 4)
                ?.map((deal: { deal: any }, index: number) => (
                  <DealsCard key={index} item={deal} />
                ))}
            </DealsSection>

            <DealsSection
              title="SuperDeals"
              icon={Clock}
              badge="Ends in: 22:48:10">
              {deals
                ?.slice(5, 9)
                ?.map((deal: { deal: any }, index: number) => (
                  <DealsCard key={index} item={deal} />
                ))}
            </DealsSection>

            <DealsSection title="Big Save" icon={Tags} badge="500+ Brands">
              {deals
                ?.slice(10, 14)
                ?.map((deal: { deal: any }, index: number) => (
                  <DealsCard key={index} item={deal} />
                ))}
            </DealsSection>
          </>
        )}
      </div>
    </div>
  );
};

export default TodaysDeals;
