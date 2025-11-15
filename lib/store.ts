"use client";

import { create } from "zustand";
import { Product, SelectedProduct, SpeedSession, TicketOption } from "@/lib/types";

const MAX_LUXURY_TOTAL = 3;
const MAX_LUXURY_PERFUME = 1;
const MAX_LUXURY_SKINCARE = 1;

const TICKETS: TicketOption[] = [
  { id: "30", price: 30, totalSeconds: 90, minValue: 60 },
  { id: "50", price: 50, totalSeconds: 180, minValue: 100, label: "Consigliato" },
  { id: "80", price: 80, totalSeconds: 240, minValue: 160 },
  { id: "100", price: 100, totalSeconds: 300, minValue: 220, label: "Limited" }
];

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Rossetto Velvet Bloom",
    category: "makeup",
    originalPrice: 29.9,
    costForStore: 7.5,
    image: "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=400&q=80",
    isLuxury: false,
    hypeScore: 55
  },
  {
    id: "p2",
    name: "Palette Ombre Rose",
    category: "makeup",
    originalPrice: 44.9,
    costForStore: 10.2,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
    isLuxury: false,
    hypeScore: 62
  },
  {
    id: "p3",
    name: "Siero Vitamina C",
    category: "skincare",
    originalPrice: 59.9,
    costForStore: 14.5,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
    isLuxury: false,
    hypeScore: 48
  },
  {
    id: "p4",
    name: "Crema Idratante Giorno",
    category: "skincare",
    originalPrice: 34.9,
    costForStore: 8.4,
    image: "https://images.unsplash.com/photo-1582719478125-1cf5c99b2f86?auto=format&fit=crop&w=400&q=80",
    isLuxury: false,
    hypeScore: 52
  },
  {
    id: "p5",
    name: "Profumo Couture Rouge",
    category: "perfume",
    originalPrice: 89.9,
    costForStore: 18.5,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=400&q=80",
    isLuxury: true,
    hypeScore: 68
  },
  {
    id: "p6",
    name: "Fondotinta Satin Skin",
    category: "makeup",
    originalPrice: 39.9,
    costForStore: 9.7,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80",
    isLuxury: false,
    hypeScore: 50
  },
  {
    id: "p7",
    name: "Luxury Lip Velvet",
    category: "makeup",
    originalPrice: 55.0,
    costForStore: 13.5,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=400&q=80",
    isLuxury: true,
    hypeScore: 66
  },
  {
    id: "p8",
    name: "Mist Idratante Rosa",
    category: "skincare",
    originalPrice: 28.0,
    costForStore: 6.4,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=400&q=80",
    isLuxury: false,
    hypeScore: 42
  },
  {
    id: "p9",
    name: "Olio Nutriente Lumière",
    category: "skincare",
    originalPrice: 64.0,
    costForStore: 15.0,
    image: "https://images.unsplash.com/photo-1529676468690-a442a6c78fcd?auto=format&fit=crop&w=400&q=80",
    isLuxury: true,
    hypeScore: 58
  },
  {
    id: "p10",
    name: "Mascara Volume Bloom",
    category: "makeup",
    originalPrice: 24.9,
    costForStore: 6.0,
    image: "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=400&q=80",
    isLuxury: false,
    hypeScore: 47
  },
  {
    id: "p11",
    name: "Roller Ghiaccio Glow",
    category: "accessory",
    originalPrice: 32.0,
    costForStore: 7.8,
    image: "https://images.unsplash.com/photo-1612810433267-1b59c8589b66?auto=format&fit=crop&w=400&q=80",
    isLuxury: false,
    hypeScore: 44
  },
  {
    id: "p12",
    name: "Detergente Mousse Delicata",
    category: "skincare",
    originalPrice: 22.0,
    costForStore: 5.5,
    image: "https://images.unsplash.com/photo-1582719478248-54e9f2af69d9?auto=format&fit=crop&w=400&q=80",
    isLuxury: false,
    hypeScore: 41
  },
  {
    id: "p13",
    name: "Profumo Gardenia Chic",
    category: "perfume",
    originalPrice: 72.0,
    costForStore: 16.0,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80",
    isLuxury: false,
    hypeScore: 63
  },
  {
    id: "p14",
    name: "Crema Notte Luxury Peonia",
    category: "skincare",
    originalPrice: 78.0,
    costForStore: 17.5,
    image: "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=400&q=80",
    isLuxury: true,
    hypeScore: 60
  },
  {
    id: "p15",
    name: "Gloss Crystal Shine",
    category: "makeup",
    originalPrice: 19.0,
    costForStore: 4.5,
    image: "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=400&q=80",
    isLuxury: false,
    hypeScore: 45
  }
];

