export type ProductTier = "hero" | "premium" | "filler";

export type ProductCategory = "makeup" | "skincare" | "perfume" | "accessory";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  originalPrice: number;
  purchaseCost: number;
  hypeScore: number;
  isBeautyVes: boolean;
  isLuxury: boolean;
  tier: ProductTier;
  imageUrl: string;
}

export interface Ticket {
  id: string;
  label: string;
  ticketPrice: number;
  totalSeconds: number;
  valueMinBase: number;
  valueMinBeautyVesEdition: number;
}

export interface SelectedProduct {
  product: Product;
}

export interface Session {
  id: string;
  ticket: Ticket;
  selectedProducts: SelectedProduct[];
  totalValue: number;
  totalPurchaseCost: number;
  avgHype: number | null;
  createdAt: string;
  hasBeautyVesEdition: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}
