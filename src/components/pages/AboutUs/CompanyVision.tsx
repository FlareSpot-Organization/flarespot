// File: components/AboutUs/CompanyVisionSection.tsx
import React from "react";
import { Check, Rocket, Layers } from "lucide-react";

export const CompanyVisionSection: React.FC = () => {
  return (
    <>
      {/* Company Vision */}
      <div className="py-16 px-4 mx-auto scroll-mt-2" id="our-vision">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-xl font-medium">
                To create the most accessible and powerful e-commerce ecosystem
                in the world.
              </p>
              <p>
                Flarespot was born from a simple observation: despite the
                massive growth of e-commerce, existing platforms haven't truly
                democratized global selling. Small businesses still face
                significant barriers to entry, and established sellers struggle
                with fragmented tools and complex logistics.
              </p>
              <p>
                We're building a unified platform that makes it possible for
                anyone to sell anything, anywhere. By integrating cutting-edge
                AI, streamlined logistics, and an intuitive user experience,
                we're creating a new standard for what e-commerce can be.
              </p>
              <p>
                Our 2025 launch marks the beginning of our journey to transform
                global commerce and create opportunities for entrepreneurs and
                businesses of all sizes.
              </p>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-[#f8f5ff] p-10 rounded-xl shadow-sm max-w-md">
              <h3 className="text-2xl font-bold mb-6 text-purple-600">
                Our Promise
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                We're building Flarespot to break down barriers in global
                commerce. Our platform will make it simple for anyone to:
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-1 shrink-0" />
                  <span>Launch an online store in minutes, not months</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-1 shrink-0" />
                  <span>Sell globally without supply chain complexity</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-1 shrink-0" />
                  <span>Make data-driven decisions with powerful AI tools</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Market Opportunity */}
      <div className="py-16 bg-[#f8f5ff] rounded-xl mb-16">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Why Flarespot, Why Now
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
          <div className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Rocket className="h-6 w-6 text-purple-600 mr-2" />
              The Market Opportunity
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>
                Global e-commerce sales are projected to reach $6.3 trillion in
                2025, yet existing platforms haven't kept pace with market
                needs.
              </p>
              <p>
                Traditional e-commerce platforms have become increasingly
                complex and fragmented, creating friction for both sellers and
                buyers.
              </p>
              <p>
                The demand for integrated, AI-powered solutions that simplify
                global selling has never been greater.
              </p>
            </div>
          </div>

          <div className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Layers className="h-6 w-6 text-purple-600 mr-2" />
              Our Approach
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>
                We've reimagined e-commerce from the ground up, focusing on
                integration, simplicity, and intelligence.
              </p>
              <p>
                Rather than cobbling together multiple tools and platforms,
                we're creating a unified ecosystem where everything works
                seamlessly together.
              </p>
              <p>
                By leveraging the latest in AI, cloud computing, and logistics
                technology, we're building the most advanced e-commerce platform
                ever created.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