interface SpeedBoxState {
  tickets: TicketOption[];
  products: Product[];
  productSequence: Product[];
  currentSession: SpeedSession | null;
  currentTicket: TicketOption | null;
  currentProductIndex: number;
  currentProduct: Product | null;
  selectedProducts: SelectedProduct[];
  remainingSeconds: number;
  isRunning: boolean;
  feedbackMessage: string | null;
  sessionsHistory: SpeedSession[];

  startSession: (ticketId: string) => void;
  handleAdd: () => void;
  handleSkip: () => void;
  tick: () => void;
  endSession: () => void;
  getSessionById: (id: string) => SpeedSession | undefined;
}

function prepareProductSequence(products: Product[]): Product[] {
  const normal = products.filter((p) => !p.isLuxury).sort((a, b) => a.originalPrice - b.originalPrice);
  const luxuryRaw = products.filter((p) => p.isLuxury).sort((a, b) => a.originalPrice - b.originalPrice);

  const luxuryLimited: Product[] = [];
  let totalLuxury = 0;
  let luxuryPerfume = 0;
  let luxurySkincare = 0;

  for (const product of luxuryRaw) {
    const wouldExceedTotal = totalLuxury + 1 > MAX_LUXURY_TOTAL;
    const wouldExceedPerfume = product.category === "perfume" && luxuryPerfume + 1 > MAX_LUXURY_PERFUME;
    const wouldExceedSkincare = product.category === "skincare" && luxurySkincare + 1 > MAX_LUXURY_SKINCARE;
    if (wouldExceedTotal || wouldExceedPerfume || wouldExceedSkincare) continue;
    luxuryLimited.push(product);
    totalLuxury += 1;
    if (product.category === "perfume") luxuryPerfume += 1;
    if (product.category === "skincare") luxurySkincare += 1;
  }

  const sequence: Product[] = [];
  let normalIndex = 0;
  let luxuryIndex = 0;
  let stepsUntilLuxury = 3;

  while (normalIndex < normal.length) {
    sequence.push(normal[normalIndex]);
    normalIndex += 1;
    stepsUntilLuxury -= 1;

    if (stepsUntilLuxury <= 0 && luxuryIndex < luxuryLimited.length) {
      sequence.push(luxuryLimited[luxuryIndex]);
      luxuryIndex += 1;
      stepsUntilLuxury = 3 + (luxuryIndex % 2); // alternate between 3 and 4
    }
  }

  while (luxuryIndex < luxuryLimited.length) {
    sequence.push(luxuryLimited[luxuryIndex]);
    luxuryIndex += 1;
  }

  return sequence;
}

function calculateCurrentStoreCost(selectedProducts: SelectedProduct[]) {
  return selectedProducts.reduce((sum, sp) => sum + sp.product.costForStore, 0);
}

function calculateAvgHype(selectedProducts: SelectedProduct[]) {
  if (selectedProducts.length === 0) return 0;
  const sum = selectedProducts.reduce((acc, sp) => acc + sp.product.hypeScore, 0);
  return sum / selectedProducts.length;
}

function canAddProduct(product: Product, state: SpeedBoxState): boolean {
  if (!state.currentTicket) return false;
  const currentStoreCost = calculateCurrentStoreCost(state.selectedProducts);
  const proposedCost = currentStoreCost + product.costForStore;
  const maxStoreCost = state.currentTicket.price * 0.5;
  if (proposedCost > maxStoreCost) return false;

  const luxuryTotal = state.selectedProducts.filter((p) => p.product.isLuxury).length;
  const luxuryPerfume = state.selectedProducts.filter((p) => p.product.isLuxury && p.product.category === "perfume").length;
  const luxurySkincare = state.selectedProducts.filter((p) => p.product.isLuxury && p.product.category === "skincare").length;

  if (product.isLuxury) {
    if (luxuryTotal + 1 > MAX_LUXURY_TOTAL) return false;
    if (product.category === "perfume" && luxuryPerfume + 1 > MAX_LUXURY_PERFUME) return false;
    if (product.category === "skincare" && luxurySkincare + 1 > MAX_LUXURY_SKINCARE) return false;
  }

  const count = state.selectedProducts.length;
  const currentAvg = calculateAvgHype(state.selectedProducts);
  const proposedAvg = (currentAvg * count + product.hypeScore) / (count + 1);

  if (proposedAvg < 40 || proposedAvg > 70) return false;

  return true;
}

