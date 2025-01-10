import DealsCard from "@/components/common/DealsCard";
import DealsSection from "@/components/common/DealsSection";
import useProductsFetch from "@/hooks/useProductsFetch";
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

const TopArrivals: React.FC = () => {
  const { isLoading, deals } = useProductsFetch();

  return (
    <div className="w-[90%] mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-8">
        New Arrivals
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8">
        {isLoading ? (
          <>
            <SkeletonSection />
            <SkeletonSection />
            <SkeletonSection />
          </>
        ) : (
          <>
            <DealsSection
              title="Trending deals"
              icon={Package}
              badge="3+ from $2.99">
              {deals?.data?.deals
                ?.slice(12, 16)
                ?.map((deal: { deal: any }, index: number) => (
                  <DealsCard key={index} {...deal} />
                ))}
            </DealsSection>

            <DealsSection
              title="Hot deals"
              icon={Clock}
              badge="Ends in: 22:48:10">
              {deals?.data?.deals
                ?.slice(17, 21)
                ?.map((deal: { deal: any }, index: number) => (
                  <DealsCard key={index} {...deal} />
                ))}
            </DealsSection>

            <DealsSection title="Top Arrivals" icon={Tags} badge="500+ Brands">
              {deals?.data?.deals
                ?.slice(22, 26)
                ?.map?.((deal: { deal: any }, index: number) => (
                  <DealsCard key={index} {...deal} />
                ))}
            </DealsSection>
          </>
        )}
      </div>
    </div>
  );
};

export default TopArrivals;
