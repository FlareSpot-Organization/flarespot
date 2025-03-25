import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// Import types and data

import helpContentData from "@/utils/data_json/helpsupport.json";
import { generateArticleContent } from "@/utils/helpers/article-generator";
import { HelpContentData } from "@/types/public/Help&Support";
import { findArticle, findCategory } from "@/utils/helpers";

/**
 * Custom hook to handle Help Article page state and logic
 */
export const useHelpArticle = () => {
  // Router hooks
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Refs
  const contentRef = useRef<HTMLDivElement>(null);

  // State
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Get query parameters
  const categoryId = searchParams.get("category") || "shipping";
  const articleTitle = searchParams.get("article") || "";
  const popularCategory = searchParams.get("popularCategory") || "";

  // Find the appropriate category
  const category = findCategory(categoryId, popularCategory);

  // Find the article
  const article = findArticle(category, articleTitle);

  // Get related articles
  const relatedArticles = article
    ? category.topics.filter((topic) => topic !== article).slice(0, 3)
    : [];

  // Generate article content HTML if article exists
  const articleHtml = article
    ? generateArticleContent(article.title, category.id, category.name)
    : "";

  // Redirect if article not found
  useEffect(() => {
    if (!article) {
      navigate("/help-support");
    }
  }, [article, navigate]);

  // Scroll to top on URL parameter change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [categoryId, articleTitle, popularCategory]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Search in the current help article context
    navigate(`/help-support/article?query=${encodeURIComponent(searchQuery)}`);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return {
    // Data
    category,
    article,
    relatedArticles,
    articleHtml,
    categories: (helpContentData as HelpContentData).categories,

    // State
    searchQuery,
    contentRef,

    // Handlers
    handleSearch,
    handleSearchChange,
  };
};

export default useHelpArticle;
