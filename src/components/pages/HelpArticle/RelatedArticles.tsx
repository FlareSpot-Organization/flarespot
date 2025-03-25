import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface RelatedArticlesProps {
  categoryId: string;
  articles: Array<{
    title: string;
    description: string;
  }>;
  createSlug: (text: string) => string;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  categoryId,
  articles,
  createSlug,
}) => {
  if (!articles.length) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <Link
            key={index}
            to={`/help-support/article?category=${categoryId}&article=${createSlug(article.title)}`}
            className="group">
            <Card className="h-full hover:shadow-md transition-all duration-200 hover:border-purple-200 group-hover:translate-y-[-2px]">
              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {article.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
