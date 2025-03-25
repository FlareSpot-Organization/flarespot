import React from "react";
import { Clock, Printer, Share2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ArticleContentProps {
  title: string;
  description: string;
  html: string;
}

export const ArticleContentDisplay: React.FC<ArticleContentProps> = ({
  title,
  description,
  html,
}) => {
  const lastUpdated = "March 15, 2025"; // This could be dynamic from an API

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `FlarePoT Help: ${title}`,
          text: description,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // Could show a toast notification here
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
      {/* Article header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-3 text-gray-900">{title}</h1>
        <p className="text-gray-600 text-lg mb-4">{description}</p>

        <div className="flex flex-wrap items-center text-sm text-gray-500 gap-3">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>Updated {lastUpdated}</span>
          </div>

          <div className="flex items-center ml-auto space-x-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share this article</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Article content */}
      <div className="prose prose-purple max-w-none">
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="article-content"
        />

        <h3 className="mt-8 mb-4">Video Tutorial</h3>
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-center p-10">
            <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">
              Video tutorial would be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleContentDisplay;
