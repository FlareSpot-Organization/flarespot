import React from "react";
import {
  Search,
  FileQuestion,
  ArrowLeft,
  HelpCircle,
  LifeBuoy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HelpNotFoundProps {
  query?: string;
  categoryId?: string;
  popularCategories?: Array<{
    icon: string;
    title: string;
    desc: string;
  }>;
  getIconByName?: (name: string) => JSX.Element;
}

const HelpArticleNotFound: React.FC<HelpNotFoundProps> = ({
  query = "",
  categoryId = "",
  popularCategories = [],
  getIconByName,
}) => {
  return (
    <div className="mx-auto max-w-4xl py-16 px-4">
      <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-8 md:p-12">
        {/* Animated icon */}
        <div className="relative mb-8 w-36 h-36 flex items-center justify-center">
          <div className="absolute inset-0 bg-purple-100 rounded-full animate-pulse opacity-30"></div>
          <div className="absolute z-10 w-28 h-28 rounded-full bg-white flex items-center justify-center">
            <FileQuestion className="w-16 h-16 text-purple-400" />
          </div>
          <div className="animate-orbit absolute">
            <Search className="w-10 h-10 text-purple-600 filter drop-shadow-md" />
          </div>
          <div className="animate-orbit2 absolute">
            <HelpCircle className="w-8 h-8 text-purple-500 filter drop-shadow-sm" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
          Article not found
        </h1>

        {query ? (
          <p className="text-lg text-gray-600 text-center max-w-2xl mb-8">
            We couldn't find any help articles matching
            <span className="inline-block px-3 py-1 mx-2 bg-purple-50 text-purple-700 rounded-md font-medium">
              "{query}"
            </span>
          </p>
        ) : (
          <p className="text-lg text-gray-600 text-center max-w-2xl mb-8">
            The help article you're looking for could not be found. It may have
            been moved or doesn't exist.
          </p>
        )}

        {/* Search suggestions */}
        <div className="w-full max-w-xl bg-gray-50 rounded-lg p-5 mb-8">
          <h3 className="font-medium text-gray-800 mb-3 flex items-center">
            <Search className="w-4 h-4 mr-2 text-purple-600" />
            Search Tips
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <div className="mt-1 flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block"></span>
              </div>
              <span>Check for spelling errors or typos</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block"></span>
              </div>
              <span>Try more general keywords instead of specific terms</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block"></span>
              </div>
              <span>Browse through our help categories below</span>
            </li>
          </ul>
        </div>

        {/* Popular categories */}
        {popularCategories.length > 0 && (
          <div className="w-full mb-8">
            <h3 className="font-semibold text-xl text-gray-800 mb-4 text-center">
              Browse Popular Help Categories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {popularCategories.slice(0, 6).map((category, index) => (
                <Link
                  key={index}
                  to={`/help-support/article?popularCategory=${encodeURIComponent(category.title)}`}
                  className="flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-purple-200 hover:shadow-sm transition-all">
                  <div className="mr-3">
                    {getIconByName ? getIconByName(category.icon) : null}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {category.title}
                    </h4>
                    <p className="text-xs text-gray-500">{category.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to={
              categoryId
                ? `/help-support/article?category=${categoryId}`
                : "/help-support"
            }>
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Help Center
            </Button>
          </Link>

          <Button className="bg-purple-600 hover:bg-purple-700 flex items-center">
            <LifeBuoy className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpArticleNotFound;
