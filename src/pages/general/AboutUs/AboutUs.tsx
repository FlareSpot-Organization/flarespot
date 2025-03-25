import { AboutUsFooterCTA } from "@/components/pages/AboutUs/ABoutUsFooterCTA";
import { AboutUsBanner } from "@/components/pages/AboutUs/AboutUsBanner";
import { BusinessTimelines } from "@/components/pages/AboutUs/BusinessTimelines";

import { CompanyVisionSection } from "@/components/pages/AboutUs/CompanyVision";
import { PlatformFeatures } from "@/components/pages/AboutUs/PlatformFeatures";

export default function AboutUsPage(): JSX.Element {
  return (
    <div className="mx-auto bg-gray-50">
      {/* Hero Banner */}
      <AboutUsBanner />

      <div className="w-[90%] mx-auto max-w-[1600px]">
        {/* Company Vision and Market Opportunity */}
        <CompanyVisionSection />

        {/* Platform Features, Core Platforms, and Guiding Principles */}
        <PlatformFeatures />

        {/* Launch Roadmap and Partner With Us */}
        <BusinessTimelines />
      </div>
      <AboutUsFooterCTA />
    </div>
  );
}
