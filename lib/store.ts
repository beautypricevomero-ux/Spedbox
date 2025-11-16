"use client";

import { create } from "zustand";
import { products as mockProducts, tickets as ticketOptions } from "./mockData";
import { Product, SelectedProduct, Session, Ticket } from "./types";

const H_MIN = 40;
const H_MAX = 80;

const getCostTargets = (ticket: Ticket) => {
  const targetCost = ticket.ticketPrice * 0.5;
  return {
    targetCost,
    minCost: targetCost * 0.9,
    maxCost: targetCost * 1.1,
  };
};

const shuffle = <T,>(list: T[]): T[] => {
  const array = [...list];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const buildProductPool = (allProducts: Product[]) => {
  const heroes = shuffle(allProducts.filter((p) => p.tier === "hero"));
  const premium = shuffle(allProducts.filter((p) => p.tier === "premium"));
  const fillers = shuffle(allProducts.filter((p) => p.tier === "filler"));
  return [...heroes, ...premium, ...fillers];
};

interface NextProductPayload {
  currentTicket: Ticket;
  notYetShownProducts: Product[];
  currentCost: number;
  currentHypeSum: number;
  selectedCount: number;
  remainingSeconds: number;
}

const chooseNextProduct = (
  payload: NextProductPayload,
): { product: Product | null; remainingPool: Product[] } => {
  const { currentTicket, notYetShownProducts, currentCost, currentHypeSum, selectedCount, remainingSeconds } = payload;
  if (!currentTicket) {
    return { product: null, remainingPool: [] };
  }

  if (notYetShownProducts.length === 0) {
    return { product: null, remainingPool: [] };
  }

  const { maxCost } = getCostTargets(currentTicket);
  const remainingBudget = maxCost - currentCost;
  const costSafeProducts = notYetShownProducts.filter((p) => p.purchaseCost <= remainingBudget);

  if (costSafeProducts.length === 0) {
    return { product: null, remainingPool: [] };
  }

  const currentAvgHype = selectedCount === 0 ? null : currentHypeSum / selectedCount;

  const hypeSafeProducts = costSafeProducts.filter((p) => {
    const hypoAvg = selectedCount === 0 ? p.hypeScore : (currentHypeSum + p.hypeScore) / (selectedCount + 1);
    return hypoAvg >= H_MIN && hypoAvg <= H_MAX;
  });

  const candidates = hypeSafeProducts.length > 0 ? hypeSafeProducts : costSafeProducts;

  const getTierWeight = (product: Product) => {
    if (product.tier === "hero") return 0;
    if (product.tier === "premium") return 1;
    return 2;
  };

  const secondsRatio = currentTicket.totalSeconds === 0 ? 0 : remainingSeconds / currentTicket.totalSeconds;

  const sorted = [...candidates].sort((a, b) => {
    const tierDiff = getTierWeight(a) - getTierWeight(b);
    if (tierDiff !== 0) return tierDiff;

    if (secondsRatio > 0.6) {
      const hypeDiff = b.hypeScore - a.hypeScore;
      if (hypeDiff !== 0) return hypeDiff;
    }

    if (secondsRatio < 0.3) {
      const costDiff = a.purchaseCost - b.purchaseCost;
      if (costDiff !== 0) return costDiff;
    }

    if (currentAvgHype && currentAvgHype > 70) {
      const balanceDiff = a.hypeScore - b.hypeScore;
      if (balanceDiff !== 0) return balanceDiff;
    }

    if (currentAvgHype && currentAvgHype < 50) {
      const liftDiff = b.hypeScore - a.hypeScore;
      if (liftDiff !== 0) return liftDiff;
    }

    const purchaseDiff = a.purchaseCost - b.purchaseCost;
    if (purchaseDiff !== 0) return purchaseDiff;

    return a.id.localeCompare(b.id);
  });

  const nextProduct = sorted[0] ?? null;
  const remainingPool = nextProduct
    ? notYetShownProducts.filter((p) => p.id !== nextProduct.id)
    : notYetShownProducts;

  return { product: nextProduct, remainingPool };
};

interface GameState {
  tickets: Ticket[];
  products: Product[];

  currentTicket: Ticket | null;
  currentSessionId: string | null;
  currentProduct: Product | null;
  notYetShownProducts: Product[];
  selectedProducts: SelectedProduct[];

  remainingSeconds: number;
  currentCost: number;
  currentHypeSum: number;
  selectedCount: number;

  sessionsHistory: Session[];

  startSession: (ticketId: string) => void;
  handleAdd: () => void;
  handleSkip: () => void;
  tick: () => void;
  endSession: () => void;
  getSessionById: (id: string) => Session | undefined;
}

export const useSpeedBoxStore = create<GameState>((set, get) => ({
  tickets: ticketOptions,
  products: mockProducts,

  currentTicket: null,
  currentSessionId: null,
  currentProduct: null,
  notYetShownProducts: [],
  selectedProducts: [],
  remainingSeconds: 0,
  currentCost: 0,
  currentHypeSum: 0,
  selectedCount: 0,
  sessionsHistory: [],

  startSession: (ticketId) => {
    const ticket = get().tickets.find((t) => t.id === ticketId);
    if (!ticket) return;

    const productPool = buildProductPool(get().products);
    const { product, remainingPool } = chooseNextProduct({
      currentTicket: ticket,
      notYetShownProducts: productPool,
      currentCost: 0,
      currentHypeSum: 0,
      selectedCount: 0,
      remainingSeconds: ticket.totalSeconds,
    });

    set({
      currentTicket: ticket,
      currentSessionId: null,
      currentProduct: product,
      notYetShownProducts: remainingPool,
      selectedProducts: [],
      remainingSeconds: ticket.totalSeconds,
      currentCost: 0,
      currentHypeSum: 0,
      selectedCount: 0,
    });

    if (!product) {
      get().endSession();
    }
  },

  handleAdd: () => {
    const state = get();
    if (!state.currentProduct || !state.currentTicket) return;

    const newSelectedProducts: SelectedProduct[] = [
      ...state.selectedProducts,
      { product: state.currentProduct },
    ];

    const updatedCost = state.currentCost + state.currentProduct.purchaseCost;
    const updatedHype = state.currentHypeSum + state.currentProduct.hypeScore;
    const updatedCount = state.selectedCount + 1;
    const updatedSeconds = Math.max(0, state.remainingSeconds - 30);

    const selection = chooseNextProduct({
      currentTicket: state.currentTicket,
      notYetShownProducts: state.notYetShownProducts,
      currentCost: updatedCost,
      currentHypeSum: updatedHype,
      selectedCount: updatedCount,
      remainingSeconds: updatedSeconds,
    });

    set({
      selectedProducts: newSelectedProducts,
      currentCost: updatedCost,
      currentHypeSum: updatedHype,
      selectedCount: updatedCount,
      remainingSeconds: updatedSeconds,
      currentProduct: selection.product,
      notYetShownProducts: selection.remainingPool,
    });

    if (!selection.product || updatedSeconds <= 0) {
      get().endSession();
    }
  },

  handleSkip: () => {
    const state = get();
    if (!state.currentTicket || !state.currentProduct) return;

    const updatedSeconds = Math.max(0, state.remainingSeconds - 10);

    const selection = chooseNextProduct({
      currentTicket: state.currentTicket,
      notYetShownProducts: state.notYetShownProducts,
      currentCost: state.currentCost,
      currentHypeSum: state.currentHypeSum,
      selectedCount: state.selectedCount,
      remainingSeconds: updatedSeconds,
    });

    set({
      remainingSeconds: updatedSeconds,
      currentProduct: selection.product,
      notYetShownProducts: selection.remainingPool,
    });

    if (!selection.product || updatedSeconds <= 0) {
      get().endSession();
    }
  },

  tick: () => {
    const state = get();
    if (!state.currentTicket || !state.currentProduct) return;
    if (state.remainingSeconds <= 1) {
      set({ remainingSeconds: 0 });
      get().endSession();
      return;
    }

    set({ remainingSeconds: state.remainingSeconds - 1 });
  },

  endSession: () => {
    const state = get();
    if (!state.currentTicket) return;

    const sessionId = crypto.randomUUID();
    const snapshot: SelectedProduct[] = state.selectedProducts.map((item) => ({
      product: item.product,
    }));

    const totalValue = snapshot.reduce((sum, entry) => sum + entry.product.originalPrice, 0);
    const totalPurchaseCost = state.currentCost;
    const avgHype = state.selectedCount === 0 ? null : state.currentHypeSum / state.selectedCount;
    const hasBeautyVesEdition = snapshot.some((entry) => entry.product.isBeautyVes);

    const session: Session = {
      id: sessionId,
      ticket: state.currentTicket,
      selectedProducts: snapshot,
      totalValue,
      totalPurchaseCost,
      avgHype,
      createdAt: new Date().toISOString(),
      hasBeautyVesEdition,
    };

    set((prev) => ({
      ...prev,
      sessionsHistory: [...prev.sessionsHistory, session],
      currentSessionId: sessionId,
      currentTicket: null,
      currentProduct: null,
      notYetShownProducts: [],
      selectedProducts: [],
      remainingSeconds: 0,
      currentCost: 0,
      currentHypeSum: 0,
      selectedCount: 0,
    }));
  },

  getSessionById: (id) => get().sessionsHistory.find((session) => session.id === id),
}));
