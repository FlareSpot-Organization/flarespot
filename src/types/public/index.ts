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
