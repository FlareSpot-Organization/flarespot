import React from "react";
import { useHelpSearch } from "@/hooks/useHelpSearch";
import helpContentData from "@/utils/data_json/helpsupport.json";
import { HelpSupportBanner } from "@/components/pages/Help&Support/HelpSupportBanner";
import { HelpContentData } from "@/types/public/Help&Support";
import { PopularCategories } from "@/components/pages/Help&Support/PopularCategories";
import { FrequentlyAskedQuestions } from "@/components/pages/Help&Support/FrequentlyAskedQuestions";
import { HelpLoginBanner } from "@/components/pages/Help&Support/HelpLoginBanner";
import { HelpTopics } from "@/components/pages/Help&Support/HelpTopics";

export default function HelpSupportPage(): JSX.Element {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    bannerSearchQuery,
    setBannerSearchQuery,
    filteredTopics,
    currentCategory,
    handleBannerSearch,
  } = useHelpSearch(helpContentData as HelpContentData);

  return (
    <div className="mx-auto bg-gray-50">
      {/* Full-screen Banner */}
      <HelpSupportBanner
        bannerSearchQuery={bannerSearchQuery}
        setBannerSearchQuery={setBannerSearchQuery}
        handleBannerSearch={handleBannerSearch}
        popularTopics={helpContentData.popularTopics}
      />

      <div className="w-[90%] mx-auto max-w-[1600px]">
        {/* Popular Categories */}
        <PopularCategories
          popularCategories={helpContentData.popularCategories}
        />

        {/* Frequently Asked Questions and Login Banner Side by Side */}
        <div className="py-8  mx-auto w-full">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* FAQ Section */}
            <FrequentlyAskedQuestions faqs={helpContentData.faqs} />

            {/* Login Banner */}
            <HelpLoginBanner />
          </div>
        </div>

        {/* Help Topics with Sidebar */}
        <div id="help-topics" className="py-8 px-4 bg-white rounded-t-lg">
          <div className="mx-auto">
            <h2 className="text-2xl font-bold mb-8">Browse Help Topics</h2>

            <HelpTopics
              categories={helpContentData.categories}
              currentCategory={currentCategory}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredTopics={filteredTopics}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