export const useSpeedBoxStore = create<SpeedBoxState>((set, get) => ({
  tickets: TICKETS,
  products: PRODUCTS,
  productSequence: [],
  currentSession: null,
  currentTicket: null,
  currentProductIndex: 0,
  currentProduct: null,
  selectedProducts: [],
  remainingSeconds: 0,
  isRunning: false,
  feedbackMessage: null,
  sessionsHistory: [],

  startSession: (ticketId: string) => {
    const ticket = get().tickets.find((t) => t.id === ticketId);
    if (!ticket) return;
    const sequence = prepareProductSequence(get().products);
    set({
      currentTicket: ticket,
      currentSession: null,
      productSequence: sequence,
      currentProductIndex: 0,
      currentProduct: sequence[0] ?? null,
      selectedProducts: [],
      remainingSeconds: ticket.totalSeconds,
      isRunning: true,
      feedbackMessage: null,
    });
  },

  handleAdd: () => {
    const state = get();
    const product = state.currentProduct;
    if (!product || !state.isRunning || !state.currentTicket) return;

    const allowed = canAddProduct(product, state);
    const timePenalty = allowed ? 30 : 10;
    const updatedSelected: SelectedProduct[] = allowed
      ? [...state.selectedProducts, {
        id: product.id,
        product,
        valueContribution: Math.min(product.originalPrice, state.currentTicket.price * 1.4)
      }]
      : state.selectedProducts;

    const newRemaining = Math.max(state.remainingSeconds - timePenalty, 0);
    const nextIndex = state.currentProductIndex + 1;
    const nextProduct = state.productSequence[nextIndex] ?? null;

    set({
      selectedProducts: updatedSelected,
      remainingSeconds: newRemaining,
      currentProductIndex: nextIndex,
      currentProduct: nextProduct,
      feedbackMessage: allowed ? null : "Bilanciamento interno: salto automatico",
    });

    if (newRemaining <= 0 || !nextProduct) {
      get().endSession();
    }
  },

  handleSkip: () => {
    const state = get();
    if (!state.isRunning) return;
    const newRemaining = Math.max(state.remainingSeconds - 10, 0);
    const nextIndex = state.currentProductIndex + 1;
    const nextProduct = state.productSequence[nextIndex] ?? null;

    set({
      remainingSeconds: newRemaining,
      currentProductIndex: nextIndex,
      currentProduct: nextProduct,
      feedbackMessage: null,
    });

    if (newRemaining <= 0 || !nextProduct) {
      get().endSession();
    }
  },

  tick: () => {
    const state = get();
    if (!state.isRunning) return;
    const updated = Math.max(state.remainingSeconds - 1, 0);
    set({ remainingSeconds: updated });
    if (updated <= 0) {
      get().endSession();
    }
  },

  endSession: () => {
    const state = get();
    if (!state.currentTicket) return;
    if (!state.isRunning && !state.currentSession) return;
    const totalValue = state.selectedProducts.reduce((sum, sp) => sum + sp.valueContribution, 0);
    const totalSaved = Math.max(totalValue - state.currentTicket.price, 0);
    const session: SpeedSession = {
      id: crypto.randomUUID(),
      ticket: state.currentTicket,
      selectedProducts: state.selectedProducts,
      totalValue,
      totalSaved,
      remainingSeconds: state.remainingSeconds,
      createdAt: new Date().toISOString(),
    };

    set({
      currentSession: session,
      sessionsHistory: [...state.sessionsHistory, session],
      isRunning: false,
      currentProduct: null,
      feedbackMessage: null,
    });
  },

  getSessionById: (id: string) => {
    const state = get();
    if (state.currentSession?.id === id) return state.currentSession;
    return state.sessionsHistory.find((s) => s.id === id);
  }
}));
