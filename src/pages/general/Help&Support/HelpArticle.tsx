import React from "react";
import {
  ShoppingBag,
  Truck,
  RefreshCw,
  User,
  CreditCard,
  ShieldCheck,
  AlertCircle,
  FileText,
  Settings,
  SmartphoneIcon,
  Store,
  Package,
} from "lucide-react";
import useHelpArticle from "@/hooks/useHelpArticle";
import ArticleBreadcrumb from "@/components/pages/HelpArticle/ArticleBreadcrumb";
import ArticleSidebar from "@/components/pages/HelpArticle/ArticleSidebar";
import { createSlug } from "@/utils/helpers";
import ArticleContentDisplay from "@/components/pages/HelpArticle/ArticleContentDisplay";
import ArticleFeedbackForm from "@/components/pages/HelpArticle/ArticleFeedbackForm";
import RelatedArticles from "@/components/pages/HelpArticle/RelatedArticles";
import SupportCTA from "@/components/pages/HelpArticle/SupportCTA";

/**
 * Helper function to get icon component by name
 * This needs to remain in the component file since it imports Lucide icons
 */
const getIconByName = (iconName: string): JSX.Element => {
  const icons: Record<string, JSX.Element> = {
    ShoppingBag: <ShoppingBag className="h-5 w-5 text-purple-600" />,
    Settings: <Settings className="h-5 w-5 text-purple-600" />,
    CreditCard: <CreditCard className="h-5 w-5 text-purple-600" />,
    AlertCircle: <AlertCircle className="h-5 w-5 text-purple-600" />,
    User: <User className="h-5 w-5 text-purple-600" />,
    ShieldCheck: <ShieldCheck className="h-5 w-5 text-purple-600" />,
    SmartphoneIcon: <SmartphoneIcon className="h-5 w-5 text-purple-600" />,
    Store: <Store className="h-5 w-5 text-purple-600" />,
    Package: <Package className="h-5 w-5 text-purple-600" />,
    RefreshCw: <RefreshCw className="h-5 w-5 text-purple-600" />,
    Truck: <Truck className="h-5 w-5 text-purple-600" />,
    FileText: <FileText className="h-5 w-5 text-purple-600" />,
  };

  return icons[iconName] || <AlertCircle className="h-5 w-5 text-purple-600" />;
};

export default function HelpArticlePage(): JSX.Element {
  // Use our custom hook to handle all state and logic
  const {
    category,
    article,
    relatedArticles,
    articleHtml,
    categories,
    searchQuery,
    contentRef,
    handleSearch,
    handleSearchChange,
  } = useHelpArticle();

  // Show loading state if article isn't available yet
  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen" ref={contentRef}>
      {/* Breadcrumb Navigation */}
      <ArticleBreadcrumb
        categoryId={category.id}
        categoryName={category.name}
        articleTitle={article.title}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="col-span-1">
            <ArticleSidebar
              category={category}
              categories={categories}
              currentArticle={article}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearch}
              getIconByName={getIconByName}
              createSlug={createSlug}
            />
          </div>

          {/* Main content area */}
          <div className="col-span-1 lg:col-span-3">
            {/* Article Content */}
            <ArticleContentDisplay
              title={article.title}
              description={article.description}
              html={articleHtml}
            />

            {/* Feedback form */}
            <ArticleFeedbackForm articleTitle={article.title} />

            {/* Related articles */}
            <RelatedArticles
              categoryId={category.id}
              articles={relatedArticles}
              createSlug={createSlug}
            />

            {/* Support CTA */}
            <SupportCTA />
          </div>
        </div>
      </div>
    </div>
  );
}
