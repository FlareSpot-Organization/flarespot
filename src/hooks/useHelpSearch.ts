// File: hooks/useHelpSearch.ts
import { useEffect, useState } from "react";
import {
  HelpCategory,
  HelpContentData,
  HelpTopic,
} from "@/types/public/Help&Support";

export const useHelpSearch = (helpContentData: HelpContentData) => {
  const [activeCategory, setActiveCategory] = useState<string>("shipping");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [bannerSearchQuery, setBannerSearchQuery] = useState<string>("");
  const [filteredTopics, setFilteredTopics] = useState<HelpTopic[]>([]);

  // Get the current category data
  const currentCategory: HelpCategory =
    helpContentData.categories.find((cat) => cat.id === activeCategory) ||
    helpContentData.categories[0];

  // Filter topics based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTopics(currentCategory.topics);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    const filtered = currentCategory.topics.filter(
      (topic) =>
        topic.title.toLowerCase().includes(lowerQuery) ||
        topic.description.toLowerCase().includes(lowerQuery)
    );

    setFilteredTopics(filtered);
  }, [searchQuery, currentCategory]);

  // Handle banner search
  const handleBannerSearch = () => {
    if (!bannerSearchQuery.trim()) return;

    // Global search across all categories
    let allTopics: Array<{
      title: string;
      description: string;
      categoryId: string;
    }> = [];
    let foundCategory: string | null = null;

    helpContentData.categories.forEach((category) => {
      const matchingTopics = category.topics
        .filter(
          (topic) =>
            topic.title
              .toLowerCase()
              .includes(bannerSearchQuery.toLowerCase()) ||
            topic.description
              .toLowerCase()
              .includes(bannerSearchQuery.toLowerCase())
        )
        .map((topic) => ({
          ...topic,
          categoryId: category.id,
        }));

      if (matchingTopics.length > 0 && !foundCategory) {
        foundCategory = category.id;
      }

      allTopics = [...allTopics, ...matchingTopics];
    });

    // If matches were found, set the active category to the first match's category
    if (allTopics.length > 0) {
      setActiveCategory(allTopics[0].categoryId);
      setSearchQuery(bannerSearchQuery);

      // Display a notification or highlight that results were found
      console.log(
        `Found ${allTopics.length} matching topics across categories`
      );
    } else {
      // If no matches, just set the search query
      setSearchQuery(bannerSearchQuery);
    }
  };

  return {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    bannerSearchQuery,
    setBannerSearchQuery,
    filteredTopics,
    currentCategory,
    handleBannerSearch,
  };
};
