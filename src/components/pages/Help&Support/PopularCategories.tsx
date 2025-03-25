// File: components/HelpSupport/PopularCategories.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PopularCategory } from "@/types/public/Help&Support";
import { getIconByName } from "@/utils/IconHelper";
import { Link } from "react-router-dom";

interface PopularCategoriesProps {
  popularCategories: PopularCategory[];
}

export const PopularCategories: React.FC<PopularCategoriesProps> = ({
  popularCategories,
}) => {
  return (
    <div id="popular-categories" className="py-8  mx-auto scroll-mt-12">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Popular Help Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularCategories.map((item, index) => (
          <Link
            to={`/help-support/article?popularCategory=${encodeURIComponent(item.title)}`}>
            <Card
              key={index}
              className="border hover:shadow-md transition-shadow bg-white hover:border-purple-200">
              <CardContent className="pt-6">
                <div className="mb-3">{getIconByName(item.icon)}</div>
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
