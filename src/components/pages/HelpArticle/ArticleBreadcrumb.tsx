import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  categoryId: string;
  categoryName: string;
  articleTitle: string;
}

export const ArticleBreadcrumb: React.FC<BreadcrumbProps> = ({
  categoryId,
  categoryName,
  articleTitle,
}) => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center text-sm text-gray-600">
          <Link to="/" className="hover:text-purple-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to="/help-support" className="hover:text-purple-600">
            Help Center
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link
            to={`/help-support/article?category=${categoryId}`}
            className="hover:text-purple-600">
            {categoryName}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium truncate max-w-[200px] md:max-w-xs">
            {articleTitle}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleBreadcrumb;
