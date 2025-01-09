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
}
