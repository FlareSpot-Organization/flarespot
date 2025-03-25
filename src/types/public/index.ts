import { LucideIcon } from "lucide-react";

export interface Categories {
  [key: string]: {
    [key: string]: string[];
  };
}

export interface DealCardProps {
  image: string;
  title: string;
  currentPrice: number;
  originalPrice: number;
  rating?: number;
  soldCount?: number;
  discount?: number;
  savings?: number;
}

export interface DealsSectionProps {
  title: string;
  icon: LucideIcon;
  badge: string;
  children: React.ReactNode;
}

export interface FashionItem {
  id: number;
  image: string;
  currentPrice: string;
  originalPrice: string;
  rating: number;
  soldCount: number;
}

export interface Category {
  title: string;
  image: string;
  id: string;
}

export interface NavButtonProps {
  children: React.ReactNode;
  className?: string;
}

export interface Product {
  name: string;
  imageUrl: string;
}

export interface ProductCard2 {
  id: number;
  title: string;
  primaryImage: string;
  secondaryImage: string;
  tag?: string;
  price?: string;
}

export interface Region {
  image: string;
  region: string;
  regionName?: string;
  locale?: string;
  currency: string;
  currencyName: string;
  currencySymbol: string;
  symbolFront?: string;
}

export interface Language {
  locale: string;
  localeName: string;
}

export interface Currency {
  currency: string;
  currencyName: string;
  currencySymbol: string;
  symbolFront: string;
  image: string;
}

export interface InitialLanguageProps {
  regions: Region[];
  languages: Language[];
  currencies: Currency[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

// Help and support
// Minimal TypeScript definitions for help center content

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

export interface PopularCategory {
  icon: string;
  title: string;
  desc: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface HelpContentData {
  categories: HelpCategory[];
  popularTopics: string[];
  popularCategories: PopularCategory[];
  faqs: FAQ[];
}

// Reviews
// Types
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface Review {
  id: string;
  productId: number;
  product: Product;
  rating: number;
  title: string;
  content: string;
  date: string;
  status: ReviewStatus;
  helpful: number;
  verified: boolean;
}

export type ReviewStatus = "published" | "pending";

//Help and support
