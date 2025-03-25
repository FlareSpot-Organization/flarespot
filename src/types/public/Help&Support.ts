// File: types/helpSupport.ts
export interface HelpTopic {
  title: string;
  description: string;
}

export interface HelpCategory {
  id: string;
  name: string;
  icon: string;
  topics: HelpTopic[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  topics: Topic[];
}

export interface Topic {
  title: string;
  description: string;
}

export interface PopularCategory {
  title: string;
  desc: string;
  icon: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface HelpContentData {
  categories: HelpCategory[];
  popularCategories: PopularCategory[];
  popularTopics: string[];
  faqs?: FAQ[];
}
