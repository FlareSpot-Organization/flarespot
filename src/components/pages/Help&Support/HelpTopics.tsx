import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HelpCategory, HelpTopic } from "@/types/public/Help&Support";
import { getIconByName } from "@/utils/IconHelper";
import { Link } from "react-router-dom";
import { createSlug } from "@/utils/helpers";

interface HelpTopicsProps {
  categories: HelpCategory[];
  currentCategory: HelpCategory;
  activeCategory: string;
  setActiveCategory: (categoryId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredTopics: HelpTopic[];
}

export const HelpTopics: React.FC<HelpTopicsProps> = ({
  categories,
  currentCategory,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  filteredTopics,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-96 bg-gray-50 p-4 rounded-lg shrink-0">
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className={`w-full justify-start text-left ${
                activeCategory === category.id
                  ? "font-medium text-purple-600 bg-purple-50 hover:bg-purple-100"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveCategory(category.id);
                setSearchQuery("");
              }}>
              <div className="flex items-center w-full">
                <span className="mr-3 flex-shrink-0">
                  {getIconByName(category.icon)}
                </span>
                <span className="">{category.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        <div className="mb-6">
          <div className="relative">
            <Input
              placeholder={`Search in ${currentCategory.name.toLowerCase()}`}
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic, index) => (
              <Link
                to={`/help-support/article?category=${activeCategory}&article=${createSlug(topic.title)}`}>
                <Card
                  key={index}
                  className="border hover:shadow-md transition-shadow bg-white hover:border-purple-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-2">{topic.title}</h3>
                    <p className="text-gray-600 text-sm">{topic.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">
                No results found for "{searchQuery}"
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchQuery("")}>
                Clear search
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
