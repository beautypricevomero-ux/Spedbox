export type ProductCategory = "makeup" | "skincare" | "perfume" | "accessory";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  originalPrice: number;
  costForStore: number;
  image: string;
  isLuxury: boolean;
  hypeScore: number;
}

export interface TicketOption {
  id: string;
  price: number;
  totalSeconds: number;
  minValue: number;
  label?: string;
}

export interface SelectedProduct {
  id: string;
  product: Product;
  valueContribution: number;
}

export interface SpeedSession {
  id: string;
  ticket: TicketOption;
  selectedProducts: SelectedProduct[];
  totalValue: number;
  totalSaved: number;
  remainingSeconds: number;
  createdAt: string;
}
