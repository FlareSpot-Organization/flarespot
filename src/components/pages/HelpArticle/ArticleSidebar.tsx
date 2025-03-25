import React from "react";
import { Link } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Category, Topic } from "@/types/public/Help&Support";

interface SidebarProps {
  category: Category;
  categories: Category[];
  currentArticle: Topic;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  getIconByName: (name: string) => JSX.Element;
  createSlug: (text: string) => string;
}

export const ArticleSidebar: React.FC<SidebarProps> = ({
  category,
  categories,
  currentArticle,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  getIconByName,
  createSlug,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 sticky top-8">
      {/* Back button */}
      <Link
        to="/help-support"
        className="flex items-center text-purple-600 hover:text-purple-800 mb-6 group transition-all duration-200">
        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Help Center</span>
      </Link>

      {/* Category header */}
      <div className="flex items-center mb-4">
        <div className="mr-3">{getIconByName(category.icon)}</div>
        <h3 className="font-bold text-lg">{category.name}</h3>
      </div>

      {/* Search form */}
      <form onSubmit={onSearchSubmit} className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for help..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={onSearchChange}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </form>

      {/* Topics in this category */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-2">In this category</h4>
        <ul className="space-y-1.5">
          {category.topics.map((topic, index) => (
            <li key={index} className="transition-colors">
              <Link
                to={`/help-support/article?category=${category.id}&article=${createSlug(
                  topic.title
                )}`}
                className={`block py-1.5 px-2 rounded text-sm ${
                  topic.title === currentArticle.title
                    ? "bg-purple-100 text-purple-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}>
                {topic.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Explore other categories */}
      <div>
        <h4 className="font-medium text-gray-900 mb-2">
          Explore other categories
        </h4>
        <ul className="space-y-1.5">
          {categories
            .filter((cat) => cat.id !== category.id)
            .map((cat, index) => (
              <li key={index}>
                <Link
                  to={`/help-support/article?category=${cat.id}`}
                  className="flex items-center py-1.5 px-2 rounded text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <span className="mr-2 flex-shrink-0">
                    {getIconByName(cat.icon)}
                  </span>
                  <span>{cat.name}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticleSidebar;
